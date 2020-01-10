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
        });
    }

    return (
        <>
            <Link href="/a?id=1">
                <Button>Index</Button>
            </Link>
            <Button onClick={JumpB}>jump B</Button>
        </>
    )
}