import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS 설정
app.use('/api/*', cors())

// 정적 파일 서빙
app.use('/static/*', serveStatic({ root: './public' }))

// ===========================================
// 📊 대시보드 API 엔드포인트
// ===========================================

// 📈 대시보드 요약 통계
app.get('/api/dashboard/summary', async (c) => {
  const { DB } = c.env;
  
  try {
    // 전체 승인 건수
    const totalResult = await DB.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first();
    
    // 항암제 승인 건수
    const oncologyResult = await DB.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_oncology = 'Y'
    `).first();
    
    // 신약 승인 건수
    const novelResult = await DB.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_novel = 'Y'
    `).first();
    
    // 바이오시밀러 승인 건수
    const biosimilarResult = await DB.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_biosimilar = 'Y'
    `).first();
    
    // 희귀의약품 승인 건수
    const orphanResult = await DB.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals WHERE is_orphan = 'Y'
    `).first();
    
    return c.json({
      total: totalResult?.count || 0,
      oncology: oncologyResult?.count || 0,
      novel: novelResult?.count || 0,
      biosimilar: biosimilarResult?.count || 0,
      orphan: orphanResult?.count || 0
    });
  } catch (error) {
    console.error('Summary error:', error);
    return c.json({ error: 'Failed to fetch summary' }, 500);
  }
});

// 📊 치료영역별 분포
app.get('/api/dashboard/therapeutic-area', async (c) => {
  const { DB } = c.env;
  
  try {
    const result = await DB.prepare(`
      SELECT 
        therapeutic_area,
        COUNT(*) as count
      FROM fda_approvals
      WHERE therapeutic_area IS NOT NULL AND therapeutic_area != ''
      GROUP BY therapeutic_area
      ORDER BY count DESC
      LIMIT 10
    `).all();
    
    return c.json(result.results || []);
  } catch (error) {
    console.error('Therapeutic area error:', error);
    return c.json({ error: 'Failed to fetch therapeutic areas' }, 500);
  }
});

// 🏢 제약사별 승인 건수 (Top 10)
app.get('/api/dashboard/sponsors', async (c) => {
  const { DB } = c.env;
  const limit = c.req.query('limit') || '10';
  
  try {
    const result = await DB.prepare(`
      SELECT 
        sponsor,
        COUNT(*) as count
      FROM fda_approvals
      WHERE sponsor IS NOT NULL AND sponsor != ''
      GROUP BY sponsor
      ORDER BY count DESC
      LIMIT ?
    `).bind(parseInt(limit)).all();
    
    return c.json(result.results || []);
  } catch (error) {
    console.error('Sponsors error:', error);
    return c.json({ error: 'Failed to fetch sponsors' }, 500);
  }
});

// 📅 월별 승인 추이
app.get('/api/dashboard/monthly-trend', async (c) => {
  const { DB } = c.env;
  
  try {
    const result = await DB.prepare(`
      SELECT 
        approval_month,
        COUNT(*) as count
      FROM fda_approvals
      WHERE approval_month IS NOT NULL
      GROUP BY approval_month
      ORDER BY approval_month ASC
    `).all();
    
    return c.json(result.results || []);
  } catch (error) {
    console.error('Monthly trend error:', error);
    return c.json({ error: 'Failed to fetch monthly trend' }, 500);
  }
});

// 📊 승인 유형별 분포
app.get('/api/dashboard/approval-types', async (c) => {
  const { DB } = c.env;
  
  try {
    const result = await DB.prepare(`
      SELECT 
        approval_type,
        COUNT(*) as count
      FROM fda_approvals
      WHERE approval_type IS NOT NULL AND approval_type != ''
      GROUP BY approval_type
      ORDER BY count DESC
    `).all();
    
    return c.json(result.results || []);
  } catch (error) {
    console.error('Approval types error:', error);
    return c.json({ error: 'Failed to fetch approval types' }, 500);
  }
});

// ===========================================
// 📋 승인 데이터 조회 API
// ===========================================

// 전체 승인 목록 (페이지네이션)
app.get('/api/approvals', async (c) => {
  const { DB } = c.env;
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '20');
  const offset = (page - 1) * limit;
  
  try {
    // 전체 건수
    const countResult = await DB.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first();
    
    // 페이지 데이터
    const result = await DB.prepare(`
      SELECT * FROM fda_approvals
      ORDER BY approval_date DESC
      LIMIT ? OFFSET ?
    `).bind(limit, offset).all();
    
    return c.json({
      data: result.results || [],
      pagination: {
        page,
        limit,
        total: countResult?.count || 0,
        totalPages: Math.ceil((countResult?.count || 0) / limit)
      }
    });
  } catch (error) {
    console.error('Approvals list error:', error);
    return c.json({ error: 'Failed to fetch approvals' }, 500);
  }
});

