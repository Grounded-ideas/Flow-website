import React from 'react';
import { motion } from 'framer-motion';
import { 
  Book, 
  Calendar, 
  FileText, 
  Lightbulb, 
  PenTool, 
  Layout,
  Plus
} from 'lucide-react';

const templates = [
  { icon: <Book className="w-6 h-6" />, name: "Daily Journal", description: "Reflect on your day." },
  { icon: <Calendar className="w-6 h-6" />, name: "Meeting Notes", description: "Keep track of decisions." },
  { icon: <Layout className="w-6 h-6" />, name: "Project Plan", description: "Organize your next big thing." },
  { icon: <PenTool className="w-6 h-6" />, name: "Blog Post", description: "Draft your next article." },
  { icon: <FileText className="w-6 h-6" />, name: "Book Notes", description: "Capture key insights." },
  { icon: <Lightbulb className="w-6 h-6" />, name: "Brain Dump", description: "Get ideas out of your head." },
  { icon: <Plus className="w-6 h-6" />, name: "Blank Page", description: "Start from scratch." }
];

export default function Templates() {
  return (
    <section id="templates" className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-heading">Start with a spark.</h2>
            <p className="text-zinc-400 text-lg max-w-xl font-body">
              Flow comes with 7 built-in templates to help you get started immediately.
            </p>
          </div>
          <div className="flex gap-4 font-mono">
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm font-medium">
              7 Templates
            </div>
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm font-medium">
              Customizable
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group p-6 rounded-3xl bg-zinc-900/50 border border-white/10 hover:bg-zinc-900 hover:border-brand-accent/30 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-accent/10 group-hover:text-brand-accent transition-all duration-300 text-zinc-400">
                {template.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-heading">{template.name}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-body">
                {template.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
