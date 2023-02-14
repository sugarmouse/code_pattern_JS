// leetcode https://leetcode.com/problems/basic-calculator/


function calcilator(expression: string) {
    let i,
        number = 0, // 记录当前需要处理的数字
        operations_stack = [], // 
        result = 0, // 计算结果
        signValue = 1, // 正负号处理
        length = expression.length;

    for (i = 0; i < length; i++) {
        let c = expression[i];

        // 数字处理
        if (!isNaN(parseInt(c))) {
            number = number * 10 + parseInt(c);
        }

        // 操作符号处理
        if ("+-".includes(c)) {
            result += number * signValue;
            signValue = c == '-' ? -1 : 1;
            number = 0;
        } else if (c === "(") {
            // 从左往右遇到（，将之前的 result 和 signValue 入栈
            operations_stack.push(result);
            operations_stack.push(signValue);
            // 值初始化
            result = 0;
            signValue = 1;
        } else if (c === ")") {
            result += signValue * number;
            let popSignValue = operations_stack.pop();
            result *= popSignValue;

            let secondValue = operations_stack.pop();
            result += secondValue;
            number = 0;
        }
    }
    return result + number * signValue;
}