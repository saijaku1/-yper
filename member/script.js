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

const openBtns = document.querySelectorAll('.openBtn');
const closeBtns = document.querySelectorAll('.closeBtn');

openBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const dialog = document.getElementById(targetId);
    dialog.showModal();

    document.body.classList.add('no-scroll'); 
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('dialog').close();

    document.body.classList.remove('no-scroll'); 
  });
});
