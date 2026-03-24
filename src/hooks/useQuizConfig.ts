import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_CONFIG, type QuizConfig } from '@/hooks/useConfig';

interface UseQuizConfigReturn {
  config: QuizConfig | null;
  loading: boolean;
  error: string | null;
}

export function useQuizConfig(slug: string | undefined): UseQuizConfigReturn {
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('No quiz ID provided');
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchConfig() {
      setLoading(true);
      setError(null);

      const { data, error: dbError } = await supabase
        .from('public_quiz_configs')
        .select('*')
        .eq('slug', slug)
        .single();

      if (cancelled) return;

      if (dbError || !data) {
        console.error('Failed to load quiz config:', dbError);
        setError('Quiz not found. Check the URL and try again.');
        setLoading(false);
        return;
      }

      const quizConfig: QuizConfig = {
        quizId: data.slug || '',
        clientId: data.client_id || '',
        quizName: data.quiz_name || DEFAULT_CONFIG.quizName,
        templateType: data.template_type || DEFAULT_CONFIG.templateType,
        fullName: data.full_name || DEFAULT_CONFIG.fullName,
        businessName: data.business_name || DEFAULT_CONFIG.businessName,
        email: data.email || DEFAULT_CONFIG.email,
        logo: data.logo_url || DEFAULT_CONFIG.logo,
        brandColour: data.brand_colour || DEFAULT_CONFIG.brandColour,
        fontFamily: data.font_family || DEFAULT_CONFIG.fontFamily,
        questions: Array.isArray(data.questions) ? data.questions as any : [],
        resultTexts: {
          ...DEFAULT_CONFIG.resultTexts,
          ...(data.result_texts as Record<string, string> || {}),
        },
        ctaText: data.cta_text || DEFAULT_CONFIG.ctaText,
        ctaUrl: data.cta_url || DEFAULT_CONFIG.ctaUrl,
        ctaTagline: data.cta_tagline || DEFAULT_CONFIG.ctaTagline,
        webhookUrl: '',
        emailjsServiceId: '',
        emailjsTemplateId: '',
        emailjsPublicKey: '',
      };

      setConfig(quizConfig);
      setLoading(false);
    }

    fetchConfig();
    return () => { cancelled = true; };
  }, [slug]);

  return { config, loading, error };
}
