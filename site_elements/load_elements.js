// head部分の読み込み
$.ajax({ url: '/site_elements/head.html' })
.then(
  function(data) { $("head").append(data); },
  function(){ alert("head読み込み失敗"); }
);

// ヘッダーの読み込み
$.ajax({ url: '/site_elements/header.html' })
.then(
  function(data) { $("header").append(data); },
  function(){ alert("header読み込み失敗"); }
);

// フッターの読み込み
$.ajax({ url: '/site_elements/footer.html' })
.then(
  function(data) { $("footer").append(data); },
  function(){ alert("footer読み込み失敗"); }
);