// leetcode 4 https://leetcode.com/problems/median-of-two-sorted-arrays/

/**
 * 输入：
 *  nums1, nums2 两个已经分别排序过的数组
 *
 * 输出：
 *   找出两个数组合并后的中位数
 *
 * 时间复杂度必须为 O( log(m+n) ), m, n 分别为两个数组的长度
 *
 */

#include <queue>
#include <vector>
#include <tuple>

using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {

        priority_queue<tuple<int, int>, vector<tuple<int, int>>, greater<tuple<int, int>>> mH;
        int half = (nums1.size() + nums2.size()) / 2;
        int counter = 0;
        int p1 = 0, p2 = 0;
        double lastOne;

        // 将两个数组的第一个元素推入最小堆中
        if (nums1.size()) mH.push(make_tuple(nums1[0], 1));
        if (nums2.size()) mH.push(make_tuple(nums2[0], 2));

        while (mH.size() && counter < half) {

            // 弹出一个元素，
            tuple<int, int> tmp = mH.top();
            mH.pop();
            lastOne = get<0>(tmp);
            if (get<1>(tmp) == 1 && p1 < nums1.size() - 1) {
                p1++;
                mH.push(make_tuple(nums1[p1], 1));
            }
            if (get<1>(tmp) == 2 && p2 < nums2.size() - 1) {
                p2++;
                mH.push(make_tuple(nums2[p2], 2));
            }
            ++counter;
        }

        tuple<int, int> tmp2 = mH.top();
        int curOne = get<0>(tmp2);
        return (nums1.size() + nums2.size()) % 2 ? curOne / 1.0 : (lastOne + curOne) / 2.0;

    }
};
