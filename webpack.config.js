const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./public/index.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "static/js/main.[hash].js"
    },
    devtool: 'source-map',//调试模式
    devServer: {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        },{
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
            ]
        }]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: './public/index.html',  // 文件地址
            filename: './build/index.html',  // 生成文件名字
            inject: true,    // 不把生成的css，js插入到html中
            // chunks: ['app'],  //指定某一个入口，只会把入口相关载入html
            minify: {  // 压缩html
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "./build/static/css/style.css",
        })
    ],
    mode: 'production',//development,
};