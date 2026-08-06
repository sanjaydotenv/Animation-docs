# 📅 Day 04 - Browser APIs & Animation Basics

Today I learned some important Browser APIs and Animation concepts. These concepts are used in modern websites for smooth animations, lazy loading, scroll effects, and better performance.

---

# 1. getBoundingClientRect()

`getBoundingClientRect()` returns the current position and size of an element.

```js
const box = document.querySelector(".box");

const rect = box.getBoundingClientRect();

console.log(rect);
```

It returns an object like this:

```js
{
  x,
  y,
  width,
  height,
  top,
  left,
  right,
  bottom
}
```

### What each property means

- **x** → Horizontal position of the element.
- **y** → Vertical position of the element.
- **width** → Width of the element.
- **height** → Height of the element.
- **top** → Distance from the top of the viewport.
- **left** → Distance from the left side.
- **right** → Right edge position.
- **bottom** → Bottom edge position.

### Common Uses

- Scroll Animations
- Drag & Drop
- Collision Detection
- Sticky Navbar
- Lazy Loading

---

# 2. Event Delegation

Instead of adding an event listener to every child element, we add one event listener to the parent.

```js
const parent = document.querySelector(".list");

parent.addEventListener("click", (e) => {
  if (e.target.classList.contains("items")) {
    e.target.style.backgroundColor = "red";
  }
});
```

### Why use Event Delegation?

- Better performance
- Less memory usage
- Works for dynamically added elements

### e.target

`e.target` is the element that was actually clicked.

---

# 3. requestAnimationFrame()

`requestAnimationFrame()` is the best way to create smooth animations.

```js
let x = 0;

function animate() {
  x += 2;
  box.style.transform = `translateX(${x}px)`;

  requestAnimationFrame(animate);
}

animate();
```

### Why use it?

- Smooth animations
- Better performance
- Browser controls the animation timing
- Saves CPU and battery

### requestAnimationFrame vs setInterval()

| requestAnimationFrame | setInterval |
|------------------------|------------|
| Smooth | Less smooth |
| Better Performance | Can lag |
| Browser Optimized | Fixed time |

---

# 4. window.innerWidth & window.innerHeight

These properties return the size of the browser window.

```js
console.log(window.innerWidth);
console.log(window.innerHeight);
```

### Uses

- Responsive Design
- Mobile Detection
- Center Elements

---

# 5. Resize Event

This event runs whenever the browser window is resized.

```js
window.addEventListener("resize", () => {
  console.log(window.innerWidth);
});
```

Usually we use **Throttle** or **Debounce** with resize events for better performance.

---

# 6. matchMedia()

`matchMedia()` checks if a CSS media query matches.

```js
const mobile = window.matchMedia("(max-width:768px)");

console.log(mobile.matches);
```

If the screen width is less than 768px, it returns `true`.

---

# 7. Scroll Position

### window.scrollY

Returns how much the page has been scrolled vertically.

```js
console.log(window.scrollY);
```

### element.scrollTop

Returns the scroll position inside an element.

```js
console.log(element.scrollTop);
```

---

# 8. IntersectionObserver

`IntersectionObserver` checks whether an element is visible inside the viewport.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".box").forEach(el => {
  observer.observe(el);
});
```

### Why is it useful?

- Better performance
- No need to check scroll position continuously
- Browser handles everything

### Common Uses

- Lazy Loading Images
- Reveal Animation
- Infinite Scroll
- Auto Play Videos

---

# threshold

`threshold` decides how much of the element should be visible before the callback runs.

```js
threshold: 0.5
```

This means the callback runs when **50%** of the element is visible.

---

# 9. Math for Motion

Animations use a lot of math.

### Math.min()

Returns the smallest value.

```js
Math.min(5, 10, 20);
```

---

### Math.max()

Returns the largest value.

```js
Math.max(5, 10, 20);
```

---

### Math.abs()

Returns the positive value.

```js
Math.abs(-20);
```

---

### Math.round()

Rounds a number to the nearest integer.

```js
Math.round(4.6);
```

---

### Math.sign()

Returns whether a number is positive or negative.

```js
Math.sign(-10);
```

---

# Clamp

Clamp keeps a value between a minimum and maximum value.

```js
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
```

---

# Lerp (Linear Interpolation)

Lerp moves one value smoothly toward another value.

```js
function lerp(start, end, t) {
  return start + (end - start) * t;
}
```

Used in:

- Smooth Cursor
- GSAP
- Camera Movement
- Smooth Scrolling

---

# Map()

Map converts one range into another range.

```js
function map(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}
```

Used in:

- Mouse Effects
- Scroll Animations
- Parallax

---

# Math.random()

Returns a random number between **0** and **1**.

```js
Math.random();
```

Used in:

- Particles
- Fireworks
- Rain
- Stars

---

# Math.sin() & Math.cos()

These functions are used to create wave and circular movements.

Used in:

- Floating Objects
- Circular Motion
- Wave Animation
- Orbit Effects

---

# Summary

✅ getBoundingClientRect() → Get element position and size.

✅ Event Delegation → Handle many child elements using one parent event.

✅ requestAnimationFrame() → Create smooth animations.

✅ innerWidth / innerHeight → Browser window size.

✅ Resize Event → Detect browser resizing.

✅ matchMedia() → Check media queries in JavaScript.

✅ scrollY / scrollTop → Get scroll position.

✅ IntersectionObserver → Detect when an element becomes visible.

✅ Clamp → Limit a value.

✅ Lerp → Smooth movement.

✅ Map → Convert one range into another.

✅ Math Functions → Used for animation calculations.