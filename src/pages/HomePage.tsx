import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, ChevronDown, Minus } from 'lucide-react';

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

/* ─── ANIMATION ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function Section({ children, className = '', id, style }: { children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

/* ─── DATA ─── */
const STEPS = [
  { num: '1', title: 'Make it yours', desc: 'Upload your logo, pick your brand colour, and write a welcome message. Your quiz looks like part of your website — not a third-party tool.' },
  { num: '2', title: 'Write your questions & results', desc: 'Add your questions (multiple choice), write the result descriptions your quiz-takers will see, and map which answers lead to which result. If you can write a social media post, you can do this.' },
  { num: '3', title: 'Connect & share', desc: 'Paste your webhook URL to send lead data to your CRM (ActiveCampaign, MailChimp, Kit, HighLevel, Zapier — anything that accepts a webhook). Grab your quiz link and share it on your website, in your bio, or in an email. That\'s it. Leads start arriving.' },
];

const INCLUDED = [
  'Your own branded quiz page (logo, brand colour, welcome message)',
  'Multiple-choice questions with mapped results',
  'Email capture built in — no separate opt-in form needed',
  'Webhook integration to send leads to any CRM or email platform',
  'Mobile-responsive design that works on every device',
  'No response limits — collect as many leads as you want',
  'No monthly fees, ever',
  'Hosted for you — no WordPress, no domain setup, no tech headaches',
];

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

const COMPARISON = {
  rows: [
    { label: 'Year 1 cost', pq: '$97', interact: '$324+', scoreapp: '$348+', leadquizzes: '$444+' },
    { label: 'Year 2 cost', pq: '$0', interact: '$324+', scoreapp: '$348+', leadquizzes: '$444+' },
    { label: 'Monthly fee', pq: 'None — ever', interact: 'From $27/mo', scoreapp: 'From $29/mo', leadquizzes: 'From $37/mo' },
    { label: 'Response limits', pq: 'None', interact: '500/mo on Lite', scoreapp: '100/mo on Starter', leadquizzes: '100/mo on Startup' },
    { label: 'Webhook / CRM integration', pq: 'Yes', interact: 'Yes (paid plans)', scoreapp: 'Yes (paid plans)', leadquizzes: 'Yes (paid plans)' },
    { label: 'Requires WordPress', pq: 'No', interact: 'No', scoreapp: 'No', leadquizzes: 'No' },
  ],
};

const FOR_YOU = [
  'Want a lead magnet that actually gets completed (quizzes convert 3–5x better than PDFs)',
  'Are tired of paying monthly fees for tools you only set up once',
  'Don\'t have a developer or VA to build a custom quiz',
  'Already use a CRM or email tool and just need leads flowing into it',
  'Want something live today, not next month',
];

const NOT_FOR_YOU = [
  'Advanced A/B split testing*',
  'Built-in email sequences and automation*',
  'Multi-branch conditional logic with weighted scoring*',
  'Enterprise-level analytics dashboards*',
];

const TESTIMONIALS = [
  { quote: 'I had my quiz live in 40 minutes. It\'s the first lead magnet I\'ve created that people actually complete.', name: '[Name]', role: 'Business Coach' },
  { quote: 'I was paying $39/month for ScoreApp and barely using half the features. PretaQuiz does exactly what I need for a one-off price.', name: '[Name]', role: 'Leadership Coach' },
  { quote: 'The webhook setup took me five minutes. Leads go straight into my ActiveCampaign list, tagged by quiz result.', name: '[Name]', role: 'Mindset Coach' },
];

const FAQS = [
  { q: 'Do I need any tech skills?', a: 'No. If you can upload a logo, type questions, and paste a URL, you can set up PretaQuiz.' },
  { q: 'What\'s a webhook?', a: 'It\'s a URL your CRM or email tool gives you so other apps can send it data. ActiveCampaign, Kit, MailChimp, HighLevel, and Zapier all support webhooks. When someone finishes your quiz, PretaQuiz sends their details to that URL automatically.' },
  { q: 'Can I embed the quiz on my website?', a: 'You get a direct link to your hosted quiz that you can share anywhere — your website, Instagram bio, email signature, or ads. You can also embed it on any webpage using an iframe.' },
  { q: 'Is there a limit on how many people can take my quiz?', a: 'No. Collect as many leads as you want at no extra cost.' },
  { q: 'What data gets sent to my CRM?', a: 'Name, email address, quiz result, and individual answers — everything you need to segment and follow up.' },
  { q: 'Do I need hosting or WordPress?', a: 'No. Your quiz is hosted for you. Nothing to install, no server to manage.' },
  { q: 'What if I want to change my questions later?', a: 'You can update your quiz questions, results, and branding at any time.' },
  
];

