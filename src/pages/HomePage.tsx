import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, Zap, Palette, Target, Inbox, Link2, Lock, Check, Clock, Shield, X, ArrowDown } from 'lucide-react';

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

const CHECKOUT_URL = 'https://sgllwxhabdhjldhpnnsg.supabase.co/functions/v1/create-checkout';

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ─── NICHE EXAMPLES WITH DISTINCT COLOURS ─── */
const NICHE_EXAMPLES = [
  {
    niche: 'Business coaches',
    colour: '#C9A96E',
    title: "What's Really Holding Your Business Back?",
    sampleQ: 'Where are you in your business right now?',
    result: 'The Invisible Expert',
    snippet: 'Your offer is strong but the right people aren\'t finding you yet.',
  },
  {
    niche: 'Mindset coaches',
    colour: '#7C3AED',
    title: "What's Your Hidden Mindset Block?",
    sampleQ: "When something doesn't go to plan, what's your first instinct?",
    result: 'The Analyser',
    snippet: 'You seek certainty before you act, which can keep you in preparation mode.',
  },
  {
    niche: 'Leadership coaches',
    colour: '#0EA5E9',
    title: 'What Kind of Leader Are You?',
    sampleQ: 'When your team faces a difficult decision, what do you typically do?',
    result: 'The Decisive Driver',
    snippet: 'You move fast and set clear direction. Teams respect your confidence.',
  },
  {
    niche: 'Financial coaches',
    colour: '#10B981',
    title: 'Are You Ready to Build Real Wealth?',
    sampleQ: "When an unexpected expense comes up, what's your honest reaction?",
    result: 'The Cautious Saver',
    snippet: 'You\'re disciplined and risk-aware but your caution may cost you growth.',
  },
  {
    niche: 'Health coaches',
    colour: '#F97316',
    title: "What's Your Wellness Blind Spot?",
    sampleQ: 'How do you typically handle a stressful week?',
    result: 'The Overachiever',
    snippet: 'You push through everything, but your body is keeping score.',
  },
  {
    niche: 'Relationship coaches',
    colour: '#EC4899',
    title: 'What\'s Your Relationship Pattern?',
    sampleQ: 'When conflict comes up in a relationship, what do you do first?',
    result: 'The Peacekeeper',
    snippet: 'You avoid confrontation to keep the peace, but it builds resentment.',
  },
  {
    niche: 'Career coaches',
    colour: '#6366F1',
    title: 'What\'s Blocking Your Next Career Move?',
    sampleQ: 'When you think about your career, what frustrates you most?',
    result: 'The Golden Handcuffs',
    snippet: 'You\'re comfortable but unfulfilled. The safety is the trap.',
  },
  {
    niche: 'HR consultants',
    colour: '#14B8A6',
    title: 'How Healthy Is Your Team Culture?',
    sampleQ: 'How does your team handle disagreements?',
    result: 'Surface Harmony',
    snippet: 'Things look calm but real issues aren\'t being addressed.',
  },
];

const FEATURES = [
  { icon: Zap, title: 'Live in under an hour', body: 'Pay once, log in, upload your logo, set your brand colour, write your questions. No developer, no designer, no complicated setup.' },
  { icon: Palette, title: 'Fully your brand', body: 'Your logo, your colours, your copy. Every quiz looks like it was built specifically for your business.' },
  { icon: Target, title: 'Your questions, your results', body: 'Customise every question, answer, and result description. The quiz reflects exactly how you work with clients.' },
  { icon: Inbox, title: 'Leads delivered automatically', body: 'Every completed quiz sends lead data straight to your CRM via webhook. You see who they are, what result they got, and how to follow up.' },
  { icon: Link2, title: 'Share it anywhere', body: 'Grab your unique quiz link or copy the embed code and paste it onto your website. Two options, both ready to go.' },
  { icon: Lock, title: 'One payment, no surprises', body: '$97 per quiz. No monthly fees, no hidden costs, no subscription to cancel. Yours to use for as long as you want.' },
];

