"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiArrowRight } from "react-icons/fi";

export default function Home() {
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Initial load animation for Joefergraphy only
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Update scroll progress for scroll indicator
    const handleScrollProgress = () => {
      setScrollProgress(window.scrollY / (document.body.scrollHeight - window.innerHeight));
    };

    const handleScroll = () => {
      // Determine which section is active based on scroll position
      let currentSection = 0;
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        // Simple check if section is in view
        if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
          currentSection = index;
        }
      });
      
      setActiveSection(currentSection);
      handleScrollProgress();
    };

    window.addEventListener("scroll", handleScroll);
    
    // Force an initial scroll event to set proper section
    window.dispatchEvent(new Event('scroll'));
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const addToRefs = (index: number) => (el: HTMLDivElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current[index] = el;
    }
  };

  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      // Use a simple smooth scroll
      window.scrollTo({
        top: sectionRefs.current[index].offsetTop,
        behavior: 'smooth'
      });
      
      // Update active section
      setActiveSection(index);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-white overflow-hidden relative">
      {/* Vertical scroll progress indicator */}
      <div className="fixed left-0 top-0 bottom-0 w-1 bg-white/10 z-50">
        <div 
          className="bg-white w-full transition-all duration-200 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        ></div>
      </div>

      {/* Section indicators - simplified */}
      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        {[0, 1, 2, 3].map((index) => (
          <div 
            key={index}
            className="flex items-center my-4 cursor-pointer group"
            onClick={() => scrollToSection(index)}
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
            <span className="ml-2 text-xs font-light">
              {index + 1}
            </span>
          </div>
        ))}
      </div>

      <main className="flex-grow flex flex-col items-center">
        <div 
          ref={addToRefs(0)}
          className="h-screen w-full flex flex-col items-center justify-center px-4 relative"
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
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 flex flex-col items-center cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            onClick={() => scrollToSection(1)}
          >
            <p className="text-sm font-light mb-2 text-white/70">Scroll to discover</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FiChevronDown className="text-white/70 text-2xl" />
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          ref={addToRefs(1)}
          className="min-h-screen w-full flex items-center justify-center px-4 py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-3xl text-center">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 md:mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Custom Web-Based Solutions
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              For your business needs.
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8">
              {[
                { title: "Website Design", desc: "Responsive, modern websites that captivate your audience." },
                { title: "Search Engine Optimisation", desc: "Boost your visibility and reach more customers online." },
                { title: "E-commerce Solutions", desc: "Custom online shops with secure payment processing." },
                { title: "Web Applications", desc: "Tailored applications that solve specific business challenges." },
                { title: "UI/UX Design", desc: "Intuitive interfaces that enhance user experience." },
                { title: "Mobile Optimisation", desc: "Ensure your digital presence works perfectly on all devices." }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  className="p-3 sm:p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  whileHover={{ 
                    scale: 1.03, 
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <h3 className="text-lg md:text-xl font-light mb-2 sm:mb-3">{service.title}</h3>
                  <p className="text-sm text-white/80">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          ref={addToRefs(2)}
          className="min-h-screen w-full flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col items-center">
            <motion.h2 
              className="text-2xl sm:text-3xl font-light mb-8 md:mb-10 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Our Bespoke Platforms
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 max-w-4xl">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="text-xl sm:text-2xl font-light mb-3 md:mb-4">
                  Two Stopper
                </h3>
                <p className="font-light mb-5 md:mb-6 text-sm sm:text-base">
                  Personalised SMS solution for consumers using public transport.
                </p>
                <motion.a 
                  href="https://twostopper.co.uk/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-5 sm:px-6 py-2 border border-white rounded-full text-sm font-light hover:bg-white hover:text-black transition-colors inline-flex items-center"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  Visit website
                  <FiArrowRight className="ml-2" />
                </motion.a>
              </motion.div>
              <motion.div 
                className="text-center mt-8 md:mt-0"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <h3 className="text-xl sm:text-2xl font-light mb-3 md:mb-4">
                  Alertmove
                </h3>
                <p className="font-light mb-5 md:mb-6 text-sm sm:text-base">
                  Advanced property alert system designed to streamline property transactions.
                </p>
                <span className="px-5 sm:px-6 py-2 border border-gray-600 rounded-full text-sm font-light text-gray-400 cursor-not-allowed inline-block">
                  Under Development
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          ref={addToRefs(3)}
          className="min-h-screen w-full flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.h2 
              className="text-2xl sm:text-3xl font-light mb-6 md:mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Ready to transform your digital presence?
            </motion.h2>
            <motion.a 
              href="mailto:contact@joefergraphy.co.uk" 
              className="px-6 sm:px-8 py-2.5 sm:py-3 border border-white rounded-full text-base sm:text-lg font-light hover:bg-white hover:text-black transition-colors inline-flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              Get in touch
              <FiArrowRight className="ml-2" />
            </motion.a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