// 🔍 상세 정보
app.get('/api/approvals/:id', async (c) => {
  const { DB } = c.env;
  const id = c.req.param('id');
  
  try {
    const result = await DB.prepare(`
      SELECT * FROM fda_approvals WHERE id = ?
    `).bind(id).first();
    
    if (!result) {
      return c.json({ error: 'Not found' }, 404);
    }
    
    return c.json(result);
  } catch (error) {
    console.error('Approval detail error:', error);
    return c.json({ error: 'Failed to fetch approval detail' }, 500);
  }
});

// 🔎 검색 (제품명, 주성분, 제약사)
app.get('/api/approvals/search/:query', async (c) => {
  const { DB } = c.env;
  const query = c.req.param('query');
  
  if (!query || query.trim() === '') {
    return c.json({ error: 'Query parameter required' }, 400);
  }
  
  try {
    const searchTerm = `%${query}%`;
    const result = await DB.prepare(`
      SELECT * FROM fda_approvals
      WHERE 
        product_name LIKE ? OR
        active_ingredient LIKE ? OR
        sponsor LIKE ? OR
        indication LIKE ?
      ORDER BY approval_date DESC
      LIMIT 50
    `).bind(searchTerm, searchTerm, searchTerm, searchTerm).all();
    
    return c.json(result.results || []);
  } catch (error) {
    console.error('Search error:', error);
    return c.json({ error: 'Failed to search approvals' }, 500);
  }
});

// 🎯 필터링 (복합 조건)
app.post('/api/approvals/filter', async (c) => {
  const { DB } = c.env;
  
  try {
    const body = await c.req.json();
    
    let sql = 'SELECT * FROM fda_approvals WHERE 1=1';
    const params: any[] = [];
    
    if (body.approval_month) {
      sql += ' AND approval_month = ?';
      params.push(body.approval_month);
    }
    
    if (body.therapeutic_area) {
      sql += ' AND therapeutic_area = ?';
      params.push(body.therapeutic_area);
    }
    
    if (body.is_oncology) {
      sql += ' AND is_oncology = ?';
      params.push(body.is_oncology);
    }
    
    if (body.is_novel) {
      sql += ' AND is_novel = ?';
      params.push(body.is_novel);
    }
    
    if (body.is_biosimilar) {
      sql += ' AND is_biosimilar = ?';
      params.push(body.is_biosimilar);
    }
    
    if (body.is_orphan) {
      sql += ' AND is_orphan = ?';
      params.push(body.is_orphan);
    }
    
    if (body.sponsor) {
      sql += ' AND sponsor = ?';
      params.push(body.sponsor);
    }
    
    if (body.approval_type) {
      sql += ' AND approval_type = ?';
      params.push(body.approval_type);
    }
    
    sql += ' ORDER BY approval_date DESC LIMIT 100';
    
    const result = await DB.prepare(sql).bind(...params).all();
    
    return c.json(result.results || []);
  } catch (error) {
    console.error('Filter error:', error);
    return c.json({ error: 'Failed to filter approvals' }, 500);
  }
});

// ===========================================
// 📤 데이터 관리 API
// ===========================================

// 필터 옵션 조회
app.get('/api/filters/options', async (c) => {
  const { DB } = c.env;
  
  try {
    // 승인 월 목록
    const months = await DB.prepare(`
      SELECT DISTINCT approval_month FROM fda_approvals 
      WHERE approval_month IS NOT NULL 
      ORDER BY approval_month DESC
    `).all();
    
    // 치료영역 목록
    const therapeuticAreas = await DB.prepare(`
      SELECT DISTINCT therapeutic_area FROM fda_approvals 
      WHERE therapeutic_area IS NOT NULL AND therapeutic_area != '' AND therapeutic_area != 'Not specified'
      ORDER BY therapeutic_area
    `).all();
    
    // 제약사 목록
    const sponsors = await DB.prepare(`
      SELECT DISTINCT sponsor FROM fda_approvals 
      WHERE sponsor IS NOT NULL AND sponsor != ''
      ORDER BY sponsor
    `).all();
    
    // 승인 유형 목록
    const approvalTypes = await DB.prepare(`
      SELECT DISTINCT approval_type FROM fda_approvals 
      WHERE approval_type IS NOT NULL AND approval_type != ''
      ORDER BY approval_type
    `).all();
    
    return c.json({
      months: months.results?.map(r => r.approval_month) || [],
      therapeutic_areas: therapeuticAreas.results?.map(r => r.therapeutic_area) || [],
      sponsors: sponsors.results?.map(r => r.sponsor) || [],
      approval_types: approvalTypes.results?.map(r => r.approval_type) || []
    });
  } catch (error) {
    console.error('Filter options error:', error);
    return c.json({ error: 'Failed to fetch filter options' }, 500);
  }
});

