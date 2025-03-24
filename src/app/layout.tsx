import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  title: 'Joefergraphy Limited | Custom Web Development Solutions',
  description: 'Professional web development solutions for your business. Offering website design, SEO, e-commerce solutions, web applications, UI/UX design, and mobile optimisation.',
  keywords: ['web development', 'website design', 'SEO', 'e-commerce', 'web applications', 'UI/UX design', 'mobile optimisation', 'TwoStopper', 'Alertmove'],
  authors: [{ name: 'Joefergraphy Limited' }],
  creator: 'Joefergraphy Limited',
  publisher: 'Joefergraphy Limited',
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL('https://joefergraphy.co.uk'),
  alternates: {
    canonical: 'https://joefergraphy.co.uk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '120x120', type: 'image/png' },
      { url: '/favicon/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/favicon/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://joefergraphy.co.uk',
    siteName: 'Joefergraphy Limited',
    title: 'Joefergraphy Limited | Custom Web Development Solutions',
    description: 'Professional web development solutions for your business. Offering website design, SEO, e-commerce solutions, web applications, UI/UX design, and mobile optimisation.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Joefergraphy Limited',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joefergraphy Limited | Custom Web Development Solutions',
    description: 'Professional web development solutions for your business. Offering website design, SEO, e-commerce solutions, web applications, UI/UX design, and mobile optimisation.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'IxeybyQjZ_GYb1Fcps4U7lTLggTOcQWQKH-6INdVKGk', // Replace with your actual verification token when available
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="google-site-verification" content="IxeybyQjZ_GYb1Fcps4U7lTLggTOcQWQKH-6INdVKGk" />
        {/* Structured data for business information */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Joefergraphy Limited",
              "url": "https://joefergraphy.co.uk",
              "logo": "https://joefergraphy.co.uk/favicon/JF-512x512.png",
              "description": "Professional web development solutions for your business",
              "sameAs": [
                // Add your social media profiles here when available
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "UK"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
