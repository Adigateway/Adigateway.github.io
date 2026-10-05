/* =========================================================
   Aditya Srivatsa: portfolio scripts
   ========================================================= */

// Paste the deployed Stock Alpha URL here once it's live, e.g. "https://stock-alpha.example.com"
const STOCK_ALPHA_URL = "";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/* ---------------- Language (EN / DE) ----------------
   English is written in the HTML. German comes from js/i18n-de.js, a dictionary keyed by the English text.
   The choice is stored in localStorage, so switching once applies to every page. ?lang=de|en also works. */
const LANG = (() => {
  let l = null;
  try { l = new URLSearchParams(location.search).get("lang"); if (l) localStorage.setItem("lang", l); else l = localStorage.getItem("lang"); } catch (e) {}
  return l === "de" ? "de" : "en";
})();
const DE = window.I18N_DE || {};
const t = (str) => (LANG === "de" && DE[str]) || str;
const LOCALE = LANG === "de" ? "de-DE" : "en-US";

/* ---------------- Nav, footer, reveal ---------------- */
(function chrome() {
  const links = $("#navLinks");
  $("#menuBtn")?.addEventListener("click", () => links.classList.toggle("open"));
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  const rev = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); rev.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => rev.observe(el));
})();

/* ---------------- Photo slots: show a placeholder until the file exists ---------------- */
$$(".photo-slot img").forEach((img) => {
  const slot = img.closest(".photo-slot");
  const markEmpty = () => slot.classList.add("empty");
  img.addEventListener("error", markEmpty);
  img.addEventListener("load", () => slot.classList.remove("empty"));
  if (img.complete && img.naturalWidth === 0) markEmpty();
});

/* ---------------- Stock Alpha live link ---------------- */
(function stockLink() {
  const a = $("#stockLiveLink"); if (!a) return;
  if (STOCK_ALPHA_URL) { a.href = STOCK_ALPHA_URL; return; }
  a.lastChild.textContent = " " + t("Live website (link coming soon)");
  a.setAttribute("aria-disabled", "true");
  a.style.opacity = ".6";
  a.addEventListener("click", (e) => e.preventDefault());
})();

