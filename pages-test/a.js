import Component from "../components/component";
import { withRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
// import moment from "moment";
import dynamic from "next/dynamic";

const Title = styled.h1`
    color: red;
    font-size: 40px;
`

const color = "yellow";

const LazyComponent = dynamic(import("../components/lazy-loading"));

const A = ({ router, name, time }) => {
    console.log(router);
    return (
        <>
            <Title>This is title -- {time}</Title>
            <LazyComponent />
            <Link href="#abc">
                <a className="link">A--{router.query.id}--{name}</a>
            </Link>
            <style jsx>{`
                a {
                    color: green
                }
                .link {
                    background-color: ${color} 
                }
            `}</style>
            <style jsx global>{`
                a {
                    color: blue
                }
            `}</style>
        </>
    )
}

A.getInitialProps = async (...args) => {
    console.log(...args)

    const moment = await import("moment"); // lazyloading

    const promise = new Promise(resolve => {
        setTimeout(() => {
            resolve({
                name: "rion",
                time: moment.default(Date.now() - 600 * 1000).fromNow()
            })
        }, 500)
    })

    return await promise;

    // return {
    //     name: "rion"
    // }
}

export default withRouter(A);