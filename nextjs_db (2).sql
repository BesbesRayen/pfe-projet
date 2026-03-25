-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 25 mars 2026 à 17:34
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nextjs_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `credit_requests`
--

CREATE TABLE `credit_requests` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `down_payment` decimal(38,2) NOT NULL,
  `monthly_amount` decimal(38,2) NOT NULL,
  `number_of_installments` int(11) NOT NULL,
  `status` enum('APPROVED','PENDING','REJECTED') NOT NULL,
  `total_amount` decimal(38,2) NOT NULL,
  `merchant_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `credit_scores`
--

CREATE TABLE `credit_scores` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `employment_type` varchar(255) DEFAULT NULL,
  `max_credit_amount` decimal(38,2) DEFAULT NULL,
  `monthly_expenses` decimal(38,2) DEFAULT NULL,
  `payment_history_score` int(11) DEFAULT NULL,
  `salary` decimal(38,2) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `years_of_experience` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `installments`
--

CREATE TABLE `installments` (
  `id` bigint(20) NOT NULL,
  `amount` decimal(38,2) NOT NULL,
  `due_date` date NOT NULL,
  `paid_date` datetime(6) DEFAULT NULL,
  `penalty` decimal(38,2) DEFAULT NULL,
  `status` enum('OVERDUE','PAID','PENDING') NOT NULL,
  `credit_request_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `kyc_documents`
--

