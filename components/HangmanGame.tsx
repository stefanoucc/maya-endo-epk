"use client"

import React, { useState } from 'react'

const WORD_TOP = "TODO ESO"
const WORD_BOTTOM = "QUE SOÑÉ"
const ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("")

const HANGMAN_PARTS = [
  // Base
  <line key="base" x1="20" y1="230" x2="180" y2="230" stroke="black" strokeWidth="4"/>,
  // Vertical pole
  <line key="pole" x1="40" y1="230" x2="40" y2="30" stroke="black" strokeWidth="4"/>,
  // Top
  <line key="top" x1="40" y1="30" x2="120" y2="30" stroke="black" strokeWidth="4"/>,
  // Rope
  <line key="rope" x1="120" y1="30" x2="120" y2="60" stroke="black" strokeWidth="4"/>,
  // Head
  <circle key="head" cx="120" cy="80" r="20" stroke="black" strokeWidth="4" fill="none"/>,
  // Body
  <line key="body" x1="120" y1="100" x2="120" y2="150" stroke="black" strokeWidth="4"/>,
  // Arms
  <g key="arms">
    <line x1="120" y1="120" x2="80" y2="140" stroke="black" strokeWidth="4"/>
    <line x1="120" y1="120" x2="160" y2="140" stroke="black" strokeWidth="4"/>
  </g>,
  // Legs
  <g key="legs">
    <line x1="120" y1="150" x2="80" y2="190" stroke="black" strokeWidth="4"/>
    <line x1="120" y1="150" x2="160" y2="190" stroke="black" strokeWidth="4"/>
  </g>
]

export default function HangmanGame() {
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

  return (
    <div className="flex flex-col items-center gap-12 p-8">
      <div className="flex flex-col items-center gap-6">
        <div className="text-6xl tracking-wider text-black font-instrument">
          {maskedWordTop}
        </div>
        <div className="text-6xl tracking-wider text-black font-instrument">
          {maskedWordBottom}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            disabled={guessedLetters.includes(letter) || mistakes >= 8 || isWon}
            className={`w-16 h-16 text-2xl font-instrument transition-colors
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
        <svg width="300" height="350" className="border-2 border-black rounded-lg p-4">
          {HANGMAN_PARTS.slice(0, mistakes)}
        </svg>
      </div>

      {(mistakes >= 8 || isWon) && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-3xl text-black font-instrument">
            {isWon ? "¡Ganaste! 🎉" : "¡Perdiste! 😢"}
          </p>
          <button
            onClick={resetGame}
            className="px-8 py-4 text-xl bg-black text-white rounded-lg hover:bg-gray-800 font-instrument"
          >
            Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  )
} 