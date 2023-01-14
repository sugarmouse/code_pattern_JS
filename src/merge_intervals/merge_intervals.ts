
export function merge(intervals: number[][]): number[][] {
  let tmp = intervals[0];
  let ans: number[][] = [];
  let i = 1;
  intervals.sort((interval1, interval2) => interval1[0] - interval2[0]);

  while (i < intervals.length) {
    if (tmp[1] < intervals[i][0]) {
      // 有间隔
      ans.push(tmp);
      tmp = intervals[i];
    } else {
      tmp = [Math.min(tmp[0], intervals[i][0]), Math.max(tmp[1], intervals[i][1])];
    }
    i++;
  }
  ans.push(tmp);
  return ans;
};

export function merge1(intervals: number[][]): number[][] {

  intervals.sort((a, b) => a[0] - b[0]);
  const ans: number[][] = [];
  ans.push(intervals[0]);

  for (let i = 1; i < intervals.length; i++) {
    const ansTailInterval = ans[ans.length - 1]
    if (ansTailInterval[1]>= intervals[i][0]) ansTailInterval[1] = Math.max(ansTailInterval[1], intervals[i][1]);
    else ans.push(intervals[i])
  }

  return ans;
};


// 就地解决
function merge2(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);

  let i = 1;
  while (i < intervals.length) {
    const [a1, b1] = intervals[i - 1];
    const [a2, b2] = intervals[i];

    if (b1 > a2) intervals.splice(i - 1, 2, [a1, Math.max(b1, b2)]);
    else i++;
  }
  return intervals;
};

merge2([[1,2]])