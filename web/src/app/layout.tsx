
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/layout/footer/page";
import { Providers } from "./providers";
import { Navbar } from "../components/layout/navbar/page";
import { AI } from "@/components/ai/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeCrafters",
  description: "Yazılım Geliştirme Topluluğu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar />  
          <div className="container mx-auto">
            <main className="min-h-screen pt-0">
              {children}
            </main>
          </div>
          <div className="fixed bottom-5 right-0 right-0 z-50">
              <AI/>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
