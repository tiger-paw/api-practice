import axios from "axios";

document.querySelector("form").addEventListener("submit", (e) => {
  // ページのリロードを防ぐ（submitイベントのデフォルト動作をキャンセル）
  e.preventDefault();

  // inputの値を取得
  const input = e.target.elements.pokeName.value.trim(); // trim()で前後の空白を削除
  // 英語でなければアラートを出す
  if (!/^[a-zA-Z]+$/.test(input)) {
    alert("英語のポケモン名を入力してください。");
    return;
  }

  // axiosのインスタンスを作成
  const instance = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
  });

  // APIを叩く関数を定義
  const fetchData = async (pokeName) => {
    try {
      const res = await instance.get(`/pokemon/${pokeName.toLowerCase()}`);
      return res.data;
    } catch (err) {
      console.error(err);
      alert("ポケモンが見つかりませんでした。");
    }
  };

  const result = fetchData(input);

  result.then((data) => {
    const name = data.name; // ポケモンの名前
    const height = data.height * 10; // デシメートルをセンチメートルに変換
    const weight = data.weight * 0.1; // ヘクトグラムをキログラムに変換
    const imgUrl = data.sprites.front_default; // ポケモンの画像URL
    const img = document.getElementById("js-img"); // 画像表示用のimg要素

    // ポケモン画像URLが取得できた場合
    if (imgUrl) {
      img.src = imgUrl;
      img.style.display = "";
    } else {
      img.src = "";
      img.style.display = "none";
    }
    // 結果表示
    document.getElementById(
      "js-result"
    ).innerText = `名前: ${name}\n高さ: ${height}cm\n重さ: ${weight}kg`;
  });
});
