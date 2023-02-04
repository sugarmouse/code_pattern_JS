/**
 * 一个机器同时只能处理一向任务，实现函数 tasks() ，计算处理一系列任务所需要的机器数的最小值
 * 
 * 输入：
 *    tasksList: Array<[start, end]> 表示一项任务的起始时间和结束时间
 * 
 * 输出：
 *    n：number 处理输入任务列表所需要的最少机器
 * 
 * constrains:
 *    start <= end
 * 
 * Time Complexity: O(n logn)
 */

import { MinHeap } from "../data_structures/heap/Heap";

/**
 * 1. 创建一个最小堆存放所有的 task
 * 2. 创建第二个堆记录正在使用的机器 和 此机器正在执行的任务
 * 3. 遍历任务列表，给每个任务分配机器
 * 4. 取第一个堆中的堆顶任务。
 *    检查机器堆中是否有机器正在工作，有的话，比较当前机器处理的任务结束时间和当前需要分配的任务的起始时间；
 *      如过可以分配给该机器，则更新此机器状态，不可以则分配一个新的机器。
 * 5. 最后返回最大的机器编号数
 */

function tasks(tasksList: [number, number][]) {

  // 记录正在工作的机器数量
  let optimalMachines = 0;

  // 记录当前任务所分配的机器
  let machineInUse: [number, number];

  // 最小堆表示正在工作的机器，一个节点表示一个机器，以机器当前工作的结束时间排列
  let machinesAvailable = new MinHeap<[endTime: number, machineIndex: number]>((a, b) => {
    if (a[0] === b[0]) return 0;
    return a[0] < b[0] ? -1 : 1;
  });

  // 将输入的任务列表初始化为最小堆，以起始时间排列
  let tasksHeap = new MinHeap<[number, number]>((a, b) => {
    if (a[0] === b[0]) return 0;
    return a[0] < b[0] ? -1 : 1;
  });
  for (let item of tasksList) {
    tasksHeap.add(item);
  }

  // 循环处理任务
  while (tasksHeap.size()) {

    let task = tasksHeap.poll();

    if (machinesAvailable.size() && task[0] >= machinesAvailable.peek()[0]) {
      // 如果最早结束的机器可以接着处理当前任务，则更新该机器正在处理的任务
      machineInUse = machinesAvailable.poll();
      machineInUse = [task[1], machineInUse[1]];
    } else {
      // 最早结束的任务来不及处理当前要分配的任务，则分配一个新的机器
      optimalMachines += 1;
      machineInUse = [task[1], optimalMachines];
    }
    // 当前机器推入机器堆
    machinesAvailable.add(machineInUse);
  }

  return optimalMachines;
}
 

// 很典型的扫描线算法能解决的问题，找出一系列区间的最大重叠数
function tasks_scanLine(tasksList: [number, number][]): number {

  let ans = 0, scanLine = 0;
  const scanList: Array<[number, number, number]> = [];

  tasksList.forEach((item, index) => {
    scanList.push([item[0], 1, index], [item[1], -1, index]);
  });

  scanList.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[2] === b[2]) return b[1] - a[1];
      else return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  for (let i = 0; i < scanList.length; i++) {
    scanLine += scanList[i][1];
    ans = Math.max(ans, scanLine);
  }

  return ans;
}
