// 卡牌分组
// [1,2,3,4,4,3,2,1] -> [1,1] [2,2] [3,3] [4,4]
// [1,1,2,2,2,2] -> [1,1] [2,2] [2,2]
// [1,1,1,2,2,2,3,3] -> false
// 最小长度的分组 是 别的组的整数倍

function kapai(...arrs) {
    return arrs;
}

console.log(kapai(1, 1, 2, 2, 3, 3));
