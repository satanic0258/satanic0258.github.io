$(function(){
  // copyボタンを置く
  $('pre code').before('<span class="btn-copy">Copy</span>');
  $('.btn-copy').click(function() { // コピー
    window.getSelection().removeAllRanges();
    try {
      // 仮想のテキストエリアを作成
      var copyFrom = document.createElement("textarea");
      // テキストエリアへcodeの中身をセット
      copyFrom.textContent = $(this).next('code').get()[0].innerText;
     
      // bodyタグの要素を取得
      var bodyElm = document.getElementsByTagName("body")[0];
      // 子要素にテキストエリアを配置
      bodyElm.appendChild(copyFrom);
     
      // テキストエリアの値を選択
      copyFrom.select();
      // コピー
      var retVal = document.execCommand('copy');
      // 仮想テキストエリアを削除
      bodyElm.removeChild(copyFrom);
    } catch(err) {
      console.log('Catch some error when copy sample input text');
    }
    window.getSelection().removeAllRanges();
  });
});