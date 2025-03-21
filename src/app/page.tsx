"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const isScrollingTimeout = useRef<NodeJS.Timeout | null>(null);
  const isManualScrolling = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Initial load animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Initialize each section with the correct starting state
    const initializeSections = () => {
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        if (index === 0) {
          // First section is visible by default
          section.style.opacity = "1";
          section.style.transform = "translateY(0)";
        } else {
          // Other sections start hidden and translated down
          section.style.opacity = "0";
          section.style.transform = "translateY(60px)";
          section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        }
      });
    };

    // Call initialization once refs are set
    setTimeout(initializeSections, 100);

    const handleScroll = () => {
      // Show scrolling indicators
      setIsScrolling(true);
      
      // Calculate scroll direction
      const scrollDirection = window.scrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = window.scrollY;
      
      // Clear any existing timeout
      if (isScrollingTimeout.current) {
        clearTimeout(isScrollingTimeout.current);
      }
      
      // Set a timeout to hide the numbers after scrolling stops
      isScrollingTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);

      // Skip if manual scrolling is in progress
      if (isManualScrolling.current) return;
      
      // Determine which section is active
      let currentSection = 0;
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        // More generous "in view" detection - triggers fade-ups earlier
        const isInView = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
        
        if (isInView) {
          currentSection = index;
          section.style.opacity = "1";
          section.style.transform = "translateY(0)";
          section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
        } else {
          // Make section visible as it approaches viewport
          const distanceFromViewport = rect.top - window.innerHeight;
          
          if (distanceFromViewport < window.innerHeight * 0.7 && rect.top > 0) {
            // Section is approaching from below - start making it visible with a nice fade-up
            // Increased fade-up distance for more responsive animations
            const fadeUpProgress = 1 - (distanceFromViewport / (window.innerHeight * 0.7));
            const opacity = Math.max(0, fadeUpProgress);
            const translateY = Math.max(0, 60 * (1 - fadeUpProgress));
            
            // Adjust animation speed based on scroll direction
            const transitionDuration = scrollDirection === 'down' ? '0.4s' : '0.6s';
            
            section.style.opacity = opacity.toString();
            section.style.transform = `translateY(${translateY}px)`;
            section.style.transition = `opacity ${transitionDuration} ease-out, transform ${transitionDuration} ease-out`;
          } else if (rect.bottom < 0 && rect.bottom > -window.innerHeight * 0.3) {
            // Section is leaving viewport at the top - fade it out gradually
            const opacity = Math.max(0, 1 - (Math.abs(rect.bottom) / (window.innerHeight * 0.3)));
            
            section.style.opacity = opacity.toString();
            section.style.transform = "translateY(0)";
            section.style.transition = "opacity 0.5s ease-in, transform 0.5s ease-in";
          } else if (rect.top > window.innerHeight) {
            // Reset sections that are completely below the viewport
            section.style.opacity = "0";
            section.style.transform = "translateY(60px)";
            // Faster transition for reset
            section.style.transition = "opacity 0.2s, transform 0.2s";
          }
        }
      });
      
      // If active section has changed, temporarily show the indicator
      if (currentSection !== activeSection) {
        setIsScrolling(true);
        
        // Clear any existing timeout for hiding indicators
        if (isScrollingTimeout.current) {
          clearTimeout(isScrollingTimeout.current);
        }
        
        // Set a new timeout to hide numbers after a few seconds
        isScrollingTimeout.current = setTimeout(() => {
          setIsScrolling(false);
        }, 2500);
      }
      
      setActiveSection(currentSection);
    };

    // Basic wheel event handler for indicators only, no scroll prevention
    const handleWheel = () => {
      // Show scrolling indicators when wheel event happens
      setIsScrolling(true);
      
      // Clear any existing timeout for hiding indicators
      if (isScrollingTimeout.current) {
        clearTimeout(isScrollingTimeout.current);
      }
      
      // Set timeout to hide indicators after scrolling stops
      isScrollingTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 2500);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: true });
    
    // Force an initial scroll event to set proper section visibility
    window.dispatchEvent(new Event('scroll'));
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      if (isScrollingTimeout.current) {
        clearTimeout(isScrollingTimeout.current);
      }
      clearTimeout(timer);
    };
  }, [activeSection]);

  const addToRefs = (index: number) => (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current[index] = el;
    }
  };

  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      isManualScrolling.current = true;
      
      // Use a simple smooth scroll
      window.scrollTo({
        top: sectionRefs.current[index].offsetTop,
        behavior: 'smooth'
      });
      
      // Update active section
      setActiveSection(index);
      
      // Reset scroll flag after animation
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 800);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white overflow-hidden relative">
      {/* Section indicators */}
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        {[0, 1, 2, 3].map((index) => (
          <div 
            key={index}
            className="flex items-center my-4 cursor-pointer group"
            onClick={() => {
              scrollToSection(index);
              
              // Show indicators when manually changing sections
              setIsScrolling(true);
              
              // Hide indicators after a few seconds of inactivity
              if (isScrollingTimeout.current) {
                clearTimeout(isScrollingTimeout.current);
              }
              
              isScrollingTimeout.current = setTimeout(() => {
                setIsScrolling(false);
              }, 2500);
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === index 
                    ? 'w-3 h-3 bg-white' 
                    : 'bg-white/50 group-hover:bg-white/80'
                }`}
              ></div>
            </div>
            <span 
              className={`ml-2 text-xs font-light transition-all duration-300 ${
                (activeSection === index || isScrolling) 
                  ? 'opacity-100' 
                  : 'opacity-0 group-hover:opacity-70'
              }`}
            >
              {index + 1}
            </span>
          </div>
        ))}
      </div>

      <main className="flex-grow flex flex-col items-center">
        <div 
          ref={addToRefs(0)}
          className="h-screen w-full flex flex-col items-center justify-center px-4"
        >
          <h1 
            className={`text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight transition-all duration-1500 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
            style={{ fontFamily: 'var(--font-playfair)', transitionDelay: '300ms' }}
          >
            Joefergraphy
          </h1>
          <p 
            className={`text-lg sm:text-xl md:text-2xl font-light tracking-wide mt-2 transition-all duration-1500 ease-in-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '600ms' }}
          >
            LIMITED
          </p>
        </div>
        
        <div 
          ref={addToRefs(1)}
          className="min-h-screen w-full flex items-center justify-center px-4 py-12"
          style={{ opacity: 0, transform: 'translateY(60px)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
        >
          <div className="max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 md:mb-8">
              Custom Web-Based Solutions
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10">
              For your business needs.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8">
              <div className="p-3 sm:p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <h3 className="text-lg md:text-xl font-light mb-2 sm:mb-3">Website Design</h3>
                <p className="text-sm text-white/80">Responsive, modern websites that captivate your audience.</p>
              </div>
              
              <div className="p-3 sm:p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <h3 className="text-lg md:text-xl font-light mb-2 sm:mb-3">Search Engine Optimisation</h3>
                <p className="text-sm text-white/80">Boost your visibility and reach more customers online.</p>
              </div>
              
              <div className="p-3 sm:p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <h3 className="text-lg md:text-xl font-light mb-2 sm:mb-3">E-commerce Solutions</h3>
                <p className="text-sm text-white/80">Custom online shops with secure payment processing.</p>
              </div>
              
              <div className="p-3 sm:p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <h3 className="text-lg md:text-xl font-light mb-2 sm:mb-3">Web Applications</h3>
                <p className="text-sm text-white/80">Tailored applications that solve specific business challenges.</p>
              </div>
              
              <div className="p-3 sm:p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <h3 className="text-lg md:text-xl font-light mb-2 sm:mb-3">UI/UX Design</h3>
                <p className="text-sm text-white/80">Intuitive interfaces that enhance user experience.</p>
              </div>
              
              <div className="p-3 sm:p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <h3 className="text-lg md:text-xl font-light mb-2 sm:mb-3">Mobile Optimisation</h3>
                <p className="text-sm text-white/80">Ensure your digital presence works perfectly on all devices.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          ref={addToRefs(2)}
          className="min-h-screen w-full flex items-center justify-center px-4"
          style={{ opacity: 0, transform: 'translateY(60px)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
        >
          <div className="flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-light mb-8 md:mb-10 text-center">
              Our Bespoke Platforms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 max-w-4xl">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-light mb-3 md:mb-4">
                  Two Stopper
                </h3>
                <p className="font-light mb-5 md:mb-6 text-sm sm:text-base">
                  Personalised SMS solution for consumers using public transport.
                </p>
                <a href="https://twostopper.co.uk/" target="_blank" rel="noopener noreferrer" className="px-5 sm:px-6 py-2 border border-white rounded-full text-sm font-light hover:bg-white hover:text-black transition-colors">
                  Visit website
                </a>
              </div>
              <div className="text-center mt-8 md:mt-0">
                <h3 className="text-xl sm:text-2xl font-light mb-3 md:mb-4">
                  Alertmove
                </h3>
                <p className="font-light mb-5 md:mb-6 text-sm sm:text-base">
                  Advanced property alert system designed to streamline property transactions.
                </p>
                <span className="px-5 sm:px-6 py-2 border border-gray-600 rounded-full text-sm font-light text-gray-400 cursor-not-allowed">
                  Under Development
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div 
          ref={addToRefs(3)}
          className="min-h-screen w-full flex items-center justify-center px-4"
          style={{ opacity: 0, transform: 'translateY(60px)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-3xl font-light mb-6 md:mb-8">
              Ready to transform your digital presence?
            </h2>
            <a 
              href="mailto:contact@joefergraphy.co.uk" 
              className="px-6 sm:px-8 py-2.5 sm:py-3 border border-white rounded-full text-base sm:text-lg font-light hover:bg-white hover:text-black transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
