import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Droplets, Clock, Sparkles, Plus, Minus, Play, Pause, RotateCcw, 
  CheckCircle2, ShieldCheck, Award, Zap, Flame, Trash2, Heart, Info,
  TrendingUp, Activity
} from 'lucide-react';

export interface WaterLog {
  id: string;
  amountMl: number;
  timeString: string;
}

export interface FastingMode {
  id: string;
  name: string;
  fastingHours: number;
  eatingHours: number;
  description: string;
  icon: string;
}

export const FASTING_MODES: FastingMode[] = [
  {
    id: '16-8',
    name: '16:8 LeanGains (Recommended)',
    fastingHours: 16,
    eatingHours: 8,
    description: '16 hours fasting & 8 hours eating window. Ideal for fat loss & glycemic control.',
    icon: '⚡'
  },
  {
    id: '14-10',
    name: '14:10 Gentle Circadian',
    fastingHours: 14,
    eatingHours: 10,
    description: '14 hours fasting & 10 hours eating window. Perfect for beginners and busy schedules.',
    icon: '🌅'
  },
  {
    id: '18-6',
    name: '18:6 Autophagy Focus',
    fastingHours: 18,
    eatingHours: 6,
    description: '18 hours fasting & 6 hours eating window. Triggers cellular repair & deep autophagy.',
    icon: '🔥'
  },
  {
    id: '12-12',
    name: '12:12 Balanced Daily',
    fastingHours: 12,
    eatingHours: 12,
    description: '12 hours fasting & 12 hours eating window. Natural overnight digestive rest.',
    icon: '🍃'
  }
];

