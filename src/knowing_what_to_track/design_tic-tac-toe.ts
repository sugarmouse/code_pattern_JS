// lc 348  https://leetcode.com/problems/design-tic-tac-toe/

class TicTacToe {
    rows: number[];
    cols: number[];
    diagonal: number;
    antiDiagonal: number;

    constructor(n: number) {
        this.rows = Array(n).fill(0);
        this.cols = Array(n).fill(0);
        this.diagonal = 0;
        this.antiDiagonal = 0;
    }

    // 因为保证每一步都是正确的，所以这里不用考虑 player1 和 player2 同时占用了同一个棋格
    move(row: number, col: number, player: number): number {

        let currentPlayer = -1;
        const n = this.rows.length;
        if (player === 1) currentPlayer = 1;

        this.rows[row] += currentPlayer;
        this.cols[col] += currentPlayer;

        if (row === col)
            this.diagonal += currentPlayer;

        if ((col + row) === n - 1)
            this.antiDiagonal += currentPlayer;

        if (
            Math.abs(this.rows[row]) == n ||
            Math.abs(this.cols[col]) == n ||
            Math.abs(this.diagonal) == n ||
            Math.abs(this.antiDiagonal) == n
        ) {
            return player;
        }
        return 0;
    }
}