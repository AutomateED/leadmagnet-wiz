import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface AnswerCardProps {
  letter: string;
  text: string;
  selected: boolean;
  brandColour: string;
  index: number;
  onSelect: () => void;
}

export default function AnswerCard({ letter, text, selected, brandColour, index, onSelect }: AnswerCardProps) {
  const brandRgb = hexToRgb(brandColour);
  const brandTranslucent10 = brandRgb ? `rgba(${brandRgb},0.1)` : 'rgba(217,70,239,0.1)';
  const brandTranslucent15 = brandRgb ? `rgba(${brandRgb},0.15)` : 'rgba(217,70,239,0.15)';
  const brandTranslucent40 = brandRgb ? `rgba(${brandRgb},0.4)` : 'rgba(217,70,239,0.4)';

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onSelect}
      aria-pressed={selected}
      className="group relative w-full text-left rounded-xl border p-5 md:p-6 transition-all duration-300 ease-out focus-visible:outline-3 focus-visible:outline-offset-2"
      style={{
        backgroundColor: selected ? brandColour : '#F8F7FF',
        borderColor: selected ? brandColour : brandTranslucent15,
        color: selected ? '#FFFFFF' : '#0F0A1E',
      }}
      whileHover={!selected ? { y: -2, boxShadow: `0 8px 30px -4px ${brandTranslucent15}`, borderColor: brandTranslucent40 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-mono font-medium transition-colors duration-300"
          style={{
            backgroundColor: selected ? 'rgba(255,255,255,0.2)' : brandTranslucent10,
            color: selected ? '#FFFFFF' : brandColour,
          }}
        >
          {selected ? <Check className="h-4 w-4" /> : letter}
        </span>
        <span className="text-base md:text-lg font-medium leading-snug">{text}</span>
        {selected && <span className="sr-only">(selected)</span>}
      </div>
    </motion.button>
  );
}

function hexToRgb(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null;
}
