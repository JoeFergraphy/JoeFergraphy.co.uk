"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
        
        if (isInView) {
          section.style.opacity = "1";
          section.style.transform = "translateY(0)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white">
      <main className="flex-grow flex flex-col items-center">
        <div className="h-screen w-full flex items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight">
            JOEFERGRAPHY
          </h1>
        </div>
        
        <div 
          ref={addToRefs}
          className="min-h-screen w-full flex items-center justify-center opacity-0 transform translate-y-10 transition-all duration-1000"
        >
          <h2 className="text-4xl md:text-5xl font-light">Photography Portfolio</h2>
        </div>
        
        <div 
          ref={addToRefs}
          className="min-h-screen w-full flex items-center justify-center opacity-0 transform translate-y-10 transition-all duration-1000"
        >
          <p className="text-xl md:text-2xl font-light max-w-md text-center">
            Capturing moments through a unique lens. Scroll to explore.
          </p>
        </div>
        
        <div 
          ref={addToRefs}
          className="min-h-screen w-full flex items-center justify-center opacity-0 transform translate-y-10 transition-all duration-1000"
        >
          <div className="flex flex-col items-center">
            <p className="text-xl font-light mb-8">Get in touch</p>
            <button className="px-8 py-3 border border-white rounded-full text-lg font-light hover:bg-white hover:text-black transition-colors">
              Contact
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
