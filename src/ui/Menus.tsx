// Menu screens: Main menu, Pause, Game Over

import { useStore } from '../state/store';

export function MainMenu() {
  const { startGame, goToSettings, goToProfile } = useStore();
  const isMobile = window.innerWidth < 768;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-4xl sm:text-6xl font-bold text-green-400 mb-2">🐍 Snake</h1>
        <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">Classic game, modern features</p>

        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={startGame}
            className="w-full max-w-xs mx-auto px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-bold text-lg sm:text-xl rounded-lg shadow-lg transition-all transform active:scale-95 touch-none"
          >
            ▶️ Start Game
          </button>

          <button
            onClick={goToSettings}
            className="w-full max-w-xs mx-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white font-semibold text-base sm:text-lg rounded-lg shadow-lg transition-colors touch-none"
          >
            ⚙️ Settings
          </button>

          <button
            onClick={goToProfile}
            className="w-full max-w-xs mx-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white font-semibold text-base sm:text-lg rounded-lg shadow-lg transition-colors touch-none"
          >
            👤 Profile & Stats
          </button>
        </div>

        <div className="mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500 space-y-1">
          {!isMobile && <p>🎮 Use arrow keys or WASD to move</p>}
          {isMobile && <p>📱 Use on-screen controls or swipe</p>}
          <p className="text-xs text-gray-600">Best experienced on mobile devices</p>
        </div>
      </div>
    </div>
  );
}

export function PauseMenu() {
  const { resumeGame, quitToMenu } = useStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-2xl text-center max-w-sm w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">⏸️ Paused</h2>

        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={resumeGame}
            className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-bold text-lg sm:text-xl rounded-lg shadow-lg transition-colors touch-none"
          >
            ▶️ Resume
          </button>

          <button
            onClick={quitToMenu}
            className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white font-semibold text-base sm:text-lg rounded-lg shadow-lg transition-colors touch-none"
          >
            🏠 Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export function GameOverMenu() {
  const { gameState, startGame, goToMenu, rankings } = useStore();

  const finalScore = gameState?.snake.score || 0;
  const finalLength = gameState?.snake.body.length || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-2xl text-center max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-400 mb-4">Game Over!</h2>

        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
            <div>
              <div className="text-gray-400 text-xs sm:text-sm">Final Score</div>
              <div className="text-2xl sm:text-3xl font-bold text-green-400">{finalScore}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs sm:text-sm">Length</div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">{finalLength}</div>
            </div>
          </div>
        </div>

        {rankings.length > 0 && (
          <div className="bg-gray-900 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 text-left">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">🏆 Top Scores</h3>
            <div className="space-y-1 text-xs sm:text-sm">
              {rankings.slice(0, 5).map((rank, idx) => (
                <div key={idx} className="flex justify-between text-gray-300">
                  <span>
                    {idx + 1}. {rank.score} pts
                  </span>
                  <span className="text-gray-500">L: {rank.length}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={startGame}
            className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-bold text-lg sm:text-xl rounded-lg shadow-lg transition-colors touch-none"
          >
            🔄 Play Again
          </button>

          <button
            onClick={goToMenu}
            className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white font-semibold text-base sm:text-lg rounded-lg shadow-lg transition-colors touch-none"
          >
            🏠 Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}

