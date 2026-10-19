"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import SignalScene from "@/components/SignalScene";
import Scramble from "@/components/Scramble";
import { trackPageView, trackButtonClick } from "@/utils/analytics";

const TENANTTOOL_URL = "https://tenanttool.co.uk/";

const principles = [
  { title: "Useful first", body: "Software that removes real work from real businesses, not features for their own sake." },
  { title: "Built properly", body: "Reliable, secure and maintained for the long term, by people who use it." },
  { title: "Next generation", body: "Modern infrastructure and AI where it genuinely helps, kept out of the way where it does not." },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Home() {
  useEffect(() => {
    trackPageView("Homepage");
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      {/* TenantTool blue wash; SignalScene sets --tt as the section comes into view */}
      <div className="tt-wash fixed inset-0 z-0" aria-hidden="true" />
      {/* 3D scene fixed behind everything */}
      <SignalScene className="fixed inset-0 z-0" />

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 sm:px-8">
        <a href="/" className="transition-colors hover:text-foreground">Joefergraphy Ltd</a>
        <a
          href="/contact"
          className="transition-colors hover:text-foreground"
          onClick={() => trackButtonClick("Header contact link", "Header")}
        >
          Contact
        </a>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">
          <h1 className="font-display text-[11vw] font-medium leading-[0.85] tracking-[-0.06em] sm:text-[8vw] lg:text-[6.5rem]">
            <Scramble text="JOEFERGRAPHY" delay={300} speed={45} />
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.5em] text-foreground/60">
            <Scramble text="Limited" delay={1200} />
          </p>

          <motion.p
            className="mt-10 max-w-sm text-sm leading-relaxed text-foreground/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1.2 }}
          >
            A UK software company building focused tools for property and land.
          </motion.p>

          <motion.a
            href="#vision"
            className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50 transition-colors hover:text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            onClick={() => trackButtonClick("Hero scroll prompt", "Scroll to vision")}
          >
            Scroll
          </motion.a>
        </section>

        {/* Vision: the mesh becomes a computer behind this section */}
        <section id="vision" className="flex min-h-screen items-center justify-center px-4 py-20 text-center sm:px-8">
          <motion.div {...fadeUp} className="legible mx-auto w-full max-w-4xl">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">Our vision</p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium leading-[1.05] sm:text-[2.75rem]">
              Professional, useful SaaS, built on next-generation technology.
            </h2>
            <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {principles.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                >
                  <span className="font-mono text-[11px] text-foreground/45">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-medium">{item.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-foreground/70">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* TenantTool: the mesh becomes a key behind this section */}
        <section id="tenanttool" className="flex min-h-screen items-center justify-center px-4 py-20 text-center sm:px-8">
          <motion.div {...fadeUp} className="legible mx-auto flex w-full max-w-2xl flex-col items-center">
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-tt">
              Our product
              <span className="flex items-center gap-2 text-foreground/60">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live
              </span>
            </p>
            <h2 className="mt-5 font-display text-5xl font-medium sm:text-7xl">
              <Scramble text="TenantTool" onView speed={40} />
            </h2>
            <p className="mt-5 max-w-xl text-base leading-snug text-foreground/90 sm:text-lg">
              Every property, tenancy and deadline, in one workspace.
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/70">
              Property management software for UK landlords, farms and estates.
            </p>
            <a
              href={TENANTTOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center gap-3 bg-tt px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white [text-shadow:none] transition-colors hover:bg-tt-dark"
              onClick={() => trackButtonClick("Visit TenantTool", `External link: ${TENANTTOOL_URL}`)}
            >
              Visit TenantTool
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </section>

        {/* Contact */}
        <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <motion.div {...fadeUp} className="flex flex-col items-center">
            <h2 className="max-w-2xl font-display text-3xl font-medium leading-[1] sm:text-5xl">
              Get in touch.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/60">
              Questions about TenantTool or working with us.
            </p>
            <a
              href="/contact"
              className="group mt-8 inline-flex items-center gap-3 border border-foreground/60 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-black"
              onClick={() => trackButtonClick("Contact us", "Main CTA from homepage")}
            >
              Contact us
              <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-2 px-4 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/35 sm:flex-row sm:px-8">
          <span>&copy; {new Date().getFullYear()} Joefergraphy Limited</span>
          <a href="mailto:contact@joefergraphy.co.uk" className="normal-case tracking-normal transition-colors hover:text-foreground">
            contact@joefergraphy.co.uk
          </a>
        </footer>
      </main>
    </div>
  );
}
