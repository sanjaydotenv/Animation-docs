# 🎨 CSS Animation Playground

A simple project that demonstrates different CSS animation and transform concepts.

This project is created for learning and practicing CSS animations. Every section focuses on one CSS feature with a practical example.

---

# 📸 Features

- Image Hover Zoom (Scale)
- Translate Transform
- Rotate Transform
- Skew Transform
- Transform Origin
- CSS Transition
- Transition Timing Functions
- Custom Cubic Bezier
- CSS Keyframes
- Steps Animation
- Animation Delay
- Infinite Animation
- Marquee Animation
- CSS 3D Perspective
- Preserve 3D
- RotateY()
- TranslateZ()
- 3D Image Carousel

---

# 📁 Project Structure

```
.
├── index.html
├── style.css
└── README.md
```

---

# 🚀 What You Will Learn

This project helps you understand:

- CSS Hover Effects
- CSS Transform
- CSS Transition
- CSS Animation
- CSS Timing Functions
- CSS Keyframes
- CSS Marquee Effect
- CSS 3D Transform
- CSS Perspective
- CSS Carousel Animation

---

# 1️⃣ Image Hover Zoom (Scale)

## HTML

```html
<div class="hover">
    <img src="image.jpg" alt="">
</div>
```

## CSS

```css
.hover img{
    transition: all .3s ease-in-out;
}

.hover:hover img{
    scale:1.2;
}
```

## Explanation

The image stays at its original size.

When the user moves the mouse over the image, the `scale()` property increases its size.

The container has `overflow:hidden`, so the image grows inside the box instead of overflowing outside.

### Before Hover

```
+-------------+
|             |
|   Image     |
|             |
+-------------+
```

### After Hover

```
+-------------+
|   Bigger    |
|    Image    |
|             |
+-------------+
```

### Scale Values

```css
scale(1);
```

Original Size

```css
scale(1.2);
```

20% Bigger

```css
scale(2);
```

200% Bigger

---

# 2️⃣ TranslateY()

## CSS

```css
transform: translateY(100px);
```

## Explanation

`translateY()` moves an element vertically.

Positive values move the element downward.

Negative values move the element upward.

```
Before

□

After

↓

□
```

Example

```css
transform:translateY(50px);
```

Move Down

```css
transform:translateY(-50px);
```

Move Up

---

# 3️⃣ Rotate()

## CSS

```css
transform:rotate(45deg);
```

## Explanation

The `rotate()` function rotates an element around its center point.

```
Before

⬜

After

◇
```

Examples

```css
rotate(90deg);
```

Quarter Rotation

```css
rotate(180deg);
```

Half Rotation

```css
rotate(360deg);
```

Complete Rotation

---

# 4️⃣ Skew()

## CSS

```css
transform:skew(-10deg,-10deg);
```

## Explanation

`skew()` tilts an element.

Instead of rotating it, the sides become slanted.

```
Before

┌─────────┐

After

╱────────╲
```

Examples

```css
skew(10deg);
```

Horizontal Skew

```css
skew(0deg,20deg);
```

Vertical Skew

---

# 5️⃣ Transform Origin

## CSS

```css
transform-origin:bottom right;
```

## Explanation

By default, every transform happens from the center of an element.

`transform-origin` changes the point where the transformation starts.

### Default

```
+---------+
|         |
|    ●    |
|         |
+---------+
```

Rotation starts from the center.

### Bottom Right

```
+---------+
|         |
|         |
|        ●|
+---------+
```

Now rotation starts from the bottom-right corner.

Example

```css
transform-origin:top left;
```

Rotate from top-left.

```css
transform-origin:center;
```

Rotate from center.

---

# 6️⃣ CSS Transition

## CSS

```css
transition:all .3s ease-in-out;
```

## Explanation

Without transition, CSS changes happen instantly.

With transition, the browser animates the change smoothly.

Without Transition

```
State A

↓

State B
```

Instant Change

With Transition

```
State A

↓

Smooth Animation

↓

State B
```

Transition Syntax

```css
transition:
property
duration
timing-function
delay;
```

Example

```css
transition:
transform .5s ease;
```

Only animate transform.

---

# 7️⃣ Transition Timing Functions

Timing functions control the speed of an animation.

---

## Linear

```css
transition:.4s linear;
```

Same speed from start to end.

```
██████████████
```

---

## Ease

```css
transition:.4s ease;
```

Slow → Fast → Slow

```
▁▂▄▆██▆▄▂▁
```

This is the default timing function in CSS.

---

## Ease In

```css
transition:.4s ease-in;
```

Starts slowly.

```
▁▁▂▄▆██
```

