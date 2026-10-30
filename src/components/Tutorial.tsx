import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import { motion, AnimatePresence, useReducedMotion, MotionConfig } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  FileText, 
  Zap,
  Maximize2,
  Minimize2,
  Database
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Step {
  title: string;
  description: string;
  tip?: string;
  actionLabel?: string;
  action?: () => void;
}

const INITIAL_SAMPLE_VALUE = '# Welcome to Flow\n\nThis is an interactive browser demo. Edits made here are temporary, do not save or create a Flow file, and will reset when you reload or leave this page.\n\nPlease use sample text rather than private writing.';

type ActivePreview = 'analytics' | 'graph' | 'files' | null;

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [editorValue, setEditorValue] = useState(INITIAL_SAMPLE_VALUE);
  const [isTypewriterMode, setIsTypewriterMode] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [activePreview, setActivePreview] = useState<ActivePreview>(null);

  const analyticsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const graphTriggerRef = useRef<HTMLButtonElement | null>(null);
  const filesTriggerRef = useRef<HTMLButtonElement | null>(null);
  const previousPreviewRef = useRef<ActivePreview>(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setEditorValue(INITIAL_SAMPLE_VALUE);
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  // Handle return focus when closing a preview card
  useEffect(() => {
    if (previousPreviewRef.current && !activePreview) {
      if (previousPreviewRef.current === 'analytics') {
        analyticsTriggerRef.current?.focus();
      } else if (previousPreviewRef.current === 'graph') {
        graphTriggerRef.current?.focus();
      } else if (previousPreviewRef.current === 'files') {
        filesTriggerRef.current?.focus();
      }
    }
    previousPreviewRef.current = activePreview;
  }, [activePreview]);

  // Handle Escape key to close open preview card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePreview !== null) {
        setActivePreview(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePreview]);

  const togglePreview = (type: ActivePreview, triggerEl?: HTMLButtonElement | null) => {
    if (type === 'analytics' && triggerEl) analyticsTriggerRef.current = triggerEl;
    if (type === 'graph' && triggerEl) graphTriggerRef.current = triggerEl;
    if (type === 'files' && triggerEl) filesTriggerRef.current = triggerEl;

    setActivePreview((prev) => (prev === type ? null : type));
  };

  const steps: Step[] = [
    {
      title: "Welcome to Flow",
      description: "Try typing in this interactive browser preview. Edits are temporary, do not create or save a Flow file, and will reset if you leave or reload the page. Please use sample text rather than private writing.",
    },
    {
      title: "Smart Titles",
      description: "The first line of your page becomes its title. No need to manually rename pages. Try it: Type a heading in the editor. Watch the header update.",
    },
    {
      title: "Markdown Made Simple",
      description: "Flow supports standard Markdown: # Heading, **Bold**, *italic*, - Lists, `code blocks`. Try formatting text in the editor.",
    },
    {
      title: "Typewriter Mode",
      description: "Your eyes stay centered as static top and bottom padding is applied to the page while you type. Click the button below to toggle typewriter mode in this demo.",
      actionLabel: "Toggle Typewriter Mode",
      action: () => setIsTypewriterMode(!isTypewriterMode)
    },
    {
      title: "Focus Mode",
      description: "One click hides unnecessary UI elements so you can focus on writing. Click the button below to toggle focus mode.",
      actionLabel: isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode",
      action: () => setIsFocusMode(!isFocusMode)
    },
    {
      title: "Track Your Progress",
      description: "Flow helps you track writing streaks, daily words, and habits. View a sample analytics preview below.",
      actionLabel: activePreview === 'analytics' ? "Hide Analytics Preview" : "Show Analytics Preview",
      action: () => togglePreview('analytics')
    },
    {
      title: "See Your Connections",
      description: "Flow builds a graph of how your pages connect. Every [[WikiLink]] becomes a node. View a sample graph below.",
      actionLabel: activePreview === 'graph' ? "Hide Graph Preview" : "Show Graph Preview",
      action: () => togglePreview('graph')
    },
    {
      title: "Structured Page Layout",
      description: "Flow organizes your writing into clean, structured views. Explore a preview of sample page layouts below.",
      actionLabel: activePreview === 'files' ? "Hide Sample Structure" : "Show Sample Structure",
      action: () => togglePreview('files')
    }
  ];

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  // Extract title from first line
  const pageTitle = editorValue.split('\n')[0].replace(/^#\s*/, '') || 'Untitled';

  return (
    <MotionConfig reducedMotion="user">
      <section id="tutorial" className="py-12 sm:py-24 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] lg:h-[700px]">

            {/* Left Panel: Instructions */}
            <div className="lg:w-[30%] flex flex-col justify-between bg-zinc-900/50 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm relative">
              {/* Persistent aria-live status region for screen reader step announcements */}
              <div role="status" aria-live="polite" className="sr-only">
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
                  className="space-y-6"
                >
                  <div
                    aria-hidden="true"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-medium font-mono"
                  >
                    Step {currentStep + 1} of {steps.length}
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading">{steps[currentStep].title}</h3>
                  <p className="text-zinc-400 leading-relaxed font-body">
                    {steps[currentStep].description}
                  </p>

                  {steps[currentStep].actionLabel && (
                    <button
                      type="button"
                      ref={(el) => {
                        if (currentStep === 5) analyticsTriggerRef.current = el;
                        if (currentStep === 6) graphTriggerRef.current = el;
                        if (currentStep === 7) filesTriggerRef.current = el;
                      }}
                      onClick={steps[currentStep].action}
                      className="w-full py-3 px-6 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors motion-reduce:transition-none flex items-center justify-center gap-2 font-body font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                    >
                      {steps[currentStep].actionLabel}
                    </button>
                  )}

                  {steps[currentStep].tip && (
                    <div className="p-4 rounded-2xl bg-brand-accent/5 border border-brand-accent/10 flex gap-3">
                      <Zap className="w-5 h-5 text-brand-accent shrink-0" aria-hidden="true" />
                      <p className="text-sm text-brand-accent/80 font-body">{steps[currentStep].tip}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/5">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  aria-label="Previous step"
                  className="p-2 rounded-full hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  <ChevronLeft className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
                <div className="flex gap-1.5" aria-hidden="true">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none",
                        currentStep === i ? "bg-brand-accent w-4" : "bg-white/20"
                      )}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                  aria-label="Next step"
                  className="p-2 rounded-full hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  <ChevronRight className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right Panel: Editor */}
            <div className={cn(
              "lg:w-[70%] relative bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 motion-reduce:transition-none flex flex-col min-h-[450px]",
              isFocusMode && "lg:w-full lg:fixed lg:inset-0 lg:z-50 lg:rounded-none lg:border-none"
            )}>
              {/* Editor Header */}
              <div className={cn(
                "flex items-center justify-between px-6 py-3 border-b border-white/5 bg-zinc-900/80 backdrop-blur-md shrink-0 z-10",
                isFocusMode && "opacity-100 lg:opacity-0 lg:hover:opacity-100 lg:focus-within:opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
              )}>
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                  </div>
                  <span className="text-sm text-zinc-500 font-mono font-medium truncate max-w-[200px]">
                    {pageTitle}.md
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsFocusMode(!isFocusMode)}
                    aria-label={isFocusMode ? "Exit focus mode" : "Enter focus mode"}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                  >
                    {isFocusMode ? <Minimize2 className="w-4 h-4" aria-hidden="true" /> : <Maximize2 className="w-4 h-4" aria-hidden="true" />}
                  </button>
                </div>
              </div>

              {/* Editor Content */}
              <div className={cn(
                "flex-1 flex min-h-0",
                isFocusMode && "justify-center"
              )}>
                {/* Sidebar Mock */}
                {!isFocusMode && (
                  <div className="hidden md:flex w-64 shrink-0 border-r border-white/5 p-4 flex-col gap-4 bg-zinc-900/50">
                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">Sample Pages (Read-Only)</div>
                    <div className="space-y-1">
                      <div className="px-3 py-2 rounded-lg bg-brand-accent/10 text-brand-accent text-sm flex items-center gap-2 font-mono select-none">
                        <FileText className="w-4 h-4" aria-hidden="true" />
                        <span className="truncate">{pageTitle}</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg text-zinc-500 text-sm flex items-center gap-2 font-mono select-none opacity-60">
                        <FileText className="w-4 h-4" aria-hidden="true" />
                        <span>Meeting Notes (Sample)</span>
                      </div>
                      <div className="px-3 py-2 rounded-lg text-zinc-500 text-sm flex items-center gap-2 font-mono select-none opacity-60">
                        <FileText className="w-4 h-4" aria-hidden="true" />
                        <span>Project Plan (Sample)</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Main Editor Area */}
                <div className={cn(
                  "flex-1 relative overflow-auto",
                  isFocusMode ? "max-w-3xl w-full py-12 sm:py-24" : "p-4 sm:p-8"
                )}>
                  <CodeMirror
                    value={editorValue}
                    height="100%"
                    theme="dark"
                    extensions={[
                      markdown(),
                      EditorView.contentAttributes.of({ 'aria-label': 'Interactive demo editor' })
                    ]}
                    onChange={(value) => setEditorValue(value)}
                    className={cn(
                      "text-lg font-mono tutorial-editor focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-lg",
                      isTypewriterMode && "typewriter-active"
                    )}
                    basicSetup={{
                      lineNumbers: false,
                      foldGutter: false,
                      highlightActiveLine: true,
                    }}
                  />

                  {/* Nonmodal Overlays with Distinct Keys & Single Open Active State */}
                  <AnimatePresence mode="wait">
                    {activePreview === 'analytics' && (
                      <motion.div
                        key="analytics-preview"
                        role="dialog"
                        aria-labelledby="analytics-preview-title"
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                        transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[400px] max-w-full bg-zinc-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-20"
                      >
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <h4 id="analytics-preview-title" className="text-lg font-bold text-white font-heading">Sample Writing Analytics</h4>
                          <button
                            type="button"
                            onClick={() => setActivePreview(null)}
                            aria-label="Close analytics preview"
                            className="text-zinc-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded p-1 transition-colors motion-reduce:transition-none"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="p-2.5 mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 font-mono">
                          Sample preview only.
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div className="text-zinc-500 text-xs mb-1 font-mono uppercase">Streak</div>
                            <div className="text-2xl font-bold text-orange-500 font-mono">🔥 14 Days</div>
                          </div>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div className="text-zinc-500 text-xs mb-1 font-mono uppercase">Today</div>
                            <div className="text-2xl font-bold text-brand-accent font-mono">✍️ 1,242</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest font-mono">Activity</div>
                          <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: 28 }).map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  "aspect-square rounded-sm",
                                  i % 3 === 0 ? "bg-brand-accent/40" : i % 5 === 0 ? "bg-brand-accent" : "bg-zinc-800"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activePreview === 'graph' && (
                      <motion.div
                        key="graph-preview"
                        role="dialog"
                        aria-labelledby="graph-preview-title"
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                        transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
                        className="absolute inset-0 bg-zinc-900/95 backdrop-blur-sm z-20 flex items-center justify-center p-4 sm:p-8"
                      >
                        <div className="relative w-full h-full p-6 sm:p-12 border border-white/10 rounded-3xl bg-zinc-900/90 flex flex-col justify-between overflow-hidden">
                          <div className="flex items-center justify-between z-30">
                            <div>
                              <h4 id="graph-preview-title" className="text-lg font-bold text-white font-heading">Sample Connections Graph</h4>
                              <div className="text-xs text-amber-200/90 font-mono mt-1">Sample preview only.</div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setActivePreview(null)}
                              aria-label="Close graph preview"
                              className="text-zinc-500 hover:text-white font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded p-1 transition-colors motion-reduce:transition-none"
                            >
                              ✕ Close Graph
                            </button>
                          </div>
                          <div className="w-full h-full relative my-4">
                            {/* Mock Graph Nodes */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brand-accent rounded-full shadow-[0_0_20px_rgba(71,142,138,0.5)]" />
                            <div className="absolute top-[40%] left-[45%] w-2 h-2 bg-zinc-500 rounded-full" />
                            <div className="absolute top-[60%] left-[55%] w-2 h-2 bg-zinc-500 rounded-full" />
                            <div className="absolute top-[35%] left-[60%] w-2 h-2 bg-zinc-500 rounded-full" />
                            <div className="absolute top-[65%] left-[40%] w-2 h-2 bg-zinc-500 rounded-full" />
                            {/* Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                              <line x1="50%" y1="50%" x2="45%" y2="40%" stroke="white" strokeWidth="1" />
                              <line x1="50%" y1="50%" x2="55%" y2="60%" stroke="white" strokeWidth="1" />
                              <line x1="50%" y1="50%" x2="60%" y2="35%" stroke="white" strokeWidth="1" />
                              <line x1="50%" y1="50%" x2="40%" y2="65%" stroke="white" strokeWidth="1" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activePreview === 'files' && (
                      <motion.div
                        key="files-preview"
                        role="dialog"
                        aria-labelledby="files-preview-title"
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
                        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] sm:w-[500px] max-w-full bg-zinc-900 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl z-20"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono" id="files-preview-title">
                            <Database className="w-4 h-4" aria-hidden="true" />
                            <span>Sample Page Structure</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setActivePreview(null)}
                            aria-label="Close sample structure preview"
                            className="text-zinc-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded p-1 transition-colors motion-reduce:transition-none"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="p-2.5 mb-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 font-mono">
                          Sample preview only. No files are created or stored on your computer.
                        </div>
                        <div className="space-y-1.5">
                          {['Welcome (Sample)', 'Meeting Notes (Sample)', 'Project Plan (Sample)', 'Ideas (Sample)'].map((file) => (
                            <div key={file} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 select-none opacity-80">
                              <div className="flex items-center gap-2.5">
                                <FileText className="w-4 h-4 text-zinc-500" aria-hidden="true" />
                                <span className="text-xs text-zinc-300 font-mono">{file}</span>
                              </div>
                              <span className="text-[9px] text-zinc-600 font-mono uppercase">Sample Entry</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .typewriter-active .cm-content {
            padding-top: 40vh !important;
            padding-bottom: 40vh !important;
          }
          .cm-editor {
            background: transparent !important;
          }
          .cm-gutters {
            background: transparent !important;
            border: none !important;
          }
          .cm-activeLine {
            background: rgba(255, 255, 255, 0.03) !important;
          }
          .cm-cursor {
            border-left-color: #478e8a !important;
            border-left-width: 2px !important;
          }
        `}</style>
      </section>
    </MotionConfig>
  );
}
