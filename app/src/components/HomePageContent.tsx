"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CtaBanner from "@/components/CtaBanner";
import FacultyHighlight from "@/components/FacultyHighlight";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import News from "@/components/News";
import Programs from "@/components/Programs";
import ResearchAreas from "@/components/ResearchAreas";

export default function HomePageContent({
  revealOffset,
}: {
  revealOffset: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.timeline({ defaults: { ease: "power3.out" } }).fromTo(
        ".gsap-fade-in",
        { opacity: 0, y: revealOffset },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
      );
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white">
      <div className="relative z-10">
        <div className="gsap-fade-in">
          <Hero />
        </div>
        <div className="gsap-fade-in">
          <Mission />
        </div>
        <div className="gsap-fade-in">
          <Programs />
        </div>
        <div className="gsap-fade-in">
          <ResearchAreas />
        </div>
        <div className="gsap-fade-in">
          <FacultyHighlight />
        </div>
        <div className="gsap-fade-in">
          <News />
        </div>
        <div className="gsap-fade-in mt-10">
          <CtaBanner />
        </div>
      </div>
    </main>
  );
}
