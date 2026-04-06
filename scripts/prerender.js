import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

const pages = [
  {
    route: '/',
    title: 'PretaQuiz — Your Quiz Funnel, Live in Under an Hour',
    description: 'A branded lead-generation quiz for coaches, consultants, and service providers. Customise every question and result. Live in under an hour. $97 one-time.',
    h1: 'Your website gets visitors. Are any of them becoming leads?',
    body: 'PretaQuiz gives coaches and consultants a branded lead-generation quiz they can make their own. No tech skills. No monthly fees. Live in under an hour. Upload your logo, set your brand colour, write your questions and results. Every completed quiz sends lead data straight to your CRM via webhook. $97 one-time payment. Works for business coaches, mindset coaches, leadership coaches, financial coaches, and any service provider who works with people.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', '@id': 'https://pretaquiz.com/#organization', name: 'PretaQuiz', url: 'https://pretaquiz.com', description: 'A branded lead-generation quiz for coaches, consultants, and service providers.' },
        { '@type': 'WebSite', '@id': 'https://pretaquiz.com/#website', url: 'https://pretaquiz.com', name: 'PretaQuiz', publisher: { '@id': 'https://pretaquiz.com/#organization' } },
        { '@type': 'WebPage', '@id': 'https://pretaquiz.com/#webpage', url: 'https://pretaquiz.com', name: 'PretaQuiz — Your Quiz Funnel, Live in Under an Hour', description: 'A branded lead-generation quiz for coaches, consultants, and service providers. Customise every question and result. Live in under an hour.', isPartOf: { '@id': 'https://pretaquiz.com/#website' } },
        { '@type': 'SoftwareApplication', name: 'PretaQuiz', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '97', priceCurrency: 'USD', priceValidUntil: '2027-12-31' }, description: 'Branded quiz funnel for coaches and consultants. Customise questions, results, and branding. Live in under an hour.' },
      ],
    },
  },
  {
    route: '/welcome',
    title: 'Welcome — PretaQuiz',
    description: 'Your quiz is being set up. Check your inbox for a magic link to set your password and access your dashboard.',
    h1: 'Welcome to PretaQuiz',
    body: 'Your quiz is being set up right now. Check your inbox for a magic link to set your password and access your PretaQuiz dashboard. Open the email, click the link, and start customising your quiz.',
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
  },
  {
    route: '/waitlist',
    title: 'Join the Waitlist — PretaQuiz',
    description: 'Be first in line for PretaQuiz. The fastest way to qualify leads online with ready-made quiz funnels for coaches and consultants.',
    h1: 'Join the PretaQuiz Waitlist',
    body: 'Be the first to know when PretaQuiz launches. Ready-made quiz funnels for coaches, consultants, and service providers. Sign up to get early access.',
  },
  {
    route: '/dpa',
    title: 'Data Processing Agreement — PretaQuiz',
    description: 'PretaQuiz Data Processing Agreement. How we process personal data on behalf of our clients in compliance with GDPR.',
    h1: 'Data Processing Agreement',
    body: 'Data Processing Agreement for PretaQuiz. This agreement governs how PretaQuiz processes personal data on behalf of coaches and consultants who use the platform, in compliance with GDPR and applicable data protection law.',
  }
];

for (const page of pages) {
  let html = template;
  
  const canonicalUrl = `https://pretaquiz.com${page.route === '/' ? '' : page.route}`;
  
  // Update title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`);
  
  // Update or inject canonical
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonicalUrl}"`);
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }
  
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
    `<meta property="og:url" content="${canonicalUrl}"`
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
