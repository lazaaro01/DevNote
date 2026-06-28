import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import FirstVisitHint from "@/components/FirstVisitHint";
import { getCategories } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: "DevVault - Biblioteca de Conhecimento Técnico",
  description:
    "Biblioteca pessoal de conhecimento técnico com conteúdos sobre desenvolvimento de software, arquitetura, banco de dados e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getCategories();

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-bg text-text">
        <div className="aurora-bg" />
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <MobileMenu categories={categories} />
        <KeyboardShortcuts />
        <FirstVisitHint />
        <main className="md:ml-64 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
