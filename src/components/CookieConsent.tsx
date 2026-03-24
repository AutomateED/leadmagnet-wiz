import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'cookie-consent-accepted';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 260 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-xl border p-4 shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto"
          style={{
            backgroundColor: 'rgba(32, 21, 56, 0.95)',
            borderColor: 'rgba(217, 70, 239, 0.2)',
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(217, 70, 239, 0.15)' }}
            >
              <Cookie className="h-4 w-4" style={{ color: 'hsl(var(--accent))' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium" style={{ color: '#FFFFFF' }}>
                We use cookies
              </p>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                This site uses essential cookies to keep things running smoothly. By continuing, you agree to our{' '}
                <Link to="/privacy" className="underline hover:opacity-80" style={{ color: 'hsl(var(--accent))' }}>
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={accept}
                  className="text-xs font-semibold"
                  style={{ backgroundColor: 'hsl(var(--accent))', color: '#FFFFFF' }}
                >
                  Got it
                </Button>
                <Link
                  to="/privacy"
                  className="rounded-md px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
