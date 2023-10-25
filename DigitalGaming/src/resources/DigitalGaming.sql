-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: digitalgaming
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `totalCartPrice` decimal(10,0) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,1,0),(2,2,0),(3,3,0);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Acción'),(2,'Aventura'),(5,'Deportes'),(4,'Estrategia'),(3,'RPG (Rol)');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform`
--

DROP TABLE IF EXISTS `platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform`
--

LOCK TABLES `platform` WRITE;
/*!40000 ALTER TABLE `platform` DISABLE KEYS */;
INSERT INTO `platform` VALUES (1,'EcoMarket'),(3,'FoodFusion'),(5,'GamerHaven'),(2,'TechConnect'),(4,'TravelBuddy');
/*!40000 ALTER TABLE `platform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(400) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `discount` int DEFAULT '0',
  `image` varchar(120) NOT NULL,
  `cover` varchar(120) NOT NULL,
  `video` varchar(120) NOT NULL,
  `requirement_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `requirement_idx` (`requirement_id`),
  CONSTRAINT `requirement` FOREIGN KEY (`requirement_id`) REFERENCES `requeriment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Call of Duty: Modern Warfare','Experimenta la intensidad de la guerra moderna en este juego de disparos en primera persona. ¡Únete a la acción!',60,0,'modern-warfare.jpg','modern-warfare-cover.jpg','modern-warfare-trailer.mp4',1),(2,'The Legend of Zelda: Breath of the Wild','Embárcate en una aventura épica en el mundo de Hyrule. Resuelve puzles, lucha contra monstruos y descubre secretos.',50,10,'zelda-breath-of-the-wild.jpg','zelda-breath-of-the-wild-cover.jpg','zelda-breath-of-the-wild-trailer.mp4',2),(3,'Cyberpunk 2077','Explora Night City en este juego de rol de mundo abierto. Personaliza tu personaje y desentraña una historia llena de misterio.',40,25,'cyberpunk-2077.jpg','cyberpunk-2077-cover.jpg','cyberpunk-2077-trailer.mp4',3),(4,'Super Mario Odyssey','Acompaña a Mario en una emocionante aventura para rescatar a la Princesa Peach de las garras de Bowser. ¡Reúne lunas y descubre nuevos mundos!',55,5,'super-mario-odyssey.jpg','super-mario-odyssey-cover.jpg','super-mario-odyssey-trailer.mp4',4),(5,'The Witcher 3: Wild Hunt','Sumérgete en un mundo de fantasía lleno de monstruos, magia y misterio. Embárcate en la caza de bestias y busca a tu hija perdida.',30,15,'witcher-3.jpg','witcher-3-cover.jpg','witcher-3-trailer.mp4',5);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_cart`
--

DROP TABLE IF EXISTS `product_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `total_price` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_cart`
--

LOCK TABLES `product_cart` WRITE;
/*!40000 ALTER TABLE `product_cart` DISABLE KEYS */;
INSERT INTO `product_cart` VALUES (1,1,1,2,120),(2,1,3,3,120),(3,2,2,1,50),(4,2,4,2,110),(5,3,5,4,120);
/*!40000 ALTER TABLE `product_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_category_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,1,1),(2,1,4),(3,2,2),(4,3,3),(5,4,1),(6,4,2),(7,5,3);
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_platform`
--

DROP TABLE IF EXISTS `product_platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_platform` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `platform_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `platform_id` (`platform_id`),
  CONSTRAINT `product_platform_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `product_platform_ibfk_2` FOREIGN KEY (`platform_id`) REFERENCES `platform` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_platform`
--

LOCK TABLES `product_platform` WRITE;
/*!40000 ALTER TABLE `product_platform` DISABLE KEYS */;
INSERT INTO `product_platform` VALUES (1,1,1),(2,1,2),(3,2,3),(4,3,1),(5,3,2),(6,4,3),(7,5,1),(8,5,2);
/*!40000 ALTER TABLE `product_platform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requeriment`
--

DROP TABLE IF EXISTS `requeriment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requeriment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `os_recommended` varchar(20) DEFAULT 'Unspecified',
  `os_minumum` varchar(20) DEFAULT 'Unspecified',
  `processor_recommended` varchar(20) DEFAULT 'Unspecified',
  `processor_minimum` varchar(20) DEFAULT 'Unspecified',
  `memory_recommended` varchar(20) DEFAULT 'Unspecified',
  `memory_minimum` varchar(20) DEFAULT 'Unspecified',
  `graphic_recommended` varchar(40) DEFAULT 'Unspecified',
  `graphic_minimum` varchar(40) DEFAULT 'Unspecified',
  `storage_recommended` varchar(15) DEFAULT 'Unspecified',
  `storage_minimum` varchar(15) DEFAULT 'Unspecified',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requeriment`
--

LOCK TABLES `requeriment` WRITE;
/*!40000 ALTER TABLE `requeriment` DISABLE KEYS */;
INSERT INTO `requeriment` VALUES (1,'Windows 10','Windows 7','Intel Core i7','Intel Core i5','16 GB RAM','8 GB RAM','NVIDIA GeForce RTX 3080','NVIDIA GeForce GTX 1060','512 GB SSD','256 GB SSD'),(2,'macOS Catalina','macOS Mojave','Apple M1','Intel Core i3','12 GB RAM','4 GB RAM','AMD Radeon RX 5700','NVIDIA GeForce GTX 750','1 TB SSD','128 GB SSD'),(3,'Ubuntu 20.04','Ubuntu 18.04','AMD Ryzen 9','AMD Ryzen 5','32 GB RAM','16 GB RAM','NVIDIA Quadro P5000','NVIDIA GeForce GTX 960','256 GB SSD','64 GB HDD'),(4,'Windows 11','Windows 8.1','Intel Core i9','Intel Core i7','64 GB RAM','32 GB RAM','NVIDIA GeForce RTX 3090','NVIDIA GeForce GTX 1080','2 TB NVMe SSD','512 GB SSD'),(5,'macOS Big Sur','macOS High Sierra','Apple M2','Intel Core i5','8 GB RAM','2 GB RAM','AMD Radeon RX 560','NVIDIA GeForce GT 730','512 GB NVMe SSD','128 GB HDD');
/*!40000 ALTER TABLE `requeriment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Administrador'),(2,'Operador');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `last_name` varchar(15) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(70) NOT NULL,
  `rol_id` int NOT NULL,
  `user_image` varchar(120) DEFAULT 'defauli.png',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password` (`password`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test1','test11','test1@gmail.com','test1',1,'defauli.png'),(2,'test2','test22','test2@gmail.com','test2',2,'defauli.png'),(3,'test3','test33','test3@gmail.com','test3',1,'defauli.png');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-25 14:51:59
