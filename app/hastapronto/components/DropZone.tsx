import React from 'react';
import { useDrop } from 'react-dnd';

interface DropZoneProps {
  id: string;
  phrase: string;
  droppedItem: { id: string; name: string; icon: string } | null;
  onDrop: (item: { id: string; name: string; icon: string }, dropZoneId: string) => void;
}

export function DropZone({ id, phrase, droppedItem, onDrop }: DropZoneProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'game-object',
    drop: (item: { id: string; name: string; icon: string }) => onDrop(item, id),
    canDrop: () => !droppedItem,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Frase misteriosa */}
      <div className="relative bg-gradient-to-r from-rose-50/80 to-amber-50/80 backdrop-blur-sm 
                      rounded-lg p-3 sm:p-4 border border-rose-200/30 shadow-sm">
        <p className="text-sm sm:text-base text-rose-800/80 font-serif italic text-center leading-relaxed">
          "{phrase}"
        </p>
        
        {/* Etiqueta de equipaje decorativa */}
        <div className="absolute -top-2 left-3 sm:left-4 w-6 h-3 sm:w-8 sm:h-4 bg-amber-100/80 rounded-sm 
                        border border-amber-300/40 flex items-center justify-center
                        transform -rotate-6">
          <div className="w-1 h-1 bg-amber-400/60 rounded-full"></div>
        </div>
      </div>

      {/* Zona de drop */}
      <div
        ref={drop}
        className={`
          min-h-[100px] sm:min-h-[120px] border-2 border-dashed rounded-xl p-4 transition-all duration-300
          ${droppedItem 
            ? 'border-emerald-300/60 bg-emerald-50/40' 
            : isOver && canDrop 
              ? 'border-blue-300/80 bg-blue-50/40 shadow-lg scale-105' 
              : 'border-amber-200/60 bg-amber-50/20'
          }
          ${!canDrop && isOver ? 'border-red-300 bg-red-50/40' : ''}
          backdrop-blur-sm relative overflow-hidden
        `}
      >
        {droppedItem ? (
          <div className="flex flex-col items-center justify-center space-y-2 h-full">
            <div className="text-4xl sm:text-5xl filter drop-shadow-sm">{droppedItem.icon}</div>
            <span className="text-xs sm:text-sm text-emerald-800/80 font-serif text-center">
              {droppedItem.name}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-amber-400/60 font-serif text-sm sm:text-base text-center px-2">
              {isOver && canDrop ? '¡Suelta aquí!' : 'Arrastra un objeto'}
            </span>
          </div>
        )}

        {/* Textura de nube sutil */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
             style={{
               backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 2px, transparent 2px),
                                radial-gradient(circle at 80% 70%, rgba(255,255,255,0.6) 1px, transparent 1px),
                                radial-gradient(circle at 40% 80%, rgba(255,255,255,0.4) 1px, transparent 1px)`
             }}>
        </div>
      </div>
    </div>
  );
}