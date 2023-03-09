// lc 49 https://leetcode.com/problems/group-anagrams/

function groupAnagrams(strs: string[]): string[][] {
    const map = new Map<string, string[]>();
    const res: string[][] = [];

    for (const str of strs) {
        const arr: number[] = new Array(26).fill(0);

        for (const char of str) {
            const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            arr[index] += 1;
        }
        // 这里不能直接用 join(""), 当一个字符出现 10 次的时候，可能会出现判断失误
        // 直接用 join("") 的话，  ["bdddddddddd","bbbbbbbbbbc"] 两个字符串生成的 key 都是 '010100000000000000000000000'
        const key = arr.toString();

        if (map.has(key))
            map.get(key).push(str);
        else
            map.set(key, [str]);
    }

    for (const val of map.values())
        res.push(val);

    return res;
};

export {}