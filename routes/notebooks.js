const router = require("koa-router")();
const { getList, getDetail } = require("../controller/notebooks");
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

module.exports = router;