"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import SocialLinks from "@/components/SocialLinks";
import styles from "./TodoEsoQueSoneHome.module.css";

const PLAYLIST_ID = "PLOXBHoY1Vs6CvgltclV1S0gFWlQZd-u-y";

interface PlaylistVideo {
  id: string;
  title: string;
  thumbnail?: string;
}

type RevealKey = "logo" | "title" | "player" | "grid" | "social";

export default function TodoEsoQueSoneHome() {
  const heroRef = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const [scrollY, setScrollY] = useState(0);
  const [heroHeight, setHeroHeight] = useState(1000);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("dmdaKFtTo2k");
  const [playlistVideos] = useState<PlaylistVideo[]>([
    { id: "F_QXezs3Ue8", title: "Video 1" },
    { id: "dmdaKFtTo2k", title: "Video 2" },
    { id: "V_hpYm-jOrM", title: "Video 3" },
    { id: "Ke-SxHgeyz0", title: "Video 4" },
    { id: "HY6QKSUxfyk", title: "Video 5" },
    { id: "V_6Ld4a52Xg", title: "Video 6" },
    { id: "PeMeuHAfvrM", title: "Video 7" },
    { id: "N4GN4Kwbxpk", title: "Video 8" },
    { id: "ikgjjN5XDhU", title: "Video 9" },
    { id: "VEbASncLgRk", title: "Video 10" },
    { id: "B-xVmwya_J8", title: "Video 11" },
    { id: "GRp-H46xZIM", title: "Video 12" },
  ]);

  const [loadState, setLoadState] = useState({ min: false, hero: false });
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [iframeCrossfade, setIframeCrossfade] = useState(false);
  const [revealed, setRevealed] = useState<Record<RevealKey, boolean>>({
    logo: false,
    title: false,
    player: false,
    grid: false,
    social: false,
  });

  const hideLoader = loadState.min && loadState.hero;

  useEffect(() => {
    const minT = setTimeout(
      () => setLoadState((s) => ({ ...s, min: true })),
      520
    );
    const maxT = setTimeout(
      () => setLoadState((s) => ({ ...s, hero: true })),
      3200
    );
    return () => {
      clearTimeout(minT);
      clearTimeout(maxT);
    };
  }, []);

  useEffect(() => {
    if (!hideLoader) return undefined;
    const t = setTimeout(() => setLoaderVisible(false), 40);
    return () => clearTimeout(t);
  }, [hideLoader]);

  useEffect(() => {
    const updateHeroHeight = () => {
      setHeroHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    updateHeroHeight();
    window.addEventListener("resize", updateHeroHeight);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeroHeight);
    };
  }, []);

  useEffect(() => {
    const sections: { ref: RefObject<HTMLDivElement | null>; key: RevealKey }[] =
      [
        { ref: logoRef, key: "logo" },
        { ref: titleRef, key: "title" },
        { ref: playerRef, key: "player" },
        { ref: gridRef, key: "grid" },
        { ref: socialRef, key: "social" },
      ];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.getAttribute(
            "data-reveal-key"
          ) as RevealKey | null;
          if (key) {
            setRevealed((r) => ({ ...r, [key]: true }));
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    sections.forEach(({ ref, key }) => {
      const el = ref.current;
      if (el) {
        el.setAttribute("data-reveal-key", key);
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setIframeCrossfade(true);
    const t = setTimeout(() => setIframeCrossfade(false), 320);
    return () => clearTimeout(t);
  }, [selectedVideoId]);

  const onHeroImageLoad = useCallback(() => {
    setLoadState((s) => ({ ...s, hero: true }));
  }, []);

  const scrollProgress = Math.min(scrollY / heroHeight, 1);
  const translateY = -scrollProgress * (heroHeight * 1.2);

  const revealClass = (key: RevealKey) =>
    `${styles.reveal} ${revealed[key] ? styles.revealVisible : ""}`;

  return (
    <div className={styles.pageRoot}>
      <div
        className={`${styles.loadingOverlay} ${!loaderVisible ? styles.loadingOverlayHidden : ""}`}
        aria-hidden={!loaderVisible}
        aria-busy={loaderVisible}
        aria-label={loaderVisible ? "Cargando" : undefined}
      >
        <div className={styles.loadingCard}>
          <p className={styles.loadingTitle}>Todo Eso Que Soñé</p>
          <div className={styles.loadingBarTrack}>
            <div className={styles.loadingBarFill} />
          </div>
        </div>
      </div>

      <div
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: `url('/TEQS%20CIELO.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div className={`relative ${styles.pageInner}`} style={{ zIndex: 1 }}>
        <section
          ref={heroRef}
          className="relative h-screen w-full overflow-hidden pointer-events-none"
          style={{
            position: "relative",
            backgroundColor: "transparent",
          }}
        >
          <div
            ref={silhouetteRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              transform: `translateY(${translateY}px)`,
              willChange: "transform",
              zIndex: 2,
            }}
          >
            <div
              className="relative w-full max-w-[90vw]"
              style={{
                height: isMobile ? "131.25vh" : "87.5vh",
              }}
            >
              <Image
                src="/TEQS MAYA.png"
                alt="Maya Endo - Todo Eso Que Soñé"
                fill
                className="object-contain"
                priority
                unoptimized
                sizes="90vw"
                onLoadingComplete={onHeroImageLoad}
              />
            </div>
          </div>
        </section>

        <section
          className="relative min-h-screen py-20 px-4"
          style={{ zIndex: 1, backgroundColor: "transparent" }}
        >
          <div className="flex flex-col items-center">
            <div ref={logoRef} className={`${revealClass("logo")} w-full mb-8`}>
              <div className="container mx-auto px-4">
                <div className="flex h-48 items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Image
                      className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert w-auto h-full"
                      src="/NUEVO LOGO.png"
                      alt="Maya Endo Logo"
                      width={120}
                      height={25}
                      priority
                    />
                    <a
                      href="https://share.amuse.io/album/maya-endo-todo-eso-que-sone?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGna4SylTXjN776trFzgyCLGhw5hd1UuJb2VHrq5FMO6b5XGgynm4nrOMKpiyk_aem_FFNszL4UdnvuTai20RggNw&brid=PoF0tHRc4B3iBD9Dcr43pQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-4 bg-transparent text-white border-2 border-white py-2 px-6 rounded-full font-semibold hover:bg-white/10 text-sm ${styles.pillLink}`}
                    >
                      𝄢 escucha mi álbum debut 𝄞
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div ref={titleRef} className={`${revealClass("title")} w-full max-w-4xl mb-6`}>
              <h2 className="text-4xl md:text-6xl font-normal text-white mb-6 text-center font-instrument uppercase">
                TODO ESO QUE SOÑÉ
              </h2>
            </div>

            <div ref={playerRef} className={`${revealClass("player")} w-full max-w-4xl mb-8`}>
              <div
                className={`aspect-video mb-4 rounded-lg overflow-hidden shadow-lg ${styles.iframeWrap} ${iframeCrossfade ? styles.iframeWrapSwitching : ""}`}
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideoId}?list=${PLAYLIST_ID}&autoplay=1&mute=1&rel=0&playsinline=1`}
                  title="Maya Endo - Playlist"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  key={selectedVideoId}
                />
              </div>

              <div className="mt-4">
                <div className="mb-3 flex justify-center">
                  <a
                    href="https://www.youtube.com/watch?v=F_QXezs3Ue8&list=PLOXBHoY1Vs6CvgltclV1S0gFWlQZd-u-y&pp=gAQB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-transparent text-white border-2 border-white py-2 px-6 rounded-full font-semibold hover:bg-white/10 text-sm ${styles.pillLink}`}
                  >
                    ˙✧˖° mira la película ☆∘⁠˚⁠˳⁠°
                  </a>
                </div>
              </div>
            </div>

            <div
              ref={gridRef}
              className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full max-w-4xl mb-8 ${revealClass("grid")}`}
            >
                  {playlistVideos.map((video) => (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => setSelectedVideoId(video.id)}
                      className={`relative aspect-video rounded-lg overflow-hidden ${styles.thumbButton} ${
                        selectedVideoId === video.id
                          ? "ring-4 ring-white scale-105"
                          : "opacity-70 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={
                            video.thumbnail ||
                            `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`
                          }
                          alt={video.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-black ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {selectedVideoId === video.id && (
                        <div className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded text-xs font-semibold">
                          ▶ Reproduciendo
                        </div>
                      )}
                    </button>
                  ))}
            </div>

            <div ref={socialRef} className={`${revealClass("social")} mt-6 mb-4`}>
              <SocialLinks variant="inline" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
