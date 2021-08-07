const router = require("koa-router")();
const loginCheck = require("../middleware/loginCheck");
const {
  getList,
  getDetail,
  add,
  update,
} = require("../controller/notes");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.prefix("/note");

// 增加
router.post("/new", loginCheck, async (ctx, next) => {
  const body = ctx.request.body;
  const data = await add(body);
  ctx.body = new SuccessModel(data);
});

// 删除
router.post('/del', async (ctx, next) => {
  const id = ctx.query.id
  const author = ctx.session.username
  const val = await delNote(id, author)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})

// 修改
router.patch("/:id", async (ctx, next) => {
  const val = await update(ctx.params.id, ctx.request.body);
  if (val) {
      ctx.body = new SuccessModel();
  } else {
      ctx.body = new ErrorModel("更新博客失败");
  }
});

// 查询单个
router.get("/:id", async (ctx, next) => {
  const id = ctx.params.id;
  const data = await getDetail(id);
  ctx.body = new SuccessModel(data);
});

// 查询多个
router.post("/list", async (ctx, next) => {
  const queryData = ctx.request.body;
  const listData = await getList(queryData);
  ctx.body = new SuccessModel(listData);
});

module.exports = router;
