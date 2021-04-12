-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 12, 2021 at 02:51 AM
-- Server version: 10.3.28-MariaDB-log
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `heejaeri_4537db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `postMedicalStaff` int(11) DEFAULT 0,
  `getMedicalStaff` int(11) DEFAULT 0,
  `putMedicalStaff` int(11) DEFAULT 0,
  `deleteMedicalStaff` int(11) DEFAULT 0,
  `createPatient` int(11) DEFAULT 0,
  `patientList` int(11) DEFAULT 0,
  `updatePatient` int(11) DEFAULT 0,
  `deletePatient` int(11) DEFAULT 0,
  `updateReserved` int(11) DEFAULT 0,
  `updateNotReserved` int(11) DEFAULT 0,
  `userID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `postMedicalStaff`, `getMedicalStaff`, `putMedicalStaff`, `deleteMedicalStaff`, `createPatient`, `patientList`, `updatePatient`, `deletePatient`, `updateReserved`, `updateNotReserved`, `userID`) VALUES
(1, 0, 0, 0, 0, 2, 2, 1, 1, 0, 0, 1),
(2, 1, 7, 1, 0, 2, 5, 1, 1, 1, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `medicalStaff`
--

CREATE TABLE `medicalStaff` (
  `Id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `start_at` varchar(255) NOT NULL,
  `end_at` varchar(255) NOT NULL,
  `patientID` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `medicalStaff`
--

INSERT INTO `medicalStaff` (`Id`, `name`, `position`, `start_at`, `end_at`, `patientID`) VALUES
(1, 'James', 'Dr', '2021-04-13 15:15', '2021-04-14 12:12', 4);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `ID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `reservedState` tinyint(4) DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`ID`, `name`, `city`, `mobile`, `gender`, `date`, `reservedState`) VALUES
(2, 'Erica', 'Vancouver', '1231231231', 'Female', '2021-04-27 13:00', 0),
(4, 'Jason', 'Burnaby', '1231233333', 'Male', '2021-04-13 15:15', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `email`, `password`) VALUES
(1, 'bcit@gmail.com', '$2b$10$fz8fiOyD2hkeYlygwsyYL.idBHTnT2Ox5pkFVK.10Chyga48B5DN2'),
(2, 'erica@gmail.com', '$2b$10$Dg0dY/W2bsEst5ZEzO43cuofJJcIrvMqSzTsHxcMS3NpZYDkFgu5m');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userID` (`userID`);

--
-- Indexes for table `medicalStaff`
--
ALTER TABLE `medicalStaff`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `patientID` (`patientID`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `medicalStaff`
--
ALTER TABLE `medicalStaff`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
