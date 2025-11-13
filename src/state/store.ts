// Zustand store for global state management

import { create } from 'zustand';
import { GameState, createGameState, updateGameState } from '../game/engine';
import { Direction } from '../game/grid';
import { setDirection } from '../game/snake';
import {
  GameSettings,
  PlayerProfile,
  Ranking,
  loadSettings,
  saveSettings,
  loadProfile,
  saveProfile,
  loadRankings,
  saveRanking,
} from '../utils/storage';
import {
  Mission,
  Achievement,
  DEFAULT_MISSIONS,
  DEFAULT_ACHIEVEMENTS,
  updateMissionProgress,
  checkAchievement,
  resetDailyMissions,
} from '../game/missions';

type GameScreen = 'menu' | 'game' | 'settings' | 'profile' | 'paused' | 'gameover';

interface AppState {
  // Game state
  gameState: GameState | null;
  screen: GameScreen;
  settings: GameSettings;
  profile: PlayerProfile;
  rankings: Ranking[];

  // Actions
  startGame: () => void;
  updateGame: (deltaTime: number) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  quitToMenu: () => void;
  changeDirection: (direction: Direction) => void;

  // Settings
  updateSettings: (settings: Partial<GameSettings>) => void;
  goToSettings: () => void;
  goToProfile: () => void;
  goToMenu: () => void;

  // Profile & Missions
  updateProfile: (updates: Partial<PlayerProfile>) => void;
  unlockAchievement: (achievementId: string) => void;
  updateMissions: (type: Mission['type'], value: number) => void;
  checkDailyMissions: () => void;
}

const createDefaultProfile = (): PlayerProfile => {
  return {
    name: 'Player',
    gamesPlayed: 0,
    highScore: 0,
    totalScore: 0,
    achievements: [...DEFAULT_ACHIEVEMENTS],
    missions: [...DEFAULT_MISSIONS],
    lastPlayedDate: new Date().toDateString(),
  };
};

export const useStore = create<AppState>((set, get) => ({
  gameState: null,
  screen: 'menu',
  settings: loadSettings(),
  profile: loadProfile() || createDefaultProfile(),
  rankings: loadRankings(),

  startGame: () => {
    const { settings } = get();
    const gameState = createGameState(
      settings.gridWidth,
      settings.gridHeight,
      settings.wallMode,
      settings.speed
    );

    set({ gameState, screen: 'game' });

    // Check achievements
    const state = get();
    const updatedAchievements = checkAchievement(
      state.profile.achievements,
      'first_game'
    );
    if (updatedAchievements !== state.profile.achievements) {
      const updatedProfile = { ...state.profile, achievements: updatedAchievements };
      set({ profile: updatedProfile });
      saveProfile(updatedProfile);
    }
  },

  updateGame: (deltaTime: number) => {
    const { gameState, profile } = get();
    if (!gameState) return;

    const wasAlive = gameState.snake.isAlive;
    const newGameState = updateGameState(gameState, deltaTime);
    
    set({ gameState: newGameState });

    // Update missions
    let updatedMissions = profile.missions;
    updatedMissions = updateMissionProgress(updatedMissions, 'score', newGameState.snake.score);
    updatedMissions = updateMissionProgress(updatedMissions, 'length', newGameState.snake.body.length);
    updatedMissions = updateMissionProgress(updatedMissions, 'apples', newGameState.applesEaten);

    if (updatedMissions !== profile.missions) {
      const updatedProfile = { ...profile, missions: updatedMissions };
      set({ profile: updatedProfile });
      saveProfile(updatedProfile);
    }

    // Check if game ended (was alive, now dead)
    if (wasAlive && !newGameState.snake.isAlive) {
      get().endGame();
    }
  },

  pauseGame: () => {
    const { gameState } = get();
    if (gameState && gameState.snake.isAlive) {
      set({ screen: 'paused' });
      gameState.isPaused = true;
    }
  },

  resumeGame: () => {
    const { gameState } = get();
    if (gameState) {
      gameState.isPaused = false;
      set({ screen: 'game' });
    }
  },

  endGame: () => {
    const { gameState, profile } = get();
    if (!gameState) return;

    const finalScore = gameState.snake.score;
    const finalLength = gameState.snake.body.length;

    // Save ranking
    const ranking: Ranking = {
      score: finalScore,
      length: finalLength,
      date: new Date().toLocaleString(),
      wallMode: gameState.wallMode,
    };
    saveRanking(ranking);

    // Update profile
    const updatedProfile: PlayerProfile = {
      ...profile,
      gamesPlayed: profile.gamesPlayed + 1,
      highScore: Math.max(profile.highScore, finalScore),
      totalScore: profile.totalScore + finalScore,
      lastPlayedDate: new Date().toDateString(),
    };

    // Check achievements
    let achievements = updatedProfile.achievements;
    if (finalScore >= 500) {
      achievements = checkAchievement(achievements, 'score_500');
    }
    if (finalScore >= 1000) {
      achievements = checkAchievement(achievements, 'score_1000');
    }
    if (finalLength >= 50) {
      achievements = checkAchievement(achievements, 'length_50');
    }

    updatedProfile.achievements = achievements;

    saveProfile(updatedProfile);

    set({
      profile: updatedProfile,
      rankings: loadRankings(),
      screen: 'gameover',
    });
  },

  quitToMenu: () => {
    set({ gameState: null, screen: 'menu' });
  },

  changeDirection: (direction: Direction) => {
    const { gameState, screen } = get();
    console.log('changeDirection called:', direction, 'screen:', screen, 'isAlive:', gameState?.snake.isAlive);
    if (gameState && gameState.snake.isAlive && !gameState.isPaused && screen === 'game') {
      setDirection(gameState.snake, direction);
      console.log('Direction changed to:', direction);
    }
  },

  updateSettings: (newSettings: Partial<GameSettings>) => {
    const { settings } = get();
    const updated = { ...settings, ...newSettings };
    saveSettings(updated);
    set({ settings: updated });
  },

  goToSettings: () => {
    set({ screen: 'settings' });
  },

  goToProfile: () => {
    set({ screen: 'profile' });
  },

  goToMenu: () => {
    set({ screen: 'menu', gameState: null });
  },

  updateProfile: (updates: Partial<PlayerProfile>) => {
    const { profile } = get();
    const updated = { ...profile, ...updates };
    saveProfile(updated);
    set({ profile: updated });
  },

  unlockAchievement: (achievementId: string) => {
    const { profile } = get();
    const achievements = checkAchievement(profile.achievements, achievementId);
    const updated = { ...profile, achievements };
    saveProfile(updated);
    set({ profile: updated });
  },

  updateMissions: (type: Mission['type'], value: number) => {
    const { profile } = get();
    const missions = updateMissionProgress(profile.missions, type, value);
    const updated = { ...profile, missions };
    saveProfile(updated);
    set({ profile: updated });
  },

  checkDailyMissions: () => {
    const { profile } = get();
    const today = new Date().toDateString();
    
    if (profile.lastPlayedDate !== today) {
      const missions = resetDailyMissions(profile.missions);
      const updated = { ...profile, missions, lastPlayedDate: today };
      saveProfile(updated);
      set({ profile: updated });
    }
  },
}));

