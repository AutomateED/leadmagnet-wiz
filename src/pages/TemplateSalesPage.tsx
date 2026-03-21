import { useEffect, useRef } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Check, CircleOff, MessageSquareX, Users, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ─── PALETTE ─── */
const C = {
  amber: '#E8912A',
  amberLight: '#FDF3E7',
  amberDark: '#C4721A',
  coral: '#D85A30',
  ink: '#1A1714',
  inkMid: '#4A443D',
  inkLight: '#8A8078',
  cream: '#FDFAF6',
  creamMid: '#F5EFE6',
  border: 'rgba(26,23,20,0.1)',
  /* dark-mode surface tokens */
  cardBg: 'rgba(255,255,255,0.05)',
  cardBorder: 'rgba(255,255,255,0.1)',
  textMuted: 'rgba(255,255,255,0.55)',
  textBody: 'rgba(255,255,255,0.65)',
  textBright: 'rgba(255,255,255,0.85)',
};

const FONT = "'Outfit', sans-serif";

const STRIPE_URLS: Record<string, string> = {
  'business-breakthrough': 'https://buy.stripe.com/8x28wO0Yj3Jg6OfdCj0gw00',
  'mindset-mastery': 'https://buy.stripe.com/9B68wO6iDfrYdcDgOv0gw02',
  'leadership-style': 'https://buy.stripe.com/3cIcN4gXhfrYc8zeGn0gw03',
  'wealth-readiness': 'https://buy.stripe.com/00wdR8cH1gw26Of8hZ0gw01',
};

const VALID_SLUGS = Object.keys(STRIPE_URLS);

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const ease = [0.16, 1, 0.3, 1] as const;

/* ─── SCARCITY BAR ─── */
function ScarcityBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mt-6 w-full max-w-xs mx-auto">
      <div className="flex justify-between text-xs font-medium mb-1.5">
        <span style={{ color: C.textMuted }}>Spots claimed</span>
        <span style={{ color: C.coral }}>14 of 20 taken</span>
      </div>
      <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: C.cardBorder }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: C.coral }}
          initial={{ width: 0 }}
          animate={inView ? { width: '68%' } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
}

/* ─── NAV ─── */
function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(26,23,20,0.85)', borderColor: C.cardBorder, fontFamily: FONT }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-[22px] font-bold tracking-tight" style={{ fontFamily: FONT }}>
          <span style={{ color: '#fff' }}>Preta</span><span style={{ color: C.amber }}>Quiz</span>
        </Link>
        <div className="flex items-center gap-4">
          <span
            className="hidden sm:inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide"
            style={{ backgroundColor: 'rgba(232,145,42,0.15)', color: C.amber, border: '1px solid rgba(232,145,42,0.3)' }}
          >
            Founding Member Offer
          </span>
          <Link to="/login" className="text-sm font-medium transition-colors" style={{ color: C.textMuted }}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── PRICING FEATURES ─── */
const PRICING_FEATURES = [
  'Your branded quiz live within 60 minutes',
  'Personalised results email sent to every prospect',
  'Automatic lead delivery to your CRM via webhook',
  'All leads stored in your dashboard',
  'Embed on your site or use as a standalone link',
  'No tech skills required — ever',
];

/* ─── PROBLEM CARDS ─── */
const PAIN_CARDS = [
  {
    icon: MessageSquareX,
    title: 'Every lead needs a discovery call',
    body: "Half of them aren't ready. You spend 40 minutes on a call to find out they can't afford you.",
  },
  {
    icon: Users,
    title: 'Contact forms tell you nothing',
    body: '"Hi, I\'m interested in your services." — great. You know absolutely nothing about this person or their needs.',
  },
  {
    icon: CircleOff,
    title: "Generic lead magnets don't qualify",
    body: "A PDF download gets an email, but it doesn't tell you where they are, what they need, or if they're a fit.",
  },
];

/* ─── HOW IT WORKS STEPS ─── */
const HOW_STEPS = [
  { title: 'Activate your quiz in one click', desc: 'Pay once and get instant access to your dashboard. No waiting, no setup calls.', badge: 'Takes 2 minutes' },
  { title: 'Build your quiz in the dashboard', desc: 'Upload your logo, set your brand colour, write your questions and results. No code, no designer.', badge: 'Takes ~45 minutes' },
  { title: 'Share your unique quiz link', desc: 'Drop it in your email signature, Instagram bio, LinkedIn, or embed it on your website.', badge: 'Takes 5 minutes' },
  { title: 'Leads land in your inbox and CRM', desc: 'Every prospect gets a personalised result email. You get their details and a warm lead — automatically.', badge: 'Happens automatically' },
];

