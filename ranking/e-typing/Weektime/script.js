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
  },
);

targets.forEach((target) => observer.observe(target));

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  const isOpen = sidebar.style.width === "250px";
  sidebar.style.width = isOpen ? "0" : "250px";
  sidebar.style.zIndex = isOpen ? "0" : "1000";
  sidebar.style.display = "block";
  hamburger.classList.toggle("active");
});

const rawData = {
  "1277回": [
    "Jaku:540pt",
    "HFKRU:533pt",
    "Eito:744pt",
    "かぼちゃ:769pt",
    "狂:682pt",
    "unused_HAL:650pt",
    "まめえだ:624pt",
    "だだだ:624pt",
    "スピードアキュレイト:620pt",
    "まっつん:608pt",
    "ねぎろと:581pt",
    "れんこん:671pt",
    "とある:795pt",
    "きる:659pt",
  ],
  "1278回": [
    "Jaku:509pt",
    "HFKRU:533pt",
    "Eito:643pt",
    "かぼちゃ:737pt",
    "unused_HAL:617pt",
    "まめえだ:550pt",
    "だだだ:560pt",
    "owata☆♪:591pt",
    "スピードアキュレイト:538pt",
    "にこふぁす:415pt",
    "きる:614pt",
  ],
  "1279回": [
    "Jaku:576pt",
    "かぼちゃ:749pt",
    "れんこん:700pt",
    "unused_HAL:655pt",
    "だだだ:645pt",
    "Eito:627pt",
    "きる:596pt",
    "†漆黒の堕天使†(MHJ):580pt",
    "スピードアキュレイト:581pt",
    "owata☆♪:696pt",
    "まめえだ:561pt",
    "HFKRU:483pt",
  ],
  "1280回": [
    "Jaku:573pt",
    "かぼちゃ:780pt",
    "れんこん:680pt",
    "owata☆♪:640pt",
    "だだだ:602pt",
    "スピードアキュレイト:600pt",
    "きる:576pt",
    "まめえだ:567pt",
    "こたくん:461pt",
    "HFKRU:444pt",
    "Eito:712pt",
    "unused_HAL:658pt",
  ],
  "1281回": [
    "Jaku:500pt",
    "かぼちゃ:724pt",
    "owata☆♪:589pt",
    "だだだ:596pt",
    "れんこん:600pt",
    "スピードアキュレイト:559pt",
    "きる:576pt",
    "狂:579pt",
    "まめえだ:553pt",
    "shidaken:464pt",
    "こたくん:461pt",
    "HFKRU:422pt",
    "Eito:674pt",
    "unused_HAL:618pt",
  ],
  "1282回": [
    "Jaku:564pt",
    "Eito:722pt",
    "かぼちゃ:705pt",
    "れんこん:642pt",
    "unused_HAL:626pt",
    "owata☆♪:564pt",
    "スピードアキュレイト:562pt",
    "N.S-21:550pt",
    "まめえだ:549pt",
    "ねぎろと:530pt",
    "きる:519pt",
    "HFKRU:466pt",
  ],
  "1283回": [
    "かぼちゃ:706pt",
    "Eito:696pt",
    "N.S-21:627pt",
    "Jaku:619pt",
    "unused_HAL:626pt",
    "だだだ:618pt",
    "きる:596pt",
    "ねぎろと:590pt",
    "owata☆♪:553pt",
    "狂:538pt",
    "まめえだ:515pt",
    "スピードアキュレイト:578pt",
    "れんこん:613pt",
    "HFKRU:500pt",
    "こたくん:413pt",
  ],
  "1284回": [
    "かぼちゃ:773pt",
    "Eito:768pt",
    "れんこん:678pt",
    "スピードアキュレイト:645pt",
    "きる:641pt",
    "unused_HAL:641pt",
    "だだだ:626pt",
    "N.S-21:593pt",
    "Jaku:573pt",
    "まめえだ:535pt",
    "はちみちゅ:535pt",
    "HFKRU:449pt",
  ],
  "1285回": [
    "Eito:802pt",
    "かぼちゃ:780pt",
    "れんこん:707pt",
    "owata☆♪:699pt",
    "unused_HAL:658pt",
    "スピードアキュレイト:652pt",
    "Jaku:622pt",
    "きる:612pt",
    "まめえだ:599pt",
    "はちみちゅ:558pt",
    "こたくん:491pt",
    "HFKRU:481pt",
  ],
  "1286回": [
    "Eito:815pt",
    "かぼちゃ:758pt",
    "れんこん:698pt",
    "だだだ:690pt",
    "unused_HAL:669pt",
    "スピードアキュレイト:642pt",
    "はちみちゅ:611pt",
    "ぬう:606pt",
    "きる:604pt",
    "Jaku:601pt",
    "狂:597pt",
    "まめえだ:582pt",
    "shidaken:516pt",
    "まっつん:496pt",
  ],
  "1287回": [
    "Eito:704pt",
    "かぼちゃ:738pt",
    "unused_HAL:674pt",
    "スピードアキュレイト:646pt",
    "れんこん:645pt",
    "owata☆♪:645pt",
    "だだだ:622pt",
    "きる:594pt",
    "Jaku:562pt",
    "はちみちゅ:536pt",
    "HFKRU:517pt",
    "にこふぁす:410pt",
    "こたくん:401pt",
  ],
  "1288回": [
    "Eito:752pt",
    "かぼちゃ:750pt",
    "きる:652pt",
    "unused_HAL:624pt",
    "スピードアキュレイト:613pt",
    "だだだ:612pt",
    "Jaku:549pt",
    "HFKRU:535pt",
    "はちみちゅ:527pt",
  ],
  "1289回": [
    "Eito:853pt",
    "かぼちゃ:818pt",
    "とある:805pt",
    "無名:822pt",
    "ガブガブ:810pt",
    "ぁ:721pt",
    "unused_HAL:711pt",
    "きる:691pt",
    "スピードアキュレイト:697pt",
    "だだだ:713pt",
    "N.S-21:674pt",
    "れんこん:704pt",
    "†漆黒の堕天使†(MHJ):690pt",
    "はちみちゅ:655pt",
    "ねぎろと:710pt",
    "狂:664pt",
    "HFKRU:510pt",
    "Jaku:640pt",
    "shidaken:532pt",
  ],
  "1290回": [
    "Eito:777pt",
    "かぼちゃ:798pt",
    "れんこん:763pt",
    "Jaku:643pt",
    "きる:690pt",
    "owata☆♪:688pt",
    "unused_HAL:686pt",
    "だだだ:684pt",
    "スピードアキュレイト:671pt",
    "E:646pt",
    "HFKRU:475pt",
  ],
  "1291回": [
    "WhooooU:793pt",
    "かぼちゃ:750pt",
    "Eito:744pt",
    "きる:671pt",
    "だだだ:647pt",
    "スピードアキュレイト:625pt",
    "Jaku:599pt",
    "はちみちゅ:590pt",
    "てるさん:531pt",
    "HFKRU:503pt",
    "unused_HAL:651pt",
    "E:664pt",
  ],
  "1292回": [
    "Eito:815pt",
    "かぼちゃ:792pt",
    "unused_HAL:674pt",
    "きる:663pt",
    "E:639pt",
    "だだだ:639pt",
    "はちみちゅ:637pt",
    "スピードアキュレイト:632pt",
    "Jaku:630pt",
    "狂:544pt",
    "HFKRU:531pt",
    "てるさん:528pt",
  ],
  "1293回": [
    "Eito:726pt",
    "かぼちゃ:724pt",
    "unused_HAL:649pt",
    "きる:620pt",
    "E:634pt",
    "だだだ:618pt",
    "ねぎろと:552pt",
    "スピードアキュレイト:618pt",
    "Jaku:577pt",
    "てるさん:476pt",
    "HFKRU:531pt",
    "てるさん:528pt",
  ],
  "1294回": [
     "Eito:840pt",
     "ガブガブ:830pt",
     "かぼちゃ:825pt",
     "きる:706pt",
     "スピードアキュレイト:677pt",
     "だだだ:672pt",
     "unused_HAL:661pt",
     "E:653pt",
     "Jaku:631pt",
     "ねぎろと:625pt",
     "BOKUCHARO:602pt",
     "てるさん:537pt",
     "HFKRU:534pt",
  ],
  "1295回":[
    "Eito:768pt",
    "かぼちゃ:729pt",
    "スピードアキュレイト:641pt",
    "unused_HAL:640pt",
    "きる:610pt",
    "E:604pt",
    "Jaku:594pt",
    "まっつん:562pt",
    "てるさん:531pt",
    "HFKRU:507pt"
  ],
   "1296回":[
    "Eito:747pt",
    "かぼちゃ:726pt",
    "owata☆♪:658pt",
    "BOKUCHARO:642pt",
    "スピードアキュレイト:647pt",
    "unused_HAL:640pt",
    "きる:639pt",
    "E:633pt",
    "Jaku:577pt",
    "だだだ:590pt",
    "てるさん:501pt",
    "HFKRU:494pt",
    "shidaken:500pt",
    "小麦粉:582pt",
    "ねぎろと:563pt"
  ],
   "1297回":[
    "Eito:748pt",
    "かぼちゃ:734pt",
    "BOKUCHARO:599pt",
    "スピードアキュレイト:640pt",
    "unused_HAL:681pt",
    "きる:559pt",
    "owata☆♪:571pt",
    "E:621pt",
    "はちみちゅ:644pt",
    "Jaku:577pt",
    "まっつん:523pt"
    "てるさん:591pt",
    "こたくん:579pt",
    "HFKRU:478pt",
  ],
  "1298回"[]
};

