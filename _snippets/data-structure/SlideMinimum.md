---
layout: post
title: スライド最小値
update: 2018-04-16 03:16:30 +0900
category: data-structure
tags:
- slide-minimum
---

## 概要
---
列$a$に対して区間最小値を取るクエリを複数こなす際，区間の両端位置が広義単調増加のとき，  
dequeを使い全体で線形時間でクエリをこなす．

## 計算量
---
全体で$O(N)$

## 使い方
---
区間は$[L, R)$といった半開区間で管理されます．  

テンプレート引数に`<型, 比較関数>`を指定します．
```cpp
// int型の列aについて区間最小値を取る
SlideMinimum<int, std::less<>> sm(a);
```
```cpp
// int型の列aについて区間最大値を取る
SlideMinimum<int, std::greater<>> sm(a);
```
<br>
実際に区間をずらすための関数をいくつか用意しています．  
**区間をずらす際，両端位置が広義単調増加の動きをしていないとバグるので注意**
```cpp
// 区間の左端Lを1増やす
sm.incL();
```

```cpp
// 区間の右端Rを1増やす
sm.incR();
```

```cpp
// 区間の左端Lを指定位置lまでずらす
sm.slideL(l);
```

```cpp
// 区間の右端Rを指定位置rまでずらす
sm.slideR(r);
```

```cpp
// 区間を[l, r)へずらす
sm.slide(l, r);
```
<br>
今見ている区間の最小値の要素番号を取得する際は`getIndex()`を使います．
```cpp
// 区間[l, r)の最小値の要素番号を取得
int mi = sm.getIndex();
```

## 実装例
---
<pre class="cpp"><code src="https://raw.githubusercontent.com/satanic0258/Cpp_snippet/master/src/data-structure/SlideMinimum.cpp"></code></pre>

## 問題例
---
- [\[AtCoder\]ストラックアウト / Struck Out - CODE FESTIVAL 2016 Tournament Round 3](https://beta.atcoder.jp/contests/cf16-tournament-round3-open/tasks/asaporo_d) <small>[verified](https://beta.atcoder.jp/contests/cf16-tournament-round3-open/submissions/2365976)</small>

## 参考文献
---
- 蟻本第2版 pp.300-301