const fs = require('fs');
const path = require('path');

// 读文件
// fs.readFile('./test.txt', function (err, data) {
//     console.log(data); // <Buffer e4 b8 81 e4 bd b3 e5 95 8a>
//     console.log(data.slice(3)); // <Buffer e4 bd b3 e5 95 8a>
//     console.log(data.toString()); // 丁佳啊
// });

// // 读目录
// fs.readdir('./dir', (err, files) => {
//     console.log(files); // ['a', 'b']
//     files.forEach(file => {
//         const child = path.join('dir', file);
//         fs.stat(child, (err, stat) => {
//             console.log(stat.isDirectory(), stat.isFile());
//         });
//     });
// });

// 深度删除文件夹 （同步）
function rmdirSync(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const child = fs.statSync(path.join(dir, file));
        if (child.isDirectory()) {
            rmdirSync(path.join(dir, file));
        }
        else {
            fs.unlinkSync(path.join(dir, file)); // 删除文件夹
        }
    });

    fs.rmdirSync(dir); // 删文件夹，要把子文件夹删干净才行
}

// rmdirSync('./main');

// 深度操作文件夹 （异步）
function rmdir(dir) {
    fs.readdir(dir, (err, file) => {
        fs.stat(path.join(dir, file), (err, stat) => {
            if (stat.isDirectory()) {
                rmdir(path.join(dir, file));
            }
            else {
                fs.unlink(path.join(dir, file));
            }
        });

        fs.rmdir(dir);
    });
}

rmdir('./main');
