// lc 1029  https://leetcode.com/problems/two-city-scheduling/


// 按照 costai - costbi 的大小进行排序，前一半去a， 后一半去b
function twoCitySchedCost(costs: number[][]): number {
    const n = costs.length, half = n / 2;
    costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));
    let total = 0;
    for (let i = 0; i < n; i++) {
        if (i < half) {
            total += costs[i][0];
        } else {
            total += costs[i][1];
        }
    }
    return total;
};
