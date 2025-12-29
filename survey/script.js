const btn = document.getElementById('send');
const result = document.getElementById("result");
const rankText = document.getElementById("rankText");
const nextRank = document.getElementById("nextRank");

btn.addEventListener("click", () => {
  [result, rankText, nextRank].forEach((el) => {
    el.classList.remove("animate");
    void el.offsetWidth; 
  });

  result.classList.add("animate");
});

result.addEventListener("animationend", (e) => {
  if (e.target !== result) return;
  rankText.classList.add("animate");
});

rankText.addEventListener("animationend", (e) => {
  if (e.target !== rankText) return;
  nextRank.classList.add("animate");
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

const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  const isOpen = sidebar.style.width === "250px";
  sidebar.style.width = isOpen ? "0" : "250px";
  sidebar.style.zIndex = isOpen ? "0" : "1000";
  sidebar.style.display = "block";
  hamburger.classList.toggle("active");
});

const $ = document.getElementById.bind(document);
const form = $("scoreForm");
const inputs = ["ety", "dtr", "tyz", "tys", "zet", "zew"];
const ranks =['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','Z','α','β','γ','δ','ε','η','θ','ι','κ','λ','μ','ν','ξ','ο','π','ρ','σ','τ','υ','φ','χ','ψ','ω','ζ'];
const scores=[1300,1350,1400,1450,1500,1550,1600,1650,1700,1750,1800,1850,1900,1950,2000,2050,2100,2150,2200,2250,2300,2350,2400,2450,2500,2550,2600,2650,2700,2750,2800,2850,2900,2950,3000,3050,3100,3150,3200,3250,3300,3350,3400,3450,3500,3550,3600,3650,3700,3750,3800];
const colors=["#FF3B3B", "#FF5722", "#FF9800","#FFC107", "#FFEB3B","#2ECC71", "#8BC34A", "#A5FFCE","#2196F3", "#64B5F6", "#90CAF9","#9C27B0", "#AB47BC", "#CE93D8","#607D8B", "#78909C", "#B0BEC5","#FF2400", "#FF5F00", "#FFE100","#A4FF3F", "#39FF69", "#3FFFD7","#3FE9FF", "#367BFF", "#E5E4E2","#FF4FCF", "#FF3F6A", "#FF7E2E", "#F9FF3A","#A4FF3F", "#39FF69", "#3FFFD7", "#3FE9FF","#367BFF", "#3156FF", "#B347FF", "#FF2EF0","#FF5EB0", "#FFC93F", "#9C2EFF", "#B681FF","#5CFFC8", "#8CFFF4", "#52A7FF", "#C1FF3F","#3FFFD4", "#FF67F7", "#A63FFF", "#D7FF3F"];


inputs.forEach(id => {
  const saved = localStorage.getItem(id);
  if (saved !== null) {
    $(id).value = saved;
  }

  $(id).addEventListener("input", (e) => {
    localStorage.setItem(id, e.target.value);
  });
});

form.addEventListener("submit", function(event) {
  event.preventDefault(); 
  let rec = inputs.map(id => Number($(id).value));
  const score = Math.floor(rec[0] + (rec[1] + rec[2] + rec[3] * 2) / 5 * 4 + (rec[4] + rec[5]) / 10);
  $("result").textContent = "合計で" + score + "pt";
  if (score<2600){
    $("judge").innerHTML = "参加推奨レベルまで:" + (2600 - score) + "pt"+"<br>参加申請は<a href='https://docs.google.com/forms/d/1ifzD14vdlZccl-CXgxi1WWKQg55kwzcxKANf4G5nXQ0' target='_blank'>こちら</a>から";
    $("judge").style.color = "red";
  }
  else{
    $("judge").innerHTML = "参加推奨レベル +"+(score-2600)+"pt <br>参加は<a href='https://docs.google.com/forms/d/1ifzD14vdlZccl-CXgxi1WWKQg55kwzcxKANf4G5nXQ0' target='_blank'>こちら</a>から";
    $("judge").style.color = "rgb(0, 208, 255)";
  }
  rank=0;

  for(let i=0;i<scores.length-1;i++){
    if(scores[i+1]<score){
      rank++;
    };
  };
  $("rank").textContent=ranks[rank];
  if (rank!==ranks.length-1){
    $("tonext").textContent = scores[rank+1]-score;
  };
  $("rank").style.color = colors[rank];
});
$("reset").addEventListener("click", () => {
  inputs.forEach(id => {
    $(id).value = "";              
    localStorage.removeItem(id);
  });
  $("result").textContent = "計算結果がここに出ます"; 
  $("rank").textContent = "?";
  $("judge").textContent = "判定結果がここに出ます";
  $("judge").style.color = "white";
  $("tonext").textContent = "NaN";});
