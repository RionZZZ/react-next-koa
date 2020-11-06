// import React from "react"; next已经全局处理过，不需要import
import { Button } from "antd";
// import Button from "antd/lib/button";

import { useEffect } from "react";
import axios from 'axios';

import Link from "next/link";
import Router from "next/router";

import store, { add } from "../store/store"

import { connect } from "react-redux";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Index = ({ count, userName, add, rename }) => {

    function JumpB() {
        Router.push({
            pathname: "/test/b",
            query: {
                id: 2
            }
        }, "/test/b/2");
    }

    // user 信息
    useEffect(() => {
        axios.get('/api/user/info').then(res => {
            console.log(res);
        })
    }, [])

    return (
        <>
            {/* <Link href="/a?id=1" as="/a/1">
                <Button>jump A</Button>
            </Link>
            <Button onClick={JumpB}>jump B</Button> */}
            <span>Index</span>

            <span>count:{count}</span>
            <span>name:{userName}</span>

            <input value={userName} onChange={e => { rename(e.target.value) }} />
            <button onClick={() => add(66)}>add 66</button>
            <br />
            <a href={publicRuntimeConfig.OAUTH_URL}>go to login</a>
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

Index.getInitialProps = async ({ reduxStore }) => {
    reduxStore.dispatch(add(33));
    return {};
}

export default connect(function mapStateToProps(state) {
    return {
        count: state.counter.count,
        userName: state.user.name
    }
}, function mapDispatchToProps(dispatch) {
    return {
        add: num => { dispatch({ type: "ADD", num }) },
        rename: name => { dispatch({ type: "UPDATE_NAME", name }) }
    }
})(Index);



