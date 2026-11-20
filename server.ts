import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Simple in-memory IP rate limiter: max 5 requests per 15 minutes
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(clientKey: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  // Prune expired buckets occasionally to keep memory bounded
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
  website?: string;
}

function validateContactPayload(body: unknown): {
  valid: boolean;
  isSpamHoneypot?: boolean;
  error?: string;
  data?: Omit<ContactPayload, 'website'>;
} {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request payload.' };
  }

  const raw = body as Record<string, unknown>;

  // Honeypot field check
  if (typeof raw.website === 'string' && raw.website.trim().length > 0) {
    return { valid: true, isSpamHoneypot: true };
  }

  const name = typeof raw.name === 'string' ? stripHeaderControls(raw.name) : '';
  const email = typeof raw.email === 'string' ? stripHeaderControls(raw.email) : '';
  const organization =
    typeof raw.organization === 'string' ? stripHeaderControls(raw.organization) : '';
  const subject = typeof raw.subject === 'string' ? stripHeaderControls(raw.subject) : '';
  const message =
    typeof raw.message === 'string'
      ? raw.message.replace(/\0/g, '').trim()
      : '';

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

function buildHtmlEmail(params: {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  receivedAt: string;
}): string {
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

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '32kb' }));

  app.post('/api/contact', async (req: Request, res: Response) => {
    const clientIp = req.ip || 'unknown';
    const rate = checkRateLimit(clientIp);
    if (!rate.allowed) {
      res.setHeader('Retry-After', String(rate.retryAfterSec));
      return res.status(429).json({
        ok: false,
        error: 'Too many transmissions sent recently. Please wait a few minutes before trying again.',
      });
    }

    const validation = validateContactPayload(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        ok: false,
        error: validation.error || 'Please check the required fields and try again.',
      });
    }

    if (validation.isSpamHoneypot) {
      return res.status(200).json({ ok: true });
    }

    const payload = validation.data!;
    const resendApiKey = (process.env.RESEND_API_KEY || '').trim();
    const resendFromEmail = (process.env.RESEND_FROM_EMAIL || '').trim();
    const receivingEmail =
      (process.env.CONTACT_EMAIL || '').trim() || 'shanmukhasyamala2008@gmail.com';

    if (!resendApiKey || !resendFromEmail) {
      return res.status(503).json({
        ok: false,
        error: 'Email transmission service is not yet configured on the server.',
      });
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
        return res.status(502).json({
          ok: false,
          error: 'Unable to deliver transmission at this time.',
        });
      }

      return res.status(200).json({ ok: true, receivedAt });
    } catch {
      return res.status(502).json({
        ok: false,
        error: 'Network error while attempting to deliver transmission.',
      });
    }
  });

  if (!IS_PRODUCTION) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CASE FILE: SHANMUKHA server listening on port ${PORT}`);
  });
}

void startServer();
