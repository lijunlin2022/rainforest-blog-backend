const router = require('koa-router')()

router.prefix('/api/blogs')

router.get('/list', async (ctx, next) => {
  // await ctx.render('index', {
  //   title: 'Hello Koa 2!'
  // })
  ctx.body = "This is the list of blogs";
})

router.get('/detail', async (ctx, next) => {
  ctx.body = 'This is the detail of blogs'
})

router.post('/new', async (ctx, next) => {
  ctx.body = {
    title: 'This is the new of blogs'
  }
})

router.post('/update', async (ctx, next) => {
  ctx.body = {
    title: 'This is the update of blogs'
  }
})

router.post('/del', async (ctx, next) => {
  ctx.body = {
    title: 'This is the del of blogs'
  }
})

module.exports = router
