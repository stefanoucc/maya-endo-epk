"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navigationLinks = [
  { href: "/?from=navbar", label: "Home", logo: "/LOGO darkmode.png" },
  { href: "/quiz1", label: "Quiz 1", logo: "/LOGO darkmode.png" },
];

export function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 p-2.5 md:p-3 bg-black/70 backdrop-blur-sm rounded-full transition-all duration-300 hover:bg-black/90 touch-manipulation shadow-md"
      aria-label="Open menu"
    >
      <Menu className="w-5 h-5 md:w-6 md:h-6 text-amber-100" />
    </button>
  );
}

export function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 z-50 p-2.5 bg-black/70 rounded-full transition-all duration-300 hover:bg-black/90 touch-manipulation shadow-md"
      aria-label="Close menu"
    >
      <X className="w-5 h-5 md:w-6 md:h-6 text-amber-100" />
    </button>
  );
}

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set active link based on current path
    const pathname = window.location.pathname;
    setActiveLink(pathname === '/' ? '/?from=navbar' : pathname);
    
    // Check if mobile view
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Run initial check
    checkIfMobile();
    
    // Close menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('[data-nav-menu]')) {
        setIsOpen(false);
      }
    };
    
    // Close menu when pressing escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    // Add event listeners
    window.addEventListener('resize', checkIfMobile);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    // Handle body scroll lock when menu is open on mobile
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);

  return (
    <>
      {/* Only show menu button when menu is closed */}
      {!isOpen && (
        <MenuButton onClick={() => setIsOpen(true)} />
      )}
      
      <div
        data-nav-menu
        className={`fixed top-0 left-0 z-40 h-full w-[85%] sm:w-[70%] max-w-[280px] transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0 shadow-lg shadow-black/50" : "-translate-x-full"
        }`}
      >
        <CloseButton onClick={() => setIsOpen(false)} />
        
        <div className="flex flex-col p-4 pt-16 h-full">
          <nav className="flex-1">
            <div className="flex flex-col items-center justify-center space-y-10 md:space-y-14 mt-4">
              {navigationLinks.map((link) => (
                <div key={link.href}>
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block transition-all duration-300 ${
                      activeLink === link.href
                        ? "scale-105 opacity-100"
                        : "opacity-75 hover:opacity-95 hover:scale-105"
                    }`}
                    aria-label={link.label}
                  >
                    <div className="relative w-48 h-16 md:w-56 md:h-18">
                      <Image
                        src={activeLink === link.href ? "/LOGO darkmode.png" : "/logo_silueta.png"}
                        alt={link.label}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 12rem, 14rem"
                        priority={activeLink === link.href}
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </nav>
          
          <div className="mt-auto pt-8 pb-6">
            <div className="flex flex-col gap-6">
              {/* First row: YouTube, Spotify, Instagram */}
              <div className="flex justify-center gap-8">
                <a 
                  href="https://www.youtube.com/@mayaendo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 p-2"
                  aria-label="YouTube"
                >
                  <Image 
                    src="/YOUTUBE.png" 
                    alt="YouTube" 
                    width={28} 
                    height={28}
                    className="object-contain w-6 h-6 md:w-7 md:h-7" 
                  />
                </a>
                <a 
                  href="https://open.spotify.com/intl-es/artist/05swzPCeWZMjApcUBYLyyi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 p-2"
                  aria-label="Spotify"
                >
                  <Image 
                    src="/SPOTI.png" 
                    alt="Spotify" 
                    width={28} 
                    height={28}
                    className="object-contain w-6 h-6 md:w-7 md:h-7" 
                  />
                </a>
                <a 
                  href="https://instagram.com/_mayaendo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 p-2"
                  aria-label="Instagram"
                >
                  <Image 
                    src="/INSTA.png" 
                    alt="Instagram" 
                    width={28} 
                    height={28}
                    className="object-contain w-6 h-6 md:w-7 md:h-7" 
                  />
                </a>
              </div>
              
              {/* Second row: TikTok, Apple Music */}
              <div className="flex justify-center gap-8">
                <a 
                  href="https://tiktok.com/@_mayaendo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 p-2"
                  aria-label="TikTok"
                >
                  <Image 
                    src="/TIKTOK.png" 
                    alt="TikTok" 
                    width={28} 
                    height={28}
                    className="object-contain w-6 h-6 md:w-7 md:h-7" 
                  />
                </a>
                <a 
                  href="https://music.apple.com/pe/artist/maya-endo/1587969753" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110 p-2"
                  aria-label="Apple Music"
                >
                  <Image 
                    src="/APPLE MUSIC.png" 
                    alt="Apple Music" 
                    width={28} 
                    height={28}
                    className="object-contain w-6 h-6 md:w-7 md:h-7" 
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay when menu is open */}
      <div 
        className={`fixed inset-0 bg-black/60 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
    </>
  );
} 