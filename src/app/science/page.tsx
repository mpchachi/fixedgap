import type { Metadata } from 'next';
import SciencePage from '@/components/pages/SciencePage';

export const metadata: Metadata = {
  title: 'Science | FixedGap',
};

export default function Page() {
  return <SciencePage />;
}
