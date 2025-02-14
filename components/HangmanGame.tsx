"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const WORD_TOP = "TODO ESO"
const WORD_BOTTOM = "QUE SOÑÉ"
const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("")

const HANGMAN_PARTS = [
  // Base
  <line key="base" x1="40" y1="140" x2="160" y2="140" stroke="black" strokeWidth="3"/>,
  // Vertical pole
  <line key="pole" x1="60" y1="140" x2="60" y2="20" stroke="black" strokeWidth="3"/>,
  // Top
  <line key="top" x1="60" y1="20" x2="100" y2="20" stroke="black" strokeWidth="3"/>,
  // Rope
  <line key="rope" x1="100" y1="20" x2="100" y2="40" stroke="black" strokeWidth="3"/>,
  // Head
  <circle key="head" cx="100" cy="50" r="10" stroke="black" strokeWidth="3" fill="none"/>,
  // Body and rest
  <g key="body">
    <line x1="100" y1="60" x2="100" y2="90" stroke="black" strokeWidth="3"/>
    <line x1="100" y1="75" x2="80" y2="85" stroke="black" strokeWidth="3"/>
    <line x1="100" y1="75" x2="120" y2="85" stroke="black" strokeWidth="3"/>
    <line x1="100" y1="90" x2="80" y2="110" stroke="black" strokeWidth="3"/>
    <line x1="100" y1="90" x2="120" y2="110" stroke="black" strokeWidth="3"/>
  </g>
]

export default function HangmanGame() {
  const router = useRouter()
  const [guessedLetters, setGuessedLetters] = useState<string[]>(['D', 'Ñ'])
  const [mistakes, setMistakes] = useState(0)

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
      setMistakes(prev => prev + 1)
    }
  }

  const resetGame = () => {
    setGuessedLetters(['D', 'Ñ'])
    setMistakes(0)
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
            disabled={guessedLetters.includes(letter) || mistakes >= 6 || isWon}
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

      <div className="flex justify-center">
        <svg width="200" height="160" className="border-2 border-black rounded-lg p-4">
          {mistakes > 0 && HANGMAN_PARTS.slice(0, mistakes)}
        </svg>
      </div>

      {mistakes >= 6 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <p className="text-3xl text-black font-instrument mb-4">
              ¡Perdiste! 😢
            </p>
            <p className="text-lg text-black font-instrument mb-6">
              ¡No te rindas! Inténtalo de nuevo.
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-3 text-lg bg-black text-white rounded-lg hover:bg-gray-800 font-instrument"
            >
              Jugar de nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 