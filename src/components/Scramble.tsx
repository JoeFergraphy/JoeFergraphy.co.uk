"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*/<>[]{}=+";

interface ScrambleProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  // Start when scrolled into view rather than on mount
  onView?: boolean;
}

// Decodes text from random glyphs, left to right
export default function Scramble({ text, delay = 0, speed = 28, className = "", onView = false }: ScrambleProps) {
  const [output, setOutput] = useState(() => text.replace(/\S/g, " "));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOutput(text);
      return;
    }

    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;

    const run = () => {
      let revealed = 0;
      interval = setInterval(() => {
        revealed += 0.5;
        setOutput(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " " || i < revealed) return ch;
              if (i > revealed + 6) return " ";
              return GLYPHS[(Math.random() * GLYPHS.length) | 0];
            })
            .join("")
        );
        if (revealed >= text.length) clearInterval(interval);
      }, speed);
    };

    const start = () => (timeout = setTimeout(run, delay));

    let observer: IntersectionObserver | undefined;
    if (onView && ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            start();
            observer?.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(ref.current);
    } else {
      start();
    }

    return () => {
      observer?.disconnect();
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, speed, onView]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </span>
  );
}
