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
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onSelect}
      className="group relative w-full text-left rounded-xl border p-5 md:p-6 transition-all duration-300 ease-out"
      style={{
        backgroundColor: selected ? brandColour : 'hsl(var(--card))',
        borderColor: selected ? brandColour : 'hsl(var(--border))',
        color: selected ? '#FFFFFF' : 'hsl(var(--foreground))',
      }}
      whileHover={!selected ? { y: -2, boxShadow: `0 8px 30px -4px ${brandColour}22`, borderColor: `${brandColour}80` } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-mono font-medium transition-colors duration-300"
          style={{
            backgroundColor: selected ? 'rgba(255,255,255,0.2)' : `${brandColour}15`,
            color: selected ? '#FFFFFF' : brandColour,
          }}
        >
          {selected ? <Check className="h-4 w-4" /> : letter}
        </span>
        <span className="text-base md:text-lg font-medium leading-snug">{text}</span>
      </div>
    </motion.button>
  );
}
