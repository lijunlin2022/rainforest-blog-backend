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

CREATE TABLE `blogs`(
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

INSERT INTO `notebooks` VALUES (NULL, "pages", "默认创建的数据库, 里面的文章会展示在博客导航栏", 1625068317105, 1625068317105);