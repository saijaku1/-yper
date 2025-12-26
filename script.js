fetch("news.json")
  .then(res => res.json())
  .then(news => {
    const container = document.getElementById("news-list");

    // 日付が新しい順に並び替え
    news.sort((a, b) => new Date(b.updated) - new Date(a.updated));

    news.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      // タイトル
      const title = document.createElement("h3");
      title.style.color = "white";
      title.textContent = item.title;
      card.appendChild(title);

      // 本文
      item.content.forEach(text => {
        const p = document.createElement("p");
        p.textContent = text;
        card.appendChild(p);
      });

      // リンク
      if (item.links && item.links.length > 0) {
        item.links.forEach(link => {
          const a = document.createElement("a");
          a.href = link.url;
          a.textContent = link.text;
          a.target = "_blank";
          card.appendChild(a);
        });
      }

      // 更新日
      const date = document.createElement("h4");
      date.textContent = `${item.updated} 更新済み`;
      card.appendChild(date);

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("ニュースの読み込みに失敗しました", err);
  });

const targets = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

targets.forEach((target) => observer.observe(target));

const imagebutton = document.querySelector(".Stamp");
imagebutton.addEventListener("click", () => {
  window.location.href = "https://store.line.me/stickershop/product/32024119/ja";
});

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  const isOpen = sidebar.style.width === "250px";
  sidebar.style.width = isOpen ? "0" : "250px";
  sidebar.style.zIndex = isOpen ? "0" : "1000";
  sidebar.style.display = "block";
  hamburger.classList.toggle("active");
});

