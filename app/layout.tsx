import type { Metadata } from "next";
import SiteShell from "@/components/Layout/SiteShell";
import "./globals.css";
import "./variables.css";

const BASE_URL = "https://value.atvoid.com";
const TITLE = "Value at Void | Strategic Brand & Experience Design Studio";
const DESCRIPTION =
  "We are your end-to-end strategic design partner. We integrate Brand, Product, and Engineering in-house to build cohesive systems that scale with intent.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: "/images/favicon.svg",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: "Value at Void",
    images: [
      {
        url: "/images/favicon.svg",
        alt: "Value at Void - Strategic Brand & Experience Design Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/favicon.svg"],
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
