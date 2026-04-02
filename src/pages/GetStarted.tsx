import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Check, ArrowRight, ArrowDown, Zap, Shield, Clock, Inbox, X } from 'lucide-react';

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

/* ─── NICHE EXAMPLES ─── */
const NICHE_EXAMPLES = [
  {
    niche: 'Business coach',
    quizTitle: "What's Really Holding Your Business Back?",
    sampleQ: 'Where are you in your business right now?',
    sampleResult: 'The Invisible Expert',
    resultSnippet: 'Your offer is strong but the right people aren\'t finding you yet.',
  },
  {
    niche: 'Mindset coach',
    quizTitle: "What's Your Hidden Mindset Block?",
    sampleQ: "When something doesn't go to plan, what's your first instinct?",
    sampleResult: 'The Analyser',
    resultSnippet: 'You seek certainty before you act. This protects you but can keep you in preparation mode.',
  },
  {
    niche: 'Leadership coach',
    quizTitle: 'What Kind of Leader Are You?',
    sampleQ: 'When your team faces a difficult decision, what do you typically do?',
    sampleResult: 'The Decisive Driver',
    resultSnippet: 'You move fast and set clear direction. Teams respect your confidence.',
  },
  {
    niche: 'Financial coach',
    quizTitle: 'Are You Ready to Build Real Wealth?',
    sampleQ: "When an unexpected expense comes up, what's your honest reaction?",
    sampleResult: 'The Cautious Saver',
    resultSnippet: 'You\'re disciplined and risk-aware but your caution may be costing you growth.',
  },
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
  { q: 'Can I see a demo first?', a: 'Yes. There\'s a live demo quiz on this page you can take right now to see exactly what your prospects will experience.' },
];

/* ─── ANIMATIONS ─── */
const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay: index * 0.04 }}
      style={{ borderBottom: `1px solid ${C.cardBorder}` }}
    >
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
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm leading-relaxed" style={{ color: C.body }}>
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── SCARCITY BAR ─── */
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