/* ---------------- Skills ---------------- */
(function skills() {
  const box = $("#skillGroups"); if (!box) return;
  // Every logo is a single-colour Simple Icons glyph, tinted by CSS (hover turns it to the accent).
  const S = (n) => ({ mask: `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${n}.svg` });
  const L = (code) => ({ code });
  const I = (body) => ({ svg: `<svg viewBox="0 0 24 24" fill="none" stroke="#d4d4d4" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${body}</svg>` });

  const icon = {
    timeseries: I('<path d="M3 3v18h18"/><path d="M6 15l4-5 3 3 5-7"/>'),
    genai: I('<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>'),
    vader: I('<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>'),
    xgb: I('<path d="M12 3v4M12 7l-5 5M12 7l5 5M7 12l-3 4M7 12l3 4M17 12l-3 4M17 12l3 4"/><circle cx="12" cy="3" r="1.5"/>'),
    shap: I('<path d="M4 6h10M4 12h6M4 18h13"/><path d="M14 4l3 2-3 2M10 10l3 2-3 2M17 16l3 2-3 2"/>'),
    deepsort: I('<rect x="3" y="5" width="7" height="10" rx="1"/><rect x="14" y="9" width="7" height="10" rx="1"/><path d="M10 10h4"/>'),
    can: I('<path d="M2 8h20M2 16h20"/><path d="M6 8v8M12 8v8M18 8v8"/>'),
    agile: I('<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>'),
    people: I('<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 11a3 3 0 1 0 0-6M21 20c0-2.6-1.7-4.9-4-5.7"/>'),
    workflow: I('<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/>'),
    stats: I('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  };

  const groups = [
    { title: "Programming & Tooling", items: [
      ["Python", S("python")], ["C++", S("cplusplus")], ["C", S("c")], ["Java", S("openjdk")],
      ["Shell Scripting", S("gnubash")], ["SQL / PostgreSQL", S("postgresql")], ["MATLAB", S("mathworks")],
      ["ROS2", S("ros")], ["Git", S("git")], ["GitHub", S("github")], ["JavaScript", S("javascript")], ["HTML5", S("html5")],
    ]},
    { title: "Machine Learning & Computer Vision", items: [
      ["PyTorch", S("pytorch")], ["scikit-learn", S("scikitlearn")], ["YOLOv8 (Ultralytics)", S("ultralytics")],
      ["OpenCV", S("opencv")], ["XGBoost / Gradient Boosting", icon.xgb], ["SHAP · Explainable AI", icon.shap],
      ["Time Series Analysis", icon.timeseries], ["GenAI", icon.genai], ["NLTK VADER · NLP", icon.vader],
      ["DeepSORT Tracking", icon.deepsort], ["Statistics", icon.stats],
    ]},
    { title: "Data & Analytical Tools", items: [
      ["Power BI", S("powerbi")], ["Pandas", S("pandas")], ["NumPy", S("numpy")],
      ["Excel (Pivot, VLOOKUP)", S("microsoftexcel")], ["MATLAB / Simulink", S("mathworks")], ["Jupyter", S("jupyter")],
    ]},
    { title: "Hardware & Deployment", items: [
      ["Arduino", S("arduino")], ["CAN Bus Analysis", icon.can], ["Linux", S("linux")], ["Flask", S("flask")], ["Nginx", S("nginx")],
    ]},
    { title: "Business & Communication", items: [
      ["MS Office", S("microsoftoffice")], ["Agile Project Planning", icon.agile],
      ["Stakeholder Communication", icon.people], ["Workflow Software", icon.workflow],
    ]},
    { title: "Languages", items: [
      ["English", L("EN"), "IELTS 7.5"], ["German", L("DE"), "B1"], ["Telugu", L("TE"), "Native"],
      ["Hindi", L("HI"), "Fluent"], ["Spanish", L("ES"), "A1"],
    ]},
  ];

  const logoHTML = (ic, name) => {
    if (ic.mask) return `<span class="mask" style="--src:url('${ic.mask}')" role="img" aria-label="${name} logo"></span>`;
    if (ic.code) return `<span class="code">${ic.code}</span>`;
    return ic.svg;
  };

  box.innerHTML = groups.map((g) => `
    <div class="skill-group">
      <h3>${g.title} <span class="count">${String(g.items.length).padStart(2, "0")}</span></h3>
      <div class="skills">
        ${g.items.map(([name, ic, lvl]) => `
          <div class="skill"><span class="logo">${logoHTML(ic, name)}</span>
            <span class="name">${name}${lvl ? `<span class="lvl">${lvl}</span>` : ""}</span></div>`).join("")}
      </div>
    </div>`).join("");
})();

/* ---------------- Helpers ---------------- */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gauss(rand) {
  let u = 0, v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function whenVisible(el, onChange) {
  new IntersectionObserver((es) => es.forEach((e) => onChange(e.isIntersecting))).observe(el);
}

/* =========================================================
   01 · Multi-camera tracking simulation
   ========================================================= */
(function multiCam() {
  const cv = $("#mctCanvas"); if (!cv) return;
  const ctx = cv.getContext("2d");
  const W = cv.width, H = cv.height;
  const room = { x: 40, y: 40, w: W - 80, h: H - 80 };
  const rand = mulberry32(7);
  const camColors = ["#9a9a9a", "#7a7a7a", "#bdbdbd", "#5f5f5f"];
  const idColors = ["#c9b28e"];

  // Cameras mounted in the four corners, looking into the room
  const cams = [
    { x: room.x, y: room.y, dir: Math.atan2(1, 1.6) },
    { x: room.x + room.w, y: room.y, dir: Math.atan2(1, -1.6) },
    { x: room.x + room.w, y: room.y + room.h, dir: Math.atan2(-1, -1.6) },
    { x: room.x, y: room.y + room.h, dir: Math.atan2(-1, 1.6) },
  ].map((c, i) => ({ ...c, fov: 1.25, range: 620, bias: [Math.max(-1.2, Math.min(1.2, gauss(rand))), Math.max(-1.2, Math.min(1.2, gauss(rand)))], color: camColors[i] }));

  // Shelving that blocks nothing but gives the room some context
  const shelves = [
    { x: 250, y: 130, w: 150, h: 34 }, { x: 520, y: 230, w: 170, h: 34 },
  ];

  const people = Array.from({ length: 4 }, () => spawnPerson());
  function spawnPerson() {
    const p = { x: room.x + 60 + rand() * (room.w - 120), y: room.y + 50 + rand() * (room.h - 100) };
    newGoal(p); return p;
  }
  function newGoal(p) {
    p.gx = room.x + 40 + rand() * (room.w - 80);
    p.gy = room.y + 30 + rand() * (room.h - 60);
    p.speed = 0.7 + rand() * 0.9;
  }

  const noiseIn = $("#mctNoise"), epsIn = $("#mctEps"), rawIn = $("#mctRaw"), trailIn = $("#mctTrail");
  const sync = () => {
    $("#mctNoiseOut").textContent = noiseIn.value + " px";
    $("#mctEpsOut").textContent = epsIn.value + " px";
  };
  [noiseIn, epsIn].forEach((el) => el.addEventListener("input", sync)); sync();

  // DBSCAN with min_samples = 1 is simply connected components of the eps-graph
  function dbscan(points, eps) {
    const labels = new Array(points.length).fill(-1); let c = 0;
    for (let i = 0; i < points.length; i++) {
      if (labels[i] !== -1) continue;
      labels[i] = c; const stack = [i];
      while (stack.length) {
        const k = stack.pop();
        for (let j = 0; j < points.length; j++) {
          if (labels[j] !== -1) continue;
          if (Math.hypot(points[k].x - points[j].x, points[k].y - points[j].y) <= eps) { labels[j] = c; stack.push(j); }
        }
      }
      c++;
    }
    const clusters = Array.from({ length: c }, () => ({ x: 0, y: 0, n: 0 }));
    points.forEach((p, i) => { const k = clusters[labels[i]]; k.x += p.x; k.y += p.y; k.n++; });
    return clusters.map((k) => ({ x: k.x / k.n, y: k.y / k.n, n: k.n }));
  }

  // Tracker: match by distance, EMA smoothing, lost-frame lifecycle (as in custom_tracker.py)
  let tracks = [], nextId = 1;
  function updateTracks(dets) {
    const pairs = [];
    tracks.forEach((t, ti) => dets.forEach((d, di) => pairs.push([Math.hypot(t.x - d.x, t.y - d.y), ti, di])));
    pairs.sort((a, b) => a[0] - b[0]);
    const usedT = new Set(), usedD = new Set();
    for (const [dist, ti, di] of pairs) {
      if (dist > 45 || usedT.has(ti) || usedD.has(di)) continue;
      usedT.add(ti); usedD.add(di);
      const t = tracks[ti], d = dets[di], a = 0.35;
      t.x = a * d.x + (1 - a) * t.x; t.y = a * d.y + (1 - a) * t.y;
      t.lost = 0; t.hits++;
      if (t.id === null && t.hits >= 6) t.id = nextId++; // IDs only for confirmed tracks
      t.trail.push([t.x, t.y]); if (t.trail.length > 90) t.trail.shift();
    }
    tracks.forEach((t, ti) => { if (!usedT.has(ti)) t.lost++; });
    tracks = tracks.filter((t) => t.lost < 15 && !(t.lost > 1 && t.hits < 6));
    dets.forEach((d, di) => { if (!usedD.has(di)) tracks.push({ id: null, x: d.x, y: d.y, lost: 0, hits: 1, trail: [[d.x, d.y]] }); });
  }

  function step() {
    people.forEach((p) => {
      const dx = p.gx - p.x, dy = p.gy - p.y, d = Math.hypot(dx, dy);
      if (d < 4) newGoal(p); else { p.x += (dx / d) * p.speed; p.y += (dy / d) * p.speed; }
    });
    const noise = +noiseIn.value;
    const raw = [];
    cams.forEach((c, ci) => people.forEach((p) => {
      const ang = Math.atan2(p.y - c.y, p.x - c.x);
      let da = Math.abs(ang - c.dir); if (da > Math.PI) da = 2 * Math.PI - da;
      if (da > c.fov / 2 || Math.hypot(p.x - c.x, p.y - c.y) > c.range) return;
      if (rand() < 0.06) return; // missed detection
      raw.push({ x: p.x + c.bias[0] * noise * 0.5 + gauss(rand) * noise * 0.35,
                 y: p.y + c.bias[1] * noise * 0.5 + gauss(rand) * noise * 0.35, cam: ci });
    }));
    const merged = dbscan(raw, +epsIn.value);
    updateTracks(merged);
    return raw;
  }

  function draw(raw) {
    const text = css("--text"), line = css("--line"), sub = css("--text-3"), surf = css("--surface-2");
    ctx.clearRect(0, 0, W, H);
    // room + grid
    ctx.strokeStyle = line; ctx.lineWidth = 1;
    for (let x = room.x; x <= room.x + room.w; x += 40) { ctx.beginPath(); ctx.moveTo(x, room.y); ctx.lineTo(x, room.y + room.h); ctx.globalAlpha = 0.35; ctx.stroke(); }
    for (let y = room.y; y <= room.y + room.h; y += 40) { ctx.beginPath(); ctx.moveTo(room.x, y); ctx.lineTo(room.x + room.w, y); ctx.stroke(); }
    ctx.globalAlpha = 1; ctx.lineWidth = 1; ctx.strokeRect(room.x, room.y, room.w, room.h);
    ctx.fillStyle = surf; shelves.forEach((s) => { ctx.fillRect(s.x, s.y, s.w, s.h); ctx.strokeRect(s.x, s.y, s.w, s.h); });
    ctx.fillStyle = sub; ctx.font = "300 11px 'DM Mono', monospace";
    ctx.fillText(t("shelf"), shelves[0].x + 8, shelves[0].y + 21); ctx.fillText(t("shelf"), shelves[1].x + 8, shelves[1].y + 21);

    // cameras + FOV wedges
    cams.forEach((c, i) => {
      ctx.fillStyle = "#ffffff"; ctx.globalAlpha = 0.025;
      ctx.beginPath(); ctx.moveTo(c.x, c.y); ctx.arc(c.x, c.y, c.range, c.dir - c.fov / 2, c.dir + c.fov / 2); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 1; ctx.fillStyle = c.color; ctx.beginPath(); ctx.arc(c.x, c.y, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = css("--text-2"); ctx.font = "300 11px 'DM Mono', monospace";
      const lx = c.x + (c.x < W / 2 ? 14 : -52), ly = c.y + (c.y < H / 2 ? -14 : 24);
      ctx.fillText(t("CAM") + " " + (i + 1), lx, ly);
    });

    // trajectories
    const visible = (t) => t.id !== null && t.lost < 3;
    if (trailIn.checked) tracks.forEach((t) => {
      if (!visible(t) || t.trail.length < 2) return;
      ctx.strokeStyle = "#8a8a8a"; ctx.globalAlpha = 0.5; ctx.lineWidth = 1;
      ctx.beginPath(); t.trail.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke();
    });
    ctx.globalAlpha = 1;

    // raw detections
    if (rawIn.checked) raw.forEach((r) => {
      ctx.fillStyle = cams[r.cam].color; ctx.beginPath(); ctx.arc(r.x, r.y, 2.4, 0, Math.PI * 2); ctx.fill();
    });

    // tracked people
    tracks.forEach((tk) => {
      if (!visible(tk)) return;
      const col = idColors[tk.id % idColors.length];
      ctx.fillStyle = col; ctx.globalAlpha = 0.9;
      ctx.beginPath(); ctx.arc(tk.x, tk.y, 8, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1; ctx.strokeStyle = css("--bg"); ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = text; ctx.font = "300 12px 'DM Sans', sans-serif";
      ctx.fillText(t("Person") + " " + tk.id, tk.x + 14, tk.y - 10);
    });

    const shown = tracks.filter(visible).length;
    ctx.fillStyle = sub; ctx.font = "300 11px 'DM Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${t("raw detections")}: ${raw.length}   ${t("tracked people")}: ${shown}   ${t("actual people")}: ${people.length}`, W / 2, 24);
    ctx.textAlign = "left";
  }

  let running = false, raf = 0;
  const loop = () => { draw(step()); if (running) raf = requestAnimationFrame(loop); };
  whenVisible(cv, (vis) => { running = vis; if (vis) { cancelAnimationFrame(raf); loop(); } });
})();

/* =========================================================
   02 · PATH collision-warning calculator
   ========================================================= */
(function pathCalc() {
  const cv = $("#pathCanvas"); if (!cv) return;
  const ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
  const dIn = $("#dIn"), vIn = $("#vIn"), aIn = $("#aIn"), tIn = $("#tIn");
  const R_MIN = 2, V_L = 0;

  function car(x, y, color, flip) {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.roundRect(x, y, 56, 24, 6); ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,.35)";
    ctx.fillRect(flip ? x + 8 : x + 30, y + 4, 16, 16);
    ctx.fillStyle = "#111";
    [[x + 10, y + 26], [x + 44, y + 26]].forEach(([cx, cy]) => { ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill(); });
  }

  function update() {
    const d = +dIn.value, v = +vIn.value, a = +aIn.value, tau = +tIn.value;
    const R = 0.5 * ((v * v) / a - (V_L * V_L) / a) + v * tau + R_MIN;
    const ratio = d / R;
    let level = "green", label = "SAFE";
    if (d < R) {
      if (ratio < 0.7 && v >= 0.3) { level = "red"; label = "HIGH RISK"; }
      else if (ratio < 0.85 && v >= 0.2) { level = "yellow"; label = "MODERATE"; }
      else label = "LOW RISK";
    }
    if (v < 0.05) { level = "green"; label = "STATIONARY"; }

    $("#dOut").textContent = d.toFixed(1) + " m";
    $("#vOut").textContent = v.toFixed(1) + " m/s";
    $("#aOut").textContent = a.toFixed(1) + " m/s²";
    $("#tOut").textContent = tau.toFixed(1) + " s";
    ["R", "Y", "G"].forEach((k) => $("#lamp" + k).classList.remove("on"));
    $("#lamp" + { red: "R", yellow: "Y", green: "G" }[level]).classList.add("on");
    const pill = $("#pathStatus"); pill.className = "status-pill " + level; pill.textContent = t(label);
    $("#pathReadout").innerHTML =
      `R<sub>warning</sub> = <b>${R.toFixed(2)} m</b><br>` +
      `d / R = <b>${ratio.toFixed(2)}</b><br>` +
      `${t("braking term")} = ${(0.5 * v * v / a).toFixed(2)} m · ${t("reaction term")} = ${(v * tau).toFixed(2)} m`;

    // Drawing
    const maxM = Math.max(42, R * 1.15, d + 6);
    const x0 = 30, sc = (W - x0 - 70) / maxM;
    const roadY = 70, roadH = 90;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = css("--surface-2"); ctx.fillRect(0, roadY, W, roadH);
    ctx.strokeStyle = css("--text-3"); ctx.setLineDash([14, 12]); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, roadY + roadH / 2); ctx.lineTo(W, roadY + roadH / 2); ctx.stroke(); ctx.setLineDash([]);

    const front = x0 + 56;
    const zoneCol = { red: "201,138,138", yellow: "205,183,121", green: "143,184,155" }[level];
    const g = ctx.createLinearGradient(front, 0, front + R * sc, 0);
    g.addColorStop(0, `rgba(${zoneCol},.40)`); g.addColorStop(1, `rgba(${zoneCol},.06)`);
    ctx.fillStyle = g; ctx.fillRect(front, roadY + 8, R * sc, roadH / 2 - 12);
    ctx.strokeStyle = `rgb(${zoneCol})`; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(front + R * sc, roadY + 2); ctx.lineTo(front + R * sc, roadY + roadH / 2); ctx.stroke();

    car(x0, roadY + 14, "#bdbdbd", false);
    car(front + d * sc, roadY + 14, "#6a6a6a", true);

    ctx.font = "300 11px 'DM Mono', monospace"; ctx.fillStyle = css("--text-2");
    ctx.fillText(t("you"), x0 + 16, roadY - 8);
    ctx.fillText(t("lead car"), front + d * sc + 4, roadY - 8);
    ctx.fillStyle = `rgb(${zoneCol})`;
    ctx.fillText(`R = ${R.toFixed(1)} m`, Math.min(front + R * sc + 6, W - 80), roadY + roadH / 2 + 14);

    // distance ruler
    const ry = roadY + roadH + 22;
    ctx.strokeStyle = css("--text-3"); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(front, ry); ctx.lineTo(front + d * sc, ry); ctx.stroke();
    [front, front + d * sc].forEach((x) => { ctx.beginPath(); ctx.moveTo(x, ry - 5); ctx.lineTo(x, ry + 5); ctx.stroke(); });
    ctx.fillStyle = css("--text"); ctx.fillText(`d = ${d.toFixed(1)} m`, front + (d * sc) / 2 - 30, ry - 8);
  }
  [dIn, vIn, aIn, tIn].forEach((el) => el.addEventListener("input", update));
  update();
})();

/* =========================================================
   03 · Image-processing lab (pure JS on real pixels)
   ========================================================= */
(function cvLab() {
  const cv = $("#cvCanvas"); if (!cv || !window.CV_IMAGES) return;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  const hist = $("#cvHist"), hctx = hist.getContext("2d");
  const param = $("#cvParam"), paramOut = $("#cvParamOut"), paramName = $("#cvParamName"), paramWrap = $("#cvParamWrap");
  let src = null, imgKey = "cosmea", op = "orig";

  const OPS = {
    orig:    { note: "The raw RGB image. MATLAB stores it as an H×W×3 matrix (<code>image_fundamentals.m</code>)." },
    gray:    { note: "Luminance Y = 0.299R + 0.587G + 0.114B, one channel per pixel instead of three. Every other operation here starts from this." },
    gamma:   { p: ["Gamma γ", 5, 300, 50, (v) => (v / 100).toFixed(2)], note: "Power-law transform I' = I<sup>γ</sup>. γ &lt; 1 brightens shadows (try the dark flowerpots), γ &gt; 1 darkens. From <code>image_enhancements.m</code>." },
    stretch: { p: ["Clip %", 0, 10, 1, (v) => v + " %"], note: "Contrast stretching. Take the chosen low/high percentiles and map them linearly to 0 and 255." },
    histeq:  { note: "Histogram equalisation. Map each intensity through the cumulative histogram so the output histogram is roughly flat. Watch the histogram below." },
    blur:    { p: ["Passes", 1, 8, 2, (v) => v + "×"], note: "The separable binomial low-pass <code>[1 4 6 4 1]/16</code> from the door-gap detector, applied along rows and then columns." },
    sobel:   { p: ["Gain", 1, 12, 4, (v) => v + "×"], note: "Gradient magnitude using the optimised Sobel kernel <code>[-3 0 3; -10 0 10; -3 0 3]/32</code> from <code>door_gap_detection.m</code>. On the door image the gap edges light up." },
    thresh:  { p: ["Threshold", 0, 255, 110, (v) => v], note: "Binary segmentation. Pixels brighter than T become 1 (white), everything else 0." },
    invert:  { note: "Image inversion, I' = 255 − I, from the intensity-transform experiments." },
  };

  function load(key) {
    const im = new Image();
    im.onload = () => {
      cv.width = im.width; cv.height = im.height;
      ctx.drawImage(im, 0, 0);
      src = ctx.getImageData(0, 0, im.width, im.height);
      render();
    };
    im.src = window.CV_IMAGES[key];
  }

  const toGray = (d) => {
    const g = new Float32Array(d.length / 4);
    for (let i = 0, j = 0; i < d.length; i += 4, j++) g[j] = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    return g;
  };
  function binomial(g, w, h) {
    const k = [1, 4, 6, 4, 1].map((v) => v / 16), t = new Float32Array(g.length), o = new Float32Array(g.length);
    const cl = (v, m) => (v < 0 ? 0 : v > m ? m : v);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let s = 0; for (let i = -2; i <= 2; i++) s += k[i + 2] * g[y * w + cl(x + i, w - 1)]; t[y * w + x] = s;
    }
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let s = 0; for (let i = -2; i <= 2; i++) s += k[i + 2] * t[cl(y + i, h - 1) * w + x]; o[y * w + x] = s;
    }
    return o;
  }

  function render() {
    if (!src) return;
    const cfg = OPS[op];
    if (cfg.p) {
      const [name, min, max, def, fmt] = cfg.p;
      if (paramWrap.dataset.op !== op) { param.min = min; param.max = max; param.value = def; paramWrap.dataset.op = op; }
      paramName.textContent = t(name); paramOut.textContent = fmt(+param.value); paramWrap.style.visibility = "visible";
    } else paramWrap.style.visibility = "hidden";
    $("#cvNote").innerHTML = t(cfg.note);

    const w = src.width, h = src.height, d = src.data;
    const out = ctx.createImageData(w, h), o = out.data;
    const p = +param.value;
    let g = op === "orig" ? null : toGray(d);

    if (op === "orig") o.set(d);
    else {
      let res = g;
      if (op === "gamma") { const gm = p / 100; res = g.map((v) => 255 * Math.pow(v / 255, gm)); }
      else if (op === "stretch") {
        const s = Array.from(g).sort((a, b) => a - b);
        const lo = s[Math.floor((s.length - 1) * p / 100)], hi = s[Math.floor((s.length - 1) * (1 - p / 100))];
        res = g.map((v) => Math.max(0, Math.min(255, ((v - lo) / Math.max(1, hi - lo)) * 255)));
      } else if (op === "histeq") {
        const hc = new Array(256).fill(0); g.forEach((v) => hc[v | 0]++);
        const cdf = []; hc.reduce((a, c, i) => (cdf[i] = a + c), 0);
        const cmin = cdf.find((c) => c > 0), n = g.length;
        res = g.map((v) => ((cdf[v | 0] - cmin) / Math.max(1, n - cmin)) * 255);
      } else if (op === "blur") { for (let i = 0; i < p; i++) res = binomial(res, w, h); }
      else if (op === "sobel") {
        const b = binomial(g, w, h); res = new Float32Array(g.length);
        const at = (x, y) => b[Math.min(h - 1, Math.max(0, y)) * w + Math.min(w - 1, Math.max(0, x))];
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
          const gx = (-3 * at(x - 1, y - 1) + 3 * at(x + 1, y - 1) - 10 * at(x - 1, y) + 10 * at(x + 1, y) - 3 * at(x - 1, y + 1) + 3 * at(x + 1, y + 1)) / 32;
          const gy = (-3 * at(x - 1, y - 1) - 10 * at(x, y - 1) - 3 * at(x + 1, y - 1) + 3 * at(x - 1, y + 1) + 10 * at(x, y + 1) + 3 * at(x + 1, y + 1)) / 32;
          res[y * w + x] = Math.min(255, Math.hypot(gx, gy) * p);
        }
      } else if (op === "thresh") res = g.map((v) => (v > p ? 255 : 0));
      else if (op === "invert") res = g.map((v) => 255 - v);
      g = res;
      for (let i = 0, j = 0; j < g.length; i += 4, j++) { o[i] = o[i + 1] = o[i + 2] = g[j]; o[i + 3] = 255; }
    }
    ctx.putImageData(out, 0, 0);
    drawHist(op === "orig" ? toGray(d) : g);
  }

  function drawHist(g) {
    const bins = new Array(64).fill(0); g.forEach((v) => bins[Math.min(63, (v / 4) | 0)]++);
    const mx = Math.max(...bins), W = hist.width, H = hist.height, bw = W / 64;
    hctx.clearRect(0, 0, W, H);
    hctx.fillStyle = css("--accent");
    bins.forEach((b, i) => { const bh = Math.sqrt(b / mx) * (H - 6); hctx.fillRect(i * bw, H - bh, bw - 1, bh); });
  }

  $$("#cvImg button").forEach((b) => b.addEventListener("click", () => {
    $$("#cvImg button").forEach((x) => x.classList.toggle("on", x === b)); imgKey = b.dataset.img; load(imgKey);
  }));
  $$("#cvOp button").forEach((b) => b.addEventListener("click", () => {
    $$("#cvOp button").forEach((x) => x.classList.toggle("on", x === b)); op = b.dataset.op; render();
  }));
  param.addEventListener("input", render);
  load(imgKey);
})();

