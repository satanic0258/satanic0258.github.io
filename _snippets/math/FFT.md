---
layout: post
title: FFT (高速フーリエ変換)
update: 2018-03-31 04:16:51 +0900
category: math
tags:
- fft
---

## 概要
---
列$a$,$b$について，$a$,$b$を畳み込んで次の列$c$を作る:

$$
 c_k = \sum_{i=0}^k a_i b_{k-i}
$$

## 計算量
---
$N$を$\max(|a|, |b|)$より大きい$2$ベキの数として，$O(N\log N)$.

## 使い方
---
**FFTはdouble型の演算を行うため誤差に注意**  
$m_a:=\max(a), m_b:=\max(b), n:=\min(|a|, |b|)$として,  
$m_a m_b n \leq 2^{53}$が限度.

```cpp
// 列a, bを用意
std::vector<int> a, b;

// a，bを畳み込んだ結果をcとする
std::vector<int> c(FFT::mul(a, b));
```

## 実装例
---
以下は非再帰，not-in-placeの実装．
<pre class="cpp"><code src="https://raw.githubusercontent.com/satanic0258/Cpp_snippet/master/src/math/FFT.cpp"></code></pre>

## 問題例
---
- [\[AtCoder\]高速フーリエ変換 - AtCoder Typical Contest 001](https://atc001.contest.atcoder.jp/tasks/fft_c) <small>[verified](https://atc001.contest.atcoder.jp/submissions/2277619)</small>

## 参考文献
---
- [高速フーリエ変換 - slideshare](https://www.slideshare.net/chokudai/fft-49066791/)
- [高速フーリエ変換 (FFT) - pekempeyのブログ](https://pekempey.hatenablog.com/entry/2016/10/24/171936)