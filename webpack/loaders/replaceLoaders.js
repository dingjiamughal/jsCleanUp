module.exports = function (source) {
    console.log(this.query);
    const content = source.replace('dingjia', 'djmughal');

    this.callback(null, content);
};
