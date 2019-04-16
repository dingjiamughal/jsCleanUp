const a = `asdfasfwe2132123scxv<a href="http://baijiahao.baidu.com/s?id=1630834585374807078" target="_blank">
美国如此针对华为，到底在怕什么？
</a>adsfsadfsfwr32432
<a href="http://baijiahao.baidu.com/s?id=1630834585374807078" target="_blank">
ADSFADSFMDSIQEW
</a>xzcxzewfvf`;
const reg = /<a href="(http:\/\/baijiahao.baidu.com\/s\?id=[^"]+)".+>([\s\S]+?)<\/a>/g;
const arr = [];
const result = a.replace(reg, function (matched, url, title) {
    arr.push({
        title,
        url
    });
});
console.log(arr);
