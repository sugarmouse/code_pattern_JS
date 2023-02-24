// lc 881  https://leetcode.com/problems/boats-to-save-people/

// naive approach 
// 勉勉强强通过测试，时间复杂度爆炸
// 尽可能的每次都利用完船的空间
// 但是因为限制人数是两人，所以当 (某个处于中间重量的人，最重的人) 可以走的时候，
//（某个处于中间的人， 稍大于某个中间的人）的组合也一定能走
// 所以此题不断地运走 （最重的人，最轻的人）的组合就可以（双指针方法）
function numRescueBoats_naive(people: number[], limit: number): number {
    people.sort((a, b) => a - b);
    let boats = 0;

    while (people.length > 0) {


        let remain = limit - people.pop();

        while (remain > 0) {
            const nextIndex = people.indexOf(remain);

            if (nextIndex !== -1) {
                people.splice(nextIndex, 1);
                break;
            }
            remain--;
        }

        boats++;
    }

    return boats;

};


// 双指针方法
function numRescueBoats(people: number[], limit: number): number {
    people.sort((a, b) => a - b);
    let lo = 0, hi = people.length - 1;
    let count = 0;

    while (lo <= hi) {
        if (people[lo] + people[hi] <= limit) {
            lo++;
            hi--;
        } else {
            hi--;
        }

        count++;
    }

    return count;
};