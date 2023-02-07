// leetcode 528  https://leetcode.com/problems/random-pick-with-weight/


#include <random>
#include <vector>

using namespace std;

class Solution {
    vector<int> preSum;

public:
    Solution(vector<int>& w)
    {
        int sum = 0;
        for (auto item : w) {
            sum += item;
            preSum.push_back(sum);
        }
    }

    int pickIndex()
    {
        int n = rand() % preSum.back();
        auto it = upper_bound(preSum.begin(), preSum.end(), n);
        return it - preSum.begin();
    }
};