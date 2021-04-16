CREATE DATABASE myblog;
USE myblog;
CREATE TABLE blogs(
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(255),
  abstract VARCHAR(3000),
  content VARCHAR(10000),
  createtime BIGINT(20),
  author VARCHAR(255),
  PRIMARY KEY(id)
);

CREATE TABLE users(
  id INT AUTO_INCREMENT NOT NULL,
  username VARCHAR(255),
  `password` VARCHAR(255),
  realname VARCHAR(255),
  PRIMARY KEY(id)
);

INSERT INTO blogs VALUES(1, '测试标题1', '测试摘要1', '测试内容1', 1617099756042, '测试作者1');
INSERT INTO blogs VALUES(2, '测试标题2', '测试摘要2', '测试内容2', 1617099802160, '测试作者2');