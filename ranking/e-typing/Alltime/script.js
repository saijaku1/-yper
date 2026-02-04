const rawData = {
  ranking: [
    "Jaku:643pt",
    "HFKRU:544pt",
    "スピードアキュレイト:697pt",
    "ぬう:622pt",
    "円周率:622pt",
    "しらす:626pt",
    "こたくん:630pt",
    "まめえだ:634pt",
    "てるさん:531pt",
    "Jujun10:702pt",
    "MHJ:690pt",
    "unused_HAL:711pt",
    "ねぎろと:710pt",
    "きる:692pt",
    "だだだ:713pt",
    "まっつん:708pt",
    "狂:720pt",
    "owata:743pt",
    "れんこん:744pt",
    "かぼちゃ:818pt",
    "無名:822pt",
    "とある:805pt",
    "Eito:853pt",
    "ガブガブ:880pt",
    "ぁ:721pt",
    "E:655pt",
    "WhooooU:724pt"
  ],
};

// 同一順位対応のテーブル描画
function fillTable(divId, data) {
  const tbody = document.querySelector(`#${divId} tbody`);
  if (!tbody) return;
  tbody.innerHTML = "";

  const players = data
    .map((e) => {
      const [name, scoreRaw] = e.split(":");
      return { name, score: parseInt(scoreRaw.replace(/\D/g, "")) };
    })
    .sort((a, b) => b.score - a.score);

  // 同一順位処理
  let currentRank = 1;
  players.forEach((p, i) => {
    if (i > 0 && p.score < players[i - 1].score) {
      currentRank = i + 1;
    }
    p.rank = currentRank;
  });

  players.forEach((p) => {
    const row = document.createElement("tr");
    // 上位3位に色付け
    if (p.rank === 1) row.classList.add("gold");
    else if (p.rank === 2) row.classList.add("silver");
    else if (p.rank === 3) row.classList.add("bronze");

    row.innerHTML = `<td>${p.rank}位</td><td>${p.name}</td><td>${p.score}pt</td>`;
    tbody.appendChild(row);
  });
}

// グラフ描画
function renderChart() {
  const chartCtx = document.getElementById("alltime-chart");
  if (!chartCtx) return;

  const players = rawData.ranking
    .map((e) => {
      const [name, scoreRaw] = e.split(":");
      return { name, score: parseInt(scoreRaw.replace(/\D/g, "")) };
    })
    .sort((a, b) => b.score - a.score);

  new Chart(chartCtx, {
    type: "bar",
    data: {
      labels: players.map((p) => p.name),
      datasets: [
        {
          label: "スコア",
          data: players.map((p) => p.score),
          backgroundColor: players.map((_, i) => {
            if (i === 0) return "rgba(255, 215, 0, 0.7)";
            if (i === 1) return "rgba(192, 192, 192, 0.7)";
            if (i === 2) return "rgba(205, 127, 50, 0.7)";
            return "rgba(212, 159, 255, 0.6)";
          }),
          borderColor: players.map((_, i) => {
            if (i === 0) return "rgba(255, 215, 0, 1)";
            if (i === 1) return "rgba(192, 192, 192, 1)";
            if (i === 2) return "rgba(205, 127, 50, 1)";
            return "rgba(212, 159, 255, 1)";
          }),
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "e-typing 歴代ランキング",
          color: "#fff",
          font: { size: 18, weight: "bold" },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: "rgba(255, 255, 255, 0.1)" },
          ticks: { color: "#fff" },
        },
        y: {
          grid: { display: false },
          ticks: { color: "#fff", font: { size: 12 } },
        },
      },
    },
  });
}

document.getElementById("table-select").addEventListener("change", (e) => {
  document
    .querySelectorAll(".table-div")
    .forEach((div) => (div.style.display = "none"));
  if (e.target.value && e.target.value !== "none") {
    const divId = e.target.value;
    document.getElementById(divId).style.display = "block";
    fillTable(divId, rawData[divId]);
  }
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

// 初期化
document.addEventListener("DOMContentLoaded", () => {
  renderChart();
});
