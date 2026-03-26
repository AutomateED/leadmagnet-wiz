import { useEffect } from 'react';
import { Check, CircleOff, MessageSquareX, Users, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const BRAND = '#C9A96E';

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ─── NAV ─── */
function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-lg font-semibold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          Preta<span style={{ color: BRAND }}>Quiz</span>
        </span>
        <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Login
        </Link>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 inline-block rounded-full border px-3 py-1 text-xs font-medium tracking-wide"
              style={{ borderColor: BRAND, color: BRAND }}
            >
              Quiz Template for Business Coaches
            </motion.span>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-4xl font-semibold leading-[1.08] md:text-5xl lg:text-[3.25rem]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Turn Website Visitors Into Qualified Leads — Automatically
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              A ready-made quiz funnel you customise yourself — helping your prospects self-identify their biggest challenge — so you can follow up with the right message, every time.
            </motion.p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo('demo')}
                className="rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all hover:shadow-soft active:scale-[0.97]"
                style={{ borderColor: BRAND, color: BRAND }}
              >
                See It In Action
              </button>
              <a
                href="https://buy.stripe.com/8x28wO0Yj3Jg6OfdCj0gw00"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lift active:scale-[0.97] inline-block"
                style={{ backgroundColor: BRAND }}
              >
                Activate Your Quiz — $97
              </a>
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative w-[280px] rounded-[2rem] border-[6px] border-foreground/10 bg-white p-5 shadow-lift">
              <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-foreground/10" />
              <p className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">Your Coaching Co.</p>
              <h3
                className="mt-4 text-lg font-semibold leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                What's Really Holding Your Business Back?
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Answer 7 quick questions and discover exactly what's standing between you and the business you want.
              </p>
              <p className="mt-2 text-[10px] text-muted-foreground">⏱ Takes about 2 minutes</p>
              <div
                className="mt-5 rounded-full py-2.5 text-center text-xs font-semibold text-white"
                style={{ backgroundColor: BRAND }}
              >
                Find Out Now →
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEM ─── */
const PAINS = [
  { icon: MessageSquareX, title: "Generic contact forms don\u2019t tell you anything about the prospect" },
  { icon: Users, title: 'Discovery calls with unqualified leads waste your time' },
  { icon: CircleOff, title: 'You have no way to segment or personalise your follow-up' },
];

