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

/* ─── PER-TEMPLATE CONTENT ─── */
interface TemplateContent {
  eyebrow: string;
  heroHeadline: string;
  heroHighlight: string;
  heroAfter: string;
  heroSub: string;
  quizStartTitle: string;
  quizStartDesc: string;
  sampleQuestion: string;
  sampleOptions: string[];
  resultTitle: string;
  resultDesc: string;
  whatYouGetCards: { title: string; body: string }[];
  howStep2Desc: string;
  pricingHeadline: string;
  pricingSubtext: string;
}

const TEMPLATE_CONTENT: Record<string, TemplateContent> = {
  'business-breakthrough': {
    eyebrow: 'For business coaches & consultants',
    heroHeadline: 'Show every prospect exactly what\'s ',
    heroHighlight: 'holding their business back',
    heroAfter: '',
    heroSub: 'The Business Breakthrough Quiz helps coaches qualify leads by revealing the specific growth bottleneck each prospect is stuck on — before you ever speak to them.',
    quizStartTitle: "What's Really Holding Your Business Back?",
    quizStartDesc: 'Answer 7 quick questions and discover the #1 thing standing between you and the business you want.',
    sampleQuestion: 'When it comes to growing your business, where do you feel most stuck?',
    sampleOptions: ['Getting visible', 'Converting leads', 'Delivering at scale', 'Managing my time'],
    resultTitle: 'Your Bottleneck: Visibility',
    resultDesc: "Your offer is strong but the right people aren't finding you yet. Here's where to focus first.",
    whatYouGetCards: [
      { title: 'Pre-qualified discovery calls', body: 'Every lead who books a call already knows their result. You start from insight, not a blank page.' },
      { title: 'A segmented email list', body: 'Four distinct result types mean four distinct audiences. Follow up with the right message for each one.' },
      { title: 'Proof of your expertise', body: "Prospects experience your thinking before they've paid you a penny. The quiz builds trust before the conversation begins." },
    ],
    howStep2Desc: 'Brand it to your business coaching practice — your logo, colours, and the language your ideal clients already use.',
    pricingHeadline: 'The Business Breakthrough Quiz — activate it today',
    pricingSubtext: 'One payment. Fully branded. Live on your site in under an hour.',
  },
  'mindset-mastery': {
    eyebrow: 'For mindset & transformational coaches',
    heroHeadline: 'Help your clients see the thinking patterns that are ',
    heroHighlight: 'keeping them stuck',
    heroAfter: '',
    heroSub: "The Mindset Mastery Quiz reveals the specific belief patterns shaping your prospects' results — so you can show up to every conversation already knowing how to help.",
    quizStartTitle: "What's Your Mindset Type?",
    quizStartDesc: 'Answer 6 questions and discover the thinking pattern that\'s shaping your results right now.',
    sampleQuestion: "When something doesn't go to plan, what's your first instinct?",
    sampleOptions: ['Analyse what went wrong', 'Look for someone to blame', 'Try a different approach', 'Shut down and withdraw'],
    resultTitle: 'Your Pattern: The Analyser',
    resultDesc: 'You seek certainty before you act. This protects you — but it can also keep you in preparation mode indefinitely.',
    whatYouGetCards: [
      { title: 'Deeper first conversations', body: 'Prospects arrive self-aware. You skip the surface-level discovery and go straight to the real work.' },
      { title: 'Higher programme fit', body: 'People self-select into your world based on their result. The leads who reach out are already aligned with your approach.' },
      { title: 'A shareable insight tool', body: 'Prospects share their result on social media. Your quiz markets itself.' },
    ],
    howStep2Desc: 'Brand it to your mindset coaching practice — your logo, colours, and the language your ideal clients already use.',
    pricingHeadline: 'The Mindset Mastery Quiz — activate it today',
    pricingSubtext: 'One payment. Fully branded. Live on your site in under an hour.',
  },
  'leadership-style': {
    eyebrow: 'For leadership & executive coaches',
    heroHeadline: "Give every leader instant insight into how their style is ",
    heroHighlight: 'shaping their team',
    heroAfter: '',
    heroSub: "The Leadership Style Quiz qualifies prospects by revealing how they lead — and where the gaps are. It's a conversation starter that sells your coaching before you've said a word.",
    quizStartTitle: "What's Your Leadership Style?",
    quizStartDesc: "Answer 7 questions and discover how your natural style is affecting your team's performance and culture.",
    sampleQuestion: 'When your team faces a difficult decision, what do you typically do?',
    sampleOptions: ['Make the call and move forward', 'Consult the team then decide', 'Hand it to the most capable person', 'Wait to see how it resolves'],
    resultTitle: 'Your Style: The Decisive Driver',
    resultDesc: 'You move fast and set clear direction. Teams respect your confidence — but may hesitate to bring you problems early.',
    whatYouGetCards: [
      { title: 'Executives who arrive ready to work', body: "Leaders who've taken the quiz come to the first session with genuine self-awareness, not defensiveness." },
      { title: 'A clear coaching entry point', body: 'Each result type maps directly to a development area. You know exactly where to start before the call begins.' },
      { title: 'A referral-friendly tool', body: "Leaders share their result with peers. Your quiz reaches the inboxes of people who'd never have found you otherwise." },
    ],
    howStep2Desc: 'Brand it to your leadership coaching practice — your logo, colours, and the language your ideal clients already use.',
    pricingHeadline: 'The Leadership Style Quiz — activate it today',
    pricingSubtext: 'One payment. Fully branded. Live on your site in under an hour.',
  },
  'wealth-readiness': {
    eyebrow: 'For financial coaches & wealth mentors',
    heroHeadline: 'Help clients understand exactly where they stand with ',
    heroHighlight: 'money and growth',
    heroAfter: '',
    heroSub: "The Wealth Readiness Quiz reveals the beliefs, habits, and blind spots shaping your prospects' financial results — so your first conversation starts with real context.",
    quizStartTitle: 'Are You Ready to Build Real Wealth?',
    quizStartDesc: "Answer 6 questions and discover what's really driving your financial decisions right now.",
    sampleQuestion: "When an unexpected expense comes up, what's your honest reaction?",
    sampleOptions: ['I have a plan for this', 'I manage but it sets me back', 'It causes real stress', 'I try not to think about it'],
    resultTitle: 'Your Pattern: The Cautious Saver',
    resultDesc: "You're disciplined and risk-aware. But your caution may be costing you the growth you're actually capable of.",
    whatYouGetCards: [
      { title: 'Financially self-aware leads', body: 'Prospects who\'ve taken the quiz already understand their money patterns. Your discovery call starts in a completely different place.' },
      { title: 'The right clients for your programmes', body: 'Result types map directly to readiness levels. You attract people who are genuinely ready to invest in change.' },
      { title: 'A trust-building first touchpoint', body: 'The quiz delivers real value before anyone spends a penny. That generosity converts better than any sales page alone.' },
    ],
    howStep2Desc: 'Brand it to your financial coaching practice — your logo, colours, and the language your ideal clients already use.',
    pricingHeadline: 'The Wealth Readiness Quiz — activate it today',
    pricingSubtext: 'One payment. Fully branded. Live on your site in under an hour.',
  },
};

