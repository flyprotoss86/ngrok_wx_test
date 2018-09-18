const Koa = require('koa')
const wechat = require('./wechat-lib/middleware')
const config = require('./config/config')
const reply = require('./wechat/reply').reply

const app = new Koa()
app.use(wechat(config.wechat, reply))

app.listen(config.port)
console.log('listen: '+ config.port)