// 버전 목록 조회
app.get('/api/versions', async (c) => {
  const { DB } = c.env;
  
  try {
    const result = await DB.prepare(`
      SELECT * FROM data_versions 
      ORDER BY uploaded_at DESC
    `).all();
    
    return c.json(result.results || []);
  } catch (error) {
    console.error('Versions error:', error);
    return c.json({ error: 'Failed to fetch versions' }, 500);
  }
});

// 현재 데이터 백업 생성
app.post('/api/versions/backup', async (c) => {
  const { DB } = c.env;
  
  try {
    const body = await c.req.json();
    const { version_name, month, description } = body;
    
    // 현재 데이터 수 확인
    const countResult = await DB.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first();
    
    const recordCount = countResult?.count || 0;
    
    // 버전 정보 생성
    const versionResult = await DB.prepare(`
      INSERT INTO data_versions (version_name, month, record_count, description)
      VALUES (?, ?, ?, ?)
    `).bind(version_name, month, recordCount, description || '').run();
    
    const versionId = versionResult.meta.last_row_id;
    
    // 현재 데이터를 백업 테이블에 복사
    await DB.prepare(`
      INSERT INTO fda_approvals_backup 
      SELECT NULL as id, ? as version_id, 
             approval_month, approval_date, nda_bla_number, application_number,
             application_type, product_name, active_ingredient, sponsor,
             indication, therapeutic_area, is_oncology, is_biosimilar,
             is_novel, is_orphan, approval_type, remarks,
             fda_approval_page, fda_drugs_url, approval_letter,
             source, data_collection_date, created_at
      FROM fda_approvals
    `).bind(versionId).run();
    
    return c.json({ 
      success: true, 
      version_id: versionId,
      record_count: recordCount
    });
  } catch (error) {
    console.error('Backup error:', error);
    return c.json({ error: 'Failed to create backup' }, 500);
  }
});

// 버전 복원 (되돌리기)
app.post('/api/versions/restore/:versionId', async (c) => {
  const { DB } = c.env;
  const versionId = c.req.param('versionId');
  
  try {
    // 버전 존재 확인
    const version = await DB.prepare(`
      SELECT * FROM data_versions WHERE id = ?
    `).bind(versionId).first();
    
    if (!version) {
      return c.json({ error: 'Version not found' }, 404);
    }
    
    // 현재 데이터 삭제
    await DB.prepare(`DELETE FROM fda_approvals`).run();
    
    // 백업 데이터 복원
    await DB.prepare(`
      INSERT INTO fda_approvals 
      SELECT NULL as id,
             approval_month, approval_date, nda_bla_number, application_number,
             application_type, product_name, active_ingredient, sponsor,
             indication, therapeutic_area, is_oncology, is_biosimilar,
             is_novel, is_orphan, approval_type, remarks,
             fda_approval_page, fda_drugs_url, approval_letter,
             source, data_collection_date, created_at
      FROM fda_approvals_backup
      WHERE version_id = ?
    `).bind(versionId).run();
    
    // 활성 상태 업데이트
    await DB.prepare(`UPDATE data_versions SET is_active = 0`).run();
    await DB.prepare(`UPDATE data_versions SET is_active = 1 WHERE id = ?`).bind(versionId).run();
    
    return c.json({ 
      success: true, 
      version_name: version.version_name,
      record_count: version.record_count
    });
  } catch (error) {
    console.error('Restore error:', error);
    return c.json({ error: 'Failed to restore version' }, 500);
  }
});

