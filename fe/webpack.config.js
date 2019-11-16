const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    //环境
    mode: 'development',
    //入口
    entry: './src/app.js',
    //出口
    output: {
        path: path.resolve(__dirname,'./dev'),
        filename: 'app.js'
    },
    //服务
    devServer: {
        contentBase: path.join(__dirname,'./dev'),
        compress: true,
        port: 8000,
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        },
    },
    //loader
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: {
                    loader : 'url-loader',
                    options : {
                        limit: 10,//图片字节大小编译为base64--小于
                    },
                }
            },
            {
                test: /\.hbs$/i,
                use: ['handlebars-loader'],
            },
            {
                test: /\.html$/i,
                use: ['string-loader'],
            },
            {
                test: /\.(scss|css)$/i,
                use: ['style-loader','css-loader','sass-loader'],//注意顺序，从后向前依次编译
            },
        ],
    },
    //插件plugin
    plugins: [
        new HtmlWebpackPlugin({
            filename:'index.html', //目标文件
            template:'./index.html' //源文件路径
        }),
        new CopyPlugin([
            { from : './src/public' , to : './public'},
        ]),
    ]

}