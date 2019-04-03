const path = require('path');
const Webpack = require('webpack');

module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, './dll'),
        filename: '[name]_dll.js',
        library: '_dll_[name]',
        libraryTarget: 'umd'
    },
    plugins: [
        new Webpack.DllPlugin({
            name: 'dll_[name]',
            path: path.join(__dirname, 'dll', 'manifest.json')
        })
    ]
}
