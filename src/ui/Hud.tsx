// HUD component for in-game information

import { GameState } from '../game/engine';

interface HudProps {
  gameState: GameState;
  onPause: () => void;
}

export function Hud({ gameState, onPause }: HudProps) {
  const gameTime = Math.floor((gameState.currentTime - gameState.gameStartTime) / 1000);
  const minutes = Math.floor(gameTime / 60);
  const seconds = gameTime % 60;

  const activeEffects = gameState.effects.map((effect) => {
    const remaining = Math.ceil((effect.endTime - gameState.currentTime) / 1000);
    return { type: effect.type, remaining };
  });

  const isMobile = window.innerWidth < 768;

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-3 bg-gray-800 rounded-lg shadow-lg mb-2 sm:mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        {/* Stats */}
        <div className="flex gap-3 sm:gap-6 w-full sm:w-auto justify-around sm:justify-start">
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-400">Score</div>
            <div className="text-lg sm:text-2xl font-bold text-green-400">{gameState.snake.score}</div>
          </div>
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-400">Length</div>
            <div className="text-lg sm:text-2xl font-bold text-blue-400">{gameState.snake.body.length}</div>
          </div>
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-400">Time</div>
            <div className="text-lg sm:text-2xl font-bold text-yellow-400">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Effects and Pause Button */}
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {activeEffects.length > 0 && (
            <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
              {activeEffects.map((effect, idx) => (
                <div
                  key={idx}
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                    effect.type === 'invincible'
                      ? 'bg-purple-600 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {effect.type === 'invincible' ? '🛡️' : '🐌'} {effect.remaining}s
                </div>
              ))}
            </div>
          )}

          <button
            onClick={onPause}
            className="px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white rounded-lg transition-colors text-sm sm:text-base whitespace-nowrap touch-none"
            aria-label="Pause game"
          >
            {isMobile ? '⏸️' : '⏸️ Pause'}
          </button>
        </div>
      </div>

      {/* Additional Info - Compact on mobile */}
      <div className="mt-1 sm:mt-2 flex gap-2 text-xs text-gray-400 justify-center sm:justify-start flex-wrap">
        <span>🍎 {gameState.applesEaten}</span>
        <span>•</span>
        <span>⭐ {gameState.itemsCollected}</span>
        {!isMobile && (
          <>
            <span>•</span>
            <span>Mode: {gameState.wallMode}</span>
          </>
        )}
      </div>
    </div>
  );
}

