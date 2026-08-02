import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Flame, Award, ShieldCheck, CheckCircle2, Sparkles, Plus, 
  Users, TrendingUp, Droplets, Activity, Heart, Zap, Crown, Gift, Star, 
  Trash2, UserCheck
} from 'lucide-react';

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  healthScore: number;
  streakDays: number;
  hydrationPercent: number;
  proteinPercent: number;
  points: number;
  badge: string;
  rank: number;
}

export interface Quest {
  id: string;
  title: string;
  points: number;
  completed: boolean;
  category: 'Hydration' | 'Nutrition' | 'Fasting' | 'Diagnostics';
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
  color: string;
}

export const DEFAULT_FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: '1',
    name: 'Engineer Ankita Badadhe',
    relation: 'You (Self)',
    avatar: '👩‍💻',
    healthScore: 9.4,
    streakDays: 14,
    hydrationPercent: 92,
    proteinPercent: 88,
    points: 1450,
    badge: '🥇 Health Champion',
    rank: 1
  },
  {
    id: '2',
    name: 'Sandeep Sahani',
    relation: 'Spouse',
    avatar: '👨‍💼',
    healthScore: 8.9,
    streakDays: 10,
    hydrationPercent: 85,
    proteinPercent: 79,
    points: 1180,
    badge: '🥈 Hydration Titan',
    rank: 2
  },
  {
    id: '3',
    name: 'Trupti Badadhe',
    relation: 'Sister',
    avatar: '👩',
    healthScore: 9.1,
    streakDays: 8,
    hydrationPercent: 100,
    proteinPercent: 90,
    points: 980,
    badge: '🥉 Active Explorer',
    rank: 3
  },
  {
    id: '4',
    name: 'Alka Badadhe',
    relation: 'Mother',
    avatar: '👵',
    healthScore: 8.7,
    streakDays: 6,
    hydrationPercent: 78,
    proteinPercent: 82,
    points: 750,
    badge: '⭐ Wellness Ambassador',
    rank: 4
  }
];

export const DAILY_QUESTS: Quest[] = [
  { id: 'q1', title: 'Log 3.0 Liters Daily Water Intake', points: 100, completed: true, category: 'Hydration' },
  { id: 'q2', title: 'Complete 16:8 Circadian Fasting Window', points: 150, completed: true, category: 'Fasting' },
  { id: 'q3', title: 'Hit Daily Protein Target (50g+)', points: 120, completed: false, category: 'Nutrition' },
  { id: 'q4', title: 'Scan Pantry or Upload Food Image', points: 80, completed: false, category: 'Diagnostics' },
  { id: 'q5', title: 'Maintain 7-Day Habit Streak', points: 200, completed: true, category: 'Nutrition' }
];

export const BADGES_CATALOG: Badge[] = [
  { id: 'b1', title: 'Hydration Master', icon: '💧', description: 'Logged 3.0L water for 7 consecutive days', unlocked: true, color: 'from-cyan-500 to-blue-600' },
  { id: 'b2', title: 'Streak Titan 🔥', icon: '🔥', description: 'Maintained a 14-day daily habit streak', unlocked: true, color: 'from-[#005082] to-indigo-600' },
  { id: 'b3', title: 'Clean Eating Champion', icon: '🥗', description: '100% ICMR balanced meal plate assembly', unlocked: true, color: 'from-emerald-500 to-teal-600' },
  { id: 'b4', title: 'Biomarker Hero', icon: '🩸', description: 'Uploaded blood diagnostic report for OCR analysis', unlocked: true, color: 'from-purple-500 to-indigo-600' },
  { id: 'b5', title: 'Telehealth Pioneer', icon: '👨‍⚕️', description: 'Consulted verified clinical doctor online', unlocked: false, color: 'from-[#005082] to-cyan-600' },
  { id: 'b6', title: 'Pantry Master', icon: '🛒', description: 'Scanned refrigerator & pantry for recipe swaps', unlocked: false, color: 'from-amber-500 to-orange-600' }
];

