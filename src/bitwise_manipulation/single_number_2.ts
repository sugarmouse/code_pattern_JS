// lc 137 https://leetcode.com/problems/single-number-ii/description/

/*
    因为题目规定数字为 4 byte 有符号整数，所以这里用长度为 32 的数组记录所有数字的二进制的和
    找出出现的次数不能被 3 整除的位，就是构成 single number 的数字的二进制为 1 的位
*/ 


function singleNumber(nums: number[]): number {
    const bits:number[] = new Array(32).fill(0);

    for (let num of nums) {
        for (let i = 0; i < 32; i++) {
            let tmp = num & 1;
            if (tmp) bits[i] += 1;
            num = num >> 1;
        }
    }

    let res = 0;
    for (const [index, bit] of bits.entries()) {
        if (bit % 3)
            res = res | (1 << index);
    }
    return res;

};

export { };