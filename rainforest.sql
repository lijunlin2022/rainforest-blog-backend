CREATE DATABASE `rainforest`;
USE `rainforest`;

CREATE TABLE `notebooks`(
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(255),
  `description` VARCHAR(3000),
  `updated_time` BIGINT(20),
  `created_time` BIGINT(20),
  PRIMARY KEY(id)
);

CREATE TABLE `notes`(
  `id` INT AUTO_INCREMENT NOT NULL,
  `notebook_id` INT NOT NULL,
  `title` VARCHAR(255),
  `abstract` VARCHAR(3000),
  `content` TEXT,
  `updated_time` BIGINT(20),
  `created_time` BIGINT(20),
  `author` VARCHAR(255),
  PRIMARY KEY(id)
);

CREATE TABLE users(
  id INT AUTO_INCREMENT NOT NULL,
  username VARCHAR(255),
  `password` VARCHAR(255),
  realname VARCHAR(255),
  PRIMARY KEY(id)
);

CREATE TABLE whimsies(
  id INT AUTO_INCREMENT NOT NULL,
  `content` VARCHAR(3000),
  `updeted_time` BIGINT(20),
  `created_time` BIGINT(20),
  PRIMARY KEY(id)
);

INSERT INTO `notebooks` VALUES (NULL, "PAGES", "PAGES 为 Rainforest Blog 默认 Notebook", 1625068317105, 1625068317105);
INSERT INTO `notes` VALUES (NULL, 1, "README", "PAGES Notebook 的 README", "# README", 1625068317105, 1625068317105, "rainforest");
INSERT INTO `notes` VALUES (NULL, 1, "PROFILE", "PROFILE 为 Rainforest Blog 默认 Note, 将展示在首页", "# 欢迎访问 Rainforest Blog", 1625068317105, 1625068317105, "rainforest");