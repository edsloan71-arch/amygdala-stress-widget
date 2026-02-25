# Amygdala Stress Meter Widget (Static HTML/CSS/JS)

This repo is a **single, embeddable interactive** designed for:
- **GitHub Pages** hosting
- **Google Sites** embedding (iframe)

## What it does
- Center “amygdala” visual
- **Stress meter**: green → yellow → orange → red
- Concept bubbles:
  - Tall Poppy Syndrome
  - Zero Sum Theory
  - Gaslighting
  - Conformers vs Outgroupers
- Hover/tap a bubble → meter rises toward red + definition panel updates
- Users can also **scroll / drag** the meter or use the **engagement slider**

---

## 1) Deploy on GitHub Pages

1. Create a new GitHub repo (example name: `amygdala-stress-widget`)
2. Upload these files to the repo root:
   - `index.html`
   - `style.css`
   - `script.js`
   - (optional) `assets/` folder if you add your own image
3. In GitHub:
   - **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` / folder: `/root`
4. Your widget will publish at:
   `https://YOUR-USERNAME.github.io/YOUR-REPO/`

---

## 2) Embed in Google Sites

Google Sites:
- **Insert → Embed → By URL**
- Paste your GitHub Pages URL, e.g.
  `https://YOUR-USERNAME.github.io/amygdala-stress-widget/`

Then set the embed frame to **full width**, height ~ **600–800px**.

---

## 3) Replace the brain image (optional)

Right now the brain/amygdala is an inline SVG. If you prefer your own image:

1. Put your file in `assets/` (example: `assets/amygdala.png`)
2. In `index.html`, replace the SVG block with:

```html
<img src="./assets/amygdala.png" alt="Amygdala illustration" />
```

---

## 4) Edit the definitions

Open `script.js` and edit the `defs` object:
- `title`
- `text`
- `level` (0–100) controls how far the meter engages

---

## License
Use freely for your educational project.
