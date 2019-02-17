# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.38)
# Database: local_cr_ifm
# Generation Time: 2019-02-17 10:01:48 +0000
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_elementId_siteId_unq_idx` (`elementId`,`siteId`),
  KEY `content_siteId_idx` (`siteId`),
  KEY `content_title_idx` (`title`),
  CONSTRAINT `content_elementId_fk` FOREIGN KEY (`elementId`) REFERENCES `elements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `content_siteId_fk` FOREIGN KEY (`siteId`) REFERENCES `sites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;

INSERT INTO `content` (`id`, `elementId`, `siteId`, `title`, `dateCreated`, `dateUpdated`, `uid`)
VALUES
	(1,1,1,NULL,'2019-02-17 09:47:27','2019-02-17 09:47:27','9d34006a-9d17-454f-8725-58dc1f6df34b');

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
	(1,NULL,'craft\\elements\\User',1,0,'2019-02-17 09:47:27','2019-02-17 09:47:27',NULL,'2e9a17cf-1135-4e3f-9c1c-0203dad04eb2');

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
	(1,1,1,NULL,NULL,1,'2019-02-17 09:47:27','2019-02-17 09:47:27','3cdce333-4258-485c-a7fa-1c9475facf6e');

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
	(1,'Common','2019-02-17 09:47:27','2019-02-17 09:47:27','5feb4ed7-1fcd-4451-90e6-3ce4ae865a32');

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
	(1,'3.1.12','3.1.25',0,'a:6:{s:11:\"fieldGroups\";a:1:{s:36:\"5feb4ed7-1fcd-4451-90e6-3ce4ae865a32\";a:1:{s:4:\"name\";s:6:\"Common\";}}s:5:\"email\";a:3:{s:9:\"fromEmail\";s:29:\"kirstyannienoble.kn@gmail.com\";s:8:\"fromName\";s:30:\"Integral Facilities Management\";s:13:\"transportType\";s:37:\"craft\\mail\\transportadapters\\Sendmail\";}s:10:\"siteGroups\";a:1:{s:36:\"72b14bf3-a960-4ec5-a409-329cfe2a73e7\";a:1:{s:4:\"name\";s:30:\"Integral Facilities Management\";}}s:5:\"sites\";a:1:{s:36:\"7eb50d00-c9e7-4576-a17e-00db53e1ee12\";a:8:{s:7:\"baseUrl\";s:17:\"$DEFAULT_SITE_URL\";s:6:\"handle\";s:7:\"default\";s:7:\"hasUrls\";b:1;s:8:\"language\";s:5:\"en-GB\";s:4:\"name\";s:30:\"Integral Facilities Management\";s:7:\"primary\";b:1;s:9:\"siteGroup\";s:36:\"72b14bf3-a960-4ec5-a409-329cfe2a73e7\";s:9:\"sortOrder\";i:1;}}s:6:\"system\";a:5:{s:7:\"edition\";s:4:\"solo\";s:4:\"name\";s:30:\"Integral Facilities Management\";s:4:\"live\";b:1;s:13:\"schemaVersion\";s:6:\"3.1.25\";s:8:\"timeZone\";s:19:\"America/Los_Angeles\";}s:5:\"users\";a:5:{s:24:\"requireEmailVerification\";b:1;s:23:\"allowPublicRegistration\";b:0;s:12:\"defaultGroup\";N;s:14:\"photoVolumeUid\";N;s:12:\"photoSubpath\";s:0:\"\";}}','{\"fieldGroups\":\"@config/project.yaml\",\"email\":\"@config/project.yaml\",\"siteGroups\":\"@config/project.yaml\",\"sites\":\"@config/project.yaml\",\"system\":\"@config/project.yaml\",\"users\":\"@config/project.yaml\"}','7tiFKYOIF9n1','2019-02-17 09:47:27','2019-02-17 09:47:29','f93c4b3a-f6ca-4a31-bb1b-c4fce6133ca6');

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
	(135,NULL,'app','m190218_143000_element_index_settings_uid','2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:29','90434d66-c9cd-4224-9d1d-67c8e3041d8b');

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
	('2eeb9f84','@lib/datepicker-i18n'),
	('37483898','@lib/selectize'),
	('3d247c12','@lib/xregexp'),
	('481aad30','@app/web/assets/dashboard/dist'),
	('4b68f6f5','@lib/fabric'),
	('57e76241','@app/web/assets/updates/dist'),
	('5e2e22cb','@lib/garnishjs'),
	('6336151c','@lib/picturefill'),
	('649229de','@lib/jquery-touch-events'),
	('6d93354d','@lib/d3'),
	('7bde14e2','@lib/fileupload'),
	('8b17e37c','@app/web/assets/cp/dist'),
	('902fae57','@app/web/assets/pluginstore/dist'),
	('965ac4f1','@app/web/assets/recententries/dist'),
	('a6722a5e','@app/web/assets/craftsupport/dist'),
	('a8e0869f','@app/web/assets/updateswidget/dist'),
	('b0ba4543','@lib/jquery-ui'),
	('bee2c2f1','@app/web/assets/installer/dist'),
	('c00c826e','@lib/element-resize-detector'),
	('d7b6e863','@lib'),
	('e234710e','@lib/jquery.payment'),
	('e96ca1ed','@app/web/assets/utilities/dist'),
	('ef9c299b','@bower/jquery/dist'),
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
	(1,'slug',0,1,'');

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
	(1,1,'iLa2TKZaF19MwsWggnTQmQRjkYQHPJvyGvypfufgv14oF-szLtGDnD_hWzjGF8mQLuWg9uyFT8SBGLM6D5wW2QcrgP7KOMqEgb5p','2019-02-17 09:47:29','2019-02-17 09:59:27','e9a860c9-27a1-42cf-b477-d53ace3d7d7a');

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
	(1,1,1,'Integral Facilities Management','default','en-GB',1,'$DEFAULT_SITE_URL',1,'2019-02-17 09:47:27','2019-02-17 09:47:27',NULL,'7eb50d00-c9e7-4576-a17e-00db53e1ee12');

/*!40000 ALTER TABLE `sites` ENABLE KEYS */;
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
	(1,'kirstynoble',NULL,NULL,NULL,'kirstyannienoble.kn@gmail.com','$2y$13$Y.WIfLcjSLVWBBeY5vFyLeTB17qVmol.ha10FUCq19bQIme7BNMd2',1,0,0,0,'2019-02-17 09:47:29',NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,0,'2019-02-17 09:47:29','2019-02-17 09:47:29','2019-02-17 09:47:31','f2449b02-53b9-4670-b72f-674d12e28535');

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
