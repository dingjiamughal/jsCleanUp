const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.js',
        base: './src/base.js',
        vendor: 'jquery'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:5].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // css-loader 解析css中url
                // style-loader 变成<style>插入到head
                // 从右往左处理 
                loader: [
                    'style-loader',
                    'css-loader'
                ],
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 8088,
        compress: true, // gzip
    },
    plugins: [
        new Webpack.ProvidePlugin({
            $: 'jquery',
            'jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            title: 'index~~',
            hash: true,
            minify: {
                removeAttributeQuotes: true
            },
            chunks: ['vendor', 'index']
        }),
        new HtmlWebpackPlugin({
            template: './src/main.html',
            filename: 'main.html',
            title: 'main~~',
            hash: true,
            minify: {
                removeAttributeQuotes: true
            },
            chunks: ['base']
        }),
        new CleanWebpackPlugin({
            path: path.resolve(__dirname, './dist')
        })
    ]
}