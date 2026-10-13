'use client';

import Image from 'next/image';
import styles from './Marquee.module.css';

export default function LogoMarquee({
  items,
}: {
  items: Array<{ name: string; logo: string }>;
}) {
  const loop = [...items, ...items];
  return (
    <div className={styles.mask}>
      <div className={styles.track}>
        {loop.map((item, index) => (
          <div className={styles.item} key={`${item.name}-${index}`}>
            <Image
              src={item.logo}
              alt={index < items.length ? item.name : ''}
              width={200}
              height={64}
              aria-hidden={index >= items.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
