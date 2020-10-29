import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {

    // getInitialProps和render方法，要不不覆盖，若有需求则一定要返回Document原有基础方法
    static async getInitialProps(ctx) {

        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                // enhanceApp: App => withLog(App),
                // enhanceComponent: Component => withLog(Component)
                enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
            })

            const props = await Document.getInitialProps(ctx);

            return {
                ...props,
                styles: <>{props.styles}{sheet.getStyleElement()}</>
            }
        } finally {
            sheet.seal()
        }

        // const props = await Document.getInitialProps(ctx);

        // return { ...props }
    }

    render() {
        return (
            <html>
                <Head>
                    {/* <title>MyApp</title> */}
                    {/* <style>{`.test {color: red}`}</style> */}
                </Head>
                {/* <body className="test"> */}
                <body className="test">
                    <Main></Main>
                    <NextScript></NextScript>
                </body>
            </html>
        )
    }
}

function withLog(Component) {
    return props => {
        console.log(props);
        return <Component {...props}></Component>
    }
}

export default MyDocument;