const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HappyPack = require('happypack');
const merge = require('webpack-merge');

const HapeWebpackPlugin = require('./loaders/hape-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
console.log(devMode)

let option = {};
if (devMode) {
    option = require('./webpack.dev.conf');
}
else {
    option = require('./webpack.prod.conf');
}

const config = {
    entry: {
        // index: './src/index.js',
        // base: './src/base.js',
        // vendor: 'jquery'
        pageA: './src/a.js',
        pageB: './src/b.js',
        pageC: './src/c.js',
        test: './src/test.js'
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
                use: [
                    {
                        loader: path.resolve(__dirname, './loaders/replaceLoaders.js'),
                        options: {
                            name: 'djdjdj'
                        }
                    },
                    {
                        loader: 'babel-loader'
                    }
                ]
                // use: 'happypack/loader?id=js'
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
    optimization: {
        splitChunks: { // 代替 common-chunk-plugin
            chunks: 'async',
            cacheGroups: {
                common: {
                    name: 'common',
                    minChunks: 2,
                    minSize: 0,
                    filename: '[name].common.js',
                    chunks: 'all'
                },
                vendor: {
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'all',
                    filename: '[name].bundle.js',
                    // priority: 10,
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.json', '.vue', '.less'],
        alias: {
            '~': './src'
        }
    },
    // devtool: 'cheap-module-source-map',
    plugins: [
        // new HapeWebpackPlugin(),
        new ProgressBarPlugin(),
        new Webpack.optimize.ModuleConcatenationPlugin(),
        new Webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: './src/a.html',
            filename: 'a.html',
            title: 'a~~',
            hash: true,
            minify: {
                removeAttributeQuotes: true
            },
            chunks: ['common', 'vendor', 'pageA']
        }),
        new HtmlWebpackPlugin({
            template: './src/b.html',
            filename: 'b.html',
            title: 'main~~',
            hash: true,
            minify: {
                removeAttributeQuotes: true
            },
            chunks: ['common', 'pageB']
        }),
        new HtmlWebpackPlugin({
            template: './src/c.html',
            filename: 'c.html',
            title: 'c~~',
            hash: true,
            minify: {
                removeAttributeQuotes: true
            },
            chunks: ['pageC', 'common']
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
        // new UglifyWebpackPlugin(),
        // new Webpack.DllReferencePlugin({
        //     // manifest: path.join(__dirname, 'dll', 'manifest.json')
        //     context: path.resolve(__dirname, './dll'),
        //     manifest: require('./dll/manifest.json')
        // }),
        new Webpack.DefinePlugin({
            __env: process.env.NODE_ENV
        }),
        // new HappyPack({
        //     id: 'js',
        //     threads: 4,
        //     loaders: ['babel-loader']
        // })
    ]
};

module.exports = merge(config, option);
