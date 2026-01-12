// services/contato-api.js

/**
 * @typedef {Object} ContactPayload
 * @property {string} name
 * @property {string} email
 * @property {string} message
 */

const rawApiBase = process.env.NEXT_PUBLIC_CONTACT_API_URL || "http://localhost:4000";

function normalizeBaseUrl(url) {
  if (!url) return url;
  // If missing protocol, prepend https:// and warn
  if (!/^https?:\/\//i.test(url)) {
    console.warn("NEXT_PUBLIC_CONTACT_API_URL is missing protocol; prepending https://", url);
    return `https://${url.replace(/\/$/, "")}`;
  }
  return url.replace(/\/$/, "");
}

const API_BASE_URL = normalizeBaseUrl(rawApiBase);
console.log("API_BASE_URL (normalized):", API_BASE_URL);

/**
 * Envia os dados do formulário para o backend.
 * O backend é responsável por montar e disparar o e-mail.
 *
 * @param {ContactPayload} payload
 * @returns {Promise<{ok: true} | {ok: false, error: string, details?: any}>}
 */
export async function sendContactMessage(payload) {
  console.log("Payload being sent:", payload);

  const requestUrl = `${API_BASE_URL}/contact`;
  console.log("Request URL:", requestUrl);

  let res;
  try {
    res = await fetch(requestUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (networkErr) {
    console.error("Network error when sending request:", networkErr);
    return { ok: false, error: "Network error", details: String(networkErr) };
  }

  console.log("Response status:", res.status, res.statusText);

  let data = null;
  const contentType = res.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      data = await res.json();
      console.log("Response data (json):", data);
    } else {
      const text = await res.text();
      console.log("Response text:", text);
      data = text ? { text } : null;
    }
  } catch (error) {
    console.error("Error parsing response body:", error);
  }

  if (!res.ok) {
    console.error("Error response from server:", { status: res.status, statusText: res.statusText, data });
    const serverMsg = data?.error || data?.text || res.statusText || "Falha ao enviar mensagem";
    return {
      ok: false,
      error: serverMsg,
      details: { status: res.status, data },
    };
  }

  console.log("Email sent successfully.");
  return { ok: true };
}
