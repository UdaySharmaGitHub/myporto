"use client";

import { motion } from "motion/react";
import resumeData from "@/ResumeData.json";

const PROJECTS = resumeData.projects;

const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  viewport: { once: true, margin: "-100px" },
};

export default function WorksSection() {
  return (
    <section id="works" className="bg-bg py-12 md:py-16">
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
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary leading-tight">
              Featured{" "}
              <em className="font-display italic not-italic">projects</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-sm">
              A selection of projects I&apos;ve worked on, from concept to
              launch.
            </p>
          </div>

          {/* View all — desktop only */}
          <a
            href="#"
            className="hidden md:inline-flex relative group items-center gap-2 rounded-full border border-stroke px-5 py-2.5 text-sm text-muted hover:text-text-primary transition-colors duration-200 flex-shrink-0"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient-animated transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              View all work <span>→</span>
            </span>
          </a>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              className={`${project.span} group relative overflow-hidden bg-surface border border-stroke rounded-3xl cursor-pointer`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.08,
              }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className={`${project.aspect} relative overflow-hidden`}>
                {/* Gradient background acting as placeholder image */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.bg} group-hover:scale-105 transition-transform duration-700 ease-out`}
                />

                {/* Subtle geometric lines for depth */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 40%, ${project.accent}55 0%, transparent 60%), radial-gradient(circle at 70% 70%, ${project.accent}33 0%, transparent 50%)`,
                  }}
                />

                {/* Halftone overlay */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "4px 4px",
                  }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-all duration-400 ease-out flex items-center justify-center">
                  {/* Hover label pill */}
                  <div className="relative">
                    <span className="absolute inset-[-2px] rounded-full accent-gradient-animated" />
                    <span className="relative z-10 flex items-center gap-2 bg-white text-black rounded-full px-5 py-2 text-sm font-body font-medium">
                      View —{" "}
                      <em className="font-display italic">{project.title}</em>
                    </span>
                  </div>
                </div>

                {/* Card label (bottom-left, always visible) */}
                <div className="absolute bottom-4 left-4 z-10">
                  <p className="text-xs text-text-primary/60 uppercase tracking-[0.2em]">
                    {project.title}
                  </p>
                </div>

                {/* Corner tag */}
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                  <span className="text-[9px] text-white/40">↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
