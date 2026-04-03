import React from 'react';
import { motion } from 'framer-motion';
import { 
  Keyboard, 
  Target, 
  Type, 
  BarChart2, 
  HardDrive, 
  Network,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    icon: <Keyboard className="w-6 h-6 text-brand-accent" />,
    name: "Typewriter Mode",
    description: "Your current line stays perfectly centered. No more scanning to the bottom of the screen."
  },
  {
    icon: <Target className="w-6 h-6 text-brand-accent" />,
    name: "Focus Mode",
    description: "One click hides everything except your words. The UI fades away."
  },
  {
    icon: <Type className="w-6 h-6 text-brand-accent" />,
    name: "Smart Titles",
    description: "The first line becomes the page title. One less decision."
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-brand-accent" />,
    name: "Writing Analytics",
    description: "Track streaks, daily words, and habits. See your progress at a glance."
  },
  {
    icon: <HardDrive className="w-6 h-6 text-brand-accent" />,
    name: "Local-First",
    description: "Every page is a plain Markdown file in your Documents folder. Your data stays yours."
  },
  {
    icon: <Network className="w-6 h-6 text-brand-accent" />,
    name: "Graph View",
    description: "See how your ideas connect. Every link becomes a node in your personal knowledge graph."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-heading">Built for focus.</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-body">
            Flow is designed to get out of your way and let you write.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-3xl bg-zinc-900/50 border border-white/10 hover:bg-zinc-900 hover:border-brand-accent/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-accent/20 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">{feature.name}</h3>
              <p className="text-zinc-400 leading-relaxed mb-6 font-body">
                {feature.description}
              </p>
              <a 
                href="#tutorial" 
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent hover:text-brand-light transition-colors font-body"
              >
                Show me how
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