const STEPS = [
  { num: '01', title: 'Activate your quiz', desc: 'One payment, instant dashboard access. No calls, no waiting.', time: '2 min' },
  { num: '02', title: 'Make it yours', desc: 'Upload your logo, set your brand colour, write your questions and results. The dashboard walks you through it.', time: '~45 min' },
  { num: '03', title: 'Share your link', desc: 'Drop it in your email signature, Instagram bio, LinkedIn, or embed it directly on your website.', time: '5 min' },
  { num: '04', title: 'Leads arrive automatically', desc: 'Every prospect gets a personalised result. You get their details and a warm lead in your CRM.', time: 'Ongoing' },
];

const PRICING_FEATURES = [
  'Fully branded quiz with your logo, colours, and copy',
  'Personalised results email sent to every prospect',
  'Automatic lead delivery to your CRM via webhook',
  'All leads visible in your dashboard',
  'Embed on your site or share as a standalone link',
  'Edit questions, results, and branding any time',
  'No tech skills required, ever',
];

const FAQS = [
  { q: 'What kind of quiz do I get?', a: 'A personality-style quiz with 4 result types. You write every question, answer, and result description yourself through a simple dashboard. The quiz captures your prospect\'s name, email, and result, then delivers it to your CRM automatically.' },
  { q: 'Can I change everything?', a: 'Everything. Questions, answers, result descriptions, your CTA, branding, colours, logo, and the copy your prospects see. You start with a ready-made structure and make it yours.' },
  { q: 'Does it work on my website?', a: 'Yes. You get an embed code to paste onto any website, whether that is Squarespace, Wix, WordPress, Kajabi, or anything else. Or share the standalone link directly.' },
  { q: 'What happens after I buy?', a: 'You receive a magic link email to set your password and access your dashboard. Log in and follow the setup checklist. Most clients are live within the hour.' },
  { q: 'Do I need a developer?', a: 'No. Everything is point-and-click. If you can update a Google Doc, you can set up your quiz.' },
  { q: 'Is there a monthly fee?', a: 'No. $97 one-time payment. No subscription, no renewal, no surprises.' },
  { q: 'What CRMs does it connect to?', a: 'Anything that accepts a webhook, which includes Zapier. That means it connects to almost every CRM and email tool on the market.' },
];

