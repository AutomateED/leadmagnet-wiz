import { useState } from 'react';
import { motion } from 'framer-motion';

interface PasswordGateProps {
  onAuthenticated: () => void;
}

export default function PasswordGate({ onAuthenticated }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'pretaquiz2024') {
      onAuthenticated();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-6 bg-background">
      <motion.div
        className="w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-3xl font-semibold text-foreground">
          Preta<span className="font-bold">Quiz</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter your password to access setup</p>

        <form onSubmit={handleSubmit} className="mt-8">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none text-lg py-3 text-center transition-colors"
          />
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-sm text-destructive"
            >
              Incorrect password
            </motion.p>
          )}
          <motion.button
            type="submit"
            className="mt-8 w-full rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-all hover:shadow-lift active:scale-95"
            whileTap={{ scale: 0.96 }}
          >
            Enter Setup
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
