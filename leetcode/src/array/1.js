// 电话号码组合
// 按键 2~9 2->'abc' 3->'def'...
// '23' -> ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']

function tele(str) {
    const map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    const nums = str.split('').map(num => map[num]); // ['abc', 'def', 'ghi']

    

    const handle = (arr) => {
        let result = [];

        for (let i = 0; i < arr[0].length; i ++) {
            for (let j = 0; j < arr[1].length; j ++) {
                result.push(arr[0][i] + arr[1][j])
            }
        }
        arr.splice(0, 2, result);

        if (arr.length > 1) {
            handle(arr);
        }
        // else {
        //     return result;
        // }
        return arr[0];
    }
    
    return handle(nums);
}

console.log(tele('234'))