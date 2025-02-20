export default function SorpresaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-8">
      <div className="w-full max-w-4xl aspect-video">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/t6g2RolS9WM?autoplay=1&rel=0"
          title="Maya Endo - Teaser"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      <div className="flex gap-6 items-center">
        <a 
          href="https://www.youtube.com/@mayaendo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
        >
          <img src="/YOUTUBE.png" alt="YouTube" className="w-8 h-8 object-contain" />
        </a>
        <a 
          href="https://open.spotify.com/intl-es/artist/05swzPCeWZMjApcUBYLyyi" 
          target="_blank" 
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
        >
          <img src="/SPOTI.png" alt="Spotify" className="w-8 h-8 object-contain" />
        </a>
        <a 
          href="https://instagram.com/_mayaendo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
        >
          <img src="/INSTA.png" alt="Instagram" className="w-8 h-8 object-contain" />
        </a>
        <a 
          href="https://tiktok.com/@_mayaendo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
        >
          <img src="/TIKTOK.png" alt="TikTok" className="w-8 h-8 object-contain" />
        </a>
      </div>
    </div>
  )
} 