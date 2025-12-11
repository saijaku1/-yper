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
