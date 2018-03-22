---
layout: post
title: 最小費用流 (PrimalDual)
update: 2018-03-22 10:47:40 +0900
category: graph
tags:
- min-cost-flow
---

## 概要
---
各辺$e\in E$が$($フローを流せる最大容量$cap$,流すときにかかるコスト$cost)$を持つ有向グラフ$G=(V,E)$について，  
頂点$s$から頂点$t$へ流量$f$を流すときの最小費用流を求める．

## 計算量
---
最短経路を求めるアルゴリズムとしてdijkstra法を使っており，   
計算量は$O(f|E|\log|V|)$．

## 使い方
---
```cpp
// 頂点数|V|=nの有向グラフGを用意
PrimalDual pd(n);

// Gに頂点uから頂点vに向かう辺(容量c, コストd)を追加
pd.addEdge(u, v, c, d);

// 頂点sから頂点t流量fの最小費用流を求める
int res = pd.minCostFlow(s, t, f);
```

## 実装例
---
<pre class="cpp"><code src="https://raw.githubusercontent.com/satanic0258/Cpp_snippet/master/src/graph/PrimalDual.cpp"></code></pre>

## 問題例
---
- [\[AOJ\]Network Flow - Minimum Cost Flow](http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=GRL_6_B&lang=jp) <small>[verified](http://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=2745012)</small>

## 参考文献
---
- 蟻本第2版 pp.199-205