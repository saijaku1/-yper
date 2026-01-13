// ====================================
// Firebase Config will be loaded from a shared file or defined here
// (本来は設定を共通化すべきですが、今回はlogin/app.jsからコピーして使用します)
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

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// ====================================
// DOM Elements
// ====================================
const displayNameInput = document.getElementById("name-input");
const bioInput = document.getElementById("bio-input");
const bioCount = document.getElementById("bio-count");
const avatarInput = document.getElementById("avatar-upload");
const currentAvatar = document.getElementById("current-avatar");
const userEmailDisplay = document.getElementById("user-email");
const displayNameDisplay = document.getElementById("display-name");
const profileForm = document.getElementById("profile-form");
const saveBtn = document.getElementById("save-btn");
const toast = document.getElementById("toast");
const logoutMenu = document.getElementById("logout-menu");
const publicProfileLink = document.getElementById("public-profile-link");

let currentUser = null;

// ====================================
// Auth Check
// ====================================
auth.onAuthStateChanged(async (user) => {
  if (user) {
    currentUser = user;
    // Load Profile Data
    await loadUserProfile(user.uid);

    // 公開ページへのリンクを設定
    // 現在のパスから相対的に user フォルダを探す
    // mypage/index.html -> ../user/?uid=...
    publicProfileLink.href = `../user/?uid=${user.uid}`;
  } else {
    // Not logged in, redirect to login
    window.location.href = "../login";
  }
});

// ====================================
// Load Profile
// ====================================
async function loadUserProfile(uid) {
  try {
    const doc = await db.collection("users").doc(uid).get();

    if (doc.exists) {
      const data = doc.data();
      displayNameInput.value =
        data.displayName || currentUser.displayName || "";
      bioInput.value = data.bio || "";
      displayNameDisplay.textContent =
        data.displayName || currentUser.displayName || "ユーザー";
      userEmailDisplay.textContent = currentUser.email;

      if (data.photoURL) {
        currentAvatar.src = data.photoURL;
      } else if (currentUser.photoURL) {
        currentAvatar.src = currentUser.photoURL;
      }

      updateCharCount();
    } else {
      // First time access or no data
      displayNameInput.value = currentUser.displayName || "";
      displayNameDisplay.textContent = currentUser.displayName || "ユーザー";
      userEmailDisplay.textContent = currentUser.email;
      if (currentUser.photoURL) {
        currentAvatar.src = currentUser.photoURL;
      }
    }
  } catch (error) {
    console.error("Error loading profile:", error);
    showToast("プロフィールの読み込みに失敗しました", true);
  }
}

// ====================================
// Save Profile
// ====================================
profileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!currentUser) return;

  setLoading(true);

  const newName = displayNameInput.value.trim();
  const newBio = bioInput.value.trim();

  try {
    // 1. Update Auth Profile (Display Name)
    if (newName !== currentUser.displayName) {
      await currentUser.updateProfile({
        displayName: newName,
      });
    }

    // 2. Update Firestore
    await db.collection("users").doc(currentUser.uid).set(
      {
        displayName: newName,
        bio: newBio,
        email: currentUser.email, // 検索用にemailも保存（公開はしない）
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // Update UI
    displayNameDisplay.textContent = newName;
    showToast("プロフィールを保存しました");
  } catch (error) {
    console.error("Error saving profile:", error);
    showToast("保存に失敗しました: " + error.message, true);
  } finally {
    setLoading(false);
  }
});

// ====================================
// Avatar Upload
// ====================================
avatarInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Validate size (e.g., max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    showToast("画像サイズは2MB以下にしてください", true);
    return;
  }

  setLoading(true);

  try {
    const storageRef = storage.ref();
    // File path: users/{uid}/avatar.jpg
    const avatarRef = storageRef.child(`users/${currentUser.uid}/avatar`);

    await avatarRef.put(file);
    const downloadURL = await avatarRef.getDownloadURL();

    // Update Firestore
    await db.collection("users").doc(currentUser.uid).set(
      {
        photoURL: downloadURL,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // Update Auth Profile
    await currentUser.updateProfile({
      photoURL: downloadURL,
    });

    // Update UI
    currentAvatar.src = downloadURL;
    showToast("画像を更新しました");
  } catch (error) {
    console.error("Error uploading avatar:", error);
    showToast("画像のアップロードに失敗しました: " + error.message, true);
  } finally {
    setLoading(false);
  }
});

// ====================================
// Utilities
// ====================================
bioInput.addEventListener("input", updateCharCount);

function updateCharCount() {
  bioCount.textContent = bioInput.value.length;
}

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.className = isError ? "toast show error" : "toast show";
  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}

function setLoading(isLoading) {
  const btn = saveBtn;
  if (isLoading) {
    btn.classList.add("loading");
    btn.disabled = true;
  } else {
    btn.classList.remove("loading");
    btn.disabled = false;
  }
}

// Logout
logoutMenu.addEventListener("click", async (e) => {
  e.preventDefault();
  await auth.signOut();
  window.location.href = "../login";
});

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  const isOpen = sidebar.style.width === "250px";
  sidebar.style.width = isOpen ? "0" : "250px";
  sidebar.style.zIndex = isOpen ? "0" : "1000";
  sidebar.style.display = "block";
  hamburger.classList.toggle("active");
});
