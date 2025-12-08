"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, RotateCcw, Download, Share2, Music } from "lucide-react";

// Define view options
const viewOptions = [
  { id: "wildflowers", name: "campo de flores", image: "/quiz2/views/wildflowers.png", description: "la primavera eterna" },
  { id: "seaside", name: "terraza con vista al mar", image: "/quiz2/views/seaside.png", description: "lejos del reloj" },
  { id: "cozycats", name: "cuarto con gatos", image: "/quiz2/views/cozycats.png", description: "los gatos duermen mucho mejor" },
  { id: "woodcabin", name: "cabaña de madera", image: "/quiz2/views/woodcabin.png", description: "en este nido reina la calma" }
];

// Define element options
const elementOptions = [
  { id: "a", name: "gato sobre un libro", image: "/quiz2/elements/elemnt_a.png" },
  { id: "b", name: "cassette con audífonos", image: "/quiz2/elements/element_b.png" },
  { id: "c", name: "pareja de rulosos", image: "/quiz2/elements/element_c.png"  },
  { id: "d", name: "cafetera y cappuccinos", image: "/quiz2/elements/element_d.png" }
];


// (Optional) Messages for final combinations - can be expanded later
const finalMessages: { [key: string]: { title: string; message: string } } = {
  // Add more default messages or specific ones as desired
  "default": { title: "tu pequeño mundo está listo", message: "'Pequeño mundo entre 2' \n disponible \n06/06/25"}
};

