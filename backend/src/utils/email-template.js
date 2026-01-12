const { escapeHtml } = require("./sanitize");

function buildContactEmail({ name, email, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>");

  const iso = new Date().toISOString();

  const subject = `Novo contato: ${name}`.slice(0, 200);

  const text =
`NOVO CONTATO DO SITE

Nome: ${name}
Email: ${email}
Data (UTC): ${iso}

Mensagem:
${message}
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

module.exports = { buildContactEmail };
