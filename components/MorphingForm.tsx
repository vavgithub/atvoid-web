"use client";

import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import SquircleBox from "@/components/ui/SquircleBox";

export default function MorphingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("open-contact-form", open);
    return () => window.removeEventListener("open-contact-form", open);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };
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
        <SquircleBox cornerRadius={isOpen ? 24 : 28} cornerSmoothing={1}>
        <motion.div
          initial={false}
          animate={{
            width: size.w,
            height: size.h,
          }}
          transition={{
            width: springTransition,
            height: springTransition,
          }}
          className="bg-[#111111] text-white overflow-hidden pointer-events-auto"
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
                className="font-pp-neue-corp p-8 pb-16 flex flex-col gap-8 w-[min(90vw,500px)] box-border relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-xl font-medium tracking-wide uppercase">
                  LETS TALK
                </div>

                {status === "sent" ? (
                  <div className="flex flex-col gap-3 -mt-2">
                    <p className="text-[#7FFfd4] font-medium">Message sent!</p>
                    <p className="text-white/50 text-sm">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-6">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-white/40 transition-colors placeholder:text-white/40 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-white/40 transition-colors placeholder:text-white/40 text-sm"
                        />
                      </div>
                      <div className="relative">
                        <textarea
                          placeholder="Tell us about your project"
                          rows={2}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-white/40 transition-colors placeholder:text-white/40 text-sm resize-none"
                        />
                      </div>
                      {status === "error" && (
                        <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="bg-[#0a0a0a] hover:bg-black transition-colors w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer shrink-0"
                      >
                        <ArrowLeft className="w-5 h-5 text-white/70" />
                      </button>

                      <div className="shrink-0 shadow-[0_0_20px_rgba(127,255,212,0.3)] rounded-xl">
                        <SquircleBox cornerRadius={12} cornerSmoothing={1}>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={status === "sending"}
                            className="bg-[#7FFfd4] hover:bg-[#6ee6be] disabled:opacity-60 transition-colors text-black font-medium tracking-wide uppercase px-8 py-3.5 text-sm cursor-pointer"
                          >
                            {status === "sending" ? "SENDING…" : "SEND"}
                          </button>
                        </SquircleBox>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute bottom-6 right-8 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
        </SquircleBox>
      </div>
    </>
  );
}
