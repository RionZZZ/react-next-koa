const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session");
const auth = require("./server/auth");

const Redis = require("ioredis");
const RedisSessionStore = require("./server/session-store");
const redis = new Redis(); // 创建redis client

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

let index = 0;

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    // router.get("/test/:id", (ctx) => {
    //     // ctx.body = `<p>request /test ${ctx.params.id}</p>`;
    //     ctx.body = { success: true };
    //     ctx.set("Content-Type", "application/json");
    // })

    // server.use(async (ctx, next) => {
    //     // ctx是所有请求的内容，返回直接写ctx的属性
    //     await next();
    // })

    server.keys = ["zzz github app"]; // 给cookie加密
    const SESSION_CONFIG = {
        key: "zid",
        // maxAge: 15 * 1000,
        store: new RedisSessionStore(redis)
    }

    server.use(session(SESSION_CONFIG, server));


    // github OAuth
    auth(server);




    server.use(async (ctx, next) => {
        // console.log(ctx.cookies.get("id"));

        // ctx.session = ctx.session || {};
        // ctx.session.user = {
        //     username: "rion",
        //     age: 25
        // }

        // if (!ctx.session.user) {  // 不能这样写，会报错，原因koa-session会在页面加载完成后set cookie。
        //     ctx.session.user = {
        //         name: "zya",
        //         age: 25
        //     } // 写在router ‘/set/user’ 中
        // } else {
        // console.log("session:::", ctx.session)
        // }

        // console.log("session:::", ctx.session)
        await next();
    })

    router.get('/a/:id', async (ctx) => {
        const { id } = ctx.params;
        await handle(ctx.req, ctx.res, {
            pathname: '/a',
            query: { id }
        })
        ctx.respond = false;
    })
    router.get('/set/user', async (ctx) => {
        ctx.session.user = {
            name: "zya",
            age: 20
        }

        ctx.body = "set session success";
    })
    router.get('/delete/user', async (ctx) => {
        ctx.session = null;
        ctx.body = "delete session success";
    })


    router.get('/api/user/info', async (ctx) => {
        const user = ctx.session.userInfo;
        if (!user) {
            ctx.status = 401;
            ctx.body = "need login";
        } else {
            ctx.body = user;
            ctx.set('Content-Type', 'application/json');
        }
    })


    server.use(router.routes());

    server.use(async (ctx, next) => {
        // req,res为node/http模块下的

        ctx.cookies.set("id", "uid:xx", {
            httpOnly: false
        });
        // index++;

        // 赋值userInfo
        ctx.req.session = ctx.session;

        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    })

    server.listen(3000, () => {
        console.log("KOA server listening on 3000");
    })
})
