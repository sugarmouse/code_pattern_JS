// lc 190  https://leetcode.com/problems/reverse-bits/

function reverseBits(n: number): number {
    let bits = new Array(32).fill(0);
    let mask = 1, res = 0;

    for (let i = 0; i < 32; i++) {
        if (n & mask) bits[i] = 1;
        mask = mask << 1;
    }

    for (const [i, val] of bits.reverse().entries()) {
        if (val === 1)
            res = res + Math.pow(2, i)
    }

    return res;
};