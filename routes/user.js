/**
 * 用户管理模块
 */

const router = require('koa-router')()
const User = require('../models/user.js')
const util = require('../utils/index.js')
const jwt = require('jsonwebtoken')
const md5 = require('md5')

router.prefix('/user')

// 登录
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body
  const findRes = await User.findOne({ username, password: md5(password) })

  if (findRes) {
    const uname = findRes._doc.username
    const token = jwt.sign(
      { data: uname }, 'rainforest', { expiresIn: '1h' }
    )
    ctx.body = util.success({ username: uname, token })
  } else {
    ctx.body = util.fail('用户名或密码不正确')
  }
})

// 增加
router.post('/', async (ctx) => {
  try {
    const { username, email, gender, role } = ctx.request.body
    const user = new User({
      username,
      password: md5('123456'), 
      email,
      gender,
      role
    })
    user.save()
    ctx.body = util.success('', '用户创建成功')
  } catch (e) {
    ctx.body = util.fail(e.stack)
  }
})

// 删除


// 修改


// 查找
router.post('/list', async (ctx) => {
  try {
    const {_id, username, password, emil, role } = ctx.request.body
    const { page, skipIndex } = util.pager(ctx.request.body)
    const obj = {_id, username, password, emil, role }

    // 过滤 obj 中值 为 undefined 和 null 的项目, 得到 options
    const options = {}
    for (const key in obj) {
      if (obj[key]) {
        options[key] = obj[key]
      }
    }

    const res = User.find(options, { password: 0 })
    const list = await res.skip(skipIndex).limit(page.size)
    const total = await User.countDocuments(res)

    ctx.body = util.success({
      page: {
        ...page,
        total
      },
      list
    })
  } catch (e) {
    ctx.body = util.fail(e.stack)
  }
})

module.exports = router
