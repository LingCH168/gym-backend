-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: high_street_gym
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `activity_name` varchar(45) NOT NULL,
  `activity_description` varchar(200) NOT NULL,
  `activity_duration` varchar(45) NOT NULL,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'Yoga','Yoga is a physical, mental, and spiritual practice.','30 min'),(2,'Pilates','Pilates is a form of exercise which concentrates on strengthening the body with an emphasis on core strength.','30 min'),(3,'Abs','Abdominal exercises are a type of strength exercise that affect the abdominal muscles.','40 min'),(4,'HIIT or high-intensity interval training','HIIT is a type of interval training exercise.','40 min'),(5,'Indoor cycling','cycling can help lose belly fat, but it will take time','40 min'),(6,'Yoga','Yoga is a physical, mental, and spiritual practice.','50 min'),(7,'Zumba','cycling can help lose belly fat, but it will take time','40 min'),(8,'Yoga','Yoga is a physical, mental, and spiritual practice.','40 min'),(9,'Boxing','\nBoxing is a combat sport in which two people','50 min'),(10,'Pilates','\nPilates is a form of exercise which concentrates on strengthening the body with an emphasis on core strength','30 min'),(11,'Yoga','Yoga is a physical, mental, and spiritual practice.','50 min'),(12,'Abssssss','Abdominal exercises are a type of strength exercise that affect the abdominal muscles.','60 mins'),(92,'Indoor Cycling','cycling can help lose belly fat, but it will take time','40 min'),(93,'Pilates','\nPilates is a form of exercise which concentrates on strengthening the body with an emphasis on core strength','30 min'),(94,'Boxing','\nBoxing is a combat sport in which two people','50 min'),(95,'Indoor Cycling','cycling can help lose belly fat, but it will take time','40 min'),(96,'Pilates','\nPilates is a form of exercise which concentrates on strengthening the body with an emphasis on core strength','30 min'),(97,'Boxing','\nBoxing is a combat sport in which two people','50 min');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_date` date NOT NULL,
  `post_time` time NOT NULL,
  `post_user_id` int NOT NULL,
  `post_title` varchar(45) NOT NULL,
  `post_content` varchar(10050) NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `FK_Blog-posts_staff_idx` (`post_user_id`),
  CONSTRAINT `FK_Blog-posts_staff` FOREIGN KEY (`post_user_id`) REFERENCES `staff` (`staff_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (137,'2023-04-25','16:40:06',1,'Pilates','55'),(138,'2023-04-25','16:40:20',1,'Yoga','777'),(139,'2023-04-25','16:48:46',1,'Boxing','666'),(142,'2023-04-25','16:54:08',1,'Indoor cycling','101010'),(144,'2023-04-26','13:08:50',1,'Pilates','456456'),(145,'2023-04-26','13:09:10',1,'HIIT or high-intensity interval training','9999'),(147,'2023-04-26','13:51:48',3,'Abs','222'),(148,'2023-04-28','09:37:41',11,'Yoga','1111');
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `booking_user_id` int NOT NULL,
  `booking_class_id` int NOT NULL,
  `booking_created_date` date NOT NULL,
  `booking_created_time` time NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `fk_bookings_class_idx` (`booking_class_id`),
  KEY `fk_bookings_user_idx` (`booking_user_id`),
  CONSTRAINT `fk_bookings_class` FOREIGN KEY (`booking_class_id`) REFERENCES `classes` (`class_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_bookings_user` FOREIGN KEY (`booking_user_id`) REFERENCES `staff` (`staff_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=240 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (164,5,5,'2023-04-20','09:19:05'),(166,3,3,'2023-04-20','09:48:22'),(167,3,3,'2023-04-20','09:49:06'),(189,3,4,'2023-04-25','10:42:32'),(190,3,4,'2023-04-25','10:42:41'),(224,1,1,'2023-04-28','09:53:18'),(225,1,1,'2023-04-28','09:53:36'),(226,1,8,'2023-04-28','10:13:26'),(227,1,1,'2023-04-28','10:26:05'),(228,1,8,'2023-04-28','16:27:58'),(229,1,10,'2023-04-28','21:26:06'),(232,1,10,'2023-05-03','11:02:28'),(233,3,2,'2023-05-03','12:49:34');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_date` date NOT NULL,
  `class_time` time NOT NULL,
  `class_room_id` int NOT NULL,
  `class_activity_id` int NOT NULL,
  `class_trainer_user_id` int NOT NULL,
  PRIMARY KEY (`class_id`),
  KEY `fk_classes_user_idx` (`class_trainer_user_id`),
  KEY `fk_classes_activity_idx` (`class_activity_id`),
  KEY `fk_classes_activity1_idx` (`class_activity_id`),
  KEY `fk_classes_room_idx` (`class_room_id`),
  CONSTRAINT `fk_classes_activity` FOREIGN KEY (`class_activity_id`) REFERENCES `activities` (`activity_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_classes_room` FOREIGN KEY (`class_room_id`) REFERENCES `rooms` (`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_classes_user` FOREIGN KEY (`class_trainer_user_id`) REFERENCES `staff` (`staff_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'2023-05-01','15:30:00',2,2,2),(2,'2023-05-02','15:00:00',1,1,1),(3,'2023-05-03','10:00:00',3,3,4),(4,'2023-05-04','11:00:00',4,4,2),(5,'2023-05-05','16:10:00',5,6,2),(6,'2023-05-05','14:30:00',2,12,2),(7,'2023-05-05','12:30:00',5,5,5),(8,'2023-05-04','14:00:00',6,8,2),(9,'2023-05-03','15:30:00',7,9,4),(10,'2023-05-04','10:30:00',7,7,7),(11,'2023-05-05','09:00:00',10,10,2),(12,'2023-05-02','16:30:00',8,11,4),(13,'2023-05-03','12:30:00',5,5,5),(54,'2023-05-04','10:00:00',5,5,5);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_location` varchar(45) NOT NULL,
  `room_number` int NOT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'Block A',101),(2,'Area I',203),(3,'Block A',102),(4,'Block A',103),(5,'Block A',104),(6,'Area I',203),(7,'Block A',106),(8,'Block A',107),(9,'Block A',108),(10,'Area B',109),(68,'Area H',201),(69,'Area G',202),(70,'Area I',203);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `staff_email` varchar(95) NOT NULL,
  `staff_password` varchar(195) NOT NULL,
  `staff_access_role` varchar(45) NOT NULL,
  `staff_phone` varchar(45) NOT NULL,
  `staff_first_name` varchar(45) NOT NULL,
  `staff_last_name` varchar(45) NOT NULL,
  `staff_address` varchar(65) NOT NULL,
  `staff_authentication_key` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'lingCH111@server.com','$2a$10$.f5P1QhrKA97qQ5.rZjZv.yuKqon8kAILDFleDYHCa4FZ..R.tpNy','admin','110110','Jack','CHUNG','1 Hassall St','23064422-81f1-440c-b3b0-76bda3335f77'),(2,'lingCH222@server.com','$2a$10$CNb5o0QEx/PAWinIQ6Vceekbs5vBz7B4AY/p3uDPjrH9zDERzQbTa','trainer','120120','Jeff','BILI','2 Hassall St, South Bank','5320037a-2ffd-49c1-bbb2-478c4229c02b'),(3,'lingCH333@server.com','$2a$10$TJwRaf1Tvjq/01PNIYhUuex4YFWPO3Cw8LFmeAMtSBXGCUX1nZZAa','user','130130','John','ADAM','3 Hassall St, South Bank','dafd8afc-4aa8-46ea-8bbd-74116a18c820'),(4,'lingCH444@server.com','$2a$10$jbSVkwCqGYSG.RREuBTOHu/aJmOIRWeRr3K9/efXQSfK.bVVAUOgG','trainer','140140','Oscar','SMITH','4 Hassall St, South Bank',NULL),(5,'lingCH55@server.com','$2a$10$rp7rPDs5VQa9JFV7LWsxIeTjOgFpejzAQMuF22P2KUFFT5yaW94Q.','admin','150150','Jane','KIM','5 Harrison Pl , South Bank',''),(6,'lingCH@server.com','$2a$10$LfPEu15bYueqpCbm90HIeuhvmfCPJn11C1SJJRGgXBElYcTfZXKk.','trainer','110110','John','Adam','28 Hassall St, South Bank','9dce7a88-cd7d-4c03-833b-5c240de68d74'),(7,'lingCH999@server.com','$2a$10$33AdwJ0DyuIvzxIUL4lr9On9Yaevy7cESPWWqcuUepqRsSr/EJkam','admin','110110','ghdf','gfds','dsgfs',''),(8,'lingCH101@server.com','$2a$10$gv6zb/FIcghWkJOZjGxdJuE3K/hSpL0l3/md7787c8Jm5Sxc9UiIa','user','7897','7988','798','789',''),(9,'lingCH777777777@server.com','$2a$10$nR81geSqzEsvXBKRcVyEGeg1Y08LXm4Kdv0Aikbhwd2f1ON9oMyj6','user','444','444','444','444',''),(10,'lingCH777888@server.com','$2a$10$kaqfAl1ga08pLxGWkOERi.QNy61y4ukCI9xQCas8hmo0QPrJatjGi','user','666','666','666','666',''),(11,'lingCH111999@server.com','$2a$10$inlyFzogmxhy04ZniI4/q.FNizXoh8UAAvP9quz0Hh3uT43Q3jrL6','admin','45644566','gjkklhjk','ghdfhdfg','fdghfdh',''),(12,'lingCH111@server.com','$2a$10$A.FeUeJCBY4yWQHeXZWZteN.OuuNmuBgEud.KaDef1X4wsLoOKsJa','trainer','112413123','13312','13212','1233123',''),(53,'lingCH123321@server.com','$2a$10$7LtTtjyECwLrQVXGu9B21entC8cVv4LrO6Jf/qsr8aEnMuAI5Ikwm','admin','110110','John','Adam','28 Hassall St, South Bank','608f4b71-9325-43d4-a650-b7767c8ce77f'),(68,'lingCH111888@server.com','$2a$10$COLFVd1D6GLEnpqCrwwIBOtWYty9mT8ELAu2n33rpGgZDvnMh57XK','trainer','666777','Jack','Adam','18 Hassall St South Bank','');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-04 16:36:46
