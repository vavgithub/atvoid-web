import type { Metadata } from "next";
import SiteShell from "@/components/Layout/SiteShell";
import "./globals.css";
import "./variables.css";

export const metadata: Metadata = {
  title: "Value at Void | Strategic Brand & Experience Design Studio",
  description: "We are your end-to-end strategic design partner. We integrate Brand, Product, and Engineering in-house to build cohesive systems that scale with intent.",
  icons: {
    icon: "/images/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
