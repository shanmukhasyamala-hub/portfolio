import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertTriangle, Loader2, Send, RotateCcw } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  website: string; // honeypot
}

interface FieldErrors {
  name?: string;
  email?: string;
  organization?: string;
  subject?: string;
  message?: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  organization: '',
  subject: '',
  message: '',
  website: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function FinalLead() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverErrorDetail, setServerErrorDetail] = useState<string>('');

  const validate = (values: FormState): FieldErrors => {
    const nextErrors: FieldErrors = {};
    const trimmedName = values.name.trim();
    const trimmedEmail = values.email.trim();
    const trimmedOrg = values.organization.trim();
    const trimmedSubject = values.subject.trim();
    const trimmedMessage = values.message.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = 'Please enter your full name (at least 2 characters).';
    } else if (trimmedName.length > 120) {
      nextErrors.name = 'Name must be 120 characters or fewer.';
    }

    if (!trimmedEmail) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(trimmedEmail) || trimmedEmail.length > 254) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (trimmedOrg.length > 140) {
      nextErrors.organization = 'Organization name must be 140 characters or fewer.';
    }

    if (trimmedSubject.length < 2) {
      nextErrors.subject = 'Please enter a subject for your message.';
    } else if (trimmedSubject.length > 160) {
      nextErrors.subject = 'Subject must be 160 characters or fewer.';
    }

    if (trimmedMessage.length < 10) {
      nextErrors.message = 'Please write a message of at least 10 characters.';
    } else if (trimmedMessage.length > 4000) {
      nextErrors.message = 'Message must be 4000 characters or fewer.';
    }

    return nextErrors;
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status === 'error') {
      setStatus('idle');
      setServerErrorDetail('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('submitting');
    setServerErrorDetail('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          organization: form.organization.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          website: form.website,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        setStatus('error');
        setServerErrorDetail(data?.error || '');
        return;
      }

      setStatus('success');
      setForm(INITIAL_FORM);
      setErrors({});
    } catch {
      setStatus('error');
      setServerErrorDetail('');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setServerErrorDetail('');
    setErrors({});
  };

  return (
    <section
      id="section-final-lead"
      aria-labelledby="final-lead-heading"
      className="relative py-24 px-4 sm:px-8 lg:px-12"
    >
      <div className="max-w-[920px] w-full mx-auto">
        <div className="chapter-panel relative bg-[#060911]/90 lg:bg-[#0A101F]/86 backdrop-blur-md border border-[#D4AF37]/30 shadow-[0_24px_80px_rgba(0,0,0,0.85)] p-6 sm:p-10 space-y-8 transition-colors duration-300 hover:border-[#D4AF37]/50">
          {/* Subtle corner case-file markers */}
          <span aria-hidden="true" className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]" />
          <span aria-hidden="true" className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]" />
          <span aria-hidden="true" className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#D4AF37]" />
          <span aria-hidden="true" className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]" />

          {/* Section Header */}
          <div className="space-y-3 border-b border-white/10 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono-tabular text-xs tracking-[0.22em] text-[#D4AF37]">
                COMMUNICATION TERMINAL · CASE FILE: SHANMUKHA
              </span>
              <span className="font-mono-tabular text-xs tracking-[0.18em] text-[#9E2A2B]">
                OPEN CHANNEL
              </span>
            </div>

            <h2
              id="final-lead-heading"
              className="font-display text-3xl sm:text-5xl font-semibold text-[#F3F4F6] text-balance"
            >
              THE FINAL LEAD
            </h2>

            <p className="font-display italic text-xl sm:text-2xl text-[#E5C158]">
              Every investigation begins with a connection.
            </p>

            <p className="text-sm sm:text-[15px] leading-relaxed text-[#D1D5DB] max-w-2xl">
              Have an idea, an opportunity, a collaboration or simply something interesting to discuss? Leave a message in the case file. I&apos;ll get back to you.
            </p>
          </div>

          {status === 'success' ? (
            <div
              role="status"
              aria-live="polite"
              className="p-6 sm:p-8 border border-[#D4AF37]/45 bg-[#060911]/85 space-y-4 transition-opacity duration-300"
            >
              <div className="flex items-center gap-3 text-[#E5C158]">
                <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                <p className="font-mono-tabular text-sm tracking-[0.2em] font-semibold">
                  TRANSMISSION RECEIVED.
                </p>
              </div>
              <p className="text-sm sm:text-[15px] leading-relaxed text-[#E6E8EE]">
                Your message has successfully entered the case file. Thank you for reaching out. I&apos;ll be in touch soon.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 border border-[#D4AF37]/45 text-xs font-medium tracking-wide text-[#F6E7B4] hover:bg-[#D4AF37] hover:text-[#060911] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Send Another Transmission</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Honeypot field for spam protection */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="lead-website">Website</label>
                <input
                  id="lead-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => handleFieldChange('website', e.target.value)}
                />
              </div>

              {status === 'error' && (
                <div
                  role="alert"
                  className="p-4 sm:p-5 border border-[#9E2A2B]/80 bg-[#9E2A2B]/15 space-y-1.5"
                >
                  <div className="flex items-center gap-2.5 text-[#F3B7B8]">
                    <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <p className="font-mono-tabular text-xs tracking-[0.18em] font-semibold">
                      TRANSMISSION FAILED.
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E6E8EE]">
                    Something went wrong while sending your message. Please try again.
                  </p>
                  {serverErrorDetail && (
                    <p className="text-xs text-[#D1D5DB]/90">{serverErrorDetail}</p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="lead-name"
                    className="block font-mono-tabular text-xs tracking-[0.16em] text-[#D4AF37]"
                  >
                    FULL NAME <span className="text-[#9E2A2B]">*</span>
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    placeholder="Enter your name..."
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'lead-name-error' : undefined}
                    className="w-full min-h-[44px] px-4 py-2.5 bg-[#060911]/85 border border-white/15 text-sm text-[#F3F4F6] placeholder:text-[#9CA3AF]/60 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                  {errors.name && (
                    <p id="lead-name-error" className="text-xs text-[#F3B7B8]">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="lead-email"
                    className="block font-mono-tabular text-xs tracking-[0.16em] text-[#D4AF37]"
                  >
                    EMAIL ADDRESS <span className="text-[#9E2A2B]">*</span>
                  </label>
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="Enter your email address..."
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'lead-email-error' : undefined}
                    className="w-full min-h-[44px] px-4 py-2.5 bg-[#060911]/85 border border-white/15 text-sm text-[#F3F4F6] placeholder:text-[#9CA3AF]/60 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <p id="lead-email-error" className="text-xs text-[#F3B7B8]">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Organization / Company (Optional) */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="lead-organization"
                    className="block font-mono-tabular text-xs tracking-[0.16em] text-[#D4AF37]"
                  >
                    ORGANIZATION / COMPANY
                  </label>
                  <input
                    id="lead-organization"
                    name="organization"
                    type="text"
                    value={form.organization}
                    onChange={(e) => handleFieldChange('organization', e.target.value)}
                    placeholder="Your organization (optional)..."
                    aria-invalid={Boolean(errors.organization)}
                    aria-describedby={errors.organization ? 'lead-organization-error' : undefined}
                    className="w-full min-h-[44px] px-4 py-2.5 bg-[#060911]/85 border border-white/15 text-sm text-[#F3F4F6] placeholder:text-[#9CA3AF]/60 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                  {errors.organization && (
                    <p id="lead-organization-error" className="text-xs text-[#F3B7B8]">
                      {errors.organization}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="lead-subject"
                    className="block font-mono-tabular text-xs tracking-[0.16em] text-[#D4AF37]"
                  >
                    SUBJECT <span className="text-[#9E2A2B]">*</span>
                  </label>
                  <input
                    id="lead-subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => handleFieldChange('subject', e.target.value)}
                    placeholder="What brings you here?"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'lead-subject-error' : undefined}
                    className="w-full min-h-[44px] px-4 py-2.5 bg-[#060911]/85 border border-white/15 text-sm text-[#F3F4F6] placeholder:text-[#9CA3AF]/60 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                  {errors.subject && (
                    <p id="lead-subject-error" className="text-xs text-[#F3B7B8]">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="lead-message"
                  className="block font-mono-tabular text-xs tracking-[0.16em] text-[#D4AF37]"
                >
                  MESSAGE <span className="text-[#9E2A2B]">*</span>
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  placeholder="Write your message..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'lead-message-error' : undefined}
                  className="w-full px-4 py-3 bg-[#060911]/85 border border-white/15 text-sm text-[#F3F4F6] placeholder:text-[#9CA3AF]/60 focus:border-[#D4AF37] focus:outline-none transition-colors resize-y"
                />
                {errors.message && (
                  <p id="lead-message-error" className="text-xs text-[#F3B7B8]">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-[#9CA3AF]">
                  Fields marked with <span className="text-[#9E2A2B]">*</span> are required.
                </p>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-2.5 min-h-[44px] px-6 py-3 bg-[#D4AF37] text-[#060911] font-semibold text-xs sm:text-sm tracking-wider hover:bg-[#E8C766] disabled:opacity-65 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>TRANSMIT MESSAGE</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