/* ─── NAV ─── */
function Nav() {
  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b"
      style={{ backgroundColor: 'rgba(15,10,30,0.85)', borderColor: C.cardBorder }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-[22px] font-bold tracking-tight">
          <span style={{ color: '#fff' }}>Preta</span>
          <span style={{ color: C.accent }}>Quiz</span>
        </Link>
        <div className="flex items-center gap-4">
          <span
            className="hidden sm:inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide"
            style={{
              backgroundColor: 'rgba(217,70,239,0.15)',
              color: C.accent,
              border: '1px solid rgba(217,70,239,0.3)',
            }}
          >
            Founding Member Offer
          </span>
          <Link
            to="/login"
            className="rounded-lg px-5 py-2 text-sm font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: 'rgba(217,70,239,0.15)',
              color: '#FFFFFF',
              border: '1px solid rgba(217,70,239,0.3)',
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t py-8" style={{ borderColor: C.cardBorder }}>
      <div
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs sm:flex-row"
        style={{ color: C.footnote }}
      >
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

/* ─── PAGE ─── */
export default function GetStarted() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [activeNiche, setActiveNiche] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.97]);

  useEffect(() => {
    document.title = 'Get Started with PretaQuiz — Your Quiz Funnel, Live in Under an Hour';
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', 'A branded lead-generation quiz for coaches and consultants. Customise every question, result, and CTA. $97 one-time. No developer needed.');

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'PretaQuiz',
      description: 'A branded lead-generation quiz for coaches and consultants. Customise every question, result, and CTA. $97 one-time.',
      brand: { '@type': 'Organization', name: 'PretaQuiz' },
      url: 'https://pretaquiz.com/get-started',
      offers: {
        '@type': 'Offer',
        price: '97',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2027-12-31',
      },
    };
    let scriptEl = document.querySelector('script[data-jsonld="get-started"]') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.setAttribute('data-jsonld', 'get-started');
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(jsonLd);
    return () => { scriptEl?.remove(); };
  }, []);

  // Auto-rotate niche examples
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNiche((prev) => (prev + 1) % NICHE_EXAMPLES.length);
    }, 4000);
    return () => clearInterval(interval);
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

  const ex = NICHE_EXAMPLES[activeNiche];

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.pageBg, color: '#fff' }}>
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(-15%, 5%); }
          70% { transform: translate(7%, -5%); }
          90% { transform: translate(-10%, 15%); }
        }
        .grain::after {
          content: '';
          position: absolute;
          inset: -50%;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 128px;
          animation: grain 8s steps(10) infinite;
          pointer-events: none;
          opacity: 0.5;
        }
      `}</style>
      <Nav />

      {/* ════════════════════ HERO ════════════════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 grain"
      >
        {/* Gradient orb */}
        <div
          className="pointer-events-none absolute top-[-20%] left-[50%] -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, rgba(217,70,239,0.12) 0%, rgba(240,32,176,0.06) 40%, transparent 70%)` }}
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            {/* Left: copy */}
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease }}
                className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
                style={{ color: C.accent }}
              >
                For coaches and consultants
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.1 }}
                className="text-[2.5rem] md:text-[3.2rem] font-bold leading-[1.06] tracking-tight"
                style={{ color: C.headline }}
              >
                A quiz funnel that
                <br />
                <span style={{ color: C.cta }}>works while you sleep</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.2 }}
                className="mt-6 text-lg leading-relaxed max-w-lg"
                style={{ color: C.body }}
              >
                Your prospects take a short branded quiz. They get a personalised result.
                You get their name, email, and exactly what they need help with. Automatically.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="rounded-lg px-7 py-3.5 text-sm font-bold transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-60"
                  style={{ backgroundColor: C.cta, color: '#FFFFFF' }}
                >
                  {checkoutLoading ? 'Redirecting...' : 'Activate my quiz \u2014 $97'}
                </button>
                <a
                  href="/quiz/demo-business-breakthrough"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-6 py-3.5 text-sm font-semibold transition-all hover:bg-white/5 active:scale-[0.97]"
                  style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.90)' }}
                >
                  Try the demo quiz
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-xs"
                style={{ color: C.footnote }}
              >
                <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> Live in under an hour</span>
                <span className="flex items-center gap-1.5"><Shield className="h-3 w-3" /> One payment, no subscription</span>
                <span className="flex items-center gap-1.5"><Zap className="h-3 w-3" /> No developer needed</span>
              </motion.div>
            </div>

            {/* Right: live niche carousel in a phone frame */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.25 }}
              className="flex justify-center"
            >
              <div className="relative w-[300px]">
                {/* Phone frame */}
                <div
                  className="rounded-[2rem] border-[5px] p-6 shadow-2xl overflow-hidden"
                  style={{
                    borderColor: C.cardBorder,
                    backgroundColor: C.cardBg,
                    boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 40px rgba(217,70,239,0.08)',
                  }}
                >
                  <div className="mx-auto mb-5 h-1 w-12 rounded-full" style={{ backgroundColor: C.cardBorder }} />

                  {/* Niche label */}
                  <motion.span
                    key={`niche-${activeNiche}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.4, ease }}
                    className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase mb-3"
                    style={{ color: C.accent }}
                  >
                    {ex.niche}
                  </motion.span>

                  <motion.h3
                    key={`title-${activeNiche}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="text-[17px] font-bold leading-snug mb-3"
                    style={{ color: C.headline }}
                  >
                    {ex.quizTitle}
                  </motion.h3>

                  <motion.div
                    key={`content-${activeNiche}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease, delay: 0.1 }}
                  >
                    <p className="text-[11px] mb-1" style={{ color: C.footnote }}>Sample question</p>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: C.body }}>{ex.sampleQ}</p>

                    <div
                      className="rounded-lg p-3 mb-3"
                      style={{ backgroundColor: 'rgba(217,70,239,0.08)', border: `1px solid rgba(217,70,239,0.2)` }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: C.accent }}>
                        Result: {ex.sampleResult}
                      </p>
                      <p className="text-[11px] leading-relaxed" style={{ color: C.supporting }}>
                        {ex.resultSnippet}
                      </p>
                    </div>
                  </motion.div>

                  <div
                    className="mt-4 rounded-lg py-2.5 text-center text-xs font-bold"
                    style={{ backgroundColor: C.cta, color: '#FFFFFF' }}
                  >
                    Find Out Now &rarr;
                  </div>
                </div>

                {/* Niche dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {NICHE_EXAMPLES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveNiche(i)}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === activeNiche ? '20px' : '6px',
                        backgroundColor: i === activeNiche ? C.accent : C.cardBorder,
                      }}
                    />
                  ))}
                </div>
                <p className="text-center mt-2 text-[11px]" style={{ color: C.footnote }}>
                  Same quiz. Any niche. Fully yours.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ════════════════════ THE PROBLEM ════════════════════ */}
      <section className="py-20 md:py-28 relative" style={{ backgroundColor: C.sectionBg }}>
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-[2.5rem] font-bold leading-tight"
              style={{ color: C.headline }}
            >
              Your website is busy.
              <br />
              <span style={{ color: C.accent }}>Your inbox isn't.</span>
            </motion.h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: X,
                before: 'A contact form',
                after: '"Hi, I\'m interested." You know nothing about them.',
              },
              {
                icon: X,
                before: 'A PDF download',
                after: 'You got an email address. No idea if they\'re a fit.',
              },
              {
                icon: X,
                before: 'A discovery call',
                after: '40 minutes to find out they can\'t afford you.',
              },
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
                  <card.icon className="h-4 w-4" style={{ color: '#EF4444' }} />
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

      {/* ════════════════════ HOW IT WORKS ════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: C.accent }}>
              Four steps. Under an hour.
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-[2.5rem] font-bold" style={{ color: C.headline }}>
              How PretaQuiz works
            </motion.h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px hidden md:block" style={{ backgroundColor: C.cardBorder }} />

            {[
              { num: '01', title: 'Activate your quiz', desc: 'One payment, instant dashboard access. No calls, no waiting.', time: '2 min' },
              { num: '02', title: 'Make it yours', desc: 'Upload your logo, set your brand colour, write your questions and results. The dashboard walks you through it.', time: '~45 min' },
              { num: '03', title: 'Share your link', desc: 'Drop it in your email signature, Instagram bio, LinkedIn, or embed it directly on your website.', time: '5 min' },
              { num: '04', title: 'Leads arrive automatically', desc: 'Every prospect gets a personalised result. You get their details and a warm lead in your CRM.', time: 'Ongoing' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                className="relative flex gap-5 mb-10 last:mb-0 md:pl-2"
              >
                <div
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tracking-wider"
                  style={{ backgroundColor: C.cardBg, border: `2px solid ${C.accent}`, color: C.accent }}
                >
                  {step.num}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold" style={{ color: C.headline }}>{step.title}</h3>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                      style={{ backgroundColor: 'rgba(217,70,239,0.12)', color: C.accent }}
                    >
                      {step.time}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: C.body }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ NICHE SHOWCASE ════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.sectionBg }}>
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-[2.5rem] font-bold" style={{ color: C.headline }}>
              One quiz. <span style={{ color: C.accent }}>Any coaching niche.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-base max-w-xl mx-auto" style={{ color: C.body }}>
              You get a flexible quiz structure with 4 result types. Write the questions, answers, and results that match your audience. Here's how it looks across different niches:
            </motion.p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {NICHE_EXAMPLES.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="rounded-xl p-6 group"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
              >
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-[0.15em] mb-3"
                  style={{ color: C.accent }}
                >
                  {ex.niche}
                </span>
                <h3 className="text-base font-bold mb-3" style={{ color: C.headline }}>
                  "{ex.quizTitle}"
                </h3>
                <div className="space-y-2 text-sm" style={{ color: C.supporting }}>
                  <p><span className="font-semibold" style={{ color: C.body }}>Sample Q:</span> {ex.sampleQ}</p>
                  <p><span className="font-semibold" style={{ color: C.body }}>Sample result:</span> {ex.sampleResult} &mdash; {ex.resultSnippet}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8 text-sm"
            style={{ color: C.footnote }}
          >
            Health coaches, relationship coaches, career coaches, HR consultants &mdash; if you work with people, the quiz works for you.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════ WHAT YOU GET ════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-[2.5rem] font-bold" style={{ color: C.headline }}>
              What happens when your quiz is <span style={{ color: C.accent }}>live</span>
            </motion.h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Inbox, title: 'Pre-qualified leads', body: 'Every lead who books a call already knows their result. You start the conversation with insight, not a blank page.' },
              { icon: Zap, title: 'A segmented audience', body: 'Four result types means four distinct groups. Follow up with the right message for each one.' },
              { icon: Shield, title: 'Proof of your expertise', body: 'Prospects experience your thinking before they\'ve paid you a penny. The quiz builds trust before the conversation begins.' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                className="rounded-xl p-6"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
              >
                <card.icon className="h-5 w-5 mb-3" style={{ color: C.accent }} />
                <h3 className="text-sm font-bold mb-2" style={{ color: C.headline }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.supporting }}>{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ SOCIAL PROOF ════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.sectionBg }}>
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-[2.5rem] font-bold" style={{ color: C.headline }}>
              Coaches are <span style={{ color: C.accent }}>already using it</span>
            </motion.h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                quote: "I set it up in an afternoon and had my first lead come through the same evening. The quality is so much better. They already know their result before we even speak.",
                name: 'Sarah C.',
                role: 'Business Growth Coach',
              },
              {
                quote: "I've tried quiz tools before but they were either too complicated or looked terrible on mobile. This was done in an hour and it looks like my brand, not some template.",
                name: 'Marcus R.',
                role: 'Leadership Consultant',
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                className="rounded-xl p-6"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
              >
                <p className="text-sm leading-relaxed italic" style={{ color: C.supporting }}>
                  "{t.quote}"
                </p>
                <div className="mt-4">
                  <p className="text-sm font-bold" style={{ color: C.accent }}>{t.name}</p>
                  <p className="text-xs" style={{ color: C.footnote }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ FAQ ════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <div className="mx-auto max-w-2xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center text-3xl md:text-[2.5rem] font-bold mb-12"
            style={{ color: C.headline }}
          >
            Questions you <span style={{ color: C.accent }}>probably have</span>
          </motion.h2>

          <div style={{ borderTop: `1px solid ${C.cardBorder}` }}>
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ PRICING ════════════════════ */}
      <section className="py-20 md:py-28 relative" style={{ backgroundColor: C.sectionBg }}>
        {/* Glow */}
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
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide"
                style={{ backgroundColor: C.cta, color: '#FFFFFF' }}
              >
                Founding Member
              </span>
              <h3 className="mt-5 text-lg font-bold" style={{ color: C.headline }}>
                Your branded quiz funnel
              </h3>
              <p className="mt-1 text-sm" style={{ color: C.body }}>
                One payment. Fully customisable. Yours to keep.
              </p>
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

      {/* ════════════════════ FINAL CTA ════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-[2.5rem] font-bold"
            style={{ color: C.headline }}
          >
            Stop losing leads to a <span style={{ color: C.accent }}>silent website</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed max-w-lg mx-auto" style={{ color: C.body }}>
            Pay once. Get your quiz live today. No subscription, no hidden fees. Just a quiz that qualifies leads for you 24/7.
          </motion.p>
          <motion.div variants={fadeUp}>
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
