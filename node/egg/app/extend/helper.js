const moment = require('moment');
moment.locale('zh-cn');

exports.relative = item => moment(item).fromNow();