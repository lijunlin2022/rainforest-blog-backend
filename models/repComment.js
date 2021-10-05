const mongoose = require('mongoose')

const repCommentSchema = mongoose.Schema({
  repId: String,        // 仓库(顶层文件夹的 id)
  content: String,
  userId: String,
  username: String,
  email: String,
  picture: {
    type: String,
    default: "https://gitee.com/Li-Jun-Lin/figure/raw/master/avater/tutu.png"
  },
  likeNum: {            // 点赞
    type: Number,
    default: 0
  },
  replyNum: {           // 回复数量
    type: Number,
    default: 0
  },
  state: {
    type: Number,       // 0 没有被删除, 1 被删除
    default: 0
  },
  pCmtId: {
    type: String,
    default: ""
  },
  createTime: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('repComments', repCommentSchema, "repComments")