---

## Ease Out

```css
transition:.4s ease-out;
```

Ends slowly.

```
██▆▄▂▁
```

---

## Ease In Out

```css
transition:.4s ease-in-out;
```

Slow start and slow end.

```
▁▂▄▆██▆▄▂▁
```

---

## Custom Cubic Bezier

```css
transition:.3s cubic-bezier(0.77,0.11,0.82,0.19);
```

## Explanation

`cubic-bezier()` allows you to create your own animation speed.

Instead of using predefined timing functions, you can completely control how the animation moves.

```
Start

↓

Slow

↓

Fast

↓

Slow

↓

End
```

It is commonly used for custom UI animations and professional website interactions.

---

# 📌 Summary

In this section, you learned:

- Hover Zoom
- Scale
- TranslateY()
- Rotate()
- Skew()
- Transform Origin
- CSS Transition
- Transition Timing Functions
- Cubic Bezier

The next section covers CSS Animations, Keyframes, Steps(), Marquee Effect, Perspective, and the complete 3D Carousel.




---

# 8️⃣ CSS Keyframes Animation

## CSS

```css
@keyframes animate {
  0% {
    width: 200px;
    background: white;
  }

  20% {
    background: aqua;
  }

  50% {
    width: 300px;
    background: green;
  }

  70% {
    width: 400px;
    background: yellowgreen;
  }

  100% {
    width: 500px;
    background: orange;
  }
}
```

```css
.box {
    animation: animate 4s infinite alternate;
}
```

## Explanation

`@keyframes` is used to create animations in CSS.

Instead of changing styles only on hover, keyframes allow you to define multiple animation states.

The browser automatically creates smooth transitions between each state.

```
0%
┌──────┐

↓

20%
┌──────┐

↓

50%
┌──────────┐

↓

70%
┌──────────────┐

↓

100%
┌────────────────────┐
```

In this example:

- The width keeps increasing.
- The background color changes at different stages.
- The animation runs forever because of `infinite`.
- `alternate` makes the animation play forward and then backward.

---

## Animation Property

```css
animation:
name
duration
timing-function
delay
iteration-count
direction;
```

Example

```css
animation: animate 4s linear infinite;
```

---

# 9️⃣ CSS Steps()

## CSS

```css
animation: steps 3s steps(5) infinite;
```

## Keyframes

```css
@keyframes steps {

from{
transform:translateX(0px);
}

to{
transform:translateX(500px);
}

}
```

## Explanation

Normally CSS animations are smooth.

`steps()` breaks the animation into fixed parts.

Instead of moving continuously, the element jumps from one position to another.

```
Smooth Animation

□□□□□□□□□□□□


Steps Animation

□

↓

□

↓

□

↓

□

↓

□
```

### Why use Steps?

Useful for:

- Sprite animations
- Pixel animations
- Loading indicators
- Counters
- Retro game effects

Example

```css
steps(5)
```

Animation moves in 5 jumps.

```css
steps(10)
```

Animation moves in 10 jumps.

---

# 🔟 Animation Delay

## CSS

```css
animation-delay:.2s;
```

## Explanation

Animation delay waits before starting the animation.

In your project every red box has a different delay.

```css
.box:nth-child(3){
animation-delay:.2s;
}

.box:nth-child(4){
animation-delay:.3s;
}

.box:nth-child(5){
animation-delay:.4s;
}
```

Because every box starts at a different time, they create a wave effect.

```
Box 1

■■■■

Box 2

     ■■■■

Box 3

          ■■■■

Box 4

               ■■■■
```

Without delay all boxes would move together.

---

# 1️⃣1️⃣ Infinite Animation

## CSS

```css
animation: move 3s infinite;
```

## Explanation

The keyword `infinite` repeats the animation forever.

```
Start

↓

Middle

↓

End

↓

Start Again

↓

Middle

↓

End
```

Without `infinite`, the animation stops after one complete cycle.

---

# 1️⃣2️⃣ Marquee Animation

## HTML

```html
<div class="marque-wrapper">

    <div class="marque-track">
        ...
    </div>

    <div class="marque-track">
        ...
    </div>

</div>
```

## CSS

```css
.marque-wrapper{
overflow:hidden;
display:flex;
}

.marque-track{
animation:marque-effect 5s linear infinite;
flex-shrink:0;
}
```

## Explanation

The marquee effect creates an endless scrolling animation.

Instead of using one track, two identical tracks are used.

```
Track 1

LOGO LOGO LOGO LOGO LOGO

Track 2

LOGO LOGO LOGO LOGO LOGO
```

When the first track leaves the screen, the second track immediately appears.

