import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import Loader  from "@/app/components/Loading";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aarav Kumar",
  description: "Personal portfolio of Aarav Kumar, a software developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {

  return (
    <html
      lang="en"
      className={cn("antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, "scroll-smooth", "scrollbar-thin scrollbar-thumb-accent/50" )}
    >
        <body className="relative " >
          {children}
          {/* <Loader></Loader> */}
        </body>
    </html>
  );
}
