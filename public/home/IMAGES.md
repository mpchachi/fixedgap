# Image brief

## Status (5 Oct 2026)

Delivered and live: home-hand.webp, home-patient.webp, product-pinch.webp,
product-open.webp, product-wrist.webp, company-camera.webp (all hyperreal photos,
WebP, under 70 KB each). The technical sketches (pipeline, glove, camera) were
dropped: the pipeline section keeps the animated rail only, and Company uses the
real glove photo and a real-style photo for the camera version.

Still open: Open Graph image (1200x630) and favicons from the logo (code, no AI).

---


Every placeholder on the site is declared in code (`media` object at the top of
`src/components/home/SignalHome.tsx`, `src/components/pages/ProductPage.tsx`
and `src/components/pages/CompanyPage.tsx`). While `src` is `null` the page
shows a labelled grey box. To ship one: save the file in `/public/home/` with
the name below and set `src: '/home/<file>'`.

Rules that apply to everything: exact ratio listed, 2400 px on the long side,
JPG quality 85 (PNG for the line drawings), no text baked in, no watermarks,
no logos, and the laptop screen is never readable (the games change; the
photos must not date).

## Style blocks (append one to every prompt)

PHOTO, for the people shots. The target is a photo nobody can tell was
generated:
> Hyperrealistic documentary photograph, shot on a Sony A7 IV with a 50mm
> f/1.8, natural window light only, true skin texture with pores and fine
> lines, slight film grain, muted real-life colours, shallow depth of field,
> candid expression (concentration, not a posed smile), tight framing on the
> person and the hands, cluttered-but-real home background softly blurred.
> No text, no logos, screen content out of focus. Not stock-photo lighting,
> not glossy, not symmetrical.

SKETCH, for the technical drawings:
> Technical illustration, fine black ink lines with light pencil shading on
> off-white paper, flat orthographic view, small annotation leader lines
> without text, no colour except one deep blue accent (#2457e6), no shadows.

---

## Home (3)

### 1. Hand and webcam
File: `home-hand.jpg` · 1:1 · PHOTO
An older man's hand, 70s, weathered skin, mid-pinch (thumb and index almost
touching), seen from the laptop webcam's point of view, slightly above. The
blurred top edge of the laptop at the bottom of the frame. Kitchen behind, out
of focus.

### 2. A patient at the screen
File: `home-patient.jpg` · 1:1 · PHOTO
An older woman, around 70, grey hair, reading glasses, in profile or
three-quarter view, looking at a laptop on a dining table. Only her face,
shoulder and the edge of the laptop in frame. Concentrated, a hint of
amusement. Afternoon light from a window behind her. The screen glow on her
face, nothing readable.

### 3. Pipeline schematic
File: `home-pipeline.png` · 21:9 · SKETCH
Left to right: an open laptop with a small camera dot, a hand with 21 joint
dots connected by thin lines, a small table of bars, a monitor with a trend
line. Thin arrows between the four. Blue only on the dots and the trend line.

## Product (3): a patient playing, one per movement

### 4. Pinch
File: `product-pinch.jpg` · 4:3 · PHOTO
An older man at his kitchen table, right hand raised toward an open laptop in
a pinch gesture, elbow on the table, a cup of coffee beside him. Framed from
the chest up, the laptop at the left edge of the frame, screen out of focus.
He is mid-game, eyes on the screen.

### 5. Open hand
File: `product-open.jpg` · 4:3 · PHOTO
An older woman opening her hand wide toward the laptop camera, fingers spread,
as if catching something. Tight on her hand and face, laptop lid blurred in
the foreground. Living room, soft light.

### 6. Wrist
File: `product-wrist.jpg` · 4:3 · PHOTO
Hands only. An older person's forearm and hand turning from palm-up toward
palm-down, a wristwatch, sleeve pushed back, the edge of a laptop keyboard at
the bottom of the frame. Shallow focus on the knuckles.

## Company (2 to generate, 1 real)

### 7. The glove, technical sketch
File: `company-glove.png` · 4:3 · SKETCH
Exploded view of a rehabilitation glove: IMU module on the back of the hand,
flex sensors along each finger, EMG pads on a forearm strap, a small
eye-tracking module, wiring to a microcontroller board.

### 8. The camera version, technical sketch
File: `company-camera.png` · 4:3 · SKETCH
A bare hand in front of an open laptop, dashed sight lines from the webcam to
21 small dots on the hand joints connected by thin lines. Nothing worn on the
hand. Blue only on the dots.

### 9. Boston. DONE, real photo
`/about/pilar.jpeg` (the team at Pillar VC) is already wired in.

---

## Real photos we already have and should use

- `/about/pilar.jpeg`: team at Pillar VC, Boston. Wired in Company.
- `/about/about-1.jpeg` and `/GANADORES.jpeg`: the team with the cheque at
  the Madrid hub final (same photo). Candidate for the Awards section if we
  give it an image slot.
- `/about/oficina.jpeg`: the five of you at the desk. Usable as a team-wide
  shot in Company if you want one above the cards.
- `/about/about-4.jpeg`: real screenshot of the tracking UI with both hands
  and the metrics panel. The most credible "the camera does the measuring"
  image we have. Candidate for the Product page once we add a slot for it.
- `/about/about-2.jpeg`: the real glove on the table with the board and
  wires. Alternative to sketch 7 if you prefer real over drawn.

## Real photos to get

- Three clean screenshots of the current retro games, 16:9, English UI, no
  taskbar, no "Activar Windows". Not for the site today (the games change),
  but for the demo deck and for when the games stabilise.
- A proper team photo: the six of you, plain wall, window light, no
  cafeteria. Twenty minutes with a phone.
- Any photo from the Boston final or the Harvard visit with people in it, to
  choose the best for Company.
- One real photo of an older person testing the product, when the first pilot
  starts. The day you have it, it replaces photo 4.

## General assets

### A. Social preview (Open Graph)
File: `/public/og-image.jpg` · 1200 x 630 px exactly
The current file is a square logo and crops badly in LinkedIn and WhatsApp.
White background, FG logo left, "FixedGap" and "Motor recovery, measured
between visits." in a clean sans-serif, one blue accent. I can build this one
from the logo with code.

### B. Favicon set
From the FG logo: `favicon.ico`, `icon.png` 512 x 512, `apple-icon.png`
180 x 180. The current favicon is a `.jpeg`, which some browsers ignore. I can
generate these from the logo file.

### C. Partner logos
Ask each partner for an SVG or transparent PNG; I normalise them to one
height. Current files mix sizes and backgrounds (one has a red background).
