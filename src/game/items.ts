// Item spawning, TTL, and effects

import { Point, getRandomEmptyPoint } from './grid';
import { globalRNG } from './rng';

export type ItemType = 'apple' | 'bomb' | 'slow' | 'invincible' | 'bonus';

export interface Item {
  type: ItemType;
  position: Point;
  spawnTime: number;
  ttl: number; // milliseconds
}

export interface ItemConfig {
  type: ItemType;
  weight: number;
  ttl: number;
  scoreValue: number;
  duration?: number; // for temporary effects
}

export const ITEM_CONFIGS: Record<ItemType, ItemConfig> = {
  apple: {
    type: 'apple',
    weight: 60,
    ttl: 0, // infinite
    scoreValue: 10,
  },
  bonus: {
    type: 'bonus',
    weight: 20,
    ttl: 5000,
    scoreValue: 50,
  },
  bomb: {
    type: 'bomb',
    weight: 8,
    ttl: 6000,
    scoreValue: 0,
  },
  slow: {
    type: 'slow',
    weight: 7,
    ttl: 5000,
    scoreValue: 20,
    duration: 5000,
  },
  invincible: {
    type: 'invincible',
    weight: 5,
    ttl: 7000,
    scoreValue: 30,
    duration: 5000,
  },
};

export function spawnRandomItem(
  occupiedPoints: Point[],
  gridWidth: number,
  gridHeight: number,
  currentTime: number
): Item | null {
  const position = getRandomEmptyPoint(gridWidth, gridHeight, occupiedPoints);
  if (!position) return null;

  const types = Object.keys(ITEM_CONFIGS) as ItemType[];
  const weights = types.map((type) => ITEM_CONFIGS[type].weight);
  const selectedType = globalRNG.weightedChoice(types, weights);
  const config = ITEM_CONFIGS[selectedType];

  return {
    type: selectedType,
    position,
    spawnTime: currentTime,
    ttl: config.ttl,
  };
}

export function isItemExpired(item: Item, currentTime: number): boolean {
  if (item.ttl === 0) return false;
  return currentTime - item.spawnTime >= item.ttl;
}

export function getItemEffect(itemType: ItemType): {
  growth: number;
  score: number;
  effect?: { type: string; duration: number };
} {
  const config = ITEM_CONFIGS[itemType];

  switch (itemType) {
    case 'apple':
      return { growth: 1, score: config.scoreValue };
    case 'bonus':
      return { growth: 2, score: config.scoreValue };
    case 'bomb':
      return { growth: 0, score: 0 }; // death handled separately
    case 'slow':
      return {
        growth: 0,
        score: config.scoreValue,
        effect: { type: 'slow', duration: config.duration! },
      };
    case 'invincible':
      return {
        growth: 1,
        score: config.scoreValue,
        effect: { type: 'invincible', duration: config.duration! },
      };
    default:
      return { growth: 0, score: 0 };
  }
}

