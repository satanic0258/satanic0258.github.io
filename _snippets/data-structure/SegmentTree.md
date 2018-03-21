---
layout: post
title: セグメント木 / SegmentTree
category: data-structure
tags:
- segment-tree
---

## 概要
---
$N$ 個の数の列について，次のクエリを処理する:  
- $\mathrm{update}(i, x)$ : $i$番目の値を$x$で置き換える
- $\mathrm{add}(i, x)$ : $i$番目の値に$x$を加える <small>(optional)</small>
- $\mathrm{query}(l, r)$ : 区間$[l, r)$の最小値/最大値/合計を取得する

## 計算量
---
- $\mathrm{update}$: $O(\log N)$
- $\mathrm{add}$: $O(\log N)$
- $\mathrm{query}$: $O(\log N)$

## 使い方
---
コンストラクタには，長さ，演算の単位元，演算のラムダ式を指定します．
```cpp
// 長さnの区間minを取るセグ木を初期化
SegmentTree<int> st(n, (1LL<<31)-1, [](T& l, T& r) {return (l < r) ? l : r; });
```
<br>
ただ記述量が多いため，最小値,最大値,合計のエイリアスを用意しています．
```cpp
SegmentTree<int> st(n, MIN); // 区間最小値
SegmentTree<int> st(n, MAX); // 区間最大値
SegmentTree<int> st(n, SUM); // 区間合計

// i番目の要素を配列a[i]の値とする
for(int i = 0; i < n; ++i) st.update(i, a[i]);

// 2番目の要素をに10を加える
st.add(2, 10);

// 区間[l, r)の最小値を取得する
int l = 1, r = 5;
int mi = st.query(l, r);
```

## 実装例
---
<pre class="cpp"><code src="https://raw.githubusercontent.com/satanic0258/Cpp_snippet/master/src/data-structure/SegmentTree.cpp"></code></pre>

## 問題例
---
- [\[AOJ\]Range Query - Range Minimum Query (RMQ)](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=DSL_2_A&lang=jp) <small>[verified](http://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=2744354)</small>

## 参考文献
---
- [セグメント木をソラで書きたいあなたに - hogecoder](http://tsutaj.hatenablog.com/entry/2017/03/29/204841)
- [Segment Treeをちょっと高速化したい - komiyamの日記](http://d.hatena.ne.jp/komiyam/20131202/1385992406)
- [再帰を使わない Segment Tree - (o_o)](http://asi1024.hatenablog.com/entry/2017/02/24/144843)