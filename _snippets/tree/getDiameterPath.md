---
layout: post
title: 木の直径パスを求める
update: 2018-04-16 03:48:27 +0900
category: tree
tags:
- tree-diameter
---

## 概要
---
木$g$の直径パスを求める．

## 計算量
---
2回DFSをして$O(|V|)$.  

## 使い方
---
木`g`を与えることで，直径パスの頂点番号が順に格納された`std::vector<int>`を返します．
```cpp
// 木の直径パスを取得する
std::vector<int> diamPath = getDiameterPath(g);
```

## 実装例
---
<pre class="cpp"><code src="https://raw.githubusercontent.com/satanic0258/Cpp_snippet/master/src/tree/getDiameterPath.cpp"></code></pre>

## 問題例
---
- [\[AtCoder\]Permutation Tree - AtCoder Regular Contest 095](https://beta.atcoder.jp/contests/arc095/tasks/arc095_d) <small>[verified](https://beta.atcoder.jp/contests/arc095/submissions/2366061)</small>

## 参考文献
---
- [AtCoder Regular Contest 022 解説 - slideshare](https://www.slideshare.net/chokudai/arc022/20)
- [木の直径のパスを一つ挙げるライブラリ - Learning Algorithms](http://www.learning-algorithms.com/entry/2017/12/29/160707)