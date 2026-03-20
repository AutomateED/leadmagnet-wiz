import { motion } from 'framer-motion';
import type { QuizConfig } from '@/hooks/useConfig';

interface StartScreenProps {
  config: QuizConfig;
  onStart: () => void;
}

export default function StartScreen({ config, onStart }: StartScreenProps) {
  const brandColour = config.brandColour;

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-12">
      {/* Floating blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-blob absolute -top-32 -left-32 h-72 w-72 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: brandColour }}
        />
        <div
          className="animate-blob animation-delay-2000 absolute top-1/2 -right-32 h-96 w-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: brandColour }}
        />
        <div
          className="animate-blob animation-delay-4000 absolute -bottom-32 left-1/3 h-80 w-80 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: brandColour }}
        />
      </div>

      <motion.div
        className="relative z-10 flex max-w-xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        {config.logo ? (
          <img
            src={config.logo}
            alt={config.businessName}
            className="mb-8 h-12 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        {!config.logo && config.businessName && (
          <p className="mb-8 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            {config.businessName}
          </p>
        )}

        <h1
          className="text-4xl md:text-6xl font-semibold leading-tight text-foreground"
          style={{ fontFamily: `'${config.fontFamily || 'Playfair Display'}', serif` }}
        >
          What's Really Holding Your Business Back?
        </h1>

        <p className="mt-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-md">
          Answer 7 quick questions and discover exactly what's standing between you and the business you want.
        </p>

        <p className="mt-4 text-sm text-muted-foreground">⏱ Takes about 2 minutes</p>

        <motion.button
          onClick={onStart}
          className="mt-10 rounded-full px-10 py-4 text-lg font-semibold tracking-wide transition-all duration-300 hover:shadow-lift active:scale-95"
          style={{ backgroundColor: brandColour, color: '#FFFFFF' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          Find Out Now →
        </motion.button>
      </motion.div>
    </div>
  );
}
