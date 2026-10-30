import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Book,
  Calendar,
  ChevronDown,
  FileText,
  Lightbulb,
  PenTool,
  Layout,
  Plus,
} from 'lucide-react';

interface TemplateCard {
  icon: React.ReactNode;
  name: string;
  description: string;
  preview: string;
}

// Keep these excerpts aligned with the desktop app's src/lib/templates.ts definitions.
const templates: TemplateCard[] = [
  {
    icon: <Book aria-hidden="true" className="w-6 h-6" />,
    name: 'Daily Journal',
    description: 'Reflect on your day.',
    preview: '# Daily Journal: [Date]\n\n**Mood:**\n**Gratitude:**\n\n## What happened today?\n\n## Focus for tomorrow',
  },
  {
    icon: <Calendar aria-hidden="true" className="w-6 h-6" />,
    name: 'Meeting Notes',
    description: 'Keep track of decisions.',
    preview: '# Meeting: [Title]\n**Date:** [Date]\n**Attendees:**\n\n## Agenda\n\n## Decisions\n\n## Action Items\n- [ ]',
  },
  {
    icon: <Layout aria-hidden="true" className="w-6 h-6" />,
    name: 'Project Plan',
    description: 'Organize your next big thing.',
    preview: '# Project: [Title]\n\n## Goals\n\n## Timeline\n\n## Resources\n\n## Milestones\n- [ ]',
  },
  {
    icon: <PenTool aria-hidden="true" className="w-6 h-6" />,
    name: 'Blog Post',
    description: 'Draft your next article.',
    preview: '# [Title]\n**Draft Date:** [Date]\n**Tags:**\n\n---\n\n## Introduction\n\n## Main Content\n\n## Conclusion',
  },
  {
    icon: <FileText aria-hidden="true" className="w-6 h-6" />,
    name: 'Book Notes',
    description: 'Capture key insights.',
    preview: '# Book: [Title]\n**Author:**\n**Date Read:** [Date]\n\n## Summary\n\n## Key Quotes\n>\n\n## Personal Takeaways',
  },
  {
    icon: <Lightbulb aria-hidden="true" className="w-6 h-6" />,
    name: 'Brain Dump',
    description: 'Get ideas out of your head.',
    preview: '# Brain Dump: [Date] [Time]',
  },
  {
    icon: <Plus aria-hidden="true" className="w-6 h-6" />,
    name: 'Blank Page',
    description: 'Start from scratch.',
    preview: '# [Title]',
  },
];

export default function Templates() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="templates" className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-heading">
              Start with a spark.
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl font-body">
              Choose a starting point. Open a preview to see the sections before you download Flow.
            </p>
          </div>
          <div className="flex gap-4 font-mono">
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm font-medium">
              7 Templates
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <motion.article
              key={template.name}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.04 }}
              className="p-6 rounded-3xl bg-zinc-900/50 border border-white/10 transition-colors duration-200 hover:border-white/20 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-zinc-400">
                  {template.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-heading">
                  {template.name}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-body mb-6">
                  {template.description}
                </p>
              </div>
              <details className="group">
                <summary className="template-preview-summary flex cursor-pointer list-none items-center justify-between gap-2 text-xs font-semibold tracking-wide text-brand-light font-mono rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900">
                  <span>Preview {template.name} structure</span>
                  <ChevronDown aria-hidden="true" className="template-preview-chevron w-4 h-4 shrink-0 text-zinc-400" />
                </summary>
                <div className="mt-5 pt-5 border-t border-white/10">
                  <p className="text-xs uppercase tracking-wider text-zinc-500 font-mono mb-3">
                    Starts with
                  </p>
                  <pre className="whitespace-pre-wrap break-words rounded-xl bg-black/40 border border-white/5 p-4 text-xs text-zinc-300 leading-6 font-mono">
                    {template.preview}
                  </pre>
                  <a
                    href="#download"
                    className="inline-flex mt-4 text-sm font-semibold text-brand-light hover:text-white underline decoration-white/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
                  >
                    Get Flow for Windows
                  </a>
                </div>
              </details>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}