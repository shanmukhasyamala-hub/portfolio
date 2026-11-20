import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isVideoReady: boolean;
}

export function LoadingScreen({ isVideoReady }: LoadingScreenProps) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const minTimer = window.setTimeout(() => {
      if (isVideoReady) setDismissed(true);
    }, 350);

    // Guarantee content is never blocked even on slow connections
    const maxTimer = window.setTimeout(() => {
      setDismissed(true);
    }, 1100);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
    };
  }, [isVideoReady]);

  if (dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060911] transition-opacity duration-500"
    >
      <div className="max-w-md px-6 text-center space-y-4">
        <p className="font-mono-tabular text-xs tracking-[0.26em] text-[#D4AF37]">
          CASE ARCHIVE · INITIALIZING
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#F3F4F6]">
          CASE FILE: SHANMUKHA
        </h2>
        <div className="mx-auto w-44 h-[1px] bg-white/10 overflow-hidden">
          <div className="h-full w-2/3 bg-[#D4AF37] transition-transform duration-500" />
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="mt-2 text-xs text-[#9CA3AF] hover:text-[#D4AF37] transition-colors cursor-pointer"
        >
          Skip intro buffer
        </button>
      </div>
    </div>
  );
}
