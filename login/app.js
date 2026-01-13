// ====================================
// Firebase 設定
// ====================================
const firebaseConfig = {
  apiKey: "AIzaSyBgWGW2RuKk10ZCXap2qH0xyvnH4RDaWfc",
  authDomain: "zetyper-api.firebaseapp.com",
  projectId: "zetyper-api",
  storageBucket: "zetyper-api.firebasestorage.app",
  messagingSenderId: "332216326404",
  appId: "1:332216326404:web:b2b45647fb6c190d51d851",
  measurementId: "G-X9MT8LV39V",
};

// Firebase 初期化
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ====================================
// DOM要素
// ====================================
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginCard = document.querySelector(
  ".login-card:not(.register-card):not(.user-card)"
);
const registerCard = document.getElementById("register-card");
const userCard = document.getElementById("user-card");
const googleLoginBtn = document.getElementById("google-login-btn");
const logoutBtn = document.getElementById("logout-btn");
const showRegisterLink = document.getElementById("show-register");
const showLoginLink = document.getElementById("show-login");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const registerErrorMessage = document.getElementById("register-error-message");

// ====================================
// ユーティリティ関数
// ====================================
function showError(element, message) {
  element.textContent = message;
  element.style.display = "block";
  setTimeout(() => {
    element.style.display = "none";
  }, 5000);
}

function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
}

function setLoading(button, isLoading) {
  if (isLoading) {
    button.classList.add("loading");
  } else {
    button.classList.remove("loading");
  }
}

function translateFirebaseError(errorCode) {
  const errorMessages = {
    "auth/email-already-in-use": "このメールアドレスは既に使用されています",
    "auth/invalid-email": "メールアドレスの形式が正しくありません",
    "auth/user-disabled": "このアカウントは無効化されています",
    "auth/user-not-found": "アカウントが見つかりません",
    "auth/wrong-password": "パスワードが正しくありません",
    "auth/weak-password": "パスワードは6文字以上で設定してください",
    "auth/too-many-requests":
      "ログイン試行回数が多すぎます。しばらく待ってから再試行してください",
    "auth/network-request-failed": "ネットワークエラーが発生しました",
    "auth/popup-closed-by-user": "ログインがキャンセルされました",
    "auth/invalid-credential":
      "メールアドレスまたはパスワードが正しくありません",
  };
  return (
    errorMessages[errorCode] || "エラーが発生しました。もう一度お試しください"
  );
}

// ====================================
// 認証状態の監視
// ====================================
auth.onAuthStateChanged((user) => {
  if (user) {
    // ログイン済み
    showUserCard(user);
  } else {
    // 未ログイン
    showLoginCard();
  }
});

function showLoginCard() {
  loginCard.style.display = "block";
  registerCard.style.display = "none";
  userCard.style.display = "none";
}

function showRegisterCard() {
  loginCard.style.display = "none";
  registerCard.style.display = "block";
  userCard.style.display = "none";
}

function showUserCard(user) {
  loginCard.style.display = "none";
  registerCard.style.display = "none";
  userCard.style.display = "block";

  document.getElementById("user-name").textContent =
    user.displayName || "ユーザー";
  document.getElementById("user-email").textContent = user.email;

  if (user.photoURL) {
    document.getElementById("user-avatar").src = user.photoURL;
  }
}

// ====================================
// イベントリスナー
// ====================================

// ログイン/登録切り替え
showRegisterLink.addEventListener("click", (e) => {
  e.preventDefault();
  showRegisterCard();
});

showLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  showLoginCard();
});

// メールでログイン
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const loginBtn = document.getElementById("login-btn");

  setLoading(loginBtn, true);

  try {
    await auth.signInWithEmailAndPassword(email, password);
    showSuccess("ログインしました！");
  } catch (error) {
    console.error("Login error:", error);
    showError(errorMessage, translateFirebaseError(error.code));
  } finally {
    setLoading(loginBtn, false);
  }
});

// 新規登録
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const passwordConfirm = document.getElementById(
    "register-password-confirm"
  ).value;
  const registerBtn = document.getElementById("register-btn");

  // パスワード確認
  if (password !== passwordConfirm) {
    showError(registerErrorMessage, "パスワードが一致しません");
    return;
  }

  setLoading(registerBtn, true);

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );

    // ユーザー名を設定
    await userCredential.user.updateProfile({
      displayName: name,
    });

    showSuccess("アカウントを作成しました！");
  } catch (error) {
    console.error("Register error:", error);
    showError(registerErrorMessage, translateFirebaseError(error.code));
  } finally {
    setLoading(registerBtn, false);
  }
});

// Googleでログイン
googleLoginBtn.addEventListener("click", async () => {
  setLoading(googleLoginBtn, true);

  const provider = new firebase.auth.GoogleAuthProvider();

  try {
    await auth.signInWithPopup(provider);
    showSuccess("Googleでログインしました！");
  } catch (error) {
    console.error("Google login error:", error);
    showError(errorMessage, translateFirebaseError(error.code));
  } finally {
    setLoading(googleLoginBtn, false);
  }
});

// ログアウト
logoutBtn.addEventListener("click", async () => {
  try {
    await auth.signOut();
    showSuccess("ログアウトしました");
  } catch (error) {
    console.error("Logout error:", error);
  }
});

// ====================================
// ハンバーガーメニュー
// ====================================
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  const isOpen = sidebar.style.width === "250px";
  sidebar.style.width = isOpen ? "0" : "250px";
  sidebar.style.zIndex = isOpen ? "0" : "1000";
  sidebar.style.display = "block";
  hamburger.classList.toggle("active");
});
