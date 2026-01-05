window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.background = "rgba(10, 10, 15, 0.9)";
  } else {
    header.style.background = "rgba(10, 10, 15, 0.8)";
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});
document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

const CHANNEL_ID = "UClaV4yvQq_jKw19dOyX6wPw";
const INSTANCES = [
  "https://inv.tux.pizza",
  "https://invidious.jing.rocks",
  "https://vid.priv.au",
  "https://invidious.fdn.fr",
];

let currentInstanceIndex = 0;
let currentPage = 1;
let isLoading = false;
let hasMore = true;

const gallery = document.getElementById("video-gallery");
const loadMoreContainer = document.getElementById("load-more-container");
const loadMoreBtn = document.getElementById("load-more-btn");

async function fetchWithFallback(endpoint) {
  for (let i = 0; i < INSTANCES.length; i++) {
    const idx = (currentInstanceIndex + i) % INSTANCES.length;
    const instance = INSTANCES[idx];
    try {
      console.log(`Trying instance: ${instance}`);
      const response = await fetch(`${instance}${endpoint}`);
      if (response.ok) {
        currentInstanceIndex = idx;
        return await response.json();
      }
    } catch (e) {
      console.warn(`Instance ${instance} failed`, e);
    }
  }
  throw new Error("All instances failed");
}

async function fetchRSSFallback() {
  console.log("Attempting RSS Fallback...");
  const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const RSS_API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
    RSS_URL
  )}`;

  const response = await fetch(RSS_API_URL);
  const data = await response.json();

  if (data.status === "ok" && data.items.length > 0) {
    gallery.innerHTML = "";
    const notice = document.createElement("p");
    notice.style.gridColumn = "1 / -1";
    notice.style.textAlign = "center";
    notice.style.color = "var(--text-muted)";
    notice.style.marginBottom = "1rem";
    notice.innerText = "※ サーバー負荷のため、最新動画のみを表示しています。";
    gallery.appendChild(notice);

    data.items.forEach((item) => {
      const videoId = item.link.split("v=")[1] || item.guid.split(":")[2];
      const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      const date = new Date(item.pubDate).toLocaleDateString("ja-JP");

      const card = document.createElement("a");
      card.className = "video-card hidden zoom-in";
      card.href = item.link;
      card.target = "_blank";
      card.innerHTML = `
                <div style="position: relative;">
                   <img src="${thumbnail}" alt="${item.title}" class="video-thumbnail">
                </div>
                <div class="video-info">
                   <h3 class="video-title">${item.title}</h3>
                   <div class="video-date">${date}</div>
                </div>
            `;
      gallery.appendChild(card);
      setTimeout(() => card.classList.add("show"), 100);
    });
    loadMoreContainer.style.display = "none";
  } else {
    throw new Error("RSS Fallback returned no items");
  }
}

async function fetchVideos() {
  if (isLoading || !hasMore) return;
  isLoading = true;

  if (currentPage === 1) {
    gallery.innerHTML =
      '<div class="loading-message">動画を読み込み中...</div>';
    loadMoreContainer.style.display = "none";
  } else {
    loadMoreBtn.textContent = "読み込み中...";
    loadMoreBtn.disabled = true;
  }

  try {
    const videos = await fetchWithFallback(
      `/api/v1/channels/${CHANNEL_ID}/videos?page=${currentPage}`
    );

    if (currentPage === 1) gallery.innerHTML = "";

    if (videos && videos.length > 0) {
      videos.forEach((item) => {
        const thumbnail = `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`;

        let durationText = "";
        if (item.lengthSeconds) {
          const mins = Math.floor(item.lengthSeconds / 60);
          const secs = item.lengthSeconds % 60;
          durationText = `${mins}:${secs.toString().padStart(2, "0")}`;
        }

        const card = document.createElement("a");
        card.className = "video-card hidden zoom-in";
        card.href = `https://www.youtube.com/watch?v=${item.videoId}`;
        card.target = "_blank";
        card.innerHTML = `
                  <div style="position: relative;">
                      <img src="${thumbnail}" alt="${
          item.title
        }" class="video-thumbnail">
                      <span style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.8); color: white; padding: 2px 5px; border-radius: 4px; font-size: 0.8rem;">${durationText}</span>
                  </div>
                  <div class="video-info">
                      <h3 class="video-title">${item.title}</h3>
                      <div class="video-date">${
                        item.publishedText || "Recently"
                      }</div>
                  </div>
              `;
        gallery.appendChild(card);
        setTimeout(() => card.classList.add("show"), 100);
      });

      currentPage++;
      loadMoreContainer.style.display = "block";
      loadMoreBtn.textContent = "もっと見る";
      loadMoreBtn.disabled = false;
    } else {
      hasMore = false;
      loadMoreContainer.style.display = "none";
      if (currentPage === 1) throw new Error("No videos found");
    }
  } catch (error) {
    console.error("Primary API failed:", error);
    if (currentPage === 1) {
      try {
        await fetchRSSFallback();
      } catch (rssError) {
        console.error("RSS failed:", rssError);
        gallery.innerHTML =
          '<div class="error-message">動画の読み込みに失敗しました。<br>しばらく経ってから再読み込みしてください。</div>';
      }
    } else {
      loadMoreBtn.textContent = "読み込み失敗";
      setTimeout(() => {
        loadMoreBtn.textContent = "もっと見る";
        loadMoreBtn.disabled = false;
      }, 2000);
    }
  } finally {
    isLoading = false;
  }
}

fetchVideos();

loadMoreBtn.addEventListener("click", fetchVideos);

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  const isOpen = sidebar.style.width === "250px";
  sidebar.style.width = isOpen ? "0" : "250px";
  sidebar.style.zIndex = isOpen ? "0" : "1000";
  sidebar.style.display = "block";
  hamburger.classList.toggle("active");
});

