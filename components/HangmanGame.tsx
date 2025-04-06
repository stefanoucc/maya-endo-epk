"use client"

import React, { useState, useEffect } from 'react'

const WORD = "TODO ESO QUE SOÑÉ"
const WORD_EXTENDED = "TODO ESO QUE SOÑÉ LP DEBUT"

// Define a smiling man SVG component
const SMILING_MAN = (
  <g key="smiling-man">
    {/* Hanging stick */}
    <line x1="20" y1="20" x2="20" y2="160" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 140, strokeDashoffset: 140 }}/>
    <line x1="20" y1="20" x2="100" y2="20" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 80, strokeDashoffset: 80 }}/>
    
    {/* Head */}
    <circle cx="100" cy="50" r="20" stroke="white" strokeWidth="2" fill="none" className="animate-draw" style={{ strokeDasharray: 126, strokeDashoffset: 126 }}/>
    
    {/* Smiling mouth */}
    <path d="M90,55 Q100,65 110,55" stroke="white" strokeWidth="2" fill="none" className="animate-draw" style={{ strokeDasharray: 26, strokeDashoffset: 26 }}/>
    
    {/* Eyes */}
    <circle cx="92" cy="45" r="3" stroke="white" strokeWidth="2" fill="none" className="animate-draw" style={{ strokeDasharray: 19, strokeDashoffset: 19 }}/>
    <circle cx="108" cy="45" r="3" stroke="white" strokeWidth="2" fill="none" className="animate-draw" style={{ strokeDasharray: 19, strokeDashoffset: 19 }}/>
    
    {/* Body */}
    <line x1="100" y1="70" x2="100" y2="110" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 40, strokeDashoffset: 40 }}/>
    
    {/* Arms */}
    <line x1="100" y1="85" x2="75" y2="70" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 30, strokeDashoffset: 30 }}/>
    <line x1="100" y1="85" x2="125" y2="70" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 30, strokeDashoffset: 30 }}/>
    
    {/* Legs */}
    <line x1="100" y1="110" x2="85" y2="125" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 20, strokeDashoffset: 20 }}/>
    <line x1="100" y1="110" x2="115" y2="125" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 20, strokeDashoffset: 20 }}/>
    
    {/* Feet */}
    <line x1="85" y1="125" x2="65" y2="140" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 25, strokeDashoffset: 25 }}/>
    <line x1="115" y1="125" x2="135" y2="140" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 25, strokeDashoffset: 25 }}/>
  </g>
)

// Define a sad man SVG component
const SAD_MAN = (
  <g key="sad-man">
    {/* Hanging stick */}
    <line x1="20" y1="20" x2="20" y2="160" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 140, strokeDashoffset: 140 }}/>
    <line x1="20" y1="20" x2="100" y2="20" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 80, strokeDashoffset: 80 }}/>
    
    {/* Head */}
    <circle cx="100" cy="50" r="20" stroke="white" strokeWidth="2" fill="none" className="animate-draw" style={{ strokeDasharray: 126, strokeDashoffset: 126 }}/>
    
    {/* Surprised mouth */}
    <circle cx="100" cy="60" r="5" stroke="white" strokeWidth="2" fill="none" className="animate-draw" style={{ strokeDasharray: 31, strokeDashoffset: 31 }}/>
    
    {/* Surprised eyes */}
    <circle cx="92" cy="45" r="4" stroke="white" strokeWidth="2" fill="none" className="animate-draw" style={{ strokeDasharray: 25, strokeDashoffset: 25 }}/>
    <circle cx="108" cy="45" r="4" stroke="white" strokeWidth="2" fill="none" className="animate-draw" style={{ strokeDasharray: 25, strokeDashoffset: 25 }}/>
    
    {/* Body */}
    <line x1="100" y1="70" x2="100" y2="110" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 40, strokeDashoffset: 40 }}/>
    
    {/* Arms */}
    <line x1="100" y1="85" x2="75" y2="70" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 30, strokeDashoffset: 30 }}/>
    <line x1="100" y1="85" x2="125" y2="70" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 30, strokeDashoffset: 30 }}/>
    
    {/* Legs */}
    <line x1="100" y1="110" x2="85" y2="125" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 20, strokeDashoffset: 20 }}/>
    <line x1="100" y1="110" x2="115" y2="125" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 20, strokeDashoffset: 20 }}/>
    
    {/* Feet */}
    <line x1="85" y1="125" x2="65" y2="140" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 25, strokeDashoffset: 25 }}/>
    <line x1="115" y1="125" x2="135" y2="140" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 25, strokeDashoffset: 25 }}/>
  </g>
)

