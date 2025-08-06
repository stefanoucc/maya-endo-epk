import React from 'react';
import { motion } from 'framer-motion';
import { X, Award, Star, Trophy, Music } from 'lucide-react';

interface ResultsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  correctAnswers: string[];
}

export function ResultsPanel({ isOpen, onClose, score, totalQuestions, correctAnswers }: ResultsPanelProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfectScore = score === totalQuestions;
  
  const getScoreMessage = () => {
    if (percentage >= 90) return "¡casi perfecto!";
    if (percentage >= 70) return "¡muy bien!";
    if (percentage >= 50) return "¡bien hecho!";
    return "¡sigue intentando!";
  };

  // Tracklist del álbum con emojis correspondientes a los objetos del juego
  const albumTracklist = [
    { track: 1, title: "Vino en Taza", emoji: "📸(🍷☕)" },
    { track: 2, title: "Dale Forma", emoji: "💗🧶" },
    { track: 3, title: "La Culpa", emoji: "🪧❓" },
    { track: 4, title: "Mala Suerte", emoji: "🪞💔" },
    { track: 5, title: "Efecto Mariposa", emoji: "👞🕰️" },
    { track: 6, title: "Té Verde", emoji: "🫖🍵" },
    { track: 7, title: "Mi Soledad", emoji: "🪵🔥" },
    { track: 8, title: "Respirar", emoji: "🎅📚" },
    { track: 9, title: "Fotosíntesis", emoji: "⛏️🧤" },
    { track: 10, title: "Rasguños", emoji: "🧦🌈" },
    { track: 11, title: "Hasta Pronto", emoji: "🧳💛" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        className={`bg-gray-100 border-2 border-gray-400 shadow-2xl w-full relative ${
          isPerfectScore ? 'max-w-lg' : 'max-w-md'
        }`}
        style={{
          borderTopColor: '#fff',
          borderLeftColor: '#fff',
          borderRightColor: '#808080',
          borderBottomColor: '#808080'
        }}
      >
        {/* Barra de título estilo XP */}
        <div className={`bg-gradient-to-r px-3 py-2 border-b border-gray-400 flex items-center justify-between ${
          isPerfectScore 
            ? 'from-yellow-500 to-yellow-700' 
            : 'from-blue-500 to-blue-700'
        }`}>
          <div className="flex items-center space-x-2">
            {isPerfectScore ? (
              <Trophy className="text-white" size={16} />
            ) : (
              <Award className="text-white" size={16} />
            )}
            <h2 className="text-white text-sm font-semibold">
              {isPerfectScore ? "¡Victoria Perfecta! - Tracklist Completo" : "Resultados del Juego - Mayaendo"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-4 h-4 bg-red-500 hover:bg-red-600 border border-red-700 
                       flex items-center justify-center text-xs text-white font-bold
                       transition-colors duration-200"
            style={{
              borderTopColor: '#ff9999',
              borderLeftColor: '#ff9999',
              borderRightColor: '#990000',
              borderBottomColor: '#990000'
            }}
          >
            ×
          </button>
        </div>

        {/* Contenido de la ventana */}
        <div className="p-6 bg-gray-100 space-y-4 max-h-96 overflow-y-auto">
          
          {isPerfectScore ? (
            /* Pantalla de victoria perfecta */
            <>
              {/* Celebración */}
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400 p-4 shadow-inner text-center"
                   style={{
                     borderTopColor: '#ffff99',
                     borderLeftColor: '#ffff99',
                     borderRightColor: '#cc9900',
                     borderBottomColor: '#cc9900'
                   }}>
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-2xl text-yellow-800 font-bold mb-2">
                  ¡acertaste todo!
                </div>
                <div className="text-lg text-yellow-700 font-semibold">
                  {score}/{totalQuestions} - 100% de aciertos
                </div>
              </div>

              {/* Tracklist del álbum */}
              <div className="bg-white border-2 border-gray-400 p-4 shadow-inner"
                   style={{
                     borderTopColor: '#808080',
                     borderLeftColor: '#808080',
                     borderRightColor: '#fff',
                     borderBottomColor: '#fff'
                   }}>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Music className="text-blue-600" size={20} />
                  <h3 className="text-sm text-gray-800 font-semibold">
                    TODO ESO QUE SOÑÉ
                  </h3>
                  <Music className="text-blue-600" size={20} />
                </div>
                
                <div className="space-y-1.5">
                  {albumTracklist.map((song) => (
                    <div key={song.track} 
                         className="flex items-center justify-between p-2 bg-gray-50 border border-gray-300 hover:bg-gray-100 transition-colors"
                         style={{
                           borderTopColor: '#fff',
                           borderLeftColor: '#fff',
                           borderRightColor: '#999',
                           borderBottomColor: '#999'
                         }}>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-600 font-mono w-6">
                          {String(song.track).padStart(2, '0')}.
                        </span>
                        <span className="text-sm text-gray-800 font-medium">
                          {song.title}
                        </span>
                      </div>
                      <span className="text-lg">{song.emoji}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mensaje especial */}
              <div className="bg-blue-50 border-2 border-blue-400 p-3 shadow-inner text-center"
                   style={{
                     borderTopColor: '#87CEEB',
                     borderLeftColor: '#87CEEB',
                     borderRightColor: '#1e3a8a',
                     borderBottomColor: '#1e3a8a'
                   }}>
                <p className="text-sm text-blue-800 font-medium">
                  gracias por jugar
                </p>
              </div>
            </>
          ) : (
            /* Pantalla de resultados normal */
            <>
              {/* Puntuación principal */}
              <div className="bg-white border-2 border-gray-400 p-4 shadow-inner text-center"
                   style={{
                     borderTopColor: '#808080',
                     borderLeftColor: '#808080',
                     borderRightColor: '#fff',
                     borderBottomColor: '#fff'
                   }}>
                <div className="text-3xl text-blue-800 font-bold mb-2">
                  {score} de {totalQuestions}
                </div>
                <div className="text-lg text-blue-600 mb-3 font-semibold">
                  {percentage}% de aciertos
                </div>
                
                {/* Estrellas estilo XP */}
                <div className="flex justify-center space-x-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star}
                         className={`w-6 h-6 border-2 flex items-center justify-center
                           ${star <= (percentage / 20) 
                             ? 'bg-gradient-to-b from-yellow-300 to-yellow-500 border-yellow-700' 
                             : 'bg-gradient-to-b from-gray-200 to-gray-300 border-gray-500'
                           }`}
                         style={star <= (percentage / 20) ? {
                           borderTopColor: '#ffff99',
                           borderLeftColor: '#ffff99',
                           borderRightColor: '#cc9900',
                           borderBottomColor: '#cc9900'
                         } : {
                           borderTopColor: '#fff',
                           borderLeftColor: '#fff',
                           borderRightColor: '#808080',
                           borderBottomColor: '#808080'
                         }}>
                      <Star size={12} className={star <= (percentage / 20) ? 'text-yellow-800' : 'text-gray-500'} />
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-700 font-medium">
                  {getScoreMessage()}
                </p>
              </div>

              {/* Respuestas correctas */}
              {correctAnswers.length > 0 && (
                <div className="bg-green-50 border-2 border-green-400 p-3 shadow-inner"
                     style={{
                       borderTopColor: '#90EE90',
                       borderLeftColor: '#90EE90',
                       borderRightColor: '#006400',
                       borderBottomColor: '#006400'
                     }}>
                  <h3 className="text-sm text-green-800 mb-2 font-semibold">
                    ✓ Respuestas correctas:
                  </h3>
                  <div className="text-xs text-green-700 space-y-1 max-h-24 overflow-y-auto">
                    {correctAnswers.map((answer, index) => (
                      <div key={index} className="font-medium">• {answer}</div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Botones de acción estilo XP */}
          <div className="flex space-x-2">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-gradient-to-b from-green-200 to-green-300 hover:from-green-100 hover:to-green-200 
                         text-green-800 py-3 px-4 border-2 border-green-400 font-semibold
                         shadow-lg hover:shadow-xl transition-all duration-200
                         active:shadow-inner"
              style={{
                borderTopColor: '#90EE90',
                borderLeftColor: '#90EE90',
                borderRightColor: '#006400',
                borderBottomColor: '#006400'
              }}
            >
              🎮 Jugar de Nuevo
            </button>
            
            <button
              onClick={onClose}
              className="px-4 bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-100 hover:to-gray-200 
                         text-gray-800 py-3 border-2 border-gray-400 font-semibold
                         shadow-lg hover:shadow-xl transition-all duration-200
                         active:shadow-inner"
              style={{
                borderTopColor: '#fff',
                borderLeftColor: '#fff',
                borderRightColor: '#808080',
                borderBottomColor: '#808080'
              }}
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* Esquina inferior derecha estilo XP */}
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-l border-t border-gray-600"></div>
      </motion.div>
    </div>
  );
}