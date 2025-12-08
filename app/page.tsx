"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from 'react';

const PLAYLIST_ID = 'PLOXBHoY1Vs6CvgltclV1S0gFWlQZd-u-y';

interface PlaylistVideo {
  id: string;
  title: string;
  thumbnail?: string;
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [heroHeight, setHeroHeight] = useState(1000);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('dmdaKFtTo2k');
  const [playlistVideos] = useState<PlaylistVideo[]>([
    { id: 'F_QXezs3Ue8', title: 'Video 1' },
    { id: 'dmdaKFtTo2k', title: 'Video 2' },
    { id: 'V_hpYm-jOrM', title: 'Video 3' },
    { id: 'Ke-SxHgeyz0', title: 'Video 4' },
    { id: 'HY6QKSUxfyk', title: 'Video 5' },
    { id: 'V_6Ld4a52Xg', title: 'Video 6' },
    { id: 'PeMeuHAfvrM', title: 'Video 7' },
    { id: 'N4GN4Kwbxpk', title: 'Video 8' },
    { id: 'ikgjjN5XDhU', title: 'Video 9' },
    { id: 'VEbASncLgRk', title: 'Video 10' },
    { id: 'B-xVmwya_J8', title: 'Video 11' },
    { id: 'GRp-H46xZIM', title: 'Video 12' },
  ]);

  useEffect(() => {
    // Videos are now manually defined in the playlistVideos state

    // Set initial hero height and check if mobile
    const updateHeroHeight = () => {
      setHeroHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
    };
    updateHeroHeight();
    window.addEventListener('resize', updateHeroHeight);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeroHeight);
    };
  }, []);

  // Calculate transform based on scroll position
  // The silhouette moves up as we scroll through the hero section (100vh)
  const scrollProgress = Math.min(scrollY / heroHeight, 1);
  // Move silhouette upward and eventually out of viewport
  // At scrollProgress = 1, it should be completely above viewport
  const translateY = -scrollProgress * (heroHeight * 1.2); // Extra 20% to ensure it leaves viewport

  return (
    <>
      {/* Fixed Sky Background - Above layout overlay */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{
          backgroundImage: `url('/TEQS%20CIELO.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      
      <div className="relative" style={{ position: 'relative', zIndex: 2 }}>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative h-screen w-full overflow-hidden"
          style={{
            position: 'relative',
            backgroundColor: 'transparent',
          }}
        >
        
        {/* Silhouette Image */}
        <div
          ref={silhouetteRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transform: `translateY(${translateY}px)`,
            willChange: 'transform',
            zIndex: 2,
          }}
        >
          <div 
            className="relative w-full max-w-[90vw]"
            style={{ 
              height: isMobile ? '131.25vh' : '87.5vh' // 50% bigger on mobile
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
            />
          </div>
        </div>
      </section>

      {/* Maya Endo Text - Small, to the right of menu icon */}
      <div className="fixed top-4 left-20 z-50 flex items-center justify-center" style={{ 
        height: '2.5rem',
        paddingTop: '0.625rem',
        paddingBottom: '0.625rem',
        lineHeight: '1'
      }}>
        <h1 className="text-[1.25rem] md:text-[1.5rem] font-normal text-white font-instrument uppercase" style={{ lineHeight: '1' }}>
          MAYA ENDO
        </h1>
      </div>

      {/* Second Section - Original Home Elements */}
      <section className="relative min-h-screen py-20 px-4" style={{ zIndex: 1, backgroundColor: 'transparent' }}>
        <div className="flex flex-col items-center">
          {/* Logo and Album Button */}
          <div className="w-full mb-8">
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
                  className="mt-4 bg-transparent text-white border-2 border-white py-2 px-6 rounded-full font-semibold hover:bg-white/10 transition-colors text-sm"
                >
                    𝄢 escucha mi álbum debut 𝄞
                </a>
                </div>
              </div>
            </div>
          </div>

          {/* Todo Eso Que Soñé Title */}
          <div className="w-full max-w-4xl mb-6">
            <h2 className="text-4xl md:text-6xl font-normal text-white mb-6 text-center font-instrument uppercase">
              TODO ESO QUE SOÑÉ
            </h2>
        </div>

          {/* Video Player */}
          <div className="w-full max-w-4xl mb-8">
            <div className="aspect-video mb-4">
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
        
            {/* Video Options */}
            <div className="mt-4">
              <div className="mb-3 flex justify-center">
                <a
                  href="https://www.youtube.com/watch?v=F_QXezs3Ue8&list=PLOXBHoY1Vs6CvgltclV1S0gFWlQZd-u-y&pp=gAQB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent text-white border-2 border-white py-2 px-6 rounded-full font-semibold hover:bg-white/10 transition-colors text-sm"
                >
                  ˙✧˖° mira la película ☆∘⁠˚⁠˳⁠°
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {playlistVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideoId(video.id)}
                    className={`relative aspect-video rounded-lg overflow-hidden transition-all duration-200 ${
                      selectedVideoId === video.id
                        ? 'ring-4 ring-white scale-105'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
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
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="mt-6 mb-4 flex gap-6 items-center">
          <a 
            href="https://www.youtube.com/@mayaendo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <Image 
              src="/YOUTUBE.png" 
              alt="YouTube" 
              width={32} 
              height={32}
              className="object-contain"
            />
          </a>
          <a 
            href="https://open.spotify.com/intl-es/artist/05swzPCeWZMjApcUBYLyyi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <Image 
              src="/SPOTI.png" 
              alt="Spotify" 
              width={32} 
              height={32}
              className="object-contain"
            />
          </a>
          <a 
            href="https://instagram.com/_mayaendo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <Image 
              src="/INSTA.png" 
              alt="Instagram" 
              width={32} 
              height={32}
              className="object-contain"
            />
          </a>
          <a 
            href="https://tiktok.com/@_mayaendo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <Image 
              src="/TIKTOK.png" 
              alt="TikTok" 
              width={32} 
              height={32}
              className="object-contain"
            />
          </a>
          <a 
            href="https://music.apple.com/pe/artist/maya-endo/1587969753" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
          >
            <Image 
              src="/APPLE MUSIC.png" 
              alt="Apple Music" 
              width={32} 
              height={32}
              className="object-contain"
            />
          </a>
        </div>

                  </div>
      </section>
      </div>
    </>
  );
}