// 数値抽出
function extractScore(str) {
  const m = str.match(/\d+/);
  return m ? parseInt(m[0]) : 0;
}

// 同一順位対応のテーブル描画
function fillTable(divId, data) {
  const tbody = document.querySelector(`#div-${divId} tbody`);
  if (!tbody) return;
  tbody.innerHTML = "";

  const players = data
    .map((e) => {
      const [name, scoreRaw] = e.split(":");
      return { name, score: extractScore(scoreRaw) };
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
    const tr = document.createElement("tr");
    // 上位3位に色付け
    if (p.rank === 1) tr.classList.add("gold");
    else if (p.rank === 2) tr.classList.add("silver");
    else if (p.rank === 3) tr.classList.add("bronze");

    tr.innerHTML = `<td>${p.score ? p.rank + "位" : "-"}</td><td>${p.name}</td><td>${p.score}pt</td>`;
    tbody.appendChild(tr);
  });
}

// 平均計算
function calculateStats(data) {
  const divisionAvg = {};
  const playerTotal = {};
  const playerCount = {};
  const playerMax = {}; // 個人最高記録
  let totalSum = 0,
    totalCount = 0;

  for (const div in data) {
    const scores = data[div].map((e) => extractScore(e));
    const sum = scores.reduce((a, b) => a + b, 0);
    divisionAvg[div] = scores.length ? Math.round(sum / scores.length) : 0;

    data[div].forEach((e) => {
      const [name, scoreStr] = e.split(":");
      const score = extractScore(scoreStr);
      playerTotal[name] = (playerTotal[name] || 0) + score;
      playerCount[name] = (playerCount[name] || 0) + 1;
      playerMax[name] = Math.max(playerMax[name] || 0, score);
    });

    totalSum += sum;
    totalCount += scores.length;
  }

  const playerAvg = {};
  for (const name in playerTotal) {
    playerAvg[name] = Math.round(playerTotal[name] / playerCount[name]);
  }

  return {
    divisionAvg,
    playerAvg,
    playerMax,
    totalAvg: totalCount ? Math.round(totalSum / totalCount) : 0,
  };
}

