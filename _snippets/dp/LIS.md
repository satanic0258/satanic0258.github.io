---
layout: post
title: LIS (最長増加部分列)
update: 2018-04-15 19:56:28 +0900
category: dp
tags:
- lis
---

## 概要
---
列$a$の最長増加部分列(Longest Increasing Subsequnce; LIS)を求める．  
$a$の長さ$k$の増加部分列は，$i_1 < i_2 < \cdots < i_k$で$a_{i_1} < a_{i_2} < \cdots < a_{i_k}$なる部分列$\\{a_{i_1}, a_{i_2}, \cdots, a_{i_k}\\}$をいう．

## 計算量
---
$O(N\log N)$

## 使い方
---
`std::vector<int>`型の列を渡すとそのLISの長さを返す．

```cpp
std::vector<int> a;

// aを初期化

// aのLISの長さを取得
int k = LIS(a);
```

## 実装例
---
<pre class="cpp"><code src="https://raw.githubusercontent.com/satanic0258/Cpp_snippet/master/src/dp/LIS.cpp"></code></pre>

## 問題例
---
- [\[AtCoder\]ビルの飾り付け (Building) - 2007年 日本情報オリンピック春合宿](https://beta.atcoder.jp/contests/joisc2007/tasks/joisc2007_buildi) <small>[verified](https://beta.atcoder.jp/contests/joisc2007/submissions/2296122)</small>

<!-- ## 参考文献 -->
<!-- --- -->