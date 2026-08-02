/**
 * NutriVerse REST API Client Service
 * Connects React 19 Frontend to Spring Boot 3 Java Backend (http://localhost:8080)
 */

const API_BASE_URL = 'http://localhost:8080/nutrition';

export interface DailyMacroTarget {
  targetCalories: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  bmr: number;
}

export interface WaterLogResponse {
  id: string;
  amountMl: number;
  timestamp: string;
  totalDailyLoggedMl: number;
  dailyTargetMl: number;
  hydrationPercentage: number;
}

export interface FastingStatusResponse {
  protocolName: string;
  fastingHours: number;
  eatingHours: number;
  isActive: boolean;
  secondsElapsed: number;
  metabolicStageTitle: string;
  metabolicStageDescription: string;
  icmrElectrolyteTip: string;
}

export interface LeaderboardSummaryResponse {
  members: Array<{
    id: string;
    name: string;
    relation: string;
    avatar: string;
    healthScore: number;
    streakDays: number;
    points: number;
    badge: string;
    rank: number;
  }>;
  totalFamilyPoints: number;
  topStreakDays: number;
  activeRewardStatus: string;
}

export const NutriVerseApiClient = {
  // 1. Calculate Daily Target Macros
  async calculateDailyMacros(weightKg: number, heightCm: number, age: number, gender: string): Promise<DailyMacroTarget | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/macros/calculate?weightKg=${weightKg}&heightCm=${heightCm}&age=${age}&gender=${gender}`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, using intelligent client calculations');
      return null;
    }
  },

  // 2. Log Water Intake
  async logWaterIntake(amountMl: number): Promise<WaterLogResponse | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/hydration/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountMl })
      });
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (err) {
      console.warn('Backend API offline, using local storage state');
      return null;
    }
  },

  // 3. Fetch Fasting Status
  async getFastingStatus(protocol: string, elapsedSeconds: number): Promise<FastingStatusResponse | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/hydration/fasting/status?protocol=${encodeURIComponent(protocol)}&elapsedSeconds=${elapsedSeconds}`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // 4. Fetch Family Leaderboard Roster
  async getFamilyLeaderboard(): Promise<LeaderboardSummaryResponse | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/family-leaderboard/summary`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // 5. Fetch Subscription Plans
  async getSubscriptionPlans() {
    try {
      const res = await fetch(`${API_BASE_URL}/subscription/plans`);
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  // 6. Upgrade Subscription Plan
  async upgradeSubscription(planId: string, paymentMethod: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/subscription/upgrade?planId=${planId}&paymentMethod=${paymentMethod}`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('API request failed');
      return await res.json();
    } catch (err) {
      return null;
    }
  }
};

