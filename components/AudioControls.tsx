"use client";

import { Pause, Play } from "lucide-react";
import { useAudio } from "@/components/AudioManager";
import styles from "./AudioControls.module.css";

export interface AudioControlsProps {
  /** Cuando es false, no se montan los controles (p. ej. hasta completar el minijuego). */
  show: boolean;
}

/** Un solo control: pausar / reanudar el preview del EP (esquina inferior izquierda). */
export default function AudioControls({ show }: AudioControlsProps) {
  const { togglePlayPause, isPlaying, needsUserActivation, play } = useAudio();

  if (!show) return null;

  return (
    <div className={styles.controls}>
      {needsUserActivation && (
        <p className={styles.hint} role="status">
          Click para activar audio
          <button
            type="button"
            className={styles.hintButton}
            onClick={() => void play()}
          >
            Reproducir
          </button>
        </p>
      )}
      <button
        type="button"
        className={styles.mainButton}
        onClick={() => togglePlayPause()}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        title={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        <span className={styles.icon} aria-hidden>
          {isPlaying ? (
            <Pause size={18} strokeWidth={2} />
          ) : (
            <Play size={18} strokeWidth={2} />
          )}
        </span>
        <span className={styles.label}>
          {isPlaying ? "Pausar" : "Música"}
        </span>
      </button>
    </div>
  );
}
