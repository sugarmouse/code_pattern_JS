// lc 93  https://leetcode.com/problems/restore-ip-addresses/description/

function restoreIpAddresses(s: string): string[] {
    const result: string[] = [], track: number[] = [];
    backtrack(s, track, result);
    return result;
};

// 找出一串数字的 可以分成 [0,255] 之间的四个数的所有组合 
function backtrack(s: string, track: number[], result: string[]) {

    const n = s.length;
    if (track.length === 3) {
        let resS = '';
        const tmp = [0, ...track, n];
        for (let i = 0; i < tmp.length - 1; i++) {
            const subs = s.substring(tmp[i], tmp[i + 1]);
            if (subs.length < 1) return;
            if (subs.length > 1 && subs[0] === '0') return;
            if (Number(subs) > 255) return;
            resS = resS + subs + '.';
        }
        // console.log(`ip: ${resS} from track ${track}`)
        result.push(resS.substring(0, resS.length - 1));
        return;
    }

    for (let i = 1; i <= n - 1; i++) {
        if (track.includes(i)) continue;
        if (track.length > 0 && i <= track[track.length - 1]) continue;

        track.push(i);
        backtrack(s, track, result);
        track.pop();
    }
}
