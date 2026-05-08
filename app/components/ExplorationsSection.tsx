"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const EXPLORATIONS = [
  {
    bg: "from-[#0f172a] via-[#1e3a5f] to-[#0a0a1f]",
    accent: "#3b82f6",
    rotation: -3,
  },
  {
    bg: "from-[#2d1b1b] via-[#7f1d1d] to-[#1a0a0a]",
    accent: "#ef4444",
    rotation: 2,
  },
  {
    bg: "from-[#1a2e1a] via-[#166534] to-[#0a1a0a]",
    accent: "#22c55e",
    rotation: -2,
  },
  {
    bg: "from-[#1f1a2e] via-[#4c1d95] to-[#0a0a1a]",
    accent: "#a855f7",
    rotation: 3,
  },
  {
    bg: "from-[#1a1a0a] via-[#713f12] to-[#0f0f00]",
    accent: "#f59e0b",
    rotation: -1,
  },
  {
    bg: "from-[#0a1a1a] via-[#164e63] to-[#0a0f0f]",
    accent: "#06b6d4",
    rotation: 2,
  },
];

interface LightboxItem {
  bg: string;
  accent: string;
}

export default function ExplorationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;
    if (!section || !content || !col1 || !col2) return;

    const ctx = gsap.context(() => {
      // Pin the center content
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: content,
        pinSpacing: false,
      });

      // Parallax column 1 — moves up
      gsap.to(col1, {
        y: "-30%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Parallax column 2 — moves down
      gsap.to(col2, {
        y: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const col1Items = EXPLORATIONS.slice(0, 3);
  const col2Items = EXPLORATIONS.slice(3, 6);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-[300vh] bg-bg overflow-hidden"
      >
        {/* Layer 2: Parallax columns (behind text, absolute) */}
        <div className="absolute inset-0 z-0 flex items-start justify-center pt-[20vh]">
          <div className="w-full max-w-[1400px] px-6 grid grid-cols-2 gap-12 md:gap-40">
            {/* Column 1 */}
            <div
              ref={col1Ref}
              className="flex flex-col gap-8 items-end"
            >
              {col1Items.map((item, i) => (
                <div
                  key={i}
                  className="relative aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden border border-stroke cursor-pointer group"
                  style={{ transform: `rotate(${item.rotation}deg)` }}
                  onClick={() => setLightbox(item)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.bg} group-hover:scale-105 transition-transform duration-500`}
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, ${item.accent}44 0%, transparent 70%)`,
                    }}
                  />
                  {/* Halftone */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #fff 1px, transparent 1px)",
                      backgroundSize: "6px 6px",
                    }}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-bg/50 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-text-primary text-sm border border-stroke/50 rounded-full px-4 py-1.5">
                      Open ↗
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 */}
            <div
              ref={col2Ref}
              className="flex flex-col gap-8 items-start pt-32"
            >
              {col2Items.map((item, i) => (
                <div
                  key={i}
                  className="relative aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden border border-stroke cursor-pointer group"
                  style={{ transform: `rotate(${item.rotation}deg)` }}
                  onClick={() => setLightbox(item)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.bg} group-hover:scale-105 transition-transform duration-500`}
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, ${item.accent}44 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #fff 1px, transparent 1px)",
                      backgroundSize: "6px 6px",
                    }}
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-bg/50 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-text-primary text-sm border border-stroke/50 rounded-full px-4 py-1.5">
                      Open ↗
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Layer 1: Pinned center text (z-10) */}
        <div
          ref={contentRef}
          className="relative z-10 h-screen flex items-center justify-center pointer-events-none"
        >
          <div className="text-center px-6 pointer-events-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Explorations
              </span>
              <div className="w-8 h-px bg-stroke" />
            </div>
            <h2 className="text-3xl md:text-5xl font-body font-light text-text-primary leading-tight mb-4">
              Visual{" "}
              <em className="font-display italic not-italic">playground</em>
            </h2>
            <p className="text-sm text-muted max-w-xs mx-auto mb-6">
              Experiments in form, color, and motion outside client work.
            </p>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group inline-flex items-center gap-2 rounded-full border border-stroke px-5 py-2.5 text-sm text-muted hover:text-text-primary transition-colors duration-200"
            >
              <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient-animated transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Dribbble ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
        >
          <motion.div
            className={`relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden bg-gradient-to-br ${lightbox.bg} border border-stroke`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, ${lightbox.accent}55 0%, transparent 70%)`,
              }}
            />
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-stroke/50 flex items-center justify-center text-text-primary/60 hover:text-text-primary transition-colors text-sm"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
