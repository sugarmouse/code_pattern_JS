// lc 205  https://leetcode.com/problems/isomorphic-strings/

function isIsomorphic(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    // map { s[i]: t[i] }
    const map = new Map<string, string>();
    // 记录 t[i] 是否出现过的 map
    const map2 = new Map<string, boolean>();

    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            if (map.get(s[i]) === t[i]) continue;
            else return false;
        } else {
            if (map2.has(t[i])) return false;
            else {
                map.set(s[i], t[i]);
                map2.set(t[i], true);
            }
        }
    }
    return true;
};