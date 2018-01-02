-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: controladoria
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `objetivo`
--

DROP TABLE IF EXISTS `objetivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `objetivo` (
  `obj_id` int(11) NOT NULL AUTO_INCREMENT,
  `obj_desc` varchar(100) NOT NULL,
  `obj_longo_prazo` bit(1) DEFAULT NULL,
  `ind_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`obj_id`),
  KEY `ind_id` (`ind_id`),
  CONSTRAINT `objetivo_ibfk_1` FOREIGN KEY (`ind_id`) REFERENCES `indicador` (`ind_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objetivo`
--

LOCK TABLES `objetivo` WRITE;
/*!40000 ALTER TABLE `objetivo` DISABLE KEYS */;
INSERT INTO `objetivo` VALUES (1,'Crescimento de Vendas','\0',1),(2,'Melhoria da Margem de Lucro de Produtos e Serviços','\0',2),(3,'Melhoria de processos','\0',3),(4,'Melhoria no EBITDA','\0',4),(5,'Melhoria da rentabilidade do capital empregado','\0',5),(6,'Redução da dívida','\0',6),(7,'Aumentar o valor da empresa (valuation)','',7),(8,'Melhorar os índices de qualidade','',8),(9,'Melhorar a satisfação dos funcionários','',9),(10,'Inovar em produtos em serviços','',10),(11,'Conquitar novos mercados','',11);
/*!40000 ALTER TABLE `objetivo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-02 20:30:54
