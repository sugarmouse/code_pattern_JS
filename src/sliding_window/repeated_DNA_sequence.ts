// leetcode 187  https://leetcode.com/problems/repeated-dna-sequences/description/

// 滚动 hash
export function findRepeatedDnaSequences_rollingHash(s: string, n: number) {
  const base = 4;
  const ansSet = new Set<string>();
  let hashStack: number[] = [];

  if (n >= s.length) return Array.from(ansSet);

  const hashSet = new Set<number>();
  const ChartToNum = new Map(Object.entries({
    'A': 1,
    'C': 2,
    'G': 3,
    'T': 4
  }));

  const getNum = (index: number): number => ChartToNum.get(s[index]);

  //计算前 n 个构成的字符串的滚动 hash 值
  let hashNum: number = 0;
  for (let i = 0; i < n; i++) {
    hashNum += getNum(i) * Math.pow(4, n - i - 1);
  }
  hashSet.add(hashNum);
  hashStack.push(hashNum);

  // 移动窗口，当前 hash 值在集合中，则把对应的窗口截取的字符串加入 集合
  for (let i = n; i < s.length; i++) {
    hashNum = ((hashNum - getNum(i - n) * Math.pow(base, n - 1)) * base) + getNum(i) * Math.pow(base, 0);
    if (hashSet.has(hashNum)) {
      ansSet.add(s.slice(i - n + 1, i + 1));
    }
    hashSet.add(hashNum);
    hashStack.push(hashNum);
  }

  return Array.from(ansSet);
}




// 用 map 存储
function findRepeatedDnaSequences(s: string, n: number): string[] {

  const ans: string[] = [];
  if (n > s.length) return ans;

  const map = new Map<string, number>();
  for (let i = 0; i < s.length - n + 1; i++) {
    const subSeq = s.slice(i, i + n);
    map.set(subSeq, map.get(subSeq) ? map.get(subSeq) + 1 : 1);
  }

  map.forEach((times, subSeq) => {
    if (times > 1) ans.push(subSeq);
  });

  return ans;

};