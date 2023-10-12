"use client";

import Header from "@/components/Header";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <TailwindIndicator />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
