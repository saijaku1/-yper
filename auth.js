// ====================================
// 共通認証スクリプト (auth.js)
//
// このスクリプトを読み込むと、以下の機能が有効になります：
// 1. Firebaseの初期化 (APIキーなどはここで一元管理)
// 2. ログイン状態の監視
// 3. ページ内の「ログイン」リンクを「マイページ」などの情報に自動書き換え
// ====================================

// 設定
const firebaseConfig = {
  apiKey: "AIzaSyBgWGW2RuKk10ZCXap2qH0xyvnH4RDaWfc",
  authDomain: "zetyper-api.firebaseapp.com",
  projectId: "zetyper-api",
  storageBucket: "zetyper-api.firebasestorage.app",
  messagingSenderId: "332216326404",
  appId: "1:332216326404:web:b2b45647fb6c190d51d851",
  measurementId: "G-X9MT8LV39V",
};

// Initialize checks
// 複数回初期化を防ぐ
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

// ログイン状態が変わった時の処理
auth.onAuthStateChanged(async (user) => {
  const loginLinks = document.querySelectorAll(".login-link");

  if (user) {
    // --- ログイン時 ---
    let displayName = user.displayName || "マイページ";
    let photoURL = user.photoURL;

    // Firestoreから最新情報を取得する（アイコンや名前が変更されている可能性があるため）
    try {
      const doc = await db.collection("users").doc(user.uid).get();
      if (doc.exists) {
        const data = doc.data();
        if (data.displayName) displayName = data.displayName;
        if (data.photoURL) photoURL = data.photoURL;
      }
    } catch (e) {
      console.error("ユーザー情報の取得に失敗", e);
    }

    loginLinks.forEach((link) => {
      // パス調整: 現在のディレクトリによってリンク先を変える
      // 単純化のため、絶対パスに近い形で指定するか、相対パスを調整
      // ここではシンプルに mypage/ ディレクトリへのリンクとする
      const currentPath = window.location.pathname;
      const isRoot =
        currentPath.endsWith("/") || currentPath.endsWith("index.html");
      // root(index.html)にいるなら user/ は login/ と同階層なので単純置換でいける場合の想定
      // もし階層が深い場合は修正が必要だが、まずは現状の構成に合わせて実装

      // hrefの書き換え
      let targetHref = "mypage";
      const originalHref = link.getAttribute("href");
      if (originalHref.startsWith("../")) {
        // サブディレクトリ(ranking/等)から見ている場合
        targetHref = "../mypage";
      } else if (originalHref.startsWith("./")) {
        targetHref = "./mypage";
      }

      link.href = targetHref;

      // 表示内容の書き換え
      // アイコン画像があれば表示したいが、レイアウト崩れを防ぐためまずはテキストのみorアイコン+テキスト
      link.innerHTML = "";

      if (photoURL) {
        const img = document.createElement("img");
        img.src = photoURL;
        img.alt = "icon";
        img.style.width = "24px";
        img.style.height = "24px";
        img.style.borderRadius = "50%";
        img.style.marginRight = "8px";
        img.style.verticalAlign = "middle";
        img.style.border = "1px solid #50eaf2";
        link.appendChild(img);
      }

      const span = document.createElement("span");
      span.textContent = displayName;
      span.style.verticalAlign = "middle";
      link.appendChild(span);
    });
  } else {
    // --- 未ログイン時 ---
    // 特に変更なし（デフォルトで「ログイン」になっているはず）
    // もし動的に戻す必要がある場合はここで処理
  }
});
