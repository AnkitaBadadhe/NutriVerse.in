import React, { useState, useEffect } from 'react';
import { 
  Search, Shield, Heart, Sparkles, User, Globe, ChevronDown, 
  Menu, X, Calendar, Activity, ChefHat, Stethoscope, Camera, FileText, 
  ShoppingBag, Users, Crown, Moon, Sun, Utensils, Droplets, Trophy, Lock, LogOut, CheckCircle
} from 'lucide-react';
import { AuthModal } from './AuthModal';
import { NutriVerseLogoIcon } from './NutriVerseLogoIcon';
import { Language, translations } from '../translations';
import { UserPlan, FEATURE_PLAN_REQUIREMENTS } from './SubscriptionPaywallModal';

export interface AuthUser {
  name: string;
  email: string;
  avatar?: string;
}

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  userPlan?: UserPlan;
  onOpenPaywall?: () => void;
  authUser?: AuthUser | null;
  onLogout?: () => void;
  onOpenAuth?: () => void;
}

export const AskNestleHeader: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  userPlan = 'free',
  onOpenPaywall,
  authUser,
  onLogout,
  onOpenAuth
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const t = translations[language] || translations['English'];

  const mainTabs = [
    { id: 'home', label: t.navHome || 'Home', icon: Heart },
    { id: 'personalized', label: t.navPersonalized || 'Personalized Nutrition', icon: Sparkles },
    { id: 'planner', label: t.navPlanner || 'AI Meal Plan', icon: Calendar },
    { id: 'tracker', label: t.navTracker || 'Health Score', icon: Activity },
    { id: 'hydration', label: t.navHydration || 'AI Hydration & Fasting', icon: Droplets },
    { id: 'leaderboard', label: t.navLeaderboard || 'Family Leaderboard', icon: Trophy },
    { id: 'recipes', label: t.navRecipes || 'Healthy Recipes', icon: ChefHat },
    { id: 'expert', label: t.navExpert || 'Doctor Telehealth', icon: Stethoscope },
    { id: 'scanner', label: t.navScanner || 'AI Meal & Calorie Studio', icon: Utensils },
    { id: 'medical', label: t.navMedical || 'Medical Reports', icon: FileText },
    { id: 'grocery', label: t.navGrocery || 'Pantry Scanner', icon: ShoppingBag },
    { id: 'community', label: t.navCommunity || 'Expert Community', icon: Users },
    { id: 'premium', label: t.navPremium || 'NutriVerse Premium', icon: Crown },
  ];

  const languagesList: Language[] = ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati'];

  const languageCodes: Record<Language, string> = {
    English: 'en',
    Hindi: 'hi',
    Tamil: 'ta',
    Telugu: 'te',
    Bengali: 'bn',
    Marathi: 'mr',
    Gujarati: 'gu'
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('nutriverse_language', lang);
    setIsLangOpen(false);

    const code = languageCodes[lang] || 'en';
    if (code === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
    } else {
      document.cookie = `googtrans=/en/${code}; path=/;`;
      document.cookie = `googtrans=/en/${code}; path=/; domain=${window.location.hostname};`;
    }

    const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = code;
      selectEl.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="w-full sticky top-0 z-[80] font-sans">
      
      {/* Main Header Bar (100% Full Width Edge-to-Edge) */}
      <div className={`w-full bg-white dark:bg-slate-900 transition-all duration-300 border-b border-slate-200 dark:border-slate-800 ${
        isScrolled ? 'shadow-md py-3' : 'py-4'
      }`}>
        <div className="w-full px-6 sm:px-12 lg:px-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <NutriVerseLogoIcon className="w-10 h-10" size={40} />
            
            <div>
              <span className="font-black text-xl font-heading tracking-tight text-[#005082] dark:text-white leading-none block">
                NutriVerse<span className="text-amber-500">.in</span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block tracking-wider uppercase">
                AI Powered Nutrition
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search NutriVerse recipes, doctor tips, diseases, meal plans..."
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#005082]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-all"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#005082]" />}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-[#005082] dark:text-cyan-400" />
                <span>{language}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-[90]">
                  {languagesList.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        language === lang ? 'text-[#005082] dark:text-cyan-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Active Subscription Tier Badge */}
            <button
              onClick={onOpenPaywall}
              className={`px-3 py-1.5 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-sm border transition-all ${
                userPlan === 'annual'
                  ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/30'
                  : userPlan === 'monthly'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
              title="Click to view/upgrade Subscription Plans"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>{userPlan === 'annual' ? 'Elite Annual 🟣' : userPlan === 'monthly' ? 'Pro Monthly 🟡' : 'Free Active 🟢'}</span>
            </button>

            {/* Sleek User Account Profile & Logout Dropdown */}
            <div className="relative">
              {authUser ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#005082] hover:bg-[#003d66] text-white shadow-md transition-all border border-cyan-400/30"
                  title="Click to view Profile & Log Out"
                >
                  <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-sm">
                    {authUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-extrabold font-heading hidden sm:inline">{authUser.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-cyan-300" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (onOpenAuth) onOpenAuth();
                    else setIsAuthOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-2xl bg-[#005082] hover:bg-[#003d66] text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
                  title="Sign In / Register Account"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Sign In / Register</span>
                </button>
              )}

              {/* Logged In User Profile Menu */}
              {authUser && isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-[100] space-y-3 text-white">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-base flex items-center justify-center">
                      {authUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-black text-white font-heading truncate">{authUser.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium truncate">{authUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-extrabold border border-emerald-500/30">
                        ✓ Authenticated User
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400">Subscription Tier</span>
                      <span className="font-bold text-amber-400">{userPlan === 'annual' ? 'Elite Annual 🟣' : userPlan === 'monthly' ? 'Pro Monthly 🟡' : 'Free Active 🟢'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs border border-rose-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Log Out Account
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Deep Blue Navigation Ribbon */}
      <div className="bg-gradient-to-r from-[#003d66] via-[#005082] to-[#003d66] text-white py-2.5 px-6 sm:px-12 lg:px-16 hidden lg:block overflow-x-auto no-scrollbar shadow-inner">
        <div className="flex items-center gap-2.5 min-w-max justify-between">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const req = FEATURE_PLAN_REQUIREMENTS[tab.id];
            const isLocked = req && ((req.requiredPlan === 'monthly' && userPlan === 'free') || (req.requiredPlan === 'annual' && userPlan !== 'annual'));

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/30'
                    : 'hover:bg-white/15 text-slate-100 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
                {isLocked && <Lock className="w-3 h-3 text-amber-300 ml-0.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 space-y-3 z-[85] shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-2xl text-xs font-bold text-left flex items-center gap-2 border ${
                    isActive
                      ? 'bg-[#005082] text-white border-[#005082]'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-500" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </header>
  );
};
