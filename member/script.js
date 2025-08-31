const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => observer.observe(card));

const memberSelect = document.getElementById("memberSelect");

memberSelect.addEventListener("change", () => {
  const selectedId = memberSelect.value;
  if (selectedId) {
    document.getElementById(selectedId).scrollIntoView({ behavior: "smooth" });
  }
});