/* =========================================================
   04 · Stock Alpha: bars + Monte Carlo
   ========================================================= */
(function stock() {
  const bars = $("#stockBars");
  if (bars) whenVisible(bars, (v) => { if (v) $$(".bar-fill", bars).forEach((b) => (b.style.width = (b.dataset.w / 28) * 100 + "%")); });

  const cv = $("#mcCanvas"); if (!cv) return;
  const ctx = cv.getContext("2d");
  const muIn = $("#muIn"), sigIn = $("#sigIn");
  const N = 1000, DAYS = 252, S0 = 10000, dt = 1 / 252;
  const fmt = (v) => LANG === "de" ? Math.round(v).toLocaleString(LOCALE) + " €" : "€" + Math.round(v).toLocaleString(LOCALE);

  function simulate() {
    const mu = +muIn.value / 100, sig = +sigIn.value / 100;
    $("#muOut").textContent = muIn.value + " %"; $("#sigOut").textContent = sigIn.value + " %";
    const rand = mulberry32(42);
    const drift = (mu - 0.5 * sig * sig) * dt, vol = sig * Math.sqrt(dt);
    const paths = Array.from({ length: N }, () => new Float64Array(DAYS + 1));
    for (const p of paths) { p[0] = S0; for (let t = 1; t <= DAYS; t++) p[t] = p[t - 1] * Math.exp(drift + vol * gauss(rand)); }
    const q = [0.05, 0.25, 0.5, 0.75, 0.95];
    const bands = q.map(() => new Float64Array(DAYS + 1));
    const col = new Float64Array(N);
    for (let t = 0; t <= DAYS; t += 1) {
      for (let i = 0; i < N; i++) col[i] = paths[i][t];
      col.sort();
      q.forEach((qq, k) => (bands[k][t] = col[Math.floor(qq * (N - 1))]));
    }
    draw(paths, bands);
    $("#p5").textContent = fmt(bands[0][DAYS]);
    $("#p50").textContent = fmt(bands[2][DAYS]);
    $("#p95").textContent = fmt(bands[4][DAYS]);
  }

  function draw(paths, bands) {
    const W = cv.width, H = cv.height;
    const padL = 56, padB = 22, padT = 10, padR = 10;
    const lo = Math.min(bands[0].reduce((a, b) => Math.min(a, b)), S0) * 0.95;
    const hi = bands[4].reduce((a, b) => Math.max(a, b)) * 1.05;
    const X = (t) => padL + (t / DAYS) * (W - padL - padR);
    const Y = (v) => padT + (1 - (v - lo) / (hi - lo)) * (H - padT - padB);
    ctx.clearRect(0, 0, W, H);

    ctx.strokeStyle = css("--line"); ctx.fillStyle = css("--text-3"); ctx.font = "300 10px 'DM Mono', monospace"; ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const v = lo + ((hi - lo) * i) / 4, y = Y(v);
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
      ctx.fillText("€" + (v / 1000).toFixed(1) + "k", 4, y + 3);
    }
    (LANG === "de" ? ["0", "3 M", "6 M", "9 M", "12 M"] : ["0", "3m", "6m", "9m", "12m"]).forEach((l, i) => ctx.fillText(l, X((DAYS * i) / 4) - 6, H - 6));

    const accent = css("--accent");
    ctx.globalAlpha = 0.12; ctx.strokeStyle = css("--text-2");
    for (let i = 0; i < 40; i++) { const p = paths[i]; ctx.beginPath(); for (let t = 0; t <= DAYS; t += 3) (t ? ctx.lineTo(X(t), Y(p[t])) : ctx.moveTo(X(t), Y(p[t]))); ctx.stroke(); }

    const band = (a, b, alpha) => {
      ctx.globalAlpha = alpha; ctx.fillStyle = accent; ctx.beginPath();
      for (let t = 0; t <= DAYS; t++) (t ? ctx.lineTo(X(t), Y(a[t])) : ctx.moveTo(X(t), Y(a[t])));
      for (let t = DAYS; t >= 0; t--) ctx.lineTo(X(t), Y(b[t]));
      ctx.closePath(); ctx.fill();
    };
    band(bands[0], bands[4], 0.16); band(bands[1], bands[3], 0.24);
    ctx.globalAlpha = 1; ctx.strokeStyle = accent; ctx.lineWidth = 2.2; ctx.beginPath();
    for (let t = 0; t <= DAYS; t++) (t ? ctx.lineTo(X(t), Y(bands[2][t])) : ctx.moveTo(X(t), Y(bands[2][t])));
    ctx.stroke();
    ctx.setLineDash([4, 4]); ctx.strokeStyle = css("--text-3"); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(padL, Y(S0)); ctx.lineTo(W - padR, Y(S0)); ctx.stroke(); ctx.setLineDash([]);
  }

  let pending = 0;
  const schedule = () => { cancelAnimationFrame(pending); pending = requestAnimationFrame(simulate); };
  [muIn, sigIn].forEach((el) => el.addEventListener("input", schedule));
  simulate();
})();

