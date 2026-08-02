import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ChefHat, Clock, Utensils, CheckCircle2, Bookmark, Lightbulb, 
  ChevronLeft, ChevronRight, Search, ShieldCheck, Minus, Plus, X, Tag
} from 'lucide-react';

interface IngredientDetail {
  name: string;
  amount: string;
  image: string;
}

interface Recipe {
  id: string;
  title: string;
  category: string;
  image: string;
  prepTime: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  estCost: string;
  description: string;
  ingredients: string[];
  detailedIngredients: IngredientDetail[];
  instructions: string[];
  nestleTip: string;
}

export const AskNestleRecipes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pantryInput, setPantryInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipeModal, setGeneratedRecipeModal] = useState<Recipe | null>(null);
  const [selectedRecipeModal, setSelectedRecipeModal] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);

  // Collapsible section toggles inside modal
  const [showIngredients, setShowIngredients] = useState(true);
  const [showSteps, setShowSteps] = useState(true);

  const categories = ['All', 'High Protein', 'Keto', 'Vegan', 'Low Carb', 'Diabetic Friendly', 'Indian Regional', 'Kids Special'];

  // Gourmet Healthy Recipes Roster (Indian Rupee Pricing ₹ & Detailed Ingredient Thumbnails)
  const catalogRecipes: Recipe[] = [
    {
      id: 'rec-1',
      title: 'Monsoon Anti-Inflammatory Turmeric Dal',
      category: 'Indian Regional',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
      prepTime: '25 mins',
      calories: 320,
      protein: 18,
      carbs: 42,
      fat: 6,
      estCost: '₹140',
      description: 'Warm yellow lentil soup seasoned with fresh ginger, organic turmeric, cumin seeds, and a touch of A2 Ghee.',
      ingredients: ['Yellow Moong Dal', 'Fresh Ginger', 'Turmeric Powder', 'Cumin Seeds', 'Asafoetida (Hing)', 'A2 Ghee', 'Fresh Coriander'],
      detailedIngredients: [
        { name: 'Yellow Moong Dal', amount: '1/2 Cup (90 gm)', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=100&q=80' },
        { name: 'Fresh Ginger', amount: '1.0 Tsp Chopped (5 gm)', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=100&q=80' },
        { name: 'Organic Turmeric', amount: '1/2 Tsp (2.5 gm)', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=100&q=80' },
        { name: 'Cumin Seeds (Jeera)', amount: '1/2 Tsp (2 gm)', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=100&q=80' },
        { name: 'A2 Cow Ghee', amount: '1.0 Tbsp (14 ml)', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=100&q=80' },
        { name: 'Fresh Coriander', amount: '1.0 Chopped Tbsp (5 gm)', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&q=80' }
      ],
      instructions: [
        'Rinse yellow moong dal until water runs clear and pressure cook for 3 whistles with turmeric and ginger.',
        'Heat 1 tbsp A2 ghee in a small pan, temper cumin seeds and asafoetida until aromatic.',
        'Add chopped green chilies and curry leaves into the hot tempering.',
        'Pour aromatic tempering over pressure cooked dal.',
        'Simmer dal for 5 minutes over low heat until flavors combine well.',
        'Garnish with fresh chopped coriander leaves.',
        'Serve piping hot with steamed basmati rice or rotis.'
      ],
      nestleTip: 'NutriVerse Clinical Tip: Curcumin in turmeric becomes 2,000% more bioavailable when paired with black pepper and healthy lipids like ghee.'
    },
    {
      id: 'rec-2',
      title: 'Keto Herb Butter Salmon & Asparagus',
      category: 'Keto',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
      prepTime: '15 mins',
      calories: 510,
      protein: 44,
      carbs: 4,
      fat: 32,
      estCost: '₹280',
      description: 'Pan-seared wild Atlantic salmon fillet served with rosemary garlic herb butter and grilled asparagus spears.',
      ingredients: ['Wild Atlantic Salmon Fillet', 'Fresh Asparagus', 'Grass-fed Butter', 'Rosemary', 'Garlic', 'Lemon Juice'],
      detailedIngredients: [
        { name: 'Wild Atlantic Salmon', amount: '1.0 Fillet (200 gm)', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=100&q=80' },
        { name: 'Fresh Green Asparagus', amount: '6.0 Spears (80 gm)', image: 'https://images.unsplash.com/photo-1518843025960-d60217f226f5?auto=format&fit=crop&w=100&q=80' },
        { name: 'Grass-Fed Butter', amount: '1.0 Tbsp (15 gm)', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=100&q=80' },
        { name: 'Fresh Rosemary', amount: '1.0 Sprig (3 gm)', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=100&q=80' },
        { name: 'Garlic Cloves', amount: '2.0 Minced (6 gm)', image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=100&q=80' }
      ],
      instructions: [
        'Pat salmon fillet completely dry with paper towels and season with sea salt.',
        'Heat skillet over medium-high heat and sear salmon skin-side down for 4 minutes.',
        'Flip fillet and cook for an additional 3 minutes.',
        'Melt grass-fed butter in pan with minced garlic and rosemary.',
        'Baste salmon continuously with hot herb butter.',
        'Sauté asparagus spears in the remaining herb butter until tender-crisp.',
        'Serve salmon hot with grilled asparagus and lemon wedges.'
      ],
      nestleTip: 'NutriVerse Clinical Tip: Rich in marine Omega-3 EPA & DHA fatty acids, supporting endothelial cardiovascular health and brain focus.'
    },
    {
      id: 'rec-3',
      title: 'High-Protein Quinoa & Roasted Chickpea Bowl',
      category: 'High Protein',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
      prepTime: '20 mins',
      calories: 440,
      protein: 26,
      carbs: 58,
      fat: 12,
      estCost: '₹190',
      description: 'Protein-packed power bowl featuring fluffy quinoa, crispy oven-roasted chickpeas, tahini drizzle, and microgreens.',
      ingredients: ['Tri-color Quinoa', 'Organic Chickpeas', 'Tahini Paste', 'Avocado', 'Microgreens', 'Lemon Zest'],
      detailedIngredients: [
        { name: 'Tri-Color Quinoa', amount: '1/2 Cup (90 gm)', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=100&q=80' },
        { name: 'Organic Chickpeas', amount: '1.0 Cup (160 gm)', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&q=80' },
        { name: 'Sesame Tahini Paste', amount: '2.0 Tbsp (30 gm)', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=100&q=80' },
        { name: 'Hass Avocado', amount: '1/2 Sliced (75 gm)', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=100&q=80' }
      ],
      instructions: [
        'Cook tri-color quinoa in vegetable broth for 15 minutes until fluffy.',
        'Toss drained chickpeas with olive oil, paprika, and cumin.',
        'Roast chickpeas at 200°C for 20 minutes until crunchy.',
        'Whisk tahini paste with fresh lemon juice and warm water until creamy.',
        'Spoon cooked quinoa into a bowl as the base.',
        'Arrange roasted chickpeas, avocado slices, and microgreens.',
        'Drizzle lemon tahini dressing and serve.'
      ],
      nestleTip: 'NutriVerse Clinical Tip: Combining quinoa (complete protein) with chickpeas provides all 9 essential amino acids for muscle protein synthesis.'
    },
    {
      id: 'rec-4',
      title: 'Avocado Poached Egg Sourdough Toast',
      category: 'High Protein',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
      prepTime: '10 mins',
      calories: 360,
      protein: 22,
      carbs: 28,
      fat: 16,
      estCost: '₹150',
      description: 'Artisanal sourdough toast topped with mashed Hass avocado, poached pasture-raised egg, and chili flakes.',
      ingredients: ['Artisan Sourdough', 'Hass Avocado', 'Pasture-Raised Eggs', 'Red Chili Flakes', 'Extra Virgin Olive Oil'],
      detailedIngredients: [
        { name: 'Artisan Sourdough', amount: '2.0 Slices (60 gm)', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=100&q=80' },
        { name: 'Hass Avocado', amount: '1/2 Mashed (75 gm)', image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=100&q=80' },
        { name: 'Pasture-Raised Eggs', amount: '2.0 Whole (100 gm)', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=100&q=80' },
        { name: 'Red Chili Flakes', amount: '1/2 Tsp (2 gm)', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=100&q=80' }
      ],
      instructions: [
        'Toast artisan sourdough slices until golden and crisp.',
        'Mash ripe avocado with lemon juice, salt, and black pepper.',
        'Bring vinegared water to a gentle simmer and poach eggs for 3.5 minutes.',
        'Spread mashed avocado generously over toasted sourdough.',
        'Place poached eggs gently on top.',
        'Sprinkle red chili flakes and extra virgin olive oil.',
        'Serve immediately while warm.'
      ],
      nestleTip: 'NutriVerse Clinical Tip: Egg yolk choline is a key precursor for acetylcholine neurotransmitter synthesis.'
    },
    {
      id: 'rec-5',
      title: 'Palak Paneer & Whole Wheat Rotis',
      category: 'Indian Regional',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
      prepTime: '20 mins',
      calories: 420,
      protein: 24,
      carbs: 34,
      fat: 20,
      estCost: '₹170',
      description: 'Cottage cheese cubes simmered in a creamy, garlic-spiced baby spinach gravy served with warm whole wheat rotis.',
      ingredients: ['Fresh Cottage Cheese (Paneer)', 'Baby Spinach', 'Garlic', 'Green Chilies', 'Garam Masala', 'Whole Wheat Flour'],
      detailedIngredients: [
        { name: 'Fresh Paneer Cubes', amount: '150 gm Cubed', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80' },
        { name: 'Fresh Baby Spinach', amount: '2.0 Cups (120 gm)', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&q=80' },
        { name: 'Whole Wheat Flour', amount: '1/2 Cup (60 gm)', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=100&q=80' }
      ],
      instructions: [
        'Blanch baby spinach in boiling water for 2 minutes and ice shock.',
        'Puree blanched spinach with garlic, ginger, and green chilies.',
        'Lightly sear paneer cubes in ghee for 2 minutes.',
        'Simmer spinach puree with garam masala and cumin.',
        'Fold seared paneer cubes into the spinach curry.',
        'Roll and bake whole wheat rotis on a hot tawa.',
        'Serve hot palak paneer with whole wheat rotis.'
      ],
      nestleTip: 'NutriVerse Clinical Tip: Rich in dietary calcium, magnesium, and bio-available spinach iron for bone and cellular health.'
    },
    {
      id: 'rec-6',
      title: 'Vegan Mediterranean Chickpea Salad',
      category: 'Vegan',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      prepTime: '12 mins',
      calories: 340,
      protein: 16,
      carbs: 45,
      fat: 10,
      estCost: '₹130',
      description: 'Refreshing cucumber, cherry tomato, Kalamata olives, and chickpea salad tossed in oregano olive oil dressing.',
      ingredients: ['Organic Chickpeas', 'English Cucumber', 'Cherry Tomatoes', 'Kalamata Olives', 'Extra Virgin Olive Oil', 'Oregano'],
      detailedIngredients: [
        { name: 'Organic Chickpeas', amount: '1.0 Cup Drained (160 gm)', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&q=80' },
        { name: 'English Cucumber', amount: '1.0 Diced (100 gm)', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&q=80' },
        { name: 'Cherry Tomatoes', amount: '1/2 Cup Halved (75 gm)', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80' }
      ],
      instructions: [
        'Dice fresh cucumber and cherry tomatoes into bite-sized pieces.',
        'Combine chickpeas, cucumbers, tomatoes, and olives in a bowl.',
        'Whisk olive oil, lemon juice, salt, and oregano for dressing.',
        'Pour dressing over salad ingredients.',
        'Toss thoroughly to coat all vegetables.',
        'Chill in refrigerator for 10 minutes.',
        'Serve cold as a refreshing meal.'
      ],
      nestleTip: 'NutriVerse Clinical Tip: High soluble fiber content slows gastric emptying and stabilizes postprandial glucose curves.'
    }
  ];

  // Filter Catalog Recipes
  const filteredRecipes = catalogRecipes.filter(r => 
    selectedCategory === 'All' || r.category === selectedCategory
  );

  const maxIndex = Math.max(0, filteredRecipes.length - 3);

  const handleNext = () => {
    setStartIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setStartIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleRecipes = filteredRecipes.slice(startIndex, startIndex + 3);

  // Generate Custom Recipe from Pantry Input
  const handleGenerateCustomRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pantryInput.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);

      const parsedIngredients = pantryInput.split(',').map(i => i.trim()).filter(Boolean);

      const customRecipe: Recipe = {
        id: `custom-${Date.now()}`,
        title: `AI Synthesized ${parsedIngredients[0] ? parsedIngredients[0].charAt(0).toUpperCase() + parsedIngredients[0].slice(1) : 'Gourmet'} Bowl`,
        category: selectedCategory === 'All' ? 'High Protein' : selectedCategory,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
        prepTime: '15 mins',
        calories: 410,
        protein: 34,
        carbs: 32,
        fat: 14,
        estCost: '₹160',
        description: `Precision AI-synthesized balanced meal crafted directly from your pantry ingredients: ${pantryInput}.`,
        ingredients: [
          ...parsedIngredients.map(ing => ing.charAt(0).toUpperCase() + ing.slice(1)),
          'Extra Virgin Olive Oil',
          'Garlic & Sea Salt'
        ],
        detailedIngredients: parsedIngredients.map(ing => ({
          name: ing.charAt(0).toUpperCase() + ing.slice(1),
          amount: '1.0 Portion (100 gm)',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80'
        })),
        instructions: [
          `Prepare and clean your available ingredients: ${pantryInput}.`,
          `Heat 1 tbsp extra virgin olive oil in a skillet over medium heat.`,
          `Sauté ingredients for 6-8 minutes until tender and fragrant.`,
          `Season with sea salt, black pepper, and fresh herbs.`,
          `Plate warm and serve immediately.`
        ],
        nestleTip: `NutriVerse Clinical AI Tip: Formulated with your specific inputs (${pantryInput}) to optimize satiety hormones and maintain stable blood glucose levels.`
      };

      setGeneratedRecipeModal(customRecipe);
    }, 1200);
  };

  const toggleSaveRecipe = (id: string) => {
    setSavedRecipes(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const activeModal = generatedRecipeModal || selectedRecipeModal;

  const closeModal = () => {
    setGeneratedRecipeModal(null);
    setSelectedRecipeModal(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 mb-8 border border-slate-200/80 dark:border-slate-800 shadow-xl relative">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading flex items-center gap-2">
            AI Recipe Engine & Healthy Catalog
            <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Gourmet Recipes
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse healthy gourmet recipes or synthesize custom meal plans from your available ingredients
          </p>
        </div>
      </div>

      {/* Synthesize Recipe Input Bar */}
      <form onSubmit={handleGenerateCustomRecipe} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 mb-6">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
          <ChefHat className="w-4 h-4 text-amber-500" /> Synthesize Custom AI Recipe from Pantry Ingredients:
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-1.5">
          <input
            type="text"
            value={pantryInput}
            onChange={(e) => {
              setPantryInput(e.target.value);
              setStartIndex(0);
            }}
            placeholder="e.g. Eggs, Spinach, Almond Milk, Salmon, Tofu, Turmeric..."
            className="flex-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#005082]"
          />

          <button
            type="submit"
            disabled={isGenerating || !pantryInput.trim()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" /> Synthesizing...
              </>
            ) : (
              <>
                <ChefHat className="w-4 h-4" /> Generate Recipe
              </>
            )}
          </button>
        </div>
      </form>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setStartIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#005082] text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Carousel Slider Container with Backward (<) and Forward (>) Arrows */}
      <div className="relative w-full px-12">
        
        {/* Backward Arrow Button (<) */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all ${
            startIndex === 0
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-[#005082] hover:bg-[#003d66] text-white shadow-[#005082]/30 hover:scale-110'
          }`}
          title="Previous Recipes"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Visible Recipes Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full min-h-[380px]">
          <AnimatePresence mode="popLayout">
            {visibleRecipes.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-400 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {r.category}
                    </span>

                    <button
                      onClick={() => toggleSaveRecipe(r.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-amber-500"
                    >
                      <Bookmark className={`w-4 h-4 ${savedRecipes.includes(r.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  </div>

                  <div className="p-5">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading leading-snug mb-2">
                      {r.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {r.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> {r.prepTime}</span>
                    <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">{r.calories} kcal • {r.estCost}</span>
                  </div>

                  <button
                    onClick={() => setSelectedRecipeModal(r)}
                    className="text-[#005082] dark:text-cyan-400 font-extrabold hover:underline text-xs flex items-center gap-1"
                  >
                    View Recipe & Cooking Guide →
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Forward Arrow Button (>) */}
        <button
          onClick={handleNext}
          disabled={startIndex >= maxIndex}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all ${
            startIndex >= maxIndex
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-[#005082] hover:bg-[#003d66] text-white shadow-[#005082]/30 hover:scale-110'
          }`}
          title="Next Recipes"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>

      {/* Official Two-Column Recipe Detail View Modal (Matching AskNestle Official Design) */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            
            {/* Modal Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
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
                    {activeModal.category} Recipe • {activeModal.prepTime} • Est. Cost: {activeModal.estCost}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-heading">{activeModal.title}</h3>
                </div>

                <button
                  onClick={closeModal}
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
                          {(activeModal.detailedIngredients || []).map((item, idx) => (
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

                    {/* Clinical Tip Card */}
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
                      <span className="font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" /> Clinical AI Tip
                      </span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {activeModal.nestleTip}
                      </p>
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
                          
                          {activeModal.instructions.map((stepText, stepIdx) => (
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
                  onClick={closeModal}
                  className="px-6 py-2.5 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white font-bold text-xs shadow-md transition-all"
                >
                  Close Recipe
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
