const memberList = document.getElementById("memberList");
const memberSelect = document.getElementById("memberSelect");
const memberSearch = document.getElementById("memberSearch");

// JSON からメンバー情報を読み込んで表示
async function loadMembers() {
  try {
    const res = await fetch("members.json");
    if (!res.ok) throw new Error("members.json 読み込み失敗");
    const members = await res.json();

    for (const id in members) {
      const m = members[id];

      // メンバー一覧に <li> を作成
      const li = document.createElement("li");
      li.className = "card";
      li.id = id;
      li.innerHTML = `
        <a href="users.html?user=${id}">
          <img src="${m.image}" alt="${m.name}" class="li-image">
          <h3>${m.name}</h3>
        </a>
        <p>${m.description[0]}</p>
        ${
          m.fingering
            ? `<button class="openBtn" data-target="${id}-dialog">運指を見る</button>
               <dialog id="${id}-dialog">
                 <h3>${m.name}の運指</h3>
                 <img src="${m.fingering}" class="fingering-image">
                 <button class="closeBtn">閉じる</button>
               </dialog>`
            : ""
        }
      `;
      memberList.appendChild(li);

      // セレクトに追加
      const option = document.createElement("option");
      option.value = id;
      option.textContent = m.name;
      memberSelect.appendChild(option);
    }

    setupDialogs();
    observeCards();
  } catch (e) {
    console.error(e);
    memberList.innerHTML = "<p>メンバーの読み込みに失敗しました。</p>";
  }
}

// ダイアログボタンの設定
function setupDialogs() {
  document.querySelectorAll(".openBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = document.getElementById(btn.dataset.target);
      dialog.showModal();
      document.body.classList.add("no-scroll");
    });
  });

  document.querySelectorAll(".closeBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest("dialog").close();
      document.body.classList.remove("no-scroll");
    });
  });
}

// セレクトでスクロール
memberSelect.addEventListener("change", () => {
  const id = memberSelect.value;
  if (!id) return;
  const el = document.getElementById(id);
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("highlight");
  setTimeout(() => el.classList.remove("highlight"), 1500);
});

// 検索機能
memberSearch.addEventListener("input", () => {
  const keyword = memberSearch.value.toLowerCase();
  document.querySelectorAll(".card").forEach((card) => {
    card.style.display = card.innerText.toLowerCase().includes(keyword)
      ? "flex"
      : "none";
  });
});

// IntersectionObserver でアニメーション
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.2 }
);

function observeCards() {
  document.querySelectorAll(".card").forEach((card) => observer.observe(card));
}

// ハンバーガー
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
hamburger.addEventListener("click", () => {
  const isOpen = sidebar.style.width === "250px";
  sidebar.style.width = isOpen ? "0" : "250px";
  sidebar.style.zIndex = isOpen ? "0" : "1000";
  sidebar.style.display = "block";
  hamburger.classList.toggle("active");
});

// 実行
loadMembers();
