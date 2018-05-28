-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: mockdatabase
-- ------------------------------------------------------
-- Server version	5.7.21

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
-- Table structure for table `genome_types`
--

DROP TABLE IF EXISTS `genome_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genome_types` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `genomeTypescol_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genome_types`
--

LOCK TABLES `genome_types` WRITE;
/*!40000 ALTER TABLE `genome_types` DISABLE KEYS */;
INSERT INTO `genome_types` VALUES (1,'(+)ssDNA'),(4,'(+)ssRNA'),(2,'(-)ssDNA'),(5,'(-)ssRNA'),(0,'dsDNA'),(3,'dsRNA');
/*!40000 ALTER TABLE `genome_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gramstain_groups`
--

DROP TABLE IF EXISTS `gramstain_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gramstain_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `GramStainGroupscol_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gramstain_groups`
--

LOCK TABLES `gramstain_groups` WRITE;
/*!40000 ALTER TABLE `gramstain_groups` DISABLE KEYS */;
INSERT INTO `gramstain_groups` VALUES (1,'gram-negative'),(0,'gram-positive'),(2,'NOT A PROKARYOTE');
/*!40000 ALTER TABLE `gramstain_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organism_families`
--

DROP TABLE IF EXISTS `organism_families`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organism_families` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MicroorganismFamiliescol_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organism_families`
--

LOCK TABLES `organism_families` WRITE;
/*!40000 ALTER TABLE `organism_families` DISABLE KEYS */;
INSERT INTO `organism_families` VALUES (2,'hexamitidae'),(0,'reoviridae'),(4,'retroviridae'),(3,'schistosomatidae'),(1,'vibrionaceae');
/*!40000 ALTER TABLE `organism_families` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organism_genera`
--

DROP TABLE IF EXISTS `organism_genera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organism_genera` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `OrganismGeneracol_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organism_genera`
--

LOCK TABLES `organism_genera` WRITE;
/*!40000 ALTER TABLE `organism_genera` DISABLE KEYS */;
INSERT INTO `organism_genera` VALUES (2,'giardia'),(4,'lentivirus'),(0,'rotavirus'),(3,'schistosoma'),(1,'vibrio');
/*!40000 ALTER TABLE `organism_genera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organism_subfamilies`
--

DROP TABLE IF EXISTS `organism_subfamilies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organism_subfamilies` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organism_subfamilies`
--

LOCK TABLES `organism_subfamilies` WRITE;
/*!40000 ALTER TABLE `organism_subfamilies` DISABLE KEYS */;
INSERT INTO `organism_subfamilies` VALUES (2,'giardiinae'),(3,'NO SUBFAMILY'),(4,'orthoretrovirinae'),(0,'sedoreovirinae'),(1,'vibrionaceae');
/*!40000 ALTER TABLE `organism_subfamilies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organism_types`
--

DROP TABLE IF EXISTS `organism_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organism_types` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organism_types`
--

LOCK TABLES `organism_types` WRITE;
/*!40000 ALTER TABLE `organism_types` DISABLE KEYS */;
INSERT INTO `organism_types` VALUES (1,'bacteria'),(3,'helminth'),(2,'protist'),(0,'virus');
/*!40000 ALTER TABLE `organism_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisms`
--

DROP TABLE IF EXISTS `organisms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organisms` (
  `id` int(11) NOT NULL,
  `speciesName` varchar(45) DEFAULT NULL,
  `commonName` varchar(45) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `familyNameId` int(11) DEFAULT NULL,
  `subfamilyNameId` int(11) DEFAULT NULL,
  `genusNameId` int(11) DEFAULT NULL,
  `genomeTypeId` int(11) DEFAULT NULL,
  `gramStainId` int(11) DEFAULT NULL,
  `genomeLength` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Microorganisms_MicroorganismTypes_idx` (`typeId`),
  KEY `fk_Microorganisms_MicroorganismFamilies1_idx` (`familyNameId`),
  KEY `fk_Microorganisms_MicroorganismsSubfamilies1_idx` (`subfamilyNameId`),
  KEY `fk_Organisms_OrganismGenera1_idx` (`genusNameId`),
  KEY `fk_Organisms_genomeTypes1_idx` (`genomeTypeId`),
  KEY `fk_Organisms_GramStainGroups1_idx` (`gramStainId`),
  CONSTRAINT `fk_Microorganisms_MicroorganismFamilies1` FOREIGN KEY (`familyNameId`) REFERENCES `organism_families` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Microorganisms_MicroorganismTypes` FOREIGN KEY (`typeId`) REFERENCES `organism_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Microorganisms_MicroorganismsSubfamilies1` FOREIGN KEY (`subfamilyNameId`) REFERENCES `organism_subfamilies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Organisms_GramStainGroups1` FOREIGN KEY (`gramStainId`) REFERENCES `gramstain_groups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Organisms_OrganismGenera1` FOREIGN KEY (`genusNameId`) REFERENCES `organism_genera` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Organisms_genomeTypes1` FOREIGN KEY (`genomeTypeId`) REFERENCES `genome_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisms`
--

LOCK TABLES `organisms` WRITE;
/*!40000 ALTER TABLE `organisms` DISABLE KEYS */;
INSERT INTO `organisms` VALUES (0,'rotavirus a','rotavirus',0,0,0,0,3,2,18555),(1,'cholerae','vibrio cholerae',1,1,1,1,0,1,2961149),(2,'lamblia','giardia',2,2,2,2,0,2,12000000),(3,'haematobium','bladder fluke',3,3,3,3,0,2,385000000),(4,'human immunodeficiency virus 1','HIV',0,4,4,4,4,2,9719);
/*!40000 ALTER TABLE `organisms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanitation`
--

DROP TABLE IF EXISTS `sanitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sanitation` (
  `id` int(11) NOT NULL,
  `organismId` int(11) DEFAULT NULL,
  `sanitationTechnologyId` int(11) DEFAULT NULL,
  `bibtexId` int(11) DEFAULT NULL,
  `pairedSampleId` int(11) DEFAULT NULL,
  `locationStateId` int(11) DEFAULT NULL,
  `locationCountryId` int(11) DEFAULT NULL,
  `inConcentration` float DEFAULT NULL,
  `inConcentrationUnits` varchar(256) DEFAULT NULL,
  `isInConcentrationCensored` bit(1) DEFAULT NULL COMMENT '0 = false, 1 = true',
  `outConcentration` float DEFAULT NULL,
  `outConcentrationUnits` varchar(256) DEFAULT NULL,
  `isOutConcentrationCensored` bit(1) DEFAULT NULL,
  `factor1` varchar(256) DEFAULT NULL,
  `factor1Value` varchar(256) DEFAULT NULL,
  `factor2` varchar(256) DEFAULT NULL,
  `factor2Value` varchar(256) DEFAULT NULL,
  `factor3` varchar(256) DEFAULT NULL,
  `factor3Value` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanitation`
--

LOCK TABLES `sanitation` WRITE;
/*!40000 ALTER TABLE `sanitation` DISABLE KEYS */;
/*!40000 ALTER TABLE `sanitation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-23 11:10:12