function checkAlltimeRecords(playerMax) {
  const updates = [];
  for (const name in playerMax) {
    const weekMax = playerMax[name];
    const alltimeData = {};
    const normalizedName = name.replace(/[☆♪]/g, "");
    const alltimeScore = alltimeData[name] || alltimeData[normalizedName] || 0;

    if (alltimeScore > 0 && weekMax > alltimeScore) {
      updates.push({
        name,
        oldScore: alltimeScore,
        newScore: weekMax,
        diff: weekMax - alltimeScore,
      });
    }
  }
  return updates;
}

function renderCharts(stats) {
  // 個人平均グラフ
  const playerCtx = document.getElementById("player-avg-chart");
  if (playerCtx) {
    const sortedPlayers = Object.entries(stats.playerAvg).sort(
      (a, b) => b[1] - a[1],
    );

    new Chart(playerCtx, {
      type: "bar",
      data: {
        labels: sortedPlayers.map((p) => p[0]),
        datasets: [
          {
            label: "個人平均スコア",
            data: sortedPlayers.map((p) => p[1]),
            backgroundColor: "rgba(212, 159, 255, 0.6)",
            borderColor: "rgba(212, 159, 255, 1)",
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
            text: "個人平均スコア",
            color: "#fff",
            font: { size: 16 },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: "rgba(255,255,255,0.1)" },
            ticks: { color: "#fff" },
          },
          y: {
            grid: { display: false },
            ticks: { color: "#fff", font: { size: 11 } },
          },
        },
      },
    });
  }

  // 全体平均推移グラフ
  const divisionCtx = document.getElementById("division-avg-chart");
  if (divisionCtx) {
    const divisions = Object.keys(stats.divisionAvg).filter(
      (k) => stats.divisionAvg[k] > 0,
    );

    new Chart(divisionCtx, {
      type: "line",
      data: {
        labels: divisions,
        datasets: [
          {
            label: "大会平均スコア",
            data: divisions.map((d) => stats.divisionAvg[d]),
            borderColor: "rgba(47, 145, 250, 1)",
            backgroundColor: "rgba(47, 145, 250, 0.2)",
            fill: true,
            tension: 0.3,
            pointBackgroundColor: "rgba(47, 145, 250, 1)",
            pointBorderColor: "#fff",
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "大会別平均スコア推移",
            color: "#fff",
            font: { size: 16 },
          },
        },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.1)" },
            ticks: { color: "#fff" },
          },
          y: {
            beginAtZero: false,
            grid: { color: "rgba(255,255,255,0.1)" },
            ticks: { color: "#fff" },
          },
        },
      },
    });
  }
}

