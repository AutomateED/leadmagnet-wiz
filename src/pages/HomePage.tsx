import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

/* ─── PALETTE ─── */
const C = {
  amber: '#E8912A',
  amberDark: '#C4721A',
  ink: '#1A1714',
  textMuted: 'rgba(255,255,255,0.55)',
  textBody: 'rgba(255,255,255,0.65)',
  cardBg: 'rgba(255,255,255,0.05)',
  cardBorder: 'rgba(255,255,255,0.1)',
};

const FONT = "'Outfit', sans-serif";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const ease = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  { icon: '⚡', title: 'Live in under an hour', body: 'Pick your template, upload your logo, set your brand colour, add your questions. That\'s it. No developer, no designer, no complicated setup.' },
  { icon: '🎨', title: 'Fully your brand', body: 'Your logo, your colours, your copy. Every quiz looks like it was built specifically for your business — because it was.' },
  { icon: '🎯', title: 'Your questions, your results', body: 'Customise every question, answer, and result description. The quiz reflects exactly how you work with clients — not a generic template.' },
  { icon: '📥', title: 'Leads delivered automatically', body: 'Every completed quiz sends lead data straight to your CRM via webhook. You see who they are, what result they got, and how to follow up.' },
  { icon: '🔗', title: 'Share it anywhere', body: 'Embed it on your website homepage, drop the link in your Instagram bio, email signature, or LinkedIn profile. One link, works everywhere.' },
  { icon: '🔒', title: 'One payment, no surprises', body: '$97 per quiz. No monthly fees, no hidden costs, no subscription to cancel. Yours to use for as long as you want.' },
];

const TEMPLATES = [
  { name: 'Business Breakthrough Quiz', tagline: "What's Really Holding Your Business Back?", benefit: 'Help clients identify the #1 thing holding their business back', niche: 'For business coaches', href: '/templates/business-breakthrough' },
  { name: 'Mindset Mastery Quiz', tagline: "What's Your Hidden Mindset Block?", benefit: 'Reveal the thinking patterns shaping your clients\' results', niche: 'For life and mindset coaches', href: '/templates/mindset-mastery' },
  { name: 'Leadership Style Quiz', tagline: 'What Kind of Leader Are You?', benefit: 'Show leaders how their style affects their team and outcomes', niche: 'For leadership and executive coaches', href: '/templates/leadership-style' },
  { name: 'Wealth Readiness Quiz', tagline: 'How Ready Are You to Build Real Wealth?', benefit: 'Help clients understand their relationship with money and growth', niche: 'For financial coaches and wealth consultants', href: '/templates/wealth-readiness' },
];

const STEPS = [
  { num: '1', title: 'Choose your quiz template', desc: 'Browse our ready-made templates built for coaches and consultants. Pick the one that fits your niche and audience.' },
  { num: '2', title: 'Pay once — $97 per quiz', desc: 'Complete your one-time $97 payment for the quiz you want. No subscription, no onboarding call. Instant dashboard access.' },
  { num: '3', title: 'Brand it in minutes', desc: 'Upload your logo, set your brand colour, and update your copy. Your quiz looks like yours — not ours.' },
  { num: '4', title: 'Share your link and watch leads come in', desc: 'Paste your unique quiz link anywhere. Every completion sends a warm, qualified lead straight to your inbox and CRM.' },
];

