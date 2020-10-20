function memo() {
  // 「投稿する」ボタンの情報を取得
  const submit = document.getElementById("submit");
  // 投稿するボタンを「click」した場合に実行される関数を定義
  submit.addEventListener("click", (e) => {
    // フォームに入力された値を取得できるオブジェクト（FormData）を生成している
    const formData = new FormData(document.getElementById("form"));
    // 非同期通信を実装するために必要なXMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest();
    // openメソッドを使用して、リクエストの内容を引数へ追記
    XHR.open("POST", "/posts", true);
    // 返却されるデータ形式はJSONになりますので、jsonを指定
    XHR.responseType = "json";
    // FormDataとsendを使用して、メモ投稿のフォームに入力された情報を送信
    XHR.send(formData);

    // レスポンスがあった場合の処理の記述 レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
    XHR.onload = () => {
      // レスポンスがエラーだった場合の処理を記述
      // ステータスコードが200以外だった場合にエラー
      if (XHR.status != 200) {
        // 失敗の場合にはアラートを表示して、処理に失敗したことがわかるようにする
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // return null;によってJavaScriptの処理から抜け出すことができる
        return null;
      }


      // itemは、レスポンスとして返却されたメモのレコードデータを取得
      const item = XHR.response.post;
      // listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const list = document.getElementById("list");
      // formTextを取得する理由は、メモの入力フォームをリセットするため
      const formText = document.getElementById("content");

      // 「メモとして描画する部分のHTML」を定義。HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画される
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;

        // listという要素に対して、insertAdjacentHTMLでHTMLを追加 新しく出てきた内容
      list.insertAdjacentHTML("afterend", HTML);

      // 「メモの入力フォームに入力されたままの文字」はリセット
      formText.value = "";
    };
    // 現状のコードだと「こんにちは」と投稿すると、非同期で「こんにちは」とHTMLが生成され、その後に、画面をリロードすると「こんにちは」と新たにもう1つ同じ投稿がされてしまう。
    // 「submitボタンでclickする」というイベントを阻止する必要があり、e.preventDefault();で処理を停止させる
    e.preventDefault();
  });
 }
 window.addEventListener("load", memo);