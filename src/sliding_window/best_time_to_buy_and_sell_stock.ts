// leetcode 121 https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/


function maxProfit(prices: number[]): number {
  let profit = 0, minimumPrice = Infinity;

  for (let i = 0; i < prices.length; i++) {
    minimumPrice = Math.min(minimumPrice, prices[i]);
    profit = Math.max(profit, prices[i] - minimumPrice);
  }
  return profit;

};