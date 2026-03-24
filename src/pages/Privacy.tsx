const Privacy = () => (
  <div className="min-h-screen bg-background py-16 px-4">
    <div className="mx-auto max-w-3xl prose prose-sm text-foreground">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground text-sm mb-6">Last updated: March 24, 2026</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Introduction</h2>
      <p>PretaQuiz ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our Service.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Information We Collect</h2>
      <p><strong>Account Information:</strong> When you sign up, we collect your name, email address, and business name.</p>
      <p><strong>Quiz Lead Data:</strong> When someone completes a quiz you've created, we collect their name, email, and quiz responses on your behalf.</p>
      <p><strong>Usage Data:</strong> We automatically collect information about how you interact with the Service, including pages visited, features used, and device information.</p>
      <p><strong>Payment Data:</strong> Payment information is processed securely by Stripe. We do not store your full card details.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. How We Use Your Information</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>To provide and maintain the Service</li>
        <li>To process transactions and send related information</li>
        <li>To send you updates, marketing communications, and support messages</li>
        <li>To monitor and analyse usage to improve the Service</li>
        <li>To detect and prevent fraud or abuse</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Data Sharing</h2>
      <p>We do not sell your personal data. We may share information with:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Service Providers:</strong> Trusted third parties that help us operate the Service (e.g., Supabase, Stripe, email providers)</li>
        <li><strong>Quiz Creators:</strong> Lead data collected through quizzes is shared with the quiz creator</li>
        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Data Retention</h2>
      <p>We retain your data for as long as your account is active or as needed to provide the Service. You may request deletion of your data at any time by contacting us.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Data Security</h2>
      <p>We implement industry-standard security measures to protect your data, including encryption in transit and at rest. However, no method of transmission over the Internet is 100% secure.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the right to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Access, correct, or delete your personal data</li>
        <li>Object to or restrict processing of your data</li>
        <li>Data portability</li>
        <li>Withdraw consent at any time</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Cookies</h2>
      <p>We use essential cookies to maintain your session and preferences. We do not use third-party tracking cookies without your consent.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">9. Children's Privacy</h2>
      <p>The Service is not intended for children under 16. We do not knowingly collect data from children under 16.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">10. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of material changes via email or through the Service.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">11. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, contact us at <a href="mailto:hello@pretaquiz.com" className="text-primary hover:underline">hello@pretaquiz.com</a>.</p>

      <div className="mt-12 pt-6 border-t border-border">
        <a href="/" className="text-primary hover:underline text-sm">&larr; Back to Home</a>
      </div>
    </div>
  </div>
);

export default Privacy;
