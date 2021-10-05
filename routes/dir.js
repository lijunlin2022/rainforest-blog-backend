/**
 * 文件夹管理模块
 */

const router = require('koa-router')()
const Dir = require('../models/dir.js')
const util = require('../utils/index.js')
const { isDir, isDuplicatedNameDirForSameParent } = require('../utils/isExisted.js')

router.prefix('/dir')

// 增加
router.post('/add', async (ctx) => {
  try {
    const params = { dirName, dirType, description, pDirId, pDIrName } = ctx.request.body
    const dir = new Dir(params)

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

    const { _id } = await dir.save()
    ctx.body = util.success({ _id }, '文件夹创建成功')

  } catch (e) {
    ctx.body = util.fail(e.stack)
  }
})

// 删除 (可以删除单个也可以删除多个)
router.post('/delete', async (ctx) => {
  try {
    const { _ids } = ctx.request.body
    console.log(_ids)
    for (let i = 0; i < _ids.length; i++) {
      if (await isDir(_ids[i]) === false) {
        ctx.body = util.fail(`找不到 id 为 ${_ids[i]} 的文件夹`)
        return
      }
      await Dir.updateOne(
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
    const params = ctx.request.body
    const data = await Dir.findOne(params)
    ctx.body = util.success(data)
    // 统计阅读次数
    await Dir.findByIdAndUpdate(_id, {
      $inc: { viewed: 1 }
    })
  } catch (e) {
    ctx.body = util.fail(`参数传递错误, ${e}`)
  }
})

// 查找多个
router.post('/list', async (ctx) => {
  try {
    const { dirName, dirType, state, pDirId } = ctx.request.body
    const { page, skipIndex } = util.pager(ctx.request.body)
    const obj = { dirName, dirType, state, pDirId }

    // 过滤 obj 中值 为 undefined 和 null 的项目, 得到 options
    const options = {}
    for (const key in obj) {
      if (obj[key] !== undefined && obj[key] !== null) {
        options[key] = obj[key]
      }
    }

    const res = Dir.find(options)
    const list = await res.skip(skipIndex).limit(page.size)
    const total = await Dir.countDocuments(res)

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

// 修改单个
router.post('/update', async (ctx) => {
  try {
    const { _id, dirName, dirType, description, pDirId, state } = ctx.request.body
    const updateTime = Date.now()

    // 如果 pDirId 存在, 则进一步判断 pDirId 是否合法
    if (pDirId) {
      if (await isDir(pDirId) === false) {
        ctx.body = util.fail('找不到符合该 id 的父文件夹')
        return
      }
    }

    await Dir.updateOne({ _id }, {
      $set: { dirName, dirType, description, pDirId, state, updateTime }
    })

    ctx.body = util.success('', '文件夹更新成功')
  } catch (e) {
    ctx.body = util.fail(`参数传递错误, ${e}`)
  }
})

module.exports = router
