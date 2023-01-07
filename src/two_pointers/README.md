# 双指针

## 简介

顾名思义，双指针就是用两个指针遍历整个 array 或者 list。双指针模式可以在一次循环中访问 array 或者 list 中的两个不同位置的数据，所以当一个问题需要同时处理数据结构中的两个数据元素时，双指针问题的解题思路是首先需要考虑的。

一般解决问题的模式：

```typescript
function twoPointers<T>(arr: T[]) {
  let low = 0, high = arr.length - 1;

  while (low < high) {
    // do something
    low++;
    high--;
  }
}
```

## 什么样的问题适合双指针模式

1. 输入的数据可以以线性方式遍历，也就是说，它在一个数组中，在一个链接列表中，或在一个字符串中。
2. 输入的数据是已经经过排序的，或者，按照与问题相关的方式进行排列，例如数字数据按升序或降序排序，或字符按对称排列。

## 几个双指针相关的问题以及解决代码

- [检查是否为 palindrome 字符串](./vaild_palindrome.ts)
- [三数之和](./find_sum_of_three.ts)
- [句子反转](./reverse_words.ts)

## 小小挑战

- [一个字符串在最多可以删除一个字符的情况下，是否可以成为 palindrome 字符串](./valid_palindrome_by_removing_one_char.ts)
