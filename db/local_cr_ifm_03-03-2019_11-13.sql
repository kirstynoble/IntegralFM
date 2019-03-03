# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.38)
# Database: local_cr_ifm
# Generation Time: 2019-03-03 11:13:20 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table assetindexdata
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assetindexdata`;

CREATE TABLE `assetindexdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sessionId` varchar(36) NOT NULL DEFAULT '',
  `volumeId` int(11) NOT NULL,
  `uri` text,
  `size` bigint(20) unsigned DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `recordId` int(11) DEFAULT NULL,
  `inProgress` tinyint(1) DEFAULT '0',
  `completed` tinyint(1) DEFAULT '0',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `assetindexdata_sessionId_volumeId_idx` (`sessionId`,`volumeId`),
  KEY `assetindexdata_volumeId_idx` (`volumeId`),
  CONSTRAINT `assetindexdata_volumeId_fk` FOREIGN KEY (`volumeId`) REFERENCES `volumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table assets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assets`;

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `volumeId` int(11) DEFAULT NULL,
  `folderId` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `kind` varchar(50) NOT NULL DEFAULT 'unknown',
  `width` int(11) unsigned DEFAULT NULL,
  `height` int(11) unsigned DEFAULT NULL,
  `size` bigint(20) unsigned DEFAULT NULL,
  `focalPoint` varchar(13) DEFAULT NULL,
  `deletedWithVolume` tinyint(1) DEFAULT NULL,
  `keptFile` tinyint(1) DEFAULT NULL,
  `dateModified` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `assets_filename_folderId_idx` (`filename`,`folderId`),
  KEY `assets_folderId_idx` (`folderId`),
  KEY `assets_volumeId_idx` (`volumeId`),
  CONSTRAINT `assets_folderId_fk` FOREIGN KEY (`folderId`) REFERENCES `volumefolders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `assets_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `assets_volumeId_fk` FOREIGN KEY (`volumeId`) REFERENCES `volumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `assets` WRITE;
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;