This creates a seamless infinite scrolling effect.

The wrapper uses

```css
overflow:hidden;
```

so the extra content stays hidden outside the screen.

The track uses

```css
flex-shrink:0;
```

to prevent the width from shrinking.

---

# 1️⃣3️⃣ CSS Perspective

## CSS

```css
.carousel-scene{

perspective:1300px;

}
```

## Explanation

`perspective` gives depth to 3D objects.

Think of it like a camera looking at objects.

```
Camera

👁

|

|

|

Object
```

Small perspective value

```
perspective:400px;
```

Strong 3D effect.

Large perspective value

```
perspective:1500px;
```

Soft 3D effect.

Without perspective,

there is no visible depth.

Everything looks flat.

---

# 1️⃣4️⃣ Transform Style

## CSS

```css
transform-style:preserve-3d;
```

## Explanation

Normally browsers flatten child elements into one 2D layer.

`preserve-3d` tells the browser to keep all child elements in 3D space.

Without it

```
□□□□□□
```

Everything becomes flat.

With it

```
□

      □

             □

                   □
```

Every element keeps its own depth.

---

# 1️⃣5️⃣ RotateY()

## CSS

```css
transform:rotateY(45deg);
```

## Explanation

`rotateY()` rotates an element around the vertical (Y) axis.

```
Front

⬜

↓

RotateY

◩
```

Examples

```css
rotateY(90deg);
```

Side View

```css
rotateY(180deg);
```

Back Side

```css
rotateY(360deg);
```

Full Rotation

---

# 1️⃣6️⃣ TranslateZ()

## CSS

```css
transform:translateZ(600px);
```

## Explanation

`translateZ()` moves an element on the Z-axis.

Positive values move the object closer to the viewer.

Negative values move it farther away.

```
Camera

👁

|

|

□

translateZ(300px)

↓

👁

|

□
```

Positive value

```css
translateZ(500px);
```

Move closer.

Negative value

```css
translateZ(-500px);
```

Move farther away.

---

# 1️⃣7️⃣ 3D Image Carousel

## HTML Structure

```html
.carousel-scene

    └── carousel

            ├── image 1
            ├── image 2
            ├── image 3
            ├── image 4
            ├── image 5
            ├── image 6
            ├── image 7
            └── image 8
```

---

## CSS

```css
.carousel{

transform-style:preserve-3d;

animation:carousel-spin 20s linear infinite;

}
```

Each image is positioned using

```css
rotateY()
translateZ()
```

Example

```css
transform:
rotateY(90deg)
translateZ(600px);
```

This rotates the image first and then pushes it away from the center.

Every image gets a different angle.

```
Image 1

0°

Image 2

45°

Image 3

90°

Image 4

135°

Image 5

180°

Image 6

225°

Image 7

270°

Image 8

315°
```

Top View

```
                 Image

        Image             Image


    Image                     Image


        Image             Image

                 Image
```

Finally, the parent container rotates.

```css
@keyframes carousel-spin{

from{

transform:rotateY(0deg);

}

to{

transform:rotateY(360deg);

}

}
```

Because the parent rotates continuously, all images appear to move around in a circular path.

---

# 💡 Why `position: absolute`?

Every image is absolutely positioned.

```css
.carousel-items{

position:absolute;

}
```

This places every image at the center of the carousel.

Then each image is rotated and pushed outward using `translateZ()`.

Without `position:absolute`, the images would simply appear one below another instead of forming a circular 3D ring.

---

# 💡 Why `overflow: hidden`?

```css
overflow:hidden;
```

This hides the parts of the carousel that move outside the container, making the animation look clean and preventing unwanted scrollbars.

---

# 📚 Concepts Covered

✅ Hover Effects

✅ Scale()

✅ Translate()

✅ Rotate()

✅ Skew()

✅ Transform Origin

✅ CSS Transition

✅ Timing Functions

✅ Cubic Bezier

✅ CSS Keyframes

✅ Steps()

✅ Animation Delay

✅ Infinite Animation

✅ Marquee Effect

✅ Perspective

✅ Preserve 3D

✅ RotateY()

✅ TranslateZ()

✅ 3D Carousel

---

# 🎯 Conclusion

This project is a practical collection of CSS animation examples that covers both basic and intermediate concepts.

Instead of learning only theory, every concept is implemented with a working example, making it easier to understand how CSS animations work in real projects.

If you are learning CSS animations or preparing for frontend interviews, this project can be a useful reference for understanding transitions, transforms, keyframes, timing functions, and 3D effects.

---

## ⭐ If you found this project helpful, consider giving it a star on GitHub!

Happy Coding! 🚀