export default function HangmanGame() {
  const [isSad, setIsSad] = useState(false);
  const [currentWord, setCurrentWord] = useState(WORD);
  const [isExtended, setIsExtended] = useState(false);
  
  // Initialize with all letters revealed
  const [guessedLetters, setGuessedLetters] = useState<string[]>(['D', 'Ñ']);
  const [letterOpacities, setLetterOpacities] = useState<{ [key: string]: number }>({
    'D': 1,
    'Ñ': 1
  });
  
  useEffect(() => {
    if (isExtended) return; // Don't animate if showing extended phrase

    // Simulate solving the puzzle with a gradual delay
    const timers = [
      { letters: ['D', 'Ñ'], delay: 0 },      // Initial letters
      { letters: ['T', 'O'], delay: 2000 },   // 2s
      { letters: ['E', 'S'], delay: 4000 },   // 4s
      { letters: ['Q', 'U'], delay: 6000 },   // 6s
      { letters: ['A'], delay: 8000 },        // 8s
      { letters: ['O', 'É'], delay: 10000 },  // 10s - final reveal
    ];

    const timeouts = timers.map(({ letters, delay }) => 
      setTimeout(() => {
        setGuessedLetters(prev => [...prev, ...letters]);
        // Start fade in animation for each letter
        letters.forEach(letter => {
          setLetterOpacities(prev => ({ ...prev, [letter]: 0 }));
          setTimeout(() => {
            setLetterOpacities(prev => ({ ...prev, [letter]: 1 }));
          }, 50);
        });
      }, delay)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isExtended]);

  const handleClick = () => {
    setIsSad(!isSad);
    setIsExtended(!isExtended);
    setCurrentWord(isExtended ? WORD : WORD_EXTENDED);
    
    if (!isExtended) {
      // When switching to extended phrase, show all letters immediately
      const allLetters = WORD_EXTENDED.split("").filter(char => char !== " ");
      setGuessedLetters(allLetters);
      const opacities = allLetters.reduce((acc, letter) => ({ ...acc, [letter]: 1 }), {});
      setLetterOpacities(opacities);
    } else {
      // When switching back to original phrase, reset to initial state
      setGuessedLetters(['D', 'Ñ']);
      setLetterOpacities({
        'D': 1,
        'Ñ': 1
      });
    }
  };

  const getMaskedWord = (word: string) => {
    if (isExtended) {
      // Split the extended phrase into two parts
      const [firstPart, secondPart] = word.split(" LP");
      return (
        <>
          <div className="mb-2">
            {firstPart.split("").map((letter, index) => (
              <span 
                key={index}
                style={{ 
                  opacity: letterOpacities[letter] ?? 0,
                  transition: 'opacity 0.5s ease-in-out',
                  display: 'inline-block'
                }}
              >
                {letter === " " ? "\u00A0\u00A0" : letter}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <div>
              {("LP" + secondPart).split("").map((letter, index) => (
                <span 
                  key={index}
                  style={{ 
                    opacity: letterOpacities[letter] ?? 0,
                    transition: 'opacity 0.5s ease-in-out',
                    display: 'inline-block'
                  }}
                >
                  {letter === " " ? "\u00A0\u00A0" : letter}
                </span>
              ))}
            </div>
            <div className="text-lg sm:text-xl md:text-2xl">
              Maya Endo © 2025
            </div>
          </div>
        </>
      );
    }

    return word.split("").map((letter, index) => {
      if (letter === " ") return "\u00A0\u00A0"
      if (guessedLetters.includes(letter)) {
        return (
          <span 
            key={index}
            style={{ 
              opacity: letterOpacities[letter] ?? 0,
              transition: 'opacity 0.5s ease-in-out',
              display: 'inline-block'
            }}
          >
            {letter}
          </span>
        )
      }
      return "_"
    })
  }

  const maskedWord = getMaskedWord(currentWord)

  return (
    <div className="relative flex flex-col items-center gap-8 sm:gap-12 p-2 sm:p-6">
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className={`tracking-wider text-white font-instrument text-center ${isExtended ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'}`}>
          {maskedWord}
        </div>
      </div>

      <div className="flex justify-center relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-800 px-2 sm:px-3 py-1 text-white font-instrument text-xs sm:text-sm border-2 border-gray-400 rounded-md text-center min-w-[100px] sm:min-w-[120px]">
          juego completado
        </div>
        <svg 
          viewBox="0 0 200 180" 
          className="w-[160px] h-[144px] sm:w-[200px] sm:h-[180px] border-2 border-gray-400 rounded-lg p-2 sm:p-4 cursor-pointer hover:border-gray-300 transition-colors"
          onClick={handleClick}
        >
          <defs>
            <style>
              {`
                .animate-draw {
                  animation: draw 0.5s ease-in-out forwards;
                }
                @keyframes draw {
                  to {
                    stroke-dashoffset: 0;
                  }
                }
                @font-face {
                  font-family: 'Instrument Sans';
                  src: url('/fonts/InstrumentSans-Regular.woff2') format('woff2');
                }
              `}
            </style>
          </defs>
          {isSad ? SAD_MAN : SMILING_MAN}
        </svg>
      </div>
    </div>
  )
}