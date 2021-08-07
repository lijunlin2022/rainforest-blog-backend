const router = require("koa-router")();
const { getList, getDetail, add, update } = require("../controller/notebooks");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.prefix("/notebook");

// 增加
router.post("/new", async (ctx, next) => {
  const body = ctx.request.body;
  const data = await add(body);
  ctx.body = new SuccessModel(data);
});

// 删除

// 修改
router.post("/update", async (ctx, next) => {
  const id = ctx.query.id;
  const body = ctx.request.body;
  const data = await update(id, body);
  ctx.body = new SuccessModel(data);
});

// 查询单个
router.get("/:id",async (ctx, next) => {
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