import React from 'react';

const TermsOfService = () => {
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
              <span className="gradient-text">Terms of</span>{' '}
              <span className="text-white">Service</span>
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
                  These Terms of Service ("Terms") govern your use of the SevenElleven website, services, events, and related content. By using our website or attending our events, you agree to these Terms.
                </p>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    1. Use of Services
                  </h2>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>You must be 18 years or older to register or purchase tickets.</li>
                    <li>You agree to provide accurate information when signing up or making payments.</li>
                    <li>You are responsible for your account and any activity under it.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    2. Event Attendance
                  </h2>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Attendance at SevenElleven events is subject to rules, capacity limits, and ticketing terms.</li>
                    <li>SevenElleven reserves the right to refuse entry or remove individuals who violate event rules or engage in inappropriate behavior.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    3. Subscriptions and Payments
                  </h2>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Payment for events, subscriptions, or services must be made in full using approved payment methods.</li>
                    <li>All fees are non-refundable unless explicitly stated.</li>
                    <li>SevenElleven may adjust pricing or subscription terms with prior notice.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    4. Intellectual Property
                  </h2>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>All content on the website, including text, images, logos, and designs, is owned by SevenElleven or its licensors.</li>
                    <li>You may not copy, reproduce, or use our intellectual property without prior written consent.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    5. User Conduct
                  </h2>
                  <p className="mb-4">You agree not to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Post harmful, offensive, or illegal content.</li>
                    <li>Engage in harassment, spamming, or misuse of the community.</li>
                    <li>Attempt to disrupt our website or services.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    6. Limitation of Liability
                  </h2>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>SevenElleven is not liable for personal injury, loss, or damage arising from attending events or using the website, except where required by law.</li>
                    <li>We strive to provide accurate information, but event schedules and content may change without notice.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    7. Privacy
                  </h2>
                  <p>
                    Use of our website and services is also governed by our Privacy Policy.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    8. Changes to Terms
                  </h2>
                  <p>
                    SevenElleven may update these Terms at any time. Continued use of our website or services constitutes acceptance of the updated Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">
                    9. Governing Law
                  </h2>
                  <p>
                    These Terms are governed by the laws of Kenya, and any disputes shall be resolved in Kenyan courts.
                  </p>
                </div>

                <div className="pt-6 border-t border-accent-blue/20">
                  <h2 className="text-2xl font-display font-bold text-white mb-4">
                    Contact Us
                  </h2>
                  <p>
                    For questions about these Terms, kindly get in touch.
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

export default TermsOfService;
