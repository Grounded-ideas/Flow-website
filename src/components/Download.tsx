import React from 'react';
import { ChevronDown, Download as DownloadIcon, ExternalLink, Github, ShieldAlert, Terminal } from 'lucide-react';
import ReactGA from 'react-ga4';

const downloadLink = 'https://github.com/Grounded-ideas/Horyzen-Flow-download/releases/download/v0.1.3/Flow_0.1.3_x64_en-US.msi';
const releaseLink = 'https://github.com/Grounded-ideas/Horyzen-Flow-download/releases/tag/v0.1.3';
const githubRepoLink = 'https://github.com/Grounded-ideas/Horyzen-Flow-download';

export default function Download() {
  const handleDownloadClick = () => {
    // Retain the existing measurement event; it records a CTA click, not a confirmed install.
    ReactGA.event({
      category: 'engagement',
      action: 'Downloaded App',
      label: 'Flow v0.1.3',
    });
  };

  const handleGitHubClick = () => {
    ReactGA.event({
      category: 'engagement',
      action: 'View GitHub',
    });
  };

  return (
    <section id="download" className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-12 md:p-24 rounded-[48px] bg-zinc-900 border border-white/10 overflow-hidden text-center space-y-12">
          {/* Background Glow */}
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-brand-accent/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-brand-dark/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] font-heading">
              Start writing. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-light">
                Free.
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-zinc-400 leading-relaxed font-body">
              Flow is completely free for Windows. Download now, write forever. No account needed.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={downloadLink}
              onClick={handleDownloadClick}
              className="w-full sm:w-auto px-12 py-6 rounded-full bg-white text-black font-bold hover:bg-brand-light transition-all flex items-center justify-center gap-3 group shadow-2xl font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-900"
            >
              <DownloadIcon aria-hidden="true" className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
              Download Flow for Windows
            </a>
            <a
              href={githubRepoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGitHubClick}
              className="w-full sm:w-auto px-12 py-6 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 group font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-900"
            >
              <Github aria-hidden="true" className="w-6 h-6" />
              View on GitHub
            </a>
          </div>

          <details className="group relative z-10 max-w-3xl mx-auto rounded-2xl bg-black/30 border border-white/10 text-left">
            <summary className="flex cursor-pointer list-none items-center gap-3 p-5 text-left rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900">
              <ShieldAlert aria-hidden="true" className="w-5 h-5 shrink-0 text-brand-light" />
              <span className="flex-1 text-sm sm:text-base font-semibold text-zinc-200 font-body">
                About Windows security prompts
              </span>
              <span className="text-xs text-zinc-500 font-mono">Optional</span>
              <ChevronDown aria-hidden="true" className="w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="px-5 pb-5 space-y-3 text-sm text-zinc-400 leading-relaxed font-body">
              <p>
                Windows SmartScreen may warn when it has limited reputation information about a file or its publisher. A warning is a caution signal; it does not prove that an app is safe or malicious.
              </p>
              <p>
                The installer is hosted on Flow’s linked GitHub release. Its release page lists a SHA-256 digest you can use to check that your file matches the published asset. A matching digest does not verify the publisher or prove the software is safe.
              </p>
              <p>
                If you are unsure about the source or publisher, cancel rather than bypassing a security warning. This website does not independently certify the installer.
              </p>
              <a
                href={releaseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-light hover:text-white underline decoration-white/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
              >
                View the v0.1.3 release and its file digest
                <ExternalLink aria-hidden="true" className="w-3.5 h-3.5" />
              </a>
            </div>
          </details>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-white/5 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-xs font-mono">
                <Terminal aria-hidden="true" className="w-4 h-4" />
                Requirements
              </div>
              <div className="text-sm text-white font-medium font-mono">Windows 10 or 11, 64-bit</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-xs font-mono">
                <DownloadIcon aria-hidden="true" className="w-4 h-4" />
                File Size
              </div>
              <div className="text-sm text-white font-medium font-mono">~5MB Installer</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-xs font-mono">
                <Terminal aria-hidden="true" className="w-4 h-4" />
                Version
              </div>
              <div className="text-sm text-white font-medium font-mono">v0.1.3</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
