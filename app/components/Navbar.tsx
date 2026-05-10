"use client";

import { useEffect, useState } from "react";
import resumeData from "@/ResumeData.json";

const NAV_LINKS = ["Home", "Work", "Resume"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (label: string) => {
    setActive(label);
    const map: Record<string, string> = {
      Home: "hero",
      Work: "works",
      Resume: "stats",
    };
    const id = map[label];
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <div
        className={[
          "pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300",
          scrolled ? "shadow-md shadow-black/10" : "",
        ].join(" ")}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("Home")}
          className="relative group flex-shrink-0 w-9 h-9 rounded-full transition-transform duration-200 hover:scale-110"
        >
          {/* Gradient ring — reverses direction on hover */}
          <span className="absolute inset-0 rounded-full accent-gradient group-hover:[background:linear-gradient(270deg,#89AACC_0%,#4E85BF_100%)] transition-all duration-300" />
          <span className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary leading-none">
              {resumeData.personal.initials}
            </span>
          </span>
        </button>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className={[
              "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200",
              active === link
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50",
            ].join(" ")}
          >
            {link}
          </button>
        ))}

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Say hi button */}
        <a
          href={`mailto:${resumeData.personal.email}`}
          className="relative group text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary transition-colors duration-200"
        >
          {/* Gradient border on hover */}
          <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient-animated transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-1 bg-surface backdrop-blur-md rounded-full px-3 py-1.5 -mx-3 -my-1.5">
            Say hi <span className="text-[10px]">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
