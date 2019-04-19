'use strict';

/** @type Egg.EggPlugin */

// 应用启动会读此文件，把导出的方法挂载到app上

exports.mongoose = {
    enable: true,
    package: 'egg-mongoose'
};
