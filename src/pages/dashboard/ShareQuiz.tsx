import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

interface ShareQuizProps {
  slug: string;
}

export default function ShareQuiz({ slug }: ShareQuizProps) {
  const { toast } = useToast();
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://pretaquiz.com';
  const quizUrl = `${baseUrl}/quiz/${slug}`;
  const embedCode = `<iframe src="${quizUrl}" width="100%" height="800" frameborder="0"></iframe>`;

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast({ title: label });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8" style={{ color: '#0F0A1E' }}>Share Your Quiz</h1>

      <div className="max-w-[600px] space-y-10">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold" style={{ color: '#0F0A1E' }}>Direct Link</h2>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md px-3 py-2 text-sm break-all select-all" style={{ backgroundColor: '#F8F7FF', border: '1px solid rgba(217,70,239,0.15)' }}>{quizUrl}</code>
            <Button variant="outline" size="sm" className="shrink-0 gap-1.5" onClick={() => copy(quizUrl, 'Link copied!')} style={{ borderColor: 'rgba(217,70,239,0.30)', color: '#D946EF' }}>
              <Copy className="h-4 w-4" /> Copy link
            </Button>
          </div>
          <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(217,70,239,0.08)', borderLeft: '3px solid rgba(217,70,239,0.3)' }}>
            <p className="text-sm" style={{ color: '#4A4060' }}>Share this link anywhere: in emails, social media posts, your Instagram bio, or send it directly to prospects. Anyone who clicks it will land straight on your quiz.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold" style={{ color: '#0F0A1E' }}>Embed Code</h2>
          <pre className="rounded-md px-3 py-3 text-sm whitespace-pre-wrap break-all select-all font-mono" style={{ backgroundColor: '#F8F7FF', border: '1px solid rgba(217,70,239,0.15)' }}>{embedCode}</pre>
          <Button variant="outline" size="sm" className="shrink-0 gap-1.5" onClick={() => copy(embedCode, 'Embed code copied!')} style={{ borderColor: 'rgba(217,70,239,0.30)', color: '#D946EF' }}>
            <Copy className="h-4 w-4" /> Copy code
          </Button>
          <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(217,70,239,0.08)', borderLeft: '3px solid rgba(217,70,239,0.3)' }}>
            <p className="text-sm" style={{ color: '#4A4060' }}>To add your quiz to your website, copy the code above and paste it into your website builder. In most platforms (WordPress, Wix, Squarespace, Kajabi, GoHighLevel), look for an 'Embed' or 'Custom HTML' block, paste the code in, and save. Your quiz will appear right on your page.</p>
          </div>
        </section>
      </div>
    </div>
  );
}