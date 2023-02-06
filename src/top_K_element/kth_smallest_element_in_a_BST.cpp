// leetcode 230  https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/

#include <queue>

using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(): val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x): val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* left, TreeNode* right): val(x), left(left), right(right) {}
};


class Solution {
public:
    void treeToHeap(TreeNode* root, priority_queue <int, vector<int>, greater<int> >& q) {
        if (root == NULL) return;
        q.push(root->val);

        treeToHeap(root->left, q);
        treeToHeap(root->right, q);
    }

    int kthSmallest(TreeNode* root, int k) {
        // 最小堆
        priority_queue <int, vector<int>, greater<int>> q;
        treeToHeap(root, q);

        while (--k) {
            q.pop();
        }
        return q.top();
    }
};
