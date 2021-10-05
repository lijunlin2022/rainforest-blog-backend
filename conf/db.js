const env = process.env.NODE_ENV // 环境参数

// 配置
let MYSQL_CONF = null
let REDIS_CONF = null
let MONGODB_CONF = null

if (env === 'dev') {
  MYSQL_CONF = {
    database: 'rainforest',
    host: 'localhost',
    password: '123456',
    port: '3306',
    user: 'root'
  }
  REDIS_CONF = {
    host: 'localhost',
    port: '6379'
  }
  MONGODB_CONF = {
    database: 'rainforest',
    host: 'localhost',
    port: '27017'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    database: 'rainforest',
    host: 'localhost',
    password: 'tencent-cloud-server-123456',
    port: '3306',
    user: 'root'
  }
  REDIS_CONF = {
    host: 'localhost',
    port: '6379'
  }
  MONGODB_CONF = {
    database: 'rainforest',
    host: 'localhost',
    port: '27017'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
  MONGODB_CONF
}
