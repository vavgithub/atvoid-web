import type { Metadata } from "next";
import SiteShell from "@/components/Layout/SiteShell";
import "./globals.css";
import "./variables.css";

export const metadata: Metadata = {
  title: "Value at Void",
  description: "Strategic branding, robust engineering, one coherent vision.",
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
