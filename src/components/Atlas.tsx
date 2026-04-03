import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, PenTool, Trophy, ArrowUpRight } from 'lucide-react';

export default function Atlas() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="atlas" className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-sm font-medium backdrop-blur-sm font-mono">
              <Flame className="w-4 h-4" />
              <span>Companion App</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] font-heading">
              Meet Atlas. <br />
              <span className="text-zinc-500">Your writing companion.</span>
            </h2>
            <p className="text-zinc-400 text-xl leading-relaxed font-body">
              Atlas is a dynamic companion that lives at the top of your screen. It tracks your progress, celebrates your streaks, and keeps you motivated without ever breaking your flow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-brand-light transition-all flex items-center justify-center gap-2 font-body">
                Atlas coming soon
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            {/* Atlas Pill Mockup */}
            <div 
              className="relative z-10 w-full max-w-md"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                animate={{
                  height: isHovered ? 180 : 48,
                  width: isHovered ? 380 : 200,
                  borderRadius: isHovered ? 32 : 24,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden mx-auto flex flex-col items-center justify-center cursor-default"
              >
                <div className="flex items-center gap-6 h-12 px-6 shrink-0 font-mono">
                  <div className="flex items-center gap-2 text-orange-500 font-bold">
                    <Flame className="w-5 h-5" />
                    <span>7</span>
                  </div>
                  <div className="w-px h-4 bg-white/10" />
                  <div className="flex items-center gap-2 text-brand-accent font-bold">
                    <PenTool className="w-5 h-5" />
                    <span>342</span>
                  </div>
                </div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="w-full px-8 pb-8 space-y-6"
                    >
                      <div className="h-px w-full bg-white/5" />
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest font-mono">Daily Goal</div>
                          <div className="text-sm text-white font-medium font-mono">342 / 500 words</div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-brand-accent" />
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "68%" }}
                          className="h-full bg-brand-accent" 
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <p className="text-center mt-6 text-sm text-zinc-500 font-medium font-body">
                Hover to expand Atlas
              </p>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-brand-accent/20 blur-[120px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
