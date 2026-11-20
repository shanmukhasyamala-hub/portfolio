import { Volume2, VolumeX } from 'lucide-react';

interface AudioToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

export function AudioToggle({ isMuted, onToggle }: AudioToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={!isMuted}
      aria-label={isMuted ? 'Unmute atmospheric audio (Shortcut: M)' : 'Mute atmospheric audio (Shortcut: M)'}
      title={isMuted ? 'Unmute audio (M)' : 'Mute audio (M)'}
      className="group inline-flex items-center gap-2.5 min-h-[40px] px-3.5 py-2 border border-[#D4AF37]/30 bg-[#0A101F]/85 backdrop-blur-md text-xs tracking-wide text-[#E6E8EE] hover:border-[#D4AF37]/70 hover:text-[#F6E7B4] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#D4AF37] transition-colors" aria-hidden="true" />
      ) : (
        <Volume2 className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
      )}
      <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
      <span className="hidden sm:inline font-mono-tabular text-[11px] text-[#9CA3AF] border-l border-white/10 pl-2">
        M
      </span>
    </button>
  );
}