export const HydrationCircadianTracker: React.FC = () => {
  // Hydration State
  const [dailyGoalMl, setDailyGoalMl] = useState<number>(3000);
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>(() => {
    try {
      const saved = localStorage.getItem('nutriverse_water_logs_v1');
      return saved ? JSON.parse(saved) : [
        { id: '1', amountMl: 500, timeString: '08:30 AM' },
        { id: '2', amountMl: 250, timeString: '10:15 AM' },
        { id: '3', amountMl: 500, timeString: '01:00 PM' }
      ];
    } catch {
      return [];
    }
  });

  const [customMlInput, setCustomMlInput] = useState<string>('');

  // Fasting Circadian Timer State
  const [selectedFastingMode, setSelectedFastingMode] = useState<FastingMode>(FASTING_MODES[0]);
  const [isFastingActive, setIsFastingActive] = useState<boolean>(false);
  const [fastingSecondsElapsed, setFastingSecondsElapsed] = useState<number>(() => {
    return 14 * 3600 + 25 * 60; // Default simulated elapsed: 14h 25m
  });

  useEffect(() => {
    localStorage.setItem('nutriverse_water_logs_v1', JSON.stringify(waterLogs));
  }, [waterLogs]);

  // Timer Tick Interval
  useEffect(() => {
    let interval: any = null;
    if (isFastingActive) {
      interval = setInterval(() => {
        setFastingSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFastingActive]);

  // Log Water Intake
  const handleAddWater = (amountMl: number) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog: WaterLog = {
      id: 'log-' + Date.now(),
      amountMl,
      timeString
    };
    setWaterLogs(prev => [newLog, ...prev]);
  };

  const handleCustomAddWater = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customMlInput);
    if (val > 0) {
      handleAddWater(val);
      setCustomMlInput('');
    }
  };

  const handleRemoveLog = (id: string) => {
    setWaterLogs(prev => prev.filter(l => l.id !== id));
  };

  const handleResetWater = () => {
    setWaterLogs([]);
  };

  // Calculations
  const totalWaterLoggedMl = waterLogs.reduce((sum, log) => sum + log.amountMl, 0);
  const hydrationPercentage = Math.min(100, Math.round((totalWaterLoggedMl / dailyGoalMl) * 100));

  // Fasting Calculations
  const totalFastingGoalSeconds = selectedFastingMode.fastingHours * 3600;
  const fastingProgressPercent = Math.min(100, Math.round((fastingSecondsElapsed / totalFastingGoalSeconds) * 100));
  const remainingFastingSeconds = Math.max(0, totalFastingGoalSeconds - fastingSecondsElapsed);

  const formatTimeHHMMSS = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Metabolic Stage Determination
  const elapsedHours = fastingSecondsElapsed / 3600;
  let metabolicStage = {
    title: 'Anabolic Digestion Stage',
    desc: 'Blood sugar is being normalized and glucose is stored as glycogen.',
    color: 'text-cyan-400'
  };

  if (elapsedHours >= 12) {
    metabolicStage = {
      title: 'Autophagy & Cellular Repair Active',
      desc: 'Damaged cellular proteins are cleared & mitochondrial biogenesis is triggered!',
      color: 'text-emerald-400'
    };
  } else if (elapsedHours >= 8) {
    metabolicStage = {
      title: 'Ketosis & Accelerated Fat Oxidation',
      desc: 'Glycogen is depleted and liver synthesizes ketone bodies for energy.',
      color: 'text-amber-400'
    };
  } else if (elapsedHours >= 4) {
    metabolicStage = {
      title: 'Insulin Drop & Glycogen Depletion',
      desc: 'Circulating insulin levels drop, enabling fat stores to be unlocked.',
      color: 'text-blue-400'
    };
  }

  return (
    <div className="space-y-8">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#005082] via-[#003d66] to-[#002845] text-white p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden border border-[#005082]/30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-extrabold text-xs border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Circadian Rhythm & Electrolyte Studio
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              AI Hydration & Circadian Timing Tracker
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-xl">
              Track daily hydration, log water intake, monitor intermittent fasting metabolic stages, and optimize your digestive circadian rhythm with ICMR clinical guidelines.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/15 backdrop-blur-md shrink-0">
            <Droplets className="w-8 h-8 text-cyan-400 animate-bounce" />
            <div>
              <strong className="text-2xl font-black text-white font-heading block">{totalWaterLoggedMl} <span className="text-xs text-cyan-300">/ {dailyGoalMl} mL</span></strong>
              <span className="text-[10px] text-slate-300 uppercase tracking-wider font-bold">Daily Hydration Index: {hydrationPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Hydration Studio */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">Water & Fluid Logger</h3>
                <span className="text-xs text-slate-500 font-medium">Daily Goal: 3.0 Liters (3,000 mL)</span>
              </div>
            </div>

            {waterLogs.length > 0 && (
              <button 
                onClick={handleResetWater}
                className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Reset
              </button>
            )}
          </div>

          {/* Visual Hydration Meter Ring */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-6 rounded-3xl border border-cyan-100 dark:border-slate-800 text-center space-y-4 relative overflow-hidden">
            
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
              {/* Outer Circular SVG */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-slate-800" fill="transparent" />
                <circle 
                  cx="50" cy="50" r="42" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  strokeDasharray="263.89" 
                  strokeDashoffset={263.89 - (263.89 * hydrationPercentage) / 100}
                  strokeLinecap="round"
                  className="text-cyan-500 transition-all duration-700 ease-out" 
                  fill="transparent" 
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <strong className="text-3xl font-black text-slate-900 dark:text-white font-heading">{hydrationPercentage}%</strong>
                <span className="text-[11px] font-extrabold text-cyan-600 dark:text-cyan-400 mt-0.5">{totalWaterLoggedMl} mL Logged</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              {hydrationPercentage >= 100 
                ? '🎉 Congratulations! You have achieved 100% of your daily clinical hydration goal!' 
                : `Drink ${dailyGoalMl - totalWaterLoggedMl} mL more to reach optimal hydration.`}
            </p>
          </div>

          {/* Quick Add Buttons */}
          <div className="space-y-3">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">Quick Log Presets:</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleAddWater(250)}
                className="p-3 rounded-2xl bg-cyan-50 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white text-slate-800 dark:text-slate-200 border border-cyan-200 dark:border-slate-700 transition-all text-center space-y-1 group"
              >
                <span className="text-xl block group-hover:scale-110 transition-transform">🥛</span>
                <strong className="text-xs font-black block">+250 mL</strong>
                <span className="text-[10px] text-slate-500 group-hover:text-cyan-100 block">Glass</span>
              </button>

              <button
                onClick={() => handleAddWater(500)}
                className="p-3 rounded-2xl bg-cyan-50 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white text-slate-800 dark:text-slate-200 border border-cyan-200 dark:border-slate-700 transition-all text-center space-y-1 group"
              >
                <span className="text-xl block group-hover:scale-110 transition-transform">🧴</span>
                <strong className="text-xs font-black block">+500 mL</strong>
                <span className="text-[10px] text-slate-500 group-hover:text-cyan-100 block">Sports Bottle</span>
              </button>

              <button
                onClick={() => handleAddWater(1000)}
                className="p-3 rounded-2xl bg-cyan-50 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white text-slate-800 dark:text-slate-200 border border-cyan-200 dark:border-slate-700 transition-all text-center space-y-1 group"
              >
                <span className="text-xl block group-hover:scale-110 transition-transform">🫖</span>
                <strong className="text-xs font-black block">+1,000 mL</strong>
                <span className="text-[10px] text-slate-500 group-hover:text-cyan-100 block">Jug</span>
              </button>
            </div>
          </div>

          {/* Custom Water Form */}
          <form onSubmit={handleCustomAddWater} className="flex items-center gap-2">
            <input 
              type="number"
              value={customMlInput}
              onChange={(e) => setCustomMlInput(e.target.value)}
              placeholder="Enter custom mL (e.g., 350)..."
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={!customMlInput}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Log
            </button>
          </form>

          {/* Water Log History Feed */}
          {waterLogs.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">Today's Log History:</span>
              <div className="max-h-40 overflow-y-auto space-y-2 pr-1 no-scrollbar">
                {waterLogs.map(log => (
                  <div key={log.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-3.5 h-3.5 text-cyan-500" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{log.amountMl} mL Logged</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-slate-400 font-medium">{log.timeString}</span>
                      <button onClick={() => handleRemoveLog(log.id)} className="text-slate-400 hover:text-rose-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Intermittent Fasting & Circadian Clock */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">Circadian Intermittent Fasting</h3>
                <span className="text-xs text-slate-500 font-medium">Metabolic Stage & Digestive Reset</span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black border border-amber-500/20">
              {selectedFastingMode.name.split(' ')[0]}
            </span>
          </div>

          {/* Mode Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">Select Fasting Protocol:</label>
            <div className="grid grid-cols-2 gap-2">
              {FASTING_MODES.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => {
                    setSelectedFastingMode(mode);
                    setFastingSecondsElapsed(0);
                    setIsFastingActive(false);
                  }}
                  className={`p-3 rounded-2xl text-left transition-all border ${
                    selectedFastingMode.id === mode.id
                      ? 'bg-[#005082] text-white border-[#005082] shadow-md'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-[#005082]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{mode.icon}</span>
                    <strong className="text-xs font-bold block">{mode.name.split(' ')[0]}</strong>
                  </div>
                  <span className="text-[10px] opacity-80 block mt-1">{mode.fastingHours}h Fast • {mode.eatingHours}h Eat</span>
                </button>
              ))}
            </div>
          </div>

          {/* Timer Visual Display */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-3xl border border-slate-800 text-center space-y-4 relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[11px] text-amber-400 font-extrabold uppercase tracking-widest flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Fasting Timer Clock
              </span>
              <strong className="text-4xl sm:text-5xl font-black font-heading tracking-tight text-white block">
                {formatTimeHHMMSS(fastingSecondsElapsed)}
              </strong>
              <span className="text-xs text-slate-400 font-medium block">
                {remainingFastingSeconds > 0 
                  ? `${formatTimeHHMMSS(remainingFastingSeconds)} remaining until eating window`
                  : '🎉 Fasting goal completed! Eating window open.'}
              </span>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsFastingActive(!isFastingActive)}
                className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all ${
                  isFastingActive 
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950' 
                    : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                }`}
              >
                {isFastingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isFastingActive ? 'Pause Clock' : 'Start Fasting'}</span>
              </button>

              <button
                onClick={() => {
                  setFastingSecondsElapsed(0);
                  setIsFastingActive(false);
                }}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300"
                title="Reset Clock"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Metabolic Stage Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <strong className={`text-xs font-bold ${metabolicStage.color}`}>
                Current Stage: {metabolicStage.title}
              </strong>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {metabolicStage.desc}
            </p>
          </div>

          {/* ICMR Electrolyte Tip */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
            <Award className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block font-heading">ICMR Electrolyte Clinical Tip</strong>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed font-medium">
                During 14+ hour fasting windows, sip tender coconut water or lemon water with a pinch of Himalayan pink salt to maintain sodium/potassium electrolyte balance.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
