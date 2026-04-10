import React from 'react';
import { motion } from 'framer-motion';
import { Download as DownloadIcon, Github, Terminal } from 'lucide-react';
import ReactGA from 'react-ga4';

export default function Download() {
  // Direct download link for the MSI installer
  const downloadLink = 'https://github.com/Grounded-ideas/Horyzen-Flow-download/releases/download/v0.1.2/Flow_0.1.2_x64_en-US.msi';
  const githubRepoLink = 'https://github.com/Grounded-ideas/Horyzen-Flow-download';

  const handleDownloadClick = () => {
    ReactGA.event({
      category: 'engagement',
      action: 'Downloaded App',
      label: 'Flow v0.1.2',
    });
    // Open download in new tab to ensure GA fires
    window.open(downloadLink, '_blank');
  };

  const handleGitHubClick = () => {
    ReactGA.event({
      category: 'engagement',
      action: 'View GitHub',
    });
    window.open(githubRepoLink, '_blank');
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
            <button 
              onClick={handleDownloadClick} 
              className="w-full sm:w-auto px-12 py-6 rounded-full bg-white text-black font-bold hover:bg-brand-light transition-all flex items-center justify-center gap-3 group shadow-2xl font-body"
            >
              <DownloadIcon className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
              Download Flow for Windows
            </button>
            <button 
              onClick={handleGitHubClick}
              className="w-full sm:w-auto px-12 py-6 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 group font-body"
            >
              <Github className="w-6 h-6" />
              View on GitHub
            </button>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-white/5 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-xs font-mono">
                <Terminal className="w-4 h-4" />
                Requirements
              </div>
              <div className="text-sm text-white font-medium font-mono">Windows 10 or 11, 64-bit</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-xs font-mono">
                <DownloadIcon className="w-4 h-4" />
                File Size
              </div>
              <div className="text-sm text-white font-medium font-mono">~15MB Installer</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-xs font-mono">
                <Terminal className="w-4 h-4" />
                Version
              </div>
              <div className="text-sm text-white font-medium font-mono">v0.1.2</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}