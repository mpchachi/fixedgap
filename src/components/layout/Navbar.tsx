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
    eyebrow: 'Explore FixedGap',
    title: 'One camera. A continuous view of recovery.',
    links: [
      {
        label: 'Patient experience',
        description: 'Short, focused rehabilitation from home.',
        href: '/product/experience',
      },
      {
        label: 'Clinical dashboard',
        description: 'Trends and alerts in one calm workspace.',
        href: '/product/dashboard',
      },
      {
        label: 'Movement biomarkers',
        description: 'See what FixedGap captures in every session.',
        href: '/product/biomarkers',
      },
    ],
    secondary: [
      { label: 'Watch the demo', href: '/demo' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  Science: {
    eyebrow: 'Evidence and validation',
    title: 'Designed around clinically meaningful movement.',
    links: [
      {
        label: 'Clinical validation',
        description: 'Our framework for testing and validation.',
        href: '/science/validation',
      },
      {
        label: 'The evidence',
        description: 'Why the gap between visits matters.',
        href: '/science/evidence',
      },
      {
        label: 'Research library',
        description: 'The literature behind our approach.',
        href: '/science/references',
      },
    ],
    secondary: [
      { label: 'Science overview', href: '/science' },
      { label: 'Talk to the team', href: '/contact' },
    ],
  },
  Company: {
    eyebrow: 'About FixedGap',
    title: 'Building a clearer future for stroke recovery.',
    links: [
      {
        label: 'Our story',
        description: 'How FixedGap began and where we are going.',
        href: '/company/about',
      },
      {
        label: 'The team',
        description: 'Meet the people behind the platform.',
        href: '/company/team',
      },
      {
        label: 'Behind FixedGap',
        description: 'The ideas and experiences that drive us.',
        href: '/company/behind-fixedgap',
      },
    ],
    secondary: [
      { label: 'Media', href: '/company/media' },
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
            <Link href="/demo" onFocus={() => setActiveMenu(null)}>
              Demo
            </Link>
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
            <Link className="fg-mobile-direct" href="/demo" onClick={closeAll}>
              Demo
            </Link>
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
