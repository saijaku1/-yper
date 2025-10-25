
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
        "unused_HAL:651pt",
        "だだだ:645pt",
        "Eito:627pt",
        "きる:596pt",
        "スピードアキュレイト:581pt",
        "owata☆♪:573pt",
        "まめえだ:554pt",
        "HFKRU:483pt"
        
  ],
  div4:[
  ]
};

function fillTable(divId, data) {
  const tbody = document.querySelector(`#${divId} tbody`);
  tbody.innerHTML = "";
  const players = data
    .map((e) => {
      const [name, scoreRaw] = e.split(":");
      return { name, score: parseInt(scoreRaw.replace(/\D/g, "")) };
    })
    .sort((a, b) => b.score - a.score);
  players.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i + 1}位</td><td>${p.name}</td><td>${
      p.score
    }pt</td>`;
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
