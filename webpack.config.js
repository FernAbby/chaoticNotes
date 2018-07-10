const webpack = require('webpack');
const path = require('path');
const moment = require('moment');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const envConfig = require('./node-tool/env.js');

module.exports = {
    entry: "./src/index.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",
        filename: "./static/js/main.js"
        // filename: "./static/js/main.[hash].js"
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        host: envConfig.HOST || "localhost" || "0.0.0.0",
        port: envConfig.PORT || 3008,
        https: envConfig.HTTPS=="true"?true:false,
        compress: true,
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true,
        proxy: envConfig.PROXY || {
            "/api": "http://localhost:"+ (envConfig.PORT || 3008)
        },
    },
    module: {
        rules: [{
            test: /\.(js|jsx|mjs)$/,
            use: [{
                    loader: 'eslint-loader',
                },
                "babel-loader"
            ],
            exclude: /node_modules/,
            include: /src/
        },{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader"
            ],
            exclude: /node_modules/,
            include: [path.resolve(__dirname, 'src')],
        }, {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "autoprefixer-loader",
                "less-loader"
            ],
            exclude: /node_modules/,
            include: /src/
        },{
            test:/\.(sass|scss)$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "autoprefixer-loader",
                "sass-loader"
            ],
            exclude: /node_modules/,
            include: /src/
        },{
            test: /\.(png|bmp|jpe?g|gif)$/,
            use: [{
                loader: 'url-loader',
                options: { // options参数可以定义多大的图片转换为base64
                    limit: 10000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                    outputPath: './static/images' //定义输出的图片文件夹
                }
            }],
            exclude: /node_modules/,
            include: /src/
        },{
            test: /\.json$/,
            loader: 'json-loader'
        },{
            test: /\.txt$/,
            use: 'raw-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.BannerPlugin('Create By Wenzhen At ' + moment().format('YYYY-MM-DD HH:mm:ss')),
        new HtmlWebpackPlugin({
            template: './public/index.html',  // 文件地址
            filename: './index.html',  // 生成文件名字
            title: "javaScript工具库",
            favicon: '',
            inject: true,    // 不把生成的css，js插入到html中
            // chunks: ['app'],  //指定某一个入口，只会把入口相关载入html
            minify: {  // 压缩html
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: "./static/css/style.css",
        })
    ],
    mode: 'production',//development
    resolve: {//引入文件格式后缀
        extensions: ['.js','.jsx','.json','.web.js','.mjs','.web.jsx'],
    },
    externals: {
        BMap: 'window.BMap',
    }
};