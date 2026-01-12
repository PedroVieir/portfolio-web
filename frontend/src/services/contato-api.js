// services/contato-api.js

/**
 * @typedef {Object} ContactPayload
 * @property {string} name
 * @property {string} email
 * @property {string} message
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_CONTACT_API_URL || "http://localhost:4000";

// Adding logs to debug the email sending process
console.log("API_BASE_URL:", API_BASE_URL);

/**
 * Envia os dados do formulário para o backend.
 * O backend é responsável por montar e disparar o e-mail.
 *
 * @param {ContactPayload} payload
 * @returns {Promise<{ok: true} | {ok: false, error: string, details?: any}>}
 */
export async function sendContactMessage(payload) {
  console.log("Payload being sent:", payload);

  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log("Response status:", res.status);

  let data = null;
  try {
    data = await res.json();
    console.log("Response data:", data);
  } catch (error) {
    console.error("Error parsing response JSON:", error);
  }

  if (!res.ok) {
    console.error("Error response from server:", data);
    return {
      ok: false,
      error: data?.error || "Falha ao enviar mensagem",
      details: data?.details,
    };
  }

  console.log("Email sent successfully.");
  return { ok: true };
}
