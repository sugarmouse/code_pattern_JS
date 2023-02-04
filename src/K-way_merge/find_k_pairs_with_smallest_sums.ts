// leetcode 373 https://leetcode.com/problems/find-k-pairs-with-smallest-sums/description/

import { MinHeap } from "../data_structures/heap/Heap";

// 将 [和，[index1, index2] ] 按照和推入堆，然后不断地弹出和推入元素
// 推出的元素存入结果，直到推出 k 个元素，返回结果

function kSmallestPaires(list1: number[], list2: number[], k: number): number[][] {
  const result: number[][] = [];
  const mHeap = new MinHeap<[sum: number, indexes: [index1: number, index2: number]]>((a, b) => a[0] - b[0]);

  let count = 0;
  for (let i = 0; i < list1.length; i++) {
    mHeap.offer([list1[i] + list2[0], [i, 0]]);
  }

  while (mHeap.size() && count <= k) {
    let [, [i1, i2]] = mHeap.poll();
    result.push([list1[i1], list2[i2]]);
    count++;


    if (i2 < list2.length - 1) {
      mHeap.offer([list1[i1] + list2[++i2], [i1, i2]]);
    }
  }
  return result;
}