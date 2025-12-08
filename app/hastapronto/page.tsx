"use client";

import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { GameObjectItem } from './components/GameObjectItem';
import { PhraseItem } from './components/PhraseItem';
import { ResultsPanel } from './components/ResultsPanel';
import { Eye, Music, Gamepad2 } from 'lucide-react';

// Detectar si es dispositivo táctil (se ejecutará en useEffect)
const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Objetos del juego
const gameObjects = [
  { id: '1', name: 'Cámara polaroid', icon: '📸🍷☕' },
  { id: '2', name: 'Corazón de lana', icon: '💗🧶' },
  { id: '3', name: 'Cartel de interrogatorio', icon: '🪧❓' },
  { id: '4', name: 'Espejo roto', icon: '🪞💔' },
  { id: '5', name: 'Zapatitos y reloj', icon: '👞🕰️' },
  { id: '6', name: 'Tazas de té', icon: '🫖🍵' },
  { id: '7', name: 'Leña', icon: '🪵🔥' },
  { id: '8', name: 'Álbumes de fotos', icon: '🎅📚' },
  { id: '9', name: 'Pala y guantes', icon: '⛏️🧤' },
  { id: '10', name: 'Medias de colores', icon: '🧦🌈' },
  { id: '11', name: 'Maleta amarilla', icon: '🧳💛' }
];

// Frases misteriosas (orden aleatorio para mayor dificultad)
const mysteriousPhrases = [
  "seré libre cuando gane y eventualmente llegue a dormir bajo una sombra en la playa cerca a brasil, pero el sol me quemó…",
  "y ahora duermes sobre lo que dije, sé que no es fácil pasarlo, como taza de té amargo",
  "hasta la próxima vez, tanto ha cambiado en un mes",
  "como una luz en el pecho, cuando todo se ha deshecho…",
  "nuestro silencio no es un asesino, es un investigador",
  "como una niña de 3 años que empieza a soñar, redescubro el sentimiento de origen natural",
  "cuando 3/4 de mi vida, los tenga atrás junto a fotos de hoy",
  "tú afectas mi suerte, y yo acepto la muerte de toda esa música que nos unió",
  "busca mi corazón en el pequeño cajón…",
  "qué extraño volverte a ver, recuerdo como si fuera ayer, cantando en navidad",
  "y me fui a caminar lejos de acá, buscando pistas en la arena…"
];

// Respuestas correctas (mapeo correcto objeto-frase independiente del orden)
const correctAnswers: { [key: string]: string } = {
  'zone-1': '9', // pala y guantes - seré libre cuando gane y eventualmente llegue a dormir bajo una sombra en la playa cerca a brasil, pero el sol me quemó…
  'zone-2': '6', // tazas de té - y ahora duermes sobre lo que dije, sé que no es fácil pasarlo, como taza de té amargo
  'zone-3': '11', // maleta amarilla - hasta la próxima vez, tanto ha cambiado en un mes
  'zone-4': '7', // leña - como una luz en el pecho, cuando todo se ha deshecho…
  'zone-5': '3', // cartel de interrogatorio - nuestro silencio no es un asesino, es un investigador
  'zone-6': '10', // medias de colores - como una niña de 3 años que empieza a soñar, redescubro el sentimiento de origen natural
  'zone-7': '1', // cámara polaroid - cuando 3/4 de mi vida, los tenga atrás junto a fotos de hoy
  'zone-8': '4', // espejo roto - tú afectas mi suerte, y yo acepto la muerte de toda esa música que nos unió
  'zone-9': '2', // corazón de lana - busca mi corazón en el pequeño cajón…
  'zone-10': '8', // álbumes de fotos - qué extraño volverte a ver, recuerdo como si fuera ayer, cantando en navidad
  'zone-11': '5', // zapatitos y reloj - y me fui a caminar lejos de acá, buscando pistas en la arena…
};

