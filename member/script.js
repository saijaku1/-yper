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

// 開くボタン
document.querySelectorAll('.openBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const dialog = document.getElementById(targetId);
    dialog.showModal();
  });
});

// 閉じるボタン
document.querySelectorAll('.closeBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('dialog').close();
  });
});
