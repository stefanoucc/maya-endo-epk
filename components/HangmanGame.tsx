"use client"

import React, { useState, useEffect } from 'react'

const WORD_TOP = "TODO ESO"
const WORD_BOTTOM = "QUE SOÑÉ"

// Define a smiling man SVG component
const SMILING_MAN = (
  <g key="smiling-man">
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
    <line x1="100" y1="85" x2="80" y2="75" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 25, strokeDashoffset: 25 }}/>
    <line x1="100" y1="85" x2="120" y2="75" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 25, strokeDashoffset: 25 }}/>
    
    {/* Legs */}
    <line x1="100" y1="110" x2="85" y2="130" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 25, strokeDashoffset: 25 }}/>
    <line x1="100" y1="110" x2="115" y2="130" stroke="white" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 25, strokeDashoffset: 25 }}/>
  </g>
)

export default function HangmanGame() {
  // Get all unique letters from the words
  const getAllUniqueLetters = () => {
    const allLetters = (WORD_TOP + WORD_BOTTOM).split("")
      .filter(char => char !== " ")
      .map(char => char === 'É' ? 'E' : char);
    return Array.from(new Set(allLetters));
  };
  
  // Initialize with all letters revealed
  const [guessedLetters, setGuessedLetters] = useState<string[]>(['D', 'Ñ']);
  
  useEffect(() => {
    // Simulate solving the puzzle with a delay
    const timer1 = setTimeout(() => {
      setGuessedLetters(prev => [...prev, 'T', 'O']);
    }, 500);
    
    const timer2 = setTimeout(() => {
      setGuessedLetters(prev => [...prev, 'E', 'S']);
    }, 1000);
    
    const timer3 = setTimeout(() => {
      setGuessedLetters(prev => [...prev, 'Q', 'U']);
    }, 1500);
    
    const timer4 = setTimeout(() => {
      // Reveal all remaining letters
      setGuessedLetters(getAllUniqueLetters());
    }, 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const normalizeChar = (char: string) => {
    return char === 'É' ? 'E' : char
  }

  const getMaskedWord = (word: string) => {
    return word.split("").map(letter => {
      if (letter === " ") return "\u00A0\u00A0\u00A0\u00A0"
      return guessedLetters.includes(normalizeChar(letter)) ? letter : "_"
    }).join(" ")
  }

  const maskedWordTop = getMaskedWord(WORD_TOP)
  const maskedWordBottom = getMaskedWord(WORD_BOTTOM)

  return (
    <div className="relative flex flex-col items-center gap-8 p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="text-3xl tracking-wider text-white font-instrument">
          {maskedWordTop}
        </div>
        <div className="text-3xl tracking-wider text-white font-instrument">
          {maskedWordBottom}
        </div>
      </div>

      <div className="flex justify-center relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-800 px-3 py-1 text-white font-instrument text-sm border-2 border-gray-400 rounded-md text-center min-w-[120px]">
          juego completado
        </div>
        <svg width="200" height="160" className="border-2 border-gray-400 rounded-lg p-4">
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
          {SMILING_MAN}
        </svg>
      </div>
    </div>
  )
} 