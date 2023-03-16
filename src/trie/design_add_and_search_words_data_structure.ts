// lc 211 https://leetcode.com/problems/design-add-and-search-words-data-structure/description/

type NestedMap = Map<string, NestedMap>

class WordDictionary {
    data: NestedMap

    constructor() {
        this.data = new Map();
    }

    addWord(word: string): void {
        let p = this.data;
        const len = word.length;

        for (let i = 0; i < word.length; i++) {
            if (!p.has(word[i])) {
                p.set(word[i], new Map());
            }
            p = p.get(word[i]);
        }
        p.set("isWord", null);
    }

    // bfs
    search(word: string): boolean {
        let p = this.data;
        const len = word.length;
        let index = 0
        let q: NestedMap[] = [];
        let c = word[index];

        // 队列初始化
        if (p.has(c))
            q.push(p.get(c))
        else if (c === '.') {
            let arr = [...p.values()].filter(val => val !== null)
            q.push(...arr)
        }
        else return false;


        index++;

        while (q.length > 0 && index < len) {
            c = word[index]
            const qLen = q.length;

            // 检查队列中每个节点中是否含有 c，有的话推入
            for (let i = 0; i < qLen; i++) {
                const node = q.shift()
                if (c === '.') {
                    let arr = [...node.values()].filter(val => val !== null);
                    q.push(...arr)
                } else if (node.has(c)) {
                    q.push(node.get(c))
                }
            }

            index++;
        }

        if (q.length === 0) return false;
        for (const node of q) {
            if (node.has("isWord")) return true;
        }
        return false;

    }
}
