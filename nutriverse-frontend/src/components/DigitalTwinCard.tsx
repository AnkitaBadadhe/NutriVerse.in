import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingDown, Target, Zap, ShieldCheck } from 'lucide-react';

interface DigitalTwinProps {
  healthScore: number;
  currentWeight: number;
}

export const DigitalTwinCard: React.FC<DigitalTwinProps> = ({
  healthScore,
  currentWeight: initialWeight,
}) => {
  const [weight, setWeight] = useState(initialWeight);
  const targetWeight = 62.0;

  return (
    <div className="asknestle-card rounded-3xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-heading flex items-center gap-2">
            AI Digital Health Twin & 90-Day Trajectory
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Predictive Machine Learning model simulating weight & metabolic health curves</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          Optimal State
        </span>
      </div>

      {/* Trajectory Graphic */}
      <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6 relative">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">Simulated Weight Reduction Curve (90 Days)</span>
        <svg className="w-full h-32 overflow-visible" viewBox="0 0 300 100">
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            points="0,80 60,65 120,50 180,35 240,25 300,20"
          />
          <circle cx="300" cy="20" r="5" fill="#10B981" />
        </svg>
      </div>

      {/* Weight Slider Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-700 dark:text-slate-300">Adjust Weight Simulator:</span>
          <span className="text-emerald-600 dark:text-emerald-400 text-sm font-black">{weight.toFixed(1)} kg</span>
        </div>
        <input
          type="range"
          min="50"
          max="100"
          step="0.5"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>Target: {targetWeight} kg</span>
          <span>Diff: {(weight - targetWeight).toFixed(1)} kg</span>
        </div>
      </div>
    </div>
  );
};
