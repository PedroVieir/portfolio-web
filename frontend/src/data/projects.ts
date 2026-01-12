import { ProjectCase } from "@/types";

/**
 * Projects Data
 * Portfolio projects and case studies
 */
export const projects: ProjectCase[] = [
  // {
  //   id: "sistema-web-gestao",
  //   title: "Sistema Web de Gestão",
  //   description:
  //     "Aplicação web focada em organização e controle de dados, com autenticação, integração entre frontend e backend e operações CRUD completas.",
  //   frontend: [
  //     "React com componentização",
  //     "Interfaces responsivas",
  //     "Consumo de APIs REST",
  //   ],
  //   backend: [
  //     "Node.js",
  //     "APIs REST",
  //     "Integração com banco de dados",
  //   ],
  //   achievements: [
  //     "Estrutura modular e escalável",
  //     "Código organizado seguindo boas práticas",
  //     "Automação de fluxos operacionais",
  //   ],
  //   architecture: {
  //     frontend: "Frontend Web (React)",
  //     services: ["API de Usuários", "API de Dados"],
  //     cache: "Camada de Cache",
  //     databases: ["Banco SQL"],
  //     search: "Busca otimizada",
  //   },
  // },
  {
    id: "sistema-web-gestao",
    title: "Sistema Web de Gestão",
    description:
      "Aplicação web focada em organização e controle de dados, com autenticação, integração entre frontend e backend e operações CRUD completas.",
    frontend: [
      "React com componentização",
      "Componente de catálogo com lazy-loading de imagens",
      "Filtros e busca em tempo real (client-side)"
    ],
    backend: [
      "API REST para listagem e detalhes de produtos",
      "Serviço de imagens com CDN",
      "Endpoins otimizados para paginação e cache"
    ],
    achievements: [
      "Tempo de carregamento reduzido com lazy-loading e CDN",
      "UX de navegação e filtro otimizada",
      "Implementação de cache para reduzir chamadas ao backend"
    ],
    architecture: {
      frontend: "SPA React (Catálogo)",
      services: ["Produtos API", "Imagens CDN"],
      cache: "CDN + Cache em camada de API",
      databases: ["Documento/NoSQL para catálogo"],
      search: "Busca por facetas e texto completo"
    },
  },
  {
    id: "site-institucional-empresa",
    title: "Site Institucional - Empresa",
    description:
      "Website institucional para apresentação de serviços, portfólio e contato, com páginas estáticas otimizadas para SEO e suporte a múltiplos idiomas.",
    frontend: [
      "Next.js com renderização híbrida (SSG/SSR)",
      "Componentes reutilizáveis para seções institucionais",
      "Suporte a i18n e otimização de SEO"
    ],
    backend: [
      "Headless CMS para gerenciamento de conteúdo",
      "API de contato e formulários",
      "Deploy estático com CDN"
    ],
    achievements: [
      "Melhora no tráfego orgânico com otimizações de SEO",
      "Facilidade de edição via CMS",
      "Entrega rápida via CDN e builds otimizados"
    ],
    architecture: {
      frontend: "Next.js (Site Institucional)",
      services: ["Headless CMS", "Form API"],
      cache: "CDN e cache de página",
      databases: ["CMS (SaaS)"]
    },
  },
];
