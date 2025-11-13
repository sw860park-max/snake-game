// Main App component

import { useEffect, useRef, useState } from 'react';
import { useStore } from './state/store';
import { InputHandler } from './utils/input';
import { CanvasView } from './ui/CanvasView';
import { Hud } from './ui/Hud';
import { MainMenu, PauseMenu, GameOverMenu } from './ui/Menus';
import { Settings } from './ui/Settings';
import { Profile } from './ui/Profile';
import { MobileControls } from './ui/MobileControls';

function App() {
  const { screen, gameState, updateGame, pauseGame, changeDirection, checkDailyMissions } =
    useStore();
  const inputHandlerRef = useRef<InputHandler | null>(null);
  const animationFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect mobile/desktop
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize input handler once on mount
  useEffect(() => {
    const handler = new InputHandler((direction) => {
      const state = useStore.getState();
      if (state.screen === 'game' && state.gameState?.snake.isAlive) {
        state.changeDirection(direction);
      }
    });
    
    handler.enable();
    inputHandlerRef.current = handler;

    return () => {
      handler.disable();
    };
  }, []); // Empty dependency array - only run once

  // Check daily missions on mount
  useEffect(() => {
    checkDailyMissions();
  }, [checkDailyMissions]);

  // Game loop
  useEffect(() => {
    if (screen !== 'game' || !gameState) {
      cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    let running = true;
    lastTimeRef.current = performance.now();

    const gameLoop = (currentTime: number) => {
      if (!running) return;

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      updateGame(deltaTime);

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      running = false;
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [screen, gameState, updateGame]);

  // Add pause on space key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Escape') {
        e.preventDefault();
        if (screen === 'game') {
          pauseGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, pauseGame]);

  // Render appropriate screen
  if (screen === 'menu') {
    return <MainMenu />;
  }

  if (screen === 'settings') {
    return <Settings />;
  }

  if (screen === 'profile') {
    return <Profile />;
  }

  if (screen === 'game' && gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-2 sm:p-4 pb-24 sm:pb-4">
        <Hud gameState={gameState} onPause={pauseGame} />
        <CanvasView gameState={gameState} />
        {!isMobile && (
          <div className="mt-4 text-gray-400 text-sm">
            Use Arrow Keys or WASD • Space to Pause
          </div>
        )}
        {isMobile && (
          <MobileControls 
            onDirectionChange={changeDirection}
            disabled={!gameState.snake.isAlive || gameState.isPaused}
          />
        )}
      </div>
    );
  }

  if (screen === 'paused') {
    return (
      <>
        {gameState && (
          <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
            <Hud gameState={gameState} onPause={pauseGame} />
            <CanvasView gameState={gameState} />
          </div>
        )}
        <PauseMenu />
      </>
    );
  }

  if (screen === 'gameover') {
    return <GameOverMenu />;
  }

  return null;
}

export default App;

