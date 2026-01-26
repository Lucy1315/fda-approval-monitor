# FDA 승인 대시보드

## 프로젝트 개요
- **이름**: FDA 승인 대시보드
- **목표**: 2026년 1월 FDA 전문의약품 승인 현황을 시각화하고 분석하는 대시보드
- **주요 기능**:
  - 📊 실시간 승인 통계 요약 (전체, 항암제, 신약, 바이오시밀러, 희귀의약품)
  - 📈 치료영역별 분포 차트 (도넛 차트)
  - 📊 제약사별 승인 건수 차트 (막대 차트)
  - 📋 승인 목록 테이블 (페이지네이션)
  - 🔍 제품명/주성분/제약사 검색 기능
  - 🎯 복합 조건 필터링
  - 📱 반응형 디자인 (모바일/태블릿/데스크톱)

## 공개 URL
- **대시보드**: https://3000-ijnyl7bekjyhth108ssjb-de59bda9.sandbox.novita.ai
- **GitHub**: (배포 예정)

## 기술 스택
- **Backend**: Hono v4 (Lightweight Web Framework)
- **Database**: Cloudflare D1 (SQLite)
- **Frontend**: Vanilla JavaScript + TailwindCSS + Chart.js
- **Deployment**: Cloudflare Pages
- **Process Manager**: PM2

## 데이터 아키텍처

### 데이터베이스 스키마 (D1 SQLite)
```sql
CREATE TABLE fda_approvals (
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
```

### 데이터 모델
- **전체 승인**: 29건
- **항암제**: 0건
- **신약**: 1건
- **바이오시밀러**: 3건
- **희귀의약품**: 5건

### 데이터 소스
- FDA Official + Drugs.com + ASCO
- 데이터 수집일: 2026-01-26

## API 엔드포인트

### 대시보드 통계
```bash
# 요약 통계
GET /api/dashboard/summary
# Response: { total, oncology, novel, biosimilar, orphan }

# 치료영역별 분포
GET /api/dashboard/therapeutic-area
# Response: [{ therapeutic_area, count }, ...]

# 제약사별 승인 건수
GET /api/dashboard/sponsors?limit=10
# Response: [{ sponsor, count }, ...]

# 월별 승인 추이
GET /api/dashboard/monthly-trend
# Response: [{ approval_month, count }, ...]

# 승인 유형별 분포
GET /api/dashboard/approval-types
# Response: [{ approval_type, count }, ...]
```

### 승인 데이터 조회
```bash
# 전체 목록 (페이지네이션)
GET /api/approvals?page=1&limit=20
# Response: { data: [...], pagination: { page, limit, total, totalPages } }

# 상세 정보
GET /api/approvals/:id
# Response: { id, product_name, sponsor, ... }

# 검색
GET /api/approvals/search/:query
# Response: [{ ... }, ...]

# 필터링
POST /api/approvals/filter
# Body: { therapeutic_area, is_oncology, is_novel, is_biosimilar, sponsor }
# Response: [{ ... }, ...]
```

## 사용자 가이드

### 대시보드 기능
1. **요약 통계 카드**: 메인 화면 상단에서 전체 승인 건수 및 주요 카테고리별 통계 확인
2. **차트**:
   - 치료영역별 분포: 도넛 차트로 시각화
   - 제약사별 승인 건수: 막대 차트로 Top 10 표시
3. **승인 목록 테이블**:
   - 페이지네이션으로 20개씩 표시
   - 검색창에서 제품명, 주성분, 제약사, 적응증 검색
   - 상세 버튼 클릭 시 모달로 전체 정보 표시
4. **뱃지**: 항암제, 신약, 바이오시밀러, 희귀의약품 시각적 표시

### 로컬 개발 환경 설정
```bash
# 1. 의존성 설치 (이미 완료됨)
npm install

# 2. 데이터베이스 마이그레이션
npm run db:migrate:local

# 3. 데이터 시드
npm run db:seed

# 4. 빌드
npm run build

# 5. 개발 서버 시작 (PM2)
pm2 start ecosystem.config.cjs

# 6. 서버 테스트
curl http://localhost:3000/api/dashboard/summary

# 7. 데이터베이스 리셋 (필요시)
npm run db:reset
```

### 프로덕션 배포

#### Cloudflare Pages 배포
```bash
# 1. Cloudflare API 키 설정
# setup_cloudflare_api_key 도구 사용 또는 Deploy 탭에서 설정

# 2. 프로덕션 D1 데이터베이스 생성
npx wrangler d1 create webapp-production
# database_id를 wrangler.jsonc에 입력

# 3. 마이그레이션 실행 (프로덕션)
npm run db:migrate:prod

# 4. 데이터 임포트 (프로덕션)
# seed.sql을 수정하여 프로덕션 데이터로 업데이트 후
npx wrangler d1 execute webapp-production --file=./seed.sql

# 5. Cloudflare Pages 프로젝트 생성
npx wrangler pages project create webapp \
  --production-branch main \
  --compatibility-date 2024-01-01

# 6. 배포
npm run deploy:prod
```

## 프로젝트 구조
```
webapp/
├── src/
│   └── index.tsx              # Hono 백엔드 API
├── public/
│   └── static/
│       └── app.js             # 프론트엔드 JavaScript
├── migrations/
│   └── 0001_create_fda_table.sql  # D1 마이그레이션
├── scripts/
│   └── import_excel_to_d1.py  # 엑셀 → SQL 변환 스크립트
├── seed.sql                   # 초기 데이터 (29건)
├── ecosystem.config.cjs       # PM2 설정
├── wrangler.jsonc             # Cloudflare 설정
├── package.json               # NPM 스크립트
└── README.md                  # 이 파일
```

## 완료된 기능
✅ Hono + Cloudflare Pages 프로젝트 구조  
✅ D1 데이터베이스 스키마 및 마이그레이션  
✅ 엑셀 데이터 임포트 (29건)  
✅ RESTful API 엔드포인트 (8개)  
✅ 대시보드 요약 통계 API  
✅ 치료영역별/제약사별 차트 데이터 API  
✅ 승인 목록 조회 (페이지네이션)  
✅ 검색 및 필터링 기능  
✅ Chart.js 기반 시각화 (도넛 차트, 막대 차트)  
✅ 반응형 UI (TailwindCSS)  
✅ 상세 정보 모달  
✅ 로컬 개발 서버 테스트  

## 향후 개선 사항
- [ ] GitHub 저장소 연동 및 코드 푸시
- [ ] Cloudflare Pages 프로덕션 배포
- [ ] 월별/연도별 필터링 기능
- [ ] 데이터 익스포트 기능 (CSV, Excel)
- [ ] 고급 검색 필터 (다중 조건)
- [ ] 승인 추이 라인 차트
- [ ] 사용자 인증 및 권한 관리
- [ ] 데이터 자동 업데이트 (FDA API 연동)

## 배포 상태
- **플랫폼**: Cloudflare Pages (준비 중)
- **현재 상태**: ✅ 로컬 개발 완료
- **마지막 업데이트**: 2026-01-26

## 라이선스
MIT License

## 작성자
AI-powered Development with Hono + Cloudflare Pages
