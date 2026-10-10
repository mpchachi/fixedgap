/*
 * A whisper of film grain over the whole site, so the flat cream and white
 * surfaces read as paper rather than as a blank screen. Pure SVG turbulence,
 * no image request, ~4% opacity, blended so it never muddies photos.
 */
export default function Grain() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 80,
        pointerEvents: 'none',
        opacity: 0.045,
        mixBlendMode: 'multiply',
      }}
    >
      <filter id="fg-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#fg-grain)" />
    </svg>
  );
}
