import emailjs from '@emailjs/browser';
import type { QuizConfig } from '@/hooks/useConfig';

interface EmailParams {
  to_email: string;
  to_name: string;
  result_type: string;
  result_copy: string;
  cta_text: string;
  cta_url: string;
  business_name: string;
  coach_tagline: string;
}

export async function sendResultEmail(config: QuizConfig, params: EmailParams): Promise<void> {
  if (!config.emailjsServiceId || !config.emailjsTemplateId || !config.emailjsPublicKey) return;

  try {
    await emailjs.send(
      config.emailjsServiceId,
      config.emailjsTemplateId,
      params as unknown as Record<string, unknown>,
      config.emailjsPublicKey
    );
  } catch {
    // Fail silently
  }
}
