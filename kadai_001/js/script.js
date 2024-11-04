//機能要件
//1.メインビジュアルをカルーセルにする
//2.リンクのホバー時に不透明度をアニメーションで変更する
//3.スクロールしたときにTOPに戻るボタンを表示させる
//4.ページ内リンクのスクロールをなめらかにする
//5.スクロールしたときにセクションをフェードインさせる
//6.Worksの画像をクリックしたときにモーダルで拡大表示する

//カルーセル→slickを使う。「コーポレートサイトに動きをつけよう」テキスト3-5章
$(function () {
  $('.slider').slick({
    //矢印
    arrows: false,
    //インジケーター
    dots: true,
    //自動再生
    autoplay: true,
    //スライド表示をフェードインかアウトか
    fade: true,
    //スライド速度
    speed: 1500,
    //
    pauseOnHover: false
  });

  // 不透明度変更→opacity
  //https://www.sejuku.net/blog/55154
  $('a, .item img').hover(
    function () {
      $(this).animate({ 'opacity': 0.6 }, 300);
    },
    function () {
      $(this).animate({ 'opacity': 1.0 }, 300);
    }
  );

  // 「TOPボタン」を表示・非表示する（境界の値：100px）→「Javascript」テキスト19章 
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#page-top').fadeIn();
    } else {
      $('#page-top').fadeOut();
    }
  });

  // セクションをフェードイン
  $(window).scroll(function () {
    //ブラウザのスクロール量取得
    const scrollAmount = $(window).scrollTop();
    //ブラウザの表示領域の高さを取得
    const windowHeight = $(window).height();
    $('section').each(function () {
      //HTML要素の位置取得
      const position = $(this).offset().top;
      if (scrollAmount > position - windowHeight + 100) {
        $(this).addClass('fade-in');
      }
    });
  });

  // 拡大表示（モーダル）
  $('.works img').click(function () {
    //クリックされた画像のsrc属性値取得
    const imgSrc = $(this).attr('src');
    //モーダルのimg要素のsrc属性に取得した値を追加→?
    const imgAlt = $(this).attr('alt');
    $('.big-img').attr({
      src: imgSrc,
      alt: imgAlt,
    });
    //フェードイン
    $('.modal').fadeIn();
  });

  // モーダルを閉じる
  $('.close-btn').click(function () {
    //フェードアウト
    $('.modal').fadeOut();
  });
});


 // リンクのスクロールをなめらかにする→難、要復習!
 //属性値で絞り込み(?)→ページ内リンクのみをイベント処理の対象にする
 $('a[href^="#"]').click(function () {
  const speed = 500;
  const href = $(this).attr('href');
  let $target;
  //href属性の値が#の時、スクロール先をhtml要素にする（スクロール先がページのトップになる）
  if (href == '#') {
    $target = $('html');
  }
  //href属性の値が#以外の時、スクロール先はid名
  else {
    $target = $(href);
  }
  //スクロール先の位置取得（上からの位置を取得することでわかる）
  const position = $target.offset().top;
  //スクロール先の位置まで移動
  $('html, body').animate({ 'scrollTop': position }, speed, 'swing');
  return false;
});