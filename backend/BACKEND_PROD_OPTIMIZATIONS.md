Backend production optimizations (Railway) — what changed and how to set envs

Goal: minimize API consumption and resource usage while keeping functionality unchanged.

What I changed in the codebase
- Introduced `src/utils/logger.js` to control verbosity via `NODE_ENV`/`LOG_LEVEL`.
  - In production, set `LOG_LEVEL=info` (or omit to default) to avoid debug logs.
- Replaced verbose `console.log` calls in request path and long-running operations with the new logger (debug/info/warn/error).
- Memoized Gmail OAuth2 client and Gmail API instance to avoid re-creating auth clients per request.
- Added short timeouts for Gmail token retrieval and message send (env: `GMAIL_API_TOKEN_TIMEOUT`, `GMAIL_API_SEND_TIMEOUT`) with sensible defaults (10s).
  - This avoids long blocking operations that consume dyno time.
- Implemented graceful shutdown in `server.js` to close server quickly on SIGTERM/SIGINT, avoiding long-lived hung processes.
- Reduced worst-case body parsing and kept `express.json({ limit: "1mb" })` as-is (sensible for contact form).

Recommended environment variables for production
- NODE_ENV=production
- LOG_LEVEL=info
- MAILER_PROVIDER=gmail  # or mailersend
- GMAIL_MODE=oauth      # or service_account
- GMAIL_API_TOKEN_TIMEOUT=10000
- GMAIL_API_SEND_TIMEOUT=10000

Why these help on Railway
- Fewer debug logs reduce console I/O and log ingestion costs.
- Timeouts prevent long, stuck requests from consuming instance time and allow fail-fast behavior.
- Memoized auth client reduces per-request CPU/time spent initializing SDKs.
- Graceful shutdown helps the platform recycle instances cleanly and avoids long tail resource usage.

Next steps / optional improvements
- Use MailerSend or similar API-based provider (recommended) to avoid SMTP connectivity issues.
- Add a small in-memory rate limiting or per-source quotas for heavier endpoints if needed.
- Monitor using Railway logs for 5–10 minutes after deploy and adjust timeouts if you see rejections/timeouts.

If you want, I can also:
- Add an optional probe endpoint that validates the mail provider credentials with a lightweight test (no actual sends), useful to check health without using sending quota.
- Add a small self-test script to run on deployment that performs a cheap auth check.
