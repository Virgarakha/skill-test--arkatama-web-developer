-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 16, 2025 at 05:57 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_test_arkatama`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `penumpang`
--

CREATE TABLE `penumpang` (
  `id` int NOT NULL,
  `id_travel` int NOT NULL,
  `kode_booking` varchar(12) NOT NULL,
  `nama` varchar(225) NOT NULL,
  `jenis_kelamin` enum('Laki - Laki','Perempuan') NOT NULL,
  `kota` varchar(225) NOT NULL,
  `usia` int NOT NULL,
  `tahun_lahir` varchar(225) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `penumpang`
--

INSERT INTO `penumpang` (`id`, `id_travel`, `kode_booking`, `nama`, `jenis_kelamin`, `kota`, `usia`, `tahun_lahir`, `created_at`) VALUES
(12, 5, '250900050001', 'ARGA PRATAMA', 'Laki - Laki', 'BEKASI', 20, '2005', '2025-09-16 05:13:00'),
(13, 4, '250900040001', 'DINA AISYAH', 'Perempuan', 'JAKARTA', 20, '2005', '2025-09-16 05:13:53'),
(14, 2, '250900020001', 'RAKHA KUMARA', 'Laki - Laki', 'JEMBER', 17, '2008', '2025-09-16 05:14:13'),
(15, 2, '250900020002', 'ABIM EMIL FAHREZI', 'Laki - Laki', 'JEMBER', 17, '2008', '2025-09-16 05:29:06'),
(16, 4, '250900040002', 'GABRIAL', 'Laki - Laki', 'JAKARTA', 19, '2006', '2025-09-16 05:34:29'),
(17, 2, '250900020003', 'ANAS MAULANA HISYAM', 'Laki - Laki', 'JEMBER', 17, '2008', '2025-09-16 05:41:11');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'ddb3444934858b72050d49a3cc6a878ffd6cbcf22d833c3ea9459defb7b44863', '[\"*\"]', NULL, NULL, '2025-09-15 20:51:12', '2025-09-15 20:51:12'),
(2, 'App\\Models\\User', 1, 'auth_token', 'b9bc6473ddbe7d93fe1e2db70046e45fdbcd312a52228ef5026b35249d8b885d', '[\"*\"]', NULL, NULL, '2025-09-15 20:52:21', '2025-09-15 20:52:21'),
(3, 'App\\Models\\User', 1, 'auth_token', '98e0eaf4aefba12736ae1b8d3bec83581bda71c9296cab054eae7c5bc60aaeb4', '[\"*\"]', NULL, NULL, '2025-09-15 21:05:34', '2025-09-15 21:05:34'),
(4, 'App\\Models\\User', 1, 'auth_token', 'a05ec7f6c5684d5006039f92ba9799204505baff3ad1a8fa41050ddf3933b657', '[\"*\"]', NULL, NULL, '2025-09-15 21:05:53', '2025-09-15 21:05:53'),
(5, 'App\\Models\\User', 1, 'auth_token', '5f5f032854bb860744b8896b653cfb1f07fe3f801a6290be1c28df07b88330a9', '[\"*\"]', NULL, NULL, '2025-09-15 21:06:06', '2025-09-15 21:06:06'),
(6, 'App\\Models\\User', 1, 'auth_token', 'aee31afcb66e3162d57fb111f13039c3179d96351d5e49d81b271890a108d24e', '[\"*\"]', NULL, NULL, '2025-09-15 21:06:13', '2025-09-15 21:06:13'),
(7, 'App\\Models\\User', 1, 'auth_token', '2aab081035c357f4dd1e48ae40c22c72b13a91c9cad4a238d5f118ca477a2efc', '[\"*\"]', NULL, NULL, '2025-09-15 21:06:25', '2025-09-15 21:06:25'),
(8, 'App\\Models\\User', 1, 'auth_token', '70621f6d3f8f7eac0bed924cd97eaf1c14582da0884a7e9484ec932371f2a652', '[\"*\"]', NULL, NULL, '2025-09-15 21:06:45', '2025-09-15 21:06:45'),
(9, 'App\\Models\\User', 1, 'auth_token', '5a84ad8c18d73c3e69df5d424a4ba5c96ff228580dc7dd9acf52b5dcbe1a75e3', '[\"*\"]', NULL, NULL, '2025-09-15 22:25:32', '2025-09-15 22:25:32');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `travel`
--

CREATE TABLE `travel` (
  `id` int NOT NULL,
  `nama` varchar(225) NOT NULL,
  `tanggal_keberangkatan` date DEFAULT NULL,
  `kuota` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `travel`
--

INSERT INTO `travel` (`id`, `nama`, `tanggal_keberangkatan`, `kuota`) VALUES
(2, 'Jember - Surabaya\r\n', '2025-09-18', 5),
(4, 'Jakarta - Bandung', '2025-09-17', 18),
(5, 'Bekasi - Bogor', '2025-09-17', 9);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(1, 'Admin Travel', 'admin@gmail.com', '$2y$12$lUPw/Wnd5ROr5EKNeE/ZaeLimpV4egk2/VoSVpBe83vXvNfkw.UoW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `penumpang`
--
ALTER TABLE `penumpang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_travel` (`id_travel`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `test_email_unique` (`email`);

--
-- Indexes for table `travel`
--
ALTER TABLE `travel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `penumpang`
--
ALTER TABLE `penumpang`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `travel`
--
ALTER TABLE `travel`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `penumpang`
--
ALTER TABLE `penumpang`
  ADD CONSTRAINT `penumpang_ibfk_1` FOREIGN KEY (`id_travel`) REFERENCES `travel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
