document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Reveal
    const hiddens = document.querySelectorAll('.hidden');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    hiddens.forEach(el => observer.observe(el));

    // Fallback: If elements are still hidden after 2 seconds, show them
    setTimeout(() => {
        hiddens.forEach(el => {
            if (!el.classList.contains('show')) {
                el.classList.add('show');
            }
        });
    }, 2000);

    // Refined Confetti (Snow-like)
    const confettiContainer = document.getElementById('confetti');
    if (confettiContainer) {
        const colors = ['#7dd3fc', '#38bdf8', '#f472b6', '#ffffff'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.animationDuration = (Math.random() * 5 + 5) + 's';
            confetti.style.animationDelay = (Math.random() * 10) + 's';
            confetti.style.opacity = Math.random() * 0.5 + 0.2;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 4 + 2) + 'px';
            confetti.style.height = confetti.style.width;
            confettiContainer.appendChild(confetti);
        }
    }

    // Runaway winter effect
    const loginLink = document.querySelector('.login-link');
    if (loginLink) {
        loginLink.addEventListener('mouseover', () => {
            const x = (Math.random() - 0.5) * 200;
            const y = (Math.random() - 0.5) * 200;
            loginLink.style.transition = '0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            loginLink.style.transform = `translate(${x}px, ${y}px) scale(0.8)`;
            
            const msgs = ['zzz...', 'あと10分...', '夢の中', 'おやすみ'];
            loginLink.textContent = msgs[Math.floor(Math.random() * msgs.length)];
        });
        
        loginLink.addEventListener('mouseleave', () => {
            setTimeout(() => {
                loginLink.style.transform = 'translate(0, 0) scale(1)';
                loginLink.textContent = '冬眠';
            }, 1000);
        });
    }

    // High-end Typing Effect (Parody of fast typing)
    const hero = document.querySelector('.hero-text');
    if (hero) {
        const text = hero.textContent;
        hero.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                hero.textContent += text[i];
                i++;
                setTimeout(type, 300);
            }
        }
        setTimeout(type, 1000);
    }

    // Hamburger Menu Fix
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            const currentWidth = sidebar.style.width;
            if (currentWidth === '250px') {
                sidebar.style.width = '0';
                hamburger.classList.remove('active');
            } else {
                sidebar.style.width = '250px';
                hamburger.classList.add('active');
                sidebar.style.display = 'block'; // Ensure it's not display:none
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !hamburger.contains(e.target) && sidebar.style.width === '250px') {
                sidebar.style.width = '0';
                hamburger.classList.remove('active');
            }
        });
    }
});
