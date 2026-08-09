const lerp = (a, b, n) => (1 - n) * a + n * b;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

const cursor = document.querySelector(".cursor");

let mouseX = 9999;
let mouseY = 9999;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let cx = mouseX,
  cy = mouseY,
  lastX = mouseX,
  lastY = mouseY;

function animate() {
  cx = lerp(cx, mouseX, 0.18);
  cy = lerp(cy, mouseY, 0.18);

  const vx = mouseX - lastX;
  const vy = mouseY - lastY;
  lastX = mouseX;
  lastY = mouseY;
  const speed = clamp(Math.hypot(vx, vy), 0, 40);
  const stretch = 1 + speed / 60;
  const angle = Math.atan2(vy, vx) * (180 / Math.PI);

  cursor.style.transform = `translate3d(${cx}px , ${cy}px,0) rotate(${angle}deg) scaleX(${stretch}) scaleY(${1 / (stretch * 0.2 + 0.6)})`;
  requestAnimationFrame(animate);
}
animate();
const title = document.querySelector("#hero-title");

title.querySelectorAll(".word").forEach((word) => {
  const text = word.textContent;

  word.textContent = "";

  [...text].forEach((ch) => {
    const span = document.createElement("span");

    span.className = "ch";
    span.textContent = ch;

    word.append(span);
  });
});

const chars = [...title.querySelectorAll(".ch")];

const state = chars.map(() => ({
  x: 0,
  y: 0,
  tx: 0,
  ty: 0,
}));

let rects = [];

function measure() {
  rects = chars.map((el) => {
    const r = el.getBoundingClientRect();

    return {
      cx: r.left + r.width / 2,
      cy: r.top + r.height / 2,
    };
  });
}

measure();

window.addEventListener("resize", measure);

const RADIUS = 240;
const STRENGTH = 34;
const EASE = 0.12;

function animate2() {
  for (let i = 0; i < chars.length; i++) {
    const r = rects[i];

    const dx = r.cx - mouseX;
    const dy = r.cy - mouseY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < RADIUS) {
      const falloff = 1 - distance / RADIUS;

      const angle = Math.atan2(dy, dx);

      state[i].tx = Math.cos(angle) * falloff * STRENGTH;

      state[i].ty = Math.sin(angle) * falloff * STRENGTH;
    } else {
      state[i].tx = 0;
      state[i].ty = 0;
    }

    state[i].x = lerp(state[i].x, state[i].tx, EASE);

    state[i].y = lerp(state[i].y, state[i].ty, EASE);

    chars[i].style.transform =
      `translate3d(${state[i].x}px, ${state[i].y}px, 0)`;
  }

  requestAnimationFrame(animate2);
}

animate2();
