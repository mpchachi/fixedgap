# Plan de fotos v2 (preparado 8 oct 2026, pendiente de revisar con Luis)

Tres tipos de foto, cada hueco lleva su tipo:
- REAL: fotos nuestras (equipo, premios, producto en pantalla). Siempre que exista, gana.
- PRODUCTO: capturas limpias de la app actual (juegos retro, dashboard, tracking). En ingles, 1920x1080, sin barra de tareas ni "Activar Windows".
- IA: hiperrealistas de personas mayores probando el producto, mismo reparto (el senor de la cocina, la senora del comedor) y mismo bloque de estilo que las 5 que ya hay. REGLA: la persona nunca es el sujeto ni mira a camara; manda la mano, el portatil, la bata o la sala, y la persona queda detras, cortada o desenfocada.

| Pagina | Hueco | Hoy | Cambiar a | Tipo |
|---|---|---|---|---|
| Home | Tarjeta At home | home-hand.webp | se queda | IA (ya hecha) |
| Home | Tarjeta The camera | home-camera.webp (manos + reloj, repetida en Product) | mano en pinza vista desde la webcam, fondo cocina | IA, prompt 1 |
| Home | Tarjeta The clinic | home-patient.webp (senora de perfil) | esquina del portatil con el dashboard borroso, mano en el raton, bata detras sin cara | IA, prompt 3a |
| Home | Awards: foto 1 | pilar.jpeg (Boston) | se queda | REAL |
| Home | Awards: foto 2 | GANADORES.jpeg (hub Madrid) | foto del certamen de los 2.000 EUR si la hay; si no, se queda | REAL |
| Home | Equipo | oficina.jpeg (los cinco en la mesa) | foto de equipo nueva: pared lisa, luz de ventana, sin mochilas | REAL (hacer) |
| Product | Walkthrough | video DemoTecnica.mp4 | se queda | PRODUCTO |
| Product | Fila pinza | product-pinch.webp | se queda | IA (ya hecha) |
| Product | Fila mano abierta | product-open.webp | se queda | IA (ya hecha) |
| Product | Fila muneca | product-wrist.webp (repetida en Home) | se queda aqui si la de Home cambia | IA (ya hecha) |
| Product | Juegos retro | sin imagen | 3 capturas de los juegos actuales (Mario-like, Flappy-like, tercero), 16:9 | PRODUCTO (hacer) |
| Product | Tracking encima de biomarcadores | about-4.jpeg (captura antigua con la mano y los puntos, UI vieja) | captura nueva de la app actual con los 21 puntos pintados, UI actual | PRODUCTO (hacer) |
| Product | Dashboard | videoDashboard.mp4 | se queda, o captura fija del dashboard actual si el video esta viejo | PRODUCTO |
| Product | Lado del clinico (nuevo, junto al dashboard) | sin imagen | sala de rehabilitacion amplia, una clinica ensenando a un senor mayor sentado con el portatil como poner la mano; ellos pequenos y desenfocados | IA, prompt 3b |
| Science | Cabecera (nuevo) | sin imagen | consulta de neurologia vacia, hospital publico, luz de manana | IA, prompt 3d |
| Company | Phase 01 guante | about-2.jpeg (guante real en la mesa) | se queda; alternativa: foto nueva del guante solo sobre fondo neutro | REAL |
| Company | Phase 02 camara | company-camera.webp (= senor cocina, repetida) | cuaderno de disenador fotografiado desde arriba (prompt 2) o foto del senor de espaldas con el portatil (prompt 3c) | IA |
| Company | Madrid / Boston | GANADORES.jpeg + pilar.jpeg | anadir cualquier foto real de la final de Boston con gente, o de la visita a Harvard | REAL (buscar) |
| Company | Fichas del equipo | headshots actuales | opcional: mismo encuadre y fondo gris claro para los 6 | REAL |
| General | Open Graph 1200x630 | logo cuadrado | montar con codigo desde el logo | codigo |
| General | Favicons | icon.jpeg | PNG/ICO desde el logo | codigo |

Fotos REALES que hay que conseguir: certamen de los 2.000 EUR (entrega del premio), equipo en limpio, Boston con gente, y el dia del piloto un paciente real probando (sustituye a las IA de Product).

---

# Image brief

## Status (5 Oct 2026)

Live: home-hand.webp (crop of the kitchen photo, to be replaced by item 1 below),
home-patient.webp, product-pinch.webp, product-open.webp, product-wrist.webp,
company-camera.webp (the kitchen photo, to be replaced by item 2 below).

Cast so far: the man in the kitchen (grey hair, tortoiseshell glasses, navy
cardigan over a checked shirt, steel watch) and the woman at the dining table
(blonde hair tied back, round tortoiseshell glasses, navy jumper over a white tee).
Every new photo with a person should reuse one of these two, so the site reads as
two patients, not a stock library.

Rule for every photo with people (Luis, 8 Oct 2026): the person is never the
subject. No direct shot of a face, no portrait framing. The subject is the hand,
the laptop, the coat, the room; the person is behind it, cut by the frame, turned
away or out of focus. A face, when it appears, is secondary, soft and small. This
is what keeps the photos from reading as AI.

