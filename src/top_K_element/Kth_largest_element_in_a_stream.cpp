// leetcode 703 https://leetcode.com/problems/kth-largest-element-in-a-stream/description/

#include <vector>
#include <queue>

using namespace std;

class KthLargest {
public:
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int kth;
    int lastOne;

    KthLargest(int k, vector<int>& nums) {
        for (auto it = nums.begin(); it < nums.end(); it++) {
            minHeap.push(*it);
        }
        kth = k;
        
        while (minHeap.size() > kth) {
            minHeap.pop();
        }
    }

    int add(int val) {
        minHeap.push(val);
        if (minHeap.size() > kth)
            minHeap.pop();
        return minHeap.top();
    }
};