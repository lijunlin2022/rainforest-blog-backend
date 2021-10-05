const mongoose = require('mongoose')
const { MONGODB_CONF } = require('../conf/db.js')
const { host, port, database } = MONGODB_CONF

mongoose.connect(`mongodb://${host}:${port}/${database}`)

const conn = mongoose.connection

conn.on('error', () => {
  console.log('连接 MongoDB 出错')
})

conn.on('open', () => {
  console.log('连接 MongoDB 成功')
})
