import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

/* ── Supabase config (public anon key, safe to commit) ── */
const SUPABASE_URL = 'https://sgllwxhabdhjldhpnnsg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnbGx3eGhhYmRoamxkaHBubnNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3ODMyMjMsImV4cCI6MjA4OTM1OTIyM30.SIapIspfeEzB16rC2APVphDcWWWIYAVgo6bLKXCXanY';

/* ── Fetch published blog posts from Supabase ── */
async function fetchBlogPosts() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?published=eq.true&order=date.desc&select=title,slug,date,excerpt,content`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('⚠ Could not fetch blog posts from Supabase:', err.message);
    console.warn('  Blog post pages will not be pre-rendered this build.');
    return [];
  }
}

/* ── Helper: strip markdown to plain text for body ── */
function stripMarkdown(md) {
  return md
    .replace(/#{1,6}\s+/g, '')       // headings
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/\*([^*]+)\*/g, '$1')     // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/\n{2,}/g, ' ')          // collapse newlines
    .replace(/\n/g, ' ')
    .trim()
    .slice(0, 500);                    // keep body under 500 chars
}

/* ── Static pages ── */
const staticPages = [
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
        {
          '@type': 'FAQPage',
          'mainEntity': [
            { '@type': 'Question', 'name': 'How much does PretaQuiz cost?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'PretaQuiz costs $97 as a one-time payment. There are no monthly fees, no subscriptions, and no hidden costs.' } },
            { '@type': 'Question', 'name': 'Do I need tech skills to use PretaQuiz?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'No. PretaQuiz is designed for coaches and consultants with no technical background. You upload your logo, set your brand colour, write your questions and results, and get a live quiz link. No coding required.' } },
            { '@type': 'Question', 'name': 'How long does it take to set up a quiz on PretaQuiz?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Most coaches have their branded quiz live in under an hour. You log in, configure your branding, questions, and results, and get a shareable link immediately.' } },
            { '@type': 'Question', 'name': 'What is a lead magnet quiz?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'A lead magnet quiz is an interactive quiz on your website that captures a visitor name and email in exchange for a personalised result. Unlike a PDF, it qualifies your leads and gives you insight into what each prospect needs before you speak to them.' } },
            { '@type': 'Question', 'name': 'How does PretaQuiz compare to other quiz builders?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Most quiz builders charge $29 to $99 per month. PretaQuiz is $97 one-time with no monthly fees. It is purpose-built for coaches and consultants who want a branded quiz on their website without the complexity of tools designed for marketers and agencies.' } },
            { '@type': 'Question', 'name': 'Can I connect PretaQuiz to my CRM or email tool?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. PretaQuiz sends lead data to any CRM or email tool that accepts a webhook, including ActiveCampaign, MailChimp, Kit, GoHighLevel, and Zapier. You can also export leads as a CSV from your dashboard.' } },
            { '@type': 'Question', 'name': 'Is PretaQuiz GDPR compliant?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. PretaQuiz includes a consent checkbox on the quiz email capture screen, supports linking to your privacy policy, and provides a Data Processing Agreement. Cookie consent is built in and analytics are only loaded after explicit consent.' } }
          ]
        }
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
    route: '/dpa',
    title: 'Data Processing Agreement — PretaQuiz',
    description: 'PretaQuiz Data Processing Agreement. How we process personal data on behalf of our clients in compliance with GDPR.',
    h1: 'Data Processing Agreement',
    body: 'Data Processing Agreement for PretaQuiz. This agreement governs how PretaQuiz processes personal data on behalf of coaches and consultants who use the platform, in compliance with GDPR and applicable data protection law.',
  },
];

/* ── Main ── */
async function main() {
  const blogPosts = await fetchBlogPosts();

  /* Build blog index page */
  const blogIndexBody = blogPosts.length > 0
    ? 'Practical advice for coaches who want warm leads, not tech headaches. ' +
      blogPosts.map(p => p.title).join('. ') + '.'
    : 'Practical advice for coaches who want warm leads, not tech headaches.';

  const blogIndexPage = {
    route: '/blog',
    title: 'The PretaQuiz Blog — Advice for Coaches',
    description: 'Practical advice for coaches who want warm leads, not tech headaches. Tips on quiz funnels, lead generation, and growing a coaching business.',
    h1: 'The PretaQuiz Blog',
    body: blogIndexBody,
  };

  /* Build individual blog post pages */
  const blogPostPages = blogPosts.map(post => ({
    route: `/blog/${post.slug}`,
    title: `${post.title} — PretaQuiz`,
    description: post.excerpt.slice(0, 160),
    h1: post.title,
    body: stripMarkdown(post.content),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': post.title,
      'author': { '@type': 'Person', 'name': 'Emma Dumel' },
      'datePublished': post.date,
      'publisher': { '@type': 'Organization', 'name': 'PretaQuiz', 'url': 'https://pretaquiz.com' },
      'description': post.excerpt.slice(0, 160),
      'mainEntityOfPage': `https://pretaquiz.com/blog/${post.slug}`,
    },
  }));

  console.log(`Fetched ${blogPosts.length} blog posts from Supabase.`);

  /* Combine all pages */
  const allPages = [...staticPages, blogIndexPage, ...blogPostPages];

  /* Generate sitemap */
  const sitemapEntries = allPages.map(page => {
    const loc = `https://pretaquiz.com${page.route === '/' ? '' : page.route}`;
    const isBlog = page.route.startsWith('/blog/');
    const isIndex = page.route === '/blog';
    const priority = page.route === '/' ? '1.0' : isBlog ? '0.7' : isIndex ? '0.8' : '0.4';
    const changefreq = page.route === '/' || isIndex ? 'weekly' : isBlog ? 'monthly' : 'yearly';
    const today = new Date().toISOString().split('T')[0];
    const blogPost = blogPosts.find(p => `/blog/${p.slug}` === page.route);
    const lastmod = blogPost ? blogPost.date : today;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`;
  writeFileSync(join(distDir, 'sitemap.xml'), sitemap);
  console.log(`Generated sitemap.xml with ${allPages.length} URLs.`);

  /* Render each page */
  for (const page of allPages) {
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
    console.log(`Pre-rendered: ${page.route}`);
  }

  console.log(`\nDone! Pre-rendered ${allPages.length} pages.`);
}

main().catch(err => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
