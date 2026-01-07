export type ProjectCase = {
  title: string;
  description: string;

  frontend: string[];
  backend: string[];
  achievements: string[];

  architecture: {
    frontend: string;
    services: string[];
    cache: string;
    databases: string[];
    search?: string;
  };
};

export const projects: ProjectCase[] = [
  {
    title: "Sistema Web de Gestão",
    description:
      "Aplicação web focada em organização e controle de dados, com autenticação, integração entre frontend e backend e operações CRUD completas.",

    frontend: [
      "React com componentização",
      "Interfaces responsivas",
      "Consumo de APIs REST",
    ],

    backend: [
      "Node.js",
      "APIs REST",
      "Integração com banco de dados",
    ],

    achievements: [
      "Estrutura modular e escalável",
      "Código organizado seguindo boas práticas",
      "Automação de fluxos operacionais",
    ],

    architecture: {
      frontend: "Frontend Web (React)",
      services: ["API de Usuários", "API de Dados"],
      cache: "Camada de Cache",
      databases: ["Banco SQL"],
      search: "Busca otimizada",
    },
  },
];
