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
import LegalModal, { LegalDocType } from './components/LegalModal';

export default function App() {
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType | null>(null);

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
      <Footer
        onPrivacyClick={() => setActiveLegalDoc('privacy')}
        onTermsClick={() => setActiveLegalDoc('terms')}
      />
      <LegalModal
        isOpen={activeLegalDoc !== null}
        type={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
      />
    </div>
  );
}
