"use client";

import { motion } from "motion/react";

const ENTRIES = [
  {
    title: "The Craft of Interaction Design",
    time: "6 min read",
    date: "Apr 12, 2026",
    bg: "from-[#1a1a2e] to-[#0f1923]",
  },
  {
    title: "Building Systems That Scale With Intent",
    time: "8 min read",
    date: "Mar 28, 2026",
    bg: "from-[#1f2937] to-[#111827]",
  },
  {
    title: "Typography as the Voice of Interface",
    time: "5 min read",
    date: "Mar 10, 2026",
    bg: "from-[#2d1b1b] to-[#1a1212]",
  },
  {
    title: "Why Motion Makes Software Feel Alive",
    time: "7 min read",
    date: "Feb 20, 2026",
    bg: "from-[#1a2e1a] to-[#0f1f0f]",
  },
];

const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" },
};

export default function JournalSection() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section header */}
        <motion.div
          className="flex items-end justify-between mb-10 md:mb-14"
          {...FADE_UP}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Journal
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary leading-tight">
              Recent{" "}
              <em className="font-display italic not-italic">thoughts</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-sm">
              Notes on design, engineering, and the space between.
            </p>
          </div>

          <a
            href="#"
            className="hidden md:inline-flex relative group items-center gap-2 rounded-full border border-stroke px-5 py-2.5 text-sm text-muted hover:text-text-primary transition-colors duration-200 flex-shrink-0"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient-animated transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              View all <span>→</span>
            </span>
          </a>
        </motion.div>

        {/* Journal entries */}
        <div className="flex flex-col gap-3">
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={entry.title}
              href="#"
              className="group flex items-center gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.07,
              }}
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Thumbnail */}
              <div
                className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${entry.bg} border border-stroke/50 overflow-hidden`}
              />

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-text-primary font-body font-light group-hover:text-text-primary transition-colors truncate">
                  {entry.title}
                </p>
              </div>

              {/* Meta */}
              <div className="hidden sm:flex flex-col items-end gap-0.5 flex-shrink-0">
                <span className="text-xs text-muted">{entry.time}</span>
                <span className="text-xs text-muted/60">{entry.date}</span>
              </div>

              {/* Arrow */}
              <span className="flex-shrink-0 text-muted group-hover:text-text-primary transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
