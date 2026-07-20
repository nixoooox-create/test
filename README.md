# Ember & Salt — Restaurant Website

A single-page animated restaurant site (wood-fired Mediterranean grill concept).

## Structure

```
ember-salt/
├── index.html          # Markup
├── css/
│   └── style.css       # All styling, layout, and CSS animations
├── js/
│   └── main.js         # Scroll reveals, nav behavior, ember particle canvas
└── assets/
    └── (empty)         # Drop real photos here — see notes below
```

## Running it

No build step needed. Just open `index.html` in a browser, or serve the folder
with any static server, e.g.:

```
npx serve .
```

## About the assets folder

The gallery and "about" visuals currently use CSS gradients and an inline SVG
flame mark instead of photos, so no image files were needed to ship this.
To swap in real photography:

1. Add your images to `assets/` (e.g. `assets/grill-line.jpg`).
2. In `index.html`, replace the `.strip-cell` `<div class="tone t1">` elements
   with `<img src="assets/grill-line.jpg" alt="...">` (or set them as a
   `background-image` in `css/style.css`).
3. Do the same for `.about-visual` if you want a photo instead of the flame mark.

## Fonts

Loaded from Google Fonts via CDN link in `index.html` (Fraunces, Karla,
JetBrains Mono). For fully offline use, download the font files into
`assets/fonts/` and update the `@font-face`/link references.
