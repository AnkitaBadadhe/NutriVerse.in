import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, ShieldCheck, Zap, Sparkles, CheckCircle2, Lock, ArrowRight, X, Star, Heart,
  CreditCard, Smartphone, Building2, CheckCircle, RefreshCw, AlertCircle
} from 'lucide-react';

export type UserPlan = 'free' | 'monthly' | 'annual';

export interface PlanRequirement {
  tabId: string;
  tabLabel: string;
  requiredPlan: 'monthly' | 'annual';
  featureDescription: string;
  icon: string;
}

export const FEATURE_PLAN_REQUIREMENTS: Record<string, PlanRequirement> = {
  planner: {
    tabId: 'planner',
    tabLabel: 'AI Meal Plan',
    requiredPlan: 'monthly',
    featureDescription: 'Generates personalized 7-day ICMR & WHO certified clinical meal plans.',
    icon: '🥗'
  },
  hydration: {
    tabId: 'hydration',
    tabLabel: 'AI Hydration & Fasting',
    requiredPlan: 'monthly',
    featureDescription: 'Tracks 3.0L fluid intake, circadian intermittent fasting clock & electrolyte tips.',
    icon: '💧'
  },
  leaderboard: {
    tabId: 'leaderboard',
    tabLabel: 'Family Leaderboard',
    requiredPlan: 'monthly',
    featureDescription: 'Family health gamification, habit streaks, daily quests & reward vouchers.',
    icon: '🏆'
  },
  grocery: {
    tabId: 'grocery',
    tabLabel: 'Pantry AI Scanner',
    requiredPlan: 'monthly',
    featureDescription: 'Refrigerator vision ingredient scanner & zero-waste recipe generator.',
    icon: '🛒'
  },
  medical: {
    tabId: 'medical',
    tabLabel: 'Medical Reports OCR',
    requiredPlan: 'annual',
    featureDescription: 'AI OCR extraction of 18+ blood biomarkers, HbA1c, Lipid Profile & lab flags.',
    icon: '🩸'
  },
  expert: {
    tabId: 'expert',
    tabLabel: 'Doctor Telehealth',
    requiredPlan: 'annual',
    featureDescription: '1-on-1 consultations & digital prescriptions with 20 verified clinical doctors.',
    icon: '🩺'
  },
  personalized: {
    tabId: 'personalized',
    tabLabel: 'Predictive Digital Twin',
    requiredPlan: 'annual',
    featureDescription: '90-day predictive health twin weight trajectories & metabolic simulation.',
    icon: '🧬'
  }
};

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTabId: string | null;
  currentPlan: UserPlan;
  onUpgradePlan: (newPlan: UserPlan, targetTabToOpen?: string) => void;
  onRequireAuth?: () => void;
  isLoggedIn?: boolean;
}