/* ─── TESTIMONIALS ─── */
const TESTIMONIALS = [
  {
    quote: "I set it up in an afternoon and had my first lead come through the same evening. The quality is so much better — they already know their result before we even speak.",
    name: 'Sarah C.',
    role: 'Business Growth Coach',
  },
  {
    quote: "I've tried quiz tools before but they were either too complicated or looked terrible on mobile. Pretaquiz was done in an hour and it looks like my brand — not some template.",
    name: 'Marcus R.',
    role: 'Leadership Consultant',
  },
];

/* ─── FAQS ─── */
const FAQS = [
  { q: 'Do I need any technical skills?', a: 'Not at all. If you can fill in a form, you can set up your quiz. Our dashboard walks you through every step.' },
  { q: 'Can I customise the questions?', a: 'Yes — every question and answer can be edited to match your voice and your audience.' },
  { q: 'How do leads get to my CRM?', a: 'You paste your webhook URL (from Zapier, GoHighLevel, HubSpot, etc.) into the dashboard. Leads are sent automatically the moment someone completes your quiz.' },
  { q: 'Can I embed the quiz on my website?', a: 'Yes. You get a direct link to share anywhere AND an embed code you can paste into any website builder — WordPress, Wix, Squarespace, Kajabi, and more.' },
];

/* ─── FOOTER ─── */
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

