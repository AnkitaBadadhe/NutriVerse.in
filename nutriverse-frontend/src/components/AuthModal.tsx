import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, User, ArrowRight, ShieldCheck, CheckCircle2, UserPlus, LogIn } from 'lucide-react';
import { NutriVerseLogoIcon } from './NutriVerseLogoIcon';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = name.trim() || (email ? email.split('@')[0] : 'NutriVerse Member');
    const userObj = { 
      name: userName, 
      email: email.trim() || 'user@nutriverse.in' 
    };
    
    localStorage.setItem('nutriverse_auth_user', JSON.stringify(userObj));
    if (onLoginSuccess) {
      onLoginSuccess(userObj);
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
      />

      {/* Modal Window */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-[100] bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 my-auto text-xs max-h-[88vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all z-10"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
              {mode === 'register' ? 'Registration Successful!' : 'Welcome Back!'}
            </h3>
            <p className="text-xs text-slate-500">Redirecting to your NutriVerse dashboard...</p>
          </div>
        ) : (
          <div>
            <div className="text-center space-y-2 mb-4">
              <NutriVerseLogoIcon className="w-11 h-11 mx-auto shadow-sm" />
              <div>
                <span className="inline-flex items-center gap-1 bg-[#005082]/10 text-[#005082] dark:text-cyan-400 px-3 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border border-[#005082]/20">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" /> NutriVerse Health Portal
                </span>
              </div>
              <h3 className="text-xl font-black font-heading text-slate-900 dark:text-white">
                {mode === 'register' ? 'Create Account (Sign Up)' : 'Sign In to NutriVerse'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Unlock personalized AI meal plans, health tracking, and 20 clinical doctor chats.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl mb-4 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 border ${
                  mode === 'register'
                    ? 'bg-[#005082] text-white border-[#005082] shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" /> Sign Up (Register)
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 border ${
                  mode === 'login'
                    ? 'bg-[#005082] text-white border-[#005082] shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" /> Sign In (Login)
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'register' && (
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Ananya Sharma"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 pl-9 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#005082]"
                    />
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 pl-9 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#005082]"
                  />
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 pl-9 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#005082]"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-1"
              >
                <span>{mode === 'register' ? 'Complete Registration (Sign Up)' : 'Sign In to NutriVerse'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {mode === 'register' ? "Already have an account?" : "Don't have an account yet?"}{' '}
                <button
                  type="button"
                  onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
                  className="text-[#005082] dark:text-cyan-400 font-extrabold hover:underline ml-1"
                >
                  {mode === 'register' ? 'Sign In Here' : 'Create Free Account'}
                </button>
              </p>

              <p className="text-[9px] text-slate-400 mt-2">
                By continuing, you agree to NutriVerse's Terms of Service & Privacy Policy.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
