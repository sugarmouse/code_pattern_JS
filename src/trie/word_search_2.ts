// lc 212 https://leetcode.com/problems/word-search-ii/description/

function findWords(board: string[][], words: string[]): string[] {
    const trie = new Trie();
    const m = board.length, n = board[0].length;
    const res: Set<string> = new Set();

    // 所有单词存入字典树
    for (const word of words) {
        trie.insert(word);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(board, trie, trie.data, i, j, res);
        }
    }

    return [...res];
};

function dfs(board: string[][], trie: Trie, trieNode: TrieNode, i: number, j: number, res: Set<string>) {
    const m = board.length, n = board[0].length;

    // 过滤越界情况
    if (i < 0 || i >= m || j < 0 || j >= n) return;
    // 过滤字符重复使用
    if (board[i][j] === null) return;
    // 单词不存在
    if (trieNode === null) return;

    const node = trie.searchChar(board[i][j], trieNode);
    if (node !== null && node.word !== null) {
        res.add(node.word);
    }

    // 记录当前字符，并且board[i][j] 设置为null，为了避免同一个字符一个查找中重复使用
    const char = board[i][j];
    board[i][j] = null;

    // dfs 查找
    dfs(board, trie, node, i, j + 1, res);
    dfs(board, trie, node, i + 1, j, res);
    dfs(board, trie, node, i - 1, j, res);
    dfs(board, trie, node, i, j - 1, res);

    board[i][j] = char;
}


class TrieNode {
    word: string;
    data: TrieNode[];
    constructor() {
        this.word = null;
        this.data = new Array(26);
    }
}

class Trie {

    // root node
    data: TrieNode;

    constructor() {
        this.data = new TrieNode;
    }

    // 将单词存入字典树
    insert(word: string) {
        let p = this.data;
        for (let i = 0; i < word.length; i++) {
            const s = word[i];
            const index = this.getIndex(s);

            // 找到当前节点，初始化
            if (p.data[index] === undefined)
                p.data[index] = new TrieNode();
            const curNode = p.data[index];

            // 如果是一个单词，存入当前节点
            if (i === word.length - 1)
                curNode.word = word;

            // 指向下一个节点
            p = curNode;
        }
    }

    // 查找一个字符是否存在，若存在返回其对应的 TrieNode
    searchChar(char: string, trieNode: TrieNode): TrieNode {
        const index = this.getIndex(char);
        if (trieNode.data[index] instanceof TrieNode) return trieNode.data[index];
        else return null;
    }

    // 计算一个字符对应的index
    getIndex(char: string): number {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}

export { };