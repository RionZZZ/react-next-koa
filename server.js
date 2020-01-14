const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

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

    router.get('/a/:id', async (ctx) => {
        const { id } = ctx.params;
        await handle(ctx.req, ctx.res, {
            pathname: '/a',
            query: { id }
        })
        ctx.respond = false
    })

    server.use(router.routes());

    server.use(async (ctx, next) => {
        // req,res为node/http模块下的
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    })

    server.listen(3000, () => {
        console.log("KOA server listening on 3000");
    })
})
