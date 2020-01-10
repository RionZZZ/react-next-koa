async function test() {
    const Redis = require("ioredis");

    const redis = new Redis({
        port: 6333,
        host: '127.0.0.1', // 默认
        password: 1
    });

    // const keys = redis.keys("*").then(res => {
    //     console.log(res);
    // });

    await redis.set("test-key", "test-value")
    await redis.setex("test-ex", 10, "test-ex-value")

    const keys = await redis.keys("*");
    console.log(keys);

    const testValue = await redis.get("test-key");
    console.log(testValue);
    const testExValue = await redis.get("test-ex");
    console.log(testExValue);
}

test();

