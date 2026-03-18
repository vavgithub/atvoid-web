import type { Metadata } from "next";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
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
      <body
        className="antialiased bg-black"
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
