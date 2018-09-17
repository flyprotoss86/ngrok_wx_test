const sha1 = require('sha1')
const getRawBody = require('raw-body')
const util = require('./util')

module.exports = (config) => {
    return async (ctx, next)=>{
        const { signature, timestamp, nonce, echostr } = ctx.query
        let str = [config.token, timestamp, nonce].sort().join('')
        const sha = sha1(str)

        if(ctx.method === 'GET') {
            // get
            if(sha === signature) {
                ctx.body = echostr
            } else {
                ctx.body = 'wrong'
            }
        } else if(ctx.method === 'POST') {
            if(sha !== signature) {
                ctx.body = 'Failed'
            }
            const data = await getRawBody(ctx.req, {
                length: ctx.length,
                limit: '1mb',
                encoding: ctx.charset
            })

            const content = await util.parseXML(data)
            const message = util.formatMessage(content.xml)

            await reply.apply(ctx, [ctx, next])

            //返回
            ctx.status = 200
            ctx.type = 'application/xml'
            ctx.body = `<xml>  
<ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>  
<FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>  
<CreateTime>${parseInt(new Date().getTime() / 1000, 0)}</CreateTime>  
<MsgType><![CDATA[text]]></MsgType>  
<Content><![CDATA[${message.Content}]]></Content>  
</xml>`


        }
    }
}

