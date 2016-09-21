-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 09, 2016 at 03:31 PM
-- Server version: 5.5.50-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `desc` varchar(5000) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `fname`, `lname`, `date`, `desc`, `isActive`) VALUES
(1, 'Paul 1', 'Deschamps1231', '2016-09-14 00:00:00', 'Praesent a1 ipsum lacinia nibh elementum porttitor. Mauris dapibus consequat ligula. Nam nec volutpat ligula, eu pretium dui. Cras rutrum tempor arcu, mattis egestas justo pulvinar ac. Duis rhoncus id mi sed egestas. Etiam molestie molestie neque in bibendum. Cras semper fermentum tempus. Morbi lobortis eget ligula ut cursus. Sed et euismod urna, at gravida ex. ', 1),
(2, 'Hallie1', 'Deschamps1', '2016-10-09 00:00:00', 'aaaFusce consectetur libero felis, non vehicula nunc eleifend luctus. Vivamus placerat finibus erat a scelerisque. Morbi elit nisi, semper vel mi sed, blandit pulvinar diam. Phasellus vel sollicitudin est, eget venenatis tellus. Aliquam consequat urna sed ligula dapibus, eget accumsan nisi facilisis. Phasellus ipsum odio, bibendum a fringilla eu, imperdiet vitae felis. Suspendisse consectetur malesuada erat, at volutpat enim porta eu. Suspendisse cursu', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
