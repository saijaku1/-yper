const speedInput = document.getElementById("speed");
const perMinuteInput = document.getElementById("perMinute");
const missInput = document.getElementById("miss");
const customTimesInput = document.getElementById("customTimes");
const tbody = document.querySelector("#resultTable tbody");

function calculate() {
  let speed = parseFloat(speedInput.value);
  let perMinute = parseFloat(perMinuteInput.value);

  // 双方向計算
  if (
    !isNaN(speed) &&
    (isNaN(perMinute) || document.activeElement === speedInput)
  ) {
    perMinute = speed * 60;
    perMinuteInput.value = perMinute.toFixed(2);
  } else if (
    !isNaN(perMinute) &&
    (isNaN(speed) || document.activeElement === perMinuteInput)
  ) {
    speed = perMinute / 60;
    speedInput.value = speed.toFixed(2);
  }

  const miss = parseInt(missInput.value) || 0;
  const times = customTimesInput.value
    .split(",")
    .map((t) => parseFloat(t.trim()))
    .filter((t) => !isNaN(t));

  tbody.innerHTML = "";

  times.forEach((sec) => {
    const total = speed * sec;
    const correct = total - miss;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;

    // 色分け
    let accClass = "";
    if (accuracy >= 90) accClass = "green";
    else if (accuracy >= 80) accClass = "yellow";
    else accClass = "red";

    const row = `
                    <tr>
                        <td>${sec} 秒</td>
                        <td>${total.toFixed(2)}</td>
                        <td>${correct.toFixed(2)}</td>
                        <td class="${accClass}">${accuracy.toFixed(2)}%</td>
                    </tr>
                `;
    tbody.innerHTML += row;
  });
}

// 入力イベント
[speedInput, perMinuteInput, missInput, customTimesInput].forEach((el) => {
  el.addEventListener("input", calculate);
});
