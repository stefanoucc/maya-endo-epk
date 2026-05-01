"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Share2, Sparkles, X } from "lucide-react";
import AudioControls from "@/components/AudioControls";
import { useAudio } from "@/components/AudioManager";
import styles from "./MacVintageGame.module.css";

const BACKGROUND_FRAMES = [
  "/images/FRAME_1.jpg",
  "/images/FRAME_2.jpg",
  "/images/FRAME_3.jpg",
  "/images/FRAME_4.jpg",
] as const;

const FRAME_INTERVAL_MS = 500;

const MAYA_HOLA_SRC = "/audio/maya-hola.mp3";
const BIRD_SRC = "/audio/bird.mp3";
/** Imagen para compartir (móvil, Web Share API). */
const SHARE_PROMO_IMAGE_SRC = "/images/maya-taruwoshiru-14may.jpg";
const POPUP_DELAY_MS = 500;
const WAVE_REVERT_MS = 10_000;
const NOTIFICATION_MS = 1500;
const SHAKE_MS = 420;

// Orden correcto: 足るを知る
const KANJI_ORDER = ["足", "る", "を", "知", "る"] as const;
type KanjiChar = (typeof KANJI_ORDER)[number];

// Cada kanji equivale a 2 "clicks" del sistema anterior;
// 5 kanjis = 10 clicks equivalentes (totalEquivClicks)
const CLICKS_PER_KANJI = 2;
const TOTAL_EQUIV_CLICKS = KANJI_ORDER.length * CLICKS_PER_KANJI; // 10

const SFX_NOTIFICATION: Record<"viento" | "pasto" | "pajarito", string> = {
  viento: "🌬️ Viento",
  pasto: "🍃 Pasto",
  pajarito: "🐦 Pájaro",
};

const SFX_HAPTIC_MS = 50;
const HAPTIC_CORRECT_MS = 100;

/** Pulso háptico corto; respeta prefers-reduced-motion. */
function triggerHaptic(ms = SFX_HAPTIC_MS): void {
  if (typeof window === "undefined") return;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  } catch {
    /* matchMedia no disponible */
  }
  if (
    typeof navigator !== "undefined" &&
    typeof navigator.vibrate === "function"
  ) {
    try {
      navigator.vibrate(ms);
    } catch {
      /* vibrate puede fallar en iframes / políticas */
    }
  }
}

/** Baraja un array (Fisher-Yates). */
function shuffleArray<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Umbrales del escritorio proporcionales al sistema original de 15 clics.
 * Se aplican sobre los clicks equivalentes (0–10).
 */
function deskHalfOffFromClick(totalClicksNeeded: number): number {
  if (totalClicksNeeded < 1) return 1;
  return Math.max(1, Math.round((7 / 15) * totalClicksNeeded));
}

function deskFullOffFromClick(totalClicksNeeded: number): number {
  const raw = Math.round((12 / 15) * totalClicksNeeded);
  const half = deskHalfOffFromClick(totalClicksNeeded);
  const atLeast = Math.max(half + 1, raw);
  if (totalClicksNeeded <= 2) {
    return Math.min(totalClicksNeeded, atLeast);
  }
  return Math.min(totalClicksNeeded - 1, atLeast);
}

const LAST_SLIDE_FROM_CLICK = 9;

const DESK_CROSSFADE_MS = 380;

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