// 데이터 업데이트 (새 월 데이터 업로드)
app.post('/api/data/upload', async (c) => {
  const { DB } = c.env;
  
  try {
    const body = await c.req.json();
    const { data, version_name, month, description } = body;
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      return c.json({ error: 'Invalid data format' }, 400);
    }
    
    // 1. 현재 데이터 백업
    const countResult = await DB.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first();
    
    const oldRecordCount = countResult?.count || 0;
    
    if (oldRecordCount > 0) {
      const backupVersionResult = await DB.prepare(`
        INSERT INTO data_versions (version_name, month, record_count, description, is_active)
        VALUES (?, ?, ?, ?, ?)
      `).bind(
        `Backup before ${version_name}`,
        month || 'unknown',
        oldRecordCount,
        'Auto backup before new data upload',
        0
      ).run();
      
      const backupVersionId = backupVersionResult.meta.last_row_id;
      
      await DB.prepare(`
        INSERT INTO fda_approvals_backup 
        SELECT NULL as id, ? as version_id, 
               approval_month, approval_date, nda_bla_number, application_number,
               application_type, product_name, active_ingredient, sponsor,
               indication, therapeutic_area, is_oncology, is_biosimilar,
               is_novel, is_orphan, approval_type, remarks,
               fda_approval_page, fda_drugs_url, approval_letter,
               source, data_collection_date, created_at
        FROM fda_approvals
      `).bind(backupVersionId).run();
    }
    
    // 2. 새 데이터 추가 (APPEND 방식 - 기존 데이터 유지)
    // 중복 방지: 동일한 approval_month + nda_bla_number 조합은 업데이트
    for (const record of data) {
      // 기존 레코드 확인
      const existingRecord = await DB.prepare(`
        SELECT id FROM fda_approvals 
        WHERE approval_month = ? AND nda_bla_number = ?
      `).bind(record.approval_month, record.nda_bla_number).first();
      
      if (existingRecord) {
        // 기존 레코드 업데이트
        await DB.prepare(`
          UPDATE fda_approvals SET
            approval_date = ?, application_number = ?, application_type = ?,
            product_name = ?, active_ingredient = ?, sponsor = ?, indication = ?,
            therapeutic_area = ?, is_oncology = ?, is_biosimilar = ?, is_novel = ?,
            is_orphan = ?, approval_type = ?, remarks = ?, fda_approval_page = ?,
            fda_drugs_url = ?, approval_letter = ?, source = ?, data_collection_date = ?
          WHERE id = ?
        `).bind(
          record.approval_date, record.application_number, record.application_type,
          record.product_name, record.active_ingredient, record.sponsor, record.indication,
          record.therapeutic_area, record.is_oncology, record.is_biosimilar, record.is_novel,
          record.is_orphan, record.approval_type, record.remarks, record.fda_approval_page,
          record.fda_drugs_url, record.approval_letter, record.source, record.data_collection_date,
          existingRecord.id
        ).run();
      } else {
        // 새 레코드 삽입
        await DB.prepare(`
          INSERT INTO fda_approvals (
            approval_month, approval_date, nda_bla_number, application_number,
            application_type, product_name, active_ingredient, sponsor,
            indication, therapeutic_area, is_oncology, is_biosimilar,
            is_novel, is_orphan, approval_type, remarks,
            fda_approval_page, fda_drugs_url, approval_letter,
            source, data_collection_date
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          record.approval_month, record.approval_date, record.nda_bla_number,
          record.application_number, record.application_type, record.product_name,
          record.active_ingredient, record.sponsor, record.indication,
          record.therapeutic_area, record.is_oncology, record.is_biosimilar,
          record.is_novel, record.is_orphan, record.approval_type,
          record.remarks, record.fda_approval_page, record.fda_drugs_url,
          record.approval_letter, record.source, record.data_collection_date
        ).run();
      }
    }
    
    // 3. 최신 데이터 개수 확인
    const newCountResult = await DB.prepare(`
      SELECT COUNT(*) as count FROM fda_approvals
    `).first();
    
    const newRecordCount = newCountResult?.count || 0;
    
    // 4. 새 버전 생성
    const newVersionResult = await DB.prepare(`
      INSERT INTO data_versions (version_name, month, record_count, description, is_active)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      version_name, 
      month, 
      newRecordCount, 
      description || `${version_name} (총 ${newRecordCount}건, 추가 ${data.length}건)`, 
      1
    ).run();
    
    const newVersionId = newVersionResult.meta.last_row_id;
    
    // 5. 새 데이터를 백업 테이블에도 저장
    await DB.prepare(`
      INSERT INTO fda_approvals_backup 
      SELECT NULL as id, ? as version_id, 
             approval_month, approval_date, nda_bla_number, application_number,
             application_type, product_name, active_ingredient, sponsor,
             indication, therapeutic_area, is_oncology, is_biosimilar,
             is_novel, is_orphan, approval_type, remarks,
             fda_approval_page, fda_drugs_url, approval_letter,
             source, data_collection_date, created_at
      FROM fda_approvals
    `).bind(newVersionId).run();
    
    return c.json({ 
      success: true,
      version_id: newVersionId,
      record_count: newRecordCount,
      added_count: data.length,
      old_record_count: oldRecordCount
    });
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: 'Failed to upload data: ' + error.message }, 500);
  }
});

