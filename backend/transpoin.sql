-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               9.7.0 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for transpoin
DROP DATABASE IF EXISTS `transpoin`;
CREATE DATABASE IF NOT EXISTS `transpoin` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `transpoin`;

-- Dumping structure for table transpoin.admin
DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table transpoin.admin: ~0 rows (approximately)
INSERT INTO `admin` (`id`, `email`, `nama`, `password`) VALUES
	(1, 'admin@transpoin.com', 'Admin TransPoin', 'admin123');

-- Dumping structure for table transpoin.feedback
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE IF NOT EXISTS `feedback` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `komentar` varchar(255) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `status` enum('PENDING','DIPROSES','SELESAI') DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `perjalanan_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKndflexeqv717povu4ojjdi5re` (`perjalanan_id`),
  KEY `FKpwwmhguqianghvi1wohmtsm8l` (`user_id`),
  CONSTRAINT `FKndflexeqv717povu4ojjdi5re` FOREIGN KEY (`perjalanan_id`) REFERENCES `perjalanan` (`id`),
  CONSTRAINT `FKpwwmhguqianghvi1wohmtsm8l` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table transpoin.feedback: ~2 rows (approximately)
INSERT INTO `feedback` (`id`, `komentar`, `rating`, `status`, `tanggal`, `perjalanan_id`, `user_id`) VALUES
	(1, 'Tukang Trnas Metro nya sedikit ugal ugalan, untuk plat nya itu D 1234 UPI', 4, 'SELESAI', '2026-05-05', 1, 2),
	(2, 'GACOR KINGG!!', 5, 'SELESAI', '2026-05-16', 7, 1);

-- Dumping structure for table transpoin.halte
DROP TABLE IF EXISTS `halte`;
CREATE TABLE IF NOT EXISTS `halte` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `aktif` bit(1) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `nama_halte` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table transpoin.halte: ~2 rows (approximately)
INSERT INTO `halte` (`id`, `aktif`, `alamat`, `latitude`, `longitude`, `nama_halte`) VALUES
	(1, b'1', 'Jalan Merdeka No. 56, Kelurahan Citarum, Kecamatan Bandung Wetan, Kota Bandung', -6.911972, 107.6105, 'Halte Merdeka'),
	(2, b'1', 'Jl. Soekarno Hatta No.205 (atau Jl. Raya Sawahan No.283), Kelurahan Situsaeur, Kecamatan Bojongloa Kidul, Kota Bandung, Jawa Barat 40235.', -6.9453, 107.5938, 'Leuwipanjang');

-- Dumping structure for table transpoin.layanan
DROP TABLE IF EXISTS `layanan`;
CREATE TABLE IF NOT EXISTS `layanan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `deskripsi` varchar(255) DEFAULT NULL,
  `jenis` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','DIPROSES','SELESAI') DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `admin_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKs3tjxs30769i8lapchoo942ls` (`user_id`),
  KEY `fk_layanan_admin_users` (`admin_id`),
  CONSTRAINT `fk_layanan_admin_users` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FKs3tjxs30769i8lapchoo942ls` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table transpoin.layanan: ~1 rows (approximately)
INSERT INTO `layanan` (`id`, `deskripsi`, `jenis`, `status`, `tanggal`, `admin_id`, `user_id`) VALUES
	(1, 'Coba ini bus nya dibanyakin', 'Pengaduan', 'SELESAI', '2026-05-05', NULL, 2);

-- Dumping structure for table transpoin.penukaran
DROP TABLE IF EXISTS `penukaran`;
CREATE TABLE IF NOT EXISTS `penukaran` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` enum('MENUNGGU','BERHASIL','DITOLAK') DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `reward_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKtxbkopful53600dmih5h74yy` (`reward_id`),
  KEY `FKe08bcqqu2qxkb8kjd397b81qp` (`user_id`),
  CONSTRAINT `FKe08bcqqu2qxkb8kjd397b81qp` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKtxbkopful53600dmih5h74yy` FOREIGN KEY (`reward_id`) REFERENCES `reward` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table transpoin.penukaran: ~3 rows (approximately)
INSERT INTO `penukaran` (`id`, `status`, `tanggal`, `reward_id`, `user_id`) VALUES
	(2, 'BERHASIL', '2026-05-16', 2, 1),
	(3, 'BERHASIL', '2026-05-23', 2, 1),
	(4, 'BERHASIL', '2026-05-30', 3, 1);