/* ─── COMPONENTS ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottomColor: C.cardBorder }} className="border-b">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left text-base font-medium transition-colors"
        style={{ color: C.headline }}
      >
        {q}
        <ChevronDown className={`h-5 w-5 shrink-0 ml-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} style={{ color: C.supporting }} />
      </button>
      {open && (
        <p className="pb-5 leading-relaxed" style={{ color: C.body }}>{a}</p>
      )}
    </div>
  );
}

function StickyNav({ onCheckout, loading }: { onCheckout: () => void; loading: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0F0A1E]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold" style={{ color: C.headline }}>Preta<span style={{ color: C.accent }}>Quiz</span></span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:inline-block text-sm font-medium transition-colors" style={{ color: C.supporting }}>
            Login
          </Link>
          <button
            onClick={onCheckout}
            disabled={loading}
            className="text-sm font-semibold text-white px-5 py-2.5 rounded-lg transition-all hover:shadow-lg active:scale-[0.98]"
            style={{ backgroundColor: C.cta }}
          >
            {loading ? 'Redirecting…' : 'Get PretaQuiz — $97'}
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ─── MAIN PAGE ─── */
export default function HomePage() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    document.title = 'PretaQuiz — Lead Generation Quiz Builder for Coaches | $97 One-Time';
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', 'Create a branded lead-generation quiz for your coaching or consulting business. No monthly fees. No tech skills. Live in under an hour. $97 one-time payment.');

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', '@id': 'https://pretaquiz.com/#organization', name: 'PretaQuiz', url: 'https://pretaquiz.com', description: 'Branded lead-generation quiz builder for coaches and consultants.' },
        { '@type': 'WebSite', '@id': 'https://pretaquiz.com/#website', url: 'https://pretaquiz.com', name: 'PretaQuiz', publisher: { '@id': 'https://pretaquiz.com/#organization' } },
        { '@type': 'WebPage', '@id': 'https://pretaquiz.com/#webpage', url: 'https://pretaquiz.com', name: 'PretaQuiz — Lead Generation Quiz Builder for Coaches', isPartOf: { '@id': 'https://pretaquiz.com/#website' } },
        { '@type': 'SoftwareApplication', name: 'PretaQuiz', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '97', priceCurrency: 'USD', priceValidUntil: '2027-12-31' } },
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
    <div className="min-h-screen relative" style={{ backgroundColor: C.pageBg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Grain texture overlay */}
      <style>{`
        @keyframes drift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-30px)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,25px)} }
        @keyframes drift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(25px,40px)} }
        @keyframes grain { 0%{transform:translate(0,0)} 10%{transform:translate(-5%,-10%)} 20%{transform:translate(-15%,5%)} 30%{transform:translate(7%,-15%)} 40%{transform:translate(-5%,15%)} 50%{transform:translate(-10%,5%)} 60%{transform:translate(15%,0)} 70%{transform:translate(0,10%)} 80%{transform:translate(3%,-15%)} 90%{transform:translate(-10%,10%)} 100%{transform:translate(0,0)} }
        .grain-overlay::after {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 50;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
          animation: grain 8s steps(10) infinite;
        }
        @keyframes sweepLine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .section-glow {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(240,32,176,0.4) 50%, transparent 100%);
          background-size: 50% 100%;
          background-repeat: no-repeat;
          pointer-events: none;
          position: relative;
          z-index: 1;
          animation: sweepLine 6s ease-in-out infinite;
        }
      `}</style>

      <div className="grain-overlay" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 40 }} />

      <StickyNav onCheckout={handleCheckout} loading={checkoutLoading} />

      {/* ═══ SECTION 1: HERO ═══ */}
      <Section className="pt-32 pb-20 px-5 md:pt-40 md:pb-28 relative overflow-hidden" style={{ backgroundColor: C.pageBg }}>
        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden md:block" aria-hidden="true">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full" style={{ background: 'rgba(217,70,239,0.10)', filter: 'blur(120px)', animation: 'drift1 60s ease-in-out infinite' }} />
          <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full" style={{ background: 'rgba(240,32,176,0.06)', filter: 'blur(150px)', animation: 'drift2 70s ease-in-out infinite' }} />
          <div className="absolute bottom-[-15%] left-[30%] w-[450px] h-[450px] rounded-full" style={{ background: 'rgba(217,70,239,0.07)', filter: 'blur(130px)', animation: 'drift3 55s ease-in-out infinite' }} />
        </div>
        {/* Mobile: smaller orbs */}
        <div className="absolute inset-0 pointer-events-none z-0 md:hidden" aria-hidden="true">
          <div className="absolute top-[-5%] left-[-10%] w-[250px] h-[250px] rounded-full" style={{ background: 'rgba(217,70,239,0.08)', filter: 'blur(80px)', animation: 'drift1 60s ease-in-out infinite' }} />
          <div className="absolute top-[30%] right-[-10%] w-[200px] h-[200px] rounded-full" style={{ background: 'rgba(240,32,176,0.05)', filter: 'blur(100px)', animation: 'drift2 70s ease-in-out infinite' }} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight" style={{ color: C.headline }}>
            Your website gets visitors.{' '}
            <span className="block mt-1">Are any of them becoming leads?</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: C.body }}>
            PretaQuiz gives coaches and consultants a branded lead-generation quiz they can make their own. No tech skills. No monthly fees. Live in under an hour.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="text-lg font-semibold text-white px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: C.cta }}
            >
              {checkoutLoading ? 'Redirecting…' : 'Get PretaQuiz — $97 one-time'}
            </button>
            <p className="mt-4 text-sm" style={{ color: C.supporting }}>No subscription. No hidden costs. Pay once, it's yours.</p>
          </motion.div>
        </div>
      </Section>
      <div className="section-glow" aria-hidden="true" />

      {/* ═══ SECTION 2: PROBLEM / AGITATION ═══ */}
      <Section className="py-20 px-5" style={{ backgroundColor: C.sectionBg }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: C.headline }}>
            You know you need a lead magnet. But the options aren't great.
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-8 text-lg leading-relaxed space-y-5 text-left md:text-center" style={{ color: C.body }}>
            <p>
              PDFs sit in inboxes unopened. Webinars need you to show up live. And the quiz tools everyone raves about? They charge $29–$99 per month — that's $350–$1,200 a year — just to ask your audience a few questions and collect an email address.
            </p>
            <p>
              You don't need another monthly subscription. You need a quiz that works, looks professional, and sends leads straight to your CRM. That's it.
            </p>
          </motion.div>
        </div>
      </Section>
      <div className="section-glow" aria-hidden="true" />

      {/* ═══ SECTION 3: WHAT IT IS ═══ */}
      <Section className="py-20 px-5" style={{ backgroundColor: C.pageBg }}>
        <div className="max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight text-center" style={{ color: C.headline }}>
            A branded quiz funnel you own for a one-time price.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-8 text-lg leading-relaxed text-center" style={{ color: C.body }}>
            PretaQuiz is a ready-made lead generation quiz you customise with your brand, your questions, and your results. When someone completes your quiz, their name, email, and answers go straight to your CRM or email tool via webhook. No middleman. No monthly fee.
          </motion.p>
        </div>
      </Section>
      <div className="section-glow" aria-hidden="true" />

      {/* ═══ SECTION 4: HOW IT WORKS ═══ */}
      <Section className="py-20 px-5" style={{ backgroundColor: C.sectionBg }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight text-center" style={{ color: C.headline }}>
            Live in three steps. Under an hour.
          </motion.h2>
          <div className="mt-14 grid md:grid-cols-3 gap-10">
            {STEPS.map((s) => (
              <motion.div key={s.num} variants={fadeUp} className="text-center md:text-left">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full text-white text-xl font-bold mb-5"
                  style={{ backgroundColor: C.cta }}
                >
                  {s.num}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: C.headline }}>{s.title}</h3>
                <p className="leading-relaxed" style={{ color: C.body }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      <div className="section-glow" aria-hidden="true" />

      {/* ═══ SECTION 5: WHAT'S INCLUDED ═══ */}
      <Section className="py-20 px-5" style={{ backgroundColor: C.pageBg }}>
        <div className="max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight text-center" style={{ color: C.headline }}>
            Everything you need. Nothing you don't.
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-5">
            {INCLUDED.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: C.accent }} />
                <span className="leading-relaxed" style={{ color: C.body }}>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══ NICHE EXAMPLES ═══ */}
      <Section className="py-20 px-5" style={{ backgroundColor: C.sectionBg }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight text-center" style={{ color: C.headline }}>
            One quiz structure. Any coaching niche.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-center leading-relaxed max-w-2xl mx-auto" style={{ color: C.supporting }}>
            You get a flexible quiz framework and make it completely yours. Here's how coaches across different niches use it:
          </motion.p>
          <div className="mt-14 grid sm:grid-cols-2 gap-6">
            {NICHE_EXAMPLES.map((ex, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl p-6 md:p-8 transition-all hover:scale-[1.01]"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
              >
                <span className="inline-block text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(217,70,239,0.12)', color: C.accent }}>
                  {ex.niche}
                </span>
                <h3 className="mt-4 text-lg font-semibold" style={{ color: C.headline }}>
                  "{ex.quizTitle}"
                </h3>
                <div className="mt-4 space-y-3">
                  <p className="text-sm leading-relaxed" style={{ color: C.supporting }}>
                    <span className="font-medium" style={{ color: C.body }}>Sample question:</span> {ex.sampleQ}
                  </p>
                  <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(217,70,239,0.06)', border: `1px solid rgba(217,70,239,0.15)` }}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.accent }}>
                      {ex.sampleResult}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: C.body }}>
                      {ex.resultSnippet}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      <div className="section-glow" aria-hidden="true" />

      {/* ═══ SECTION 6: PRICE COMPARISON ═══ */}
      <Section className="py-20 px-5" style={{ backgroundColor: C.sectionBg }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight text-center" style={{ color: C.headline }}>
            How PretaQuiz compares to monthly quiz tools
          </motion.h2>

          {/* Desktop table */}
          <motion.div variants={fadeUp} className="mt-12 hidden md:block overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 font-medium w-1/5" style={{ color: C.supporting }}></th>
                  <th className="py-4 px-4 text-center font-bold text-white rounded-t-xl w-1/5" style={{ backgroundColor: C.cta }}>PretaQuiz</th>
                  <th className="py-4 px-4 text-center font-medium w-1/5" style={{ backgroundColor: C.cardBg, color: C.body }}>Interact</th>
                  <th className="py-4 px-4 text-center font-medium w-1/5" style={{ backgroundColor: C.cardBg, color: C.body }}>ScoreApp</th>
                  <th className="py-4 px-4 text-center font-medium w-1/5" style={{ backgroundColor: C.cardBg, color: C.body }}>LeadQuizzes</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row, i) => (
                  <tr key={i} style={{ borderTopColor: C.cardBorder }} className="border-t">
                    <td className="py-4 px-4 font-medium" style={{ color: C.supporting }}>{row.label}</td>
                    <td className="py-4 px-4 text-center font-bold" style={{ color: C.headline, backgroundColor: 'rgba(240,32,176,0.08)' }}>{row.pq}</td>
                    <td className="py-4 px-4 text-center" style={{ color: C.body }}>{row.interact}</td>
                    <td className="py-4 px-4 text-center" style={{ color: C.body }}>{row.scoreapp}</td>
                    <td className="py-4 px-4 text-center" style={{ color: C.body }}>{row.leadquizzes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Mobile cards */}
          <motion.div variants={fadeUp} className="mt-12 md:hidden space-y-4">
            {COMPARISON.rows.map((row, i) => (
              <div key={i} className="rounded-xl p-5" style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
                <p className="font-medium text-sm mb-3" style={{ color: C.supporting }}>{row.label}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1.5 px-3 rounded-lg" style={{ backgroundColor: 'rgba(240,32,176,0.12)' }}>
                    <span className="font-semibold" style={{ color: C.headline }}>PretaQuiz</span>
                    <span className="font-bold" style={{ color: C.headline }}>{row.pq}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 px-3">
                    <span style={{ color: C.supporting }}>Interact</span>
                    <span style={{ color: C.body }}>{row.interact}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 px-3">
                    <span style={{ color: C.supporting }}>ScoreApp</span>
                    <span style={{ color: C.body }}>{row.scoreapp}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 px-3">
                    <span style={{ color: C.supporting }}>LeadQuizzes</span>
                    <span style={{ color: C.body }}>{row.leadquizzes}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-xs text-center" style={{ color: C.footnote }}>
            Competitor pricing based on publicly listed annual billing rates as of April 2026. Prices may vary.
          </motion.p>
        </div>
      </Section>
      <div className="section-glow" aria-hidden="true" />

      {/* ═══ SECTION 7: WHO IT'S FOR ═══ */}
      <Section className="py-20 px-5" style={{ backgroundColor: C.pageBg }}>
        <div className="max-w-4xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight text-center" style={{ color: C.headline }}>
            Is PretaQuiz right for you?
          </motion.h2>
          <div className="mt-12 grid md:grid-cols-2 gap-10">
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold mb-5" style={{ color: C.headline }}>PretaQuiz is for you if you:</h3>
              <ul className="space-y-4">
                {FOR_YOU.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: C.accent }} />
                    <span className="leading-relaxed" style={{ color: C.body }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold mb-5" style={{ color: C.headline }}>It's probably not for you if you need:</h3>
              <ul className="space-y-4">
                {NOT_FOR_YOU.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Minus className="h-5 w-5 shrink-0 mt-0.5" style={{ color: C.supporting }} />
                    <span className="leading-relaxed" style={{ color: C.supporting }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <p className="mt-10 text-sm leading-relaxed text-center max-w-3xl mx-auto" style={{ color: C.supporting }}>
            *Those features exist — they just cost $50–$150/month elsewhere. PretaQuiz does one thing well: get a professional branded quiz live fast and send the leads to your system.
          </p>
        </div>
      </Section>
      <div className="section-glow" aria-hidden="true" />

      {/* ═══ SECTION 8: SOCIAL PROOF ═══ */}
      <Section className="py-20 px-5" style={{ backgroundColor: C.sectionBg }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight text-center" style={{ color: C.headline }}>
            What coaches are saying
          </motion.h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl p-8 border-dashed relative"
                style={{ backgroundColor: C.cardBg, borderColor: C.cardBorder, borderWidth: '1px' }}
              >
                <div className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded" style={{ color: C.footnote, backgroundColor: C.cardBorder }}>Placeholder</div>
                <p className="leading-relaxed italic" style={{ color: C.body }}>"{t.quote}"</p>
                <div className="mt-6 pt-4" style={{ borderTopColor: C.cardBorder, borderTopWidth: '1px' }}>
                  <p className="font-semibold" style={{ color: C.headline }}>{t.name}</p>
                  <p className="text-sm" style={{ color: C.supporting }}>{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      <div className="section-glow" aria-hidden="true" />

      {/* ═══ SECTION 9: FAQ ═══ */}
      <Section className="py-20 px-5" style={{ backgroundColor: C.pageBg }}>
        <div className="max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight text-center mb-12" style={{ color: C.headline }}>
            Questions? Answered.
          </motion.h2>
          <motion.div variants={fadeUp}>
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </Section>
      <div className="section-glow" aria-hidden="true" />

      {/* ═══ SECTION 10: FINAL CTA ═══ */}
      <Section className="py-24 px-5" style={{ backgroundColor: C.sectionBg }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: C.headline }}>
            $97. Once. Done.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg leading-relaxed" style={{ color: C.body }}>
            Stop paying monthly for a quiz tool. Get PretaQuiz, brand it, write your questions, and start collecting leads today.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="text-lg font-semibold text-white px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: C.cta }}
            >
              {checkoutLoading ? 'Redirecting…' : 'Get PretaQuiz — $97 one-time'}
            </button>
            <p className="mt-4 text-sm" style={{ color: C.footnote }}>One-time payment. No subscription. No upsells.</p>
          </motion.div>
        </div>
      </Section>

      {/* ═══ SECTION 11: FOOTER ═══ */}
      <footer className="py-10 px-5" style={{ backgroundColor: C.sectionBg, borderTop: `1px solid ${C.cardBorder}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold" style={{ color: C.headline }}>Preta<span style={{ color: C.accent }}>Quiz</span></span>
          </div>
          <p className="text-sm" style={{ color: C.footnote }}>© 2026 PretaQuiz. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm" style={{ color: C.footnote }}>
            <Link to="/privacy" className="hover:opacity-80 transition-opacity">Privacy Policy</Link>
            <Link to="/terms" className="hover:opacity-80 transition-opacity">Terms of Service</Link>
            <Link to="/contact" className="hover:opacity-80 transition-opacity">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
