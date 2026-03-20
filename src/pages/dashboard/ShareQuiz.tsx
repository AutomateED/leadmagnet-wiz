import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

interface ShareQuizProps {
  slug: string;
}

const BASE_URL = 'https://preview--leadmagnet-wiz.lovable.app';

export default function ShareQuiz({ slug }: ShareQuizProps) {
  const { toast } = useToast();
  const quizUrl = `${BASE_URL}/quiz/${slug}`;
  const embedCode = `<iframe src="${quizUrl}" width="100%" height="800" frameborder="0"></iframe>`;

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast({ title: label });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground mb-8">Share Your Quiz</h1>

      <div className="max-w-[600px] space-y-10">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Direct Link</h2>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md border border-border bg-muted/30 px-3 py-2 text-sm break-all select-all">{quizUrl}</code>
            <Button variant="outline" size="sm" className="shrink-0 gap-1.5" onClick={() => copy(quizUrl, 'Link copied!')}>
              <Copy className="h-4 w-4" /> Copy link
            </Button>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Embed Code</h2>
          <pre className="rounded-md border border-border bg-muted/30 px-3 py-3 text-sm whitespace-pre-wrap break-all select-all font-mono">{embedCode}</pre>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Paste this code into your website to embed your quiz directly on any page.</p>
            <Button variant="outline" size="sm" className="shrink-0 gap-1.5 ml-4" onClick={() => copy(embedCode, 'Embed code copied!')}>
              <Copy className="h-4 w-4" /> Copy code
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