function DeskImageCrossfade({
  deskSrc,
  sizes,
}: {
  deskSrc: string;
  sizes: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [baseSrc, setBaseSrc] = useState(deskSrc);
  const [incomingSrc, setIncomingSrc] = useState<string | null>(null);
  const [showIncoming, setShowIncoming] = useState(false);
  const commitGenRef = useRef(0);

  useEffect(() => {
    if (deskSrc === baseSrc) return;

    if (reducedMotion) {
      commitGenRef.current += 1;
      setBaseSrc(deskSrc);
      setIncomingSrc(null);
      setShowIncoming(false);
      return undefined;
    }

    const myGen = ++commitGenRef.current;
    let alive = true;
    let rafOuter = 0;
    let rafInner = 0;

    setIncomingSrc(deskSrc);
    setShowIncoming(false);

    const startFade = () => {
      if (!alive || myGen !== commitGenRef.current) return;
      setShowIncoming(true);
    };
    rafOuter = requestAnimationFrame(() => {
      rafInner = requestAnimationFrame(startFade);
    });

    window.setTimeout(() => {
      if (!alive || myGen !== commitGenRef.current) return;
      setBaseSrc(deskSrc);
      setIncomingSrc(null);
      setShowIncoming(false);
    }, DESK_CROSSFADE_MS);

    return () => {
      alive = false;
      cancelAnimationFrame(rafOuter);
      cancelAnimationFrame(rafInner);
    };
  }, [deskSrc, baseSrc, reducedMotion]);

  const baseFading = Boolean(incomingSrc && showIncoming) && !reducedMotion;

  return (
    <div className={styles.deskCrossfadeRoot}>
      <Image
        src={baseSrc}
        alt="Mac vintage en escritorio"
        fill
        unoptimized
        className={`${styles.deskImage} ${styles.deskImageStacked} ${
          baseFading ? styles.deskImageHidden : styles.deskImageVisible
        }`}
        priority
        sizes={sizes}
      />
      {incomingSrc && !reducedMotion && (
        <Image
          src={incomingSrc}
          alt=""
          fill
          unoptimized
          className={`${styles.deskImage} ${styles.deskImageStacked} ${
            showIncoming ? styles.deskImageVisible : styles.deskImageHidden
          }`}
          sizes={sizes}
        />
      )}
    </div>
  );
}

const DESK_SRC = {
  full: "/images/COMPUTER-DESK.png",
  halfOff: "/images/COMPUTER-DESK-50PERCENTOFF.png",
  fullOff: "/images/COMPUTER-DESK-100PERCENTOFF.png",
  lastSlide: "/images/COMPUTER-DESK-LAST-SLIDE-V3.png?v=2",
  lastSlideWaving: "/images/COMPUTER-DESK-LAST-SLIDE-WAVING.png",
  postPopup: "/images/COMPUTER-DESK-POSTPOPUP.png",
} as const;

function deskImageSrc(
  clicks: number,
  totalClicksNeeded: number,
  isCompleted: boolean,
  halfFromClick: number,
  fullFromClick: number
): string {
  if (isCompleted) return DESK_SRC.lastSlide;
  if (clicks >= LAST_SLIDE_FROM_CLICK) return DESK_SRC.lastSlide;
  if (clicks >= totalClicksNeeded || clicks >= fullFromClick)
    return DESK_SRC.fullOff;
  if (clicks >= halfFromClick) return DESK_SRC.halfOff;
  return DESK_SRC.full;
}

export default function MacVintageGame() {
  // ── Kanji game state ──────────────────────────────────────────────────────
  const [placedKanjis, setPlacedKanjis] = useState<(KanjiChar | null)[]>(
    Array(5).fill(null)
  );
  const [availableKanjis, setAvailableKanjis] = useState<KanjiChar[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [shakeSlot, setShakeSlot] = useState<number | null>(null);
  const shakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Global game state ─────────────────────────────────────────────────────
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [showingWave, setShowingWave] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [postPopupClosed, setPostPopupClosed] = useState(false);
  const [easterPlayed, setEasterPlayed] = useState(false);
  const helloAudioRef = useRef<HTMLAudioElement | null>(null);
  const birdAudioRef = useRef<HTMLAudioElement | null>(null);
  const popupOpenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const waveRevertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { play, playSound } = useAudio();

  // ── Derived: progress → revelation ───────────────────────────────────────
  const placedCount = placedKanjis.filter(Boolean).length;
  const equivalentClicks = placedCount * CLICKS_PER_KANJI;

  const halfFromClick = deskHalfOffFromClick(TOTAL_EQUIV_CLICKS);
  const fullFromClick = deskFullOffFromClick(TOTAL_EQUIV_CLICKS);

  const backgroundOpacity = Math.min(1, equivalentClicks / TOTAL_EQUIV_CLICKS);

  const deskSrc = deskImageSrc(
    equivalentClicks,
    TOTAL_EQUIV_CLICKS,
    isCompleted,
    halfFromClick,
    fullFromClick
  );
  const deskSrcForView = postPopupClosed
    ? DESK_SRC.postPopup
    : isCompleted && showingWave
      ? DESK_SRC.lastSlideWaving
      : deskSrc;

  // ── Init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    setAvailableKanjis(shuffleArray(KANJI_ORDER) as KanjiChar[]);
  }, []);

  // Frame cycling (fondo animado)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % BACKGROUND_FRAMES.length);
    }, FRAME_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isCompleted) return;
    void play();
  }, [isCompleted, play]);

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current)
        clearTimeout(notificationTimeoutRef.current);
      if (popupOpenTimerRef.current) clearTimeout(popupOpenTimerRef.current);
      if (waveRevertTimerRef.current) clearTimeout(waveRevertTimerRef.current);
      if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
      helloAudioRef.current?.pause();
      birdAudioRef.current?.pause();
    };
  }, []);

  // ── Notification helper ───────────────────────────────────────────────────
  const showNotification = useCallback(
    (kind: "viento" | "pasto" | "pajarito") => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
        notificationTimeoutRef.current = null;
      }
      setNotification(SFX_NOTIFICATION[kind]);
      notificationTimeoutRef.current = setTimeout(() => {
        setNotification(null);
        notificationTimeoutRef.current = null;
      }, NOTIFICATION_MS);
    },
    []
  );

  const triggerBirdFeedback = useCallback(() => {
    let bird = birdAudioRef.current;
    if (!bird) {
      bird = new Audio(BIRD_SRC);
      bird.preload = "auto";
      birdAudioRef.current = bird;
    }
    bird.volume = 0.45;
    bird.currentTime = 0;
    void bird.play().catch(() => {});
    showNotification("pajarito");
    triggerHaptic();
  }, [showNotification]);

  const closePopupWithEffects = useCallback(() => {
    if (!showPopup) return;
    setShowPopup(false);
    setPostPopupClosed(true);
    triggerBirdFeedback();
  }, [showPopup, triggerBirdFeedback]);

  const handleDeskBirdClick = useCallback(() => {
    if (!postPopupClosed) return;
    triggerBirdFeedback();
  }, [postPopupClosed, triggerBirdFeedback]);

  /** Móvil: Web Share con imagen JPG; fallback enlace + WhatsApp. */
  const handleSharePromo = useCallback(async () => {
    if (typeof window === "undefined") return;
    const pageUrl = window.location.href;
    const shareCopy = "TARU WO SHIRU - 14 de mayo (EP)";

    try {
      const res = await fetch(SHARE_PROMO_IMAGE_SRC);
      if (!res.ok) throw new Error("share image fetch");
      const blob = await res.blob();
      const file = new File([blob], "maya-taruwoshiru-14may.jpg", {
        type: blob.type || "image/jpeg",
      });
      const withFiles: ShareData = {
        files: [file],
        title: shareCopy,
        text: shareCopy,
        url: pageUrl,
      };
      if (navigator.share && navigator.canShare?.(withFiles)) {
        await navigator.share(withFiles);
        return;
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareCopy,
          text: `${shareCopy}\n${pageUrl}`,
          url: pageUrl,
        });
        return;
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
    }

    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareCopy} ${pageUrl}`)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  // ── SFX zones ─────────────────────────────────────────────────────────────
  const handleSkyClick = useCallback(() => {
    if (!isCompleted) return;
    playSound("wind");
    showNotification("viento");
    triggerHaptic();
  }, [isCompleted, playSound, showNotification]);

  const handleGrassClick = useCallback(() => {
    if (!isCompleted) return;
    playSound("rustle");
    showNotification("pasto");
    triggerHaptic();
  }, [isCompleted, playSound, showNotification]);

  // ── Easter egg (Maya) ─────────────────────────────────────────────────────
  const handleMayaClick = useCallback(() => {
    if (!isCompleted || showingWave || easterPlayed) return;

    const el = new Audio(MAYA_HOLA_SRC);
    el.volume = 0.3;
    helloAudioRef.current = el;
    void el.play().catch(() => {});

    setEasterPlayed(true);
    setShowingWave(true);

    if (waveRevertTimerRef.current) clearTimeout(waveRevertTimerRef.current);
    waveRevertTimerRef.current = setTimeout(() => {
      setShowingWave(false);
      waveRevertTimerRef.current = null;
    }, WAVE_REVERT_MS);

    if (popupOpenTimerRef.current) clearTimeout(popupOpenTimerRef.current);
    popupOpenTimerRef.current = setTimeout(() => {
      setShowPopup(true);
      popupOpenTimerRef.current = null;
    }, POPUP_DELAY_MS);
  }, [isCompleted, showingWave, easterPlayed]);

  useEffect(() => {
    if (!showPopup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopupWithEffects();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPopup, closePopupWithEffects]);

  // ── Kanji game logic ──────────────────────────────────────────────────────
  const handleDrop = useCallback(
    (slotIndex: number, kanjiIdx: number) => {
      if (placedKanjis[slotIndex] !== null) return;
      const kanjiToPlace = availableKanjis[kanjiIdx];
      if (!kanjiToPlace) return;

      if (kanjiToPlace === KANJI_ORDER[slotIndex]) {
        // ✅ Correct
        const newPlaced = [...placedKanjis] as (KanjiChar | null)[];
        newPlaced[slotIndex] = kanjiToPlace;
        setPlacedKanjis(newPlaced);

        const newAvailable = availableKanjis.filter((_, i) => i !== kanjiIdx);
        setAvailableKanjis(newAvailable);

        playSound("bell");
        triggerHaptic(HAPTIC_CORRECT_MS);

        if (newPlaced.every((k, i) => k === KANJI_ORDER[i])) {
          setIsCompleted(true);
        }
      } else {
        // ❌ Wrong — shake
        setShakeSlot(slotIndex);
        if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
        shakeTimerRef.current = setTimeout(() => {
          setShakeSlot(null);
          shakeTimerRef.current = null;
        }, SHAKE_MS);
      }
    },
    [placedKanjis, availableKanjis, playSound]
  );

  const handleKanjiTap = useCallback((idx: number) => {
    setSelectedIdx((prev) => (prev === idx ? null : idx));
  }, []);

  const handleSlotTap = useCallback(
    (slotIndex: number) => {
      if (selectedIdx !== null) {
        handleDrop(slotIndex, selectedIdx);
        setSelectedIdx(null);
      }
    },
    [selectedIdx, handleDrop]
  );

  const completeGame = useCallback(() => {
    setPlacedKanjis([...KANJI_ORDER] as (KanjiChar | null)[]);
    setAvailableKanjis([]);
    setIsCompleted(true);
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={styles.container}>
      {notification && (
        <div
          className={styles.soundNotification}
          role="status"
          aria-live="polite"
        >
          {notification}
        </div>
      )}

      <div className={styles.heroStage}>
        {/* Fondo animado: cicla frames + se revela progresivamente */}
        <div
          className={styles.animatedBackground}
          style={{ opacity: backgroundOpacity }}
          aria-hidden
        >
          <Image
            src={BACKGROUND_FRAMES[currentFrame]}
            alt=""
            fill
            className={styles.animatedBackgroundImg}
            sizes="100vw"
            priority
          />
        </div>

        {/* Zonas SFX (solo tras completar el minijuego de kanjis) */}
        <div
          className={`${styles.skyZone} ${!isCompleted ? styles.sfxZoneDisabled : ""}`}
          onClick={handleSkyClick}
          role="presentation"
        />
        <div
          className={`${styles.grassZone} ${!isCompleted ? styles.sfxZoneDisabled : ""}`}
          onClick={handleGrassClick}
          role="presentation"
        />

        {/* Guías visuales calibración (solo móvil) */}
        <div className={styles.sfxDebugWind} aria-hidden />
        <div className={styles.sfxDebugGrass} aria-hidden />
        <div className={styles.sfxDebugHola} aria-hidden />

        {/* Escritorio Mac — por encima del overlay de texto para que Maya/pajarito reciban toque */}
        <div
          className={`${styles.deskContainer} ${isCompleted ? styles.deskContainerOnTop : ""}`}
        >
          <div
            className={`${styles.deskImageWrap} ${isCompleted ? styles.deskImageWrapInteractive : ""}`}
          >
            <div className={styles.deskImageLayer} aria-hidden>
              <DeskImageCrossfade
                deskSrc={deskSrcForView}
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
            {isCompleted && postPopupClosed && (
              <button
                type="button"
                className={styles.deskBirdClickZone}
                onClick={handleDeskBirdClick}
                aria-label="Sonido del pájaro"
              />
            )}
            {isCompleted && !easterPlayed && (
              <button
                type="button"
                className={styles.mayaClickZone}
                onClick={handleMayaClick}
                aria-label="Click para saludar a Maya"
              />
            )}
          </div>
        </div>

        {/* Overlay final de texto */}
        {isCompleted && (
          <div
            className={styles.completionMessage}
            role="dialog"
            aria-labelledby="artist-name taru-title taru-kanji"
            aria-describedby="explore-sounds-hint"
            aria-modal="true"
          >
            <div className={styles.topSection}>
              <p id="artist-name" className={styles.artistName}>
                MAYA ENDO
              </p>
              <h1 id="taru-title" className={styles.title}>
                <span className={styles.titleChunk}>TARU WO</span>
                <span className={styles.titleChunk}>SHIRU</span>
              </h1>
              <p id="taru-kanji" className={styles.kanji}>
                足るを知る
              </p>
            </div>

            <div className={styles.bottomSection}>
              <p className={styles.epLabel}>EP</p>
              <p className={styles.releaseDate}>14 mayo 2026</p>
              <p id="explore-sounds-hint" className={styles.exploreHint}>
                Explora sonidos haciendo click
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Minijuego: fuera de heroStage para evitar distorsión por scale ── */}
      {!isCompleted && (
        <>
          <div
            className={styles.topGameSection}
            role="region"
            aria-label="Ordena los caracteres en la fila superior"
          >
            <div className={styles.gameInstructionBlock}>
              <p className={styles.gameInstructionTitle}>
                Ordena los caracteres
              </p>
              <p
                className={`${styles.gameInstructionHint} ${styles.gameInstructionMobile}`}
              >
                <span className={styles.gameInstructionLine}>
                  <span className={styles.gameInstructionStep}>1</span>
                  Toca abajo un carácter (se resaltará).
                </span>
                <span className={styles.gameInstructionLine}>
                  <span className={styles.gameInstructionStep}>2</span>
                  Toca arriba la casilla con borde punteado donde va.
                </span>
              </p>
            </div>

            <div
              className={styles.slotsContainer}
              role="group"
              aria-label="Orden de izquierda a derecha: casillas para colocar cada carácter"
            >
              {KANJI_ORDER.map((expectedKanji, slotIndex) => (
                <div
                  key={`slot-${slotIndex}`}
                  className={[
                    styles.slot,
                    placedKanjis[slotIndex]
                      ? styles.slotFilled
                      : styles.slotEmpty,
                    shakeSlot === slotIndex ? styles.slotShake : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggedIdx !== null) {
                      handleDrop(slotIndex, draggedIdx);
                      setDraggedIdx(null);
                    }
                  }}
                  onClick={() => handleSlotTap(slotIndex)}
                  role="button"
                  aria-label={
                    placedKanjis[slotIndex]
                      ? `Posición ${slotIndex + 1}: ${placedKanjis[slotIndex]}`
                      : `Posición ${slotIndex + 1} vacía`
                  }
                >
                  {placedKanjis[slotIndex] ? (
                    placedKanjis[slotIndex]
                  ) : (
                    <span className={styles.slotGhost}>{expectedKanji}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.bottomGameSection}>
            <div
              className={styles.kanjisContainer}
              role="group"
              aria-label="Caracteres sueltos: elige uno y luego una casilla vacía de la fila superior"
            >
              {availableKanjis.map((kanji, idx) => (
                <div
                  key={`piece-${idx}`}
                  className={[
                    styles.kanjiPiece,
                    selectedIdx === idx ? styles.kanjiPieceSelected : "",
                    draggedIdx === idx ? styles.kanjiPieceDragging : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  draggable
                  onDragStart={() => setDraggedIdx(idx)}
                  onDragEnd={() => setDraggedIdx(null)}
                  onClick={() => handleKanjiTap(idx)}
                  role="button"
                  aria-label={`Kanji ${kanji}`}
                  aria-pressed={selectedIdx === idx}
                >
                  {kanji}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!isCompleted && (
        <button
          type="button"
          className={styles.skipButton}
          onClick={completeGame}
        >
          Saltar
        </button>
      )}

      <AudioControls show={isCompleted} />

      {isCompleted && (
        <div className={styles.shareWrap}>
          <button
            type="button"
            className={styles.shareButton}
            onClick={() => void handleSharePromo()}
            aria-label="Compartir imagen Taru wo shiru"
          >
            <span className={styles.shareIcon} aria-hidden>
              <Share2 size={18} strokeWidth={2} />
            </span>
            <span className={styles.shareLabel}>Compartir</span>
          </button>
        </div>
      )}

      {isCompleted && postPopupClosed && !showPopup && (
        <div className={styles.discoverMoreWrap}>
          <button
            type="button"
            className={styles.discoverMoreButton}
            onClick={() => setShowPopup(true)}
            aria-label="Descubrir más: abrir texto sobre Taru wo shiru"
          >
            <span className={styles.discoverMoreIcon} aria-hidden>
              <Sparkles size={18} strokeWidth={2} />
            </span>
            <span className={styles.discoverMoreLabel}>Descubrir más</span>
          </button>
        </div>
      )}

      {showPopup && (
        <div
          className={styles.popupOverlay}
          onClick={closePopupWithEffects}
          role="presentation"
        >
          <div
            className={styles.popup}
            role="dialog"
            aria-modal="true"
            aria-labelledby="eg-popup-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.popupClose}
              onClick={closePopupWithEffects}
              aria-label="Cerrar"
            >
              <X size={18} strokeWidth={2} aria-hidden />
            </button>

            <h3 id="eg-popup-title" className={styles.popupTitle}>
              Taru wo shiru
            </h3>
            <p className={styles.popupKanji}>足るを知る</p>

            <p className={styles.popupText}>
              Taru wo shiru (足るを知る) es un concepto japonés de raíz budista que
              significa &quot;saber que uno ya tiene suficiente&quot;. Se asocia a la
              frase Zen &quot;ware tada taru wo shiru&quot;, que alienta a enfocarnos
              en lo que ya tenemos en lugar de lo que nos hace falta.
            </p>

            <p className={styles.popupText}>
              Hay un detalle lingüístico precioso: los cuatro caracteres 吾唯足知
              (ware tada taru shiru, &quot;yo solo conozco la suficiencia&quot;) tienen
              un cuadrado central en común que es 口 (boca, hueco). Cada carácter está
              incompleto sin el agujero central. La metáfora es increíble: la
              suficiencia se reconoce alrededor de un vacío compartido.
            </p>

            <p className={styles.popupText}>
              Esa, quizá, es la mejor definición que se puede dar del concepto: una
              plenitud que solo existe porque acepta el vacío en su centro.
            </p>

            <p className={styles.popupTextFinal}>
              Este EP es suficiente para mi.
            </p>
            <p className={styles.popupDateLine}>14 de mayo.</p>

            <p className={styles.popupSignature}>- Maya</p>
          </div>
        </div>
      )}
    </div>
  );
}
