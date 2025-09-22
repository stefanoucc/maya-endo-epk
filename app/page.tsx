"use client";

import Image from "next/image"
import dynamic from "next/dynamic"
import { redirect } from "next/navigation"

import { useState, useEffect } from 'react';
import { Gamepad2, Ticket } from 'lucide-react';

const HangmanGame = dynamic(() => import("@/components/HangmanGame"), {
  ssr: false
})

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState<{ title?: string; description?: string; image?: string; message?: string } | null>(null);

  const openPopup = (content: { title?: string; description?: string; image?: string; message?: string }) => {
    setPopupContent(content);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupContent(null);
    document.body.style.overflow = 'auto';
  };

  const confirmPopup = () => {
    setShowPopup(false);
    setPopupContent(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [showPopup]);

  useEffect(() => {
    const timer = setTimeout(() => {
      openPopup({
        image: "/conciertosalaosma.jpg",
      });
    }, 1000); // Show after 1 second delay

    return () => clearTimeout(timer);
  }, []);

  
  // This code will run if accessed from navbar
  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/images/clouds.jpg)' }}
    >
      <div className="flex flex-col items-center bg-black/20 min-h-screen">
        <div className="w-full fade-in-1">
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
                  href="https://ditto.fm/mi-soledad-maya-endo" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 bg-transparent text-white border-2 border-white py-2 px-6 rounded-full font-semibold hover:bg-white/10 transition-colors text-sm"
                >
                  𝄢 escucha mi último single 𝄞
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="fade-in-2 w-full max-w-4xl aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/t6g2RolS9WM?autoplay=1&mute=1&rel=0&playsinline=1"
            title="Maya Endo - Teaser"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        
        <div className="mt-6 mb-4 fade-in-3 flex gap-6 items-center">
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
        
        <div className="mt-2 mb-8 fade-in-3 max-w-2xl w-full scale-90 transform">
          <HangmanGame />
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && popupContent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closePopup}>
          <div 
            className="bg-gray-100 border-2 border-gray-400 shadow-2xl max-w-lg w-full relative animate-scale-in"
            style={{
              borderTopColor: '#fff',
              borderLeftColor: '#fff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra de título estilo XP */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-3 py-2 border-b border-gray-400 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Gamepad2 className="text-white" size={16} />
                <h1 className="text-white text-sm font-semibold">
                  Mensaje Importante
                </h1>
              </div>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-gray-300 border border-gray-500 flex items-center justify-center text-xs">_</div>
                <div className="w-4 h-4 bg-gray-300 border border-gray-500 flex items-center justify-center text-xs">□</div>
                <button 
                  onClick={closePopup}
                  className="w-4 h-4 bg-red-500 border border-red-700 flex items-center justify-center text-xs text-white"
                  aria-label="Cerrar"
                >x</button>
              </div>
            </div>
            
            {/* Contenido de la ventana */}
            <div className="p-4 bg-gray-100">
              
              <div className="text-center">
                {popupContent.image && (
                  <div className="relative w-full aspect-[4/5] mx-auto mb-4 rounded-lg overflow-hidden shadow-md"> 
                    <a 
                      href="https://www.joinnus.com/events/concerts/lima-maya-endo-presenta-todo-eso-que-sone-71421"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer"
                    >
                      <Image
                        src={popupContent.image}
                        alt={popupContent.title || 'Concert Announcement'}
                        width={400} 
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                )}
                
                {popupContent.title && (
                  <h2 className="text-lg md:text-xl text-[#4A3B31] font-semibold mb-1">
                    {popupContent.title}
                  </h2>
                )}
                
                {popupContent.description && (
                  <p className="text-black/70 text-sm md:text-base mb-3 px-1">
                    {popupContent.description}
                  </p>
                )}

                {popupContent.message && (
                  <p className="text-black/70 text-sm md:text-base mb-5 px-1">
                    {popupContent.message}
                  </p>
                )}
                
                <div className="flex justify-center">
                  <a 
                    href="https://www.joinnus.com/events/concerts/lima-maya-endo-presenta-todo-eso-que-sone-71421"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={confirmPopup}
                    className="bg-[#00E5B5] text-black hover:bg-black hover:text-white active:bg-[#111111] font-semibold py-2 px-10 rounded-full transition-colors duration-200 text-md md:text-lg shadow-md hover:shadow-lg inline-block flex items-center justify-center"
                  >
                    tickets en joinnus <Ticket size={18} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

