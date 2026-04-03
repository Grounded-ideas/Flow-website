import React from 'react';
import { motion } from 'framer-motion';
import { FileText, FileDown, CheckCircle2 } from 'lucide-react';

export default function Export() {
  return (
    <section id="export" className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            {/* Export Menu Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl max-w-md mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-lg font-bold text-white font-heading">Export Document</h4>
                <div className="px-2 py-1 rounded bg-brand-accent/10 text-brand-accent text-[10px] font-bold uppercase tracking-widest font-mono">Pro</div>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-white font-bold font-heading">PDF Document</div>
                      <div className="text-xs text-zinc-500 font-body">Perfect for sharing</div>
                    </div>
                  </div>
                  <FileDown className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-white font-bold font-heading">Word Document</div>
                      <div className="text-xs text-zinc-500 font-body">Editable DOCX format</div>
                    </div>
                  </div>
                  <FileDown className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all opacity-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-white font-bold font-heading">HTML Web Page</div>
                      <div className="text-xs text-zinc-500 font-body">Ready for the web</div>
                    </div>
                  </div>
                  <FileDown className="w-5 h-5 text-zinc-600" />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                <button className="w-full py-4 rounded-2xl bg-brand-accent text-white font-bold hover:bg-brand-dark transition-all font-body">
                  Export Now
                </button>
              </div>
            </motion.div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-brand-accent/10 blur-[120px] rounded-full pointer-events-none" />
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] font-heading">
              Polished export. <br />
              <span className="text-zinc-500">One click away.</span>
            </h2>
            <p className="text-zinc-400 text-xl leading-relaxed font-body">
              Whether you're submitting a manuscript or sharing meeting notes, Flow exports beautiful, professionally formatted documents in seconds.
            </p>
            <ul className="space-y-4">
              {[
                "Custom typography and margins",
                "Automatic table of contents",
                "Syntax highlighting for code",
                "Optimized for printing"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-300 font-body">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
