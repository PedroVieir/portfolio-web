import Container from "../layout/Container";
import Card from "../ui/Card";

export default function Skills() {
  return (
    <section>
      <Container>
        <div className="border border-gray-200 rounded-2xl p-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              title="Frontend Development"
              color="blue"
              items={[
                "React e Next.js",
                "Componentização",
                "Interfaces responsivas",
              ]}
            />

            <Card
              title="Backend Development"
              color="purple"
              items={[
                "Node.js",
                "APIs REST",
                "Integração com bancos de dados",
              ]}
            />

            <Card
              title="Automação & Integrações"
              color="green"
              items={[
                "Automação de processos",
                "Integração de sistemas",
                "Otimização de fluxos",
              ]}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
