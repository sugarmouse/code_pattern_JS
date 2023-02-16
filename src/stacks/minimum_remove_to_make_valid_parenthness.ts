// leetcode 1249  https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/

function minRemoveToMakeValid(s: string): string {
    const stack: [string, number][] = [],
        resArr = s.split('');
    let res = '';
    
    // 找出所有多余的括号，记录其下标
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push([s[i], i]);
        }
        else if (s[i] === ')') {
            if (stack.length > 0 && stack[stack.length - 1][0] === '(') {
                stack.pop();
            } else {
                stack.push([s[i], i]);
            }
        }
    }

    // 对需要删除的括号进行标记
    for (const item of stack) {
        resArr[item[1]] = null;
    }

    // 拼接字符串
    resArr.forEach(char => {
        if (char !== null) res += char;
    });
    
    return res;

};

