'use client';

import { useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import home from '@/components/home/SignalHome.module.css';
import page from './Page.module.css';
import SplitText from '@/components/home/motion/SplitText';
import Kicker from '@/components/home/motion/Kicker';
import MagneticLink from '@/components/home/motion/MagneticLink';

export { home, page };

/*
 * A declared visual. `src: null` renders a labelled placeholder that says what
 * image goes there and in which format. To ship an image, drop the file in
 * /public/<page>/ and set `src` to its path. Briefs with prompts live in
 * /public/home/IMAGES.md.
 */
export type Media = {
  src: string | null;
  ratio: string;
  label: string;
  note: string;
};

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Visual({
  item,
  className = '',
  sizes = '100vw',
}: {
  item: Media;
  className?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // The image is 12% taller than its frame and drifts as the frame crosses the viewport.
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <motion.div
      ref={ref}
      className={`${home.visual} ${className}`}
      style={{ aspectRatio: item.ratio }}
      initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
    >
      {item.src ? (
        <motion.div
          className={home.visualInner}
          style={reduce ? undefined : { y }}
          initial={reduce ? false : { scale: 1.18 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-12% 0px' }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={item.src} alt={item.label} fill sizes={sizes} />
        </motion.div>
      ) : (
        <div className={home.visualPlaceholder} aria-label={`Image placeholder: ${item.label}`}>
          <span>{item.label}</span>
          <small>{item.note}</small>
          <em>{item.ratio.replace(/\s/g, '')}</em>
        </div>
      )}
    </motion.div>
  );
}

/* Top of every inner page: kicker, split headline, lead, optional actions. */
export function PageHero({
  kicker,
  title,
  lead,
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className={page.hero}>
      <div className={home.shell}>
        <motion.div
          className={page.heroCopy}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Kicker className={home.kicker} text={kicker} />
          <SplitText as="h1" text={title} onMount delay={0.1} />
          <p className={home.lead}>{lead}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function SectionHead({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className={home.sectionHead}>
      <Kicker className={home.kicker} text={kicker} />
      <SplitText text={title} />
      {lead && <p className={home.sectionLead}>{lead}</p>}
    </Reveal>
  );
}

export function Cta({
  title,
  text,
  action,
  href = '/contact',
}: {
  title: string;
  text: string;
  action: string;
  href?: string;
}) {
  return (
    <section className={home.cta}>
      <div className={home.shell}>
        <Reveal className={home.ctaCopy}>
          <SplitText text={title} />
          <p>{text}</p>
          <div className={home.actions}>
            <MagneticLink className={home.buttonLight} href={href}>
              {action}
            </MagneticLink>
            <a className={home.ctaMail} href="mailto:contact@fixedgap.com">
              contact@fixedgap.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