Shared style line for photos (paste at the end of every prompt):
"Shot on a Sony A7 IV with a 50mm f/1.8, natural window light only, true skin
texture with fine lines, slight film grain, muted real-life colours, shallow depth
of field, candid, not posed. The person is not the subject: no direct eye contact,
face secondary or out of frame, focus on hands and objects. No text, no logos, no
readable screen content. Not stock-photo lighting, not glossy, not symmetrical."

---

## 1. home-hand.webp (1:1) -- the hand from the webcam's point of view

Replace the current crop. Same man as the kitchen photos.

Hyperrealistic documentary photograph taken from the point of view of a laptop
webcam, slightly above and facing the user. In the foreground, the right hand of a
man in his seventies, weathered skin, visible veins, thumb and index finger almost
touching in a pinch, the hand filling the lower two thirds of the frame and
slightly soft at the fingertips because it is close to the lens. Behind the hand,
out of focus, the same man: grey hair, tortoiseshell glasses, navy cardigan over a
checked shirt, eyes on the screen. Behind him the kitchen from the other photos,
blurred: white tiles, a steel extractor hood, a window on the right. Only the
hand is in sharp focus. [shared style line] Square, 1:1.

## 2. company-camera.webp (4:3) -- "the camera version", hand-drawn, not a sketch of parts

Replace the current photo. Not an engineer's blueprint: a page from a thoughtful
designer's notebook, the kind Apple or Linear would show in a "how we got here"
story.

