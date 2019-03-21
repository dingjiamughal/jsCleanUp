const fs = require('fs');
const path = require('path');

fs.readFile('./test.txt', function (err, data) {
    console.log(data); // <Buffer e4 b8 81 e4 bd b3 e5 95 8a>
    console.log(data.slice(3)); // <Buffer e4 bd b3 e5 95 8a>
    console.log(data.toString()); // 丁佳啊
});

fs.readdir('./dir', (err, files) => {
    console.log(files); // ['a', 'b']
    files.forEach(file => {
        const child = path.join('dir', file);
        fs.stat(child, (err, stat) => {
            // console.log(stat);
            console.log(stat.isDirectory(), stat.isFile());
        });
    });
});

// 深度删除文件夹
function rmdir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const child = fs.statSync(path.join(dir, file));
        if (child.isDirectory) {
            rmdir(file);
        }
        else {
            fs.unlinkSync(path.join(dir, file));
        }
    });
}
