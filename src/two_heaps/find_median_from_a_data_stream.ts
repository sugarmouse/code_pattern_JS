// leetcode 295  https://leetcode.com/problems/find-median-from-data-stream/

/**
 * 1. 将输入的数据流分成两部分：一：小于等于当前中位数，和二：大于当前中位数的两部分
 * 2. 第一部分数据存放在最大堆，第二部分存放于最小堆
 * 3. if(minHeap.size() < maxHeap.size() || minHeap.size() > maxHeap.size() + 1 ) rebalance the heaps
 * 4. if(MedianFinder.data.length() % 2 === 0) (return minHeap.peek() + maxHeap.peek() ) / 2
 *    else return minHeap.peek()
 */
import { MinHeap } from "../data_structures/heap/Heap";


class MedianFinder {

  data: number[];
  minHeap: MinHeap<number>;
  maxHeap: MinHeap<number>;
  currentMedian: number;

  constructor() {
    this.data = [];
    this.minHeap = new MinHeap();
    this.maxHeap = new MinHeap();
  }

  addNum(num: number): void {
    this.data.push(num);

    if (num > this.currentMedian) {
      this.minHeap.add(num);
    } else {
      this.maxHeap.add(-1 * num);
    }
    this.rebalanceHeaps();
    this.currentMedian = this.findMedian();
  }

  rebalanceHeaps() {
    while (this.minHeap.size() > this.maxHeap.size() + 1) {
      let tmp = this.minHeap.poll();
      this.maxHeap.add(-1 * tmp);
    }
    while (this.minHeap.size() < this.maxHeap.size()) {
      let tmp = -1 * this.maxHeap.poll();
      this.minHeap.add(tmp);
    }
  }

  findMedian(): number {
    return this.data.length % 2
      ? this.minHeap.peek()
      : (this.minHeap.peek() + (-1 * this.maxHeap.peek())) / 2;
  }
}
