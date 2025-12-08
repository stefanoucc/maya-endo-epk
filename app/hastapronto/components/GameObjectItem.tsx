import React from 'react';
import { useDrag } from 'react-dnd';

interface GameObjectItemProps {
  id: string;
  name: string;
  icon: string;
  isUsed: boolean;
  isMobile?: boolean;
  isSelected?: boolean;
  onMobileSelect?: () => void;
}

export function GameObjectItem({ id, name, icon, isUsed, isMobile = false, isSelected = false, onMobileSelect }: GameObjectItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'game-object',
    item: { id, name, icon },
    canDrag: !isUsed,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleClick = () => {
    if (isMobile && !isUsed && onMobileSelect) {
      onMobileSelect();
    }
  };

  return (
    <div
      ref={!isMobile ? (drag as unknown as React.Ref<HTMLDivElement>) : undefined}
      onClick={handleClick}
      className={`
        relative bg-gradient-to-b from-gray-100 to-gray-200 
        border-2 border-gray-400 shadow-lg transition-all duration-200
        min-h-[60px] sm:min-h-[70px] h-full p-2
        ${isUsed 
          ? 'opacity-40 cursor-not-allowed' 
          : isSelected
            ? 'shadow-xl scale-105 from-blue-100 to-blue-200 border-blue-400'
            : isDragging 
              ? 'shadow-inner transform rotate-2' 
              : isMobile
                ? 'cursor-pointer hover:from-gray-50 hover:to-gray-150 hover:shadow-xl active:scale-95'
                : 'cursor-grab hover:from-gray-50 hover:to-gray-150 hover:shadow-xl active:shadow-inner'
        }
      `}
      style={{
        borderTopColor: isSelected ? '#87CEEB' : (isUsed || isDragging ? '#808080' : '#fff'),
        borderLeftColor: isSelected ? '#87CEEB' : (isUsed || isDragging ? '#808080' : '#fff'),
        borderRightColor: isSelected ? '#1e3a8a' : (isUsed || isDragging ? '#fff' : '#808080'),
        borderBottomColor: isSelected ? '#1e3a8a' : (isUsed || isDragging ? '#fff' : '#808080')
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-1 h-full">
        <div className="text-2xl sm:text-3xl filter drop-shadow-sm">{icon}</div>
        <span className="text-xs text-gray-800 text-center leading-tight px-1 font-bold">
          {name}
        </span>
      </div>
      
      {/* Indicador de elemento retro */}
      <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-b from-red-400 to-red-600 
                      border border-red-800 flex items-center justify-center shadow-lg"
           style={{
             borderTopColor: '#ff9999',
             borderLeftColor: '#ff9999',
             borderRightColor: '#990000',
             borderBottomColor: '#990000'
           }}>
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"></div>
      </div>
    </div>
  );
}