import { useState } from 'react';
import { motion } from 'framer-motion';

interface EmailGateProps {
  brandColour: string;
  onSubmit: (firstName: string, email: string, lastName: string) => void;
}

export default function EmailGate({ brandColour, onSubmit }: EmailGateProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
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
          <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); setErrors((prev) => ({ ...prev, firstName: undefined })); }}
              placeholder="Your first name"
              className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none text-xl py-4 transition-colors placeholder:text-muted-foreground/50"
              style={{ borderColor: errors.firstName ? 'hsl(var(--destructive))' : firstName ? brandColour : undefined } as React.CSSProperties}
            />
            {errors.firstName && <p className="text-sm text-destructive mt-1 text-left">{errors.firstName}</p>}
          </div>
          <div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => { setLastName(e.target.value); setErrors((prev) => ({ ...prev, lastName: undefined })); }}
              placeholder="Your last name"
              className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none text-xl py-4 transition-colors placeholder:text-muted-foreground/50"
              style={{ borderColor: errors.lastName ? 'hsl(var(--destructive))' : lastName ? brandColour : undefined } as React.CSSProperties}
            />
            {errors.lastName && <p className="text-sm text-destructive mt-1 text-left">{errors.lastName}</p>}
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
              placeholder="Your best email"
              className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none text-xl py-4 transition-colors placeholder:text-muted-foreground/50"
              style={{ borderColor: errors.email ? 'hsl(var(--destructive))' : email ? brandColour : undefined } as React.CSSProperties}
            />
            {errors.email && <p className="text-sm text-destructive mt-1 text-left">{errors.email}</p>}
          </div>

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
