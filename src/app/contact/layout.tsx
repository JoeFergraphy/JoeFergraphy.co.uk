import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Joefergraphy Limited',
  description: 'Get in touch with Joefergraphy Limited. Contact us to discuss your web development, SEO, or digital solution needs.',
  keywords: ['contact', 'web development', 'SEO', 'digital solutions', 'get in touch', 'Joefergraphy'],
  openGraph: {
    title: 'Contact Us | Joefergraphy Limited',
    description: 'Get in touch with Joefergraphy Limited. Contact us to discuss your web development, SEO, or digital solution needs.',
    url: 'https://joefergraphy.co.uk/contact',
  },
  twitter: {
    title: 'Contact Us | Joefergraphy Limited',
    description: 'Get in touch with Joefergraphy Limited. Contact us to discuss your web development, SEO, or digital solution needs.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 