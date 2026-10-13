import type { Metadata } from 'next';
import ContactPage from '@/components/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact | FixedGap',
};

export default function Page() {
  return <ContactPage />;
}
