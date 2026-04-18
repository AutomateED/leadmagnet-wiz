import * as Sentry from "@sentry/react";

const DSN = import.meta.env.VITE_SENTRY_DSN;

export function initSentry() {
  console.log("[Sentry] Init called. DSN present:", !!DSN);
  
  if (!DSN) {
    console.warn("[Sentry] No DSN found — skipping init.");
    return;
  }
  
  try {
    Sentry.init({
      dsn: DSN,
      environment: import.meta.env.MODE,
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 1.0,
    });
    
    // Expose on window for debugging
    (window as any).Sentry = Sentry;
    
    console.log("[Sentry] Initialised successfully.");
  } catch (err) {
    console.error("[Sentry] Init failed:", err);
  }
}
