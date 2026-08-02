import React, { useState, useEffect } from 'react';
import { AskNestleHeader } from './components/AskNestleHeader';
import { HeroSection } from './components/HeroSection';
import { PersonalizedNutritionView } from './components/PersonalizedNutritionView';
import { AiMealPlannerView } from './components/AiMealPlannerView';
import { HealthScoreSuite } from './components/HealthScoreSuite';
import { HydrationCircadianTracker } from './components/HydrationCircadianTracker';
import { FamilyLeaderboardView } from './components/FamilyLeaderboardView';
import { AskNestleRecipes } from './components/AskNestleRecipes';
import { ExpertAdviceView } from './components/ExpertAdviceView';
import { FoodVisionScanner } from './components/FoodVisionScanner';
import { MedicalReportsView } from './components/MedicalReportsView';
import { PantryAiScanner } from './components/PantryAiScanner';
import { ExpertCommunityView } from './components/ExpertCommunityView';
import { NutriVersePremiumView } from './components/NutriVersePremiumView';
import { LegalComplianceModal, LegalModalType } from './components/LegalComplianceModal';
import { NutriVerseLogoIcon } from './components/NutriVerseLogoIcon';
import { Language, translations } from './translations';
import { 
  ShieldCheck, Sparkles, Send, ArrowRight, Heart, Activity, 
  Stethoscope, Lock, CheckCircle2, Globe, Mail, PhoneCall 
} from 'lucide-react';

import { SubscriptionPaywallModal, UserPlan, FEATURE_PLAN_REQUIREMENTS } from './components/SubscriptionPaywallModal';
import { AuthModal } from './components/AuthModal';
import { AuthUser } from './components/AskNestleHeader';

