exports.reply = async(ctx, next) => {
    const message = ctx.weixin

    console.log(message)

    if(message.MsgType === 'text') {
        let content = message.Content
        let reply = 'oh, xxxxx'

        if(content === '1') {
            reply = '天下第1吃大米'
        } else if(content === '2') {
            reply = '天下第2吃大米'
        } else if(content === '3') {
            reply = '天下第3吃大米'
        }
        ctx.body = reply
    }

    console.log(ctx.body)

    await next()
}
