import type { Metadata } from 'next';
import CompanyPage from '@/components/pages/CompanyPage';

export const metadata: Metadata = {
  title: 'Company | FixedGap',
};

export default function Page() {
  return <CompanyPage />;
}
