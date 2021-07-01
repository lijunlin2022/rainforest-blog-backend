const router = require("koa-router")();
const { getList, getLatestUpdatedByPage } = require("../controller/notebooks");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.prefix("/notebook");

router.get("/list", async (ctx, next) => {
  const listData = await getNotebooksList();
  ctx.body = new SuccessModel(listData);
});

router.get("/page", async (ctx, next) => {
  const current = ctx.query.current;
  const size = ctx.query.size;
  const listData = await getLatestUpdatedByPage(current, size);
  ctx.body = new SuccessModel(listData);
});

module.exports = router;