export const SubscriptionPaywallModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  targetTabId,
  currentPlan,
  onUpgradePlan,
  onRequireAuth,
  isLoggedIn = false
}) => {
  const targetReq = targetTabId ? FEATURE_PLAN_REQUIREMENTS[targetTabId] : null;

  // Selected tier defaults based on feature requirement
  const [selectedTier, setSelectedTier] = useState<'monthly' | 'annual'>('annual');
  const [checkoutStep, setCheckoutStep] = useState<'confirm' | 'payment' | 'processing' | 'success'>('confirm');

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync selected tier when target feature changes
  useEffect(() => {
    if (targetReq?.requiredPlan === 'annual') {
      setSelectedTier('annual');
    } else if (targetReq?.requiredPlan === 'monthly') {
      setSelectedTier('monthly');
    } else {
      setSelectedTier('annual');
    }
    setCheckoutStep('confirm');
    setValidationError(null);
  }, [targetTabId, isOpen]);

  if (!isOpen) return null;

  // Step 1: Check Auth before proceeding to payment
  const handleProceedToPaymentClick = () => {
    // Check if user is logged in
    const checkAuthUser = localStorage.getItem('nutriverse_auth_user') || localStorage.getItem('nutriverse_jwt_token');
    const authenticated = isLoggedIn || Boolean(checkAuthUser);

    if (!authenticated) {
      if (onRequireAuth) {
        onRequireAuth();
      }
      setValidationError('Please Sign Up or Log In first to complete your NutriVerse subscription!');
      return;
    }

    setValidationError(null);
    setCheckoutStep('payment');
  };

  // Step 2: Validate Payment & Execute Checkout Simulation
  const handleExecutePayment = () => {
    setValidationError(null);

    if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        setValidationError('Please enter a valid UPI ID / VPA (e.g. name@upi or mobile@gpay).');
        return;
      }
    } else if (paymentMethod === 'card') {
      if (!cardName.trim() || !cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        setValidationError('Please fill in all card details (Name, Number, Expiry, CVV).');
        return;
      }
    }

    setCheckoutStep('processing');

    setTimeout(() => {
      onUpgradePlan(selectedTier, targetTabId || undefined);
      setCheckoutStep('success');
    }, 2200);
  };

  const selectedPriceText = selectedTier === 'annual' ? '₹3,499 / year (40% OFF)' : '₹499 / month';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[119]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-[120] bg-slate-900 border border-amber-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-white max-h-[90vh] overflow-y-auto scrollbar-thin my-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-white hover:bg-rose-500/20 flex items-center justify-center transition-all z-20"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Validation / Auth Error Alert */}
          {validationError && (
            <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* STEP 1: CONFIRMATION & PLAN SELECTION */}
          {checkoutStep === 'confirm' && (
            <>
              {/* Locked Feature Banner Header */}
              <div className="text-center space-y-2 pr-6">
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs border border-amber-500/30 inline-flex items-center gap-1.5 shadow-sm">
                  <Crown className="w-4 h-4 text-amber-400" /> NutriVerse Subscription Tier Paywall
                </span>

                {targetReq ? (
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black font-heading text-white flex items-center justify-center gap-2">
                      <span>{targetReq.icon}</span> Unlock {targetReq.tabLabel}
                    </h3>
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-medium max-w-lg mx-auto text-center space-y-1">
                      <p className="font-bold text-amber-300">
                        🔒 <strong>{targetReq.tabLabel}</strong> requires NutriVerse {targetReq.requiredPlan === 'annual' ? 'Elite Annual' : 'Pro Monthly'} Subscription.
                      </p>
                      <p className="text-[11px] text-slate-300">{targetReq.featureDescription}</p>
                    </div>
                  </div>
                ) : (
                  <h3 className="text-2xl font-black font-heading text-white">
                    Choose Your NutriVerse Subscription Plan
                  </h3>
                )}
              </div>

              {/* Pricing Tier Selector Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* 1. Free Plan */}
                <div className={`p-4 rounded-2xl border transition-all text-center space-y-2 ${currentPlan === 'free' ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-slate-800 bg-slate-950/40'}`}>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-extrabold text-[10px] uppercase">
                    {currentPlan === 'free' ? 'Active Plan' : 'Basic Tier'}
                  </span>
                  <h4 className="text-sm font-black font-heading text-white">Free Active Plan</h4>
                  <div className="text-xl font-black text-slate-200">₹0 <span className="text-xs font-normal text-slate-400">/ forever</span></div>
                  <ul className="text-[11px] text-slate-300 space-y-1 text-left font-medium pt-2 border-t border-white/10">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Home Overview</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Healthy Recipes</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> AI Calorie Studio</li>
                  </ul>
                </div>

                {/* 2. Pro Monthly Plan */}
                <div 
                  onClick={() => setSelectedTier('monthly')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-center space-y-2 relative ${
                    selectedTier === 'monthly' ? 'border-amber-400 bg-amber-500/15 shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/20' : 'border-slate-800 bg-slate-950/60 hover:border-amber-400/40'
                  }`}
                >
                  {selectedTier === 'monthly' && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-2.5 py-0.5 bg-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-wider rounded-full">SELECTED TIER</div>}
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-[10px] uppercase">Pro Tier</span>
                  <h4 className="text-sm font-black font-heading text-white">Pro Monthly</h4>
                  <div className="text-2xl font-black text-amber-300 font-heading">₹499 <span className="text-xs font-normal text-slate-300">/ month</span></div>
                  <ul className="text-[11px] text-slate-200 space-y-1 text-left font-medium pt-2 border-t border-white/10">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> 7-Day AI Meal Plan</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> AI Hydration & Fasting</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Family Leaderboard</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Pantry Vision Scanner</li>
                  </ul>
                </div>

                {/* 3. Elite Annual Plan */}
                <div 
                  onClick={() => setSelectedTier('annual')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all text-center space-y-2 relative ${
                    selectedTier === 'annual' ? 'border-cyan-400 bg-cyan-500/15 shadow-lg shadow-cyan-500/10 ring-2 ring-cyan-400/20' : 'border-slate-800 bg-slate-950/60 hover:border-cyan-400/40'
                  }`}
                >
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-[9px] uppercase tracking-wider rounded-full shadow-md">BEST VALUE • 40% OFF</div>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-extrabold text-[10px] uppercase">Elite Tier</span>
                  <h4 className="text-sm font-black font-heading text-white">Elite Annual</h4>
                  <div className="text-2xl font-black text-cyan-300 font-heading">₹3,499 <span className="text-xs font-normal text-slate-300">/ year</span></div>
                  <ul className="text-[11px] text-slate-200 space-y-1 text-left font-medium pt-2 border-t border-white/10">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> <strong>All Pro Features</strong></li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Medical Blood OCR</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> 20 Doctors Telehealth</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> 90-Day Digital Twin</li>
                  </ul>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
                <button
                  onClick={onClose}
                  className="text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  Continue with Free Active Plan
                </button>

                <button
                  onClick={handleProceedToPaymentClick}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 hover:from-amber-600 hover:to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Zap className="w-4 h-4 fill-slate-950" /> Proceed to Payment Gateway for {selectedTier === 'annual' ? 'Elite Annual (₹3,499/yr)' : 'Pro Monthly (₹499/mo)'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* STEP 2: PAYMENT GATEWAY SELECTION */}
          {checkoutStep === 'payment' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-xl font-black font-heading text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" /> NutriVerse 256-Bit Secure Checkout Gateway
                  </h3>
                  <p className="text-xs text-slate-300">Selected Plan: <strong className="text-amber-300 uppercase">{selectedTier === 'annual' ? 'Elite Annual (₹3,499/yr)' : 'Pro Monthly (₹499/mo)'}</strong></p>
                </div>
                <button onClick={() => setCheckoutStep('confirm')} className="text-xs font-bold text-slate-400 hover:text-white">
                  ← Change Plan
                </button>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                    paymentMethod === 'upi' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-950/40 border-slate-800 text-slate-400'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span>UPI / GPay / PhonePe</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                    paymentMethod === 'card' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-950/40 border-slate-800 text-slate-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                    paymentMethod === 'netbanking' ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-950/40 border-slate-800 text-slate-400'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  <span>Netbanking</span>
                </button>
              </div>

              {/* Form Input Fields */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                {paymentMethod === 'upi' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Enter UPI ID / VPA</label>
                    <input
                      type="text"
                      placeholder="e.g. yourname@gpay, mobile@upi or user@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-amber-400 outline-none"
                    />
                    <p className="text-[10px] text-slate-400">Supports Google Pay, PhonePe, Paytm, BHIM & all Indian Banks.</p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="Name on card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 block">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8910"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="08/28"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-300 block">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Select Primary Bank</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs outline-none"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setCheckoutStep('confirm')}
                  className="text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={handleExecutePayment}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl flex items-center gap-2 transform hover:scale-105 transition-all"
                >
                  Pay {selectedPriceText} & Unlock Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PROCESSING ANIMATION */}
          {checkoutStep === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <RefreshCw className="w-12 h-12 text-amber-400 animate-spin mx-auto" />
              <h3 className="text-xl font-black font-heading text-white">Encrypting & Processing 256-Bit Payment...</h3>
              <p className="text-xs text-slate-300">Communicating with bank server. Please do not close or refresh this window.</p>
            </div>
          )}

          {/* STEP 4: PAYMENT SUCCESS & FEATURE UNLOCKED */}
          {checkoutStep === 'success' && (
            <div className="py-8 text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-500/30">
                Payment Successful • Receipt Sent to Email
              </span>
              <h3 className="text-2xl font-black font-heading text-white">
                Subscription Upgraded to {selectedTier === 'annual' ? 'Elite Annual 🟣' : 'Pro Monthly 🟡'}!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Congratulations! All features including {targetReq?.tabLabel || 'your selected feature'} have been unlocked on your account.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl transform hover:scale-105 transition-all"
              >
                Go to Unlocked Feature Now →
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
