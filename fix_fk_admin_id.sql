-- ============================================================
-- TransPoin Fix — Foreign Key admin_id HARUS dijalankan di
-- MySQL / phpMyAdmin / DBeaver / MySQL Workbench
-- ============================================================
-- 
-- ROOT CAUSE:
--   Kolom admin_id di tabel `perjalanan` dan `layanan` masih
--   mereferensikan tabel `admin` (lama), bukan tabel `users`.
--   Setelah migrasi merge admin→users, constraint FK belum diupdate.
--
-- CARA PAKAI:
--   1. Buka phpMyAdmin / MySQL Workbench / DBeaver
--   2. Pilih database: transpoin
--   3. Jalankan SATU PER SATU tiap blok di bawah ini
-- ============================================================

USE transpoin;

-- ============================================================
-- BAGIAN A: Fix tabel PERJALANAN
-- ============================================================

-- A1. Cek constraint FK yang ada di kolom admin_id tabel perjalanan
SELECT CONSTRAINT_NAME, REFERENCED_TABLE_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME   = 'perjalanan'
  AND COLUMN_NAME  = 'admin_id';
-- Hasil: catat CONSTRAINT_NAME-nya (misal: FKr6i1ura1cklbt5ho3sg886gup)

-- A2. Drop FK lama (ganti nama jika berbeda)
ALTER TABLE perjalanan
    DROP FOREIGN KEY FKr6i1ura1cklbt5ho3sg886gup;

-- A3. Pastikan kolom admin_id nullable (perjalanan baru belum ada admin)
ALTER TABLE perjalanan
    MODIFY COLUMN admin_id BIGINT NULL;

-- A4. Tambah FK baru → users
ALTER TABLE perjalanan
    ADD CONSTRAINT fk_perjalanan_admin_users
    FOREIGN KEY (admin_id) REFERENCES users(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

-- ============================================================
-- BAGIAN B: Fix tabel LAYANAN (jika ada error serupa)
-- ============================================================

-- B1. Cek constraint FK admin_id di tabel layanan
SELECT CONSTRAINT_NAME, REFERENCED_TABLE_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME   = 'layanan'
  AND COLUMN_NAME  = 'admin_id';

-- B2. Drop FK lama layanan (ganti nama constraint sesuai hasil B1)
-- ALTER TABLE layanan DROP FOREIGN KEY <NAMA_DARI_HASIL_B1>;

-- B3. Pastikan nullable
ALTER TABLE layanan
    MODIFY COLUMN admin_id BIGINT NULL;

-- B4. Tambah FK baru → users
ALTER TABLE layanan
    ADD CONSTRAINT fk_layanan_admin_users
    FOREIGN KEY (admin_id) REFERENCES users(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

-- ============================================================
-- VERIFIKASI: Pastikan semua admin_id sekarang → users
-- ============================================================
SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND COLUMN_NAME  = 'admin_id';
-- Semua REFERENCED_TABLE_NAME harus = 'users' (bukan 'admin')