/* ─── SCARCITY BAR ─── */
function ScarcityBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mt-6 w-full max-w-xs mx-auto">
      <div className="flex justify-between text-xs font-medium mb-1.5">
        <span style={{ color: C.footnote }}>Spots claimed</span>
        <span style={{ color: C.cta }}>14 of 20 taken</span>
      </div>
      <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: C.cardBorder }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: C.cta }}
          initial={{ width: 0 }}
          animate={inView ? { width: '68%' } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
}

/* ─── NAV ─── */
function Nav({ stripeUrl }: { stripeUrl: string }) {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(15,10,30,0.85)', borderColor: C.cardBorder }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-[22px] font-bold tracking-tight">
          <span style={{ color: '#fff' }}>Preta</span><span style={{ color: C.accent }}>Quiz</span>
        </Link>
        <div className="flex items-center gap-4">
          <span
            className="hidden sm:inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide"
            style={{ backgroundColor: 'rgba(217,70,239,0.15)', color: C.accent, border: '1px solid rgba(217,70,239,0.3)' }}
          >
            Founding Member Offer
          </span>
          <Link
            to="/login"
            className="rounded-lg px-5 py-2 text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: 'rgba(217,70,239,0.15)', color: '#FFFFFF', border: '1px solid rgba(217,70,239,0.3)' }}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

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
function getHowSteps(step2Desc: string) {
  return [
    { title: 'Activate your quiz in one click', desc: 'Pay once and get instant access to your dashboard. No waiting, no setup calls.', badge: 'Takes 2 minutes' },
    { title: 'Build your quiz in the dashboard', desc: step2Desc, badge: 'Takes ~45 minutes' },
    { title: 'Share your unique quiz link', desc: 'Drop it in your email signature, Instagram bio, LinkedIn, or embed it on your website.', badge: 'Takes 5 minutes' },
    { title: 'Leads land in your inbox and CRM', desc: 'Every prospect gets a personalised result email. You get their details and a warm lead — automatically.', badge: 'Happens automatically' },
  ];
}

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

/* ─── PRICING FEATURES ─── */
const PRICING_FEATURES = [
  'Your branded quiz live within 60 minutes',
  'Personalised results email sent to every prospect',
  'Automatic lead delivery to your CRM via webhook',
  'All leads stored in your dashboard',
  'Embed on your site or use as a standalone link',
  'No tech skills required — ever',
];

/* ─── FAQS ─── */
const FAQS = [
  { q: 'Can I change the questions?', a: 'Yes — all of them. Every question, answer option, and result description is editable from your dashboard. The template gives you a starting point, not a constraint.' },
  { q: 'Does it work on my website?', a: 'Yes. You get an embed code to paste onto any website — Squarespace, Wix, WordPress, Kajabi, whatever you use. Or share the standalone link directly.' },
  { q: 'What happens after I buy?', a: "You'll receive your dashboard login immediately after checkout. Log in, pick your template, and follow the setup steps. Most clients are live within the hour." },
  { q: 'Do I need a developer?', a: 'No. Everything is point-and-click. If you can update a Google Doc, you can set up your quiz.' },
  { q: 'Is there a monthly fee?', a: 'No. $97 one-time payment. No subscription, no renewal, no surprises.' },
  { q: 'What CRMs does it connect to?', a: 'Anything that accepts a webhook — including Zapier, which means it connects to almost every CRM and email tool on the market.' },
];

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t py-8" style={{ borderColor: C.cardBorder }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs sm:flex-row" style={{ color: C.footnote }}>
        <p>&copy; 2026 Pretaquiz</p>
        <div className="flex gap-5">
          <Link to="/login" className="hover:opacity-80 transition-opacity">Login</Link>
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
  const content = TEMPLATE_CONTENT[slug];
  const howSteps = getHowSteps(content.howStep2Desc);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.pageBg, color: '#fff', scrollBehavior: 'smooth' }}>
      <Nav stripeUrl={stripeUrl} />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
              <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
                <span className="inline-block rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide" style={{ backgroundColor: 'rgba(217,70,239,0.15)', color: C.accent, border: '1px solid rgba(217,70,239,0.3)' }}>
                  {content.eyebrow}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
                className="mt-5 text-4xl font-bold leading-[1.08] md:text-5xl lg:text-[3.25rem]"
                style={{ color: C.headline }}
              >
                {content.heroHeadline}
                <span style={{ color: C.accent }}>{content.heroHighlight}</span>
                {content.heroAfter}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
                className="mt-6 max-w-lg text-lg leading-relaxed font-light"
                style={{ color: C.body }}
              >
                {content.heroSub}
              </motion.p>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, ease }}
                className="mt-4 text-sm font-medium"
                style={{ color: C.footnote }}
              >
                Join 12+ coaches already on the founding member list
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={`/quiz/demo-${slug}`}
                  className="rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:bg-white/5 active:scale-[0.97]"
                  style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.90)' }}
                >
                  See It In Action
                </Link>
                <a
                  href={stripeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97] inline-block"
                  style={{ backgroundColor: C.cta, color: '#FFFFFF' }}
                >
                  Activate this quiz — $97 &rarr;
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
                <p className="text-[10px] font-medium tracking-widest uppercase" style={{ color: C.footnote }}>Sarah Mitchell Coaching</p>
                <h3 className="mt-4 text-lg font-bold leading-snug" style={{ color: C.headline }}>
                  {content.quizStartTitle}
                </h3>
                <p className="mt-3 text-xs leading-relaxed" style={{ color: C.body }}>
                  {content.quizStartDesc}
                </p>
                <p className="mt-2 text-[10px]" style={{ color: C.footnote }}>Takes about 2 minutes</p>
                <div className="mt-5 rounded-lg py-2.5 text-center text-xs font-semibold" style={{ backgroundColor: C.cta, color: '#FFFFFF' }}>
                  Find Out Now &rarr;
                </div>
              </div>
            </motion.div>
            <p className="mt-4 text-center text-xs font-medium" style={{ color: 'rgba(217,70,239,0.8)' }}>
              Your logo. Your colours. Your name. ✦
            </p>
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.sectionBg }}>
        <motion.div
          className="mx-auto max-w-4xl px-6 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-3xl font-bold md:text-4xl"
            style={{ color: C.headline }}
          >
            You're leaving <span style={{ color: C.accent }}>warm leads</span> on the table every single day
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
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: 'rgba(217,70,239,0.15)' }}>
                    <Icon className="h-5 w-5" style={{ color: C.accent }} />
                  </div>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: C.headline }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.supporting }}>{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ─── QUIZ PREVIEW ─── */}
      <section id="quiz-preview" className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <motion.div
          className="mx-auto max-w-5xl px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: C.headline }}>
              See exactly what your leads <span style={{ color: C.accent }}>will experience</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: C.body }}>
              This is a live preview of the quiz your prospects will take. Every question, result, and email is fully customisable.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Screen 1 — Start */}
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="rounded-xl p-6" style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
              <p className="text-[10px] font-medium tracking-widest uppercase mb-3" style={{ color: C.footnote }}>Start Screen</p>
              <h3 className="text-base font-bold" style={{ color: C.headline }}>{content.quizStartTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: C.body }}>{content.quizStartDesc}</p>
              <div className="mt-4 rounded-lg py-2 text-center text-xs font-semibold" style={{ backgroundColor: C.cta, color: '#FFFFFF' }}>
                Start the quiz &rarr;
              </div>
            </motion.div>

            {/* Screen 2 — Question */}
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="rounded-xl p-6" style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
              <p className="text-[10px] font-medium tracking-widest uppercase mb-3" style={{ color: C.footnote }}>Sample Question</p>
              <p className="text-sm font-semibold mb-3" style={{ color: C.headline }}>{content.sampleQuestion}</p>
              <div className="space-y-2">
                {content.sampleOptions.map((opt, i) => (
                  <div key={i} className="rounded-lg px-3 py-2 text-xs" style={{ backgroundColor: i === 0 ? 'rgba(217,70,239,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${i === 0 ? 'rgba(217,70,239,0.3)' : C.cardBorder}`, color: i === 0 ? C.accent : C.supporting }}>
                    {opt}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Screen 3 — Result */}
            <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="rounded-xl p-6" style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}>
              <p className="text-[10px] font-medium tracking-widest uppercase mb-3" style={{ color: C.footnote }}>Result Preview</p>
              <h3 className="text-base font-bold" style={{ color: C.accent }}>{content.resultTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: C.body }}>{content.resultDesc}</p>
              <div className="mt-4 rounded-lg py-2 text-center text-xs font-semibold" style={{ backgroundColor: C.cta, color: '#FFFFFF' }}>
                Book your call &rarr;
              </div>
            </motion.div>
          </div>

          <div className="mt-8 text-center">
            <a
              href={`/quiz/demo-${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: C.accent }}
            >
              Take the full quiz &rarr; <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ─── WHAT YOU'LL GET ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.sectionBg }}>
        <motion.div
          className="mx-auto max-w-4xl px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-center text-3xl font-bold md:text-4xl"
            style={{ color: C.headline }}
          >
            What happens when this quiz is <span style={{ color: C.accent }}>live on your site</span>
          </motion.h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {content.whatYouGetCards.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeUp} transition={{ duration: 0.6, ease }}
                className="rounded-xl p-6"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
              >
                <h3 className="text-sm font-semibold mb-2" style={{ color: C.headline }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.supporting }}>{card.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <motion.div
          className="mx-auto max-w-4xl px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-center text-3xl font-bold md:text-4xl"
            style={{ color: C.headline }}
          >
            Here's How It <span style={{ color: C.accent }}>Works</span>
          </motion.h2>

          <div className="mt-14 space-y-8">
            {howSteps.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp} transition={{ duration: 0.6, ease }}
                className="flex gap-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: C.cta, color: '#FFFFFF' }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold" style={{ color: C.headline }}>{s.title}</h3>
                    <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ backgroundColor: 'rgba(217,70,239,0.15)', color: C.accent }}>{s.badge}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: C.body }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.sectionBg }}>
        <motion.div
          className="mx-auto max-w-4xl px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-center text-3xl font-bold md:text-4xl"
            style={{ color: C.headline }}
          >
            What Coaches Are <span style={{ color: C.accent }}>Saying</span>
          </motion.h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp} transition={{ duration: 0.6, ease }}
                className="rounded-xl p-6"
                style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
              >
                <p className="text-sm leading-relaxed italic" style={{ color: C.supporting }}>
                  "{t.quote}"
                </p>
                <p className="mt-4 text-sm font-semibold" style={{ color: C.accent }}>{t.name}</p>
                <p className="text-xs" style={{ color: C.footnote }}>{t.role}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href={stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg px-8 py-3.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ backgroundColor: C.cta, color: '#FFFFFF' }}
            >
              Activate this quiz — $97 &rarr;
            </a>
          </div>
        </motion.div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <motion.div
          className="mx-auto max-w-2xl px-6"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-center text-3xl font-bold md:text-4xl"
            style={{ color: C.headline }}
          >
            Questions you <span style={{ color: C.accent }}>probably have</span>
          </motion.h2>

          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-10">
            <Accordion type="single" collapsible className="space-y-2">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i} value={`faq-${i}`}
                  className="rounded-xl px-5"
                  style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
                >
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline" style={{ color: C.headline }}>
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed" style={{ color: C.body }}>
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
          <div className="mt-12 text-center">
            <p className="mb-3" style={{ color: C.footnote, fontSize: '13px' }}>
              One payment. No subscription. Live in under an hour.
            </p>
            <a
              href={stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg px-8 py-3.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ backgroundColor: C.cta, color: '#FFFFFF' }}
            >
              Activate this quiz — $97 &rarr;
            </a>
          </div>
        </motion.div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-20 md:py-28" style={{ backgroundColor: C.sectionBg }}>
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
                style={{ backgroundColor: C.cta, color: '#FFFFFF' }}
              >
                Founding Member
              </span>

              <h3 className="mt-4 text-xl font-bold" style={{ color: C.headline }}>
                {content.pricingHeadline}
              </h3>
              <p className="mt-1 text-sm" style={{ color: C.body }}>
                {content.pricingSubtext}
              </p>

              <p className="mt-4 text-base line-through" style={{ color: C.footnote }}>$197</p>
              <p className="mt-1 text-[52px] font-bold tracking-tight" style={{ color: C.headline }}>$97</p>
              <p className="mt-1 text-sm" style={{ color: C.body }}>one-time payment — yours forever</p>
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
              <a
                href={stripeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-lg py-3.5 text-center text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ backgroundColor: C.cta, color: '#FFFFFF' }}
              >
                Activate my quiz — $97 &rarr;
              </a>

              <ScarcityBar />

              <p className="mt-4 text-center text-xs" style={{ color: C.footnote }}>
                Secure checkout &middot; One-time payment &middot; No subscription
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.pageBg }}>
        <motion.div
          className="mx-auto max-w-3xl px-6 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}
        >
          <motion.p variants={fadeUp} transition={{ duration: 0.6, ease }} className="text-sm font-semibold tracking-wide" style={{ color: C.cta }}>
            Only 6 spots left
          </motion.p>
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="mt-3 text-3xl font-bold md:text-4xl"
            style={{ color: C.headline }}
          >
            Ready to stop losing leads to a <span style={{ color: C.accent }}>silent website</span>?
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, ease }} className="mt-4 text-base leading-relaxed font-light" style={{ color: C.body }}>
            Pay once. Get your quiz live today. No subscription, no hidden fees — just a quiz that works for you 24/7.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
            <a
              href={stripeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-lg px-8 py-3.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ backgroundColor: C.cta, color: '#FFFFFF' }}
            >
              Activate my quiz — $97 &rarr;
            </a>
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