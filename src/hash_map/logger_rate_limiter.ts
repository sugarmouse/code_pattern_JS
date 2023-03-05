// lc 359  https://leetcode.com/problems/logger-rate-limiter/

class RequestLogger {

    timeLimit: number;
    map: Map<string, number>;
    
    constructor(timeLimit: number) {
        this.timeLimit = timeLimit;
        this.map = new Map<string, number>();
    }

    messageRequestDecision(timestamp: number, request: string) {
        if (
            this.map.has(request)
            && timestamp - this.map.get(request) < this.timeLimit
        ) {
            return false;
        }

        this.map.set(request, timestamp);
        return true;
    }
}