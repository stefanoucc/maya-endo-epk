"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function MatchCalculatorPage() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [compatibility, setCompatibility] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEasterEgg, setIsEasterEgg] = useState(false);

  const calculateCompatibility = () => {
    if (!name1.trim() || !name2.trim()) {
      setError('Por favor, ingresa ambos nombres.');
      return;
    }
    if (/\d/.test(name1) || /\d/.test(name2)) {
      setError('Los nombres no deben contener números.');
      return;
    }
    setError('');
    setIsLoading(true);
    setCompatibility(null);
    setIsEasterEgg(false);

    const name1Lower = name1.trim().toLowerCase();
    const name2Lower = name2.trim().toLowerCase();
    const mayaNames = ['maya', 'maya endo', 'fabian', 'fabian zignago'];

    setTimeout(() => {
      if (mayaNames.includes(name1Lower) || mayaNames.includes(name2Lower)) {
        setCompatibility(100);
        setIsEasterEgg(true);
      } else {
        const combined = (name1Lower + name2Lower).replace(/[^a-z]/g, '');
        let sum = 0;
        for (let i = 0; i < combined.length; i++) {
            sum += combined.charCodeAt(i);
        }
        const score = ((sum % 100) + 1) / 2;
        setCompatibility(score);
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCompatibility();
  };
  
  const isEasterEggActive = isEasterEgg && compatibility === 100;
  const bgImage = !isEasterEggActive && compatibility !== null ? "/quiz3/momento2.jpg" : "/quiz3/momento1.jpg";
  const logoSrc = compatibility !== null ? "/LOGO darkmode.png" : "/NUEVO LOGO.png";
  const logoClassName = `w-full h-auto object-contain`;

  return (
    <div 
      className="min-h-screen bg-cover bg-center font-satoshi transition-all duration-1000"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen bg-black/60 flex flex-col items-center justify-center p-4 md:p-8 pt-10 md:pt-12 relative z-10">
        <div className="w-full max-w-[120px] mb-4 md:mb-6">
          <Image 
            src={logoSrc}
            alt="Maya Endo Logo"
            width={200} 
            height={200}
            className={logoClassName}
            priority
          />
        </div>
        
        <h1 className="text-2xl md:text-3xl text-white font-semibold mb-2 text-center fade-in-1">
          calculadora de compatibilidad
        </h1>
        <p className="text-md md:text-lg text-gray-200 mb-8 md:mb-10 text-center fade-in-1">
          descubre la compatibilidad que se esconde en sus nombres
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm fade-in-2 space-y-4">
            <div className="relative">
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="Nombre 1"
                className="w-full p-4 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="Nombre 2"
                className="w-full p-4 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition-all"
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-4 px-8 rounded-lg transition-colors duration-200 disabled:bg-gray-400/50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                'analizar compatibilidad'
              )}
            </button>
          </form>

        {compatibility !== null && (
          <div className="mt-10 text-center animate-scale-in">
             {isEasterEggActive ? (
                <>
                    <p className="text-xl text-yellow-300">¡increíble compatibilidad!</p>
                    <div className="relative w-48 h-48 mx-auto mt-4 flex items-center justify-center">
                        <div className="absolute inset-0 bg-yellow-300/20 rounded-full animate-ping-slow"></div>
                        <div className="relative w-40 h-40 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-4 border-yellow-300/50">
                            <span className="text-6xl font-bold text-white">{Math.round(compatibility)}<span className="text-4xl">%</span></span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <p className="text-2xl font-bold text-white">'Mala Suerte'</p>
                        <p className="text-lg text-gray-300 mt-1">Maya Endo ft FABIAN</p>
                        <p className="text-lg text-gray-300 mt-1">20/06/2025</p>
                        <a
                            href="https://ditto.fm/mala-suerte-maya-endo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-200"
                        >
                            pre-guardar canción
                        </a>
                    </div>
                </>
             ) : (
                <>
                    <p className="text-xl text-gray-200">es evidente el mal tiempo y lugar:</p>
                    <div className="relative w-48 h-48 mx-auto mt-4 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping-slow"></div>
                    <div className="relative w-40 h-40 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border-4 border-white/50">
                        <span className="text-6xl font-bold text-white">{Math.round(compatibility)}<span className="text-4xl">%</span></span>
                    </div>
                    </div>
                    <div className="mt-8">
                        <p className="text-2xl font-bold text-white tracking-wider">'Mala Suerte'</p>
                        <p className="text-lg text-gray-300 mt-1">Maya Endo ft FABIAN</p>
                        <p className="text-lg text-gray-300 mt-1">20/06/2025</p>
                        <a
                            href="https://ditto.fm/mala-suerte-maya-endo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
                        >
                            pre-guardar canción
                        </a>
                    </div>
                </>
             )}
          </div>
        )}
      </div>
    </div>
  );
} 