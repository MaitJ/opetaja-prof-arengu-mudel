CREATE DATABASE  IF NOT EXISTS `opetajaprofareng2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `opetajaprofareng2`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: opetajaprofareng2
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `autentimisetyyp`
--

DROP TABLE IF EXISTS `autentimisetyyp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autentimisetyyp` (
  `autentimise_tyyp_id` int NOT NULL AUTO_INCREMENT,
  `autentimise_tyyp` varchar(100) NOT NULL,
  PRIMARY KEY (`autentimise_tyyp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autentimisetyyp`
--

LOCK TABLES `autentimisetyyp` WRITE;
/*!40000 ALTER TABLE `autentimisetyyp` DISABLE KEYS */;
/*!40000 ALTER TABLE `autentimisetyyp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autentimisetyyp_kasutaja`
--

DROP TABLE IF EXISTS `autentimisetyyp_kasutaja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autentimisetyyp_kasutaja` (
  `autentimisetyyp_kasutaja_id` int NOT NULL AUTO_INCREMENT,
  `kasutaja_id` int NOT NULL,
  `autentimise_tyyp_id` int NOT NULL,
  PRIMARY KEY (`autentimisetyyp_kasutaja_id`),
  KEY `AutentimiseTyyp_Kasutaja_AutentimiseTyyp` (`autentimise_tyyp_id`),
  KEY `AutentimiseTyyp_Kasutaja_Kasutaja` (`kasutaja_id`),
  CONSTRAINT `AutentimiseTyyp_Kasutaja_AutentimiseTyyp` FOREIGN KEY (`autentimise_tyyp_id`) REFERENCES `autentimisetyyp` (`autentimise_tyyp_id`),
  CONSTRAINT `AutentimiseTyyp_Kasutaja_Kasutaja` FOREIGN KEY (`kasutaja_id`) REFERENCES `kasutaja` (`kasutaja_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autentimisetyyp_kasutaja`
--

LOCK TABLES `autentimisetyyp_kasutaja` WRITE;
/*!40000 ALTER TABLE `autentimisetyyp_kasutaja` DISABLE KEYS */;
/*!40000 ALTER TABLE `autentimisetyyp_kasutaja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eneseanalyys`
--

DROP TABLE IF EXISTS `eneseanalyys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eneseanalyys` (
  `eneseanalyys_id` int NOT NULL AUTO_INCREMENT,
  `eneseanalyys_tekst` varchar(500) NOT NULL,
  PRIMARY KEY (`eneseanalyys_id`)
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eneseanalyys`
--

