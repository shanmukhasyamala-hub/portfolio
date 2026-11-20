export const config = {
  runtime: 'nodejs',
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(clientKey: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  if (rateLimitStore.size > 500) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt <= now) rateLimitStore.delete(key);
    }
  }

  const existing = rateLimitStore.get(clientKey);
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

function stripHeaderControls(value: string): string {
  return value.replace(/[\r\n\0\t]+/g, ' ').trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface ContactPayload {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
}

function validateContactPayload(body: unknown): {
  valid: boolean;
  isSpamHoneypot?: boolean;
  error?: string;
  data?: ContactPayload;
} {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request payload.' };
  }

  const raw = body as Record<string, unknown>;

  if (typeof raw.website === 'string' && raw.website.trim().length > 0) {
    return { valid: true, isSpamHoneypot: true };
  }

  const name = typeof raw.name === 'string' ? stripHeaderControls(raw.name) : '';
  const email = typeof raw.email === 'string' ? stripHeaderControls(raw.email) : '';
  const organization =
    typeof raw.organization === 'string' ? stripHeaderControls(raw.organization) : '';
  const subject = typeof raw.subject === 'string' ? stripHeaderControls(raw.subject) : '';
  const message =
    typeof raw.message === 'string' ? raw.message.replace(/\0/g, '').trim() : '';

  if (name.length < 2 || name.length > 120) {
    return { valid: false, error: 'Please provide a valid name (2–120 characters).' };
  }
  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }
  if (organization.length > 140) {
    return { valid: false, error: 'Organization name must be 140 characters or fewer.' };
  }
  if (subject.length < 2 || subject.length > 160) {
    return { valid: false, error: 'Please provide a subject (2–160 characters).' };
  }
  if (message.length < 10 || message.length > 4000) {
    return { valid: false, error: 'Message must be between 10 and 4000 characters.' };
  }

  return {
    valid: true,
    data: { name, email, organization, subject, message },
  };
}

function buildHtmlEmail(params: ContactPayload & { receivedAt: string }): string {
  const safeName = escapeHtml(params.name);
  const safeEmail = escapeHtml(params.email);
  const safeOrg = escapeHtml(params.organization || 'Not provided');
  const safeSubject = escapeHtml(params.subject);
  const safeMessageHtml = escapeHtml(params.message).replace(/\n/g, '<br />');
  const safeReceivedAt = escapeHtml(params.receivedAt);
  const mailtoHref = `mailto:${encodeURIComponent(params.email)}?subject=${encodeURIComponent(
    `Re: ${params.subject}`
  )}`;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Portfolio Inquiry — CASE FILE: SHANMUKHA</title>
  </head>
  <body style="margin:0;padding:0;background-color:#060911;color:#E6E8EE;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#060911;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background-color:#0A101F;border:1px solid rgba(212,175,55,0.35);">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.1);">
                <p style="margin:0;font-size:11px;letter-spacing:0.22em;color:#D4AF37;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">
                  CASE FILE: SHANMUKHA
                </p>
                <h1 style="margin:8px 0 4px;font-size:26px;font-weight:600;color:#F3F4F6;font-family:Georgia,serif;">
                  THE FINAL LEAD
                </h1>
                <p style="margin:0;font-size:12px;letter-spacing:0.16em;color:#E5C158;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">
                  NEW INCOMING TRANSMISSION
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:8px 0;font-size:12px;color:#9CA3AF;width:140px;vertical-align:top;">Visitor Name:</td>
                    <td style="padding:8px 0;font-size:14px;color:#F3F4F6;font-weight:600;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:12px;color:#9CA3AF;vertical-align:top;">Visitor Email:</td>
                    <td style="padding:8px 0;font-size:14px;color:#E5C158;">${safeEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:12px;color:#9CA3AF;vertical-align:top;">Organization:</td>
                    <td style="padding:8px 0;font-size:14px;color:#D1D5DB;">${safeOrg}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:12px;color:#9CA3AF;vertical-align:top;">Subject:</td>
                    <td style="padding:8px 0;font-size:14px;color:#F3F4F6;">${safeSubject}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;font-size:12px;color:#9CA3AF;vertical-align:top;">Received At:</td>
                    <td style="padding:8px 0;font-size:12px;color:#9CA3AF;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">${safeReceivedAt}</td>
                  </tr>
                </table>

                <div style="margin-top:20px;padding:18px 20px;background-color:#060911;border:1px solid rgba(255,255,255,0.12);">
                  <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.18em;color:#D4AF37;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">
                    MESSAGE
                  </p>
                  <p style="margin:0;font-size:14px;line-height:1.65;color:#E6E8EE;">
                    ${safeMessageHtml}
                  </p>
                </div>

                <div style="margin-top:24px;">
                  <a href="${mailtoHref}" style="display:inline-block;padding:12px 22px;background-color:#D4AF37;color:#060911;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.06em;">
                    Reply to Sender
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;color:#9CA3AF;">
                Transmitted via CASE FILE: SHANMUKHA · THE FINAL LEAD
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request): Promise<Response> {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientIp =
    forwardedFor?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    'unknown';

  const rate = checkRateLimit(clientIp);
  if (!rate.allowed) {
    return Response.json(
      {
        ok: false,
        error: 'Too many transmissions sent recently. Please wait a few minutes before trying again.',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(rate.retryAfterSec) },
      }
    );
  }

  let body: unknown;
  try {
    const rawText = await request.text();
    if (rawText.length > 32 * 1024) {
      return Response.json(
        { ok: false, error: 'Request payload is too large.' },
        { status: 413 }
      );
    }
    body = JSON.parse(rawText);
  } catch {
    return Response.json(
      { ok: false, error: 'Invalid request payload.' },
      { status: 400 }
    );
  }

  const validation = validateContactPayload(body);
  if (!validation.valid) {
    return Response.json(
      {
        ok: false,
        error: validation.error || 'Please check the required fields and try again.',
      },
      { status: 400 }
    );
  }

  if (validation.isSpamHoneypot) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const payload = validation.data!;
  const env = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } })
    .process?.env;
  const resendApiKey = (env?.RESEND_API_KEY || '').trim();
  const resendFromEmail = (env?.RESEND_FROM_EMAIL || '').trim();
  const receivingEmail = (env?.CONTACT_EMAIL || '').trim();

  if (!resendApiKey || !resendFromEmail || !receivingEmail) {
    return Response.json(
      {
        ok: false,
        error: 'Email transmission service is not yet configured on the server.',
      },
      { status: 503 }
    );
  }

  const receivedAt = new Date().toISOString();
  const html = buildHtmlEmail({ ...payload, receivedAt });
  const text = [
    'CASE FILE: SHANMUKHA',
    'THE FINAL LEAD',
    'NEW INCOMING TRANSMISSION',
    '',
    `Visitor Name: ${payload.name}`,
    `Visitor Email: ${payload.email}`,
    `Organization: ${payload.organization || 'Not provided'}`,
    `Subject: ${payload.subject}`,
    '',
    'Message:',
    payload.message,
    '',
    `Received At: ${receivedAt}`,
  ].join('\n');

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: resendFromEmail,
        to: [receivingEmail],
        reply_to: payload.email,
        subject: 'New Portfolio Inquiry — CASE FILE: SHANMUKHA',
        html,
        text,
      }),
    });

    if (!resendResponse.ok) {
      return Response.json(
        {
          ok: false,
          error: 'Unable to deliver transmission at this time.',
        },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, receivedAt }, { status: 200 });
  } catch {
    return Response.json(
      {
        ok: false,
        error: 'Network error while attempting to deliver transmission.',
      },
      { status: 502 }
    );
  }
}
