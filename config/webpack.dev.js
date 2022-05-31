const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        historyApiFallback: true,
        hot: true,
        port: 3999,
    },
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: [
                // 将 JS 字符串生成为 style 节点
                'style-loader',
                // 将 CSS 转化成 CommonJS 模块
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        importLoaders: 1,
                        modules: {
                            localIdentName: '[path]_[local]',
                        },
                    },
                },
                // 将 Sass 编译成 CSS
                'sass-loader',
            ],
        },]
    },
    stats: 'errors-only'
});