import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Refrigerator, Sparkles, CheckCircle2, ArrowRight, RefreshCw, ChefHat, Clock, Utensils, X, Lightbulb, Bookmark } from 'lucide-react';

interface RecipeDetail {
  title: string;
  category: string;
  image: string;
  prepTime: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  ingredients: string[];
  instructions: string[];
  nestleTip: string;
}

export const PantryAiScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([
    'Fresh Eggs', 'Baby Spinach', 'Greek Yogurt', 'Bell Peppers', 'Almond Milk', 'Garlic', 'Extra Virgin Olive Oil'
  ]);
  const [newIngredientInput, setNewIngredientInput] = useState('');
  const [recipeModalOpen, setRecipeModalOpen] = useState(false);

  const [generatedRecipe, setGeneratedRecipe] = useState<RecipeDetail>({
    title: 'Spinach & Roasted Pepper White Omelette',
    category: 'Pantry AI Synthesis',
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=600&q=80',
    prepTime: '12 mins',
    calories: 340,
    protein: 28,
    carbs: 14,
    fat: 16,
    description: 'High-protein fluffy egg white omelette stuffed with fresh baby spinach, diced bell peppers, and garlic olive oil.',
    ingredients: ['Fresh Eggs (4 Whites)', 'Baby Spinach (1 Cup)', 'Sweet Bell Peppers', 'Garlic & Olive Oil', 'Almond Milk'],
    instructions: [
      'Whisk 4 egg whites with 1 tbsp almond milk and a pinch of sea salt.',
      'Sauté minced garlic and diced sweet bell peppers in olive oil for 3 minutes.',
      'Pour egg whites into skillet, add fresh baby spinach, fold omelette when golden brown, and serve.'
    ],
    nestleTip: 'NutriVerse Clinical AI Tip: Egg white protein provides 100% bio-available amino acids for morning metabolic activation with zero saturated fat.'
  });

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIngredients([
        'Wild Salmon Fillet', 'Hass Avocado', 'Fresh Lemons', 'Cilantro', 'Cherry Tomatoes', 'Tri-color Quinoa'
      ]);
      setGeneratedRecipe({
        title: 'Citrus Avocado Salmon Quinoa Skillet',
        category: 'Pantry AI Synthesis',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        prepTime: '15 mins',
        calories: 480,
        protein: 41,
        carbs: 36,
        fat: 18,
        description: 'Pan-seared wild salmon over fluffy lemon quinoa, diced Hass avocado, and cherry tomato relish.',
        ingredients: ['Wild Salmon Fillet', 'Tri-color Quinoa', 'Hass Avocado', 'Fresh Lemons', 'Cherry Tomatoes'],
        instructions: [
          'Cook tri-color quinoa in vegetable broth for 12 minutes until tender.',
          'Sear salmon fillet in olive oil for 4 minutes per side; season with lemon juice and cracked pepper.',
          'Plate quinoa with seared salmon, sliced avocado, and fresh cilantro.'
        ],
        nestleTip: 'NutriVerse Clinical AI Tip: High marine Omega-3 EPA/DHA fatty acids actively support cardiovascular arterial elasticity.'
      });
    }, 1200);
  };

  const handleAddCustomIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIngredientInput.trim()) return;
    setIngredients(prev => [...prev, newIngredientInput.trim()]);
    setNewIngredientInput('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden">
      
      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
            <Refrigerator className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
                Pantry & Refrigerator AI Scanner
              </h3>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-extrabold border border-violet-500/20">
                Pantry Intelligence v2.0
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Scan open fridge photo to auto-generate gourmet recipes and smart grocery shopping lists
            </p>
          </div>
        </div>

        <button
          onClick={handleScan}
          disabled={isScanning}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-violet-500/25 transition-all flex items-center gap-2 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Scanning Refrigerator...' : 'Simulate Fridge Scan'}
        </button>
      </div>

      {/* Main Grid: Inventory & AI Recipe */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Detected Ingredients */}
        <div className="lg:col-span-6 bg-slate-50/80 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-violet-600 dark:text-violet-400 uppercase tracking-wider flex items-center gap-1.5 font-heading">
                <Sparkles className="w-4 h-4" /> Detected Fridge Ingredients ({ingredients.length}):
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 mb-4">
              {ingredients.map((item, idx) => (
                <span 
                  key={idx} 
                  className="text-xs px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 font-bold flex items-center gap-2 shadow-sm hover:scale-105 transition-transform"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                </span>
              ))}
            </div>
          </div>

          {/* Add Ingredient Form */}
          <form onSubmit={handleAddCustomIngredient} className="flex items-center gap-2 pt-3 border-t border-slate-200/80 dark:border-slate-800">
            <input
              type="text"
              value={newIngredientInput}
              onChange={(e) => setNewIngredientInput(e.target.value)}
              placeholder="+ Add pantry ingredient..."
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-violet-500"
            />
            <button
              type="submit"
              disabled={!newIngredientInput.trim()}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Add
            </button>
          </form>
        </div>

        {/* Right Column: AI Auto-Generated Recipe */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#005082] via-[#003d66] to-[#002845] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
              ✨ Instant AI Recipe Synthesized from Available Pantry
            </span>

            <h4 className="text-xl sm:text-2xl font-black font-heading text-white leading-snug">
              {generatedRecipe.title}
            </h4>

            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {generatedRecipe.description}
            </p>

            <div className="grid grid-cols-3 gap-3 bg-white/10 p-3.5 rounded-2xl text-center border border-white/15 text-xs">
              <div>
                <span className="text-slate-300 block text-[10px] uppercase font-bold">Prep Time</span>
                <strong className="text-white font-extrabold">{generatedRecipe.prepTime}</strong>
              </div>
              <div>
                <span className="text-slate-300 block text-[10px] uppercase font-bold">Calories</span>
                <strong className="text-amber-300 font-extrabold">{generatedRecipe.calories} kcal</strong>
              </div>
              <div>
                <span className="text-slate-300 block text-[10px] uppercase font-bold">Protein</span>
                <strong className="text-emerald-300 font-extrabold">{generatedRecipe.protein}g</strong>
              </div>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <button 
              onClick={() => setRecipeModalOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Generate Step-by-Step Cooking Guide</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Cooking Guide Modal (Blurred BG, No Cross Sign, Centered Square Image) */}
      <AnimatePresence>
        {recipeModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRecipeModalOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-[100] bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[88vh] my-auto"
            >
              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs no-scrollbar text-center">
                
                <div>
                  <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3" /> {generatedRecipe.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 dark:text-white leading-tight">
                    {generatedRecipe.title}
                  </h3>
                </div>

                {/* Centered Square Food Image */}
                <div className="flex justify-center my-3">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100 dark:border-slate-800 shrink-0">
                    <img 
                      src={generatedRecipe.image} 
                      alt={generatedRecipe.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Macro Nutritional Badges */}
                <div className="grid grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl text-center border border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Calories</span>
                    <strong className="text-base font-extrabold text-amber-500">{generatedRecipe.calories} kcal</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Protein</span>
                    <strong className="text-base font-extrabold text-emerald-500">{generatedRecipe.protein}g</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Carbs</span>
                    <strong className="text-base font-extrabold text-cyan-500">{generatedRecipe.carbs}g</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Healthy Fats</span>
                    <strong className="text-base font-extrabold text-rose-400">{generatedRecipe.fat}g</strong>
                  </div>
                </div>

                {/* Ingredients List */}
                <div className="text-left">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs font-heading mb-2.5 flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-amber-500" /> Pantry Ingredients Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {generatedRecipe.ingredients.map((ing, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Preparation */}
                <div className="text-left">
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-xs font-heading mb-2.5 flex items-center gap-1.5">
                    <ChefHat className="w-4 h-4 text-emerald-500" /> Step-by-Step Culinary Preparation Guide:
                  </h4>
                  <ol className="space-y-2.5">
                    {generatedRecipe.instructions.map((step, idx) => (
                      <li key={idx} className="flex gap-3 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <span className="w-6 h-6 rounded-full bg-[#005082] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium pt-0.5">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Clinical Tip */}
                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-start gap-3 text-left">
                  <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-600 dark:text-amber-400 font-bold block mb-1">NutriVerse Clinical Nutritionist Insight</strong>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {generatedRecipe.nestleTip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end shrink-0">
                <button
                  onClick={() => setRecipeModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white font-extrabold text-xs shadow-md transition-all"
                >
                  Close Cooking Guide
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
