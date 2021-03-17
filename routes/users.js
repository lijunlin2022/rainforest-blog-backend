const router = require('koa-router')()

router.prefix('/api/users')

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  ctx.body = {
    errno: 0,
    username,
    password
  }
})

module.exports = router
