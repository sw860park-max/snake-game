// Snake movement, growth, and collision logic

import {
  Point,
  Direction,
  DIRECTION_VECTORS,
  OPPOSITE_DIRECTIONS,
  addPoints,
  equalPoints,
  wrapPoint,
  isOutOfBounds,
} from './grid';

export interface SnakeState {
  body: Point[];
  direction: Direction;
  pendingDirection: Direction | null;
  isAlive: boolean;
  score: number;
  growthPending: number;
}

export type WallMode = 'normal' | 'wrap' | 'obstacles';

export function createSnake(startX: number, startY: number): SnakeState {
  return {
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
}

export function setDirection(snake: SnakeState, newDirection: Direction): void {
  // Prevent 180-degree turns
  if (OPPOSITE_DIRECTIONS[newDirection] === snake.direction) {
    return;
  }
  snake.pendingDirection = newDirection;
}

export function commitDirection(snake: SnakeState): void {
  if (snake.pendingDirection) {
    snake.direction = snake.pendingDirection;
    snake.pendingDirection = null;
  }
}

export function moveSnake(
  snake: SnakeState,
  gridWidth: number,
  gridHeight: number,
  wallMode: WallMode
): void {
  if (!snake.isAlive) return;

  commitDirection(snake);

  const head = snake.body[0];
  const vector = DIRECTION_VECTORS[snake.direction];
  let newHead = addPoints(head, vector);

  // Handle wall collision
  if (wallMode === 'wrap') {
    newHead = wrapPoint(newHead, gridWidth, gridHeight);
  } else if (wallMode === 'normal') {
    if (isOutOfBounds(newHead, gridWidth, gridHeight)) {
      snake.isAlive = false;
      return;
    }
  }

  // Add new head
  snake.body.unshift(newHead);

  // Remove tail if not growing
  if (snake.growthPending > 0) {
    snake.growthPending--;
  } else {
    snake.body.pop();
  }
}

export function checkSelfCollision(snake: SnakeState): boolean {
  const head = snake.body[0];
  for (let i = 1; i < snake.body.length; i++) {
    if (equalPoints(head, snake.body[i])) {
      return true;
    }
  }
  return false;
}

export function checkObstacleCollision(snake: SnakeState, obstacles: Point[]): boolean {
  const head = snake.body[0];
  return obstacles.some((obs) => equalPoints(head, obs));
}

export function growSnake(snake: SnakeState, amount: number = 1): void {
  snake.growthPending += amount;
}

export function addScore(snake: SnakeState, points: number): void {
  snake.score += points;
}

export function isHeadAtPoint(snake: SnakeState, point: Point): boolean {
  return equalPoints(snake.body[0], point);
}

