const router = require("koa-router")();
const { login } = require("../controller/users");
const { SuccessModel, ErrorModel } = require("../model/resModel");

router.prefix("/user");
router.post("/login", async function (ctx, next) {
  const { username, password } = ctx.request.body;
  const data = await login(username, password);
  if (data.username) {
    // 设置 session
    ctx.session.username = data.username;
    const successInfo = {
      username: data.username,
    };
    ctx.body = new SuccessModel(successInfo, "登录成功");
    return;
  }
  ctx.body = new ErrorModel("登录失败");
});

router.get("/session-test", async function (ctx, next) {
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;

  ctx.body = {
    code: 200,
    viewCount: ctx.session.viewCount
  };
});

module.exports = router;
