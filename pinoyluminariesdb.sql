-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2025 at 08:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pinoyluminariesdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `ofwcharacter_references`
--

CREATE TABLE `ofwcharacter_references` (
  `reference_id` int(11) NOT NULL,
  `application_id` int(11) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `relationship` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ofwloan_applications`
--

CREATE TABLE `ofwloan_applications` (
  `application_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  `birthplace` varchar(100) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `civil_status` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `barangay` varchar(100) DEFAULT NULL,
  `city_municipality` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `sss_number` varchar(20) DEFAULT NULL,
  `tin` varchar(20) DEFAULT NULL,
  `passport_number` varchar(20) DEFAULT NULL,
  `passport_issue_date` date DEFAULT NULL,
  `passport_expiry_date` date DEFAULT NULL,
  `visa_number` varchar(50) DEFAULT NULL,
  `oec_number` varchar(50) DEFAULT NULL,
  `destination_country` varchar(100) DEFAULT NULL,
  `employer_name` varchar(100) DEFAULT NULL,
  `contract_years` int(11) DEFAULT NULL,
  `contract_months` int(11) DEFAULT NULL,
  `job_title` varchar(100) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `allowance` decimal(10,2) DEFAULT NULL,
  `employer_address` text DEFAULT NULL,
  `father_name` varchar(100) DEFAULT NULL,
  `father_email` varchar(100) DEFAULT NULL,
  `father_contact` varchar(20) DEFAULT NULL,
  `mother_name` varchar(100) DEFAULT NULL,
  `mother_email` varchar(100) DEFAULT NULL,
  `mother_contact` varchar(20) DEFAULT NULL,
  `coborrower_name` varchar(100) DEFAULT NULL,
  `coborrower_address` text DEFAULT NULL,
  `coborrower_email` varchar(100) DEFAULT NULL,
  `coborrower_contact` varchar(20) DEFAULT NULL,
  `coborrower_id_type` varchar(100) DEFAULT NULL,
  `coborrower_id_number` varchar(50) DEFAULT NULL,
  `coborrower_employer` varchar(100) DEFAULT NULL,
  `coborrower_employer_contact` varchar(20) DEFAULT NULL,
  `coborrower_relationship` varchar(50) DEFAULT NULL,
  `coborrower_monthly_income` decimal(10,2) DEFAULT NULL,
  `loan_amount` decimal(10,2) DEFAULT NULL,
  `loan_purpose` text DEFAULT NULL,
  `preferred_bank` varchar(100) DEFAULT NULL,
  `preferred_release_method` varchar(50) DEFAULT NULL,
  `application_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ofwsiblings`
--

CREATE TABLE `ofwsiblings` (
  `sibling_id` int(11) NOT NULL,
  `application_id` int(11) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ofwspouse`
--

CREATE TABLE `ofwspouse` (
  `spouse_id` int(11) NOT NULL,
  `application_id` int(11) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `employer` varchar(100) DEFAULT NULL,
  `employer_contact_number` varchar(20) DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`) VALUES
(1, 'admin@gmail.com', '*01A6717B58FF5C7EAFFF6CB7C96F7428EA65FE4C', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `users_signedup`
--

CREATE TABLE `users_signedup` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_signedup`
--

INSERT INTO `users_signedup` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Aaron Caido', 'aaroncaido30@gmail.com', '$2y$10$9wkG3YgjDo3Wf18Lq10LJ.rux4vVgEkP89c.Hwkkpcgx3wFFRMZ3e', '2025-04-13 16:57:18'),
(3, 'Eric Singh', 'eric@gmail.com', '$2y$10$VZHSQpwSvvLovxCH6TNEuOtIC//oZpdqF9Y17UwYaUBCUxaD7xvzC', '2025-04-13 17:02:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ofwcharacter_references`
--
ALTER TABLE `ofwcharacter_references`
  ADD PRIMARY KEY (`reference_id`),
  ADD KEY `application_id` (`application_id`);

--
-- Indexes for table `ofwloan_applications`
--
ALTER TABLE `ofwloan_applications`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `ofwsiblings`
--
ALTER TABLE `ofwsiblings`
  ADD PRIMARY KEY (`sibling_id`),
  ADD KEY `application_id` (`application_id`);

--
-- Indexes for table `ofwspouse`
--
ALTER TABLE `ofwspouse`
  ADD PRIMARY KEY (`spouse_id`),
  ADD KEY `application_id` (`application_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users_signedup`
--
ALTER TABLE `users_signedup`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ofwcharacter_references`
--
ALTER TABLE `ofwcharacter_references`
  MODIFY `reference_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ofwloan_applications`
--
ALTER TABLE `ofwloan_applications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `ofwsiblings`
--
ALTER TABLE `ofwsiblings`
  MODIFY `sibling_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ofwspouse`
--
ALTER TABLE `ofwspouse`
  MODIFY `spouse_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users_signedup`
--
ALTER TABLE `users_signedup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ofwcharacter_references`
--
ALTER TABLE `ofwcharacter_references`
  ADD CONSTRAINT `ofwcharacter_references_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `ofwloan_applications` (`application_id`);

--
-- Constraints for table `ofwloan_applications`
--
ALTER TABLE `ofwloan_applications`
  ADD CONSTRAINT `ofwloan_applications_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users_signedup` (`id`);

--
-- Constraints for table `ofwsiblings`
--
ALTER TABLE `ofwsiblings`
  ADD CONSTRAINT `ofwsiblings_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `ofwloan_applications` (`application_id`);

--
-- Constraints for table `ofwspouse`
--
ALTER TABLE `ofwspouse`
  ADD CONSTRAINT `ofwspouse_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `ofwloan_applications` (`application_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
