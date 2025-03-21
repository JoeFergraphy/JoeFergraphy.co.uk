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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`antialiased ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}
