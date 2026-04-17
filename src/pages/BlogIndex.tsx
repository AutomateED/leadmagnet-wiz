import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { blogPosts as staticPosts } from '@/data/blogPosts';
import Footer from '@/components/Footer';

const C = {
  pageBg: '#0F0A1E',
  cardBg: '#201538',
  cardBorder: '#2D1A4A',
  accent: '#D946EF',
  cta: '#F020B0',
  headline: '#FFFFFF',
  body: 'rgba(255,255,255,0.85)',
  supporting: 'rgba(255,255,255,0.75)',
  muted: 'rgba(255,255,255,0.60)',
};

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
}

export default function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>(staticPosts);

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('title, slug, date, excerpt')
      .eq('published', true)
      .order('date', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setPosts(data as unknown as BlogPost[]);
        }
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: C.pageBg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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

      <main className="flex-1 max-w-5xl mx-auto px-5 py-20 w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: C.headline }}>
          The PretaQuiz Blog
        </h1>
        <p className="text-lg mb-14" style={{ color: C.supporting }}>
          Practical advice for coaches who want warm leads, not tech headaches.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border p-6 flex flex-col justify-between transition-colors hover:border-[#D946EF]/40"
              style={{ backgroundColor: C.cardBg, borderColor: C.cardBorder }}
            >
              <div>
                <p className="text-xs font-medium mb-3" style={{ color: C.muted }}>{post.date}</p>
                <h2 className="text-xl font-semibold mb-3" style={{ color: C.headline }}>{post.title}</h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: C.body }}>{post.excerpt}</p>
              </div>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-block self-start text-sm font-semibold text-white px-5 py-2.5 rounded-lg transition-all hover:shadow-lg active:scale-[0.98]"
                style={{ backgroundColor: C.cta }}
              >
                Read more
              </Link>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
