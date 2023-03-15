/* 
    给一个长度为 n+1 的数组，本来应该放置元素 [1,n]
    但是中间有个元素重复了，所以也会有另一个元素消失了
    返回 [消失的元素， 重复的元素]
*/

function findCorruptPair(nums: number[]): number[] {
    let index = 0;
    const len = nums.length;
    while (index < len) {
        const v = nums[index];
        if (v !== index + 1 && v !== nums[v - 1]) {
            // nums[v-1]  nums[index] 交换
            [nums[v - 1], nums[index]] = [nums[index], nums[v - 1]];
        } else {
            index++;
        }
    }

    for (const [i, v] of nums.entries()) {
        if (i + 1 !== v) return [i + 1, v];
    }

}