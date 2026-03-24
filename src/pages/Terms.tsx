const Terms = () => (
  <div className="min-h-screen bg-background py-16 px-4">
    <div className="mx-auto max-w-3xl prose prose-sm text-foreground">
      <h1 className="text-3xl font-bold mb-8">Terms &amp; Conditions</h1>
      <p className="text-muted-foreground text-sm mb-6">Last updated: March 24, 2026</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Agreement to Terms</h2>
      <p>By accessing or using PretaQuiz ("the Service"), you agree to be bound by these Terms and Conditions. If you do not agree, you may not use the Service.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Description of Service</h2>
      <p>PretaQuiz provides a platform for creating, hosting, and sharing lead-generation quizzes. The Service includes quiz creation tools, lead capture, analytics, and related features.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Account Registration</h2>
      <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Payment &amp; Refunds</h2>
      <p>Certain features require a one-time payment. All payments are processed securely via Stripe. Refund requests must be submitted within 14 days of purchase. Digital products that have been fully delivered are non-refundable unless required by applicable law.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Acceptable Use</h2>
      <p>You agree not to use the Service to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Violate any applicable laws or regulations</li>
        <li>Distribute spam, malware, or harmful content</li>
        <li>Infringe on the intellectual property rights of others</li>
        <li>Collect personal data without proper consent</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Intellectual Property</h2>
      <p>All content, branding, and code associated with PretaQuiz remain the property of PretaQuiz. Quiz content you create remains yours, but you grant us a licence to host and display it as part of the Service.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Limitation of Liability</h2>
      <p>The Service is provided "as is" without warranties of any kind. To the maximum extent permitted by law, PretaQuiz shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Termination</h2>
      <p>We reserve the right to suspend or terminate your account at any time for violation of these Terms. You may delete your account at any time by contacting support.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">9. Changes to Terms</h2>
      <p>We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>

      <h2 className="text-xl font-semibold mt-8 mb-3">10. Contact</h2>
      <p>For questions about these Terms, please contact us at <a href="mailto:hello@pretaquiz.com" className="text-primary hover:underline">hello@pretaquiz.com</a>.</p>

      <div className="mt-12 pt-6 border-t border-border">
        <a href="/" className="text-primary hover:underline text-sm">&larr; Back to Home</a>
      </div>
    </div>
  </div>
);

export default Terms;
