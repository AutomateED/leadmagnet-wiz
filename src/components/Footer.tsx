import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="px-6 py-8" style={{ backgroundColor: '#0F0A1E' }}>
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
          Preta<span style={{ color: '#D946EF' }}>Quiz</span>
        </span>

        <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
          <Link to="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="transition-colors hover:text-white">Terms</Link>
          <Link to="/dpa" className="transition-colors hover:text-white">Data Processing Agreement</Link>
          <Link to="/contact" className="transition-colors hover:text-white">Contact</Link>
        </div>
      </div>
      <p className="mx-auto max-w-6xl mt-4 text-center sm:text-right text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
        © 2026 PretaQuiz. All rights reserved.
      </p>
    </footer>
  );
}
