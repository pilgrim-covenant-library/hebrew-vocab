export const metadata = {
  title: 'Privacy Policy | Biblical Hebrew Vocab',
  description: 'Privacy policy for Biblical Hebrew Vocab app',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-muted-foreground mb-4">Last updated: December 30, 2025</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mt-6 mb-3">Introduction</h2>
            <p>
              Biblical Hebrew Vocab (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our
              mobile application and website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
            <h3 className="text-lg font-medium mt-4 mb-2">Local Data (Stored on Your Device)</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Learning progress and statistics</li>
              <li>Vocabulary mastery levels</li>
              <li>App preferences and settings</li>
              <li>Study streaks and achievements</li>
            </ul>
            <p className="mt-3">
              This data is stored locally on your device using browser localStorage and is not transmitted to our servers
              unless you opt into cloud sync.
            </p>

            <h3 className="text-lg font-medium mt-4 mb-2">Cloud Sync Data (Optional)</h3>
            <p>
              If you choose to create an account and enable cloud sync, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email address (for authentication)</li>
              <li>Learning progress data (to sync across devices)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide and maintain the app functionality</li>
              <li>To sync your progress across devices (if you opt in)</li>
              <li>To improve our app based on usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-6 mb-3">Data Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties.
              Your learning data remains private to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-6 mb-3">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>All data transmitted over HTTPS (encrypted in transit)</li>
              <li>Cloud data stored securely with Firebase</li>
              <li>No sensitive personal information collected</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-6 mb-3">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal data</li>
              <li>Delete your account and associated data</li>
              <li>Use the app without creating an account</li>
              <li>Clear local data at any time through your browser settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-6 mb-3">Children&apos;s Privacy</h2>
            <p>
              Our app is not directed at children under 13. We do not knowingly collect personal
              information from children under 13. If you believe we have collected such information,
              please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:support@pilgrimcovenant.org" className="text-primary hover:underline">
                support@pilgrimcovenant.org
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