export function App() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('nutriverse_active_tab') || 'home';
  });
  
  const [userPlan, setUserPlan] = useState<UserPlan>(() => {
    return (localStorage.getItem('nutriverse_user_plan') as UserPlan) || 'free';
  });

  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('nutriverse_auth_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallTargetTab, setPaywallTargetTab] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('nutriverse_language') as Language) || 'English';
  });
  const [healthScore] = useState(92);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<LegalModalType>(null);

  useEffect(() => {
    localStorage.setItem('nutriverse_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('nutriverse_user_plan', userPlan);
  }, [userPlan]);

  useEffect(() => {
    localStorage.setItem('nutriverse_language', language);
  }, [language]);

  const handleLogout = () => {
    localStorage.removeItem('nutriverse_auth_user');
    localStorage.removeItem('nutriverse_jwt_token');
    setAuthUser(null);
  };

  const t = translations[language] || translations['English'];

  const handleTabChange = (tabId: string) => {
    const req = FEATURE_PLAN_REQUIREMENTS[tabId];
    if (!req) {
      setActiveTab(tabId);
      return;
    }

    if (req.requiredPlan === 'monthly' && userPlan === 'free') {
      setPaywallTargetTab(tabId);
      setIsPaywallOpen(true);
      return;
    }

    if (req.requiredPlan === 'annual' && userPlan !== 'annual') {
      setPaywallTargetTab(tabId);
      setIsPaywallOpen(true);
      return;
    }

    setActiveTab(tabId);
  };

  const handleUpgradePlan = (newPlan: UserPlan, targetTabToOpen?: string) => {
    setUserPlan(newPlan);
    if (targetTabToOpen) {
      setActiveTab(targetTabToOpen);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* Top Header Navigation */}
      <AskNestleHeader
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        language={language}
        setLanguage={setLanguage}
        userPlan={userPlan}
        onOpenPaywall={() => {
          setPaywallTargetTab(null);
          setIsPaywallOpen(true);
        }}
        authUser={authUser}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {activeTab === 'home' && (
          <>
            <HeroSection setActiveTab={setActiveTab} language={language} />
            <PersonalizedNutritionView />
            <HealthScoreSuite healthScore={healthScore} language={language} />
            <HydrationCircadianTracker />
            <AskNestleRecipes />
            <MedicalReportsView />
            <FoodVisionScanner />
            <PantryAiScanner />
            <ExpertAdviceView />
          </>
        )}

        {activeTab === 'personalized' && <PersonalizedNutritionView />}
        {activeTab === 'planner' && <AiMealPlannerView />}
        {activeTab === 'tracker' && <HealthScoreSuite healthScore={healthScore} language={language} />}
        {activeTab === 'hydration' && <HydrationCircadianTracker />}
        {activeTab === 'leaderboard' && <FamilyLeaderboardView />}
        {activeTab === 'recipes' && <AskNestleRecipes />}
        {activeTab === 'expert' && <ExpertAdviceView />}
        {activeTab === 'scanner' && <FoodVisionScanner />}
        {activeTab === 'medical' && <MedicalReportsView />}
        {activeTab === 'grocery' && <PantryAiScanner />}
        {activeTab === 'community' && <ExpertCommunityView />}
        {activeTab === 'premium' && <NutriVersePremiumView />}
      </main>

      {/* Ultra-Premium Glassmorphic Footer */}
      <footer className="w-full bg-gradient-to-b from-[#001f38] via-[#001526] to-[#000a14] text-slate-300 pt-16 pb-12 border-t border-[#005082]/40 font-sans mt-16 relative overflow-hidden">
        
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Newsletter Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#005082] via-[#003d66] to-[#002845] border border-white/15 shadow-2xl mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
            
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-amber-400" />
                NutriVerse AI Health Pulse
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                Subscribe for Weekly Clinical AI Meal Plans & Doctor Guidance
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                Get precision biomarker nutrition tips, gourmet Indian recipes, and telehealth doctor updates directly in your inbox.
              </p>
            </div>

            {/* Newsletter Input Form */}
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
              {isSubscribed ? (
                <div className="px-6 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Subscribed successfully! Welcome to NutriVerse AI.
                </div>
              ) : (
                <>
                  <div className="relative w-full sm:w-80">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white placeholder-slate-300 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Subscribe Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Main Footer Links Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-white/10 text-xs">
            
            {/* Col 1 & 2: Brand Overview */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <NutriVerseLogoIcon className="w-10 h-10" size={40} />
                <span className="font-black text-2xl text-white font-heading tracking-tight">
                  NutriVerse<span className="text-cyan-400">.in</span>
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium max-w-sm">
                India's premier AI precision nutrition and telehealth platform for personalized wellness, blood biomarker OCR diagnostics, gourmet healthy recipes, and 24/7 doctor consultations.
              </p>

              {/* Compliance Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> ICMR & WHO Compliant
                </span>
                <span className="text-[10px] px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted
                </span>
              </div>
            </div>

            {/* Col 3: Platform Features */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider font-heading">
                Platform Features
              </h4>
              <ul className="space-y-2.5 text-slate-300 font-medium">
                <li><button onClick={() => setActiveTab('personalized')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-cyan-500" /> Personalized Nutrition</button></li>
                <li><button onClick={() => setActiveTab('planner')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-cyan-500" /> AI Meal Planner</button></li>
                <li><button onClick={() => setActiveTab('tracker')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-cyan-500" /> Biomarker Health Score</button></li>
                <li><button onClick={() => setActiveTab('recipes')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-cyan-500" /> 24 Gourmet Recipes</button></li>
                <li><button onClick={() => setActiveTab('medical')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-cyan-500" /> Medical Report OCR Scanner</button></li>
                <li><button onClick={() => setActiveTab('scanner')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><ArrowRight className="w-3 h-3 text-cyan-500" /> Food Vision AI Scanner</button></li>
              </ul>
            </div>

            {/* Col 4: Medical Telehealth */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider font-heading">
                Medical Telehealth
              </h4>
              <ul className="space-y-2.5 text-slate-300 font-medium">
                <li><button onClick={() => setActiveTab('expert')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Stethoscope className="w-3 h-3 text-emerald-400" /> 20 Telehealth Doctors</button></li>
                <li><button onClick={() => setActiveTab('expert')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Stethoscope className="w-3 h-3 text-emerald-400" /> Clinical Endocrinology</button></li>
                <li><button onClick={() => setActiveTab('expert')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Stethoscope className="w-3 h-3 text-emerald-400" /> Pediatric Dietitians</button></li>
                <li><button onClick={() => setActiveTab('expert')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Stethoscope className="w-3 h-3 text-emerald-400" /> Ayurvedic Rasayana</button></li>
                <li><button onClick={() => setActiveTab('grocery')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Stethoscope className="w-3 h-3 text-emerald-400" /> Pantry AI Refrigerator Scanner</button></li>
              </ul>
            </div>

            {/* Col 5: Clinical Safety Card */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider font-heading">
                Clinical Safety
              </h4>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-[11px] font-black text-emerald-400 font-heading">
                    AI Clinical Engine Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                  The clinical insights provided by NutriVerse are designed for educational wellness guidance. Always consult your obstetrician or doctor for medical advice.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <span>© 2026 NutriVerse.in • AI Precision Nutrition India.</span>
            </div>

            <div className="flex flex-wrap gap-6 text-slate-300 font-medium">
              <button onClick={() => setActiveLegalModal('privacy')} className="hover:text-cyan-400 transition-colors">Privacy Policy</button>
              <button onClick={() => setActiveLegalModal('terms')} className="hover:text-cyan-400 transition-colors">Terms of Service</button>
              <button onClick={() => setActiveLegalModal('guidelines')} className="hover:text-cyan-400 transition-colors">Clinical Guidelines</button>
              <button onClick={() => setActiveLegalModal('security')} className="hover:text-cyan-400 transition-colors">Security & Encryption</button>
            </div>
          </div>

        </div>
      </footer>

      {/* Tiered Feature Paywall Subscription Modal */}
      <SubscriptionPaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        targetTabId={paywallTargetTab}
        currentPlan={userPlan}
        onUpgradePlan={handleUpgradePlan}
        onRequireAuth={() => setIsAuthOpen(true)}
        isLoggedIn={Boolean(authUser)}
      />

      {/* Auth Modal for Sign Up / Login */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => setAuthUser(user)}
      />

      {/* Interactive Legal & Compliance Modal */}
      <LegalComplianceModal 
        modalType={activeLegalModal} 
        onClose={() => setActiveLegalModal(null)} 
      />
    </div>
  );
}

export default App;
