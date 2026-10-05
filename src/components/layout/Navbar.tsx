'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuName = 'Product' | 'Science' | 'Company';

const menus: Record<
  MenuName,
  {
    eyebrow: string;
    title: string;
    links: Array<{ label: string; description: string; href: string }>;
    secondary: Array<{ label: string; href: string }>;
  }
> = {
  Product: {
    eyebrow: 'The product',
    title: 'One camera. A continuous view of recovery.',
    links: [
      {
        label: 'The exercises',
        description: 'Three short games, each built around a movement that matters.',
        href: '/product#exercises',
      },
      {
        label: 'Biomarkers',
        description: 'What each game measures and why a neurologist cares.',
        href: '/product#biomarkers',
      },
      {
        label: 'Clinical dashboard',
        description: 'The report the care team sees after every session.',
        href: '/product#dashboard',
      },
    ],
    secondary: [
      { label: 'Watch the walkthrough', href: '/product#demo' },
      { label: 'How it works', href: '/#how-it-works' },
    ],
  },
  Science: {
    eyebrow: 'Evidence and validation',
    title: 'Built on evidence. Honest about where we are.',
    links: [
      {
        label: 'The evidence',
        description: 'Why the gap between visits matters, with sources.',
        href: '/science#evidence',
      },
      {
        label: 'Scientific foundation',
        description: 'What the literature says about each biomarker.',
        href: '/science#foundation',
      },
      {
        label: 'Validation status',
        description: 'Done, in progress and planned.',
        href: '/science#status',
      },
    ],
    secondary: [
      { label: 'References', href: '/science#references' },
      { label: 'Join the validation study', href: '/contact' },
    ],
  },
  Company: {
    eyebrow: 'About FixedGap',
    title: 'From a hackathon glove to a camera.',
    links: [
      {
        label: 'Our story',
        description: 'How a hardware prototype became software.',
        href: '/company#story',
      },
      {
        label: 'The team',
        description: 'Five co-founders and one clinical advisor.',
        href: '/company#team',
      },
      {
        label: 'Behind FixedGap',
        description: 'The manifesto: why recovery is the next signal.',
        href: '/company/behind-fixedgap',
      },
    ],
    secondary: [
      { label: 'Awards and media', href: '/#awards' },
      { label: 'Contact', href: '/contact' },
    ],
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const hasDarkHero = false;
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuName | null>('Product');

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setActiveMenu(null);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fg-nav ${hasDarkHero ? 'fg-nav-home' : ''} ${
        activeMenu || mobileOpen ? 'fg-nav-open' : ''
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="fg-nav-surface">
        <div className="fg-nav-inner">
          <Link className="fg-nav-logo" href="/" onFocus={() => setActiveMenu(null)}>
            <Image src="/logonuevo.jpeg" alt="" width={28} height={28} priority />
            <span>FixedGap</span>
          </Link>

          <nav className="fg-nav-links" aria-label="Primary navigation">
            {(Object.keys(menus) as MenuName[]).map((name) => (
              <button
                key={name}
                type="button"
                aria-expanded={activeMenu === name}
                onMouseEnter={() => setActiveMenu(name)}
                onFocus={() => setActiveMenu(name)}
                onClick={() => setActiveMenu(activeMenu === name ? null : name)}
              >
                {name}
                <span aria-hidden="true">⌄</span>
              </button>
            ))}
          </nav>

          <div className="fg-nav-actions">
            <Link className="fg-nav-contact" href="/contact">
              Contact
            </Link>
            <Link className="fg-nav-cta" href="/contact">
              Book a demo
            </Link>
          </div>

          <button
            className={`fg-nav-mobile-toggle ${mobileOpen ? 'is-open' : ''}`}
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => {
              setActiveMenu(null);
              setMobileOpen(!mobileOpen);
            }}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {activeMenu && (
        <div className="fg-nav-panel">
          <div className="fg-nav-panel-inner">
            <div className="fg-nav-panel-intro">
              <p>{menus[activeMenu].eyebrow}</p>
              <h2>{menus[activeMenu].title}</h2>
            </div>

            <div className="fg-nav-panel-primary">
              {menus[activeMenu].links.map((link) => (
                <Link key={link.label} href={link.href} onClick={closeAll}>
                  <span>{link.label}</span>
                  <small>{link.description}</small>
                </Link>
              ))}
            </div>

            <div className="fg-nav-panel-secondary">
              <p>More</p>
              {menus[activeMenu].secondary.map((link) => (
                <Link key={link.label} href={link.href} onClick={closeAll}>
                  {link.label} <span aria-hidden="true">›</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="fg-mobile-menu">
          <div className="fg-mobile-menu-inner">
            {(Object.keys(menus) as MenuName[]).map((name) => (
              <div className="fg-mobile-section" key={name}>
                <button
                  type="button"
                  aria-expanded={mobileSection === name}
                  onClick={() => setMobileSection(mobileSection === name ? null : name)}
                >
                  {name}
                  <span aria-hidden="true">+</span>
                </button>
                {mobileSection === name && (
                  <div className="fg-mobile-section-links">
                    {menus[name].links.map((link) => (
                      <Link key={link.label} href={link.href} onClick={closeAll}>
                        {link.label}
                      </Link>
                    ))}
                    {menus[name].secondary.map((link) => (
                      <Link key={link.label} href={link.href} onClick={closeAll}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link className="fg-mobile-direct" href="/contact" onClick={closeAll}>
              Contact
            </Link>
            <Link className="fg-button fg-button-dark" href="/contact" onClick={closeAll}>
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
