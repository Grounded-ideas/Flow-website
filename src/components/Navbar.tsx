import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X, Monitor, Shield } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import flowLogo from '../../asset/Flow.svg';
import ReactGA from 'react-ga4';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Direct download link for the MSI installer
  const downloadLink = 'https://github.com/Grounded-ideas/Horyzen-Flow-download/releases/download/v0.1.3/Flow_0.1.3_x64_en-US.msi';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadClick = () => {
    setShowWarning(true);
    ReactGA.event({
      category: 'engagement',
      action: 'Downloaded App',
      label: 'Flow v0.1.3 - Navbar',
    });
  };

  const proceedWithDownload = () => {
    setShowWarning(false);
    window.open(downloadLink, '_blank');
  };

  const cancelDownload = () => {
    setShowWarning(false);
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Tutorial', href: '#tutorial' },
    { name: 'Templates', href: '#templates' },
    { name: 'Atlas', href: '#atlas' },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8",
        isScrolled ? "py-4" : "py-8"
      )}>
        <div className={cn(
          "max-w-7xl mx-auto px-6 py-3 rounded-full border transition-all duration-300 flex items-center justify-between",
          isScrolled 
            ? "bg-zinc-900/80 border-white/10 backdrop-blur-md shadow-2xl" 
            : "bg-transparent border-transparent"
        )}>
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 text-xl font-bold text-white group">
            <img 
              src={flowLogo}
              alt="Flow Logo"
              className="w-8 h-8 rounded-2xl group-hover:scale-110 transition-transform"
              referrerPolicy="no-referrer"
            />
            <span className="font-heading tracking-tight">Flow</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors font-body"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={handleDownloadClick} className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-brand-light transition-all flex items-center gap-2 font-body">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-4 right-4 mt-4 p-8 bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl md:hidden flex flex-col gap-6"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px w-full bg-white/5" />
              <button onClick={() => { handleDownloadClick(); setIsMobileMenuOpen(false); }} className="w-full px-6 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download for Windows
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

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
              
              <div className="bg-zinc-800 rounded-lg p-4 mb-6">
                <p className="text-sm text-zinc-300 font-mono">
                  1. Click <span className="text-yellow-400">"More info"</span><br />
                  2. Click <span className="text-yellow-400">"Run anyway"</span><br />
                  3. Flow will install normally
                </p>
              </div>
              
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
    </>
  );
}