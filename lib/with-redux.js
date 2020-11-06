import React from "react";
import createStore from "../store/store";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState) {
    if (isServer) {
        return createStore(initialState);
    }

    if (!window[__NEXT_REDUX_STORE__]) {
        window[__NEXT_REDUX_STORE__] = createStore(initialState);
    }
    return window[__NEXT_REDUX_STORE__];

}

export default (Comp) => {
    class WithReduxApp extends React.Component {
        constructor(props) {
            super(props); // 继承了react.component 必须写super
            this.reduxStore = getOrCreateStore(props.initialReduxState);
        }

        render() {
            // function TestHocComponent({ Component, pageProps, ...rest }) {
            // return function TestHocComponent({ name, ...others }) {
            // const updateName = name + "。";
            // return <Comp {...others} name={updateName} />

            const { Component, pageProps, ...rest } = this.props;

            console.log(Component, pageProps);
            pageProps && (pageProps.test = "12123123");

            return <Comp Component={Component} pageProps={pageProps} {...rest} reduxStore={this.reduxStore} />
        }

    }


    // TestHocComponent.getInitialProps = Comp.getInitialProps;
    WithReduxApp.getInitialProps = async (ctx) => {
        // let appProps = {};
        // if (typeof Comp.getInitialProps === "function") {
        //     appProps = await Comp.getInitialProps(ctx);
        // }

        let reduxStore = getOrCreateStore();

        if (isServer){
            const { req } = ctx.ctx;
            const session = req.session;

            if (session && session.userInfo) {
                reduxStore = getOrCreateStore({
                    userInfo: session.userInfo
                });
            }
        }

        // const reduxStore = getOrCreateStore();

        ctx.reduxStore = reduxStore;

        let appProps = {};
        if (typeof Comp.getInitialProps === "function") {
            appProps = await Comp.getInitialProps(ctx);
        }

        return {
            ...appProps,
            initialReduxState: reduxStore.getState()
        }
    }


    return WithReduxApp;
}