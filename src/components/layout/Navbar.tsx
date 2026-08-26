'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Cpu,
  Activity,
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  FlaskConical,
  FileText,
  BarChart3,
  Mail,
  HelpCircle,
  Newspaper,
  Play,
  ChevronDown,
  X,
} from 'lucide-react';
import LogoMark from '@/components/ui/logo';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface MegaMenuItem {
  icon: React.ReactNode;
  label: string;
  description: string;
  href: string;
}

interface MenuItem {
  label: string;
  description: string;
  items: MegaMenuItem[];
}

interface DirectItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    label: 'Product',
    description:
      'Everything you need to understand how FixedGap captures and translates movement into clinical data.',
    items: [
      {
        icon: <Cpu className="h-5 w-5" />,
        label: 'Patient Experience',
        description: 'Rehabilitation that feels like a game',
        href: '/product/experience',
      },
      {
        icon: <Activity className="h-5 w-5" />,
        label: 'Biomarkers',
        description: '13 clinical biomarkers: MVP to roadmap',
        href: '/product/biomarkers',
      },
      {
        icon: <LayoutDashboard className="h-5 w-5" />,
        label: 'Clinical Dashboard',
        description: 'What the neurologist receives after each session',
        href: '/product/dashboard',
      },
    ],
  },
  {
    label: 'Demo',
    description:
      'See how FixedGap captures clinical biomarkers through a short daily game.',
    items: [
      {
        icon: null,
        label: 'Our Story',
        description: 'The problem we are solving',
        href: '/demo#story',
      },
      {
        icon: null,
        label: 'See it in action',
        description: 'FixedGap game walkthrough',
        href: '/demo#game',
      },
    ],
  },
  {
    label: 'Company',
    description:
      'Meet the team building the future of post-stroke rehabilitation monitoring.',
    items: [
      {
        icon: <BookOpen className="h-5 w-5" />,
        label: 'Our Story',
        description: 'From hackathon prototype to clinical platform',
        href: '/company/about',
      },
      {
        icon: <Users className="h-5 w-5" />,
        label: 'Team',
        description: 'The people behind FixedGap',
        href: '/company/team',
      },
      {
        icon: <GraduationCap className="h-5 w-5" />,
        label: 'Behind FixedGap',
        description: 'Why we exist and what drives us',
        href: '/company/behind-fixedgap',
      },
      {
        icon: <Newspaper className="h-5 w-5" />,
        label: 'Media',
        description: 'Press coverage and media mentions',
        href: '/company/media',
      },
    ],
  },
  {
    label: 'Science',
    description:
      'The clinical evidence and peer-reviewed research behind every biomarker we measure.',
    items: [
      {
        icon: <FlaskConical className="h-5 w-5" />,
        label: 'Clinical Validation',
        description: 'Our validation framework and roadmap',
        href: '/science/validation',
      },
      {
        icon: <FileText className="h-5 w-5" />,
        label: 'Research References',
        description: 'Peer-reviewed literature 2024-2026',
        href: '/science/references',
      },
      {
        icon: <BarChart3 className="h-5 w-5" />,
        label: 'The Evidence',
        description: 'Clinical data on the rehabilitation gap',
        href: '/science/evidence',
      },
    ],
  },
  {
    label: 'Contact',
    description:
      "Whether you're a neurologist, an investor, or just curious, we'd love to hear from you.",
    items: [
      {
        icon: <Mail className="h-5 w-5" />,
        label: 'Get in Touch',
        description: 'Send a message or reach out directly',
        href: '/contact',
      },
      {
        icon: <HelpCircle className="h-5 w-5" />,
        label: 'FAQ',
        description: 'Quick answers to common questions',
        href: '/contact#faq',
      },
      {
        icon: <Users className="h-5 w-5" />,
        label: 'Who We Work With',
        description: 'Our partners, hospitals, and who should reach out',
        href: '/contact#who-we-work-with',
      },
    ],
  },
];

const directItems: DirectItem[] = [];

/* Videos shown in the Demo panel and modals */
type VideoKey = 'story' | 'walkthrough' | 'maria';

const videos: Record<
  VideoKey,
  { title: string; description: string; youtube?: string; file?: string }
