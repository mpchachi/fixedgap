'use client';

import { Cta, home, PageHero } from '@/components/site/Editorial';
import AwardsBoard from '@/components/home/motion/AwardsBoard';
import { awardPhotos, mentions, press, prizes } from '@/data/awards';

export default function AwardsPage() {
  return (
    <main className={home.page}>
      <PageHero
        kicker="Awards and press"
        title={'Recognised in Madrid\nand Boston.'}
        lead="Three prizes in 2026, five special mentions and three press features."
      />

      <section className={home.section} style={{ paddingTop: 0 }} id="awards">
        <div className={home.shell}>
          <AwardsBoard prizes={prizes} mentions={mentions} press={press} photos={awardPhotos} />
        </div>
      </section>

      <Cta
        title="Evaluate FixedGap with your clinical team"
        text="We are looking for neurologists, rehabilitation clinics and hospitals interested in evaluating the product."
        action="Book a demo"
      />
    </main>
  );
}
