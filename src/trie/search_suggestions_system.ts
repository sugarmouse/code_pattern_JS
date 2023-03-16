// lc 1268 https://leetcode.com/problems/search-suggestions-system/

function suggestedProducts(products: string[], searchWord: string): string[][] {
    products.sort();
    const trie = new Trie();
    // 存放
    for (const product of products)
        trie.insert(product);
    // 查找
    return trie.search(searchWord);
};

class TrieNode {
    // 存放当前 字典树当前 prefix 的推荐产品
    searchWords: string[];
    children: TrieNode[];
    constructor() {
        this.children = new Array(26);
        this.searchWords = [];
    }
}

class Trie {
    root: TrieNode[];

    constructor() {
        this.root = new Array(26);
    }

    insert(word: string) {

        let ptr = this.root;
        for (const s of word) {

            // 以数组下标表示字符
            const index = this.getIndex(s);

            // 如果当前字母不存在，初始化 TrieNode
            if (ptr[index] instanceof TrieNode === false) {
                ptr[index] = new TrieNode();
            }

            // 当前 prefix 推荐的产品记录
            const searchWords = ptr[index].searchWords;
            if (searchWords.length < 3) {
                searchWords.push(word);
            }

            ptr = ptr[index].children;
        }

    }

    search(word: string): string[][] {
        let ptr = this.root;
        let res: string[][] = [];

        for (let i = 0; i < word.length; i++) {
            const index = this.getIndex(word[i]);

            // 以当前 prefix word[0..i] 查找，不存在，则后面的查找都不会存在
            // 所以在这里推入适量的空数组
            if (ptr[index] instanceof TrieNode === false) {
                for (let j = 0; j < word.length - i; j++)
                    res.push([]);
                break;
            }

            // 推入当前 prefix = word[0..i] 查找的单词
            res.push(ptr[index].searchWords);
            
            // 指针往下移
            ptr = ptr[index].children;
        }
        return res;
    }

    getIndex(s: string): number {
        return s.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}

export { };