CREATE TABLE `kyc_documents` (
  `id` bigint(20) NOT NULL,
  `admin_comment` varchar(255) DEFAULT NULL,
  `cin_back_url` varchar(255) DEFAULT NULL,
  `cin_front_url` varchar(255) DEFAULT NULL,
  `cin_number` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `ocr_result` varchar(255) DEFAULT NULL,
  `selfie_url` varchar(255) DEFAULT NULL,
  `status` enum('APPROVED','NOT_SUBMITTED','PENDING','REJECTED') NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `kyc_documents`
--

INSERT INTO `kyc_documents` (`id`, `admin_comment`, `cin_back_url`, `cin_front_url`, `cin_number`, `created_at`, `ocr_result`, `selfie_url`, `status`, `user_id`) VALUES
(1, NULL, 'undefined', '[object Object]', NULL, '2026-03-23 00:50:26.000000', NULL, 'undefined', 'PENDING', 6),
(2, NULL, 'undefined', '[object Object]', NULL, '2026-03-23 00:52:32.000000', NULL, 'undefined', 'PENDING', 6),
(3, NULL, '/api/files/kyc/7/cin_back.jpg', '/api/files/kyc/7/cin_front.jpg', '14045036', '2026-03-23 18:29:56.000000', NULL, '/api/files/kyc/7/selfie.jpg', 'PENDING', 7),
(4, NULL, '/api/files/kyc/7/cin_back.jpg', '/api/files/kyc/7/cin_front.jpg', '14045036', '2026-03-24 16:48:26.000000', NULL, '/api/files/kyc/7/selfie.jpg', 'PENDING', 7);

-- --------------------------------------------------------

--
-- Structure de la table `merchants`
--

CREATE TABLE `merchants` (
  `id` bigint(20) NOT NULL,
  `active` bit(1) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `merchants`
--

INSERT INTO `merchants` (`id`, `active`, `address`, `category`, `created_at`, `email`, `logo_url`, `name`, `phone`) VALUES
(1, b'1', 'Tunis Centre', 'Téléphonie', '2026-03-14 21:19:03.000000', 'contact@tt.tn', 'https://...', 'Tunisie Telecom', '+21671000000'),
(2, b'1', 'Tunis Centre', 'Téléphonie', '2026-03-14 21:19:07.000000', 'contact@tt.tn', 'https://...', 'Tunisie Telecom', '+21671000000');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` longtext NOT NULL,
  `status` enum('new','read','replied') DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `subject`, `message`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Fatima Ben Amor', 'fatima.amor@test.tn', 'support', 'Bonjour, j\'ai besoin d\'aide avec le processus de paiement.', 'new', '2026-02-26 02:30:51', '2026-02-26 02:30:51'),
(2, 'Rayen besbes', 'test@gmail.com', 'general', 'ddd', 'new', '2026-02-26 02:32:06', '2026-02-26 02:32:06'),
(4, 'rayenbbs', 'rayen@example.com', 'general', 'slm alaykom', 'new', '2026-03-07 21:58:58', '2026-03-07 21:58:58');

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` bit(1) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` enum('CREDIT_APPROVED','CREDIT_REJECTED','INSTALLMENT_OVERDUE','KYC_VALIDATED','PAYMENT_CONFIRMED','PAYMENT_REMINDER') NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) NOT NULL,
  `amount` decimal(38,2) NOT NULL,
  `paid_at` datetime(6) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `transaction_reference` varchar(255) DEFAULT NULL,
  `installment_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `kyc_status` enum('APPROVED','NOT_SUBMITTED','PENDING','REJECTED') NOT NULL,
  `role` enum('ADMIN','CLIENT') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone`, `password_hash`, `created_at`, `updated_at`, `kyc_status`, `role`) VALUES
(6, 'nasrou', 'bes', 'bes@gmail.com', '287963', 'ndd7n', '2026-03-14 19:51:40', '2026-03-22 23:50:27', 'PENDING', 'ADMIN'),
(7, 'Nasrou', 'Hh', 'nasrou@gmail.com', '25805269', 'nasrou123', '2026-03-15 23:02:04', '2026-03-23 17:29:56', 'PENDING', 'ADMIN');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `credit_requests`
--
ALTER TABLE `credit_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKrva2u76nkxbw1t5cfe2g2urpy` (`merchant_id`),
  ADD KEY `FKqqaj53cdd5yui6nr9faqxro7r` (`user_id`);

--
-- Index pour la table `credit_scores`
--
ALTER TABLE `credit_scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1nto9m99wner50ufmho33p8ph` (`user_id`);

--
-- Index pour la table `installments`
--
ALTER TABLE `installments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK7k1jkwkhmkrcepft7pu7cnq00` (`credit_request_id`);

--
-- Index pour la table `kyc_documents`
--
ALTER TABLE `kyc_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKllb8bcbbyo994afdepf7f7j63` (`user_id`);

--
-- Index pour la table `merchants`
--
ALTER TABLE `merchants`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_status` (`status`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK9y21adhxn0ayjhfocscqox7bh` (`user_id`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKrwn36natqiwaseu5c3jvaun3` (`transaction_reference`),
  ADD KEY `FKp0wyj2pahks5oh3qs9qstfnsj` (`installment_id`),
  ADD KEY `FKj94hgy9v5fw1munb90tar2eje` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `credit_requests`
--
ALTER TABLE `credit_requests`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `credit_scores`
--
ALTER TABLE `credit_scores`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `installments`
--
ALTER TABLE `installments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `kyc_documents`
--
ALTER TABLE `kyc_documents`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `merchants`
--
ALTER TABLE `merchants`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `credit_requests`
--
ALTER TABLE `credit_requests`
  ADD CONSTRAINT `FKqqaj53cdd5yui6nr9faqxro7r` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKrva2u76nkxbw1t5cfe2g2urpy` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`);

--
-- Contraintes pour la table `credit_scores`
--
ALTER TABLE `credit_scores`
  ADD CONSTRAINT `FK1nto9m99wner50ufmho33p8ph` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `installments`
--
ALTER TABLE `installments`
  ADD CONSTRAINT `FK7k1jkwkhmkrcepft7pu7cnq00` FOREIGN KEY (`credit_request_id`) REFERENCES `credit_requests` (`id`);

--
-- Contraintes pour la table `kyc_documents`
--
ALTER TABLE `kyc_documents`
  ADD CONSTRAINT `FKllb8bcbbyo994afdepf7f7j63` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `FK9y21adhxn0ayjhfocscqox7bh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `FKj94hgy9v5fw1munb90tar2eje` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKp0wyj2pahks5oh3qs9qstfnsj` FOREIGN KEY (`installment_id`) REFERENCES `installments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
