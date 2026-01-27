# FDA 대시보드 - Cloudflare Pages 배포 가이드

## 📦 배포 파일
- **dist 폴더**: `/home/user/webapp/dist/`
- **압축 파일**: `/home/user/webapp/fda-dashboard-dist.tar.gz` (24KB)
- **D1 설정 SQL**: `/home/user/webapp/cloudflare-setup.sql`

---

## 🚀 배포 단계

### **1단계: D1 데이터베이스 스키마 생성**

1. **Cloudflare D1 콘솔 열기**:
   ```
   https://dash.cloudflare.com/26a3752912d9db9ed76530af32ba88b6/workers/d1
   ```

2. **데이터베이스 선택**: `fda-dashboard-production` 클릭

3. **Console 탭** 클릭

4. **다음 SQL 실행** (스키마 생성):
   ```sql
   -- FDA 승인 데이터 테이블
   CREATE TABLE IF NOT EXISTS fda_approvals (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     approval_month TEXT,
     approval_date TEXT,
     nda_bla_number TEXT,
     application_number REAL,
     application_type TEXT,
     product_name TEXT,
     active_ingredient TEXT,
     sponsor TEXT,
     indication TEXT,
     therapeutic_area TEXT,
     is_oncology TEXT,
     is_biosimilar TEXT,
     is_novel TEXT,
     is_orphan TEXT,
     approval_type TEXT,
     remarks TEXT,
     fda_approval_page TEXT,
     fda_drugs_url TEXT,
     approval_letter TEXT,
     source TEXT,
     data_collection_date TEXT,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   -- 인덱스 생성
   CREATE INDEX IF NOT EXISTS idx_approval_date ON fda_approvals(approval_date);
   CREATE INDEX IF NOT EXISTS idx_therapeutic_area ON fda_approvals(therapeutic_area);
   CREATE INDEX IF NOT EXISTS idx_sponsor ON fda_approvals(sponsor);
   CREATE INDEX IF NOT EXISTS idx_is_oncology ON fda_approvals(is_oncology);
   CREATE INDEX IF NOT EXISTS idx_approval_month ON fda_approvals(approval_month);
   ```

5. **"Execute" 버튼** 클릭

6. **확인**:
   ```sql
   SELECT name FROM sqlite_master WHERE type='table';
   ```
   → `fda_approvals` 테이블이 표시되어야 함

---

### **2단계: Cloudflare Pages 프로젝트 생성**

1. **Pages 페이지 열기**:
   ```
   https://dash.cloudflare.com/26a3752912d9db9ed76530af32ba88b6/pages
   ```

2. **"Create application"** 버튼 클릭

3. **"Upload assets"** 탭 선택

4. **프로젝트 이름 입력**: `fda-dashboard`

5. **Production branch**: `main`

---

### **3단계: dist 폴더 업로드**

**방법 A: 압축 파일 다운로드 후 업로드**
1. 샌드박스에서 파일 다운로드:
   - `/home/user/webapp/fda-dashboard-dist.tar.gz`
   - 우클릭 → "Download"
2. 로컬에서 압축 해제: `tar -xzf fda-dashboard-dist.tar.gz`
3. Cloudflare Pages에서 `dist` 폴더 내용 드래그앤드롭

**방법 B: 파일 직접 선택**
1. "Select from computer" 클릭
2. 다음 파일들 선택:
   - `_worker.js`
   - `_routes.json`
   - `static/` 폴더 전체

---

### **4단계: 배포**

1. **"Deploy site"** 버튼 클릭

2. 배포 완료까지 대기 (약 30초~1분)

3. **배포 URL 확인**:
   ```
   https://[deployment-id].fda-dashboard.pages.dev
   ```

---

### **5단계: D1 바인딩 설정** ⚠️ 중요!

1. 배포 완료 후 **"Settings"** 탭 클릭

2. **"Functions"** 섹션 찾기

3. **"D1 database bindings"** 찾기

4. **"Add binding"** 클릭:
   - **Variable name**: `DB` (대문자 필수!)
   - **D1 database**: `fda-dashboard-production` 선택

5. **"Save"** 버튼 클릭

---

### **6단계: 재배포** (D1 바인딩 적용)

1. **"Deployments"** 탭으로 이동

2. 최신 배포 찾기 (맨 위)

3. 우측 **"..." 메뉴** 클릭

4. **"Retry deployment"** 선택

5. 재배포 완료 대기

