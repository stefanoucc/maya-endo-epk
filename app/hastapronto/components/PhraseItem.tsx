import React from 'react';
import { useDrop } from 'react-dnd';

interface PhraseItemProps {
  id: string;
  phrase: string;
  droppedItem: { id: string; name: string; icon: string } | null;
  onDrop: (item: { id: string; name: string; icon: string }, dropZoneId: string) => void;
  isMobile?: boolean;
  hasSelectedObject?: boolean;
  onMobileSelect?: () => void;
}

export function PhraseItem({ id, phrase, droppedItem, onDrop, isMobile = false, hasSelectedObject = false, onMobileSelect }: PhraseItemProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'game-object',
    drop: (item: { id: string; name: string; icon: string }) => onDrop(item, id),
    canDrop: () => !droppedItem,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleClick = () => {
    if (isMobile && hasSelectedObject && !droppedItem && onMobileSelect) {
      onMobileSelect();
    }
  };

  const getBackgroundColor = () => {
    if (droppedItem) return 'from-green-100 to-green-200';
    if (isMobile && hasSelectedObject && !droppedItem) return 'from-blue-100 to-blue-200';
    if (isOver && canDrop) return 'from-blue-100 to-blue-200';
    if (!canDrop && isOver) return 'from-red-100 to-red-200';
    return 'from-yellow-50 to-yellow-100';
  };

  const getBorderColors = () => {
    if (droppedItem) return {
      borderTopColor: '#90EE90',
      borderLeftColor: '#90EE90',
      borderRightColor: '#006400',
      borderBottomColor: '#006400'
    };
    if (isMobile && hasSelectedObject && !droppedItem) return {
      borderTopColor: '#87CEEB',
      borderLeftColor: '#87CEEB',
      borderRightColor: '#1e3a8a',
      borderBottomColor: '#1e3a8a'
    };
    if (isOver && canDrop) return {
      borderTopColor: '#87CEEB',
      borderLeftColor: '#87CEEB',
      borderRightColor: '#1e3a8a',
      borderBottomColor: '#1e3a8a'
    };
    if (!canDrop && isOver) return {
      borderTopColor: '#ffb3b3',
      borderLeftColor: '#ffb3b3',
      borderRightColor: '#cc0000',
      borderBottomColor: '#cc0000'
    };
    return {
      borderTopColor: '#fff',
      borderLeftColor: '#fff',
      borderRightColor: '#d4af37',
      borderBottomColor: '#d4af37'
    };
  };

  return (
    <div
      ref={!isMobile ? drop : undefined}
      onClick={handleClick}
      className={`
        relative bg-gradient-to-b ${getBackgroundColor()}
        border-2 border-gray-400 shadow-lg transition-all duration-200
        min-h-[60px] sm:min-h-[70px] p-2
        ${isOver && canDrop ? 'shadow-xl scale-105' : ''}
        ${!canDrop && isOver ? 'shadow-inner' : ''}
        ${isMobile && hasSelectedObject && !droppedItem ? 'cursor-pointer hover:shadow-xl hover:scale-105' : ''}
      `}
      style={getBorderColors()}
    >
      <div className="flex flex-col items-center justify-center space-y-1 h-full">
        {droppedItem ? (
          <>
            <div className="text-2xl sm:text-3xl filter drop-shadow-sm">{droppedItem.icon}</div>
            <span className="text-xs text-green-800 text-center leading-tight px-1 font-medium">
              {droppedItem.name}
            </span>
          </>
        ) : (
          <>
            <div className="text-lg sm:text-2xl filter drop-shadow-sm">💭</div>
            <span className="text-xs text-gray-700 text-center leading-tight px-1 italic font-medium">
              "{phrase}"
            </span>
          </>
        )}
      </div>
      
      {/* Indicador decorativo estilo XP */}
      <div className={`
        absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 border shadow-lg
        flex items-center justify-center
        ${droppedItem 
          ? 'bg-gradient-to-b from-green-400 to-green-600 border-green-800' 
          : 'bg-gradient-to-b from-yellow-400 to-yellow-600 border-yellow-800'
        }
      `}
           style={droppedItem ? {
             borderTopColor: '#90EE90',
             borderLeftColor: '#90EE90',
             borderRightColor: '#006400',
             borderBottomColor: '#006400'
           } : {
             borderTopColor: '#ffff99',
             borderLeftColor: '#ffff99',
             borderRightColor: '#cc9900',
             borderBottomColor: '#cc9900'
           }}>
        <div className={`
          w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full
          ${droppedItem ? 'bg-white' : 'bg-white'}
        `}></div>
      </div>
      
      {/* Indicador de estado de drop estilo XP */}
      {isOver && canDrop && (
        <div className="absolute inset-0 bg-blue-300/30 border border-blue-500 flex items-center justify-center">
          <span className="text-blue-800 text-xs font-semibold bg-white px-2 py-1 border border-blue-400 shadow">
            ¡Suelta aquí!
          </span>
        </div>
      )}
      
      {/* Indicador para móvil cuando hay objeto seleccionado */}
      {isMobile && hasSelectedObject && !droppedItem && (
        <div className="absolute inset-0 bg-blue-300/20 border border-blue-400 flex items-center justify-center">
          <span className="text-blue-800 text-xs font-semibold bg-white px-2 py-1 border border-blue-400 shadow">
            👆 Toca para conectar
          </span>
        </div>
      )}
    </div>
  );
}