// leetcode 347  https://leetcode.com/problems/top-k-frequent-elements/

#include <vector>
#include <queue>
#include <unordered_map>

using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> map;
        // 最小堆
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>> > pq;
        vector<int> ans;

        for (int num : nums) {
            map[num] += 1;
        }

        nums.clear();

        int count = 0;
        for (auto item : map) {
            if (count < k) {
                pq.push(make_pair(item.second, item.first));
            }
            else {
                // pq 里已经有 k 个元素
                if (item.second < pq.top().first) {
                    // cur frequency < 堆顶元素
                    continue;
                }
                else {
                    pq.push(make_pair(item.second, item.first));
                    pq.pop();
                }
            }
            count++;
        }

        while (pq.size()) {
            ans.push_back(pq.top().second);
            pq.pop();
        }
        return ans;
    }
};