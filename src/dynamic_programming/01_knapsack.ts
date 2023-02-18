// 0/1 背包客问题

// profit[i][w] 对于前 i 个物品，当背包容量为 w 时，可以装的最大价值是 dp[i][w]
function findMaxKnapSackProfit(capacity: number, weights: number[], values: number[]) {
    // your code will replace this placeholder return statement
    const n = weights.length,
        profit = [];

    for (let i = 0; i <= n; i++) {
        profit[i] = new Array(capacity + 1).fill(0);
    }
    // i 和 w 从 1开始，0 号位作为哨兵位
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (w - weights[i - 1] < 0) {
                // 背包容量不足
                profit[i][w] = profit[i - 1][w];
            } else {
                // 背包容量够，装入或者不装入择优选择
                profit[i][w] = Math.max(
                    profit[i - 1][w - weights[i - 1]] + values[i - 1],
                    profit[i - 1][w]
                );
            }
        }
    }
    return profit[n][capacity];
}