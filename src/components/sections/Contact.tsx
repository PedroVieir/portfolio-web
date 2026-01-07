import Container from "../layout/Container";

export default function Contact() {
  return (
    <section id="contact" className="bg-gray-50 py-24">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Vamos conversar?
          </h2>

          <p className="text-gray-600 mb-10">
            Entre em contato para falarmos sobre oportunidades,
            projetos ou colaborações.
          </p>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Seu nome"
              className="border rounded-lg px-4 py-3"
            />
            <input
              type="email"
              placeholder="Seu email"
              className="border rounded-lg px-4 py-3"
            />
            <textarea
              placeholder="Sua mensagem"
              rows={4}
              className="border rounded-lg px-4 py-3"
            />

            <button
              type="submit"
              className="bg-primary text-white rounded-lg py-3 font-medium hover:opacity-90"
            >
              Enviar mensagem
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
