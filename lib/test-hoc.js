export default (Comp) => {
    return function TestHocComponent({ Component, pageProps, ...rest }) {
        // return function TestHocComponent({ name, ...others }) {
        // const updateName = name + "。";
        // return <Comp {...others} name={updateName} />

        console.log(Component, pageProps);
        pageProps && (pageProps.test = "12123123");

        return <Comp Component={Component} pageProps={pageProps} {...rest} />
    }

    // TestHocComponent.getInitialProps = Component.getInitialProps;
    // return TestHocComponent;
}