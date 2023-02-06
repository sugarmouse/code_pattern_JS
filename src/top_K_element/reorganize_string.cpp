// leetcode 767 https://leetcode.com/problems/reorganize-string/

// Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.
// Return any possible rearrangement of s or return "" if not possible.

#include <string>
#include <unordered_map>
#include <queue>

using namespace std;

class Solution {
public:

 /**
  * We use a max heap to store the characters in the string, and we greedily add the most frequent
  * character to the result.
  * 
  * @param s the string we're trying to reorganize
  * 
  * @return A string.
  */
    string reorganizeString(string s) {

        string ans = "";
        unordered_map<char, int> hMap;
        priority_queue<pair<int, char>> maxHeap;

        // 计算每个字符的频率，存入hash map
        for (int i = 0; i < s.size(); i++) {
            if (hMap.count(s[i]) == 0) {
                hMap.insert(pair<char, int>{s[i], 1});
            }
            else {
                hMap[s[i]] += 1;
            }
        }

        // 按照频率推入 max heap
        for (unordered_map<char, int>::iterator it = hMap.begin(); it != hMap.end(); it++) {
            maxHeap.push(pair<int, char>{it->second, it->first});
        }

        bool hasPrev = false;
        pair<int, char> prevMax;

        while (maxHeap.size() != 0 || hasPrev) {
            auto curMax = maxHeap.top();
            maxHeap.pop();

            curMax.first -= 1;
            ans.push_back(curMax.second);

            if (hasPrev) {
                maxHeap.push(prevMax);
                hasPrev = false;
            }

            if (curMax.first != 0) {
                prevMax = curMax;
                hasPrev = true;
            }

        }

        return ans + "";


    }


    /**
     * We first count the frequency of each character, and then we greedily place the most frequent
     * character in the even indices, and the second most frequent character in the odd indices
     * 
     * @param s the string we're trying to reorganize
     */
    string reorganizeString2(string s) {

        string ans;
        unordered_map< char, int> map;
        priority_queue< pair< int, char>> pq;

        for (auto item : s) {
            map[item] += 1;
        }

        for (auto item : map) {
            pq.push(make_pair(item.second, item.first));
        }

        while (pq.size() > 1) {
            auto top1 = pq.top();
            pq.pop();
            auto top2 = pq.top();
            pq.pop();

            // ans.append(top1.second, top2.second);
            ans.push_back(top1.second);
            ans.push_back(top2.second);

            if (--top1.first)
                pq.push(top1);
            if (--top2.first)
                pq.push(top2);
        }

        if(!pq.empty()) {
            if(pq.top().first > 1) {
                return "";
            }
            return ans+pq.top().second;
        }
        return ans;
    }
};