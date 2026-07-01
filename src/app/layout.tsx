import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="alternate" type="application/rss+xml" title="DevVault" href="/feed.xml" />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem("devvault-theme");if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`
        }} />
      </head>
      <body className="bg-bg text-text">
        <div className="grid-bg" />
        {children}
      </body>
    </html>
  );
}
