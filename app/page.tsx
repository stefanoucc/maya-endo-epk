import Image from "next/image"
import dynamic from "next/dynamic"
import { redirect } from "next/navigation"

const HangmanGame = dynamic(() => import("@/components/HangmanGame"), {
  ssr: false
})

export default function Home() {
  redirect('/quiz1');
  
  // Note: The code below won't run after the redirect
  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col items-center">
        <div className="w-full fade-in-1">
          <div className="container mx-auto px-4">
            <div className="flex h-48 items-center justify-center">
              <div className="relative h-32">
                <Image
                  src="/LOGO darkmode.png"
                  alt="Maya Endo Logo"
                  width={600}
                  height={600}
                  className="w-auto h-full"
                  priority
                />
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
    </div>
  )
}

