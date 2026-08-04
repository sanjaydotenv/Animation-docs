# SVG Animations Complete Notes

> These are my personal notes to understand SVG animations.
> If I forget everything in the future, I can read this file and understand it again from scratch.

---

# What is SVG?

SVG stands for **Scalable Vector Graphics**.

SVG is an XML-based image format.

Unlike JPG or PNG, SVG is made using mathematical points, lines, curves, and shapes.

Example:

```html
<svg width="200" height="100">
    <circle cx="50" cy="50" r="30" fill="red"/>
</svg>
```

Instead of storing pixels, SVG stores instructions.

Computer reads those instructions and draws the image.

Because of this,

- SVG never becomes blurry.
- SVG can be animated.
- SVG is lightweight.
- SVG is perfect for logos, icons, signatures, loaders and illustrations.

---

# SVG Coordinate System

SVG has its own coordinate system.

```
0,0
+---------------------------->
|
|
|
|
v
```

Top Left = (0,0)

X increases →

Y increases ↓

Example

```html
<circle cx="100" cy="50" r="20"/>
```

Means

Center X = 100

Center Y = 50

Radius = 20

---

# viewBox

Example

```html
<svg
width="300"
height="120"
viewBox="0 0 300 120">
```

viewBox syntax

```
min-x min-y width height
```

```
viewBox="0 0 300 120"
```

means

Start drawing from

X = 0

Y = 0

Drawing Area Width = 300

Drawing Area Height = 120

Think of viewBox like an invisible camera.

Width & Height decide how big SVG appears.

viewBox decides what part of SVG world is visible.

---

# PATH

The most powerful SVG element.

```html
<path d="..."/>
```

"d" means Drawing Commands.

Example

```html
d="M10 60 C60 10 120 120 180 40"
```

This string tells SVG how to draw.

---

# Path Commands

## M

Move To

Moves the pen.

Does NOT draw.

Example

```html
M10 60
```

Move pen to

X=10

Y=60

---

## L

Line To

Draws straight line.

Example

```html
M10 60 L100 20
```

Draw line from

10,60

to

100,20

---

## H

Horizontal Line

```html
H200
```

Moves only on X.

---

## V

Vertical Line

```html
V100
```

Moves only on Y.

---

## C

Cubic Bezier Curve

Example

```html
C60 10 120 120 180 40
```

Contains

Control Point 1

```
60 10
```

Control Point 2

```
120 120
```

End Point

```
180 40
```

SVG bends the curve according to control points.

---

## S

Smooth Curve

Example

```html
S260 10 290 60
```

S automatically calculates first control point.

You only provide

Second Control Point

End Point

Useful when continuing curves.

---

# fill

```html
fill="none"
```

Means

Do not color inside shape.

---

# stroke

```html
stroke="white"
```

Outline color.

---

# stroke-width

```html
stroke-width="4"
```

Thickness of outline.

---

# pathLength

Example

```html
pathLength="1"
```

Normally every path has its own actual length.

Example

Path A = 320px

Path B = 810px

Different lengths.

But

```html
pathLength="1"
```

Normalizes path length.

Now entire path becomes

```
0 → 1
```

instead of

```
0 → 320
```

Much easier for animations.

---

# Signature Animation

HTML

```html
<path
class="signature"
pathLength="1"
/>
```

CSS

```css
.signature{
stroke-dasharray:1;
stroke-dashoffset:1;
}
```

---

# stroke-dasharray

Normally

Stroke is continuous.

```
------------
```

Dasharray converts it into dashes.

Example

```css
stroke-dasharray:20;
```

```
------ ------
```

But because

```
pathLength=1
```

Entire path length is

```
1
```

So

```css
stroke-dasharray:1;
```

Means

Dash length = Full path.

Entire path becomes one giant dash.

---

# stroke-dashoffset

Moves dash position.

Example

```
stroke-dashoffset:1;
```

Entire dash shifts by full length.

Result

Path disappears.

```
Invisible
```

Then animation changes

```css
stroke-dashoffset:0;
```

Now dash comes back.

Looks like someone is drawing line.

---

Animation

```css
@keyframes svg-animation{

to{

stroke-dashoffset:0;

}

}
```

Animation Flow

```
Invisible

↓

Small Part Appears

↓

More Appears

↓

Complete Path
```

This creates signature effect.

---

# offset-path

Used for moving an element on a path.

Example

```css
.ball{

offset-path:path("M10 120 C120 -20 280 320 390 30");

}
```

