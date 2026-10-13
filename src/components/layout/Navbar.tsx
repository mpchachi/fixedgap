'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Product', href: '/product' },
  { label: 'Science', href: '/science' },
  { label: 'Company', href: '/company' },
  { label: 'Awards', href: '/awards' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`fg-nav ${mobileOpen ? 'fg-nav-open' : ''} ${scrolled ? 'fg-nav-glass' : ''}`}>
      <div className="fg-nav-surface">
        <div className="fg-nav-inner">
          <Link className="fg-nav-logo" href="/">
            <Image src="/logonuevo.jpeg" alt="" width={28} height={28} priority />
            <span>FixedGap</span>
          </Link>

          <nav className="fg-nav-links" aria-label="Primary navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="fg-nav-actions">
            <Link className="fg-nav-cta" href="/contact">
              Book a demo
            </Link>
          </div>

          <button
            className={`fg-nav-mobile-toggle ${mobileOpen ? 'is-open' : ''}`}
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fg-mobile-menu">
          <div className="fg-mobile-menu-inner">
            {links.map((link) => (
              <Link className="fg-mobile-direct" key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link className="fg-button fg-button-dark" href="/contact" onClick={() => setMobileOpen(false)}>
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
