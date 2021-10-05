/**
 * 评论模块
 */
const router = require('koa-router')()
const RepComment = require('../models/repComment.js')
const util = require('../utils/index.js')
const { isRepComment, isRepository } = require('../utils/isExisted.js')

router.prefix('/repComment')

// 增加
router.post('/add', async (ctx) => {
  try {
    const { repId, content, userId, username, email, picture, pCmtId } = ctx.request.body
    const repComment = new RepComment({
      repId,
      content,
      userId,
      username,
      email,
      picture,
      pCmtId
    })

    // 判断是否是顶层文件夹
    if (await isRepository(repId) === false) {
      ctx.body = util.fail('文件夹不是顶层文件夹')
      return
    }

    const { _id } = await repComment.save()
    ctx.body = util.success({ _id }, '评论创建成功')
  } catch (e) {
    ctx.body = util.fail(`参数传递错误, ${e}`)
  }
})

// 删除 (可以删除单个也可以删除多个)
router.post('/delete', async (ctx) => {
try {
  const { _ids } = ctx.request.body
  for (let i = 0; i < _ids.length; i++) {
    if (await isRepComment(_ids[i]) === false) {
      ctx.body = util.fail(`找不到 id 为 ${_ids[i]} 的评论`)
      return
    }
    await RepComment.updateOne(
      { _id: _ids[i] },
      { $set: { state: 1 } }
    )
  }
  ctx.body = util.success('', '删除成功')
} catch (e) {
  ctx.body = util.fail(`参数传递错误, ${e}`)    
}
})

// 查找单个
router.post('/item', async (ctx) => {
  try {
    const { _id } = ctx.request.body
    const data = await RepComment.findOne({ _id })
    ctx.body = util.success(data)
  } catch (e) {
    ctx.body = util.fail(`参数传递错误, ${e}`)
  }
})

// 查找多个
router.post('/list', async (ctx) => {
  try {
    const { repId, pCmtId } = ctx.request.body
    const { page, skipIndex } = util.pager(ctx.request.body)
    const obj = { repId, pCmtId }

    // 过滤 obj 中值 为 undefined 和 null 的项目, 得到 options
    const options = {}
    for (const key in obj) {
      if (obj[key]) {
        options[key] = obj[key]
      }
    }

    const res = RepComment.find(options)
    const list = await res.skip(skipIndex).limit(page.size)
    const total = await RepComment.countDocuments(res)

    ctx.body = util.success({
      page: {
        ...page,
        total
      },
      list
    })
  } catch (e) {
    ctx.body = util.fail(`参数错误 ${e}`)
  }
})
module.exports = router
