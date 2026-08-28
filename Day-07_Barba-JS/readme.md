# 🚀 Barba.js — Basic Understanding

## 📌 What is Barba.js?

Barba.js is a JavaScript library used to handle **page navigation** smoothly.

Normally, when we click a link:

```html
<a href="./about.html">Go To About</a>
```

the browser loads the new HTML page and the current page is completely replaced.

Barba.js changes this behavior.

It intercepts the navigation and handles the page change using JavaScript.

---

# 📦 Installation

First, install Barba.js using npm:

```bash
npm i @barba/core
```

After installation, Barba.js is available inside the `node_modules` folder.

---

# 📁 Basic Project Structure

```text
project/
│
├── index.html
├── about.html
├── script.js
├── style.css
├── package.json
│
└── node_modules/
```

---

# 🌐 Barba HTML Setup

Barba needs two special attributes:

```html
data-barba="wrapper"
```

and

```html
data-barba="container"
```

---

# 1️⃣ Wrapper

The wrapper is normally placed on the `<body>`:

```html
<body data-barba="wrapper">
```

The wrapper tells Barba:

> This is the main area where Barba is working.

Example:

```html
<body data-barba="wrapper">

    <nav>
        <h1>Navbar</h1>
    </nav>

    <main data-barba="container">

        <h1>This is Home Page</h1>

    </main>

    <footer>
        <h1>Footer</h1>
    </footer>

</body>
```

Here, the whole body is the Barba wrapper.

---

# 2️⃣ Container

The container is the part of the page that Barba manages during navigation.

Example:

```html
<main data-barba="container">

    <h1>This is Home Page</h1>

    <a href="./about.html">
        Go To About Page
    </a>

</main>
```

The container is very important because Barba uses it to identify the page content that needs to change.

---

# 📄 About Page

The About page also needs the same Barba structure.

```html
<body data-barba="wrapper">

    <main data-barba="container">

        <h1>This is About Page</h1>

        <a href="./index.html">
            Go To Home Page
        </a>

    </main>

</body>
```

Both pages should have:

```html
data-barba="wrapper"
```

and

```html
data-barba="container"
```

---

# 📜 Using Barba in JavaScript

In `script.js`:

```js
import barba from "@barba/core";

barba.init();
```

First, we import Barba:

```js
import barba from "@barba/core";
```

Then we initialize it:

```js
barba.init();
```

`barba.init()` starts Barba on our website.

---

# 🧩 Why `type="module"`?

Because we are using `import` in JavaScript:

```js
import barba from "@barba/core";
```

we need to load the script as a module.

So in HTML:

```html
<script
    type="module"
    src="./script.js">
</script>
```

Without `type="module"`, the browser cannot use this import syntax correctly.

---

# ⚙️ How Barba Works Internally?

Now the important part.

Suppose we are on:

```text
Home Page
```

and we have:

```html
<a href="./about.html">
    Go To About Page
</a>
```

When the user clicks this link, normally the browser would load `about.html` as a completely new page.

But Barba changes this process.

---

## Step 1 — User clicks the link

```text
Home Page
     ↓
Click About
```

Barba detects the navigation.

---

## Step 2 — Barba handles the navigation

Instead of allowing the browser to immediately perform a normal page navigation, Barba takes control of the navigation.

Conceptually:

```text
User Click
    ↓
Barba detects click
    ↓
Barba handles navigation
```

---

## Step 3 — Barba gets the new page

Barba requests the new page:

```text
about.html
```

The server sends back the HTML of the About page.

For example:

```html
<body data-barba="wrapper">

    <main data-barba="container">

        <h1>This is About Page</h1>

    </main>

</body>
```

---

## Step 4 — Barba finds the container

Barba looks for:

```html
data-barba="container"
```

in the new page.

For example:

```html
<main data-barba="container">
```

This tells Barba which part of the new page is the container.

---

## Step 5 — Old container is replaced

Suppose the current page has:

```html
<main data-barba="container">

    <h1>This is Home Page</h1>

</main>
```

and the new page has:

```html
<main data-barba="container">

    <h1>This is About Page</h1>

</main>
```

Barba changes the old container with the new container.

Conceptually:

```text
HOME CONTAINER
      ↓
   replaced
      ↓
ABOUT CONTAINER
```

The important point is that Barba is managing the **container**, not simply doing a normal full-page navigation.

---

# 🔄 Complete Internal Flow

The basic flow is:

```text
User clicks link
       ↓
Barba detects navigation
       ↓
Barba requests the new HTML page
       ↓
New page HTML is received
       ↓
Barba finds data-barba="container"
       ↓
Old container is replaced
       ↓
New page content is displayed
```

---

# 🧠 Simple Mental Model

Think of it like this:

```text
                    BARBA
                      │
                      ↓
              Detects navigation
                      │
                      ↓
              Gets new HTML
                      │
                      ↓
          Finds the new container
                      │
                      ↓
          Replaces old container
                      │
                      ↓
               New content
```

---

# 🎯 Important Things to Remember

### `@barba/core`

This is the Barba.js package.

```bash
npm i @barba/core
```

### `data-barba="wrapper"`

Defines the main Barba wrapper.

```html
<body data-barba="wrapper">
```

### `data-barba="container"`

Defines the page container that Barba manages.

```html
<main data-barba="container">
```

### `barba.init()`

Initializes Barba.

```js
barba.init();
```

### `type="module"`

Required because we are importing Barba using:

```js
import barba from "@barba/core";
```

---

# 📝 One-Line Definition

> **Barba.js intercepts normal page navigation, loads the new HTML, finds its Barba container, and replaces the old container with the new one.**
