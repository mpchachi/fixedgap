
export default function DemoPage() {
  return (
    <main>

      {/* Hero */}
      <section
        style={{ backgroundColor: '#0A0F1E' }}
        className="pt-40 pb-24 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <span
            style={{ color: '#1F4C9C' }}
            className="text-xs font-semibold tracking-widest uppercase"
          >
            Demo
          </span>
          <h1
            style={{ color: '#FFFFFF' }}
            className="text-5xl md:text-6xl font-bold mt-4 leading-tight max-w-3xl"
          >
            See FixedGap in action.
          </h1>
          <p
            style={{ color: '#98A2B3' }}
            className="text-lg mt-6 max-w-2xl leading-relaxed"
          >
            Watch how FixedGap captures clinical biomarkers through an engaging
            game and delivers a full session report to the neurologist.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <span
            style={{ color: '#1F4C9C' }}
            className="text-xs font-semibold tracking-widest uppercase"
          >
            Our Story
          </span>
          <h2
            style={{ color: '#1A1F3C' }}
            className="text-3xl md:text-4xl font-bold mt-4 mb-8 max-w-2xl"
          >
            The problem we are solving.
          </h2>
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            aspectRatio: '16/9',
          }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/TYvQgTtPtYA"
              title="FixedGap: Our Story"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 'none', display: 'block' }}
            />
          </div>
          <div style={{ marginTop: '24px' }}>
            <p
              style={{
                color: '#1A1F3C',
                fontSize: '22px',
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              Millions recover at home.
              <br />
              Nobody is watching.
            </p>
            <p
              style={{
                color: '#6B7689',
                fontSize: '15px',
                marginTop: '8px',
              }}
            >
              Until now.
            </p>
          </div>
        </div>
      </section>

      {/* See it in action */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <span
            style={{ color: '#1F4C9C' }}
            className="text-xs font-semibold tracking-widest uppercase"
          >
            See it in action
          </span>
          <h2
            style={{ color: '#1A1F3C' }}
            className="text-3xl md:text-4xl font-bold mt-4 mb-8 max-w-2xl"
          >
            FixedGap game walkthrough.
          </h2>
          <div style={{
            backgroundColor: '#000000',
            borderRadius: '16px',
            aspectRatio: '16/9',
            overflow: 'hidden',
            border: '1px solid #1E2A40',
          }}>
            <video
              controls
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src="/DemoTecnica.mp4" type="video/mp4" />
            </video>
          </div>
          <div style={{ marginTop: '24px' }}>
            <p
              style={{
                color: '#1A1F3C',
                fontSize: '22px',
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              Under 5 minutes of play.
              <br />A full clinical report.
            </p>
            <p
              style={{
                color: '#6B7689',
                fontSize: '15px',
                marginTop: '8px',
              }}
            >
              Zero hardware. Zero friction.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Maria */}
      <section style={{ backgroundColor: '#FFFFFF' }} className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <span
            style={{ color: '#1F4C9C' }}
            className="text-xs font-semibold tracking-widest uppercase"
          >
            Meet Maria
          </span>
          <h2
            style={{ color: '#1A1F3C' }}
            className="text-3xl md:text-4xl font-bold mt-4 mb-8 max-w-2xl"
          >
            A story about the gap we are closing.
          </h2>
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            aspectRatio: '16/9',
          }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/UqnF2CcWmIo"
              title="FixedGap: Meet Maria"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: 'none', display: 'block' }}
            />
          </div>

          {/* Frase debajo */}
          <div style={{ marginTop: '24px' }}>
            <p style={{ color: '#1A1F3C', fontSize: '22px', fontWeight: 700, lineHeight: 1.3 }}>
              Maria&apos;s recovery happens every day.
            </p>
            <p style={{ color: '#6B7689', fontSize: '15px', marginTop: '8px' }}>
              Her clinical team should see it too.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ backgroundColor: '#0A0F1E' }} className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">

          <span style={{ color: '#1F4C9C' }}
            className="text-xs font-semibold tracking-widest uppercase">
            Join us
          </span>

          <h2 style={{ color: '#FFFFFF' }}
            className="text-3xl md:text-4xl font-bold mt-4 leading-tight">
            Be part of the future of stroke rehabilitation.
          </h2>

          <p style={{ color: '#98A2B3' }}
            className="text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            We are looking for neurologists, rehabilitation clinics, and hospitals
            to join our pilot program. Your expertise helps build tools that
            actually work in real clinical settings.
          </p>

          <a href="/contact"
            style={{
              backgroundColor: '#1F4C9C',
              color: '#FFFFFF',
              padding: '14px 32px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '32px',
            }}
            className="hover:opacity-90 transition-opacity">
            Join the pilot →
          </a>

        </div>
      </section>

    </main>
  );
}
