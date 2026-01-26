# FDA 승인 대시보드

## 📊 프로젝트 개요
- **이름**: FDA 승인 대시보드
- **목표**: FDA 전문의약품 승인 데이터의 시각화 및 관리
- **주요 기능**: 월별 데이터 누적, 고급 필터링, 버전 관리, 되돌리기

## 🌐 접속 정보
- **대시보드**: https://3000-ijnyl7bekjyhth108ssjb-de59bda9.sandbox.novita.ai
- **GitHub**: (추후 연동 예정)

## 📈 현재 데이터 현황
- **총 레코드**: 48건
  - 2025년 12월: 19건
  - 2026년 1월: 29건
- **항암제**: 8건
- **신약**: 9건  
- **바이오시밀러**: 6건
- **희귀의약품**: 14건

## 🗄️ 데이터 아키텍처

### 데이터 모델
```sql
-- 주요 테이블: fda_approvals (FDA 승인 데이터)
CREATE TABLE fda_approvals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  approval_month TEXT,           -- 승인 월 (YYYY-MM)
  approval_date TEXT,             -- 승인일
  nda_bla_number TEXT,            -- NDA/BLA 번호
  product_name TEXT,              -- 제품명
  sponsor TEXT,                   -- 제약사
  indication TEXT,                -- 적응증
  therapeutic_area TEXT,          -- 치료영역
  is_oncology TEXT,               -- 항암제 여부 (Y/N)
  is_novel TEXT,                  -- 신약 여부 (Y/N)
  is_biosimilar TEXT,             -- 바이오시밀러 여부 (Y/N)
  is_orphan TEXT,                 -- 희귀의약품 여부 (Y/N)
  ...
)

-- 버전 관리: data_versions (버전 히스토리)
-- 백업 데이터: fda_approvals_backup (복원용)
```

### 저장소 서비스
- **Cloudflare D1**: SQLite 기반 분산 데이터베이스
- **로컬 개발**: `.wrangler/state/v3/d1` (로컬 SQLite)

### 데이터 플로우
1. **엑셀 업로드** → Python 스크립트로 JSON 변환
2. **API 업로드** → 자동 백업 생성 → 데이터 추가 (APPEND)
3. **데이터 조회** → 필터링 (월/치료영역/제약사 등)
4. **버전 관리** → 언제든 이전 버전으로 복원 가능

## 🎯 핵심 기능

### 1. 월별 데이터 누적 (APPEND 방식)
- **기존 데이터 유지**: 새로운 월 데이터를 업로드하면 기존 데이터에 추가
- **중복 방지**: 동일한 `approval_month` + `nda_bla_number` 조합은 업데이트
- **예시**: 12월 데이터(19건) 보유 → 1월 데이터(29건) 업로드 → 총 48건

### 2. 고급 필터링
- **승인 월**: 전체 / 2025-12 / 2026-01 등
- **치료영역**: 항암제, 당뇨병 치료제 등
- **제약사**: 특정 제약사 선택
- **승인 유형**: 정규승인, 신속승인 등
- **구분**: 항암제 / 신약 / 바이오시밀러 / 희귀의약품

### 3. 버전 관리 및 되돌리기
- **자동 백업**: 새 데이터 업로드 전 자동 백업 생성
- **버전 히스토리**: 모든 업로드 기록 보관
- **원클릭 복원**: 이전 버전으로 언제든 되돌리기 가능

### 4. 데이터 관리 탭
- **엑셀 업로드**: 웹 UI를 통한 쉬운 데이터 업로드
- **버전 정보 입력**: 버전명, 월, 설명 입력
- **업로드 상태**: 진행 상황 실시간 표시

## 👥 사용자 가이드

### 새로운 월 데이터 업로드 (웹 UI)
1. 대시보드 접속 → **데이터 관리** 탭 클릭
2. 엑셀 파일 선택 (FDA 승인 데이터)
3. 버전 정보 입력:
   - 버전명: 예) "2026년 2월 FDA 승인"
   - 승인 월: 예) "2026-02"
   - 설명: 선택사항
4. **업로드** 버튼 클릭
5. 업로드 완료 후 대시보드 탭에서 확인

### 새로운 월 데이터 업로드 (API)
```bash
# 1. 엑셀을 JSON으로 변환
python3 scripts/convert_excel.py input.xlsx output.json

# 2. API로 업로드
curl -X POST http://localhost:3000/api/data/upload \
  -H "Content-Type: application/json" \
  -d '{
    "data": [...],
    "version_name": "2026년 2월 FDA 승인",
    "month": "2026-02",
    "description": "2026년 2월 데이터"
  }'
```

