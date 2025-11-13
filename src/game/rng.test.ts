// Unit tests for RNG

import { describe, it, expect } from 'vitest';
import { SeededRNG } from './rng';

describe('Seeded RNG', () => {
  it('should produce consistent results with same seed', () => {
    const rng1 = new SeededRNG(12345);
    const rng2 = new SeededRNG(12345);

    const values1 = [rng1.next(), rng1.next(), rng1.next()];
    const values2 = [rng2.next(), rng2.next(), rng2.next()];

    expect(values1).toEqual(values2);
  });

  it('should produce different results with different seeds', () => {
    const rng1 = new SeededRNG(12345);
    const rng2 = new SeededRNG(54321);

    const value1 = rng1.next();
    const value2 = rng2.next();

    expect(value1).not.toBe(value2);
  });

  it('should generate integers in range', () => {
    const rng = new SeededRNG(12345);
    for (let i = 0; i < 100; i++) {
      const value = rng.nextInt(1, 10);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(10);
      expect(Number.isInteger(value)).toBe(true);
    }
  });

  it('should generate floats in range', () => {
    const rng = new SeededRNG(12345);
    for (let i = 0; i < 100; i++) {
      const value = rng.nextFloat(0, 1);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(1);
    }
  });

  it('should choose from array', () => {
    const rng = new SeededRNG(12345);
    const arr = ['a', 'b', 'c'];
    for (let i = 0; i < 20; i++) {
      const choice = rng.choice(arr);
      expect(arr).toContain(choice);
    }
  });

  it('should perform weighted choice', () => {
    const rng = new SeededRNG(12345);
    const items = ['rare', 'common'];
    const weights = [1, 99]; // common should appear ~99% of the time

    const results: Record<string, number> = { rare: 0, common: 0 };
    for (let i = 0; i < 1000; i++) {
      const choice = rng.weightedChoice(items, weights);
      results[choice]++;
    }

    expect(results.common).toBeGreaterThan(results.rare * 10);
  });

  it('should reset seed', () => {
    const rng = new SeededRNG(12345);
    const value1 = rng.next();
    
    rng.reset(12345);
    const value2 = rng.next();

    expect(value1).toBe(value2);
  });
});

