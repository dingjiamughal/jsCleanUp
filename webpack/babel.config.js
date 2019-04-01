const presets = [
    [
        "@babel/preset-env",
        {
          targets: {
              "browsers": [
                  "last 5 iOS versions",
                  "Android >= 4",
                  "last 4 ChromeAndroid versions",
                  "last 4 FirefoxAndroid versions",
                  "Edge >= 12",
                  "last 2 ExplorerMobile versions",
                  "last 2 Samsung versions",
                  "last 3 UCAndroid versions",
                  "last 1 BlackBerry versions",
                  "last 1 OperaMobile versions",
                  "ie >= 9",
                  "last 20 Chrome versions",
                  "last 15 Firefox versions",
                  "last 10 Opera versions",
                  "last 2 Safari versions"
              ]
          },
          // BuiltIns: "usage",
        },
    ],
    [
        "@babel/preset-react"
    ],
    // 'es2015'
];
const plugins = [
    '@babel/plugin-syntax-dynamic-import',
]
module.exports = {
    plugins,
    presets
};