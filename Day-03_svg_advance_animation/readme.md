# 🫧 Gooey SVG Animation + Wave Animation

> A deep dive into one of the coolest CSS + SVG effects used in modern UI design.
>
> In this project, we create a **Gooey (Liquid) Animation** using SVG Filters and a **Wave Loader Animation** using pure CSS Keyframes.

---

# 📚 Table of Contents

- Introduction
- What is SVG?
- Why use SVG Filters?
- Project Structure
- Gooey Animation
- SVG Filter Breakdown
- CSS Breakdown
- Wave Animation
- Keyframes Explained
- Animation Flow
- Performance
- Real World Uses
- Interview Questions

---

# 🎯 Introduction

Normally when two circles touch each other, they simply overlap.

Like this

```
⭕⭕
```

But in modern UI we often see something like

```
🫠
```

where both circles become liquid and merge together.

This effect is called

# Gooey Effect

It is **not possible using normal CSS only.**

It requires

- SVG Filter
- Gaussian Blur
- Color Matrix
- CSS Animation

---

# 🖼 What is SVG?

SVG means

> **Scalable Vector Graphics**

SVG is an XML based graphics language.

Unlike PNG or JPG,

SVG is made using

- Shapes
- Paths
- Circles
- Lines
- Mathematical equations

Example

```html
<svg>
    <circle cx="100" cy="100" r="50"/>
</svg>
```

Instead of pixels,
SVG stores mathematical instructions.

That's why

- Infinite Quality
- Small File Size
- Easy Animation

---

# Why SVG instead of CSS?

CSS can

✅ Move
✅ Rotate
✅ Scale

But CSS **cannot manipulate pixels.**

SVG Filters can manipulate pixels.

Examples

- Blur
- Shadow
- Glow
- Goo
- Distortion
- Noise
- Morphing

---

# Project Structure

```
index.html

SVG
│
├── Filter
│
└── Ball Wrapper
      ├── Ball 1
      └── Ball 2

Wave Wrapper
│
├── Wave 1
├── Wave 2
├── Wave 3
├── Wave 4
└── Wave 5
```

---

# HTML Structure

```html
<div class="ani1">

    <svg>

        <defs>

            <filter id="goo">

                ...

            </filter>

        </defs>

    </svg>

    <div class="ball-wrapper">

        <div class="ball ball-1"></div>
        <div class="ball ball-2"></div>

    </div>

</div>
```

---

# What is `<defs>` ?

`defs` means

> Definitions

Anything inside `<defs>`

will NOT be displayed.

It is only stored.

Later we can use it.

Example

```
Library

↓

Store Filter

↓

Use Later
```

---

# What is `<filter>` ?

Filter modifies graphics.

Without filter

```
⭕  ⭕
```

With filter

```
🫠
```

The filter has an id

```html
<filter id="goo">
```

Later CSS uses it

```css
filter:url(#goo);
```

---

# Understanding Every Filter

---

## 1️⃣ feGaussianBlur

```html
<feGaussianBlur

in="SourceGraphic"

stdDeviation="10"

result="blur"/>
```

This is the most important step.

It blurs every pixel.

Without blur

```
⭕
```

After blur

```
🌫
```

Think of it as

```
Sharp Image

↓

Blur

↓

Soft Edge
```

---

### in="SourceGraphic"

Means

Take original object.

---

### stdDeviation

Controls blur amount.

Small

```
2
```

Little blur

Medium

```
10
```

Nice goo

Large

```
30
```

Very soft

---

### result="blur"

Stores output.

Like

```
Original

↓

Blur

↓

Save as "blur"
```

Later we use

```
blur
```

instead of

```
SourceGraphic
```

---

# 2️⃣ feColorMatrix

```html
<feColorMatrix

in="blur"

mode="matrix"

values="..."

result="goo"/>
```

This is the MAGIC.

Without it

you only get blur.

With it

blur becomes

Liquid.

---

## Matrix

The last row

```text
0 0 0 20 -10
```

is responsible for Goo.

---

### 20

Increases Alpha.

Means

Pixels become thicker.

---

### -10

Cuts unwanted transparent pixels.

So

```
Blur

↓

Thicker

↓

Connected

↓

Liquid
```

---

Without Color Matrix

```
🌫      🌫
```

With Color Matrix

