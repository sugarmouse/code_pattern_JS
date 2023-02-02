// https://www.geeksforgeeks.org/maximum-amount-of-capital-required-for-selecting-at-most-k-projects/

/**
 * maximize captial
 * 
 * input:
 *  c {numer}: start-up captial
 *  k {number}: the limit on number of projects invest in
 *  capitals {number[]}: 
 *  profits {number[]}:
 */

/**
 * 1. create a min-heap for captials
 * 2. identify the projects that fall within the range of the current captial
 * 3. select the project that yields the highest profit
 * 4. add the profit earned to the current captial
 * 5. repeat untill k projects have been selected
 */

import { MinHeap } from "../data_structures/heap/Heap";


export function maximumCapital(c: number, k: number, capitals: number[], profits: number[]): number {

  let currentCapital = c;
  let capitalsMinHeap = new MinHeap<[number, number]>();
  let profitsMaxHeap = new MinHeap<[number, number]>();

  // create a min-heap for captials
  for (let x = 0; x < capitals.length; x++) {
    capitalsMinHeap.add([capitals[x], x]);
  }

  for (let counter = 0; counter < k; counter++) {
    // 找出可以投资的起的项目，将对应的项目的收入放入最大堆
    while (
      capitalsMinHeap.size() > 0 &&
      capitalsMinHeap.peek()[0] <= currentCapital
    ) {
      let element = capitalsMinHeap.poll();
      let i = element[1];
      profitsMaxHeap.add([-1 * profits[i], i]);
    }

    // 如果没有课投项目，跳出
    if (profitsMaxHeap.isEmpty()) break;
    
    // 从最大堆中找出应力最多的饿=项目进行投资
    let element = profitsMaxHeap.poll();
    let j = -1 * element[0];
    currentCapital = currentCapital + j;
  }

  return currentCapital;
}