// Unit tests for items

import { describe, it, expect } from 'vitest';
import { isItemExpired, getItemEffect, ITEM_CONFIGS } from './items';

describe('Items', () => {
  it('should not expire items with ttl 0', () => {
    const item = {
      type: 'apple' as const,
      position: { x: 5, y: 5 },
      spawnTime: 1000,
      ttl: 0,
    };
    expect(isItemExpired(item, 10000)).toBe(false);
  });

  it('should expire items after ttl', () => {
    const item = {
      type: 'bonus' as const,
      position: { x: 5, y: 5 },
      spawnTime: 1000,
      ttl: 5000,
    };
    expect(isItemExpired(item, 7000)).toBe(true);
  });

  it('should not expire items before ttl', () => {
    const item = {
      type: 'bonus' as const,
      position: { x: 5, y: 5 },
      spawnTime: 1000,
      ttl: 5000,
    };
    expect(isItemExpired(item, 5000)).toBe(false);
  });

  it('should return correct effect for apple', () => {
    const effect = getItemEffect('apple');
    expect(effect.growth).toBe(1);
    expect(effect.score).toBe(ITEM_CONFIGS.apple.scoreValue);
    expect(effect.effect).toBeUndefined();
  });

  it('should return correct effect for bomb', () => {
    const effect = getItemEffect('bomb');
    expect(effect.growth).toBe(0);
    expect(effect.score).toBe(0);
  });

  it('should return correct effect for invincible', () => {
    const effect = getItemEffect('invincible');
    expect(effect.growth).toBe(1);
    expect(effect.effect).toBeDefined();
    expect(effect.effect?.type).toBe('invincible');
    expect(effect.effect?.duration).toBe(5000);
  });

  it('should have valid item configs', () => {
    const types = Object.keys(ITEM_CONFIGS);
    expect(types.length).toBeGreaterThan(0);
    
    types.forEach((type) => {
      const config = ITEM_CONFIGS[type as keyof typeof ITEM_CONFIGS];
      expect(config.weight).toBeGreaterThan(0);
      expect(config.ttl).toBeGreaterThanOrEqual(0);
      expect(config.scoreValue).toBeGreaterThanOrEqual(0);
    });
  });
});

