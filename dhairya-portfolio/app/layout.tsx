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
  metadataBase: new URL("https://dhairya-portfolio-one.vercel.app"),
  title: {
    default: "Dhairya Bansal — Hybrid Finance & Technology Builder",
    template: "%s | Dhairya Bansal",
  },
  description:
    "Selected projects and technical case studies across quantitative finance, FinTech, AI systems, cybersecurity, and software engineering.",
  openGraph: {
    title: "Dhairya Bansal — Hybrid Finance & Technology Builder",
    description:
      "Building at the intersection of finance, quantitative analysis, and software systems.",
    url: "https://dhairya-portfolio-one.vercel.app",
    siteName: "Dhairya Bansal Portfolio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
