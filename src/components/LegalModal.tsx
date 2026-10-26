import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, ExternalLink, Mail, CheckCircle2 } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms';

interface LegalModalProps {
  isOpen: boolean;
  type: LegalDocType | null;
  onClose: () => void;
}

interface DocumentSection {
  number: string;
  title: string;
  content: string[];
}

interface DocumentData {
  title: string;
  subtitle: string;
  effectiveDate: string;
  badgeText: string;
  icon: typeof Shield;
  sections: DocumentSection[];
}

const PRIVACY_DATA: DocumentData = {
  title: "Privacy Policy",
  subtitle: "How Horyzen & Flow safeguard your personal data and privacy.",
  effectiveDate: "January 4, 2026",
  badgeText: "Local-First Architecture",
  icon: Shield,
  sections: [
    {
      number: "01",
      title: "Information We Collect",
      content: [
        "We are committed to minimal data collection. Horyzen Flow is designed with a local-first philosophy.",
        "When using our web platform or applications, we may process:",
        "• Basic, anonymized usage telemetry (such as page views and interaction metrics) to diagnose performance.",
        "• Non-identifying device and browser specifications required to optimize rendering.",
        "• Information you explicitly choose to provide (such as feedback, bug reports, or support correspondence)."
      ]
    },
    {
      number: "02",
      title: "How We Use Your Information",
      content: [
        "Any collected telemetry is strictly utilized for technical operations and product refinement:",
        "• Enhancing application execution speed, responsiveness, and memory footprint.",
        "• Identifying and squashing technical bugs and edge-case exceptions.",
        "• Understanding aggregate usage patterns to prioritize feature roadmap items."
      ]
    },
    {
      number: "03",
      title: "File Downloads & Local Execution",
      content: [
        "When you download the Horyzen Flow desktop client or standalone executable, no personal user registration is required.",
        "Software binaries and release packages are hosted on secure enterprise infrastructure (e.g., GitHub Releases). Third-party distribution providers may log basic HTTP requests in accordance with their respective security policies."
      ]
    },
    {
      number: "04",
      title: "Cookies & Local Storage",
      content: [
        "We utilize essential browser local storage and minimal state cookies to:",
        "• Preserve user settings, theme preferences, and local workspace configurations.",
        "• Maintain session state across navigation cycles.",
        "You can manage or clear local storage data at any time through your browser's developer tools or settings."
      ]
    },
    {
      number: "05",
      title: "Third-Party Services",
      content: [
        "We leverage trusted third-party infrastructure for hosting and open-source distribution (e.g., GitHub, Vercel). These platforms process network requests independently according to industry-standard security and compliance frameworks."
      ]
    },
    {
      number: "06",
      title: "Data Security Standards",
      content: [
        "We enforce rigorous encryption standards (HTTPS/TLS 1.3) for all transit data. While no digital transmission can guarantee absolute invulnerability, our local-first paradigm ensures your document contents remain on your local filesystem rather than cloud databases."
      ]
    },
    {
      number: "07",
      title: "Children's Privacy",
      content: [
        "Horyzen products are tailored for general software creators and writers. We do not knowingly harvest or solicit data from children under the age of 13."
      ]
    },
    {
      number: "08",
      title: "Updates to Policy",
      content: [
        "We may periodically refine this Privacy Policy to reflect evolving regulatory frameworks or architectural improvements. Updates will immediately be reflected with a revised Effective Date."
      ]
    },
    {
      number: "09",
      title: "Direct Contact & Support",
      content: [
        "For privacy inquiries, data deletion requests, or technical questions regarding data handling, reach out directly to our engineering team at:"
      ]
    }
  ]
};