---

### **7단계: 테스트 데이터 추가**

D1 Console로 돌아가서 샘플 데이터 추가:

```sql
-- 샘플 데이터 1건 (2025-12)
INSERT INTO fda_approvals (
  approval_month, approval_date, nda_bla_number, product_name, 
  sponsor, indication, therapeutic_area, is_oncology, 
  is_novel, is_biosimilar, is_orphan, approval_type, 
  source, data_collection_date
) VALUES (
  '2025-12', '2025-12-05', 'BLA125486', 'BREYANZI', 
  'Bristol Myers Squibb', '재발성 또는 불응성 변연부 림프종(MZL) 성인 환자 치료', 
  '항암제 - 림프종', 'Y', 'N', 'N', 'Y', '정규승인', 
  'FDA Official', '2026-01-26'
);

-- 샘플 데이터 2건 (2026-01)
INSERT INTO fda_approvals (
  approval_month, approval_date, nda_bla_number, product_name, 
  sponsor, indication, therapeutic_area, is_oncology, 
  is_novel, is_biosimilar, is_orphan, approval_type, 
  source, data_collection_date
) VALUES 
(
  '2026-01', '2026-01-20', 'NDA022211', 'ZIRGAN', 
  'BAUSCH AND LOMB', 'Treatment of cytomegalovirus (CMV) retinitis', 
  'Cytomegalovirus Nucleoside Analog DNA Polymerase Inhibitor', 'N', 
  'N', 'N', 'Y', '정규승인', 'FDA Official', '2026-01-26'
),
(
  '2026-01', '2026-01-16', 'BLA761269', 'LEQEMBI', 
  'EISAI INC', 'Alzheimer disease in adults', 
  'Amyloid Beta-directed Antibody', 'N', 'Y', 'N', 'N', 
  '신속승인', 'FDA Official', '2026-01-26'
);

-- 데이터 확인
SELECT COUNT(*) as total, approval_month 
FROM fda_approvals 
GROUP BY approval_month;
```

---

### **8단계: 배포 확인**

1. **프로덕션 URL 접속**:
   ```
   https://fda-dashboard.pages.dev
   ```

2. **확인 사항**:
   - ✅ 대시보드 로딩
   - ✅ 요약 카드: 총 3건 (샘플 데이터)
   - ✅ 차트 표시
   - ✅ 테이블에 데이터 표시
   - ✅ 필터 작동 (2025-12, 2026-01 선택 가능)

---

## 📊 전체 48건 데이터 임포트 (선택사항)

샘플 데이터로 테스트 완료 후, 전체 데이터를 임포트하려면:

### **방법 1: 기존 seed.sql 사용**

1. `/home/user/webapp/seed.sql` 파일 내용 복사
2. D1 Console에 붙여넣기
3. Execute

### **방법 2: 개별 업로드**

매월 새로운 FDA 승인 데이터를 받으면:
1. 엑셀을 JSON으로 변환
2. 대시보드의 "데이터 관리" 탭 사용
3. 파일 업로드 → 자동으로 D1에 저장

---

## 🔧 문제 해결

### **대시보드가 비어있음**
→ D1 바인딩 확인 (변수명: `DB`)
→ 재배포 수행

### **500 에러**
→ D1 Console에서 테이블 존재 확인
→ 데이터 최소 1건 추가

### **필터가 작동하지 않음**
→ 브라우저 강력 새로고침 (Ctrl+Shift+R)
→ 데이터가 충분한지 확인 (최소 2개월 필요)

---

## ✅ 배포 완료 체크리스트

- [ ] D1 데이터베이스 스키마 생성
- [ ] Pages 프로젝트 생성
- [ ] dist 폴더 업로드
- [ ] D1 바인딩 설정 (변수명: DB)
- [ ] 재배포
- [ ] 테스트 데이터 추가
- [ ] 프로덕션 URL 접속 확인
- [ ] 대시보드 기능 테스트

---

## 🌐 배포 후 URL

**프로덕션**: https://fda-dashboard.pages.dev
**커스텀 도메인**: (선택사항) Settings → Custom domains

---

## 📝 다음 단계

1. ✅ 전체 48건 데이터 임포트
2. ✅ 커스텀 도메인 연결
3. ✅ GitHub 연동 (자동 배포)
4. ✅ 월별 데이터 자동 업데이트 설정

---

배포 중 문제가 있으면 언제든 알려주세요! 🚀
