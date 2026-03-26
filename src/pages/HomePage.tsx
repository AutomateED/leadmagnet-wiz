import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Zap, Palette, Target, Inbox, Link2, Lock } from 'lucide-react';

/* ─── PALETTE ─── */
const C = {
  pageBg: '#0F0A1E',
  sectionBg: '#160E28',
  cardBg: '#201538',
  cardBorder: '#2D1A4A',
  accent: '#D946EF',
  cta: '#F020B0',
  headline: '#FFFFFF',
  subheading: 'rgba(255,255,255,0.92)',
  body: 'rgba(255,255,255,0.85)',
  supporting: 'rgba(255,255,255,0.75)',
  footnote: 'rgba(255,255,255,0.70)',
};

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const ease = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  { icon: Zap, title: 'Live in under an hour', body: 'Pick your template, upload your logo, set your brand colour, add your questions. That\'s it. No developer, no designer, no complicated setup.' },
  { icon: Palette, title: 'Fully your brand', body: 'Your logo, your colours, your copy. Every quiz looks like it was built specifically for your business — because it was.' },
  { icon: Target, title: 'Your questions, your results', body: 'Customise every question, answer, and result description. The quiz reflects exactly how you work with clients — not a generic template.' },
  { icon: Inbox, title: 'Leads delivered automatically', body: 'Every completed quiz sends lead data straight to your CRM via webhook. You see who they are, what result they got, and how to follow up.' },
  { icon: Link2, title: 'Share it anywhere', body: 'Grab your unique quiz link or copy the embed code and paste it onto your website. Two options, both ready to go.' },
  { icon: Lock, title: 'One payment, no surprises', body: '$97 per quiz. No monthly fees, no hidden costs, no subscription to cancel. Yours to use for as long as you want.' },
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
  { q: 'What happens after I buy?', a: 'You\'ll receive your dashboard login immediately after checkout. Log in and follow the setup steps. Most clients are live within the hour.' },
  { q: 'Do I need a developer?', a: 'No. Everything is point-and-click. If you can update a Google Doc, you can set up your quiz.' },
  { q: 'Is there a monthly fee?', a: 'No. Each quiz is a $97 one-time payment. No subscription, no renewal, no surprises.' },
  { q: 'What CRMs does it connect to?', a: 'Anything that accepts a webhook — including Zapier, which means it connects to almost every CRM and email tool on the market.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.cardBorder}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left text-base font-semibold transition-colors"
        style={{ color: C.headline }}
      >
        {q}
        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} style={{ color: C.footnote }} />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed" style={{ color: C.body }}>
          {a}
        </p>
      )}
    </div>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(15,10,30,0.85)', borderColor: C.cardBorder }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-[22px] font-bold tracking-tight">
          <span style={{ color: '#fff' }}>Preta</span><span style={{ color: C.accent }}>Quiz</span>
        </Link>
        <Link to="/login" className="rounded-lg px-6 py-2.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]" style={{ backgroundColor: C.cta, color: '#FFFFFF' }}>Login</Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t py-8" style={{ borderColor: C.cardBorder }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs sm:flex-row" style={{ color: C.footnote }}>
        <p>&copy; 2026 Pretaquiz</p>
        <div className="flex gap-5">
          <Link to="/terms" className="hover:opacity-80 transition-opacity">Terms</Link>
          <Link to="/privacy" className="hover:opacity-80 transition-opacity">Privacy</Link>
          <Link to="/contact" className="hover:opacity-80 transition-opacity">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  useEffect(() => {
    document.title = 'PretaQuiz — Build Your Own Quiz Funnel in Under an Hour';
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', 'Done-for-you quiz funnels built for coaches, consultants, and service providers. Pick your niche. Customise your quiz. Go live in under an hour.');
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.pageBg, color: '#fff', scrollBehavior: 'smooth' }}>
      <style>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 4px 1px rgba(217,70,239,0.15), 0 0 10px 2px rgba(217,70,239,0.05); }
          50% { box-shadow: 0 0 9px 3px rgba(240,32,176,0.25), 0 0 20px 6px rgba(217,70,239,0.10); }
          100% { box-shadow: 0 0 4px 1px rgba(217,70,239,0.15), 0 0 10px 2px rgba(217,70,239,0.05); }
        }
      `}</style>
      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
              <span className="inline-block rounded-full px-5 py-2 text-sm font-semibold tracking-widest uppercase" style={{ backgroundColor: 'rgba(217,70,239,0.2)', color: '#E879F9', border: '1px solid rgba(217,70,239,0.5)', boxShadow: '0 0 20px rgba(217,70,239,0.15)' }}>
                The fastest way to qualify leads online
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp} transition={{ duration: 0.6, ease }}
              className="mt-6 text-4xl font-bold leading-[1.08] md:text-5xl lg:text-[3.25rem]"
              style={{ color: C.headline }}
            >
              Your website gets visitors.
              <br />
              <span style={{ color: '#F020B0' }}>Are any of them becoming leads?</span>
            </motion.h1>
            <motion.div
              variants={stagger}
              className="mx-auto mt-10 grid max-w-2xl grid-cols-[1fr_auto_1fr] items-center gap-x-4 gap-y-6"
            >
              {/* Their side */}
              <motion.div variants={fadeUp} transition={{ duration: 0.5, ease }} className="text-right">
                <p className="text-sm font-semibold" style={{ color: '#E879F9' }}>Your visitor</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: C.body }}>Takes a short quiz and gets a personalised result.</p>
              </motion.div>

              {/* Arrow */}
              <motion.div variants={fadeUp} transition={{ duration: 0.5, ease }} className="flex flex-col items-center gap-1">
                <motion.div
                  className="h-8 w-px"
                  style={{ backgroundColor: 'rgba(217,70,239,0.4)' }}
                  animate={{ scaleY: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.svg
                  width="20" height="20" viewBox="0 0 20 20" fill="none" className="rotate-90"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="#D946EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
                <motion.div
                  className="h-8 w-px"
                  style={{ backgroundColor: 'rgba(217,70,239,0.4)' }}
                  animate={{ scaleY: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
              </motion.div>

              {/* You side */}
              <motion.div variants={fadeUp} transition={{ duration: 0.5, ease }} className="text-left">
                <p className="text-sm font-semibold" style={{ color: '#E879F9' }}>You</p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: C.body }}>Get their name, email, and exactly what they need.</p>
              </motion.div>

              {/* Bottom tagline spanning full width */}
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5, ease }}
                className="col-span-3 text-center text-sm font-medium tracking-wide"
                style={{ color: C.body }}
              >
                No tech skills. No monthly fees. Live in under an hour.
              </motion.p>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-8 flex items-center justify-center" style={{ flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <a
                href="/quiz/demo-business-breakthrough"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ backgroundColor: '#F020B0', color: '#FFFFFF', padding: '16px 48px', fontSize: '16px', fontWeight: '700', letterSpacing: '0.1em' }}
              >
                SEE IT IN ACTION
              </a>
              <button
                onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-lg transition-all hover:bg-white/5 active:scale-[0.97]"
                style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.90)', padding: '12px 32px', fontSize: '14px' }}
              >
                Browse quiz templates &rarr;
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── WHY PRETAQUIZ ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.sectionBg }}>
        <motion.div className="mx-auto max-w-6xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: C.headline }}>
              Everything you need. <span style={{ color: C.accent }}>Nothing you don't.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: C.body }}>
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
                <f.icon className="h-6 w-6" style={{ color: C.accent }} />
                <h3 className="mt-3 text-lg font-bold" style={{ color: C.headline }}>{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: C.supporting }}>{f.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── TEMPLATE GRID ─── */}
      <section id="templates" className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <motion.div className="mx-auto max-w-5xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: C.headline }}>
              Choose your <span style={{ color: C.accent }}>quiz template</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: C.body }}>
              Each template is ready to brand and launch. Pick the one that fits your audience.
            </p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2">
            {TEMPLATES.map((t) => (
              <motion.div key={t.href} variants={fadeUp} transition={{ duration: 0.6, ease }}>
                <Link
                  to={t.href}
                  className="group block rounded-xl p-6 transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}`, animation: 'pulseGlow 3s ease-in-out infinite' }}
                >
                  <span className="inline-block rounded-full px-3 py-1 text-[11px] font-medium tracking-wide" style={{ backgroundColor: 'rgba(217,70,239,0.15)', color: C.accent, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.1em', fontWeight: '700' }}>
                    {t.niche}
                  </span>
                  <h3 className="mt-4 text-xl font-bold" style={{ color: C.headline }}>
                    {t.name}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: C.supporting }}>{t.benefit}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors" style={{ color: C.accent }}>
                    View Template <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.sectionBg }}>
        <motion.div className="mx-auto max-w-4xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: C.headline }}>
              From purchase to live quiz <span style={{ color: C.accent }}>in under an hour</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: C.body }}>
              No tech skills required. No setup calls. Just follow these four steps.
            </p>
          </motion.div>

          <div className="mt-14 space-y-10">
            {STEPS.map((s) => (
              <motion.div key={s.num} variants={fadeUp} transition={{ duration: 0.6, ease }} className="flex gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: C.cta, color: '#FFFFFF' }}>
                  {s.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: C.headline }}>{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: C.body }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <motion.div className="mx-auto max-w-3xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-center mb-12">
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: C.headline }}>
              Questions you <span style={{ color: C.accent }}>probably have</span>
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