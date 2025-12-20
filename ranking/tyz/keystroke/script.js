const rawData = {
  ranking: [
    "unused_HAL:850打鍵",
    "Jaku:863打鍵",
    "スピードアキュレイト:844打鍵",
    "まめえだ:796打鍵",
    "ねぎろと:797打鍵",
    "HFKRU:663打鍵",
    "だだだ:931打鍵",
    "N.S.21:903打鍵",
    "shidaken:701打鍵",
    "Eito:1113打鍵",
    "かぼちゃ:1028打鍵",
    "MHJ:701打鍵",
    "きる:892打鍵",
    "れんこん:840打鍵",
    "owata:820打鍵",
    "とある:不明",
    "Jujun10:1005打鍵",
    "ガブガブ:1017打鍵",
    "狂:862打鍵",
    "しらす:不明",
    "だらる:不明",
    "はっちゃん:不明",
    "円周率:不明",
    "柊:不明",
    "にこふぁす:不明",
    "こたくん:不明",
    "ぬう:762打鍵",
    "Teto:不明",
    
  ]
};

function fillTable(divId, data) {
  const tbody = document.querySelector(`#${divId} tbody`);
  tbody.innerHTML = "";

  // データを整形＆スコア順にソート
  const players = data
    .map((e) => {
      const [name, scoreRaw] = e.split(":");
      const scoreNum = parseInt(scoreRaw.replace(/\D/g, "")); // 数値部分だけ抜き出し
      return { name, scoreRaw, scoreNum };
    })
    .sort((a, b) => b.scoreNum - a.scoreNum); // 数値が大きいほど上位に

  // 表に追加
  players.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i + 1}位</td><td>${p.name}</td><td>${
      p.scoreRaw
    }</td>`;
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
