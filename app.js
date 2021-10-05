const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaJwt = require('koa-jwt')

require('./db/mongoose.js')

const user = require('./routes/user.js')
const dir = require('./routes/dir.js')
const file = require('./routes/file.js')
const repComment = require('./routes/repComment.js')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(koaJwt({ secret: 'rainforest' }).unless({
  path:[
    /^\/user\/login/,
    /^\/dir\/list/,
    /^\/dir\/item/,
    /^\/file\/list/,
    /^\/file\/item/
  ]
}))

// routes
app.use(user.routes(), user.allowedMethods())
app.use(dir.routes(), dir.allowedMethods())
app.use(file.routes(), file.allowedMethods())
app.use(repComment.routes(), repComment.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
