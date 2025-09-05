import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import LandingSidebar from "@/components/landing/LandingSidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeFavicon } from "@/components/ui/theme-favicon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intaj AI - Smart Automation Solutions for Businesses in Egypt",
  description: "Build AI agents for WhatsApp, Facebook, Instagram, and websites. Respond 3x faster, save 40% on costs. Get started for free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeFavicon />
          <div className="relative min-h-screen flex">
            <LandingSidebar />
            <div className="flex-1">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl lg:ml-64">
                <Header />
                <main className="py-8">{children}</main>
                <Footer />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
