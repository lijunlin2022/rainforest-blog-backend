const router = require("koa-router")();
const { getList, getDetail, add, update } = require("../controller/notebooks");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.prefix("/notebook");

router.get("/list", async (ctx, next) => {
  const current = ctx.query.current;
  const size = ctx.query.size;
  const keyword = ctx.query.keyword;
  const listData = await getList(current, size, keyword);
  ctx.body = new SuccessModel(listData);
});

router.get("/detail",async (ctx, next) => {
  const id = ctx.query.id;
  const data = await getDetail(id);
  ctx.body = new SuccessModel(data);
});

router.post("/new", async (ctx, next) => {
  const body = ctx.request.body;
  const data = await add(body);
  ctx.body = new SuccessModel(data);
});

router.post("/update", async (ctx, next) => {
  const id = ctx.query.id;
  const body = ctx.request.body;
  const data = await update(id, body);
  ctx.body = new SuccessModel(data);
});

module.exports = router;