import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, MessageSquare, Star, CheckCircle2, ChevronLeft, ChevronRight, 
  Search, Video, Calendar, ShieldCheck, X, Send, Sparkles, User, Award, Clock
} from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  role: string;
  category: string;
  experience: string;
  rating: number;
  reviews: number;
  image: string;
  bio: string;
  specialties: string[];
}

export const ExpertAdviceView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeChatExpert, setActiveChatExpert] = useState<Expert | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'expert'; text: string; time: string }>>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);

  const categories = [
    'All', 'Endocrinology & Diabetes', 'Clinical Pediatrics', 'Pregnancy & Maternal', 
    'Ayurvedic Clinical Nutrition', 'Sports Science', 'Immuno & Gut Health', 'Thyroid & PCOS',
    'Clinical Nephrology', 'Sleep & Circadian Science', 'Cardiovascular Nutrition', 'Hepatology'
  ];

  // 20 Verified Clinical Doctors Roster
  const experts: Expert[] = [
    {
      id: 'exp-1',
      name: 'Dr. Meera Nambiar MD',
      role: 'Chief Pediatrician & Clinical Neonatologist',
      category: 'Clinical Pediatrics',
      experience: '16+ yrs exp',
      rating: 4.9,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1594824813573-246434330697?auto=format&fit=crop&w=400&q=80',
      bio: 'Specialist in infant growth milestones, pediatric gut immunity, lactation support, and pediatric allergy prevention.',
      specialties: ['Child Growth Curves', 'Pediatric Immunity', 'Food Allergies', 'Infant Feeding']
    },
    {
      id: 'exp-2',
      name: 'Dr. Rajesh V. Sharma MD',
      role: 'Consultant Endocrinologist & Diabetologist',
      category: 'Endocrinology & Diabetes',
      experience: '18+ yrs exp',
      rating: 4.9,
      reviews: 480,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      bio: 'Pioneer in Type 2 Diabetes remission, continuous glucose monitoring (CGM), and insulin resistance management.',
      specialties: ['HbA1c Reduction', 'CGM Optimization', 'Insulin Resistance', 'Metabolic Syndrome']
    },
    {
      id: 'exp-3',
      name: 'Ananya Deshmukh RD',
      role: 'Lead Maternal & Gestational Nutritionist',
      category: 'Pregnancy & Maternal',
      experience: '12+ yrs exp',
      rating: 4.8,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Expert in prenatal nutrition, gestational diabetes prevention, postpartum recovery, and folic acid optimization.',
      specialties: ['Gestational Diabetes', 'Prenatal Folate Stack', 'Postpartum Healing', 'Lactation Diets']
    },
    {
      id: 'exp-4',
      name: 'Dr. Vikramaditya Sen BAMS',
      role: 'Ayurvedic Medical Doctor & Rasayana Expert',
      category: 'Ayurvedic Clinical Nutrition',
      experience: '15+ yrs exp',
      rating: 4.9,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      bio: 'Blends ancient Prakriti dosha diagnostic assessment with modern evidence-based herbal clinical protocols.',
      specialties: ['Dosha Balance (Vata/Pitta/Kapha)', 'Herbal Anti-Inflammatories', 'Agni Digestive Fire', 'Rasayana Longevity']
    },
    {
      id: 'exp-5',
      name: 'Karan Malhotra MSc CSCS',
      role: 'Head Sports Dietitian & Performance Coach',
      category: 'Sports Science',
      experience: '10+ yrs exp',
      rating: 4.8,
      reviews: 175,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      bio: 'Consultant for Olympic athletes focusing on glycogen replenishment, muscle hypertrophy, and VO2 max stamina.',
      specialties: ['Glycogen Supercompensation', 'Creatine & Whey Protocols', 'VO2 Max Fueling', 'Body Recomposition']
    },
    {
      id: 'exp-6',
      name: 'Dr. Sunita Reddy Ph.D.',
      role: 'Gut Microbiome & Immunology Researcher',
      category: 'Immuno & Gut Health',
      experience: '14+ yrs exp',
      rating: 4.9,
      reviews: 290,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
      bio: 'Specialized in leaky gut syndrome, IBS low-FODMAP protocols, dysbiosis restoration, and gut-brain axis health.',
      specialties: ['IBS Low-FODMAP', 'Microbiome Profiling', 'Leaky Gut Healing', 'SCFA Prebiotics']
    },
    {
      id: 'exp-7',
      name: 'Dr. Kavita Singhania MD',
      role: 'Reproductive Endocrinologist & PCOS Specialist',
      category: 'Thyroid & PCOS',
      experience: '17+ yrs exp',
      rating: 4.9,
      reviews: 410,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
      bio: 'Focuses on hormonal PCOS reversal, inositol insulin sensitizing therapy, and Hashimoto thyroiditis management.',
      specialties: ['PCOS Hormonal Reversal', 'Hashimoto Thyroiditis', 'Inositol Therapy', 'Ovulation Optimization']
    },
    {
      id: 'exp-8',
      name: 'Dr. Arishto Mukherjee DM',
      role: 'Clinical Nephrologist & Renal Diet Specialist',
      category: 'Clinical Nephrology',
      experience: '20+ yrs exp',
      rating: 4.9,
      reviews: 320,
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      bio: 'Specialized in CKD Stage 1-4 dietary management, low sodium-potassium balance, and GFR preservation.',
      specialties: ['CKD Renal Diets', 'GFR Preservation', 'Low Oxalate Protocols', 'Electrolyte Balance']
    },
    {
      id: 'exp-9',
      name: 'Dr. Rohan Roy Ph.D.',
      role: 'Chronobiologist & Sleep Science Specialist',
      category: 'Sleep & Circadian Science',
      experience: '11+ yrs exp',
      rating: 4.7,
      reviews: 165,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      bio: 'Aligns nutrient timing with suprachiasmatic nucleus circadian clock to enhance deep REM sleep and growth hormone.',
      specialties: ['Circadian Fasting', 'Melatonin Precursors', 'Cortisol Regulation', 'REM Optimization']
    },
    {
      id: 'exp-10',
      name: 'Dr. Priya Bannerjee MD',
      role: 'Preventive Cardiologist & Lipidologist',
      category: 'Cardiovascular Nutrition',
      experience: '19+ yrs exp',
      rating: 4.9,
      reviews: 520,
      image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=400&q=80',
      bio: 'Atherosclerosis reversal protocols through omega-3 EPA marine lipids, soluble beta-glucans, and Mediterranean diets.',
      specialties: ['ApoB & LDL Lowering', 'Endothelial Health', 'Hypertension DASH Diet', 'Arterial Plaque Prevention']
    },
    {
      id: 'exp-11',
      name: 'Dr. Alok Verma DM',
      role: 'Consultant Hepatologist & Fatty Liver Expert',
      category: 'Hepatology',
      experience: '15+ yrs exp',
      rating: 4.8,
      reviews: 210,
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      bio: 'Clinical specialist in NAFLD (Non-Alcoholic Fatty Liver Disease) reversal and liver enzyme ALT/AST normalization.',
      specialties: ['NAFLD Reversal', 'Liver Detoxification', 'ALT/AST Enzyme Care', 'Choline Optimization']
    },
    {
      id: 'exp-12',
      name: 'Dr. Shalini Gupta MD',
      role: 'Pediatric Endocrinologist',
      category: 'Clinical Pediatrics',
      experience: '13+ yrs exp',
      rating: 4.9,
      reviews: 280,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Specialist in childhood obesity prevention, juvenile diabetes management, and growth hormone deficiency.',
      specialties: ['Juvenile Diabetes', 'Child Growth Velocity', 'Pediatric Thyroid', 'Healthy Snacking']
    },
    {
      id: 'exp-13',
      name: 'Dr. Hemant Kapoor MD',
      role: 'Metabolic & Obesity Medicine Specialist',
      category: 'Endocrinology & Diabetes',
      experience: '16+ yrs exp',
      rating: 4.8,
      reviews: 340,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      bio: 'Customizes medical weight loss strategies combining GLP-1 nutrition guidelines with metabolic rate restoration.',
      specialties: ['GLP-1 Diet Support', 'Metabolic Rate Reset', 'Visceral Fat Loss', 'Bariatric Care']
    },
    {
      id: 'exp-14',
      name: 'Dr. Radhika Joshi BAMS',
      role: 'Ayurvedic Maternal & Garbhasanskar Specialist',
      category: 'Ayurvedic Clinical Nutrition',
      experience: '14+ yrs exp',
      rating: 4.9,
      reviews: 190,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
      bio: 'Ayurvedic Garbhasanskar guidance for pregnant mothers, herbal lactagogues, and post-natal rejuvenation.',
      specialties: ['Garbhasanskar Guidance', 'Herbal Milk Boosters', 'Post-natal Abhyanga', 'Dosha Balancing']
    },
    {
      id: 'exp-15',
      name: 'Devraj Nair CSCS',
      role: 'Elite Endurance Athletic Nutritionist',
      category: 'Sports Science',
      experience: '9+ yrs exp',
      rating: 4.7,
      reviews: 155,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      bio: 'Specializes in marathon fueling, intra-workout electrolyte hydration, and heat acclimation endurance.',
      specialties: ['Marathon Carb Loading', 'Electrolyte Osmolality', 'Intra-workout Fueling', 'Lactate Threshold']
    },
    {
      id: 'exp-16',
      name: 'Dr. Farida Khan Ph.D.',
      role: 'Immunology & Clinical Food Allergy Specialist',
      category: 'Immuno & Gut Health',
      experience: '12+ yrs exp',
      rating: 4.8,
      reviews: 220,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
      bio: 'IgE and IgG food elimination diets, histamine intolerance mitigation, and autoimmune Paleo protocols.',
      specialties: ['Food Elimination Diets', 'Histamine Intolerance', 'IgE Allergy Mapping', 'Autoimmune Paleo']
    },
    {
      id: 'exp-17',
      name: 'Dr. Sandeep Kulkarni MD',
      role: 'Thyroid & Metabolic Hormone Specialist',
      category: 'Thyroid & PCOS',
      experience: '18+ yrs exp',
      rating: 4.9,
      reviews: 380,
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      bio: 'Subclinical hypothyroidism management, selenium-zinc thyroid co-factors, and metabolic body temperature reset.',
      specialties: ['Subclinical Hypothyroidism', 'Selenium Co-factors', 'Reverse T3 Reduction', 'T4 to T3 Conversion']
    },
    {
      id: 'exp-18',
      name: 'Dr. Archana Pillai RD',
      role: 'Clinical Geriatric & Renal Dietitian',
      category: 'Clinical Nephrology',
      experience: '15+ yrs exp',
      rating: 4.8,
      reviews: 260,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Preventing sarcopenia in elderly patients while restricting renal phosphorus and urea loads.',
      specialties: ['Geriatric Sarcopenia', 'Renal Urea Management', 'Phosphorus Binding', 'Senior Immunity']
    },
    {
      id: 'exp-19',
      name: 'Dr. Amitav Ghosh MD',
      role: 'Sleep Medicine & Stress Hormone Specialist',
      category: 'Sleep & Circadian Science',
      experience: '14+ yrs exp',
      rating: 4.8,
      reviews: 205,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      bio: 'Insomnia dietary interventions, GABA neuro-nutrient stacks, and evening light hygiene optimization.',
      specialties: ['GABA Neuro-nutrients', 'Insomnia Relief Diets', 'Cortisol Reset', 'Tryptophan Synergies']
    },
    {
      id: 'exp-20',
      name: 'Dr. Tanvi Merchant MD',
      role: 'Preventive Lipidologist & Vascular Health Expert',
      category: 'Cardiovascular Nutrition',
      experience: '16+ yrs exp',
      rating: 4.9,
      reviews: 430,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      bio: 'Plaque stability protocols through polyphenol anti-oxidants, coenzyme Q10, and plant sterol diets.',
      specialties: ['Plant Sterol Diets', 'Coenzyme Q10 Stack', 'Polyphenol Bioavailability', 'Vascular Tone']
    }
  ];

  const filteredExperts = experts.filter(e => {
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const cardsPerPage = 3;
  const maxIndex = Math.max(0, filteredExperts.length - cardsPerPage);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleExperts = filteredExperts.slice(startIndex, startIndex + cardsPerPage);

  const handleStartChatSession = (expert: Expert) => {
    setActiveChatExpert(expert);
    const initialGreeting = `Hello! I am ${expert.name}, ${expert.role}. How can I assist you today with your ${expert.category} health questions?`;
    setChatMessages([
      { sender: 'expert', text: initialGreeting, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

  const generateExpertAiReply = (userQuery: string, expert: Expert): string => {
    const queryLower = userQuery.toLowerCase();
    
    if (expert.category === 'Clinical Pediatrics') {
      return `As a specialist in ${expert.category}, I recommend focusing on essential growth building blocks like DHA, Vitamin D3, and protein. For your query "${userQuery}", ensure a balanced intake of bio-available iron (spinach, eggs) and calcium. Let me know if your child has any specific food allergies!`;
    } else if (expert.category === 'Endocrinology & Diabetes') {
      return `From an endocrinology perspective on "${userQuery}", maintaining stable glycemic control is key. I advise pairing any complex carbohydrates with soluble fiber and healthy fats to slow down glucose absorption. Have you recently checked your HbA1c or fasting blood sugar levels?`;
    } else if (expert.category === 'Pregnancy & Maternal') {
      return `For maternal health regarding "${userQuery}", prioritizing active Folate (B9), Choline, and Iodine is vital. We want to support optimal placental perfusion and neural tube growth. Always consult your obstetrician alongside our clinical diet plan!`;
    } else if (expert.category === 'Ayurvedic Clinical Nutrition') {
      return `In Ayurvedic Rasayana practice for "${userQuery}", we look at restoring Agni (digestive fire) and balancing your unique Dosha. Incorporating warm ginger-turmeric infusions and A2 Ghee helps nourish Ojas and cellular immunity. What is your primary prakriti tendency?`;
    } else if (expert.category === 'Sports Science') {
      return `To optimize your athletic performance for "${userQuery}", timing your macro intake around your workout window is crucial. I recommend 30-40g fast-digesting protein with complex carbs 60 minutes post-training for maximum glycogen resynthesis. Are you targeting muscle gain or fat loss?`;
    } else if (expert.category === 'Immuno & Gut Health') {
      return `For gut microbiome restoration regarding "${userQuery}", we aim to reduce mucosal inflammation through a low-FODMAP prebiotic stack and short-chain fatty acids (SCFA). Incorporating fermented foods like kefir or probiotic curd helps re-seed beneficial Bifidobacteria.`;
    } else {
      return `Thank you for sharing that question regarding "${userQuery}". Based on clinical protocols in ${expert.category}, I recommend a structured nutrient approach focusing on anti-inflammatory whole foods and key micronutrients. Would you like me to generate a custom 7-day guidance plan for you?`;
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatExpert) return;

    const userText = inputMessage.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [...prev, { sender: 'user', text: userText, time: timeStr }]);
    setInputMessage('');
    setIsReplying(true);

    setTimeout(() => {
      setIsReplying(false);
      const replyText = generateExpertAiReply(userText, activeChatExpert);
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatMessages((prev) => [...prev, { sender: 'expert', text: replyText, time: replyTime }]);
    }, 1000);
  };

  return (
    <div className="asknestle-card w-full rounded-3xl p-6 md:p-8 mb-8 relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading flex items-center gap-2">
            NutriVerse Telehealth & Expert Marketplace
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 20 Clinical Specialists
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Consult with verified clinical doctors, pediatricians, and nutritionists for 1-on-1 AI live chat sessions</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setStartIndex(0);
            }}
            placeholder="Search experts..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 pl-9 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#005082]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Category Horizontal Filter Pills */}
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
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Carousel Container with Side Arrows (< and >) */}
      <div className="relative w-full px-12">
        
        {/* Backward Arrow Button (<) */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all ${
            startIndex === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-[#005082] hover:bg-[#003d66] text-white shadow-[#005082]/30 hover:scale-110'
          }`}
          title="Previous Specialists"
        >
          <ChevronLeft className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Visible Experts Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full min-h-[420px]">
          <AnimatePresence mode="popLayout">
            {visibleExperts.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
                className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Doctor Card Top Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#005082]/20 shrink-0">
                      <img 
                        src={exp.image} 
                        alt={exp.name} 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80';
                        }}
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider block mb-1">
                        {exp.category}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white font-heading leading-tight">
                        {exp.name}
                      </h4>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mt-0.5">
                        {exp.role}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {exp.bio}
                  </p>

                  {/* Specialty Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {exp.specialties.map((spec, i) => (
                      <span key={i} className="text-[10px] font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <strong className="text-slate-800 dark:text-slate-200 font-bold">{exp.rating}</strong>
                    <span>({exp.reviews})</span>
                  </div>

                  <button
                    onClick={() => handleStartChatSession(exp)}
                    className="px-4 py-2 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> 1-on-1 Chat Session
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
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-[#005082] hover:bg-[#003d66] text-white shadow-[#005082]/30 hover:scale-110'
          }`}
          title="Next Specialists"
        >
          <ChevronRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>

      {/* 1-on-1 Clinical AI Chat Modal Window */}
      <AnimatePresence>
        {activeChatExpert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveChatExpert(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
            />

            {/* Chat Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-[100] bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full h-[600px] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto"
            >
              {/* Chat Modal Header */}
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/20">
                    <img 
                      src={activeChatExpert.image} 
                      alt={activeChatExpert.name} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-900"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-heading text-white flex items-center gap-2">
                      {activeChatExpert.name}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        Online Now
                      </span>
                    </h4>
                    <span className="text-[11px] text-slate-300 block">{activeChatExpert.role}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveChatExpert(null)}
                  className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-50 dark:bg-slate-950">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl space-y-1 ${
                        msg.sender === 'user'
                          ? 'bg-[#005082] text-white rounded-br-none shadow-md'
                          : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-800 shadow-sm'
                      }`}
                    >
                      <p className="leading-relaxed font-medium">{msg.text}</p>
                      <span className={`text-[9px] block text-right ${msg.sender === 'user' ? 'text-slate-200' : 'text-slate-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}

                {isReplying && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl rounded-bl-none border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-500">
                      <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                      <span className="text-xs font-bold">{activeChatExpert.name} is formulating clinical guidance...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Ask ${activeChatExpert.name} about your health symptoms or diet...`}
                  className="flex-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#005082]"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 bg-[#005082] hover:bg-[#003d66] disabled:opacity-50 text-white rounded-xl shadow-md transition-all flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
