const rawData = {
  ranking: [
    "Jaku:576pt",
    "HFKRU:544pt",
    "スピードアキュレイト:620pt",
    "ぬう:622pt",
    "円周率:622pt",
    "しらす:626pt",
    "こたくん:630pt",
    "まめえだ:634pt",
    "Jujun10:640pt",
    "MHJ:643pt",
    "unused_HAL:655pt",
    "ねぎろと:660pt",
    "きる:664pt",
    "だだだ:685pt",
    "まっつん:708pt",
    "狂:720pt",
    "owata:743pt",
    "れんこん:744pt",
    "かぼちゃ:783pt",
    "無名:787pt",
    "とある:795pt",
    "えいと:824pt",
    "ガブガブ:880pt"
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
const imagebutton = document.querySelector(".Stamp");
imagebutton.addEventListener("click", () => {
  window.location.href = "https://store.line.me/stickershop/product/32024119/ja";
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
