import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BRAND = '#C9A96E';

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const TEMPLATES = [
  {
    name: 'Business Breakthrough Quiz',
    tagline: "What's Really Holding Your Business Back?",
    niche: 'For business coaches',
    href: '/templates/business-breakthrough',
  },
  {
    name: 'Mindset Mastery Quiz',
    tagline: "What's Your Hidden Mindset Block?",
    niche: 'For life and mindset coaches',
    href: '/templates/mindset-mastery',
  },
  {
    name: 'Leadership Style Quiz',
    tagline: 'What Kind of Leader Are You?',
    niche: 'For leadership and executive coaches',
    href: '/templates/leadership-style',
  },
  {
    name: 'Wealth Readiness Quiz',
    tagline: 'How Ready Are You to Build Real Wealth?',
    niche: 'For financial coaches and wealth consultants',
    href: '/templates/wealth-readiness',
  },
];

const STEPS = [
  { num: '1', title: 'Pick your quiz template', desc: 'Choose from our library of niche-specific quiz funnels designed for coaches.' },
  { num: '2', title: 'Customise it with your branding', desc: 'Add your logo, colours, questions, and personalised results.' },
  { num: '3', title: 'Share your link and start capturing leads', desc: 'Go live in under an hour and watch qualified leads roll in.' },
];

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

export default function HomePage() {
  useEffect(() => {
    document.title = 'PretaQuiz — Done-for-You Quiz Funnels for Coaches';
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', 'Done-for-you quiz funnels built for coaches, consultants, and service providers. Pick your niche. Customise your quiz. Go live in under an hour.');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ scrollBehavior: 'smooth' }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-semibold leading-[1.08] md:text-5xl lg:text-[3.25rem]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Turn Website Visitors Into Qualified Leads — Automatically
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              Done-for-you quiz funnels built for coaches, consultants, and service providers. Pick your niche. Customise your quiz. Go live in under an hour.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── TEMPLATE GRID ─── */}
      <section id="templates" className="pb-20 md:pb-28">
        <motion.div
          className="mx-auto max-w-5xl px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {TEMPLATES.map((t) => (
              <motion.div
                key={t.href}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={t.href}
                  className="group block rounded-xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-lift hover:-translate-y-0.5"
                >
                  <span
                    className="inline-block rounded-full px-3 py-1 text-[11px] font-medium tracking-wide"
                    style={{ backgroundColor: 'rgba(201,169,110,0.1)', color: BRAND }}
                  >
                    {t.niche}
                  </span>
                  <h3
                    className="mt-4 text-xl font-semibold text-foreground"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.tagline}</p>
                  <span
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                    style={{ color: BRAND }}
                  >
                    View Template <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-secondary/50 py-20 md:py-28">
        <motion.div
          className="mx-auto max-w-4xl px-6"
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
            How It Works
          </motion.h2>

          <div className="mt-14 space-y-10">
            {STEPS.map((s) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-5"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  {s.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FINAL CTA ─── */}
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
            Ready to turn your website into a lead machine?
          </motion.h2>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <button
              onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lift active:scale-[0.97]"
              style={{ backgroundColor: BRAND }}
            >
              Browse Templates
            </button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
