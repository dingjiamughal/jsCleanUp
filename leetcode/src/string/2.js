// 卡牌分组
// 1和0的数量一样
// 00110011 -> 0011 01 1100 10 0011 01
export default arr => {
    arr.sort((a, b) => a - b);
    let min = Math.MAX_SAFE.INTEGER;
    let dst = [];
    let result = true;
    for (let i = 0; i < arr.length; i++) {
        let tmp = [];
        tmp.push(arr[i]);
        for (let j = i + 1; j < arr.length - 1; j++) {
            if (arr[i] === arr[j]) {
                tmp.push(arr[j]);
            }
            else {
                if (min > tmp.length) {
                    min = tmp.length;
                    dst.push([...tmp]);
                    tmp.length = 0;
                    i = j;
                    break;
                }
            }
        }
    }
};
