import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Target, Flame, Utensils, Heart, Activity, CheckCircle2, 
  ArrowRight, ShieldCheck, RefreshCw, Download, MessageSquare, Zap, Smile, 
  ChevronRight, Stethoscope, Compass
} from 'lucide-react';

export const PersonalizedNutritionView: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>('weight');
  const [selectedDiet, setSelectedDiet] = useState<string>('balanced');
  const [selectedActivity, setSelectedActivity] = useState<string>('moderate');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [connectDoctorModal, setConnectDoctorModal] = useState<boolean>(false);

  const goals = [
    { 
      id: 'weight', 
      title: 'Weight Loss & Fat Reduction', 
      desc: 'Satiety-indexed calorie deficit with preserved lean muscle mass', 
      icon: Flame, 
      color: 'from-amber-500 to-orange-600',
      badge: 'High Satiety',
      calories: 1550, protein: 125, carbs: 130, fat: 45 
    },
    { 
      id: 'muscle', 
      title: 'Muscle Gain & Performance', 
      desc: 'Hypertrophy macro surplus with 2.0g protein/kg bodyweight', 
      icon: Zap, 
      color: 'from-blue-600 to-cyan-600',
      badge: 'Hypertrophy',
      calories: 2350, protein: 165, carbs: 240, fat: 65 
    },
    { 
      id: 'diabetes', 
      title: 'Diabetes & Glycemic Care', 
      desc: 'Low GI slow-digesting complex carbs to prevent HbA1c glucose spikes', 
      icon: Activity, 
      color: 'from-emerald-500 to-teal-600',
      badge: 'Low GI Stack',
      calories: 1650, protein: 110, carbs: 120, fat: 55 
    },
    { 
      id: 'gut', 
      title: 'Gut Microbiome & IBS Care', 
      desc: 'FODMAP friendly, fermented probiotics, and prebiotic soluble fiber', 
      icon: Heart, 
      color: 'from-purple-600 to-indigo-600',
      badge: 'Prebiotic Bio',
      calories: 1750, protein: 105, carbs: 160, fat: 50 
    },
    { 
      id: 'pediatric', 
      title: 'Pediatric Growth & Vitality', 
      desc: 'Balanced macronutrients, iron, DHA, and choline for growing kids', 
      icon: Smile, 
      color: 'from-rose-500 to-pink-600',
      badge: 'Growth Stack',
      calories: 1450, protein: 85, carbs: 170, fat: 40 
    },
  ];

  const diets = [
    { id: 'balanced', label: 'Balanced Omni', tag: 'Complete Nutrition', icon: Utensils },
    { id: 'veg', label: 'Vegetarian / Jain', tag: 'Plant & Dairy Focus', icon: Heart },
    { id: 'highprotein', label: 'High Protein / Keto', tag: 'Low Carb Matrix', icon: Zap },
    { id: 'vegan', label: '100% Plant Vegan', tag: 'Zero Dairy', icon: Sparkles },
  ];

  const activities = [
    { id: 'sedentary', label: 'Sedentary Lifestyle', desc: 'Desk job with light walking (under 5k steps/day)' },
    { id: 'moderate', label: 'Moderate Active', desc: '3-4 structured workouts or 8k+ steps daily' },
    { id: 'athlete', label: 'High Performance', desc: 'Daily intense training & high athletic expenditure' },
  ];

  const currentGoalObj = goals.find(g => g.id === selectedGoal) || goals[0];

  const handleSynthesizePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveStep(2);
    }, 1200);
  };

  const handleExportPdf = () => {
    setExportNotice(`Exporting 7-Day Personalized AI Nutrition Plan PDF (${currentGoalObj.title})...`);
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden">
      
      {/* Micro Decorative Backdrop Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#005082]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Toast Notification */}
      <AnimatePresence>
        {exportNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-xl flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" /> {exportNotice}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full bg-[#005082]/10 text-[#005082] dark:text-cyan-400 font-extrabold text-[11px] uppercase tracking-wider border border-[#005082]/20 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Precision AI Metabolic Profiler
            </span>
            <span className="text-xs text-slate-400 font-medium">Step {activeStep} of 2</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
            NutriVerse AI Personalized Nutrition Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Formulate customized 7-day nutritional blueprints, exact target macro budgets, and clinical micronutrient stacks.
          </p>
        </div>

        {activeStep === 2 && (
          <button
            onClick={() => setActiveStep(1)}
            className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2 shadow-sm self-start md:self-auto shrink-0"
          >
            <RefreshCw className="w-4 h-4 text-[#005082]" /> Re-Configure Profile
          </button>
        )}
      </div>

      {/* STEP 1: AI Profiler Configuration */}
      {activeStep === 1 && (
        <div className="space-y-8 relative z-10">
          
          {/* Section 1: Health Goal Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 font-heading">
                <div className="w-6 h-6 rounded-lg bg-[#005082] text-white flex items-center justify-center font-black text-xs">1</div>
                Select Your Primary Health Goal:
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {goals.map((g) => {
                const IconComp = g.icon;
                const isSelected = selectedGoal === g.id;
                return (
                  <motion.button
                    key={g.id}
                    whileHover={{ y: -3 }}
                    onClick={() => setSelectedGoal(g.id)}
                    className={`p-5 rounded-3xl border-2 text-left flex flex-col justify-between transition-all duration-300 relative overflow-hidden min-h-[170px] ${
                      isSelected
                        ? `bg-gradient-to-br ${g.color} text-white border-transparent shadow-xl ring-4 ring-amber-400/20`
                        : 'bg-slate-50/80 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 hover:border-[#005082]/40 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-800 text-[#005082] shadow-sm'
                        }`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          isSelected ? 'bg-white/25 text-white' : 'bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}>
                          {g.badge}
                        </span>
                      </div>

                      <h4 className="text-sm font-extrabold font-heading leading-snug mb-1.5">
                        {g.title}
                      </h4>
                      <p className={`text-[11px] leading-relaxed line-clamp-2 ${isSelected ? 'text-white/90 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                        {g.desc}
                      </p>
                    </div>

                    <div className={`mt-3 pt-2.5 border-t text-[10px] font-bold flex items-center justify-between ${
                      isSelected ? 'border-white/20 text-white/90' : 'border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}>
                      <span>Target: {g.calories} kcal/day</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Section 2 & 3 Grid: Dietary Preference & Activity Level */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
            
            {/* Section 2: Dietary Preference */}
            <div className="bg-slate-50/80 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider block mb-4 flex items-center gap-2 font-heading">
                <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">2</div>
                Dietary Preference & Lifestyle:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {diets.map((d) => {
                  const DietIcon = d.icon;
                  const isSelected = selectedDiet === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDiet(d.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                          : 'bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-emerald-600'
                      }`}>
                        <DietIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold font-heading block leading-tight">{d.label}</span>
                        <span className={`text-[10px] block mt-0.5 font-medium ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>{d.tag}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Physical Activity Level */}
            <div className="bg-slate-50/80 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800">
              <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider block mb-4 flex items-center gap-2 font-heading">
                <div className="w-6 h-6 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-black text-xs">3</div>
                Daily Physical Activity Level:
              </label>

              <div className="space-y-3">
                {activities.map((a) => {
                  const isSelected = selectedActivity === a.id;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setSelectedActivity(a.id)}
                      className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white border-cyan-500 shadow-lg shadow-cyan-500/20'
                          : 'bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold font-heading block">{a.label}</span>
                        <span className={`text-[11px] block mt-0.5 font-medium ${isSelected ? 'text-cyan-100' : 'text-slate-400'}`}>{a.desc}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-white bg-white text-cyan-700' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 fill-cyan-600 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Action Button */}
          <div className="pt-4 text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSynthesizePlan}
              disabled={isGenerating}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/30 transition-all flex items-center justify-center gap-2.5 mx-auto"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" /> Synthesizing Personalized AI Plan...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" /> Synthesize Personalized AI Nutrition Plan <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      )}

      {/* STEP 2: AI Synthesized Personalized Plan Output */}
      {activeStep === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 relative z-10"
        >
          {/* Target Macro Breakdown Gauge */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10 relative z-10">
              <div>
                <span className="text-[10px] px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30 uppercase tracking-wider inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> ICMR & Clinical AI Formulated Target
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-white mt-3">{currentGoalObj.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">{currentGoalObj.desc}</p>
              </div>

              <div className="bg-slate-800/90 p-4 rounded-2xl border border-white/10 flex items-center gap-3 shrink-0">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Flame className="w-6 h-6 fill-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Daily Energy Target</span>
                  <strong className="text-2xl font-black text-amber-300 font-heading">{currentGoalObj.calories} <span className="text-xs text-slate-300 font-normal">kcal / day</span></strong>
                </div>
              </div>
            </div>

            {/* Macro Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs relative z-10">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
                <span className="text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider block mb-1">Daily Protein Target</span>
                <strong className="text-3xl font-black text-white font-heading">{currentGoalObj.protein}g</strong>
                <span className="text-[10px] text-slate-400 mt-1">Lean Muscle Retention</span>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
                <span className="text-cyan-400 font-extrabold text-[11px] uppercase tracking-wider block mb-1">Net Complex Carbs</span>
                <strong className="text-3xl font-black text-white font-heading">{currentGoalObj.carbs}g</strong>
                <span className="text-[10px] text-slate-400 mt-1">Slow GI Sustained Energy</span>
              </div>

              <div className="bg-slate-800/80 p-5 rounded-2xl border border-rose-500/30 flex flex-col justify-between">
                <span className="text-rose-400 font-extrabold text-[11px] uppercase tracking-wider block mb-1">Healthy Lipids & Fats</span>
                <strong className="text-3xl font-black text-white font-heading">{currentGoalObj.fat}g</strong>
                <span className="text-[10px] text-slate-400 mt-1">Hormonal Axis Balance</span>
              </div>
            </div>
          </div>

          {/* 7-Day Personal Meal Roadmap */}
          <div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white font-heading mb-4 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-emerald-500" /> Your 7-Day AI Meal Plan Blueprint:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-extrabold text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider block mb-2 w-max">Breakfast • 8:00 AM</span>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">Avocado Egg White Toast & Berry Smoothie</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">2 poached egg whites over sourdough toast with wild blueberry almond milk smoothie.</p>
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-2 block">380 kcal • 28g Protein</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider block mb-2 w-max">Lunch • 1:00 PM</span>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">Mediterranean Salmon & Quinoa</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Pan-seared Atlantic salmon fillet with tri-color quinoa and extra virgin olive oil drizzle.</p>
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-2 block">520 kcal • 42g Protein</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-extrabold text-cyan-600 bg-cyan-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider block mb-2 w-max">Evening Snack • 5:00 PM</span>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">Greek Yogurt with Chia & Almonds</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Non-fat Greek yogurt sprinkled with organic chia seeds and crushed walnuts.</p>
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-2 block">240 kcal • 22g Protein</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-extrabold text-purple-600 bg-purple-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider block mb-2 w-max">Dinner • 8:00 PM</span>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">Grilled Tofu Curry & Cauliflower Rice</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">Organic grilled tofu in turmeric coconut curry over steamed riced cauliflower.</p>
                </div>
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-2 block">410 kcal • 32g Protein</span>
              </div>
            </div>
          </div>

          {/* Clinical Micronutrient Stack */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-orange-500/10 border border-amber-500/30 p-6 rounded-3xl text-xs space-y-4">
            <h5 className="font-extrabold text-amber-700 dark:text-amber-400 font-heading text-sm sm:text-base flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" /> Recommended Clinical Micronutrient Stack:
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <strong className="text-slate-900 dark:text-white block font-bold text-xs mb-1">Magnesium Glycinate (300mg)</strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Deep sleep REM recovery and muscle twitch prevention.</span>
              </div>
              <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <strong className="text-slate-900 dark:text-white block font-bold text-xs mb-1">Vitamin D3 (2,000 IU)</strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Calcium absorption and adaptive immune defense.</span>
              </div>
              <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <strong className="text-slate-900 dark:text-white block font-bold text-xs mb-1">Omega-3 EPA/DHA (1,000mg)</strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Endothelial vascular reduction and cognitive focus.</span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleExportPdf}
              className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition-all flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4 text-[#005082]" /> Export 7-Day Plan PDF
            </button>

            <button
              onClick={() => setConnectDoctorModal(true)}
              className="px-8 py-3 rounded-2xl bg-[#005082] hover:bg-[#003d66] text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Discuss Plan with NutriVerse Doctor
            </button>
          </div>
        </motion.div>
      )}

      {/* Connect Doctor Modal */}
      <AnimatePresence>
        {connectDoctorModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConnectDoctorModal(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-[100] bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 my-auto text-xs"
            >
              <div className="text-center space-y-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#005082]/10 text-[#005082] flex items-center justify-center mx-auto">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Connect Nutrition Plan with Doctor
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  Your personalized {currentGoalObj.title} ({currentGoalObj.calories} kcal/day target) has been linked to the NutriVerse Telehealth marketplace.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setConnectDoctorModal(false);
                    setExportNotice(`Plan linked to NutriVerse Telehealth doctor marketplace!`);
                    setTimeout(() => setExportNotice(null), 3000);
                  }}
                  className="w-full py-3 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white font-bold text-xs shadow-md transition-all"
                >
                  Confirm & Open Doctor Session
                </button>

                <button
                  onClick={() => setConnectDoctorModal(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