INSERT INTO `assets` (`id`, `volumeId`, `folderId`, `filename`, `kind`, `width`, `height`, `size`, `focalPoint`, `deletedWithVolume`, `keptFile`, `dateModified`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(15,1,1,'bm-playbook-landing.jpg','image',1920,1080,102971,NULL,NULL,NULL,'2019-03-02 18:44:03','2019-03-02 18:44:03','2019-03-02 18:44:03','1b3532e7-c091-4383-9b7d-40e7bc38d8ea'),
	(16,1,1,'nexen-logo-DFF382CACD-seeklogo.com.png','image',300,149,7572,NULL,NULL,NULL,'2019-03-02 18:47:37','2019-03-02 18:47:37','2019-03-02 18:47:37','d0cabf51-0808-4537-a398-b8ae68bfb2d8'),
	(18,1,1,'download-1.png','image',366,138,38082,NULL,NULL,NULL,'2019-03-02 18:47:57','2019-03-02 18:47:57','2019-03-02 18:47:57','d7a93996-53ba-4496-a33a-f018307fbfb1'),
	(20,1,1,'air-control-entech.png','image',230,130,11766,NULL,NULL,NULL,'2019-03-02 18:48:13','2019-03-02 18:48:13','2019-03-02 18:48:13','919a7d7c-7f25-45e1-a5a7-98b5b31f1849');

/*!40000 ALTER TABLE `assets` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table assettransformindex
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assettransformindex`;

CREATE TABLE `assettransformindex` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assetId` int(11) NOT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `format` varchar(255) DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `volumeId` int(11) DEFAULT NULL,
  `fileExists` tinyint(1) NOT NULL DEFAULT '0',
  `inProgress` tinyint(1) NOT NULL DEFAULT '0',
  `dateIndexed` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `assettransformindex_volumeId_assetId_location_idx` (`volumeId`,`assetId`,`location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table assettransforms
# ------------------------------------------------------------

DROP TABLE IF EXISTS `assettransforms`;

CREATE TABLE `assettransforms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `mode` enum('stretch','fit','crop') NOT NULL DEFAULT 'crop',
  `position` enum('top-left','top-center','top-right','center-left','center-center','center-right','bottom-left','bottom-center','bottom-right') NOT NULL DEFAULT 'center-center',
  `width` int(11) unsigned DEFAULT NULL,
  `height` int(11) unsigned DEFAULT NULL,
  `format` varchar(255) DEFAULT NULL,
  `quality` int(11) DEFAULT NULL,
  `interlace` enum('none','line','plane','partition') NOT NULL DEFAULT 'none',
  `dimensionChangeTime` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `assettransforms_name_unq_idx` (`name`),
  UNIQUE KEY `assettransforms_handle_unq_idx` (`handle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `deletedWithGroup` tinyint(1) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `categories_groupId_idx` (`groupId`),
  KEY `categories_parentId_fk` (`parentId`),
  CONSTRAINT `categories_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `categorygroups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `categories_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `categories_parentId_fk` FOREIGN KEY (`parentId`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table categorygroups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `categorygroups`;

CREATE TABLE `categorygroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `structureId` int(11) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `dateDeleted` datetime DEFAULT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `categorygroups_name_idx` (`name`),
  KEY `categorygroups_handle_idx` (`handle`),
  KEY `categorygroups_structureId_idx` (`structureId`),
  KEY `categorygroups_fieldLayoutId_idx` (`fieldLayoutId`),
  KEY `categorygroups_dateDeleted_idx` (`dateDeleted`),
  CONSTRAINT `categorygroups_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `categorygroups_structureId_fk` FOREIGN KEY (`structureId`) REFERENCES `structures` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table categorygroups_sites
# ------------------------------------------------------------

DROP TABLE IF EXISTS `categorygroups_sites`;

CREATE TABLE `categorygroups_sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `hasUrls` tinyint(1) NOT NULL DEFAULT '1',
  `uriFormat` text,
  `template` varchar(500) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `categorygroups_sites_groupId_siteId_unq_idx` (`groupId`,`siteId`),
  KEY `categorygroups_sites_siteId_idx` (`siteId`),
  CONSTRAINT `categorygroups_sites_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `categorygroups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `categorygroups_sites_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table content
# ------------------------------------------------------------

DROP TABLE IF EXISTS `content`;

CREATE TABLE `content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_template` varchar(255) DEFAULT NULL,
  `field_subtitle` text,
  `field_summary` text,
  `field_contentText` text,
  `field_quote` text,
  `field_jobTitle` text,
  `field_companyName` text,
  `field_companyAddress` text,
  `field_clientHelpDeskLink` varchar(255) DEFAULT NULL,
  `field_footerContent` text,
  `field_chdFooterText` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `content_siteId_idx` (`siteId`),
  KEY `content_title_idx` (`title`),
  CONSTRAINT `content_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `content_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;

INSERT INTO `content` (`id`, `elementId`, `siteId`, `title`, `dateCreated`, `dateUpdated`, `uid`, `field_template`, `field_subtitle`, `field_summary`, `field_contentText`, `field_quote`, `field_jobTitle`, `field_companyName`, `field_companyAddress`, `field_clientHelpDeskLink`, `field_footerContent`, `field_chdFooterText`)
VALUES
	(1,1,1,NULL,'2019-02-17 09:47:27','2019-02-17 09:47:27','9d34006a-9d17-454f-8725-58dc1f6df34b',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(2,2,1,'Homepage','2019-02-22 09:13:47','2019-02-28 20:01:53','fa1ce307-91a7-443a-ae08-bd2afb7deba8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(3,3,1,'Homepage','2019-02-28 20:01:36','2019-03-03 09:11:10','67ad7289-f7c9-486f-9974-8980b269ef6f','home.twig',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(4,8,1,'Testimonial 01','2019-03-02 18:12:20','2019-03-02 18:12:20','0c9aa79c-5087-467b-bf75-257f5def39e5',NULL,NULL,NULL,NULL,'This is a quote','Executive CEO','Nexen',NULL,NULL,NULL,NULL),
	(5,9,1,'Testimonial 02','2019-03-02 18:12:59','2019-03-02 18:12:59','4059db28-c031-4dee-829c-a71f42703873',NULL,NULL,NULL,NULL,'This is a quote 02','Vice President','Air Control',NULL,NULL,NULL,NULL),
	(6,10,1,'View Featured Page or Casestudy','2019-03-02 18:24:00','2019-03-02 18:24:00','164f84e3-43cf-4acf-b4dd-8c9d629a2cf6',NULL,NULL,NULL,'This is some text about the page your going to read more on next.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(7,11,1,'About Us','2019-03-02 18:25:05','2019-03-03 10:54:02','edf30ce0-dfbc-46cd-97aa-a62159423844','basic.twig',NULL,'A sample of some services we deliver on behalf of our partners',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(8,12,1,'Contact Us','2019-03-02 18:25:14','2019-03-03 10:50:43','b8c83237-2b98-4a21-8521-5d268355f878',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(9,13,1,'View Featured Page or Casestudy 02','2019-03-02 18:26:03','2019-03-02 18:26:10','62b20dfa-b3c6-4a2d-aee3-2ce3b5a36575',NULL,NULL,NULL,'This is some text about the page your going to read more on next.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(10,15,1,'Bm-playbook-landing','2019-03-02 18:44:02','2019-03-02 18:44:02','c9124072-075d-48e2-b8ce-dacc3be3acc4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(11,16,1,'Nexen-logo-DFF382CACD-seeklogo.com','2019-03-02 18:47:37','2019-03-02 18:47:37','8379778f-c5ed-44bc-8ced-88100848f8f6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(12,17,1,'Brand Logo','2019-03-02 18:47:41','2019-03-02 19:09:09','de2841e4-af43-41da-ba64-7ebd6d20772f',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(13,18,1,'Download-1','2019-03-02 18:47:56','2019-03-02 18:47:56','605dfeaf-d31c-45b1-992c-9ca63c074284',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(14,19,1,'Brand Logo','2019-03-02 18:48:00','2019-03-02 19:09:09','236b5c8b-43ca-4888-9554-577e02e20fd4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(15,20,1,'Air-control-entech','2019-03-02 18:48:13','2019-03-02 18:48:13','1d99c0c4-e087-4135-9840-bb8deb66adb8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(16,21,1,'Brand Logo','2019-03-02 18:48:16','2019-03-02 19:09:09','e2f04a83-21c5-48a6-a6c3-a6fd60ecad13',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(17,23,1,NULL,'2019-03-03 09:45:22','2019-03-03 10:25:44','1e477277-7127-4898-9f15-ddd31cd9f7ee',NULL,NULL,NULL,NULL,NULL,NULL,'Integral Facilities Management','[{\"col1\":\"IFM\"},{\"col1\":\"34 Cameron St\"},{\"col1\":\"Aberdeen\"},{\"col1\":\"AB24 5ea\"}]','/contact-us',NULL,'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'),
	(18,24,1,NULL,'2019-03-03 09:47:56','2019-03-03 10:00:30','d1ba0ba4-619b-4881-95b1-b9156ba25552',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',NULL),
	(19,34,1,'Contact Us','2019-03-03 10:56:19','2019-03-03 10:57:02','b0e28383-9485-4983-9c3e-f06fd188c055','basic.twig',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table craftidtokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `craftidtokens`;

CREATE TABLE `craftidtokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `accessToken` text NOT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `craftidtokens_userId_fk` (`userId`),
  CONSTRAINT `craftidtokens_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table deprecationerrors
# ------------------------------------------------------------

DROP TABLE IF EXISTS `deprecationerrors`;

CREATE TABLE `deprecationerrors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `fingerprint` varchar(255) NOT NULL,
  `lastOccurrence` datetime NOT NULL,
  `file` varchar(255) NOT NULL,
  `line` smallint(6) unsigned DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `traces` text,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `deprecationerrors_key_fingerprint_unq_idx` (`key`,`fingerprint`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `deprecationerrors` WRITE;
/*!40000 ALTER TABLE `deprecationerrors` DISABLE KEYS */;

INSERT INTO `deprecationerrors` (`id`, `key`, `fingerprint`, `lastOccurrence`, `file`, `line`, `message`, `traces`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,'ElementQuery::getIterator()','/Users/kirstynoble/Sites/ifm.com/templates/page/home.twig:6','2019-03-02 18:44:21','/Users/kirstynoble/Sites/ifm.com/templates/page/home.twig',6,'Looping through element queries directly has been deprecated. Use the all() function to fetch the query results before looping over them.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/elements/db/ElementQuery.php\",\"line\":464,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"ElementQuery::getIterator()\\\", \\\"Looping through element queries directly has been deprecated. Us...\\\"\"},{\"objectClass\":\"craft\\\\elements\\\\db\\\\MatrixBlockQuery\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/0a/0ab3c06ae98b282dfb8d1a6ec1918aefc11862356e3d81c085e422376f4a672e.php\",\"line\":46,\"class\":\"craft\\\\elements\\\\db\\\\ElementQuery\",\"method\":\"getIterator\",\"args\":null},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/cc/cc52134c7ec22e300e541dcc7783cf820d0404480ed5aea91048b0afae149322.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-02 18:44:21','2019-03-02 18:44:21','66e70da9-3e3d-4a39-a949-3eaf0f75e7dd'),
	(21,'ElementQuery::getIterator()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_testimonials.twig:10','2019-03-03 11:09:23','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_testimonials.twig',10,'Looping through element queries directly has been deprecated. Use the all() function to fetch the query results before looping over them.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/elements/db/ElementQuery.php\",\"line\":464,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"ElementQuery::getIterator()\\\", \\\"Looping through element queries directly has been deprecated. Us...\\\"\"},{\"objectClass\":\"craft\\\\elements\\\\db\\\\EntryQuery\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/ae/ae6c131d4f64ea363c9e2d2aedfdaccab960e7a655f9b2bd731ace698c4aad4e.php\",\"line\":41,\"class\":\"craft\\\\elements\\\\db\\\\ElementQuery\",\"method\":\"getIterator\",\"args\":null},{\"objectClass\":\"__TwigTemplate_d55a7b54701f9a4c92c5ae0fcf921321b8b29ee3e5525424964411be9a9a7c79\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_d55a7b54701f9a4c92c5ae0fcf921321b8b29ee3e5525424964411be9a9a7c79\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_d55a7b54701f9a4c92c5ae0fcf921321b8b29ee3e5525424964411be9a9a7c79\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_d55a7b54701f9a4c92c5ae0fcf921321b8b29ee3e5525424964411be9a9a7c79\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_d55a7b54701f9a4c92c5ae0fcf921321b8b29ee3e5525424964411be9a9a7c79\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_d55a7b54701f9a4c92c5ae0fcf921321b8b29ee3e5525424964411be9a9a7c79\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":68,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 11:09:23','2019-03-03 11:09:23','90361b77-bc15-4621-a92d-6469ee9b55e8'),
	(25,'ElementQuery::getIterator()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_feature.twig:7','2019-03-03 11:09:23','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_feature.twig',7,'Looping through element queries directly has been deprecated. Use the all() function to fetch the query results before looping over them.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/elements/db/ElementQuery.php\",\"line\":464,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"ElementQuery::getIterator()\\\", \\\"Looping through element queries directly has been deprecated. Us...\\\"\"},{\"objectClass\":\"craft\\\\elements\\\\db\\\\EntryQuery\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/32/32430b9d72bba2dca7f063d689444d3203068e5a99e0ed86a59062a5f8f6b203.php\",\"line\":38,\"class\":\"craft\\\\elements\\\\db\\\\ElementQuery\",\"method\":\"getIterator\",\"args\":null},{\"objectClass\":\"__TwigTemplate_91587a353686f1ea3687762b1987a4a6db9f3d4a1524105facb4819f63c7919f\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_91587a353686f1ea3687762b1987a4a6db9f3d4a1524105facb4819f63c7919f\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_91587a353686f1ea3687762b1987a4a6db9f3d4a1524105facb4819f63c7919f\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_91587a353686f1ea3687762b1987a4a6db9f3d4a1524105facb4819f63c7919f\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_91587a353686f1ea3687762b1987a4a6db9f3d4a1524105facb4819f63c7919f\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_91587a353686f1ea3687762b1987a4a6db9f3d4a1524105facb4819f63c7919f\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":76,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 11:09:23','2019-03-03 11:09:23','a9eb9048-8950-43ba-a1e0-336e77e8a833'),
	(48,'ElementQuery::getIterator()','/Users/kirstynoble/Sites/ifm.com/templates/page/home.twig:3','2019-03-03 11:09:23','/Users/kirstynoble/Sites/ifm.com/templates/page/home.twig',3,'Looping through element queries directly has been deprecated. Use the all() function to fetch the query results before looping over them.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/elements/db/ElementQuery.php\",\"line\":464,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"ElementQuery::getIterator()\\\", \\\"Looping through element queries directly has been deprecated. Us...\\\"\"},{\"objectClass\":\"craft\\\\elements\\\\db\\\\MatrixBlockQuery\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":43,\"class\":\"craft\\\\elements\\\\db\\\\ElementQuery\",\"method\":\"getIterator\",\"args\":null},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 11:09:23','2019-03-03 11:09:23','0b22380b-d763-45b5-b7b3-9bb92ce57081'),
	(51,'ElementQuery::getIterator()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_brands_slider.twig:16','2019-03-02 19:01:43','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_brands_slider.twig',16,'Looping through element queries directly has been deprecated. Use the all() function to fetch the query results before looping over them.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/elements/db/ElementQuery.php\",\"line\":464,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"ElementQuery::getIterator()\\\", \\\"Looping through element queries directly has been deprecated. Us...\\\"\"},{\"objectClass\":\"craft\\\\elements\\\\db\\\\EntryQuery\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/e3/e302df82f5ec39d8469b67d92efcfa4688de6e3cac76190c33ad8ee782c63f3e.php\",\"line\":62,\"class\":\"craft\\\\elements\\\\db\\\\ElementQuery\",\"method\":\"getIterator\",\"args\":null},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/0a/0ab3c06ae98b282dfb8d1a6ec1918aefc11862356e3d81c085e422376f4a672e.php\",\"line\":84,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/cc/cc52134c7ec22e300e541dcc7783cf820d0404480ed5aea91048b0afae149322.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-02 19:01:43','2019-03-02 19:01:43','772b4f75-0ad0-43d6-a516-51eb2d94cd5f'),
	(139,'ElementQuery::getIterator()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_brands_slider.twig:6','2019-03-02 19:03:17','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_brands_slider.twig',6,'Looping through element queries directly has been deprecated. Use the all() function to fetch the query results before looping over them.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/elements/db/ElementQuery.php\",\"line\":464,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"ElementQuery::getIterator()\\\", \\\"Looping through element queries directly has been deprecated. Us...\\\"\"},{\"objectClass\":\"craft\\\\elements\\\\db\\\\EntryQuery\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/e3/e302df82f5ec39d8469b67d92efcfa4688de6e3cac76190c33ad8ee782c63f3e.php\",\"line\":32,\"class\":\"craft\\\\elements\\\\db\\\\ElementQuery\",\"method\":\"getIterator\",\"args\":null},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/0a/0ab3c06ae98b282dfb8d1a6ec1918aefc11862356e3d81c085e422376f4a672e.php\",\"line\":84,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/cc/cc52134c7ec22e300e541dcc7783cf820d0404480ed5aea91048b0afae149322.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-02 19:03:17','2019-03-02 19:03:17','84c9a646-ce2e-4c6f-8b3d-9d6dc1cb7063'),
	(147,'ElementQuery::getIterator()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_brands_slider.twig:15','2019-03-03 11:09:24','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_brands_slider.twig',15,'Looping through element queries directly has been deprecated. Use the all() function to fetch the query results before looping over them.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/elements/db/ElementQuery.php\",\"line\":464,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"ElementQuery::getIterator()\\\", \\\"Looping through element queries directly has been deprecated. Us...\\\"\"},{\"objectClass\":\"craft\\\\elements\\\\db\\\\EntryQuery\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/a3/a329a5c6d6c3989e1bf56073753afc9b79068f1382efbdb4c0296734fb446aea.php\",\"line\":71,\"class\":\"craft\\\\elements\\\\db\\\\ElementQuery\",\"method\":\"getIterator\",\"args\":null},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":84,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 11:09:24','2019-03-03 11:09:24','1dd98ab6-5af0-42bd-9330-2dcd37f06bde'),
	(193,'ElementQuery::getIterator()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_brands_slider.twig:5','2019-03-02 19:09:15','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_brands_slider.twig',5,'Looping through element queries directly has been deprecated. Use the all() function to fetch the query results before looping over them.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/elements/db/ElementQuery.php\",\"line\":464,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"ElementQuery::getIterator()\\\", \\\"Looping through element queries directly has been deprecated. Us...\\\"\"},{\"objectClass\":\"craft\\\\elements\\\\db\\\\EntryQuery\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/e3/e302df82f5ec39d8469b67d92efcfa4688de6e3cac76190c33ad8ee782c63f3e.php\",\"line\":31,\"class\":\"craft\\\\elements\\\\db\\\\ElementQuery\",\"method\":\"getIterator\",\"args\":null},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_3085f0fb96a2153a0a27ca0668fcea526f2feb765468448000fddff1a3a25432\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/0a/0ab3c06ae98b282dfb8d1a6ec1918aefc11862356e3d81c085e422376f4a672e.php\",\"line\":84,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_a78e3e6babdac3077cdd086ff37df046d750771a8b27e2bf0714284cba82e3dc\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/cc/cc52134c7ec22e300e541dcc7783cf820d0404480ed5aea91048b0afae149322.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_7310e713ce8db02a3148ca83b60271aafc3e4c55fc5fd018ef8461a595a89b8d\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"home\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-02 19:09:15','2019-03-02 19:09:15','c30affe1-b8f7-41cd-a481-a921af639877'),
	(212,'ElementQuery::getIterator()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_brands_slider.twig:3','2019-03-03 11:09:24','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_brands_slider.twig',3,'Looping through element queries directly has been deprecated. Use the all() function to fetch the query results before looping over them.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/elements/db/ElementQuery.php\",\"line\":464,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"ElementQuery::getIterator()\\\", \\\"Looping through element queries directly has been deprecated. Us...\\\"\"},{\"objectClass\":\"craft\\\\elements\\\\db\\\\EntryQuery\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/a3/a329a5c6d6c3989e1bf56073753afc9b79068f1382efbdb4c0296734fb446aea.php\",\"line\":29,\"class\":\"craft\\\\elements\\\\db\\\\ElementQuery\",\"method\":\"getIterator\",\"args\":null},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":84,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 11:09:24','2019-03-03 11:09:24','6bec039c-2fa0-4a83-8071-a82faad3eaf9'),
	(218,'ElementQuery::getIterator()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_brands_slider.twig:27','2019-03-03 11:09:24','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_brands_slider.twig',27,'Looping through element queries directly has been deprecated. Use the all() function to fetch the query results before looping over them.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/elements/db/ElementQuery.php\",\"line\":464,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"ElementQuery::getIterator()\\\", \\\"Looping through element queries directly has been deprecated. Us...\\\"\"},{\"objectClass\":\"craft\\\\elements\\\\db\\\\EntryQuery\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/a3/a329a5c6d6c3989e1bf56073753afc9b79068f1382efbdb4c0296734fb446aea.php\",\"line\":113,\"class\":\"craft\\\\elements\\\\db\\\\ElementQuery\",\"method\":\"getIterator\",\"args\":null},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_9144e7bee2700bfe5e5810ffe823b8364dca7baf62030b0b79cd97274c482a67\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":84,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 11:09:24','2019-03-03 11:09:24','1858e5ab-0780-455f-a4f9-8d9120e840ca'),
	(238,'craft.request.getUrl()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_banner.twig:1','2019-03-03 09:35:34','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_banner.twig',1,'craft.request.getUrl() has been deprecated. Use craft.app.request.absoluteUrl instead.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/variables/Request.php\",\"line\":141,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"craft.request.getUrl()\\\", \\\"craft.request.getUrl() has been deprecated. Use craft.app.reques...\\\"\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Extension/Core.php\",\"line\":1626,\"class\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"method\":\"getUrl\",\"args\":null},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/helpers/Template.php\",\"line\":73,\"class\":null,\"method\":\"twig_get_attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/95/951a657f04ae995c021a0fec34f4ef420cc084fdf16c4eefc1b77dbcfb0a10a4.php\",\"line\":23,\"class\":\"craft\\\\helpers\\\\Template\",\"method\":\"attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":49,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 09:35:34','2019-03-03 09:35:34','26121d21-cbc0-4c2a-a0ad-7d3e4af80f4b'),
	(245,'craft.request.getUrl()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_banner.twig:14','2019-03-03 11:09:23','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_banner.twig',14,'craft.request.getUrl() has been deprecated. Use craft.app.request.absoluteUrl instead.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/variables/Request.php\",\"line\":141,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"craft.request.getUrl()\\\", \\\"craft.request.getUrl() has been deprecated. Use craft.app.reques...\\\"\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Extension/Core.php\",\"line\":1626,\"class\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"method\":\"getUrl\",\"args\":null},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/helpers/Template.php\",\"line\":73,\"class\":null,\"method\":\"twig_get_attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/95/951a657f04ae995c021a0fec34f4ef420cc084fdf16c4eefc1b77dbcfb0a10a4.php\",\"line\":58,\"class\":\"craft\\\\helpers\\\\Template\",\"method\":\"attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":49,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 11:09:23','2019-03-03 11:09:23','3c7d04cc-ab30-439f-92e4-a104b1c7e451'),
	(246,'craft.request.getUrl()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_banner.twig:17','2019-03-03 10:34:21','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_banner.twig',17,'craft.request.getUrl() has been deprecated. Use craft.app.request.absoluteUrl instead.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/variables/Request.php\",\"line\":141,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"craft.request.getUrl()\\\", \\\"craft.request.getUrl() has been deprecated. Use craft.app.reques...\\\"\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Extension/Core.php\",\"line\":1626,\"class\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"method\":\"getUrl\",\"args\":null},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/helpers/Template.php\",\"line\":73,\"class\":null,\"method\":\"twig_get_attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/95/951a657f04ae995c021a0fec34f4ef420cc084fdf16c4eefc1b77dbcfb0a10a4.php\",\"line\":68,\"class\":\"craft\\\\helpers\\\\Template\",\"method\":\"attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":49,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 10:34:21','2019-03-03 10:34:21','2f7ff6c4-020e-4c31-82d8-e94fbfcc1bee'),
	(255,'craft.request.getUrl()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_banner.twig:22','2019-03-03 10:34:21','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_banner.twig',22,'craft.request.getUrl() has been deprecated. Use craft.app.request.absoluteUrl instead.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/variables/Request.php\",\"line\":141,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"craft.request.getUrl()\\\", \\\"craft.request.getUrl() has been deprecated. Use craft.app.reques...\\\"\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Extension/Core.php\",\"line\":1626,\"class\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"method\":\"getUrl\",\"args\":null},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/helpers/Template.php\",\"line\":73,\"class\":null,\"method\":\"twig_get_attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/95/951a657f04ae995c021a0fec34f4ef420cc084fdf16c4eefc1b77dbcfb0a10a4.php\",\"line\":78,\"class\":\"craft\\\\helpers\\\\Template\",\"method\":\"attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":49,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 10:34:21','2019-03-03 10:34:21','908c3708-e458-4a68-a80c-e7e503698830'),
	(515,'ElementQuery::getIterator()','/Users/kirstynoble/Sites/ifm.com/templates/page/basic.twig:3','2019-03-03 11:09:18','/Users/kirstynoble/Sites/ifm.com/templates/page/basic.twig',3,'Looping through element queries directly has been deprecated. Use the all() function to fetch the query results before looping over them.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/elements/db/ElementQuery.php\",\"line\":464,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"ElementQuery::getIterator()\\\", \\\"Looping through element queries directly has been deprecated. Us...\\\"\"},{\"objectClass\":\"craft\\\\elements\\\\db\\\\MatrixBlockQuery\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/8c/8c5d6830bba82c1fcd8f64b933ed3865f40e04547efcaf95a52054348ce03494.php\",\"line\":43,\"class\":\"craft\\\\elements\\\\db\\\\ElementQuery\",\"method\":\"getIterator\",\"args\":null},{\"objectClass\":\"__TwigTemplate_d90e3a3e14d50cd2d82e9a9db2093937d99b0686be98f05e63d4196d376a04d5\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_d90e3a3e14d50cd2d82e9a9db2093937d99b0686be98f05e63d4196d376a04d5\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_d90e3a3e14d50cd2d82e9a9db2093937d99b0686be98f05e63d4196d376a04d5\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_d90e3a3e14d50cd2d82e9a9db2093937d99b0686be98f05e63d4196d376a04d5\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_d90e3a3e14d50cd2d82e9a9db2093937d99b0686be98f05e63d4196d376a04d5\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_d90e3a3e14d50cd2d82e9a9db2093937d99b0686be98f05e63d4196d376a04d5\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"about-us\\\"]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"about-us\\\"]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"about-us\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"about-us\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"p\\\" => \\\"about-us\\\"]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 11:09:18','2019-03-03 11:09:18','3a0193c3-9dee-4541-ba39-dc9fc88bf2ff'),
	(517,'craft.request.getUrl()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_banner.twig:18','2019-03-03 11:09:23','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_banner.twig',18,'craft.request.getUrl() has been deprecated. Use craft.app.request.absoluteUrl instead.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/variables/Request.php\",\"line\":141,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"craft.request.getUrl()\\\", \\\"craft.request.getUrl() has been deprecated. Use craft.app.reques...\\\"\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Extension/Core.php\",\"line\":1626,\"class\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"method\":\"getUrl\",\"args\":null},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/helpers/Template.php\",\"line\":73,\"class\":null,\"method\":\"twig_get_attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/95/951a657f04ae995c021a0fec34f4ef420cc084fdf16c4eefc1b77dbcfb0a10a4.php\",\"line\":71,\"class\":\"craft\\\\helpers\\\\Template\",\"method\":\"attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":49,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 11:09:23','2019-03-03 11:09:23','6e19d50a-ca4d-40a4-bf70-edded40c41d9'),
	(518,'craft.request.getUrl()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_banner.twig:26','2019-03-03 11:09:23','/Users/kirstynoble/Sites/ifm.com/templates/_partials/block_banner.twig',26,'craft.request.getUrl() has been deprecated. Use craft.app.request.absoluteUrl instead.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/variables/Request.php\",\"line\":141,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"craft.request.getUrl()\\\", \\\"craft.request.getUrl() has been deprecated. Use craft.app.reques...\\\"\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Extension/Core.php\",\"line\":1626,\"class\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"method\":\"getUrl\",\"args\":null},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/helpers/Template.php\",\"line\":73,\"class\":null,\"method\":\"twig_get_attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/95/951a657f04ae995c021a0fec34f4ef420cc084fdf16c4eefc1b77dbcfb0a10a4.php\",\"line\":94,\"class\":\"craft\\\\helpers\\\\Template\",\"method\":\"attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_31d541e98fcd9bd0b0ae61f13922cdba40d82099fe63dd66bf333cc32497a320\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":49,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 11:09:23','2019-03-03 11:09:23','3037741d-5f78-448d-9f7e-b027ad24f177'),
	(586,'craft.request.getUrl()','/Users/kirstynoble/Sites/ifm.com/templates/_partials/_header.twig:1','2019-03-03 11:09:23','/Users/kirstynoble/Sites/ifm.com/templates/_partials/_header.twig',1,'craft.request.getUrl() has been deprecated. Use craft.app.request.absoluteUrl instead.','[{\"objectClass\":\"craft\\\\services\\\\Deprecator\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/variables/Request.php\",\"line\":141,\"class\":\"craft\\\\services\\\\Deprecator\",\"method\":\"log\",\"args\":\"\\\"craft.request.getUrl()\\\", \\\"craft.request.getUrl() has been deprecated. Use craft.app.reques...\\\"\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Extension/Core.php\",\"line\":1626,\"class\":\"craft\\\\web\\\\twig\\\\variables\\\\Request\",\"method\":\"getUrl\",\"args\":null},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/helpers/Template.php\",\"line\":73,\"class\":null,\"method\":\"twig_get_attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/26/267bca309bc078207f4ae08c78650d07641850e6a5a08fe1158bd4c2a91cf44a.php\",\"line\":24,\"class\":\"craft\\\\helpers\\\\Template\",\"method\":\"attribute\",\"args\":\"craft\\\\web\\\\twig\\\\Environment, Twig_Source, craft\\\\web\\\\twig\\\\variables\\\\Request, \\\"getUrl\\\", ...\"},{\"objectClass\":\"__TwigTemplate_47869faf27db2b2eac3f5862f6981898bad90ab0f01b557a4e2dcf57287f4f98\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_47869faf27db2b2eac3f5862f6981898bad90ab0f01b557a4e2dcf57287f4f98\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_47869faf27db2b2eac3f5862f6981898bad90ab0f01b557a4e2dcf57287f4f98\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_47869faf27db2b2eac3f5862f6981898bad90ab0f01b557a4e2dcf57287f4f98\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_47869faf27db2b2eac3f5862f6981898bad90ab0f01b557a4e2dcf57287f4f98\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_47869faf27db2b2eac3f5862f6981898bad90ab0f01b557a4e2dcf57287f4f98\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/de/de84ecc5fd7a3e7710038f39201287aaaaa85dff0c2c87d1c3c4a1b0842cdcdc.php\",\"line\":109,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_81e6c4aeae9dc04ded4ef89408e3a2f7b8c654bc1219f8df91c773a11cac66b1_1988720225\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_81e6c4aeae9dc04ded4ef89408e3a2f7b8c654bc1219f8df91c773a11cac66b1_1988720225\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_81e6c4aeae9dc04ded4ef89408e3a2f7b8c654bc1219f8df91c773a11cac66b1_1988720225\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_81e6c4aeae9dc04ded4ef89408e3a2f7b8c654bc1219f8df91c773a11cac66b1_1988720225\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_81e6c4aeae9dc04ded4ef89408e3a2f7b8c654bc1219f8df91c773a11cac66b1_1988720225\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_81e6c4aeae9dc04ded4ef89408e3a2f7b8c654bc1219f8df91c773a11cac66b1_1988720225\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/de/de84ecc5fd7a3e7710038f39201287aaaaa85dff0c2c87d1c3c4a1b0842cdcdc.php\",\"line\":47,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_81e6c4aeae9dc04ded4ef89408e3a2f7b8c654bc1219f8df91c773a11cac66b1\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_81e6c4aeae9dc04ded4ef89408e3a2f7b8c654bc1219f8df91c773a11cac66b1\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_81e6c4aeae9dc04ded4ef89408e3a2f7b8c654bc1219f8df91c773a11cac66b1\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_81e6c4aeae9dc04ded4ef89408e3a2f7b8c654bc1219f8df91c773a11cac66b1\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_81e6c4aeae9dc04ded4ef89408e3a2f7b8c654bc1219f8df91c773a11cac66b1\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_81e6c4aeae9dc04ded4ef89408e3a2f7b8c654bc1219f8df91c773a11cac66b1\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/f1/f1c0ea5276a8f15e79d9b716951070607459032dc1a85a5b95f72930cfc10543.php\",\"line\":23,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_646e869edbc6b707ba1950a1de2925d2a42511f0cb1f3799b98f76a184c6ce2e\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/storage/runtime/compiled_templates/93/932910e83eb3f2afd5b644ca39abc9a6994020bb7a0cbea5707ee4e14f9f2232.php\",\"line\":29,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":386,\"class\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"method\":\"doDisplay\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":49,\"class\":\"Twig_Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":363,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"displayWithErrorHandling\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry], \\\"view\\\" => craft\\\\web\\\\View, \\\"SORT_ASC\\\" => 4, ...], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/twig/Template.php\",\"line\":31,\"class\":\"Twig_Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]], []\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Template.php\",\"line\":371,\"class\":\"craft\\\\web\\\\twig\\\\Template\",\"method\":\"display\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"__TwigTemplate_48b20e45baa4fe5b2ffe111d47e9583a72d9857f6086b960d3c37dc9f4213b41\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/twig/twig/lib/Twig/Environment.php\",\"line\":289,\"class\":\"Twig_Template\",\"method\":\"render\",\"args\":\"[\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\twig\\\\Environment\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":337,\"class\":\"Twig_Environment\",\"method\":\"render\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/View.php\",\"line\":384,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\View\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":161,\"class\":\"craft\\\\web\\\\View\",\"method\":\"renderPageTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/controllers/TemplatesController.php\",\"line\":78,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"renderTemplate\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":null,\"line\":null,\"class\":\"craft\\\\controllers\\\\TemplatesController\",\"method\":\"actionRender\",\"args\":\"\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry, \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":null,\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/InlineAction.php\",\"line\":57,\"class\":null,\"method\":\"call_user_func_array\",\"args\":\"[craft\\\\controllers\\\\TemplatesController, \\\"actionRender\\\"], [\\\"system/selector\\\", [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"yii\\\\base\\\\InlineAction\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Controller.php\",\"line\":157,\"class\":\"yii\\\\base\\\\InlineAction\",\"method\":\"runWithParams\",\"args\":\"[\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Controller.php\",\"line\":109,\"class\":\"yii\\\\base\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\controllers\\\\TemplatesController\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Module.php\",\"line\":528,\"class\":\"craft\\\\web\\\\Controller\",\"method\":\"runAction\",\"args\":\"\\\"render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":297,\"class\":\"yii\\\\base\\\\Module\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/web/Application.php\",\"line\":103,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"runAction\",\"args\":\"\\\"templates/render\\\", [\\\"template\\\" => \\\"system/selector\\\", \\\"variables\\\" => [\\\"entry\\\" => craft\\\\elements\\\\Entry]]\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/craftcms/cms/src/web/Application.php\",\"line\":286,\"class\":\"yii\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/vendor/yiisoft/yii2/base/Application.php\",\"line\":386,\"class\":\"craft\\\\web\\\\Application\",\"method\":\"handleRequest\",\"args\":\"craft\\\\web\\\\Request\"},{\"objectClass\":\"craft\\\\web\\\\Application\",\"file\":\"/Users/kirstynoble/Sites/ifm.com/web/index.php\",\"line\":21,\"class\":\"yii\\\\base\\\\Application\",\"method\":\"run\",\"args\":null}]','2019-03-03 11:09:23','2019-03-03 11:09:23','acbdb6a7-c7b0-43ca-9749-2608c5ce0277');

/*!40000 ALTER TABLE `deprecationerrors` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table dq_form_log
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dq_form_log`;

CREATE TABLE `dq_form_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form_data` text,
  `server_data` text,
  `html_mail` text,
  `dateCreated` datetime DEFAULT NULL,
  `dateUpdated` datetime DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table elementindexsettings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `elementindexsettings`;

CREATE TABLE `elementindexsettings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `settings` text,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `elementindexsettings_type_unq_idx` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table elements
# ------------------------------------------------------------

DROP TABLE IF EXISTS `elements`;

CREATE TABLE `elements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `dateDeleted` datetime DEFAULT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `elements_dateDeleted_idx` (`dateDeleted`),
  KEY `elements_fieldLayoutId_idx` (`fieldLayoutId`),
  KEY `elements_type_idx` (`type`),
  KEY `elements_enabled_idx` (`enabled`),
  KEY `elements_archived_dateCreated_idx` (`archived`,`dateCreated`),
  CONSTRAINT `elements_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `elements` WRITE;
/*!40000 ALTER TABLE `elements` DISABLE KEYS */;

INSERT INTO `elements` (`id`, `fieldLayoutId`, `type`, `enabled`, `archived`, `dateCreated`, `dateUpdated`, `dateDeleted`, `uid`)
VALUES
	(1,NULL,'craft\\elements\\User',1,0,'2019-02-17 09:47:27','2019-02-17 09:47:27',NULL,'2e9a17cf-1135-4e3f-9c1c-0203dad04eb2'),
	(2,NULL,'craft\\elements\\Entry',0,0,'2019-02-22 09:13:47','2019-02-28 20:01:53','2019-02-28 20:01:59','0dde02c5-e9ff-4f1a-8233-7e13334a3147'),
	(3,1,'craft\\elements\\Entry',1,0,'2019-02-28 20:01:36','2019-03-03 09:11:10',NULL,'fec7ae84-2d92-42d2-9751-f6cacb58d8c9'),
	(4,3,'craft\\elements\\MatrixBlock',1,0,'2019-03-02 17:28:56','2019-03-03 09:11:10',NULL,'f7ba13a3-0767-4090-8e66-9415520865ad'),
	(5,4,'craft\\elements\\MatrixBlock',1,0,'2019-03-02 17:28:56','2019-03-02 17:55:30','2019-03-02 18:02:08','7c185421-9196-4dd4-9bd9-1ba843770b42'),
	(6,5,'craft\\elements\\MatrixBlock',1,0,'2019-03-02 17:28:56','2019-03-03 09:11:10',NULL,'e3c32d6f-5fe5-4a3b-ad0a-d375d34e4067'),
	(7,6,'craft\\elements\\MatrixBlock',1,0,'2019-03-02 17:28:56','2019-03-03 09:11:10',NULL,'e2077811-b87d-4c98-908f-62f37930e115'),
	(8,8,'craft\\elements\\Entry',1,0,'2019-03-02 18:12:20','2019-03-02 18:12:20',NULL,'350e21f7-ea63-4298-bc33-886fea26fe91'),
	(9,8,'craft\\elements\\Entry',1,0,'2019-03-02 18:12:59','2019-03-02 18:12:59',NULL,'22d66cf6-a357-40de-883b-47582ec5d68a'),
	(10,9,'craft\\elements\\Entry',1,0,'2019-03-02 18:24:00','2019-03-02 18:24:00',NULL,'15af9d40-2561-4cc5-ae3f-d01608dd4996'),
	(11,16,'craft\\elements\\Entry',1,0,'2019-03-02 18:25:05','2019-03-03 10:54:02',NULL,'911e0920-22ab-426c-845e-0190b939f90b'),
	(12,16,'craft\\elements\\Entry',1,0,'2019-03-02 18:25:14','2019-03-03 10:50:43','2019-03-03 10:56:53','b67d8cca-62db-4c4f-9607-199ce359f95a'),
	(13,9,'craft\\elements\\Entry',1,0,'2019-03-02 18:26:03','2019-03-02 18:26:10',NULL,'eae770ee-3255-4170-8095-5c854128b018'),
	(14,10,'craft\\elements\\MatrixBlock',1,0,'2019-03-02 18:39:51','2019-03-03 09:11:10',NULL,'4529b466-df61-46ef-ba66-62a7aa2b5535'),
	(15,NULL,'craft\\elements\\Asset',1,0,'2019-03-02 18:44:02','2019-03-02 18:44:02',NULL,'1acec768-f36f-4d45-8917-6c2f6fb3ee18'),
	(16,NULL,'craft\\elements\\Asset',1,0,'2019-03-02 18:47:37','2019-03-02 18:47:37',NULL,'28d3510c-385a-42e7-a80e-c42d1485bf8f'),
	(17,11,'craft\\elements\\Entry',1,0,'2019-03-02 18:47:41','2019-03-02 19:09:09',NULL,'43aff82b-7b11-47ea-a1bb-4bdcf82a940f'),
	(18,NULL,'craft\\elements\\Asset',1,0,'2019-03-02 18:47:56','2019-03-02 18:47:56',NULL,'772dfe99-7040-41a4-b577-c015186e741b'),
	(19,11,'craft\\elements\\Entry',1,0,'2019-03-02 18:48:00','2019-03-02 19:09:09',NULL,'03bdb618-da29-4bc6-a02d-fd54c8aa45d4'),
	(20,NULL,'craft\\elements\\Asset',1,0,'2019-03-02 18:48:13','2019-03-02 18:48:13',NULL,'40bfa182-ed64-44c3-ae9e-db6ba3daeb39'),
	(21,11,'craft\\elements\\Entry',1,0,'2019-03-02 18:48:16','2019-03-02 19:09:09',NULL,'47365b91-87fe-49e2-b4c1-1b4c0848734b'),
	(22,7,'craft\\elements\\MatrixBlock',1,0,'2019-03-02 18:53:44','2019-03-03 09:11:10',NULL,'99ea174d-6a8d-40bc-aa90-01e84716b1a9'),
	(23,14,'craft\\elements\\GlobalSet',1,0,'2019-03-03 09:45:22','2019-03-03 10:25:44',NULL,'8330cc3b-8d17-4aa2-809d-0a8b7c722091'),
	(24,15,'craft\\elements\\GlobalSet',1,0,'2019-03-03 09:47:56','2019-03-03 10:00:30',NULL,'774be2c1-ad4a-4a5a-8961-67b418659bb4'),
	(25,12,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2019-03-03 09:48:30','2019-03-03 10:00:30',NULL,'5c4e06d4-3c42-4ad9-96e7-e9b5942b27ce'),
	(26,12,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2019-03-03 09:48:30','2019-03-03 10:00:30',NULL,'b96ec3b6-e0c7-44af-8727-964f3bf157cc'),
	(27,13,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2019-03-03 09:50:32','2019-03-03 10:00:30',NULL,'656050f1-2432-4ead-83fe-4b1f195375af'),
	(28,13,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2019-03-03 09:52:40','2019-03-03 10:00:30',NULL,'189a0feb-1baa-496d-af8d-51c973124df7'),
	(29,13,'verbb\\supertable\\elements\\SuperTableBlockElement',1,0,'2019-03-03 09:52:40','2019-03-03 10:00:30',NULL,'494f3026-7fda-461f-af85-7eeda9065f8b'),
	(30,10,'craft\\elements\\MatrixBlock',1,0,'2019-03-03 10:46:07','2019-03-03 10:46:07',NULL,'d225ea7c-4b4a-48aa-a212-1018052f3416'),
	(31,17,'craft\\elements\\MatrixBlock',1,0,'2019-03-03 10:48:12','2019-03-03 10:54:02',NULL,'62b527c8-936e-4b27-aee1-ea524f28517f'),
	(32,19,'craft\\elements\\MatrixBlock',1,0,'2019-03-03 10:48:12','2019-03-03 10:54:02',NULL,'48042798-ab36-4a36-babc-ec8ba2e605fa'),
	(33,18,'craft\\elements\\MatrixBlock',1,0,'2019-03-03 10:50:00','2019-03-03 10:54:02',NULL,'2ee960ef-46cb-43d3-9894-5e4c205bff01'),
	(34,16,'craft\\elements\\Entry',1,0,'2019-03-03 10:56:19','2019-03-03 10:57:02',NULL,'ed3f3c5f-c845-4877-8751-0bf8c4513578'),
	(35,17,'craft\\elements\\MatrixBlock',1,0,'2019-03-03 10:56:19','2019-03-03 10:57:02',NULL,'6dbd62b9-eaf1-4fb7-b583-5132a7d59feb'),
	(36,18,'craft\\elements\\MatrixBlock',1,0,'2019-03-03 10:56:19','2019-03-03 10:57:02',NULL,'28fcb1d0-aa5d-4f48-84e3-0623653136ff'),
	(37,19,'craft\\elements\\MatrixBlock',1,0,'2019-03-03 10:56:19','2019-03-03 10:57:02',NULL,'ee800a97-8ca2-49a6-9553-160397772e67');

/*!40000 ALTER TABLE `elements` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table elements_sites
# ------------------------------------------------------------

DROP TABLE IF EXISTS `elements_sites`;

CREATE TABLE `elements_sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `uri` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `elements_sites_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `elements_sites_siteId_idx` (`siteId`),
  KEY `elements_sites_slug_siteId_idx` (`slug`,`siteId`),
  KEY `elements_sites_enabled_idx` (`enabled`),
  KEY `elements_sites_uri_siteId_idx` (`uri`,`siteId`),
  CONSTRAINT `elements_sites_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `elements_sites_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `elements_sites` WRITE;
/*!40000 ALTER TABLE `elements_sites` DISABLE KEYS */;

INSERT INTO `elements_sites` (`id`, `elementId`, `siteId`, `slug`, `uri`, `enabled`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,1,1,NULL,NULL,1,'2019-02-17 09:47:27','2019-02-17 09:47:27','3cdce333-4258-485c-a7fa-1c9475facf6e'),
	(2,2,1,'homepage','homepage',1,'2019-02-22 09:13:47','2019-02-28 20:01:53','37ad7585-f870-4a92-94e8-81a92d4839e2'),
	(3,3,1,'__home__','__home__',1,'2019-02-28 20:01:36','2019-03-03 09:11:10','9485cd1b-46de-488e-a0f0-00f1a1891fd2'),
	(4,4,1,NULL,NULL,1,'2019-03-02 17:28:56','2019-03-03 09:11:10','de9b3faa-ee71-4416-9f85-093b09aa7c4c'),
	(5,5,1,NULL,NULL,1,'2019-03-02 17:28:56','2019-03-02 17:55:30','553cbcb3-09a1-4f2b-a2f5-eed8ee560ac3'),
	(6,6,1,NULL,NULL,1,'2019-03-02 17:28:56','2019-03-03 09:11:10','4c78a409-0b48-4999-9df9-1a576e3a071e'),
	(7,7,1,NULL,NULL,1,'2019-03-02 17:28:56','2019-03-03 09:11:10','37435f7b-8de3-4550-af2d-c7d4e6db22e2'),
	(8,8,1,'testimonial-01','testimonial-01',1,'2019-03-02 18:12:20','2019-03-02 18:12:21','978c99f9-b829-4230-b922-6b74a0ab6a4e'),
	(9,9,1,'testimonial-02','testimonial-02',1,'2019-03-02 18:12:59','2019-03-02 18:13:00','037e148a-88cd-41de-8a46-d4d63da62370'),
	(10,10,1,'view-featured-page-or-casestudy','view-featured-page-or-casestudy',1,'2019-03-02 18:24:00','2019-03-02 18:24:01','571c2e4e-09c7-4767-8bc6-58372c08fdfe'),
	(11,11,1,'about-us','about-us',1,'2019-03-02 18:25:05','2019-03-03 10:54:02','05273176-af82-464f-abb5-5a23e666924c'),
	(12,12,1,'contact-us','contact-us',1,'2019-03-02 18:25:14','2019-03-03 10:50:43','5ef32878-e754-475b-98e0-1339a0618db8'),
	(13,13,1,'view-featured-page-or-casestudy-1','view-featured-page-or-casestudy-1',1,'2019-03-02 18:26:03','2019-03-02 18:26:10','c652e135-1309-471a-a7be-697f0334d0aa'),
	(14,14,1,NULL,NULL,1,'2019-03-02 18:39:51','2019-03-03 09:11:10','074567bc-3527-4e1a-a736-1e77075c0d67'),
	(15,15,1,NULL,NULL,1,'2019-03-02 18:44:02','2019-03-02 18:44:02','2013a5c1-a3bc-458e-8c5b-03e4e2008a52'),
	(16,16,1,NULL,NULL,1,'2019-03-02 18:47:37','2019-03-02 18:47:37','5a272d09-ee88-4a1d-81ee-8bc3636b69d1'),
	(17,17,1,'nexen','nexen',1,'2019-03-02 18:47:41','2019-03-02 19:09:09','38beb9a0-9ad5-4f99-848b-af987b8234b3'),
	(18,18,1,NULL,NULL,1,'2019-03-02 18:47:56','2019-03-02 18:47:56','b7f68c66-8d2f-420b-82eb-e0ca33c4f28e'),
	(19,19,1,'nexen-02','nexen-02',1,'2019-03-02 18:48:00','2019-03-02 19:09:09','d4d2d2d3-bb3d-4dd6-a596-986db05c2be4'),
	(20,20,1,NULL,NULL,1,'2019-03-02 18:48:13','2019-03-02 18:48:13','71372d3f-be83-41a9-aa3b-5082638280e8'),
	(21,21,1,'air-control','air-control',1,'2019-03-02 18:48:16','2019-03-02 19:09:09','530431b6-e0c5-4b08-a7de-259d2a8ee676'),
	(22,22,1,NULL,NULL,1,'2019-03-02 18:53:44','2019-03-03 09:11:10','e2e69327-9208-40a3-8d63-ba144a73af83'),
	(23,23,1,NULL,NULL,1,'2019-03-03 09:45:22','2019-03-03 10:25:44','940c1183-55bb-40de-873d-2b2ffd2d0bfc'),
	(24,24,1,NULL,NULL,1,'2019-03-03 09:47:56','2019-03-03 10:00:30','6b0223fc-7050-4428-b15a-3d11ac944f87'),
	(25,25,1,NULL,NULL,1,'2019-03-03 09:48:30','2019-03-03 10:00:30','bf3b155c-ad96-4490-a4c7-45e8868404eb'),
	(26,26,1,NULL,NULL,1,'2019-03-03 09:48:30','2019-03-03 10:00:30','a309d7f8-727c-4b16-a7c6-98ea532ee287'),
	(27,27,1,NULL,NULL,1,'2019-03-03 09:50:32','2019-03-03 10:00:30','ac0873d6-39bf-4c21-8779-91315acdae24'),
	(28,28,1,NULL,NULL,1,'2019-03-03 09:52:40','2019-03-03 10:00:30','0fd6b622-3a1d-4072-a794-b2fee60ca056'),
	(29,29,1,NULL,NULL,1,'2019-03-03 09:52:40','2019-03-03 10:00:30','71581d7e-cb69-4fa5-b9aa-31beb8ca5507'),
	(30,30,1,NULL,NULL,1,'2019-03-03 10:46:07','2019-03-03 10:46:07','85b502c9-af1a-4ee4-9fcd-d00063b33c07'),
	(31,31,1,NULL,NULL,1,'2019-03-03 10:48:12','2019-03-03 10:54:02','e1338531-23f6-43d2-af38-9131f840acd6'),
	(32,32,1,NULL,NULL,1,'2019-03-03 10:48:12','2019-03-03 10:54:02','5c10e05d-1295-42e5-a2de-51d4b3b5627e'),
	(33,33,1,NULL,NULL,1,'2019-03-03 10:50:00','2019-03-03 10:54:02','8e50b0e6-a027-4785-b385-e13df7f93f60'),
	(34,34,1,'contact-us','contact-us',1,'2019-03-03 10:56:19','2019-03-03 10:57:02','3b6d4587-fe05-42fe-bb2d-7e941600c5b4'),
	(35,35,1,NULL,NULL,1,'2019-03-03 10:56:19','2019-03-03 10:57:02','895f3280-8972-473b-8622-c3fcb79e362e'),
	(36,36,1,NULL,NULL,1,'2019-03-03 10:56:19','2019-03-03 10:57:02','dbab8723-ac16-4b84-bfa3-bb02329bd3fe'),
	(37,37,1,NULL,NULL,1,'2019-03-03 10:56:19','2019-03-03 10:57:02','cc38c898-b5ff-42fc-92a5-bfd8da5343f6');

/*!40000 ALTER TABLE `elements_sites` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table entries
# ------------------------------------------------------------

DROP TABLE IF EXISTS `entries`;

CREATE TABLE `entries` (
  `id` int(11) NOT NULL,
  `sectionId` int(11) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `typeId` int(11) NOT NULL,
  `authorId` int(11) DEFAULT NULL,
  `postDate` datetime DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `deletedWithEntryType` tinyint(1) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `entries_postDate_idx` (`postDate`),
  KEY `entries_expiryDate_idx` (`expiryDate`),
  KEY `entries_authorId_idx` (`authorId`),
  KEY `entries_sectionId_idx` (`sectionId`),
  KEY `entries_typeId_idx` (`typeId`),
  KEY `entries_parentId_fk` (`parentId`),
  CONSTRAINT `entries_authorId_fk` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entries_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entries_parentId_fk` FOREIGN KEY (`parentId`) REFERENCES `entries` (`id`) ON DELETE SET NULL,
  CONSTRAINT `entries_sectionId_fk` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entries_typeId_fk` FOREIGN KEY (`typeId`) REFERENCES `entrytypes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `entries` WRITE;
/*!40000 ALTER TABLE `entries` DISABLE KEYS */;

INSERT INTO `entries` (`id`, `sectionId`, `parentId`, `typeId`, `authorId`, `postDate`, `expiryDate`, `deletedWithEntryType`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(2,1,NULL,1,1,'2019-02-22 09:13:00',NULL,0,'2019-02-22 09:13:47','2019-02-28 20:01:53','9bd7cd2c-8170-49f0-a3df-88289c1c960f'),
	(3,1,NULL,2,1,'2019-02-28 20:01:00',NULL,NULL,'2019-02-28 20:01:36','2019-03-03 09:11:10','49da646c-0442-4a92-ba1f-bf2434e8058e'),
	(8,2,NULL,3,1,'2019-03-02 18:12:00',NULL,NULL,'2019-03-02 18:12:20','2019-03-02 18:12:20','c6463cda-0eae-4d27-83e4-c67c8c7a5242'),
	(9,2,NULL,3,1,'2019-03-02 18:12:00',NULL,NULL,'2019-03-02 18:12:59','2019-03-02 18:12:59','acb839e3-8d85-4b14-a5f2-7aa21de8561c'),
	(10,3,NULL,4,1,'2019-03-02 18:24:00',NULL,NULL,'2019-03-02 18:24:00','2019-03-02 18:24:00','0ec496ea-0b16-452a-affb-985d3dfaaf3d'),
	(11,4,NULL,5,1,'2019-03-02 18:25:00',NULL,NULL,'2019-03-02 18:25:05','2019-03-03 10:54:02','95479b31-0032-4ca1-b9eb-c5e66babbbb0'),
	(12,4,NULL,5,1,'2019-03-02 18:25:00',NULL,0,'2019-03-02 18:25:14','2019-03-03 10:50:43','7682d032-9d38-4d13-83a6-02a237a4e1bb'),
	(13,3,NULL,4,1,'2019-03-02 18:24:00',NULL,NULL,'2019-03-02 18:26:03','2019-03-02 18:26:10','dfe25330-a683-4122-9757-73e43021886f'),
	(17,5,NULL,6,1,'2019-03-02 18:47:00',NULL,NULL,'2019-03-02 18:47:41','2019-03-02 19:09:09','5b8ec2ce-dc87-4194-88a0-d009974ed9fe'),
	(19,5,NULL,6,1,'2019-03-02 18:48:00',NULL,NULL,'2019-03-02 18:48:00','2019-03-02 19:09:09','48167ce2-5ab8-439e-ab40-bff785839170'),
	(21,5,NULL,6,1,'2019-03-02 18:48:00',NULL,NULL,'2019-03-02 18:48:16','2019-03-02 19:09:09','d51ec3e1-eebf-4d2e-94d1-22f0e9ca7076'),
	(34,4,NULL,5,1,'2019-03-02 18:25:00',NULL,NULL,'2019-03-03 10:56:19','2019-03-03 10:57:02','0dda9611-5503-4e61-92fc-d5c90b0fad44');

/*!40000 ALTER TABLE `entries` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table entrydrafts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `entrydrafts`;

CREATE TABLE `entrydrafts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entryId` int(11) NOT NULL,
  `sectionId` int(11) NOT NULL,
  `creatorId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `notes` text,
  `data` mediumtext NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `entrydrafts_sectionId_idx` (`sectionId`),
  KEY `entrydrafts_entryId_siteId_idx` (`entryId`,`siteId`),
  KEY `entrydrafts_siteId_idx` (`siteId`),
  KEY `entrydrafts_creatorId_idx` (`creatorId`),
  CONSTRAINT `entrydrafts_creatorId_fk` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entrydrafts_entryId_fk` FOREIGN KEY (`entryId`) REFERENCES `entries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entrydrafts_sectionId_fk` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entrydrafts_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table entrytypes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `entrytypes`;

CREATE TABLE `entrytypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sectionId` int(11) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `hasTitleField` tinyint(1) NOT NULL DEFAULT '1',
  `titleLabel` varchar(255) DEFAULT 'Title',
  `titleFormat` varchar(255) DEFAULT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `dateDeleted` datetime DEFAULT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `entrytypes_name_sectionId_idx` (`name`,`sectionId`),
  KEY `entrytypes_handle_sectionId_idx` (`handle`,`sectionId`),
  KEY `entrytypes_sectionId_idx` (`sectionId`),
  KEY `entrytypes_fieldLayoutId_idx` (`fieldLayoutId`),
  KEY `entrytypes_dateDeleted_idx` (`dateDeleted`),
  CONSTRAINT `entrytypes_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `entrytypes_sectionId_fk` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `entrytypes` WRITE;
/*!40000 ALTER TABLE `entrytypes` DISABLE KEYS */;

INSERT INTO `entrytypes` (`id`, `sectionId`, `fieldLayoutId`, `name`, `handle`, `hasTitleField`, `titleLabel`, `titleFormat`, `sortOrder`, `dateCreated`, `dateUpdated`, `dateDeleted`, `uid`)
VALUES
	(1,1,2,'systemPages','systempages',1,'Title','',1,'2019-02-22 09:12:42','2019-03-02 14:06:30',NULL,'5d18f2dc-1d67-45a1-9bda-16bf9c741a14'),
	(2,1,1,'Homepage','homepage',1,'Homepage','',2,'2019-02-28 20:00:37','2019-03-03 09:10:59',NULL,'6b5c19ff-bd53-4bc0-8f9a-cfd02a58ad92'),
	(3,2,8,'Testimonial','testimonial',1,'Title','',1,'2019-03-02 18:10:39','2019-03-02 18:11:20',NULL,'ecac885d-5a1c-44bc-82f1-e1ea9a7f2409'),
	(4,3,9,'Casestudy','casestudy',1,'Title','',1,'2019-03-02 18:19:28','2019-03-02 18:22:54',NULL,'e8f301e8-415b-46ce-9c9d-d28706b50dfd'),
	(5,4,16,'Page','page',1,'Title','',1,'2019-03-02 18:24:54','2019-03-03 10:50:42',NULL,'a7a58ed6-276f-485d-8706-18365606504c'),
	(6,5,11,'Brand','brand',0,'Company Name','Brand Logo',1,'2019-03-02 18:45:04','2019-03-02 19:08:53',NULL,'ac706833-da50-442e-820a-bc30693a9237');

/*!40000 ALTER TABLE `entrytypes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table entryversions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `entryversions`;

CREATE TABLE `entryversions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `entryId` int(11) NOT NULL,
  `sectionId` int(11) NOT NULL,
  `creatorId` int(11) DEFAULT NULL,
  `siteId` int(11) NOT NULL,
  `num` smallint(6) unsigned NOT NULL,
  `notes` text,
  `data` mediumtext NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `entryversions_sectionId_idx` (`sectionId`),
  KEY `entryversions_entryId_siteId_idx` (`entryId`,`siteId`),
  KEY `entryversions_siteId_idx` (`siteId`),
  KEY `entryversions_creatorId_idx` (`creatorId`),
  CONSTRAINT `entryversions_creatorId_fk` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `entryversions_entryId_fk` FOREIGN KEY (`entryId`) REFERENCES `entries` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entryversions_sectionId_fk` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`) ON DELETE CASCADE,
  CONSTRAINT `entryversions_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `entryversions` WRITE;
/*!40000 ALTER TABLE `entryversions` DISABLE KEYS */;

INSERT INTO `entryversions` (`id`, `entryId`, `sectionId`, `creatorId`, `siteId`, `num`, `notes`, `data`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,2,1,1,1,1,'','{\"typeId\":\"1\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"homepage\",\"postDate\":1550826780,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":[]}','2019-02-22 09:13:47','2019-02-22 09:13:47','0e93a335-4dc6-4abd-bf1a-901a6450dcf1'),
	(2,3,1,1,1,1,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"homepage-1\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"1\":\"page/home.html\"}}','2019-02-28 20:01:36','2019-02-28 20:01:36','76c2fdcf-df39-48c3-b866-aa2275934df0'),
	(3,2,1,1,1,2,'','{\"typeId\":\"1\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"homepage\",\"postDate\":1550826780,\"expiryDate\":null,\"enabled\":false,\"newParentId\":\"\",\"fields\":[]}','2019-02-28 20:01:53','2019-02-28 20:01:53','7a9fa9ba-6d3d-4851-b5d1-af608f5fc360'),
	(4,3,1,1,1,2,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"__home__\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"1\":\"page/home.html\"}}','2019-03-02 14:02:41','2019-03-02 14:02:41','4c170f5e-1019-45fe-b4d0-bd63079dc9dc'),
	(5,3,1,1,1,3,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"1\":\"\"}}','2019-03-02 14:06:40','2019-03-02 14:06:40','880f9869-b8db-456c-88e5-3b6e44803299'),
	(6,3,1,1,1,4,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"1\":\"home.html\"}}','2019-03-02 14:07:31','2019-03-02 14:07:31','26f9fe63-9e30-40c7-bfa3-dc5928dd9f8c'),
	(7,3,1,1,1,5,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"1\":\"home.twig\"}}','2019-03-02 14:10:44','2019-03-02 14:10:44','3b2acb72-26db-4cc3-99f1-46a9b24cbf95'),
	(8,3,1,1,1,6,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":{\"4\":{\"type\":\"featuredPages\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a featured page\",\"pages\":[]}},\"5\":{\"type\":\"textBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text block\"}},\"6\":{\"type\":\"textWrapBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text wrap block\"}},\"7\":{\"type\":\"featuredTestimonials\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a featured testimonial\",\"testimonials\":[]}}},\"1\":\"home.twig\"}}','2019-03-02 17:28:56','2019-03-02 17:28:56','8f37128f-607f-4a5d-8b65-b538895c6284'),
	(9,3,1,1,1,7,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":{\"4\":{\"type\":\"featuredPages\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a featured page\",\"pages\":[]}},\"5\":{\"type\":\"textBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text block\"}},\"6\":{\"type\":\"textWrapBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text wrap block\",\"subtitle\":\"This is a small subtitle\",\"pageLink\":\"/about-us\",\"contactLink\":\"/contact-us\",\"contentText\":\"This is an introduction to the next page.\"}},\"7\":{\"type\":\"featuredTestimonials\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a featured testimonial\",\"testimonials\":[]}}},\"1\":\"home.twig\"}}','2019-03-02 17:52:39','2019-03-02 17:52:39','e48afaea-ebe7-45e7-bc66-648e82542b5c'),
	(10,8,2,1,1,1,'','{\"typeId\":\"3\",\"authorId\":\"1\",\"title\":\"Testimonial 01\",\"slug\":\"testimonial-01\",\"postDate\":1551550320,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"20\":\"Nexen\",\"19\":\"Executive CEO\",\"18\":\"This is a quote\"}}','2019-03-02 18:12:20','2019-03-02 18:12:20','dc5056ad-09f9-4270-8a8a-100d53de5ac6'),
	(11,9,2,1,1,1,'','{\"typeId\":\"3\",\"authorId\":\"1\",\"title\":\"Testimonial 02\",\"slug\":\"testimonial-02\",\"postDate\":1551550320,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"20\":\"Air Control\",\"19\":\"Vice President\",\"18\":\"This is a quote 02\"}}','2019-03-02 18:12:59','2019-03-02 18:12:59','95dded2d-270a-4cc4-b3d1-c2cd609ed43f'),
	(12,3,1,1,1,8,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":{\"4\":{\"type\":\"featuredPages\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"pages\":[]}},\"6\":{\"type\":\"textWrapBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text wrap block\",\"subtitle\":\"This is a small subtitle\",\"pageLink\":\"/about-us\",\"contactLink\":\"/contact-us\",\"contentText\":\"This is an introduction to the next page.\"}},\"7\":{\"type\":\"featuredTestimonials\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"testimonials\":[\"8\",\"9\"]}}},\"1\":\"home.twig\"}}','2019-03-02 18:13:21','2019-03-02 18:13:21','4ace0b7f-bac3-44d3-a3f3-64fc9ee4c242'),
	(13,10,3,1,1,1,'','{\"typeId\":\"4\",\"authorId\":\"1\",\"title\":\"View Featured Page or Casestudy\",\"slug\":\"view-featured-page-or-casestudy\",\"postDate\":1551551040,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"13\":\"This is some text about the page your going to read more on next.\",\"21\":[\"3\"]}}','2019-03-02 18:24:00','2019-03-02 18:24:00','cbaf1146-db96-476d-a638-93fc1845dae6'),
	(14,11,4,1,1,1,'','{\"typeId\":\"5\",\"authorId\":\"1\",\"title\":\"About Us\",\"slug\":\"about-us\",\"postDate\":1551551100,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":[]}','2019-03-02 18:25:05','2019-03-02 18:25:05','12e7cfed-7128-4e68-8cf3-700579b794df'),
	(15,12,4,1,1,1,'','{\"typeId\":\"5\",\"authorId\":\"1\",\"title\":\"Contact Us\",\"slug\":\"contact-us\",\"postDate\":1551551100,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":[]}','2019-03-02 18:25:14','2019-03-02 18:25:14','8313b93e-ec5c-4458-a954-de89b8949b8c'),
	(16,13,3,1,1,1,'Revision from 2 Mar 2019, 10:26:03','{\"typeId\":\"4\",\"authorId\":\"1\",\"title\":\"View Featured Page or Casestudy copy\",\"slug\":\"view-featured-page-or-casestudy-1\",\"postDate\":1551551040,\"expiryDate\":null,\"enabled\":\"1\",\"newParentId\":null,\"fields\":{\"13\":\"This is some text about the page your going to read more on next.\",\"21\":[\"3\"]}}','2019-03-02 18:26:09','2019-03-02 18:26:09','eff2ed67-f467-468a-8ddf-e523e7fa13f8'),
	(17,13,3,1,1,2,'','{\"typeId\":\"4\",\"authorId\":\"1\",\"title\":\"View Featured Page or Casestudy 02\",\"slug\":\"view-featured-page-or-casestudy-1\",\"postDate\":1551551040,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"13\":\"This is some text about the page your going to read more on next.\",\"21\":[\"3\"]}}','2019-03-02 18:26:10','2019-03-02 18:26:10','f52cfbbe-cf72-4ac4-aa20-c3c24f7a8a2c'),
	(18,3,1,1,1,9,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":{\"4\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}},\"6\":{\"type\":\"textWrapBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text wrap block\",\"subtitle\":\"This is a small subtitle\",\"pageLink\":\"/about-us\",\"contactLink\":\"/contact-us\",\"contentText\":\"This is an introduction to the next page.\"}},\"7\":{\"type\":\"featuredTestimonials\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"8\",\"9\"]}}},\"1\":\"home.twig\"}}','2019-03-02 18:28:25','2019-03-02 18:28:25','0ca230ad-9d16-4841-b9c4-6eebaf66cf0d'),
	(19,3,1,1,1,10,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":{\"6\":{\"type\":\"textWrapBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text wrap block\",\"subtitle\":\"This is a small subtitle\",\"pageLink\":\"/about-us\",\"contactLink\":\"/contact-us\",\"contentText\":\"This is an introduction to the next page.\"}},\"4\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}},\"7\":{\"type\":\"featuredTestimonials\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"8\",\"9\"]}}},\"1\":\"home.twig\"}}','2019-03-02 18:29:07','2019-03-02 18:29:07','fcd6de1a-e2ad-4544-b7a1-d601a01a3d3f'),
	(20,3,1,1,1,11,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":{\"14\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"heroImage\":[],\"headline\":\"We provide a unique service to our clients.\"}},\"6\":{\"type\":\"textWrapBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text wrap block\",\"subtitle\":\"This is a small subtitle\",\"pageLink\":\"/about-us\",\"contactLink\":\"/contact-us\",\"contentText\":\"This is an introduction to the next page.\"}},\"4\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}},\"7\":{\"type\":\"featuredTestimonials\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"8\",\"9\"]}}},\"1\":\"home.twig\"}}','2019-03-02 18:39:51','2019-03-02 18:39:51','f3c21cbe-c454-490e-9451-c55f165bdb5e'),
	(21,3,1,1,1,12,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":{\"14\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[],\"headline\":\"We provide a unique service to our clients.\"}},\"6\":{\"type\":\"textWrapBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text wrap block\",\"subtitle\":\"This is a small subtitle\",\"pageLink\":\"/about-us\",\"contactLink\":\"/contact-us\",\"contentText\":\"This is an introduction to the next page.\"}},\"4\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}},\"7\":{\"type\":\"featuredTestimonials\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"8\",\"9\"]}}},\"1\":\"home.twig\"}}','2019-03-02 18:43:12','2019-03-02 18:43:12','6484b0b2-0833-4a75-b4c8-fbf3b065a105'),
	(22,3,1,1,1,13,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":{\"14\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[\"15\"],\"headline\":\"We provide a unique service to our clients.\"}},\"6\":{\"type\":\"textWrapBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text wrap block\",\"subtitle\":\"This is a small subtitle\",\"pageLink\":\"/about-us\",\"contactLink\":\"/contact-us\",\"contentText\":\"This is an introduction to the next page.\"}},\"4\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}},\"7\":{\"type\":\"featuredTestimonials\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"8\",\"9\"]}}},\"1\":\"home.twig\"}}','2019-03-02 18:44:06','2019-03-02 18:44:06','a649e0cf-da6b-4d8c-af9d-1c4985fc0e03'),
	(23,3,1,1,1,14,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":{\"14\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[],\"headline\":\"We provide a unique service to our clients.\"}},\"6\":{\"type\":\"textWrapBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text wrap block\",\"subtitle\":\"This is a small subtitle\",\"pageLink\":\"/about-us\",\"contactLink\":\"/contact-us\",\"contentText\":\"This is an introduction to the next page.\"}},\"4\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}},\"7\":{\"type\":\"featuredTestimonials\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"8\",\"9\"]}}},\"1\":\"home.twig\"}}','2019-03-02 18:44:17','2019-03-02 18:44:17','b44a26e5-9b6e-42f1-847d-b3bd1008ce61'),
	(24,17,5,1,1,1,'','{\"typeId\":\"6\",\"authorId\":\"1\",\"title\":\"Nexen\",\"slug\":\"nexen\",\"postDate\":1551552420,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"22\":[\"16\"]}}','2019-03-02 18:47:41','2019-03-02 18:47:41','cfd8a60b-e72c-4cfd-8ce4-b0e93b3e5e5b'),
	(25,19,5,1,1,1,'','{\"typeId\":\"6\",\"authorId\":\"1\",\"title\":\"Nexen 02\",\"slug\":\"nexen-02\",\"postDate\":1551552480,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"22\":[\"18\"]}}','2019-03-02 18:48:00','2019-03-02 18:48:00','b23d2a11-d602-4432-9a91-7fbed07199a1'),
	(26,21,5,1,1,1,'','{\"typeId\":\"6\",\"authorId\":\"1\",\"title\":\"Air Control\",\"slug\":\"air-control\",\"postDate\":1551552480,\"expiryDate\":null,\"enabled\":true,\"newParentId\":null,\"fields\":{\"22\":[\"20\"]}}','2019-03-02 18:48:16','2019-03-02 18:48:16','cf269801-dc12-4f46-9e9f-f0855a56aa6c'),
	(27,3,1,1,1,15,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"home\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":{\"14\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[],\"headline\":\"We provide a unique service to our clients.\"}},\"6\":{\"type\":\"textWrapBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text wrap block\",\"subtitle\":\"This is a small subtitle\",\"pageLink\":\"/about-us\",\"contactLink\":\"/contact-us\",\"contentText\":\"This is an introduction to the next page.\"}},\"4\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}},\"7\":{\"type\":\"featuredTestimonials\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"8\",\"9\"]}},\"22\":{\"type\":\"featuredBrands\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"19\",\"21\",\"17\"]}}},\"1\":\"home.twig\"}}','2019-03-02 18:53:44','2019-03-02 18:53:44','e1d6620f-07b0-480a-96d5-7aa09f777bc3'),
	(28,3,1,1,1,16,'','{\"typeId\":\"2\",\"authorId\":\"1\",\"title\":\"Homepage\",\"slug\":\"__home__\",\"postDate\":1551384060,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":{\"14\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[],\"headline\":\"We provide a unique service to our clients.\"}},\"6\":{\"type\":\"textWrapBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":\"This is a text wrap block\",\"subtitle\":\"This is a small subtitle\",\"pageLink\":\"/about-us\",\"contactLink\":\"/contact-us\",\"contentText\":\"This is an introduction to the next page.\"}},\"4\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}},\"7\":{\"type\":\"featuredTestimonials\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"8\",\"9\"]}},\"22\":{\"type\":\"featuredBrands\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"19\",\"21\",\"17\"]}}},\"1\":\"home.twig\"}}','2019-03-03 09:11:10','2019-03-03 09:11:10','db9da245-71bc-415d-8ae5-a388beefbc84'),
	(29,11,4,1,1,2,'','{\"typeId\":\"5\",\"authorId\":\"1\",\"title\":\"About Us\",\"slug\":\"about-us\",\"postDate\":1551551100,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":[],\"1\":\"home.twig\"}}','2019-03-03 10:36:07','2019-03-03 10:36:07','670647a6-1dbf-40e9-9949-e25b6c5c9e11'),
	(30,11,4,1,1,3,'','{\"typeId\":\"5\",\"authorId\":\"1\",\"title\":\"About Us\",\"slug\":\"about-us\",\"postDate\":1551551100,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"2\":{\"30\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[],\"headline\":\"Everything we do is for a purpose\"}}},\"1\":\"home.twig\"}}','2019-03-03 10:46:07','2019-03-03 10:46:07','c79bb317-9f04-4d71-897e-008546293309'),
	(31,11,4,1,1,4,'','{\"typeId\":\"5\",\"authorId\":\"1\",\"title\":\"About Us\",\"slug\":\"about-us\",\"postDate\":1551551100,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"38\":{\"31\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[],\"headline\":\"Explore what we have to offer\"}},\"32\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}}},\"12\":\"A sample of some services we deliver on behalf of our partners\",\"1\":\"home.twig\"}}','2019-03-03 10:48:12','2019-03-03 10:48:12','cdedd265-72c2-49e8-a525-041f400a1558'),
	(32,11,4,1,1,5,'','{\"typeId\":\"5\",\"authorId\":\"1\",\"title\":\"About Us\",\"slug\":\"about-us\",\"postDate\":1551551100,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"38\":{\"31\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[],\"headline\":\"Explore what we have to offer\"}},\"33\":{\"type\":\"textBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":null,\"subtitle\":null,\"contentText\":null,\"image\":[]}},\"32\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}}},\"12\":\"A sample of some services we deliver on behalf of our partners\",\"1\":\"home.twig\"}}','2019-03-03 10:50:00','2019-03-03 10:50:00','bd7285cf-c6f9-4cfe-9177-2bae3accfd45'),
	(33,11,4,1,1,6,'','{\"typeId\":\"5\",\"authorId\":\"1\",\"title\":\"About Us\",\"slug\":\"about-us\",\"postDate\":1551551100,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"38\":{\"31\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[],\"headline\":\"Explore what we have to offer\"}},\"33\":{\"type\":\"textBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":null,\"summary\":null,\"subtitle\":null,\"contentText\":null,\"image\":[]}},\"32\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}}},\"1\":\"basic.twig\"}}','2019-03-03 10:50:57','2019-03-03 10:50:57','130c90f8-654c-4856-95db-f67c84d2df9b'),
	(34,11,4,1,1,7,'','{\"typeId\":\"5\",\"authorId\":\"1\",\"title\":\"About Us\",\"slug\":\"about-us\",\"postDate\":1551551100,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"38\":{\"31\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[],\"headline\":\"Explore what we have to offer\"}},\"33\":{\"type\":\"textBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"headline\":null,\"summary\":\"A summary about this page, showing your Clients what this section is about.\",\"subtitle\":\"A small subtitle about each section\",\"contentText\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"image\":[]}},\"32\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}}},\"1\":\"basic.twig\"}}','2019-03-03 10:54:02','2019-03-03 10:54:02','6600cd57-68f7-480c-9c0d-00908898f396'),
	(35,34,4,1,1,1,'Revision from 3 Mar 2019, 02:56:19','{\"typeId\":\"5\",\"authorId\":\"1\",\"title\":\"About Us copy\",\"slug\":\"about-us-1\",\"postDate\":1551551100,\"expiryDate\":null,\"enabled\":\"1\",\"newParentId\":null,\"fields\":{\"38\":{\"35\":{\"type\":\"heroBlock\",\"enabled\":\"1\",\"collapsed\":false,\"fields\":{\"image\":[],\"headline\":\"Explore what we have to offer\"}},\"36\":{\"type\":\"textBlock\",\"enabled\":\"1\",\"collapsed\":false,\"fields\":{\"summary\":\"A summary about this page, showing your Clients what this section is about.\",\"subtitle\":\"A small subtitle about each section\",\"contentText\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"image\":[]}},\"37\":{\"type\":\"featuredCasestudies\",\"enabled\":\"1\",\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}}},\"1\":\"basic.twig\"}}','2019-03-03 10:56:40','2019-03-03 10:56:40','5c95cedd-7ef1-4f7f-bc60-7fafe192f732'),
	(36,34,4,1,1,2,'','{\"typeId\":\"5\",\"authorId\":\"1\",\"title\":\"Contact Us\",\"slug\":\"about-us-1\",\"postDate\":1551551100,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"38\":{\"35\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[],\"headline\":\"Get In Touch\"}},\"36\":{\"type\":\"textBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"summary\":\"A summary about this page, showing your Clients what this section is about.\",\"subtitle\":\"A small subtitle about each section\",\"contentText\":\"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\",\"image\":[]}},\"37\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}}},\"1\":\"basic.twig\"}}','2019-03-03 10:56:41','2019-03-03 10:56:41','7d0f9c21-f3c3-45b7-bf22-c3b6b0ef882c'),
	(37,34,4,1,1,3,'','{\"typeId\":\"5\",\"authorId\":\"1\",\"title\":\"Contact Us\",\"slug\":\"contact-us\",\"postDate\":1551551100,\"expiryDate\":null,\"enabled\":true,\"newParentId\":\"\",\"fields\":{\"38\":{\"35\":{\"type\":\"heroBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"image\":[],\"headline\":\"Get In Touch\"}},\"36\":{\"type\":\"textBlock\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"summary\":\"A summary about this page, showing your Clients what this section is about.\",\"subtitle\":\"A small subtitle about each section\",\"contentText\":\"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\",\"image\":[]}},\"37\":{\"type\":\"featuredCasestudies\",\"enabled\":true,\"collapsed\":false,\"fields\":{\"selectedItems\":[\"10\",\"13\"]}}},\"1\":\"basic.twig\"}}','2019-03-03 10:57:02','2019-03-03 10:57:02','996203ba-d627-4e50-917a-7bc1e31c1904');

/*!40000 ALTER TABLE `entryversions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fieldgroups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fieldgroups`;

CREATE TABLE `fieldgroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `fieldgroups_name_unq_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `fieldgroups` WRITE;
/*!40000 ALTER TABLE `fieldgroups` DISABLE KEYS */;

INSERT INTO `fieldgroups` (`id`, `name`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,'Common','2019-02-17 09:47:27','2019-02-17 09:47:27','5feb4ed7-1fcd-4451-90e6-3ce4ae865a32'),
	(3,'Testimonials','2019-03-02 18:03:58','2019-03-02 18:03:58','abd43e00-5692-4fa8-acc2-c8f36e5e042b'),
	(5,'Global','2019-03-03 09:12:57','2019-03-03 09:12:57','a5851e7d-bf76-472c-b9fa-9f0b4969eb05');

/*!40000 ALTER TABLE `fieldgroups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fieldlayoutfields
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fieldlayoutfields`;

CREATE TABLE `fieldlayoutfields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `layoutId` int(11) NOT NULL,
  `tabId` int(11) NOT NULL,
  `fieldId` int(11) NOT NULL,
  `required` tinyint(1) NOT NULL DEFAULT '0',
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `fieldlayoutfields_layoutId_fieldId_unq_idx` (`layoutId`,`fieldId`),
  KEY `fieldlayoutfields_sortOrder_idx` (`sortOrder`),
  KEY `fieldlayoutfields_tabId_idx` (`tabId`),
  KEY `fieldlayoutfields_fieldId_idx` (`fieldId`),
  CONSTRAINT `fieldlayoutfields_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fieldlayoutfields_layoutId_fk` FOREIGN KEY (`layoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fieldlayoutfields_tabId_fk` FOREIGN KEY (`tabId`) REFERENCES `fieldlayouttabs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `fieldlayoutfields` WRITE;
/*!40000 ALTER TABLE `fieldlayoutfields` DISABLE KEYS */;

INSERT INTO `fieldlayoutfields` (`id`, `layoutId`, `tabId`, `fieldId`, `required`, `sortOrder`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(3,2,3,1,0,1,'2019-03-02 14:06:30','2019-03-02 14:06:30','cc3f338a-7925-45c0-951a-2664c1f299ec'),
	(59,8,30,19,0,2,'2019-03-02 18:11:20','2019-03-02 18:11:20','57627776-4874-44fe-90b3-201f412feb08'),
	(60,8,30,18,0,1,'2019-03-02 18:11:20','2019-03-02 18:11:20','14194bf5-f271-4dea-9c08-4e02928db548'),
	(61,8,30,20,0,3,'2019-03-02 18:11:20','2019-03-02 18:11:20','fa772d19-2644-46bc-bc92-80c3f1cdb2dc'),
	(71,9,36,13,0,1,'2019-03-02 18:22:54','2019-03-02 18:22:54','2fde1bff-baf8-4590-b937-3095e0fbd90e'),
	(72,9,36,21,0,2,'2019-03-02 18:22:54','2019-03-02 18:22:54','078384d0-3c8f-42a9-8f7f-800d1a1c40ca'),
	(140,11,71,22,0,1,'2019-03-02 19:08:53','2019-03-02 19:08:53','900b08a7-5f08-4a92-a5d9-0f2588b4b71c'),
	(141,1,72,2,0,1,'2019-03-03 09:10:59','2019-03-03 09:10:59','8b83abe1-8313-40f1-99a3-dee7a2b3fbc9'),
	(142,1,73,1,0,1,'2019-03-03 09:10:59','2019-03-03 09:10:59','c462e43b-2b1f-4584-8291-e862517427e9'),
	(143,12,74,27,0,1,'2019-03-03 09:27:31','2019-03-03 09:27:31','fed56f8b-473a-4002-83aa-2526a3fff65e'),
	(144,12,74,28,0,2,'2019-03-03 09:27:31','2019-03-03 09:27:31','3c36f10b-a3ad-451e-bcf3-d6b2c248bdee'),
	(145,12,74,29,0,3,'2019-03-03 09:27:31','2019-03-03 09:27:31','bd1615ac-5430-4a7e-ae85-914be31fe929'),
	(162,13,82,32,0,3,'2019-03-03 09:53:02','2019-03-03 09:53:02','ae73aeb5-5a54-4304-a35c-317668069302'),
	(163,13,82,33,0,1,'2019-03-03 09:53:02','2019-03-03 09:53:02','0ba616c5-901d-46f2-864f-375d3a5590ed'),
	(164,13,82,34,0,2,'2019-03-03 09:53:02','2019-03-03 09:53:02','7e3b6b51-ae4e-4783-98bc-8bcdc66c7b29'),
	(165,14,83,20,0,1,'2019-03-03 09:58:07','2019-03-03 09:58:07','affc40ca-1390-4294-afb8-31a1ebf4e515'),
	(166,14,83,35,0,2,'2019-03-03 09:58:07','2019-03-03 09:58:07','c6f99479-8b0b-4bce-b13c-1daadba59356'),
	(167,14,84,30,0,1,'2019-03-03 09:58:07','2019-03-03 09:58:07','99898d75-8cfe-4ce5-9dba-e2e864e31ecd'),
	(168,14,85,31,0,1,'2019-03-03 09:58:07','2019-03-03 09:58:07','864f9343-8ef8-4cff-b592-41a524a814da'),
	(169,14,85,37,0,2,'2019-03-03 09:58:07','2019-03-03 09:58:07','b1cdc563-c5fc-40fc-9f19-fe36b48f0058'),
	(170,14,86,18,0,1,'2019-03-03 09:58:07','2019-03-03 09:58:07','5f8b4b27-99df-4568-9dc8-324d2aae6b39'),
	(171,15,87,36,0,2,'2019-03-03 10:00:15','2019-03-03 10:00:15','1a22ccee-b30a-4155-914b-12fbcb3846e5'),
	(172,15,87,25,0,3,'2019-03-03 10:00:15','2019-03-03 10:00:15','8c08dd9d-47f2-48d3-8025-2b2752d06bba'),
	(173,15,87,26,0,1,'2019-03-03 10:00:15','2019-03-03 10:00:15','8c719bae-838f-42da-aecc-477bd5f3d1e0'),
	(204,10,102,23,0,1,'2019-03-03 10:45:27','2019-03-03 10:45:27','13bd0640-74ca-469d-8b35-42f5ed2ff896'),
	(205,10,102,24,0,2,'2019-03-03 10:45:27','2019-03-03 10:45:27','9d71faac-0d5d-438a-a66d-781272a6d45e'),
	(206,5,103,14,0,2,'2019-03-03 10:45:27','2019-03-03 10:45:27','b2a334d5-a0a8-412d-8fe9-3e2970494203'),
	(207,5,103,6,0,1,'2019-03-03 10:45:27','2019-03-03 10:45:27','8dd7bcd1-c007-4deb-a091-c4c38a11e67d'),
	(208,5,103,15,0,3,'2019-03-03 10:45:27','2019-03-03 10:45:27','4052f325-d5ce-41ff-aa11-da512e3e178f'),
	(209,5,103,16,0,5,'2019-03-03 10:45:27','2019-03-03 10:45:27','a665e10f-d06d-416e-8dd2-2cac56db9bcf'),
	(210,5,103,17,0,4,'2019-03-03 10:45:27','2019-03-03 10:45:27','2d23518a-77dc-425c-8571-c79dd1b76949'),
	(211,3,104,4,0,1,'2019-03-03 10:45:27','2019-03-03 10:45:27','6293fa33-c5a9-4a38-9d8e-1f493be97fe0'),
	(212,6,105,8,0,1,'2019-03-03 10:45:27','2019-03-03 10:45:27','bd77c353-20cf-4230-9dff-6ae5606bee9c'),
	(213,7,106,9,0,1,'2019-03-03 10:45:28','2019-03-03 10:45:28','d4187f24-b1f4-4e67-9d6f-6c7a1069e6a3'),
	(226,16,113,38,0,1,'2019-03-03 10:50:42','2019-03-03 10:50:42','f3a48f8c-63b4-41a3-8f59-2c02d5757a3f'),
	(227,16,114,1,0,1,'2019-03-03 10:50:42','2019-03-03 10:50:42','c1a73954-3f44-4e29-82a3-2a4d47186fc5'),
	(236,17,119,39,0,1,'2019-03-03 10:55:41','2019-03-03 10:55:41','7f941cac-ac0c-486b-9a1d-5923c793a6ff'),
	(237,17,119,40,0,2,'2019-03-03 10:55:41','2019-03-03 10:55:41','f295816b-5dda-4138-a73e-875d13ef7683'),
	(238,18,120,41,0,4,'2019-03-03 10:55:42','2019-03-03 10:55:42','38da8b34-b95c-4be8-8eab-142d617f7dbd'),
	(239,18,120,47,0,1,'2019-03-03 10:55:42','2019-03-03 10:55:42','4a9b2c56-dd96-48db-be07-c8f406edffa8'),
	(240,18,120,42,0,2,'2019-03-03 10:55:42','2019-03-03 10:55:42','7c4b76d3-760d-4f76-8229-0877cf01f060'),
	(241,18,120,43,0,3,'2019-03-03 10:55:42','2019-03-03 10:55:42','93e805be-7810-402d-abe2-8b5364751e52'),
	(242,19,121,45,0,1,'2019-03-03 10:55:42','2019-03-03 10:55:42','f6f92a15-d747-4eb1-a3aa-4243aaafaf55'),
	(243,20,122,46,0,1,'2019-03-03 10:55:42','2019-03-03 10:55:42','68d88652-edf3-43df-90d5-5a796fe379ec');

/*!40000 ALTER TABLE `fieldlayoutfields` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fieldlayouts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fieldlayouts`;

CREATE TABLE `fieldlayouts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `dateDeleted` datetime DEFAULT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fieldlayouts_dateDeleted_idx` (`dateDeleted`),
  KEY `fieldlayouts_type_idx` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `fieldlayouts` WRITE;
/*!40000 ALTER TABLE `fieldlayouts` DISABLE KEYS */;

INSERT INTO `fieldlayouts` (`id`, `type`, `dateCreated`, `dateUpdated`, `dateDeleted`, `uid`)
VALUES
	(1,'craft\\elements\\Entry','2019-02-28 20:00:37','2019-03-03 09:10:59',NULL,'9aa38611-b29d-4ce8-8bc7-f12a8ae551bd'),
	(2,'craft\\elements\\Entry','2019-03-02 14:06:30','2019-03-02 14:06:30',NULL,'71802762-c7bc-4edc-ae6e-b4fd2cb07299'),
	(3,'craft\\elements\\MatrixBlock','2019-03-02 17:21:46','2019-03-03 10:45:27',NULL,'3d5ab90c-4aa1-443e-955b-ee77fd19650d'),
	(4,'craft\\elements\\MatrixBlock','2019-03-02 17:26:45','2019-03-02 17:56:16','2019-03-02 18:02:08','29e0976c-1164-4c8e-a22f-51fc362c4036'),
	(5,'craft\\elements\\MatrixBlock','2019-03-02 17:26:45','2019-03-03 10:45:27',NULL,'1756e051-9c13-4961-b802-d3961b19d20c'),
	(6,'craft\\elements\\MatrixBlock','2019-03-02 17:26:46','2019-03-03 10:45:27',NULL,'5f1b4392-2538-4224-828f-d4c958a18b82'),
	(7,'craft\\elements\\MatrixBlock','2019-03-02 17:26:46','2019-03-03 10:45:28',NULL,'4475550a-090e-4a1a-aa90-4fbd3494d971'),
	(8,'craft\\elements\\Entry','2019-03-02 18:11:20','2019-03-02 18:11:20',NULL,'85148a96-b6b2-46ee-bf33-eb4d69df7477'),
	(9,'craft\\elements\\Entry','2019-03-02 18:22:07','2019-03-02 18:22:54',NULL,'433f0d8e-6556-4aa7-928b-a43a3a7ada1d'),
	(10,'craft\\elements\\MatrixBlock','2019-03-02 18:37:42','2019-03-03 10:45:27',NULL,'e6709e52-502c-4a88-8605-5c9f59f603c5'),
	(11,'craft\\elements\\Entry','2019-03-02 18:45:38','2019-03-02 19:08:53',NULL,'b3e0624a-3b3a-4881-b12d-ae0cff8e49e9'),
	(12,'verbb\\supertable\\elements\\SuperTableBlockElement','2019-03-03 09:27:31','2019-03-03 09:27:31',NULL,'9174fabd-6906-44c2-a20e-e3b7f5607bf5'),
	(13,'verbb\\supertable\\elements\\SuperTableBlockElement','2019-03-03 09:34:33','2019-03-03 09:53:02',NULL,'49d1c705-304a-4a7b-af3c-2c3133a91960'),
	(14,'craft\\elements\\GlobalSet','2019-03-03 09:45:22','2019-03-03 09:58:07',NULL,'8ab0a559-b05b-4a5d-b7d0-7fa288271a96'),
	(15,'craft\\elements\\GlobalSet','2019-03-03 09:47:56','2019-03-03 10:00:15',NULL,'6da5d7e5-60bb-4fd3-a152-daa3a3377a78'),
	(16,'craft\\elements\\Entry','2019-03-03 10:23:20','2019-03-03 10:50:42',NULL,'9af5824a-f988-45be-8378-1571ea82ad6c'),
	(17,'craft\\elements\\MatrixBlock','2019-03-03 10:42:42','2019-03-03 10:55:41',NULL,'069ddcd1-0369-407d-972a-fa015be5da2e'),
	(18,'craft\\elements\\MatrixBlock','2019-03-03 10:42:43','2019-03-03 10:55:42',NULL,'2b8648c5-073c-4b49-9cb6-5bdce7ef9f89'),
	(19,'craft\\elements\\MatrixBlock','2019-03-03 10:44:09','2019-03-03 10:55:42',NULL,'83f3ea36-2a37-46d2-9d12-d8cabb3682d2'),
	(20,'craft\\elements\\MatrixBlock','2019-03-03 10:45:18','2019-03-03 10:55:42',NULL,'78be34f5-e150-479f-8047-8affe0cf8535');

/*!40000 ALTER TABLE `fieldlayouts` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fieldlayouttabs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fieldlayouttabs`;

CREATE TABLE `fieldlayouttabs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `layoutId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fieldlayouttabs_sortOrder_idx` (`sortOrder`),
  KEY `fieldlayouttabs_layoutId_idx` (`layoutId`),
  CONSTRAINT `fieldlayouttabs_layoutId_fk` FOREIGN KEY (`layoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `fieldlayouttabs` WRITE;
/*!40000 ALTER TABLE `fieldlayouttabs` DISABLE KEYS */;

INSERT INTO `fieldlayouttabs` (`id`, `layoutId`, `name`, `sortOrder`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(3,2,'Structure',1,'2019-03-02 14:06:30','2019-03-02 14:06:30','e6b0d740-6ed7-4340-85ef-325f180379d6'),
	(19,4,'Content',1,'2019-03-02 17:56:16','2019-03-02 17:56:16','ec2dfbb5-7c62-42a8-acae-747bc5cb2bf3'),
	(30,8,'Content',1,'2019-03-02 18:11:20','2019-03-02 18:11:20','814bce93-2987-4fda-8656-d41613f07f84'),
	(36,9,'Content',1,'2019-03-02 18:22:54','2019-03-02 18:22:54','a268611d-02c8-4956-87a3-e337442dc875'),
	(71,11,'Content',1,'2019-03-02 19:08:53','2019-03-02 19:08:53','155e21f1-40cf-408c-a43a-acb5c8bd1152'),
	(72,1,'Content',1,'2019-03-03 09:10:59','2019-03-03 09:10:59','fca9e52b-6ce4-478d-a93e-39f33e22904a'),
	(73,1,'Structure',2,'2019-03-03 09:10:59','2019-03-03 09:10:59','4c69beb9-729c-427c-9e71-e917709a7067'),
	(74,12,'Content',1,'2019-03-03 09:27:31','2019-03-03 09:27:31','bd53ec15-43c0-44d4-8376-b175ba61293a'),
	(82,13,'Content',1,'2019-03-03 09:53:02','2019-03-03 09:53:02','182aeb17-26db-4c51-af48-dbe6b010778b'),
	(83,14,'Brand',1,'2019-03-03 09:58:07','2019-03-03 09:58:07','cb6012cb-5739-4b5c-b3b0-78527b20a768'),
	(84,14,'Contact',2,'2019-03-03 09:58:07','2019-03-03 09:58:07','ae7f0fb9-10eb-4ad0-89e8-32a5a7f3164c'),
	(85,14,'Client Help Desk',3,'2019-03-03 09:58:07','2019-03-03 09:58:07','89eedaf8-2213-4a1c-9218-6116da48b1dc'),
	(86,14,'Social',4,'2019-03-03 09:58:07','2019-03-03 09:58:07','1698b1f9-6a90-4dd9-9aca-d6bd4889497f'),
	(87,15,'Global',1,'2019-03-03 10:00:15','2019-03-03 10:00:15','2f67b8fb-34fb-4b71-8c7c-4fc17348d10c'),
	(102,10,'Content',1,'2019-03-03 10:45:27','2019-03-03 10:45:27','5dbbbf89-184f-49e9-b3dd-494fc8f00900'),
	(103,5,'Content',1,'2019-03-03 10:45:27','2019-03-03 10:45:27','2c404ef2-de63-4453-ac20-5f28e3d585cb'),
	(104,3,'Content',1,'2019-03-03 10:45:27','2019-03-03 10:45:27','8c866a52-503b-4557-a276-5064fe42fd41'),
	(105,6,'Content',1,'2019-03-03 10:45:27','2019-03-03 10:45:27','05ddceea-dc43-4038-9b36-1eb8d74f0c55'),
	(106,7,'Content',1,'2019-03-03 10:45:28','2019-03-03 10:45:28','4415dbdd-88bb-4d71-971b-1fc807995fbd'),
	(113,16,'Content',1,'2019-03-03 10:50:42','2019-03-03 10:50:42','138e72bf-c1a5-4b01-8a28-8f4794765380'),
	(114,16,'Structure',2,'2019-03-03 10:50:42','2019-03-03 10:50:42','f9a81d02-337e-4c59-8b4c-99f4256cc8aa'),
	(119,17,'Content',1,'2019-03-03 10:55:41','2019-03-03 10:55:41','a979de87-c57e-4248-982f-f25ee9c83f62'),
	(120,18,'Content',1,'2019-03-03 10:55:42','2019-03-03 10:55:42','f3d3ce53-e6d3-42d8-95e8-12e9836d5b95'),
	(121,19,'Content',1,'2019-03-03 10:55:42','2019-03-03 10:55:42','57054e32-9f42-49ca-bd74-ef89cf4df165'),
	(122,20,'Content',1,'2019-03-03 10:55:42','2019-03-03 10:55:42','2acf7468-50de-4ddb-9e42-6ec32aedb87e');

/*!40000 ALTER TABLE `fieldlayouttabs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fields
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fields`;

CREATE TABLE `fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(64) NOT NULL,
  `context` varchar(255) NOT NULL DEFAULT 'global',
  `instructions` text,
  `searchable` tinyint(1) NOT NULL DEFAULT '1',
  `translationMethod` varchar(255) NOT NULL DEFAULT 'none',
  `translationKeyFormat` text,
  `type` varchar(255) NOT NULL,
  `settings` text,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `fields_handle_context_unq_idx` (`handle`,`context`),
  KEY `fields_groupId_idx` (`groupId`),
  KEY `fields_context_idx` (`context`),
  CONSTRAINT `fields_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `fieldgroups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `fields` WRITE;
/*!40000 ALTER TABLE `fields` DISABLE KEYS */;

INSERT INTO `fields` (`id`, `groupId`, `name`, `handle`, `context`, `instructions`, `searchable`, `translationMethod`, `translationKeyFormat`, `type`, `settings`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,1,'Template','template','global','',1,'none',NULL,'superbig\\templateselect\\fields\\TemplateSelectField','{\"limitToSubfolder\":\"page/\"}','2019-02-28 19:59:34','2019-03-02 14:05:01','e4088b9f-d864-430b-9def-bc3718863cc0'),
	(2,1,'Home Content','homeContent','global','',1,'site',NULL,'craft\\fields\\Matrix','{\"contentTable\":\"{{%matrixcontent_homecontent}}\",\"localizeBlocks\":false,\"maxBlocks\":\"\",\"minBlocks\":\"\"}','2019-03-02 17:21:46','2019-03-03 10:45:27','881dd3b0-ca2d-498e-8aec-60fcb76628b2'),
	(4,NULL,'Casestudies','selectedItems','matrixBlockType:0a8ef5e5-fca6-4510-bc32-b0f1f3e24e9c','',1,'site',NULL,'craft\\fields\\Entries','{\"limit\":\"\",\"localizeRelations\":false,\"selectionLabel\":\"Add a casestudy\",\"source\":null,\"sources\":[\"section:2d769319-61c4-4dde-a74f-996a0008d812\"],\"targetSiteId\":null,\"viewMode\":null}','2019-03-02 17:21:46','2019-03-03 10:45:27','f720c82e-3a08-4446-bfe6-690af89f1d82'),
	(6,NULL,'Headline','headline','matrixBlockType:84c22202-5652-4791-84c4-5b639ae5c422','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-02 17:26:45','2019-03-03 10:45:27','78ddb5b3-6e8a-4c6d-aca0-f3bd4014624b'),
	(8,NULL,'Testimonials','selectedItems','matrixBlockType:d226ab88-7343-45bc-a20c-9716fd9ae493','',1,'site',NULL,'craft\\fields\\Entries','{\"limit\":\"\",\"localizeRelations\":false,\"selectionLabel\":\"\",\"source\":null,\"sources\":[\"section:2d85ffb0-7eb6-4cea-aaa3-3484e30def07\"],\"targetSiteId\":null,\"viewMode\":null}','2019-03-02 17:26:46','2019-03-03 10:45:27','c595dbd9-5fd7-4d6f-b01c-2681e15289e3'),
	(9,NULL,'Brand Logos','selectedItems','matrixBlockType:18bb0061-3ab4-4171-9864-0b304f037871','',1,'site',NULL,'craft\\fields\\Entries','{\"limit\":\"\",\"localizeRelations\":false,\"selectionLabel\":\"Add a brand\",\"source\":null,\"sources\":[\"section:5c2849ef-3edb-4df8-9c06-a16fa76e340a\"],\"targetSiteId\":null,\"viewMode\":null}','2019-03-02 17:26:46','2019-03-03 10:45:27','4b3754d8-c424-450e-a98c-5b0e5f00587a'),
	(11,1,'Subtitle','subtitle','global','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"400\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-02 17:41:26','2019-03-02 17:41:26','40cf068b-a0f9-4b8e-8466-7f27e8f58e6c'),
	(12,1,'Summary','summary','global','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-02 17:41:42','2019-03-02 17:41:42','dea2b00f-5402-47df-ad99-9b9a9f58b8c4'),
	(13,1,'Content Text','contentText','global','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-02 17:44:55','2019-03-02 17:44:55','08bfc011-6ae3-4f5b-a9fb-e31cfee875d4'),
	(14,NULL,'Subtitle','subtitle','matrixBlockType:84c22202-5652-4791-84c4-5b639ae5c422','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-02 17:51:19','2019-03-03 10:45:27','01806408-a194-40e2-8abf-8b69f7f1353f'),
	(15,NULL,'Page Link','pageLink','matrixBlockType:84c22202-5652-4791-84c4-5b639ae5c422','Link this button to the page the user should read more about.',1,'none',NULL,'craft\\fields\\Url','{\"placeholder\":\"\"}','2019-03-02 17:51:19','2019-03-03 10:45:27','9c6dc458-cd9d-4428-a66d-d122301da2f2'),
	(16,NULL,'Content Text','contentText','matrixBlockType:84c22202-5652-4791-84c4-5b639ae5c422','Write an introduction to the page the user should read more about.',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-02 17:51:19','2019-03-03 10:45:27','cc4af750-a38f-4055-a11c-82a62f65a042'),
	(17,NULL,'Contact Link','contactLink','matrixBlockType:84c22202-5652-4791-84c4-5b639ae5c422','Link this button to your contact page.',1,'none',NULL,'craft\\fields\\Url','{\"placeholder\":\"\"}','2019-03-02 17:51:19','2019-03-03 10:45:27','db691194-ceba-443b-986a-dab0b448997f'),
	(18,3,'Quote','quote','global','Add your testimonial quote here!',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-02 18:03:51','2019-03-02 18:04:10','940e1eca-459f-42e8-b388-6e36ea57b2cf'),
	(19,3,'Job Title','jobTitle','global','Job title of the testimonial provider.',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-02 18:05:19','2019-03-02 18:05:19','17a9818a-d11c-424c-b0cb-ea7e591db689'),
	(20,5,'Company Name','companyName','global','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-02 18:05:34','2019-03-03 09:35:06','ccad9bfd-f0ed-41d3-b873-3c0371ea2f80'),
	(21,1,'Page Link','pageLink','global','',1,'site',NULL,'craft\\fields\\Entries','{\"limit\":\"\",\"localizeRelations\":false,\"selectionLabel\":\"\",\"source\":null,\"sources\":[\"section:0ef4f88f-2651-4511-bc2c-6072f32a76ba\",\"section:be2f020f-b422-4dde-a154-839feb00ecaa\"],\"targetSiteId\":null,\"viewMode\":null}','2019-03-02 18:22:36','2019-03-02 18:25:47','c2e2b5ff-233d-4198-96cd-65e924aa2089'),
	(22,1,'Image','image','global','',1,'site',NULL,'craft\\fields\\Assets','{\"allowedKinds\":[\"image\"],\"defaultUploadLocationSource\":\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\",\"defaultUploadLocationSubpath\":\"\",\"limit\":\"1\",\"localizeRelations\":false,\"restrictFiles\":\"\",\"selectionLabel\":\"Add an image\",\"singleUploadLocationSource\":\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\",\"singleUploadLocationSubpath\":\"\",\"source\":null,\"sources\":\"*\",\"targetSiteId\":null,\"useSingleFolder\":\"\",\"viewMode\":\"list\"}','2019-03-02 18:34:48','2019-03-02 18:42:36','6a19f127-db9f-4441-b4a0-867b7a303cd0'),
	(23,NULL,'Hero Image','image','matrixBlockType:166d5679-09a8-4124-8f1d-0deba4a3a50e','',1,'site',NULL,'craft\\fields\\Assets','{\"allowedKinds\":null,\"defaultUploadLocationSource\":\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\",\"defaultUploadLocationSubpath\":\"\",\"limit\":\"1\",\"localizeRelations\":false,\"restrictFiles\":\"\",\"selectionLabel\":\"Add an image\",\"singleUploadLocationSource\":\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\",\"singleUploadLocationSubpath\":\"\",\"source\":null,\"sources\":\"*\",\"targetSiteId\":null,\"useSingleFolder\":\"\",\"viewMode\":\"list\"}','2019-03-02 18:37:42','2019-03-03 10:45:27','a0c870ef-2a9e-47a3-82db-fee9dc134169'),
	(24,NULL,'Headline','headline','matrixBlockType:166d5679-09a8-4124-8f1d-0deba4a3a50e','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-02 18:37:42','2019-03-03 10:45:27','b190e633-61ec-4dcd-ba10-467ca8dbf7ce'),
	(25,5,'Footer Navigation','footerNav','global','',1,'site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"columns\":{\"32\":{\"width\":\"\"},\"33\":{\"width\":\"\"},\"34\":{\"width\":\"\"}},\"contentTable\":\"{{%stc_footernav}}\",\"fieldLayout\":\"row\",\"localizeBlocks\":false,\"maxRows\":\"\",\"minRows\":\"\",\"selectionLabel\":\"Add link\",\"staticField\":\"\"}','2019-03-03 09:14:06','2019-03-03 09:53:02','25432085-76b6-4133-89db-0c3915a522ce'),
	(26,5,'Top Navigation','topNavigation','global','',1,'site',NULL,'verbb\\supertable\\fields\\SuperTableField','{\"contentTable\":\"{{%stc_topnavigation}}\",\"fieldLayout\":\"row\",\"localizeBlocks\":false,\"maxRows\":\"\",\"minRows\":\"\",\"selectionLabel\":\"Add a nav item\",\"staticField\":\"\"}','2019-03-03 09:16:54','2019-03-03 09:27:30','6a5bc60a-97e3-45d0-b810-ff4d7238ed23'),
	(27,NULL,'Headline','headline','superTableBlockType:1accb184-1bfa-491d-a147-6f917d90b415','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-03 09:27:30','2019-03-03 09:27:30','2506af07-79d3-4a3a-be1a-432651c16baa'),
	(28,NULL,'Internal Link','internalLink','superTableBlockType:1accb184-1bfa-491d-a147-6f917d90b415','',1,'site',NULL,'craft\\fields\\Entries','{\"limit\":\"\",\"localizeRelations\":false,\"selectionLabel\":\"Set an internal link\",\"source\":null,\"sources\":[\"section:0ef4f88f-2651-4511-bc2c-6072f32a76ba\",\"section:be2f020f-b422-4dde-a154-839feb00ecaa\"],\"targetSiteId\":null,\"viewMode\":null}','2019-03-03 09:27:30','2019-03-03 09:27:30','2b92db6d-259e-451a-8761-0ffa76cf3d91'),
	(29,NULL,'External Link','externalLink','superTableBlockType:1accb184-1bfa-491d-a147-6f917d90b415','',1,'none',NULL,'craft\\fields\\Url','{\"placeholder\":\"Set an external link\"}','2019-03-03 09:27:31','2019-03-03 09:27:31','75750a23-4f32-462a-a782-5c8fdd51bdb6'),
	(30,5,'CompanyAddress','companyAddress','global','',1,'none',NULL,'craft\\fields\\Table','{\"addRowLabel\":\"Add a row\",\"columnType\":\"text\",\"columns\":{\"col1\":{\"handle\":\"addressLine\",\"heading\":\"Address Line\",\"type\":\"singleline\",\"width\":\"\"}},\"defaults\":{\"row1\":{\"col1\":\"\"}},\"maxRows\":\"\",\"minRows\":\"\"}','2019-03-03 09:30:04','2019-03-03 10:30:26','55cbd6ca-48c6-4176-979d-1c553f091e6d'),
	(31,5,'Client Help Desk Link','clientHelpDeskLink','global','',1,'none',NULL,'craft\\fields\\Url','{\"placeholder\":\"\"}','2019-03-03 09:32:41','2019-03-03 09:32:41','73f76b1b-d059-49b3-a696-5f4963f1eb81'),
	(32,NULL,'External Link','externalLink','superTableBlockType:09e6a797-a6f6-4bfd-b8cf-3117290f2de6','',1,'none',NULL,'craft\\fields\\Url','{\"placeholder\":\"Set an external link\"}','2019-03-03 09:34:33','2019-03-03 09:53:02','6764bfb1-a83e-458e-ba63-8d72d5ed6bf7'),
	(33,NULL,'Headline','headline','superTableBlockType:09e6a797-a6f6-4bfd-b8cf-3117290f2de6','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-03 09:34:33','2019-03-03 09:53:02','b70fb8c0-b49f-43c5-942d-c6f1c5915f07'),
	(34,NULL,'Internal Link','internalLink','superTableBlockType:09e6a797-a6f6-4bfd-b8cf-3117290f2de6','',1,'site',NULL,'craft\\fields\\Entries','{\"limit\":\"1\",\"localizeRelations\":false,\"selectionLabel\":\"\",\"source\":null,\"sources\":[\"section:0ef4f88f-2651-4511-bc2c-6072f32a76ba\",\"section:be2f020f-b422-4dde-a154-839feb00ecaa\"],\"targetSiteId\":null,\"viewMode\":null}','2019-03-03 09:34:33','2019-03-03 09:53:02','f10fda08-fe03-4039-9fb8-10b15f821ab8'),
	(35,5,'Logo','logo','global','',1,'site',NULL,'craft\\fields\\Assets','{\"allowedKinds\":null,\"defaultUploadLocationSource\":\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\",\"defaultUploadLocationSubpath\":\"\",\"limit\":\"1\",\"localizeRelations\":false,\"restrictFiles\":\"\",\"selectionLabel\":\"Set the logo\",\"singleUploadLocationSource\":\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\",\"singleUploadLocationSubpath\":\"\",\"source\":null,\"sources\":\"*\",\"targetSiteId\":null,\"useSingleFolder\":\"\",\"viewMode\":\"list\"}','2019-03-03 09:43:23','2019-03-03 09:43:23','df814817-2cd0-4d07-b4f7-01eb3c7321f0'),
	(36,5,'Footer Content','footerContent','global','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"2\",\"multiline\":\"1\",\"placeholder\":\"\"}','2019-03-03 09:53:49','2019-03-03 09:53:49','00606dd0-29cd-4115-a55e-daf47f6d175f'),
	(37,5,'Client Help Desk Footer Text','chdFooterText','global','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"2\",\"multiline\":\"1\",\"placeholder\":\"\"}','2019-03-03 09:55:43','2019-03-03 09:59:09','d77e7e1f-40a2-4254-9050-8449a7b4af1a'),
	(38,1,'Main Content','mainContent','global','',1,'site',NULL,'craft\\fields\\Matrix','{\"contentTable\":\"{{%matrixcontent_maincontent}}\",\"localizeBlocks\":false,\"maxBlocks\":\"\",\"minBlocks\":\"\"}','2019-03-03 10:42:42','2019-03-03 10:55:41','e530f5be-4791-479b-98c3-0336734aac21'),
	(39,NULL,'Image','image','matrixBlockType:e3103750-6fcc-4fc6-9f5e-5050545a5873','',1,'site',NULL,'craft\\fields\\Assets','{\"allowedKinds\":null,\"defaultUploadLocationSource\":\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\",\"defaultUploadLocationSubpath\":\"\",\"limit\":\"1\",\"localizeRelations\":false,\"restrictFiles\":\"\",\"selectionLabel\":\"Add an image\",\"singleUploadLocationSource\":\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\",\"singleUploadLocationSubpath\":\"\",\"source\":null,\"sources\":\"*\",\"targetSiteId\":null,\"useSingleFolder\":\"\",\"viewMode\":\"list\"}','2019-03-03 10:42:42','2019-03-03 10:55:41','05b43103-b492-4410-9e5e-e6bd40c5f9be'),
	(40,NULL,'Headline','headline','matrixBlockType:e3103750-6fcc-4fc6-9f5e-5050545a5873','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-03 10:42:42','2019-03-03 10:55:41','6882e383-a2da-4a6b-896b-80a5c612a400'),
	(41,NULL,'Image','image','matrixBlockType:3991c5c8-8edb-4b28-99fe-e9dc0e265153','',1,'site',NULL,'craft\\fields\\Assets','{\"allowedKinds\":null,\"defaultUploadLocationSource\":\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\",\"defaultUploadLocationSubpath\":\"\",\"limit\":\"2\",\"localizeRelations\":false,\"restrictFiles\":\"\",\"selectionLabel\":\"Add an image\",\"singleUploadLocationSource\":\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\",\"singleUploadLocationSubpath\":\"\",\"source\":null,\"sources\":\"*\",\"targetSiteId\":null,\"useSingleFolder\":\"\",\"viewMode\":\"list\"}','2019-03-03 10:42:42','2019-03-03 10:55:41','232fa74e-4afc-465b-a5c7-104463aec101'),
	(42,NULL,'Subtitle','subtitle','matrixBlockType:3991c5c8-8edb-4b28-99fe-e9dc0e265153','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-03 10:42:43','2019-03-03 10:55:42','95256473-96e8-4413-a048-f30ea488639f'),
	(43,NULL,'Content Text','contentText','matrixBlockType:3991c5c8-8edb-4b28-99fe-e9dc0e265153','',1,'none',NULL,'craft\\redactor\\Field','{\"availableTransforms\":\"*\",\"availableVolumes\":\"*\",\"cleanupHtml\":\"1\",\"columnType\":\"text\",\"purifierConfig\":\"\",\"purifyHtml\":\"1\",\"redactorConfig\":\"\"}','2019-03-03 10:42:43','2019-03-03 10:55:42','ea92910c-3d8b-438e-9c1a-c08ec92320b4'),
	(45,NULL,'Casestudies','selectedItems','matrixBlockType:a154cbb1-ab65-4035-a359-762d3421f294','',1,'site',NULL,'craft\\fields\\Entries','{\"limit\":\"\",\"localizeRelations\":false,\"selectionLabel\":\"Add a casestudy\",\"source\":null,\"sources\":[\"section:2d769319-61c4-4dde-a74f-996a0008d812\"],\"targetSiteId\":null,\"viewMode\":null}','2019-03-03 10:44:09','2019-03-03 10:55:42','669d2e80-bcff-4ae0-90c7-bafc12be9b5d'),
	(46,NULL,'Brand Logos','selectedItems','matrixBlockType:c3d4eaa4-64ef-4a92-809f-27c70098eb58','',1,'site',NULL,'craft\\fields\\Entries','{\"limit\":\"\",\"localizeRelations\":false,\"selectionLabel\":\"Add a brand\",\"source\":null,\"sources\":[\"section:5c2849ef-3edb-4df8-9c06-a16fa76e340a\"],\"targetSiteId\":null,\"viewMode\":null}','2019-03-03 10:45:18','2019-03-03 10:55:42','a5a548af-2da8-4284-9d96-f6328b884032'),
	(47,NULL,'Summary','summary','matrixBlockType:3991c5c8-8edb-4b28-99fe-e9dc0e265153','',1,'none',NULL,'craft\\fields\\PlainText','{\"charLimit\":\"\",\"code\":\"\",\"columnType\":\"text\",\"initialRows\":\"4\",\"multiline\":\"\",\"placeholder\":\"\"}','2019-03-03 10:50:19','2019-03-03 10:55:41','8c42f8d2-9a2b-4078-a120-95d7c26f0f3c');

/*!40000 ALTER TABLE `fields` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table globalsets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `globalsets`;

CREATE TABLE `globalsets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `globalsets_name_unq_idx` (`name`),
  UNIQUE KEY `globalsets_handle_unq_idx` (`handle`),
  KEY `globalsets_fieldLayoutId_idx` (`fieldLayoutId`),
  CONSTRAINT `globalsets_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL,
  CONSTRAINT `globalsets_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `globalsets` WRITE;
/*!40000 ALTER TABLE `globalsets` DISABLE KEYS */;

INSERT INTO `globalsets` (`id`, `name`, `handle`, `fieldLayoutId`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(23,'Company','company',14,'2019-03-03 09:45:22','2019-03-03 09:58:07','c03c237c-6a97-48fb-83c8-ffb769425806'),
	(24,'Site','site',15,'2019-03-03 09:47:56','2019-03-03 10:00:15','a1c51961-4f99-42c1-9dec-5dbceb8a8de4');

/*!40000 ALTER TABLE `globalsets` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `info`;

CREATE TABLE `info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(50) NOT NULL,
  `schemaVersion` varchar(15) NOT NULL,
  `maintenance` tinyint(1) NOT NULL DEFAULT '0',
  `config` mediumtext,
  `configMap` mediumtext,
  `fieldVersion` char(12) NOT NULL DEFAULT '000000000000',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `info` WRITE;
/*!40000 ALTER TABLE `info` DISABLE KEYS */;

INSERT INTO `info` (`id`, `version`, `schemaVersion`, `maintenance`, `config`, `configMap`, `fieldVersion`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,'3.1.14','3.1.25',0,'a:14:{s:12:\"dateModified\";i:1551610541;s:5:\"email\";a:3:{s:9:\"fromEmail\";s:29:\"kirstyannienoble.kn@gmail.com\";s:8:\"fromName\";s:30:\"Integral Facilities Management\";s:13:\"transportType\";s:37:\"craft\\mail\\transportadapters\\Sendmail\";}s:11:\"fieldGroups\";a:3:{s:36:\"5feb4ed7-1fcd-4451-90e6-3ce4ae865a32\";a:1:{s:4:\"name\";s:6:\"Common\";}s:36:\"a5851e7d-bf76-472c-b9fa-9f0b4969eb05\";a:1:{s:4:\"name\";s:6:\"Global\";}s:36:\"abd43e00-5692-4fa8-acc2-c8f36e5e042b\";a:1:{s:4:\"name\";s:12:\"Testimonials\";}}s:6:\"fields\";a:18:{s:36:\"00606dd0-29cd-4115-a55e-daf47f6d175f\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";s:36:\"a5851e7d-bf76-472c-b9fa-9f0b4969eb05\";s:6:\"handle\";s:13:\"footerContent\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:14:\"Footer Content\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"2\";s:9:\"multiline\";s:1:\"1\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"08bfc011-6ae3-4f5b-a9fb-e31cfee875d4\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";s:36:\"5feb4ed7-1fcd-4451-90e6-3ce4ae865a32\";s:6:\"handle\";s:11:\"contentText\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:12:\"Content Text\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"17a9818a-d11c-424c-b0cb-ea7e591db689\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";s:36:\"abd43e00-5692-4fa8-acc2-c8f36e5e042b\";s:6:\"handle\";s:8:\"jobTitle\";s:12:\"instructions\";s:38:\"Job title of the testimonial provider.\";s:4:\"name\";s:9:\"Job Title\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"25432085-76b6-4133-89db-0c3915a522ce\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";s:36:\"a5851e7d-bf76-472c-b9fa-9f0b4969eb05\";s:6:\"handle\";s:9:\"footerNav\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:17:\"Footer Navigation\";s:10:\"searchable\";b:1;s:8:\"settings\";a:8:{s:7:\"columns\";a:3:{i:32;a:1:{s:5:\"width\";s:0:\"\";}i:33;a:1:{s:5:\"width\";s:0:\"\";}i:34;a:1:{s:5:\"width\";s:0:\"\";}}s:12:\"contentTable\";s:18:\"{{%stc_footernav}}\";s:11:\"fieldLayout\";s:3:\"row\";s:14:\"localizeBlocks\";b:0;s:7:\"maxRows\";s:0:\"\";s:7:\"minRows\";s:0:\"\";s:14:\"selectionLabel\";s:8:\"Add link\";s:11:\"staticField\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:39:\"verbb\\supertable\\fields\\SuperTableField\";}s:36:\"40cf068b-a0f9-4b8e-8466-7f27e8f58e6c\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";s:36:\"5feb4ed7-1fcd-4451-90e6-3ce4ae865a32\";s:6:\"handle\";s:8:\"subtitle\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:8:\"Subtitle\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:3:\"400\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"55cbd6ca-48c6-4176-979d-1c553f091e6d\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";s:36:\"a5851e7d-bf76-472c-b9fa-9f0b4969eb05\";s:6:\"handle\";s:14:\"companyAddress\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:14:\"CompanyAddress\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:11:\"addRowLabel\";s:9:\"Add a row\";s:10:\"columnType\";s:4:\"text\";s:7:\"columns\";a:1:{s:4:\"col1\";a:4:{s:6:\"handle\";s:11:\"addressLine\";s:7:\"heading\";s:12:\"Address Line\";s:4:\"type\";s:10:\"singleline\";s:5:\"width\";s:0:\"\";}}s:8:\"defaults\";a:1:{s:4:\"row1\";a:1:{s:4:\"col1\";s:0:\"\";}}s:7:\"maxRows\";s:0:\"\";s:7:\"minRows\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:18:\"craft\\fields\\Table\";}s:36:\"6a19f127-db9f-4441-b4a0-867b7a303cd0\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";s:36:\"5feb4ed7-1fcd-4451-90e6-3ce4ae865a32\";s:6:\"handle\";s:5:\"image\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:5:\"Image\";s:10:\"searchable\";b:1;s:8:\"settings\";a:14:{s:12:\"allowedKinds\";a:1:{i:0;s:5:\"image\";}s:27:\"defaultUploadLocationSource\";s:43:\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\";s:28:\"defaultUploadLocationSubpath\";s:0:\"\";s:5:\"limit\";s:1:\"1\";s:17:\"localizeRelations\";b:0;s:13:\"restrictFiles\";s:0:\"\";s:14:\"selectionLabel\";s:12:\"Add an image\";s:26:\"singleUploadLocationSource\";s:43:\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\";s:27:\"singleUploadLocationSubpath\";s:0:\"\";s:6:\"source\";N;s:7:\"sources\";s:1:\"*\";s:12:\"targetSiteId\";N;s:15:\"useSingleFolder\";s:0:\"\";s:8:\"viewMode\";s:4:\"list\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:19:\"craft\\fields\\Assets\";}s:36:\"6a5bc60a-97e3-45d0-b810-ff4d7238ed23\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";s:36:\"a5851e7d-bf76-472c-b9fa-9f0b4969eb05\";s:6:\"handle\";s:13:\"topNavigation\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:14:\"Top Navigation\";s:10:\"searchable\";b:1;s:8:\"settings\";a:7:{s:12:\"contentTable\";s:22:\"{{%stc_topnavigation}}\";s:11:\"fieldLayout\";s:3:\"row\";s:14:\"localizeBlocks\";b:0;s:7:\"maxRows\";s:0:\"\";s:7:\"minRows\";s:0:\"\";s:14:\"selectionLabel\";s:14:\"Add a nav item\";s:11:\"staticField\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:39:\"verbb\\supertable\\fields\\SuperTableField\";}s:36:\"73f76b1b-d059-49b3-a696-5f4963f1eb81\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";s:36:\"a5851e7d-bf76-472c-b9fa-9f0b4969eb05\";s:6:\"handle\";s:18:\"clientHelpDeskLink\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:21:\"Client Help Desk Link\";s:10:\"searchable\";b:1;s:8:\"settings\";a:1:{s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:16:\"craft\\fields\\Url\";}s:36:\"881dd3b0-ca2d-498e-8aec-60fcb76628b2\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";s:36:\"5feb4ed7-1fcd-4451-90e6-3ce4ae865a32\";s:6:\"handle\";s:11:\"homeContent\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:12:\"Home Content\";s:10:\"searchable\";b:1;s:8:\"settings\";a:4:{s:12:\"contentTable\";s:30:\"{{%matrixcontent_homecontent}}\";s:14:\"localizeBlocks\";b:0;s:9:\"maxBlocks\";s:0:\"\";s:9:\"minBlocks\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:19:\"craft\\fields\\Matrix\";}s:36:\"940e1eca-459f-42e8-b388-6e36ea57b2cf\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";s:36:\"abd43e00-5692-4fa8-acc2-c8f36e5e042b\";s:6:\"handle\";s:5:\"quote\";s:12:\"instructions\";s:32:\"Add your testimonial quote here!\";s:4:\"name\";s:5:\"Quote\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"c2e2b5ff-233d-4198-96cd-65e924aa2089\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";s:36:\"5feb4ed7-1fcd-4451-90e6-3ce4ae865a32\";s:6:\"handle\";s:8:\"pageLink\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:9:\"Page Link\";s:10:\"searchable\";b:1;s:8:\"settings\";a:7:{s:5:\"limit\";s:0:\"\";s:17:\"localizeRelations\";b:0;s:14:\"selectionLabel\";s:0:\"\";s:6:\"source\";N;s:7:\"sources\";a:2:{i:0;s:44:\"section:0ef4f88f-2651-4511-bc2c-6072f32a76ba\";i:1;s:44:\"section:be2f020f-b422-4dde-a154-839feb00ecaa\";}s:12:\"targetSiteId\";N;s:8:\"viewMode\";N;}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:20:\"craft\\fields\\Entries\";}s:36:\"ccad9bfd-f0ed-41d3-b873-3c0371ea2f80\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";s:36:\"a5851e7d-bf76-472c-b9fa-9f0b4969eb05\";s:6:\"handle\";s:11:\"companyName\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:12:\"Company Name\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"d77e7e1f-40a2-4254-9050-8449a7b4af1a\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";s:36:\"a5851e7d-bf76-472c-b9fa-9f0b4969eb05\";s:6:\"handle\";s:13:\"chdFooterText\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:28:\"Client Help Desk Footer Text\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"2\";s:9:\"multiline\";s:1:\"1\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"dea2b00f-5402-47df-ad99-9b9a9f58b8c4\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";s:36:\"5feb4ed7-1fcd-4451-90e6-3ce4ae865a32\";s:6:\"handle\";s:7:\"summary\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:7:\"Summary\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"df814817-2cd0-4d07-b4f7-01eb3c7321f0\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";s:36:\"a5851e7d-bf76-472c-b9fa-9f0b4969eb05\";s:6:\"handle\";s:4:\"logo\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:4:\"Logo\";s:10:\"searchable\";b:1;s:8:\"settings\";a:14:{s:12:\"allowedKinds\";N;s:27:\"defaultUploadLocationSource\";s:43:\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\";s:28:\"defaultUploadLocationSubpath\";s:0:\"\";s:5:\"limit\";s:1:\"1\";s:17:\"localizeRelations\";b:0;s:13:\"restrictFiles\";s:0:\"\";s:14:\"selectionLabel\";s:12:\"Set the logo\";s:26:\"singleUploadLocationSource\";s:43:\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\";s:27:\"singleUploadLocationSubpath\";s:0:\"\";s:6:\"source\";N;s:7:\"sources\";s:1:\"*\";s:12:\"targetSiteId\";N;s:15:\"useSingleFolder\";s:0:\"\";s:8:\"viewMode\";s:4:\"list\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:19:\"craft\\fields\\Assets\";}s:36:\"e4088b9f-d864-430b-9def-bc3718863cc0\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";s:36:\"5feb4ed7-1fcd-4451-90e6-3ce4ae865a32\";s:6:\"handle\";s:8:\"template\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:8:\"Template\";s:10:\"searchable\";b:1;s:8:\"settings\";a:1:{s:16:\"limitToSubfolder\";s:5:\"page/\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:50:\"superbig\\templateselect\\fields\\TemplateSelectField\";}s:36:\"e530f5be-4791-479b-98c3-0336734aac21\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";s:36:\"5feb4ed7-1fcd-4451-90e6-3ce4ae865a32\";s:6:\"handle\";s:11:\"mainContent\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:12:\"Main Content\";s:10:\"searchable\";b:1;s:8:\"settings\";a:4:{s:12:\"contentTable\";s:30:\"{{%matrixcontent_maincontent}}\";s:14:\"localizeBlocks\";b:0;s:9:\"maxBlocks\";s:0:\"\";s:9:\"minBlocks\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:19:\"craft\\fields\\Matrix\";}}s:10:\"globalSets\";a:2:{s:36:\"a1c51961-4f99-42c1-9dec-5dbceb8a8de4\";a:3:{s:12:\"fieldLayouts\";a:1:{s:36:\"6da5d7e5-60bb-4fd3-a152-daa3a3377a78\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:3:{s:36:\"00606dd0-29cd-4115-a55e-daf47f6d175f\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:2;}s:36:\"25432085-76b6-4133-89db-0c3915a522ce\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:3;}s:36:\"6a5bc60a-97e3-45d0-b810-ff4d7238ed23\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:6:\"Global\";s:9:\"sortOrder\";i:1;}}}}s:6:\"handle\";s:4:\"site\";s:4:\"name\";s:4:\"Site\";}s:36:\"c03c237c-6a97-48fb-83c8-ffb769425806\";a:3:{s:12:\"fieldLayouts\";a:1:{s:36:\"8ab0a559-b05b-4a5d-b7d0-7fa288271a96\";a:1:{s:4:\"tabs\";a:4:{i:0;a:3:{s:6:\"fields\";a:2:{s:36:\"ccad9bfd-f0ed-41d3-b873-3c0371ea2f80\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}s:36:\"df814817-2cd0-4d07-b4f7-01eb3c7321f0\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:2;}}s:4:\"name\";s:5:\"Brand\";s:9:\"sortOrder\";i:1;}i:1;a:3:{s:6:\"fields\";a:1:{s:36:\"55cbd6ca-48c6-4176-979d-1c553f091e6d\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:7:\"Contact\";s:9:\"sortOrder\";i:2;}i:2;a:3:{s:6:\"fields\";a:2:{s:36:\"73f76b1b-d059-49b3-a696-5f4963f1eb81\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}s:36:\"d77e7e1f-40a2-4254-9050-8449a7b4af1a\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:2;}}s:4:\"name\";s:16:\"Client Help Desk\";s:9:\"sortOrder\";i:3;}i:3;a:3:{s:6:\"fields\";a:1:{s:36:\"940e1eca-459f-42e8-b388-6e36ea57b2cf\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:6:\"Social\";s:9:\"sortOrder\";i:4;}}}}s:6:\"handle\";s:7:\"company\";s:4:\"name\";s:7:\"Company\";}}s:16:\"matrixBlockTypes\";a:9:{s:36:\"0a8ef5e5-fca6-4510-bc32-b0f1f3e24e9c\";a:6:{s:5:\"field\";s:36:\"881dd3b0-ca2d-498e-8aec-60fcb76628b2\";s:12:\"fieldLayouts\";a:1:{s:36:\"3d5ab90c-4aa1-443e-955b-ee77fd19650d\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:1:{s:36:\"f720c82e-3a08-4446-bfe6-690af89f1d82\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"fields\";a:1:{s:36:\"f720c82e-3a08-4446-bfe6-690af89f1d82\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:13:\"selectedItems\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:11:\"Casestudies\";s:10:\"searchable\";b:1;s:8:\"settings\";a:7:{s:5:\"limit\";s:0:\"\";s:17:\"localizeRelations\";b:0;s:14:\"selectionLabel\";s:15:\"Add a casestudy\";s:6:\"source\";N;s:7:\"sources\";a:1:{i:0;s:44:\"section:2d769319-61c4-4dde-a74f-996a0008d812\";}s:12:\"targetSiteId\";N;s:8:\"viewMode\";N;}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:20:\"craft\\fields\\Entries\";}}s:6:\"handle\";s:19:\"featuredCasestudies\";s:4:\"name\";s:20:\"Featured Casestudies\";s:9:\"sortOrder\";i:3;}s:36:\"166d5679-09a8-4124-8f1d-0deba4a3a50e\";a:6:{s:5:\"field\";s:36:\"881dd3b0-ca2d-498e-8aec-60fcb76628b2\";s:12:\"fieldLayouts\";a:1:{s:36:\"e6709e52-502c-4a88-8605-5c9f59f603c5\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:2:{s:36:\"a0c870ef-2a9e-47a3-82db-fee9dc134169\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}s:36:\"b190e633-61ec-4dcd-ba10-467ca8dbf7ce\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:2;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"fields\";a:2:{s:36:\"a0c870ef-2a9e-47a3-82db-fee9dc134169\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:5:\"image\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:10:\"Hero Image\";s:10:\"searchable\";b:1;s:8:\"settings\";a:14:{s:12:\"allowedKinds\";N;s:27:\"defaultUploadLocationSource\";s:43:\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\";s:28:\"defaultUploadLocationSubpath\";s:0:\"\";s:5:\"limit\";s:1:\"1\";s:17:\"localizeRelations\";b:0;s:13:\"restrictFiles\";s:0:\"\";s:14:\"selectionLabel\";s:12:\"Add an image\";s:26:\"singleUploadLocationSource\";s:43:\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\";s:27:\"singleUploadLocationSubpath\";s:0:\"\";s:6:\"source\";N;s:7:\"sources\";s:1:\"*\";s:12:\"targetSiteId\";N;s:15:\"useSingleFolder\";s:0:\"\";s:8:\"viewMode\";s:4:\"list\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:19:\"craft\\fields\\Assets\";}s:36:\"b190e633-61ec-4dcd-ba10-467ca8dbf7ce\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:8:\"headline\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:8:\"Headline\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}}s:6:\"handle\";s:9:\"heroBlock\";s:4:\"name\";s:10:\"Hero Block\";s:9:\"sortOrder\";i:1;}s:36:\"18bb0061-3ab4-4171-9864-0b304f037871\";a:6:{s:5:\"field\";s:36:\"881dd3b0-ca2d-498e-8aec-60fcb76628b2\";s:12:\"fieldLayouts\";a:1:{s:36:\"4475550a-090e-4a1a-aa90-4fbd3494d971\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:1:{s:36:\"4b3754d8-c424-450e-a98c-5b0e5f00587a\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"fields\";a:1:{s:36:\"4b3754d8-c424-450e-a98c-5b0e5f00587a\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:13:\"selectedItems\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:11:\"Brand Logos\";s:10:\"searchable\";b:1;s:8:\"settings\";a:7:{s:5:\"limit\";s:0:\"\";s:17:\"localizeRelations\";b:0;s:14:\"selectionLabel\";s:11:\"Add a brand\";s:6:\"source\";N;s:7:\"sources\";a:1:{i:0;s:44:\"section:5c2849ef-3edb-4df8-9c06-a16fa76e340a\";}s:12:\"targetSiteId\";N;s:8:\"viewMode\";N;}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:20:\"craft\\fields\\Entries\";}}s:6:\"handle\";s:14:\"featuredBrands\";s:4:\"name\";s:15:\"Featured Brands\";s:9:\"sortOrder\";i:5;}s:36:\"3991c5c8-8edb-4b28-99fe-e9dc0e265153\";a:6:{s:5:\"field\";s:36:\"e530f5be-4791-479b-98c3-0336734aac21\";s:12:\"fieldLayouts\";a:1:{s:36:\"2b8648c5-073c-4b49-9cb6-5bdce7ef9f89\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:4:{s:36:\"232fa74e-4afc-465b-a5c7-104463aec101\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:4;}s:36:\"8c42f8d2-9a2b-4078-a120-95d7c26f0f3c\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}s:36:\"95256473-96e8-4413-a048-f30ea488639f\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:2;}s:36:\"ea92910c-3d8b-438e-9c1a-c08ec92320b4\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:3;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"fields\";a:4:{s:36:\"232fa74e-4afc-465b-a5c7-104463aec101\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:5:\"image\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:5:\"Image\";s:10:\"searchable\";b:1;s:8:\"settings\";a:14:{s:12:\"allowedKinds\";N;s:27:\"defaultUploadLocationSource\";s:43:\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\";s:28:\"defaultUploadLocationSubpath\";s:0:\"\";s:5:\"limit\";s:1:\"2\";s:17:\"localizeRelations\";b:0;s:13:\"restrictFiles\";s:0:\"\";s:14:\"selectionLabel\";s:12:\"Add an image\";s:26:\"singleUploadLocationSource\";s:43:\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\";s:27:\"singleUploadLocationSubpath\";s:0:\"\";s:6:\"source\";N;s:7:\"sources\";s:1:\"*\";s:12:\"targetSiteId\";N;s:15:\"useSingleFolder\";s:0:\"\";s:8:\"viewMode\";s:4:\"list\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:19:\"craft\\fields\\Assets\";}s:36:\"8c42f8d2-9a2b-4078-a120-95d7c26f0f3c\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:7:\"summary\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:7:\"Summary\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"95256473-96e8-4413-a048-f30ea488639f\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:8:\"subtitle\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:8:\"Subtitle\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"ea92910c-3d8b-438e-9c1a-c08ec92320b4\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:11:\"contentText\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:12:\"Content Text\";s:10:\"searchable\";b:1;s:8:\"settings\";a:7:{s:19:\"availableTransforms\";s:1:\"*\";s:16:\"availableVolumes\";s:1:\"*\";s:11:\"cleanupHtml\";s:1:\"1\";s:10:\"columnType\";s:4:\"text\";s:14:\"purifierConfig\";s:0:\"\";s:10:\"purifyHtml\";s:1:\"1\";s:14:\"redactorConfig\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:20:\"craft\\redactor\\Field\";}}s:6:\"handle\";s:9:\"textBlock\";s:4:\"name\";s:10:\"Text Block\";s:9:\"sortOrder\";i:2;}s:36:\"84c22202-5652-4791-84c4-5b639ae5c422\";a:6:{s:5:\"field\";s:36:\"881dd3b0-ca2d-498e-8aec-60fcb76628b2\";s:12:\"fieldLayouts\";a:1:{s:36:\"1756e051-9c13-4961-b802-d3961b19d20c\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:5:{s:36:\"01806408-a194-40e2-8abf-8b69f7f1353f\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:2;}s:36:\"78ddb5b3-6e8a-4c6d-aca0-f3bd4014624b\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}s:36:\"9c6dc458-cd9d-4428-a66d-d122301da2f2\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:3;}s:36:\"cc4af750-a38f-4055-a11c-82a62f65a042\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:5;}s:36:\"db691194-ceba-443b-986a-dab0b448997f\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:4;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"fields\";a:5:{s:36:\"01806408-a194-40e2-8abf-8b69f7f1353f\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:8:\"subtitle\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:8:\"Subtitle\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"78ddb5b3-6e8a-4c6d-aca0-f3bd4014624b\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:8:\"headline\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:8:\"Headline\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"9c6dc458-cd9d-4428-a66d-d122301da2f2\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:8:\"pageLink\";s:12:\"instructions\";s:61:\"Link this button to the page the user should read more about.\";s:4:\"name\";s:9:\"Page Link\";s:10:\"searchable\";b:1;s:8:\"settings\";a:1:{s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:16:\"craft\\fields\\Url\";}s:36:\"cc4af750-a38f-4055-a11c-82a62f65a042\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:11:\"contentText\";s:12:\"instructions\";s:66:\"Write an introduction to the page the user should read more about.\";s:4:\"name\";s:12:\"Content Text\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"db691194-ceba-443b-986a-dab0b448997f\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:11:\"contactLink\";s:12:\"instructions\";s:38:\"Link this button to your contact page.\";s:4:\"name\";s:12:\"Contact Link\";s:10:\"searchable\";b:1;s:8:\"settings\";a:1:{s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:16:\"craft\\fields\\Url\";}}s:6:\"handle\";s:13:\"textWrapBlock\";s:4:\"name\";s:15:\"Text Wrap Block\";s:9:\"sortOrder\";i:2;}s:36:\"a154cbb1-ab65-4035-a359-762d3421f294\";a:6:{s:5:\"field\";s:36:\"e530f5be-4791-479b-98c3-0336734aac21\";s:12:\"fieldLayouts\";a:1:{s:36:\"83f3ea36-2a37-46d2-9d12-d8cabb3682d2\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:1:{s:36:\"669d2e80-bcff-4ae0-90c7-bafc12be9b5d\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"fields\";a:1:{s:36:\"669d2e80-bcff-4ae0-90c7-bafc12be9b5d\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:13:\"selectedItems\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:11:\"Casestudies\";s:10:\"searchable\";b:1;s:8:\"settings\";a:7:{s:5:\"limit\";s:0:\"\";s:17:\"localizeRelations\";b:0;s:14:\"selectionLabel\";s:15:\"Add a casestudy\";s:6:\"source\";N;s:7:\"sources\";a:1:{i:0;s:44:\"section:2d769319-61c4-4dde-a74f-996a0008d812\";}s:12:\"targetSiteId\";N;s:8:\"viewMode\";N;}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:20:\"craft\\fields\\Entries\";}}s:6:\"handle\";s:19:\"featuredCasestudies\";s:4:\"name\";s:20:\"Featured Casestudies\";s:9:\"sortOrder\";i:3;}s:36:\"c3d4eaa4-64ef-4a92-809f-27c70098eb58\";a:6:{s:5:\"field\";s:36:\"e530f5be-4791-479b-98c3-0336734aac21\";s:12:\"fieldLayouts\";a:1:{s:36:\"78be34f5-e150-479f-8047-8affe0cf8535\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:1:{s:36:\"a5a548af-2da8-4284-9d96-f6328b884032\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"fields\";a:1:{s:36:\"a5a548af-2da8-4284-9d96-f6328b884032\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:13:\"selectedItems\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:11:\"Brand Logos\";s:10:\"searchable\";b:1;s:8:\"settings\";a:7:{s:5:\"limit\";s:0:\"\";s:17:\"localizeRelations\";b:0;s:14:\"selectionLabel\";s:11:\"Add a brand\";s:6:\"source\";N;s:7:\"sources\";a:1:{i:0;s:44:\"section:5c2849ef-3edb-4df8-9c06-a16fa76e340a\";}s:12:\"targetSiteId\";N;s:8:\"viewMode\";N;}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:20:\"craft\\fields\\Entries\";}}s:6:\"handle\";s:14:\"featuredBrands\";s:4:\"name\";s:15:\"Featured Brands\";s:9:\"sortOrder\";i:4;}s:36:\"d226ab88-7343-45bc-a20c-9716fd9ae493\";a:6:{s:5:\"field\";s:36:\"881dd3b0-ca2d-498e-8aec-60fcb76628b2\";s:12:\"fieldLayouts\";a:1:{s:36:\"5f1b4392-2538-4224-828f-d4c958a18b82\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:1:{s:36:\"c595dbd9-5fd7-4d6f-b01c-2681e15289e3\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"fields\";a:1:{s:36:\"c595dbd9-5fd7-4d6f-b01c-2681e15289e3\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:13:\"selectedItems\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:12:\"Testimonials\";s:10:\"searchable\";b:1;s:8:\"settings\";a:7:{s:5:\"limit\";s:0:\"\";s:17:\"localizeRelations\";b:0;s:14:\"selectionLabel\";s:0:\"\";s:6:\"source\";N;s:7:\"sources\";a:1:{i:0;s:44:\"section:2d85ffb0-7eb6-4cea-aaa3-3484e30def07\";}s:12:\"targetSiteId\";N;s:8:\"viewMode\";N;}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:20:\"craft\\fields\\Entries\";}}s:6:\"handle\";s:20:\"featuredTestimonials\";s:4:\"name\";s:21:\"Featured Testimonials\";s:9:\"sortOrder\";i:4;}s:36:\"e3103750-6fcc-4fc6-9f5e-5050545a5873\";a:6:{s:5:\"field\";s:36:\"e530f5be-4791-479b-98c3-0336734aac21\";s:12:\"fieldLayouts\";a:1:{s:36:\"069ddcd1-0369-407d-972a-fa015be5da2e\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:2:{s:36:\"05b43103-b492-4410-9e5e-e6bd40c5f9be\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}s:36:\"6882e383-a2da-4a6b-896b-80a5c612a400\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:2;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"fields\";a:2:{s:36:\"05b43103-b492-4410-9e5e-e6bd40c5f9be\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:5:\"image\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:5:\"Image\";s:10:\"searchable\";b:1;s:8:\"settings\";a:14:{s:12:\"allowedKinds\";N;s:27:\"defaultUploadLocationSource\";s:43:\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\";s:28:\"defaultUploadLocationSubpath\";s:0:\"\";s:5:\"limit\";s:1:\"1\";s:17:\"localizeRelations\";b:0;s:13:\"restrictFiles\";s:0:\"\";s:14:\"selectionLabel\";s:12:\"Add an image\";s:26:\"singleUploadLocationSource\";s:43:\"volume:70db4512-0393-49dc-a825-9e4c73bb2141\";s:27:\"singleUploadLocationSubpath\";s:0:\"\";s:6:\"source\";N;s:7:\"sources\";s:1:\"*\";s:12:\"targetSiteId\";N;s:15:\"useSingleFolder\";s:0:\"\";s:8:\"viewMode\";s:4:\"list\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:19:\"craft\\fields\\Assets\";}s:36:\"6882e383-a2da-4a6b-896b-80a5c612a400\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:8:\"headline\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:8:\"Headline\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}}s:6:\"handle\";s:9:\"heroBlock\";s:4:\"name\";s:10:\"Hero Block\";s:9:\"sortOrder\";i:1;}}s:7:\"plugins\";a:4:{s:20:\"dolphiq-craft3-forms\";a:3:{s:7:\"edition\";s:8:\"standard\";s:7:\"enabled\";b:1;s:13:\"schemaVersion\";s:5:\"1.0.0\";}s:8:\"redactor\";a:3:{s:7:\"edition\";s:8:\"standard\";s:7:\"enabled\";b:1;s:13:\"schemaVersion\";s:5:\"2.2.2\";}s:11:\"super-table\";a:3:{s:7:\"edition\";s:8:\"standard\";s:7:\"enabled\";b:1;s:13:\"schemaVersion\";s:6:\"2.0.10\";}s:15:\"template-select\";a:3:{s:7:\"edition\";s:8:\"standard\";s:7:\"enabled\";b:1;s:13:\"schemaVersion\";s:5:\"2.0.0\";}}s:8:\"sections\";a:5:{s:36:\"0ef4f88f-2651-4511-bc2c-6072f32a76ba\";a:8:{s:16:\"enableVersioning\";b:1;s:10:\"entryTypes\";a:1:{s:36:\"a7a58ed6-276f-485d-8706-18365606504c\";a:7:{s:12:\"fieldLayouts\";a:1:{s:36:\"9af5824a-f988-45be-8378-1571ea82ad6c\";a:1:{s:4:\"tabs\";a:2:{i:0;a:3:{s:6:\"fields\";a:1:{s:36:\"e530f5be-4791-479b-98c3-0336734aac21\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}i:1;a:3:{s:6:\"fields\";a:1:{s:36:\"e4088b9f-d864-430b-9def-bc3718863cc0\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:9:\"Structure\";s:9:\"sortOrder\";i:2;}}}}s:6:\"handle\";s:4:\"page\";s:13:\"hasTitleField\";b:1;s:4:\"name\";s:4:\"Page\";s:9:\"sortOrder\";i:1;s:11:\"titleFormat\";s:0:\"\";s:10:\"titleLabel\";s:5:\"Title\";}}s:6:\"handle\";s:5:\"pages\";s:4:\"name\";s:5:\"Pages\";s:16:\"propagateEntries\";b:1;s:12:\"siteSettings\";a:1:{s:36:\"7eb50d00-c9e7-4576-a17e-00db53e1ee12\";a:4:{s:16:\"enabledByDefault\";b:1;s:7:\"hasUrls\";b:1;s:8:\"template\";s:15:\"system/selector\";s:9:\"uriFormat\";s:19:\"{parent.uri}/{slug}\";}}s:9:\"structure\";a:2:{s:9:\"maxLevels\";s:0:\"\";s:3:\"uid\";s:36:\"58bd467b-57e4-4d90-8e08-8e19663f5d6a\";}s:4:\"type\";s:9:\"structure\";}s:36:\"2d769319-61c4-4dde-a74f-996a0008d812\";a:8:{s:16:\"enableVersioning\";b:1;s:10:\"entryTypes\";a:1:{s:36:\"e8f301e8-415b-46ce-9c9d-d28706b50dfd\";a:7:{s:12:\"fieldLayouts\";a:1:{s:36:\"433f0d8e-6556-4aa7-928b-a43a3a7ada1d\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:2:{s:36:\"08bfc011-6ae3-4f5b-a9fb-e31cfee875d4\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}s:36:\"c2e2b5ff-233d-4198-96cd-65e924aa2089\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:2;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"handle\";s:9:\"casestudy\";s:13:\"hasTitleField\";b:1;s:4:\"name\";s:9:\"Casestudy\";s:9:\"sortOrder\";i:1;s:11:\"titleFormat\";s:0:\"\";s:10:\"titleLabel\";s:5:\"Title\";}}s:6:\"handle\";s:11:\"casestudies\";s:4:\"name\";s:11:\"Casestudies\";s:16:\"propagateEntries\";b:1;s:12:\"siteSettings\";a:1:{s:36:\"7eb50d00-c9e7-4576-a17e-00db53e1ee12\";a:4:{s:16:\"enabledByDefault\";b:1;s:7:\"hasUrls\";b:1;s:8:\"template\";s:0:\"\";s:9:\"uriFormat\";s:19:\"{parent.uri}/{slug}\";}}s:9:\"structure\";a:2:{s:9:\"maxLevels\";s:0:\"\";s:3:\"uid\";s:36:\"92696fca-7d3c-41a3-8d7e-ce1e263b4081\";}s:4:\"type\";s:9:\"structure\";}s:36:\"2d85ffb0-7eb6-4cea-aaa3-3484e30def07\";a:8:{s:16:\"enableVersioning\";b:1;s:10:\"entryTypes\";a:1:{s:36:\"ecac885d-5a1c-44bc-82f1-e1ea9a7f2409\";a:7:{s:12:\"fieldLayouts\";a:1:{s:36:\"85148a96-b6b2-46ee-bf33-eb4d69df7477\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:3:{s:36:\"17a9818a-d11c-424c-b0cb-ea7e591db689\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:2;}s:36:\"940e1eca-459f-42e8-b388-6e36ea57b2cf\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}s:36:\"ccad9bfd-f0ed-41d3-b873-3c0371ea2f80\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:3;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"handle\";s:11:\"testimonial\";s:13:\"hasTitleField\";b:1;s:4:\"name\";s:11:\"Testimonial\";s:9:\"sortOrder\";i:1;s:11:\"titleFormat\";s:0:\"\";s:10:\"titleLabel\";s:5:\"Title\";}}s:6:\"handle\";s:12:\"testimonials\";s:4:\"name\";s:12:\"Testimonials\";s:16:\"propagateEntries\";b:1;s:12:\"siteSettings\";a:1:{s:36:\"7eb50d00-c9e7-4576-a17e-00db53e1ee12\";a:4:{s:16:\"enabledByDefault\";b:1;s:7:\"hasUrls\";b:1;s:8:\"template\";s:0:\"\";s:9:\"uriFormat\";s:19:\"{parent.uri}/{slug}\";}}s:9:\"structure\";a:2:{s:9:\"maxLevels\";s:0:\"\";s:3:\"uid\";s:36:\"50c32860-a905-4442-b5e6-8ac520182bbe\";}s:4:\"type\";s:9:\"structure\";}s:36:\"5c2849ef-3edb-4df8-9c06-a16fa76e340a\";a:8:{s:16:\"enableVersioning\";b:1;s:10:\"entryTypes\";a:1:{s:36:\"ac706833-da50-442e-820a-bc30693a9237\";a:7:{s:12:\"fieldLayouts\";a:1:{s:36:\"b3e0624a-3b3a-4881-b12d-ae0cff8e49e9\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:1:{s:36:\"6a19f127-db9f-4441-b4a0-867b7a303cd0\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"handle\";s:5:\"brand\";s:13:\"hasTitleField\";b:0;s:4:\"name\";s:5:\"Brand\";s:9:\"sortOrder\";i:1;s:11:\"titleFormat\";s:10:\"Brand Logo\";s:10:\"titleLabel\";s:12:\"Company Name\";}}s:6:\"handle\";s:6:\"brands\";s:4:\"name\";s:6:\"Brands\";s:16:\"propagateEntries\";b:1;s:12:\"siteSettings\";a:1:{s:36:\"7eb50d00-c9e7-4576-a17e-00db53e1ee12\";a:4:{s:16:\"enabledByDefault\";b:1;s:7:\"hasUrls\";b:1;s:8:\"template\";s:0:\"\";s:9:\"uriFormat\";s:19:\"{parent.uri}/{slug}\";}}s:9:\"structure\";a:2:{s:9:\"maxLevels\";s:1:\"1\";s:3:\"uid\";s:36:\"180077ef-b47f-4e20-99d6-cc7419fcc89f\";}s:4:\"type\";s:9:\"structure\";}s:36:\"be2f020f-b422-4dde-a154-839feb00ecaa\";a:8:{s:16:\"enableVersioning\";b:1;s:10:\"entryTypes\";a:2:{s:36:\"5d18f2dc-1d67-45a1-9bda-16bf9c741a14\";a:7:{s:12:\"fieldLayouts\";a:1:{s:36:\"71802762-c7bc-4edc-ae6e-b4fd2cb07299\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:1:{s:36:\"e4088b9f-d864-430b-9def-bc3718863cc0\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:9:\"Structure\";s:9:\"sortOrder\";i:1;}}}}s:6:\"handle\";s:11:\"systempages\";s:13:\"hasTitleField\";b:1;s:4:\"name\";s:11:\"systemPages\";s:9:\"sortOrder\";i:1;s:11:\"titleFormat\";s:0:\"\";s:10:\"titleLabel\";s:5:\"Title\";}s:36:\"6b5c19ff-bd53-4bc0-8f9a-cfd02a58ad92\";a:7:{s:12:\"fieldLayouts\";a:1:{s:36:\"9aa38611-b29d-4ce8-8bc7-f12a8ae551bd\";a:1:{s:4:\"tabs\";a:2:{i:0;a:3:{s:6:\"fields\";a:1:{s:36:\"881dd3b0-ca2d-498e-8aec-60fcb76628b2\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}i:1;a:3:{s:6:\"fields\";a:1:{s:36:\"e4088b9f-d864-430b-9def-bc3718863cc0\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}}s:4:\"name\";s:9:\"Structure\";s:9:\"sortOrder\";i:2;}}}}s:6:\"handle\";s:8:\"homepage\";s:13:\"hasTitleField\";b:1;s:4:\"name\";s:8:\"Homepage\";s:9:\"sortOrder\";i:2;s:11:\"titleFormat\";s:0:\"\";s:10:\"titleLabel\";s:8:\"Homepage\";}}s:6:\"handle\";s:11:\"systempages\";s:4:\"name\";s:11:\"systemPages\";s:16:\"propagateEntries\";b:1;s:12:\"siteSettings\";a:1:{s:36:\"7eb50d00-c9e7-4576-a17e-00db53e1ee12\";a:4:{s:16:\"enabledByDefault\";b:1;s:7:\"hasUrls\";b:1;s:8:\"template\";s:15:\"system/selector\";s:9:\"uriFormat\";s:19:\"{parent.uri}/{slug}\";}}s:9:\"structure\";a:2:{s:9:\"maxLevels\";s:1:\"2\";s:3:\"uid\";s:36:\"c0703e07-3178-4f89-a0b2-511e136b9913\";}s:4:\"type\";s:9:\"structure\";}}s:10:\"siteGroups\";a:1:{s:36:\"72b14bf3-a960-4ec5-a409-329cfe2a73e7\";a:1:{s:4:\"name\";s:30:\"Integral Facilities Management\";}}s:5:\"sites\";a:1:{s:36:\"7eb50d00-c9e7-4576-a17e-00db53e1ee12\";a:8:{s:7:\"baseUrl\";s:5:\"@web/\";s:6:\"handle\";s:7:\"default\";s:7:\"hasUrls\";b:1;s:8:\"language\";s:5:\"en-GB\";s:4:\"name\";s:30:\"Integral Facilities Management\";s:7:\"primary\";b:1;s:9:\"siteGroup\";s:36:\"72b14bf3-a960-4ec5-a409-329cfe2a73e7\";s:9:\"sortOrder\";i:1;}}s:20:\"superTableBlockTypes\";a:2:{s:36:\"09e6a797-a6f6-4bfd-b8cf-3117290f2de6\";a:3:{s:5:\"field\";s:36:\"25432085-76b6-4133-89db-0c3915a522ce\";s:12:\"fieldLayouts\";a:1:{s:36:\"49d1c705-304a-4a7b-af3c-2c3133a91960\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:3:{s:36:\"6764bfb1-a83e-458e-ba63-8d72d5ed6bf7\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:3;}s:36:\"b70fb8c0-b49f-43c5-942d-c6f1c5915f07\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}s:36:\"f10fda08-fe03-4039-9fb8-10b15f821ab8\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:2;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"fields\";a:3:{s:36:\"6764bfb1-a83e-458e-ba63-8d72d5ed6bf7\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:12:\"externalLink\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:13:\"External Link\";s:10:\"searchable\";b:1;s:8:\"settings\";a:1:{s:11:\"placeholder\";s:20:\"Set an external link\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:16:\"craft\\fields\\Url\";}s:36:\"b70fb8c0-b49f-43c5-942d-c6f1c5915f07\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:8:\"headline\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:8:\"Headline\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"f10fda08-fe03-4039-9fb8-10b15f821ab8\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:12:\"internalLink\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:13:\"Internal Link\";s:10:\"searchable\";b:1;s:8:\"settings\";a:7:{s:5:\"limit\";s:1:\"1\";s:17:\"localizeRelations\";b:0;s:14:\"selectionLabel\";s:0:\"\";s:6:\"source\";N;s:7:\"sources\";a:2:{i:0;s:44:\"section:0ef4f88f-2651-4511-bc2c-6072f32a76ba\";i:1;s:44:\"section:be2f020f-b422-4dde-a154-839feb00ecaa\";}s:12:\"targetSiteId\";N;s:8:\"viewMode\";N;}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:20:\"craft\\fields\\Entries\";}}}s:36:\"1accb184-1bfa-491d-a147-6f917d90b415\";a:3:{s:5:\"field\";s:36:\"6a5bc60a-97e3-45d0-b810-ff4d7238ed23\";s:12:\"fieldLayouts\";a:1:{s:36:\"9174fabd-6906-44c2-a20e-e3b7f5607bf5\";a:1:{s:4:\"tabs\";a:1:{i:0;a:3:{s:6:\"fields\";a:3:{s:36:\"2506af07-79d3-4a3a-be1a-432651c16baa\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:1;}s:36:\"2b92db6d-259e-451a-8761-0ffa76cf3d91\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:2;}s:36:\"75750a23-4f32-462a-a782-5c8fdd51bdb6\";a:2:{s:8:\"required\";b:0;s:9:\"sortOrder\";i:3;}}s:4:\"name\";s:7:\"Content\";s:9:\"sortOrder\";i:1;}}}}s:6:\"fields\";a:3:{s:36:\"2506af07-79d3-4a3a-be1a-432651c16baa\";a:10:{s:17:\"contentColumnType\";s:4:\"text\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:8:\"headline\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:8:\"Headline\";s:10:\"searchable\";b:1;s:8:\"settings\";a:6:{s:9:\"charLimit\";s:0:\"\";s:4:\"code\";s:0:\"\";s:10:\"columnType\";s:4:\"text\";s:11:\"initialRows\";s:1:\"4\";s:9:\"multiline\";s:0:\"\";s:11:\"placeholder\";s:0:\"\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:22:\"craft\\fields\\PlainText\";}s:36:\"2b92db6d-259e-451a-8761-0ffa76cf3d91\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:12:\"internalLink\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:13:\"Internal Link\";s:10:\"searchable\";b:1;s:8:\"settings\";a:7:{s:5:\"limit\";s:0:\"\";s:17:\"localizeRelations\";b:0;s:14:\"selectionLabel\";s:20:\"Set an internal link\";s:6:\"source\";N;s:7:\"sources\";a:2:{i:0;s:44:\"section:0ef4f88f-2651-4511-bc2c-6072f32a76ba\";i:1;s:44:\"section:be2f020f-b422-4dde-a154-839feb00ecaa\";}s:12:\"targetSiteId\";N;s:8:\"viewMode\";N;}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"site\";s:4:\"type\";s:20:\"craft\\fields\\Entries\";}s:36:\"75750a23-4f32-462a-a782-5c8fdd51bdb6\";a:10:{s:17:\"contentColumnType\";s:6:\"string\";s:10:\"fieldGroup\";N;s:6:\"handle\";s:12:\"externalLink\";s:12:\"instructions\";s:0:\"\";s:4:\"name\";s:13:\"External Link\";s:10:\"searchable\";b:1;s:8:\"settings\";a:1:{s:11:\"placeholder\";s:20:\"Set an external link\";}s:20:\"translationKeyFormat\";N;s:17:\"translationMethod\";s:4:\"none\";s:4:\"type\";s:16:\"craft\\fields\\Url\";}}}}s:6:\"system\";a:5:{s:7:\"edition\";s:4:\"solo\";s:4:\"live\";b:1;s:4:\"name\";s:30:\"Integral Facilities Management\";s:13:\"schemaVersion\";s:6:\"3.1.25\";s:8:\"timeZone\";s:19:\"America/Los_Angeles\";}s:5:\"users\";a:5:{s:23:\"allowPublicRegistration\";b:0;s:12:\"defaultGroup\";N;s:12:\"photoSubpath\";s:0:\"\";s:14:\"photoVolumeUid\";N;s:24:\"requireEmailVerification\";b:1;}s:7:\"volumes\";a:1:{s:36:\"70db4512-0393-49dc-a825-9e4c73bb2141\";a:7:{s:6:\"handle\";s:10:\"localFiles\";s:7:\"hasUrls\";b:1;s:4:\"name\";s:11:\"Local Files\";s:8:\"settings\";a:1:{s:4:\"path\";s:19:\"@webroot/assets/img\";}s:9:\"sortOrder\";i:1;s:4:\"type\";s:19:\"craft\\volumes\\Local\";s:3:\"url\";s:15:\"@web/assets/img\";}}}','{\"dateModified\":\"@config/project.yaml\",\"email\":\"@config/project.yaml\",\"fieldGroups\":\"@config/project.yaml\",\"fields\":\"@config/project.yaml\",\"matrixBlockTypes\":\"@config/project.yaml\",\"plugins\":\"@config/project.yaml\",\"sections\":\"@config/project.yaml\",\"siteGroups\":\"@config/project.yaml\",\"sites\":\"@config/project.yaml\",\"superTableBlockTypes\":\"@config/project.yaml\",\"system\":\"@config/project.yaml\",\"users\":\"@config/project.yaml\",\"volumes\":\"@config/project.yaml\",\"globalSets\":\"@config/project.yaml\"}','uxOtSZNmHgek','2019-02-17 09:47:27','2019-03-03 10:55:42','f93c4b3a-f6ca-4a31-bb1b-c4fce6133ca6');

/*!40000 ALTER TABLE `info` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table matrixblocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `matrixblocks`;

CREATE TABLE `matrixblocks` (
  `id` int(11) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `ownerSiteId` int(11) DEFAULT NULL,
  `fieldId` int(11) NOT NULL,
  `typeId` int(11) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `deletedWithOwner` tinyint(1) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `matrixblocks_ownerId_idx` (`ownerId`),
  KEY `matrixblocks_fieldId_idx` (`fieldId`),
  KEY `matrixblocks_typeId_idx` (`typeId`),
  KEY `matrixblocks_sortOrder_idx` (`sortOrder`),
  KEY `matrixblocks_ownerSiteId_idx` (`ownerSiteId`),
  CONSTRAINT `matrixblocks_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matrixblocks_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matrixblocks_ownerId_fk` FOREIGN KEY (`ownerId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matrixblocks_ownerSiteId_fk` FOREIGN KEY (`ownerSiteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `matrixblocks_typeId_fk` FOREIGN KEY (`typeId`) REFERENCES `matrixblocktypes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `matrixblocks` WRITE;
/*!40000 ALTER TABLE `matrixblocks` DISABLE KEYS */;

INSERT INTO `matrixblocks` (`id`, `ownerId`, `ownerSiteId`, `fieldId`, `typeId`, `sortOrder`, `deletedWithOwner`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(4,3,NULL,2,1,3,NULL,'2019-03-02 17:28:56','2019-03-03 09:11:10','e1e2b7ce-6d05-49ee-9759-fb33910cd239'),
	(6,3,NULL,2,3,2,NULL,'2019-03-02 17:28:56','2019-03-03 09:11:10','55824926-04ba-49e2-9156-7c77f122a857'),
	(7,3,NULL,2,4,4,NULL,'2019-03-02 17:28:56','2019-03-03 09:11:10','51dd2e14-3b30-4d59-b22f-faebbd667fec'),
	(14,3,NULL,2,6,1,NULL,'2019-03-02 18:39:51','2019-03-03 09:11:10','e397b1fe-b02b-4659-a2ca-b2b9acf6581b'),
	(22,3,NULL,2,5,5,NULL,'2019-03-02 18:53:44','2019-03-03 09:11:10','ae477f18-4040-4973-bdf3-49965177d7f4'),
	(30,11,NULL,2,6,1,NULL,'2019-03-03 10:46:07','2019-03-03 10:46:07','1c1a8427-1f9f-4e22-89bc-6bb73a4ca7b3'),
	(31,11,NULL,38,7,1,NULL,'2019-03-03 10:48:12','2019-03-03 10:54:02','9cfe21ae-ab08-4bb1-a93f-0926010b58c8'),
	(32,11,NULL,38,9,3,NULL,'2019-03-03 10:48:12','2019-03-03 10:54:02','374acd5e-d2a6-41d9-9a06-e6b573db2643'),
	(33,11,NULL,38,8,2,NULL,'2019-03-03 10:50:00','2019-03-03 10:54:02','46bc23b1-c319-4424-8d16-21e003230826'),
	(35,34,NULL,38,7,1,NULL,'2019-03-03 10:56:19','2019-03-03 10:57:02','dbdd87b0-c38d-49c1-bdfb-d4ba77dca405'),
	(36,34,NULL,38,8,2,NULL,'2019-03-03 10:56:19','2019-03-03 10:57:02','85bb7a34-cac1-49bc-8582-e3e055782163'),
	(37,34,NULL,38,9,3,NULL,'2019-03-03 10:56:19','2019-03-03 10:57:02','9ae98481-2650-4140-a0d6-1cf833ed2360');

/*!40000 ALTER TABLE `matrixblocks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table matrixblocktypes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `matrixblocktypes`;

CREATE TABLE `matrixblocktypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldId` int(11) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `matrixblocktypes_name_fieldId_unq_idx` (`name`,`fieldId`),
  UNIQUE KEY `matrixblocktypes_handle_fieldId_unq_idx` (`handle`,`fieldId`),
  KEY `matrixblocktypes_fieldId_idx` (`fieldId`),
  KEY `matrixblocktypes_fieldLayoutId_idx` (`fieldLayoutId`),
  CONSTRAINT `matrixblocktypes_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matrixblocktypes_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `matrixblocktypes` WRITE;
/*!40000 ALTER TABLE `matrixblocktypes` DISABLE KEYS */;

INSERT INTO `matrixblocktypes` (`id`, `fieldId`, `fieldLayoutId`, `name`, `handle`, `sortOrder`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,2,3,'Featured Casestudies','featuredCasestudies',3,'2019-03-02 17:21:46','2019-03-03 10:45:27','0a8ef5e5-fca6-4510-bc32-b0f1f3e24e9c'),
	(3,2,5,'Text Wrap Block','textWrapBlock',2,'2019-03-02 17:26:45','2019-03-03 10:45:27','84c22202-5652-4791-84c4-5b639ae5c422'),
	(4,2,6,'Featured Testimonials','featuredTestimonials',4,'2019-03-02 17:26:46','2019-03-03 10:45:27','d226ab88-7343-45bc-a20c-9716fd9ae493'),
	(5,2,7,'Featured Brands','featuredBrands',5,'2019-03-02 17:26:46','2019-03-03 10:45:28','18bb0061-3ab4-4171-9864-0b304f037871'),
	(6,2,10,'Hero Block','heroBlock',1,'2019-03-02 18:37:42','2019-03-03 10:45:27','166d5679-09a8-4124-8f1d-0deba4a3a50e'),
	(7,38,17,'Hero Block','heroBlock',1,'2019-03-03 10:42:42','2019-03-03 10:55:41','e3103750-6fcc-4fc6-9f5e-5050545a5873'),
	(8,38,18,'Text Block','textBlock',2,'2019-03-03 10:42:43','2019-03-03 10:55:42','3991c5c8-8edb-4b28-99fe-e9dc0e265153'),
	(9,38,19,'Featured Casestudies','featuredCasestudies',3,'2019-03-03 10:44:09','2019-03-03 10:55:42','a154cbb1-ab65-4035-a359-762d3421f294'),
	(10,38,20,'Featured Brands','featuredBrands',4,'2019-03-03 10:45:18','2019-03-03 10:55:42','c3d4eaa4-64ef-4a92-809f-27c70098eb58');

/*!40000 ALTER TABLE `matrixblocktypes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table matrixcontent_homecontent
# ------------------------------------------------------------

DROP TABLE IF EXISTS `matrixcontent_homecontent`;

CREATE TABLE `matrixcontent_homecontent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_textWrapBlock_headline` text,
  `field_textWrapBlock_subtitle` text,
  `field_textWrapBlock_pageLink` varchar(255) DEFAULT NULL,
  `field_textWrapBlock_contentText` text,
  `field_textWrapBlock_contactLink` varchar(255) DEFAULT NULL,
  `field_heroBlock_headline` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matrixcontent_homecontent_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `matrixcontent_homecontent_siteId_fk` (`siteId`),
  CONSTRAINT `matrixcontent_homecontent_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matrixcontent_homecontent_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `matrixcontent_homecontent` WRITE;
/*!40000 ALTER TABLE `matrixcontent_homecontent` DISABLE KEYS */;

INSERT INTO `matrixcontent_homecontent` (`id`, `elementId`, `siteId`, `dateCreated`, `dateUpdated`, `uid`, `field_textWrapBlock_headline`, `field_textWrapBlock_subtitle`, `field_textWrapBlock_pageLink`, `field_textWrapBlock_contentText`, `field_textWrapBlock_contactLink`, `field_heroBlock_headline`)
VALUES
	(1,4,1,'2019-03-02 17:28:56','2019-03-03 09:11:10','bd1c0e22-49a8-4e0a-866d-48dfbd842825',NULL,NULL,NULL,NULL,NULL,NULL),
	(2,5,1,'2019-03-02 17:28:56','2019-03-02 17:55:30','fb8ed035-2d2c-402a-9cae-4d452f6e888f',NULL,NULL,NULL,NULL,NULL,NULL),
	(3,6,1,'2019-03-02 17:28:56','2019-03-03 09:11:10','a365f363-5fee-4621-a170-32882eab393c','This is a text wrap block','This is a small subtitle','/about-us','This is an introduction to the next page.','/contact-us',NULL),
	(4,7,1,'2019-03-02 17:28:56','2019-03-03 09:11:10','c02aa5d6-1384-4475-a4b0-fc9ec0601c12',NULL,NULL,NULL,NULL,NULL,NULL),
	(5,14,1,'2019-03-02 18:39:51','2019-03-03 09:11:10','843ed236-b162-4017-88e2-5d6bf9133b19',NULL,NULL,NULL,NULL,NULL,'We provide a unique service to our clients.'),
	(6,22,1,'2019-03-02 18:53:44','2019-03-03 09:11:10','63a237b1-ddd7-4b99-bae5-08c5fdb229ac',NULL,NULL,NULL,NULL,NULL,NULL),
	(7,30,1,'2019-03-03 10:46:07','2019-03-03 10:46:07','ef6e24ac-c6ed-40ac-9f0c-f68a7bd6cca9',NULL,NULL,NULL,NULL,NULL,'Everything we do is for a purpose');

/*!40000 ALTER TABLE `matrixcontent_homecontent` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table matrixcontent_maincontent
# ------------------------------------------------------------

DROP TABLE IF EXISTS `matrixcontent_maincontent`;

CREATE TABLE `matrixcontent_maincontent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_heroBlock_headline` text,
  `field_textBlock_subtitle` text,
  `field_textBlock_contentText` text,
  `field_textBlock_summary` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `matrixcontent_maincontent_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `matrixcontent_maincontent_siteId_fk` (`siteId`),
  CONSTRAINT `matrixcontent_maincontent_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `matrixcontent_maincontent_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `matrixcontent_maincontent` WRITE;
/*!40000 ALTER TABLE `matrixcontent_maincontent` DISABLE KEYS */;

INSERT INTO `matrixcontent_maincontent` (`id`, `elementId`, `siteId`, `dateCreated`, `dateUpdated`, `uid`, `field_heroBlock_headline`, `field_textBlock_subtitle`, `field_textBlock_contentText`, `field_textBlock_summary`)
VALUES
	(1,31,1,'2019-03-03 10:48:12','2019-03-03 10:54:02','ed1b89e9-8a62-4b86-92dc-4670a4c99b61','Explore what we have to offer',NULL,NULL,NULL),
	(2,32,1,'2019-03-03 10:48:12','2019-03-03 10:54:02','b446f493-cabe-4329-807b-964447f40243',NULL,NULL,NULL,NULL),
	(3,33,1,'2019-03-03 10:50:00','2019-03-03 10:54:02','8abfbf67-8efe-451d-817a-a3719ff7ebaa',NULL,'A small subtitle about each section','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','A summary about this page, showing your Clients what this section is about.'),
	(4,35,1,'2019-03-03 10:56:19','2019-03-03 10:57:02','42f1b29a-37a5-4d56-9abc-5ea6dd5d70c3','Get In Touch',NULL,NULL,NULL),
	(5,36,1,'2019-03-03 10:56:19','2019-03-03 10:57:02','a4b36944-9b13-43f8-86f2-b95a37103ffb',NULL,'A small subtitle about each section','<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>','A summary about this page, showing your Clients what this section is about.'),
	(6,37,1,'2019-03-03 10:56:19','2019-03-03 10:57:02','354b708b-6ccb-4b0e-a034-bbb60670d3ab',NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `matrixcontent_maincontent` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table migrations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pluginId` int(11) DEFAULT NULL,
  `type` enum('app','plugin','content') NOT NULL DEFAULT 'app',
  `name` varchar(255) NOT NULL,
  `applyTime` datetime NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `migrations_pluginId_idx` (`pluginId`),
  KEY `migrations_type_pluginId_idx` (`type`,`pluginId`),
  CONSTRAINT `migrations_pluginId_fk` FOREIGN KEY (`pluginId`) REFERENCES `plugins` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;

INSERT INTO `migrations` (`id`, `pluginId`, `type`, `name`, `applyTime`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,NULL,'app','Install','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','e15bef8b-2454-4a1e-9610-924470d24fad'),
	(2,NULL,'app','m150403_183908_migrations_table_changes','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','6cba88ab-bfa4-437a-b31a-470d316e3957'),
	(3,NULL,'app','m150403_184247_plugins_table_changes','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','431c8cde-32ce-4b08-bbfb-a8a2e053b7a6'),
	(4,NULL,'app','m150403_184533_field_version','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','59887edd-c001-465f-a9ec-b06b7098e3fe'),
	(5,NULL,'app','m150403_184729_type_columns','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','ab8235c7-8da2-4c1c-b1ca-34235289834f'),
	(6,NULL,'app','m150403_185142_volumes','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','e9c55434-6a2c-46ca-81f6-10d68eff162d'),
	(7,NULL,'app','m150428_231346_userpreferences','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','1d408b69-db8c-4847-82ed-68f82c8ba471'),
	(8,NULL,'app','m150519_150900_fieldversion_conversion','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','aff37863-150f-4ee1-b726-1178c4e948c4'),
	(9,NULL,'app','m150617_213829_update_email_settings','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','f1010148-0677-45a7-aebf-9a9e6bca0048'),
	(10,NULL,'app','m150721_124739_templatecachequeries','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','bac2d356-91e7-4266-83a1-05ec27d36429'),
	(11,NULL,'app','m150724_140822_adjust_quality_settings','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','22d8eaf3-f75b-487c-9f58-247043439586'),
	(12,NULL,'app','m150815_133521_last_login_attempt_ip','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','3562d197-d8f7-42a7-accf-dc40bafc3fc9'),
	(13,NULL,'app','m151002_095935_volume_cache_settings','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','bdbc4b86-3774-42db-8c93-8410f74ce4a0'),
	(14,NULL,'app','m151005_142750_volume_s3_storage_settings','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','dac8d2ce-aee4-4f55-8320-5ed92ae0d9c7'),
	(15,NULL,'app','m151016_133600_delete_asset_thumbnails','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','9ea5b2b0-85fa-491f-80e8-0ba2fe4bc2b2'),
	(16,NULL,'app','m151209_000000_move_logo','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','13de629f-b3f9-4cb8-ae62-0a8cdffa9453'),
	(17,NULL,'app','m151211_000000_rename_fileId_to_assetId','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','e87f76ef-0ea7-4867-9870-9b624c88c932'),
	(18,NULL,'app','m151215_000000_rename_asset_permissions','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','c1d4d7c6-9c3f-43cc-ae53-b10b9f8a209d'),
	(19,NULL,'app','m160707_000001_rename_richtext_assetsource_setting','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','3a7ed314-bf43-4b55-ade0-f86c1dda1ade'),
	(20,NULL,'app','m160708_185142_volume_hasUrls_setting','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','199ed1f2-7870-4640-bfae-d09179a56a3b'),
	(21,NULL,'app','m160714_000000_increase_max_asset_filesize','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','aea97c68-704e-4c2e-b83d-26fa51176276'),
	(22,NULL,'app','m160727_194637_column_cleanup','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','12493193-1c1b-4f8b-b0ff-e858c31dcaf5'),
	(23,NULL,'app','m160804_110002_userphotos_to_assets','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','132d5727-8912-4723-8f57-0c0865fb3438'),
	(24,NULL,'app','m160807_144858_sites','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','59e0c148-612d-474d-bb13-b48f10eafa95'),
	(25,NULL,'app','m160829_000000_pending_user_content_cleanup','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','b1ca4197-3911-4dce-b752-b4529379c0f1'),
	(26,NULL,'app','m160830_000000_asset_index_uri_increase','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','73f971f0-da88-4224-a211-5feb8527cd9f'),
	(27,NULL,'app','m160912_230520_require_entry_type_id','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','3e14a86c-706c-4663-94ff-980998603c6b'),
	(28,NULL,'app','m160913_134730_require_matrix_block_type_id','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','50d0bd69-9632-46ee-8d71-47102a1fe7ac'),
	(29,NULL,'app','m160920_174553_matrixblocks_owner_site_id_nullable','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','2904f593-35e2-45f3-bac1-5f5e70c76e4c'),
	(30,NULL,'app','m160920_231045_usergroup_handle_title_unique','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','a526a47d-e1d5-42b8-b79d-c7f727277001'),
	(31,NULL,'app','m160925_113941_route_uri_parts','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','9ba13eed-9b56-43cb-b8f0-1f9a05cd64d5'),
	(32,NULL,'app','m161006_205918_schemaVersion_not_null','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','f33e8ed8-cc10-47a9-9293-6e50a70d0245'),
	(33,NULL,'app','m161007_130653_update_email_settings','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','de69f08e-9e88-44ef-9d2d-f853983ed93d'),
	(34,NULL,'app','m161013_175052_newParentId','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','01ef7daf-b046-4c11-accd-51bec99978f2'),
	(35,NULL,'app','m161021_102916_fix_recent_entries_widgets','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','a2aa8f87-2eab-4e40-acdb-ba2a305c416b'),
	(36,NULL,'app','m161021_182140_rename_get_help_widget','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','c35b0eac-36b1-451b-b54b-dbf956e792f4'),
	(37,NULL,'app','m161025_000000_fix_char_columns','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','2b4c404d-fcb7-40f4-8c3b-7e535d137e9d'),
	(38,NULL,'app','m161029_124145_email_message_languages','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','9b755191-dab7-4b32-9725-15dec392c782'),
	(39,NULL,'app','m161108_000000_new_version_format','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','5cee01df-ef67-466b-a996-fef8a773fc83'),
	(40,NULL,'app','m161109_000000_index_shuffle','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','9f311730-2703-423c-b2f0-a71503635829'),
	(41,NULL,'app','m161122_185500_no_craft_app','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','da28856a-143c-4ff2-8623-ab0ad4e1fc81'),
	(42,NULL,'app','m161125_150752_clear_urlmanager_cache','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','b4b4814e-b048-4de1-846b-85b8e47fa2a8'),
	(43,NULL,'app','m161220_000000_volumes_hasurl_notnull','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','6b0e2e4d-5d20-489f-a466-6c175e12336c'),
	(44,NULL,'app','m170114_161144_udates_permission','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','def7fc13-eef1-4c22-930c-7a0797351bf0'),
	(45,NULL,'app','m170120_000000_schema_cleanup','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','ac3bcd4f-cec5-4b99-aba6-3533a25d4288'),
	(46,NULL,'app','m170126_000000_assets_focal_point','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','13cd4347-0cc9-413c-bc7e-e1b4184f6ae8'),
	(47,NULL,'app','m170206_142126_system_name','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','d38e4106-e95d-49fb-894a-e243bdbd33e4'),
	(48,NULL,'app','m170217_044740_category_branch_limits','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','2b00806a-b5cc-43c6-b47b-573b5d90f043'),
	(49,NULL,'app','m170217_120224_asset_indexing_columns','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','e92b6f38-aa99-446c-b651-0c9ac136d370'),
	(50,NULL,'app','m170223_224012_plain_text_settings','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','b1566a8a-0124-4311-96d9-49a1bc07e221'),
	(51,NULL,'app','m170227_120814_focal_point_percentage','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','7466b59e-d85f-4690-90aa-110fe9bc3ced'),
	(52,NULL,'app','m170228_171113_system_messages','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','f9762507-c485-4ce3-8cb6-cf2dbf3b4284'),
	(53,NULL,'app','m170303_140500_asset_field_source_settings','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','db1ea19d-c881-4ae4-a790-c55a2e9e7446'),
	(54,NULL,'app','m170306_150500_asset_temporary_uploads','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','874ccc76-a242-4ebd-89da-5d5a07631ae2'),
	(55,NULL,'app','m170523_190652_element_field_layout_ids','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','7d01dff9-5d18-49fd-b4a5-e4a75f123840'),
	(56,NULL,'app','m170612_000000_route_index_shuffle','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','acd86ed5-e9a5-497d-9caa-5add595eea3f'),
	(57,NULL,'app','m170621_195237_format_plugin_handles','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','1eed8a9e-6dec-4208-80ae-193e55015039'),
	(58,NULL,'app','m170630_161027_deprecation_line_nullable','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','b35637c2-c980-4af2-8fc8-c16df5ba9d47'),
	(59,NULL,'app','m170630_161028_deprecation_changes','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','fcd9a1a2-e287-408e-811d-9777653f251e'),
	(60,NULL,'app','m170703_181539_plugins_table_tweaks','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','ef080c7c-6aa3-4405-925e-001c0b206bcc'),
	(61,NULL,'app','m170704_134916_sites_tables','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','f9d0279e-4985-4c96-97f7-c442abf739f8'),
	(62,NULL,'app','m170706_183216_rename_sequences','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','5af2ff69-5a83-4510-a7d5-684f0b869d52'),
	(63,NULL,'app','m170707_094758_delete_compiled_traits','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','12d3a523-5845-4cf1-bd52-982a05a18599'),
	(64,NULL,'app','m170731_190138_drop_asset_packagist','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','1470c5a7-a961-4e9e-b931-97e54a4b99d7'),
	(65,NULL,'app','m170810_201318_create_queue_table','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','59de6c4f-103a-4bb0-9668-e6b8d9d0a7d7'),
	(66,NULL,'app','m170816_133741_delete_compiled_behaviors','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','360c2289-58c6-4547-a859-f93329cc39d3'),
	(67,NULL,'app','m170903_192801_longblob_for_queue_jobs','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','66914d9f-612d-41e4-a9b4-d7c184f7ac9a'),
	(68,NULL,'app','m170914_204621_asset_cache_shuffle','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','fe945c2f-e79e-46ac-83e7-f8ee80974449'),
	(69,NULL,'app','m171011_214115_site_groups','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','e3cd4d68-d01c-48a7-9477-a8c0bbd33539'),
	(70,NULL,'app','m171012_151440_primary_site','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','b1057ad8-2aeb-4bbc-bef9-1ba6beb070c4'),
	(71,NULL,'app','m171013_142500_transform_interlace','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','95242075-0498-4366-b023-5e81b2cc67c7'),
	(72,NULL,'app','m171016_092553_drop_position_select','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','dea3095a-70d5-4e3f-a472-f88d5d961458'),
	(73,NULL,'app','m171016_221244_less_strict_translation_method','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','1fd22856-b062-47b8-b20b-389705b6b83e'),
	(74,NULL,'app','m171107_000000_assign_group_permissions','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','28ff2613-c446-4eca-b297-12f73f9fee82'),
	(75,NULL,'app','m171117_000001_templatecache_index_tune','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','c22a47a2-9aef-42c3-b887-14f94e12e30d'),
	(76,NULL,'app','m171126_105927_disabled_plugins','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','47775284-b032-434a-b269-267944bd8f57'),
	(77,NULL,'app','m171130_214407_craftidtokens_table','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','0f973419-b58b-4188-ab1b-668993547af0'),
	(78,NULL,'app','m171202_004225_update_email_settings','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','fbd0e0da-4ae8-4787-9b62-be09db2aa964'),
	(79,NULL,'app','m171204_000001_templatecache_index_tune_deux','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','75d9baaa-d6af-4341-b0a7-5852d52f257b'),
	(80,NULL,'app','m171205_130908_remove_craftidtokens_refreshtoken_column','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','6c94a983-c809-4943-9953-3dc4ac0dc5a3'),
	(81,NULL,'app','m171218_143135_longtext_query_column','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','7b5540b6-64e5-464c-bf33-7f709560070b'),
	(82,NULL,'app','m171231_055546_environment_variables_to_aliases','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','f3e1dc9d-15ec-4f31-97e5-8c670ef1c610'),
	(83,NULL,'app','m180113_153740_drop_users_archived_column','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','e033c288-f8bf-4086-a60e-0f9114e1574f'),
	(84,NULL,'app','m180122_213433_propagate_entries_setting','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','614fea9d-1335-4911-bc7d-464fdd58de87'),
	(85,NULL,'app','m180124_230459_fix_propagate_entries_values','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','4afc4184-7ee4-4a00-b7f9-ecfd0a02f0d4'),
	(86,NULL,'app','m180128_235202_set_tag_slugs','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','f465c4ca-e647-4872-b78b-b75a298ae2c4'),
	(87,NULL,'app','m180202_185551_fix_focal_points','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','35a67ba4-6841-404f-bad6-900ad2d1b80f'),
	(88,NULL,'app','m180217_172123_tiny_ints','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','6e63fda8-213c-4863-9607-82c546545082'),
	(89,NULL,'app','m180321_233505_small_ints','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','67b8c107-ced2-4932-8be6-fbddc3ee5949'),
	(90,NULL,'app','m180328_115523_new_license_key_statuses','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','ac309f4a-6d44-43ef-824a-28161c1e7872'),
	(91,NULL,'app','m180404_182320_edition_changes','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','ce415e36-0024-4f46-b47e-66cd657d4fdd'),
	(92,NULL,'app','m180411_102218_fix_db_routes','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','7a9ecb49-3a1d-45c0-ae26-a2979b3e7b62'),
	(93,NULL,'app','m180416_205628_resourcepaths_table','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','a4755a6d-587b-4521-a1b6-9888ce7396d0'),
	(94,NULL,'app','m180418_205713_widget_cleanup','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','1a4d5a88-3d8f-4ea6-95ea-e6e761d0f5ea'),
	(95,NULL,'app','m180425_203349_searchable_fields','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','e1fa7874-380d-4f62-8736-43ae8dbdd17c'),
	(96,NULL,'app','m180516_153000_uids_in_field_settings','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','8e8c47c3-b01c-4bfd-84ab-6b5e2d706c8f'),
	(97,NULL,'app','m180517_173000_user_photo_volume_to_uid','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','8b347368-de03-4982-820e-9184c4bef42b'),
	(98,NULL,'app','m180518_173000_permissions_to_uid','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','c600b108-12c3-46ef-a204-ddfd6b7e92f5'),
	(99,NULL,'app','m180520_173000_matrix_context_to_uids','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','0c3b49db-bee8-472a-a971-109f46605183'),
	(100,NULL,'app','m180521_173000_initial_yml_and_snapshot','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','58f83ef0-0a63-4ae4-b6c0-711a4d06c1bd'),
	(101,NULL,'app','m180731_162030_soft_delete_sites','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','b76cd010-36d7-4bfe-8275-bbd79bbe7c4d'),
	(102,NULL,'app','m180810_214427_soft_delete_field_layouts','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','6c9e4c2f-9bd5-4672-bbfe-8ef600e16d4d'),
	(103,NULL,'app','m180810_214439_soft_delete_elements','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','3af29afa-6572-4095-92f5-c76de58cc3c2'),
	(104,NULL,'app','m180824_193422_case_sensitivity_fixes','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','065afd26-54e0-4c4e-9dd5-3f8147e7d324'),
	(105,NULL,'app','m180901_151639_fix_matrixcontent_tables','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','612d642f-413b-4fe5-9498-302bf31a961b'),
	(106,NULL,'app','m180904_112109_permission_changes','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','f2c7f388-3f89-4aa8-937c-c70b0ace6f81'),
	(107,NULL,'app','m180910_142030_soft_delete_sitegroups','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','1967e22e-e8d6-4d9d-aab1-bfade7e8b3e5'),
	(108,NULL,'app','m181011_160000_soft_delete_asset_support','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','45d35489-1013-4161-9bb4-a5d73e398bbf'),
	(109,NULL,'app','m181016_183648_set_default_user_settings','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','0a7d6165-5ea3-4175-b3f0-d68bb7dd2464'),
	(110,NULL,'app','m181017_225222_system_config_settings','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','6c4cc5f2-2dad-4fbd-8157-0376dc057c6f'),
	(111,NULL,'app','m181018_222343_drop_userpermissions_from_config','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','8be75903-ad1a-4223-b388-08a1bb17a31f'),
	(112,NULL,'app','m181029_130000_add_transforms_routes_to_config','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','87e216b8-0378-403c-99f5-fc6aa7bedfc0'),
	(113,NULL,'app','m181112_203955_sequences_table','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','a155e0d0-0ac4-445c-b14c-0f86e727c7b6'),
	(114,NULL,'app','m181121_001712_cleanup_field_configs','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','a1bbcc80-c33b-4201-86ba-a3fbd4514563'),
	(115,NULL,'app','m181128_193942_fix_project_config','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','43e5ae4f-484d-4375-b7bc-b62dc7dbb279'),
	(116,NULL,'app','m181130_143040_fix_schema_version','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','da1e2a1f-11cc-4116-937e-ede04e955be6'),
	(117,NULL,'app','m181211_143040_fix_entry_type_uids','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','fd0f5423-d2e0-43a4-815a-703fdbf3e663'),
	(118,NULL,'app','m181213_102500_config_map_aliases','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','1cfac7d4-8732-4d78-9ac8-807e52503f0b'),
	(119,NULL,'app','m181217_153000_fix_structure_uids','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','df4c711d-d1af-46a9-ab07-836d4e13d39d'),
	(120,NULL,'app','m190104_152725_store_licensed_plugin_editions','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','64cf7e89-9887-4ffc-adde-870d97e59f29'),
	(121,NULL,'app','m190108_110000_cleanup_project_config','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','9dd05ab1-d9fe-4dfb-a6f9-7a842786fdf5'),
	(122,NULL,'app','m190108_113000_asset_field_setting_change','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','e185f974-eb6e-47e7-b8ab-bca789419055'),
	(123,NULL,'app','m190109_172845_fix_colspan','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','3ac78926-b23f-47bd-b6dd-7d9bde01dff6'),
	(124,NULL,'app','m190110_150000_prune_nonexisting_sites','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','bcc53498-695d-49a6-a7d4-a6e6770b82d2'),
	(125,NULL,'app','m190110_214819_soft_delete_volumes','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','3095cf48-287f-4b20-9d56-aefaf46a2771'),
	(126,NULL,'app','m190112_124737_fix_user_settings','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','0bf9633d-6ba9-4c0b-84fe-77ca94ca1c88'),
	(127,NULL,'app','m190112_131225_fix_field_layouts','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','e28c59ef-161e-4b52-baf8-9eb519cb8a3c'),
	(128,NULL,'app','m190112_201010_more_soft_deletes','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','f8b58fd6-f2f4-4a6f-a341-32650e8689b7'),
	(129,NULL,'app','m190114_143000_more_asset_field_setting_changes','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','e1d1b9b8-6e44-446e-94f3-fe3b4e901123'),
	(130,NULL,'app','m190121_120000_rich_text_config_setting','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','06577d2e-7a32-4ba0-93d9-b5823f93c6bb'),
	(131,NULL,'app','m190125_191628_fix_email_transport_password','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','78cd1657-3f4b-42fc-8e0f-f87a9021bd38'),
	(132,NULL,'app','m190128_181422_cleanup_volume_folders','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','e4e6b896-3273-42e0-a13b-e17ba0003db6'),
	(133,NULL,'app','m190205_140000_fix_asset_soft_delete_index','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','7e877906-1118-4d27-af81-3b48c4cfbe62'),
	(134,NULL,'app','m190208_140000_reset_project_config_mapping','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','eb984cd1-0ba2-4e07-baa5-b701dc329176'),
	(135,NULL,'app','m190218_143000_element_index_settings_uid','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','90434d66-c9cd-4224-9d1d-67c8e3041d8b'),
	(136,2,'plugin','Install','2019-03-03 09:18:42','2019-03-03 09:18:42','2019-03-03 09:18:42','4997f2d6-0254-4e5f-a2ac-f924f268d610'),
	(137,2,'plugin','m180210_000000_migrate_content_tables','2019-03-03 09:18:42','2019-03-03 09:18:42','2019-03-03 09:18:42','b56b3d0a-0121-4ffa-848c-6b38179d474f'),
	(138,2,'plugin','m180211_000000_type_columns','2019-03-03 09:18:42','2019-03-03 09:18:42','2019-03-03 09:18:42','556678a7-fa0b-40fa-a6f9-3ff138a49ce7'),
	(139,2,'plugin','m180219_000000_sites','2019-03-03 09:18:42','2019-03-03 09:18:42','2019-03-03 09:18:42','1e147bfb-028f-438b-88ac-2f433643dc67'),
	(140,2,'plugin','m180220_000000_fix_context','2019-03-03 09:18:42','2019-03-03 09:18:42','2019-03-03 09:18:42','598a47ba-d395-4851-a2a4-062532427b85'),
	(141,2,'plugin','m190117_000000_soft_deletes','2019-03-03 09:18:42','2019-03-03 09:18:42','2019-03-03 09:18:42','66567111-f5cb-4c13-bc0b-40b5589e3592'),
	(142,2,'plugin','m190117_000001_context_to_uids','2019-03-03 09:18:42','2019-03-03 09:18:42','2019-03-03 09:18:42','9d30fa1c-7a42-4630-bf3d-37e3166e7166'),
	(143,2,'plugin','m190120_000000_fix_supertablecontent_tables','2019-03-03 09:18:42','2019-03-03 09:18:42','2019-03-03 09:18:42','a15a6f79-cd6d-4291-a241-341d67abf776'),
	(144,2,'plugin','m190131_000000_fix_supertable_missing_fields','2019-03-03 09:18:42','2019-03-03 09:18:42','2019-03-03 09:18:42','59972f69-7053-483b-8167-541385f9aaa1'),
	(145,2,'plugin','m190227_100000_fix_project_config','2019-03-03 09:18:42','2019-03-03 09:18:42','2019-03-03 09:18:42','7a864062-101e-4f2f-b81a-c0b56e850cb5'),
	(146,3,'plugin','Install','2019-03-03 09:22:09','2019-03-03 09:22:09','2019-03-03 09:22:09','0f3cceb0-0bbb-40d4-a462-48ff16437dcb'),
	(147,4,'plugin','m180430_204710_remove_old_plugins','2019-03-03 09:24:49','2019-03-03 09:24:49','2019-03-03 09:24:49','0f533daa-9b22-4461-a0f0-db80cb8ce66b'),
	(148,4,'plugin','Install','2019-03-03 09:24:49','2019-03-03 09:24:49','2019-03-03 09:24:49','9adf7809-ce72-4707-bde6-5ca763ce9375');

/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table plugins
# ------------------------------------------------------------

DROP TABLE IF EXISTS `plugins`;

CREATE TABLE `plugins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `handle` varchar(255) NOT NULL,
  `version` varchar(255) NOT NULL,
  `schemaVersion` varchar(255) NOT NULL,
  `licenseKeyStatus` enum('valid','invalid','mismatched','astray','unknown') NOT NULL DEFAULT 'unknown',
  `licensedEdition` varchar(255) DEFAULT NULL,
  `installDate` datetime NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `plugins_handle_unq_idx` (`handle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `plugins` WRITE;
/*!40000 ALTER TABLE `plugins` DISABLE KEYS */;

INSERT INTO `plugins` (`id`, `handle`, `version`, `schemaVersion`, `licenseKeyStatus`, `licensedEdition`, `installDate`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,'template-select','2.0.1','2.0.0','unknown',NULL,'2019-02-22 09:15:22','2019-02-22 09:15:22','2019-03-03 09:25:01','eaf7813a-d866-494d-8386-0f1ba3fd3b9b'),
	(2,'super-table','2.1.15','2.0.10','unknown',NULL,'2019-03-03 09:18:41','2019-03-03 09:18:41','2019-03-03 09:25:01','c0095682-f9b4-4d82-ae5e-7624dc38b988'),
	(3,'dolphiq-craft3-forms','1.1.0','1.0.0','unknown',NULL,'2019-03-03 09:22:09','2019-03-03 09:22:09','2019-03-03 09:25:01','f0489c85-2120-4695-b5b2-665542589551'),
	(4,'redactor','2.3.2','2.2.2','unknown',NULL,'2019-03-03 09:24:49','2019-03-03 09:24:49','2019-03-03 09:25:01','edd3edde-4bc8-4203-b3f3-885bfee1c8e6');

/*!40000 ALTER TABLE `plugins` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table queue
# ------------------------------------------------------------

DROP TABLE IF EXISTS `queue`;

CREATE TABLE `queue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `job` longblob NOT NULL,
  `description` text,
  `timePushed` int(11) NOT NULL,
  `ttr` int(11) NOT NULL,
  `delay` int(11) NOT NULL DEFAULT '0',
  `priority` int(11) unsigned NOT NULL DEFAULT '1024',
  `dateReserved` datetime DEFAULT NULL,
  `timeUpdated` int(11) DEFAULT NULL,
  `progress` smallint(6) NOT NULL DEFAULT '0',
  `attempt` int(11) DEFAULT NULL,
  `fail` tinyint(1) DEFAULT '0',
  `dateFailed` datetime DEFAULT NULL,
  `error` text,
  PRIMARY KEY (`id`),
  KEY `queue_fail_timeUpdated_timePushed_idx` (`fail`,`timeUpdated`,`timePushed`),
  KEY `queue_fail_timeUpdated_delay_idx` (`fail`,`timeUpdated`,`delay`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table relations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `relations`;

CREATE TABLE `relations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldId` int(11) NOT NULL,
  `sourceId` int(11) NOT NULL,
  `sourceSiteId` int(11) DEFAULT NULL,
  `targetId` int(11) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `relations_fieldId_sourceId_sourceSiteId_targetId_unq_idx` (`fieldId`,`sourceId`,`sourceSiteId`,`targetId`),
  KEY `relations_sourceId_idx` (`sourceId`),
  KEY `relations_targetId_idx` (`targetId`),
  KEY `relations_sourceSiteId_idx` (`sourceSiteId`),
  CONSTRAINT `relations_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `relations_sourceId_fk` FOREIGN KEY (`sourceId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `relations_sourceSiteId_fk` FOREIGN KEY (`sourceSiteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `relations_targetId_fk` FOREIGN KEY (`targetId`) REFERENCES `elements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `relations` WRITE;
/*!40000 ALTER TABLE `relations` DISABLE KEYS */;

INSERT INTO `relations` (`id`, `fieldId`, `sourceId`, `sourceSiteId`, `targetId`, `sortOrder`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(3,21,10,NULL,3,1,'2019-03-02 18:24:00','2019-03-02 18:24:00','9c7e182f-7630-4726-a289-19fbf39715af'),
	(5,21,13,NULL,3,1,'2019-03-02 18:26:10','2019-03-02 18:26:10','8f380a2d-8050-4ec9-b2e3-f84779aeebc5'),
	(55,22,17,NULL,16,1,'2019-03-02 19:09:09','2019-03-02 19:09:09','2a76211b-ec21-4681-b131-67e1c41d9e79'),
	(56,22,19,NULL,18,1,'2019-03-02 19:09:09','2019-03-02 19:09:09','d7b99976-b617-490d-bb92-6cb0c43e0bea'),
	(57,22,21,NULL,20,1,'2019-03-02 19:09:09','2019-03-02 19:09:09','cdfb4cc1-7f3f-4831-a5ee-43f56e103b95'),
	(72,4,4,NULL,10,1,'2019-03-03 09:11:10','2019-03-03 09:11:10','891c3a14-5771-42f8-b5c6-abbd80e5f000'),
	(73,4,4,NULL,13,2,'2019-03-03 09:11:10','2019-03-03 09:11:10','d956c52e-91a0-4f38-bbbc-acc756f69200'),
	(74,8,7,NULL,8,1,'2019-03-03 09:11:10','2019-03-03 09:11:10','44eb75d9-b21f-4e03-a37f-afd2d05668e5'),
	(75,8,7,NULL,9,2,'2019-03-03 09:11:10','2019-03-03 09:11:10','8ea9a81c-ccd0-4171-bdc0-d0452edd0a73'),
	(76,9,22,NULL,19,1,'2019-03-03 09:11:10','2019-03-03 09:11:10','47079fc3-0e9a-4514-b22e-a804b2eeb11e'),
	(77,9,22,NULL,21,2,'2019-03-03 09:11:10','2019-03-03 09:11:10','a1276acd-dbe7-476e-a4fd-1f40b0f67b5d'),
	(78,9,22,NULL,17,3,'2019-03-03 09:11:10','2019-03-03 09:11:10','41c26e29-531f-4d7f-9753-4a8ab829ffb8'),
	(99,28,25,NULL,11,1,'2019-03-03 10:00:30','2019-03-03 10:00:30','3fbcc215-55b3-4531-9f8b-3fd615e9fce2'),
	(100,28,26,NULL,12,1,'2019-03-03 10:00:30','2019-03-03 10:00:30','4ed8d95e-bd16-4543-9727-090dc070f63e'),
	(101,34,27,NULL,11,1,'2019-03-03 10:00:30','2019-03-03 10:00:30','e511fc2b-549f-450e-b095-81c6d0ebd679'),
	(102,34,28,NULL,12,1,'2019-03-03 10:00:30','2019-03-03 10:00:30','43c91795-007f-402b-a080-d9afd3ed0cf9'),
	(103,34,29,NULL,12,1,'2019-03-03 10:00:30','2019-03-03 10:00:30','b37027a0-e438-4c58-8943-a8457951dd49'),
	(105,35,23,NULL,20,1,'2019-03-03 10:25:44','2019-03-03 10:25:44','61dcbfac-b331-4e2c-9b6e-c24ac6f945a7'),
	(116,45,32,NULL,10,1,'2019-03-03 10:54:02','2019-03-03 10:54:02','592f9363-6ed4-4e8c-93ea-30da91806aa5'),
	(117,45,32,NULL,13,2,'2019-03-03 10:54:02','2019-03-03 10:54:02','77b2d073-44aa-4fec-a840-abd89738d660'),
	(122,45,37,NULL,10,1,'2019-03-03 10:57:02','2019-03-03 10:57:02','897ee501-79ad-4eda-881c-80604479bcdc'),
	(123,45,37,NULL,13,2,'2019-03-03 10:57:02','2019-03-03 10:57:02','427ae32b-6cad-40ea-b9a2-277a1dae60d0');

/*!40000 ALTER TABLE `relations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table resourcepaths
# ------------------------------------------------------------

DROP TABLE IF EXISTS `resourcepaths`;

CREATE TABLE `resourcepaths` (
  `hash` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  PRIMARY KEY (`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `resourcepaths` WRITE;
/*!40000 ALTER TABLE `resourcepaths` DISABLE KEYS */;

INSERT INTO `resourcepaths` (`hash`, `path`)
VALUES
	('10b03506','@lib/jquery.payment'),
	('12c28bba','@app/web/assets/tablesettings/dist'),
	('18c1afce','@craft/web/assets/editentry/dist'),
	('1be8e5e5','@app/web/assets/utilities/dist'),
	('1d186d93','@bower/jquery/dist'),
	('2532ac6b','@lib'),
	('27ad8ea2','@craft/web/assets/matrixsettings/dist'),
	('2eeb9f84','@lib/datepicker-i18n'),
	('3142b8a5','@app/web/assets/matrixsettings/dist'),
	('3288c666','@lib/element-resize-detector'),
	('37483898','@lib/selectize'),
	('38676dce','@craft/web/assets/dashboard/dist'),
	('3d247c12','@lib/xregexp'),
	('41244b05','@craft/web/assets/feed/dist'),
	('423e014b','@lib/jquery-ui'),
	('481aad30','@app/web/assets/dashboard/dist'),
	('4a3190a8','@app/web/assets/updater/dist'),
	('4b68f6f5','@lib/fabric'),
	('4c6686f9','@app/web/assets/installer/dist'),
	('4ec0ae86','@app/web/assets/generalsettings/dist'),
	('54f66e56','@app/web/assets/craftsupport/dist'),
	('57e76241','@app/web/assets/updates/dist'),
	('5c80b0fa','@craft/web/assets/plugins/dist'),
	('5e2e22cb','@lib/garnishjs'),
	('62abea5f','@app/web/assets/pluginstore/dist'),
	('6336151c','@lib/picturefill'),
	('649229de','@lib/jquery-touch-events'),
	('64de80f9','@app/web/assets/recententries/dist'),
	('6d93354d','@lib/d3'),
	('7637c18c','@craft/web/assets/login/dist'),
	('77ce345a','@craft/redactor/assets/field/dist'),
	('7993a774','@app/web/assets/cp/dist'),
	('7bde14e2','@lib/fileupload'),
	('7e317641','@craft/web/assets/craftsupport/dist'),
	('87c9f330','@craft/web/assets/sites/dist'),
	('88ecca','@app/web/assets/feed/dist'),
	('895a50ea','@lib/fileupload'),
	('8b17e37c','@app/web/assets/cp/dist'),
	('8f29f602','@app/web/assets/login/dist'),
	('902fae57','@app/web/assets/pluginstore/dist'),
	('913bc965','@craft/web/assets/tablesettings/dist'),
	('91b25114','@lib/picturefill'),
	('91cab56a','@craft/web/assets/matrix/dist'),
	('9490675f','@lib/prismjs'),
	('951a090c','@app/web/assets/matrix/dist'),
	('96166dd6','@lib/jquery-touch-events'),
	('965ac4f1','@app/web/assets/recententries/dist'),
	('99116113','@craft/web/assets/utilities/dist'),
	('9a382b38','@app/web/assets/editentry/dist'),
	('9f177145','@lib/d3'),
	('a5632649','@app/web/assets/updates/dist'),
	('a6722a5e','@app/web/assets/craftsupport/dist'),
	('a8e0869f','@app/web/assets/updateswidget/dist'),
	('a94a9da','@vendor/craftcms/redactor/lib/redactor'),
	('acaa66c3','@lib/garnishjs'),
	('b0ba4543','@lib/jquery-ui'),
	('b8b5d4a0','@app/web/assets/updater/dist'),
	('b9297b10','@craft/web/assets/fields/dist'),
	('b9ecb2fd','@lib/fabric'),
	('ba9ee938','@app/web/assets/dashboard/dist'),
	('bdf9c776','@app/web/assets/fields/dist'),
	('bee2c2f1','@app/web/assets/installer/dist'),
	('c00c826e','@lib/element-resize-detector'),
	('c3e359d9','@craft/web/assets/cp/dist'),
	('c5cc7c90','@lib/selectize'),
	('c979aee','@lib/velocity'),
	('ca9869a4','@craft/web/assets/pluginstore/dist'),
	('ce9f020f','@craft/web/assets/installer/dist'),
	('cfa0381a','@lib/xregexp'),
	('d0b2d413','@craft/web/assets/generalsettings/dist'),
	('d7b6e863','@lib'),
	('d99d8048','@craft/web/assets/updateswidget/dist'),
	('dc6fdb8c','@lib/datepicker-i18n'),
	('e234710e','@lib/jquery.payment'),
	('e727c226','@craft/web/assets/recententries/dist'),
	('e96ca1ed','@app/web/assets/utilities/dist'),
	('ee311b5e','@verbb/supertable/resources/dist'),
	('eee48479','@craft/web/assets/updater/dist'),
	('ef9c299b','@bower/jquery/dist'),
	('f05f606f','@lib/timepicker'),
	('f20ca8c2','@app/web/assets/feed/dist'),
	('fe13dee6','@lib/velocity');

/*!40000 ALTER TABLE `resourcepaths` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table searchindex
# ------------------------------------------------------------

DROP TABLE IF EXISTS `searchindex`;

CREATE TABLE `searchindex` (
  `elementId` int(11) NOT NULL,
  `attribute` varchar(25) NOT NULL,
  `fieldId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `keywords` text NOT NULL,
  PRIMARY KEY (`elementId`,`attribute`,`fieldId`,`siteId`),
  FULLTEXT KEY `searchindex_keywords_idx` (`keywords`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `searchindex` WRITE;
/*!40000 ALTER TABLE `searchindex` DISABLE KEYS */;

INSERT INTO `searchindex` (`elementId`, `attribute`, `fieldId`, `siteId`, `keywords`)
VALUES
	(1,'username',0,1,' kirstynoble '),
	(1,'firstname',0,1,''),
	(1,'lastname',0,1,''),
	(1,'fullname',0,1,''),
	(1,'email',0,1,' kirstyannienoble kn gmail com '),
	(1,'slug',0,1,''),
	(2,'slug',0,1,' homepage '),
	(2,'title',0,1,' homepage '),
	(3,'field',1,1,' home twig '),
	(3,'slug',0,1,' __home__ '),
	(3,'title',0,1,' homepage '),
	(3,'field',2,1,' we provide a unique service to our clients contact us this is an introduction to the next page this is a text wrap block about us this is a small subtitle view featured page or casestudy view featured page or casestudy 02 testimonial 01 testimonial 02 brand logo brand logo brand logo '),
	(4,'field',3,1,' this is a featured page '),
	(4,'field',4,1,' view featured page or casestudy view featured page or casestudy 02 '),
	(4,'slug',0,1,''),
	(5,'field',5,1,' this is a text block '),
	(5,'slug',0,1,''),
	(6,'field',6,1,' this is a text wrap block '),
	(6,'slug',0,1,''),
	(7,'field',7,1,' this is a featured testimonial '),
	(7,'field',8,1,' testimonial 01 testimonial 02 '),
	(7,'slug',0,1,''),
	(6,'field',14,1,' this is a small subtitle '),
	(6,'field',15,1,' about us '),
	(6,'field',17,1,' contact us '),
	(6,'field',16,1,' this is an introduction to the next page '),
	(8,'field',18,1,' this is a quote '),
	(8,'field',19,1,' executive ceo '),
	(8,'field',20,1,' nexen '),
	(8,'slug',0,1,' testimonial 01 '),
	(8,'title',0,1,' testimonial 01 '),
	(9,'field',18,1,' this is a quote 02 '),
	(9,'field',19,1,' vice president '),
	(9,'field',20,1,' air control '),
	(9,'slug',0,1,' testimonial 02 '),
	(9,'title',0,1,' testimonial 02 '),
	(10,'field',13,1,' this is some text about the page your going to read more on next '),
	(10,'field',21,1,' homepage '),
	(10,'slug',0,1,' view featured page or casestudy '),
	(10,'title',0,1,' view featured page or casestudy '),
	(11,'slug',0,1,' about us '),
	(11,'title',0,1,' about us '),
	(12,'slug',0,1,' contact us '),
	(12,'title',0,1,' contact us '),
	(13,'field',13,1,' this is some text about the page your going to read more on next '),
	(13,'field',21,1,' homepage '),
	(13,'slug',0,1,' view featured page or casestudy 1 '),
	(13,'title',0,1,' view featured page or casestudy 02 '),
	(14,'field',23,1,''),
	(14,'field',24,1,' we provide a unique service to our clients '),
	(14,'slug',0,1,''),
	(15,'filename',0,1,' bm playbook landing jpg '),
	(15,'extension',0,1,' jpg '),
	(15,'kind',0,1,' image '),
	(15,'slug',0,1,''),
	(15,'title',0,1,' bm playbook landing '),
	(16,'filename',0,1,' nexen logo dff382cacd seeklogo com png '),
	(16,'extension',0,1,' png '),
	(16,'kind',0,1,' image '),
	(16,'slug',0,1,''),
	(16,'title',0,1,' nexen logo dff382cacd seeklogo com '),
	(17,'field',22,1,' nexen logo dff382cacd seeklogo com '),
	(17,'slug',0,1,' nexen '),
	(17,'title',0,1,' brand logo '),
	(18,'filename',0,1,' download 1 png '),
	(18,'extension',0,1,' png '),
	(18,'kind',0,1,' image '),
	(18,'slug',0,1,''),
	(18,'title',0,1,' download 1 '),
	(19,'field',22,1,' download 1 '),
	(19,'slug',0,1,' nexen 02 '),
	(19,'title',0,1,' brand logo '),
	(20,'filename',0,1,' air control entech png '),
	(20,'extension',0,1,' png '),
	(20,'kind',0,1,' image '),
	(20,'slug',0,1,''),
	(20,'title',0,1,' air control entech '),
	(21,'field',22,1,' air control entech '),
	(21,'slug',0,1,' air control '),
	(21,'title',0,1,' brand logo '),
	(22,'field',9,1,' brand logo brand logo brand logo '),
	(22,'slug',0,1,''),
	(23,'field',20,1,' integral facilities management '),
	(23,'field',35,1,' air control entech '),
	(23,'field',31,1,' contact us '),
	(23,'field',30,1,' ifm ifm 34 cameron st 34 cameron st aberdeen aberdeen ab24 5ea ab24 5ea '),
	(23,'field',18,1,''),
	(23,'slug',0,1,''),
	(24,'field',26,1,' about us about us contact us contact us '),
	(24,'field',25,1,' about us about us experience contact us get in touch contact us '),
	(24,'slug',0,1,''),
	(25,'field',27,1,' about us '),
	(25,'field',28,1,' about us '),
	(25,'field',29,1,''),
	(25,'slug',0,1,''),
	(26,'field',27,1,' contact us '),
	(26,'field',28,1,' contact us '),
	(26,'field',29,1,''),
	(26,'slug',0,1,''),
	(27,'field',33,1,' about us '),
	(27,'field',34,1,' about us '),
	(27,'field',32,1,''),
	(27,'slug',0,1,''),
	(28,'field',33,1,' experience '),
	(28,'field',34,1,' contact us '),
	(28,'field',32,1,''),
	(28,'slug',0,1,''),
	(29,'field',33,1,' get in touch '),
	(29,'field',34,1,' contact us '),
	(29,'field',32,1,''),
	(29,'slug',0,1,''),
	(23,'field',37,1,' lorem ipsum is placeholder text commonly used in the graphic print and publishing industries for previewing layouts and visual mockups '),
	(24,'field',36,1,' lorem ipsum is placeholder text commonly used in the graphic print and publishing industries for previewing layouts and visual mockups '),
	(11,'field',2,1,' everything we do is for a purpose '),
	(12,'field',2,1,''),
	(11,'field',1,1,' basic twig '),
	(12,'field',1,1,''),
	(30,'field',23,1,''),
	(30,'field',24,1,' everything we do is for a purpose '),
	(30,'slug',0,1,''),
	(11,'field',12,1,' a sample of some services we deliver on behalf of our partners '),
	(11,'field',38,1,' explore what we have to offer lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum a small subtitle about each section a summary about this page showing your clients what this section is about view featured page or casestudy view featured page or casestudy 02 '),
	(12,'field',12,1,''),
	(12,'field',38,1,''),
	(31,'field',39,1,''),
	(31,'field',40,1,' explore what we have to offer '),
	(31,'slug',0,1,''),
	(32,'field',45,1,' view featured page or casestudy view featured page or casestudy 02 '),
	(32,'slug',0,1,''),
	(33,'field',44,1,''),
	(33,'field',42,1,' a small subtitle about each section '),
	(33,'field',43,1,' lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum '),
	(33,'field',41,1,''),
	(33,'slug',0,1,''),
	(33,'field',47,1,' a summary about this page showing your clients what this section is about '),
	(34,'field',38,1,' get in touch lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum a small subtitle about each section a summary about this page showing your clients what this section is about view featured page or casestudy view featured page or casestudy 02 '),
	(34,'field',1,1,' basic twig '),
	(35,'field',39,1,''),
	(35,'field',40,1,' get in touch '),
	(35,'slug',0,1,''),
	(36,'field',47,1,' a summary about this page showing your clients what this section is about '),
	(36,'field',42,1,' a small subtitle about each section '),
	(36,'field',43,1,' lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum '),
	(36,'field',41,1,''),
	(36,'slug',0,1,''),
	(37,'field',45,1,' view featured page or casestudy view featured page or casestudy 02 '),
	(37,'slug',0,1,''),
	(34,'slug',0,1,' contact us '),
	(34,'title',0,1,' contact us ');

/*!40000 ALTER TABLE `searchindex` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sections
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sections`;

CREATE TABLE `sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `structureId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `type` enum('single','channel','structure') NOT NULL DEFAULT 'channel',
  `enableVersioning` tinyint(1) NOT NULL DEFAULT '0',
  `propagateEntries` tinyint(1) NOT NULL DEFAULT '1',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `dateDeleted` datetime DEFAULT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `sections_handle_idx` (`handle`),
  KEY `sections_name_idx` (`name`),
  KEY `sections_structureId_idx` (`structureId`),
  KEY `sections_dateDeleted_idx` (`dateDeleted`),
  CONSTRAINT `sections_structureId_fk` FOREIGN KEY (`structureId`) REFERENCES `structures` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;

INSERT INTO `sections` (`id`, `structureId`, `name`, `handle`, `type`, `enableVersioning`, `propagateEntries`, `dateCreated`, `dateUpdated`, `dateDeleted`, `uid`)
VALUES
	(1,1,'systemPages','systempages','structure',1,1,'2019-02-22 09:12:42','2019-03-03 09:10:59',NULL,'be2f020f-b422-4dde-a154-839feb00ecaa'),
	(2,2,'Testimonials','testimonials','structure',1,1,'2019-03-02 18:10:39','2019-03-02 18:11:20',NULL,'2d85ffb0-7eb6-4cea-aaa3-3484e30def07'),
	(3,3,'Casestudies','casestudies','structure',1,1,'2019-03-02 18:19:28','2019-03-02 18:22:54',NULL,'2d769319-61c4-4dde-a74f-996a0008d812'),
	(4,4,'Pages','pages','structure',1,1,'2019-03-02 18:24:54','2019-03-03 10:50:41',NULL,'0ef4f88f-2651-4511-bc2c-6072f32a76ba'),
	(5,5,'Brands','brands','structure',1,1,'2019-03-02 18:45:04','2019-03-02 19:09:08',NULL,'5c2849ef-3edb-4df8-9c06-a16fa76e340a');

/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sections_sites
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sections_sites`;

CREATE TABLE `sections_sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sectionId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `hasUrls` tinyint(1) NOT NULL DEFAULT '1',
  `uriFormat` text,
  `template` varchar(500) DEFAULT NULL,
  `enabledByDefault` tinyint(1) NOT NULL DEFAULT '1',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sections_sites_sectionId_siteId_unq_idx` (`sectionId`,`siteId`),
  KEY `sections_sites_siteId_idx` (`siteId`),
  CONSTRAINT `sections_sites_sectionId_fk` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sections_sites_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `sections_sites` WRITE;
/*!40000 ALTER TABLE `sections_sites` DISABLE KEYS */;

INSERT INTO `sections_sites` (`id`, `sectionId`, `siteId`, `hasUrls`, `uriFormat`, `template`, `enabledByDefault`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,1,1,1,'{parent.uri}/{slug}','system/selector',1,'2019-02-22 09:12:42','2019-03-03 09:10:59','3d3b3190-627a-4885-b7eb-00337fb5ee0a'),
	(2,2,1,1,'{parent.uri}/{slug}','',1,'2019-03-02 18:10:39','2019-03-02 18:11:20','446150c8-342e-4d9c-9da5-4df84a195c79'),
	(3,3,1,1,'{parent.uri}/{slug}','',1,'2019-03-02 18:19:28','2019-03-02 18:22:54','2ab72844-d76e-4d07-ae92-a060b43064e1'),
	(4,4,1,1,'{parent.uri}/{slug}','system/selector',1,'2019-03-02 18:24:54','2019-03-03 10:50:41','15809266-aad9-4265-a8b4-978c0c90fe75'),
	(5,5,1,1,'{parent.uri}/{slug}','',1,'2019-03-02 18:45:04','2019-03-02 19:09:08','1e5c417c-d44a-4431-8aa3-baadeb0279dd');

/*!40000 ALTER TABLE `sections_sites` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sequences
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sequences`;

CREATE TABLE `sequences` (
  `name` varchar(255) NOT NULL,
  `next` int(11) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `token` char(100) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `sessions_uid_idx` (`uid`),
  KEY `sessions_token_idx` (`token`),
  KEY `sessions_dateUpdated_idx` (`dateUpdated`),
  KEY `sessions_userId_idx` (`userId`),
  CONSTRAINT `sessions_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;

INSERT INTO `sessions` (`id`, `userId`, `token`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,1,'iLa2TKZaF19MwsWggnTQmQRjkYQHPJvyGvypfufgv14oF-szLtGDnD_hWzjGF8mQLuWg9uyFT8SBGLM6D5wW2QcrgP7KOMqEgb5p','2019-02-17 09:47:29','2019-02-17 10:21:07','e9a860c9-27a1-42cf-b477-d53ace3d7d7a'),
	(2,1,'hRq2uUIK8eUYrHd69JW8OICC8IBdSTvm0KzDOB_NoteC8P04Yb81D-Emu-wMljY6VTYGuzKC6Sw4whwMywWYDO3UT4VWjYYLNMPx','2019-02-22 09:11:09','2019-02-22 09:16:57','e9e4d835-17d8-430d-816c-be0530e35148'),
	(3,1,'5YIE-apuLz4Zzy0iutjA1t-XEGyd75Hcmwy_s5Xpkz-IAVcMDvg8Fo2KD0266KGfjNahfm2rPKjUkfOd5BKMASNlqhR4jPe0jl7q','2019-02-28 19:50:44','2019-02-28 20:02:31','8e747282-da02-480f-9876-b22b2b257333'),
	(4,1,'4zXhnBraDXpvWmJpId8R8x8WjqXJ2k8IG4xf2ctV_ojztgavm3uYNcKM1v0oIO-nkn-d7Ts79Z1qM_25agx1_8sgLk73YdSvkY2H','2019-03-02 13:59:57','2019-03-02 19:10:22','1696c8e2-626c-4607-ba54-7e884e5f977a'),
	(5,1,'6h750jM7bbCAjXa8Fsisx5HJ0NHF6eB24WITdrqLGnQsEQ8MSRNvxjfe9x0wEc-jjaHNN8sNEx1IgozDNvIzApvq0RDULPlJjsqb','2019-03-03 09:09:39','2019-03-03 11:09:23','b813f7fb-940d-4cae-b3ea-20ccb0de2798');

/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table shunnedmessages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `shunnedmessages`;

CREATE TABLE `shunnedmessages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `shunnedmessages_userId_message_unq_idx` (`userId`,`message`),
  CONSTRAINT `shunnedmessages_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table sitegroups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sitegroups`;

CREATE TABLE `sitegroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `dateDeleted` datetime DEFAULT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `sitegroups_name_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `sitegroups` WRITE;
/*!40000 ALTER TABLE `sitegroups` DISABLE KEYS */;

INSERT INTO `sitegroups` (`id`, `name`, `dateCreated`, `dateUpdated`, `dateDeleted`, `uid`)
VALUES
	(1,'Integral Facilities Management','2019-02-17 09:47:27','2019-02-17 09:47:27',NULL,'72b14bf3-a960-4ec5-a409-329cfe2a73e7');

/*!40000 ALTER TABLE `sitegroups` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sites
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sites`;

CREATE TABLE `sites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `language` varchar(12) NOT NULL,
  `hasUrls` tinyint(1) NOT NULL DEFAULT '0',
  `baseUrl` varchar(255) DEFAULT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `dateDeleted` datetime DEFAULT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `sites_dateDeleted_idx` (`dateDeleted`),
  KEY `sites_handle_idx` (`handle`),
  KEY `sites_sortOrder_idx` (`sortOrder`),
  KEY `sites_groupId_fk` (`groupId`),
  CONSTRAINT `sites_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `sitegroups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `sites` WRITE;
/*!40000 ALTER TABLE `sites` DISABLE KEYS */;

INSERT INTO `sites` (`id`, `groupId`, `primary`, `name`, `handle`, `language`, `hasUrls`, `baseUrl`, `sortOrder`, `dateCreated`, `dateUpdated`, `dateDeleted`, `uid`)
VALUES
	(1,1,1,'Integral Facilities Management','default','en-GB',1,'@web/',1,'2019-02-17 09:47:27','2019-03-02 14:01:08',NULL,'7eb50d00-c9e7-4576-a17e-00db53e1ee12');

/*!40000 ALTER TABLE `sites` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table stc_footernav
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stc_footernav`;

CREATE TABLE `stc_footernav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_externalLink` varchar(255) DEFAULT NULL,
  `field_headline` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_footernav_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_footernav_siteId_fk` (`siteId`),
  CONSTRAINT `stc_footernav_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_footernav_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `stc_footernav` WRITE;
/*!40000 ALTER TABLE `stc_footernav` DISABLE KEYS */;

INSERT INTO `stc_footernav` (`id`, `elementId`, `siteId`, `dateCreated`, `dateUpdated`, `uid`, `field_externalLink`, `field_headline`)
VALUES
	(1,27,1,'2019-03-03 09:50:32','2019-03-03 10:00:30','73b3bcb7-22e8-43f7-b35e-8bcee7cc4498','','About Us'),
	(2,28,1,'2019-03-03 09:52:40','2019-03-03 10:00:30','3b03cde7-fb55-4d11-8972-e7c991253755','','Experience'),
	(3,29,1,'2019-03-03 09:52:40','2019-03-03 10:00:30','ee6ae0e7-8213-4bac-a2f8-7c51efdb838f','','Get in Touch');

/*!40000 ALTER TABLE `stc_footernav` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table stc_topnavigation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stc_topnavigation`;

CREATE TABLE `stc_topnavigation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `elementId` int(11) NOT NULL,
  `siteId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  `field_headline` text,
  `field_externalLink` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stc_topnavigation_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `stc_topnavigation_siteId_fk` (`siteId`),
  CONSTRAINT `stc_topnavigation_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `stc_topnavigation_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `stc_topnavigation` WRITE;
/*!40000 ALTER TABLE `stc_topnavigation` DISABLE KEYS */;

INSERT INTO `stc_topnavigation` (`id`, `elementId`, `siteId`, `dateCreated`, `dateUpdated`, `uid`, `field_headline`, `field_externalLink`)
VALUES
	(1,25,1,'2019-03-03 09:48:30','2019-03-03 10:00:30','61fbef94-e75a-44d4-90a2-2b8abb8f9b47','About Us',''),
	(2,26,1,'2019-03-03 09:48:30','2019-03-03 10:00:30','0fc3d401-6ea0-4305-8e6d-b44dbd567506','Contact Us','');

/*!40000 ALTER TABLE `stc_topnavigation` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table structureelements
# ------------------------------------------------------------

DROP TABLE IF EXISTS `structureelements`;

CREATE TABLE `structureelements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `structureId` int(11) NOT NULL,
  `elementId` int(11) DEFAULT NULL,
  `root` int(11) unsigned DEFAULT NULL,
  `lft` int(11) unsigned NOT NULL,
  `rgt` int(11) unsigned NOT NULL,
  `level` smallint(6) unsigned NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `structureelements_structureId_elementId_unq_idx` (`structureId`,`elementId`),
  KEY `structureelements_root_idx` (`root`),
  KEY `structureelements_lft_idx` (`lft`),
  KEY `structureelements_rgt_idx` (`rgt`),
  KEY `structureelements_level_idx` (`level`),
  KEY `structureelements_elementId_idx` (`elementId`),
  CONSTRAINT `structureelements_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `structureelements_structureId_fk` FOREIGN KEY (`structureId`) REFERENCES `structures` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `structureelements` WRITE;
/*!40000 ALTER TABLE `structureelements` DISABLE KEYS */;

INSERT INTO `structureelements` (`id`, `structureId`, `elementId`, `root`, `lft`, `rgt`, `level`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,1,NULL,1,1,4,0,'2019-02-22 09:13:47','2019-02-28 20:01:59','282c1dde-ae2d-4205-a551-4cf724484e22'),
	(3,1,3,1,2,3,1,'2019-02-28 20:01:36','2019-02-28 20:01:59','779e8230-7459-427b-bcbf-153df29f63f5'),
	(4,2,NULL,4,1,6,0,'2019-03-02 18:12:20','2019-03-02 18:12:59','69f04525-8cd5-4207-8bb9-f4c92e23bb89'),
	(5,2,8,4,2,3,1,'2019-03-02 18:12:20','2019-03-02 18:12:20','55cc1c00-88f2-4916-afed-dae4d767cba7'),
	(6,2,9,4,4,5,1,'2019-03-02 18:12:59','2019-03-02 18:12:59','67cf87a0-2e7f-40ce-a7b5-90bca638114d'),
	(7,3,NULL,7,1,6,0,'2019-03-02 18:24:00','2019-03-02 18:26:03','55695718-119b-4129-8ebb-cad9838f5830'),
	(8,3,10,7,2,3,1,'2019-03-02 18:24:00','2019-03-02 18:24:00','6bee01a3-2cb1-4d64-ab24-24982c2fbc4a'),
	(9,4,NULL,9,1,6,0,'2019-03-02 18:25:05','2019-03-03 10:56:53','4c126a3a-a309-4277-ac13-01b53611291b'),
	(10,4,11,9,2,3,1,'2019-03-02 18:25:05','2019-03-02 18:25:05','d5181ec9-f092-4939-a0a5-9df062ca529d'),
	(12,3,13,7,4,5,1,'2019-03-02 18:26:03','2019-03-02 18:26:03','2278a701-8a6d-4600-a8b4-013cd10f5284'),
	(13,5,NULL,13,1,8,0,'2019-03-02 19:09:08','2019-03-02 19:09:08','7cadb7f9-bb58-47cf-90b7-585ed9438035'),
	(14,5,17,13,2,3,1,'2019-03-02 19:09:08','2019-03-02 19:09:08','e270e9a2-2dcc-478b-91d3-10ecb423f25e'),
	(15,5,19,13,4,5,1,'2019-03-02 19:09:08','2019-03-02 19:09:08','dc0f48d1-1cd3-4793-a856-c715adfce25f'),
	(16,5,21,13,6,7,1,'2019-03-02 19:09:08','2019-03-02 19:09:08','6f14e2a0-bae9-45e0-ad0f-00d25f5d183e'),
	(17,4,34,9,4,5,1,'2019-03-03 10:56:19','2019-03-03 10:56:19','4de725f5-2fc3-4d8e-a6db-3533b5fe5851');

/*!40000 ALTER TABLE `structureelements` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table structures
# ------------------------------------------------------------

DROP TABLE IF EXISTS `structures`;

CREATE TABLE `structures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `maxLevels` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `dateDeleted` datetime DEFAULT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `structures_dateDeleted_idx` (`dateDeleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `structures` WRITE;
/*!40000 ALTER TABLE `structures` DISABLE KEYS */;

INSERT INTO `structures` (`id`, `maxLevels`, `dateCreated`, `dateUpdated`, `dateDeleted`, `uid`)
VALUES
	(1,2,'2019-02-22 09:12:42','2019-03-03 09:10:59',NULL,'c0703e07-3178-4f89-a0b2-511e136b9913'),
	(2,NULL,'2019-03-02 18:10:39','2019-03-02 18:11:20',NULL,'50c32860-a905-4442-b5e6-8ac520182bbe'),
	(3,NULL,'2019-03-02 18:19:28','2019-03-02 18:22:54',NULL,'92696fca-7d3c-41a3-8d7e-ce1e263b4081'),
	(4,NULL,'2019-03-02 18:24:54','2019-03-03 10:50:41',NULL,'58bd467b-57e4-4d90-8e08-8e19663f5d6a'),
	(5,1,'2019-03-02 19:09:08','2019-03-02 19:09:08',NULL,'180077ef-b47f-4e20-99d6-cc7419fcc89f');

/*!40000 ALTER TABLE `structures` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table supertableblocks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `supertableblocks`;

CREATE TABLE `supertableblocks` (
  `id` int(11) NOT NULL,
  `ownerId` int(11) NOT NULL,
  `ownerSiteId` int(11) DEFAULT NULL,
  `fieldId` int(11) NOT NULL,
  `typeId` int(11) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `deletedWithOwner` tinyint(1) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `supertableblocks_ownerId_idx` (`ownerId`),
  KEY `supertableblocks_fieldId_idx` (`fieldId`),
  KEY `supertableblocks_typeId_idx` (`typeId`),
  KEY `supertableblocks_sortOrder_idx` (`sortOrder`),
  KEY `supertableblocks_ownerSiteId_idx` (`ownerSiteId`),
  CONSTRAINT `supertableblocks_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `supertableblocks_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `supertableblocks_ownerId_fk` FOREIGN KEY (`ownerId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `supertableblocks_ownerSiteId_fk` FOREIGN KEY (`ownerSiteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `supertableblocks_typeId_fk` FOREIGN KEY (`typeId`) REFERENCES `supertableblocktypes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `supertableblocks` WRITE;
/*!40000 ALTER TABLE `supertableblocks` DISABLE KEYS */;

INSERT INTO `supertableblocks` (`id`, `ownerId`, `ownerSiteId`, `fieldId`, `typeId`, `sortOrder`, `deletedWithOwner`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(25,24,NULL,26,1,1,NULL,'2019-03-03 09:48:30','2019-03-03 10:00:30','38489fd6-05cd-4395-805b-f67471924ed3'),
	(26,24,NULL,26,1,2,NULL,'2019-03-03 09:48:30','2019-03-03 10:00:30','b82079ed-416f-4fae-8359-9fe373b62051'),
	(27,24,NULL,25,2,1,NULL,'2019-03-03 09:50:32','2019-03-03 10:00:30','9fd613c9-70e1-4e79-8add-67b408d98c12'),
	(28,24,NULL,25,2,2,NULL,'2019-03-03 09:52:40','2019-03-03 10:00:30','3a37e376-70e3-40bc-b569-76515a27ac27'),
	(29,24,NULL,25,2,3,NULL,'2019-03-03 09:52:40','2019-03-03 10:00:30','5dce5e92-6041-4a4e-9a7b-d900b5c11fee');

/*!40000 ALTER TABLE `supertableblocks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table supertableblocktypes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `supertableblocktypes`;

CREATE TABLE `supertableblocktypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldId` int(11) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `supertableblocktypes_fieldId_idx` (`fieldId`),
  KEY `supertableblocktypes_fieldLayoutId_idx` (`fieldLayoutId`),
  CONSTRAINT `supertableblocktypes_fieldId_fk` FOREIGN KEY (`fieldId`) REFERENCES `fields` (`id`) ON DELETE CASCADE,
  CONSTRAINT `supertableblocktypes_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `supertableblocktypes` WRITE;
/*!40000 ALTER TABLE `supertableblocktypes` DISABLE KEYS */;

INSERT INTO `supertableblocktypes` (`id`, `fieldId`, `fieldLayoutId`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,26,12,'2019-03-03 09:27:31','2019-03-03 09:27:31','1accb184-1bfa-491d-a147-6f917d90b415'),
	(2,25,13,'2019-03-03 09:34:33','2019-03-03 09:53:02','09e6a797-a6f6-4bfd-b8cf-3117290f2de6');

/*!40000 ALTER TABLE `supertableblocktypes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table systemmessages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `systemmessages`;

CREATE TABLE `systemmessages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language` varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL,
  `subject` text NOT NULL,
  `body` text NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `systemmessages_key_language_unq_idx` (`key`,`language`),
  KEY `systemmessages_language_idx` (`language`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table taggroups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `taggroups`;

CREATE TABLE `taggroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `dateDeleted` datetime DEFAULT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `taggroups_name_idx` (`name`),
  KEY `taggroups_handle_idx` (`handle`),
  KEY `taggroups_dateDeleted_idx` (`dateDeleted`),
  KEY `taggroups_fieldLayoutId_fk` (`fieldLayoutId`),
  CONSTRAINT `taggroups_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `deletedWithGroup` tinyint(1) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `tags_groupId_idx` (`groupId`),
  CONSTRAINT `tags_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `taggroups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tags_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table templatecacheelements
# ------------------------------------------------------------

DROP TABLE IF EXISTS `templatecacheelements`;

CREATE TABLE `templatecacheelements` (
  `cacheId` int(11) NOT NULL,
  `elementId` int(11) NOT NULL,
  KEY `templatecacheelements_cacheId_idx` (`cacheId`),
  KEY `templatecacheelements_elementId_idx` (`elementId`),
  CONSTRAINT `templatecacheelements_cacheId_fk` FOREIGN KEY (`cacheId`) REFERENCES `templatecaches` (`id`) ON DELETE CASCADE,
  CONSTRAINT `templatecacheelements_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table templatecachequeries
# ------------------------------------------------------------

DROP TABLE IF EXISTS `templatecachequeries`;

CREATE TABLE `templatecachequeries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cacheId` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `query` longtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `templatecachequeries_cacheId_idx` (`cacheId`),
  KEY `templatecachequeries_type_idx` (`type`),
  CONSTRAINT `templatecachequeries_cacheId_fk` FOREIGN KEY (`cacheId`) REFERENCES `templatecaches` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table templatecaches
# ------------------------------------------------------------

DROP TABLE IF EXISTS `templatecaches`;

CREATE TABLE `templatecaches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `siteId` int(11) NOT NULL,
  `cacheKey` varchar(255) NOT NULL,
  `path` varchar(255) DEFAULT NULL,
  `expiryDate` datetime NOT NULL,
  `body` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `templatecaches_cacheKey_siteId_expiryDate_path_idx` (`cacheKey`,`siteId`,`expiryDate`,`path`),
  KEY `templatecaches_cacheKey_siteId_expiryDate_idx` (`cacheKey`,`siteId`,`expiryDate`),
  KEY `templatecaches_siteId_idx` (`siteId`),
  CONSTRAINT `templatecaches_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` char(32) NOT NULL,
  `route` text,
  `usageLimit` tinyint(3) unsigned DEFAULT NULL,
  `usageCount` tinyint(3) unsigned DEFAULT NULL,
  `expiryDate` datetime NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_token_unq_idx` (`token`),
  KEY `tokens_expiryDate_idx` (`expiryDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table usergroups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `usergroups`;

CREATE TABLE `usergroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usergroups_handle_unq_idx` (`handle`),
  UNIQUE KEY `usergroups_name_unq_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table usergroups_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `usergroups_users`;

CREATE TABLE `usergroups_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usergroups_users_groupId_userId_unq_idx` (`groupId`,`userId`),
  KEY `usergroups_users_userId_idx` (`userId`),
  CONSTRAINT `usergroups_users_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `usergroups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `usergroups_users_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table userpermissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userpermissions`;

CREATE TABLE `userpermissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userpermissions_name_unq_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table userpermissions_usergroups
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userpermissions_usergroups`;

CREATE TABLE `userpermissions_usergroups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permissionId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userpermissions_usergroups_permissionId_groupId_unq_idx` (`permissionId`,`groupId`),
  KEY `userpermissions_usergroups_groupId_idx` (`groupId`),
  CONSTRAINT `userpermissions_usergroups_groupId_fk` FOREIGN KEY (`groupId`) REFERENCES `usergroups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userpermissions_usergroups_permissionId_fk` FOREIGN KEY (`permissionId`) REFERENCES `userpermissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table userpermissions_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userpermissions_users`;

CREATE TABLE `userpermissions_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permissionId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userpermissions_users_permissionId_userId_unq_idx` (`permissionId`,`userId`),
  KEY `userpermissions_users_userId_idx` (`userId`),
  CONSTRAINT `userpermissions_users_permissionId_fk` FOREIGN KEY (`permissionId`) REFERENCES `userpermissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `userpermissions_users_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table userpreferences
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userpreferences`;

CREATE TABLE `userpreferences` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `preferences` text,
  PRIMARY KEY (`userId`),
  CONSTRAINT `userpreferences_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `userpreferences` WRITE;
/*!40000 ALTER TABLE `userpreferences` DISABLE KEYS */;

INSERT INTO `userpreferences` (`userId`, `preferences`)
VALUES
	(1,'{\"language\":\"en-GB\"}');

/*!40000 ALTER TABLE `userpreferences` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `photoId` int(11) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `locked` tinyint(1) NOT NULL DEFAULT '0',
  `suspended` tinyint(1) NOT NULL DEFAULT '0',
  `pending` tinyint(1) NOT NULL DEFAULT '0',
  `lastLoginDate` datetime DEFAULT NULL,
  `lastLoginAttemptIp` varchar(45) DEFAULT NULL,
  `invalidLoginWindowStart` datetime DEFAULT NULL,
  `invalidLoginCount` tinyint(3) unsigned DEFAULT NULL,
  `lastInvalidLoginDate` datetime DEFAULT NULL,
  `lockoutDate` datetime DEFAULT NULL,
  `hasDashboard` tinyint(1) NOT NULL DEFAULT '0',
  `verificationCode` varchar(255) DEFAULT NULL,
  `verificationCodeIssuedDate` datetime DEFAULT NULL,
  `unverifiedEmail` varchar(255) DEFAULT NULL,
  `passwordResetRequired` tinyint(1) NOT NULL DEFAULT '0',
  `lastPasswordChangeDate` datetime DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `users_uid_idx` (`uid`),
  KEY `users_verificationCode_idx` (`verificationCode`),
  KEY `users_email_idx` (`email`),
  KEY `users_username_idx` (`username`),
  KEY `users_photoId_fk` (`photoId`),
  CONSTRAINT `users_id_fk` FOREIGN KEY (`id`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_photoId_fk` FOREIGN KEY (`photoId`) REFERENCES `assets` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `photoId`, `firstName`, `lastName`, `email`, `password`, `admin`, `locked`, `suspended`, `pending`, `lastLoginDate`, `lastLoginAttemptIp`, `invalidLoginWindowStart`, `invalidLoginCount`, `lastInvalidLoginDate`, `lockoutDate`, `hasDashboard`, `verificationCode`, `verificationCodeIssuedDate`, `unverifiedEmail`, `passwordResetRequired`, `lastPasswordChangeDate`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,'kirstynoble',NULL,NULL,NULL,'kirstyannienoble.kn@gmail.com','$2y$13$Y.WIfLcjSLVWBBeY5vFyLeTB17qVmol.ha10FUCq19bQIme7BNMd2',1,0,0,0,'2019-03-03 09:09:39',NULL,NULL,NULL,'2019-02-22 09:10:59',NULL,1,NULL,NULL,NULL,0,'2019-02-17 09:47:29','2019-02-17 09:47:29','2019-03-03 09:09:39','f2449b02-53b9-4670-b72f-674d12e28535');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table volumefolders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `volumefolders`;

CREATE TABLE `volumefolders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) DEFAULT NULL,
  `volumeId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `volumefolders_name_parentId_volumeId_unq_idx` (`name`,`parentId`,`volumeId`),
  KEY `volumefolders_parentId_idx` (`parentId`),
  KEY `volumefolders_volumeId_idx` (`volumeId`),
  CONSTRAINT `volumefolders_parentId_fk` FOREIGN KEY (`parentId`) REFERENCES `volumefolders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `volumefolders_volumeId_fk` FOREIGN KEY (`volumeId`) REFERENCES `volumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `volumefolders` WRITE;
/*!40000 ALTER TABLE `volumefolders` DISABLE KEYS */;

INSERT INTO `volumefolders` (`id`, `parentId`, `volumeId`, `name`, `path`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,NULL,1,'Local Files','','2019-03-02 18:42:21','2019-03-02 18:42:21','a0ce0fef-fb78-4b53-a985-e7ed671f2e90'),
	(2,NULL,NULL,'Temporary source',NULL,'2019-03-02 18:43:02','2019-03-02 18:43:02','28bc3014-f2cc-4bde-bfe0-466c537a4e98'),
	(3,2,NULL,'user_1','user_1/','2019-03-02 18:43:02','2019-03-02 18:43:02','b94bc028-17c3-4f29-86cb-9db46cced5a8');

/*!40000 ALTER TABLE `volumefolders` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table volumes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `volumes`;

CREATE TABLE `volumes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fieldLayoutId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `hasUrls` tinyint(1) NOT NULL DEFAULT '1',
  `url` varchar(255) DEFAULT NULL,
  `settings` text,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `dateDeleted` datetime DEFAULT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `volumes_name_idx` (`name`),
  KEY `volumes_handle_idx` (`handle`),
  KEY `volumes_fieldLayoutId_idx` (`fieldLayoutId`),
  KEY `volumes_dateDeleted_idx` (`dateDeleted`),
  CONSTRAINT `volumes_fieldLayoutId_fk` FOREIGN KEY (`fieldLayoutId`) REFERENCES `fieldlayouts` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `volumes` WRITE;
/*!40000 ALTER TABLE `volumes` DISABLE KEYS */;

INSERT INTO `volumes` (`id`, `fieldLayoutId`, `name`, `handle`, `type`, `hasUrls`, `url`, `settings`, `sortOrder`, `dateCreated`, `dateUpdated`, `dateDeleted`, `uid`)
VALUES
	(1,NULL,'Local Files','localFiles','craft\\volumes\\Local',1,'@web/assets/img','{\"path\":\"@webroot/assets/img\"}',1,'2019-03-02 18:42:21','2019-03-02 18:42:21',NULL,'70db4512-0393-49dc-a825-9e4c73bb2141');

/*!40000 ALTER TABLE `volumes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table widgets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `widgets`;

CREATE TABLE `widgets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `sortOrder` smallint(6) unsigned DEFAULT NULL,
  `colspan` tinyint(3) DEFAULT NULL,
  `settings` text,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `dateCreated` datetime NOT NULL,
  `dateUpdated` datetime NOT NULL,
  `uid` char(36) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `widgets_userId_idx` (`userId`),
  CONSTRAINT `widgets_userId_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `widgets` WRITE;
/*!40000 ALTER TABLE `widgets` DISABLE KEYS */;

INSERT INTO `widgets` (`id`, `userId`, `type`, `sortOrder`, `colspan`, `settings`, `enabled`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,1,'craft\\widgets\\RecentEntries',1,NULL,'{\"section\":\"*\",\"siteId\":\"1\",\"limit\":10}',1,'2019-02-17 09:47:31','2019-02-17 09:47:31','2e83ca68-ad42-4b2a-b066-e68894517c50'),
	(2,1,'craft\\widgets\\CraftSupport',2,NULL,'[]',1,'2019-02-17 09:47:31','2019-02-17 09:47:31','0f52f544-1817-4485-baef-29c1dc72306b'),
	(3,1,'craft\\widgets\\Updates',3,NULL,'[]',1,'2019-02-17 09:47:31','2019-02-17 09:47:31','9891e4f2-3792-4689-aa92-1bc9a8d2b928'),
	(4,1,'craft\\widgets\\Feed',4,NULL,'{\"url\":\"https://craftcms.com/news.rss\",\"title\":\"Craft News\",\"limit\":5}',1,'2019-02-17 09:47:31','2019-02-17 09:47:31','403c6170-f3f8-4884-81bc-c6a2de382b17');

/*!40000 ALTER TABLE `widgets` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
