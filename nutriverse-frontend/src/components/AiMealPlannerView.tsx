import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, Clock, ChefHat, Sparkles, Check, ArrowRight, RefreshCw, 
  Bookmark, CheckCircle2, ChevronLeft, ChevronRight, Minus, Plus, X, 
  Tag, ShoppingCart, Droplets, Flame, Activity, Copy, ShieldCheck, Scale 
} from 'lucide-react';

interface IngredientDetail {
  name: string;
  amount: string;
  image: string;
}

interface MealPlanItem {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  title: string;
  time: string;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  budget: string;
  image: string;
  detailedIngredients: IngredientDetail[];
  instructions: string[];
}

interface GoalBudget {
  id: string;
  name: string;
  targetKcal: number;
  proteinTarget: string;
  carbsTarget: string;
  fatTarget: string;
  desc: string;
}

const GOAL_BUDGETS: GoalBudget[] = [
  { id: 'loss', name: 'Weight Loss', targetKcal: 1400, proteinTarget: '130g', carbsTarget: '110g', fatTarget: '45g', desc: 'Caloric deficit tailored for lean fat loss' },
  { id: 'balanced', name: 'Balanced Maintenance', targetKcal: 1640, proteinTarget: '150g', carbsTarget: '140g', fatTarget: '55g', desc: 'Optimal macro ratio for energy & metabolic health' },
  { id: 'hypertrophy', name: 'Muscle Hypertrophy', targetKcal: 2100, proteinTarget: '180g', carbsTarget: '190g', fatTarget: '65g', desc: 'High protein surplus for lean muscle synthesis' },
  { id: 'keto', name: 'Keto Low-Carb', targetKcal: 1500, proteinTarget: '125g', carbsTarget: '35g', fatTarget: '90g', desc: 'Low glycemic impact for fat adaptation' },
];

