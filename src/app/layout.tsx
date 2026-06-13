import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevVault - Biblioteca de Conhecimento Técnico",
  description:
    "Biblioteca pessoal de conhecimento técnico com conteúdos sobre desenvolvimento de software, arquitetura, banco de dados e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-bg text-text">
        <div className="aurora-bg" />
        <Sidebar />
        <KeyboardShortcuts />
        <main className="ml-64 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
