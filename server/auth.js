const axios = require("axios");
const config = require("../config");
const {client_id, client_secret, request_token_url} = config.github;

module.exports = (server) => {
    server.use(async(ctx,next) => {
        if (ctx.path == "/auth"){
            const code = ctx.query.code;
            if(!code){
                ctx.body = "code not exist";
                return;
            }


            const result = await axios({
                method: "POST",
                url: request_token_url,
                data: {
                    client_id,
                    client_secret,
                    code
                },
                headers: {
                    Accept: 'application/json'
                }
            })

            if (result.status === 200 && !result.data.error) {
                console.log("result");
                console.log(result);
                console.log("result.data");
                console.log(result.data);
                ctx.session.githubAuth = result.data;

                const {access_token, token_type} = result.data;
                const userInfoRes = await axios({
                    method: 'GET',
                    url: 'https://api.github.com/user',
                    headers: {
                        // 'Accept': 'application/vnd.github.v3+json',
                        'Authorization': `token ${access_token}`
                    }
                });

                console.log("userInfoRes");
                console.log(userInfoRes.data);
                ctx.session.userInfo = userInfoRes.data;

                ctx.redirect('/');
            } else {
                const errMsg = result.data && result.data.error;
                ctx.body = `request token failed ${errMsg}`
            }

        } else {
            await next();
        }
    })
}