function Problem() {
  return (
    <section className="bg-secondary/50 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-4xl px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-semibold md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your Ideal Clients Are Visiting Your Website… Then Leaving
        </motion.h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PAINS.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-border bg-card p-6 text-left shadow-soft"
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: 'rgba(201,169,110,0.1)' }}
              >
                <p.icon className="h-5 w-5" style={{ color: BRAND }} />
              </div>
              <p className="text-sm leading-relaxed text-foreground">{p.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── HOW IT WORKS ─── */
const STEPS = [
  { num: '1', title: 'You set up your quiz', desc: 'Log in, add your branding, customise the questions and results. Takes about 30 minutes.' },
  { num: '2', title: 'Prospects take your quiz', desc: 'They answer 7 quick questions and get a personalised result — while you capture their name and email.' },
  { num: '3', title: 'Leads flow into your CRM', desc: 'Every lead is delivered automatically via webhook to your CRM, tagged with their result type. Ready for your follow-up.' },
];

function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-4xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-3xl font-semibold md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Here's How It Works
        </motion.h2>

        <div className="mt-14 space-y-10">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-5"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: BRAND }}
              >
                {s.num}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── WHAT'S INCLUDED ─── */
const FEATURES = [
  { title: '7 Research-Backed Questions', desc: 'Written by marketing experts to qualify leads based on their biggest business challenge.' },
  { title: '4 Personalised Result Types', desc: 'Each prospect gets a tailored result: The Invisible Expert, The Overwhelmed Operator, The Confident Starter, or The Plateau Breaker.' },
  { title: "Your Branding, Your Colours", desc: "Upload your logo, set your brand colour, choose your font. The quiz looks like it\u2019s yours." },
  { title: 'Direct Link + Embed Code', desc: 'Share anywhere — social media, email, your website. Works on every device.' },
  { title: 'Instant CRM Integration', desc: 'Connect Zapier, GoHighLevel, HubSpot, or any tool with a webhook URL.' },
  { title: 'Self-Serve Dashboard', desc: 'Change anything, anytime. No tech skills needed.' },
];

function Included() {
  return (
    <section className="bg-secondary/50 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-5xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-3xl font-semibold md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          What You Get
        </motion.h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-border bg-card p-6 shadow-soft"
            >
              <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ─── DEMO ─── */
function Demo() {
  return (
    <section id="demo" className="py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-3xl px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-semibold md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          See It In Action
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 text-muted-foreground"
        >
          This is exactly what your prospects will experience.
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-10 w-full max-w-[420px]"
        >
          <div className="overflow-hidden rounded-[2rem] border-[6px] border-foreground/10 shadow-lift">
            <iframe
              src="/quiz/elevate-coaching"
              title="Quiz demo"
              className="h-[750px] w-full border-0"
              loading="lazy"
            />
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Try it yourself — answer the questions and see how it feels.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── PRICING ─── */
const PRICING_FEATURES = [
  'Your branded quiz — live in under 30 minutes',
  'Unlimited quiz responses',
  'Automatic lead delivery to your CRM',
  'Self-serve dashboard — edit anytime',
  'Direct link + website embed code',
  'Ongoing platform updates and support',
];

function Pricing() {
  return (
    <section id="pricing" className="bg-secondary/50 py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-3xl font-semibold md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Simple, Transparent Pricing
        </motion.h2>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-lift"
        >
          <div className="p-8 text-center">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
              style={{ backgroundColor: 'rgba(201,169,110,0.12)', color: BRAND }}
            >
              Founding Member Price
            </span>

            <p className="mt-6 text-5xl font-bold tracking-tight text-foreground">$97</p>
            <p className="mt-1 text-sm text-muted-foreground">one-time payment</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Everything you need to turn your website into a lead-generation machine.
            </p>
          </div>

          <div className="border-t border-border px-8 py-6">
            <ul className="space-y-3">
              {PRICING_FEATURES.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: BRAND }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="px-8 pb-8">
            <a
              href="https://buy.stripe.com/8x28wO0Yj3Jg6OfdCj0gw00"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full py-3.5 text-center text-sm font-semibold text-white transition-all hover:shadow-lift active:scale-[0.97]"
              style={{ backgroundColor: BRAND }}
            >
              Activate Your Quiz
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              No tech skills required. One-time payment, no subscriptions.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── FAQ ─── */
const FAQS = [
  { q: 'Do I need any technical skills?', a: 'Not at all. If you can fill in a form, you can set up your quiz. Our dashboard walks you through every step.' },
  { q: 'Can I customise the questions?', a: 'Yes — every question and answer can be edited to match your voice and your audience.' },
  { q: 'How do leads get to my CRM?', a: 'You paste your webhook URL (from Zapier, GoHighLevel, HubSpot, etc.) into the dashboard. Leads are sent automatically the moment someone completes your quiz.' },
  { q: 'Can I embed the quiz on my website?', a: 'Yes. You get a direct link to share anywhere AND an embed code you can paste into any website builder — WordPress, Wix, Squarespace, Kajabi, and more.' },
  { q: 'What if I want to cancel?', a: 'Cancel anytime from your dashboard. No contracts, no hassle.' },
  { q: "Is there a free trial?", a: "No \u2014 but you\u2019ll have your quiz live and generating leads within 30 minutes of signing up." },
];

function Faq() {
  return (
    <section className="py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-2xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-3xl font-semibold md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Questions?
        </motion.h2>

        <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="mt-10">
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-5 shadow-soft">
                <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-muted-foreground sm:flex-row">
        <p>© 2026 PretaQuiz</p>
        <div className="flex gap-5">
          <Link to="/login" className="hover:text-foreground transition-colors">Login</Link>
          <a href="mailto:support@pretaquiz.com" className="hover:text-foreground transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function TemplatePage() {
  const SEO_TITLE = 'Business Breakthrough Quiz Template — PretaQuiz';
  const SEO_DESC = 'A done-for-you quiz funnel for business coaches. Turn website visitors into qualified leads automatically with 7 research-backed questions.';
  const SEO_IMG = 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/45cd991d-87d0-43e3-84ef-767da62af006/id-preview-c18e55ad--f2697c19-1ce9-49a6-b5d0-459e19ee7557.lovable.app-1773989886043.png';
  const SEO_URL = 'https://pretaquiz.com/templates/business-breakthrough';

  useEffect(() => {
    const prev = document.title;
    document.title = SEO_TITLE;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', SEO_DESC);
    setMeta('property', 'og:title', SEO_TITLE);
    setMeta('property', 'og:description', SEO_DESC);
    setMeta('property', 'og:image', SEO_IMG);
    setMeta('property', 'og:url', SEO_URL);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', SEO_TITLE);
    setMeta('name', 'twitter:description', SEO_DESC);
    setMeta('name', 'twitter:image', SEO_IMG);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = SEO_URL;

    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ scrollBehavior: 'smooth' }}>
      <Nav />
      <Hero />
      <Problem />
      <HowItWorks />
      <Included />
      <Demo />
      <Pricing />
      <Faq />
      <Footer />
    </div>
  );
}
