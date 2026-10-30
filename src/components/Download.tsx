import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download as DownloadIcon, Github, Terminal, Shield, ChevronDown } from 'lucide-react';
import ReactGA from 'react-ga4';

export default function Download() {
  const [showWarning, setShowWarning] = useState(false);
  
  // Direct download link for the MSI installer
  const downloadLink = 'https://github.com/Grounded-ideas/Horyzen-Flow-download/releases/download/v0.1.3/Flow_0.1.3_x64_en-US.msi';
  const githubRepoLink = 'https://github.com/Grounded-ideas/Horyzen-Flow-download';

  const handleDownloadClick = () => {
    // Show warning popup first
    setShowWarning(true);
    
    ReactGA.event({
      category: 'engagement',
      action: 'Downloaded App',
      label: 'Flow v0.1.3',
    });
  };

  const proceedWithDownload = () => {
    setShowWarning(false);
    window.open(downloadLink, '_blank');
  };

  const cancelDownload = () => {
    setShowWarning(false);
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
              className="w-full sm:w-auto px-12 py-6 rounded-full bg-white text-black font-bold hover:bg-brand-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 transition-all flex items-center justify-center gap-3 group shadow-2xl font-body"
            >
              <DownloadIcon className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
              Download Flow for Windows
            </button>
            <button 
              onClick={handleGitHubClick}
              className="w-full sm:w-auto px-12 py-6 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 transition-all flex items-center justify-center gap-3 group font-body"
            >
              <Github className="w-6 h-6" />
              View on GitHub
            </button>
          </div>

          {/* SmartScreen Security Disclosure */}
          <div className="relative z-10 max-w-2xl mx-auto pt-6 text-left">
            <details className="bg-zinc-800/50 border border-white/10 rounded-2xl overflow-hidden group">
              <summary className="smartscreen-summary cursor-pointer p-5 flex items-center justify-between text-sm font-medium text-zinc-300 hover:text-white transition-colors list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded-2xl">
                <span className="flex items-center gap-3 font-mono">
                  <Shield className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>SmartScreen & Installation Guide</span>
                </span>
                <ChevronDown className="w-5 h-5 text-zinc-400 smartscreen-chevron shrink-0" aria-hidden="true" />
              </summary>
              <div className="px-5 pb-5 pt-2 text-sm text-zinc-400 space-y-3 font-body border-t border-white/5">
                <p className="leading-relaxed">
                  Microsoft Defender SmartScreen may prevent unrecognized apps from starting automatically. <strong className="text-white">Flow is safe to run.</strong> This warning appears because the app is newly released.
                </p>
                <div className="bg-black/40 rounded-xl p-4 font-mono text-xs text-zinc-300 space-y-1">
                  <div>1. Click <span className="text-yellow-400">"More info"</span></div>
                  <div>2. Click <span className="text-yellow-400">"Run anyway"</span></div>
                  <div>3. Flow will install normally</div>
                </div>
              </div>
            </details>
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
              <div className="text-sm text-white font-medium font-mono">~5MB Installer</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-zinc-500 font-bold uppercase tracking-widest text-xs font-mono">
                <Terminal className="w-4 h-4" />
                Version
              </div>
              <div className="text-sm text-white font-medium font-mono">v0.1.3</div>
            </div>
          </div>
        </div>
      </div>

      {/* Windows Security Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="max-w-md w-full mx-4 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold text-white">Windows Protected Your PC</h3>
              </div>
              
              <p className="text-zinc-400 mb-4 leading-relaxed">
                Microsoft Defender SmartScreen prevented an unrecognized app from starting.
                <br /><br />
                <strong className="text-white">Flow is safe to run.</strong> This warning appears because the app is new.
              </p>
              
              <details className="bg-zinc-800/80 border border-white/10 rounded-xl overflow-hidden mb-6 group text-left" open>
                <summary className="smartscreen-summary cursor-pointer p-4 flex items-center justify-between text-sm font-medium text-zinc-200 hover:text-white transition-colors list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-xl">
                  <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider">Installation Instructions</span>
                  <ChevronDown className="w-4 h-4 text-zinc-400 smartscreen-chevron shrink-0" aria-hidden="true" />
                </summary>
                <div className="p-4 pt-2 text-sm text-zinc-300 font-mono space-y-1 border-t border-white/5">
                  <div>1. Click <span className="text-yellow-400">"More info"</span></div>
                  <div>2. Click <span className="text-yellow-400">"Run anyway"</span></div>
                  <div>3. Flow will install normally</div>
                </div>
              </details>
              
              <div className="flex gap-3">
                <button
                  onClick={proceedWithDownload}
                  className="flex-1 px-4 py-2 rounded-lg bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
                >
                  I understand, download anyway
                </button>
                <button
                  onClick={cancelDownload}
                  className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 font-bold hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}