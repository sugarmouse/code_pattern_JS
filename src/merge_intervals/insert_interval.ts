
/**
 * naive approach
 * for (inter in intervals)
 *    if(interval overlap )
 */

export function insert1(intervals: number[][], newInterval: number[]): number[][] {

  const n = intervals.length;
  let lo = -1, hi = -1;
  let isLoDone = false, isHiDone = false;

  // 当 intervals 长度为0
  if (n === 0) {
    intervals.push(newInterval);
    return intervals;
  }

  // 插入区间的左端点 > intervals 最后一个区间的右端点
  if (newInterval[0] > intervals[n - 1][1]) {
    intervals.push(newInterval);
    return intervals;
  }

  // 插入区间的右端点 < intervals 第一个区间的左端点
  if (newInterval[1] < intervals[0][0]) {
    intervals.unshift(newInterval);
    return intervals;
  }

  // intervals 至少有一个区间，且与 [ intervals[0][0], intervals[n-1][1] ] 有交集
  // 循环遍历 寻找插入点
  for (let i = 0; i < n; i++) {
    if (newInterval[0] <= intervals[i][1] && !isLoDone) {
      lo = i;
      isLoDone = true;
    }
    if (newInterval[1] < intervals[i][0] && !isHiDone) {
      hi = i;
      isHiDone = true;
    }
    if (isHiDone && isLoDone) break;
  }


  if (hi === -1) {
    // 找不到 hi, 例如：
    // [ [1,2], [4,5] ]
    // [4, 10]
    const insertInterval1 = [Math.min(newInterval[0], intervals[lo][0]), Math.max(newInterval[1], intervals[n - 1][1])];
    intervals.splice(lo, n + 1 - lo, insertInterval1);
  } else {
    // lo 和 hi 都存在
    let insertInterval3 = [Math.min(newInterval[0], intervals[lo][0]), Math.max(newInterval[1], intervals[hi - 1][1])];
    intervals.splice(lo, hi - lo, insertInterval3);
  }

  return intervals;
};

insert2([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]);

export function insert2(intervals: number[][], newInterval: number[]): number[][] {
  const output: number[][] = [newInterval];

  for (let i = 0; i < intervals.length; i++) {

    if (output[output.length - 1][1] < intervals[i][0]) {
      // output 队尾元素在 cur 左边且无交集
      output.push(intervals[i]);
    } else if (output[output.length - 1][0] > intervals[i][1]) {
      // 队尾元素在 cur 右边
      output.splice(output.length - 1, 0, intervals[i]);
    } else {
      // 栈顶元素 与 cur 有重合
      const tail = output.pop();
      const insertInterval: number[] = [Math.min(tail[0], intervals[i][0]), Math.max(tail[1], intervals[i][1])];
      output.push(insertInterval);
    }
  }
  return output;
};