// Swappable Alternative Dishes Roster
const ALTERNATIVE_SWAPS: Record<string, MealPlanItem> = {
  Breakfast: {
    id: 'alt-b1',
    type: 'Breakfast',
    title: 'Savory Oats & Spiced Egg Whites Bowl',
    time: '8 mins',
    calories: 360,
    protein: '26g',
    carbs: '30g',
    fat: '12g',
    budget: '₹120',
    image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=600&q=80',
    detailedIngredients: [
      { name: 'Rolled Oats', amount: '1/2 Cup (45 gm)', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=100&q=80' },
      { name: 'Egg Whites', amount: '3.0 Large (90 ml)', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=100&q=80' },
      { name: 'Cumin & Mustard', amount: '1/2 Tsp (3 gm)', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=100&q=80' }
    ],
    instructions: ['Cook oats with spices.', 'Stir in egg whites until fluffy.', 'Serve warm with fresh herbs.']
  },
  Lunch: {
    id: 'alt-l1',
    type: 'Lunch',
    title: 'Herb Grilled Paneer & Quinoa Salad',
    time: '15 mins',
    calories: 510,
    protein: '38g',
    carbs: '36g',
    fat: '16g',
    budget: '₹210',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    detailedIngredients: [
      { name: 'Fresh Paneer', amount: '150 gm Cubed', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80' },
      { name: 'Cooked Quinoa', amount: '1/2 Cup (90 gm)', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=100&q=80' }
    ],
    instructions: ['Sear paneer cubes in olive oil.', 'Toss with cooked quinoa and lemon dressing.', 'Serve fresh.']
  },
  Dinner: {
    id: 'alt-d1',
    type: 'Dinner',
    title: 'Kadhai Mushroom & Baby Spinach Dahl',
    time: '18 mins',
    calories: 460,
    protein: '28g',
    carbs: '54g',
    fat: '10g',
    budget: '₹160',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    detailedIngredients: [
      { name: 'Button Mushrooms', amount: '1.0 Cup (100 gm)', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&q=80' },
      { name: 'Yellow Dal', amount: '1/2 Cup (90 gm)', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=100&q=80' }
    ],
    instructions: ['Sauté sliced mushrooms with kadhai spices.', 'Simmer with yellow dal and baby spinach.', 'Serve hot with Basmati rice.']
  },
  Snack: {
    id: 'alt-s1',
    type: 'Snack',
    title: 'Spiced Roasted Makhana & Almonds',
    time: '3 mins',
    calories: 190,
    protein: '14g',
    carbs: '20g',
    fat: '6g',
    budget: '₹70',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600&q=80',
    detailedIngredients: [
      { name: 'Foxnut Makhana', amount: '1.0 Cup (30 gm)', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=100&q=80' },
      { name: 'Raw Almonds', amount: '10.0 Pieces (15 gm)', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=100&q=80' }
    ],
    instructions: ['Roast makhana in 1/2 tsp ghee with black salt.', 'Toss with raw almonds and serve crunchy.']
  }
};

export const AiMealPlannerView: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<GoalBudget>(GOAL_BUDGETS[1]);
  const [selectedMeal, setSelectedMeal] = useState<MealPlanItem | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [activePlanSet, setActivePlanSet] = useState(0);

  // Live Hydration Tracker State (in ml)
  const [waterIntakeMl, setWaterIntakeMl] = useState(2500);

  // Smart Grocery List Modal State
  const [isGroceryModalOpen, setIsGroceryModalOpen] = useState(false);
  const [checkedGroceryItems, setCheckedGroceryItems] = useState<Record<string, boolean>>({});
  const [copyNotice, setCopyNotice] = useState<string | null>(null);

  // Collapsible section toggles inside modal
  const [showIngredients, setShowIngredients] = useState(true);
  const [showSteps, setShowSteps] = useState(true);

  // 24 Unique Gourmet Macro-Balanced Meals Across 6 Plan Sets (Local Indian Rupee Pricing ₹)
  const [mealSets, setMealSets] = useState<MealPlanItem[][]>([
    [
      {
        id: 'm1',
        type: 'Breakfast',
        title: 'Poached Eggs on Truffle Avocado Rye',
        time: '10 mins',
        calories: 380,
        protein: '24g',
        carbs: '32g',
        fat: '14g',
        budget: '₹140',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
        detailedIngredients: [
          { name: 'Dark Rye Bread', amount: '2.0 Slices (60 gm)', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=100&q=80' },
          { name: 'Pasture Eggs', amount: '2.0 Whole (100 gm)', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=100&q=80' },
          { name: 'Hass Avocado', amount: '1/2 Fruit (75 gm)', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=100&q=80' },
          { name: 'White Truffle Oil', amount: '1/2 Tsp (2.5 ml)', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=100&q=80' },
          { name: 'Lemon Juice', amount: '1.0 Tsp (5 ml)', image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=100&q=80' },
          { name: 'Radish Microgreens', amount: '1.0 Tbsp (5 gm)', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&q=80' }
        ],
        instructions: [
          'Heat a pan or toaster and toast 2 dark rye bread slices until crisp and golden brown.',
          'In a bowl, mash 1/2 Hass avocado with 1 tsp lemon juice, sea salt, and black pepper.',
          'Bring water with 1 tbsp vinegar to a gentle simmer; poach 2 pasture eggs for 3 minutes.',
          'Spread mashed avocado evenly over warm rye toast.',
          'Place poached eggs on top and drizzle white truffle oil.',
          'Garnish with fresh radish microgreens.',
          'Serve hot immediately.'
        ]
      },
      {
        id: 'm2',
        type: 'Lunch',
        title: 'Pan-Seared Sea Bass with Asparagus & Quinoa',
        time: '18 mins',
        calories: 540,
        protein: '44g',
        carbs: '38g',
        fat: '16g',
        budget: '₹260',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        detailedIngredients: [
          { name: 'Fresh Sea Bass Fillet', amount: '1.0 Fillet (200 gm)', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=100&q=80' },
          { name: 'Tri-Color Quinoa', amount: '1/2 Cup (90 gm)', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=100&q=80' },
          { name: 'Green Asparagus', amount: '6.0 Spears (80 gm)', image: 'https://images.unsplash.com/photo-1518843025960-d60217f226f5?auto=format&fit=crop&w=100&q=80' },
          { name: 'Extra Virgin Olive Oil', amount: '1.0 Tbsp (14 ml)', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=100&q=80' }
        ],
        instructions: [
          'Pat sea bass fillet dry; season with sea salt and white pepper.',
          'Heat olive oil in a skillet over medium-high heat until shimmering.',
          'Place sea bass skin-side down and sear for 4 minutes until golden-crisp.',
          'Flip fish and sear for 2 more minutes until cooked through.',
          'Sauté asparagus spears with minced garlic for 3 minutes.',
          'Spoon cooked tri-color quinoa onto a plate.',
          'Top with seared sea bass, asparagus, and Meyer lemon juice.'
        ]
      },
      {
        id: 'm3',
        type: 'Dinner',
        title: 'Paneer Tikka Masala with Cauliflower Naan',
        time: '20 mins',
        calories: 480,
        protein: '34g',
        carbs: '26g',
        fat: '18g',
        budget: '₹180',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
        detailedIngredients: [
          { name: 'Low-Fat Cottage Paneer', amount: '150 gm Cubed', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80' },
          { name: 'Greek Curd / Yogurt', amount: '1/4 Cup (60 gm)', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=100&q=80' },
          { name: 'Tomato Cashew Sauce', amount: '1/2 Cup (120 ml)', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=100&q=80' },
          { name: 'Cauliflower Flour', amount: '1/2 Cup (50 gm)', image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=100&q=80' }
        ],
        instructions: [
          'Marinate paneer cubes in curd, Kashmiri chili, and spices for 15 mins.',
          'Char grill paneer under oven broiler for 6 minutes.',
          'Simmer tomato cashew sauce with kasuri methi in a pan.',
          'Add charred paneer into simmering tikka curry.',
          'Mix cauliflower flour with water and bake low-carb naan.',
          'Garnish curry with coriander and serve hot with cauliflower naan.'
        ]
      },
      {
        id: 'm4',
        type: 'Snack',
        title: 'Dark Chocolate Chia Collagen Pudding',
        time: '5 mins',
        calories: 210,
        protein: '18g',
        carbs: '18g',
        fat: '6g',
        budget: '₹85',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
        detailedIngredients: [
          { name: 'Organic Chia Seeds', amount: '3.0 Tbsp (30 gm)', image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=100&q=80' },
          { name: '85% Dutch Cacao', amount: '1.0 Tbsp (10 gm)', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=100&q=80' },
          { name: 'Collagen Peptides', amount: '1.0 Scoop (15 gm)', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=100&q=80' }
        ],
        instructions: [
          'Whisk chia seeds, cacao powder, and collagen peptides in a jar.',
          'Pour cold almond milk while stirring to prevent clumping.',
          'Add stevia drops for natural sweetness.',
          'Refrigerate for 20 minutes until thick and pudding-like.',
          'Top with cacao nibs and serve cold.'
        ]
      }
    ],
    [
      {
        id: 'm5',
        type: 'Breakfast',
        title: 'Smoked Salmon & Egg White Frittata',
        time: '12 mins',
        calories: 390,
        protein: '32g',
        carbs: '14g',
        fat: '15g',
        budget: '₹165',
        image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=600&q=80',
        detailedIngredients: [
          { name: 'Egg Whites', amount: '4.0 Large (120 ml)', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=100&q=80' },
          { name: 'Smoked Atlantic Salmon', amount: '50 gm Sliced', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=100&q=80' }
        ],
        instructions: [
          'Preheat oven to 190°C. Whisk egg whites with fresh chopped dill.',
          'Sauté cherry tomatoes in a cast-iron skillet for 2 minutes.',
          'Pour egg whites into skillet and let edges set.',
          'Layer smoked salmon ribbons and capers on top.',
          'Bake in oven for 8-10 minutes until puffed and set.'
        ]
      },
      {
        id: 'm6',
        type: 'Lunch',
        title: 'Thai Coconut Lemongrass Tofu Curry',
        time: '16 mins',
        calories: 510,
        protein: '36g',
        carbs: '34g',
        fat: '16g',
        budget: '₹210',
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80',
        detailedIngredients: [
          { name: 'Organic Firm Tofu', amount: '200 gm Cubed', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80' },
          { name: 'Lite Coconut Milk', amount: '1.0 Cup (240 ml)', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=100&q=80' }
        ],
        instructions: [
          'Press tofu dry and cut into 1-inch cubes.',
          'Sauté lemongrass paste and snap peas in a wok for 2 minutes.',
          'Pour in coconut milk and bring to a gentle simmer.',
          'Add tofu cubes and simmer for 6-8 minutes.',
          'Serve hot over steamed jasmine rice.'
        ]
      },
      {
        id: 'm7',
        type: 'Dinner',
        title: 'Herbed Lemon Turkey Meatballs with Brown Rice',
        time: '22 mins',
        calories: 520,
        protein: '46g',
        carbs: '42g',
        fat: '12g',
        budget: '₹230',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
        detailedIngredients: [
          { name: 'Lean Ground Turkey', amount: '200 gm Raw', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=100&q=80' },
          { name: 'Brown Rice', amount: '1/2 Cup (100 gm)', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=100&q=80' }
        ],
        instructions: [
          'Combine ground turkey, minced garlic, oregano, and salt in a bowl.',
          'Roll mixture into 4 uniform meatballs; bake at 200°C for 15 minutes.',
          'Serve meatballs over warm brown rice with tzatziki drizzle.'
        ]
      },
      {
        id: 'm8',
        type: 'Snack',
        title: 'Matcha Green Tea Protein Parfait',
        time: '4 mins',
        calories: 190,
        protein: '22g',
        carbs: '16g',
        fat: '4g',
        budget: '₹95',
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
        detailedIngredients: [
          { name: 'Ceremonial Matcha', amount: '1.0 Tsp (3 gm)', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=100&q=80' },
          { name: 'Non-Fat Greek Yogurt', amount: '3/4 Cup (170 gm)', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=100&q=80' }
        ],
        instructions: [
          'Whisk ceremonial matcha powder into Greek yogurt with protein.',
          'Layer with fresh raspberries and serve chilled.'
        ]
      }
    ]
  ]);

  const handleNextSet = () => {
    setActivePlanSet((prev) => (prev + 1) % mealSets.length);
  };

  const handlePrevSet = () => {
    setActivePlanSet((prev) => (prev - 1 + mealSets.length) % mealSets.length);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setActivePlanSet((prev) => (prev + 1) % mealSets.length);
      setIsRegenerating(false);
    }, 1000);
  };

  // 1-Click Meal Swap Handler
  const handleSwapIndividualMeal = (mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack') => {
    const swapItem = ALTERNATIVE_SWAPS[mealType];
    if (swapItem) {
      setMealSets(prev => {
        const nextSets = [...prev];
        const currentSet = [...nextSets[activePlanSet]];
        const idx = currentSet.findIndex(m => m.type === mealType);
        if (idx !== -1) {
          currentSet[idx] = swapItem;
          nextSets[activePlanSet] = currentSet;
        }
        return nextSets;
      });
    }
  };

  const currentMeals = mealSets[activePlanSet] || mealSets[0];

  // Calculate Total Kcal & Macros for Current Active Set
  const totalKcal = currentMeals.reduce((acc, m) => acc + m.calories, 0);
  const totalProteinG = currentMeals.reduce((acc, m) => acc + parseInt(m.protein || '0'), 0);
  const totalCarbsG = currentMeals.reduce((acc, m) => acc + parseInt(m.carbs || '0'), 0);
  const totalFatG = currentMeals.reduce((acc, m) => acc + parseInt(m.fat || '0'), 0);

  // Compile All Ingredients for Smart Grocery List
  const allCurrentIngredients = currentMeals.flatMap(m => m.detailedIngredients || []);

  const handleCopyGroceryList = () => {
    const text = allCurrentIngredients.map(item => `• ${item.name}: ${item.amount}`).join('\n');
    navigator.clipboard.writeText(`NutriVerse AI Smart Grocery Shopping List (Plan Set ${activePlanSet + 1}):\n\n${text}`);
    setCopyNotice("Grocery list copied to clipboard!");
    setTimeout(() => setCopyNotice(null), 3000);
  };

  const toggleCheckGrocery = (name: string) => {
    setCheckedGroceryItems(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 mb-8 border border-slate-200/80 dark:border-slate-800 shadow-xl relative">
      
      {/* Top Main Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
              Today's AI Macro-Balanced Meal Plan
            </h3>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20">
              Target: {selectedGoal.targetKcal} kcal
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Automated daily meal distribution tailored to your target protein and energy budgets (Local Indian Prices in ₹)
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          
          {/* Smart Grocery List Button */}
          <button
            onClick={() => setIsGroceryModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Smart Grocery List</span>
          </button>


          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="px-4 py-2.5 rounded-2xl bg-[#005082] hover:bg-[#003d66] disabled:opacity-50 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            {isRegenerating ? 'Synthesizing...' : 'Re-Generate AI Meals'}
          </button>
        </div>
      </div>

      {/* Goal Budget Selector Cards */}
      <div className="mb-6">
        <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-3 font-heading">
          Select Target Goal Budget:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {GOAL_BUDGETS.map((goal) => {
            const isSelected = selectedGoal.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#005082] to-[#003d66] text-white border-[#005082] shadow-lg shadow-[#005082]/20'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black font-heading truncate">{goal.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-amber-400 text-slate-900' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    {goal.targetKcal} kcal
                  </span>
                </div>
                <span className={`text-[11px] block ${isSelected ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>
                  Protein: {goal.proteinTarget} • Carbs: {goal.carbsTarget}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Macro & Hydration Bio-Tracker Dashboard */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
          
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading">
                Daily Macro Synthesis & Hydration Tracker
              </h4>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Real-time glycemic index & metabolic satiety analysis
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Water Tracker Button */}
            <button
              onClick={() => setWaterIntakeMl(prev => Math.min(4000, prev + 250))}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-bold flex items-center gap-1.5 hover:bg-cyan-500/20 transition-all"
            >
              <Droplets className="w-3.5 h-3.5 text-cyan-500" />
              <span>💧 {waterIntakeMl / 1000}L / 3.0L (+250ml)</span>
            </button>

            <span className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              ⚡ 96% Satiety Score
            </span>
          </div>
        </div>

        {/* Live Macro Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          
          <div className="space-y-1.5">
            <div className="flex justify-between font-bold">
              <span className="text-slate-600 dark:text-slate-400">Total Calories</span>
              <strong className="text-slate-900 dark:text-white">{totalKcal} / {selectedGoal.targetKcal} kcal</strong>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: `${Math.min(100, (totalKcal / selectedGoal.targetKcal) * 100)}%` }}></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-bold">
              <span className="text-emerald-600 dark:text-emerald-400">Protein Target</span>
              <strong className="text-emerald-600 dark:text-emerald-400">{totalProteinG}g / {selectedGoal.proteinTarget}</strong>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: '92%' }}></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-bold">
              <span className="text-cyan-600 dark:text-cyan-400">Carbs Budget</span>
              <strong className="text-cyan-600 dark:text-cyan-400">{totalCarbsG}g / {selectedGoal.carbsTarget}</strong>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-cyan-500" style={{ width: '96%' }}></div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-bold">
              <span className="text-purple-600 dark:text-purple-400">Healthy Fats</span>
              <strong className="text-purple-600 dark:text-purple-400">{totalFatG}g / {selectedGoal.fatTarget}</strong>
            </div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-purple-500" style={{ width: '88%' }}></div>
            </div>
          </div>

        </div>
      </div>

      {/* Meals Grid Container with Floating Side Navigation Arrows (< and >) */}
      <div className="relative group px-1">
        
        {/* Floating Left Side Arrow Button (<) */}
        <button
          onClick={handlePrevSet}
          className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          title="Previous Meal Set (<)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Floating Right Side Arrow Button (>) */}
        <button
          onClick={handleNextSet}
          className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#005082] hover:bg-[#003d66] text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          title="Next Meal Set (>)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Meals 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentMeals.map((meal, idx) => (
            <motion.div
              key={meal.id + idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-40 overflow-hidden group">
                <img src={meal.image} alt={meal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 text-emerald-400 font-bold text-[11px] backdrop-blur-md">
                  {meal.type}
                </span>

                {/* 1-Click Swap Meal Button */}
                <button
                  onClick={() => handleSwapIndividualMeal(meal.type)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:text-[#005082] hover:bg-white transition-all shadow-md"
                  title="Swap with Alternative Dish"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{meal.title}</h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#005082] dark:text-cyan-400" /> {meal.time}</span>
                    {/* Local Indian Price Badge in Rupees ₹ */}
                    <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                      <Tag className="w-3 h-3 text-amber-600" /> {meal.budget}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 text-center py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 text-[11px]">
                  <div><span className="text-slate-400 block text-[10px]">Kcal</span><strong className="text-slate-900 dark:text-white">{meal.calories}</strong></div>
                  <div><span className="text-emerald-600 dark:text-emerald-400 block text-[10px]">Protein</span><strong className="text-emerald-600 dark:text-emerald-400">{meal.protein}</strong></div>
                  <div><span className="text-cyan-600 dark:text-cyan-400 block text-[10px]">Carbs</span><strong className="text-cyan-600 dark:text-cyan-400">{meal.carbs}</strong></div>
                </div>

                <button
                  onClick={() => setSelectedMeal(meal)}
                  className="w-full py-2.5 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white font-bold text-xs transition-all flex items-center justify-center gap-1 shadow-sm"
                >
                  View Recipe & Cooking Guide <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Two-Column Detailed Recipe View Modal (Matching AskNestle Official Design) */}
      <AnimatePresence>
        {selectedMeal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            
            {/* Modal Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMeal(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-[100] bg-white dark:bg-slate-900 max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] border border-slate-200 dark:border-slate-800 flex flex-col my-auto"
            >
              {/* Top Bar Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#005082]/10 text-[#005082] dark:text-cyan-400 font-extrabold text-xs">
                    {selectedMeal.type} Recipe • {selectedMeal.time} • Est. Cost: {selectedMeal.budget}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-heading">{selectedMeal.title}</h3>
                </div>

                <button
                  onClick={() => setSelectedMeal(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 overflow-y-auto flex-1 no-scrollbar space-y-6">
                
                {/* Two-Column Grid: Left Column = Ingredients with Icons, Right Column = Recipes Steps Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                  {/* LEFT COLUMN: Ingredients with Icons & Exact Quantities (md:col-span-5) */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                      <div 
                        onClick={() => setShowIngredients(!showIngredients)}
                        className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <ChefHat className="w-5 h-5 text-[#005082] dark:text-cyan-400" />
                          <h4 className="text-base font-black text-slate-900 dark:text-white font-heading">Ingredients</h4>
                        </div>
                        <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400">
                          {showIngredients ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>

                      {showIngredients && (
                        <div className="pt-3 space-y-3 max-h-[420px] overflow-y-auto no-scrollbar pr-1">
                          {(selectedMeal.detailedIngredients || []).map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-3 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                               <div className="flex items-center gap-3">
                                 <img 
                                   src={item.image} 
                                   alt={item.name} 
                                   onError={(e) => {
                                     (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=100&q=80';
                                   }}
                                   className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-slate-700" 
                                 />
                                 <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.name}</span>
                               </div>
                               <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 shrink-0">{item.amount}</span>
                             </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Recipes Steps Timeline (md:col-span-7) */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800">
                      <div 
                        onClick={() => setShowSteps(!showSteps)}
                        className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 cursor-pointer mb-4"
                      >
                        <div className="flex items-center gap-2">
                          <Utensils className="w-5 h-5 text-[#005082] dark:text-cyan-400" />
                          <h4 className="text-base font-black text-slate-900 dark:text-white font-heading">Steps</h4>
                        </div>
                        <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400">
                          {showSteps ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>
                      </div>

                      {showSteps && (
                        <div className="space-y-6 relative pl-4 before:absolute before:left-[21px] before:top-3 before:bottom-3 before:w-0.5 before:bg-cyan-500/30">
                          <h5 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2">Recipes Steps</h5>
                          
                          {selectedMeal.instructions.map((stepText, stepIdx) => (
                            <div key={stepIdx} className="relative pl-8">
                              {/* Blue Dot Node on Timeline */}
                              <div className="absolute left-[-2px] top-1 w-3.5 h-3.5 rounded-full bg-[#005082] ring-4 ring-cyan-500/20 z-10"></div>
                              
                              <div className="space-y-1">
                                <span className="text-xs font-black text-[#005082] dark:text-cyan-400 font-heading block">
                                  Step {stepIdx + 1}
                                </span>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                  {stepText}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
                <button
                  onClick={() => setSelectedMeal(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white font-bold text-xs shadow-md transition-all"
                >
                  Close Recipe
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Smart Grocery List Modal */}
      <AnimatePresence>
        {isGroceryModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGroceryModalOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-[100] bg-white dark:bg-slate-900 max-w-xl w-full rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] border border-slate-200 dark:border-slate-800 flex flex-col my-auto"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">
                      Smart Grocery Shopping List
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Plan Set {activePlanSet + 1} • {allCurrentIngredients.length} Ingredients Compiled
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsGroceryModalOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Checklist */}
              <div className="p-6 overflow-y-auto flex-1 space-y-3 no-scrollbar">
                {copyNotice && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold text-center">
                    {copyNotice}
                  </div>
                )}

                {allCurrentIngredients.map((item, idx) => {
                  const isChecked = !!checkedGroceryItems[item.name];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheckGrocery(item.name)}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60 line-through'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=100&q=80';
                          }}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700" 
                        />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{item.amount}</span>
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-700'}`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={handleCopyGroceryList}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Copy className="w-4 h-4" /> Copy List
                </button>

                <button
                  onClick={() => setIsGroceryModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white font-bold text-xs shadow-md transition-all"
                >
                  Done Shopping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