> = {
  story: {
    title: 'Our Story',
    description: 'The problem we are solving',
    youtube: 'https://www.youtube.com/embed/TYvQgTtPtYA?autoplay=1',
  },
  walkthrough: {
    title: 'See it in action',
    description: 'FixedGap game walkthrough',
    file: '/DemoTecnica.mp4',
  },
  maria: {
    title: 'Meet Maria',
    description: 'A patient story',
    youtube: 'https://www.youtube.com/embed/UqnF2CcWmIo?autoplay=1',
  },
};

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoKey | null>(null);

  const activeMenu = menuItems.find((m) => m.label === hoveredItem) ?? null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-brand-border/70 bg-white/90 backdrop-blur-md"
      onMouseLeave={() => setHoveredItem(null)}
    >
      <div className="container-fg flex h-full items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="text-[1.35rem] font-bold tracking-tight text-brand-navy">
            FixedGap
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {menuItems.map((menu) => {
            const isOpen = hoveredItem === menu.label;
            const trigger = (
              <span className="inline-flex items-center gap-1">
                {menu.label}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-brand-blue' : 'text-brand-muted'
                  }`}
                />
              </span>
            );
            const triggerClass = `rounded-lg px-3 py-2 text-[15px] font-medium transition-colors ${
              isOpen
                ? 'bg-brand-beige/70 text-brand-navy'
                : 'text-brand-navy/80 hover:text-brand-navy'
            }`;
            return (
              <div key={menu.label} onMouseEnter={() => setHoveredItem(menu.label)}>
                {menu.label === 'Demo' ? (
                  <Link href="/demo" className={triggerClass}>
                    {trigger}
                  </Link>
                ) : (
                  <button type="button" className={triggerClass}>
                    {trigger}
                  </button>
                )}
              </div>
            );
          })}

          {directItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredItem(null)}
              className="rounded-lg px-3 py-2 text-[15px] font-medium text-brand-navy/80 transition-colors hover:text-brand-navy"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="rounded-xl bg-brand-blue px-5 py-2.5 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(26,31,60,0.24),0_4px_12px_rgba(31,76,156,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-blue-strong active:scale-[0.98]"
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="text-brand-navy lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Full-width mega menu panel (anchored to nav, no px hacks)  */}
      {/* ---------------------------------------------------------- */}
      {activeMenu && (
        <div className="absolute inset-x-0 top-full hidden border-b border-brand-border bg-white shadow-[0_24px_48px_-16px_rgba(26,31,60,0.18)] lg:block animate-fadeIn">
          <div className="container-fg py-8">
            {activeMenu.label === 'Demo' ? (
              /* Demo: intro + three video cards */
              <div className="flex gap-12">
                <div className="flex w-60 shrink-0 flex-col justify-between border-r border-brand-border pr-8">
                  <div>
                    <p className="eyebrow mb-3 text-brand-blue">Watch FixedGap</p>
                    <p className="text-sm leading-relaxed text-brand-muted">
                      {activeMenu.description}
                    </p>
                  </div>
                  <Link
                    href="/demo"
                    className="mt-6 text-sm font-semibold text-brand-blue hover:underline"
                  >
                    See all videos →
                  </Link>
                </div>

                <div className="grid flex-1 grid-cols-3 gap-5">
                  {(Object.keys(videos) as VideoKey[]).map((key) => {
                    const v = videos[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveVideo(key)}
                        className="group text-left"
                      >
                        <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-brand-navy to-[#101530] ring-1 ring-brand-border/60 transition-shadow duration-200 group-hover:shadow-lg">
                          {v.file && (
                            <video
                              className="h-full w-full object-cover"
                              muted
                              playsInline
                            >
                              <source src={v.file} type="video/mp4" />
                            </video>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-md transition-transform duration-200 group-hover:scale-110">
                              <Play className="ml-0.5 h-4 w-4 fill-brand-navy text-brand-navy" />
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 text-sm font-semibold text-brand-navy group-hover:text-brand-blue">
                          {v.title}
                        </p>
                        <p className="mt-0.5 text-sm text-brand-muted">
                          {v.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Product / Company / Science / Contact: intro + link grid */
              <div className="flex gap-12">
                <div className="w-60 shrink-0 border-r border-brand-border pr-8">
                  <p className="eyebrow mb-3 text-brand-blue">{activeMenu.label}</p>
                  <p className="text-sm leading-relaxed text-brand-muted">
                    {activeMenu.description}
                  </p>
                </div>

                <div className="grid flex-1 grid-cols-2 gap-2">
                  {activeMenu.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setHoveredItem(null)}
                      className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-brand-beige/60"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-border bg-brand-cream text-brand-blue transition-colors group-hover:border-brand-blue/40 group-hover:bg-white">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[15px] font-semibold text-brand-navy transition-colors group-hover:text-brand-blue">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-sm leading-snug text-brand-muted">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------- */}
      {/* Mobile menu                                                 */}
      {/* ---------------------------------------------------------- */}
      {mobileMenuOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-brand-border bg-white lg:hidden">
          <div className="space-y-4 px-6 py-4">
            {menuItems.map((menu) => (
              <div key={menu.label}>
                <button
                  className="flex w-full items-center justify-between font-medium text-brand-navy"
                  onClick={() =>
                    setMobileOpenMenu(
                      mobileOpenMenu === menu.label ? null : menu.label
                    )
                  }
                >
                  <span>{menu.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileOpenMenu === menu.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileOpenMenu === menu.label && (
                  <div className="ml-4 mt-2 space-y-2">
                    {menu.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="py-2">
                          <p className="text-sm font-semibold text-brand-navy">
                            {item.label}
                          </p>
                          <p className="text-xs text-brand-muted">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {directItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block font-medium text-brand-navy hover:text-brand-blue"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="block w-full rounded-xl bg-brand-blue px-6 py-2.5 text-center font-semibold text-white transition-all hover:bg-brand-blue-strong"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book a Demo
            </Link>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------- */}
      {/* Video modal (single component for all three videos)         */}
      {/* ---------------------------------------------------------- */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-navy/90 p-4 backdrop-blur-sm md:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 rounded-full p-2 text-white transition-colors hover:bg-white/10"
              aria-label="Close video"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="overflow-hidden rounded-2xl bg-black shadow-2xl">
              {videos[activeVideo].file ? (
                <video className="h-auto w-full" controls autoPlay playsInline>
                  <source src={videos[activeVideo].file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  className="block aspect-video w-full"
                  src={videos[activeVideo].youtube}
                  title={`FixedGap: ${videos[activeVideo].title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-white">
                {videos[activeVideo].title}
              </h3>
              <p className="mt-1 text-sm text-white/60">
                {videos[activeVideo].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
