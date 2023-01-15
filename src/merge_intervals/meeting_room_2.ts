// leetcode 253 https://leetcode.com/problems/meeting-rooms-ii/
// subscribed user accessible only

// 扫描线算法，主要

function findSets(intervals: number[][]) {

  let room = [];
  // 建立 room 时间线数组，
  for (let i = 0; i < intervals.length; i++) {
    room.push([intervals[i][0], 1]);
    room.push([intervals[i][1], -1]);
  }

  room.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });
  let tmp = 0;
  let ans = 0;
  for (let i = 0; i < room.length; i++) {
    tmp += room[i][1];
    ans = Math.max(ans, tmp);
  }
  return ans;
}
