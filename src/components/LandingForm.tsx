"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "devvault-registered";

export default function LandingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setRegistered(true);
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: name.trim(), email: email.trim() }));
    setSubmitted(true);
    setTimeout(() => router.replace("/home"), 800);
  };

  const handleEnter = () => {
    router.replace("/home");
  };

  if (loading) return null;

  if (submitted) {
    return (
      <div className="animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-medium text-text">Bem-vindo ao Ebook!</p>
        <p className="text-sm text-text-secondary mt-1">Redirecionando...</p>
      </div>
    );
  }

  if (registered) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-text-secondary text-center">
          Você já possui cadastro. Clique abaixo para entrar.
        </p>
        <button
          onClick={handleEnter}
          className="w-full px-6 py-3 bg-accent text-white rounded-xl hover:opacity-90 transition-opacity font-medium text-lg"
        >
          Entrar no Ebook
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          className="w-full px-4 py-3 bg-card border border-slate-700 rounded-xl text-text placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-center"
          autoFocus
          required
        />
      </div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu melhor email"
          className="w-full px-4 py-3 bg-card border border-slate-700 rounded-xl text-text placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-center"
          required
        />
      </div>
      <button
        type="submit"
        disabled={!name.trim() || !email.trim()}
        className="w-full px-6 py-3 bg-accent text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity font-medium text-lg"
      >
        Quero o Ebook
      </button>
      <p className="text-xs text-text-secondary/60 text-center">
        Seus dados não serão compartilhados. Apenas para controle de acesso.
      </p>
    </form>
  );
}
