import { motion } from 'framer-motion';
import type { QuizConfig } from '@/hooks/useConfig';

interface StartScreenProps {
  config: QuizConfig;
  onStart: () => void;
}

export default function StartScreen({ config, onStart }: StartScreenProps) {
  const brandColour = config.brandColour;

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-12" style={{ backgroundColor: '#FFFFFF' }}>

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
          <p className="mb-8 text-sm font-medium tracking-widest uppercase" style={{ color: '#6B5F80' }}>
            {config.businessName}
          </p>
        )}

        <h1
          className="text-4xl md:text-6xl font-semibold leading-tight"
          style={{ fontFamily: `'${config.fontFamily || 'Plus Jakarta Sans'}', sans-serif`, color: '#0F0A1E' }}
        >
          {config.quizName || "What's Really Holding Your Business Back?"}
        </h1>

        <p className="mt-6 text-lg md:text-xl leading-relaxed max-w-md" style={{ color: '#4A4060' }}>
          Answer {config.questions?.length || 7} quick questions and get your personalised result.
        </p>

        <p className="mt-4 text-sm" style={{ color: '#6B5F80' }}>Takes about 2 minutes</p>

        <motion.button
          onClick={onStart}
          className="mt-10 rounded-full px-10 py-4 text-lg font-semibold tracking-wide transition-all duration-300 hover:shadow-lift active:scale-95"
          style={{ backgroundColor: brandColour || '#F020B0', color: '#FFFFFF' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          Find Out Now <span aria-hidden="true">→</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