const FAQS = [
  { q: 'Can I change the questions?', a: 'Yes — all of them. Every question, answer option, and result description is editable from your dashboard. The template gives you a starting point, not a constraint.' },
  { q: 'Does it work on my website?', a: 'Yes. You get an embed code to paste onto any website — Squarespace, Wix, WordPress, Kajabi, whatever you use. Or share the standalone link directly.' },
  { q: 'What happens after I buy?', a: 'You\'ll receive your dashboard login immediately after checkout. Log in, pick your template, and follow the setup steps. Most clients are live within the hour.' },
  { q: 'Do I need a developer?', a: 'No. Everything is point-and-click. If you can update a Google Doc, you can set up your quiz.' },
  { q: 'Is there a monthly fee?', a: 'No. $97 one-time payment. No subscription, no renewal, no surprises.' },
  { q: 'What CRMs does it connect to?', a: 'Anything that accepts a webhook — including Zapier, which means it connects to almost every CRM and email tool on the market.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.cardBorder}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left text-base font-semibold transition-colors"
        style={{ color: '#fff', fontFamily: FONT }}
      >
        {q}
        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} style={{ color: C.textMuted }} />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed" style={{ color: C.textBody, fontFamily: FONT }}>
          {a}
        </p>
      )}
    </div>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(26,23,20,0.85)', borderColor: C.cardBorder, fontFamily: FONT }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-[22px] font-bold tracking-tight" style={{ fontFamily: FONT }}>
          <span style={{ color: '#fff' }}>Preta</span><span style={{ color: C.amber }}>Quiz</span>
        </Link>
        <Link to="/login" className="text-sm font-medium transition-colors" style={{ color: C.textMuted }}>Login</Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t py-8" style={{ borderColor: C.cardBorder }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs sm:flex-row" style={{ color: C.textMuted, fontFamily: FONT }}>
        <p>© 2026 Pretaquiz</p>
        <div className="flex gap-5">
          <Link to="/login" className="hover:opacity-80 transition-opacity">Login</Link>
          {/* TODO: add contact email */}
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  useEffect(() => {
    document.title = 'Pretaquiz — Done-for-You Quiz Funnels for Coaches';
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', 'Done-for-you quiz funnels built for coaches, consultants, and service providers. Pick your niche. Customise your quiz. Go live in under an hour.');
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.ink, color: '#fff', scrollBehavior: 'smooth', fontFamily: FONT }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
              <span className="inline-block rounded-full px-4 py-1.5 text-xs font-medium tracking-wide" style={{ backgroundColor: 'rgba(232,145,42,0.15)', color: C.amber, border: '1px solid rgba(232,145,42,0.3)' }}>
                The fastest way to qualify leads online
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp} transition={{ duration: 0.6, ease }}
              className="mt-6 text-4xl font-bold leading-[1.08] md:text-5xl lg:text-[3.25rem]"
            >
              Turn website visitors into{' '}
              <span style={{ color: C.amber }}>qualified leads</span>{' '}
              while you sleep
            </motion.h1>
            <motion.p
              variants={fadeUp} transition={{ duration: 0.6, ease }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed font-light"
              style={{ color: C.textBody }}
            >
              A branded quiz on your site qualifies prospects, grows your list, and sends you warm leads 24/7 — without a discovery call, a tech team, or an hour of your morning gone.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-lg px-8 py-3.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ backgroundColor: C.amber, color: C.ink }}
              >
                Browse quiz templates →
              </button>
              <a
                href="/quiz/business-breakthrough"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-8 py-3.5 text-sm font-medium transition-all hover:bg-white/5"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
              >
                See it in action
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── WHY PRETAQUIZ ─── */}
      <section className="py-20 md:py-28">
        <motion.div className="mx-auto max-w-6xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Everything you need. <span style={{ color: C.amber }}>Nothing you don't.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: C.textBody }}>
              Built for coaches and consultants who want results — not a tech project.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
                className="rounded-xl p-6"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
              >
                <span className="text-2xl">{f.icon}</span>
                <h3 className="mt-3 text-lg font-bold" style={{ color: '#fff' }}>{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: C.textBody }}>{f.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── TEMPLATE GRID ─── */}
      <section id="templates" className="pb-20 md:pb-28">
        <motion.div className="mx-auto max-w-5xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl">
              Choose your <span style={{ color: C.amber }}>quiz template</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: C.textBody }}>
              Each template is ready to brand and launch. Pick the one that fits your audience.
            </p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2">
            {TEMPLATES.map((t) => (
              <motion.div key={t.href} variants={fadeUp} transition={{ duration: 0.6, ease }}>
                <Link
                  to={t.href}
                  className="group block rounded-xl p-6 transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
                >
                  <span className="inline-block rounded-full px-3 py-1 text-[11px] font-medium tracking-wide" style={{ backgroundColor: 'rgba(232,145,42,0.15)', color: C.amber }}>
                    {t.niche}
                  </span>
                  <h3 className="mt-4 text-xl font-bold" style={{ color: '#fff' }}>
                    {t.name}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: C.textBody }}>{t.benefit}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors" style={{ color: C.amber }}>
                    View Template <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 md:py-28">
        <motion.div className="mx-auto max-w-4xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              From purchase to live quiz <span style={{ color: C.amber }}>in under an hour</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: C.textBody }}>
              No tech skills required. No setup calls. Just follow these four steps.
            </p>
          </motion.div>

          <div className="mt-14 space-y-10">
            {STEPS.map((s) => (
              <motion.div key={s.num} variants={fadeUp} transition={{ duration: 0.6, ease }} className="flex gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: C.amber, color: C.ink }}>
                  {s.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#fff' }}>{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: C.textBody }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28">
        <motion.div className="mx-auto max-w-3xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl">
              Questions you <span style={{ color: C.amber }}>probably have</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} style={{ borderTop: `1px solid ${C.cardBorder}` }}>
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
