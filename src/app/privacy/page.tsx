import type { Metadata } from "next";
import { SHARE_IMAGE, SITE_URL } from "@/content/services";
import { PageBackdrop, SiteFooter, SiteHeader } from "@/components/SiteChrome";

const title = "Privacy Policy";
const description = "How Joefergraphy Limited collects, uses and protects personal data when you use joefergraphy.co.uk.";
const LAST_UPDATED = "8 November 2026";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/privacy/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/privacy/`,
    title: `${title} | Joefergraphy`,
    description,
    siteName: "Joefergraphy Limited",
    locale: "en_GB",
    images: [SHARE_IMAGE],
  },
  twitter: { card: "summary_large_image", title: `${title} | Joefergraphy`, description, images: [SHARE_IMAGE.url] },
};

const label = "font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45";
const link = "text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground";

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who we are",
    body: (
      <>
        <p>
          This website is run by Joefergraphy Limited, a company registered in England and Wales under company number
          16271607 (&ldquo;we&rdquo;, &ldquo;us&rdquo;). We are the data controller for personal data collected
          through joefergraphy.co.uk, and we are registered with the Information Commissioner&rsquo;s Office under
          registration number ZC278084.
        </p>
        <p>
          For anything relating to this policy or your data, email{" "}
          <a href="mailto:contact@joefergraphy.co.uk" className={link}>contact@joefergraphy.co.uk</a>.
        </p>
      </>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        <p><strong className="font-medium text-foreground">When you contact us.</strong> If you use the contact form or email us, we receive your name, email address, subject, message and the type of enquiry you chose.</p>
        <p>
          <strong className="font-medium text-foreground">When you browse the site.</strong> We do not use analytics,
          tracking or cookies. We do not record which pages you visit or what you click.
        </p>
        <p>
          <strong className="font-medium text-foreground">Hosting.</strong> Our hosting provider may keep standard
          server logs, including IP addresses, for security and to keep the site running.
        </p>
        <p>We do not sell personal data.</p>
      </>
    ),
  },
  {
    heading: "How we use it and why",
    body: (
      <>
        <p>We use contact details only to reply to your enquiry and, if you become a client, to provide the work you have asked for. The lawful basis is our legitimate interest in responding to enquiries, or taking steps at your request before entering into a contract.</p>
        <p>Server logs kept by our hosting provider are used only to keep the site secure and working.</p>
      </>
    ),
  },
  {
    heading: "Who we share it with",
    body: (
      <>
        <p>We share data only with the service providers that help us run the site:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Formspree, which delivers contact form submissions to our inbox.</li>
          <li>GitHub Pages, which hosts this website.</li>
          <li>Our email provider, which stores our correspondence with you.</li>
        </ul>
        <p>
          Some of these providers are based outside the UK, including in the United States. Where data is transferred
          abroad, we rely on the safeguards those providers offer, such as the UK International Data Transfer
          Addendum or the UK-US data bridge.
        </p>
        <p>We may also disclose data where the law requires it.</p>
      </>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <p>
        We keep enquiry emails for as long as needed to deal with your enquiry, and for up to two years afterwards in
        case you get back in touch. If you become a client, we keep records for as long as needed for the work and
        for our legal and accounting obligations, normally six years.
      </p>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        <p>Under UK data protection law you have the right to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>ask for a copy of the personal data we hold about you;</li>
          <li>ask us to correct or delete it;</li>
          <li>object to or ask us to restrict how we use it;</li>
          <li>ask for your data in a portable format.</li>
        </ul>
        <p>
          To exercise any of these, email{" "}
          <a href="mailto:contact@joefergraphy.co.uk" className={link}>contact@joefergraphy.co.uk</a>. We will reply
          within one month.
        </p>
        <p>
          If you are unhappy with how we have handled your data, you can complain to the Information
          Commissioner&rsquo;s Office at{" "}
          <a href="https://ico.org.uk/make-a-complaint/" className={link} rel="noopener noreferrer">ico.org.uk</a>.
        </p>
      </>
    ),
  },
  {
    heading: "Changes to this policy",
    body: <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <PageBackdrop />
      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-3xl px-4 sm:px-8">
        <section className="pb-12 pt-12 sm:pt-20">
          <p className={label}>Legal</p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.02] sm:text-6xl">Privacy policy</h1>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">Last updated {LAST_UPDATED}</p>
        </section>

        {sections.map((s, i) => (
          <section key={s.heading} className="border-t border-foreground/10 py-10">
            <span className="font-mono text-[11px] text-foreground/35">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="mt-2 font-display text-xl font-medium sm:text-2xl">{s.heading}</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/70 sm:text-base">{s.body}</div>
          </section>
        ))}
      </main>

      <SiteFooter />
    </div>
  );
}
