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
                        <p class="text-sm text-gray-500 mt-1">2026년 1월 전문의약품 승인 현황</p>
                    </div>
                    <div class="text-right">
                        <p class="text-sm text-gray-600">데이터 수집일</p>
                        <p class="text-lg font-semibold text-gray-900">2026-01-26</p>
                    </div>
                </div>
            </div>
        </header>

        <!-- 메인 컨텐츠 -->
        <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
