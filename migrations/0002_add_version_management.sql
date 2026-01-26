-- 데이터 버전 관리 테이블
CREATE TABLE IF NOT EXISTS data_versions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version_name TEXT NOT NULL,
  month TEXT NOT NULL,
  record_count INTEGER NOT NULL,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_active INTEGER DEFAULT 1,
  description TEXT
);

-- 데이터 스냅샷 테이블 (백업용)
CREATE TABLE IF NOT EXISTS fda_approvals_backup (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version_id INTEGER NOT NULL,
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
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (version_id) REFERENCES data_versions(id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_version_active ON data_versions(is_active);
CREATE INDEX IF NOT EXISTS idx_backup_version ON fda_approvals_backup(version_id);