```
🫠
```

---

# 3️⃣ feComposite

```html
<feComposite

in="SourceGraphic"

in2="goo"

operator="atop"/>
```

This combines

Original Object

+

Goo Object

Without it

Everything remains blurry.

With it

Sharp object

+

Liquid edges

=

Perfect Goo.

---

# CSS

```css
.ball-wrapper{

filter:url(#goo);

}
```

This applies SVG filter.

Without this line

Nothing happens.

---

# Ball

```css
.ball{

height:150px;
width:150px;

border-radius:50%;

}
```

Creates circle.

---

# Why position absolute?

```css
position:absolute;
```

Allows both circles to overlap.

Otherwise

they stay in normal document flow.

---

# Animation

```css
animation:Glitch 2.5s infinite alternate;
```

Meaning

```
Animation Name

↓

Duration

↓

Repeat Forever

↓

Reverse Every Cycle
```

---

# Keyframes

```css
@keyframes Glitch{

from{

transform:translateX(0);

}

to{

transform:translateX(150px);

}

}
```

Meaning

Start

```
⭕⭕
```

Move

```
⭕ 🟣
```

Touch

```
🫠
```

Separate

```
⭕  ⭕
```

Repeat forever.

---

# Why Negative Delay?

```css
animation-delay:-1.4s;
```

Normally

Animation waits.

Negative delay means

Start animation from the middle.

Without

```
⭕
⭕
```

Both move together.

With negative delay

```
⭕ →

← ⭕
```

Looks much smoother.

---

# Wave Animation

HTML

```html
<div class="wave-wrapper">

<div class="wave"></div>

...

</div>
```

---

CSS

```css
.wave{

animation:wave 1s infinite;

}
```

Every circle runs same animation.

---

# Delays

```css
.wave-1{

animation-delay:1.1s;

}
```

Each ball starts at different time.

Result

```
⬤

⬤

⬤

⬤

⬤
```

becomes

```
⬤

  ⬤

    ⬤

      ⬤

        ⬤
```

Looks like wave.

---

# Wave Keyframes

```css
50%{

transform:translateY(-50px);

}
```

Moves upward.

Then

```css
100%{

transform:translateY(0);

}
```

Comes back.

Result

```
●

↓

↑

↓

↑

↓

```

Continuous.

---

# Why transform instead of top?

Because

Transform

✅ GPU Accelerated

Top

❌ Layout Recalculation

Transform is much smoother.

---

# Performance

SVG Filters are GPU accelerated in modern browsers.

Good

- Buttons
- Loaders
- Hero Sections
- Background Shapes

Avoid

Applying Goo filter on

- Hundreds of objects
- Large images

because filter calculations are expensive.

---

# Real World Uses

- Apple Dynamic Island
- iOS Liquid Animations
- Dribbble UI
- Figma Plugins
- Premium Landing Pages
- Loading Indicators
- Floating Menus
- Cursor Effects
- Blob Backgrounds

---

# Interview Questions

## What is SVG?

Scalable Vector Graphics based on XML that renders vector shapes instead of pixels.

---

## Why use SVG Filter?

To manipulate pixels like blur, shadow, goo, glow, displacement, and more.

---

## What does feGaussianBlur do?

Blurs the source graphic to soften edges before further processing.

---

## What does feColorMatrix do?

Modifies RGBA values. In a Goo effect, it increases alpha so nearby blurred pixels merge into a single liquid shape.

---

## What does feComposite do?

Combines the original graphic with the processed (gooey) result to keep the objects sharp while preserving the liquid connection.

---

## Why use transform for animation?

Because it is GPU accelerated and performs better than changing layout properties like `top` or `left`.

---

# Final Output

✅ SVG Filter

✅ Gooey Effect

✅ Gaussian Blur

✅ Color Matrix

✅ Composite

✅ CSS Keyframes

✅ Wave Animation

✅ Infinite Animation

✅ GPU Optimized Motion

---

# 🚀 What You'll Learn

- How SVG filters work internally.
- Why Gooey effects need blur + alpha manipulation.
- How `feGaussianBlur`, `feColorMatrix`, and `feComposite` work together.
- How CSS keyframes create smooth looping animations.
- Why `transform` animations are more performant than layout-based animations.
- Where Gooey animations are used in real-world UI/UX design.