export default function HastaProntoPage() {
  const [droppedItems, setDroppedItems] = useState<{ [key: string]: { id: string; name: string; icon: string } }>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedObject, setSelectedObject] = useState<{ id: string; name: string; icon: string } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil y actualizar estado
  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768 || isTouchDevice());
      }
    };
    
    checkIsMobile();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkIsMobile);
      return () => window.removeEventListener('resize', checkIsMobile);
    }
  }, []);

  // Manejar selección de objeto en móvil
  const handleObjectSelect = (item: { id: string; name: string; icon: string }) => {
    if (isMobile) {
      setSelectedObject(item);
    }
  };

  // Manejar selección de frase en móvil
  const handlePhraseSelect = (dropZoneId: string) => {
    if (isMobile && selectedObject) {
      handleDrop(selectedObject, dropZoneId);
      setSelectedObject(null);
    }
  };

  const handleDrop = (item: { id: string; name: string; icon: string }, dropZoneId: string) => {
    setDroppedItems(prev => {
      // Remover el item de cualquier zona anterior
      const newDropped = { ...prev };
      Object.keys(newDropped).forEach(key => {
        if (newDropped[key]?.id === item.id) {
          delete newDropped[key];
        }
      });
      
      // Agregar a la nueva zona
      newDropped[dropZoneId] = item;
      return newDropped;
    });
  };

  const calculateResults = () => {
    let score = 0;
    const correctAnswersList: string[] = [];
    
    Object.keys(correctAnswers).forEach(zoneId => {
      const droppedItem = droppedItems[zoneId];
      if (droppedItem && droppedItem.id === correctAnswers[zoneId]) {
        score++;
        const phraseIndex = parseInt(zoneId.split('-')[1]) - 1;
        correctAnswersList.push(`${droppedItem.name} - "${mysteriousPhrases[phraseIndex]}"`);
      }
    });
    
    return { score, correctAnswersList };
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const getUsedObjectIds = () => {
    return Object.values(droppedItems).map(item => item.id);
  };

  // Handle body overflow when popup is shown
  useEffect(() => {
    // This useEffect is no longer needed as popup is removed
  }, []);

  // Show concert popup automatically on page load
  useEffect(() => {
    // This useEffect is no longer needed as popup is removed
  }, []);

  const { score, correctAnswersList } = calculateResults();
  const totalQuestions = 11;

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      {/* Fondo estilo Windows XP - gradiente de colinas verdes */}
      <div className="min-h-screen relative"
           style={{
             backgroundImage: 'url(/images/clouds.jpg)',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundAttachment: 'fixed'
           }}>
        


        {/* Contenedor principal estilo ventana XP */}
        <div className="relative z-10 min-h-screen p-2 sm:p-4 pt-10 md:pt-12">
          <div className="max-w-6xl mx-auto">
            
            {/* Ventana principal con estilo XP */}
            <div className="bg-gray-100 border-2 border-gray-400 shadow-2xl"
                 style={{
                   borderTopColor: '#fff',
                   borderLeftColor: '#fff',
                   borderRightColor: '#808080',
                   borderBottomColor: '#808080'
                 }}>
              
              {/* Barra de título estilo XP */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-3 py-2 border-b border-gray-400 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gamepad2 className="text-white" size={16} />
                  <h1 className="text-white text-sm font-semibold">
                    ¿qué objeto representa cada canción? adivina...
                  </h1>
                </div>
                <div className="flex space-x-1">
                  <div className="w-4 h-4 bg-gray-300 border border-gray-500 flex items-center justify-center text-xs">_</div>
                  <div className="w-4 h-4 bg-gray-300 border border-gray-500 flex items-center justify-center text-xs">□</div>
                  <div className="w-4 h-4 bg-red-500 border border-red-700 flex items-center justify-center text-xs text-white">×</div>
                </div>
              </div>

              {/* Contenido de la ventana */}
              <div className="p-4 bg-gray-100">
                
                {/* Video de YouTube */}
                <div className="max-w-lg mx-auto mb-4">
                  <div className="bg-white border-2 border-gray-400 p-2 shadow-inner"
                       style={{
                         borderTopColor: '#808080',
                         borderLeftColor: '#808080',
                         borderRightColor: '#fff',
                         borderBottomColor: '#fff'
                       }}>
                    <div className="bg-black border border-gray-500 aspect-video">
                      <iframe
                        src="https://www.youtube.com/embed/B-xVmwya_J8"
                        title="Video del juego"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                </div>
                
                {/* Panel combinado: Descripción y Progreso */}
                <div className="max-w-md mx-auto mb-4">
                  <div className="bg-white border-2 border-gray-400 p-3 shadow-inner"
                       style={{
                         borderTopColor: '#808080',
                         borderLeftColor: '#808080',
                         borderRightColor: '#fff',
                         borderBottomColor: '#fff'
                       }}>
                    {/* Descripción del juego */}
                    <div className="flex justify-center items-center space-x-2 mb-3">
                      <Music className="text-blue-600" size={20} />
                      <p className="text-sm text-gray-800 text-center">
                        {isMobile 
                          ? "Toca un objeto y luego la frase correspondiente" 
                          : (
                              <>
                                Arrastra cada objeto de la maleta de Maya hacia la frase correspondiente.<br />
                              </>
                            )
                        }
                      </p>
                      <Music className="text-blue-600" size={20} />
                    </div>
                    
                    {/* Separador visual */}
                    <div className="w-full h-px bg-gray-300 mb-3"></div>
                    
                    {/* Barra de progreso */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs text-gray-700">
                        <span>Progreso del juego:</span>
                        <span className="font-semibold">{Object.keys(droppedItems).length}/11</span>
                      </div>
                      <div className="w-full bg-gray-200 border border-gray-400 h-4 relative overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 border-r border-green-700"
                          style={{ width: `${(Object.keys(droppedItems).length / 11) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consejo de interacción estilo XP */}
                <div className="max-w-sm mx-auto mb-4">
                  <div className="bg-yellow-100 border-2 border-yellow-400 p-2 shadow-inner"
                       style={{
                         borderTopColor: '#fff',
                         borderLeftColor: '#fff',
                         borderRightColor: '#d4af37',
                         borderBottomColor: '#d4af37'
                       }}>
                    <p className="text-xs text-yellow-800 text-center">
                      {isMobile 
                        ? "💡 Toca un objeto (se resaltará) y luego toca la frase" 
                        : "💡 Mantén presionado y arrastra los elementos"
                      }
                    </p>
                  </div>
                </div>

                {/* Mostrar objeto seleccionado en móvil */}
                {isMobile && selectedObject && (
                  <div className="max-w-sm mx-auto mb-4">
                    <div className="bg-blue-100 border-2 border-blue-400 p-3 shadow-inner"
                         style={{
                           borderTopColor: '#87CEEB',
                           borderLeftColor: '#87CEEB',
                           borderRightColor: '#1e3a8a',
                           borderBottomColor: '#1e3a8a'
                         }}>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-xl">{selectedObject.icon}</span>
                        <p className="text-sm text-blue-800 font-semibold">
                          &ldquo;{selectedObject.name}&rdquo; seleccionado
                        </p>
                      </div>
                      <p className="text-xs text-blue-700 text-center mt-1">
                        Ahora toca una frase para conectar
                      </p>
                    </div>
                  </div>
                )}

                {/* Layout de dos columnas */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 items-start md:items-stretch">
                  
                  {/* Columna izquierda - Objetos */}
                  <div className="flex flex-col h-full space-y-2">
                    <div className="bg-gray-200 border-2 border-gray-400 p-2 text-center shadow-inner"
                         style={{
                           borderTopColor: '#808080',
                           borderLeftColor: '#808080',
                           borderRightColor: '#fff',
                           borderBottomColor: '#fff'
                         }}>
                      <h2 className="text-sm text-gray-800 font-semibold">objetos</h2>
                    </div>
                    
                    <div className="bg-white border-2 border-gray-400 p-2 sm:p-3 shadow-inner flex-1 flex flex-col gap-2"
                         style={{
                           borderTopColor: '#808080',
                           borderLeftColor: '#808080',
                           borderRightColor: '#fff',
                           borderBottomColor: '#fff'
                         }}>
                      {gameObjects.map((obj) => (
                        <div key={obj.id} className="flex-1 scale-90 sm:scale-100">
                          <GameObjectItem
                            id={obj.id}
                            name={obj.name}
                            icon={obj.icon}
                            isUsed={getUsedObjectIds().includes(obj.id)}
                            isMobile={isMobile}
                            isSelected={selectedObject?.id === obj.id}
                            onMobileSelect={() => handleObjectSelect(obj)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Columna derecha - Frases */}
                  <div className="flex flex-col h-full space-y-2">
                    <div className="bg-gray-200 border-2 border-gray-400 p-2 text-center shadow-inner"
                         style={{
                           borderTopColor: '#808080',
                           borderLeftColor: '#808080',
                           borderRightColor: '#fff',
                           borderBottomColor: '#fff'
                         }}>
                      <h2 className="text-sm text-gray-800 font-semibold">frases</h2>
                    </div>
                    
                    <div className="bg-white border-2 border-gray-400 p-2 sm:p-3 shadow-inner flex-1 flex flex-col gap-2"
                         style={{
                           borderTopColor: '#808080',
                           borderLeftColor: '#808080',
                           borderRightColor: '#fff',
                           borderBottomColor: '#fff'
                         }}>
                      {mysteriousPhrases.map((phrase, index) => (
                        <div key={`zone-${index + 1}`} className="flex-1 scale-90 sm:scale-100">
                          <PhraseItem
                            id={`zone-${index + 1}`}
                            phrase={phrase}
                            droppedItem={droppedItems[`zone-${index + 1}`] || null}
                            onDrop={handleDrop}
                            isMobile={isMobile}
                            hasSelectedObject={!!selectedObject}
                            onMobileSelect={() => handlePhraseSelect(`zone-${index + 1}`)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Botón flotante estilo XP */}
        <div className="fixed bottom-4 left-0 right-0 flex justify-center z-20">
          <button
            onClick={handleShowResults}
            className="bg-gradient-to-b from-blue-400/70 to-blue-600/80 hover:from-blue-500/80 hover:to-blue-700/90 
                       backdrop-blur-sm text-white px-4 py-2 sm:px-6 sm:py-3 shadow-2xl
                       border-2 border-blue-800/60 font-semibold
                       transform hover:scale-105 active:scale-95 active:shadow-inner
                       transition-all duration-200 flex items-center space-x-2"
            style={{
              borderTopColor: 'rgba(135, 206, 235, 0.8)',
              borderLeftColor: 'rgba(135, 206, 235, 0.8)',
              borderRightColor: 'rgba(30, 58, 138, 0.8)',
              borderBottomColor: 'rgba(30, 58, 138, 0.8)'
            }}
          >
            <Eye size={16} />
            <span className="text-xs sm:text-sm">Ver Resultados</span>
          </button>
        </div>

        {/* Panel de resultados */}
        <ResultsPanel
          isOpen={showResults}
          onClose={() => setShowResults(false)}
          score={score}
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswersList}
        />

      </div>
    </DndProvider>
  );
}