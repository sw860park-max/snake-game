// Mobile touch controls component

import { Direction } from '../game/grid';

interface MobileControlsProps {
  onDirectionChange: (direction: Direction) => void;
  disabled?: boolean;
}

export function MobileControls({ onDirectionChange, disabled }: MobileControlsProps) {
  const handleDirection = (direction: Direction) => {
    if (!disabled) {
      onDirectionChange(direction);
    }
  };

  const buttonClass = `
    w-16 h-16 sm:w-20 sm:h-20
    bg-gray-700 hover:bg-gray-600 active:bg-green-600
    text-white text-2xl sm:text-3xl
    rounded-lg shadow-lg
    transition-all duration-150
    flex items-center justify-center
    touch-none select-none
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
  `;

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center items-end z-50 pointer-events-none pb-safe">
      <div className="pointer-events-auto bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
        {/* D-Pad Style Controls */}
        <div className="relative w-44 h-44">
          {/* Up */}
          <button
            onClick={() => handleDirection('UP')}
            onTouchStart={(e) => {
              e.preventDefault();
              handleDirection('UP');
            }}
            className={`${buttonClass} absolute top-0 left-1/2 -translate-x-1/2`}
            aria-label="Move up"
          >
            ⬆️
          </button>

          {/* Down */}
          <button
            onClick={() => handleDirection('DOWN')}
            onTouchStart={(e) => {
              e.preventDefault();
              handleDirection('DOWN');
            }}
            className={`${buttonClass} absolute bottom-0 left-1/2 -translate-x-1/2`}
            aria-label="Move down"
          >
            ⬇️
          </button>

          {/* Left */}
          <button
            onClick={() => handleDirection('LEFT')}
            onTouchStart={(e) => {
              e.preventDefault();
              handleDirection('LEFT');
            }}
            className={`${buttonClass} absolute left-0 top-1/2 -translate-y-1/2`}
            aria-label="Move left"
          >
            ⬅️
          </button>

          {/* Right */}
          <button
            onClick={() => handleDirection('RIGHT')}
            onTouchStart={(e) => {
              e.preventDefault();
              handleDirection('RIGHT');
            }}
            className={`${buttonClass} absolute right-0 top-1/2 -translate-y-1/2`}
            aria-label="Move right"
          >
            ➡️
          </button>

          {/* Center indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-800/80 rounded-full flex items-center justify-center text-lg">
            🎮
          </div>
        </div>
      </div>
    </div>
  );
}