A single page of a high-quality dot-grid notebook, cream paper, photographed flat
from above in soft daylight, a mechanical pencil resting across the bottom edge. On
the page, drawn by hand in confident pencil with a few lines inked over in black
fine liner: a laptop seen from the side, and in front of it an open human hand
seen from the camera's point of view. From the small camera dot on the laptop,
faint pencil sight lines fan out to the hand and end in 21 small dots on the finger
joints, knuckles and wrist, the dots joined by thin lines into the hand skeleton.
Around the drawing, short handwritten annotations in neat small capitals (two or
three words each, illegible at this size), a couple of underlined words, one small
arrow, and a few numbers in the margin. One colour only: the 21 dots and one
circled annotation in deep blue ink (#2457e6). The drawing is careful and
considered, with visible construction lines lightly erased, not messy and not
cartoonish. Slight paper texture, a soft shadow from the pencil, nothing else on
the desk. 4:3.

## 3. New photos to generate (same cast, person always in the background)

### 3a. home-clinic.webp (1:1) -- the clinician's side, home card "The clinic"
Hyperrealistic photo, tight crop on a desk. In the foreground, sharp: the corner
of an open laptop showing a soft, unreadable dashboard of pale cards and one blue
line chart, and next to it a hand resting on a mouse. Behind, out of focus: the
sleeve and lapel of a white coat, a lanyard, a stethoscope hanging from the neck.
The clinician's face is out of frame, cut above the chin. A paper cup and a pen on
the desk, window light from the left. [shared style line] Square, 1:1.

### 3b. product-clinic-session.webp (4:3) -- a session in the clinic (Luis wants this)
Hyperrealistic wide photo of a rehabilitation room in a Spanish public hospital:
pale green walls, a treatment table with white paper, a parallel bar, a window
with blinds, a trolley. In the middle distance, not in the foreground, a woman in
a white coat stands beside a man in his seventies seated at a small table with an
open laptop; she is leaning in, gently guiding his raised right hand toward the
camera above the screen, showing him how to hold it. Both are seen from the side
and slightly behind, faces turned to the screen, small in the frame, softly out of
focus; the room, the light and the laptop are what the eye lands on. Nothing on
the screen is readable. [shared style line] 4:3.

### 3c. company-home-setup.webp (16:9) -- what "no setup" looks like
Same man as the kitchen photos, seen from behind and slightly above, sitting at
the kitchen table with the laptop open in front of him, his right hand raised
toward the screen. Nothing on the table but the laptop, a mug and a newspaper.
Wide enough to show the whole table and the window, no face visible. [shared
style line] 16:9.

### 3d. science-clinic.webp (16:9) -- where the data goes
Hyperrealistic photo of an empty neurology consultation room in a Spanish public
hospital, morning light, a desk with a monitor turned off, an examination bed
with white paper, a wall-mounted blood pressure cuff. No people. Calm, slightly
worn, real. [shared style line] 16:9.

Where each one goes: 3a -> Home, card "The clinic" (replaces home-patient.webp).
3b -> Product, next to the dashboard (new slot). 3c -> Company, Phase 02
(replaces the repeated kitchen photo; prompt 2 above is the alternative).
3d -> Science header (new slot).

## 4. Still open (code, no AI)
Open Graph image 1200x630 and favicons from the logo.

## 5. Plan v3 (8 Oct 2026, mid-morning) -- what to generate today

Three families. Every AI prompt ends with the style line of its family.

STYLE PHOTO (hyperreal, person secondary):
"Shot on a Sony A7 IV with a 50mm f/1.8, natural window light only, true skin texture with fine lines, slight film grain, muted real-life colours, shallow depth of field, candid, not posed. The person is not the subject: no direct eye contact, face secondary or out of frame, focus on hands and objects. No text, no logos, no readable screen content. Not stock-photo lighting, not glossy, not symmetrical."

STYLE RENDER (motion-design stills, Linear / Vercel / Apple keynote look):
"Minimal 3D studio render, soft diffused lighting, cream background (#f3f1ec), frosted glass and matte materials, one deep blue accent (#2a3cf0), shallow depth of field, no text, no logos, no people, centred composition, clean edges, subtle film grain. Looks like a Spline or Blender product render, not a stock 3D illustration."

### 5a. Calendar photo cards (3, replace the reused ones). 3:2, tight crop, objects first.
- cal-jan.webp: "Hyperrealistic photo, tight crop on a kitchen table in the morning: the right hand of a man in his seventies mid-pinch, index and thumb almost touching, in front of the lower edge of an open laptop, a cup of coffee with steam, crumbs on a plate, newspaper folded. Only the hand and forearm in focus; a navy cardigan sleeve, the rest out of frame. Cool early light." + STYLE PHOTO. 3:2.
- cal-feb.webp: "Hyperrealistic photo, tight crop on a living-room side table in the afternoon: an older woman's hand opening wide toward a laptop screen, fingers spread, a wedding ring, the laptop lid cut by the frame on the left, a knitted blanket and a pair of reading glasses on the table. Warm low window light, long soft shadows." + STYLE PHOTO. 3:2.
- cal-mar.webp: "Hyperrealistic photo, tight crop at night under a desk lamp: an older person's right wrist rotating from palm-up to palm-down in front of a laptop, a simple steel watch, the sleeve of a cardigan, the blue glow of the screen on the knuckles, the lamp's warm pool of light on a wooden desk, a glass of water." + STYLE PHOTO. 3:2.

### 5b. Hyperreal photos still missing from v2 (same cast as the 5 live ones)
- home-hand.webp (1:1): the hand from the webcam's point of view, kitchen behind. Full prompt in section 1.
- home-clinic.webp (1:1): corner of a laptop with a blurred dashboard, hand on a mouse, white coat behind without a face. Section 3a.
- product-clinic-session.webp (4:3): wide rehab room, a clinician guiding a seated older man's raised hand toward the laptop camera, both small and soft. Section 3b.
- company-home-setup.webp (16:9): the man from behind at his kitchen table with the laptop, nothing else on the table, no face. Section 3c.
- science-clinic.webp (16:9): empty neurology consultation room, Spanish public hospital, morning light. Section 3d.
- company-camera.webp (4:3), alternative: the designer's notebook photographed from above. Section 2.

### 5c. Motion-design renders (new family; where the UI needs a hero object, not a person)
- render-glass-tile.png (1:1, transparent background): "A single square tile of liquid glass, 1:1, seen straight from above with a slight tilt, translucent deep blue (#2a3cf0) with refraction at the edges, a soft specular highlight on the top-left, a thin brighter rim, a faint caustic shadow below. Isolated on a transparent background." + STYLE RENDER. Use: texture for the calendar's home days, legend swatch.
- render-landmarks.png (16:9): "A human right hand, open, made only of 21 small frosted-glass beads at the finger joints, knuckles and wrist, connected by thin matte dark lines, floating above a cream surface, soft shadow below, one bead glowing deep blue. No skin, no realism, purely the geometric skeleton." + STYLE RENDER. Use: Product header (biomarkers), How it works step 2.
- render-webcam.png (4:3): "Extreme close-up of a laptop webcam lens in the bezel, the glass of the lens catching a deep blue reflection, the dark bezel and the first millimetres of a cream screen, macro, soft studio light." + STYLE RENDER. Use: "The camera" tab or How it works step 1.
- render-trend.png (21:9): "A thin ribbon of frosted glass rising gently from left to right like a trend line, floating above a cream surface, soft shadow below, a small deep blue sphere resting at its right end, a faint dotted grid on the surface." + STYLE RENDER. Use: CTA background, Science header alternative.
- render-dashboard-card.png (4:3): "A floating frosted-glass card, rounded corners, holding only abstract shapes: three pale horizontal bars and one thin rising line, no legible text, seen at a slight angle above a cream surface, soft shadow." + STYLE RENDER. Use: "For the care team" section, Contact side column.

### 5d. Real photos (ours, to find or shoot)
- The 2,000 EUR award ceremony (home Awards, first card). Also the official name of the competition.
- Clean team photo: plain wall, window light, no backpacks, phones away (home, replaces oficina.jpeg).
- Boston final or Harvard visit with people in frame (Company).
- Three clean captures of the current retro games, 1920x1080, UI in English, no taskbar (Product).
- Current tracking screen with the 21 points and today's UI (Product, replaces about-4.jpeg).
- Current dashboard still if the video is out of date (Product).
