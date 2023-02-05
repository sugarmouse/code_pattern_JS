// leecode 378
// ./Kth_smallest_number_in_M_sorted_list.ts 一样
import { MinHeap } from "../data_structures/heap/Heap"

function kthSmallestNumber(matrix:number[][], k:number) {

  const mH = new MinHeap<[number, number, number[]]>()
  for (let i = 0; i < matrix.length; i++) {
      const tmp = matrix[i].shift()
      mH.offer([tmp, i, matrix[i]])
  }
  let count = 0
  let ans = null

  while (count < k && mH.size() > 0) {
      let tmp = mH.poll()
      ans = tmp[0]
      if ( tmp[2].length > 0) {
          let next = tmp[2].shift()
          tmp = [next, tmp[1], tmp[2]]
          mH.offer(tmp)
      }
      count++
  }
  return ans;
}