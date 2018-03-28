---
layout: post
title: オイラーツアー
category: tree
tags:
- euler-tour
---

## 概要
---
木をDFSしたときの頂点番号を訪問順で記録した列を作る.  
これとセグ木などを合わせて用いることで部分木に対するクエリを高速に処理できることがある.

## 計算量
---
DFSで$O(|V|+|E|)$.  

## 使い方
---
作成済みの木`g`とその根をコンストラクタに渡してやることで，次のメンバを使うことが出来る:
- `eulerTour` : DFS訪問順に並べた頂点番号
- `begin` : `begin[v]`で`eulerTour`内で最も左の頂点$v$の添え字番号を返す
- `end` : `end[v]`で`eulerTour`内で最も右のの頂点$v$の添え字番号**+1**を返す  
(`end`で+1しているのは$[begin, end)$と半開区間にしたため)

```cpp
// 木を作る
std::vector<std::vector<int>> g(n);
REP(i, m) {
	g[a[i]].emplace_back(b[i]);
	g[b[i]].emplace_back(a[i]);
}

// オイラーツアーを行う
int root = 0;
EulerTour et(g, root);
```

## 実装例
---
<pre class="cpp"><code src="https://raw.githubusercontent.com/satanic0258/Cpp_snippet/master/src/tree/EulerTour.cpp"></code></pre>

## 問題例
---
- [\[AOJ\]ブロッコリー？カリフラワー？ (Broccoli or Cauliflower) - RUPC2018day3](https://www.hackerrank.com/contests/world-codesprint-12/challenges/factorial-array/problem) <small>[verified](https://onlinejudge.u-aizu.ac.jp/beta/review.html#RitsCamp18Day3/2754084)</small>

## 参考文献
---
- [完全制覇・ツリー上でのクエリ処理技法 - (iwi) ｛ 反省します](https://topcoder.g.hatena.ne.jp/iwiwi/20111205/1323099376)