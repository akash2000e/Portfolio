# Akash Edamana — Portfolio Website
## Complete Reference for Future Expansion

This document reflects the **current, live state** of the site as built. Use it to expand, modify, or hand off this project without needing to re-read all the code.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Design System](#design-system)
4. [Page Sections — Current State](#page-sections--current-state)
5. [How to Expand](#how-to-expand)
6. [JavaScript Behavior](#javascript-behavior)
7. [Content Quick Reference](#content-quick-reference)
8. [External Dependencies](#external-dependencies)
9. [Hosting & Deployment](#hosting--deployment)

---

## Project Overview

- **Type:** Single-page scroll portfolio website
- **Stack:** Plain HTML + CSS + JavaScript (no frameworks, no build tools)
- **Hosting:** GitHub Pages
- **Owner:** E Akash (Edamana Akash) — Mechanical Engineer, Fab Academy Graduate, Technology Fellow
- **Goal:** Showcase projects, skills, and experience to freelance clients, employers, and collaborators

---

## File Structure

```
/
├── index.html              ← Single-page site (all sections)
├── styles.css              ← All styles (no external CSS frameworks)
├── script.js               ← All JavaScript (nav highlight + scroll fade-in + image fallback)
├── README.md               ← This file
├── Images/
│   ├── Profile_Pic.jpg     ← Hero section photo
│   └── projects/           ← Project card thumbnails
│       ├── Pomo.jpg
│       ├── Meshy.jpg
│       ├── Velichapadu.jpg
│       ├── Indore_Delivery robot.jpg
│       ├── NDT Inspection Drone.jpg
│       ├── GPR.jpg
│       ├── Lightweight H-Frame Drone.jpg
│       ├── Automated Payload Drone.jpg
│       ├── Competition Quadcopter.jpg
│       ├── Monolit Quad.jpg
│       └── Mini Plotter.png
└── projects/               ← Individual project detail pages
    ├── ndt-drone.html
    ├── gpr-drone.html
    ├── landing-mechanism.html  ← exists but not currently linked from index
    ├── drone-project1.html     ← Competition Quadcopter
    ├── drone-project2.html     ← Monolith Quad
    ├── drone-project3.html     ← Automated Payload Drone
    └── drone-project4.html     ← Lightweight H-Frame Drone
```

**Image naming convention:** Use exact filenames with spaces URL-encoded as `%20` in HTML src/style attributes (e.g., `Images/projects/NDT%20Inspection%20Drone.jpg`).

---

## Design System

### Color Palette (do not substitute)

| Role | Hex | Usage |
|------|-----|-------|
| Base Background | `#0a0a0a` | Page background, hero, footer |
| Surface | `#111111` | About, Experience, Contact sections |
| Card Background | `#161616` | Project cards, skill cards, form inputs |
| Border Default | `#1e1e1e` | Card borders, dividers |
| Border Subtle | `#222222` | Skill card hover border, nav border |
| **Phosphor Green** | `#39ff14` | PRIMARY ACCENT — name, labels, active states, hover borders |
| **Amber** | `#ffaa00` | Timeline dots/dates for past experience |
| **Electric Blue** | `#3884ff` | CAD/Design/3D Printing tags |
| **Warning Red** | `#ff4b4b` | CNC/Robotics tags, Coming Soon badge |
| Text Primary | `#e0e0e0` | Headings, card titles |
| Text Muted | `#777777` | Descriptions, secondary info |
| Text Dim | `#444444` | Placeholders, icons, disabled |
| Text Dark | `#555555` | Company names, edu CGPA |
| Text Faint | `#333333` | Footer text |
| Text Body | `#aaa` | About paragraph |
| Text Card Desc | `#666` | Project card descriptions |

### Typography

**Import (already in `<head>`):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=VT323&family=Oxanium:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

| Font | Role | Usage |
|------|------|-------|
| **VT323** | Headers | Hero name, section headings, card titles, timeline roles, Fab Academy title |
| **Oxanium** | UI Elements | Tags, pills, buttons, nav links, dates, labels, footer |
| **DM Sans** | Body | About text, card descriptions, contact links, form inputs |

**NEVER use** Inter, Roboto, Arial, or any system font.

**Font size reference (actual values in code):**
- Hero name: `96px` VT323 (desktop), `64px` (mobile)
- Hero title (Engineer & Maker): `44px` VT323, `28px` mobile
- Fab Academy title: `72px` VT323
- Section headings: `62px` VT323, `40px` mobile
- Skill category headers: `28px` VT323
- Timeline role: `24px` VT323
- Card titles: `22px` VT323
- Section labels (`// label`): `12px` Oxanium, uppercase, `letter-spacing: 3px`
- Tags/pills: `10–11px` Oxanium, uppercase
- Button text: `12px` Oxanium, uppercase, `letter-spacing: 3px`
- Body text: `15–16px` DM Sans
- Card descriptions: `12px` DM Sans

### Design Rules (strict)

- **No gradients** anywhere
- **No box-shadows** — use border color transitions for hover states
- **No border-radius beyond 6px** (cards, banner, form inputs use 4–6px; nav pill uses 50px)
- **Dark theme only** — no light mode
- All transitions: `0.2s ease` unless specified
- Card images: **grayscale by default** (`grayscale(100%) brightness(0.55) contrast(1.1)`), less grayscale on hover (`grayscale(60%) brightness(0.65)`)
- Green tint overlay on all card images: `rgba(57, 255, 20, 0.07)`

### CSS Classes — Key Components

**Section Label:**
```css
/* class="section-label" */
font-family: 'Oxanium'; font-size: 12px; color: #39ff14;
letter-spacing: 3px; text-transform: uppercase; opacity: 0.7;
/* Format in HTML: // section name */
```

**Button:**
```css
/* class="btn" */
transparent background, border: 1px solid #39ff14, color: #39ff14
hover: background #39ff14, color #0a0a0a
```

**Tag classes:** `.tag-green`, `.tag-amber`, `.tag-blue`, `.tag-red`, `.tag-group`
- Green → Drones, Education
- Amber → Electronics
- Blue → CAD, 3D Printing
- Red → CNC, Robotics
- Group → `#777` muted grey, for group projects

**Fade-in:** Add class `fade-in` to any `<section>`. JavaScript Intersection Observer adds `visible` when scrolled into view.

---

## Page Sections — Current State

### Section Order in `index.html`

```
FLOATING BOTTOM NAV
├── #hero
├── #about          (.fade-in, bg: #111)
├── #skills         (.fade-in, bg: #0a0a0a)
├── #experience     (.fade-in, bg: #111)
├── #fabacademy     (.fade-in, bg: #0a0a0a)
├── #projects       (.fade-in, bg: #0a0a0a)
└── #contact        (.fade-in, bg: #111)
FOOTER
```

---

### NAV BAR

**Type:** Floating pill at bottom center (NOT a top nav — this is a deliberate design choice).

**Structure:** `<nav class="bottom-nav">` → `<ul class="nav-links" id="nav-links">` → `<li><a href="#section-id">Label</a></li>`

**Current links:**
```
About · Skills · Experience · Fab Academy · Projects · Contact
```

**Behavior:**
- Fixed position, bottom: 24px, centered horizontally
- Glass effect: `backdrop-filter: blur(14px)`, `background: rgba(10,10,10,0.88)`
- Active section highlighted in green via scroll listener in `script.js`
- On mobile: shrinks text to 9px and padding, stays visible (no hamburger)

**To add a nav link:** Add `<li><a href="#new-section-id">Label</a></li>` and create the matching `<section id="new-section-id">`.

---

### HERO SECTION (`#hero`)

**Layout:** Two columns — text left, photo right. On mobile: photo stacks above text.

**Name effect:** `E Akash` → `Edamana Akash` on hover.
- HTML: `<span class="name-first">E</span><span class="name-expand">damana</span><span class="name-last">&nbsp;Akash</span>`
- CSS: `.name-expand` has `max-width: 0` and `opacity: 0`, transitions to `max-width: 300px; opacity: 1` on hover of `.hero-name`

**Photo:** `Images/Profile_Pic.jpg`, `width: 460px`, aspect-ratio 3/4, with CSS mask fade (edges fade to transparent).

**Content:**
- Section label: `// portfolio`
- Name: E Akash (expands to Edamana Akash on hover)
- Title: `Engineer & Maker`
- Tagline: `Engineer by training, maker by passion.`
- CTA: `<a href="#projects" class="btn">View My Work</a>`

---

### ABOUT SECTION (`#about`)

**Layout:** Single column, full width text + education list below.

**About paragraph:**
```
I'm a mechanical engineer based in Kerala, currently working as a Technology Fellow
at Kerala Startup Mission in Kochi. I've worked on drones, IoT systems, and machine
building — from ideation all the way to physical prototypes. A Fab Academy graduate,
I love the full process — designing in CAD, getting hands dirty in the fab lab, and
figuring out problems as they come. Always building something.
```

**Education list (class `.about-edu`):**
```
2025 — Fab Academy — Super Fablab Kerala
2024 — B.Tech Mechanical Engineering — Mar Athanasius College (CGPA 7.3)
2021 — Diploma Mechanical Engineering — St Mary's Polytechnic (CGPA 8.71)
```

**To update:** Edit the `<p>` and `<ul>` inside `<div class="about-text">`.

---

### SKILLS SECTION (`#skills`)

**Layout:** 2×2 grid on desktop, 1 column on mobile.

**Template for a skill card:**
```html
<div class="skill-card">
  <h3 class="skill-category">Category Name</h3>
  <div class="skill-pills">
    <span class="pill">Skill One</span>
    <span class="pill">Skill Two</span>
  </div>
</div>
```

**Current categories:**
| Category | Skills |
|----------|--------|
| CAD & Design | SolidWorks, Fusion 360, Blender, Creo, Solid Edge, Rhino |
| Fabrication | CNC Machining, 3D Printing, Prototyping |
| Electronics | PCB Design, Basic Electronics |
| Engineering | Project Development, Project Management |

**To add a skill:** Add `<span class="pill">New Skill</span>` inside the relevant `.skill-pills` div.
**To add a category:** Duplicate a `.skill-card` block and add it inside `.skills-grid`. Grid auto-expands (will flow to new rows).

---

### EXPERIENCE SECTION (`#experience`)

**Layout:** Vertical timeline — left line with dots, most recent first.

**Timeline item template:**
```html
<div class="timeline-item">
  <div class="timeline-dot green"></div>  <!-- green for current, amber for past -->
  <div class="timeline-content">
    <span class="timeline-date green">Month YYYY – Present</span>
    <h3 class="timeline-role">Role Title</h3>
    <span class="timeline-company">Company Name — City</span>
    <p class="timeline-desc">Brief description of work done.</p>
  </div>
</div>
```

**Dot/date color rules:**
- `.green` → current or most recent role
- `.amber` → all older roles

**Current entries (most recent first):**
1. `Nov 2025 – Present` | Technology Fellow | Kerala Startup Mission (KSUM) — Kochi
2. `Jul 2025 – Oct 2025` | Community Project | Samagra Shiksha Abhiyan — Kerala
3. `Jan 2025 – Jun 2025` | Student & Graduate | Fab Academy — Super Fablab Kerala, Kochi
4. `Mar 2024 – Jan 2025` | Design Engineer | Aero360 — Chennai
5. `May 2023 (2 weeks)` | Intern | BEML KGF — Kolar

**To add a new job:** Insert a new `.timeline-item` at the top of `.timeline`, use `.green` for the dot/date, change previous top entry to `.amber`.

---

### FAB ACADEMY SECTION (`#fabacademy`)

A dedicated highlight section for the Fab Academy program — between Experience and Projects.

**Content:**
- Section label: `// education & training`
- Title: `Fab Academy` (72px VT323, green)
- Description: 18 weeks of digital fabrication at Super Fablab Kerala
- Stats: 18 Weeks · 20+ Assignments · 1 Final Project
- CTA: `View Documentation →` → links to `https://fabacademy.org/2025/labs/kochi/students/akash-edamana/Template/index.html`
- Decorative: Large faded `FA` text on the right (`.fab-banner-tag`, `opacity: 0.04`)

**To update stats or link:** Edit the `.fab-stat-num` spans and the `<a class="btn">` href inside `#fabacademy`.

---

### PROJECTS SECTION (`#projects`)

**Layout:** 3-column grid desktop, 2-column tablet, 1-column mobile.

**Card template (clickable):**
```html
<a href="URL_OR_PATH" target="_blank" rel="noopener" class="project-card">
  <div class="card-img" style="background-image: url('Images/projects/ImageName.jpg')">
    <span class="card-img-fallback">XX</span>  <!-- 2-letter initials, shown if image fails -->
  </div>
  <div class="card-body">
    <div class="card-tags">
      <span class="tag tag-green">Drones</span>
      <span class="tag tag-amber">Electronics</span>
    </div>
    <h3 class="card-title">Project Title</h3>
    <p class="card-desc">One-line description of the project.</p>
  </div>
</a>
```

**Card template (Coming Soon — not clickable):**
```html
<div class="project-card coming-soon">
  <div class="card-img">
    <span class="card-img-fallback">XX</span>
  </div>
  <div class="card-body">
    <div class="card-tags">
      <span class="tag tag-red">Category</span>
      <span class="badge-coming-soon">Coming Soon</span>
    </div>
    <h3 class="card-title">Project Title</h3>
    <p class="card-desc">Description.</p>
  </div>
</div>
```

**Current projects in order:**

| # | Card Title | Tags | Image File | Link |
|---|-----------|------|-----------|------|
| 1 | POMO Lamp | Electronics (amber), CAD (blue) | `Pomo.jpg` | hackster.io |
| 2 | MESHY — Wio Tracker Case | CAD (blue), 3D Printing (blue) | `Meshy.jpg` | hackster.io |
| 3 | Velichapaad | CNC (red), Electronics (amber), Group Project (grey) | `Velichapadu.jpg` | hackster.io |
| 4 | Indoor Delivery Robot | Robotics (red), Electronics (amber) | `Indore_Delivery robot.jpg` | fabacademy.org |
| 5 | NDT Inspection Drone | Drones (green), Engineering (blue) | `NDT Inspection Drone.jpg` | `projects/ndt-drone.html` |
| 6 | GPR-Integrated Drone | Drones (green), Engineering (blue) | `GPR.jpg` | `projects/gpr-drone.html` |
| 7 | Lightweight H-Frame Drone | Drones (green), CAD (blue) | `Lightweight H-Frame Drone.jpg` | `projects/drone-project4.html` |
| 8 | Automated Payload Drone | Drones (green), CAD (blue) | `Automated Payload Drone.jpg` | `projects/drone-project3.html` |
| 9 | Competition Quadcopter | Drones (green), CAD (blue) | `Competition Quadcopter.jpg` | `projects/drone-project1.html` |
| 10 | Monolith Quad | Drones (green), CAD (blue) | `Monolit Quad.jpg` | `projects/drone-project2.html` |
| 11 | Urumi Flatbed Cutter | CNC (red), Engineering (blue) | _(no image yet)_ | Coming Soon |
| 12 | Mini Plotter | CAD (blue), 3D Printing (blue), Education (green) | `Mini Plotter.png` | `https://projects.fablabkerala.in/mtm_projects/mini_plotter/` |

**Notes:**
- `projects/landing-mechanism.html` (Multiterrain Landing System) exists on disk but is not currently displayed as a card. To restore it, add a card pointing to that file.
- Image fallback: If the image file is missing or fails to load, `script.js` clears the `background-image` and shows the 2-letter `.card-img-fallback` text.
- Group projects: Add `<span class="tag tag-group">Group Project</span>` inside `.card-tags`.
- To promote a Coming Soon card to live: change `<div class="project-card coming-soon">` to `<a href="URL" target="_blank" rel="noopener" class="project-card">` and close with `</a>`, remove the `.badge-coming-soon` span.

---

### CONTACT SECTION (`#contact`)

**Layout:** Two columns — form left, social links right. Single column on mobile.

**Contact form:** Uses `mailto:` — no backend. Submitting opens the user's email client.
```html
<form action="mailto:akashedamana@gmail.com" method="POST" enctype="text/plain">
```

**Social links (current):**

| Platform | URL |
|----------|-----|
| Email | akashedamana@gmail.com |
| LinkedIn | https://www.linkedin.com/in/akash-edamana |
| GitHub | https://github.com/akash2000e |
| GrabCAD | https://grabcad.com/akash.edamana-1 |
| Hackster | https://www.hackster.io/akashedamana |
| Instagram | https://www.instagram.com/akash_edamana |
| Telegram | https://t.me/AkashEda |

**To add a social link:** Copy any `<li>` block inside `.social-list`, update the icon class (Font Awesome) and the href/text.

---

### FOOTER

```html
<footer>
  <p>© 2025 Edamana Akash. Built with curiosity.</p>
</footer>
```

Update the year manually when needed.

---

## How to Expand

### Add a new project card

1. Add the project image to `Images/projects/ProjectName.jpg` (or `.png`)
2. Copy the card template from the Projects section above
3. Choose appropriate tag classes (green/amber/blue/red)
4. Pick a 2-letter fallback (`XX`) from the project title initials
5. URL-encode spaces in the image path (`%20`)
6. Paste the card inside `.projects-grid` in `index.html`

### Add a new section

1. Add a `<section id="new-section" class="fade-in">` with `<div class="container">` inside
2. Follow the alternating background pattern: odd sections use `#0a0a0a`, even use `#111111` (via `section:nth-child(even)` CSS rule — verify position)
3. Add a `<li><a href="#new-section">Label</a></li>` to the nav `<ul>`
4. No JavaScript changes needed — fade-in and nav-highlight work automatically for any `section[id]`

### Add a new experience entry

1. Insert a new `.timeline-item` at the top of `.timeline`
2. Use `.green` dot and date for the new entry
3. Change the previously-top entry's dot and date class to `.amber`

### Add a new project detail page

1. Create `projects/new-project.html` — model it after an existing one (e.g., `ndt-drone.html`)
2. Link the card in `index.html` to `projects/new-project.html`

### Update the Fab Academy section stats

Edit the `.fab-stat-num` values inside `#fabacademy`. Currently: `18` Weeks, `20+` Assignments, `1` Final Project.

---

## JavaScript Behavior

All JS is in `script.js` (71 lines, no dependencies).

**1. Active nav highlight** — scroll listener checks which `section[id]` the user is currently viewing and adds `.active` class to the matching nav link.

**2. Scroll fade-in** — `IntersectionObserver` watches all `.fade-in` elements. When 10% of the element enters the viewport (with a -40px bottom margin), it adds `.visible` which triggers the CSS opacity + translateY transition. Each element is observed only once (unobserved after first trigger).

**3. Image fallback** — for each `.card-img` with a `background-image`, a test `Image` object is created. If it loads → hide `.card-img-fallback` text. If it errors → clear background-image, show fallback text at `opacity: 0.2`.

---

## Content Quick Reference

**Person:** E Akash (Edamana Akash)
**Email:** akashedamana@gmail.com
**Location:** Kerala (based in Thrissur, working in Kochi)
**Title:** Engineer & Maker
**Tagline:** Engineer by training, maker by passion.

**Education:**
- Fab Academy — Super Fablab Kerala, Kochi (2025)
- B.Tech Mechanical Engineering — Mar Athanasius College (CGPA 7.3, 2024)
- Diploma Mechanical Engineering — St Mary's Polytechnic (CGPA 8.71, 2021)

**Skills summary:**
- CAD: SolidWorks, Fusion 360, Blender, Creo, Solid Edge, Rhino
- Fabrication: CNC Machining, 3D Printing, Prototyping
- Electronics: PCB Design, Basic Electronics
- Engineering: Project Development, Project Management

---

## External Dependencies

```html
<!-- Google Fonts — VT323 + Oxanium + DM Sans -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=VT323&family=Oxanium:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">

<!-- Font Awesome 6.0.0 — for contact/social icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

No npm, no build step, no framework — everything runs directly in the browser.

---

## Hosting & Deployment

- Hosted on **GitHub Pages**
- To deploy: push changes to the `main` branch (or whichever branch is set as source in repo settings)
- No build process — files are served as-is
- All paths are relative — do not use absolute paths

---

## Breakpoints

```
Mobile:   ≤ 768px   → single-column layout, smaller text, nav shrinks
Tablet:   ≤ 1024px  → projects grid goes 2-column
Desktop:  > 1024px  → full 3-column project grid, 2-column skills
```

---

*Last updated: April 2026. Reflects the actual built state of the site.*
