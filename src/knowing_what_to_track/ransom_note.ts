// lc 383 https://leetcode.com/problems/ransom-note/

function canConstruct(ransomNote: string, magazine: string): boolean {
    const map = new Map();

    for (const s of magazine) {
        const times = map.has(s) ? map.get(s) + 1 : 1;
        map.set(s, times);
    }

    for (const s of ransomNote) {
        if (!map.has(s)) return false;
        const times = map.get(s) - 1;
        if (times < 0) return false;
        map.set(s, times);
    }

    return true;
};