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
  {
    route: '/blog',
    title: 'The PretaQuiz Blog — Advice for Coaches',
    description: 'Practical advice for coaches who want warm leads, not tech headaches. Tips on quiz funnels, lead generation, and growing a coaching business.',
    h1: 'The PretaQuiz Blog',
    body: 'Practical advice for coaches who want warm leads, not tech headaches. Tips on quiz funnels, lead generation, and growing a coaching business. Read articles on why quizzes outperform PDFs as lead magnets, how to get warm leads without paid ads, what to put on your coaching website to get more discovery calls, what a lead magnet quiz is and how it works for coaches, and the five online essentials every coach needs to get clients.',
  },
  {
    route: '/blog/quiz-vs-pdf-lead-magnet',
    title: 'Why Coaches Need a Quiz Instead of a PDF Lead Magnet — PretaQuiz',
    description: 'The PDF lead magnet had its moment. Here\'s why coaches who switch to a quiz get warmer leads, better insight into their audience, and a funnel that runs itself.',
    h1: 'Why Coaches Need a Quiz Instead of a PDF Lead Magnet',
    body: 'The PDF lead magnet had its moment. That moment has passed. Here is why coaches who switch to a quiz get warmer leads, better insight into their audience, and a funnel that runs itself. A PDF is a one-way street. You get an email address but zero insight into who that person is. A quiz asks questions before it gives anything away. By the time a prospect sees their results, you already know what they are struggling with and which of your offers is the right fit. PretaQuiz was built specifically for coaches who want a branded lead-generation quiz without a developer, without a monthly fee, and without spending a week on the tech.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'Article', 'headline': 'Why Coaches Need a Quiz Instead of a PDF Lead Magnet', 'author': { '@type': 'Person', 'name': 'Emma Dumel' }, 'datePublished': '2026-04-11', 'publisher': { '@type': 'Organization', 'name': 'PretaQuiz', 'url': 'https://pretaquiz.com' }, 'description': 'The PDF lead magnet had its moment. Here is why coaches who switch to a quiz get warmer leads, better insight into their audience, and a funnel that runs itself.', 'mainEntityOfPage': 'https://pretaquiz.com/blog/quiz-vs-pdf-lead-magnet' },
  },
  {
    route: '/blog/warm-leads-without-paid-ads',
    title: 'How Coaches Can Get Warm Leads Without Paid Ads — PretaQuiz',
    description: 'Most coaches think lead generation means running ads. Here\'s how to turn your existing website traffic into warm, qualified leads — for free.',
    h1: 'How Coaches Can Get Warm Leads From Their Website Without Paid Ads',
    body: 'Most coaches think lead generation means running ads. It does not. Here is how to turn your existing website traffic into warm, qualified leads for free. Your website already gets visitors. The question is whether those visitors leave without you ever knowing they were there. A quiz on your website captures their name, email, and what they need, and sends it to your CRM automatically. PretaQuiz lets coaches set this up in under an hour with no tech skills and no monthly fee.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'Article', 'headline': 'How Coaches Can Get Warm Leads From Their Website Without Paid Ads', 'author': { '@type': 'Person', 'name': 'Emma Dumel' }, 'datePublished': '2026-04-11', 'publisher': { '@type': 'Organization', 'name': 'PretaQuiz', 'url': 'https://pretaquiz.com' }, 'description': 'Most coaches think lead generation means running ads. Here is how to turn your existing website traffic into warm, qualified leads for free.', 'mainEntityOfPage': 'https://pretaquiz.com/blog/warm-leads-without-paid-ads' },
  },
  {
    route: '/blog/coaching-website-discovery-calls',
    title: 'What to Put on Your Coaching Website to Get More Discovery Calls — PretaQuiz',
    description: 'Your coaching website should be doing the qualification work before a prospect ever reaches out. Here\'s what to add and what to cut.',
    h1: 'What to Put on Your Coaching Website to Get More Discovery Calls',
    body: 'Your coaching website should be doing the qualification work before a prospect ever reaches out. Here is what to add and what to cut to turn more visitors into booked calls. Most coaching websites have too much information and not enough conversion. The five things that actually matter are a clear headline, a single call to action, social proof, an interactive lead magnet like a quiz, and a simple booking link. PretaQuiz helps coaches add a branded quiz to their website that qualifies visitors before the first conversation.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'Article', 'headline': 'What to Put on Your Coaching Website to Get More Discovery Calls', 'author': { '@type': 'Person', 'name': 'Emma Dumel' }, 'datePublished': '2026-04-11', 'publisher': { '@type': 'Organization', 'name': 'PretaQuiz', 'url': 'https://pretaquiz.com' }, 'description': 'Your coaching website should be doing the qualification work before a prospect ever reaches out. Here is what to add and what to cut.', 'mainEntityOfPage': 'https://pretaquiz.com/blog/coaching-website-discovery-calls' },
  },
  {
    // TODO: Confirm this slug matches the actual URL in Lovable
    route: '/blog/what-is-lead-magnet-quiz',
    title: 'What Is a Lead Magnet Quiz and How Does It Work for Coaches? — PretaQuiz',
    description: 'A lead magnet quiz is an interactive tool that qualifies your leads automatically. Here is exactly how it works for coaches and why it outperforms every other lead magnet.',
    h1: 'What Is a Lead Magnet Quiz and How Does It Work for Coaches?',
    body: 'A lead magnet quiz is an interactive quiz on your website that captures a visitor name and email in exchange for a personalised result. Unlike a PDF or checklist, a quiz qualifies your leads by asking questions about their situation before they see their result. For coaches, this means every lead that comes through already has context. You know what they are struggling with, where they are in their journey, and which of your offers is the best fit. PretaQuiz is a branded quiz builder for coaches that costs $97 one-time with no monthly fees. Most coaches have their quiz live in under an hour.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'Article', 'headline': 'What Is a Lead Magnet Quiz and How Does It Work for Coaches?', 'author': { '@type': 'Person', 'name': 'Emma Dumel' }, 'datePublished': '2026-04-17', 'publisher': { '@type': 'Organization', 'name': 'PretaQuiz', 'url': 'https://pretaquiz.com' }, 'description': 'A lead magnet quiz is an interactive tool that qualifies your leads automatically. Here is exactly how it works for coaches and why it outperforms every other lead magnet.', 'mainEntityOfPage': 'https://pretaquiz.com/blog/what-is-lead-magnet-quiz' },
  },
  {
    // TODO: Confirm this slug matches the actual URL in Lovable
    route: '/blog/online-essentials-coaches',
    title: 'The 5 Online Essentials Every Coach Needs to Get Clients — PretaQuiz',
    description: 'You don\'t need a complicated funnel or 47 tools to get coaching clients online. Here are the five things that actually matter, and what you can skip.',
    h1: 'The 5 Online Essentials Every Coach Needs to Get Clients (Without the Tech Overwhelm)',
    body: 'You do not need a complicated funnel or 47 tools to get coaching clients online. Here are the five things that actually matter and what you can skip. The essentials are a clear offer, a simple website, a lead magnet that qualifies visitors, an email follow-up sequence, and one consistent traffic source. Most coaches overcomplicate this. PretaQuiz handles the lead magnet part. A branded quiz on your website that captures warm leads and sends them to your CRM. $97 one-time. No monthly fees. No tech skills required.',
    jsonLd: { '@context': 'https://schema.org', '@type': 'Article', 'headline': 'The 5 Online Essentials Every Coach Needs to Get Clients (Without the Tech Overwhelm)', 'author': { '@type': 'Person', 'name': 'Emma Dumel' }, 'datePublished': '2026-04-17', 'publisher': { '@type': 'Organization', 'name': 'PretaQuiz', 'url': 'https://pretaquiz.com' }, 'description': 'You do not need a complicated funnel or 47 tools to get coaching clients online. Here are the five things that actually matter and what you can skip.', 'mainEntityOfPage': 'https://pretaquiz.com/blog/online-essentials-coaches' },
  },
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
