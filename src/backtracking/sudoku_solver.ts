// lc 37  https://leetcode.com/problems/sudoku-solver/description/

/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
    backtrack(board, 0, 0);
};

function backtrack(board: string[][], i: number, j: number): boolean {
    const m = board.length, n = board[0].length;
    // base case 找到一个合适的结果就结束继续搜索
    if (i >= m) return true;

    // 一行结束了继续下一行
    if (j >= n) return backtrack(board, i + 1, 0);

    // 此格子不是空的，则进行下一个
    if (board[i][j] !== '.') return backtrack(board, i, j + 1);

    for (let char = 1; char <= 9; char++) {
        const num = char.toString();
        if (!isValid(board, i, j, num)) continue;
        
        // 做选择
        board[i][j] = num; 

        // 找到一个选择，立即结束
        if (backtrack(board, i, j + 1)) return true;

        // 撤销选择
        board[i][j] = '.';
    }
    // 穷举完之后找不到合适的结果，返回 false
    return false;
}

function isValid(board: string[][], row: number, col: number, num: string): boolean {

    for (let i = 0; i < 9; i++) {
        // 检查行是否有相同元素
        if (board[row][i] === num) return false;
        // 检查是否列有相同元素
        if (board[i][col] === num) return false;
        // 检查九宫格内是否有相同元素
        if (board[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] === num) return false;
    }

    return true;
}