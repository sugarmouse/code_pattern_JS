function firstKMissingNumbers(arr: number[], k: number): number[] {
    arr.sort((a, b) => a - b);
    const res = [];
    let i = 0;

    while (i < arr.length && arr[i] <= 0)
        i++;

    let count = 0, curr = 1;

    while (count < k && i < arr.length) {
        if (arr[i] !== curr) {
            res.push(curr);
            count++;
        } else {
            i++;
        }
        curr++;
    }

    while (count < k) {
        res.push(curr++);
        count++;
    }

    return res;
}