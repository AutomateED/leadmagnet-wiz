import type { QuizConfig } from '@/hooks/useConfig';

interface WebhookPayload {
  first_name: string;
  last_name: string;
  email: string;
  result_type: string;
  result_copy: string;
  answers: Record<string, string>;
  quiz_name: string;
  client_name: string;
  timestamp: string;
}

export async function fireWebhook(config: QuizConfig, payload: WebhookPayload): Promise<void> {
  if (!config.webhookUrl) return;

  try {
    await fetch(config.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Fail silently
  }
}