const TERMS_DATA: DocumentData = {
  title: "Terms of Service",
  subtitle: "Terms and conditions governing the use of Horyzen platform & Flow.",
  effectiveDate: "January 4, 2026",
  badgeText: "Fair Usage Agreement",
  icon: FileText,
  sections: [
    {
      number: "01",
      title: "Acceptance of Terms",
      content: [
        "By accessing, downloading, or utilizing Horyzen websites and software applications (including Flow), you agree to be bound by these Terms of Service.",
        "If you do not agree with any portion of these terms, you should cease usage of the platform and software immediately."
      ]
    },
    {
      number: "02",
      title: "Use of Service & Software Distribution",
      content: [
        "Horyzen Flow is provided as local-first software. You are granted a non-exclusive, revocable right to use the application for lawful personal or professional writing and creation.",
        "You agree not to utilize the service for malicious activities, reverse engineering with intent to exploit, or distributing malicious payloads."
      ]
    },
    {
      number: "03",
      title: "Disclaimer & Limitation of Liability",
      content: [
        "Horyzen Flow is provided on an 'AS-IS' and 'AS-AVAILABLE' basis without warranties of any kind, whether express or implied.",
        "To the maximum extent permitted by applicable law, Horyzen and its maintainers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, hardware malfunction, or business interruption."
      ]
    },
    {
      number: "04",
      title: "Intellectual Property Rights",
      content: [
        "All visual branding, source assets, designs, and proprietary code bases connected with Horyzen and Flow remain the sole property of Horyzen unless explicitly designated under an open-source license.",
        "You retain 100% ownership of all documents, text, and personal content created or edited using Flow."
      ]
    },
    {
      number: "05",
      title: "Service Updates & Modifications",
      content: [
        "We continuously innovate and improve Flow. We reserve the right to alter features, publish software updates, or discontinue legacy components without prior notice."
      ]
    },
    {
      number: "06",
      title: "Third-Party Links & Dependencies",
      content: [
        "Our ecosystem contains references and links to external platforms (such as GitHub repositories). Horyzen assumes no responsibility for third-party content, terms, or security practices."
      ]
    },
    {
      number: "07",
      title: "Termination of Access",
      content: [
        "We reserve the right to restrict or terminate access to web services or community channels for users who violate these terms or engage in abusive behavior."
      ]
    },
    {
      number: "08",
      title: "Governing Terms Updates",
      content: [
        "These terms may be revised periodically. Continued interaction with Horyzen applications following updates constitutes explicit acceptance of the modified terms."
      ]
    },
    {
      number: "09",
      title: "Inquiries & Legal Correspondence",
      content: [
        "For legal inquiries, licensing questions, or terms clarification, please contact:"
      ]
    }
  ]
};

export default function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const data = type === 'privacy' ? PRIVACY_DATA : type === 'terms' ? TERMS_DATA : null;

  if (!data) return null;

  const IconComponent = data.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          {/* Backdrop with high-end blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.96, y: 12, filter: 'blur(6px)' }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 32,
              mass: 0.85
            }}
            className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-zinc-950/95 border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden z-10"
          >
            {/* Ambient Lighting Accent Gradient at top rim */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-brand-accent/15 via-brand-accent/5 to-transparent blur-2xl pointer-events-none" />

            {/* Sticky Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 md:px-8 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-brand-accent">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 id="legal-modal-title" className="text-xl font-bold text-white tracking-tight font-heading">
                      {data.title}
                    </h2>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider bg-brand-accent/10 border border-brand-accent/20 text-brand-light">
                      <CheckCircle2 className="w-3 h-3 text-brand-accent" />
                      {data.badgeText}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-body hidden sm:block mt-0.5">
                    Effective Date: <span className="font-mono text-zinc-300">{data.effectiveDate}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Document Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-10 md:py-8 space-y-8 divide-y divide-white/5 scrollbar-thin scrollbar-thumb-zinc-800 hover:scrollbar-thumb-zinc-700">

              {/* Mobile metadata badge line */}
              <div className="sm:hidden flex flex-wrap items-center justify-between gap-2 pb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-brand-accent/10 border border-brand-accent/20 text-brand-light">
                  <CheckCircle2 className="w-3 h-3 text-brand-accent" />
                  {data.badgeText}
                </span>
                <p className="text-xs text-zinc-400 font-body">
                  Effective: <span className="font-mono text-zinc-300">{data.effectiveDate}</span>
                </p>
              </div>

              {/* Subtitle intro banner */}
              <div className="pt-2">
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-body bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  {data.subtitle}
                </p>
              </div>

              {/* Document Sections Mapping */}
              {data.sections.map((section, idx) => (
                <div key={idx} className="pt-6 first:pt-0 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-brand-accent font-semibold px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/20">
                      {section.number}
                    </span>
                    <h3 className="text-base font-semibold text-zinc-100 tracking-tight font-body">
                      {section.title}
                    </h3>
                  </div>

                  <div className="pl-0 md:pl-9 space-y-2.5 text-sm text-zinc-400 leading-relaxed font-body">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className={paragraph.startsWith('•') ? 'pl-2 text-zinc-300' : ''}>
                        {paragraph}
                      </p>
                    ))}

                    {/* Interactive contact callout on section 09 */}
                    {section.number === '09' && (
                      <div className="mt-4 pt-3 flex items-center gap-3">
                        <a
                          href="mailto:horyzen.app@gmail.com"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-brand-accent/10 border border-white/10 hover:border-brand-accent/30 text-zinc-200 hover:text-brand-light text-xs font-mono transition-all duration-200 group"
                        >
                          <Mail className="w-4 h-4 text-brand-accent group-hover:scale-110 transition-transform" />
                          <span>horyzen.app@gmail.com</span>
                          <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-brand-accent transition-colors ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Bottom Control / Status Bar */}
            <div className="px-6 py-4 md:px-8 border-t border-white/10 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between font-mono text-xs text-zinc-500">
              <span>Horyzen Flow Governance</span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-sans font-medium transition-colors"
              >
                Close Document
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
