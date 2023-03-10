// lc 832 https://leetcode.com/problems/flipping-an-image/

function flipAndInvertImage(image: number[][]): number[][] {
    for (const row of image) {
        row.reverse();
        for (const [index, bit] of row.entries()) {
            row[index] = bit ^ 1;
        }
    }
    return image;
};

export { };