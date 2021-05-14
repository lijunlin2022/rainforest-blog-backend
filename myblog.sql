CREATE DATABASE myblog;
USE myblog;
CREATE TABLE blogs(
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(255),
  abstract VARCHAR(3000),
  cover VARCHAR(1000),
  content TEXT,
  createtime BIGINT(20),
  author VARCHAR(255),
  hot TINYINT(1),
  PRIMARY KEY(id)
);

CREATE TABLE users(
  id INT AUTO_INCREMENT NOT NULL,
  username VARCHAR(255),
  `password` VARCHAR(255),
  realname VARCHAR(255),
  PRIMARY KEY(id)
);