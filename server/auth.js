const axios = require("axios");
const config = require("../config");
const {client_id, client_secret} = config.github;

module.exports = (server) => {
    server.use(async(ctx,next) => {
        if (ctx.path == "/auth"){
            const code = ctx.query.code;
            if(!code){
                ctx.body = "code not exist";
                return;
            }
            const result = await axios({
                
            })
        } else {
            await next();
        }
    })
}