// Content for the /services pages. Each entry targets one search intent,
// so keep titles, descriptions and copy distinct from one another.

export interface Service {
  slug: string;
  // <title> and search result headline, kept under ~60 characters
  metaTitle: string;
  // Search result snippet, kept under ~155 characters
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  // Short name used in navigation and cards
  name: string;
  summary: string;
  intro: string[];
  problems: { title: string; body: string }[];
  builds: { title: string; body: string }[];
  stack: string[];
  faqs: { q: string; a: string }[];
  related: string[];
}

export const SITE_URL = "https://joefergraphy.co.uk";

// Pages that set their own openGraph lose the inherited share image, so they pass this explicitly
export const SHARE_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Joefergraphy Limited: gold point-cloud wordmark.",
};

export const services: Service[] = [
  {
    slug: "custom-software-development",
    metaTitle: "Custom Software Development Company UK",
    metaDescription:
      "Specialist custom software development for UK businesses. Bespoke systems designed, built and supported by a UK team that runs its own SaaS in production.",
    keywords: [
      "custom software development UK",
      "bespoke software development",
      "bespoke software company UK",
      "custom software developers",
      "software development company UK",
    ],
    eyebrow: "Custom software development",
    h1: "Bespoke software, built properly, for UK businesses.",
    name: "Custom software development",
    summary: "Bespoke systems shaped around how your business actually works.",
    intro: [
      "Off-the-shelf software is built for the average customer. When your processes are what make you different, forcing them into a generic product costs time every single day. Custom software removes that friction: it does exactly what your team needs, nothing it does not, and it grows with you.",
      "Joefergraphy is a UK software company. We design, build and support bespoke software for businesses that have outgrown spreadsheets, stitched-together tools or legacy systems. We also develop and run our own in-house SaaS products, so we know what it takes to keep real software reliable once people depend on it.",
    ],
    problems: [
      {
        title: "Work lives in spreadsheets",
        body: "Critical data spread across files and inboxes, copied by hand and impossible to report on with confidence.",
      },
      {
        title: "Tools that do not talk to each other",
        body: "Several subscriptions that each solve part of the problem, with people filling the gaps between them.",
      },
      {
        title: "A legacy system holding you back",
        body: "Software that once fitted the business but is now slow, fragile or impossible to change.",
      },
      {
        title: "A process nobody sells",
        body: "Workflows specific to your sector or your way of working that no existing product supports well.",
      },
    ],
    builds: [
      {
        title: "Operations platforms",
        body: "Central systems for jobs, bookings, stock, compliance or field work, replacing a patchwork of tools.",
      },
      {
        title: "Customer and supplier portals",
        body: "Secure, branded places for the people you work with to log in, see their information and act on it.",
      },
      {
        title: "Data and reporting tools",
        body: "Dashboards and reports built on a single source of truth, so decisions rest on numbers you trust.",
      },
      {
        title: "Legacy replacement",
        body: "Careful, staged migration from ageing systems to modern software without stopping the business.",
      },
    ],
    stack: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Cloud hosting", "REST and webhook APIs"],
    faqs: [
      {
        q: "How much does custom software development cost?",
        a: "It depends on scope. A focused internal tool is a very different project from a multi-user platform. We agree the problem and the first useful version with you, then give a clear scope and quote before any work starts.",
      },
      {
        q: "How long does a bespoke software project take?",
        a: "Most projects deliver a first working version in weeks rather than months. We build in stages, so you can use and test the most valuable parts early instead of waiting for everything at once.",
      },
      {
        q: "Do you work with businesses across the UK?",
        a: "Yes. We work with businesses across the UK. Most collaboration happens remotely, with calls and regular demonstrations of progress.",
      },
      {
        q: "What happens after the software is launched?",
        a: "Software needs looking after. We offer ongoing support, maintenance and improvement so your system stays secure, fast and useful as the business changes.",
      },
    ],
    related: ["web-application-development", "business-process-automation", "saas-development"],
  },
  {
    slug: "saas-development",
    metaTitle: "SaaS Development Company UK",
    metaDescription:
      "UK SaaS development company. We design and build subscription software products, from first version to launch, and run our own SaaS in production.",
    keywords: [
      "SaaS development UK",
      "SaaS development company",
      "SaaS product development",
      "build a SaaS product",
      "SaaS developers UK",
    ],
    eyebrow: "SaaS development",
    h1: "SaaS products, built by people who run one.",
    name: "SaaS development",
    summary: "Subscription products taken from idea to paying customers.",
    intro: [
      "Building a SaaS product is more than writing features. Accounts, permissions, billing, onboarding, email, reliability and support all have to work from the first paying customer. Getting those foundations right early is the difference between a product that scales and one that has to be rebuilt.",
      "We develop and operate our own in-house SaaS products. That experience shapes how we build for clients: we design for multiple customers from day one, keep running costs sensible, and make the product easy to change as you learn what your market wants.",
    ],
    problems: [
      {
        title: "An idea without a technical team",
        body: "You understand the market and the problem, but need a partner to design and build the product.",
      },
      {
        title: "A prototype that will not scale",
        body: "An early version that proved demand but was never built to support many customers safely.",
      },
      {
        title: "Turning a service into software",
        body: "Expertise you currently deliver by hand that could become a product customers subscribe to.",
      },
      {
        title: "A product stuck in development",
        body: "Builds that keep slipping because scope is unclear or the foundations keep changing.",
      },
    ],
    builds: [
      {
        title: "Minimum viable products",
        body: "A focused first version that real customers can pay for, built on foundations that will last.",
      },
      {
        title: "Multi-tenant platforms",
        body: "Secure separation of each customer's data, with teams, roles and permissions built in.",
      },
      {
        title: "Subscriptions and billing",
        body: "Plans, trials, payments and invoicing integrated with providers such as Stripe.",
      },
      {
        title: "Admin and analytics",
        body: "Internal tools to support customers, manage accounts and see how the product is used.",
      },
    ],
    stack: ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "Stripe", "Transactional email", "Cloud hosting"],
    faqs: [
      {
        q: "Can you build an MVP for a SaaS idea?",
        a: "Yes. We help you decide what the first version must do to win paying customers, build that well, and leave everything else for later. A good MVP is small, not flimsy.",
      },
      {
        q: "Do you have experience running SaaS in production?",
        a: "Yes. We develop and run our own in-house SaaS products, so we deal with the same questions of reliability, billing and support that your product will face.",
      },
      {
        q: "Can you take over an existing SaaS codebase?",
        a: "Often, yes. We start with a review of the code, hosting and data, then recommend whether to improve what is there or rebuild specific parts.",
      },
      {
        q: "Will the product be able to grow?",
        a: "We design for growth from the start: clean data models, sensible hosting and code that is straightforward to extend, so adding customers and features does not mean starting again.",
      },
    ],
    related: ["custom-software-development", "web-application-development", "ai-integration"],
  },
  {
    slug: "web-application-development",
    metaTitle: "Web Application Development UK",
    metaDescription:
      "Web application development for UK businesses. Fast, secure browser-based software for your team and customers, designed and built by a UK company.",
    keywords: [
      "web application development UK",
      "web app developers UK",
      "web application development company",
      "bespoke web applications",
      "React web application development",
    ],
    eyebrow: "Web application development",
    h1: "Web applications that feel fast and simply work.",
    name: "Web application development",
    summary: "Secure, browser-based software for teams and customers.",
    intro: [
      "A web application runs in the browser on any device, with nothing to install and one version for everyone. For most business software it is the right choice: easy to roll out, easy to update and accessible wherever your team works.",
      "We build web applications with modern, well-supported technology, with a focus on speed, accessibility and security. The result is software people actually enjoy using, which is the most reliable way to make sure it gets used.",
    ],
    problems: [
      {
        title: "Software people avoid",
        body: "Clunky interfaces that slow staff down and push them back to workarounds.",
      },
      {
        title: "Desktop-only systems",
        body: "Tools tied to one office or one machine when your team works on site, at home and on the move.",
      },
      {
        title: "Slow and unreliable pages",
        body: "Applications that lag, time out or break on mobile, frustrating staff and customers alike.",
      },
      {
        title: "Security concerns",
        body: "Uncertainty about how customer data is stored, who can see it and whether the system is kept up to date.",
      },
    ],
    builds: [
      {
        title: "Internal business tools",
        body: "Fast, focused applications for the everyday work of your team.",
      },
      {
        title: "Customer-facing applications",
        body: "Accounts, bookings, quotes and self-service tools for the people you serve.",
      },
      {
        title: "Progressive web apps",
        body: "Installable, mobile-friendly applications without the cost of separate native apps.",
      },
      {
        title: "Dashboards",
        body: "Live views of the numbers that matter, drawn from your existing systems.",
      },
    ],
    stack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "Accessible design"],
    faqs: [
      {
        q: "What is the difference between a website and a web application?",
        a: "A website mainly presents information. A web application lets people do things: log in, manage records, make bookings, run reports. Most business software today is a web application.",
      },
      {
        q: "Will the application work on phones and tablets?",
        a: "Yes. We design responsively from the start, so the same application works well on a desktop in the office and a phone on site.",
      },
      {
        q: "How do you keep web applications secure?",
        a: "We use established authentication, role-based permissions, encrypted connections and careful handling of personal data, and we keep dependencies and hosting up to date after launch.",
      },
      {
        q: "Can you improve an existing web application?",
        a: "Yes. We can review an existing application and improve its speed, design or reliability, or extend it with new features.",
      },
    ],
    related: ["custom-software-development", "saas-development", "business-process-automation"],
  },
  {
    slug: "business-process-automation",
    metaTitle: "Business Process Automation & Integrations UK",
    metaDescription:
      "Business process automation and software integration for UK companies. Connect the tools you already use and remove repetitive manual work.",
    keywords: [
      "business process automation UK",
      "workflow automation UK",
      "software integration services",
      "API integration UK",
      "automate business processes",
    ],
    eyebrow: "Automation and integrations",
    h1: "Automate the work that should not need a person.",
    name: "Automation and integrations",
    summary: "Connect your systems and remove repetitive manual work.",
    intro: [
      "Most businesses already pay for good software. The problem is the gaps between it: re-typing orders, exporting and importing spreadsheets, chasing information between systems. Those small tasks add up to hours every week and are where mistakes creep in.",
      "We connect the tools you already use and automate the repetitive steps between them. Data moves on its own, reports build themselves and people are left with the work that genuinely needs their judgement.",
    ],
    problems: [
      {
        title: "Double data entry",
        body: "The same information typed into two or three systems, with errors when they disagree.",
      },
      {
        title: "Manual reporting",
        body: "Hours spent each month assembling reports from exports and spreadsheets.",
      },
      {
        title: "Missed follow-ups",
        body: "Reminders, renewals and chasers that rely on someone remembering.",
      },
      {
        title: "Disconnected systems",
        body: "Accounts, CRM and operations tools that each hold part of the picture.",
      },
    ],
    builds: [
      {
        title: "System integrations",
        body: "Reliable connections between accounting, CRM, e-commerce and operations software using their APIs.",
      },
      {
        title: "Automated workflows",
        body: "Rules that act on events: new orders, signed documents, expiring certificates, overdue invoices.",
      },
      {
        title: "Document processing",
        body: "Incoming invoices, forms and certificates read, filed and recorded automatically.",
      },
      {
        title: "Scheduled reporting",
        body: "Reports and summaries generated and delivered on a schedule, without anyone pressing a button.",
      },
    ],
    stack: ["REST APIs", "Webhooks", "Xero", "Stripe", "Microsoft 365", "Google Workspace", "Node.js", "PostgreSQL"],
    faqs: [
      {
        q: "Which systems can you integrate?",
        a: "Any system with an API can usually be connected, which covers most modern accounting, CRM, payments and productivity tools. We check what is possible with your specific software before quoting.",
      },
      {
        q: "Is automation worth it for a small business?",
        a: "Often more so. Small teams feel the cost of repetitive admin most. A single well-chosen automation can save hours every week.",
      },
      {
        q: "What happens if an automated process fails?",
        a: "We build in logging and alerts, so failures are noticed and handled rather than silently lost, and processes can be retried safely.",
      },
      {
        q: "Do we need to replace our current software?",
        a: "Usually not. Integration works with the tools you already have, which is often the quickest and most cost-effective improvement.",
      },
    ],
    related: ["ai-integration", "custom-software-development", "web-application-development"],
  },
  {
    slug: "ai-integration",
    metaTitle: "AI Integration & AI Software Development UK",
    metaDescription:
      "Practical AI integration for UK businesses. We add AI features to software where they save real time, built securely on your own data.",
    keywords: [
      "AI integration UK",
      "AI software development UK",
      "AI development company UK",
      "business AI solutions",
      "AI automation for business",
    ],
    eyebrow: "AI integration",
    h1: "AI that does useful work, not demos.",
    name: "AI integration",
    summary: "Practical AI features built into the software you rely on.",
    intro: [
      "Modern AI models are genuinely good at reading documents, drafting text, answering questions and pulling structure out of messy information. Used well, they remove hours of work. Used badly, they produce confident mistakes. The difference is in how they are built into your software.",
      "We add AI where it earns its place: grounded in your own records, with clear limits, and checked by people where it matters. We use AI features in our own in-house SaaS products, so we build them with production experience behind us.",
    ],
    problems: [
      {
        title: "Information buried in documents",
        body: "Contracts, invoices and certificates that someone has to read to find a date or a figure.",
      },
      {
        title: "Questions that need digging",
        body: "Answers that exist in your systems but take time to find and piece together.",
      },
      {
        title: "Repetitive writing",
        body: "Emails, summaries and reports that follow a pattern but are still written from scratch.",
      },
      {
        title: "Uncertainty about where to start",
        body: "Interest in AI, but no clear view of which uses are worthwhile and safe for your business.",
      },
    ],
    builds: [
      {
        title: "Document understanding",
        body: "Extracting dates, amounts and key details from uploaded documents into structured records.",
      },
      {
        title: "Assistants on your data",
        body: "Question-and-answer tools that respond from your own records, with sources you can check.",
      },
      {
        title: "Drafting and summarising",
        body: "First drafts of emails, notes and reports for a person to review and send.",
      },
      {
        title: "Classification and triage",
        body: "Sorting incoming requests, enquiries and documents so they reach the right place.",
      },
    ],
    stack: ["Large language models", "Retrieval on your own data", "TypeScript", "Node.js", "PostgreSQL", "Secure cloud hosting"],
    faqs: [
      {
        q: "Is our data safe when using AI?",
        a: "We design AI features so your data is handled through business-grade services under appropriate terms, only the information needed is sent, and access follows the same permissions as the rest of your software.",
      },
      {
        q: "Will AI replace our staff?",
        a: "The best results come from AI handling repetitive reading, sorting and drafting, while people make the decisions. It is a tool that gives your team time back.",
      },
      {
        q: "How do you stop AI making things up?",
        a: "We ground answers in your own records, show where information came from, and keep a person in the loop for anything consequential.",
      },
      {
        q: "Can AI be added to software we already have?",
        a: "Often, yes. If your existing system has an API or a database we can work with, AI features can usually be added alongside it.",
      },
    ],
    related: ["business-process-automation", "saas-development", "custom-software-development"],
  },
  {
    slug: "property-software-development",
    metaTitle: "Property & PropTech Software Development UK",
    metaDescription:
      "Specialist property software development in the UK. Bespoke PropTech for landlords, letting agents and estates, from a team that runs its own property SaaS.",
    keywords: [
      "property software development UK",
      "PropTech development UK",
      "bespoke property management software",
      "landlord software development",
      "estate management software",
    ],
    eyebrow: "Property software development",
    h1: "Specialist property software for landlords, agents and estates.",
    name: "Property software development",
    summary: "Specialist PropTech for landlords, agents and estates.",
    intro: [
      "Property is full of dates, documents and obligations: gas safety, electrical and energy certificates, deposits, tenancies, notices and repairs. Generic software rarely handles the detail, and the cost of missing something is high.",
      "We develop and run our own in-house property management SaaS, so we know this sector's requirements in depth. We use that experience to build bespoke property software for organisations whose needs go beyond an off-the-shelf product.",
    ],
    problems: [
      {
        title: "Compliance tracked by hand",
        body: "Certificate expiry dates and legal deadlines kept in spreadsheets and calendars.",
      },
      {
        title: "Mixed portfolios",
        body: "Residential, commercial, land and licences managed in different places or not at all.",
      },
      {
        title: "Maintenance without oversight",
        body: "Repairs, contractors and spending that are hard to track across many properties.",
      },
      {
        title: "Software that does not fit",
        body: "Products built for letting agents that do not suit estates, farms or private landlords.",
      },
    ],
    builds: [
      {
        title: "Portfolio and compliance systems",
        body: "Properties, tenancies, certificates and deadlines in one place, with reminders before anything lapses.",
      },
      {
        title: "Tenant and owner portals",
        body: "Self-service access for tenants, landlords and owners to documents, requests and statements.",
      },
      {
        title: "Estate and land management",
        body: "Records for rural land, licences, cottages and commercial units that mainstream tools overlook.",
      },
      {
        title: "Integrations",
        body: "Connections to accounting, payments and calendars so information flows without re-keying.",
      },
    ],
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Xero", "Stripe", "Calendar sync", "Document processing"],
    faqs: [
      {
        q: "Should we buy off-the-shelf software or have something built?",
        a: "If an existing product genuinely fits your portfolio, it is often the quickest option. If you need something specific to your organisation, we can build bespoke software or extend what you already use.",
      },
      {
        q: "Do you understand UK property compliance?",
        a: "Yes. Building our own property SaaS meant working through UK requirements around safety certificates, deposits, tenancies and notice periods in detail.",
      },
      {
        q: "Can you build software for letting agents?",
        a: "Yes. We build for landlords, letting and managing agents, estates and property businesses with requirements that standard products do not meet.",
      },
      {
        q: "Can you connect to our accounting software?",
        a: "Yes. We regularly integrate with accounting and payments software, including Xero and Stripe, to avoid duplicate entry.",
      },
    ],
    related: ["custom-software-development", "saas-development", "business-process-automation"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const serviceUrl = (slug: string) => `${SITE_URL}/services/${slug}/`;

export const processSteps = [
  {
    title: "Discovery",
    body: "We learn how your business works today, where time is lost and what success looks like.",
  },
  {
    title: "Scope and quote",
    body: "A clear written scope, a first version worth building and a quote before any work starts.",
  },
  {
    title: "Build in stages",
    body: "Working software early and often, with regular demonstrations so you can steer as we go.",
  },
  {
    title: "Launch and support",
    body: "Careful launch, training where needed, and ongoing maintenance and improvement.",
  },
];