function hexToRgba(hex: string, opacity: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.cardBorder}` }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors"
      >
        <span className="text-[15px] font-semibold pr-4" style={{ color: C.headline }}>{q}</span>
        <span
          className="shrink-0 text-lg font-light transition-transform duration-200"
          style={{ color: C.footnote, transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed" style={{ color: C.body }}>{a}</p>
      )}
    </div>
  );
}

function ScarcityBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mt-5 w-full max-w-xs mx-auto">
      <div className="flex justify-between text-xs font-medium mb-1.5">
        <span style={{ color: C.footnote }}>Founding member spots</span>
        <span style={{ color: C.cta }}>14 of 20 taken</span>
      </div>
      <div className="h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: C.cardBorder }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: C.cta }}
          initial={{ width: 0 }}
          animate={inView ? { width: '68%' } : { width: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function Nav({ onCheckout, loading }: { onCheckout: () => void; loading: boolean }) {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(15,10,30,0.85)', borderColor: C.cardBorder }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <Link to="/" className="text-[22px] font-bold tracking-tight">
            <span style={{ color: '#fff' }}>Preta</span><span style={{ color: C.accent }}>Quiz</span>
          </Link>
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: 'rgba(217,70,239,0.2)', color: '#E879F9', border: '1px solid rgba(217,70,239,0.4)' }}>Beta</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:inline-block text-sm font-medium transition-opacity hover:opacity-80" style={{ color: C.supporting }}>Login</Link>
          <button
            onClick={onCheckout}
            disabled={loading}
            className="rounded-lg px-5 py-2 text-sm font-bold transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-60"
            style={{ backgroundColor: C.cta, color: '#FFFFFF' }}
          >
            {loading ? 'Redirecting...' : 'Activate \u2014 $97'}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t py-8" style={{ borderColor: C.cardBorder }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs sm:flex-row" style={{ color: C.footnote }}>
        <p>&copy; 2026 PretaQuiz</p>
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
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    document.title = 'PretaQuiz \u2014 Your Quiz Funnel, Live in Under an Hour';
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', 'A branded lead-generation quiz for coaches, consultants, and service providers. Customise every question and result. Live in under an hour. $97 one-time.');

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', '@id': 'https://pretaquiz.com/#organization', name: 'PretaQuiz', url: 'https://pretaquiz.com', description: 'A branded lead-generation quiz for coaches, consultants, and service providers.' },
        { '@type': 'WebSite', '@id': 'https://pretaquiz.com/#website', url: 'https://pretaquiz.com', name: 'PretaQuiz', publisher: { '@id': 'https://pretaquiz.com/#organization' } },
        { '@type': 'WebPage', '@id': 'https://pretaquiz.com/#webpage', url: 'https://pretaquiz.com', name: 'PretaQuiz \u2014 Your Quiz Funnel, Live in Under an Hour', description: 'A branded lead-generation quiz for coaches, consultants, and service providers.', isPartOf: { '@id': 'https://pretaquiz.com/#website' } },
        { '@type': 'SoftwareApplication', name: 'PretaQuiz', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '97', priceCurrency: 'USD', priceValidUntil: '2027-12-31' }, description: 'Branded quiz funnel for coaches and consultants. Customise questions, results, and branding. Live in under an hour.' },
      ],
    };
    let scriptEl = document.querySelector('script[data-jsonld="homepage"]') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.setAttribute('data-jsonld', 'homepage');
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(jsonLd);
    return () => { scriptEl?.remove(); };
  }, []);

  const handleCheckout = async () => {
    if (checkoutLoading) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch(CHECKOUT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned', data);
        setCheckoutLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.pageBg, color: '#fff', scrollBehavior: 'smooth' }}>
      <Nav onCheckout={handleCheckout} loading={checkoutLoading} />

      {/* ════════════════════ HERO ════════════════════ */}
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
            <motion.p
              variants={fadeUp} transition={{ duration: 0.6, ease }}
              className="mx-auto mt-6 max-w-xl text-lg leading-relaxed"
              style={{ color: C.body }}
            >
              Your prospects take a short branded quiz. They get a personalised result.
              You get their name, email, and exactly what they need help with. Automatically.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-8 flex items-center justify-center flex-col gap-3">
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="rounded-lg transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-60"
                style={{ backgroundColor: '#F020B0', color: '#FFFFFF', padding: '16px 48px', fontSize: '16px', fontWeight: '700', letterSpacing: '0.1em' }}
              >
                {checkoutLoading ? 'REDIRECTING...' : 'ACTIVATE MY QUIZ \u2014 $97'}
              </button>
              <a
                href="/quiz/demo-business-breakthrough"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg transition-all hover:bg-white/5 active:scale-[0.97]"
                style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.90)', padding: '12px 32px', fontSize: '14px' }}
              >
                Try the demo quiz &rarr;
              </a>
            </motion.div>
            <motion.div
              variants={fadeUp} transition={{ duration: 0.6, ease }}
              className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs"
              style={{ color: C.footnote }}
            >
              <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> Live in under an hour</span>
              <span className="flex items-center gap-1.5"><Shield className="h-3 w-3" /> One payment, no subscription</span>
              <span className="flex items-center gap-1.5"><Zap className="h-3 w-3" /> No developer needed</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ THE PROBLEM ════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.sectionBg }}>
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-3xl font-bold md:text-4xl" style={{ color: C.headline }}>
              Your website is busy. <span style={{ color: C.accent }}>Your inbox isn't.</span>
            </motion.h2>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { before: 'A contact form', after: '"Hi, I\'m interested." You know nothing about them.' },
              { before: 'A PDF download', after: 'You got an email address. No idea if they\'re a fit.' },
              { before: 'A discovery call', after: '40 minutes to find out they can\'t afford you.' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                className="rounded-xl p-5"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <X className="h-4 w-4" style={{ color: '#EF4444' }} />
                  <span className="text-sm font-semibold" style={{ color: C.headline }}>{card.before}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: C.supporting }}>{card.after}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 py-2">
              <ArrowDown className="h-4 w-4" style={{ color: C.accent }} />
              <span className="text-sm font-semibold" style={{ color: C.accent }}>What if every lead arrived pre-qualified?</span>
              <ArrowDown className="h-4 w-4" style={{ color: C.accent }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ FEATURES ════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <motion.div className="mx-auto max-w-6xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: C.headline }}>
              Everything you need. <span style={{ color: C.accent }}>Nothing you don't.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: C.body }}>
              Built for coaches and consultants who want results, not a tech project.
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

      {/* ════════════════════ NICHE EXAMPLES (COLOURED) ════════════════════ */}
      <section id="niches" className="py-20 md:py-28" style={{ backgroundColor: C.sectionBg }}>
        <motion.div className="mx-auto max-w-6xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-center mb-14">
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: C.headline }}>
              One quiz. <span style={{ color: C.accent }}>Any coaching niche.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base" style={{ color: C.body }}>
              You get a flexible quiz structure and make it completely yours. Here's how coaches across different niches use it:
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NICHE_EXAMPLES.map((ex, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5, ease }}
                className="rounded-xl p-5 group transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: C.cardBg,
                  border: `1px solid ${hexToRgba(ex.colour, 0.25)}`,
                  boxShadow: `0 0 0 0 ${hexToRgba(ex.colour, 0)}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = hexToRgba(ex.colour, 0.5);
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${hexToRgba(ex.colour, 0.15)}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = hexToRgba(ex.colour, 0.25);
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${hexToRgba(ex.colour, 0)}`;
                }}
              >
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] mb-3 px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: hexToRgba(ex.colour, 0.12), color: ex.colour }}
                >
                  {ex.niche}
                </span>
                <h3 className="text-sm font-bold leading-snug mb-2" style={{ color: C.headline }}>
                  "{ex.title}"
                </h3>
                <div className="space-y-2">
                  <p className="text-xs leading-relaxed" style={{ color: C.supporting }}>
                    <span className="font-semibold" style={{ color: ex.colour }}>Q:</span> {ex.sampleQ}
                  </p>
                  <div
                    className="rounded-lg px-3 py-2"
                    style={{ backgroundColor: hexToRgba(ex.colour, 0.06), border: `1px solid ${hexToRgba(ex.colour, 0.12)}` }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: ex.colour }}>
                      {ex.result}
                    </p>
                    <p className="text-[11px] leading-relaxed" style={{ color: C.supporting }}>
                      {ex.snippet}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-center mt-8 text-sm"
            style={{ color: C.footnote }}
          >
            If you work with people, the quiz works for you.
          </motion.p>
        </motion.div>
      </section>

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <motion.div className="mx-auto max-w-4xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: C.headline }}>
              From purchase to live quiz <span style={{ color: C.accent }}>in under an hour</span>
            </h2>
          </motion.div>
          <div className="mt-14 relative">
            <div className="absolute left-5 top-0 bottom-0 w-px hidden md:block" style={{ backgroundColor: C.cardBorder }} />
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp} transition={{ duration: 0.6, ease }}
                className="relative flex gap-5 mb-10 last:mb-0 md:pl-2"
              >
                <div
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tracking-wider"
                  style={{ backgroundColor: C.cardBg, border: `2px solid ${C.accent}`, color: C.accent }}
                >
                  {s.num}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold" style={{ color: C.headline }}>{s.title}</h3>
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: 'rgba(217,70,239,0.12)', color: C.accent }}>{s.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: C.body }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ════════════════════ SOCIAL PROOF ════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.sectionBg }}>
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-3xl font-bold md:text-4xl" style={{ color: C.headline }}>
              Coaches are <span style={{ color: C.accent }}>already using it</span>
            </motion.h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { quote: "I set it up in an afternoon and had my first lead come through the same evening. The quality is so much better. They already know their result before we even speak.", name: 'Sarah C.', role: 'Business Growth Coach' },
              { quote: "I've tried quiz tools before but they were either too complicated or looked terrible on mobile. This was done in an hour and it looks like my brand, not some template.", name: 'Marcus R.', role: 'Leadership Consultant' },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp} transition={{ duration: 0.6, ease }}
                className="rounded-xl p-6"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
              >
                <p className="text-sm leading-relaxed italic" style={{ color: C.supporting }}>"{t.quote}"</p>
                <div className="mt-4">
                  <p className="text-sm font-bold" style={{ color: C.accent }}>{t.name}</p>
                  <p className="text-xs" style={{ color: C.footnote }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ PRICING ════════════════════ */}
      <section id="pricing" className="py-20 md:py-28 relative" style={{ backgroundColor: C.pageBg }}>
        <div
          className="pointer-events-none absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(240,32,176,0.08) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 mx-auto max-w-md px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: C.cardBg,
              border: `1px solid ${C.cardBorder}`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            <div className="p-8 text-center">
              <span className="inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide" style={{ backgroundColor: C.cta, color: '#FFFFFF' }}>
                Founding Member
              </span>
              <h3 className="mt-5 text-lg font-bold" style={{ color: C.headline }}>Your branded quiz funnel</h3>
              <p className="mt-1 text-sm" style={{ color: C.body }}>One payment. Fully customisable. Yours to keep.</p>
              <p className="mt-4 text-base line-through" style={{ color: C.footnote }}>$197</p>
              <p className="mt-1 text-[52px] font-bold tracking-tight" style={{ color: C.headline }}>$97</p>
              <p className="mt-1 text-sm" style={{ color: C.body }}>one-time payment</p>
            </div>
            <div className="px-8 py-6" style={{ borderTop: `1px solid ${C.cardBorder}` }}>
              <ul className="space-y-3">
                {PRICING_FEATURES.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: C.supporting }}>
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: C.accent }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-8 pb-8">
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="block w-full rounded-lg py-3.5 text-center text-sm font-bold transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-60"
                style={{ backgroundColor: C.cta, color: '#FFFFFF' }}
              >
                {checkoutLoading ? 'Redirecting...' : 'Activate my quiz \u2014 $97'}
              </button>
              <ScarcityBar />
              <p className="mt-4 text-center text-xs" style={{ color: C.footnote }}>
                Secure checkout &middot; One-time payment &middot; No subscription
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════ FAQ ════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.sectionBg }}>
        <div className="mx-auto max-w-2xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center text-3xl font-bold md:text-4xl mb-12"
            style={{ color: C.headline }}
          >
            Questions you <span style={{ color: C.accent }}>probably have</span>
          </motion.h2>
          <div style={{ borderTop: `1px solid ${C.cardBorder}` }}>
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ FINAL CTA ════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <motion.div
          className="mx-auto max-w-3xl px-6 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-3xl font-bold md:text-4xl" style={{ color: C.headline }}>
            Stop losing leads to a <span style={{ color: C.accent }}>silent website</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-4 text-base leading-relaxed" style={{ color: C.body }}>
            Pay once. Get your quiz live today. No subscription, no hidden fees. Just a quiz that qualifies leads for you 24/7.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="mt-8 rounded-lg px-8 py-3.5 text-sm font-bold transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-60"
              style={{ backgroundColor: C.cta, color: '#FFFFFF' }}
            >
              {checkoutLoading ? 'Redirecting...' : 'Activate my quiz \u2014 $97'}
            </button>
            <p className="mt-3 text-xs" style={{ color: C.footnote }}>
              $97 one-time &middot; Secure checkout &middot; No subscription
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
