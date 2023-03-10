// lc 260  https://leetcode.com/problems/single-number-iii/

// linear runtime complexity &  constant extra space.

// a ^ b = c  => a ^ c = b & c ^ b = a;

function singleNumber(nums: number[]): number[] {
    let fxors = 0;

    for (const num of nums)
        fxors = fxors ^ num;

    // mask 表示 xor(first, second) 的最右边的 1
    // 用来区别 first 和 second 两个不同的元素，在第二次遍历 xor 的过程中就可以过滤其中一个
    // 从而先找到其中一个
    let mask = 1;
    while ((fxors & mask) === 0) mask = mask << 1;

    let first = 0;
    for (const num of nums) {
        if (num & mask)
            first = first ^ num;
    }

    return [first, first ^ fxors];
};

export { };