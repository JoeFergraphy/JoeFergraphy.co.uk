import { services } from "@/content/services";

// Header and footer for the content pages. Server-rendered so every link is crawlable.

export function SiteHeader() {
  return (
    <header className="relative z-40 flex items-center justify-between px-4 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 sm:px-8">
      <a href="/" className="transition-colors hover:text-foreground">Joefergraphy Ltd</a>
      <nav aria-label="Main" className="flex items-center gap-6">
        <a href="/services/" className="transition-colors hover:text-foreground">Services</a>
        <a href="/contact/" className="transition-colors hover:text-foreground">Contact</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-foreground/10 px-4 pb-8 pt-12 sm:px-8">
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-medium">Joefergraphy Limited</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-foreground/55">
            UK software company. Specialist software development and makers of TenantTool.
          </p>
        </div>
        <nav aria-label="Services">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">Services</p>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`/services/${s.slug}/`} className="text-foreground/65 transition-colors hover:text-foreground">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="https://tenanttool.co.uk/" className="text-foreground/65 transition-colors hover:text-foreground">TenantTool</a>
            </li>
            <li>
              <a href="/contact/?enquiry=custom" className="text-foreground/65 transition-colors hover:text-foreground">Request custom software</a>
            </li>
            <li>
              <a href="mailto:contact@joefergraphy.co.uk" className="text-foreground/65 transition-colors hover:text-foreground">
                contact@joefergraphy.co.uk
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-5xl font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35">
        &copy; {new Date().getFullYear()} Joefergraphy Limited
      </p>
    </footer>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Faint grid and glow behind content pages, in place of the homepage's 3D scene
export function PageBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(120,150,255,0.12),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
    </div>
  );
}
