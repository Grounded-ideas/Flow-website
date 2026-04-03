import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Monitor } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm font-medium backdrop-blur-sm"
          >
            <Monitor className="w-4 h-4" />
            <span>Now available for Windows 10 & 11</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-heading font-bold text-white tracking-tight leading-[1.1]"
          >
            Write without <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-light">
              interruption.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-zinc-400 leading-relaxed font-body"
          >
            Flow is a distraction-free writing app for Windows. Typewriter mode, focus mode, and beautiful Markdown — all local-first.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-accent text-white font-bold hover:bg-brand-dark transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(71,142,138,0.3)] font-body">
              <Download className="w-5 h-5" />
              Download Flow for Windows
            </button>
            <a 
              href="#tutorial"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 group font-body"
            >
              Take the tour
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Hero Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent/20 to-brand-dark/20 rounded-3xl blur-2xl opacity-50" />
          <div className="relative bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Window Controls */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
              </div>
              <div className="text-xs text-zinc-500 font-mono font-medium">Flow - Untitled.md</div>
              <div className="w-12" />
            </div>
            {/* Editor Mock */}
            <div className="p-12 md:p-24 space-y-6 font-mono">
              <div className="h-8 w-1/3 bg-white/10 rounded-lg animate-pulse" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-white/5 rounded-md" />
                <div className="h-4 w-full bg-white/5 rounded-md" />
                <div className="h-4 w-2/3 bg-white/5 rounded-md" />
              </div>
              <div className="h-px w-full bg-white/5" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-white/5 rounded-md" />
                <div className="h-4 w-3/4 bg-white/5 rounded-md" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
