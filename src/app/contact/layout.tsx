import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Joefergraphy about custom software development, SaaS products or TenantTool. UK software company.',
  keywords: ['contact', 'Joefergraphy', 'TenantTool'],
  alternates: {
    canonical: 'https://joefergraphy.co.uk/contact/',
  },
  openGraph: {
    title: 'Contact Us | Joefergraphy Limited',
    description: 'Contact Joefergraphy about custom software development, SaaS products or TenantTool. UK software company.',
    url: 'https://joefergraphy.co.uk/contact/',
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
    description: 'Contact Joefergraphy about custom software development, SaaS products or TenantTool. UK software company.',
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
            "description": "Contact Joefergraphy about custom software development, SaaS products or TenantTool. UK software company.",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://joefergraphy.co.uk/contact/"
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