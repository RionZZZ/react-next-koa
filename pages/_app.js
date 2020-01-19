import App, { Container } from "next/app";
import { Provider } from "react-redux";

import store from "../store/store";

import "antd/dist/antd.css";

import Layout from "../components/layout";
import MyContext from "../lib/my-context";

class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            // <Container> next9已不用再使用Container
            <>
                <Layout>
                    <Provider store={store}>
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

export default MyApp;