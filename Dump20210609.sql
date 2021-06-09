CREATE DATABASE  IF NOT EXISTS `opetajaprofareng` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `opetajaprofareng`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: opetajaprofareng
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autentimisetyyp`
--

LOCK TABLES `autentimisetyyp` WRITE;
/*!40000 ALTER TABLE `autentimisetyyp` DISABLE KEYS */;
INSERT INTO `autentimisetyyp` VALUES (1,'ParooliAuth'),(2,'IDAuth');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autentimisetyyp_kasutaja`
--

LOCK TABLES `autentimisetyyp_kasutaja` WRITE;
/*!40000 ALTER TABLE `autentimisetyyp_kasutaja` DISABLE KEYS */;
INSERT INTO `autentimisetyyp_kasutaja` VALUES (1,1,1),(2,2,1),(3,3,1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eneseanalyys`
--

LOCK TABLES `eneseanalyys` WRITE;
/*!40000 ALTER TABLE `eneseanalyys` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kasutaja`
--

LOCK TABLES `kasutaja` WRITE;
/*!40000 ALTER TABLE `kasutaja` DISABLE KEYS */;
INSERT INTO `kasutaja` VALUES (1,'maitjurask',''),(2,'martinkilgi',''),(3,'testopetaja',''),(4,'test@gmail.com','$2b$10$mTaAxERj2olAjDiKMw9h2eOv/SuUIhQW9bnELiTOJI0DjMyMGUGiO'),(5,'martink@gmail.ee','$2b$10$wSHiXRuKS5gsfgrq.B2hqeljAVjvtvEcwYu87/FgF3feprOzV37tW'),(6,'veeltest@gmal.com','$2b$10$z8jrFqGZk83jZ8PedxqHyef9B4wSDTWShyeabu.2xp6NpvPrKbZYS'),(7,'testtest@gmail.com','$2b$10$cLVJp0xBRhCuO4TsvdygXOEyF.YH8iPAvQlhwXtZCoc4IRuHGiwjm'),(8,'testtesttest@gmail.com','$2b$10$f9Xs8x0yHwuwTy4q70OxqO/OgP/UzPlm.1X.fnYrrNL5O2EgsdXUS'),(16,'mihkeljaakson@gmail.com','$2b$10$NPxtEPMJng/eBtTOHXfMmOTngdqwEvW89rtnU9Hx/cpHmJ9l6scCC'),(21,'maikeljack@gmail.com','$2b$10$l4iUx9x8V3pFshEDproyC.C2VenbHvqoCD0f2n3yYnr3aFMa/vhDy'),(22,'testkasutaja@gmail.com','$2b$10$diz6WJ6VT01YhW1BeK3CTeQvBtL.qrDj108U6dItF56vXB03yWEfa'),(23,'ykstest@gmail.com','$2b$10$OzpIp1ZlxecsQk6/N7dR2ORbTlh/i93TIEfT8ddB0Nke97dUSWbMK'),(24,'anothertest@gmail.com','$2b$10$Pg47FZjiEJgBH/Gq6qWkBuKOoZLtvq49bmyhkOl3cmtJ5v.DvYeqO');
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
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kysimus`
--

LOCK TABLES `kysimus` WRITE;
/*!40000 ALTER TABLE `kysimus` DISABLE KEYS */;
INSERT INTO `kysimus` VALUES (1,'1.1. Olen teadlik õppija füüsilise, kognitiivse, emotsionaalse ja sotsiaalse arengu alustest ning kultuurilistest eripäradest',1),(2,'1.2. Olen teadlik õppimist mõjutavatest teguritest ja seaduspärasustest (üldpädevustest, grupiprotsessidest ja õppija toetamise tõenduspõhistest võimalustest, sh refleksioonimudelite kasutamise vajalikkusest)',1),(3,'2.1. Sean  lähtuvalt õppijatest pika- ja lühiajalised õpieesmärgid (valides sisu ning kavandades tegevused, arvestades õppekavaga)',2),(4,'1.2. Olen teadlik õppimist mõjutavatest teguritest ja seaduspärasustest (üldpädevustest, grupiprotsessidest ja õppija toetamise tõenduspõhistest võimalustest, sh refleksioonimudelite kasutamise vajalikkusest)',1),(5,'1.3. Hoian end kursis õppimist ja õppija arengut puudutava terminoloogiaga ning uuema teadmuse ja uuringutega',1),(6,'1.4.  Olen teadlik digilahenduste kasutamise võimalustest ja sellega seotud riskidest õppimisel',1),(7,'1.5. Selgitan välja rühma ja õppija ainealase, õpioskuste ja õpimotivatsiooni taseme ja nõustan antud valdkonnas kolleege ',1),(8,'1.6. Kogun koostöös kolleegidega õppeprotsessi kohta infot ja uurin võimalusi, kuidas toetada õppija terviklikku arengut ja valmisolekut õppimiseks. ',1),(9,'1.7 Kasutan arenguvestlusi õppija arengu toetamiseks. ',1),(10,'1.8 Märkan õppija õppijaid, kes vajavad tuge ning nende individuaalseid õpivajadusi',1),(11,'1.9. Kaasan ja teen koostööd tugispetsialistide ning kolleegidega abi- ja toetusvajaduse väljaselgitamisel (vajadusel õppija individuaalse arengu kaardi täitmine, arvestades tema eripära arengu dünaamikat), õppe- ja arendustegevuse planeerimisel ning rakendamisel (sobiva õppemetoodika ja -vormi leidmisel, õppe jõukohastamisel, õppematerjalide kohandamisel, abivahendite rakendamisel, individuaalse õppe korralduse kava planeerimisel, individuaalse õppekava ja/või käitumise tugikava koostamisel)',1),(12,'1.11 Koostöös lapsevanematega toetan ja suunan õppijat',1),(13,'1.12. Toetan õppijate sotsiaalsete ja koostööoskuste arengut;',1),(14,'1.13. Töötan koostöös õppija(te)ga välja ühistel väärtustel põhinevad kokkulepped',1),(15,'1.14. Suunan õppijaid üksteisega arvestama ja üksteist toetama (arvesse võttes rühmaprotsesse ja -dünaamikat)',1),(16,'1.15. toetab ühtsustunnet rühmas ja haridusasutuses.',1),(17,'2.1. Sean  lähtuvalt õppijatest pika- ja lühiajalised õpieesmärgid (valides sisu ning kavandades tegevused, arvestades õppekavaga)',2),(18,'2.2. Lähtuvalt eesmärkidest valin õpetamiseks, õppimiseks ja tagasisidestamiseks sobivad meetodid',2),(19,'2.3. Koostan (koostöös teiste spetsialistidega ning vajadusel) individuaalse õppekava, käitumise tugikava ja/või arenduskava, arvestades hariduslike erivajadustega õppija toetamise põhimõtteid ning õppijate igakülgset arengut',2),(20,'2.5. Valin  õpieesmärkidest lähtudes ning õppijate ja rühma tasemele sobiva õpivara, arvestades teaduspõhisuse ja parimate praktikatega.',2),(21,'2.6..  Märkan õpivara puudusi ja teen organisatsiooni (aine)valdkonna juhtidele ettepanekuid  õpivara kohandamiseks ja koostamiseks',2),(22,'2.7. Kohandan õpivara, arvestades õppijate vajadusi, võimalikke piiranguid, sh autoriõigusi, kättesaadavust, usaldusväärsust; ',2),(23,'2.8. Loon, otsin ja jagan digitaalset õpivara ja digitehnoloogiaid, mis võimaldavad tõhusalt saavutada õpieesmärke',2),(24,'2.9. Kujundan füüsiliselt, vaimselt ja emotsionaalselt turvalise heaolu, tervist, arengut ja loovust toetava koostöise õpikeskkonna, lähtudes õppijate vajadustest ja õpieesmärkidest ning ühistest kokkulepitud väärtustest; ',2),(25,'2.10. Panustan organisatsiooni õpikeskkonna kujundamisse.',2),(26,'3.1. Märkan ja arvestan õppijate erinevaid huvisid, võimeid ja vajadusi (sh hariduslikke erivajadusi, kultuurilist eripära jm), tagades võimetekohase õppe',3),(27,'3.2.  Arvestan peamiste tunnetusprotsessidega (taju, tähelepanu, mälu, mõtlemine, täidesaatvad funktsioonid) õppija toetamisel',3),(28,'3.3. Kogun andmeid õppijate arengu ja õppeprotsessi tõhususe kohta; kasutan digitehnoloogiaid õppijate õppimisse kaasatuse suurendamiseks',3),(29,'3.5. Kasutan digitehnoloogiaid õppijate õppimisse kaasatuse suurendamiseks',3),(30,'3.6. Personaliseerin õpiteid digitehnoloogiate abil',3),(31,'3.7. Loon teadlikult hooliva, kiusamisvaba ja koostöise õhkkonna (sh digikeskkonnas), lähtudes ühistel väärtustel tuginevatest kokkulepetest, õppija(te) individuaalsetest vajadustest, õpieesmärkidest ja kaasava hariduse põhimõtetest',3),(32,'3.8. Loon turvalise ja tervist toetava õpikeskkonna, tegutsen esmaabi vajavas situatsioonis sobival viisil',3),(33,'3.9. Juhin klassi/rühma, arvestades grupi arengufaase',3),(34,'3.10.   Märkan ja ennetan konflikte, leides tõhusaid lahendusi ning vajadusel kaasates kolleege, õppijaid, lapsevanemaid ja tugispetsialiste',3),(35,'3.12. Õpetan, lähtudes õppija eripärast, seatud eesmärkidest, õpiväljunditest ja ainetevahelisest lõimingust, kasutades erinevaid õppevorme ja -meetodeid toetamaks õppijate õpi- ja ainealaste oskuste arengut, järgides kaasava hariduse põhimõtteid',3),(36,'3.13.  Analüüsin õpetamist ning kohandan tegevusi ja keskkonda paindlikult, arvestades õppijate (liikumis)vajadusi',3),(37,'3.14.  Tagan vajaliku toe ja analüüsin tugimeetmete toimet koostöös teiste spetsialistidega',3),(38,'3.15. Toetan üldpädevuste arengut ja ennastjuhtiva õppija kujunemist, suunates õppijat õpieesmärkide seadmisele ja eneseanalüüsile;',3),(39,'3.16. Toetan õpimotivatsiooni, pakkudes õppeprotsessis valikuid, elulisi jõukohaseid õppeülesandeid',3),(40,'3.18. Suunan õpilasi rakendama info otsimisel, suhtlemisel ja sisuloomes digitehnoloogiaid',3),(41,'3.19.  Korraldan klassis/rühmas digitehnoloogiate mõtestatud kasutamist individuaalsel ja koostöisel õppimisel, sh probleemide lahendamisel',3),(42,'3.20. Rakendan süsteemselt erinevaid õppimist toetavaid tagasisidestamise ja hindamise viise, sh digitehnoloogiaid, lähtudes õppija eripärast ja hindamist reguleerivatest dokumentidest',3),(43,'3.23. Toetan õppijaid enesehindamisoskuste arendamisel',3),(44,'3.24. Kooskõlastan nii õppijate ja kui ka lapsevanematega  tagasisidestamise põhimõtted ja korralduse',3),(45,'4.1. Reflekteerin oma tööd, sh analüüsin oma õpetamise mõju, kasutades erinevaid meetodeid, kaasates kolleege ja osaledes õpikogukondades, sh virtuaalsetes',4),(46,'4.2. Kogun pidevalt tagasisidet õppijate õpitegevuste ning -tulemuste kohta, kavandades muudatusi õpetamis- ja kasvatusprotsessis ',4),(47,'4.3. Koostan enda professionaalse arengu kava ja määratlen õppimisvajaduse (arvestades ka haridusasutuse arenguvajadusi ja riiklikke haridusprioriteete)',4),(48,'4.4. Kasutan digikeskkondi enda pkutsealaseks arendamiseks',4),(49,'4.5. Analüüsin haridusuuringute tulemusi ning rakendan neid oma töös',4),(50,'4.6. Viin läbi (tegevus) uuringuid klassi/rühma ja haridusasutuse tasandil, et analüüsida õpiprotsessi ja määratleda probleeme, koguda tõendeid praktikast',4),(51,'4.7. Jagan tõenduspõhist teadmust kolleegide ja koostööpartneritega',4),(52,'4.8. Jälgin, hindan ning väärtustan oma füüsilist, vaimset ja emotsionaalset tervist. Hoian neid tasakaalus',4),(53,'4.9. Otsin probleemide tekkimisel (vajadusel) abi kolleegidelt, juhtkonnalt jt',4),(54,'5.1. Loon usaldusliku suhte õppija ja lapsevanemaga ',5),(55,'5.2. Algatan ja teen koostööd /lapsevanem, kolleeg jt) õppija arengu toetamiseks, kaasates aruteludesse, õppeprotsessi, haridusasutuse algatustesse ja tegevustesse',5),(56,'5.3. Teavitan õppijaid ja lapsevanemaid õppekavast, õppekorraldusest, õppimise põhimõtetest ja haridusvaldkonna uuendustest',5),(57,'5.5. Tagasisidestan õppija edenemist (õppijale ja lapsevanemale)',5),(58,'5.6. Kaasan lapsevanemaid õppija arengut puudutavate otsuste tegemisse ning nende rakendamisse',5),(59,'5.8. Jagan lapsevanematele tõenduspõhiseid õppimis- ja õpetamisalaseid materjale',5),(60,'tegutseb meeskonnaliikmena õpikogukonnas enda ja kolleegide professionaalse arengu ning selle kaudu õppija arengu toetamise eesmärgil. ',5),(61,'6.1. Osalen õpikogukondades ja koostöövõrgustikes erialase teadmuse arendamisel;',6),(62,'6.2. Osalen aine-/eriala populariseerivate sündmuste ja projektide läbiviimisel',6),(63,'6.3. Osalen organisatsiooni arengut suunavate dokumentide koostamisel',6),(64,'6.4. Osalen valdkonna ühenduste ja ekspertgruppide töös',6),(65,'6.5. Annan sisendit ja tagasisidet eelnõudele, ettepanekutele, arengukavadele jm',6);
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
  `eneseanalyys_eneseanalyys_id` int NOT NULL,
  PRIMARY KEY (`kysimus_vastus_id`),
  KEY `kysimus_vastus_Kysimus` (`kysimus_id`),
  KEY `kysimus_vastus_eneseanalyys` (`eneseanalyys_eneseanalyys_id`),
  KEY `kysimus_vastus_profiil_kysimustik` (`profiil_kysimustik_id`),
  CONSTRAINT `kysimus_vastus_eneseanalyys` FOREIGN KEY (`eneseanalyys_eneseanalyys_id`) REFERENCES `eneseanalyys` (`eneseanalyys_id`),
  CONSTRAINT `kysimus_vastus_Kysimus` FOREIGN KEY (`kysimus_id`) REFERENCES `kysimus` (`kysimus_id`),
  CONSTRAINT `kysimus_vastus_profiil_kysimustik` FOREIGN KEY (`profiil_kysimustik_id`) REFERENCES `profiil_kysimustik` (`profiil_kysimustik_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kysimus_vastus`
--

LOCK TABLES `kysimus_vastus` WRITE;
/*!40000 ALTER TABLE `kysimus_vastus` DISABLE KEYS */;
/*!40000 ALTER TABLE `kysimus_vastus` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kysimusteplokk`
--

LOCK TABLES `kysimusteplokk` WRITE;
/*!40000 ALTER TABLE `kysimusteplokk` DISABLE KEYS */;
INSERT INTO `kysimusteplokk` VALUES (1,'Õppija toetamine',1),(2,'Õpi- ja õpetamistegevuse kavandamine',1),(3,'Õpetamine',1),(4,'Refleksioon ja professionaalne enesearendamine',1),(5,'Koostöö ja juhendamine',1),(6,'Arendus, loome- ja teadustegevus',1),(7,'Õppija toetamine',1),(8,'Õpi- ja õpetamistegevuse kavandamine',1),(9,'Õpetamine',1),(10,'4. Refleksioon ja professionaalne enesearendamine',1),(11,'Koostöö ja juhendamine',1),(12,'Arendus, loome- ja teadustegevus',1);
/*!40000 ALTER TABLE `kysimusteplokk` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kysimustik`
--

LOCK TABLES `kysimustik` WRITE;
/*!40000 ALTER TABLE `kysimustik` DISABLE KEYS */;
INSERT INTO `kysimustik` VALUES (1,'KS Tegevustnäitajad'),(2,'KS tegevusnäitajad ja tagasiside Tase 7');
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
  PRIMARY KEY (`oppmaterjal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oppematerjal`
--

LOCK TABLES `oppematerjal` WRITE;
/*!40000 ALTER TABLE `oppematerjal` DISABLE KEYS */;
INSERT INTO `oppematerjal` VALUES (1,'hulgateooria test 1','hulgateooria_test_1.pdf'),(2,'lineaarsed võrrandid','linearequations.pdf');
/*!40000 ALTER TABLE `oppematerjal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oppematerjal_profiil`
--

DROP TABLE IF EXISTS `oppematerjal_profiil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oppematerjal_profiil` (
  `oppematerjal_profiil_id` int NOT NULL AUTO_INCREMENT,
  `profiil_id` int NOT NULL,
  `oppematerjal_id` int NOT NULL,
  PRIMARY KEY (`oppematerjal_profiil_id`),
  KEY `Oppematerjal_profiil_Oppematerjal` (`oppematerjal_id`),
  KEY `Oppematerjal_profiil_Profiil` (`profiil_id`),
  CONSTRAINT `Oppematerjal_profiil_Oppematerjal` FOREIGN KEY (`oppematerjal_id`) REFERENCES `oppematerjal` (`oppmaterjal_id`),
  CONSTRAINT `Oppematerjal_profiil_Profiil` FOREIGN KEY (`profiil_id`) REFERENCES `profiil` (`profiil_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oppematerjal_profiil`
--

LOCK TABLES `oppematerjal_profiil` WRITE;
/*!40000 ALTER TABLE `oppematerjal_profiil` DISABLE KEYS */;
INSERT INTO `oppematerjal_profiil` VALUES (1,3,1),(2,3,2);
/*!40000 ALTER TABLE `oppematerjal_profiil` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parooliauth`
--

LOCK TABLES `parooliauth` WRITE;
/*!40000 ALTER TABLE `parooliauth` DISABLE KEYS */;
INSERT INTO `parooliauth` VALUES (1,1,'testparool1'),(2,2,'testparool1'),(3,3,'testparool1');
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
  PRIMARY KEY (`profiil_id`),
  KEY `Profiil_Kasutaja` (`kasutaja_id`),
  KEY `Profiil_Kasutajaroll` (`kasutajaroll_id`),
  CONSTRAINT `Profiil_Kasutaja` FOREIGN KEY (`kasutaja_id`) REFERENCES `kasutaja` (`kasutaja_id`),
  CONSTRAINT `Profiil_Kasutajaroll` FOREIGN KEY (`kasutajaroll_id`) REFERENCES `kasutajaroll` (`kasutajaroll_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiil`
--

LOCK TABLES `profiil` WRITE;
/*!40000 ALTER TABLE `profiil` DISABLE KEYS */;
INSERT INTO `profiil` VALUES (1,'Mait','Jurask',1,2,0,''),(2,'Martin','Kilgi',2,2,0,''),(3,'Test','Opetaja',3,1,0,''),(5,'Maikel','Jack',21,1,54936843,'Tallinn'),(6,'Test','Kasutaja',22,1,54349867,'Tallinn'),(7,'Yks','Test',23,1,53908765,'Tartu'),(8,'Another','Test',24,1,53038732,'Tapa');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiil_kysimustik`
--

LOCK TABLES `profiil_kysimustik` WRITE;
/*!40000 ALTER TABLE `profiil_kysimustik` DISABLE KEYS */;
INSERT INTO `profiil_kysimustik` VALUES (4,1,5,NULL,NULL),(5,2,8,NULL,NULL),(6,1,8,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soovitus`
--

LOCK TABLES `soovitus` WRITE;
/*!40000 ALTER TABLE `soovitus` DISABLE KEYS */;
INSERT INTO `soovitus` VALUES (1,'Lisalugemine: http://oppekava.innove.ee/wp-content/uploads/2015/07/Lapse_areng_Alusharidus.pdf',1),(2,'Analüüsi oma teadmisi õppimist toetavate võimaluste kasutamisest, lisades tõenduspõhist materjali. Lisalugemine: https://www.riigiteataja.ee/akt/129082014020',2),(3,'Analüüsi õpieesmärkide kavandamise protsessi/vajalikkust, lisades tõenduspõhist materjali ning näiteid. Lisalugemine:  https://www.tlu.ee/opmat/ka/opiobjekt/t66pedagoogika/t66_ja_ettev6ttepedagoogika/pieesmrgid.html',3),(4,'Analüüsi oma teadmisi õppimist toetavate võimaluste kasutamisest, lisades tõenduspõhist materjali. Lisalugemine: https://www.riigiteataja.ee/akt/129082014020',1),(5,'Kirjelda õppimist ja õppija arengut puudutava terminoloogia lõimingut tuginedes oma kogemusele. Lisalugemine: https://www.european-agency.org/sites/default/files/profile_of_inclusive_teachers_et.pdf',2),(6,'Analüüsi digilahenduste kasutamist ning riske. Lisalugemine: https://www.hm.ee/sites/default/files/2_digiprogr_2019_22_seletuskiri_28dets18.pdf',3),(7,'Analüüsi ja arutle, kuidas selgitad välja ainealaste teadmise, õpioskuste ja -motivatsiooni taseme oma õpilaste hulgas. Lisalugemine: http://dspace.ut.ee/bitstream/handle/10062/16254/Oppimine_oppimisoskuste_arendamine.pdf?sequence=1',4),(8,'Analüüsi info kogumise ja õppija toetamise võimalusi, lisades tõenduspõhist materjali ning näiteid, Kirjeldaerinevaid võimalusi info kogumiseks too näiteid.  Lisalugemine:  https://opleht.ee/2019/11/lapse-oppimine-ja-oppimise-toetamine/',5),(9,'Kirjelda, kuidas selgitad välja toetusvajadusi, too näiteid. Lisalugemine: https://www.innove.ee/rajaleidja/juhendmaterjalid/',8),(10,'Arutle, kuidas teed koostööd lapsevanemaga, lisades tõenduspõhist materjali ning näiteid. Lisamaterjal: https://core.ac.uk/download/pdf/154745884.pdf',9),(11,'Kirjelda, kuidas toetad õppijate sotsiaalseid- ja koostööoskusi. Lisalugemine: https://koolielu.ee/info/readnews/552069/soovitused-koostool-pohineva-oppe-ja-koostoooskuste-opetamise-populariseerimiseks-koolides',10),(12,'Kirjelda, kuidas sõlmid õppijatega väärtuspõhiseid kokkuleppeid ja miks? Too näitieid. Lisalugemine: https://www.innove.ee/wp-content/uploads/2020/02/ERINEVATE-OPPIJATE-TOETAMINE_2019.pdf',11),(13,'Kirjelda ning analüüsi metoodikat, kuidas suunad õppijaid üksteisega arvestama, lisades tõenduspõhist materjali ning näiteid. Lisamaterjal:  https://www.youtube.com/watch?v=R1vskiVDwl4',12),(14,'Analüüsi õpieesmärkide kavandamise protsessi/vajalikkust, lisades tõenduspõhist materjali ning näiteid. Lisalugemine:  https://www.tlu.ee/opmat/ka/opiobjekt/t66pedagoogika/t66_ja_ettev6ttepedagoogika/pieesmrgid.html; ',14),(15,'Kirjelda, kuidas valid sobivat metoodikat, lisades tõenduspõhist materjali ning näiteid. Lisamaterjal: https://sisu.ut.ee/aktiivope/avaleht',15),(16,'Kirjelda HEV õppija toetamise põhimõtteid, lisades tõenduspõhist materjali ning näiteid',16),(17,'Analüüsi õpivara valimist, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://uudiskiri.e-ope.ee/2013/03/18/oppimine-aastal-2020/',17),(18,'Kirjelda oma kogemust õpivara osas (puudused, ettepanekud jm), lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://www.hm.ee/sites/default/files/oppevara_kaardistus_2016_0.pdf',18),(19,'Kirjelda oma kogemust õpivara kohandamisel pidades silmas ka autoriõigusi, lisades tõenduspõhist materjali ning näiteid . Lisalugemine: https://sisu.ut.ee/autorioigus/avaleht',19),(20,'Analüüsi, kuidas lood meeldiva ja koostöise õpikeskkonna, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://sisu.ut.ee/opikasitus/n%C3%BC%C3%BCdisaegse-%C3%B5pik%C3%A4situse-p%C3%B5hiprintsiibid',20),(21,'Kirjelda, kuidas märkad õppijat, lisades tõenduspõhist materjali ning näiteid. Lisamaterjal: https://www.innove.ee/wp-content/uploads/2020/02/ERINEVATE-OPPIJATE-TOETAMINE_2019.pdf',23),(22,'Analüüsi, kuidas arvestad õppijaga, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://core.ac.uk/download/pdf/154745748.pdf',24),(23,'Analüüsi oma osa õppijate õppimisse kaasamiseks, lisades tõenduspõhist materjali ning näiteid. Lisalugemine:  https://kompass.harno.ee/personaliseeritud-ope/#personaliseeritud-ope-ja-haridus',25),(24,'Analüüsi eesmärgipärast digitehnoloogia kasutust, lisades tõenduspõhist materjali ning näiteid. Lisamaterjal: https://kompass.harno.ee/turvaline-digimaailm',26),(25,'Kirjelda oma kogemust personaliseeritud õppe rakendamisel, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://kompass.harno.ee/personaliseeritud-ope/#personaliseeritud-ope-ja-haridus',27),(26,'Kirjelda oma kogemust kiusamisvaba ja koostöise õhkkonna loomisel, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://dspace.ut.ee/bitstream/handle/10062/64998/mottus_merit_ma.pdf?sequence=1&isAllowed=y',28),(27,'Analüüsi oma oskusi turvalise õpikeskkonna loomisel, lisades tõenduspõhist materjali ning näiteid. Lisalugemine:  https://www2.politsei.ee/dotAsset/557499.pdf',29),(28,'Kirjelda oma teadmisi ning kogemusi grupi arengufaaside juhtimisest, lisades tõenduspõhist materjali ning näiteid. Lisalugemine:  http://andragoogid.yolasite.com/grupiprotsesside-juhtimine.php',30),(29,'Analüüsi oma oskust märgata/ennetada ja lahendada konflikte, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://www.areng.ee/wp-content/uploads/Kuidas-K-ennetada-ja-keerulises-olukorras-posit.lahendus-leida.pdf',31),(30,'Analüüsi oma õpetamist (tegevuste kohandamist) arvestades õppijate vajadusi, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://sisu.ut.ee/tunni_analyys/teise-näidistunni-analüüs; https://sisu.ut.ee/tunni_analyys/2-tuntumad-õpetamise-ja-õppetunni-mudelid',32),(31,'Kirjelda vajalike tugimeetmete rakendamist ja toimimist, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://www.hm.ee/et/tegevused/hariduslike-erivajadustega-opilaste-toetamine-oppekorraldus-ja-tugiteenused',34),(32,'Analüüsi, kuidas toetan üldpädevuste ja ennastjuhtiva õppija arengut, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://opleht.ee/2020/08/ennastjuhtiv-oppija-kui-palju-meil-neid-siis-on/',35),(33,'Kirjelda kuidas toetad oma praktikas õpimotivatsiooni, lisades tõenduspõhist materjali ning näiteid. Lisamaterjal: https://www.tlu.ee/opmat/ka/opiobjekt/ME_Haridusest/laste_huvi_tstmine_hariduse_vastu.html',36),(34,'Analüüsi võimalusi infoga toimetamiseks digitehnoloogiate abil, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://digipadevus.ee/oppija-digipadevusmudel/',37),(35,'Analüüsi digitehnoloogia mõtestatud kasutamise vajalikkust, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://digipadevus.ee/oppija-digipadevusmudel/',38),(36,'Analüüsi tagasisidestamise korraldust, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://www.apa.org/ed/schools/teaching-learning/top-twenty-principles-estonian.pdf',39),(37,' Kirjelda oma tegevust õppija enesehindamisoskuste arendamise protsessis, lisades tõenduspõhist materjali ja näiteid. Lisalugemine: https://oppekava.ee/wp-content/uploads/sites/6/2017/01/Õpilase_enesehindamise_arendamine.pdf',40),(38,'Too näiteid juhendamistest.\nAnalüüsi tulemusi ja muutusi.',41),(39,'Reflekteeri oma tööd, sh analüüsi oma õpetamise mõju, isades tõenduspõhist materjali ning too näiteid. Kirjelda õppijate eripärasid ja õppija üldpädevuste arengu toetamist ja grupiprotsesse näidete varal. Lisalugemine: https://tulevikuopetaja.edu.ee/moodul-v/refleksioon-opetaja-professionaalses-arengus/',42),(40,'Analüüsi kogutud tagasisidet muudatuste sisse viimiseks, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://media.voog.com/0000/0034/3577/files/Kristi_Katrin.pdf',43),(41,'Kuidas määratled oma arenguvajadused ning mille alusel koostad professionaalse arengu kava, lisades tõenduspõhist materjali ning näiteid. https://portfooliokursus.files.wordpress.com/2010/10/opah_trykis_loplik.pdf',44),(42,'Kirjeldan, kuidas tulen toime pingega tööl ning kuidas maandan ennast, lisades tõenduspõhist materjali ning näiteid oma e-portfooliosse, analüüsi oma tegevusi. Lisa: https://koolitus.edu.ee/training/1619; https://zennative.ee/zen-native-blog/keha-ja-meele-heaolu/',49),(43,'Dokument, link, tagasiside osapooltelt, toimimise kirjeldus, väljavõte koosoleku protokollist vm dokumendist. Lisalugemine: http://andragoogika.tlu.ee/?page_id=819',52),(44,'Analüüsi ja lisa tõenduspõhiseid näiteid. Lisalugemine: https://www.riigiteataja.ee/akt/129082014020',53),(45,'Tagasiside näide (link, dokument jms). Lisalugemine: https://sisu.ut.ee/vaartuskommunikatsioon/%C3%B5ppe-protsess; https://sisu.ut.ee/6ppimisttoetavhindamine/t%C3%B5husa-tagasiside-tunnused',54),(46,'Analüüsi ja kirjelda lapsevanemate kaasamise protsessi, lisades tõenduspõhist materjali ning näiteid. Lisalugemine: https://www.schooleducationgateway.eu/et/pub/viewpoints/surveys/poll-on-parents.htm',55),(47,'Näited tõendavatest õppimis- ja õpetamismaterjalide (artiklid, raamatud, veebimaterjalid jm) jagamisest',56),(48,'Erialane teadmus – näited oma valdkonna loometegevusest (õppematerjal, tööjuhendid vm) ja tulevikuplaanidest.',58),(49,'Oma tegevuse kirjeldus ja analüüs',59),(50,'Too näiteid (fotod, lingid vms)',60),(51,'Töörühma (õpetajahariduse) tõend, link sündmusele',61),(52,'Kirjelda oma panust õpetajahariduse valdkonna arendustegevuses. Näited teadusuuringute algatamisest riiklikul tasandil, tegevus-, arendusuuringud organisatsioonis (link, viide, dokument).',62);
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
  `tagasiside_tekst` varchar(1000) NOT NULL,
  `protsentuaalne_tulemus` decimal(4,2) NOT NULL,
  `profiil_id` int NOT NULL,
  `kysimusteplokk_id` int NOT NULL,
  PRIMARY KEY (`tagasiside_id`),
  KEY `Tagasiside_KysimustePlokk` (`kysimusteplokk_id`),
  KEY `Tagasiside_Profiil` (`profiil_id`),
  CONSTRAINT `Tagasiside_KysimustePlokk` FOREIGN KEY (`kysimusteplokk_id`) REFERENCES `kysimusteplokk` (`kysimusteplokk_id`),
  CONSTRAINT `Tagasiside_Profiil` FOREIGN KEY (`profiil_id`) REFERENCES `profiil` (`profiil_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tagasiside`
--

LOCK TABLES `tagasiside` WRITE;
/*!40000 ALTER TABLE `tagasiside` DISABLE KEYS */;
/*!40000 ALTER TABLE `tagasiside` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'opetajaprofareng'
--

--
-- Dumping routines for database 'opetajaprofareng'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-09 11:42:40
