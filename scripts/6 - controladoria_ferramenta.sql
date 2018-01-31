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
-- Table structure for table `ferramenta`
--

DROP TABLE IF EXISTS `ferramenta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ferramenta` (
  `ferr_id` int(11) NOT NULL AUTO_INCREMENT,
  `ferr_desc` varchar(100) NOT NULL,
  `ferr_grande` bit(1) DEFAULT NULL,
  `obj_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ferr_id`),
  KEY `obj_id` (`obj_id`),
  CONSTRAINT `ferramenta_ibfk_1` FOREIGN KEY (`obj_id`) REFERENCES `objetivo` (`obj_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ferramenta`
--

LOCK TABLES `ferramenta` WRITE;
/*!40000 ALTER TABLE `ferramenta` DISABLE KEYS */;
INSERT INTO `ferramenta` VALUES (1,'Controle de Vendas por Vendedor/Canal/Clientes/Produtos','\0',1),(2,'Margem de contribuição de produtos/serviços','\0',2),(3,'Margem bruta de produtos','\0',2),(4,'Simulação de mix de produtos/serviços','',2),(5,'Incentivos baseado em margem bruta','\0',2),(6,'Custo meta','',2),(7,'OBZ - Orçamento base zero','',3),(8,'GMD - Gerenciamento Matricial de Despesas','',3),(9,'ABC - Custeio por atividade','',3),(10,'Kaizen - melhoria contínua','\0',3),(11,'Análise de Lucratividade de Clientes','\0',3),(12,'Incentivos baseado em EBITDA','\0',4),(13,'Orçamento','',4),(14,'Análise de variações orçamentárias','',4),(15,'Modelo Du Pont (margem x giro)','',5),(16,'Ciclo de caixa','\0',5),(17,'Valor Presente Líquido e Análise de Payback nas decisões de investimento','',5),(18,'EVA - lucro econômico','',5),(19,'Rentabilidade por Unidade de negócio','',5),(20,'Fluxo de caixa projetado','',6),(21,'Gestão de covenants','',6),(22,'Gestão de covenants','',6),(23,'Planejamento estratégico','\0',7),(24,'Orçamento de Longo Prazo e Metas','\0',7),(25,'Rolling Forecasting','',7),(26,'SIX SIGMA','',8),(27,'Gestão da qualidade total','\0',8),(28,'Benchmarking interno','',8),(29,'Benchmarking externo','',8),(30,'Gestão à vista','\0',8),(31,'Pesquisa de clima e ou  Satisfação de funcionários','\0',9),(32,'Controle de investimentos em P&D','',10),(33,'Controle de presença de território','\0',11);
/*!40000 ALTER TABLE `ferramenta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-26 10:25:56
