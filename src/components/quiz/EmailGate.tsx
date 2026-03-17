import { useState } from 'react';
import { motion } from 'framer-motion';

interface EmailGateProps {
  brandColour: string;
  onSubmit: (firstName: string, email: string) => void;
}

export default function EmailGate({ brandColour, onSubmit }: EmailGateProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    onSubmit(firstName.trim(), email.trim(), lastName.trim());
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-6 py-12">
      <motion.div
        className="w-full max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
          Your results are ready ✨
        </h2>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          We've analysed your answers. Where should we send your personalised breakdown?
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
          <input
            type="text"
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value); setError(''); }}
            placeholder="Your first name"
            className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none text-xl py-4 transition-colors placeholder:text-muted-foreground/50"
            style={{ '--tw-border-opacity': 1, borderColor: firstName ? brandColour : undefined } as React.CSSProperties}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            placeholder="Your best email"
            className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none text-xl py-4 transition-colors placeholder:text-muted-foreground/50"
            style={{ borderColor: email ? brandColour : undefined } as React.CSSProperties}
          />

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <motion.button
            type="submit"
            className="mt-4 rounded-full px-10 py-4 text-lg font-semibold tracking-wide transition-all duration-300 hover:shadow-lift active:scale-95"
            style={{ backgroundColor: brandColour, color: '#FFFFFF' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
          >
            Send My Results →
          </motion.button>
        </form>

        <p className="mt-6 text-xs text-muted-foreground">
          No spam, ever. Unsubscribe anytime.
        </p>
      </motion.div>
    </div>
  );
}
