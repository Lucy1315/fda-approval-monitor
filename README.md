# FDA 전문의약품 승인 대시보드

## 프로젝트 개요
- **프로젝트명**: FDA 전문의약품 승인 대시보드
- **목적**: 2026년 1월 FDA 승인 의약품 현황을 시각화하여 제공
- **주요 기능**: 
  - 승인 통계 요약 (전체, 항암제, 신약, 바이오시밀러, 희귀의약품)
  - 치료영역별 분포 시각화
  - 제약사별 승인 건수 차트
  - 승인 목록 조회 및 검색
  - RESTful API 제공

## URL 정보
- **개발 서버**: https://3000-ijnyl7bekjyhth108ssjb-de59bda9.sandbox.novita.ai
- **API 문서**: 아래 API 엔드포인트 참조

## 기술 스택
- **백엔드**: Hono Framework (TypeScript)
- **데이터베이스**: Cloudflare D1 (SQLite)
- **프론트엔드**: Vanilla JavaScript + TailwindCSS + Chart.js
- **배포**: Cloudflare Pages + Workers
- **프로세스 관리**: PM2

## 데이터 아키텍처

### 데이터 모델
```sql
fda_approvals (
  id, approval_month, approval_date, nda_bla_number,
  application_number, application_type, product_name,
  active_ingredient, sponsor, indication, therapeutic_area,
  is_oncology, is_biosimilar, is_novel, is_orphan,
  approval_type, remarks, fda_approval_page, fda_drugs_url,
  approval_letter, source, data_collection_date, created_at
)
```

### 스토리지 서비스
- **Cloudflare D1**: 34개 FDA 승인 레코드 저장
- **로컬 개발**: `.wrangler/state/v3/d1` 디렉토리의 로컬 SQLite

### 데이터 플로우
1. 엑셀 파일 → Python 스크립트 → SQL 파일 생성
2. SQL 파일 → D1 Database 임포트
3. Hono API → D1 쿼리 → JSON 응답
4. 프론트엔드 → Chart.js 시각화

## API 엔드포인트

### 📊 대시보드 통계
- `GET /api/dashboard/summary` - 요약 통계 (전체, 항암제, 신약 등)
- `GET /api/dashboard/therapeutic-area` - 치료영역별 분포
- `GET /api/dashboard/sponsors?limit=10` - 제약사별 승인 건수
- `GET /api/dashboard/monthly-trend` - 월별 승인 추이

### 📋 승인 목록
- `GET /api/approvals?page=1&limit=20` - 승인 목록 (페이지네이션)
- `GET /api/approvals/:id` - 승인 상세 정보
- `GET /api/approvals/search?q=keyword` - 검색 (제품명, 주성분, 제약사)
- `POST /api/approvals/filter` - 필터링 (복합 조건)

### API 응답 예시
```json
{
  "success": true,
  "data": {
    "total": 34,
    "oncology": 0,
    "novel": 1,
    "biosimilar": 3,
    "orphan": 5
  }
}
```

## 사용자 가이드

### 대시보드 사용법
1. **메인 페이지 접속**: 브라우저에서 URL 열기
2. **요약 통계 확인**: 상단 5개 카드에서 전체 현황 파악
3. **차트 분석**: 
   - 좌측: 치료영역별 분포 (파이 차트)
   - 우측: 제약사별 승인 건수 (막대 차트)
4. **승인 목록 확인**: 하단 테이블에서 최근 승인 20건 조회
5. **배지 확인**: 항암제, 신약, 바이오시밀러, 희귀의약품 배지로 특성 파악

### API 사용법
```bash
# 요약 통계 조회
curl https://your-domain/api/dashboard/summary

# 승인 목록 조회
curl https://your-domain/api/approvals?page=1&limit=10

# 검색
curl https://your-domain/api/approvals/search?q=LEQEMBI
```

## 로컬 개발 가이드

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 데이터베이스 마이그레이션
npm run db:migrate:local

# 데이터 임포트
python3 scripts/import_excel_to_d1.py
npm run db:seed

# 프로젝트 빌드
npm run build

# 개발 서버 시작 (PM2)
pm2 start ecosystem.config.cjs

# 로그 확인
pm2 logs webapp --nostream

# 서버 테스트
curl http://localhost:3000/api/dashboard/summary
```

### 데이터베이스 관리
```bash
# 데이터베이스 리셋
npm run db:reset

# 로컬 DB 콘솔
npm run db:console:local

# 레코드 수 확인
npx wrangler d1 execute webapp-production --local \
  --command="SELECT COUNT(*) as total FROM fda_approvals"
```

## 배포 상태
- **플랫폼**: Cloudflare Pages (준비 완료)
- **상태**: ✅ 로컬 개발 완료 / ⏳ 프로덕션 배포 대기
- **마지막 업데이트**: 2026-01-26

## 현재 완료된 기능
✅ D1 데이터베이스 스키마 설계 및 마이그레이션  
✅ 엑셀 데이터 임포트 (34건)  
✅ RESTful API 8개 엔드포인트 구현  
✅ 대시보드 UI (요약 통계, 차트, 테이블)  
✅ 로컬 개발 서버 실행 및 검증  
✅ PM2 프로세스 관리 설정  

## 현재 미완성 기능
⏳ 검색 기능 UI  
⏳ 필터링 기능 UI  
⏳ 페이지네이션 UI  
⏳ 상세 페이지 모달  
⏳ 프로덕션 배포  

## 추천 다음 단계
1. **검색/필터 UI 추가**: 사용자가 제품명, 제약사로 검색 가능
2. **페이지네이션**: 승인 목록에 페이지 이동 버튼 추가
3. **상세 모달**: 클릭 시 승인 상세 정보 표시
4. **Cloudflare Pages 배포**: 프로덕션 환경 배포
5. **반응형 개선**: 모바일 최적화
6. **데이터 업데이트**: 월별 FDA 데이터 자동 업데이트

## 프로젝트 구조
```
webapp/
├── src/
│   └── index.tsx              # Hono 백엔드 API
├── public/
│   └── static/
│       └── app.js             # 프론트엔드 JavaScript
├── migrations/
│   └── 0001_create_fda_table.sql
├── scripts/
│   └── import_excel_to_d1.py  # 데이터 임포트 스크립트
├── seed.sql                   # 초기 데이터 (34건)
├── ecosystem.config.cjs       # PM2 설정
├── wrangler.jsonc             # Cloudflare 설정
└── package.json               # 의존성 및 스크립트
```

## 데이터 출처
- **FDA Official**: https://www.accessdata.fda.gov/scripts/cder/daf/
- **Drugs.com**: https://www.drugs.com/
- **수집 기간**: 2026년 1월
- **수집일**: 2026-01-26
- **총 레코드**: 34건

## 라이선스
이 프로젝트는 FDA 공식 데이터를 기반으로 하며, 정보 제공 목적으로만 사용됩니다.