// ===========================================
// 🏠 메인 페이지
// ===========================================

app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FDA 승인 대시보드 - 2026년 1월</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    </head>
    <body class="bg-gray-50">
        <!-- 헤더 -->
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">
                            <i class="fas fa-pills text-blue-600 mr-2"></i>
                            FDA 승인 대시보드
                        </h1>
                        <p class="text-sm text-gray-500 mt-1">전문의약품 승인 현황 관리</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-600">현재 버전</p>
                        <p class="text-lg font-semibold text-gray-900" id="current-version">-</p>
                    </div>
                </div>
            </div>
            
            <!-- 탭 네비게이션 -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav class="flex space-x-4 border-t border-gray-200">
                    <button onclick="switchTab('dashboard')" id="tab-dashboard" 
                            class="tab-btn px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600">
                        <i class="fas fa-chart-line mr-2"></i>대시보드
                    </button>
                    <button onclick="switchTab('data-manage')" id="tab-data-manage" 
                            class="tab-btn px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                        <i class="fas fa-upload mr-2"></i>데이터 관리
                    </button>
                    <button onclick="switchTab('versions')" id="tab-versions" 
                            class="tab-btn px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                        <i class="fas fa-history mr-2"></i>버전 관리
                    </button>
                </nav>
            </div>
        </header>

        <!-- 메인 컨텐츠 -->
        <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <!-- 대시보드 탭 -->
            <div id="dashboard-tab" class="tab-content">
                <!-- 필터 영역 -->
                <div class="bg-white rounded-lg shadow p-6 mb-8">
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-lg font-semibold text-gray-900">
                            <i class="fas fa-filter text-blue-600 mr-2"></i>
                            필터
                        </h2>
                        <button onclick="resetFilters()" class="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                            <i class="fas fa-redo mr-2"></i>필터 초기화
                        </button>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">승인 월</label>
                            <select id="filter-month" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">전체</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">치료영역</label>
                            <select id="filter-therapeutic-area" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">전체</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">제약사</label>
                            <select id="filter-sponsor" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">전체</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">승인 유형</label>
                            <select id="filter-approval-type" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">전체</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">구분</label>
                            <select id="filter-category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">전체</option>
                                <option value="oncology">항암제</option>
                                <option value="novel">신약</option>
                                <option value="biosimilar">바이오시밀러</option>
                                <option value="orphan">희귀의약품</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-4 flex justify-end">
                        <button onclick="applyFilters()" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            <i class="fas fa-search mr-2"></i>필터 적용
                        </button>
                    </div>
                </div>
                
                <!-- 요약 통계 카드 -->
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">전체 승인</p>
                                <p class="text-3xl font-bold text-gray-900" id="total-count">-</p>
                            </div>
                            <i class="fas fa-check-circle text-4xl text-blue-500"></i>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">항암제</p>
                                <p class="text-3xl font-bold text-gray-900" id="oncology-count">-</p>
                            </div>
                            <i class="fas fa-ribbon text-4xl text-red-500"></i>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">신약</p>
                                <p class="text-3xl font-bold text-gray-900" id="novel-count">-</p>
                            </div>
                            <i class="fas fa-star text-4xl text-green-500"></i>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">바이오시밀러</p>
                                <p class="text-3xl font-bold text-gray-900" id="biosimilar-count">-</p>
                            </div>
                            <i class="fas fa-dna text-4xl text-purple-500"></i>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">희귀의약품</p>
                                <p class="text-3xl font-bold text-gray-900" id="orphan-count">-</p>
                            </div>
                            <i class="fas fa-heart text-4xl text-orange-500"></i>
                        </div>
                    </div>
                </div>

                <!-- 차트 영역 -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <!-- 치료영역별 분포 -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-chart-pie text-blue-600 mr-2"></i>
                            치료영역별 분포 (Top 10)
                        </h2>
                        <canvas id="therapeuticAreaChart"></canvas>
                    </div>
                    
                    <!-- 제약사별 승인 건수 -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">
                            <i class="fas fa-chart-bar text-green-600 mr-2"></i>
                            제약사별 승인 건수 (Top 10)
                        </h2>
                        <canvas id="sponsorsChart"></canvas>
                    </div>
                </div>

                <!-- 승인 목록 테이블 -->
                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 class="text-lg font-semibold text-gray-900">
                            <i class="fas fa-list text-blue-600 mr-2"></i>
                            승인 목록
                        </h2>
                        <div class="flex items-center gap-2">
                            <input type="text" id="search-input" placeholder="검색..." 
                                   class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <button id="search-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">승인일</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제품명</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주성분</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제약사</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">치료영역</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">구분</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상세</th>
                                </tr>
                            </thead>
                            <tbody id="approvals-table" class="bg-white divide-y divide-gray-200">
                                <!-- 데이터가 여기에 동적으로 추가됩니다 -->
                            </tbody>
                        </table>
                    </div>
                    <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div class="text-sm text-gray-600" id="pagination-info">
                            로딩 중...
                        </div>
                        <div class="flex gap-2">
                            <button id="prev-page" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50">
                                이전
                            </button>
                            <button id="next-page" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50">
                                다음
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 데이터 관리 탭 -->
            <div id="data-manage-tab" class="tab-content hidden">
                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6">
                        <i class="fas fa-upload text-blue-600 mr-2"></i>
                        새로운 데이터 업로드
                    </h2>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">버전 이름</label>
                        <input type="text" id="version-name" placeholder="예: 2026년 2월 FDA 승인 데이터"
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">승인 월</label>
                        <input type="month" id="data-month"
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">설명 (선택사항)</label>
                        <textarea id="version-description" rows="3" placeholder="데이터에 대한 설명을 입력하세요..."
                                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-file-excel mr-2"></i>
                            엑셀 파일 선택
                        </label>
                        <input type="file" id="excel-file" accept=".xlsx,.xls"
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <p class="mt-2 text-sm text-gray-500">
                            <i class="fas fa-info-circle mr-1"></i>
                            지원 형식: .xlsx, .xls | 'English' 시트에서 데이터를 읽어옵니다.
                        </p>
                    </div>
                    
                    <div id="upload-preview" class="mb-6 hidden">
                        <h3 class="text-sm font-medium text-gray-700 mb-2">미리보기</h3>
                        <div class="bg-gray-50 rounded-lg p-4">
                            <p class="text-sm text-gray-600">
                                <span class="font-semibold">레코드 수:</span> <span id="preview-count">0</span>건
                            </p>
                            <p class="text-sm text-gray-600 mt-2">
                                <span class="font-semibold">주요 정보:</span> <span id="preview-info">-</span>
                            </p>
                        </div>
                    </div>
                    
                    <div class="flex gap-4">
                        <button onclick="uploadExcel()" id="upload-btn" 
                                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                            <i class="fas fa-cloud-upload-alt mr-2"></i>
                            업로드 및 적용
                        </button>
                        <button onclick="backupCurrentData()" 
                                class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            <i class="fas fa-save mr-2"></i>
                            현재 데이터 백업만 하기
                        </button>
                    </div>
                    
                    <div id="upload-status" class="mt-6 hidden">
                        <!-- 업로드 상태 메시지 -->
                    </div>
                </div>
            </div>
            
            <!-- 버전 관리 탭 -->
            <div id="versions-tab" class="tab-content hidden">
                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h2 class="text-lg font-semibold text-gray-900">
                            <i class="fas fa-history text-blue-600 mr-2"></i>
                            데이터 버전 히스토리
                        </h2>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">버전 이름</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">월</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">레코드 수</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">업로드 일시</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                                </tr>
                            </thead>
                            <tbody id="versions-table" class="bg-white divide-y divide-gray-200">
                                <!-- 버전 목록이 여기에 동적으로 추가됩니다 -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>

        <!-- 푸터 -->
        <footer class="bg-white border-t border-gray-200 mt-12">
            <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                <p class="text-center text-sm text-gray-500">
                    데이터 출처: FDA Official + Drugs.com + ASCO | 
                    Powered by Hono + Cloudflare Pages
                </p>
            </div>
        </footer>

        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
