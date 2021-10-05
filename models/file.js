const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
  filename: {
    type: String,
    default: 'README'
  },
  fileType: {
    type: Number,           // 文件夹类型: 0: README, 1: article 文章
    default: 0
  },
  abstract: {
    type: String,
    default: 'There is no abstract'
  },
  content: {
    type: String,
    default: 'There is no content'
  },
  pDirId: {
    type: String,
    default: ''
  },
  pDirName: {
    type: String,
    default: ''
  },
  state: {
    type: Number,         // 删除类型: 0 -> 未删除; 1 -> 回收箱; 2 -> 完全删除;
    default: 0
  },
  viewed: {               // 阅读次数
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

module.exports = mongoose.model('files', fileSchema, 'files')
 