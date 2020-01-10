const withCss = require("@zeit/next-css"); // next默认无法加载css，使用插件可

if (typeof require !== "undefined") {
    require.extensions['.css'] = file => { };
}

module.exports = withCss({});
