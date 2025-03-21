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
  title: "Joefergraphy Limited",
  description: "Custom web development solutions",
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
