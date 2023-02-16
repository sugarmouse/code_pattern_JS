// leetcode 1047  https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/description/

function removeDuplicates(s: string): string {
    const arr = s.split(""), stack = [];
    while (arr.length > 0) {
        if (stack[stack.length - 1] !== arr[0]) {
            stack.push(arr.shift());
        } else {
            arr.shift();
            stack.pop();
        }
    }
    return stack.join('');
};