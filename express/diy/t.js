const a = Object.values('我也爱你').reduce((love, next) => {
    love += `\u${next.codePointAt(0).toString(16)}`;
    return love;
}, '');

console.log(a);
