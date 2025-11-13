// Game loop and tick management

import {
  SnakeState,
  WallMode,
  moveSnake,
  checkSelfCollision,
  checkObstacleCollision,
  growSnake,
  addScore,
  isHeadAtPoint,
} from './snake';
import { Point, getRandomEmptyPoint } from './grid';
import { Item, spawnRandomItem, isItemExpired, getItemEffect } from './items';

export interface GameState {
  snake: SnakeState;
  items: Item[];
  obstacles: Point[];
  gridWidth: number;
  gridHeight: number;
  wallMode: WallMode;
  tickRate: number; // ticks per second
  lastTickTime: number;
  currentTime: number;
  isPaused: boolean;
  gameStartTime: number;
  applesEaten: number;
  itemsCollected: number;
  effects: ActiveEffect[];
}

export interface ActiveEffect {
  type: string;
  endTime: number;
}

export function createGameState(
  gridWidth: number,
  gridHeight: number,
  wallMode: WallMode,
  tickRate: number
): GameState {
  const startX = Math.floor(gridWidth / 2);
  const startY = Math.floor(gridHeight / 2);

  const snake: SnakeState = {
    body: [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ],
    direction: 'RIGHT',
    pendingDirection: null,
    isAlive: true,
    score: 0,
    growthPending: 0,
  };

  const obstacles: Point[] = [];
  if (wallMode === 'obstacles') {
    // Add some random obstacles
    for (let i = 0; i < Math.floor((gridWidth * gridHeight) / 20); i++) {
      const pos = getRandomEmptyPoint(gridWidth, gridHeight, [...snake.body, ...obstacles]);
      if (pos) obstacles.push(pos);
    }
  }

  const currentTime = Date.now();
  const firstItem = spawnRandomItem([...snake.body, ...obstacles], gridWidth, gridHeight, currentTime);

  return {
    snake,
    items: firstItem ? [firstItem] : [],
    obstacles,
    gridWidth,
    gridHeight,
    wallMode,
    tickRate,
    lastTickTime: currentTime,
    currentTime,
    isPaused: false,
    gameStartTime: currentTime,
    applesEaten: 0,
    itemsCollected: 0,
    effects: [],
  };
}

export function updateGameState(state: GameState, deltaTime: number): GameState {
  if (state.isPaused || !state.snake.isAlive) {
    return state;
  }

  const newState = { ...state };
  newState.currentTime += deltaTime;

  // Check if we need to tick
  const timeSinceLastTick = newState.currentTime - newState.lastTickTime;
  const tickInterval = 1000 / newState.tickRate;

  if (timeSinceLastTick < tickInterval) {
    return newState;
  }

  newState.lastTickTime = newState.currentTime;

  // Update effects
  newState.effects = newState.effects.filter((effect) => effect.endTime > newState.currentTime);

  const hasInvincible = newState.effects.some((e) => e.type === 'invincible');

  // Move snake
  moveSnake(newState.snake, newState.gridWidth, newState.gridHeight, newState.wallMode);

  if (!newState.snake.isAlive) {
    return newState;
  }

  // Check collisions
  if (!hasInvincible) {
    if (checkSelfCollision(newState.snake)) {
      newState.snake.isAlive = false;
      return newState;
    }

    if (checkObstacleCollision(newState.snake, newState.obstacles)) {
      newState.snake.isAlive = false;
      return newState;
    }
  }

  // Check item collection
  const itemIndex = newState.items.findIndex((item) => isHeadAtPoint(newState.snake, item.position));

  if (itemIndex !== -1) {
    const item = newState.items[itemIndex];
    const effect = getItemEffect(item.type);

    if (item.type === 'bomb' && !hasInvincible) {
      newState.snake.isAlive = false;
      return newState;
    }

    if (effect.growth > 0) {
      growSnake(newState.snake, effect.growth);
    }

    addScore(newState.snake, effect.score);

    if (item.type === 'apple') {
      newState.applesEaten++;
    }
    newState.itemsCollected++;

    if (effect.effect) {
      newState.effects.push({
        type: effect.effect.type,
        endTime: newState.currentTime + effect.effect.duration,
      });
    }

    // Remove collected item
    newState.items.splice(itemIndex, 1);
  }

  // Remove expired items
  newState.items = newState.items.filter((item) => !isItemExpired(item, newState.currentTime));

  // Spawn new item if needed
  if (newState.items.length < 3 && Math.random() < 0.3) {
    const occupiedPoints = [
      ...newState.snake.body,
      ...newState.obstacles,
      ...newState.items.map((i) => i.position),
    ];
    const newItem = spawnRandomItem(
      occupiedPoints,
      newState.gridWidth,
      newState.gridHeight,
      newState.currentTime
    );
    if (newItem) {
      newState.items.push(newItem);
    }
  }

  return newState;
}

export function togglePause(state: GameState): GameState {
  return { ...state, isPaused: !state.isPaused };
}

export function getEffectiveTickRate(state: GameState): number {
  const hasSlow = state.effects.some((e) => e.type === 'slow');
  return hasSlow ? state.tickRate * 0.6 : state.tickRate;
}

