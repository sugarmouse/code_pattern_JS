

export function minSubArrayLen(target: number, nums: number[]): number {
  let start = 0, end = 0,
    sum = 0,
    length = Infinity;

  while (end < nums.length) {
    // move end & update length 
    sum += nums[end];

    while (sum >= target) {
      // start move
      length = Math.min(length, end - start + 1);
      sum -= nums[start];
      start++;
    }
    // move end & update length 
    end++;
  }
  return length === Infinity ? 0 : length;
}