export const FamilyLeaderboardView: React.FC = () => {
  const [members, setMembers] = useState<FamilyMember[]>(() => {
    try {
      const saved = localStorage.getItem('nutriverse_family_members_v2');
      return saved ? JSON.parse(saved) : DEFAULT_FAMILY_MEMBERS;
    } catch {
      return DEFAULT_FAMILY_MEMBERS;
    }
  });

  const [quests, setQuests] = useState<Quest[]>(DAILY_QUESTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('Family Member');
  const [newMemberAvatar, setNewMemberAvatar] = useState('🧑');

  useEffect(() => {
    localStorage.setItem('nutriverse_family_members_v2', JSON.stringify(members));
  }, [members]);

  // Toggle Quest
  const handleToggleQuest = (questId: string) => {
    setQuests(prev => prev.map(q => {
      if (q.id !== questId) return q;
      const updatedStatus = !q.completed;
      
      // Update self member points
      if (updatedStatus) {
        setMembers(mList => mList.map(m => m.id === '1' ? { ...m, points: m.points + q.points } : m));
      } else {
        setMembers(mList => mList.map(m => m.id === '1' ? { ...m, points: Math.max(0, m.points - q.points) } : m));
      }

      return { ...q, completed: updatedStatus };
    }));
  };

  // Add Family Member
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newM: FamilyMember = {
      id: 'fam-' + Date.now(),
      name: newMemberName,
      relation: newMemberRelation,
      avatar: newMemberAvatar,
      healthScore: 8.8,
      streakDays: 1,
      hydrationPercent: 70,
      proteinPercent: 75,
      points: 500,
      badge: '🌟 New Member',
      rank: members.length + 1
    };

    setMembers(prev => [...prev, newM]);
    setNewMemberName('');
    setIsAddModalOpen(false);
  };

  // Remove Family Member
  const handleRemoveMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  // Sort Members by Points
  const sortedMembers = [...members].sort((a, b) => b.points - a.points);
  const totalFamilyPoints = members.reduce((sum, m) => sum + m.points, 0);

  return (
    <div className="space-y-8">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#005082] via-[#003d66] to-[#002845] text-white p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden border border-[#005082]/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Family Health Gamification Engine
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              Family Health Leaderboard & Daily Streaks
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-xl">
              Compete with family members, complete daily nutrition quests, maintain daily habit streaks, and unlock ICMR wellness rewards!
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/15 backdrop-blur-md shrink-0">
            <Flame className="w-8 h-8 text-amber-400 animate-pulse" />
            <div>
              <strong className="text-2xl font-black text-amber-300 font-heading block">{sortedMembers[0]?.streakDays || 14} Days 🔥</strong>
              <span className="text-[10px] text-slate-300 uppercase tracking-wider font-bold">Top Family Habit Streak</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Leaderboard Table & Quests */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Family Leaderboard Cards */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#005082]/10 text-[#005082] dark:text-cyan-400 flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">Family Wellness Leaderboard</h3>
                  <span className="text-xs text-slate-500 font-medium">Total Combined Points: {totalFamilyPoints} Pts</span>
                </div>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Member
              </button>
            </div>

            {/* Members Rank List */}
            <div className="space-y-4">
              {sortedMembers.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    idx === 0 
                      ? 'border-amber-400/60 bg-gradient-to-r from-amber-50/50 via-slate-50 to-amber-50/30 dark:from-amber-950/20 dark:to-slate-900 shadow-md' 
                      : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 font-black text-xs text-slate-800 dark:text-white flex items-center justify-center shrink-0">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </div>

                    <span className="text-3xl shrink-0">{member.avatar}</span>

                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-slate-900 dark:text-white font-heading">{member.name}</strong>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#005082]/10 text-[#005082] dark:text-cyan-400 font-extrabold">
                          {member.relation}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                        <span className="text-amber-500 font-bold flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {member.streakDays} Day Streak
                        </span>
                        <span>• Health Index: <strong className="text-emerald-500 font-bold">{member.healthScore}/10</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 dark:border-slate-800">
                    <div className="text-right">
                      <strong className="text-lg font-black text-[#005082] dark:text-cyan-400 font-heading block">
                        {member.points} <span className="text-xs font-bold">Pts</span>
                      </strong>
                      <span className="text-[10px] text-slate-400 block font-bold">{member.badge}</span>
                    </div>

                    {member.id !== '1' && (
                      <button onClick={() => handleRemoveMember(member.id)} className="text-slate-400 hover:text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Daily Quests Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">Daily Wellness Quests</h3>
                  <span className="text-xs text-slate-500 font-medium">Complete daily actions to earn points & badges</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {quests.map(quest => (
                <div
                  key={quest.id}
                  onClick={() => handleToggleQuest(quest.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-4 ${
                    quest.completed 
                      ? 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20' 
                      : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      quest.completed ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-bold ${quest.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                      {quest.title}
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black shrink-0">
                    +{quest.points} Pts
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Badges & Rewards */}
        <div className="space-y-8">
          
          {/* Achievements & Badges Showcase */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">Badge Showcase</h3>
                <span className="text-xs text-slate-500 font-medium">Unlocked Health Achievements</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {BADGES_CATALOG.map(b => (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-2xl border text-center space-y-1.5 transition-all ${
                    b.unlocked 
                      ? 'bg-slate-50 dark:bg-slate-950 border-amber-400/40 shadow-sm' 
                      : 'bg-slate-100/50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 opacity-50 grayscale'
                  }`}
                >
                  <span className="text-2xl block">{b.icon}</span>
                  <strong className="text-xs font-bold text-slate-900 dark:text-white block font-heading">{b.title}</strong>
                  <p className="text-[10px] text-slate-500 leading-tight font-medium">{b.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Unlockable Rewards Pass */}
          <div className="bg-gradient-to-br from-[#005082] to-[#002845] text-white p-6 rounded-3xl border border-[#005082]/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-bold font-heading text-white">Family Milestone Reward</h4>
              </div>
              <span className="text-xs font-black text-amber-300">1,450 / 2,000 Pts</span>
            </div>

            <div className="space-y-1">
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full" style={{ width: '72.5%' }}></div>
              </div>
              <p className="text-[10px] text-slate-300 font-medium">Earn 550 more points to unlock Free Doctor Consultation Pass!</p>
            </div>

            <button className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all">
              Claim Family Rewards Pass
            </button>
          </div>

        </div>

      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]" />
          
          <div className="relative z-[100] bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-black font-heading text-slate-900 dark:text-white">Add Family Member</h3>
            
            <form onSubmit={handleAddMember} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Member Name</label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#005082]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Relationship</label>
                <select
                  value={newMemberRelation}
                  onChange={(e) => setNewMemberRelation(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#005082]"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Sister">Sister</option>
                  <option value="Brother">Brother</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Grandparent">Grandparent</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Avatar Icon</label>
                <div className="flex gap-2">
                  {['👨‍💼', '👩‍💼', '👦', '👧', '👴', '👵'].map(av => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setNewMemberAvatar(av)}
                      className={`text-2xl p-2 rounded-xl border ${newMemberAvatar === av ? 'border-[#005082] bg-[#005082]/10' : 'border-slate-200'}`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#005082] text-white text-xs font-bold shadow-md"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
