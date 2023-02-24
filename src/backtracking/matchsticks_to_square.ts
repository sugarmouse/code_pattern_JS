// lc 473  https://leetcode.com/problems/matchsticks-to-square/

function makesquare(matchsticks: number[]): boolean {
    const sum = matchsticks.reduce((acc, cur) => acc + cur, 0);
    if (sum % 4 !== 0) return false;

    // 降序排序, 为了是从长的火柴开始枚举，可以降低搜索空间
    matchsticks.sort((a, b) => b - a);

    const target = sum / 4;
    const sides = [0, 0, 0, 0];

    const dfs = (index: number): boolean => {

        // 因为火柴全都用完，且每一条边都不超过总长的 1/4 
        // 所以每一条边都等于 1/4
        if (index === matchsticks.length) return true;

        for (let i = 0; i < 4; i++) {

            // 因为 matchsticks 已经由大到小被排序过，所以 side[i] 也是从
            // 如果边加上 matchsticks[i] 超过了边长，只能把其往下一个边长放
            if (sides[i] + matchsticks[index] > target) continue;

            // 做选择
            sides[i] += matchsticks[index];
            if (dfs(index + 1)) return true;
            // 撤销选择
            sides[i] -= matchsticks[index];
        }
        // 如果某火柴在任意一条边都不能放，就返回 false
        return false;
    };
    return dfs(0);
}
