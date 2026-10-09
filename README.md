# adityasrivatsa.de

My personal portfolio: robotics, computer vision and machine-learning projects, with write-ups of how each one actually works.

**Live at [adityasrivatsa.de](https://adityasrivatsa.de)** (also reachable at [adigateway.github.io](https://adigateway.github.io), which redirects here).

## What's in it

- **11 pages**: home, experience, startup pitch, a page per project, skills and CV.
- **English and German**, switchable from any page. The choice is remembered across pages.
- **Interactive demos** written in plain JavaScript on `<canvas>`, no frameworks:
  - a simulated four-camera tracking room, where you can change projection noise and the DBSCAN `eps` and watch identities split or merge;
  - the Berkeley PATH collision-warning model, with sliders for distance, closing speed, deceleration and reaction time;
  - an image-processing lab that runs grayscale, gamma, histogram equalisation, Sobel and thresholding on real pixels in the browser;
  - a Monte Carlo portfolio simulation (geometric Brownian motion, 1,000 runs).
- **Real result images** from my MATLAB computer-vision work, produced by running the scripts, not mocked up.

## Built with

Hand-written HTML, CSS and vanilla JavaScript. No build step, no dependencies, no framework. Two Google fonts (DM Sans, DM Mono) and icon glyphs from a CDN are the only external assets.

```
index.html, experience.html, pitch.html, projects.html,   pages
project-*.html, skills.html, resume.html
css/style.css                                             one stylesheet, CSS custom properties
js/main.js                                                interactions, demos, EN/DE switching
js/i18n-de.js                                             German translations, keyed by English text
js/cv-images.js                                           demo images inlined for canvas pixel access
assets/                                                   photos, MATLAB results, CV PDF
```

## Running it locally

No tooling needed:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deployment

GitHub Pages, served from `main`. Pushing to this branch publishes the site within about a minute.
