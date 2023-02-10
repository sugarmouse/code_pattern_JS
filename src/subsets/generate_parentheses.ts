// leetcode 22  https://leetcode.com/problems/generate-parentheses/

/**
 * We start with an empty string, and at each step, we can either add an opening bracket or a closing
 * bracket. 
 * 
 * We can only add a closing bracket if it would not exceed the number of opening brackets. 
 * 
 * We can only add an opening bracket if it would not exceed n
 * @param {number} n - the number of pairs of parentheses we need to generate
 * @returns an array of strings.
 */
function generateParenthesis_BFS(n: number): string[] {
    const result: string[] = [];

    const BFS = (n: number, open: number, close: number, current: string) => {

        if (current.length === n << 1) {
            result.push(current);
            return;
        }

        if (open < n) BFS(n, open + 1, close, current + '(');
        if (close < open) BFS(n, open, close + 1, current + ')');
    };

    BFS(n, 0, 0, "");

    return result;
};


/**
 * We start with an empty track, and we try to add a '(' or a ')' to it. 
 * If we can add a '(', we do so and continue recursively. 
 * If we can add a ')', we do so and continue recursively. 
 * When we can't add either, we know that we have a valid track, so we add it to the result
 * @param {number} n - the number of pairs of parentheses
 */
function generateParenthesis_trackback(n: number): string[] {
    const result: string[] = [],
        track: string[] = [];

    const trackback = (n: number, open: number, close: number, result: string[], track: string[]) => {

        if (open === n && close === n) {
            result.push(track.join(""));
            return;
        }

        if (open < n) {
            track.push('(');
            trackback(n, open + 1, close, result, track);
            track.pop();
        }
        if (open > close) {
            track.push(')');
            trackback(n, open, close + 1, result, track);
            track.pop();
        }
    };

    trackback(n, 0, 0, result, track);
    return result;
}