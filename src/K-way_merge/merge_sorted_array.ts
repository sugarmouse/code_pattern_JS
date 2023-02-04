// leetcode 88  https://leetcode.com/problems/merge-sorted-array/description/


/**
 Do not return anything, modify nums1 in-place instead.
 */

function merge(nums1: number[], m: number, nums2: number[], n: number) {
  let p = nums1.length - 1, p1 = m - 1, p2 = n - 1;

  while (p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p--;
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p--;
      p2--;
    }
  }
}