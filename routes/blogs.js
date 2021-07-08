const router = require("koa-router")();
const loginCheck = require("../middleware/loginCheck");
const {
  getList,
  getDetail,
  add,
  update,
} = require("../controller/blogs");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.prefix("/blog");

router.get("/list", async (ctx, next) => {
  const pid = ctx.query.pid;
  const author = ctx.query.author;
  const keyword = ctx.query.keyword;
  const current = ctx.query.current;
  const size = ctx.query.size;
  const listData = await getList(pid, current, size, author, keyword);
  ctx.body = new SuccessModel(listData);
});

router.get("/detail", async (ctx, next) => {
  const id = ctx.query.id;
  const pid = ctx.query.pid;
  const title = ctx.query.title;
  const data = await getDetail(id, pid, title);
  ctx.body = new SuccessModel(data);
});

router.post("/new", loginCheck, async (ctx, next) => {
  const body = ctx.request.body;
  const data = await add(body);
  ctx.body = new SuccessModel(data);
});

router.post('/update', loginCheck, async (ctx, next) => {
  const val = await update(ctx.query.id, ctx.request.body);
  if (val) {
      ctx.body = new SuccessModel();
  } else {
      ctx.body = new ErrorModel("更新博客失败");
  }
});

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
