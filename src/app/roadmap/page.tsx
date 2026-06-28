import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCategories, getContentList } from "@/lib/content";

export const metadata: Metadata = {
  title: "Roadmap - DevVault",
  description: "Confira os próximos temas e artigos planejados para a biblioteca DevVault.",
};

const roadmapData = {
  "Em Andamento": [
    { topic: "Microservices Architecture", status: "writing", description: "Padrões, comunicação, deploy e governança" },
    { topic: "Event Sourcing", status: "writing", description: "Armazenamento de eventos, reconstrução de estado" },
    { topic: "Kubernetes para Desenvolvedores", status: "writing", description: "Pods, services, deployments, ingress" },
  ],
  Planejado: [
    { topic: "Apache Kafka", description: "Produtores, consumidores, tópicos, partições" },
    { topic: "GraphQL Avançado", description: "Subscriptions, federated gateway, performance" },
    { topic: "CQRS Pattern", description: "Separação de leitura e escrita, eventual consistency" },
    { topic: "Docker Multi-stage Builds", description: "Otimização de imagens, boas práticas" },
    { topic: "Testes de Integração com Testcontainers", description: "Banco de dados, mensageria e serviços externos" },
    { topic: "DDD: Domain-Driven Design", description: "Entidades, value objects, agregados, bounded contexts" },
  ],
  Futuro: [
    { topic: "AWS para Desenvolvedores", description: "EC2, S3, Lambda, RDS, ECS" },
    { topic: "CI/CD Avançado", description: "Pipeline as code, canary deployment, rollback" },
    { topic: "Segurança em APIs", description: "OAuth2, JWT, rate limiting, CORS" },
    { topic: "Elastic Stack (ELK)", description: "Elasticsearch, Logstash, Kibana para observabilidade" },
    { topic: "WebSockets e Tempo Real", description: "Arquitetura, escalabilidade, fallbacks" },
    { topic: "Clean Architecture na Prática", description: "Casos de uso, adapters, boundaries" },
  ],
};

const statusColors: Record<string, string> = {
  writing: "bg-amber-950 text-amber-300 border-amber-700",
};

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  const colors = statusColors[status] ?? "";
  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border ${colors}`}>
      Em escrita
    </span>
  );
}

export default function RoadmapPage() {
  const categories = getCategories();
  const allContent = getContentList();
  const totalArticles = allContent.length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: "Roadmap" }]} />

      <header className="mb-10">
        <h1 className="text-3xl font-bold text-text tracking-tight mb-3">Roadmap</h1>
        <p className="text-text-secondary leading-relaxed">
          Visão geral dos próximos temas e artigos planejados para a DevVault.
          Atualmente com <strong className="text-text">{totalArticles} artigos</strong> em{" "}
          <strong className="text-text">{categories.length} categorias</strong>.
        </p>
      </header>

      {(Object.entries(roadmapData) as [string, { topic: string; status?: string; description: string }[]][]).map(([section, items]) => (
        <section key={section} className="mb-10">
          <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
            {section === "Em Andamento" && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
            {section}
          </h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.topic}
                className="flex items-start justify-between gap-4 p-4 rounded-xl bg-card border border-slate-700"
              >
                <div>
                  <h3 className="text-sm font-semibold text-text flex items-center gap-2 flex-wrap">
                    {item.topic}
                    <StatusBadge status={item.status} />
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="border-t border-slate-700 pt-8">
        <h2 className="text-lg font-semibold text-text mb-3">Sugestões?</h2>
        <p className="text-sm text-text-secondary">
          Tem algum tema que gostaria de ver por aqui? Contribuições são bem-vindas no{" "}
          <a
            href="https://github.com/lazaaro01/DevNote"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            GitHub
          </a>.
        </p>
      </section>
    </div>
  );
}
