// leetcode 759  https://leetcode.com/problems/employee-free-time/
// subscribed user accessible only

function employeeFreeTime(schedule: Interval[][]): Interval[] {

  let list: Interval[] = [];
  const result: Interval[] = [];
  let preEnd: number = list[0].end;
  schedule.forEach(item => { list = list.concat(item); });

  list.sort((a, b) => a.start - b.start);

  for (let i = 1; i < list.length; i++) {
    if (list[i].start > preEnd) {
      const pushed = new Interval(preEnd, list[i].start);
      result.push(pushed);
    }
    preEnd = Math.max(list[i].end, preEnd);
  }
  return result;
}


class Interval {
  start: number;
  end: number;
  closed: boolean;

  setClosed: (closed: boolean) => void;
  formatInterval: () => string;


  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.closed = true; // the interval is closed by default

    this.setClosed = function (closed) {
      this.closed = closed;
    };

    this.formatInterval = function () {
      return this.closed
        ? "[" + this.start + ", " + this.end + "]"
        : "(" + this.start + ", " + this.end + ")";
    };
  }
}