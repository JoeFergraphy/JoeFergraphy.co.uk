import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Joefergraphy Limited',
  description: 'Get in touch with Joefergraphy Limited. Contact us to discuss your web development, SEO, or digital solution needs.',
  keywords: ['contact', 'web development', 'SEO', 'digital solutions', 'get in touch', 'Joefergraphy'],
  alternates: {
    canonical: 'https://joefergraphy.co.uk/contact',
  },
  openGraph: {
    title: 'Contact Us | Joefergraphy Limited',
    description: 'Get in touch with Joefergraphy Limited. Contact us to discuss your web development, SEO, or digital solution needs.',
    url: 'https://joefergraphy.co.uk/contact',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Joefergraphy Limited - Contact Us',
      }
    ],
  },
  twitter: {
    title: 'Contact Us | Joefergraphy Limited',
    description: 'Get in touch with Joefergraphy Limited. Contact us to discuss your web development, SEO, or digital solution needs.',
    images: ['/og-image.jpg'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Schema.org markup for contact page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Joefergraphy Limited",
            "description": "Get in touch with Joefergraphy Limited. Contact us to discuss your web development, SEO, or digital solution needs.",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://joefergraphy.co.uk/contact"
            },
            "provider": {
              "@type": "Organization",
              "name": "Joefergraphy Limited",
              "url": "https://joefergraphy.co.uk"
            }
          })
        }}
      />
      {children}
    </>
  );
} 