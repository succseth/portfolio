# Shine The Way Daycare — Static Site

A standalone static website built with **HTML, CSS, vanilla JavaScript, and React** (loaded via CDN for the contact form).

## Structure

```
/
├── index.html         Home
├── about.html         About
├── programs.html      Programs
├── facilities.html    Facilities + gallery
├── testimonials.html  Parent testimonials
├── admissions.html    Enrollment process + inquiry form (React)
├── contact.html       Contact details + form (React)
├── css/styles.css     Design tokens, layout, components
├── js/main.js         Mobile nav, active link, scroll-reveal animations
├── js/contact-form.js React 18 form (validation, submit feedback)
├── images/            All photos and logos
└── favicon.ico, favicon-*.png, apple-touch-icon.png
```

## Run locally

Just open `index.html` in your browser, or serve the folder:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```

Then visit http://localhost:8080.

## Tech

- HTML5 + semantic structure
- Modern CSS (custom properties, grid, flexbox, gradients)
- Vanilla JS for nav and reveal animations (IntersectionObserver)
- **React 18** (via unpkg CDN) for the contact / inquiry forms on `admissions.html` and `contact.html`
- Google Fonts: Plus Jakarta Sans + Inter

No build step required. Deploy by uploading the folder to any static host (Netlify, Vercel, GitHub Pages, S3, etc.).

## Contact form

The form validates client-side and currently simulates submission. To wire it to a real backend, edit `js/contact-form.js` and replace the `setTimeout` block with a `fetch()` call to your endpoint.
