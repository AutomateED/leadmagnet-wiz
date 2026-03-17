import { motion } from 'framer-motion';
import type { QuizConfig } from '@/hooks/useConfig';

interface ConfirmationScreenProps {
  config: QuizConfig;
  email: string;
}

export default function ConfirmationScreen({ config, email }: ConfirmationScreenProps) {
  const brandColour = config.brandColour;

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-6 py-12">
      <motion.div
        className="w-full max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated checkmark */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center">
          <svg className="h-20 w-20" viewBox="0 0 52 52">
            <circle
              className="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
              stroke={brandColour}
              strokeWidth="2"
            />
            <path
              className="checkmark-check"
              fill="none"
              stroke={brandColour}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
          It's on its way!
        </h2>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Check your inbox — your personalised results are heading to{' '}
          <span className="font-medium text-foreground">{email}</span> right now.
        </p>

        {/* Divider */}
        <div className="my-10 h-px bg-border" />

        {/* CTA section */}
        <div className="flex flex-col items-center gap-4">
          {config.logo && (
            <img
              src={config.logo}
              alt={config.businessName}
              className="h-10 w-auto object-contain"
            />
          )}

          {config.ctaTagline && (
            <p className="text-lg text-muted-foreground italic">
              {config.ctaTagline}
            </p>
          )}

          {config.ctaUrl && config.ctaText && (
            <motion.a
              href={config.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block rounded-full px-10 py-4 text-lg font-semibold tracking-wide transition-all duration-300 hover:shadow-lift active:scale-95"
              style={{ backgroundColor: brandColour, color: '#FFFFFF' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              {config.ctaText}
            </motion.a>
          )}
        </div>

        <p className="mt-12 text-xs text-muted-foreground/60">
          Powered by <span className="font-display font-semibold">PretaQuiz</span>
        </p>
      </motion.div>
    </div>
  );
}
