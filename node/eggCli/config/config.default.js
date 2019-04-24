/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1555316328664_2531';

    // add your middleware config here
    config.middleware = [];

    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        domainWhiteList: ['http://localhost:3000']
    };

    config.cors = {
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        credentials: true,
        origin: () => 'http://localhost:3000'
    }

    config.mongoose = {
        client: {
            url: 'mongodb://127.0.0.1/eggCli',
            options: {
                useNewUrlParser: true
            }
        }
    };
    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig
    };
};
