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
        <div className="h-screen w-full flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-8xl tracking-tight font-playfair">
            Joefergraphy
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-wide mt-2">
            LIMITED
          </p>
        </div>
        
        <div 
          ref={addToRefs}
          className="min-h-screen w-full flex items-center justify-center opacity-0 transform translate-y-10 transition-all duration-1000"
        >
          <div className="max-w-2xl text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-8">Custom Web Based Solutions</h2>
            <p className="text-xl font-light leading-relaxed">
              For your business needs.
            </p>
          </div>
        </div>
        
        <div 
          ref={addToRefs}
          className="min-h-screen w-full flex items-center justify-center opacity-0 transform translate-y-10 transition-all duration-1000"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-light mb-10">Our Bespoke Platforms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
              <div className="text-center">
                <h3 className="text-2xl font-light mb-4">TwoStopper</h3>
                <p className="font-light mb-6">
                  Custom transport web application for efficient logistics management.
                </p>
                <a href="https://twostopper.co.uk/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-white rounded-full text-sm font-light hover:bg-white hover:text-black transition-colors">
                  Visit website
                </a>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-light mb-4">Alertmove</h3>
                <p className="font-light mb-6">
                  Advanced property alert system designed to streamline real estate transactions.
                </p>
                <span className="px-6 py-2 border border-gray-600 rounded-full text-sm font-light text-gray-400 cursor-not-allowed">
                  Under Development
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          ref={addToRefs}
          className="min-h-screen w-full flex items-center justify-center opacity-0 transform translate-y-10 transition-all duration-1000"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-light mb-8">Ready to transform your digital presence?</h2>
            <button className="px-8 py-3 border border-white rounded-full text-lg font-light hover:bg-white hover:text-black transition-colors">
              Get in touch
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
