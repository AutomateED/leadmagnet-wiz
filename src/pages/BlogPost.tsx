import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '@/data/blogPosts';
import Footer from '@/components/Footer';

const C = {
  pageBg: '#0F0A1E',
  accent: '#D946EF',
  cta: '#F020B0',
  headline: '#FFFFFF',
  body: 'rgba(255,255,255,0.85)',
  supporting: 'rgba(255,255,255,0.75)',
  muted: 'rgba(255,255,255,0.60)',
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: C.pageBg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Nav */}
      <nav className="bg-[#0F0A1E]/95 backdrop-blur-md border-b border-[#2D1A4A]">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold" style={{ color: C.headline }}>
            Preta<span style={{ color: C.accent }}>Quiz</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/blog" className="text-sm font-medium" style={{ color: C.accent }}>Blog</Link>
            <Link to="/login" className="text-sm font-medium" style={{ color: C.supporting }}>Login</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-[720px] mx-auto px-5 py-16 w-full">
        <Link to="/blog" className="text-sm font-medium mb-8 inline-block transition-colors hover:underline" style={{ color: C.accent }}>
          ← Back to Blog
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.headline }}>
          {post.title}
        </h1>
        <p className="text-sm mb-10" style={{ color: C.muted }}>{post.date}</p>

        <article
          className="prose prose-invert prose-lg max-w-none"
          style={{ color: C.body }}
        >
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mt-10 mb-4" style={{ color: C.headline }}>{children}</h2>
              ),
              p: ({ children }) => (
                <p className="mb-5 leading-relaxed" style={{ color: C.body }}>{children}</p>
              ),
              a: ({ href, children }) => (
                <a href={href} className="underline underline-offset-2 font-medium" style={{ color: C.accent }} target="_blank" rel="noopener noreferrer">{children}</a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Footer CTA */}
        <div className="mt-16 pt-10 border-t border-[#2D1A4A] text-center">
          <p className="text-xl font-semibold mb-5" style={{ color: C.headline }}>
            Ready to get your quiz live?
          </p>
          <Link
            to="/#pricing"
            className="inline-block text-sm font-semibold text-white px-7 py-3 rounded-lg transition-all hover:shadow-lg active:scale-[0.98]"
            style={{ backgroundColor: C.cta }}
          >
            Get started — $97
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
