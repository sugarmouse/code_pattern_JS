// lc 871  https://leetcode.com/problems/minimum-number-of-refueling-stops/

function minRefuelStops(target: number, startFuel: number, stations: number[][]) {
    const n = stations.length;

    // dp[i][j] 在前面 i 站内，停留 j 站能达到的最远距离
    // 所以 j <= i
    const dp: number[][] = [];
    for (let i = 0; i <= n; i++) {
        dp.push(new Array(n + 1).fill(0));
        // 如果 j = 0,说明每一个站点都不会停，只用 startFuel 一直往前开
        // 所以 dp[i][0] = startFuel
        dp[i][0] = startFuel;
    }


    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            // 在当前 i 站不做停留加油
            // 所以能到达的最远距离与 前面 i-1 站停留 j 站到达的最远距离是一样的
            dp[i][j] = dp[i - 1][j];

            // 在当前 i 站选择加油
            // 首先要确定到达上一站（i-1）时，最大有量是否能到达当前站（i）
            if (dp[i - 1][j - 1] >= stations[i - 1][0]) {
                dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + stations[i - 1][1]);
            }

        }
    }

    // 在 dp[n][j] 里找到最小的 j，使得 dp[n][j] >= target
    for (let j = 0; j <= n; j++) {
        if (dp[n][j] >= target) return j;
    }

    return -1;

}


// 把二维数组降成一维数组
function minRefuelStops_0(target: number, startFuel: number, stations: number[][]): number {
    const n = stations.length;
    const dp: number[] = new Array(n + 1).fill(0);
    // dp[i] 存放的是到第 i 站时能到达的最远距离
    dp[0] = startFuel

    for (let i = 1; i <= n; i++) {
        for (let j = i; j >= 0; j--) {
            if (dp[j] >= stations[i - 1][0])
                dp[j + 1] = Math.max(dp[j + 1], dp[j] + stations[i - 1][1])
        }
    }

    for (const [station, fule] of dp.entries()) {
        if (fule >= target) return station
    }
    return -1
};