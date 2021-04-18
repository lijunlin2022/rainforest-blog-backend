# rainforest-blog-backend

## 计划

目前打算开发一个使用 Koa2 + Vue 的博客。这里是后端。

准备使用的技术栈：

* Koa2
* Redis
* MySql
* Koa-morgan

开发时环境：cross-env + nodemon

上线时环境：cross-env + pm2

目前先仅仅实现简单功能，之后再添加新功能

blogs:

| id   | title        | abstract      | cover         | content | createtime | author      |
| ---- | ------------ | ------------- | ------------- | ------- | ---------- | ----------- |
| int  | varchar(255) | varchar(3000) | varchar(1000) | text    | bigint(20) | varchar(32) |

users:

| id   | username     | password     | realname     |
| ---- | ------------ | ------------ | ------------ |
| int  | varchar(255) | varchar(255) | varchar(255) |

## 规范：

与 Git 相关的各类基本的输入文本（**尤其是提交消息 Commit Message**），均使用**英语**。

Pull Request、Issue 等其他相关复杂的消息和文本不加限制。

README文档、代码开发文档、软件使用文档及其他项目相关的实用文档不加限制提交消息

（Commit Message）规则基本的提交消息格式如下：

`$ git commit -m "[<type>] <commit message>"`其中，`<type>`的内容有如下选择：

* feat：说明该次提交添加（修改）了某个（某些）功能。

  ```shell
  $ git commit -m "[feat] Add some new features"
  ```
  
* docs：说明该次提交添加（修改）了某个（某些）文档

  ```shell
  $ git commit -m "[docs] Update README.md"
  ```

* fix：说明该次提交修改了某个（某些）功能存在的 Bug

  ```shell
  $ git commit -m "[fix] ..."
  ```

* refactor：说明该次提交进行了某个（某些）代码的重构

  ```shell
  $ git commit -m "[refactor] Refactor some codes or files
  ```

* chore：说明该次提交进行了构建过程的改变、依赖库或辅助工具的变更

  ```shell
  $ git commit -m "[chore] Configure PM2 to package.json"
  ```

* merge：说明该次提交进行了分支的合并
  
```shell
  $ git commit -m "[merge] Merge from dev-zsb to dev"
```

