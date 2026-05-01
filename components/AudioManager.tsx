"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const PREVIEW_SRC = "/audio/taru-preview.m4a";
const DEFAULT_VOLUME = 0.7;

/** Solo la campanada; viento/pasto no usan este intervalo. */
const BELL_COOLDOWN_MS = 550;

/** Viento/pasto: presentes. Campana: niveles anteriores más bajos. */
const SFX_VOL_WITH_EP = 0.88;
const SFX_VOL_NO_EP = 1;
const BELL_VOL_WITH_EP = 0.12;
const BELL_VOL_NO_EP = 0.3;

export type AmbientSoundName = "wind" | "rustle" | "bell";

export type AudioContextValue = {
  play: () => Promise<void>;
  pause: () => void;
  togglePlayPause: () => void;
  toggleMute: () => void;
  playSound: (name: AmbientSoundName) => void;
  isPlaying: boolean;
  isMuted: boolean;
  needsUserActivation: boolean;
};

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const soundsRef = useRef<{
    wind: HTMLAudioElement;
    rustle: HTMLAudioElement;
    bell: HTMLAudioElement;
  } | null>(null);
  const lastBellTimeRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [needsUserActivation, setNeedsUserActivation] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = DEFAULT_VOLUME;
    el.loop = true;
  }, []);

  useEffect(() => {
    const wind = new Audio("/audio/wind.mp3");
    const rustle = new Audio("/audio/rustle.mp3");
    const bell = new Audio("/audio/new_bell.m4a");
    for (const s of [wind, rustle, bell]) {
      s.preload = "auto";
      s.muted = false;
    }
    soundsRef.current = { wind, rustle, bell };

    return () => {
      for (const s of [wind, rustle, bell]) {
        s.pause();
        s.src = "";
      }
      soundsRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const syncPlaying = () => setIsPlaying(!el.paused);
    const syncMuted = () => setIsMuted(el.muted);

    el.addEventListener("play", syncPlaying);
    el.addEventListener("playing", syncPlaying);
    el.addEventListener("pause", syncPlaying);
    el.addEventListener("volumechange", syncMuted);

    syncPlaying();
    syncMuted();

    return () => {
      el.removeEventListener("play", syncPlaying);
      el.removeEventListener("playing", syncPlaying);
      el.removeEventListener("pause", syncPlaying);
      el.removeEventListener("volumechange", syncMuted);
    };
  }, []);

  const play = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      await el.play();
      setNeedsUserActivation(false);
    } catch {
      console.log("Autoplay prevented");
      setNeedsUserActivation(true);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlayPause = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      void play();
    } else {
      pause();
    }
  }, [play, pause]);

  /** Solo afecta al preview del EP; los SFX no se silencian. */
  const toggleMute = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  }, []);

  const playSound = useCallback(
    (name: AmbientSoundName) => {
      const now = Date.now();
      if (name === "bell") {
        if (now - lastBellTimeRef.current < BELL_COOLDOWN_MS) return;
        lastBellTimeRef.current = now;
      }

      const sounds = soundsRef.current;
      if (!sounds) return;
      const sound = sounds[name];
      sound.muted = false;
      let volume: number;
      if (name === "bell") {
        volume = isPlaying ? BELL_VOL_WITH_EP : BELL_VOL_NO_EP;
      } else {
        volume = isPlaying ? SFX_VOL_WITH_EP : SFX_VOL_NO_EP;
      }
      sound.volume = volume;
      sound.currentTime = 0;
      void sound.play().catch(() => {});
    },
    [isPlaying]
  );

  const value = useMemo(
    (): AudioContextValue => ({
      play,
      pause,
      togglePlayPause,
      toggleMute,
      playSound,
      isPlaying,
      isMuted,
      needsUserActivation,
    }),
    [
      play,
      pause,
      togglePlayPause,
      toggleMute,
      playSound,
      isPlaying,
      isMuted,
      needsUserActivation,
    ]
  );

  return (
    <AudioCtx.Provider value={value}>
      <audio
        ref={audioRef}
        src={PREVIEW_SRC}
        preload="auto"
        loop
        className="pointer-events-none fixed h-px w-px overflow-hidden opacity-0"
        aria-hidden
      />
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return ctx;
}
