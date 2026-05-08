"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 20, suffix: "+", label: "Years Experience" },
  { value: 95, suffix: "+", label: "Projects Done" },
  { value: 200, suffix: "%", label: "Satisfied Clients" },
];

function StatCounter({
  value,
  suffix,
  label,
  inView,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const DURATION = 1400;
    const startTime = performance.now() + delay;
    let raf: number;

    const tick = (now: number) => {
      if (now < startTime) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(value);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, delay]);

  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="flex items-end gap-1">
        <span className="text-5xl md:text-7xl font-display italic text-text-primary tabular-nums leading-none">
          {count}
        </span>
        <span className="text-2xl md:text-4xl font-display text-text-primary/60 leading-none pb-1">
          {suffix}
        </span>
      </div>
      <p className="text-xs text-muted uppercase tracking-[0.25em]">{label}</p>
      {/* Animated accent bar */}
      <div className="h-[2px] w-16 bg-stroke overflow-hidden rounded-full">
        <div
          className="h-full accent-gradient origin-left transition-transform duration-[1400ms] ease-out"
          style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Divider */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <div className="flex-1 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em] flex-shrink-0">
            By the numbers
          </span>
          <div className="flex-1 h-px bg-stroke" />
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {STATS.map((stat, i) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              inView={inView}
              delay={i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
