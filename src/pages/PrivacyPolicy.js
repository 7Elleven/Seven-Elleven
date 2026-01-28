import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-dark-blue via-dark-blue-light to-dark-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-neon-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-blue rounded-full blur-3xl"></div>
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="gradient-text">Privacy</span>{' '}
              <span className="text-white">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Effective Date: January 10, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-dark-blue-light p-8 md:p-12 rounded-xl border border-accent-blue/20">
              <div className="space-y-8 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  At SevenElleven, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect the information of our users on our website and at our events.
                </p>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    1. Information We Collect
                  </h2>
                  <p className="mb-4">We may collect the following types of information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Personal Information:</strong> Name, email address, phone number, and social media handles when you register, subscribe, or contact us.</li>
                    <li><strong className="text-white">Payment Information:</strong> Billing details when you purchase tickets, subscriptions, or other services.</li>
                    <li><strong className="text-white">Usage Data:</strong> IP addresses, browser type, device information, and browsing activity on our website.</li>
                    <li><strong className="text-white">Event Participation Data:</strong> Attendance records and interaction at our events and activations.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    2. How We Use Your Information
                  </h2>
                  <p className="mb-4">We use your information to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide and manage our services, events, and community activities.</li>
                    <li>Process payments and subscriptions.</li>
                    <li>Communicate with you about updates, offers, and events.</li>
                    <li>Improve our website, events, and overall user experience.</li>
                    <li>Ensure security and prevent fraudulent activity.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    3. Sharing of Information
                  </h2>
                  <p className="mb-4">We do not sell your personal information. We may share data with:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Service Providers:</strong> Companies helping us run our website, process payments, or deliver events.</li>
                    <li><strong className="text-white">Legal Requirements:</strong> When required by law, court order, or to protect the rights of SevenElleven.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    4. Cookies and Tracking
                  </h2>
                  <p>
                    Our website uses cookies and analytics tools to monitor usage and improve performance. You can manage cookie preferences through your browser settings.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    5. Security
                  </h2>
                  <p>
                    We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, disclosure, or misuse.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    6. Your Rights
                  </h2>
                  <p>
                    You may request access to, correction, or deletion of your personal data. You can also unsubscribe from marketing communications at any time.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    7. Children's Privacy
                  </h2>
                  <p>
                    SevenElleven does not knowingly collect information from individuals under 18 years old.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    8. Changes to This Policy
                  </h2>
                  <p>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
                  </p>
                </div>

                <div className="pt-6 border-t border-accent-blue/20">
                  <h2 className="text-2xl font-display font-bold text-white mb-4">
                    Contact Us
                  </h2>
                  <p>
                    If you have questions about this Privacy Policy, kindly get in touch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
