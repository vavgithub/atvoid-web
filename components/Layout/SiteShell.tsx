"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import MorphingForm from "@/components/MorphingForm";

/** Navbar, footer, and morphing CTA omitted on Sanity Studio (`/admin`). */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <MorphingForm />
      {children}
      <Footer />
    </>
  );
}
