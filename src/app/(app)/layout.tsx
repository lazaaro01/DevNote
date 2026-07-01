import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import MobileMenu from "@/components/MobileMenu";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import ThemeToggle from "@/components/ThemeToggle";
import FirstVisitHint from "@/components/FirstVisitHint";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "DevVault - Biblioteca de Conhecimento Técnico",
  description:
    "Biblioteca pessoal de conhecimento técnico com conteúdos sobre desenvolvimento de software, arquitetura, banco de dados e muito mais.",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = getCategories();

  return (
    <>
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <MobileMenu categories={categories} />
      <ThemeToggle />
      <KeyboardShortcuts />
      <FirstVisitHint />
      <main className="md:ml-64 min-h-screen flex flex-col">
        {children}
        <Footer />
      </main>
    </>
  );
}
