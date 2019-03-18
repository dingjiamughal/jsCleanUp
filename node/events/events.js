/**
 * @author dingjia
 * @file events.js
 * events模块 手动实现
 */

/* eslint-disable fecs-valid-class-jsdoc */

function EventEmitter() {
    this.events = {};
    this.max = 3;
    this.isWarn = { // 所有警告只提示一次
        max: false
    };
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener = function (type, callback) {
    if (this.events[type]) {
        if (this.max !== 0 && this.events[type].length > this.max && !this.isWarn.max) {
            console.error(`最大监听数量已经大于默认限量：${this.max}，事件名称为${type}`); // eslint-disable-line no-console
            this.isWarn.max = true;
            return;
        }

        this.events[type].push(callback);
    }
    else {
        // events对象没有此属性，就新建一个
        this.events[type] = [callback];
    }
};

// 用完即焚，once后emit只触发一次
EventEmitter.prototype.once = function (type, callback) {
    const wrapper = (...rest) => {
        callback.apply(this, rest);
        this.removeListener(type, callback);
    };

    // on接受callback，这个callback emit完，就会删除自身
    this.on(type, wrapper);
};

EventEmitter.prototype.removeListener = function (type, callback) {
    if (this.events[type]) {
        this.events[type] = this.events[type].filter(cb => cb !== callback); // 15 30
    }

};

EventEmitter.prototype.removeAllListeners = function (type) {
    delete this.events[type];
};

EventEmitter.prototype.setMaxListener = function (num) {
    this.max = num;
};

EventEmitter.prototype.listeners = function (type) {
    return this.events(type);
};

EventEmitter.prototype.emit = function (type, ...args) {
    // console.log(this.events[type]);
    this.events[type] && this.events[type].forEach(callback => callback(...args));
};

module.exports = EventEmitter;
