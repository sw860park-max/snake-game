// Canvas rendering component

import React, { useEffect, useRef } from 'react';
import { GameState } from '../game/engine';
import { Point } from '../game/grid';
import { ItemType } from '../game/items';

interface CanvasViewProps {
  gameState: GameState;
}

// Responsive cell size based on screen width
const getResponsiveCellSize = (gridWidth: number, gridHeight: number): number => {
  const isMobile = window.innerWidth < 768;
  const maxWidth = window.innerWidth - 32; // 16px padding on each side
  
  // Mobile: Reserve more space for controls (260px for controls + HUD)
  // Desktop: Reserve space for HUD only
  const maxHeight = isMobile 
    ? window.innerHeight - 340 // More space for mobile controls
    : window.innerHeight - 200; // Less space needed on desktop

  const cellSizeByWidth = Math.floor(maxWidth / gridWidth);
  const cellSizeByHeight = Math.floor(maxHeight / gridHeight);

  const cellSize = Math.min(cellSizeByWidth, cellSizeByHeight);

  // Minimum and maximum cell sizes
  return Math.max(isMobile ? 10 : 15, Math.min(cellSize, isMobile ? 18 : 25));
};

const GRID_COLOR = '#2a2a2a';
const BG_COLOR = '#1a1a1a';
const SNAKE_COLOR = '#22c55e';
const SNAKE_HEAD_COLOR = '#16a34a';

const ITEM_COLORS: Record<ItemType, string> = {
  apple: '#ef4444',
  bomb: '#f59e0b',
  slow: '#3b82f6',
  invincible: '#a855f7',
  bonus: '#fbbf24',
};

export function CanvasView({ gameState }: CanvasViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cellSize, setCellSize] = React.useState(() =>
    getResponsiveCellSize(gameState.gridWidth, gameState.gridHeight)
  );

  // Update cell size on window resize
  useEffect(() => {
    const handleResize = () => {
      setCellSize(getResponsiveCellSize(gameState.gridWidth, gameState.gridHeight));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gameState.gridWidth, gameState.gridHeight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = gameState.gridWidth * cellSize;
    canvas.height = gameState.gridHeight * cellSize;

    // Clear canvas
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid (optional on mobile for performance)
    const isMobile = window.innerWidth < 768;
    if (!isMobile || cellSize >= 18) {
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 1;
      for (let x = 0; x <= gameState.gridWidth; x++) {
        ctx.beginPath();
        ctx.moveTo(x * cellSize, 0);
        ctx.lineTo(x * cellSize, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= gameState.gridHeight; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * cellSize);
        ctx.lineTo(canvas.width, y * cellSize);
        ctx.stroke();
      }
    }

    // Draw obstacles
    if (gameState.obstacles.length > 0) {
      ctx.fillStyle = '#525252';
      gameState.obstacles.forEach((obs) => {
        drawCell(ctx, obs, '#525252', cellSize);
      });
    }

    // Draw items
    gameState.items.forEach((item) => {
      const color = ITEM_COLORS[item.type];
      drawCell(ctx, item.position, color, cellSize);

      // Draw glow effect for special items (skip on small screens for performance)
      if (item.type !== 'apple' && cellSize >= 15) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        drawCell(ctx, item.position, color, cellSize);
        ctx.shadowBlur = 0;
      }
    });

    // Draw snake body
    ctx.fillStyle = SNAKE_COLOR;
    for (let i = 1; i < gameState.snake.body.length; i++) {
      drawCell(ctx, gameState.snake.body[i], SNAKE_COLOR, cellSize);
    }

    // Draw snake head
    if (gameState.snake.body.length > 0) {
      const hasInvincible = gameState.effects.some((e) => e.type === 'invincible');
      const headColor = hasInvincible ? '#a855f7' : SNAKE_HEAD_COLOR;

      if (hasInvincible && cellSize >= 15) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#a855f7';
      }

      drawCell(ctx, gameState.snake.body[0], headColor, cellSize);
      ctx.shadowBlur = 0;
    }

    // Draw game over overlay
    if (!gameState.snake.isAlive) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#fff';
      const fontSize = Math.max(24, Math.min(32, canvas.width / 15));
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    }
  }, [gameState, cellSize]);

  return (
    <canvas
      ref={canvasRef}
      className="border-2 border-gray-700 rounded-lg shadow-2xl max-w-full"
      style={{
        imageRendering: 'pixelated',
        touchAction: 'none', // Prevent default touch behaviors
      }}
    />
  );
}

function drawCell(ctx: CanvasRenderingContext2D, point: Point, color: string, cellSize: number): void {
  ctx.fillStyle = color;
  ctx.fillRect(
    point.x * cellSize + 1,
    point.y * cellSize + 1,
    cellSize - 2,
    cellSize - 2
  );
}

