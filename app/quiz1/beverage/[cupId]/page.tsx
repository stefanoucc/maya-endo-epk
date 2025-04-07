"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";

// Cup images
const cupImages = [
  "/quiz1/taza_1.png",
  "/quiz1/taza_2.png",
  "/quiz1/taza_3.png",
  "/quiz1/taza_4.png",
  "/quiz1/taza_5.png"
];

// Beverage options
const beverageOptions = [
  {
    id: "te",
    name: "",
    image: "/quiz1/tev2.png",
    popupImage: "/quiz1/te2v2.png",
    message: "Se acabó el té. Alguien estuvo enferma y la tuvimos que cuidar."
  },
  {
    id: "cafe",
    name: "",
    image: "/quiz1/cafe1v2.png",
    popupImage: "/quiz1/cafe2v2.png",
    message: "Se acabó el café anoche, alguien se amaneció dibujando."
  },
  {
    id: "vinotinto",
    name: "",
    image: "/quiz1/vinotintov2.png",
    popupImage: "/quiz1/vinotintov2.png",
    message: "si solo queda vino, brindemos.\n\n\"vino en taza\"\n\nprimer single del álbum.\n\nestreno en mayo de 2025."
  },
];

export default function BeverageSelectionPage({ params }: { params: { cupId: string } }) {
  const [selectedBeverage, setSelectedBeverage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupImage, setPopupImage] = useState("");
  const cupId = parseInt(params.cupId) - 1; // Convert to 0-based index
  const router = useRouter();
  
  // Validate cupId
  useEffect(() => {
    if (isNaN(cupId) || cupId < 0 || cupId >= cupImages.length) {
      router.push('/quiz1'); // Redirect to cup selection if invalid
    }
  }, [cupId, router]);
  
  // Control body scroll when popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPopup]);
  
  // Handle beverage selection
  const handleBeverageSelect = (beverageId: string) => {
    const selectedOption = beverageOptions.find(beverage => beverage.id === beverageId);
    if (selectedOption) {
      setSelectedBeverage(beverageId);
      setPopupMessage(selectedOption.message);
      setPopupImage(selectedOption.popupImage);
      setShowPopup(true);
    }
  };
  
  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };
  
  // Navigate back to cup selection
  const handleBackClick = () => {
    router.push('/quiz1');
  };
  
  // Check if cup ID is valid before rendering
  if (isNaN(cupId) || cupId < 0 || cupId >= cupImages.length) {
    return null; // Don't render anything while redirecting
  }
  
  return (
    <div className="min-h-screen bg-[#FFEFE1] flex flex-col justify-center items-center p-4 md:p-8">
      {/* Logo */}
      <div className="w-full max-w-xs mb-6 md:mb-8">
        <Image 
          src="/NUEVO LOGO.png"
          alt="Maya Endo Logo"
          width={600}
          height={600}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
      
      {/* Header with back button and cup image */}
      <div className="w-full max-w-3xl flex items-center mb-10">
        <button 
          onClick={handleBackClick}
          className="mr-4 p-2 text-[#A6050D] hover:bg-[#A6050D]/10 rounded-full transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex items-center">
          <div className="relative w-16 h-16 mr-4">
            <Image
              src={cupImages[cupId]}
              alt={`Taza ${cupId + 1}`}
              fill
              className="object-contain"
              sizes="64px"
            />
          </div>
          <h1 className="text-xl md:text-2xl text-[#A6050D] font-medium font-satoshi">
          ¿qué te gustaría servirte hoy?
          </h1>
        </div>
      </div>
      
      {/* Beverage options */}
      <div className="w-full max-w-3xl fade-in-1">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10">
          {beverageOptions.map((beverage) => (
            <div 
              key={beverage.id}
              onClick={() => handleBeverageSelect(beverage.id)}
              className={`relative aspect-square w-full max-w-[160px] xs:max-w-[180px] sm:max-w-[220px] md:max-w-[250px] mx-auto overflow-hidden rounded-md transition-transform duration-300 hover:scale-110 hover:shadow-md shadow-amber-800/10 cursor-pointer ${
                selectedBeverage === beverage.id 
                  ? 'ring-4 ring-[#A6050D] scale-105' 
                  : ''
              }`}
            >
              <Image
                src={beverage.image}
                alt={beverage.id}
                fill
                className="object-contain"
                sizes="(max-width: 480px) 160px, (max-width: 640px) 180px, (max-width: 1024px) 220px, 250px"
                priority
              />
              <p className="absolute bottom-0 left-0 right-0 text-center text-[#A6050D] font-satoshi font-medium py-2">
                {beverage.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFEFE1] p-6 rounded-2xl max-w-md w-full relative fade-in-1">
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-[#A6050D] hover:bg-[#A6050D]/10 p-1 rounded-full"
            >
              <X size={24} />
            </button>
            
            <div className="text-center pt-6">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={popupImage}
                  alt="Selected beverage"
                  fill
                  className="object-contain"
                  sizes="192px"
                />
              </div>
              
              <p className="text-[#A6050D] text-xl font-satoshi mb-6 whitespace-pre-line">{popupMessage}</p>
              
              <button 
                onClick={closePopup}
                className="bg-[#A6050D] hover:bg-[#8A0000] text-white font-satoshi font-medium py-2 px-8 rounded-full transition-colors duration-200 mt-4"
              >
                elegir otra bebida
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 