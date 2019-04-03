module.exports = {
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 8088,
        compress: true, // gzip
        hot: true
    }
}