// Local storage utilities for profile, settings, and rankings

import { Mission, Achievement } from '../game/missions';

export interface GameSettings {
  speed: number; // tickRate
  gridWidth: number;
  gridHeight: number;
  wallMode: 'normal' | 'wrap' | 'obstacles';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export interface PlayerProfile {
  name: string;
  gamesPlayed: number;
  highScore: number;
  totalScore: number;
  achievements: Achievement[];
  missions: Mission[];
  lastPlayedDate: string;
}

export interface Ranking {
  score: number;
  length: number;
  date: string;
  wallMode: string;
}

const STORAGE_KEYS = {
  SETTINGS: 'snake_settings',
  PROFILE: 'snake_profile',
  RANKINGS: 'snake_rankings',
};

export const DEFAULT_SETTINGS: GameSettings = {
  speed: 10,
  gridWidth: 30,
  gridHeight: 20,
  wallMode: 'normal',
  soundEnabled: true,
  vibrationEnabled: true,
};

export function loadSettings(): GameSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error('Failed to load settings:', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function loadProfile(): PlayerProfile | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load profile:', e);
  }
  return null;
}

export function saveProfile(profile: PlayerProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile:', e);
  }
}

export function loadRankings(): Ranking[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RANKINGS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load rankings:', e);
  }
  return [];
}

export function saveRanking(ranking: Ranking): void {
  try {
    const rankings = loadRankings();
    rankings.push(ranking);
    rankings.sort((a, b) => b.score - a.score);
    const topRankings = rankings.slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.RANKINGS, JSON.stringify(topRankings));
  } catch (e) {
    console.error('Failed to save ranking:', e);
  }
}

export function clearAllData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (e) {
    console.error('Failed to clear data:', e);
  }
}

