document.addEventListener('DOMContentLoaded', () => {
    const memberList = document.getElementById('memberList');

    async function loadMembers() {
        try {
            const res = await fetch('members.json');
            if (!res.ok) throw new Error('Failed to load members');
            const members = await res.json();

            for (const id in members) {
                const m = members[id];
                const li = document.createElement('li');
                li.className = 'card hidden';
                li.innerHTML = `
                    <div class="card-inner">
                        <img src="${m.image}" alt="${m.name}" class="li-image">
                        <h3>${m.name}</h3>
                        <div class="description">
                            ${m.description.map(line => `<p>${line}</p>`).join('')}
                        </div>
                    </div>
                `;
                memberList.appendChild(li);
            }

            observeCards();
            setupConfetti();
        } catch (e) {
            console.error(e);
            memberList.innerHTML = '<p class="error">メンバーデータの読み込みに失敗しました。</p>';
        }
    }

    function observeCards() {
        const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => observer.observe(card));
        
        // Fallback
        setTimeout(() => {
            cards.forEach(card => card.classList.add('show'));
        }, 1500);
    }

    function setupConfetti() {
        const container = document.getElementById('confetti');
        if (!container) return;
        const colors = ['#7dd3fc', '#38bdf8', '#f472b6', '#ffffff'];
        for (let i = 0; i < 30; i++) {
            const c = document.createElement('div');
            c.className = 'confetti';
            c.style.left = Math.random() * 100 + 'vw';
            c.style.animationDuration = (Math.random() * 5 + 5) + 's';
            c.style.animationDelay = (Math.random() * 5) + 's';
            c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(c);
        }
    }

    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            sidebar.style.width = sidebar.style.width === '250px' ? '0' : '250px';
            hamburger.classList.toggle('active');
        });
    }

    loadMembers();
});
