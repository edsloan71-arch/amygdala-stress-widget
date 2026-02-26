const defs = {
  tps: {
    title: "Tall Poppy Syndrome",
    text: "A social pattern where high achievers are criticized or ‘cut down’ for standing out—pressuring people to stay small to keep the group comfortable.",
    level: 78
  },
  zst: {
    title: "Zero Sum Theory",
    text: "A belief that opportunity and success are fixed—so if one person gains, someone else must lose. This mindset can reduce collaboration and increase rivalry.",
    level: 72
  },
  gas: {
    title: "Gaslighting",
    text: "A manipulation tactic that aims to make someone doubt their memory, perception, or judgment—often through denial, minimization, or rewriting events.",
    level: 88
  },
  cvo: {
    title: "Conformers vs Outgroupers",
    text: "Group dynamics where ‘in-group’ norms are rewarded while people seen as different are treated as outsiders—especially when power and status are unequal.",
    level: 75
  }
};

const fill = document.getElementById("fill");
const needle = document.getElementById("needle");
const def = document.getElementById("def");
const bubbles = document.querySelectorAll(".bubble");
const meter = document.getElementById("meter");
const engageRange = document.getElementById("engageRange");
const btnReset = document.getElementById("reset");
const btnEngage = document.getElementById("engage");

let currentLevel = Number(engageRange?.value ?? 18);

function setLevel(level){
  const clamped = Math.max(0, Math.min(100, Number(level)));
  currentLevel = clamped;

  const overlay = 100 - clamped;
  fill.style.height = overlay + "%";
  needle.style.top = overlay + "%";

  if (engageRange) engageRange.value = String(clamped);
}

function showDef(key){
  const d = defs[key];
  if (!d) return;

  def.innerHTML = `
    <h3>${escapeHtml(d.title)}</h3>
    <p>${escapeHtml(d.text)}</p>
    <p class="muted">Stress signal: rising toward overwhelmed (red).</p>
  `;
  setLevel(d.level);
}

function resetPanel(){
  def.innerHTML = `
    <h3>Start here</h3>
    <p>Move over a bubble (or tap it). The meter rises and this panel explains the term.</p>
    <p class="muted">Tip: you can also scroll the stress meter itself (or use the slider below) to “engage” toward red.</p>
  `;
  setLevel(18);
}

function engageToRed(){
  def.innerHTML = `
    <h3>Overwhelmed (Red)</h3>
    <p>This is the high-stress state—use it to frame why these concepts matter and how they impact decision-making, belonging, and psychological safety.</p>
    <p class="muted">Stress signal: fully engaged.</p>
  `;
  setLevel(100);
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

bubbles.forEach(b => {
  const key = b.dataset.key;
  b.addEventListener("mouseenter", () => showDef(key));
  b.addEventListener("focus", () => showDef(key));
  b.addEventListener("click", () => showDef(key));
});

meter?.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = Math.sign(e.deltaY);
  const step = 6;
  setLevel(currentLevel + (-delta * step));
}, { passive: false });

let dragging = false;
meter?.addEventListener("pointerdown", (e) => {
  dragging = true;
  meter.setPointerCapture(e.pointerId);
  handlePointerMove(e);
});
meter?.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  handlePointerMove(e);
});
meter?.addEventListener("pointerup", () => dragging = false);
meter?.addEventListener("pointercancel", () => dragging = false);

function handlePointerMove(e){
  const rect = meter.getBoundingClientRect();
  const y = e.clientY - rect.top;
  const level = 100 - (y / rect.height) * 100;
  setLevel(level);
}

engageRange?.addEventListener("input", (e) => setLevel(e.target.value));
btnReset?.addEventListener("click", resetPanel);
btnEngage?.addEventListener("click", engageToRed);

resetPanel();
