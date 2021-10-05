const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  "username": String,
  "password": String,     // 密码, 需要 MD5 加密
  "email": String,
  "gender": Number,       // 性别, 0: 男, 1: 女, 2: 保密
  "role": {               // 角色, 0: 管理员, 1: 普通用户
    type: Number,
    default: 1
  },
  "createTime": {
    type: Date,
    default: Date.now()
  },
  "updateTime": {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('users', userSchema, "users")