LOCK TABLES `eneseanalyys` WRITE;
/*!40000 ALTER TABLE `eneseanalyys` DISABLE KEYS */;
INSERT INTO `eneseanalyys` VALUES (1,'21'),(2,'25'),(3,'54'),(4,'43'),(5,'65'),(6,'32'),(7,'43'),(8,'65'),(9,'23'),(10,'11'),(11,'32'),(12,'21'),(13,'98'),(14,'43'),(15,'85'),(16,'43'),(17,'21'),(18,'43'),(19,'32'),(20,'54'),(21,'54'),(22,'54'),(23,'43'),(24,'95'),(25,'54'),(26,'54'),(27,'21'),(28,'432'),(29,'943'),(30,'42'),(31,'43'),(32,'98'),(33,'43'),(34,'21'),(35,'74'),(36,'43'),(37,'65'),(38,'43'),(39,'75'),(40,'43'),(41,'91'),(42,'5'),(43,'4'),(44,'1'),(45,'84'),(46,'75'),(47,'75'),(48,'54'),(49,'86'),(50,'32'),(51,'32'),(52,'75'),(53,'32'),(54,'21'),(55,'11'),(56,'54'),(57,'54'),(58,'43'),(59,'64'),(60,'12'),(61,'43'),(62,'43'),(63,'21'),(64,'25'),(65,'54'),(66,'43'),(67,'65'),(68,'32'),(69,'43'),(70,'65'),(71,'23'),(72,'11'),(73,'32'),(74,'21'),(75,'98'),(76,'43'),(77,'85'),(78,'43'),(79,'21'),(80,'43'),(81,'32'),(82,'54'),(83,'54'),(84,'54'),(85,'43'),(86,'95'),(87,'54'),(88,'54'),(89,'21'),(90,'432'),(91,'943'),(92,'42'),(93,'43'),(94,'98'),(95,'43'),(96,'21'),(97,'74'),(98,'43'),(99,'65'),(100,'43'),(101,'75'),(102,'43'),(103,'91'),(104,'5'),(105,'4'),(106,'1'),(107,'84'),(108,'75'),(109,'75'),(110,'54'),(111,'86'),(112,'32'),(113,'32'),(114,'75'),(115,'32'),(116,'21'),(117,'11'),(118,'54'),(119,'54'),(120,'43'),(121,'64'),(122,'12'),(123,'43'),(124,'43'),(125,'32'),(126,'54'),(127,'85'),(128,'54'),(129,'5'),(130,'52'),(131,'542'),(132,'54'),(133,'45'),(134,'54'),(135,'76'),(136,'52'),(137,'52'),(138,'43'),(139,'43'),(140,'12'),(141,'643'),(142,'43'),(143,'431'),(144,'54'),(145,'43'),(146,'43'),(147,'53'),(148,'54'),(149,'65'),(150,'76'),(151,'43'),(152,'54'),(153,'75'),(154,'42'),(155,'54'),(156,'54'),(157,'542'),(158,'54'),(159,'542'),(160,'45'),(161,'65'),(162,'52'),(163,'542'),(164,'542'),(165,'54'),(166,'45'),(167,'543'),(168,'541'),(169,'54'),(170,'54'),(171,'54'),(172,'543'),(173,'54'),(174,'543'),(175,'432'),(176,'43'),(177,'432'),(178,'432'),(179,'43'),(180,'543'),(181,'543'),(182,'432'),(183,'32'),(184,'32'),(185,'43'),(186,'94');
/*!40000 ALTER TABLE `eneseanalyys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `idauth`
--

DROP TABLE IF EXISTS `idauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `idauth` (
  `IDAuth_id` int NOT NULL AUTO_INCREMENT,
  `kasutaja_id` int NOT NULL,
  `sertifikaat` varchar(255) NOT NULL,
  PRIMARY KEY (`IDAuth_id`),
  KEY `IDAuth_Kasutaja` (`kasutaja_id`),
  CONSTRAINT `IDAuth_Kasutaja` FOREIGN KEY (`kasutaja_id`) REFERENCES `kasutaja` (`kasutaja_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `idauth`
--

LOCK TABLES `idauth` WRITE;
/*!40000 ALTER TABLE `idauth` DISABLE KEYS */;
/*!40000 ALTER TABLE `idauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kasutaja`
--

DROP TABLE IF EXISTS `kasutaja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kasutaja` (
  `kasutaja_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `salasona` varchar(250) NOT NULL,
  PRIMARY KEY (`kasutaja_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kasutaja`
--

LOCK TABLES `kasutaja` WRITE;
/*!40000 ALTER TABLE `kasutaja` DISABLE KEYS */;
INSERT INTO `kasutaja` VALUES (1,'maikeljack@gmail.com','$2b$10$3J.Pxtq6x.J26r.0xmdUfeeE826EAbH7pNRWEGMC47SXxF9UtLG.a');
/*!40000 ALTER TABLE `kasutaja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kasutajaroll`
--

DROP TABLE IF EXISTS `kasutajaroll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kasutajaroll` (
  `kasutajaroll_id` int NOT NULL AUTO_INCREMENT,
  `rolli_nimi` varchar(100) NOT NULL,
  PRIMARY KEY (`kasutajaroll_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kasutajaroll`
--

LOCK TABLES `kasutajaroll` WRITE;
/*!40000 ALTER TABLE `kasutajaroll` DISABLE KEYS */;
INSERT INTO `kasutajaroll` VALUES (1,'Õpetaja'),(2,'Juhtkond');
/*!40000 ALTER TABLE `kasutajaroll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kysimus`
--

DROP TABLE IF EXISTS `kysimus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kysimus` (
  `kysimus_id` int NOT NULL AUTO_INCREMENT,
  `kysimus_tekst` varchar(500) NOT NULL,
  `kysimusteplokk_id` int NOT NULL,
  PRIMARY KEY (`kysimus_id`),
  KEY `Kysimus_KysimustePlokk` (`kysimusteplokk_id`),
  CONSTRAINT `Kysimus_KysimustePlokk` FOREIGN KEY (`kysimusteplokk_id`) REFERENCES `kysimusteplokk` (`kysimusteplokk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kysimus`
--

LOCK TABLES `kysimus` WRITE;
/*!40000 ALTER TABLE `kysimus` DISABLE KEYS */;
INSERT INTO `kysimus` VALUES (1,'1.2. Olen teadlik õppimist mõjutavatest teguritest ja seaduspärasustest (üldpädevustest, grupiprotsessidest ja õppija toetamise tõenduspõhistest võimalustest, sh refleksioonimudelite kasutamise vajalikkusest)',1),(2,'1.3. Hoian end kursis õppimist ja õppija arengut puudutava terminoloogiaga ning uuema teadmuse ja uuringutega',1),(3,'1.4.  Olen teadlik digilahenduste kasutamise võimalustest ja sellega seotud riskidest õppimisel',1),(4,'1.5. Selgitan välja rühma ja õppija ainealase, õpioskuste ja õpimotivatsiooni taseme ja nõustan antud valdkonnas kolleege ',1),(5,'1.6. Kogun koostöös kolleegidega õppeprotsessi kohta infot ja uurin võimalusi, kuidas toetada õppija terviklikku arengut ja valmisolekut õppimiseks. ',1),(6,'1.7 Kasutan arenguvestlusi õppija arengu toetamiseks. ',1),(7,'1.8 Märkan õppija õppijaid, kes vajavad tuge ning nende individuaalseid õpivajadusi',1),(8,'1.9. Kaasan ja teen koostööd tugispetsialistide ning kolleegidega abi- ja toetusvajaduse väljaselgitamisel (vajadusel õppija individuaalse arengu kaardi täitmine, arvestades tema eripära arengu dünaamikat), õppe- ja arendustegevuse planeerimisel ning rakendamisel (sobiva õppemetoodika ja -vormi leidmisel, õppe jõukohastamisel, õppematerjalide kohandamisel, abivahendite rakendamisel, individuaalse õppe korralduse kava planeerimisel, individuaalse õppekava ja/või käitumise tugikava koostamisel)',1),(9,'1.11 Koostöös lapsevanematega toetan ja suunan õppijat',1),(10,'1.12. Toetan õppijate sotsiaalsete ja koostööoskuste arengut;',1),(11,'1.13. Töötan koostöös õppija(te)ga välja ühistel väärtustel põhinevad kokkulepped',1),(12,'1.14. Suunan õppijaid üksteisega arvestama ja üksteist toetama (arvesse võttes rühmaprotsesse ja -dünaamikat)',1),(13,'1.15. toetab ühtsustunnet rühmas ja haridusasutuses.',1),(14,'2.1. Sean  lähtuvalt õppijatest pika- ja lühiajalised õpieesmärgid (valides sisu ning kavandades tegevused, arvestades õppekavaga)',2),(15,'2.2. Lähtuvalt eesmärkidest valin õpetamiseks, õppimiseks ja tagasisidestamiseks sobivad meetodid',2),(16,'2.3. Koostan (koostöös teiste spetsialistidega ning vajadusel) individuaalse õppekava, käitumise tugikava ja/või arenduskava, arvestades hariduslike erivajadustega õppija toetamise põhimõtteid ning õppijate igakülgset arengut',2),(17,'2.5. Valin  õpieesmärkidest lähtudes ning õppijate ja rühma tasemele sobiva õpivara, arvestades teaduspõhisuse ja parimate praktikatega.',2),(18,'2.6..  Märkan õpivara puudusi ja teen organisatsiooni (aine)valdkonna juhtidele ettepanekuid  õpivara kohandamiseks ja koostamiseks',2),(19,'2.7. Kohandan õpivara, arvestades õppijate vajadusi, võimalikke piiranguid, sh autoriõigusi, kättesaadavust, usaldusväärsust; ',2),(20,'2.8. Loon, otsin ja jagan digitaalset õpivara ja digitehnoloogiaid, mis võimaldavad tõhusalt saavutada õpieesmärke',2),(21,'2.9. Kujundan füüsiliselt, vaimselt ja emotsionaalselt turvalise heaolu, tervist, arengut ja loovust toetava koostöise õpikeskkonna, lähtudes õppijate vajadustest ja õpieesmärkidest ning ühistest kokkulepitud väärtustest; ',2),(22,'2.10. Panustan organisatsiooni õpikeskkonna kujundamisse.',2),(23,'3.1. Märkan ja arvestan õppijate erinevaid huvisid, võimeid ja vajadusi (sh hariduslikke erivajadusi, kultuurilist eripära jm), tagades võimetekohase õppe',3),(24,'3.2.  Arvestan peamiste tunnetusprotsessidega (taju, tähelepanu, mälu, mõtlemine, täidesaatvad funktsioonid) õppija toetamisel',3),(25,'3.3. Kogun andmeid õppijate arengu ja õppeprotsessi tõhususe kohta; kasutan digitehnoloogiaid õppijate õppimisse kaasatuse suurendamiseks',3),(26,'3.5. Kasutan digitehnoloogiaid õppijate õppimisse kaasatuse suurendamiseks',3),(27,'3.6. Personaliseerin õpiteid digitehnoloogiate abil',3),(28,'3.7. Loon teadlikult hooliva, kiusamisvaba ja koostöise õhkkonna (sh digikeskkonnas), lähtudes ühistel väärtustel tuginevatest kokkulepetest, õppija(te) individuaalsetest vajadustest, õpieesmärkidest ja kaasava hariduse põhimõtetest',3),(29,'3.8. Loon turvalise ja tervist toetava õpikeskkonna, tegutsen esmaabi vajavas situatsioonis sobival viisil',3),(30,'3.9. Juhin klassi/rühma, arvestades grupi arengufaase',3),(31,'3.10.   Märkan ja ennetan konflikte, leides tõhusaid lahendusi ning vajadusel kaasates kolleege, õppijaid, lapsevanemaid ja tugispetsialiste',3),(32,'3.12. Õpetan, lähtudes õppija eripärast, seatud eesmärkidest, õpiväljunditest ja ainetevahelisest lõimingust, kasutades erinevaid õppevorme ja -meetodeid toetamaks õppijate õpi- ja ainealaste oskuste arengut, järgides kaasava hariduse põhimõtteid',3),(33,'3.13.  Analüüsin õpetamist ning kohandan tegevusi ja keskkonda paindlikult, arvestades õppijate (liikumis)vajadusi',3),(34,'3.14.  Tagan vajaliku toe ja analüüsin tugimeetmete toimet koostöös teiste spetsialistidega',3),(35,'3.15. Toetan üldpädevuste arengut ja ennastjuhtiva õppija kujunemist, suunates õppijat õpieesmärkide seadmisele ja eneseanalüüsile;',3),(36,'3.16. Toetan õpimotivatsiooni, pakkudes õppeprotsessis valikuid, elulisi jõukohaseid õppeülesandeid',3),(37,'3.18. Suunan õpilasi rakendama info otsimisel, suhtlemisel ja sisuloomes digitehnoloogiaid',3),(38,'3.19.  Korraldan klassis/rühmas digitehnoloogiate mõtestatud kasutamist individuaalsel ja koostöisel õppimisel, sh probleemide lahendamisel',3),(39,'3.20. Rakendan süsteemselt erinevaid õppimist toetavaid tagasisidestamise ja hindamise viise, sh digitehnoloogiaid, lähtudes õppija eripärast ja hindamist reguleerivatest dokumentidest',3),(40,'3.23. Toetan õppijaid enesehindamisoskuste arendamisel',3),(41,'3.24. Kooskõlastan nii õppijate ja kui ka lapsevanematega  tagasisidestamise põhimõtted ja korralduse',3),(42,'4.1. Reflekteerin oma tööd, sh analüüsin oma õpetamise mõju, kasutades erinevaid meetodeid, kaasates kolleege ja osaledes õpikogukondades, sh virtuaalsetes',4),(43,'4.2. Kogun pidevalt tagasisidet õppijate õpitegevuste ning -tulemuste kohta, kavandades muudatusi õpetamis- ja kasvatusprotsessis ',4),(44,'4.3. Koostan enda professionaalse arengu kava ja määratlen õppimisvajaduse (arvestades ka haridusasutuse arenguvajadusi ja riiklikke haridusprioriteete)',4),(45,'4.4. Kasutan digikeskkondi enda pkutsealaseks arendamiseks',4),(46,'4.5. Analüüsin haridusuuringute tulemusi ning rakendan neid oma töös',4),(47,'4.6. Viin läbi (tegevus) uuringuid klassi/rühma ja haridusasutuse tasandil, et analüüsida õpiprotsessi ja määratleda probleeme, koguda tõendeid praktikast',4),(48,'4.7. Jagan tõenduspõhist teadmust kolleegide ja koostööpartneritega',4),(49,'4.8. Jälgin, hindan ning väärtustan oma füüsilist, vaimset ja emotsionaalset tervist. Hoian neid tasakaalus',4),(50,'4.9. Otsin probleemide tekkimisel (vajadusel) abi kolleegidelt, juhtkonnalt jt',4),(51,'5.1. Loon usaldusliku suhte õppija ja lapsevanemaga ',5),(52,'5.2. Algatan ja teen koostööd /lapsevanem, kolleeg jt) õppija arengu toetamiseks, kaasates aruteludesse, õppeprotsessi, haridusasutuse algatustesse ja tegevustesse',5),(53,'5.3. Teavitan õppijaid ja lapsevanemaid õppekavast, õppekorraldusest, õppimise põhimõtetest ja haridusvaldkonna uuendustest',5),(54,'5.5. Tagasisidestan õppija edenemist (õppijale ja lapsevanemale)',5),(55,'5.6. Kaasan lapsevanemaid õppija arengut puudutavate otsuste tegemisse ning nende rakendamisse',5),(56,'5.8. Jagan lapsevanematele tõenduspõhiseid õppimis- ja õpetamisalaseid materjale',5),(57,'tegutseb meeskonnaliikmena õpikogukonnas enda ja kolleegide professionaalse arengu ning selle kaudu õppija arengu toetamise eesmärgil. ',5),(58,'6.1. Osalen õpikogukondades ja koostöövõrgustikes erialase teadmuse arendamisel;',6),(59,'6.2. Osalen aine-/eriala populariseerivate sündmuste ja projektide läbiviimisel',6),(60,'6.3. Osalen organisatsiooni arengut suunavate dokumentide koostamisel',6),(61,'6.4. Osalen valdkonna ühenduste ja ekspertgruppide töös',6),(62,'6.5. Annan sisendit ja tagasisidet eelnõudele, ettepanekutele, arengukavadele jm',6);
/*!40000 ALTER TABLE `kysimus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kysimus_vastus`
--

DROP TABLE IF EXISTS `kysimus_vastus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kysimus_vastus` (
  `kysimus_vastus_id` int NOT NULL AUTO_INCREMENT,
  `profiil_kysimustik_id` int NOT NULL,
  `kysimus_id` int NOT NULL,
  `vastus` varchar(255) NOT NULL,
  `eneseanalyys_id` int NOT NULL,
  PRIMARY KEY (`kysimus_vastus_id`),
  KEY `kysimus_vastus_Kysimus` (`kysimus_id`),
  KEY `kysimus_vastus_eneseanalyys` (`eneseanalyys_id`),
  KEY `kysimus_vastus_profiil_kysimustik` (`profiil_kysimustik_id`),
  CONSTRAINT `kysimus_vastus_eneseanalyys` FOREIGN KEY (`eneseanalyys_id`) REFERENCES `eneseanalyys` (`eneseanalyys_id`),
  CONSTRAINT `kysimus_vastus_Kysimus` FOREIGN KEY (`kysimus_id`) REFERENCES `kysimus` (`kysimus_id`),
  CONSTRAINT `kysimus_vastus_profiil_kysimustik` FOREIGN KEY (`profiil_kysimustik_id`) REFERENCES `profiil_kysimustik` (`profiil_kysimustik_id`)
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kysimus_vastus`
--

LOCK TABLES `kysimus_vastus` WRITE;
/*!40000 ALTER TABLE `kysimus_vastus` DISABLE KEYS */;
INSERT INTO `kysimus_vastus` VALUES (1,1,1,'2',1),(2,1,2,'3',2),(3,1,3,'3',3),(4,1,4,'2',4),(5,1,5,'1',5),(6,1,6,'2',6),(7,1,7,'1',7),(8,1,8,'3',8),(9,1,9,'2',9),(10,1,10,'3',10),(11,1,11,'1',11),(12,1,12,'3',12),(13,1,13,'2',13),(14,1,14,'1',14),(15,1,15,'1',15),(16,1,16,'1',16),(17,1,17,'3',17),(18,1,18,'3',18),(19,1,19,'1',19),(20,1,20,'2',20),(21,1,21,'1',21),(22,1,22,'3',22),(23,1,23,'1',23),(24,1,24,'2',24),(25,1,25,'2',25),(26,1,26,'3',26),(27,1,27,'3',27),(28,1,28,'3',28),(29,1,29,'2',29),(30,1,30,'2',30),(31,1,31,'1',31),(32,1,32,'3',32),(33,1,33,'1',33),(34,1,34,'2',34),(35,1,35,'3',35),(36,1,36,'3',36),(37,1,37,'2',37),(38,1,38,'1',38),(39,1,39,'1',39),(40,1,40,'2',40),(41,1,41,'3',41),(42,1,42,'1',42),(43,1,43,'2',43),(44,1,44,'3',44),(45,1,45,'2',45),(46,1,46,'3',46),(47,1,47,'1',47),(48,1,48,'2',48),(49,1,49,'3',49),(50,1,50,'2',50),(51,1,51,'3',51),(52,1,52,'2',52),(53,1,53,'2',53),(54,1,54,'1',54),(55,1,55,'2',55),(56,1,56,'1',56),(57,1,57,'2',57),(58,1,58,'1',58),(59,1,59,'1',59),(60,1,60,'3',60),(61,1,61,'3',61),(62,1,62,'1',62),(63,1,1,'2',63),(64,1,2,'3',64),(65,1,3,'3',65),(66,1,4,'2',66),(67,1,5,'1',67),(68,1,6,'2',68),(69,1,7,'1',69),(70,1,8,'3',70),(71,1,9,'2',71),(72,1,10,'3',72),(73,1,11,'1',73),(74,1,12,'3',74),(75,1,13,'2',75),(76,1,14,'1',76),(77,1,15,'1',77),(78,1,16,'1',78),(79,1,17,'3',79),(80,1,18,'3',80),(81,1,19,'1',81),(82,1,20,'2',82),(83,1,21,'1',83),(84,1,22,'3',84),(85,1,23,'1',85),(86,1,24,'2',86),(87,1,25,'2',87),(88,1,26,'3',88),(89,1,27,'3',89),(90,1,28,'3',90),(91,1,29,'2',91),(92,1,30,'2',92),(93,1,31,'1',93),(94,1,32,'3',94),(95,1,33,'1',95),(96,1,34,'2',96),(97,1,35,'3',97),(98,1,36,'3',98),(99,1,37,'2',99),(100,1,38,'1',100),(101,1,39,'1',101),(102,1,40,'2',102),(103,1,41,'3',103),(104,1,42,'1',104),(105,1,43,'2',105),(106,1,44,'3',106),(107,1,45,'2',107),(108,1,46,'3',108),(109,1,47,'1',109),(110,1,48,'2',110),(111,1,49,'3',111),(112,1,50,'2',112),(113,1,51,'3',113),(114,1,52,'2',114),(115,1,53,'2',115),(116,1,54,'1',116),(117,1,55,'2',117),(118,1,56,'1',118),(119,1,57,'2',119),(120,1,58,'1',120),(121,1,59,'1',121),(122,1,60,'3',122),(123,1,61,'3',123),(124,1,62,'1',124),(125,1,1,'1',125),(126,1,2,'3',126),(127,1,3,'2',127),(128,1,4,'2',128),(129,1,5,'3',129),(130,1,6,'1',130),(131,1,7,'1',131),(132,1,8,'1',132),(133,1,9,'3',133),(134,1,10,'2',134),(135,1,11,'2',135),(136,1,12,'2',136),(137,1,13,'2',137),(138,1,14,'1',138),(139,1,15,'3',139),(140,1,16,'1',140),(141,1,17,'2',141),(142,1,18,'3',142),(143,1,19,'3',143),(144,1,20,'3',144),(145,1,21,'3',145),(146,1,22,'3',146),(147,1,23,'1',147),(148,1,24,'2',148),(149,1,25,'3',149),(150,1,26,'2',150),(151,1,27,'3',151),(152,1,28,'3',152),(153,1,29,'2',153),(154,1,30,'3',154),(155,1,31,'2',155),(156,1,32,'2',156),(157,1,33,'3',157),(158,1,34,'3',158),(159,1,35,'3',159),(160,1,36,'1',160),(161,1,37,'2',161),(162,1,38,'1',162),(163,1,39,'1',163),(164,1,40,'2',164),(165,1,41,'3',165),(166,1,42,'1',166),(167,1,43,'3',167),(168,1,44,'2',168),(169,1,45,'3',169),(170,1,46,'2',170),(171,1,47,'2',171),(172,1,48,'3',172),(173,1,49,'3',173),(174,1,50,'1',174),(175,1,51,'1',175),(176,1,52,'2',176),(177,1,53,'3',177),(178,1,54,'2',178),(179,1,55,'1',179),(180,1,56,'3',180),(181,1,57,'2',181),(182,1,58,'3',182),(183,1,59,'3',183),(184,1,60,'3',184),(185,1,61,'3',185),(186,1,62,'3',186);
/*!40000 ALTER TABLE `kysimus_vastus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kysimuse_tagasiside`
--

DROP TABLE IF EXISTS `kysimuse_tagasiside`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kysimuse_tagasiside` (
  `kysimuse_tagasiside_id` int NOT NULL AUTO_INCREMENT,
  `kysimus_vastus_id` int NOT NULL,
  `profiil_id` int NOT NULL,
  `tagasiside_tekst` varchar(500) DEFAULT NULL,
  `kas_on_nahtud` tinyint(1) NOT NULL,
  PRIMARY KEY (`kysimuse_tagasiside_id`),
  KEY `kysimuse_tagasiside_Profiil` (`profiil_id`),
  KEY `kysimuse_tagasiside_kysimus_vastus` (`kysimus_vastus_id`),
  CONSTRAINT `kysimuse_tagasiside_kysimus_vastus` FOREIGN KEY (`kysimus_vastus_id`) REFERENCES `kysimus_vastus` (`kysimus_vastus_id`),
  CONSTRAINT `kysimuse_tagasiside_Profiil` FOREIGN KEY (`profiil_id`) REFERENCES `profiil` (`profiil_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kysimuse_tagasiside`
--

LOCK TABLES `kysimuse_tagasiside` WRITE;
/*!40000 ALTER TABLE `kysimuse_tagasiside` DISABLE KEYS */;
/*!40000 ALTER TABLE `kysimuse_tagasiside` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kysimusteplokk`
--

DROP TABLE IF EXISTS `kysimusteplokk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kysimusteplokk` (
  `kysimusteplokk_id` int NOT NULL AUTO_INCREMENT,
  `kysimusteplokk_nimi` varchar(150) NOT NULL,
  `kysimustik_id` int NOT NULL,
  PRIMARY KEY (`kysimusteplokk_id`),
  KEY `KysimustePlokk_Kysimustik` (`kysimustik_id`),
  CONSTRAINT `KysimustePlokk_Kysimustik` FOREIGN KEY (`kysimustik_id`) REFERENCES `kysimustik` (`kysimustik_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kysimusteplokk`
--

LOCK TABLES `kysimusteplokk` WRITE;
/*!40000 ALTER TABLE `kysimusteplokk` DISABLE KEYS */;
INSERT INTO `kysimusteplokk` VALUES (1,'Õppija toetamine',1),(2,'Õpi- ja õpetamistegevuse kavandamine',1),(3,'Õpetamine',1),(4,'4. Refleksioon ja professionaalne enesearendamine',1),(5,'Koostöö ja juhendamine',1),(6,'Arendus, loome- ja teadustegevus',1);
/*!40000 ALTER TABLE `kysimusteplokk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kysimusteplokk_tagasiside`
--

DROP TABLE IF EXISTS `kysimusteplokk_tagasiside`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kysimusteplokk_tagasiside` (
  `kysimusteplokk_tagasiside_id` int NOT NULL AUTO_INCREMENT,
  `protsentuaalne_tulemus` decimal(4,2) NOT NULL,
  `profiil_kysimustik_id` int NOT NULL,
  `tagasiside_id` int NOT NULL,
  PRIMARY KEY (`kysimusteplokk_tagasiside_id`),
  KEY `KysimustePlokk_Tagasiside_Tagasiside` (`tagasiside_id`),
  KEY `KysimustePlokk_Tagasiside_profiil_kysimustik` (`profiil_kysimustik_id`),
  CONSTRAINT `KysimustePlokk_Tagasiside_profiil_kysimustik` FOREIGN KEY (`profiil_kysimustik_id`) REFERENCES `profiil_kysimustik` (`profiil_kysimustik_id`),
  CONSTRAINT `KysimustePlokk_Tagasiside_Tagasiside` FOREIGN KEY (`tagasiside_id`) REFERENCES `tagasiside` (`tagasiside_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kysimusteplokk_tagasiside`
--

LOCK TABLES `kysimusteplokk_tagasiside` WRITE;
/*!40000 ALTER TABLE `kysimusteplokk_tagasiside` DISABLE KEYS */;
INSERT INTO `kysimusteplokk_tagasiside` VALUES (1,71.79,1,2),(2,59.26,1,4),(3,70.18,1,6),(4,70.37,1,8),(5,61.90,1,10),(6,71.79,1,2),(7,59.26,1,4),(8,70.18,1,6),(9,70.37,1,8),(10,61.90,1,10),(11,64.10,1,2),(12,81.48,1,3),(13,73.68,1,6),(14,74.07,1,8),(15,66.67,1,10);
/*!40000 ALTER TABLE `kysimusteplokk_tagasiside` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kysimustik`
--

DROP TABLE IF EXISTS `kysimustik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kysimustik` (
  `kysimustik_id` int NOT NULL AUTO_INCREMENT,
  `kysimustik_pealkiri` varchar(255) NOT NULL,
  PRIMARY KEY (`kysimustik_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kysimustik`
--

LOCK TABLES `kysimustik` WRITE;
/*!40000 ALTER TABLE `kysimustik` DISABLE KEYS */;
INSERT INTO `kysimustik` VALUES (1,'KS tegevusnäitajad ja tagasiside Tase 7');
/*!40000 ALTER TABLE `kysimustik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oppematerjal`
--

DROP TABLE IF EXISTS `oppematerjal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oppematerjal` (
  `oppmaterjal_id` int NOT NULL AUTO_INCREMENT,
  `oppematerjal_nimi` varchar(100) NOT NULL,
  `oppematerjal_failinimi` varchar(250) NOT NULL,
  `profiil_id` int NOT NULL,
  `oppematerjal_kirjeldus` varchar(1000) NOT NULL,
  PRIMARY KEY (`oppmaterjal_id`),
  KEY `Oppematerjal_Profiil` (`profiil_id`),
  CONSTRAINT `Oppematerjal_Profiil` FOREIGN KEY (`profiil_id`) REFERENCES `profiil` (`profiil_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oppematerjal`
--

LOCK TABLES `oppematerjal` WRITE;
/*!40000 ALTER TABLE `oppematerjal` DISABLE KEYS */;
/*!40000 ALTER TABLE `oppematerjal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parooliauth`
--

DROP TABLE IF EXISTS `parooliauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parooliauth` (
  `ParooliAuth_id` int NOT NULL AUTO_INCREMENT,
  `kasutaja_id` int NOT NULL,
  `parool` varchar(255) NOT NULL,
  PRIMARY KEY (`ParooliAuth_id`),
  KEY `ParooliAuth_Kasutaja` (`kasutaja_id`),
  CONSTRAINT `ParooliAuth_Kasutaja` FOREIGN KEY (`kasutaja_id`) REFERENCES `kasutaja` (`kasutaja_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parooliauth`
--

LOCK TABLES `parooliauth` WRITE;
/*!40000 ALTER TABLE `parooliauth` DISABLE KEYS */;
/*!40000 ALTER TABLE `parooliauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiil`
--

DROP TABLE IF EXISTS `profiil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiil` (
  `profiil_id` int NOT NULL AUTO_INCREMENT,
  `eesnimi` varchar(100) NOT NULL,
  `perenimi` varchar(100) NOT NULL,
  `kasutaja_id` int NOT NULL,
  `kasutajaroll_id` int NOT NULL,
  `telefon` int NOT NULL,
  `tookoht` varchar(250) NOT NULL,
  `profiilipilt` varchar(500) DEFAULT NULL,
  `oppematerjal` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`profiil_id`),
  KEY `Profiil_Kasutaja` (`kasutaja_id`),
  KEY `Profiil_Kasutajaroll` (`kasutajaroll_id`),
  CONSTRAINT `Profiil_Kasutaja` FOREIGN KEY (`kasutaja_id`) REFERENCES `kasutaja` (`kasutaja_id`),
  CONSTRAINT `Profiil_Kasutajaroll` FOREIGN KEY (`kasutajaroll_id`) REFERENCES `kasutajaroll` (`kasutajaroll_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiil`
--

LOCK TABLES `profiil` WRITE;
/*!40000 ALTER TABLE `profiil` DISABLE KEYS */;
INSERT INTO `profiil` VALUES (1,'Maikel','Jack',1,1,54369823,'Tallinn','profilepic-1623744273038',NULL);
/*!40000 ALTER TABLE `profiil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiil_kysimustik`
--

DROP TABLE IF EXISTS `profiil_kysimustik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiil_kysimustik` (
  `profiil_kysimustik_id` int NOT NULL AUTO_INCREMENT,
  `kysimustik_id` int NOT NULL,
  `profiil_id` int NOT NULL,
  `kysimustik_autom_tagasiside` varchar(255) DEFAULT NULL,
  `kysimustik_protsentuaalne_tagasiside` int DEFAULT NULL,
  PRIMARY KEY (`profiil_kysimustik_id`),
  KEY `profiil_kysimustik_Kysimustik` (`kysimustik_id`),
  KEY `profiil_kysimustik_Profiil` (`profiil_id`),
  CONSTRAINT `profiil_kysimustik_Kysimustik` FOREIGN KEY (`kysimustik_id`) REFERENCES `kysimustik` (`kysimustik_id`),
  CONSTRAINT `profiil_kysimustik_Profiil` FOREIGN KEY (`profiil_id`) REFERENCES `profiil` (`profiil_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiil_kysimustik`
--

LOCK TABLES `profiil_kysimustik` WRITE;
/*!40000 ALTER TABLE `profiil_kysimustik` DISABLE KEYS */;
INSERT INTO `profiil_kysimustik` VALUES (1,1,1,NULL,NULL);
/*!40000 ALTER TABLE `profiil_kysimustik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `soovitus`
--

DROP TABLE IF EXISTS `soovitus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `soovitus` (
  `soovitus_id` int NOT NULL AUTO_INCREMENT,
  `soovitus_tekst` varchar(500) NOT NULL,
  `kysimus_id` int DEFAULT NULL,
  PRIMARY KEY (`soovitus_id`),
  KEY `Soovitus_Kysimus` (`kysimus_id`),
  CONSTRAINT `Soovitus_Kysimus` FOREIGN KEY (`kysimus_id`) REFERENCES `kysimus` (`kysimus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soovitus`
--

LOCK TABLES `soovitus` WRITE;
/*!40000 ALTER TABLE `soovitus` DISABLE KEYS */;
INSERT INTO `soovitus` VALUES (1,'Analüüsi oma teadmisi õppimist toetavate võimaluste kasutamisest, lisades tõenduspõhist materjali. Lisalugemine: https://www.riigiteataja.ee/akt/129082014020',1),(2,'Kirjelda õppimist ja õppija arengut puudutava terminoloogia lõimingut tuginedes oma kogemusele. Lisalugemine: https://www.european-agency.org/sites/default/files/profile_of_inclusive_teachers_et.pdf',2),(3,'Analüüsi digilahenduste kasutamist ning riske. Lisalugemine: https://www.hm.ee/sites/default/files/2_digiprogr_2019_22_seletuskiri_28dets18.pdf',3),(4,'Analüüsi ja arutle, kuidas selgitad välja ainealaste teadmise, õpioskuste ja -motivatsiooni taseme oma õpilaste hulgas. Lisalugemine: http://dspace.ut.ee/bitstream/handle/10062/16254/Oppimine_oppimisoskuste_arendamine.pdf?sequence=1',4),(5,'Analüüsi info kogumise ja õppija toetamise võimalusi, lisades tõenduspõhist materjali ning näiteid, Kirjeldaerinevaid võimalusi info kogumiseks too näiteid.  Lisalugemine:  https://opleht.ee/2019/11/lapse-oppimine-ja-oppimise-toetamine/',5),(6,'Kirjelda, kuidas selgitad välja toetusvajadusi, too näiteid. Lisalugemine: https://www.innove.ee/rajaleidja/juhendmaterjalid/',8),(7,'Arutle, kuidas teed koostööd lapsevanemaga, lisades tõenduspõhist materjali ning näiteid. Lisamaterjal: https://core.ac.uk/download/pdf/154745884.pdf',9),(8,'Kirjelda, kuidas toetad õppijate sotsiaalseid- ja koostööoskusi. Lisalugemine: https://koolielu.ee/info/readnews/552069/soovitused-koostool-pohineva-oppe-ja-koostoooskuste-opetamise-populariseerimiseks-koolides',10),(9,'Kirjelda, kuidas sõlmid õppijatega väärtuspõhiseid kokkuleppeid ja miks? Too näitieid. Lisalugemine: https://www.innove.ee/wp-content/uploads/2020/02/ERINEVATE-OPPIJATE-TOETAMINE_2019.pdf',11),(10,'Kirjelda ning analüüsi metoodikat, kuidas suunad õppijaid üksteisega arvestama, lisades tõenduspõhist materjali ning näiteid. Lisamaterjal:  https://www.youtube.com/watch?v=R1vskiVDwl4',12),(11,'Analüüsi õpieesmärkide kavandamise protsessi/vajalikkust, lisades tõenduspõhist materjali ning näiteid. Lisalugemine:  https://www.tlu.ee/opmat/ka/opiobjekt/t66pedagoogika/t66_ja_ettev6ttepedagoogika/pieesmrgid.html; ',14),(12,'Kirjelda, kuidas valid sobivat metoodikat, lisades tõenduspõhist materjali ning näiteid. Lisamaterjal: https://sisu.ut.ee/aktiivope/avaleht',15),(13,'Kirjelda HEV õppija toetamise põhimõtteid, lisades tõenduspõhist materjali ning näiteid',16),(14,'Analüüsi õpivara valimist, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://uudiskiri.e-ope.ee/2013/03/18/oppimine-aastal-2020/',17),(15,'Kirjelda oma kogemust õpivara osas (puudused, ettepanekud jm), lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://www.hm.ee/sites/default/files/oppevara_kaardistus_2016_0.pdf',18),(16,'Kirjelda oma kogemust õpivara kohandamisel pidades silmas ka autoriõigusi, lisades tõenduspõhist materjali ning näiteid . Lisalugemine: https://sisu.ut.ee/autorioigus/avaleht',19),(17,'Analüüsi, kuidas lood meeldiva ja koostöise õpikeskkonna, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://sisu.ut.ee/opikasitus/n%C3%BC%C3%BCdisaegse-%C3%B5pik%C3%A4situse-p%C3%B5hiprintsiibid',20),(18,'Kirjelda, kuidas märkad õppijat, lisades tõenduspõhist materjali ning näiteid. Lisamaterjal: https://www.innove.ee/wp-content/uploads/2020/02/ERINEVATE-OPPIJATE-TOETAMINE_2019.pdf',23),(19,'Analüüsi, kuidas arvestad õppijaga, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://core.ac.uk/download/pdf/154745748.pdf',24),(20,'Analüüsi oma osa õppijate õppimisse kaasamiseks, lisades tõenduspõhist materjali ning näiteid. Lisalugemine:  https://kompass.harno.ee/personaliseeritud-ope/#personaliseeritud-ope-ja-haridus',25),(21,'Analüüsi eesmärgipärast digitehnoloogia kasutust, lisades tõenduspõhist materjali ning näiteid. Lisamaterjal: https://kompass.harno.ee/turvaline-digimaailm',26),(22,'Kirjelda oma kogemust personaliseeritud õppe rakendamisel, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://kompass.harno.ee/personaliseeritud-ope/#personaliseeritud-ope-ja-haridus',27),(23,'Kirjelda oma kogemust kiusamisvaba ja koostöise õhkkonna loomisel, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://dspace.ut.ee/bitstream/handle/10062/64998/mottus_merit_ma.pdf?sequence=1&isAllowed=y',28),(24,'Analüüsi oma oskusi turvalise õpikeskkonna loomisel, lisades tõenduspõhist materjali ning näiteid. Lisalugemine:  https://www2.politsei.ee/dotAsset/557499.pdf',29),(25,'Kirjelda oma teadmisi ning kogemusi grupi arengufaaside juhtimisest, lisades tõenduspõhist materjali ning näiteid. Lisalugemine:  http://andragoogid.yolasite.com/grupiprotsesside-juhtimine.php',30),(26,'Analüüsi oma oskust märgata/ennetada ja lahendada konflikte, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://www.areng.ee/wp-content/uploads/Kuidas-K-ennetada-ja-keerulises-olukorras-posit.lahendus-leida.pdf',31),(27,'Analüüsi oma õpetamist (tegevuste kohandamist) arvestades õppijate vajadusi, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://sisu.ut.ee/tunni_analyys/teise-näidistunni-analüüs; https://sisu.ut.ee/tunni_analyys/2-tuntumad-õpetamise-ja-õppetunni-mudelid',32),(28,'Kirjelda vajalike tugimeetmete rakendamist ja toimimist, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://www.hm.ee/et/tegevused/hariduslike-erivajadustega-opilaste-toetamine-oppekorraldus-ja-tugiteenused',34),(29,'Analüüsi, kuidas toetan üldpädevuste ja ennastjuhtiva õppija arengut, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://opleht.ee/2020/08/ennastjuhtiv-oppija-kui-palju-meil-neid-siis-on/',35),(30,'Kirjelda kuidas toetad oma praktikas õpimotivatsiooni, lisades tõenduspõhist materjali ning näiteid. Lisamaterjal: https://www.tlu.ee/opmat/ka/opiobjekt/ME_Haridusest/laste_huvi_tstmine_hariduse_vastu.html',36),(31,'Analüüsi võimalusi infoga toimetamiseks digitehnoloogiate abil, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://digipadevus.ee/oppija-digipadevusmudel/',37),(32,'Analüüsi digitehnoloogia mõtestatud kasutamise vajalikkust, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://digipadevus.ee/oppija-digipadevusmudel/',38),(33,'Analüüsi tagasisidestamise korraldust, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://www.apa.org/ed/schools/teaching-learning/top-twenty-principles-estonian.pdf',39),(34,' Kirjelda oma tegevust õppija enesehindamisoskuste arendamise protsessis, lisades tõenduspõhist materjali ja näiteid. Lisalugemine: https://oppekava.ee/wp-content/uploads/sites/6/2017/01/Õpilase_enesehindamise_arendamine.pdf',40),(35,'Too näiteid juhendamistest.\nAnalüüsi tulemusi ja muutusi.',41),(36,'Reflekteeri oma tööd, sh analüüsi oma õpetamise mõju, isades tõenduspõhist materjali ning too näiteid. Kirjelda õppijate eripärasid ja õppija üldpädevuste arengu toetamist ja grupiprotsesse näidete varal. Lisalugemine: https://tulevikuopetaja.edu.ee/moodul-v/refleksioon-opetaja-professionaalses-arengus/',42),(37,'Analüüsi kogutud tagasisidet muudatuste sisse viimiseks, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://media.voog.com/0000/0034/3577/files/Kristi_Katrin.pdf',43),(38,'Kuidas määratled oma arenguvajadused ning mille alusel koostad professionaalse arengu kava, lisades tõenduspõhist materjali ning näiteid. https://portfooliokursus.files.wordpress.com/2010/10/opah_trykis_loplik.pdf',44),(39,'Kirjeldan, kuidas tulen toime pingega tööl ning kuidas maandan ennast, lisades tõenduspõhist materjali ning näiteid oma e-portfooliosse, analüüsi oma tegevusi. Lisa: https://koolitus.edu.ee/training/1619; https://zennative.ee/zen-native-blog/keha-ja-meele-heaolu/',49),(40,'Dokument, link, tagasiside osapooltelt, toimimise kirjeldus, väljavõte koosoleku protokollist vm dokumendist. Lisalugemine: http://andragoogika.tlu.ee/?page_id=819',52),(41,'Analüüsi ja lisa tõenduspõhiseid näiteid. Lisalugemine: https://www.riigiteataja.ee/akt/129082014020',53),(42,'Tagasiside näide (link, dokument jms). Lisalugemine: https://sisu.ut.ee/vaartuskommunikatsioon/%C3%B5ppe-protsess; https://sisu.ut.ee/6ppimisttoetavhindamine/t%C3%B5husa-tagasiside-tunnused',54),(43,'Analüüsi ja kirjelda lapsevanemate kaasamise protsessi, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://www.schooleducationgateway.eu/et/pub/viewpoints/surveys/poll-on-parents.htm',55),(44,'Näited tõendavatest õppimis- ja õpetamismaterjalide (artiklid, raamatud, veebimaterjalid jm) jagamisest',56),(45,'Erialane teadmus – näited oma valdkonna loometegevusest (õppematerjal, tööjuhendid vm) ja tulevikuplaanidest.',58),(46,'Oma tegevuse kirjeldus ja analüüs',59),(47,'Too näiteid (fotod, lingid vms)',60),(48,'Töörühma (õpetajahariduse) tõend, link sündmusele',61),(49,'Kirjelda oma panust õpetajahariduse valdkonna arendustegevuses. Näited teadusuuringute algatamisest riiklikul tasandil, tegevus-, arendusuuringud organisatsioonis (link, viide, dokument).',62);
/*!40000 ALTER TABLE `soovitus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tagasiside`
--

DROP TABLE IF EXISTS `tagasiside`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tagasiside` (
  `tagasiside_id` int NOT NULL AUTO_INCREMENT,
  `tagasiside_tekst` text NOT NULL,
  `kysimusteplokk_id` int NOT NULL,
  `vahemikMax` int NOT NULL,
  `vahemikMin` int NOT NULL,
  PRIMARY KEY (`tagasiside_id`),
  KEY `Tagasiside_KysimustePlokk` (`kysimusteplokk_id`),
  CONSTRAINT `Tagasiside_KysimustePlokk` FOREIGN KEY (`kysimusteplokk_id`) REFERENCES `kysimusteplokk` (`kysimusteplokk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tagasiside`
--

LOCK TABLES `tagasiside` WRITE;
/*!40000 ALTER TABLE `tagasiside` DISABLE KEYS */;
INSERT INTO `tagasiside` VALUES (1,'Õpetajana võimestad õppijat  ja oled tema arengupartner. Toetad tähenduslikku õppimist ja läbi selle õppija potentsiaali, tuginedes riiklikes õppekavades seatud eesmärkidele. Teed koostööd kolleegidega, jagad häid praktikaid ning nõustad kolleege. Juhid õppeprotsessi analüüsiprotsesse ning panustad õppeasustuse sisesse arenguvestluste süsteemi. Arendad süsteemselt  oma kutseoskusi ja oled kursis haridusuuendustega.',1,100,80),(2,'Õpetajana püüad võimestada õppijat  ja olla tema arengupartner.  Sinu jaoks on oluline  jõuda õpilaste tähendusliku õppimiseni ja läbi selle toetada õppija potentsiaali, tuginedes riiklikes õppekavades seatud eesmärkidele. Teed koostööd kolleegidega, jagad häid praktikaid ning nõustad kolleege. Analüüsid õppeprotsessi ning oled teadlik õppimise olemusest. Arendad süsteemselt  oma kutseoskusi ja oled kursis haridusuuendustega.',1,79,50),(3,'Õpetajana arvestad õppijaga, sead pika- ja lühiajalised õpieesmärgid, valid sisu ning kavandad õpitegevusi, arvestades õppekava.  Valid õpetamiseks, õppimiseks ja tagasisidestamiseks sobivad meetodid. Toetad ja arendad igakülgselt HEV õppijate arengut. Valid õpivara hulgast õpieesmärkide ning õppijate ja rühma tasemega sobiva, arvestades sh teaduspõhisuse ja parimate praktikatega. Suhtud kriitiliselt õpivara puudustesse ja teed piirkonna või riigi tasandil (aine)valdkonna juhtidele või ühendustele ettepanekuid õpivara kohandamiseks ja koostamiseks. Oled kursis autoriõigustega, samuti õppimist toetavate digitaalse õpivara ja digitehnoloogiatega. Tagad turvalise ja  koostöise õpikeskkonna. Juhendad kolleege ja jagad parimaid praktikaid õpikeskkonna arendamiseks.',2,100,80),(4,'Arvestades õppekavaga sead õppijatest lähtuvalt pika- ja lühiajalised õpieesmärgid.  Valid õppimiseks ja tagasisidestamiseks sobivad meetodid. Teed koostööd teiste spetsialistidega (vajadusel koostad individuaalse õppekava, käitumise tugikava ja/või arenduskava). Püüad arvestada HEV õppijaga  ja püüdes tagada tema igakülgset arengut. Valid õpivara hulgast õpieesmärkide ning õppijate ja rühma tasemele sobiva, märkad õpivara puudusi ja teed organisatsiooni (aine)valdkonna juhtidele ettepanekuid õpivara kohandamiseks ja koostamiseks. Oled kursis autoriõigustega, samuti õppimist toetavate digitaalse õpivara ja digitehnoloogiatega.\nLähtudes õppijate vajadustest ja õpieesmärkidest ning ühistest kokkulepitud väärtustest kujundad  turvalise ning toetava koostöise õpikeskkonna.',2,79,50),(5,'Märkad ja arvestad õppijate erinevaid huvisid, võimeid ja vajadusi tagades võimetekohase õppe; arvestades peamiste tunnetusprotsessidega õppija toetamisel. Juhendad kolleege õppijate arengu toetamisel; teeb organisatsioonis ettepanekuid õpetajate koolitamise ja koostöö kaudu õppijate arengu toetamiseks.  Kasutad eesmärgipäraselt digitehnoloogiaid õppijate õppimisse kaasatuse suurendamiseks ning õpiprotsessi toetamiseks.\nÕpetajana lood teadlikult turvalise, kiusamisvaba ja koostöise õhkkonna (sh digikeskkonnas), lähtudes kokkulepetest ja õppija individuaalsetest vajadustest, õpieesmärkidest ja kaasava hariduse põhimõtetest.  Klassi/rühma juhtides oslad arvestada grupi arengufaasidega. Konfliktide lahendamisel kaasad vajadusel kolleege, õppijaid, lapsevanemaid ja tugispetsialiste. Algatad ja juhid organisatsioonis ühiste väärtuste ja kokkulepete mõtestamist ning juurutamist.\nÕpetamisel lähtud õppijast, eelnevalt seatud eesmärkidest, õpiväljunditest ja ainetevahelisest lõimingust. Kasutad õpitegevuse läbi viimisel erinevaid õppevorme ja -meetodeid toetamaks õppijate õpi- ja ainealaste oskuste arengut, järgides kaasava hariduse põhimõtteid. Toetab õpimotivatsiooni ja pakud õppijale elulisi jõukohaseid õppeülesandeid. Juhendad ja koolitad kolleege õpetamisel ja õppeprotsessi analüüsimisel.  Toetad õppetegevuse arendamist ning tõhustamist kooli kontekstis ja juhid organisatsioonis ühiste põhimõtete väljatöötamist digitehnoloogiate läbivaks kasutamiseks õppimisel.\nOled kursis õppimist toetava ja tagasisidestamise erinevate viisidega sh digitehnoloogiaid, koostades hindamismudeleid/-kriteeriume ja  toetades õppija enesehindamisoskuste arendamiset, pakkudes tuge kolleege õppijaid toetaval tagasisidestamisel ja hindamisel ning hindamismudelite/-kriteeriumide koostamisel; teeb ettepanekuid õppimist toetava tagasisidestamise ja hindamise kohta; loob koostöös kolleegidega organisatsioonis ühised põhimõtted hindamise tõhustamiseks digitehnoloogiate abil.',3,100,80),(6,'Märkad ja arvestad õppijate erinevaid huvisid, võimeid ja vajadusi tagades võimetekohase õppe. Juhendad kolleege õppijate arengu toetamisel. Teed oma koolis ettepanekuid õpetajate koolitamiseks ja koostöö kaudu õppijate arengu toetamiseks.  Kasutad eesmärgipäraselt digitehnoloogiaid õppijate õppimisse kaasatuse suurendamiseks ning õpiprotsessi toetamiseks.\nÕpetajana lood teadlikult turvalise, kiusamisvaba ja koostöise õhkkonna (sh digikeskkonnas), lähtudes kokkulepetest ja õppija individuaalsetest vajadustest, õpieesmärkidest ja kaasava hariduse põhimõtetest.  Klassi/rühma juhtides oskad arvestada grupi arengufaasidega. Õpetamisel lähtud eelkõige õppijast, eelnevalt seatud eesmärkidest, õpiväljunditest ja ainetevahelisest lõimingust. Kasutad õpitegevuse läbiviimisel erinevaid õppevorme ja -meetodeid. Toetab õpimotivatsiooni ja püüad pakkuda õppijale elulisi ning jõukohaseid õppeülesandeid. Juhendad ja koolitad kolleege õpetamisel ja õppeprotsessi analüüsimisel.  Toetad õppetegevuse arendamist ning tõhustamist kooli kontekstis. \nOled kursis õppimist toetava ja tagasisidestamise erinevate viisidega sh digitehnoloogiaid, koostad hindamismudeleid/-kriteeriume.  Toetad kolleege õppija tagasisidestamisel ja hindamisel ning hindamismudelite/-kriteeriumide koostamisel.  Koostöös kolleegidega loote oma koolis ühised põhimõtted hindamise tõhustamiseks digitehnoloogiate abil.',3,79,50),(7,'Reflekteerid oma tööd. Oled õpetaja, kes püüab regulaarselt koguda tagasisidet õppijate õpitegevuste ning -tulemuste kohta ning vastavalt sellele kavandada muudatusi õpetamis- ja kasvatusprotsessis. Oled aldis ennast täiendkoolitama. Toetad kolleege oma töö reflekteerimisel ja enesearendusvajaduste määratlemisel. Oled aktiivne õpikogukonns juht/liige. Tunned end kindlalt  digikeskkondades. Oled kursis ning analüüsid / tõlgendad haridusuuringute tulemusi, rakendades neid oma töös. Teed koostööd ülikoolide ja teiste asutustega nii üle riigilisel / rahvusvahelisel tasemel; jagad tõenduspõhist teadmust kolleegide ning koostööpartneritega;',4,100,80),(8,'Reflekteerid oma tööd. Oled õpetaja, kes püüab regulaarselt koguda tagasisidet õppijate õpitegevuste ning -tulemuste kohta ning vastavalt sellele kavandada muudatusi õpetamis- ja kasvatusprotsessis. Oled aldis ennast täiendkoolitama. Toetad kolleege oma töö reflekteerimisel ja enesearendusvajaduste määratlemisel. Oled aktiivne õpikogukonna liige. Tunned end kindlalt  digikeskkondades. Oled kursis ning analüüsid / tõlgendad haridusuuringute tulemusi, rakendades neid oma töös. Jagad tõenduspõhist teadmust kolleegide ning koostööpartneritega;',4,79,50),(9,'Teed aktiivselt koostööd lapsevanematega ja kolleegidega  õppija arengu toetamiseks. Tagasisidestad oma tegevust nii õppijale kui lapsevanemale. Oskad juhehendada  lapsevanemaid õppimist toetava kodukeskkonna loomisel ja õppija õpioskuste arendamisel; jagades lapsevanematele tõenduspõhiseid õppimis- ja õpetamisalaseid materjale (artiklid, raamatud, veebimaterjalid jm). Tegeled   kolleegide juhendamisega ja  nõustamisega. Analüüsid ja tagasisidestad  kolleegi õpetamistegevust. Määrad kolleegide koolitusvajadusi ning algatad ja toetad õpetajatevahelist koostööd ja kogemuste vahetamist.  ',5,100,80),(10,'Teed  koostööd lapsevanematega ja kolleegidega  õppija arengu toetamiseks. Tagasisidestad oma tegevust nii õppijale kui lapsevanemale. Vajadusel juhendad  lapsevanemaid õppimist toetava kodukeskkonna loomisel ja õppija õpioskuste arendamisel; jagades lapsevanematele tõenduspõhiseid õppimis- ja õpetamisalaseid materjale (artiklid, raamatud, veebimaterjalid jm). Pööra rohkem tähelepanu kolleegide juhendamisele ja  nõustamisele. Analüüsi ja tagasisidesta  kolleegi õpetamistegevust. Määratle kolleegide koolitusvajadusi ning algata ja toeta õpetajatevahelist koostööd ja kogemuste vahetamist. ',5,79,50),(11,'Lood õpetajana õppija ja lapsevanematega usaldusliku suhte. Panustad õppeprotsessi, haridusasutuse algatustesse ja tegevustesse. Selgitad osapooltele haridusvaldkonna uuendusi; toetad kolleege osapoolte kaasamisel.\nTagasisidestad õppija progressi õppijale ja lapsevanematele, kaasates aktiivselt lapsevanemaid. Juhendad lapsevanemaid õppimist toetava kodukeskkonna loomisel ja õppija õpioskuste arendamisel. Juhendad ja toetad kolleege.\nVaatled kolleegi õpetamistegevust; jälgides, analüüsides ja tagasisidestades kolleegi tegevust. Märkad edusamme ja tunnustad ja nõustad kolleege enese arengu eesmärkide seadmisel ja õpetamisoskuste arendamisel.  Toetad õpetajatevahelist koostööd ja kogemuste vahetamist; oled aktiivne õpikogukonna  liige või  juht toetades kolleegide professionaalset arengut.',6,100,80),(12,'Lood õpetajana õppija ja lapsevanematega usaldusliku suhte. Panustad õppeprotsessi, haridusasutuse algatustesse ja tegevustesse. Selgitad osapooltele haridusvaldkonna uuendusi; toetad kolleege osapoolte kaasamisel. Tagasisidestad õppija progressi õppijale ja lapsevanematele, kaasates aktiivselt lapsevanemaid. Juhendad lapsevanemaid õppimist toetava kodukeskkonna loomisel ja õppija õpioskuste arendamisel. Juhendad ja toetad kolleege.  Märkad edusamme ja tunnustad ja nõustad kolleege enese arengu eesmärkide seadmisel ja õpetamisoskuste arendamisel. Toetad õpetajatevahelist koostööd ja kogemuste vahetamist; oled aktiivne õpikogukonna liige või juht toetades kolleegide professionaalset arengut.',6,79,50),(13,'',1,50,0),(14,'',2,50,0),(15,'',3,50,0),(16,'',4,50,0),(17,'',5,50,0),(18,'',6,50,0);
/*!40000 ALTER TABLE `tagasiside` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'opetajaprofareng2'
--

--
-- Dumping routines for database 'opetajaprofareng2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-15 12:34:44
