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
  title: "Dhairya Bansal | Finance & Business Analytics",
  description:
    "Finance-first portfolio featuring financial modelling, company valuation, business analysis, quantitative risk research, and financial data projects.",
  openGraph: {
    title: "Dhairya Bansal | Finance & Business Analytics",
    description:
      "Financial modelling, company valuation, business analysis, and quantitative finance research.",
    url: "https://dhairya-portfolio-one.vercel.app/",
    siteName: "Dhairya Bansal Portfolio",
    type: "website",
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
