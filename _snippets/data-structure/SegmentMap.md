---
layout: post
title: 区間をsetで管理するやつ
update: 2018-04-16 03:25:49 +0900
category: data-structure
tags:
- segment-set
---

## 概要
---
区間$\[l, r\]$をsetで管理する． <small>(実装はmapだけど，"区間をsetで管理"とよく言われているため)</small>  
\# **区間$\[l, r\]$は閉区間なので注意**  
<br>
次のクエリを処理する:  
- $\mathrm{get}(i)$ : $i$を含む区間$\[l, r\]$を取得する
- $\mathrm{insert}(l, r)$ : 区間$\[l, r\]$を挿入する
- $\mathrm{remove}(l, r)$ : 全区間で$\[l, r\]$に重なる部分を全て消す
- $\mathrm{same}(i, j)$ : $i$と$j$が同じ区間に属しているかを判定する

## 計算量
---
- $\mathrm{get}$, $\mathrm{insert}$, $\mathrm{remove}$, $\mathrm{same}$: $O(\log N)$

## 使い方
---
コンストラクタへ指定する`bool`値は，「区間$[l, c]$と区間$\[c+1, r\]$をマージする」なら`true`，「マージしない」なら`false`とします．
```cpp
// コンストラクタ．隣接区間をマージする
SegmentMap map(true);

// iを含む区間[l, r]のstd::map<int,int>::const_iteratorを返す, iを含む区間が無ければmap.end()を返す
auto it = map.get(i);

// 区間[l, r]を挿入する
map.insert(l, r);

// 全区間で[l, r]に重なる部分を全て消す
map.remove(l, r);

// iとjが同じ区間に属しているかのbool値を返す
bool f = map.same(i, j);
```

## 実装例
---
<pre class="cpp"><code src="https://raw.githubusercontent.com/satanic0258/Cpp_snippet/master/src/data-structure/SegmentMap.cpp"></code></pre>

## 問題例
---
- [\[HackerRank\]Factorial Array - World CodeSprint 12](https://www.hackerrank.com/contests/world-codesprint-12/challenges/factorial-array/problem) <small>[verified](https://www.hackerrank.com/contests/world-codesprint-12/challenges/factorial-array/submissions/code/1306764580)</small>
- [\[AOJ\]Elevator - RUPC2018day1](https://onlinejudge.u-aizu.ac.jp/beta/room.html#RitsCamp18Day1/problems/G) <small>[verified](https://onlinejudge.u-aizu.ac.jp/beta/review.html#RitsCamp18Day1/2750709)</small>
- [\[yukicoder\]No.674 n連勤](https://yukicoder.me/problems/no/674) <small>[verified](https://yukicoder.me/submissions/251123)</small>

<!--
## 参考文献
--- 
-->