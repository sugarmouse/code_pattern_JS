// lc 208  https://leetcode.com/problems/implement-trie-prefix-tree/

// 嵌套的 map + "end" notation

type NestedMap<K> = Map<K, NestedMap<K>>;

class Trie {
    container: NestedMap<string>;

    constructor() {
        this.container = new Map();
    }

    insert(word: string): void {
        let a = this.container;
        for (const s of word) {
            if (!this.container.has(s)) {
                a.set(s, new Map());
            }
            a = a.get(s);
        }
    }

    search(word: string): boolean {
        let a = this.container;

        for (const s of word) {
            if (a.has(s)) {
                a = a.get(s);
                continue;
            } else {
                return false;
            }
        }

        return a.size === 0 ? true : false;
    }

    startsWith(prefix: string): boolean {
        let a = this.container;

        for (const s of prefix) {
            if (a.has(s)) {
                a = a.get(s);
                continue;
            } else {
                return false;
            }
        }
        return true;
    }
}

export { }