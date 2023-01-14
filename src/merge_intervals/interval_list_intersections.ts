
function intervalIntersection(firstList: number[][], secondList: number[][]): number[][] {

  let i = 0, j = 0;
  const output: number[][] = [];
  let inetrsection: number[] = [];

  while (i < firstList.length || j < secondList.length) {
    if (firstList[i] && secondList[j] && !(firstList[i][0] > secondList[j][1] || firstList[i][1] < secondList[j][0])) {
      inetrsection = [Math.max(firstList[i][0], secondList[j][0]), Math.min(firstList[i][1], secondList[j][1])];
      output.push(inetrsection);
    }
    if (!firstList[i]) j++;
    else if (!secondList[j]) i++;
    else firstList[i][1] > secondList[j][1] ? j++ : i++;
  }
  return output;
};