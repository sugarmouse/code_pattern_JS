// lc 389 https://leetcode.com/problems/find-the-difference/

// a ^ 0 === a
// a ^ a === 0

function findTheDifference(s: string, t: string): string {
    let res = 0;

    for (const c of s)
        res = res ^ c.charCodeAt(0);
    for (const c of t)
        res = res ^ c.charCodeAt(0);

    return String.fromCharCode(res);
}

export { };