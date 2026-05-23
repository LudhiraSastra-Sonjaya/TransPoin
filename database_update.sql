-- ============================================================
-- TransPoin Database Update Script
-- Jalankan ini jika menggunakan ddl-auto=none atau validate
-- Jika ddl-auto=update, Hibernate akan otomatis update schema
-- ============================================================

-- Tabel Halte (BARU)
CREATE TABLE IF NOT EXISTS halte (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nama_halte VARCHAR(255) NOT NULL,
    alamat VARCHAR(500),
    latitude DOUBLE,
    longitude DOUBLE,
    aktif BOOLEAN DEFAULT TRUE
);

-- Update tabel perjalanan
-- Hapus kolom lama (jika ada)
-- ALTER TABLE perjalanan DROP COLUMN IF EXISTS asal;
-- ALTER TABLE perjalanan DROP COLUMN IF EXISTS tujuan;

-- Tambah kolom baru
ALTER TABLE perjalanan 
    ADD COLUMN IF NOT EXISTS halte_asal_id BIGINT,
    ADD COLUMN IF NOT EXISTS halte_tujuan_id BIGINT,
    ADD COLUMN IF NOT EXISTS bukti_perjalanan VARCHAR(500),
    ADD COLUMN IF NOT EXISTS catatan TEXT,
    ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'PENDING';

-- Foreign keys
ALTER TABLE perjalanan 
    ADD CONSTRAINT IF NOT EXISTS fk_perjalanan_halte_asal 
    FOREIGN KEY (halte_asal_id) REFERENCES halte(id);

ALTER TABLE perjalanan 
    ADD CONSTRAINT IF NOT EXISTS fk_perjalanan_halte_tujuan 
    FOREIGN KEY (halte_tujuan_id) REFERENCES halte(id);

-- Contoh data halte awal
INSERT INTO halte (nama_halte, alamat, latitude, longitude, aktif) VALUES
('Halte Sudirman', 'Jl. Jend. Sudirman, Jakarta Pusat', -6.2088, 106.8456, true),
('Halte Blok M', 'Jl. Melawai, Kebayoran Baru, Jakarta Selatan', -6.2441, 106.7991, true),
('Halte Harmoni', 'Jl. Gajah Mada, Jakarta Pusat', -6.1659, 106.8175, true),
('Halte Kampung Melayu', 'Jl. Jatinegara Barat, Jakarta Timur', -6.2167, 106.8667, true),
('Halte Dukuh Atas', 'Jl. Jend. Sudirman, Jakarta Pusat', -6.2009, 106.8228, true);
