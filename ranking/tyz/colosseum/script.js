const rawData = {
  ranking: [
    "だだだ:Z10",
    "あたりまえ体操:Z9",
    "Eito:Z13",
    "MHJ:Z6",
    "スピード1アキュレイト:Z9",
    "Jaku:Z6",
    "まめえだ:Z7",
    "かぼちゃ:Z11",
    "HFKRU:Z6",
    "ねぎろと:Z9",
    "ガブガブ:Z11",
    "unused_HAL:Z7",
    "きる:Z9",
    "れんこん:Z9",
    "しらす:Z8",
    "Jujun10:Z11",
    "にこふぁす:Z5",
    "無名:Z11",
    "野島:Z7",
    "とある:Z10",
    "タイピングが好きな人:Z5",
    "N.S.21:Z11",
    "だらる:不明",
    "はっちゃん:不明"
    "円周率:不明",
    "狂:不明",
  　"柊:不明",
    "こたくん:不明",
    "ぬう:不明",
    "Teto:不明",
    "owata:不明",
  ],
};

function fillTable(divId, data) {
  const tbody = document.querySelector(`#${divId} tbody`);
  tbody.innerHTML = "";

  // データを整形＆スコア順にソート
  const players = data
    .map((e) => {
      const [name, scoreRaw] = e.split(":");
      const scoreNum = parseInt(scoreRaw.replace(/\D/g, "")); 
      return { name, scoreRaw, scoreNum };
    })
    .sort((a, b) => b.scoreNum - a.scoreNum); 

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
