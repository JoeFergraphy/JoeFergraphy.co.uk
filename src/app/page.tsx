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

const offerings = [
  { title: "Internal tools", body: "Dashboards and systems that replace spreadsheets and manual admin." },
  { title: "Client portals", body: "Secure places for customers to log in, see their records and get things done." },
  { title: "Automation", body: "Integrations between the tools you already use, so work moves without copy and paste." },
  { title: "SaaS products", body: "Complete products, from first prototype to launch and beyond." },
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
        <section id="hero" className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">
          {/* Invisible: the mesh draws the wordmark and sizes itself from this heading */}
          <h1
            id="wordmark"
            className="select-none font-display text-[11vw] font-medium leading-[0.85] tracking-[-0.06em] text-transparent sm:text-[8vw] lg:text-[6.5rem]"
          >
            JOEFERGRAPHY
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
            UK software company
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

        {/* TenantTool: the mesh becomes a key in the gap between the two halves */}
        <section id="tenanttool" className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 py-16 text-center sm:px-8">
          <motion.div {...fadeUp} className="legible flex flex-col items-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#a9c9f5]">Our product</p>
            <h2 className="mt-4 bg-linear-to-b from-white from-40% to-[#8fb8ee] bg-clip-text font-display text-6xl font-medium tracking-[-0.05em] text-transparent [text-shadow:none] sm:text-8xl">
              TenantTool
            </h2>
            <p className="mt-3 text-sm text-foreground/75 sm:text-base">Property management for UK landlords.</p>
          </motion.div>

          {/* The key sits here */}
          <div className="h-[30vh] sm:h-[34vh]" aria-hidden="true" />

          <motion.div {...fadeUp}>
            <a
              href={TENANTTOOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-tt px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white shadow-[0_0_40px_-8px_rgba(74,143,231,0.8)] transition-colors hover:bg-tt-dark"
              onClick={() => trackButtonClick("Visit TenantTool", `External link: ${TENANTTOOL_URL}`)}
            >
              Visit TenantTool
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </section>

        {/* Custom software requests */}
        <section id="build" className="flex min-h-screen items-center justify-center px-4 py-24 text-center sm:px-8">
          <motion.div {...fadeUp} className="legible mx-auto w-full max-w-4xl">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">Custom software</p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium leading-[1.05] sm:text-[2.75rem]">
              Need something built?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-foreground/70 sm:text-base">
              We design and build bespoke software for businesses, from internal tools to complete SaaS products.
              Tell us the problem and we will scope the solution.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {offerings.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
                >
                  <h3 className="text-base font-medium">{item.title}</h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-[13px] leading-relaxed text-foreground/65">{item.body}</p>
                </motion.div>
              ))}
            </div>

            <ol className="mx-auto mt-12 flex max-w-2xl flex-col items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 sm:flex-row sm:gap-6">
              {["Tell us what you need", "We scope and quote", "We build and support it"].map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="text-foreground/30">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/contact?enquiry=custom"
                className="group inline-flex items-center gap-3 bg-foreground px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-black [text-shadow:none] transition-colors hover:bg-white/80"
                onClick={() => trackButtonClick("Request custom software", "Custom software section")}
              >
                Request custom software
                <FiArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 border border-foreground/40 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-foreground"
                onClick={() => trackButtonClick("General enquiry", "Custom software section")}
              >
                General enquiry
              </a>
            </div>
          </motion.div>
        </section>

        {/* Closing wordmark: the mesh forms the name again, mirroring the hero */}
        <section id="outro" className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">
          <div
            aria-hidden="true"
            className="select-none font-display text-[11vw] font-medium leading-[0.85] tracking-[-0.06em] text-transparent sm:text-[8vw] lg:text-[6.5rem]"
          >
            JOEFERGRAPHY
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.5em] text-foreground/60">Limited</p>
          <p className="mt-10 max-w-sm text-sm leading-relaxed text-foreground/60">UK software company</p>

          <footer className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-between gap-2 px-4 py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40 sm:flex-row sm:px-8">
            <span>&copy; {new Date().getFullYear()} Joefergraphy Limited</span>
            <a href="mailto:contact@joefergraphy.co.uk" className="normal-case tracking-normal transition-colors hover:text-foreground">
              contact@joefergraphy.co.uk
            </a>
          </footer>
        </section>
      </main>
    </div>
  );
}