/* ---------------- Count-up for hero stats ---------------- */
$$("[data-count]").forEach((el) => {
  const target = +el.dataset.count, suf = el.dataset.suffix || "";
  whenVisible(el, (v) => {
    if (!v || el.dataset.done) return; el.dataset.done = 1;
    const t0 = performance.now();
    const tick = (now) => { const k = Math.min(1, (now - t0) / 1100); el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
});

/* ---------------- Before / after sliders ---------------- */
$$(".compare").forEach((c) => {
  const r = c.querySelector('input[type="range"]');
  r.addEventListener("input", () => c.style.setProperty("--pos", r.value + "%"));
});

/* ---------------- Page translation ----------------
   A "unit" is the outermost element that holds text directly. Units made only of inline tags are swapped as whole
   HTML (so German word order works); anything else has its text nodes swapped one by one. */
const I18N_SKIP = "script, style, pre, .formula, [translate='no']";
const INLINE = new Set(["STRONG", "B", "EM", "I", "CODE", "A", "SUB", "SUP", "SPAN", "BR", "SMALL"]);
const norm = (x) => x.replace(/\s+/g, " ").trim();
const hasWords = (x) => /[A-Za-zÄÖÜäöüß]{2,}/.test(x);

function i18nUnits(doc) {
  const out = [];
  (function walk(el) {
    for (const c of el.children) {
      if (c.matches(I18N_SKIP)) continue;
      const direct = [...c.childNodes].filter((n) => n.nodeType === 3 && n.nodeValue.trim());
      if (direct.length) {
        const inlineOnly = [...c.querySelectorAll("*")].every((d) => INLINE.has(d.tagName) && !d.id && !d.matches(I18N_SKIP));
        if (inlineOnly) out.push({ el: c, mode: "html", key: norm(c.innerHTML) });
        else { direct.forEach((n) => out.push({ node: n, mode: "text", key: norm(n.nodeValue) })); walk(c); }
      } else walk(c);
    }
  })(doc.body);
  return out.filter((u) => hasWords(u.key));
}
const I18N_ATTRS = ["alt", "aria-label", "title", "data-hint", "placeholder"];

function translatePage() {
  i18nUnits(document).forEach((u) => {
    const v = DE[u.key]; if (!v) return;
    if (u.mode === "html") u.el.innerHTML = v; else u.node.nodeValue = u.node.nodeValue.replace(u.node.nodeValue.trim(), v);
  });
  $$("*").forEach((el) => I18N_ATTRS.forEach((a) => {
    const k = el.getAttribute(a); if (k && DE[norm(k)]) el.setAttribute(a, DE[norm(k)]);
  }));
  if (DE[document.title]) document.title = DE[document.title];
  const md = $('meta[name="description"]'); if (md && DE[md.content]) md.content = DE[md.content];
}

// Collects every translatable string on this page (used once to build the dictionary).
window.__i18nCollect = () => {
  const keys = i18nUnits(document).map((u) => u.key);
  $$("*").forEach((el) => I18N_ATTRS.forEach((a) => { const k = el.getAttribute(a); if (k && hasWords(k)) keys.push(norm(k)); }));
  keys.push(document.title, $('meta[name="description"]')?.content || "");
  return [...new Set(keys.filter(Boolean))];
};

(function language() {
  document.documentElement.lang = LANG;
  if (LANG === "de") translatePage();
  $$(".lang-switch button").forEach((b) => {
    b.classList.toggle("on", b.dataset.lang === LANG);
    b.addEventListener("click", () => {
      if (b.dataset.lang === LANG) return;
      try { localStorage.setItem("lang", b.dataset.lang); } catch (e) {}
      const u = new URL(location.href); u.searchParams.delete("lang"); location.href = u.toString();
    });
  });
  document.documentElement.classList.remove("i18n-pending");
})();
