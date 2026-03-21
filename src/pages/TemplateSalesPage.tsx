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
};

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
      <div className="flex justify-between text-xs font-medium mb-1.5" style={{ color: C.inkMid }}>
        <span>Spots claimed</span>
        <span style={{ color: C.coral }}>14 of 20 taken</span>
      </div>
      <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: C.creamMid }}>
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
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(253,250,246,0.85)', borderColor: C.border }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-[22px] font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span style={{ color: C.ink }}>Preta</span><span style={{ color: C.amber }}>quiz</span>
        </Link>
        <div className="flex items-center gap-4">
          <span
            className="hidden sm:inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide"
            style={{ backgroundColor: C.amberLight, color: C.amber }}
          >
            Founding Member Offer
          </span>
          <Link to="/login" className="text-sm font-medium transition-colors" style={{ color: C.inkLight }}>
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
  { title: 'Purchase and get instant access', desc: "You'll receive your login credentials immediately after checkout. No waiting, no setup calls, no onboarding meeting.", badge: 'Takes 2 minutes' },
  { title: 'Build your quiz in the dashboard', desc: 'Upload your logo, set your brand colour, write your questions and result descriptions. No code, no designer, no guesswork.', badge: 'Takes ~45 minutes' },
  { title: 'Share your unique quiz link', desc: 'Drop it in your email signature, your Instagram bio, your next LinkedIn post, or embed it directly on your website.', badge: 'Takes 5 minutes' },
  { title: 'Leads land in your inbox and CRM', desc: 'Every person who completes the quiz gets a personalised result email from you. You get their details, their result, and a warm lead — automatically.', badge: 'Happens automatically' },
];

