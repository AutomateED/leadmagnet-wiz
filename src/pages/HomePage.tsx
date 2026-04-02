import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, ChevronDown, Minus } from 'lucide-react';

/* ─── PALETTE ─── */
const BRAND = '#F97066';
const BRAND_DARK = '#E85D52';
const BRAND_LIGHT = '#FFF1F0';

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
  'Advanced A/B split testing',
  'Built-in email sequences and automation',
  'Multi-branch conditional logic with weighted scoring',
  'Enterprise-level analytics dashboards',
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
  { q: 'Is there a money-back guarantee?', a: 'Yes — if you\'re not happy within 14 days and haven\'t published your quiz, you\'ll get a full refund. No questions asked.' },
];

/* ─── COMPONENTS ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left text-base font-medium text-gray-900 hover:text-gray-700 transition-colors"
      >
        {q}
        <ChevronDown className={`h-5 w-5 text-gray-400 shrink-0 ml-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <p className="pb-5 text-gray-600 leading-relaxed">{a}</p>
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">Preta<span style={{ color: BRAND }}>Quiz</span></span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:inline-block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Login
          </Link>
          <button
            onClick={onCheckout}
            disabled={loading}
            className="text-sm font-semibold text-white px-5 py-2.5 rounded-lg transition-all hover:shadow-lg active:scale-[0.98]"
            style={{ backgroundColor: BRAND }}
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
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <StickyNav onCheckout={handleCheckout} loading={checkoutLoading} />

      {/* ═══ SECTION 1: HERO ═══ */}
      <Section className="pt-32 pb-20 px-5 md:pt-40 md:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
            Your website gets visitors.{' '}
            <span className="block mt-1">Are any of them becoming leads?</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            PretaQuiz gives coaches and consultants a branded lead-generation quiz they can make their own. No tech skills. No monthly fees. Live in under an hour.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="text-lg font-semibold text-white px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: BRAND }}
            >
              {checkoutLoading ? 'Redirecting…' : 'Get PretaQuiz — $97 one-time'}
            </button>
            <p className="mt-4 text-sm text-gray-500">No subscription. No hidden costs. Pay once, it's yours.</p>
          </motion.div>
        </div>
      </Section>

      {/* ═══ SECTION 2: PROBLEM / AGITATION ═══ */}
      <Section className="py-20 px-5 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            You know you need a lead magnet. But the options aren't great.
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-8 text-gray-600 text-lg leading-relaxed space-y-5 text-left md:text-center">
            <p>
              PDFs sit in inboxes unopened. Webinars need you to show up live. And the quiz tools everyone raves about? They charge $29–$99 per month — that's $350–$1,200 a year — just to ask your audience a few questions and collect an email address.
            </p>
            <p>
              You don't need another monthly subscription. You need a quiz that works, looks professional, and sends leads straight to your CRM. That's it.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* ═══ SECTION 3: WHAT IT IS ═══ */}
      <Section className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight text-center">
            A branded quiz funnel you own for a one-time price.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-8 text-gray-600 text-lg leading-relaxed text-center">
            PretaQuiz is a ready-made lead generation quiz you customise with your brand, your questions, and your results. When someone completes your quiz, their name, email, and answers go straight to your CRM or email tool via webhook. No middleman. No monthly fee.
          </motion.p>
        </div>
      </Section>

      {/* ═══ SECTION 4: HOW IT WORKS ═══ */}
      <Section className="py-20 px-5 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight text-center">
            Live in three steps. Under an hour.
          </motion.h2>
          <div className="mt-14 grid md:grid-cols-3 gap-10">
            {STEPS.map((s) => (
              <motion.div key={s.num} variants={fadeUp} className="text-center md:text-left">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full text-white text-xl font-bold mb-5"
                  style={{ backgroundColor: BRAND }}
                >
                  {s.num}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ SECTION 5: WHAT'S INCLUDED ═══ */}
      <Section className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight text-center">
            Everything you need. Nothing you don't.
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-5">
            {INCLUDED.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: BRAND }} />
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══ SECTION 6: PRICE COMPARISON ═══ */}
      <Section className="py-20 px-5 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight text-center">
            How PretaQuiz compares to monthly quiz tools
          </motion.h2>

          {/* Desktop table */}
          <motion.div variants={fadeUp} className="mt-12 hidden md:block overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 font-medium text-gray-500 w-1/5"></th>
                  <th className="py-4 px-4 text-center font-bold text-white rounded-t-xl w-1/5" style={{ backgroundColor: BRAND }}>PretaQuiz</th>
                  <th className="py-4 px-4 text-center font-medium text-gray-600 bg-gray-100 w-1/5">Interact</th>
                  <th className="py-4 px-4 text-center font-medium text-gray-600 bg-gray-100 w-1/5">ScoreApp</th>
                  <th className="py-4 px-4 text-center font-medium text-gray-600 bg-gray-100 w-1/5">LeadQuizzes</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row, i) => (
                  <tr key={i} className="border-t border-gray-200">
                    <td className="py-4 px-4 font-medium text-gray-700">{row.label}</td>
                    <td className="py-4 px-4 text-center font-bold text-gray-900" style={{ backgroundColor: `${BRAND}10` }}>{row.pq}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{row.interact}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{row.scoreapp}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{row.leadquizzes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Mobile cards */}
          <motion.div variants={fadeUp} className="mt-12 md:hidden space-y-4">
            {COMPARISON.rows.map((row, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="font-medium text-gray-500 text-sm mb-3">{row.label}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1.5 px-3 rounded-lg" style={{ backgroundColor: BRAND_LIGHT }}>
                    <span className="font-semibold text-gray-900">PretaQuiz</span>
                    <span className="font-bold" style={{ color: BRAND_DARK }}>{row.pq}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 px-3">
                    <span className="text-gray-500">Interact</span>
                    <span className="text-gray-600">{row.interact}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 px-3">
                    <span className="text-gray-500">ScoreApp</span>
                    <span className="text-gray-600">{row.scoreapp}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 px-3">
                    <span className="text-gray-500">LeadQuizzes</span>
                    <span className="text-gray-600">{row.leadquizzes}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-xs text-gray-400 text-center">
            Competitor pricing based on publicly listed annual billing rates as of April 2026. Prices may vary.
          </motion.p>
        </div>
      </Section>

      {/* ═══ SECTION 7: WHO IT'S FOR ═══ */}
      <Section className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight text-center">
            Is PretaQuiz right for you?
          </motion.h2>
          <div className="mt-12 grid md:grid-cols-2 gap-10">
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-gray-900 mb-5">PretaQuiz is for you if you:</h3>
              <ul className="space-y-4">
                {FOR_YOU.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: BRAND }} />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold text-gray-900 mb-5">It's probably not for you if you need:</h3>
              <ul className="space-y-4">
                {NOT_FOR_YOU.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Minus className="h-5 w-5 shrink-0 mt-0.5 text-gray-400" />
                    <span className="text-gray-500 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-gray-500 leading-relaxed">
                Those features exist — they just cost $50–$150/month elsewhere. PretaQuiz does one thing well: get a professional branded quiz live fast and send the leads to your system.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══ SECTION 8: SOCIAL PROOF ═══ */}
      <Section className="py-20 px-5 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight text-center">
            What coaches are saying
          </motion.h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 border border-gray-200 border-dashed relative"
              >
                <div className="absolute top-4 right-4 text-[10px] uppercase tracking-wider text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded">Placeholder</div>
                <p className="text-gray-700 leading-relaxed italic">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══ SECTION 9: FAQ ═══ */}
      <Section className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight text-center mb-12">
            Questions? Answered.
          </motion.h2>
          <motion.div variants={fadeUp}>
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══ SECTION 10: FINAL CTA ═══ */}
      <Section className="py-24 px-5" style={{ backgroundColor: '#1a1a2e' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white leading-tight">
            $97. Once. Done.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-gray-300 leading-relaxed">
            Stop paying monthly for a quiz tool. Get PretaQuiz, brand it, write your questions, and start collecting leads today.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="text-lg font-semibold text-white px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: BRAND }}
            >
              {checkoutLoading ? 'Redirecting…' : 'Get PretaQuiz — $97 one-time'}
            </button>
            <p className="mt-4 text-sm text-gray-400">One-time payment. No subscription. No upsells.</p>
          </motion.div>
        </div>
      </Section>

      {/* ═══ SECTION 11: FOOTER ═══ */}
      <footer className="py-10 px-5 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">Preta<span style={{ color: BRAND }}>Quiz</span></span>
          </div>
          <p className="text-sm text-gray-500">© 2026 PretaQuiz. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
