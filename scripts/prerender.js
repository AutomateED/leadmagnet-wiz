import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

const pages = [
  
    route: '/',
    title: 'PretaQuiz — Get Your Quiz Funnel Live in Under an Hour with our Ready-Made Setup',
    description: 'Ready made quiz funnels built for coaches, consultants, and service providers. Pick your niche. Customise your quiz. Go live in under an hour.',
    h1: 'Your website gets visitors. Are any of them becoming leads?',
    body: 'PretaQuiz gives coaches and consultants a branded lead-generation quiz they can make their own. No tech skills. No monthly fees. Live in under an hour. Pick your template, upload your logo, set your brand colour, add your questions. Every completed quiz sends lead data straight to your CRM via webhook. $97 one-time payment per quiz. Choose from Business Breakthrough, Mindset Mastery, Leadership Style, or Wealth Readiness templates.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', '@id': 'https://pretaquiz.com/#organization', name: 'PretaQuiz', url: 'https://pretaquiz.com', { '@type': 'Organization', '@id': 'https://pretaquiz.com/#organization', name: 'PretaQuiz', url: 'https://pretaquiz.com', description: 'Ready-made quiz funnels for coaches, consultants, and service providers.' },
        { '@type': 'WebSite', '@id': 'https://pretaquiz.com/#website', url: 'https://pretaquiz.com', name: 'PretaQuiz', publisher: { '@id': 'https://pretaquiz.com/#organization' } },
        { '@type': 'WebPage', '@id': 'https://pretaquiz.com/#webpage', url: 'https://pretaquiz.com', name: 'PretaQuiz — Get Your Quiz Funnel Live in Under an Hour with our Ready-Made Setup', description: 'Ready made quiz funnels built for coaches, consultants, and service providers. Pick your niche. Customise your quiz. Go live in under an hour.', isPartOf: { '@id': 'https://pretaquiz.com/#website' } },
        { '@type': 'SoftwareApplication', name: 'PretaQuiz', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '97', priceCurrency: 'USD', priceValidUntil: '2027-12-31' }, description: 'Quiz funnel builder for coaches and consultants. Customise questions, brand it, and go live in under an hour.' },
      ],
    },
  },
  {
    route: '/templates/business-breakthrough',
    title: 'Business Breakthrough Quiz — PretaQuiz',
    description: 'Help your clients identify the #1 thing holding their business back. A ready-made quiz funnel for business coaches. $97 one-time payment.',
    h1: "What's Really Holding Your Business Back?",
    body: 'The Business Breakthrough Quiz helps business coaches qualify leads automatically. Your prospects take a short branded quiz and get personalised results. You get their name, email, and exactly what they need help with. Set up in under an hour. No developer needed. $97 one-time payment.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'Product', name: 'Business Breakthrough Quiz Template', description: 'Help your clients identify the #1 thing holding their business back.', brand: { '@type': 'Organization', name: 'PretaQuiz' }, url: 'https://pretaquiz.com/templates/business-breakthrough', offers: { '@type': 'Offer', price: '97', priceCurrency: 'USD', availability: 'https://schema.org/InStock', priceValidUntil: '2027-12-31' }, category: 'For business coaches & consultants' },
  },
  {
    route: '/templates/mindset-mastery',
    title: 'Mindset Mastery Quiz — PretaQuiz',
    description: 'Reveal the thinking patterns shaping your clients\' results. A ready-made quiz funnel for life and mindset coaches. $97 one-time payment.',
    h1: "What's Your Hidden Mindset Block?",
    body: 'The Mindset Mastery Quiz helps life and mindset coaches qualify leads automatically. Your prospects discover their hidden mindset blocks and get personalised results. You get their name, email, and exactly what they need. Set up in under an hour. No developer needed. $97 one-time payment.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'Product', name: 'Mindset Mastery Quiz Template', description: 'Reveal the thinking patterns shaping your clients\' results.', brand: { '@type': 'Organization', name: 'PretaQuiz' }, url: 'https://pretaquiz.com/templates/mindset-mastery', offers: { '@type': 'Offer', price: '97', priceCurrency: 'USD', availability: 'https://schema.org/InStock', priceValidUntil: '2027-12-31' }, category: 'For mindset & transformational coaches' },
  },
  {
    route: '/templates/leadership-style',
    title: 'Leadership Style Quiz — PretaQuiz',
    description: 'Show leaders how their style affects their team and outcomes. A ready-made quiz funnel for leadership coaches. $97 one-time payment.',
    h1: 'What Kind of Leader Are You?',
    body: 'The Leadership Style Quiz helps leadership and executive coaches qualify leads automatically. Your prospects discover their leadership style and get personalised results. You get their name, email, and exactly what they need. Set up in under an hour. No developer needed. $97 one-time payment.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'Product', name: 'Leadership Style Quiz Template', description: 'Show leaders how their style affects their team and outcomes.', brand: { '@type': 'Organization', name: 'PretaQuiz' }, url: 'https://pretaquiz.com/templates/leadership-style', offers: { '@type': 'Offer', price: '97', priceCurrency: 'USD', availability: 'https://schema.org/InStock', priceValidUntil: '2027-12-31' }, category: 'For leadership and executive coaches' },
  },
  {
    route: '/templates/wealth-readiness',
    title: 'Wealth Readiness Quiz — PretaQuiz',
    description: 'Help clients understand their relationship with money and growth. A ready-made quiz funnel for financial coaches. $97 one-time payment.',
    h1: 'How Ready Are You to Build Real Wealth?',
    body: 'The Wealth Readiness Quiz helps financial coaches and wealth consultants qualify leads automatically. Your prospects assess their wealth readiness and get personalised results. You get their name, email, and exactly what they need. Set up in under an hour. No developer needed. $97 one-time payment.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'Product', name: 'Wealth Readiness Quiz Template', description: 'Help clients understand their relationship with money and growth.', brand: { '@type': 'Organization', name: 'PretaQuiz' }, url: 'https://pretaquiz.com/templates/wealth-readiness', offers: { '@type': 'Offer', price: '97', priceCurrency: 'USD', availability: 'https://schema.org/InStock', priceValidUntil: '2027-12-31' }, category: 'For financial coaches and wealth consultants' },
  },
  {
    route: '/contact',
    title: 'Contact — PretaQuiz',
    description: 'Get in touch with PretaQuiz. Questions about setting up your quiz funnel? We are here to help.',
    h1: 'Contact PretaQuiz',
    body: 'Have questions about PretaQuiz? Get in touch and we will help you get your quiz funnel set up.',
  },
  {
    route: '/terms',
    title: 'Terms of Service — PretaQuiz',
    description: 'PretaQuiz terms of service and conditions of use.',
    h1: 'Terms of Service',
    body: 'Terms of service for PretaQuiz.',
  },
  {
    route: '/privacy',
    title: 'Privacy Policy — PretaQuiz',
    description: 'PretaQuiz privacy policy. How we handle your data.',
    h1: 'Privacy Policy',
    body: 'Privacy policy for PretaQuiz.',
  }
];

for (const page of pages) {
  let html = template;
  
  // Update title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`);
  
  // Update meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${page.description}"`
  );
  
  // Update OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${page.title}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${page.description}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="https://pretaquiz.com${page.route === '/' ? '' : page.route}"`
  );
  
  // Inject JSON-LD if present
  if (page.jsonLd) {
    const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>`;
    html = html.replace('</head>', jsonLdScript + '\n</head>');
  }

  // Inject SEO content into the body, inside the root div
  const seoContent = `<div id="root"><div style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0"><h1>${page.h1}</h1><p>${page.body}</p></div>`;
  html = html.replace('<div id="root"></div>', seoContent + '</div>');
  
  // Write the file
  const routePath = page.route === '/' ? '' : page.route;
  const outputPath = join(distDir, routePath, 'index.html');
  const outputDir = dirname(outputPath);
  
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  writeFileSync(outputPath, html);
  console.log(`Pre-rendered: ${page.route} -> ${outputPath}`);
}

console.log(`\nDone! Pre-rendered ${pages.length} pages.`);
