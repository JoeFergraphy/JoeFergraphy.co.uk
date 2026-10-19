import type { Metadata } from "next";
import { processSteps, serviceUrl, services, SITE_URL } from "@/content/services";
import { JsonLd, PageBackdrop, SiteFooter, SiteHeader } from "@/components/SiteChrome";

const title = "Specialist Software Development Services UK";
const description =
  "Specialist software development in the UK: custom software, SaaS products, web applications, automation, AI integration and property software.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "software development UK",
    "specialist software development",
    "software development company UK",
    "bespoke software development UK",
    "UK software developers",
  ],
  alternates: { canonical: `${SITE_URL}/services/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/services/`,
    title: `${title} | Joefergraphy`,
    description,
    siteName: "Joefergraphy Limited",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: `${title} | Joefergraphy`, description },
};

const label = "font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45";

export default function ServicesPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Software development services",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: serviceUrl(s.slug),
        name: s.name,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services/` },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <JsonLd data={structuredData} />
      <PageBackdrop />
      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8">
        <section className="pb-16 pt-12 sm:pt-20">
          <p className={label}>Services</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.02] sm:text-6xl">
            Specialist software development in the UK.
          </h1>
          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
            <p>
              Joefergraphy designs and builds professional, useful software for UK businesses. From bespoke internal
              systems to complete SaaS products, we focus on software that removes real work and keeps running reliably
              long after launch.
            </p>
            <p>
              We also build and run our own product,{" "}
              <a href="https://tenanttool.co.uk/" className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground">
                TenantTool
              </a>
              , so every client project benefits from first-hand experience of operating software in production.
            </p>
          </div>
        </section>

        <section aria-labelledby="all-services" className="border-t border-foreground/10 py-16">
          <h2 id="all-services" className={label}>What we do</h2>
          <div className="mt-8 grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <a key={s.slug} href={`/services/${s.slug}/`} className="group flex flex-col bg-background p-6 transition-colors hover:bg-foreground/[0.03]">
                <span className="font-mono text-[11px] text-foreground/35">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-medium">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/60">{s.summary}</p>
                <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45 group-hover:text-foreground">
                  Learn more &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="process" className="border-t border-foreground/10 py-16">
          <p className={label}>Process</p>
          <h2 id="process" className="mt-3 font-display text-2xl font-medium sm:text-3xl">How every project runs</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <li key={step.title} className="border-t border-foreground/20 pt-5">
                <span className="font-mono text-[11px] text-foreground/35">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-base font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-foreground/10 py-24 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium leading-[1.05] sm:text-5xl">Need something built?</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground/60">
            Tell us the problem and we will scope the solution.
          </p>
          <a
            href="/contact/?enquiry=custom"
            className="mt-8 inline-flex items-center gap-3 bg-foreground px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-white/80"
          >
            Request custom software &rarr;
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
