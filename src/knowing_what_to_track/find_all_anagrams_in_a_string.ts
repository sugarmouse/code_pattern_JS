// lc 438  https://leetcode.com/problems/find-all-anagrams-in-a-string/

    function findAnagrams(s: string, p: string): number[] {


        const res = [];
        const pLen = p.length,
            sLen = s.length;
        const start = 'a'.charCodeAt(0);
        const arr = new Array(26).fill(0);
        const arr2 = new Array(26).fill(0);

        if (pLen > sLen) return [];

        for (let i = 0; i < pLen; i++) {
            const index = p[i].charCodeAt(0) - start;
            arr[index] += 1;
            const index2 = s[i].charCodeAt(0) - start;
            arr2[index2] += 1;
        }

        const sign = arr.toString();

        if (arr2.toString() === sign)
            res.push(0);

        for (let i = 1; i <= sLen - pLen; i++) {
            const inIndex = s[i + pLen - 1].charCodeAt(0) - start,
                outIndex = s[i - 1].charCodeAt(0) - start;
            arr2[inIndex] += 1;
            arr2[outIndex] -= 1;
            if (arr2.toString() === sign)
                res.push(i);
        }

        return res;

    };