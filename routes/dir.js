/**
 * 文件夹管理模块
 */

const router = require('koa-router')()
const Dir = require('../models/dir.js')
const File = require('../models/file.js')
const util = require('../utils/index.js')
const { isDir, isDuplicatedNameDirForSameParent } = require('../utils/isExisted.js')

router.prefix('/dir')

// 查找多个
router.post('/list', async (ctx) => {
  const defaults = {
    pDIrId: '',
    state: 0
  }
  const body = ctx.request.body

  const params = { dirType, state, pDirId } = body
  Object.assign(defaults, params)
  const { page, skipIndex } = util.pager(body)

  const findRes = Dir.find(defaults)
  
  const list = await findRes.skip(skipIndex).limit(page.size)
  const total = await Dir.countDocuments(findRes)
  ctx.body = util.success({
    page: {
      ...page,
      total
    },
    list
  })
})

// 增加
router.post('/add', async (ctx) => {
  const params = { dirName, dirType, description, pDirId, pDirName } = ctx.request.body

  // 判断是否有符合该 id 的 父文件夹
  if (pDirId) {
    if (await isDir(pDirId) === false) {
      ctx.body = util.fail('找不到符合该 id 的父文件夹')
      return
    }
  }

  // 判断同级目录下是否有同名的文件夹
  if (await isDuplicatedNameDirForSameParent(pDirId, dirName) === true) {
    ctx.body = util.fail('同级目录下有重名的文件夹')
    return
  }

  const dir = new Dir(params)
  const { _id } = await dir.save()
  ctx.body = util.success({ _id }, '文件夹创建成功')
})

// 修改
router.post('/update', async (ctx) => {
    const { _id, dirName, dirType, description, state } = ctx.request.body
    const updateTime = Date.now()

    await Dir.updateOne({ _id }, {
      $set: { dirName, dirType, description, state, updateTime }
    })

    ctx.body = util.success('', '文件夹更新成功')
})

// 删除
router.post('/delete', async (ctx) => {
  const { _id } = ctx.request.body
  // 删除文件夹本身
  await Dir.findByIdAndDelete(_id)
  // 删除文件夹下所有的文件夹
  await Dir.remove({ pDirId: _id })
  // 删除文件夹下的所有文件
  await File.remove({ pDirId: _id })
  ctx.body = util.success('', '删除成功')
})

module.exports = router
