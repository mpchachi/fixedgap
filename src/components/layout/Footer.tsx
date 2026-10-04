import Image from 'next/image';
import Link from 'next/link';

const groups = [
  {
    title: 'Product',
    links: [
      { label: 'Patient experience', href: '/product/experience' },
      { label: 'Clinical dashboard', href: '/product/dashboard' },
      { label: 'Biomarkers', href: '/product/biomarkers' },
      { label: 'Demo', href: '/demo' },
    ],
  },
  {
    title: 'Science',
    links: [
      { label: 'Clinical validation', href: '/science/validation' },
      { label: 'Evidence', href: '/science/evidence' },
      { label: 'References', href: '/science/references' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our story', href: '/company/about' },
      { label: 'Team', href: '/company/team' },
      { label: 'Awards and media', href: '/#awards' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="fg-footer">
      <div className="fg-shell">
        <div className="fg-footer-top">
          <div className="fg-footer-brand">
            <Link href="/" aria-label="FixedGap home">
              <Image src="/logonuevo.jpeg" alt="" width={34} height={34} />
              <span>FixedGap</span>
            </Link>
            <p>Making motor recovery visible between clinical visits.</p>
          </div>

          <div className="fg-footer-groups">
            {groups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                {group.links.map((link) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="fg-footer-bottom">
          <p>Copyright 2026 FixedGap. All rights reserved.</p>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href="mailto:contact@fixedgap.com">contact@fixedgap.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
