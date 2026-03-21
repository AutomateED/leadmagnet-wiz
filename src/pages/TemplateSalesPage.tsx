import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, CircleOff, MessageSquareX, Users, Play, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const BRAND = '#C9A96E';
const STRIPE_URLS: Record<string, string> = {
  'business-breakthrough': 'https://buy.stripe.com/8x28wO0Yj3Jg6OfdCj0gw00',
  'mindset-mastery': 'https://buy.stripe.com/9B68wO6iDfrYdcDgOv0gw02',
  'leadership-style': 'https://buy.stripe.com/3cIcN4gXhfrYc8zeGn0gw03',
  'wealth-readiness': 'https://buy.stripe.com/00wdR8cH1gw26Of8hZ0gw01',
};

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

interface TemplateData {
  slug: string;
  name: string;
  headline: string;
  subtitle: string;
  badge: string;
  painHeadline: string;
  pains: string[];
  forText: string;
  mockupTitle: string;
  faqs: { q: string; a: string }[];
}

const TEMPLATES: Record<string, TemplateData> = {
  'business-breakthrough': {
    slug: 'business-breakthrough',
    name: 'Business Breakthrough Quiz',
    headline: "What's Really Holding Your Business Back?",
    subtitle: 'Help your prospects uncover their biggest business challenge before you even get on a call — so every conversation starts with clarity.',
    badge: 'Quiz Template for Business Coaches',
    painHeadline: 'Business coaching clients are visiting your website… then leaving',
    pains: [
      "Generic contact forms tell you nothing about the prospect",
      "Discovery calls with unqualified leads waste your time",
      "You have no way to segment or personalise your follow-up",
    ],
    forText: 'Business coaches, growth consultants, strategy advisors',
    mockupTitle: "What's Really Holding Your Business Back?",
    faqs: [
      { q: 'Do I need any technical skills?', a: 'Not at all. If you can fill in a form, you can set up your quiz. Our dashboard walks you through every step.' },
      { q: 'Can I customise the questions?', a: 'Yes — every question and answer can be edited to match your voice and your audience.' },
      { q: 'How do leads get to my CRM?', a: 'You paste your webhook URL (from Zapier, GoHighLevel, HubSpot, etc.) into the dashboard. Leads are sent automatically the moment someone completes your quiz.' },
      { q: 'Can I embed the quiz on my website?', a: 'Yes. You get a direct link to share anywhere AND an embed code you can paste into any website builder.' },
    ],
  },
  'mindset-mastery': {
    slug: 'mindset-mastery',
    name: 'Mindset Mastery Quiz',
    headline: "What's Your Hidden Mindset Block?",
    subtitle: 'Give your prospects a powerful self-discovery moment that builds instant trust — and shows them exactly why they need your help.',
    badge: 'Quiz Template for Mindset Coaches',
    painHeadline: 'Mindset coaching clients are visiting your website… then leaving',
    pains: [
      "Prospects don't realise they have a mindset problem until it's named",
      "You spend the first 20 minutes of every call doing discovery you could automate",
      "There's no way to show your expertise before the first conversation",
    ],
    forText: 'Life coaches, mindset coaches, personal development consultants',
    mockupTitle: "What's Your Hidden Mindset Block?",
    faqs: [
      { q: 'Do I need any technical skills?', a: 'Not at all. If you can fill in a form, you can set up your quiz. Our dashboard walks you through every step.' },
      { q: 'Can I change the result types?', a: 'Absolutely. Every result can be customised to match your framework and methodology.' },
      { q: 'How quickly can I go live?', a: 'Most coaches have their quiz live within 30–60 minutes of signing up.' },
      { q: 'What if I want to cancel?', a: 'Cancel anytime from your dashboard. No contracts, no hassle.' },
    ],
  },
  'leadership-style': {
    slug: 'leadership-style',
    name: 'Leadership Style Quiz',
    headline: 'What Kind of Leader Are You?',
    subtitle: "Let your prospects discover their leadership style — and see exactly where your coaching can take them to the next level.",
    badge: 'Quiz Template for Leadership Coaches',
    painHeadline: 'Executive coaching prospects are visiting your website… then leaving',
    pains: [
      "Executive prospects are busy and sceptical of generic outreach",
      "You need a way to demonstrate value before asking for their time",
      "There's no easy way to segment leaders by development stage",
    ],
    forText: 'Leadership coaches, executive coaches, management consultants',
    mockupTitle: 'What Kind of Leader Are You?',
    faqs: [
      { q: 'Do I need any technical skills?', a: 'Not at all. If you can fill in a form, you can set up your quiz. Our dashboard walks you through every step.' },
      { q: 'Is it appropriate for C-suite prospects?', a: 'Absolutely. The quiz is designed to feel professional and insightful — exactly what senior leaders expect.' },
      { q: 'Can I connect it to my existing CRM?', a: 'Yes. Paste your webhook URL and leads flow directly into HubSpot, GoHighLevel, Zapier, or any webhook-compatible tool.' },
      { q: 'What if I want to cancel?', a: 'Cancel anytime from your dashboard. No contracts, no hassle.' },
    ],
  },
  'wealth-readiness': {
    slug: 'wealth-readiness',
    name: 'Wealth Readiness Quiz',
    headline: 'How Ready Are You to Build Real Wealth?',
    subtitle: 'Help your prospects honestly assess where they stand financially — and position yourself as the guide who can take them further.',
    badge: 'Quiz Template for Financial Coaches',
    painHeadline: 'Financial coaching prospects are visiting your website… then leaving',
    pains: [
      "Financial topics feel intimidating and prospects avoid reaching out",
      "You have no way to gauge a prospect's starting point before the first call",
      "Generic lead magnets don't build trust in a high-stakes niche",
    ],
    forText: 'Financial coaches, wealth consultants, money mindset experts',
    mockupTitle: 'How Ready Are You to Build Real Wealth?',
    faqs: [
      { q: 'Do I need any technical skills?', a: 'Not at all. If you can fill in a form, you can set up your quiz. Our dashboard walks you through every step.' },
      { q: 'Is it compliant for financial services?', a: 'The quiz is an engagement and lead-capture tool, not financial advice. You control all the copy, so you can keep it fully compliant with your requirements.' },
      { q: 'How do leads get to my CRM?', a: 'Paste your webhook URL into the dashboard. Leads are sent automatically the moment someone completes your quiz.' },
      { q: 'What if I want to cancel?', a: 'Cancel anytime from your dashboard. No contracts, no hassle.' },
    ],
  },
};

