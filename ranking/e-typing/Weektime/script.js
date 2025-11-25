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
  menuToggle.innerHTML = "☰"; // ハンバーガーアイコン

  document.querySelector("header nav").prepend(menuToggle);

  const navMenu = document.querySelector("header nav ul");
  menuToggle.addEventListener("click", () => {
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
  });
});

// データ
const rawData = {
  "1277回": ["Jaku:540pt","HFKRU:533pt","Eito:744pt","かぼちゃ:769pt","狂:682pt","unused_HAL:650pt","まめえだ:624pt","だだだ:624pt","スピードアキュレイト:620pt","まっつん:608pt","ねぎろと:581pt","れんこん:671pt","とある:795pt","きる:659pt"],
  "1278回": ["Jaku:509pt","HFKRU:533pt","Eito:643pt","かぼちゃ:737pt","unused_HAL:617pt","まめえだ:550pt","だだだ:560pt","owata☆♪:591pt","スピードアキュレイト:538pt","にこふぁす:415pt","きる:614pt"],
  "1279回": ["Jaku:576pt","かぼちゃ:749pt","れんこん:700pt","unused_HAL:655pt","だだだ:645pt","Eito:627pt","きる:596pt","†漆黒の堕天使†(MHJ):580pt","スピードアキュレイト:581pt","owata☆♪:696pt","まめえだ:561pt","HFKRU:483pt"],
  "1280回": ["Jaku:573pt","かぼちゃ:780pt","れんこん:680pt","owata☆♪:640pt","だだだ:602pt","スピードアキュレイト:600pt","きる:576pt","まめえだ:567pt","こたくん:461pt","HFKRU:444pt","Eito:712pt","unused_HAL:658pt"],
  "1281回": ["Jaku:500pt","かぼちゃ:724pt","owata☆♪:589pt","だだだ:596pt","れんこん:600pt","スピードアキュレイト:559pt","きる:576pt","狂:579pt","まめえだ:553pt","shidaken:464pt","こたくん:461pt","HFKRU:422pt","Eito:674pt","unused_HAL:618pt"],
  "1282回": ["Jaku:564pt","Eito:722pt","かぼちゃ:705pt","れんこん:642pt","unused_HAL:626pt","owata☆♪:564pt","スピードアキュレイト:562pt","N.S-21:550pt","まめえだ:549pt","ねぎろと:530pt","きる:519pt","HFKRU:466pt"],
  "1283回": ["かぼちゃ:706pt","Eito:696pt","N.S-21:627pt","Jaku:619pt","unused_HAL:626pt","だだだ:618pt","きる:596pt","ねぎろと:590pt","owata☆♪:553pt","狂:538pt","まめえだ:515pt","スピードアキュレイト:578pt","れんこん:613pt","HFKRU:500pt","こたくん:413pt"]
};

// 数値抽出
function extractScore(str) {
  const m = str.match(/\d+/);
  return m ? parseInt(m[0]) : 0;
}

// テーブル描画
function fillTable(divId, data) {
  const tbody = document.querySelector(`#div-${divId} tbody`);
  if (!tbody) return;
  tbody.innerHTML = "";
  const players = data.map(e => {
    const [name, scoreRaw] = e.split(":");
    return { name, score: extractScore(scoreRaw) };
  }).sort((a,b)=>b.score-a.score);

  players.forEach((p,i)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${p.score ? (i+1)+"位":"-"}</td><td>${p.name}</td><td>${p.score}pt</td>`;
    tbody.appendChild(tr);
  });
}

// 平均計算
function calculateStats(data) {
  const divisionAvg = {};
  const playerTotal = {};
  const playerCount = {};
  let totalSum = 0, totalCount = 0;

  for(const div in data){
    const scores = data[div].map(e=>extractScore(e));
    const sum = scores.reduce((a,b)=>a+b,0);
    divisionAvg[div] = scores.length ? Math.round(sum/scores.length) : 0;

    data[div].forEach(e=>{
      const [name, scoreStr] = e.split(":");
      const score = extractScore(scoreStr);
      playerTotal[name] = (playerTotal[name]||0)+score;
      playerCount[name] = (playerCount[name]||0)+1;
    });

    totalSum += sum;
    totalCount += scores.length;
  }

  const playerAvg = {};
  for(const name in playerTotal){
    playerAvg[name] = Math.round(playerTotal[name]/playerCount[name]);
  }

  return {divisionAvg, playerAvg, totalAvg: totalCount?Math.round(totalSum/totalCount):0};
}

// 平均描画
function renderStats(){
  const stats = calculateStats(rawData);

  // 大会平均
  const divisionTable = document.querySelector("#division-avg-table tbody");
  divisionTable.innerHTML = "";
  for(const key in stats.divisionAvg){
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${key}</td><td>${stats.divisionAvg[key]}pt</td>`;
    divisionTable.appendChild(tr);
  }

  // 個人平均
  const playerTable = document.querySelector("#player-avg-table tbody");
  playerTable.innerHTML = "";
  Object.entries(stats.playerAvg).sort((a,b)=>b[1]-a[1]).forEach(([name,avg])=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${name}</td><td>${avg}pt</td>`;
    playerTable.appendChild(tr);
  });

  // 全体平均
  document.querySelector("#total-avg")?.remove();
  const p = document.createElement("p");
  p.id="total-avg";
  p.innerHTML=`<strong>全体平均：</strong>${stats.totalAvg}pt`;
  document.getElementById("stats-box").prepend(p);
}

// 初期設定
document.addEventListener("DOMContentLoaded", ()=>{
  renderStats();

  // 初期非表示
  document.querySelectorAll(".table-div").forEach(d=>d.style.display="none");

  document.getElementById("table-select").addEventListener("change", e=>{
    document.querySelectorAll(".table-div").forEach(d=>d.style.display="none");
    const divId = e.target.value;
    if(divId){
      document.getElementById(`div-${divId}`).style.display="block";
      fillTable(divId, rawData[divId]);
    }
  });
});