/* ─── TESTIMONIALS ─── */
const TESTIMONIALS = [
  {
    quote: "I set it up in an afternoon and had my first lead come through the same evening. The quality of leads is so much better — they already know their result before we even speak.",
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
    <footer className="border-t py-8" style={{ borderColor: C.border }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs sm:flex-row" style={{ color: C.inkLight }}>
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
    <div className="min-h-screen" style={{ backgroundColor: C.cream, color: C.ink, scrollBehavior: 'smooth', fontFamily: "'DM Sans', sans-serif" }}>
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
                style={{ fontFamily: "'Playfair Display', serif", color: C.ink }}
              >
                Turn website visitors into{' '}
                <em style={{ color: C.amber, fontStyle: 'italic' }}>qualified leads</em>{' '}
                while you sleep
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
                className="mt-6 max-w-lg text-lg leading-relaxed"
                style={{ color: C.inkMid }}
              >
                A branded quiz on your site qualifies prospects, grows your list, and sends you warm leads 24/7 — without a discovery call, a tech team, or a morning routine interrupted by cold outreach.
              </motion.p>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
                className="mt-4 text-sm font-medium"
                style={{ color: C.inkLight }}
              >
                Join 12+ coaches already on the founding member list · Spots close when we hit 20
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all hover:shadow-sm active:scale-[0.97]"
                  style={{ borderColor: C.amber, color: C.amber }}
                >
                  See It In Action
                </button>
                <a
                  href={stripeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97] inline-block"
                  style={{ backgroundColor: C.amber }}
                >
                  Claim my founding member spot →
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
              <div className="relative w-[280px] rounded-[2rem] border-[6px] p-5 shadow-lg" style={{ borderColor: C.border, backgroundColor: '#fff' }}>
                <div className="mx-auto mb-6 h-1 w-16 rounded-full" style={{ backgroundColor: C.creamMid }} />
                <p className="text-[10px] font-medium tracking-widest uppercase" style={{ color: C.inkLight }}>Your Coaching Co.</p>
                <h3 className="mt-4 text-lg font-bold leading-snug" style={{ fontFamily: "'Playfair Display', serif", color: C.ink }}>
                  What's Really Holding Your Business Back?
                </h3>
                <p className="mt-3 text-xs leading-relaxed" style={{ color: C.inkMid }}>
                  Answer 7 quick questions and discover your result.
                </p>
                <p className="mt-2 text-[10px]" style={{ color: C.inkLight }}>⏱ Takes about 2 minutes</p>
                <div className="mt-5 rounded-full py-2.5 text-center text-xs font-semibold text-white" style={{ backgroundColor: C.amber }}>
                  Find Out Now →
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#fff' }}>
        <motion.div
          className="mx-auto max-w-4xl px-6 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-3xl font-bold md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", color: C.ink }}
          >
            You're leaving warm leads on the table every single day
          </motion.h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PAIN_CARDS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp} transition={{ duration: 0.6, ease }}
                  className="rounded-xl p-6 text-left shadow-sm"
                  style={{ backgroundColor: C.cream, border: `1px solid ${C.border}` }}
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: C.amberLight }}>
                    <Icon className="h-5 w-5" style={{ color: C.amber }} />
                  </div>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: C.ink }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.inkMid }}>{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="demo" className="py-20 md:py-28" style={{ backgroundColor: C.cream }}>
        <motion.div
          className="mx-auto max-w-4xl px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-center text-3xl font-bold md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", color: C.ink }}
          >
            Here's How It Works
          </motion.h2>

          <div className="mt-14 space-y-8">
            {HOW_STEPS.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp} transition={{ duration: 0.6, ease }}
                className="flex gap-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: C.amber }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold" style={{ color: C.ink }}>{s.title}</h3>
                    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ backgroundColor: C.amberLight, color: C.amberDark }}>{s.badge}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: C.inkMid }}>{s.desc}</p>
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
            style={{ fontFamily: "'Playfair Display', serif", color: '#fff' }}
          >
            What Coaches Are Saying
          </motion.h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp} transition={{ duration: 0.6, ease }}
                className="rounded-xl p-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  "{t.quote}"
                </p>
                <p className="mt-4 text-sm font-semibold" style={{ color: C.amber }}>{t.name}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-20 md:py-28" style={{ backgroundColor: C.cream }}>
        <motion.div
          className="mx-auto max-w-xl px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.div
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="overflow-hidden rounded-2xl shadow-lg"
            style={{ backgroundColor: '#fff', border: `1px solid ${C.border}` }}
          >
            <div className="p-8 text-center">
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide"
                style={{ backgroundColor: C.amberLight, color: C.amber }}
              >
                Founding Member
              </span>

              <h3 className="mt-4 text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: C.ink }}>
                Lock in your price before it goes up
              </h3>
              <p className="mt-1 text-sm" style={{ color: C.inkMid }}>
                One-time activation. No monthly fees. No subscriptions.
              </p>

              <p className="mt-6 text-5xl font-bold tracking-tight" style={{ color: C.ink }}>$97</p>
              <p className="mt-1 text-sm" style={{ color: C.inkMid }}>one-time activation fee</p>
            </div>

            <div className="px-8 py-6" style={{ borderTop: `1px solid ${C.border}` }}>
              <ul className="space-y-3">
                {PRICING_FEATURES.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: C.ink }}>
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
                className="block w-full rounded-full py-3.5 text-center text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ backgroundColor: C.amber }}
              >
                Claim my founding member spot →
              </a>

              <ScarcityBar />

              <p className="mt-4 text-center text-xs" style={{ color: C.inkLight }}>
                Secure checkout · One-time payment, no subscriptions
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#fff' }}>
        <motion.div
          className="mx-auto max-w-2xl px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-center text-3xl font-bold md:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif", color: C.ink }}
          >
            Questions?
          </motion.h2>

          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-10">
            <Accordion type="single" collapsible className="space-y-2">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i} value={`faq-${i}`}
                  className="rounded-xl px-5 shadow-sm"
                  style={{ backgroundColor: C.cream, border: `1px solid ${C.border}` }}
                >
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline" style={{ color: C.ink }}>
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed" style={{ color: C.inkMid }}>
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.cream }}>
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
            style={{ fontFamily: "'Playfair Display', serif", color: C.ink }}
          >
            Ready to stop losing leads to a silent website?
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-4 text-base leading-relaxed" style={{ color: C.inkMid }}>
            Get your quiz live today — at the lowest price it will ever be. This founding member rate is gone when the last spot goes.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
            <a
              href={stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ backgroundColor: C.amber }}
            >
              Claim my founding member spot →
            </a>
            <p className="mt-3 text-xs" style={{ color: C.inkLight }}>
              $97 one-time · Secure checkout · No subscriptions
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
