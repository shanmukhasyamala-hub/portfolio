import { useCallback, useEffect, useRef, useState } from 'react';

interface AudioNodes {
  ctx: AudioContext;
  masterGain: GainNode;
  rainSource: AudioBufferSourceNode;
  droneOsc: OscillatorNode;
  droneSubOsc: OscillatorNode;
}

/**
 * Generates a gentle nocturnal rain + midnight cinema drone texture via Web Audio API
 * whenever the visitor explicitly unmutes audio, complementing the active clip audio.
 */
export function useAmbientAudio() {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const nodesRef = useRef<AudioNodes | null>(null);

  const initAudio = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (nodesRef.current) return nodesRef.current;

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;

    const ctx = new AudioCtx();
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Filtered pink-ish noise buffer for distant rain ambiance
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.099046;
      b1 = 0.963 * b1 + white * 0.2965164;
      b2 = 0.57 * b2 + white * 1.0526913;
      output[i] = (b0 + b1 + b2 + white * 0.1848) * 0.035;
    }

    const rainSource = ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.setValueAtTime(950, ctx.currentTime);
    rainFilter.Q.setValueAtTime(0.7, ctx.currentTime);

    const rainGain = ctx.createGain();
    rainGain.gain.setValueAtTime(0.22, ctx.currentTime);

    rainSource.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(masterGain);
    rainSource.start();

    // Warm low cinematic pad
    const droneOsc = ctx.createOscillator();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(73.42, ctx.currentTime); // D2

    const droneSubOsc = ctx.createOscillator();
    droneSubOsc.type = 'triangle';
    droneSubOsc.frequency.setValueAtTime(110.0, ctx.currentTime); // A2

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(220, ctx.currentTime);

    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0.14, ctx.currentTime);

    droneOsc.connect(droneFilter);
    droneSubOsc.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(masterGain);

    droneOsc.start();
    droneSubOsc.start();

    const created: AudioNodes = {
      ctx,
      masterGain,
      rainSource,
      droneOsc,
      droneSubOsc,
    };
    nodesRef.current = created;
    return created;
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      if (!nextMuted) {
        const nodes = initAudio();
        if (nodes) {
          if (nodes.ctx.state === 'suspended') {
            void nodes.ctx.resume();
          }
          nodes.masterGain.gain.cancelScheduledValues(nodes.ctx.currentTime);
          nodes.masterGain.gain.exponentialRampToValueAtTime(
            0.16,
            nodes.ctx.currentTime + 0.45
          );
        }
      } else if (nodesRef.current) {
        const { ctx, masterGain } = nodesRef.current;
        masterGain.gain.cancelScheduledValues(ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      }
      return nextMuted;
    });
  }, [initAudio]);

  useEffect(() => {
    return () => {
      if (nodesRef.current) {
        try {
          nodesRef.current.rainSource.stop();
          nodesRef.current.droneOsc.stop();
          nodesRef.current.droneSubOsc.stop();
          void nodesRef.current.ctx.close();
        } catch {
          // Ignore teardown errors on already-closed contexts
        }
        nodesRef.current = null;
      }
    };
  }, []);

  return { isMuted, toggleMute };
}
