import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Tutorial from './components/Tutorial';
import Templates from './components/Templates';
import Atlas from './components/Atlas';
import Export from './components/Export';
import Download from './components/Download';
import Footer from './components/Footer';

const privacyPolicy = `
Privacy Policy
Effective Date: [1/4/2026]
Welcome to Horyzen.
Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and applications, including Horyzen Flow.
1. Information We Collect
We may collect the following types of information:
Basic usage data (such as pages visited and interactions)
Device and browser information
Optional information you provide (such as feedback or contact details)
We do not collect sensitive personal information unless explicitly provided by you.
2. How We Use Your Information
We use collected data to:
Improve app performance and user experience
Fix bugs and technical issues
Understand how users interact with our platform
3. File Downloads
When you download software (such as the Flow executable), no personal data is required. Downloads are hosted securely via third-party services (e.g., GitHub).
4. Cookies
We may use basic cookies to:
Remember preferences
Improve performance
You can disable cookies in your browser settings.
5. Third-Party Services
We may rely on trusted third-party platforms (such as GitHub) to host and deliver files. These services may collect their own data according to their policies.
6. Data Security
We take reasonable steps to protect your information, but no system is completely secure.
7. Children's Privacy
Our services are not intended for children under 13.
8. Changes to This Policy
We may update this Privacy Policy. Updates will be reflected with a new "Effective Date."
9. Contact
If you have questions, contact us at:
[horyzen.app@gmail.com]
`;

const termsOfService = `
Terms of Service
Effective Date: [1/4/2026]
By accessing or using Horyzen and its applications (including Flow), you agree to the following terms:
1. Use of Service
You agree to use this website and software responsibly and not for any unlawful purposes.
2. Software Distribution
Horyzen Flow is provided as-is. You download and use the software at your own risk.
We are not responsible for:
Device damage
Data loss
Compatibility issues
3. Intellectual Property
All content, branding, and software related to Horyzen are owned by us unless stated otherwise. You may not copy, modify, or redistribute without permission.
4. Updates and Changes
We may update, modify, or discontinue parts of the service at any time without notice.
5. Third-Party Links
Our website may include links to third-party platforms (such as GitHub). We are not responsible for their content or policies.
6. Limitation of Liability
To the maximum extent permitted by law, Horyzen is not liable for any indirect or consequential damages resulting from the use of our services.
7. Termination
We reserve the right to restrict access to users who violate these terms.
8. Changes to Terms
We may update these Terms at any time. Continued use of the service means you accept the updated terms.
9. Contact
For questions, contact:
[horyzen.app@gmail.com]
`;

interface ModalProps {
  onClose: () => void;
  title: string;
  content: string;
}

function Modal({ onClose, title, content }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="text-zinc-300 whitespace-pre-line font-body">
          {content}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Tutorial />
        <Templates />
        <Export />
        <Atlas />
        <Download />
      </main>
      <Footer onPrivacyClick={() => setShowPrivacy(true)} onTermsClick={() => setShowTerms(true)} />
      {showPrivacy && <Modal onClose={() => setShowPrivacy(false)} title="Privacy Policy" content={privacyPolicy} />}
      {showTerms && <Modal onClose={() => setShowTerms(false)} title="Terms of Service" content={termsOfService} />}
    </div>
  );
}
