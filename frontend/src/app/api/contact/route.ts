function escapeHtml(str: string) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildContactEmail(params: { name: string; email: string; message: string }) {
  const safeName = escapeHtml(params.name);
  const safeEmail = escapeHtml(params.email);
  const safeMessage = escapeHtml(params.message).replaceAll("\n", "<br/>");

  const now = new Date();
  const iso = now.toISOString();

  const subject = `Novo contato: ${params.name}`.slice(0, 200);

  const text =
`NOVO CONTATO DO SITE

Nome: ${params.name}
Email: ${params.email}
Data (UTC): ${iso}

Mensagem:
${params.message}
`;

  const html = `
<div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.5;">
  <h2 style="margin: 0 0 12px;">Novo contato do site</h2>

  <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 680px;">
    <tr>
      <td style="padding: 6px 0; width: 140px;"><strong>Nome</strong></td>
      <td style="padding: 6px 0;">${safeName}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0;"><strong>Email</strong></td>
      <td style="padding: 6px 0;">${safeEmail}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0;"><strong>Data (UTC)</strong></td>
      <td style="padding: 6px 0;">${escapeHtml(iso)}</td>
    </tr>
  </table>

  <hr style="margin: 16px 0; border: none; border-top: 1px solid #e5e5e5;" />

  <h3 style="margin: 0 0 8px;">Mensagem</h3>
  <div style="padding: 12px; background: #f7f7f7; border: 1px solid #eee; border-radius: 8px;">
    ${safeMessage}
  </div>
</div>
`.trim();

  return { subject, text, html };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const message = String(body?.message || "").trim();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Campos obrigatórios: name, email, message" },
        { status: 400 }
      );
    }

    const emailApiUrl = process.env.EMAIL_API_URL;
    const to = process.env.CONTACT_TO;

    if (!emailApiUrl || !to) {
      console.error("Missing environment variables: EMAIL_API_URL or CONTACT_TO");
      return Response.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    console.log("Building email with:", { name, email, message });
    const { subject, text, html } = buildContactEmail({ name, email, message });

    console.log("Sending email to:", to);
    const emailRes = await fetch(emailApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, text, html }),
    });

    console.log("Email API response status:", emailRes.status);

    if (!emailRes.ok) {
      const errorData = await emailRes.json();
      console.error("Email API error:", errorData);
      return Response.json(
        { error: "Failed to send email", details: errorData },
        { status: 500 }
      );
    }

    console.log("Email sent successfully.");
    return Response.json({ ok: true });
  } catch (e: any) {
    return Response.json(
      { error: "Erro inesperado", message: e?.message || "unknown" },
      { status: 500 }
    );
  }
}
