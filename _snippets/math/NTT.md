---
layout: post
title: NTT (整数環FFT)
update: 2018-03-31 04:17:27 +0900
category: math
tags:
- fft
---

## 概要
---
整数列$a$,$b$について，法$p$の下で$a$,$b$を畳み込んで次の列$c$を作る:

$$
 c_k \equiv \sum_{i=0}^k a_i b_{k-i} \pmod{p}
$$

## 計算量
---
$N$を$\max(|a|, |b|)$より大きい$2$ベキの数として，$O(N\log N)$.  
ただし，以下の`NTT_CONVOLUTION_TIME`の値によって定数倍の差があるため注意．

## 使い方
---
まず，$m_a:=\max(a), m_b:=\max(b), n:=\min(|a|, |b|)$として,  
$X:=m_a m_b n$を求める．<small>($X$は畳み込んで出来る列$c$の要素の最大値)</small>  
<br>
そして，`NTT_CONVOLUTION_TIME`の値を次のように定める:  

$$
 {\tt NTT\_CONVOLUTION\_TIME} = 
 \begin{cases}
 	1 & (X < 1.2\times 10^9 \sim 2^{30}) \\
 	2 & (X < 5.8\times 10^{17} \sim 2^{59}) \\
 	3 & (X < 9.7\times 10^{25} \sim 2^{86})
 \end{cases}
$$

```cpp
// 例:取り扱う整数がかなり小さいため1でよい
constexpr int NTT_CONVOLUTION_TIME = 1; // namespace NTT内

// ~~~ 以下, 実際に使うところで ~~~

// 列a, bを用意
std::vector<int> a, b;

// a，bを法modで畳み込んだ結果をcとする
std::vector<int> c(NTT::mul(a, b, mod));
```
<br>
そもそもMODを取る必要が無いときは，法$p$を$X+1$などとすれば良い．

```cpp
// a[i],b[i] <= 100, min(|a|,|b|) <= 100000 より X:=100*100*100000=1000000000
std::vector<int> c(NTT::mul(a, b, 1000000001));
```

## 実装例
---
以下は非再帰，not-in-placeの実装．
<pre class="cpp"><code src="https://raw.githubusercontent.com/satanic0258/Cpp_snippet/master/src/math/NTT.cpp"></code></pre>

## 問題例
---
- [\[AtCoder\]高速フーリエ変換 - AtCoder Typical Contest 001](https://atc001.contest.atcoder.jp/tasks/fft_c) <small>[verified 1](https://atc001.contest.atcoder.jp/submissions/2281464)</small> <small>[verified 2](https://atc001.contest.atcoder.jp/submissions/2281465)</small> <small>[verified 3](https://atc001.contest.atcoder.jp/submissions/2281467)</small>

## 参考文献
---
- [整数環FFT - 円周率.jp](http://円周率.jp/method/fft/modular.html)
- [任意modでの畳み込み演算をO(n log(n))で - math314のブログ](http://math314.hateblo.jp/entry/2015/05/07/014908)
- [Garner Algorithm - MAXimal](https://e-maxx-eng.appspot.com/algebra/chinese-remainder-theorem.html#toc-tgt-2)