### 필터 사용법
1. **대시보드** 탭의 필터 섹션
2. 원하는 조건 선택:
   - 승인 월: "전체" 선택 시 모든 월 조회
   - 치료영역, 제약사, 승인 유형 등 조합 가능
3. **필터 적용** 버튼 클릭
4. 결과 확인 및 필요 시 **초기화**

### 데이터 되돌리기
1. **버전 관리** 탭 클릭
2. 버전 히스토리에서 복원할 버전 선택
3. **되돌리기** 버튼 클릭
4. 확인 후 대시보드에서 데이터 확인

### 현재 데이터 백업
1. **데이터 관리** 탭 → **현재 데이터 백업** 섹션
2. 백업 정보 입력 (버전명, 월, 설명)
3. **백업** 버튼 클릭

## 🚀 배포 정보
- **플랫폼**: Cloudflare Pages
- **상태**: ✅ 개발 서버 실행 중
- **기술 스택**: 
  - Backend: Hono (TypeScript)
  - Frontend: Vanilla JS + TailwindCSS + Chart.js
  - Database: Cloudflare D1 (SQLite)
  - Deployment: Cloudflare Workers
- **마지막 업데이트**: 2026-01-26

## 📋 API 엔드포인트

### 대시보드 통계
- `GET /api/dashboard/summary` - 요약 통계
- `GET /api/dashboard/therapeutic-area` - 치료영역별 분포
- `GET /api/dashboard/sponsors` - 제약사별 승인 건수
- `GET /api/dashboard/monthly-trend` - 월별 트렌드
- `GET /api/dashboard/approval-types` - 승인 유형별 분포

### 데이터 조회
- `GET /api/approvals?page=1&limit=20` - 승인 목록 (페이지네이션)
- `GET /api/approvals/:id` - 상세 정보
- `GET /api/approvals/search/:query` - 검색
- `POST /api/approvals/filter` - 필터링

### 필터 옵션
- `GET /api/filters/options` - 필터 옵션 조회

### 버전 관리
- `GET /api/versions` - 버전 히스토리 조회
- `POST /api/versions/backup` - 수동 백업 생성
- `POST /api/versions/restore/:versionId` - 버전 복원

### 데이터 업로드
- `POST /api/data/upload` - 새 데이터 업로드 (APPEND 방식)

## 💻 개발 명령어

### 서버 관리
```bash
npm run build              # 프로젝트 빌드
pm2 start ecosystem.config.cjs  # PM2로 서버 시작
pm2 restart webapp         # 서버 재시작
pm2 logs webapp --nostream # 로그 확인
pm2 list                   # PM2 앱 목록
npm run test               # API 테스트 (curl)
```

### 데이터베이스
```bash
npm run db:migrate:local   # 로컬 마이그레이션 적용
npm run db:seed            # 시드 데이터 삽입
npm run db:reset           # DB 초기화 및 재구성
npm run db:console:local   # 로컬 DB 콘솔
```

### Git 명령어
```bash
git add -A                 # 모든 변경사항 추가
git commit -m "메시지"     # 커밋
git log --oneline          # 커밋 히스토리
git status                 # 상태 확인
```

## 🔄 변경 이력

### 2026-01-26 - 월별 데이터 누적 기능
- **기능 개선**: 데이터 업로드 방식을 덮어쓰기 → 누적(APPEND)으로 변경
- **중복 방지**: 동일 월+NDA/BLA 번호는 업데이트
- **필터 개선**: "전체" 옵션으로 모든 월 데이터 조회 가능
- **데이터 현황**: 2025-12 (19건) + 2026-01 (29건) = 총 48건

### 2026-01-26 - 초기 배포
- Hono + Cloudflare Pages 프로젝트 구조
- D1 데이터베이스 스키마 및 마이그레이션
- RESTful API 엔드포인트 (13개)
- Chart.js 기반 대시보드 UI
- 검색 및 필터링 기능
- 반응형 디자인

## 📝 TODO

### 진행 중
- [ ] 월별 통계 차트 추가
- [ ] 데이터 엑스포트 (Excel, CSV)
- [ ] GitHub 연동 및 자동 배포

### 계획
- [ ] Cloudflare Pages 프로덕션 배포
- [ ] 고급 검색 (정규식 지원)
- [ ] 사용자 인증 (선택사항)
- [ ] 알림 기능 (새 승인 알림)

## 🤝 기여
프로젝트 개선 제안이나 버그 리포트는 이슈로 등록해 주세요.

## 📄 라이선스
MIT License
