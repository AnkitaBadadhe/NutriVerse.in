import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Droplets, Zap, Moon, Smile, Award, Sparkles, X, CheckCircle2, Activity, ArrowUpRight, Flame } from 'lucide-react';
import { Language, translations } from '../translations';

interface ScoreProps {
  healthScore: number;
  language: Language;
}

export const HealthScoreSuite: React.FC<ScoreProps> = ({ healthScore, language }) => {
  const t = translations[language];
  const [selectedScore, setSelectedScore] = useState<any | null>(null);

  const scores = [
    { 
      title: t.overallHealth || 'Overall Health Index', 
      score: healthScore, 
      color: 'from-emerald-500 to-teal-600', 
      icon: ShieldCheck, 
      status: 'Optimal',
      subText: '24 Clinical Biomarkers',
      details: 'Calculated from 24 biomarker signals including metabolic rate stability, HRV recovery, and daily protein nitrogen balance.'
    },
    { 
      title: t.nutritionScore || 'Macronutrient Balance', 
      score: 88, 
      color: 'from-emerald-500 to-emerald-600', 
      icon: Zap, 
      status: 'Balanced',
      subText: 'Low Glycemic Load',
      details: 'Satiety index score is 88/100. High dietary fiber and low glycemic index complex carbohydrate distribution.'
    },
    { 
      title: t.hydrationScore || 'Hydration & Electrolytes', 
      score: 95, 
      color: 'from-cyan-500 to-blue-600', 
      icon: Droplets, 
      status: 'Optimal',
      subText: '2.8L Daily Intake',
      details: 'Daily water intake target achieved (2.8 Liters). Optimal sodium-potassium electrolyte cellular balance.'
    },
    { 
      title: t.vitaminScore || 'Micronutrient & Vitamin D3', 
      score: 82, 
      color: 'from-amber-500 to-orange-600', 
      icon: Sparkles, 
      status: 'Attention Needed',
      subText: 'Vit D3: 28 ng/mL',
      details: 'Serum 25-hydroxyvitamin D is 28 ng/mL (mild deficiency). Recommend 15 minutes morning sunlight exposure or 2,000 IU D3 supplementation.'
    },
    { 
      title: t.proteinScore || 'Muscle Protein Synthesis', 
      score: 94, 
      color: 'from-violet-500 to-purple-600', 
      icon: Award, 
      status: 'High Retention',
      subText: '125g / 140g Target',
      details: 'Total amino acid synthesis threshold met for lean muscle preservation and tissue cellular repair.'
    },
    { 
      title: t.sleepScore || 'Circadian Sleep Quality', 
      score: 86, 
      color: 'from-indigo-500 to-slate-600', 
      icon: Moon, 
      status: 'Restorative REM',
      subText: '7.5 Hours REM Sleep',
      details: '7.5 hours duration with 1.8 hours Deep NREM sleep. Circadian suprachiasmatic melatonin alignment is 86%.'
    },
    { 
      title: t.stressScore || 'Cortisol & Stress Resilience', 
      score: 88, 
      color: 'from-rose-500 to-pink-600', 
      icon: Smile, 
      status: 'Calm State',
      subText: 'HRV: 68ms Balanced',
      details: 'Heart Rate Variability (HRV) is 68ms. Salivary cortisol levels remain balanced in optimal non-anxious physiological range.'
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider border border-emerald-500/20 flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Auto-Update Engine
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            NutriVerse AI Health Score Radar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Multi-Biomarker Clinical Diagnostics & Real-time Physiological Health Index
          </p>
        </div>
      </div>

      {/* Creative Gradient Immuno Score Banner */}
      <div className="bg-gradient-to-r from-[#005082] via-[#003d66] to-[#002845] text-white p-6 sm:p-8 rounded-3xl shadow-2xl shadow-[#005082]/20 mb-8 border border-[#005082]/30 relative overflow-hidden z-10">
        
        {/* Decorative Radial Background Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center shrink-0">
              <Activity className="w-10 h-10" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-black tracking-wider text-emerald-300 block mb-1">
                Overall Immuno Health Index
              </span>
              <h3 className="text-3xl sm:text-4xl font-black font-heading text-white flex items-baseline gap-2">
                {healthScore} <span className="text-lg text-slate-200 font-bold">/ 100</span>
              </h3>
              <span className="text-xs text-slate-200 font-medium block mt-1">
                Optimal Longevity Range • 24 Biomarkers Evaluated
              </span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 max-w-sm shrink-0 shadow-lg">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-slate-100">Biomarker Health Stability</span>
              <span className="text-emerald-300 font-black text-sm">92%</span>
            </div>
            <div className="w-full bg-slate-950/40 rounded-full h-2.5 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 h-full rounded-full w-[92%] transition-all duration-1000 shadow-md shadow-emerald-400/30"></div>
            </div>
            <p className="text-[11px] text-slate-200 mt-2.5 leading-relaxed font-medium">
              Metabolic rate, glycemic control, and sleep recovery operating in prime performance zone.
            </p>
          </div>
        </div>
      </div>

      {/* 7 Biomarker Cards Grid (No Text Clipping!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        {scores.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedScore(item)}
              className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 sm:p-6 text-left relative overflow-hidden cursor-pointer hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-tr ${item.color} text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    item.score >= 90 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    item.score >= 85 ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' :
                    'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading leading-snug mb-1">
                  {item.title}
                </h4>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mb-3">
                  {item.subText}
                </span>

                <div className="flex items-baseline gap-2 mb-3">
                  <strong className="text-3xl font-black text-slate-900 dark:text-white font-heading">
                    {item.score}
                  </strong>
                  <span className="text-xs text-slate-400 font-semibold">/ 100</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] font-extrabold text-[#005082] dark:text-cyan-400">
                <span>View Biomarker Science</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Clinical Score Detail Modal */}
      <AnimatePresence>
        {selectedScore && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScore(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-[100] bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-auto text-xs space-y-5"
            >
              <button
                onClick={() => setSelectedScore(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-tr ${selectedScore.color} text-white shadow-lg`}>
                  <selectedScore.icon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
                    {selectedScore.status}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">{selectedScore.title}</h3>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 font-semibold">Biomarker Index Score:</span>
                  <strong className="text-2xl font-black text-slate-900 dark:text-white font-heading">{selectedScore.score} / 100</strong>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedScore.details}
                </p>
              </div>

              <button
                onClick={() => setSelectedScore(null)}
                className="w-full py-3 rounded-2xl bg-[#005082] hover:bg-[#003d66] text-white font-extrabold text-xs shadow-md transition-all"
              >
                Close Clinical Breakdown
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
