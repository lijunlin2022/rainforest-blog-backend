/**
 * 文件管理模块
 */

const router = require('koa-router')()
const File = require('../models/file.js')
const Dir = require('../models/dir.js')
const util = require('../utils/index.js')
const dir = require('../models/dir.js')
const { isDir, isFile, isDuplicatedNameFileForSameParent } = require('../utils/isExisted.js')

router.prefix('/file')


// 增加
router.post('/add', async (ctx) => {
  try {
    const params = { filename, fileType, abstract, content, pDirId, pDirName } = ctx.request.body
    const file = new File(params)

    // 如果没有父文件夹
    if (!pDirId) {
      ctx.body = util.fail('文件必须放到文件夹中')
      return
    }

    // 判断是否有符合该 id 的父文件夹
    if (isDir(pDirId) === false) {
      ctx.body = util.fail('找不到符合该 id 的父文件夹')
      return
    }

    // 判断同级目录下有没有重名的文件
    if (await isDuplicatedNameFileForSameParent(pDirId, filename) === true) {
      ctx.body = util.fail('同级目录下有重名的文件')
      console.log('------')
      return
    }

    const { _id } = await file.save()
    await Dir.findByIdAndUpdate(
      pDirId,
      { $addToSet: { childFiles: _id }}
    )

    ctx.body = util.success('', '文件创建成功')
  } catch (e) {
    ctx.body = util.fail(`参数传递错误, ${e}`)
  }
})

// 删除 (可以删除单个也可以删除多个)
router.post('/delete', async (ctx) => {
  try {
    const { _ids } = ctx.request.body
    for (let i = 0; i < _ids.length; i++) {
      if (isFile(_ids[i]) === false) {
        ctx.body = util.fail(`找不到 id 为 ${_ids[i]} 的文件`)
        return
      }
      await File.updateOne(
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
    console.log('params => ', params)
    const data = await File.findOne(params)
    ctx.body = util.success(data)
    const { _id } = data
    // 统计阅读次数
    await File.findByIdAndUpdate(_id, {
      $inc: { viewed: 1 }
    })
  } catch (e) {
    ctx.body = util.fail(`参数传递错误, ${e}`)
  }
})

// 查找多个
router.post('/list', async (ctx) => {
  try {
    const { filename, fileType, state, pDirId } = ctx.request.body
    const { page, skipIndex } = util.pager(ctx.request.body)
    const obj = { filename, fileType, state, pDirId }

    // 过滤 obj 中值 为 undefined 和 null 的项目, 得到 options
    const options = {}
    for (const key in obj) {
      if (obj[key] !== undefined && obj[key] !== null) {
        options[key] = obj[key]
      }
    }

    const res = File.find(options, '-content')
    const list = await res.skip(skipIndex).limit(page.size)
    const total = await File.countDocuments(res)

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
    const { _id, filename, fileType, abstract, content, pDirId, state } = ctx.request.body
    console.log(_id, filename, fileType, abstract, content, pDirId, state)
    const updateTime = Date.now()

    // 如果没有父文件夹
    if (!pDirId) {
      ctx.body = util.fail('文件必须放到文件夹中')
      return
    }

    // 判断是否有符合该 id 的父文件夹
    if (isDir(pDirId) === false) {
      ctx.body = util.fail('找不到符合该 id 的父文件夹')
      return
    }

    await File.updateOne({ _id }, {
      $set: { filename, fileType, abstract, content, pDirId, state, updateTime }
    })

    ctx.body = util.success('', '文件更新成功')
  } catch (e) {
    ctx.body = util.fail(`参数传递错误, ${e}`)
  }
})

module.exports = router
