/*
    next는 webpack을 사용하고 있기 때문에 next.config.js를 만들어서 
    webpack 설정을 변경할 수 있다.
*/ 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
    compress : true,
    webpack(config , { webpack }){
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [ ...config.plugins ];
        return {
            ...config,
            mode : prod ? 'production' : 'development',
            devtool : prod ? 'hidden-source-map' : 'eval',
            plugins,
        };
    }
});
