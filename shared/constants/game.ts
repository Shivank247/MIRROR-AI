export const GAME_CONSTANTS = {
  MIN_STAT: 0,
  MAX_STAT: 100,
  INITIAL_AGE: 20,
  INITIAL_YEAR: 1,
  INITIAL_XP: 0,
} as const;

export const INITIAL_GAME_STATS = {
  career: 50,
  money: 50,
  relationships: 50,
  knowledge: 50,
  creativity: 50,
  energy: 70,
  stress: 20,
} as const;