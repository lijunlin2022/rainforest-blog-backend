/**
 * 文件管理模块
 */

const router = require('koa-router')()
const File = require('../models/file.js')
const Dir = require('../models/dir.js')
const util = require('../utils/index.js')
const { isDir, isFile, isDuplicatedNameFileForSameParent } = require('../utils/isExisted.js')

router.prefix('/file')

// 查找多个
router.post('/list', async (ctx) => {
  const body = ctx.request.body
  const params = { fileType, state, pDirId } = body
  const { current, size } = body
  const { sortMode = 'filename' } = body

  const defaults = {
    state: 0
  }
  Object.assign(defaults, params)

  if (!current || !size) {
    // 如果没有分页
    const findRes = await File.find(defaults, '-content').sort(sortMode)
    const total = await File.countDocuments(findRes)
    ctx.body = util.success({
      page: {
        total
      },
      list: findRes
    })
  } else {
    // 如果有分页
    const { page, skipIndex } = util.pager(body)
    const findRes = File.find(defaults, '-content')
    const list = await findRes.skip(skipIndex).limit(page.size).sort(sortMode)
    const total = await File.countDocuments(findRes)
    ctx.body = util.success({
      page: {
        ...page,
        total
      },
      list
    })
  }
})

// 查找单个
router.post('/item', async (ctx) => {
    const { _id, pDirName, filename } = ctx.request.body
    if (_id) {
      const findRes = await File.findById(_id)
      ctx.body = util.success(findRes)
      await File.findByIdAndUpdate(_id, {
        $inc: { viewed: 1 }
      })
    } else if (pDirName && filename) {
      const findRes = await File.findOne({ pDirName, filename })
      if (!findRes) {
        ctx.body = util.success({})
      }
      ctx.body = util.success(findRes)
      await File.findByIdAndUpdate(findRes._id, {
        $inc: { viewed: 1 }
      })
    }
})

// 增加
router.post('/add', async (ctx) => {
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
    return
  }

  const { _id } = await file.save()

  ctx.body = util.success({ _id }, '文件创建成功')
})

// 修改单个
router.post('/update', async (ctx) => {
    const { _id, filename, fileType, abstract, content, pDirId, pDirName, state } = ctx.request.body
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
      $set: { filename, fileType, abstract, content, pDirId, pDirName, state, updateTime }
    })

    ctx.body = util.success('', '文件更新成功')
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


module.exports = router