/* ─── PAGE ─── */
export default function TemplateSalesPage() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    document.title = 'Pretaquiz — Turn Visitors Into Qualified Leads';
  }, []);

  if (!slug || !VALID_SLUGS.includes(slug)) return <Navigate to="/" replace />;

  const stripeUrl = STRIPE_URLS[slug];

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.ink, color: '#fff', scrollBehavior: 'smooth', fontFamily: FONT }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
                className="text-4xl font-bold leading-[1.08] md:text-5xl lg:text-[3.25rem]"
              >
                Turn website visitors into{' '}
                <span style={{ color: C.amber }}>qualified leads</span>{' '}
                while you sleep
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
                className="mt-6 max-w-lg text-lg leading-relaxed font-light"
                style={{ color: C.textBody }}
              >
                A branded quiz on your site qualifies prospects, grows your list, and sends you warm leads 24/7 — without a discovery call, a tech team, or a morning routine interrupted by cold outreach.
              </motion.p>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
                className="mt-4 text-sm font-medium"
                style={{ color: C.textMuted }}
              >
                Join 12+ coaches already on the founding member list · Spots close when we hit 20
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:bg-white/5 active:scale-[0.97]"
                  style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
                >
                  See It In Action
                </button>
                <a
                  href={stripeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97] inline-block"
                  style={{ backgroundColor: C.amber, color: C.ink }}
                >
                  Activate my quiz — $97 →
                </a>
              </div>
            </motion.div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease, delay: 0.15 }}
              className="flex justify-center"
            >
              <div className="relative w-[280px] rounded-[2rem] border-[6px] p-5 shadow-lg" style={{ borderColor: C.cardBorder, backgroundColor: C.cardBg }}>
                <div className="mx-auto mb-6 h-1 w-16 rounded-full" style={{ backgroundColor: C.cardBorder }} />
                <p className="text-[10px] font-medium tracking-widest uppercase" style={{ color: C.textMuted }}>Your Coaching Co.</p>
                <h3 className="mt-4 text-lg font-bold leading-snug" style={{ color: '#fff' }}>
                  What's Really Holding Your Business Back?
                </h3>
                <p className="mt-3 text-xs leading-relaxed" style={{ color: C.textBody }}>
                  Answer 7 quick questions and discover your result.
                </p>
                <p className="mt-2 text-[10px]" style={{ color: C.textMuted }}>⏱ Takes about 2 minutes</p>
                <div className="mt-5 rounded-lg py-2.5 text-center text-xs font-semibold" style={{ backgroundColor: C.amber, color: C.ink }}>
                  Find Out Now →
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.ink }}>
        <motion.div
          className="mx-auto max-w-4xl px-6 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-3xl font-bold md:text-4xl"
          >
            You're leaving <span style={{ color: C.amber }}>warm leads</span> on the table every single day
          </motion.h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PAIN_CARDS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp} transition={{ duration: 0.6, ease }}
                  className="rounded-xl p-6 text-left"
                  style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'rgba(232,145,42,0.15)' }}>
                    <Icon className="h-5 w-5" style={{ color: C.amber }} />
                  </div>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: '#fff' }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.textBody }}>{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="demo" className="py-20 md:py-28" style={{ backgroundColor: C.ink }}>
        <motion.div
          className="mx-auto max-w-4xl px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-center text-3xl font-bold md:text-4xl"
          >
            Here's How It <span style={{ color: C.amber }}>Works</span>
          </motion.h2>

          <div className="mt-14 space-y-8">
            {HOW_STEPS.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp} transition={{ duration: 0.6, ease }}
                className="flex gap-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: C.amber, color: C.ink }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold" style={{ color: '#fff' }}>{s.title}</h3>
                    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ backgroundColor: 'rgba(232,145,42,0.15)', color: C.amber }}>{s.badge}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: C.textBody }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.ink }}>
        <motion.div
          className="mx-auto max-w-4xl px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-center text-3xl font-bold md:text-4xl"
          >
            What Coaches Are <span style={{ color: C.amber }}>Saying</span>
          </motion.h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp} transition={{ duration: 0.6, ease }}
                className="rounded-xl p-6"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
              >
                <p className="text-sm leading-relaxed italic" style={{ color: C.textBright }}>
                  "{t.quote}"
                </p>
                <p className="mt-4 text-sm font-semibold" style={{ color: C.amber }}>{t.name}</p>
                <p className="text-xs" style={{ color: C.textMuted }}>{t.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-20 md:py-28" style={{ backgroundColor: C.ink }}>
        <motion.div
          className="mx-auto max-w-xl px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.div
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="overflow-hidden rounded-2xl shadow-lg"
            style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
          >
            <div className="p-8 text-center">
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
                style={{ backgroundColor: C.amber, color: C.ink }}
              >
                Founding Member
              </span>

              <h3 className="mt-4 text-xl font-bold" style={{ color: '#fff' }}>
                Lock in your spot at the <span style={{ color: C.amber }}>lowest price</span> it will ever be
              </h3>
              <p className="mt-1 text-sm" style={{ color: C.textBody }}>
                One payment. No subscription. No monthly fees. Ever.
              </p>

              <p className="mt-4 text-base line-through" style={{ color: C.textMuted }}>$197</p>
              <p className="mt-1 text-[52px] font-bold tracking-tight" style={{ color: '#fff' }}>$97</p>
              <p className="mt-1 text-sm" style={{ color: C.textBody }}>one-time payment — yours forever</p>
            </div>

            <div className="px-8 py-6" style={{ borderTop: `1px solid ${C.cardBorder}` }}>
              <ul className="space-y-3">
                {PRICING_FEATURES.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: C.textBright }}>
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: C.amber }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-8 pb-8">
              <a
                href={stripeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg py-3.5 text-center text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ backgroundColor: C.amber, color: C.ink }}
              >
                Activate my quiz — $97 →
              </a>

              <ScarcityBar />

              <p className="mt-4 text-center text-xs" style={{ color: C.textMuted }}>
                Secure checkout · One-time payment · No subscription
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.ink }}>
        <motion.div
          className="mx-auto max-w-2xl px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-center text-3xl font-bold md:text-4xl"
          >
            Questions?
          </motion.h2>

          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-10">
            <Accordion type="single" collapsible className="space-y-2">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i} value={`faq-${i}`}
                  className="rounded-xl px-5"
                  style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
                >
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline" style={{ color: '#fff' }}>
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed" style={{ color: C.textBody }}>
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.ink }}>
        <motion.div
          className="mx-auto max-w-3xl px-6 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-sm font-semibold tracking-wide" style={{ color: C.coral }}>
            Only 6 spots left
          </motion.p>
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="mt-3 text-3xl font-bold md:text-4xl"
          >
            Ready to stop losing leads to a <span style={{ color: C.amber }}>silent website</span>?
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-4 text-base leading-relaxed font-light" style={{ color: C.textBody }}>
            Pay once. Get your quiz live today. No subscription, no hidden fees — just a quiz that works for you 24/7.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
            <a
              href={stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-lg px-8 py-3.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ backgroundColor: C.amber, color: C.ink }}
            >
              Activate my quiz — $97 →
            </a>
            <p className="mt-3 text-xs" style={{ color: C.textMuted }}>
              $97 one-time · Secure checkout · No subscription
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
