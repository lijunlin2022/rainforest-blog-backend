const mongoose = require('mongoose')

const dirSchema = mongoose.Schema({
  dirName: String,
  dirType: {
    type: Number,           // 文件夹类型: 0: repository(仓库), 1: directory(仓库中的普通文件夹)
    default: 0
  },
  description: String,
  pDirId: {
    type: String,
    default: ''
  },
  pDirName: {
    type: String,
    default: ''
  },
  state: {
    type: Number,           // 删除类型: 0 -> 未删除; 1 -> 回收箱; 2 -> 完全删除 
    default: 0
  },
  viewed: {                 // 阅读次数
    type: Number,
    default: 0
  },
  'createTime': {
    type: Date,
    default: Date.now()
  },
  'updateTime': {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('dirs', dirSchema, 'dirs')
 