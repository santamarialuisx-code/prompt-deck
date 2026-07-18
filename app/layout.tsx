import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Prompt Deck — AI Image Prompts for Social Media",
    template: "%s | Prompt Deck",
  },
  description:
    "Curated AI prompts for stunning social media content. Pay once, lifetime access.",
  openGraph: {
    title: "Prompt Deck — AI Image Prompts for Social Media",
    description:
      "Curated AI prompts for stunning social media content. Pay once, lifetime access.",
    siteName: "Prompt Deck",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Deck — AI Image Prompts for Social Media",
    description:
      "Curated AI prompts for stunning social media content. Pay once, lifetime access.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
