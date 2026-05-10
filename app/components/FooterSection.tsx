"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import resumeData from "@/ResumeData.json";

const HLS_SRC = resumeData.video.hlsSrc;
const MARQUEE_TEXT = resumeData.footer.marqueeText;
const SOCIALS = resumeData.social;

export default function FooterSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // HLS footer video (flipped)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: import("hls.js").default | null = null;

    import("hls.js").then(({ default: Hls }) => {
      if (Hls.isSupported()) {
        hlsInstance = new Hls({ autoStartLoad: true, startLevel: -1 });
        hlsInstance.loadSource(HLS_SRC);
        hlsInstance.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = HLS_SRC;
      }
    });

    return () => hlsInstance?.destroy();
  }, []);

  // GSAP marquee
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <footer className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Background video (flipped) */}
      <div className="absolute inset-x-0 top-0 h-[420px] overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
      </div>

      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden mb-14 md:mb-20">
          <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
            {Array.from({ length: 20 }, (_, i) => (
              <span
                key={i}
                className="inline-block text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/10 pr-8 select-none"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-center text-center gap-8 mb-16 md:mb-20">
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Get in touch
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary leading-tight">
              {resumeData.footer.ctaTitle}
            </h2>
            <a
              href={`mailto:${resumeData.personal.email}`}
              className="relative group inline-flex items-center gap-3 rounded-full border-2 border-stroke px-8 py-4 text-base text-muted hover:text-text-primary transition-colors duration-200"
            >
              <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient-animated transition-opacity duration-300" />
              <span className="relative z-10">{resumeData.personal.email} ↗</span>
            </a>
          </div>

          {/* Footer bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-stroke">
            {/* Social links */}
            <div className="flex items-center gap-1">
              {SOCIALS.map((social, i) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted hover:text-text-primary transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-stroke/50"
                >
                  {social.label}
                  {i < SOCIALS.length - 1 && (
                    <span className="ml-3 text-stroke">·</span>
                  )}
                </a>
              ))}
            </div>

            {/* Available indicator */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
              <span className="text-xs text-muted">{resumeData.personal.availabilityText}</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-xs text-muted/40 mt-8">
            © {resumeData.personal.copyrightYear} {resumeData.personal.name}. Crafted with intent.
          </p>
        </div>
      </div>
    </footer>
  );
}
