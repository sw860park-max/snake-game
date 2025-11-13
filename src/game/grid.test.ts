// Unit tests for grid utilities

import { describe, it, expect } from 'vitest';
import {
  addPoints,
  equalPoints,
  wrapPoint,
  isOutOfBounds,
  pointToKey,
  getRandomEmptyPoint,
  OPPOSITE_DIRECTIONS,
} from './grid';

describe('Grid Utilities', () => {
  it('should add two points correctly', () => {
    const result = addPoints({ x: 1, y: 2 }, { x: 3, y: 4 });
    expect(result).toEqual({ x: 4, y: 6 });
  });

  it('should check point equality', () => {
    expect(equalPoints({ x: 1, y: 2 }, { x: 1, y: 2 })).toBe(true);
    expect(equalPoints({ x: 1, y: 2 }, { x: 2, y: 1 })).toBe(false);
  });

  it('should wrap point correctly', () => {
    expect(wrapPoint({ x: -1, y: 5 }, 10, 10)).toEqual({ x: 9, y: 5 });
    expect(wrapPoint({ x: 10, y: 5 }, 10, 10)).toEqual({ x: 0, y: 5 });
    expect(wrapPoint({ x: 5, y: -1 }, 10, 10)).toEqual({ x: 5, y: 9 });
    expect(wrapPoint({ x: 5, y: 10 }, 10, 10)).toEqual({ x: 5, y: 0 });
  });

  it('should detect out of bounds', () => {
    expect(isOutOfBounds({ x: -1, y: 5 }, 10, 10)).toBe(true);
    expect(isOutOfBounds({ x: 10, y: 5 }, 10, 10)).toBe(true);
    expect(isOutOfBounds({ x: 5, y: -1 }, 10, 10)).toBe(true);
    expect(isOutOfBounds({ x: 5, y: 10 }, 10, 10)).toBe(true);
    expect(isOutOfBounds({ x: 5, y: 5 }, 10, 10)).toBe(false);
  });

  it('should convert point to key', () => {
    expect(pointToKey({ x: 3, y: 7 })).toBe('3,7');
  });

  it('should find random empty point', () => {
    const occupied = [{ x: 0, y: 0 }, { x: 1, y: 0 }];
    const result = getRandomEmptyPoint(2, 2, occupied);
    expect(result).toBeTruthy();
    expect(occupied.some(p => equalPoints(p, result!))).toBe(false);
  });

  it('should return null when no empty points', () => {
    const occupied = [
      { x: 0, y: 0 }, { x: 1, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 },
    ];
    const result = getRandomEmptyPoint(2, 2, occupied);
    expect(result).toBeNull();
  });

  it('should have correct opposite directions', () => {
    expect(OPPOSITE_DIRECTIONS.UP).toBe('DOWN');
    expect(OPPOSITE_DIRECTIONS.DOWN).toBe('UP');
    expect(OPPOSITE_DIRECTIONS.LEFT).toBe('RIGHT');
    expect(OPPOSITE_DIRECTIONS.RIGHT).toBe('LEFT');
  });
});

