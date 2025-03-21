import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ['400', '500', '600', '700', '800'],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Joefergraphy Limited | Custom Web Development Solutions",
  description: "Professional web development solutions for your business. Offering website design, SEO, e-commerce solutions, web applications, UI/UX design, and mobile optimisation.",
  keywords: ["web development", "website design", "SEO", "e-commerce", "web applications", "UI/UX design", "mobile optimisation", "TwoStopper", "Alertmove"],
  authors: [{ name: "Joefergraphy Limited" }],
  creator: "Joefergraphy Limited",
  publisher: "Joefergraphy Limited",
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
    title: "Joefergraphy Limited | Custom Web Development Solutions",
    description: "Professional web development solutions for your business. Offering website design, SEO, e-commerce solutions, web applications, UI/UX design, and mobile optimisation.",
    url: "https://joefergraphy.co.uk",
    siteName: "Joefergraphy Limited",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Joefergraphy Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joefergraphy Limited | Custom Web Development Solutions",
    description: "Professional web development solutions for your business. Offering website design, SEO, e-commerce solutions, web applications, UI/UX design, and mobile optimisation.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1",
  alternates: {
    canonical: "https://joefergraphy.co.uk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
