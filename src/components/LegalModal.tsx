import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Mail, ShieldCheck, Sparkles } from 'lucide-react';

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
  sections: DocumentSection[];
}

const PRIVACY_DATA: DocumentData = {
  title: "Privacy Policy",
  subtitle: "How Horyzen & Flow safeguard your personal data and privacy with a local-first architecture.",
  effectiveDate: "January 4, 2026",
  badgeText: "Local-First Architecture",
  sections: [
    {
      number: "01",
      title: "Information We Collect",
      content: [
        "We are committed to minimal data collection. Horyzen Flow is engineered with a strict local-first philosophy.",
        "When using our web platform or desktop applications, we may process:",
        "• Basic, anonymized usage telemetry (such as page views and interaction metrics) to diagnose application performance.",
        "• Non-identifying device and browser specifications required to optimize canvas rendering.",
        "• Information you explicitly choose to provide (such as user feedback, bug reports, or support correspondence)."
      ]
    },
    {
      number: "02",
      title: "How We Use Your Information",
      content: [
        "Any collected telemetry is strictly utilized for technical operations and product refinement:",
        "• Enhancing application execution speed, responsiveness, and memory footprint.",
        "• Identifying and resolving technical bugs and edge-case exceptions.",
        "• Understanding aggregate usage patterns to prioritize future roadmap items."
      ]
    },
    {
      number: "03",
      title: "File Downloads & Local Execution",
      content: [
        "When you download the Horyzen Flow desktop client or standalone executable, no personal user registration is required.",
        "Software binaries and release packages are hosted on secure enterprise infrastructure. Third-party distribution providers may log basic HTTP requests in accordance with their respective security policies."
      ]
    },
    {
      number: "04",
      title: "Cookies & Local Storage",
      content: [
        "We utilize essential browser local storage and minimal state cookies to:",
        "• Preserve user settings, theme preferences, and local workspace configurations.",
        "• Maintain session state across navigation cycles.",
        "You can manage or clear local storage data at any time through your browser settings."
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
        "Horyzen products are tailored for software creators, writers, and thinkers. We do not knowingly harvest or solicit data from children under the age of 13."
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
        "For privacy inquiries, data deletion requests, or technical questions regarding data handling, reach out directly to our engineering team:"
      ]
    }
  ]
};

const TERMS_DATA: DocumentData = {
  title: "Terms of Service",
  subtitle: "Terms and conditions governing the use of the Horyzen platform and Flow software.",
  effectiveDate: "January 4, 2026",
  badgeText: "Fair Usage Agreement",
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
        "All visual branding, source assets, designs, and proprietary code bases connected with Horyzen and Flow remain the property of Horyzen unless explicitly designated under an open-source license.",
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

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          {/* Backdrop with high-end blur and subtle dark tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container with Max-2XL reading focus */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 12, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.97, y: 8, filter: 'blur(4px)' }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 32,
              mass: 0.8
            }}
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-zinc-950 border border-zinc-800/80 rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.9)] overflow-hidden z-10 font-sans"
          >
            {/* Top rim specular highlight line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-30" />

            {/* Sticky Header Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(71,142,138,0.6)]" />
                <h2 id="legal-modal-title" className="text-sm font-semibold text-zinc-100 tracking-tight font-sans">
                  {data.title}
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="group flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono text-zinc-400 hover:text-zinc-100 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50"
              >
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-300">ESC</span>
                <X className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-100 transition-colors" />
              </button>
            </div>

            {/* Scrollable Document Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-8 scrollbar-thin scrollbar-thumb-zinc-800 hover:scrollbar-thumb-zinc-700">

              {/* Document Header Metadata */}
              <div className="space-y-3.5 pb-6 border-b border-zinc-900">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-brand-accent/10 border border-brand-accent/20 text-brand-light">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                    {data.badgeText}
                  </span>
                  <p className="text-xs font-mono text-zinc-500">
                    Effective: <span className="text-zinc-300 font-medium">{data.effectiveDate}</span>
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                  {data.subtitle}
                </p>
              </div>

              {/* Document Sections */}
              <div className="space-y-8 divide-y divide-zinc-900/80">
                {data.sections.map((section, idx) => (
                  <div key={idx} className="pt-7 first:pt-0 space-y-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] font-medium text-brand-accent px-2 py-0.5 rounded bg-brand-accent/10 border border-brand-accent/20">
                        {section.number}
                      </span>
                      <h3 className="text-sm font-semibold text-zinc-100 tracking-tight font-sans">
                        {section.title}
                      </h3>
                    </div>

                    <div className="space-y-2.5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                      {section.content.map((paragraph, pIdx) => {
                        const isBullet = paragraph.startsWith('•');
                        if (isBullet) {
                          return (
                            <div key={pIdx} className="flex items-start gap-2 pl-2 text-zinc-300">
                              <span className="text-brand-accent font-bold select-none">•</span>
                              <span>{paragraph.substring(1).trim()}</span>
                            </div>
                          );
                        }
                        return (
                          <p key={pIdx} className="text-zinc-400">
                            {paragraph}
                          </p>
                        );
                      })}

                      {/* Interactive contact callout on section 09 */}
                      {section.number === '09' && (
                        <div className="mt-4 pt-1">
                          <a
                            href="mailto:horyzen.app@gmail.com"
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white text-xs font-mono transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/50"
                          >
                            <Mail className="w-3.5 h-3.5 text-brand-accent group-hover:scale-110 transition-transform" />
                            <span>horyzen.app@gmail.com</span>
                            <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-brand-accent transition-colors ml-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Status / Governance Bar */}
            <div className="px-6 sm:px-8 py-3 border-t border-zinc-900 bg-zinc-950/90 backdrop-blur-md flex items-center justify-between font-mono text-[11px] text-zinc-500">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-zinc-600" />
                <span>Horyzen Flow Governance</span>
              </div>
              <span>Updated 2026</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
