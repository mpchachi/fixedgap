# Images to produce

Every placeholder on the site is declared in code (`media` object at the top of
`src/components/home/SignalHome.tsx`, `src/components/pages/ProductPage.tsx`
and `src/components/pages/CompanyPage.tsx`). While `src` is `null` the page
shows a labelled grey box. To ship one: save the file in `/public/home/` with
the name below and set `src: '/home/<file>'`.

Export rules: exact ratio listed, 2400 px on the long side, JPG quality 85
(PNG for the line drawings), no text baked in, no watermarks, no logos.

Two style blocks. Append one to every prompt so the site reads as one piece.

PHOTO style:
> Clean editorial photograph, soft natural daylight, neutral palette (white,
> warm grey, one touch of deep blue #2457e6), lots of negative space, shallow
> depth of field, no text, no logos, no UI chrome, photorealistic, 35mm.

SKETCH style:
> Technical illustration, fine black ink lines with light pencil shading on
> off-white paper, flat orthographic view, small annotation leader lines
> without text, no colour except one deep blue accent, no shadows.

RENDER style (the three exercises):
> Studio 3D render, matte materials, soft diffused light from the upper left,
> warm cream background, gentle contact shadows, centred object with air around
> it, no text, no people.

---

## Home (3)

### 1. Hand and webcam
File: `home-hand.jpg` · Ratio 1:1 · Style: PHOTO
Close-up of a hand mid-pinch gesture, seen from the point of view of a laptop
webcam, slightly from above. Blurred laptop bezel at the bottom edge. Light
grey background.

### 2. Clinician reviewing trends
File: `home-clinician.jpg` · Ratio 1:1 · Style: PHOTO
A clinician in a plain shirt at a desk, three-quarter view, looking at a
monitor that shows soft line charts (unreadable). Consultation room, daylight.

### 3. Pipeline schematic
File: `home-pipeline.png` · Ratio 21:9 · Style: SKETCH
Left to right: an open laptop with a small camera dot, a hand with 21 joint
dots connected by thin lines, a small table of bars, a monitor with a trend
line. Thin arrows between the four. Blue only on the dots and the trend line.

## Product (3)

### 4. Pill Organizer
File: `product-pills.jpg` · Ratio 4:3 · Style: RENDER
A weekly pill organizer with coloured pills; one pill floating just above a
compartment as if being placed.

### 5. Light Switch
File: `product-switch.jpg` · Ratio 4:3 · Style: RENDER
Two small desk lamps side by side, one lit warm and one off, a simple wall
switch between them.

### 6. Water Jug
File: `product-jug.jpg` · Ratio 4:3 · Style: RENDER
A clay jug tilted mid-pour into a clear glass, water caught in motion.

## Company (3)

### 7. The glove, technical sketch
File: `company-glove.png` · Ratio 4:3 · Style: SKETCH
Exploded view of a rehabilitation glove: IMU module on the back of the hand,
flex sensors along each finger, EMG pads on a forearm strap, a small
eye-tracking module, wiring to a microcontroller board.

### 8. The camera version, technical sketch
File: `company-camera.png` · Ratio 4:3 · Style: SKETCH
A bare hand in front of an open laptop, dashed sight lines from the webcam to
21 small dots on the hand joints connected by thin lines. Nothing worn on the
hand. Blue only on the dots.

### 9. Boston, June 2026
File: `company-boston.jpg` · Ratio 16:9 · Style: PHOTO
A small student team presenting in a bright venue with large windows, one
person at a lectern, laptops open on a long table, audience blurred in the
foreground. No readable text or logos. (A real photo from the final is better
if one exists.)

---

## General assets (not placeholders, but needed)

### A. Social preview (Open Graph)
File: `/public/og-image.jpg` · 1200 x 630 px exactly
Shown when the link is shared on LinkedIn, WhatsApp, Slack. The current file
is a square logo, so previews crop badly. Make it: white background, the FG
logo at the left, the words "FixedGap" and "Motor recovery, measured between
visits." set in a clean sans-serif, one blue accent. I can build this one from
the logo with code if you prefer not to generate it.

### B. Favicon set
From the FG logo: `favicon.ico`, `icon.png` 512 x 512, `apple-icon.png`
180 x 180. The current favicon is a `.jpeg`, which some browsers ignore. I can
generate these from the logo file; no AI needed.

### C. Partner logos
Ask each partner for an SVG or transparent PNG and I normalise them to one
height. Current files mix sizes and backgrounds (one has a red background).

### D. Team headshots (optional)
The six current headshots work. If you want them to match, re-shoot or
regenerate all six with the same framing: chest up, plain light grey
background, soft front light, no smile forced, same crop.
