import type { Metadata } from 'next';
import AwardsPage from '@/components/pages/AwardsPage';

export const metadata: Metadata = {
  title: 'Awards and press | FixedGap',
};

export default function Page() {
  return <AwardsPage />;
}
