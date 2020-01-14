// import React from "react"; next已经全局处理过，不需要import
import { Button } from "antd";
// import Button from "antd/lib/button";

import Link from "next/link";
import Router from "next/router";

export default () => {

    function JumpB() {
        Router.push({
            pathname: "/test/b",
            query: {
                id: 2
            }
        }, "/test/b/2");
    }

    return (
        <>
            {/* <Link href="/a?id=1" as="/a/1">
                <Button>jump A</Button>
            </Link>
            <Button onClick={JumpB}>jump B</Button> */}
            <span>Index</span>
        </>
    )
}

const events = ["routeChangeStart", "routeChangeComplete", "routeChangeError", "beforeHistoryChange", "hashChangeStart", "hashChangeComplete"]

const makeEvents = type => {
    return (...args) => {
        console.log(type, ...args)
    }
}

events.forEach(event => {
    Router.events.on(event, makeEvents(event));
})





