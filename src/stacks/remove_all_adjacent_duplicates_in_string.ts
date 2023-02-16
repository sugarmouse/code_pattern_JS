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


function removeDuplicates_s(s: string): string {
    const stack: string[] = [];
    let i = 0;
    while (i < s.length) {
        if (stack[stack.length - 1] !== s[i]) {
            stack.push(s[i]);
        } else {
            stack.pop();
        }
        i++
    }
    return stack.join("");
};