export default function Quiz2Page() {
  const [currentStep, setCurrentStep] = useState<"view" | "element" | "final">("view");
  const [selectedView, setSelectedView] = useState<typeof viewOptions[0] | null>(null);
  const [selectedElement, setSelectedElement] = useState<Omit<typeof elementOptions[0], 'description'> | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState<{ title: string; description?: string; image: string } | null>(null);
  const [isSharingSupported, setIsSharingSupported] = useState(false);
  
  const handleViewSelect = (view: typeof viewOptions[0]) => {
    setSelectedView(view);
    setPopupContent({ title: view.name, description: view.description, image: view.image });
    setShowPopup(true);
  };

  const handleElementSelect = (element: Omit<typeof elementOptions[0], 'description'>) => {
    setSelectedElement(element);
    setPopupContent({ title: element.name, image: element.image });
    setShowPopup(true);
  };

  const confirmSelection = () => {
    setShowPopup(false);
    if (currentStep === "view" && selectedView) {
      setCurrentStep("element");
    } else if (currentStep === "element" && selectedElement) {
      setCurrentStep("final");
    }
  };

  const closePopupAndResetSelection = () => {
    setShowPopup(false);
    if (currentStep === "view") setSelectedView(null);
    document.body.style.overflow = 'auto';
  };
  
  const resetQuiz = () => {
    setCurrentStep("view");
    setSelectedView(null);
    setSelectedElement(null);
    setShowPopup(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === 'function') {
      // Check if navigator.share is defined and is a function.
      // The more specific navigator.canShare({ files: ...}) check happens in handleShare.
      setIsSharingSupported(true);
    } else {
      setIsSharingSupported(false); // Explicitly set to false if not supported
    }
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [showPopup]);

  const getHeadingText = () => {
    if (currentStep === "view") return {
      main: "¿dónde construirías tu pequeño mundo?",
      sub: "haz clic en una imagen para empezar"
    };
    if (currentStep === "element") return {
      main: "¿qué llevarías contigo a este lugar?",
      sub: selectedView ? `has elegido la vista: ${selectedView.name}` : "primero elige una vista"
    };
    if (currentStep === "final") return {
      main: "",
      sub: ""
    };
    return { main: "", sub: "" };
  };
  
  const heading = getHeadingText();

  const finalImageKey = selectedView && selectedElement ? `${selectedView.id}_${selectedElement.id}` : null;
  const finalImageSrc = finalImageKey ? `/quiz2/final/${finalImageKey}.png` : "/NUEVO LOGO.png";
  const finalImageFilename = finalImageKey ? `maya_endo_pequeno_mundo_${finalImageKey}.png` : "maya_endo_imagen.png";
  const finalMessage = finalImageKey && finalMessages[finalImageKey] 
    ? finalMessages[finalImageKey] 
    : (finalImageKey && finalMessages[finalImageKey.split('_')[0] + '_default']) // Try view-specific default
    || (finalImageKey && finalMessages['default_' + finalImageKey.split('_')[1]]) // Try element-specific default
    || finalMessages["default"] // Absolute default
    || { title: "resultado final", message: "aquí está la combinación de tu vista y elemento." };

  const handleDownload = () => {
    if (!finalImageSrc || finalImageSrc === "/NUEVO LOGO.png") return;
    const link = document.createElement('a');
    link.href = finalImageSrc;
    link.download = finalImageFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!finalImageSrc || finalImageSrc === "/NUEVO LOGO.png" || !isSharingSupported) return;

    try {
      // Fetch the image as a blob
      const response = await fetch(finalImageSrc);
      if (!response.ok) {
        throw new Error('Network response was not ok for fetching image.');
      }
      const blob = await response.blob();
      
      // Create a File object
      const file = new File([blob], finalImageFilename, { type: blob.type });
      
      // Check if the browser can share these files
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: finalMessage.title || "Mi Refugio Maya Endo",
          text: finalMessage.message || "Mira el refugio que creé con Maya Endo.",
          files: [file],
        });
        console.log('Image shared successfully');
      } else {
        console.log('Sharing these files is not supported.');
        // Fallback: could trigger download or show a message to manually share
        alert("Tu navegador no puede compartir esta imagen directamente. Por favor, descárgala y compártela manualmente.");
      }
    } catch (error) {
      console.error('Error sharing image:', error);
      alert("Hubo un error al intentar compartir la imagen. Por favor, descárgala y compártela manualmente.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 md:p-8 pt-10 md:pt-12">
      <div className="w-full max-w-[120px] mb-4 md:mb-6">
        <Image 
          src="/NUEVO LOGO.png"
          alt="Maya Endo Logo"
          width={200} 
          height={200}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
      
      <h1 className="text-2xl md:text-3xl text-[#3F4761] font-semibold mb-1 text-center fade-in-1 font-satoshi">
        {heading.main}
      </h1>
      {heading.sub && (
         <p className="text-md md:text-lg text-[#4A516B] mb-6 md:mb-8 text-center fade-in-1 font-satoshi">
          {heading.sub}
        </p>
      )}

      {currentStep !== "final" && (
        <div className="w-full max-w-xl lg:max-w-3xl fade-in-2 px-2 sm:px-4">
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            {(currentStep === "view" ? viewOptions : elementOptions).map((item) => (
              <SelectableItemImage 
                key={item.id}
                item={item}
                onClick={() => currentStep === "view" ? handleViewSelect(item as typeof viewOptions[0]) : handleElementSelect(item as Omit<typeof elementOptions[0], 'description'>)}
                isSelected={currentStep === 'view' ? selectedView?.id === item.id : selectedElement?.id === item.id}
              />
            ))}
          </div>
        </div>
      )}

      {currentStep === "final" && selectedView && selectedElement && (
        <div className="fade-in-2 text-center max-w-lg w-full">
          <div className="relative aspect-square w-full mx-auto overflow-hidden rounded-xl shadow-2xl mb-5 border-4 border-white/50">
            <Image
              src={finalImageSrc}
              alt={finalMessage.title}
              fill
              className="object-contain" 
              sizes="(max-width: 640px) 100vw, 600px"
              onError={() => console.error(`Error loading final image: ${finalImageSrc}`)}
              priority
            />
          </div>
          <h2 className="text-xl md:text-2xl text-[#4A3B31] font-satoshi font-semibold mb-1">
            {finalMessage.title}
          </h2>
          <p className="text-black/70 font-satoshi text-md md:text-lg mb-6">
            {finalMessage.message}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <button 
              onClick={resetQuiz}
              className="w-full sm:w-auto bg-[#7E6C5F] hover:bg-[#6A5A50] active:bg-[#584B43] text-white font-satoshi font-medium py-2.5 px-6 rounded-full transition-colors duration-200 flex items-center justify-center text-md shadow-md hover:shadow-lg"
            >
              <RotateCcw size={18} className="mr-2" />
              reintentar
            </button>
            <button 
              onClick={handleDownload}
              className="w-full sm:w-auto bg-[#5A8F7B] hover:bg-[#4A7F6B] active:bg-[#3A6F5B] text-white font-satoshi font-medium py-2.5 px-6 rounded-full transition-colors duration-200 flex items-center justify-center text-md shadow-md hover:shadow-lg"
              disabled={!finalImageKey}
            >
              <Download size={18} className="mr-2" />
              descargar
            </button>
            <button 
              onClick={handleShare}
              className="w-full sm:w-auto bg-[#4A708C] hover:bg-[#3A607C] active:bg-[#2A506C] text-white font-satoshi font-medium py-2.5 px-6 rounded-full transition-colors duration-200 flex items-center justify-center text-md shadow-md hover:shadow-lg"
              disabled={!finalImageKey || !isSharingSupported}
              title={!isSharingSupported ? "Compartir no disponible en este navegador" : "Compartir imagen"}
            >
              <Share2 size={18} className="mr-2" />
              compartir
            </button>
            <a 
              href="https://ditto.fm/pequeno-mundo-entre-2" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black font-satoshi font-medium py-2.5 px-6 rounded-full transition-colors duration-200 flex items-center justify-center text-md shadow-md hover:shadow-lg"
            >
              <Music size={18} className="mr-2" />
              escucha
            </a>
          </div>
          <p className="text-center text-sm text-black/60 mt-5 font-satoshi">
            compártelo con alguien especial
          </p>
        </div>
      )}
      
      {showPopup && popupContent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closePopupAndResetSelection}>
          <div 
            className="bg-[#cdd5f2] rounded-xl max-w-sm w-full p-5 pt-6 shadow-xl relative animate-scale-in border border-black/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closePopupAndResetSelection}
              className="absolute top-2.5 right-2.5 z-10 text-[#5A4B41] hover:text-black bg-transparent hover:bg-[#4A3B31]/10 rounded-full p-1.5 transition-colors"
              aria-label="Cerrar"
            >
              <X size={22} />
            </button>
            
            <div className="text-center">
              <div className="relative w-full aspect-video mx-auto mb-4 rounded-lg overflow-hidden shadow-md"> 
                <Image
                  src={popupContent.image}
                  alt={popupContent.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80vw, 300px"
                />
              </div>
              
              <h2 className="text-lg md:text-xl text-[#3F4761] font-satoshi font-semibold mb-1">
                {popupContent.title}
              </h2>
              
              {popupContent.description && (
                <p className="text-black/70 font-satoshi text-sm md:text-base mb-5 px-1">
                  {popupContent.description}
                </p>
              )}
              
              <div className="flex justify-center">
                <button 
                  onClick={confirmSelection}
                  className="bg-[#5A638C] hover:bg-[#4A516B] active:bg-[#3F4761] text-white font-satoshi font-semibold py-2 px-10 rounded-full transition-colors duration-200 text-md md:text-lg shadow-md hover:shadow-lg"
                >
                  confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ItemProps {
  id: string;
  name: string;
  image: string;
  description?: string;
}

function SelectableItemImage({ item, onClick, isSelected }: { item: ItemProps; onClick: () => void; isSelected: boolean }) {
  return (
    <div 
      className={`relative aspect-square w-full mx-auto overflow-hidden rounded-xl transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl focus-within:ring-4 focus-within:ring-[#5A638C]/70 ${isSelected ? 'ring-4 ring-[#5A638C] scale-105' : 'ring-2 ring-transparent hover:ring-stone-400/50'}`}
      onClick={onClick}
      title={item.name}
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <Image
        src={item.image}
        alt={item.name}
        fill
        sizes="(max-width: 640px) 45vw, 280px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-3 pt-10 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'}`}>
        <span className="text-white text-center font-satoshi font-semibold text-md md:text-lg block truncate">
          {item.name}
        </span>
      </div>
      {isSelected && (
        <div className="absolute inset-0 rounded-xl ring-4 ring-[#5A638C] ring-offset-2 ring-offset-[#cdd5f2]"></div>
      )}
    </div>
  );
} 