Without offset-path

Circle moves in straight line.

With offset-path

Circle follows curve.

---

# offset-distance

Position of object.

```
0%
```

Beginning.

```
50%
```

Middle.

```
100%
```

End.

Animation

```css
.ball{

offset-distance:0%;

animation:ball-animation 5s infinite;

}
```

```css
@keyframes ball-animation{

to{

offset-distance:100%;

}

}
```

Flow

```
0%

↓

20%

↓

50%

↓

80%

↓

100%
```

Circle travels on path.

---

# animate Tag

SVG has built-in animation.

No CSS needed.

Example

```html
<animate
attributeName="r"
values="15;30;15"
dur="2s"
repeatCount="indefinite"
/>
```

attributeName

Which property changes.

```
r
```

Radius.

---

values

```
15

↓

30

↓

15
```

Radius becomes

15

30

15

Again and again.

---

dur

Animation duration.

```
2s
```

2 seconds.

---

repeatCount

```
indefinite
```

Infinite loop.

---

Result

Circle

Small

↓

Big

↓

Small

↓

Big

Forever.

---

# textPath

Allows text to follow a path.

Example

```html
<text>
<textPath href="#curve">

Hello

</textPath>
</text>
```

Instead of straight text

```
HELLO
```

Text follows curve.

```
H
 e
  l
   l
    o
```

---

# href="#curve"

Connects text with

```html
<path id="curve"/>
```

Text now knows which path to follow.

---

# startOffset

Controls where text starts.

```
0%
```

Beginning.

```
50%
```

Middle.

```
100%
```

End.

Animation

```html
<animate

attributeName="startOffset"

from="0%"

to="100%"

dur="5s"

repeatCount="indefinite"

/>
```

Result

Text keeps moving along path.

Like a train on railway tracks.

---

# CSS Used

## display:flex

```css
body{

display:flex;

flex-direction:column;

}
```

Stacks SVGs vertically.

---

## infinite

Animation never stops.

---

## alternate

Animation

Forward

↓

Backward

↓

Forward

↓

Backward

Without alternate

```
0

↓

100

↓

Jump

↓

0
```

With alternate

```
0

↓

100

↓

0

↓

100
```

Smooth.

---

## ease-out

Starts fast.

Ends slowly.

Looks natural.

---

## ease-in-out

Starts slowly.

Middle becomes faster.

Ends slowly.

Perfect for object movement.

---

# Summary

This project demonstrates four different SVG animation techniques:

### 1. Signature Drawing
- Uses `stroke-dasharray`
- Uses `stroke-dashoffset`
- Creates a line drawing effect.

### 2. Ball Moving on Path
- Uses `offset-path`
- Uses `offset-distance`
- Moves an element along a custom curve.

### 3. Pulsing Circle
- Uses SVG `<animate>`
- Changes the circle's radius continuously.
- Creates a heartbeat or pulse effect.

### 4. Moving Text
- Uses `<textPath>`
- Uses `startOffset`
- Makes text travel along a curved path.

---

# Important Properties Cheat Sheet

| Property | Purpose |
|-----------|---------|
| viewBox | Defines the SVG coordinate system |
| path | Draws custom shapes |
| d | Contains drawing commands |
| M | Move to a point |
| L | Draw a straight line |
| H | Horizontal line |
| V | Vertical line |
| C | Cubic Bézier curve |
| S | Smooth cubic Bézier curve |
| fill | Fill color of a shape |
| stroke | Outline color |
| stroke-width | Outline thickness |
| pathLength | Normalizes the total path length |
| stroke-dasharray | Creates dashed strokes |
| stroke-dashoffset | Shifts the dash position (used for draw effects) |
| offset-path | Defines the path an element should follow |
| offset-distance | Current position along the path |
| animate | Built-in SVG animation element |
| attributeName | Property to animate |
| values | Animation values |
| dur | Animation duration |
| repeatCount | Number of repeats |
| textPath | Places text on a path |
| startOffset | Starting position of text on the path |

---

# Final Understanding

Remember these four animation categories:

1. **Draw a path** → `stroke-dasharray` + `stroke-dashoffset`
2. **Move an object on a path** → `offset-path` + `offset-distance`
3. **Animate SVG properties** → `<animate>`
4. **Move text on a path** → `<textPath>` + `startOffset`

If you understand these four concepts well, you can build most common SVG animations such as signatures, loaders, wave text, progress indicators, animated logos, and path-following objects.