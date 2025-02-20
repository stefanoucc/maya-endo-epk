"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const WORD_TOP = "TODO ESO"
const WORD_BOTTOM = "QUE SOÑÉ"
const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("")

const HANGMAN_PARTS = [
  // Base
  <line key="base" x1="40" y1="140" x2="160" y2="140" stroke="black" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 120, strokeDashoffset: 120 }}/>,
  // Vertical pole
  <line key="pole" x1="60" y1="140" x2="60" y2="20" stroke="black" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 120, strokeDashoffset: 120 }}/>,
  // Top
  <line key="top" x1="60" y1="20" x2="100" y2="20" stroke="black" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 40, strokeDashoffset: 40 }}/>,
  // Head (4th attempt)
  <g key="head-group">
    <line key="rope" x1="100" y1="20" x2="100" y2="40" stroke="black" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 20, strokeDashoffset: 20 }}/>
    <circle key="head" cx="100" cy="50" r="10" stroke="black" strokeWidth="2" fill="none" className="animate-draw" style={{ strokeDasharray: 63, strokeDashoffset: 63 }}/>
  </g>,
  // Complete body (5th attempt)
  <g key="full-body">
    <line key="body" x1="100" y1="60" x2="100" y2="90" stroke="black" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 30, strokeDashoffset: 30 }}/>
    <line key="leftArm" x1="100" y1="75" x2="80" y2="85" stroke="black" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 22, strokeDashoffset: 22 }}/>
    <line key="rightArm" x1="100" y1="75" x2="120" y2="85" stroke="black" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 22, strokeDashoffset: 22 }}/>
    <line key="leftLeg" x1="100" y1="90" x2="80" y2="110" stroke="black" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 25, strokeDashoffset: 25 }}/>
    <line key="rightLeg" x1="100" y1="90" x2="120" y2="110" stroke="black" strokeWidth="2" className="animate-draw" style={{ strokeDasharray: 25, strokeDashoffset: 25 }}/>
  </g>
]

export default function HangmanGame() {
  const router = useRouter()
  const [guessedLetters, setGuessedLetters] = useState<string[]>(['D', 'Ñ'])
  const [mistakes, setMistakes] = useState(0)
  const [showLosePopup, setShowLosePopup] = useState(false)

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

  const isWon = (WORD_TOP + WORD_BOTTOM).split("").every(letter => 
    letter === " " || guessedLetters.includes(normalizeChar(letter))
  )

  const handleLetterClick = (letter: string) => {
    if (guessedLetters.includes(letter)) return
    
    setGuessedLetters([...guessedLetters, letter])
    const normalizedTop = WORD_TOP.split("").map(normalizeChar).join("")
    const normalizedBottom = WORD_BOTTOM.split("").map(normalizeChar).join("")
    
    if (!normalizedTop.includes(letter) && !normalizedBottom.includes(letter)) {
      setMistakes(prev => {
        const newMistakes = prev + 1
        if (newMistakes >= 5) {
          setTimeout(() => setShowLosePopup(true), 100)
        }
        return newMistakes
      })
    }
  }

  const resetGame = () => {
    setGuessedLetters(['D', 'Ñ'])
    setMistakes(0)
    setShowLosePopup(false)
  }

  if (isWon) {
    router.push('/sorpresa')
    return null
  }

  return (
    <div className="relative flex flex-col items-center gap-8 p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="text-5xl tracking-wider text-black font-instrument">
          {maskedWordTop}
        </div>
        <div className="text-5xl tracking-wider text-black font-instrument">
          {maskedWordBottom}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            disabled={guessedLetters.includes(letter) || mistakes >= 5 || isWon}
            className={`w-12 h-12 text-xl font-instrument transition-colors
              ${guessedLetters.includes(letter) 
                ? (WORD_TOP + WORD_BOTTOM).split("").map(normalizeChar).join("").includes(letter)
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-white border-2 border-black text-black hover:bg-gray-100"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="flex justify-center relative">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-3 text-black font-instrument text-sm border-2 border-black rounded-md">
          intentos {mistakes}/5
        </div>
        <svg width="200" height="160" className="border-2 border-black rounded-lg p-4">
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
          {HANGMAN_PARTS.slice(0, Math.min(5, mistakes + 1))}
        </svg>
      </div>

      {showLosePopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#FFF8E1] px-10 py-8 rounded-lg shadow-xl text-center relative max-w-[90%] w-[280px]">
            <img 
              src="/NUEVO LOGO.png" 
              alt="Maya Endo Logo" 
              className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-32 h-44 object-contain"
            />
            <div className="mt-10">
              <p className="text-2xl text-black font-instrument mb-6">
                 :/ ... intenta de nuevo
              </p>
              <button
                onClick={resetGame}
                className="px-6 py-2 text-lg bg-[#FDB813] text-black rounded-lg hover:bg-[#F1A900] font-instrument transition-colors"
              >
                jugar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 