import { useEffect, useRef, useState } from 'react';

interface MysteryCursorProps {
  reducedMotion: boolean;
}

/**
 * Subtle desktop-only mysterious cursor reticle + faint ambient glow.
 * Preserves the native pointer and never interferes with usability or touch devices.
 */
export function MysteryCursor({ reducedMotion }: MysteryCursorProps) {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined' || !window.matchMedia) {
      setEnabled(false);
      return;
    }

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const el = e.target as HTMLElement | null;
      const interactive = Boolean(el?.closest('a, button, [role="tab"], [role="button"]'));
      setIsInteractive(interactive);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] transition-opacity duration-200"
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-[width,height,border-color] duration-200 ${
          isInteractive
            ? 'w-9 h-9 border-[#E8C766]/70 bg-[#D4AF37]/8'
            : 'w-6 h-6 border-[#D4AF37]/35'
        }`}
      />
    </div>
  );
}
