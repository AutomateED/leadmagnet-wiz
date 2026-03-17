import { useState } from 'react';
import PasswordGate from '@/components/setup/PasswordGate';
import SetupWizard from '@/components/setup/SetupWizard';

export default function Setup() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <PasswordGate onAuthenticated={() => setAuthenticated(true)} />;
  }

  return <SetupWizard />;
}
