# Home page images

Every visual on the home is declared in `src/components/home/SignalHome.tsx`
(the `media` object). While `src` is `null` the page shows a labelled
placeholder. To ship an image: save it here (`/public/home/`) with the file
name below and set `src: '/home/<file>'`.

Export rules for all of them: exact aspect ratio listed, 2400 px on the long
side, JPG quality 85 (PNG only for the line drawings), no text baked in, no
watermarks, no logos.

Shared style so the page reads as one piece. Append to every prompt:

> Clean editorial style, soft natural daylight, neutral palette (white, warm
> grey, a touch of deep blue #2457e6), lots of negative space, shallow depth
> of field, no text, no logos, no UI chrome, photorealistic, 35mm.

For the two sketches and the schematic, use this instead:

> Technical illustration, fine black ink lines with light pencil shading on
> off-white paper, flat orthographic view, small annotation leader lines
> without text, no colour except one deep blue accent, no shadows.

---

## 1. Hero: patient session at home
File: `hero-session.jpg` · Ratio 16:9

Prompt: A woman in her sixties sitting at a kitchen table at home, right hand
raised in front of an open laptop, doing a slow hand-opening exercise. Laptop
screen softly lit but unreadable. Morning light from a window on the left, a
cup of coffee, plain wall behind. Calm, dignified, not a stock smile.

## 2. Pillar: hand and webcam
File: `pillar-hand.jpg` · Ratio 1:1

Prompt: Close-up of a hand mid-pinch gesture, seen from the point of view of a
laptop webcam, slightly above. Blurred laptop bezel at the bottom edge. Light
grey background, soft shadow.

## 3. Pillar: 21 hand landmarks
No image needed: this one is drawn in code (`motion/HandLandmarks.tsx`).

## 4. Pillar: clinician reviewing trends
File: `pillar-clinician.jpg` · Ratio 1:1

Prompt: A clinician in a white coat seated at a clean desk, looking at a
monitor that shows a few simple upward line charts, seen from the side so the
screen is at an angle and unreadable. Window light, plain clinic wall.

## 5. Glove prototype, technical sketch
File: `sketch-glove.png` · Ratio 4:3

Prompt (sketch style): Exploded flow sketch of a fabric glove: five flex
sensors along the fingers, an IMU block on the back of the hand, two EMG pads
on the forearm, wires converging to a small microcontroller board with a
battery. Leader lines pointing to each part. Pencil hatching for the fabric.
One component highlighted in deep blue.

## 6. Camera version, technical sketch
File: `sketch-camera.png` · Ratio 4:3

Prompt (sketch style): Same drawing style as the glove sketch. An open laptop
on the left, a bare hand on the right, dashed sight lines from the webcam to
the hand, 21 landmark dots on the hand joined by thin lines. Nothing attached
to the hand. The landmark dots in deep blue.

## 7. Pipeline schematic
File: `pipeline.png` · Ratio 21:9

Prompt (sketch style): Four simple line icons in a row, connected by thin
arrows left to right: a laptop with a webcam dot, a hand with 21 landmark
dots, a small table of bars (a measurement table), and a monitor with a
trend line and three patient rows. Wide, lots of white space, one blue accent
on the trend line.

## 8. Exercise: Pill Organizer
File: `exercise-pills.jpg` · Ratio 4:3

Prompt: Studio 3D render of a seven-compartment weekly pill organizer, open,
with a few coloured pills (red, yellow, white) in two compartments and one
pill lifted above as if being placed. Matte clay-like materials, warm cream
background, soft shadow, slight top-down angle.

## 9. Exercise: Light Switch
File: `exercise-switch.jpg` · Ratio 4:3

Prompt: Studio 3D render, same style and cream background as the pill
organizer: a small wooden desk with a yellow desk lamp turned on and a second
lamp turned off, two toggle switches on the wall behind. Soft shadow.

## 10. Exercise: Water Jug
File: `exercise-jug.jpg` · Ratio 4:3

Prompt: Studio 3D render, same style and cream background: a terracotta jug
tilted, pouring a thin stream of water into a glass on a wooden table, two
empty glasses beside it. Soft shadow.

## 11. The team
File: `team.jpg` · Ratio 21:9

Prompt: Wide shot of five young engineers working around a long white table
in a bright room with a plain wall, two laptops open showing simple
dashboards (unreadable), one person pointing at a screen, nobody looking at
the camera. Window light from the left, no bags or clutter.

---

Still real and kept as is: the clinical dashboard video
(`/clinical/videoDashboard.mp4`) and the partner logos (`/logos/`).
Not used any more on the home: `GUANTE.jpeg`, `hand-tracking.jpg`,
`hand-keypoints.png`, `/juegos/*`, `/about/about-team.jpg`, `/videos/*`.
