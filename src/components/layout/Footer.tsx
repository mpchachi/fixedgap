import LogoMark from '@/components/ui/logo';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Patient Experience', href: '/product/experience' },
      { label: 'Biomarkers', href: '/product/biomarkers' },
      { label: 'Dashboard', href: '/product/dashboard' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our Story', href: '/company/about' },
      { label: 'Team', href: '/company/team' },
      { label: 'Behind FixedGap', href: '/company/behind-fixedgap' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Clinical Validation', href: '/science/validation' },
      { label: 'Research References', href: '/science/references' },
      { label: 'Contact', href: '/contact' },
      { label: 'Book a Demo', href: 'https://cal.com/fixedgap' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-brand-navy py-16">
      <div className="container-fg">
        <div className="mx-auto max-w-5xl">
          {/* Top row - logo + link columns */}
          <div className="grid grid-cols-2 gap-12 md:grid-cols-5">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5">
                <LogoMark className="h-7 w-7 rounded-lg ring-1 ring-white/20" />
                <span className="text-xl font-bold tracking-tight text-white">
                  FixedGap
                </span>
              </div>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
                Daily biomarkers from home.
                <br />
                Post-stroke rehabilitation, reimagined.
              </p>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/80">
                  {col.title}
                </h4>
                <div className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mb-8 mt-16 h-px w-full bg-white/[0.08]" />

          {/* Bottom row */}
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-white/40">
              © 2026 FixedGap. All rights reserved.
            </p>
            <div className="flex gap-6">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Use', href: '/terms' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-white/40 transition-colors hover:text-white/70"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
