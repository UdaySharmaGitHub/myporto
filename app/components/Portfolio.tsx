"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import WorksSection from "./WorksSection";
import JournalSection from "./JournalSection";
import ExplorationsSection from "./ExplorationsSection";
import StatsSection from "./StatsSection";
import FooterSection from "./FooterSection";

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative">
          <Navbar />
          <main>
            <HeroSection />
            <WorksSection />
            <JournalSection />
            <ExplorationsSection />
            <StatsSection />
            <FooterSection />
          </main>
        </div>
      )}
    </>
  );
}
