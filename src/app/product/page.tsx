import type { Metadata } from 'next';
import ProductPage from '@/components/pages/ProductPage';

export const metadata: Metadata = {
  title: 'Product | FixedGap',
};

export default function Page() {
  return <ProductPage />;
}
