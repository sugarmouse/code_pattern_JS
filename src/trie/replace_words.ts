// lc 648 https://leetcode.com/problems/replace-words/description/

function replaceWords(dictionary: string[], sentence: string): string {
    const trie = new Trie();
    const words = sentence.split(" ")
    for (const root of dictionary) {
        trie.insert(root)
    }

    for (const [i, w] of words.entries()) {
        const root = trie.search(w);
        if(root === null) continue;
        words[i] = root;
    }

    return words.join(" ");

};

class TrieNode {
    isRoot: boolean;
    val: string | null;
    children: TrieNode[];

    constructor() {
        this.isRoot = false;
        this.val = ''
        this.children = new Array(26);
    }
}

class Trie {
    root: TrieNode[];

    constructor() {
        this.root = new Array(26)
    }

    insert(word: string) {
        let r = this.root;
        const len = word.length;
        for (let i = 0; i < len; i++) {
            const index = this.getIndex(word[i]);
            if (r[index] instanceof TrieNode === false) {
                r[index] = new TrieNode();
            }
            const curNode = r[index];

            if (i === len - 1) {
                curNode.isRoot = true;
                curNode.val = word;
            }

            r = curNode.children;
        }
    }

    search(word: string): string | null {
        let r = this.root;
        for (const s of word) {
            const index = this.getIndex(s);
            if (
                r[index] instanceof TrieNode
                && r[index].isRoot
            ) {
                return r[index].val;
            }

            if (r[index] instanceof TrieNode === false) return null;
            r = r[index].children;
        }
        return null;
    }

    getIndex(char: string): number {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}

export {}