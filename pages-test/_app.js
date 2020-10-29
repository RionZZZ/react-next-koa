import App, { Container } from "next/app";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

import store from "../store/store";

import Layout from "../components/layout";
import MyContext from "../lib/my-context";

import testHOC from "../lib/with-redux";

class MyApp extends App {

    // static async getInitialProps({ Component, ctx }) {
    static async getInitialProps(ctx) {

        const { Component } = ctx;

        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps, reduxStore } = this.props;

        return (
            // <Container> next9已不用再使用Container
            <>
                <Layout>
                    {/* <Provider store={store}> */}
                    <Provider store={reduxStore}>
                        <MyContext.Provider value="context-test">
                            <Component {...pageProps}></Component>
                        </MyContext.Provider>
                    </Provider>
                </Layout>
            </>
            // </Container>
        )
    }
}

export default testHOC(MyApp);