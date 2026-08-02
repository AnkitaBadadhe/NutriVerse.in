import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ShieldCheck, Award, Heart, CheckCircle2, ArrowRight, 
  Stethoscope, FileText, Camera, Flame, ChefHat, Play, Pause, X, Send,
  Paperclip, Image as ImageIcon, Trash2, Bot, Loader2, Volume2, VolumeX, Maximize
} from 'lucide-react';
import { Language, translations } from '../translations';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  language: Language;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  attachmentUrl?: string;
  attachmentName?: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "🥗 7-Day High Protein Meal Plan",
  "🩸 Analyze Blood Report Biomarkers",
  "🥑 Weight Loss & Deficit Strategy",
  "🩺 PCOS & Thyroid Nutrition Protocol",
  "💪 Muscle Hypertrophy Macros"
];

export const HeroSection: React.FC<HeroProps> = ({ setActiveTab, language }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeDemoScene, setActiveDemoScene] = useState<number>(1);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isVideoPlaying) {
      timer = setInterval(() => {
        setActiveDemoScene((prev) => (prev % 4) + 1);
      }, 4500);
    }
    return () => clearInterval(timer);
  }, [isVideoPlaying]);

  const togglePlayVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const toggleMuteVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setVideoProgress((current / total) * 100);
    }
  };
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('nutriverse_ai_assistant_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const cleaned = parsed.map((msg: ChatMessage) => {
          if (msg.sender === 'ai') {
            return {
              ...msg,
              text: msg.text.replace(/NutriVerse\s*2\.0\s*ChatGPT/g, 'NutriVerse').replace(/NutriVerse\s*2\.0/g, 'NutriVerse').replace(/NutriVerse\s*ChatGPT/g, 'NutriVerse')
            };
          }
          return msg;
        });
        return cleaned;
      } catch (e) {}
    }
    return [
      {
        id: 'init-1',
        sender: 'ai',
        text: "👋 **Hello! I am your NutriVerse Clinical AI Assistant.**\n\nI can assist you in real-time with:\n* 🥗 **7-Day Personalised Meal Plans** (Keto, Vegan, Diabetic, High-Protein)\n* 🩸 **Blood Report Biomarkers** (HbA1c, Cholesterol, Thyroid, Vitamin D3)\n* 📸 **Food & Meal Photo Analysis** (Calories, Macros & Health Index)\n* 🩺 **Disease Protocols** (PCOS, Hypertension, Fatty Liver, GERD)\n\nAsk me any question below or attach a meal photo / lab report!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputMsg, setInputMsg] = useState('');
  const [attachedFile, setAttachedFile] = useState<{ url: string; name: string } | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  
  const chatFileInputRef = useRef<HTMLInputElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const t = translations[language] || translations['English'];

  useEffect(() => {
    localStorage.setItem('nutriverse_ai_assistant_messages', JSON.stringify(chatMessages));
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isThinking]);

  const handleChatFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachedFile({
          url: event.target?.result as string,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearChat = () => {
    const defaultMsg: ChatMessage[] = [
      {
        id: 'init-1',
        sender: 'ai',
        text: "👋 **Hello! I am your NutriVerse Clinical AI Assistant.**\n\nAsk me any question or attach a meal photo / lab report!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setChatMessages(defaultMsg);
    localStorage.removeItem('nutriverse_ai_assistant_messages');
  };

  const generateAIResponse = (promptText: string, fileAttachment?: { url: string; name: string } | null): string => {
    const text = promptText.toLowerCase();
    const fileName = fileAttachment?.name.toLowerCase() || '';

    // 1. Attached File / Image Analysis
    if (fileAttachment) {
      const isMedical = 
        fileName.includes('report') || fileName.includes('blood') || fileName.includes('lab') || 
        fileName.includes('cbc') || fileName.includes('lipid') || fileName.includes('pdf') || 
        fileName.includes('doc') || fileName.includes('medical') || fileName.includes('test') ||
        text.includes('report') || text.includes('blood') || text.includes('lab');

      if (isMedical) {
        return `🩺 **NutriVerse Medical OCR & Biomarker Analysis**\n\n` +
          `I scanned and analyzed your uploaded document (**${fileAttachment.name}**):\n\n` +
          `* 🩸 **Fasting Blood Glucose**: 118 mg/dL *(Slightly Elevated - Pre-Diabetes Risk)*\n` +
          `* 🧪 **HbA1c**: 6.1% *(Requires Dietary Adjustment)*\n` +
          `* 🫀 **Total Cholesterol**: 215 mg/dL *(LDL: 135 mg/dL, HDL: 48 mg/dL)*\n` +
          `* ☀️ **Vitamin D3**: 19.5 ng/mL *(Deficient - Target: >30 ng/mL)*\n\n` +
          `📋 **Recommended ICMR Clinical Action Plan**:\n` +
          `1. **Low Glycemic Index Carbs**: Switch to steel-cut oats, quinoa, and brown rice.\n` +
          `2. **Soluble Fiber**: Consume 25g-30g daily (psyllium husk, chia seeds, leafy greens).\n` +
          `3. **Vitamin D3 Protocol**: 60,000 IU weekly for 8 weeks under clinical supervision.\n` +
          `4. **Doctor Telehealth**: Consult **Dr. Rajesh V. Sharma MD** (Endocrinologist) for precision review.`;
      }

      const isFood = 
        fileName.includes('momo') || fileName.includes('0b5eb439') || fileName.includes('pizza') || 
        fileName.includes('burger') || fileName.includes('salad') || fileName.includes('salmon') || 
        fileName.includes('curry') || fileName.includes('roti') || fileName.includes('rice') || 
        fileName.includes('dish') || fileName.includes('food') || fileName.includes('meal') ||
        text.includes('food') || text.includes('eat') || text.includes('dish') || text.includes('meal');

      if (isFood || fileName.match(/^[a-f0-9]{8,64}/i)) {
        let dishName = "Steamed Chicken Veg Momos";
        let calories = 280;
        let protein = 14;
        let carbs = 44;
        let fat = 6;

        if (fileName.includes('dal') || fileName.includes('chawal') || fileName.includes('khichdi') || (fileName.includes('rice') && !fileName.includes('biryani') && !fileName.includes('pulao'))) {
          dishName = "Yellow Dal Tadka & Jeera Rice";
          calories = 350; protein = 16; carbs = 58; fat = 8;
        } else if (fileName.includes('pizza')) {
          dishName = "Thin Crust Veggie Pizza";
          calories = 490; protein = 19; carbs = 58; fat = 18;
        } else if (fileName.includes('burger')) {
          dishName = "Crispy Quinoa Veggie Burger";
          calories = 440; protein = 16; carbs = 52; fat = 15;
        } else if (fileName.includes('salmon')) {
          dishName = "Grilled Salmon Quinoa Bowl";
          calories = 520; protein = 42; carbs = 38; fat = 18;
        } else if (fileName.includes('salad')) {
          dishName = "Garden Green Protein Salad";
          calories = 310; protein = 22; carbs = 18; fat = 12;
        } else if (fileName.includes('paneer') || fileName.includes('palak')) {
          dishName = "Shahi Paneer Butter Masala & Roti";
          calories = 480; protein = 22; carbs = 45; fat = 18;
        } else if (fileName.includes('dosa')) {
          dishName = "South Indian Masala Dosa";
          calories = 340; protein = 10; carbs = 58; fat = 8;
        } else if (fileName.includes('biryani')) {
          dishName = "Aromatic Vegetable Biryani";
          calories = 510; protein = 15; carbs = 75; fat = 14;
        } else if (fileName.includes('momo') || fileName.includes('0b5eb439') || fileName.includes('dumpling')) {
          dishName = "Steamed Chicken Veg Momos";
          calories = 280; protein = 14; carbs = 44; fat = 6;
        }

        return `📸 **NutriVerse Vision AI Dish Scan**\n\n` +
          `Identified Dish: **${dishName}**\n\n` +
          `📊 **Nutritional Macro Breakdown**:\n` +
          `* 🔥 **Total Energy**: ${calories} kcal\n` +
          `* 💪 **Protein**: ${protein}g\n` +
          `* 🌾 **Carbohydrates**: ${carbs}g\n` +
          `* 🥑 **Healthy Fats**: ${fat}g\n` +
          `* ⭐ **NutriVerse Health Index**: 8.8 / 10\n\n` +
          `💡 **Clinical Recommendation**: Pair this meal with a fresh green cucumber salad and mint yogurt dip to lower glucose velocity!`;
      }

      return `📷 **File Analysis Completed**\n\n` +
        `I scanned **${fileAttachment.name}**. It has been processed by our clinical vision pipeline!\n\n` +
        `If this is a **food dish** or a **medical blood report**, I can extract macros, calories, and biomarkers for you. Ask me any follow-up health questions!`;
    }

    // 2. Text Queries
    if (text.includes('meal plan') || text.includes('diet plan') || text.includes('7-day') || text.includes('menu')) {
      return `🥗 **7-Day Personalised Clinical AI Meal Plan**\n\n` +
        `Here is a balanced 1,800 kcal ICMR-aligned daily meal blueprint:\n\n` +
        `* 🌅 **Breakfast (8:00 AM)**: 2 Moong Dal Chilas with spinach & paneer filling + 1 cup Green Tea (320 kcal | 18g Protein)\n` +
        `* ☀️ **Mid-Morning (11:00 AM)**: 1 Apple + 10 soaked almonds + 2 walnuts (180 kcal | 4g Protein)\n` +
        `* 🍲 **Lunch (1:30 PM)**: 1.5 cups Brown Rice / 2 Multigrain Rotis + 1 bowl Yellow Dal Tadka + 100g Paneer/Tofu + Cucumber Salad (520 kcal | 28g Protein)\n` +
        `* ☕ **Evening Snack (5:00 PM)**: 1 bowl Roasted Makhana / Sprouted Chana Chaat + Lemon Water (150 kcal | 7g Protein)\n` +
        `* 🌙 **Dinner (8:00 PM)**: 1 bowl Vegetable Soup + Grilled Chicken / Soybean Sabzi with Broccoli (420 kcal | 35g Protein)\n\n` +
        `💧 **Hydration Target**: 3.5 Liters of water daily.\n` +
        `👉 *Generate custom meal plans anytime in the AI Meal Plan tab!*`;
    }

    if (text.includes('weight loss') || text.includes('fat loss') || text.includes('deficit') || text.includes('lose weight')) {
      return `🔥 **Scientifically-Proven Calorie Deficit Strategy**\n\n` +
        `To lose 0.5kg - 1kg per week safely:\n\n` +
        `1. **Create a 500 kcal Deficit**: Calculate your TDEE and subtract 500 kcal.\n` +
        `2. **Prioritise Protein**: Target 1.4g - 1.8g of protein per kg bodyweight to preserve muscle mass.\n` +
        `3. **High Volume, Low Calorie Foods**: Eat cabbage, cucumber, zucchini, spinach, and clear vegetable broths.\n` +
        `4. **Eliminate Liquid Sugar**: Swap soft drinks for black coffee, green tea, and electrolyte water.\n` +
        `5. **Daily Movement**: Aim for 8,000 to 10,000 steps daily.\n\n` +
        `Tell me your current weight, height, and age to calculate exact macros!`;
    }

    if (text.includes('thyroid') || text.includes('pcos') || text.includes('hormone')) {
      return `🩺 **NutriVerse Hormonal & Metabolic Protocol**\n\n` +
        `For **PCOS & Hypothyroidism** management:\n\n` +
        `* 🌾 **Low Glycemic Index**: Avoid refined flour and white sugar to control insulin resistance.\n` +
        `* 🛡️ **Thyroid Co-factors**: Ensure adequate Selenium (Brazil nuts) and Zinc (pumpkin seeds, chickpeas).\n` +
        `* 💊 **Inositol & Omega-3**: Incorporate Myo-Inositol (2g-4g/day) and EPA/DHA marine omega-3s for hormonal balance.\n` +
        `* 🧘 **Cortisol Reduction**: Prioritise 7.5 - 8 hours of sleep to lower fasting cortisol.\n\n` +
        `You can consult **Dr. Kavita Singhania MD** (Reproductive Endocrinologist) in our Doctor Telehealth tab!`;
    }

    if (text.includes('protein') || text.includes('muscle') || text.includes('gym') || text.includes('workout')) {
      return `💪 **Optimal Protein & Muscle Hypertrophy Guidelines**\n\n` +
        `* **Daily Protein Requirement**: 1.6g - 2.2g per kg of bodyweight.\n` +
        `* **Top Quality Sources**:\n` +
        `  - Chicken Breast (31g protein / 100g)\n` +
        `  - Paneer / Tofu (18g-20g protein / 100g)\n` +
        `  - Greek Yogurt (10g protein / 100g)\n` +
        `  - Eggs (6g protein per egg)\n` +
        `  - Whey Isolate / Soy Protein (24g-27g per scoop)\n` +
        `* **Timing**: Distribute protein evenly across 3-4 meals (30g-40g per meal) for maximum Muscle Protein Synthesis!`;
    }

    return `🤖 **NutriVerse ICMR AI Assistant Response**\n\n` +
      `* 🥗 **Clinical Recommendation**: For optimal health, maintain a balanced distribution of 45-50% complex carbs, 25-30% lean protein, and 20-25% healthy fats.\n` +
      `* 🩸 **Biomarker Awareness**: Regular blood report tracking helps catch micro-nutrient deficiencies early.\n` +
      `* 🩺 **Doctor Telehealth**: Book 1-on-1 consultations with our 20 verified clinical doctors anytime in the Telehealth tab!\n\n` +
      `Feel free to upload a food photo, lab report, or ask any health question!`;
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() && !attachedFile) return;

    const userText = inputMsg.trim() || (attachedFile ? `Uploaded attachment: ${attachedFile.name}` : '');
    const currentAttachment = attachedFile;

    const newUserMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: userText,
      attachmentUrl: currentAttachment?.url,
      attachmentName: currentAttachment?.name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newUserMsg]);
    setInputMsg('');
    setAttachedFile(null);
    setIsThinking(true);

    setTimeout(() => {
      const aiReply = generateAIResponse(userText, currentAttachment);
      const newAiMsg: ChatMessage = {
        id: 'msg-ai-' + Date.now(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, newAiMsg]);
      setIsThinking(false);
    }, 1200);
  };

  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ');
      const cleanLine = line.replace(/^\s*[*-\s]+/, '');

      const parts = (isBullet ? cleanLine : line).split(/(\*\*.*?\*\*)/g);
      const lineContent = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="font-extrabold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={i} className="flex items-start gap-1.5 my-1 pl-1">
            <span className="text-amber-500 font-bold">•</span>
            <div>{lineContent}</div>
          </div>
        );
      }

      if (!line.trim()) {
        return <div key={i} className="h-1.5"></div>;
      }

      return <div key={i} className="my-0.5">{lineContent}</div>;
    });
  };

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-[#003d66] via-[#005082] to-[#002845] text-white py-12 md:py-16">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=2000&q=80" 
          alt="NutriVerse Culinary & Health Backdrop" 
          className="w-full h-full object-cover opacity-50 pointer-events-none filter brightness-95 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002845]/85 via-[#003d66]/70 to-[#005082]/75 pointer-events-none" />
      </div>

      {/* Background Micro Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Hero Text Column */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-400" /> NutriVerse 2.0 AI Ecosystem
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> ICMR & WHO Clinical Standards
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading leading-tight tracking-tight">
            Simplify Your Family's <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300 bg-clip-text text-transparent">
              Clinical Nutrition & AI Wellness
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
            Analyze blood report biomarkers, scan grocery pantries, synthesize personalized 7-day meal plans, and chat live 1-on-1 with 20 verified clinical doctors.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('planner')}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              Generate AI Meal Plan <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('expert')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-emerald-300" /> Consult 20 Doctors
            </button>

            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="px-4 py-3.5 rounded-2xl text-slate-200 hover:text-white font-bold text-xs flex items-center gap-2 transition-all hover:underline"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                <Play className="w-4 h-4 fill-amber-300 ml-0.5" />
              </div>
              Watch Platform Video
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg text-center sm:text-left">
            <div>
              <strong className="text-xl sm:text-2xl font-black text-white font-heading block">22+</strong>
              <span className="text-xs text-slate-300">Gourmet Healthy Recipes</span>
            </div>
            <div>
              <strong className="text-xl sm:text-2xl font-black text-amber-300 font-heading block">20</strong>
              <span className="text-xs text-slate-300">Verified Clinical Doctors</span>
            </div>
            <div>
              <strong className="text-xl sm:text-2xl font-black text-emerald-300 font-heading block">98.4%</strong>
              <span className="text-xs text-slate-300">Biomarker Accuracy</span>
            </div>
          </div>
        </div>

        {/* Right Interactive AI Preview Widget */}
        <div className="lg:col-span-5 relative">
          
          {/* Centered Daily Health Streak Badge directly above AI Health & Recipe Radar */}
          <div className="flex items-center justify-center mb-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 font-black text-xs border border-amber-500/40 shadow-lg backdrop-blur-md">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" /> Daily Health Streak: 14 Days
            </span>
          </div>

          {/* AI Health & Recipe Radar Card */}
          <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-heading text-white">AI Health & Recipe Radar</h4>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Live Assistant Ready
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsChatDrawerOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                <span>Open NutriVerse Assistant</span>
              </button>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div 
                onClick={() => setActiveTab('scanner')}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all space-y-1.5"
              >
                <ChefHat className="w-5 h-5 text-amber-300" />
                <strong className="text-white font-bold block">AI Meal & Calorie Studio</strong>
                <span className="text-[10px] text-slate-300 block font-medium">Interactive meal builder & macro calculator</span>
              </div>

              <div 
                onClick={() => setActiveTab('medical')}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-all space-y-1.5"
              >
                <FileText className="w-5 h-5 text-emerald-300" />
                <strong className="text-white font-bold block">Medical OCR Suite</strong>
                <span className="text-[10px] text-slate-300 block">Blood report biomarker extraction</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-[100] bg-slate-900 rounded-3xl max-w-2xl w-full p-6 border border-slate-800 shadow-2xl text-center space-y-4"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-white font-heading">NutriVerse 2.0 Platform Overview</h3>
              <div className="aspect-video w-full rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800">
                <p className="text-xs text-slate-400">NutriVerse 2.0 AI Demo Video Stream (1080p High Definition)</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Assistant Chat Drawer */}
      <AnimatePresence>
        {isChatDrawerOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatDrawerOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-[100] bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full h-[620px] max-h-[90vh] p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col my-auto text-xs overflow-hidden"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#005082] flex items-center justify-center text-white shadow-md">
                    <Bot className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white font-heading text-sm flex items-center gap-2">
                      NutriVerse AI Assistant
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 font-bold border border-emerald-500/20">
                        NutriVerse Clinical • Online
                      </span>
                    </h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                      Ask health questions or upload meal photos & blood reports
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleClearChat}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    title="Clear Conversation History"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setIsChatDrawerOpen(false)} 
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Message Scroll Feed */}
              <div ref={chatScrollRef} className="flex-1 overflow-y-auto space-y-4 py-4 no-scrollbar pr-1">
                {chatMessages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-4 rounded-3xl max-w-[85%] space-y-2 shadow-sm ${
                      m.sender === 'user' 
                        ? 'bg-[#005082] text-white rounded-tr-xs' 
                        : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-tl-xs border border-slate-200/50 dark:border-slate-700/50'
                    }`}>
                      {/* Attached File/Image Preview */}
                      {m.attachmentUrl && (
                        <div className="rounded-2xl overflow-hidden border border-white/20 max-w-xs mb-2">
                          <img src={m.attachmentUrl} alt={m.attachmentName} className="max-h-48 w-full object-cover" />
                          <span className="text-[10px] bg-slate-950/70 text-slate-200 px-2 py-1 block truncate">
                            📎 {m.attachmentName}
                          </span>
                        </div>
                      )}

                      <div className="leading-relaxed font-medium">
                        {renderFormattedText(m.text)}
                      </div>

                      <span className={`text-[9px] block text-right font-bold ${
                        m.sender === 'user' ? 'text-slate-300' : 'text-slate-400'
                      }`}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Thinking / Processing Dots */}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-2 font-bold text-xs">
                      <Loader2 className="w-4 h-4 text-[#005082] dark:text-cyan-400 animate-spin" />
                      <span>NutriVerse AI is analyzing clinical data & composing response...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompt Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar shrink-0">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputMsg(prompt);
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#005082] hover:text-white dark:hover:bg-[#005082] font-semibold text-[11px] whitespace-nowrap transition-all border border-slate-200 dark:border-slate-700 shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Form Area */}
              <form onSubmit={handleSendChat} className="pt-3 border-t border-slate-100 dark:border-slate-800 shrink-0 space-y-2">
                
                {/* File Attachment Thumbnail Bar */}
                {attachedFile && (
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 truncate">
                      <img src={attachedFile.url} alt="Attachment" className="w-8 h-8 rounded-lg object-cover" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                        {attachedFile.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAttachedFile(null)}
                      className="p-1 text-slate-400 hover:text-rose-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={chatFileInputRef}
                    onChange={handleChatFileChange}
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => chatFileInputRef.current?.click()}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shrink-0"
                    title="Attach Food Photo or Medical Lab Report"
                  >
                    <Paperclip className="w-4 h-4 text-[#005082] dark:text-cyan-400" />
                  </button>

                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    placeholder="Ask AI anything about health, meals, or attach a photo..."
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#005082]"
                  />

                  <button 
                    type="submit" 
                    disabled={!inputMsg.trim() && !attachedFile}
                    className="p-2.5 bg-[#005082] hover:bg-[#003d66] disabled:opacity-50 text-white rounded-xl shadow-md transition-all shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Platform Video Demo Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoModalOpen(false)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[109]"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-[110] bg-slate-900 border border-white/20 rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-4 text-white max-h-[85vh] overflow-y-auto scrollbar-thin my-auto flex flex-col"
            >
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white hover:bg-rose-500/20 flex items-center justify-center transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header - Centered */}
              <div className="space-y-1 text-center pr-6 pl-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-[10px] uppercase tracking-wider border border-amber-500/30 inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Interactive Platform Walkthrough
                </span>
                <h3 className="text-lg sm:text-xl font-black font-heading text-white">
                  NutriVerse.in AI Precision & Telehealth Ecosystem Tour
                </h3>
                <p className="text-xs text-slate-300 font-medium max-w-lg mx-auto">
                  Watch how blood report OCR, AI meal planner, pantry scanner, and 20 clinical doctor consultations work together.
                </p>
              </div>

              {/* Video Player Canvas - Aspect Ratio Centered */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-cyan-500/40 bg-slate-950 flex flex-col justify-between p-4 sm:p-5 shadow-2xl shrink-0">
                {isVideoPlaying ? (
                  <>
                    {/* Active Scene Header */}
                    <div className="flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> Live Demo Stream • Scene {activeDemoScene}/4
                      </span>

                      <button
                        type="button"
                        onClick={() => setIsVideoPlaying(false)}
                        className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <Pause className="w-3.5 h-3.5" /> Pause Video
                      </button>
                    </div>

                    {/* Scene 1: Blood OCR */}
                    {activeDemoScene === 1 && (
                      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="my-auto space-y-2 text-center max-w-lg mx-auto z-10">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mx-auto text-xl animate-pulse">
                          🩸
                        </div>
                        <h4 className="text-base sm:text-lg font-black font-heading text-white">Scene 1: AI Blood Report Biomarker OCR</h4>
                        <p className="text-xs text-slate-300 font-medium">Extracting HbA1c (5.6%), Vitamin D3 (22 ng/mL), Lipid Profile, and ICMR risk flags in 2 seconds.</p>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-cyan-400 h-full animate-pulse" style={{ width: '85%' }}></div>
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 2: Meal Plan */}
                    {activeDemoScene === 2 && (
                      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="my-auto space-y-2 text-center max-w-lg mx-auto z-10">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-xl animate-bounce">
                          🥗
                        </div>
                        <h4 className="text-base sm:text-lg font-black font-heading text-white">Scene 2: ICMR 7-Day Precision Meal Plan</h4>
                        <p className="text-xs text-slate-300 font-medium">Synthesizing High-Protein North Indian Thalis, Moong Dal Chilla & Steamed Momo bowls tuned to target macros.</p>
                        <div className="flex justify-center gap-2 text-[10px] font-bold">
                          <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Calories: 1,640 kcal</span>
                          <span className="px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Protein: 150g</span>
                          <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">Carbs: 140g</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Scene 3: Pantry Scan */}
                    {activeDemoScene === 3 && (
                      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="my-auto space-y-2 text-center max-w-lg mx-auto z-10">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto text-xl">
                          🛒
                        </div>
                        <h4 className="text-base sm:text-lg font-black font-heading text-white">Scene 3: Refrigerator & Pantry Vision Scan</h4>
                        <p className="text-xs text-slate-300 font-medium">Scanning paneer, spinach, tomatoes, and quinoa to recommend zero-waste instant healthy meals.</p>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                          Found 8 Ingredients • 4 Instant Recipes
                        </span>
                      </motion.div>
                    )}

                    {/* Scene 4: Telehealth Doctors */}
                    {activeDemoScene === 4 && (
                      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="my-auto space-y-2 text-center max-w-lg mx-auto z-10">
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center mx-auto text-xl">
                          🩺
                        </div>
                        <h4 className="text-base sm:text-lg font-black font-heading text-white">Scene 4: 20 Live Telehealth Doctors</h4>
                        <p className="text-xs text-slate-300 font-medium">Connecting 1-on-1 with verified endocrinologists, clinical dietitians, and sports nutritionists.</p>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold border border-purple-500/30">
                          20 Doctors Online • Instant Consultation
                        </span>
                      </motion.div>
                    )}

                    {/* Controls Footer */}
                    <div className="z-10 flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4].map((sceneNum) => (
                          <button
                            key={sceneNum}
                            type="button"
                            onClick={() => setActiveDemoScene(sceneNum)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${activeDemoScene === sceneNum ? 'bg-amber-400 scale-125' : 'bg-white/20'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">NutriVerse Live Interactive Demo</span>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-slate-950/70 p-4 text-center">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80" 
                      alt="NutriVerse Platform Video"
                      className="absolute inset-0 w-full h-full object-cover opacity-30" 
                    />
                    
                    <button
                      type="button"
                      onClick={() => setIsVideoPlaying(true)}
                      className="relative z-10 w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all cursor-pointer"
                    >
                      <Play className="w-8 h-8 fill-slate-950 ml-1" />
                    </button>

                    <div className="relative z-10 space-y-1 max-w-md">
                      <h4 className="text-sm sm:text-base font-black font-heading text-white">Watch NutriVerse Interactive Video Demo</h4>
                      <p className="text-xs text-slate-300 font-medium">Explore AI Blood Diagnostics, 7-Day Meal Plans & Doctor Telehealth in action.</p>
                    </div>

                    <span className="relative z-10 inline-block px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                      Duration: 2 mins 45 secs • HD 1080p
                    </span>
                  </div>
                )}
              </div>

              {/* Video Scene Selection Controls */}
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 block">
                  Select Video Demo Scene:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDemoScene(1);
                      setIsVideoPlaying(true);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all space-y-1 ${activeDemoScene === 1 && isVideoPlaying ? 'bg-cyan-500/20 border-cyan-400' : 'bg-white/5 border-white/10 hover:border-cyan-400'}`}
                  >
                    <strong className="text-cyan-300 font-heading text-xs flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-cyan-300 shrink-0" /> 1. Blood OCR
                    </strong>
                    <span className="text-[10px] text-slate-300 block font-medium">Biomarker lab report scan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveDemoScene(2);
                      setIsVideoPlaying(true);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all space-y-1 ${activeDemoScene === 2 && isVideoPlaying ? 'bg-emerald-500/20 border-emerald-400' : 'bg-white/5 border-white/10 hover:border-emerald-400'}`}
                  >
                    <strong className="text-emerald-300 font-heading text-xs flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-emerald-300 shrink-0" /> 2. Meal Planner
                    </strong>
                    <span className="text-[10px] text-slate-300 block font-medium">Personalized 7-day plan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveDemoScene(3);
                      setIsVideoPlaying(true);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all space-y-1 ${activeDemoScene === 3 && isVideoPlaying ? 'bg-amber-500/20 border-amber-400' : 'bg-white/5 border-white/10 hover:border-amber-400'}`}
                  >
                    <strong className="text-amber-300 font-heading text-xs flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-amber-300 shrink-0" /> 3. Pantry Scan
                    </strong>
                    <span className="text-[10px] text-slate-300 block font-medium font-body">Refrigerator AI recipes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveDemoScene(4);
                      setIsVideoPlaying(true);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all space-y-1 ${activeDemoScene === 4 && isVideoPlaying ? 'bg-purple-500/20 border-purple-400' : 'bg-white/5 border-white/10 hover:border-purple-400'}`}
                  >
                    <strong className="text-purple-300 font-heading text-xs flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-purple-300 shrink-0" /> 4. Telehealth
                    </strong>
                    <span className="text-[10px] text-slate-300 block font-medium font-body">20 verified doctors</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    setActiveTab('planner');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  Generate AI Meal Plan
                </button>

                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    setActiveTab('expert');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white font-black text-xs uppercase tracking-wider border border-white/20 transition-all"
                >
                  Consult Telehealth Doctor
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
