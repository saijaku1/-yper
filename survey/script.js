const btn = document.getElementById('send');
const result = document.getElementById('result');
const rankText = document.getElementById('rankText');

btn.addEventListener('click', () => {
  result.classList.remove('animate');
  rankText.classList.remove('animate');
  void result.offsetWidth;
  result.classList.add('animate');
});

result.addEventListener('animationend', () => {
  rankText.classList.remove('animate');
  void rankText.offsetWidth;
  rankText.classList.add('animate');
});

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

const $ = document.getElementById.bind(document);
const form = $("scoreForm");
const inputs = ["ety", "dtr", "tyz", "tys", "zet", "zew"];
const ranks =['α','β','γ','δ','ε','η','θ','ι','κ','λ','μ','ν','ξ','ο','π','ρ','σ','τ','υ','φ','χ','ψ','ω','ζ'];
const colors=["#111111","#330033","#660000","#333366","#666666","#336633","#999966","#996633","#33CC66","#FF6666","#CC99FF","#33FFFF","#66CCFF","#3366FF","#33CCFF","#99FF33","#FFFF66","#FFD700","#FF9933","#FF3333","#FF33CC","#D966FF","#C47FFF","#FF6EC7"];



inputs.forEach(id => {
  const saved = localStorage.getItem(id);
  if (saved !== null) {
    $(id).value = saved;
  };

  $(id).addEventListener("input", (e) => {
    localStorage.setItem(id, e.target.value);
  });
});

form.addEventListener("submit", function(event) {
  event.preventDefault(); 
  let rec = inputs.map(id => Number($(id).value));
  const score = Math.floor(1000*((rec[0]/850)**1.5)+
                           1000*((rec[1]/1000)**1.5)+
                           1000*((rec[2]/1100)**1.5)+
                           1000*((rec[3]*2/1000)**1.5)+
                           1000*((rec[4]/4200)**1.5)+
                           1000*((rec[0]/2800)**1.5)
                          );
  $("result").textContent = "合計で" + score + "pt"; 
  rank=math.floor(score/150);
  if(rank>ranks.length-1)){
    rank=ranks.length-1
  };
  $("rank").textContent=ranks[rank];
  if (rank!==ranks.length-1){
    $("tonext").textContent = (rank+1)*150-score;
  };
  $("rank").style.color = colors[rank];
});
$("reset").addEventListener("click", () => {
  inputs.forEach(id => {
    $(id).value = "";              
    localStorage.removeItem(id);
  });
  $("result").textContent = "計算結果がここに出ます・・・"; 
  $("rank").textContent = "?";
});
