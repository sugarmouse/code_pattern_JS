// leecode 973 https://leetcode.com/problems/k-closest-points-to-origin/

#include <vector>
#include <queue>
#include <math.h>

using namespace std;

// 时间复杂度 O(n logk) , 空间复杂度 O(k)
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {

        vector<vector<int>> ans;
        // 最大堆
        priority_queue<pair<double, vector<int>>> pq;

        for (int i = 0; i < points.size(); i++) {

            double distance = sqrt(pow(points[i][0], 2) + pow(points[i][1], 2));

            if (i < k) {
                pq.push(make_pair(distance, points[i]));
            }
            else {
                if (distance > pq.top().first) {
                    continue;
                }
                else {
                    pq.push(make_pair(distance, points[i]));
                    pq.pop();
                }
            }
        }

        while (pq.size()) {
            ans.push_back(pq.top().second);
            pq.pop();
        }

        return ans;
    }
};