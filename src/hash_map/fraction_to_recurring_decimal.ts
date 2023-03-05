// lc 166  https://leetcode.com/problems/fraction-to-recurring-decimal/

function fractionToDecimal(numerator: number, denominator: number): string {

    const isNeg = (numerator * denominator) < 0;
    numerator = Math.abs(numerator);
    denominator = Math.abs(denominator);

    const partial: string[] = [],
        map = new Map<number, number>();
    let result = Math.floor(numerator / denominator).toString(),
        rotateIndex: number = null,
        index = 0;

    numerator = numerator % denominator;

    // 当余数为 0 或者 小数出现循环时退出循环
    while (numerator !== 0 && rotateIndex === null) {
        numerator *= 10;
        const tempRes = Math.floor(numerator / denominator);

        // 检查是否出现循环
        if (map.has(numerator)) {
            rotateIndex = map.get(numerator);
            break;
        }

        // 记录结果
        map.set(numerator, index);
        partial.push(tempRes.toString());

        // 处理下一次循环需要使用的数据
        numerator = numerator % denominator;
        index++;
    }

    // 出现循环，在循环出现的位置加上 "()"
    if (numerator !== 0) {
        partial.splice(rotateIndex, 0, '(');
        partial.push(')');
    }

    // 有小数部分
    if (partial.length > 0) result = result + '.' + partial.join("");

    // 分式小于0
    if (isNeg) result = '-' + result;

    return result;
}