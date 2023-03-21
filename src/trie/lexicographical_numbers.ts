// lc 386  https://leetcode.com/problems/lexicographical-numbers/

// limitation: O(n) time, O(1) extra space


function lexicalOrder(n: number): number[] {
    const res: number[] = [];
    let cur = 1;

    for (let i = 1; i <= n; i++) {
        res.push(cur);

        if(cur * 10 <= n) {
            cur *= 10;
        } else {
            if(cur >= n) 
                cur = Math.floor(cur / 10)
            
            cur += 1;
            while(cur % 10 === 0) 
                cur = cur / 10;
        }
    }

    return res;

};




// trie 方法，但是不符合题目要求

function lexicalOrder_tire(n: number): number[] {
    // Your code will replace this placeholder return statement
    const res: number[] = [];
    const record: string[] = [];
    const trie = new Trie();

    for (let i = 1; i <= n; i++) {
        trie.insert(i.toString());
    }

    const trieNode = trie.root;

    dfs(trie, trieNode, res, record);

    return res;

}

function dfs(trie: Trie, trieNode: TrieNode, res: number[], record: string[]) {

    if(trieNode.isString){
        res.push(parseInt(record.join("")));
    }

    if (trieNode.children.size === 0) {
        return;
    }

    for (const char of trieNode.children.keys()) {
        record.push(char);
        dfs(trie, trieNode.children.get(char), res, record);
        record.pop();
    }
}

class TrieNode {
    children: Map<string, TrieNode>;
    isString: boolean;
    constructor() {
        this.children = new Map();
        this.isString = false;
    }
}

class Trie {

    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    // 插入单词
    insert = function (word: string) {

        let node: TrieNode = this.root;

        for (const c of word) {
            if (!node.children.has(c))
                node.children.set(c, new TrieNode());
            node = node.children.get(c);
        }
        node.isString = true;
    };

    // 查找单词
    search = function (word: string) {
        let node: TrieNode = this.root;

        for (const c of word) {
            if (!node.children.has(c))
                return false;
            node = node.children.get(c);
        }

        return node.isString;
    };

    // 查找前缀
    starts_with = function (prefix: string) {
        let node: TrieNode = this.root;
        for (const c of prefix) {
            if (!node.children.has(c))
                return false;
            node = node.children.get(c);
        }
        return true;
    };
}




export { };