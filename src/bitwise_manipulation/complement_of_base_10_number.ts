// lc 1009  https://leetcode.com/problems/complement-of-base-10-integer/

/*
    n = 5;
    mask: 1...111
    n: 0...101

    after while loop: 
        mask -> 1...000
        ~n: 1...010
    ~n ^ mask -> 0...010
 */

function bitwiseComplement(n: number): number {
    if (n === 0) return 1;
    let mask = ~0;
    while (mask & n) mask << 1;
    return ~n ^ mask;
}

/*
    找到比 n 大的 2 的次方
    n = 5 (0...0101)
    powerof2s = 8(0...1000)
        -1 -> 7(0...0111)
*/
function bitwiseComplement_2(n: number) {
    let powerof2s = 2,
        temp = n;

    while (temp >> 1) {
        temp = temp >> 1;
        powerof2s = powerof2s << 1;
    }

    return (powerof2s - 1) ^ n;

}