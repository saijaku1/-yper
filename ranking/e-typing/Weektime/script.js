const rawData = {
  div1: [
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
    "RFれんこん:671pt",
    "とある:795pt",
    "きる:659pt"
  ],
  div2: [
    "Jaku:509pt",
    "HFKRU:533pt",
    "Eito:643pt",
    "かぼちゃ:737pt",
    "unused_HAL:617pt",
    "まめえだ:550pt",
    "だだだ:560pt",
    "owata:591pt",
    "スピードアキュレイト:538pt",
    "にこふぁす:415pt",
    "きる:614pt"
  ],
  div3: [
    "Jaku:576pt",
    "かぼちゃ:749pt",
    "RFれんこん:700pt",
    "unused_HAL:655pt",
    "だだだ:645pt",
    "Eito:627pt",
    "きる:596pt",
    "†漆黒の堕天使†(MHJ):580pt",
    "スピードアキュレイト:581pt",
    "owata☆♪:696pt",
    "まめえだ:561pt",
    "HFKRU:483pt"
  ],
  div4: [
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
    "unused_HAL:658pt"
  ],
  div5: [
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
    "unused_HAL:618pt"
  ],
  div6: [
    "Jaku:564pt",
    "Eito:722pt",
    "かぼちゃ:705pt",
    "れんこん:642pt",
    "unused_HAL:626pt",
    "owata:564pt",
    "スピードアキュレイト:562pt",
    "N.S-21:550pt",
    "まめえだ:549pt",
    "ねぎろと:530pt",
    "きる:519pt",
    "HFKRU:466pt"
  ],
  div7: [] // データなしなら空配列
};

function fillTable(divId, data) {
  const tbody = document.querySelector(`#${divId} tbody`);
  tbody.innerHTML = "";

  // データを整形＆スコア順にソート
  const players = data
    .map((e) => {
      const [name, scoreRaw] = e.split(":");
      // 「不明」など数値が取れない場合は 0 にする
      const match = scoreRaw.match(/\d+/,"");
      const scoreNum = match ? parseInt(match[0]) : 0;
      return { name, scoreRaw, scoreNum };
    })
    .sort((a, b) => b.scoreNum - a.scoreNum); // 数値が大きいほど上位に

  // 表に追加
  players.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${p.scoreNum ? `${i + 1}位` : "-"}</td>
                     <td>${p.name}</td>
                     <td>${p.scoreRaw}</td>`;
    tbody.appendChild(row);
  });
}

document.getElementById("table-select").addEventListener("change", (e) => {
  document
    .querySelectorAll(".table-div")
    .forEach((div) => (div.style.display = "none"));
  if (e.target.value) {
    const divId = e.target.value;
    document.getElementById(divId).style.display = "block";
    fillTable(divId, rawData[divId]);
  }
});

// ==== 平均計算関数 ====

function calculateStats(rawData) {
  const playerScores = {};
  const divisionAvg = {};
  let totalSum = 0;
  let totalCount = 0;

  for (const divKey in rawData) {
    const arr = rawData[divKey];
    if (!Array.isArray(arr)) continue;

    let divSum = 0;
    let divCount = 0;

    arr.forEach(item => {
      const [name, scoreRaw] = item.split(":");
      const match = scoreRaw.match(/\d+/);
      const score = match ? parseInt(match[0]) : 0;

      if (!playerScores[name]) playerScores[name] = [];
      playerScores[name].push(score);

      divSum += score;
      divCount++;

      totalSum += score;
      totalCount++;
    });

    divisionAvg[divKey] = Math.round(divSum / divCount);
  }

  const playerAvg = {};
  for (const name in playerScores) {
    const scores = playerScores[name];
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    playerAvg[name] = Math.round(avg);
  }

  const totalAvg = Math.round(totalSum / totalCount);

  return { playerAvg, divisionAvg, totalAvg };
}

// ==== 平均表示用 ====

function renderStats() {
  const stats = calculateStats(rawData);
  const box = document.getElementById("stats-list");
  box.innerHTML = "";

  // 全体平均
  box.innerHTML += `<li><strong>全体平均：</strong>${stats.totalAvg}pt</li>`;

  // 各ディビ平均
  box.innerHTML += `<br><strong>各ディビ平均</strong>`;
  for (const key in stats.divisionAvg) {
    box.innerHTML += `<li>${key}： ${stats.divisionAvg[key]}pt</li>`;
  }

  // プレイヤー平均（折りたたみ対応すると見やすい）
  box.innerHTML += `<br><strong>プレイヤー平均</strong>`;
  for (const name in stats.playerAvg) {
    box.innerHTML += `<li>${name}： ${stats.playerAvg[name]}pt</li>`;
  }
}

// ページ読み込み時に実行
document.addEventListener("DOMContentLoaded", renderStats);

