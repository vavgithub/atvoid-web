"use client";

import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function MorphingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const measureRef = useRef<HTMLDivElement>(null);
  /** Target box driven by real content size — avoids `layout` (scale-based FLIP), which reads as a circular zoom. */
  const [size, setSize] = useState({ w: 280, h: 56 });

  const measure = useCallback(() => {
    const el = measureRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width));
    const h = Math.max(1, Math.round(r.height));
    setSize((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [isOpen, measure]);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const springTransition = {
    type: "spring" as const,
    stiffness: 185,
    damping: 26,
    mass: 1,
  };

  /** Pull corners in quickly so huge pill radius never sits on mid-size boxes (that reads as a “circle”). */
  const radiusTransition = {
    type: "tween" as const,
    duration: 0.16,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 left-0 right-0 z-[110] flex justify-center items-end pointer-events-none">
        <motion.div
          initial={false}
          animate={{
            width: size.w,
            height: size.h,
            borderRadius: isOpen ? 24 : 9999,
          }}
          transition={{
            width: springTransition,
            height: springTransition,
            borderRadius: radiusTransition,
          }}
          className="bg-[#111111] text-white shadow-2xl overflow-hidden pointer-events-auto"
        >
          <div ref={measureRef} className="inline-block w-max align-top">
            {!isOpen ? (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-4 py-3 pl-8 pr-3 cursor-pointer hover:bg-[#1a1a1a] transition-colors text-left"
              >
                <span className="text-sm font-medium tracking-wide uppercase whitespace-nowrap">
                  LETS TALK
                </span>
                <div className="bg-[#1c1c1c] p-3 rounded-full flex items-center justify-center shrink-0">
                  <div className="flex flex-col gap-[5px] w-4">
                    <div className="h-[2px] w-full bg-white/70 rounded-full" />
                    <div className="h-[2px] w-full bg-white/70 rounded-full" />
                  </div>
                </div>
              </button>
            ) : (
              <div
                className="p-8 pb-16 flex flex-col gap-8 w-[min(90vw,500px)] box-border relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-xl font-medium tracking-wide uppercase">
                  LETS TALK
                </div>

                <div className="flex flex-col gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-white/40 transition-colors placeholder:text-white/40 text-sm"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-white/40 transition-colors placeholder:text-white/40 text-sm"
                    />
                  </div>
                  <div className="relative">
                    <textarea
                      placeholder="Tell us about your project"
                      rows={2}
                      className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-white/40 transition-colors placeholder:text-white/40 text-sm resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="bg-[#0a0a0a] hover:bg-black transition-colors w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5 text-white/70" />
                  </button>

                  <button
                    type="button"
                    className="bg-[#7FFfd4] hover:bg-[#6ee6be] transition-colors text-black font-medium tracking-wide uppercase px-8 py-3.5 rounded-xl text-sm cursor-pointer shadow-[0_0_20px_rgba(127,255,212,0.3)] shrink-0"
                  >
                    SEND
                  </button>
                </div>

                <div className="absolute bottom-6 right-8 flex items-center justify-center opacity-50 pointer-events-none">
                  <div className="flex flex-col gap-[5px] w-5">
                    <div className="h-[2px] w-full bg-white rounded-full" />
                    <div className="h-[2px] w-full bg-white rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
