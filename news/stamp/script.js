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
    threshold: 0.3,
  }
);

targets.forEach((target) => observer.observe(target));

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.createElement("div");
  menuToggle.classList.add("menu-toggle");
  menuToggle.innerHTML = "☰"; // ハンバーガーアイコン
  document.querySelector("header nav").prepend(menuToggle);

  const navMenu = document.querySelector("header nav ul");
  menuToggle.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
  });
});
