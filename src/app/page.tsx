import type { Metadata } from "next";
import LandingForm from "@/components/LandingForm";

export const metadata: Metadata = {
  title: "Ebook Trilha de Carreira - DevVault",
  description:
    "Métodos, princípios e estratégias para sua carreira em desenvolvimento de software.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text">Ebook: Trilha de Carreira</h2>
          <p className="text-sm text-text-secondary mt-1">Preencha para liberar seu acesso</p>
        </div>

        <LandingForm />
      </div>
    </div>
  );
}
