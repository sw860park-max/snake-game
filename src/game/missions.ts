// Mission and achievement system

export type MissionType =
  | 'score'
  | 'length'
  | 'apples'
  | 'items'
  | 'survive'
  | 'speed'
  | 'daily';

export interface Mission {
  id: string;
  type: MissionType;
  title: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  reward: number; // bonus score
  isDaily?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export const DEFAULT_MISSIONS: Mission[] = [
  {
    id: 'score_100',
    type: 'score',
    title: 'Score 100',
    description: 'Reach a score of 100 in a single game',
    target: 100,
    current: 0,
    completed: false,
    reward: 10,
  },
  {
    id: 'length_20',
    type: 'length',
    title: 'Long Snake',
    description: 'Grow your snake to length 20',
    target: 20,
    current: 0,
    completed: false,
    reward: 15,
  },
  {
    id: 'apples_10',
    type: 'apples',
    title: 'Apple Eater',
    description: 'Eat 10 apples in one game',
    target: 10,
    current: 0,
    completed: false,
    reward: 10,
  },
  {
    id: 'daily_1',
    type: 'daily',
    title: 'Daily Challenge',
    description: 'Complete a game today',
    target: 1,
    current: 0,
    completed: false,
    reward: 20,
    isDaily: true,
  },
];

export const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_game',
    title: 'First Steps',
    description: 'Play your first game',
    unlocked: false,
  },
  {
    id: 'score_500',
    title: 'High Scorer',
    description: 'Reach a score of 500',
    unlocked: false,
  },
  {
    id: 'score_1000',
    title: 'Master Player',
    description: 'Reach a score of 1000',
    unlocked: false,
  },
  {
    id: 'length_50',
    title: 'Snake Master',
    description: 'Grow your snake to length 50',
    unlocked: false,
  },
  {
    id: 'invincible_user',
    title: 'Invincible',
    description: 'Use the invincible power-up',
    unlocked: false,
  },
];

export function updateMissionProgress(
  missions: Mission[],
  type: MissionType,
  value: number
): Mission[] {
  return missions.map((mission) => {
    if (mission.type === type && !mission.completed) {
      const updated = { ...mission, current: value };
      if (updated.current >= updated.target) {
        updated.completed = true;
      }
      return updated;
    }
    return mission;
  });
}

export function checkAchievement(
  achievements: Achievement[],
  achievementId: string
): Achievement[] {
  return achievements.map((ach) => {
    if (ach.id === achievementId && !ach.unlocked) {
      return { ...ach, unlocked: true, unlockedAt: Date.now() };
    }
    return ach;
  });
}

export function resetDailyMissions(missions: Mission[]): Mission[] {
  return missions.map((mission) => {
    if (mission.isDaily) {
      return { ...mission, current: 0, completed: false };
    }
    return mission;
  });
}

export function getCompletedMissionsReward(missions: Mission[]): number {
  return missions
    .filter((m) => m.completed)
    .reduce((sum, m) => sum + m.reward, 0);
}

