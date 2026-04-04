document.addEventListener("DOMContentLoaded", () => {
  const celebrateBtn = document.getElementById("celebrate-btn");

  // Initial Celebration
  setTimeout(() => {
    fireConfetti();
  }, 1000);

  // Click Celebration
  celebrateBtn.addEventListener("click", () => {
    fireConfetti();
  });

  // Scroll Animations Intersection Observer
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".timeline-item, .message-card").forEach((el) => {
    observer.observe(el);
  });
});

function fireConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ffda69", "#d49fff", "#2f91fa"],
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ffda69", "#d49fff", "#2f91fa"],
      })
    );
  }, 250);
}
