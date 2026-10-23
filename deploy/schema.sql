-- Table des demandes du formulaire de contact (à importer via phpMyAdmin).
-- Reprend les colonnes de packages/web/src/api/database/schema.ts.
CREATE TABLE IF NOT EXISTS contact_submissions (
  id CHAR(32) NOT NULL PRIMARY KEY,
  subject VARCHAR(20) NOT NULL,
  name VARCHAR(120) NOT NULL,
  organization VARCHAR(160) NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NULL,
  location VARCHAR(160) NULL,
  message TEXT NOT NULL,
  how_heard VARCHAR(80) NULL,
  created_at DATETIME NOT NULL,
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
