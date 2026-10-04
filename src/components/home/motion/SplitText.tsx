'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
 * Splits the text into words, masks each one and slides it up.
 * `onMount` plays immediately (hero); otherwise it plays once on scroll.
 */
export default function SplitText({
  as: Tag = 'h2',
  text,
  className = '',
  onMount = false,
  delay = 0,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'p';
  text: string;
  className?: string;
  onMount?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>('[data-word]');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: 'expo.out',
          stagger: 0.045,
          ...(onMount ? {} : { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }),
        },
      );
    }, el);
    return () => ctx.revert();
  }, [onMount, delay]);

  const lines = text.split('\n');

  const Heading = Tag as 'h2';

  return (
    <Heading ref={ref} className={className} aria-label={text.replace('\n', ' ')}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }} aria-hidden="true">
          {line.split(' ').map((word, wi) => (
            <span
              key={`${li}-${wi}`}
              style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.08em', marginBottom: '-0.08em' }}
            >
              <span data-word style={{ display: 'inline-block', willChange: 'transform' }}>
                {word}
              </span>
              {wi < line.split(' ').length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </span>
      ))}
    </Heading>
  );
}