const PRICING_FEATURES = [
  'Your branded quiz — live in under 30 minutes',
  'Unlimited quiz responses',
  'Automatic lead delivery to your CRM',
  'Self-serve dashboard — edit anytime',
  'Direct link + website embed code',
  'Ongoing platform updates and support',
];

const FLOW_STEPS = ['Start screen', 'Answer questions', 'Email capture', 'Personalised results'];

const PAIN_ICONS = [MessageSquareX, Users, CircleOff];

/* ─── NAV ─── */
function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          Preta<span style={{ color: BRAND }}>Quiz</span>
        </Link>
        <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Login
        </Link>
      </div>
    </nav>
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

export default function TemplateSalesPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? TEMPLATES[slug] : undefined;

  useEffect(() => {
    if (data) {
      document.title = `${data.name} — PretaQuiz`;
    }
  }, [data]);

  if (!data) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ scrollBehavior: 'smooth' }}>
      <Nav />

      {/* ─── HERO ─── */}
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
                {data.badge}
              </motion.span>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 text-4xl font-semibold leading-[1.08] md:text-5xl lg:text-[3.25rem]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {data.headline}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
              >
                {data.subtitle}
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all hover:shadow-soft active:scale-[0.97]"
                  style={{ borderColor: BRAND, color: BRAND }}
                >
                  See It In Action
                </button>
                <a
                  href={STRIPE_URLS[slug!]}
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
                  {data.mockupTitle}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Answer 7 quick questions and discover your result.
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

      {/* ─── PROBLEM ─── */}
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
            {data.painHeadline}
          </motion.h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {data.pains.map((p, i) => {
              const Icon = PAIN_ICONS[i];
              return (
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
                    <Icon className="h-5 w-5" style={{ color: BRAND }} />
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">{p}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section className="py-20 md:py-28">
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
            The Solution: A Quiz That Does the Heavy Lifting
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Instead of a generic contact form, give prospects an interactive experience that qualifies them, captures their details, and delivers personalised insights — all before you spend a minute on a call.
          </motion.p>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-sm font-medium"
            style={{ color: BRAND }}
          >
            Built specifically for: {data.forText}
          </motion.p>
        </motion.div>
      </section>

      {/* ─── WHAT PROSPECTS EXPERIENCE ─── */}
      <section id="demo" className="bg-secondary/50 py-20 md:py-28">
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
            What Your Prospects Experience
          </motion.h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-4">
            {FLOW_STEPS.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl border border-border bg-card p-5 shadow-soft"
              >
                <div
                  className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  {i + 1}
                </div>
                <p className="text-sm font-medium text-foreground">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-20 md:py-28">
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
                href={STRIPE_URL}
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

      {/* ─── FAQ ─── */}
      <section className="bg-secondary/50 py-20 md:py-28">
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
              {data.faqs.map((f, i) => (
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

      <Footer />
    </div>
  );
}
