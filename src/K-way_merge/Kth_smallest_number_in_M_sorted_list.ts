// leetcode 378  https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/

import { MinHeap } from "../data_structures/heap/Heap";


// You must find a solution with a memory complexity better than O(n2).


// 时间复杂度 O(k logn) 空间复杂度：O(n)
function kthSmallest(lists: number[][], k: number) {

  const minHeap = new MinHeap<[number, number]>((a, b) => a[0] - b[0]);
  let outNum = 0;
  let ans;

  // 把每一行的第一个元素推入堆中,同时记录每个元素对应的 list 编号
  for (let i = 0; i < lists.length; i++) {
    minHeap.offer([lists[i][0], i]);
    lists[i].shift();
  }

  while (minHeap.size() > 0 && outNum < k) {

    // 从最小堆弹出一个元素和对应的 list 编号
    const [tmp, listIndex] = minHeap.poll();
    ans = tmp;
    outNum++;

    // 如果对应列表还有元素，则把下一个元素推入最小堆
    if (lists[listIndex].length !== 0) {
      minHeap.offer([lists[listIndex][0], listIndex]);
      lists[listIndex].shift();
    }
  }
  return ans;
}



// O(n*logc) time; O(1) space;
// c is numbers count between matrix[0][0] to matrix[size - 1][size - 1]
function kthSmallest_binary_search(matrix: number[][], k: number): number {
  const size = matrix.length;
  let l = matrix[0][0];
  let r = matrix[size - 1][size - 1];

  while (l < r) {
    const m = l + Math.floor((r - l) / 2);
    const nthSmallest = countSmallerOrEqual(matrix, m);
    if (nthSmallest < k) {
      l = m + 1;
    } else {
      r = m;
    }
  }
  return l;
}

function countSmallerOrEqual(matrix: number[][], target: number) {
  const size = matrix.length;
  let count = 0;
  let row = size - 1;
  let col = 0;

  while (row >= 0 && col < size) {
    const num = matrix[row][col];
    if (num <= target) {
      count += row + 1;
      col++;
    } else {
      row--;
    }
  }
  return count;
}