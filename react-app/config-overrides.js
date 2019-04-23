const path = require('path');
const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias
} = require('customize-cra');
// const rewireLess = require('react-app-rewire-less');

module.exports = override(
    // babel-plugin-import
    fixBabelImports(
        'import', {libraryName: 'antd', libraryDirectory: 'es', style: true}
    ),
    addLessLoader({
        javascriptEnabled: true
    }),
    addWebpackAlias({
        '@': path.resolve(__dirname, './src')
    }),
);
