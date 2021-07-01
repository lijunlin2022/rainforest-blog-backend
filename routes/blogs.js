const router = require('koa-router')()
const {
  getList,
  getDetail,
} = require("../controller/blogs")
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.prefix('/blog')

router.get('/list', async (ctx, next) => {
  const pid = ctx.query.pid;
  const author = ctx.query.author;
  const keyword = ctx.query.keyword;
  const current = ctx.query.current;
  const size = ctx.query.size;
  const listData = await getList(pid, current, size, author, keyword);
  ctx.body = new SuccessModel(listData);
});

router.get('/detail', async (ctx, next) => {
  const id = ctx.query.id;
  const pid = ctx.query.pid;
  const title = ctx.query.title;
  const data = await getDetail(id, pid, title);
  ctx.body = new SuccessModel(data);
})

router.post('/new', async (ctx, next) => {
  console.log(ctx.request.body)
  const body = ctx.request.body
  body.author = ctx.session.username
  const data = await newBlog(body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', async (ctx, next) => {
  const val = await updateBlog(ctx.query.id, ctx.request.body)
  if (val) {
      ctx.body = new SuccessModel()
  } else {
      ctx.body = new ErrorModel('更新博客失败')
  }
})

router.post('/del', async (ctx, next) => {
  const id = ctx.query.id
  const author = ctx.session.username
  const val = await delBlog(id, author)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router;
