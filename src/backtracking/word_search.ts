// lc 79  https://leetcode.com/problems/word-search/


function exist(board: string[][], word: string): boolean {
    const m = board.length, n = board[0].length;
    let found = false;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(board, word, i, j, 0);
            if (found) return true
        }
    }

    return false;



    /**
     * 查找 从 board[i][j] 是否与 word[p] 是一样的字符，如果是的话，继续往其上下左右继续查找
     * @param {string[][]} board - 字符表
     * @param {string} word - 要查找的单词
     * @param {number} i - 当前单词的 row 下标
     * @param {number} j - 当前单词的 col 下标
     * @param {number} p - 单词中需要查找的当前字符的下标
     * @returns 
     */
    function dfs(board: string[][], word: string, i: number, j: number, p: number) {
        const m = board.length, n = board[0].length;

        if (p === word.length) {
            found = true;
            return;
        }
        // 防止多余的计算，只要找到一个符合要求的单词后续就不需要继续查找
        if (found === true) return;

        // 超出边界直接结束这次搜索
        if (i < 0 || j < 0 || i >= m || j >= n) return;

        // 如果当前字符不是所需要搜索的字符，直接结束此次搜索
        if (board[i][j] !== word[p]) return;

        // 给当前的字符做个标记，因为字符不可以重复使用
        board[i][j] += '-';

        // 向上下左右进行搜索
        dfs(board, word, i - 1, j, p + 1);
        dfs(board, word, i + 1, j, p + 1);
        dfs(board, word, i, j - 1, p + 1);
        dfs(board, word, i, j + 1, p + 1);

        // 当前单词树搜索完之后把修改过的字符还原
        board[i][j] = board[i][j].slice(0, 1);
    }
};
