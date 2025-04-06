"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

// Define the cup images
const cupImages = [
  "/quiz1/taza_1.png",
  "/quiz1/taza_2.png",
  "/quiz1/taza_3.png",
  "/quiz1/taza_4.png",
  "/quiz1/taza_5.png"
];

// Define popup content for each cup
const cupTexts = [
  {
    title: "fuera de temporada",
    description: "elegiste la taza que no sabe en qué mes está.\n\nprobablemente seas la persona que se emociona armando el árbol y que llora con películas que terminan bien."
  },
  {
    title: "la clásica de mamá",
    description: "elegiste la taza de mamá en domingo.\n\nfamiliar, predecible… como los abrazos que importan."
  },
  {
    title: "guardián del bosque",
    description: "nadie sabe bien si esta taza es un gato, un búho o un espíritu del bosque.\n\ncomo tú, que tampoco te dejas encasillar."
  },
  {
    title: "la de expedición",
    description: "elegiste la taza que no se rompe fácil. como tú. aunque a veces te gustaría."
  },
  {
    title: "el hazmereír",
    description: "elegiste la taza que se ríe antes de que empiece el chiste.\n\ncomo tú."
  }
];

export default function Quiz1Page() {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [selectedCup, setSelectedCup] = useState<number | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };
    
    // Check on initial load
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  // Handle cup click
  const handleCupClick = (index: number) => {
    setSelectedCup(index);
    // Prevent scrolling when popup is open
    document.body.style.overflow = 'hidden';
  };
  
  // Close popup
  const closePopup = () => {
    setSelectedCup(null);
    // Restore scrolling
    document.body.style.overflow = '';
  };

  // Handle continue button click
  const handleContinue = () => {
    if (selectedCup !== null) {
      // Navigate directly to the beverage selection page
      router.push(`/quiz1/beverage/${selectedCup + 1}`);
    }
  };
  
  // Split cups differently based on screen size
  const renderCups = () => {
    if (screenSize === "mobile") {
      // On mobile, show first 4 in grid, last one centered below
      return (
        <>
          <div className="grid grid-cols-2 gap-6">
            {cupImages.slice(0, 4).map((imageSrc, index) => (
              <CupImage 
                key={index} 
                src={imageSrc} 
                index={index} 
                onClick={() => handleCupClick(index)}
              />
            ))}
          </div>
          
          {/* Last cup centered on mobile */}
          <div className="mt-6 flex justify-center">
            <CupImage 
              src={cupImages[4]} 
              index={4} 
              onClick={() => handleCupClick(4)}
            />
          </div>
        </>
      );
    } else if (screenSize === "tablet") {
      // On tablet, show 3+2 layout
      return (
        <>
          <div className="grid grid-cols-3 gap-6">
            {cupImages.slice(0, 3).map((imageSrc, index) => (
              <CupImage 
                key={index} 
                src={imageSrc} 
                index={index} 
                onClick={() => handleCupClick(index)}
              />
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="col-span-2 flex justify-center space-x-6">
              {cupImages.slice(3, 5).map((imageSrc, index) => (
                <CupImage 
                  key={index + 3} 
                  src={imageSrc} 
                  index={index + 3} 
                  onClick={() => handleCupClick(index + 3)}
                />
              ))}
            </div>
          </div>
        </>
      );
    } else {
      // On desktop, show all 5 in a single row
      return (
        <div className="grid grid-cols-5 gap-5">
          {cupImages.map((imageSrc, index) => (
            <CupImage 
              key={index} 
              src={imageSrc} 
              index={index} 
              onClick={() => handleCupClick(index)}
            />
          ))}
        </div>
      );
    }
  };
  
  return (
    <div className="min-h-screen bg-[#FFEFE1] flex flex-col justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-xs mb-6 md:mb-8">
        <Image 
          src="/NUEVO LOGO.png"
          alt="Maya Endo Logo"
          width={300}
          height={150}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
      
      <h1 className="text-xl md:text-2xl lg:text-3xl text-[#A6050D] font-medium mb-8 md:mb-12 text-center fade-in-1 font-satoshi">
        elige tu taza<br />
        la historia comienza aquí...
      </h1>
      
      <div className="w-full max-w-7xl fade-in-2 px-2 sm:px-4">
        {renderCups()}
      </div>
      
      {/* Popup */}
      {selectedCup !== null && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={closePopup}>
          <div 
            className="bg-[#FFEFE1] rounded-lg max-w-md w-full p-5 relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closePopup}
              className="absolute top-2 right-2 text-[#A6050D] hover:bg-[#A6050D]/10 rounded-full p-1"
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>
            
            <div className="pt-4 pb-4">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src={cupImages[selectedCup]}
                  alt={`Taza ${selectedCup + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
              
              <h2 className="text-xl text-[#A6050D] font-satoshi font-semibold text-center mb-4">
                {cupTexts[selectedCup].title}
              </h2>
              
              <div className="text-black font-satoshi text-base whitespace-pre-line text-center mb-6">
                {cupTexts[selectedCup].description}
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={handleContinue}
                  className="bg-[#A6050D] hover:bg-[#8A0000] text-white font-satoshi font-medium py-2 px-6 rounded-full transition-colors duration-200"
                >
                  continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Cup image component for reuse
function CupImage({ src, index, onClick }: { src: string; index: number; onClick: () => void }) {
  return (
    <div 
      className="relative aspect-square w-full max-w-[160px] xs:max-w-[180px] sm:max-w-[220px] md:max-w-[250px] mx-auto overflow-hidden rounded-md transition-transform duration-300 hover:scale-110 hover:shadow-md shadow-amber-800/10 cursor-pointer group"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={`Taza ${index + 1}`}
        fill
        sizes="(max-width: 480px) 160px, (max-width: 640px) 180px, (max-width: 1024px) 220px, 250px"
        className="object-contain"
        priority={index < 2}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-center font-satoshi font-medium px-2 text-sm sm:text-base block">
          {cupTexts[index].title}
        </span>
      </div>
    </div>
  );
} 