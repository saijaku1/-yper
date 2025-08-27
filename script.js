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

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.createElement("div");
  menuToggle.classList.add("menu-toggle");
  menuToggle.innerHTML = "☰"; 
  document.querySelector("header nav").prepend(menuToggle);

  const navMenu = document.querySelector("header nav ul");
  menuToggle.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
  });
});

const button=document.querySelector("#read-button").addEventListener("click",=>(){
  window.location.href="https://zetyper.f5.si/notice/Beta";
})
