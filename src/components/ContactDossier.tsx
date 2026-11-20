import { ArrowUpRight, Download, Mail, Globe } from 'lucide-react';
import { CONTACTS_DATA } from '../data/contacts';

export function ContactDossier() {
  const availableLinks = [
    CONTACTS_DATA.email
      ? {
          id: 'email',
          label: 'Email',
          value: CONTACTS_DATA.email,
          href: `mailto:${CONTACTS_DATA.email}`,
          external: false,
          icon: Mail,
        }
      : null,
    CONTACTS_DATA.github
      ? {
          id: 'github',
          label: 'GitHub',
          value: CONTACTS_DATA.github.replace(/^https?:\/\//, ''),
          href: CONTACTS_DATA.github,
          external: true,
          icon: ArrowUpRight,
        }
      : null,
    CONTACTS_DATA.linkedin
      ? {
          id: 'linkedin',
          label: 'LinkedIn',
          value: CONTACTS_DATA.linkedin.replace(/^https?:\/\//, ''),
          href: CONTACTS_DATA.linkedin,
          external: true,
          icon: ArrowUpRight,
        }
      : null,
    CONTACTS_DATA.portfolio
      ? {
          id: 'portfolio',
          label: 'Portfolio',
          value: CONTACTS_DATA.portfolio.replace(/^https?:\/\//, ''),
          href: CONTACTS_DATA.portfolio,
          external: true,
          icon: Globe,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  const hasResume = Boolean(CONTACTS_DATA.resumeUrl);
  const hasAnyContact = availableLinks.length > 0 || hasResume;

  return (
    <div className="bg-[#060911]/88 lg:bg-[#0A101F]/84 backdrop-blur-md border border-[#D4AF37]/30 p-6 sm:p-8 space-y-5">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <span className="font-mono-tabular text-xs tracking-[0.2em] text-[#D4AF37]">
          DIGITAL CASE CONTACT DOSSIER
        </span>
        <span className="text-xs text-[#9CA3AF]">
          {hasAnyContact ? 'Verified Channels' : 'Awaiting Details'}
        </span>
      </div>

      <p className="font-display text-xl font-semibold text-[#F3F4F6]">
        {CONTACTS_DATA.fullName}
      </p>

      {hasAnyContact && (
        <div className="space-y-3">
          {availableLinks.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.id}
                href={channel.href}
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between gap-4 p-3.5 border border-white/12 bg-[#060911]/70 hover:border-[#D4AF37]/60 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-[11px] font-mono-tabular tracking-wider text-[#D4AF37]">
                    {channel.label.toUpperCase()}
                  </p>
                  <p className="text-sm text-[#F3F4F6] truncate mt-0.5">
                    {channel.value}
                  </p>
                </div>
                <Icon className="w-4 h-4 text-[#D4AF37] shrink-0" aria-hidden="true" />
              </a>
            );
          })}

          {hasResume && (
            <a
              href={CONTACTS_DATA.resumeUrl}
              download={CONTACTS_DATA.resumeFileName}
              className="inline-flex w-full items-center justify-center gap-2.5 min-h-[44px] px-5 py-3 bg-[#D4AF37] text-[#060911] font-semibold text-sm hover:bg-[#E8C766] transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download Resume</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
