import React from 'react';
import { Github, Twitter, Mail, Heart } from 'lucide-react';
import flowLogo from '../../asset/Flow.svg';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

export default function Footer({ onPrivacyClick, onTermsClick }: FooterProps) {
  return (
    <footer className="py-24 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-2xl font-bold text-white font-heading">
              <img src={flowLogo} alt="Flow Logo" className="w-8 h-8 rounded-2xl" referrerPolicy="no-referrer" />
              Flow
            </div>
            <p className="text-zinc-500 leading-relaxed font-body">
              Flow is part of Horyzen — a suite of local-first tools for creators. Built for writers who value focus.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/Grounded-ideas" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-brand-accent hover:bg-brand-accent/10 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-brand-accent hover:bg-brand-accent/10 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:horyzen.app@gmail.com" className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-brand-accent hover:bg-brand-accent/10 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest font-heading">Product</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-zinc-500 hover:text-brand-accent transition-colors font-body">Features</a></li>
              <li><a href="#tutorial" className="text-zinc-500 hover:text-brand-accent transition-colors font-body">Tutorial</a></li>
              <li><a href="#templates" className="text-zinc-500 hover:text-brand-accent transition-colors font-body">Templates</a></li>
              <li><a href="#download" className="text-zinc-500 hover:text-brand-accent transition-colors font-body">Download</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest font-heading">Company</h4>
            <ul className="space-y-4">
              <li><button onClick={onPrivacyClick} className="text-zinc-500 hover:text-brand-accent transition-colors font-body text-left">Privacy Policy</button></li>
              <li><button onClick={onTermsClick} className="text-zinc-500 hover:text-brand-accent transition-colors font-body text-left">Terms of Service</button></li>
              <li><a href="#" className="text-zinc-500 hover:text-brand-accent transition-colors font-body">Changelog</a></li>
              <li><a href="https://github.com/Grounded-ideas" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-brand-accent transition-colors font-body">GitHub</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest font-heading">Newsletter</h4>
            <p className="text-zinc-500 text-sm font-body">Get writing tips and product updates.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-accent transition-colors font-body"
              />
              <button className="px-4 py-2 rounded-xl bg-brand-accent text-white text-sm font-bold hover:bg-brand-dark transition-colors font-body">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 font-mono text-sm">
          <p className="text-zinc-600">
            © {new Date().getFullYear()} Horyzen. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-zinc-600">
            Made with <Heart className="w-4 h-4 text-brand-accent fill-brand-accent" /> for writers
          </div>
        </div>
      </div>
    </footer>
  );
}
