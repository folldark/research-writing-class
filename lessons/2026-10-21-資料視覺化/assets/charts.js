// 2026-10-21「資料視覺化」單元的兩組圖表；資料沿用 114-2（505）版投影片。
(() => {
  if (typeof Chart === "undefined") return;

  // [球員, 生涯三分球出手數, 命中率]，資料來源：basketball-reference.com / statmuse.com（截至 2026-04）
  const players = [
    ["Stephen Curry",9441,0.422],["James Harden",8639,0.363],["Damian Lillard",7531,0.371],
    ["Ray Allen",7429,0.400],["LeBron James",7270,0.349],["Reggie Miller",6486,0.395],
    ["Klay Thompson",6478,0.409],["Jamal Crawford",6379,0.348],["Vince Carter",6168,0.371],
    ["Paul George",6127,0.384],["Jason Terry",6010,0.380],["Kyle Lowry",5992,0.367],
    ["Paul Pierce",5816,0.368],["Kyle Korver",5715,0.429],["Jason Kidd",5701,0.349],
    ["Eric Gordon",5602,0.373],["Kevin Durant",5574,0.391],["Kobe Bryant",5546,0.329],
    ["Joe Johnson",5331,0.371],["Buddy Hield",5264,0.395],["Dirk Nowitzki",5210,0.380],
    ["J.R. Smith",5178,0.373],["Tim Hardaway Jr.",5016,0.364],["CJ McCollum",4964,0.396],
    ["Chris Paul",4958,0.370],["Mike Conley",4917,0.389],["Wesley Matthews",4914,0.375],
    ["Carmelo Anthony",4873,0.355],["Kyrie Irving",4763,0.394],["Chauncey Billups",4725,0.387],
    ["Nicolas Batum",4712,0.371],["JJ Redick",4704,0.415],["Kemba Walker",4642,0.360],
    ["Rashard Lewis",4625,0.386],["Trevor Ariza",4579,0.351],["Kevin Love",4542,0.369],
    ["Bradley Beal",4536,0.376],["Russell Westbrook",4409,0.308],["Peja Stojakovic",4392,0.401],
    ["Tim Hardaway",4345,0.355],["Jason Richardson",4344,0.370],["Donovan Mitchell",4327,0.366],
    ["Nick Van Exel",4278,0.357],["D'Angelo Russell",4270,0.363],["Dale Ellis",4266,0.403],
    ["Antoine Walker",4264,0.325],["Jrue Holiday",4213,0.371],["Baron Davis",4159,0.320],
    ["Jordan Clarkson",4153,0.336],["Eddie Jones",4147,0.373],["Lou Williams",4146,0.351],
    ["Kentavious Caldwell-Pope",4126,0.365],["Jayson Tatum",4090,0.368],
    ["Manu Ginobili",4055,0.369],["Patty Mills",4003,0.385]
  ];
  const KOBE = "#552583", KD = "#007ac1";
  const HIGHLIGHTS = {
    "Stephen Curry": "#1d8a3a",
    "Kevin Durant": KD,
    "Kobe Bryant": KOBE,
    "Kyle Korver": "#d97706",
    "Russell Westbrook": "#c0392b"
  };

  const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#1c3046";
  Chart.defaults.font.family = getComputedStyle(document.documentElement).fontFamily;
  Chart.defaults.font.size = Math.round(Math.min(Math.max(window.innerWidth / 90, 12), 20));
  Chart.defaults.color = ink;
  Chart.defaults.maintainAspectRatio = false;

  // 出手數與命中率單位不同，分成兩張小圖，各用自己的軸。
  function pairChart(id, title, values, format, max) {
    new Chart(document.getElementById(id), {
      type: "bar",
      data: { labels: ["Kobe", "KD"], datasets: [{ data: values, backgroundColor: [KOBE, KD] }] },
      options: {
        plugins: {
          legend: { display: false },
          title: { display: true, text: title },
          tooltip: { callbacks: { label: (ctx) => format(ctx.parsed.y) } }
        },
        scales: { y: { beginAtZero: true, max } }
      }
    });
  }
  pairChart("chart-attempts", "生涯三分球出手數", [5546, 5574], (v) => v.toLocaleString());
  pairChart("chart-pct", "生涯三分球命中率（%）", [32.9, 39.1], (v) => `${v}%`, 50);

  const others = [];
  const featured = Object.fromEntries(Object.keys(HIGHLIGHTS).map((name) => [name, []]));
  players.forEach(([name, attempts, pct]) => {
    const point = { x: attempts, y: pct * 100, name };
    (featured[name] || others).push(point);
  });
  new Chart(document.getElementById("chart-scatter"), {
    type: "scatter",
    data: {
      datasets: [
        { label: "其他球員", data: others, backgroundColor: "rgb(120 120 120 / .45)", pointRadius: 5, pointHoverRadius: 7 },
        ...Object.entries(featured).map(([name, data]) => ({
          label: name, data, backgroundColor: HIGHLIGHTS[name],
          pointRadius: 9, pointHoverRadius: 12, borderColor: "#fff", borderWidth: 2
        }))
      ]
    },
    options: {
      plugins: {
        legend: { position: "bottom" },
        tooltip: { callbacks: { label: (ctx) => `${ctx.raw.name}: ${ctx.raw.x.toLocaleString()} 出手 / ${ctx.raw.y.toFixed(1)}%` } }
      },
      scales: {
        x: { min: 3800, title: { display: true, text: "生涯三分球出手數" } },
        y: { min: 28, max: 44, title: { display: true, text: "生涯三分球命中率（%）" } }
      }
    }
  });
})();
