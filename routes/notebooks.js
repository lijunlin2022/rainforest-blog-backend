const router = require("koa-router")();
const { getList, getDetail, add, update } = require("../controller/notebooks");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const loginCheck = require("../middleware/loginCheck");
router.prefix("/notebook");

// 增加
router.post("/new", loginCheck, async (ctx, next) => {
  const body = ctx.request.body;
  const data = await add(body);
  ctx.body = new SuccessModel(data);
});

// 删除

// 修改
router.patch("/update/:id", loginCheck, async (ctx, next) => {
  const id = ctx.params.id;
  const data = ctx.request.body;
  const res = await update(id, data);
  ctx.body = new SuccessModel(res);
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