const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const HappyPack = require('happypack');

const devMode = process.env.NODE_ENV === 'development';
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
        // noParse: [/react\.production\.min\.js/],
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, './src'),
                exclude: /node_modules/,
                // use: [
                //     {
                //         loader: 'babel-loader'
                //     }
                // ]
                use: 'happypack/loader?id=js'
            },
            {
                test: /\.css$/,
                // css-loader 解析css中url
                // style-loader 变成<style>插入到head
                // 从右往左处理
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'

                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|svg|gif|bmp)$/,
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         name: '[name].[ext]',
                    //         outputPath: 'images/'
                    //     }
                    // },
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[hash:5].[ext]',
                            outputPath: 'images/',
                            limit: 5120
                        }
                    }
                ]
            },
            {
                test: /\.(html|htm)$/,
                use: [
                    {
                        loader: 'html-withimg-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.vue', '.less'],
        alias: {
            '~': './src'
        },
        // modules: [
        // path.resolve(__dirname, 'libs'),
        // path.resolve(__dirname, 'node_modules')
        // ]
    },
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 8088,
        compress: true // gzip
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new Webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            title: 'index~~',
            hash: true,
            minify: {
                removeAttributeQuotes: true
            },
            chunks: ['index']
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
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './api'),
                to: path.resolve(__dirname, './dist', 'api')
            }
        ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? 'css/[name].css' : 'css/[name].[hash:5].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash:7].css',
            publicPath: '/css'
        }),
        new UglifyWebpackPlugin(),
        new Webpack.DllReferencePlugin({
            manifest: path.join(__dirname, 'dll', 'manifest.json')
        }),
        new HappyPack({
            id: 'js',
            threads: 4,
            loaders: ['babel-loader']
        })
    ]
};
