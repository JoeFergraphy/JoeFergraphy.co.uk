import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, processSteps, serviceUrl, services, SHARE_IMAGE, SITE_URL } from "@/content/services";
import { JsonLd, PageBackdrop, SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const url = serviceUrl(service.slug);
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${service.metaTitle} | Joefergraphy`,
      description: service.metaDescription,
      siteName: "Joefergraphy Limited",
      locale: "en_GB",
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.metaTitle} | Joefergraphy`,
      description: service.metaDescription,
      images: [SHARE_IMAGE.url],
    },
  };
}

const label = "font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45";

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const url = serviceUrl(service.slug);
  const related = service.related.map(getService).filter((s) => s !== undefined);

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.metaDescription,
      url,
      areaServed: { "@type": "Country", name: "United Kingdom" },
      provider: {
        "@type": "Organization",
        name: "Joefergraphy Limited",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services/` },
        { "@type": "ListItem", position: 3, name: service.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <JsonLd data={structuredData} />
      <PageBackdrop />
      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8">
        {/* Intro */}
        <section className="pb-20 pt-12 sm:pt-20">
          <nav aria-label="Breadcrumb" className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40">
            <ol className="flex flex-wrap items-center gap-2">
              <li><a href="/" className="hover:text-foreground">Home</a></li>
              <li aria-hidden="true">/</li>
              <li><a href="/services/" className="hover:text-foreground">Services</a></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground/70">{service.name}</li>
            </ol>
          </nav>
          <p className={`mt-10 ${label}`}>{service.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.02] sm:text-6xl">{service.h1}</h1>
          <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
            {service.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="/contact/?enquiry=custom"
              className="inline-flex items-center justify-center gap-3 bg-foreground px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-white/80"
            >
              Discuss your project &rarr;
            </a>
            <a href="/services/" className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground">
              All services
            </a>
          </div>
        </section>

        {/* Problems */}
        <section className="border-t border-foreground/10 py-16" aria-labelledby="problems">
          <p className={label}>Where it helps</p>
          <h2 id="problems" className="mt-3 font-display text-2xl font-medium sm:text-3xl">Problems we solve</h2>
          <div className="mt-10 grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2">
            {service.problems.map((item) => (
              <div key={item.title} className="bg-background p-6">
                <h3 className="text-base font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What we build */}
        <section className="border-t border-foreground/10 py-16" aria-labelledby="builds">
          <p className={label}>Capabilities</p>
          <h2 id="builds" className="mt-3 font-display text-2xl font-medium sm:text-3xl">What we build</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {service.builds.map((item, i) => (
              <div key={item.title} className="flex gap-5">
                <span className="font-mono text-[11px] text-foreground/35">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-base font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="border-t border-foreground/10 py-16" aria-labelledby="process">
          <p className={label}>Process</p>
          <h2 id="process" className="mt-3 font-display text-2xl font-medium sm:text-3xl">How we work</h2>
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

        {/* Why us */}
        <section className="border-t border-foreground/10 py-16" aria-labelledby="why">
          <p className={label}>Why Joefergraphy</p>
          <h2 id="why" className="mt-3 font-display text-2xl font-medium sm:text-3xl">Built by a team that ships its own software</h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            <div>
              <h3 className="text-base font-medium">We run a SaaS in production</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                We develop and operate our own in-house SaaS products, so we design for the realities of live software:
                reliability, security and support.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">UK based</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                A UK company working in your time zone, with direct contact with the people building your software.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Built to last</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                Modern, widely supported technology and clean code, so your software is straightforward to maintain and extend.
              </p>
            </div>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Technology">
            {service.stack.map((tech) => (
              <li key={tech} className="border border-foreground/15 px-3 py-1 font-mono text-[11px] text-foreground/60">
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQs */}
        <section className="border-t border-foreground/10 py-16" aria-labelledby="faqs">
          <p className={label}>FAQs</p>
          <h2 id="faqs" className="mt-3 font-display text-2xl font-medium sm:text-3xl">Common questions</h2>
          <div className="mt-8 divide-y divide-foreground/10 border-y border-foreground/10">
            {service.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium">
                  {f.q}
                  <span aria-hidden="true" className="font-mono text-foreground/40 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/65">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="border-t border-foreground/10 py-16" aria-labelledby="related">
          <p className={label}>Related services</p>
          <h2 id="related" className="sr-only">Related services</h2>
          <div className="mt-6 grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-3">
            {related.map((r) => (
              <a key={r.slug} href={`/services/${r.slug}/`} className="group bg-background p-6 transition-colors hover:bg-foreground/[0.03]">
                <h3 className="text-base font-medium">{r.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/55">{r.summary}</p>
                <span className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45 group-hover:text-foreground">
                  Learn more &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-foreground/10 py-24 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium leading-[1.05] sm:text-5xl">Tell us what you need built.</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-foreground/60">
            Describe the problem and we will come back with questions or a proposed approach and a quote.
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
