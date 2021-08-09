const router = require("koa-router")();
const loginCheck = require("../middleware/loginCheck");
const { add, del, update, getList, getDetail } = require("../controller/whimsies");
const { SuccessModel, ErrorModel } = require("../model/resModel");
router.prefix("/whimsy");

// 增加
router.post('/' , async (ctx, next) => {
  const data = ctx.request.body;
  const res = await add(data);
  ctx.body = new SuccessModel(res);
});

// 删除
router.delete('/', async (ctx, next) => {
  const data = ctx.request.body;
  const res = await del(data);
  if (res === true) {
    ctx.body = new SuccessModel(res);
  } else {
    ctx.body = new SuccessModel(res);
  }
});

// 修改

// 查询单个

// 查询多个
