

/**
 * 1.初始化两个
 */

/**
 * 
 * @param str1 
 * @param str2 
 * @returns 
 */
export function minWindow(str1: string, str2: string) {
  let p1 = 0, p2 = 0;
  let check = false;
  let rightEnd = 0;
  // 正向
  while (p1 < str1.length) {
    if (str1[p1] === str2[p2]) p2++;
    p1++;
    if (p2 === str2.length) {
      check = true;
      rightEnd = p1 - 1;
      break;
    }
  }
  //check === false 说明不存在
  if (check === false) return "";
  // 反向
  let rp2 = str2.length - 1;
  let rp1 = rightEnd;
  while (rp2 >= 0) {
    if (str1[rp1] === str2[rp2]) rp2--;
    rp1--;
  }

  let leftEnd = rp1 + 1;
  return str1.slice(leftEnd, rightEnd);
}