-- Dumping structure for table transpoin.perjalanan
DROP TABLE IF EXISTS `perjalanan`;
CREATE TABLE IF NOT EXISTS `perjalanan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `asal` varchar(255) DEFAULT NULL,
  `jarak` double DEFAULT NULL,
  `poin_didapat` int DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `tujuan` varchar(255) DEFAULT NULL,
  `admin_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `bukti_perjalanan` varchar(255) DEFAULT NULL,
  `catatan` varchar(255) DEFAULT NULL,
  `status` enum('PENDING','APPROVED','REJECTED') DEFAULT NULL,
  `halte_asal_id` bigint DEFAULT NULL,
  `halte_tujuan_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4d34hndqgk79dm7vq2kuf2sjh` (`user_id`),
  KEY `FKtb4s08syumof631l7px434qe0` (`halte_asal_id`),
  KEY `FK1vt4wu4c8t37wxsf82rglfp43` (`halte_tujuan_id`),
  KEY `fk_perjalanan_admin_users` (`admin_id`),
  CONSTRAINT `FK1vt4wu4c8t37wxsf82rglfp43` FOREIGN KEY (`halte_tujuan_id`) REFERENCES `halte` (`id`),
  CONSTRAINT `FK4d34hndqgk79dm7vq2kuf2sjh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK98avuch7170frt93drpn84mux` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_perjalanan_admin_users` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FKtb4s08syumof631l7px434qe0` FOREIGN KEY (`halte_asal_id`) REFERENCES `halte` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table transpoin.perjalanan: ~10 rows (approximately)
INSERT INTO `perjalanan` (`id`, `asal`, `jarak`, `poin_didapat`, `tanggal`, `tujuan`, `admin_id`, `user_id`, `bukti_perjalanan`, `catatan`, `status`, `halte_asal_id`, `halte_tujuan_id`) VALUES
	(1, 'CIcaheum', 15, 15, '2026-05-03', 'Leuwipanjang', 1, 2, NULL, NULL, NULL, NULL, NULL),
	(2, 'Leuwipanjang', 12, 12, '2026-05-06', 'Dago', 1, 1, NULL, NULL, NULL, NULL, NULL),
	(3, 'Leuwipanjang', 14, 14, '2026-05-06', 'Dago', 1, 1, NULL, NULL, NULL, NULL, NULL),
	(4, 'Leuwipanjang', 14, 14, '2026-05-06', 'Dago', 1, 1, NULL, NULL, NULL, NULL, NULL),
	(5, 'Leuwipanjang', 14, 14, '2026-05-06', 'Dago', 1, 1, NULL, NULL, NULL, NULL, NULL),
	(6, 'Leuwipanjang', 14, 14, '2026-05-06', 'Dago', 1, 2, NULL, NULL, NULL, NULL, NULL),
	(7, NULL, 4.1, 4, '2026-05-15', NULL, 1, 1, 'uploads/bukti/05228130-6bc4-4ebb-84cc-3e3be4c700a4.png', 'AJSDKABSDKJBASDBAjk', 'APPROVED', 1, 2),
	(8, NULL, 4.1, 4, '2026-05-15', NULL, 1, 1, 'uploads/bukti/d87ab00c-9c41-4b05-a37b-7d083bef0924.png', 'aasasa', 'REJECTED', 1, 2),
	(9, NULL, 4.1, 4, '2026-05-23', NULL, 1, 1, 'uploads/bukti/f82e0c37-dddb-41cf-9676-16bad24d373d.webp', 'Sangat enakeun', 'APPROVED', 2, 1),
	(10, NULL, 4.1, 4, '2026-05-30', NULL, 5, 1, 'uploads/bukti/ed56070c-942a-4273-8588-f8d352f23fc1.png', 'Jossparjosgeng', 'APPROVED', 1, 2);

-- Dumping structure for table transpoin.reward
DROP TABLE IF EXISTS `reward`;
CREATE TABLE IF NOT EXISTS `reward` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `deskripsi` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `poin_dibutuhkan` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table transpoin.reward: ~2 rows (approximately)
INSERT INTO `reward` (`id`, `deskripsi`, `nama`, `poin_dibutuhkan`) VALUES
	(2, 'Dapatkan pulsa telkomsel sebanyak 2000', 'Pulsa 2000', 4),
	(3, 'Gunakan untuk anda berbelanja di Borma dan dapatkan Diskon sebesar 50%', 'Voucher Diskon Borma 50%', 4);

-- Dumping structure for table transpoin.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `total_poin` int DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(10) DEFAULT 'USER',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table transpoin.users: ~5 rows (approximately)
INSERT INTO `users` (`id`, `email`, `nama`, `total_poin`, `password`, `role`) VALUES
	(1, 'labosuy@gmail.com', 'labosuy', 0, 'labosuy123', 'USER'),
	(2, 'bahlil@gmail.com', 'bahlil', 14, '123456', 'USER'),
	(3, 'bahlul@gmail.com', 'bahlul', 0, '12345678', 'USER'),
	(4, 'bahluludin@gmail.com', 'bahluludin', 0, '123456889', 'USER'),
	(5, 'admin@transpoin.com', 'Admin TransPoin', 0, 'admin123', 'ADMIN');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
