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
CREATE INDEX IF NOT EXISTS idx_is_novel ON fda_approvals(is_novel);
CREATE INDEX IF NOT EXISTS idx_is_biosimilar ON fda_approvals(is_biosimilar);
CREATE INDEX IF NOT EXISTS idx_approval_month ON fda_approvals(approval_month);
