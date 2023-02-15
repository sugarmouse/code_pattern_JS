// leetcode 200  https://leetcode.com/problems/number-of-islands/description/

function numIslands(grid: string[][]): number {
    let num = 0;
    const width = grid[0].length,
        height = grid.length;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            num += 1;
            if (grid[i][j] === '1') bfs(grid, i, j);
        }
    }
    return num;
};

// bfs 孤岛置零 
function bfs(grid: string[][], i: number, j: number) {
    let q: number[][] = [];
    q.push([i, j]);

    while (q.length > 0) {
        const size = q.length;

        for (let i = 0; i < size; i++) {
            const tmp = q.shift();
            const [x, y] = tmp;
            grid[x][y] = '0';

            // 把周围的 1 的节点都推入队列，等待下次置零操作，直到周围没有 1
            if (x - 1 > 0 && grid[x - 1][y] === '1') q.push([x - 1, y]);
            if (x + 1 < grid.length && grid[x + 1][y] === '1') q.push([x + 1, y]);
            if (y - 1 > 0 && grid[x][y - 1] === '1') q.push([x, y - 1]);
            if (y + 1 > grid[0].length && grid[x][y + 1] === '1') q.push([x, y + 1]);
        }
    }
}

// dfs 孤岛置零
function dfs(grid: string[][], i: number, j: number) {

    const m = grid.length, n = grid[0].length;
    if (i < 0 || j < 0 || i >= m || j >= n || grid[i][j] === '0') return;
    grid[i][j] = '0';
    dfs(grid, i - 1, j);
    dfs(grid, i + 1, j);
    dfs(grid, i, j - 1);
    dfs(grid, i, j + 1);
}