import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
