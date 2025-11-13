// Unit tests for snake logic

import { describe, it, expect } from 'vitest';
import {
  createSnake,
  setDirection,
  moveSnake,
  checkSelfCollision,
  growSnake,
  isHeadAtPoint,
} from './snake';

describe('Snake Logic', () => {
  it('should create snake with correct initial state', () => {
    const snake = createSnake(10, 10);
    expect(snake.body).toHaveLength(3);
    expect(snake.direction).toBe('RIGHT');
    expect(snake.isAlive).toBe(true);
    expect(snake.score).toBe(0);
  });

  it('should prevent 180-degree turns', () => {
    const snake = createSnake(10, 10);
    snake.direction = 'RIGHT';
    setDirection(snake, 'LEFT');
    expect(snake.pendingDirection).toBeNull();
  });

  it('should allow valid direction changes', () => {
    const snake = createSnake(10, 10);
    snake.direction = 'RIGHT';
    setDirection(snake, 'UP');
    expect(snake.pendingDirection).toBe('UP');
  });

  it('should move snake forward', () => {
    const snake = createSnake(10, 10);
    const initialHead = { ...snake.body[0] };
    moveSnake(snake, 30, 20, 'normal');
    expect(snake.body[0].x).toBe(initialHead.x + 1);
  });

  it('should die when hitting wall in normal mode', () => {
    const snake = createSnake(0, 10);
    snake.direction = 'LEFT';
    snake.body = [{ x: 0, y: 10 }];
    moveSnake(snake, 30, 20, 'normal');
    expect(snake.isAlive).toBe(false);
  });

  it('should wrap around in wrap mode', () => {
    const snake = createSnake(0, 10);
    snake.direction = 'LEFT';
    snake.body = [{ x: 0, y: 10 }];
    moveSnake(snake, 30, 20, 'wrap');
    expect(snake.isAlive).toBe(true);
    expect(snake.body[0].x).toBe(29);
  });

  it('should detect self collision', () => {
    const snake = createSnake(10, 10);
    snake.body = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 4, y: 6 },
      { x: 5, y: 6 },
      { x: 5, y: 5 }, // overlaps with head
    ];
    expect(checkSelfCollision(snake)).toBe(true);
  });

  it('should not detect false collision', () => {
    const snake = createSnake(10, 10);
    expect(checkSelfCollision(snake)).toBe(false);
  });

  it('should grow snake', () => {
    const snake = createSnake(10, 10);
    const initialLength = snake.body.length;
    growSnake(snake, 2);
    expect(snake.growthPending).toBe(2);
    
    // Move twice to apply growth
    moveSnake(snake, 30, 20, 'normal');
    expect(snake.body).toHaveLength(initialLength + 1);
    moveSnake(snake, 30, 20, 'normal');
    expect(snake.body).toHaveLength(initialLength + 2);
  });

  it('should check if head is at point', () => {
    const snake = createSnake(10, 10);
    const head = snake.body[0];
    expect(isHeadAtPoint(snake, head)).toBe(true);
    expect(isHeadAtPoint(snake, { x: 99, y: 99 })).toBe(false);
  });
});

