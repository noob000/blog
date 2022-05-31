const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const isDev = process.env["BABEL_ENV"] === "dev";
module.exports = {
    entry: {
        app: './src/index.tsx',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'dev',
            template: './public/index.html'
        }),
        new ForkTsCheckerWebpackPlugin({

        }),

    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        publicPath: "/"
    },

    module: {
        rules: [
            {
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
                                localIdentName: isDev ? '[path]_[local]' :"[hash:base64]",
                            },
                        },
                    },
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        importLoaders: 1,
                    },
                }],
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            // {
            //     test: /\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/,
            // },

        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', ".tsx", ".ts"],
        alias: {
            "@": path.resolve(__dirname, '../src'),
        }
    },
};