import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ─── PALETTE ─── */
const C = {
  amber: '#E8912A',
  amberDark: '#C4721A',
  ink: '#1A1714',
  textMuted: 'rgba(255,255,255,0.55)',
  textBody: 'rgba(255,255,255,0.65)',
  cardBg: 'rgba(255,255,255,0.05)',
  cardBorder: 'rgba(255,255,255,0.1)',
};

const FONT = "'Outfit', sans-serif";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const ease = [0.16, 1, 0.3, 1] as const;

const TEMPLATES = [
  { name: 'Business Breakthrough Quiz', tagline: "What's Really Holding Your Business Back?", niche: 'For business coaches', href: '/templates/business-breakthrough' },
  { name: 'Mindset Mastery Quiz', tagline: "What's Your Hidden Mindset Block?", niche: 'For life and mindset coaches', href: '/templates/mindset-mastery' },
  { name: 'Leadership Style Quiz', tagline: 'What Kind of Leader Are You?', niche: 'For leadership and executive coaches', href: '/templates/leadership-style' },
  { name: 'Wealth Readiness Quiz', tagline: 'How Ready Are You to Build Real Wealth?', niche: 'For financial coaches and wealth consultants', href: '/templates/wealth-readiness' },
];

const STEPS = [
  { num: '1', title: 'Pick your quiz template', desc: 'Choose from our library of niche-specific quiz funnels designed for coaches.' },
  { num: '2', title: 'Customise it with your branding', desc: 'Add your logo, colours, questions, and personalised results.' },
  { num: '3', title: 'Share your link and start capturing leads', desc: 'Go live in under an hour and watch qualified leads roll in.' },
];

function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b" style={{ backgroundColor: 'rgba(26,23,20,0.85)', borderColor: C.cardBorder, fontFamily: FONT }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-[22px] font-bold tracking-tight" style={{ fontFamily: FONT }}>
          <span style={{ color: '#fff' }}>Preta</span><span style={{ color: C.amber }}>Quiz</span>
        </Link>
        <Link to="/login" className="text-sm font-medium transition-colors" style={{ color: C.textMuted }}>Login</Link>
      </div>
    </nav>
  );
}

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

export default function HomePage() {
  useEffect(() => {
    document.title = 'Pretaquiz — Done-for-You Quiz Funnels for Coaches';
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', 'Done-for-you quiz funnels built for coaches, consultants, and service providers. Pick your niche. Customise your quiz. Go live in under an hour.');
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.ink, color: '#fff', scrollBehavior: 'smooth', fontFamily: FONT }}>
      <Nav />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h1
              variants={fadeUp} transition={{ duration: 0.6, ease }}
              className="text-4xl font-bold leading-[1.08] md:text-5xl lg:text-[3.25rem]"
            >
              Turn Website Visitors Into{' '}
              <span style={{ color: C.amber }}>Qualified Leads</span>{' '}
              — Automatically
            </motion.h1>
            <motion.p
              variants={fadeUp} transition={{ duration: 0.6, ease }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed font-light"
              style={{ color: C.textBody }}
            >
              Done-for-you quiz funnels built for coaches, consultants, and service providers. Pick your niche. Customise your quiz. Go live in under an hour.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── TEMPLATE GRID ─── */}
      <section id="templates" className="pb-20 md:pb-28">
        <motion.div className="mx-auto max-w-5xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <div className="grid gap-6 sm:grid-cols-2">
            {TEMPLATES.map((t) => (
              <motion.div key={t.href} variants={fadeUp} transition={{ duration: 0.6, ease }}>
                <Link
                  to={t.href}
                  className="group block rounded-xl p-6 transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: C.cardBg, border: `1px solid ${C.cardBorder}` }}
                >
                  <span className="inline-block rounded-full px-3 py-1 text-[11px] font-medium tracking-wide" style={{ backgroundColor: 'rgba(232,145,42,0.15)', color: C.amber }}>
                    {t.niche}
                  </span>
                  <h3 className="mt-4 text-xl font-bold" style={{ color: '#fff' }}>
                    {t.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: C.textBody }}>{t.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium transition-colors" style={{ color: C.amber }}>
                    View Template <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.ink }}>
        <motion.div className="mx-auto max-w-4xl px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-center text-3xl font-bold md:text-4xl"
          >
            How It <span style={{ color: C.amber }}>Works</span>
          </motion.h2>

          <div className="mt-14 space-y-10">
            {STEPS.map((s) => (
              <motion.div key={s.num} variants={fadeUp} transition={{ duration: 0.6, ease }} className="flex gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: C.amber, color: C.ink }}>
                  {s.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: '#fff' }}>{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: C.textBody }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: C.ink }}>
        <motion.div className="mx-auto max-w-3xl px-6 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.h2
            variants={fadeUp} transition={{ duration: 0.6, ease }}
            className="text-3xl font-bold md:text-4xl"
          >
            Ready to turn your website into a <span style={{ color: C.amber }}>lead machine</span>?
          </motion.h2>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, ease }}>
            <button
              onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 rounded-lg px-8 py-3.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ backgroundColor: C.amber, color: C.ink }}
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
