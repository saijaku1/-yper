// URL パラメータを取得
const params = new URLSearchParams(window.location.search);
const userId = params.get("user");

fetch("members.json")
  .then((res) => res.json())
  .then((data) => {
    const member = data[userId];
    if (!member) {
      document.getElementById("profile").innerHTML =
        "<p>メンバーが見つかりません</p>";
      return;
    }

    document.getElementById("profile").innerHTML = `
      <h1>${member.name}</h1>
      <img class="membername" src="${member.image}" alt="${member.name}">
      ${member.description.map((p) => `<p>${p}</p>`).join("")}
      ${member.fingering ? `<img class="fingering" src="${member.fingering}" alt="運指">` : ""}
    `;
  });
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