// 平均描画
function renderStats() {
  const stats = calculateStats(rawData);

  // 大会平均
  const divisionTable = document.querySelector("#division-avg-table tbody");
  divisionTable.innerHTML = "";
  for (const key in stats.divisionAvg) {
    if (stats.divisionAvg[key] === 0) continue;
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${key}</td><td>${stats.divisionAvg[key]}pt</td>`;
    divisionTable.appendChild(tr);
  }

  // 個人平均（同一順位対応）
  const playerTable = document.querySelector("#player-avg-table tbody");
  playerTable.innerHTML = "";
  const sortedPlayers = Object.entries(stats.playerAvg).sort(
    (a, b) => b[1] - a[1],
  );

  let currentRank = 1;
  sortedPlayers.forEach(([name, avg], i) => {
    if (i > 0 && avg < sortedPlayers[i - 1][1]) {
      currentRank = i + 1;
    }
    const tr = document.createElement("tr");
    if (currentRank === 1) tr.classList.add("gold");
    else if (currentRank === 2) tr.classList.add("silver");
    else if (currentRank === 3) tr.classList.add("bronze");
    tr.innerHTML = `<td>${currentRank}位</td><td>${name}</td><td>${avg}pt</td>`;
    playerTable.appendChild(tr);
  });

  // 全体平均
  document.querySelector("#total-avg")?.remove();
  const p = document.createElement("p");
  p.id = "total-avg";
  p.innerHTML = `<strong>全体平均：</strong>${stats.totalAvg}pt`;
  document.getElementById("stats-box").prepend(p);

  // グラフ描画
  renderCharts(stats);

  // Alltime更新チェック
  const updates = checkAlltimeRecords(stats.playerMax);
  if (updates.length > 0) {
    renderAlltimeUpdates(updates);
  }
}

// Alltime記録更新通知を表示
function renderAlltimeUpdates(updates) {
  const container = document.getElementById("alltime-updates");
  if (!container) return;

  container.innerHTML = `
    <h3>🎉 Alltime記録更新！</h3>
    <p>以下のプレイヤーがAlltime記録を更新しました：</p>
    <ul>
      ${updates
        .map(
          (u) => `
        <li><strong>${u.name}</strong>: ${u.oldScore}pt → ${u.newScore}pt (+${u.diff}pt)</li>
      `,
        )
        .join("")}
    </ul>
  `;
  container.style.display = "block";
}

// 初期設定
document.addEventListener("DOMContentLoaded", () => {
  renderStats();

  // 初期非表示
  document
    .querySelectorAll(".table-div")
    .forEach((d) => (d.style.display = "none"));

  document.getElementById("table-select").addEventListener("change", (e) => {
    document
      .querySelectorAll(".table-div")
      .forEach((d) => (d.style.display = "none"));
    const divId = e.target.value;
    if (divId && divId !== "none") {
      document.getElementById(`div-${divId}`).style.display = "block";
      fillTable(divId, rawData[divId]);
    }
  });
});
