// leetcode 636  https://leetcode.com/problems/exclusive-time-of-functions/



function exclusiveTime(n: number, logs: string[]): number[] {
    let logStack = [],
        result = new Array(n).fill(0);

    for (let content of logs) {
        const strs = content.split(":");
        let log = {
            strs: strs,
            id: parseInt(strs[0]),
            isStart: strs[1] == "start",
            time: parseInt(strs[2])
        };
        if (log.isStart) {
            logStack.push(log);
        } else {
            let top = logStack.pop();
            const curDuration =  log.time - top.time + 1;
            result[top.id] += curDuration;
            if (logStack.length > 0) {
                result[logStack[logStack.length - 1].id] -= curDuration;
            }
        }
    }
    return result;
};
