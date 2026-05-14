"use client";

import React, { useState, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SquircleBox from "@/components/ui/SquircleBox";

export default function MorphingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

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
    setErrors({});
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
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
                <span className="text-sm font-pp-neue-corp-wide font-medium tracking-wide uppercase whitespace-nowrap">
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
                className="font-pp-neue-corp p-8 flex flex-col gap-8 w-[min(90vw,500px)] box-border"
                onClick={(e) => e.stopPropagation()}
              >
                {status === "sent" ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-[#7FFfd4] font-medium">Message sent!</p>
                    <p className="text-white/50 text-sm">We'll get back to you soon.</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1">
                        <input
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
                          className={`w-full bg-transparent border-b pb-3 outline-none transition-colors placeholder:text-white/40 text-sm ${errors.name ? "border-red-400/60 focus:border-red-400" : "border-white/10 focus:border-white/40"}`}
                        />
                        {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
                      </div>
                      <div className="flex flex-col gap-1">
                        <input
                          type="email"
                          placeholder="Your email address"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                          className={`w-full bg-transparent border-b pb-3 outline-none transition-colors placeholder:text-white/40 text-sm ${errors.email ? "border-red-400/60 focus:border-red-400" : "border-white/10 focus:border-white/40"}`}
                        />
                        {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                      </div>
                      <div className="flex flex-col gap-1">
                        <textarea
                          placeholder="Tell us about your project"
                          rows={2}
                          value={message}
                          onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((p) => ({ ...p, message: undefined })); }}
                          className={`w-full bg-transparent border-b pb-3 outline-none transition-colors placeholder:text-white/40 text-sm resize-none ${errors.message ? "border-red-400/60 focus:border-red-400" : "border-white/10 focus:border-white/40"}`}
                        />
                        {errors.message && <p className="text-red-400 text-xs">{errors.message}</p>}
                      </div>
                      {status === "error" && (
                        <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
                      )}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                      <div className="shrink-0 shadow-[0_0_20px_rgba(127,255,212,0.3)] rounded-xl">
                        <SquircleBox cornerRadius={12} cornerSmoothing={1}>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={status === "sending"}
                            className="font-pp-neue-corp-wide bg-[#7FFfd4] hover:bg-[#6ee6be] disabled:opacity-60 transition-colors text-black font-medium uppercase px-8 py-3.5 text-sm cursor-pointer"
                          >
                            {status === "sending" ? "SENDING…" : "SEND"}
                          </button>
                        </SquircleBox>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between mt-auto">
                  <div className="font-pp-neue-corp-wide font-medium text-xl uppercase">
                    LETS TALK
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        </SquircleBox>
      </div>
    </>
  );
}
