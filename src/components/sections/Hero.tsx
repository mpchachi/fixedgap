import Button from '@/components/ui/button';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Video background */}
      <div className="absolute inset-0 bg-brand-navy">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/videoNuevo.mp4" type="video/mp4" />
        </video>

        {/* Depth gradient - darker at the bottom/left where the copy sits,
            clearer at top so the footage still reads. Replaces the flat 50% black. */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/55 to-brand-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-brand-navy/25" />
      </div>

      {/* Content */}
      <div className="container-fg relative z-10">
        <div className="max-w-3xl">
          {/* SEO H1 - visually hidden, kept for crawlers */}
          <h1 className="sr-only">
            Post-Stroke Rehabilitation Monitoring. Zero Hardware.
          </h1>

          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
            Post-stroke rehabilitation · Webcam-only
          </span>

          {/* Headline */}
          <h2 className="mt-6 text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
            Your patients recover every day.
            <br />
            <span className="text-white/55">You find out weeks later.</span>
          </h2>

          {/* Subline */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
            FixedGap bridges the gap between clinical visits with daily
            post-stroke rehabilitation monitoring, using only a webcam.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button variant="primary" size="lg" href="/contact">
              Book a Demo
            </Button>
            <Button variant="secondary-white" size="lg" href="#problem">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#problem"
        aria-label="Scroll to learn more"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="animate-floatY flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
          <span className="h-2 w-1 rounded-full bg-white/70" />
        </span>
      </a>
    </section>
  );
}
