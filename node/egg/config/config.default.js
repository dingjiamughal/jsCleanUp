exports.keys = 'dingjia';

exports.view = {
    defaultViewEngine: 'pug',
    mapping: {
        '.pug': 'pug'
    }
};

exports.news = {
    url: 'https://news.baidu.com/'
};

exports.middleware = [
    'time',
    'ua'
];

exports.time = {
    prefix: 'dingjia mughal'
};

exports.ua = {
    ua: [/Chrome/]
};
