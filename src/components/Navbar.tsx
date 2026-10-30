import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import flowLogo from '../../asset/Flow.svg';
import ReactGA from 'react-ga4';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  // Direct download link for the MSI installer
  const downloadLink = 'https://github.com/Grounded-ideas/Horyzen-Flow-download/releases/download/v0.1.3/Flow_0.1.3_x64_en-US.msi';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadClick = () => {
    ReactGA.event({
      category: 'engagement',
      action: 'Downloaded App',
      label: 'Flow v0.1.3 - Navbar',
    });
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
          <a
            href="#"
            className="flex items-center gap-3 text-xl font-bold text-white group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded-lg p-1 transition-all"
          >
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
                className="text-sm font-medium text-zinc-400 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded-md px-2 py-1 transition-colors font-body"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={downloadLink}
              onClick={handleDownloadClick}
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-brand-light transition-all flex items-center gap-2 font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            ref={menuToggleRef}
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 text-zinc-400 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-4 right-4 mt-4 p-8 bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl md:hidden flex flex-col gap-6"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-lg font-medium text-zinc-400 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 rounded-md px-2 py-1 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px w-full bg-white/5" />
              <a
                href={downloadLink}
                onClick={() => {
                  handleDownloadClick();
                  setIsMobileMenuOpen(false);
                  menuToggleRef.current?.focus();
                }}
                className="w-full px-6 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
              >
                <Download className="w-5 h-5" />
                Download for Windows
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}