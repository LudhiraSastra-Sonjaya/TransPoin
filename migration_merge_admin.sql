-- ============================================================
-- TransPoin Migration Script — Merge Tabel Admin ke Users
-- Jalankan script ini SEKALI sebelum restart aplikasi
-- ============================================================

-- 1. Tambahkan kolom role ke tabel users (jika belum ada)
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS role VARCHAR(10) NOT NULL DEFAULT 'USER';

-- 2. Set semua user existing ke role USER
UPDATE users SET role = 'USER' WHERE role IS NULL OR role = '';

-- 3. Migrasikan data admin ke tabel users dengan role ADMIN
--    (lewati jika email admin sudah ada di tabel users)
INSERT INTO users (nama, email, password, total_poin, role)
SELECT nama, email, password, 0, 'ADMIN'
FROM admin
WHERE email NOT IN (SELECT email FROM users);

-- 4. (Opsional) Konfirmasi data yang dimigrasikan
-- SELECT * FROM users WHERE role = 'ADMIN';

-- 5. (Opsional) Hapus tabel admin lama setelah konfirmasi
-- DROP TABLE IF EXISTS admin;

-- ============================================================
-- Catatan:
-- - Kolom admin_id di tabel perjalanan dan layanan tetap ada
--   dan sekarang mereferensikan id dari tabel users (role=ADMIN)
-- - Pastikan ddl-auto di application.properties adalah 'update'
--   agar Hibernate otomatis tambah kolom role ke tabel users
-- ============================================================
