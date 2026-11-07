import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
export const metadata: Metadata = {
  title: { default: "Dhairya Bansal | FinTech, Quant & Systems Builder", template: "%s | Dhairya Bansal" },
  description: "Dhairya Bansal — FinTech and quantitative systems builder. Explore projects, financial research, professional services, and collaboration opportunities.",
  metadataBase: new URL("https://dhairya-portfolio-one.vercel.app"),
  openGraph: { title: "Dhairya Bansal | FinTech, Quant & Systems Builder", description: "Projects, financial research, professional services, and collaboration.", url: "https://dhairya-portfolio-one.vercel.app", siteName: "Dhairya Bansal", type: "website" },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full flex flex-col">{children}</body></html>;
}
