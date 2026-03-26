import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  brandColour: string;
}

export default function ProgressBar({ current, total, brandColour }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1" style={{ backgroundColor: `${brandColour}1A` }}>
      <motion.div
        className="h-full rounded-r-full"
        style={{ backgroundColor: brandColour }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}