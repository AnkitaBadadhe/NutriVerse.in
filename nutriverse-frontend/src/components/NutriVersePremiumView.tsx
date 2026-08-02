import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Sparkles, Check, ShieldCheck, Zap, Stethoscope, Dna, 
  Clock, Heart, Star, ArrowRight, CheckCircle2, Lock, Gift, 
  TrendingUp, Calendar, MapPin, Phone, Award, ChevronRight, X, Percent, Flame,
  CreditCard, Smartphone, Building2, Download, CheckCircle, RefreshCw
} from 'lucide-react';

export const NutriVersePremiumView: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null);

  // Multi-Step Checkout Flow State
  const [checkoutStep, setCheckoutStep] = useState<'confirm' | 'payment' | 'netbanking_login' | 'processing' | 'success'>('confirm');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  
  // Card Details State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  // Netbanking State
  const [selectedBank, setSelectedBank] = useState('');
  const [netbankingUserId, setNetbankingUserId] = useState('');
  const [netbankingPassword, setNetbankingPassword] = useState('');
  
  // Validation Error State
  const [validationError, setValidationError] = useState<string | null>(null);
  const [labValidationError, setLabValidationError] = useState<string | null>(null);
  
  const [activeMembership, setActiveMembership] = useState<string | null>(() => {
    return localStorage.getItem('nutriverse_active_plan');
  });

  useEffect(() => {
    if (activeMembership) {
      localStorage.setItem('nutriverse_active_plan', activeMembership);
    } else {
      localStorage.removeItem('nutriverse_active_plan');
    }
  }, [activeMembership]);

  // 90-Day Interactive Transformation Simulator State
  const [targetWeightLoss, setTargetWeightLoss] = useState(8); // in kg
  const [simulatedHbA1c, setSimulatedHbA1c] = useState(5.4);
  const [simulatedEnergy, setSimulatedEnergy] = useState(96);

  // At-Home Lab Test Booking State
  const [labPincode, setLabPincode] = useState('');
  const [selectedLab, setSelectedLab] = useState('Thyrocare Clinical Labs');
  const [isLabBooked, setIsLabBooked] = useState(false);

  // Open Checkout Modal for a specific Plan
  const openCheckout = (planName: string) => {
    setSelectedPlanModal(planName);
    setCheckoutStep('confirm');
  };

  // Process Payment Trigger
  const handleProceedToPayment = () => {
    setCheckoutStep('payment');
    setValidationError(null);
  };

  const handleExecutePayment = () => {
    setValidationError(null);

    if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        setValidationError('Please enter a valid VPA/UPI ID (e.g. name@upi).');
        return;
      }
    } else if (paymentMethod === 'card') {
      if (!cardName.trim()) {
        setValidationError('Please enter Cardholder Name.');
        return;
      }
      const cleanedCard = cardNumber.replace(/\s+/g, '');
      if (cleanedCard.length !== 16 || !/^\d+$/.test(cleanedCard)) {
        setValidationError('Card Number must be exactly 16 digits.');
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        setValidationError('Expiry Date must be in MM/YY format.');
        return;
      }
      if (cardCvv.length !== 3 || !/^\d+$/.test(cardCvv)) {
        setValidationError('CVV must be exactly 3 digits.');
        return;
      }
    } else if (paymentMethod === 'netbanking') {
      if (!selectedBank) {
        setValidationError('Please select your retail NetBanking Bank.');
        return;
      }
      // Open secure branded retail netbanking authentication page
      setCheckoutStep('netbanking_login');
      setValidationError(null);
      return;
    }

    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('success');
      setActiveMembership(selectedPlanModal);
    }, 1600);
  };

  const handleExecuteNetbankingPay = () => {
    setValidationError(null);
    if (!netbankingUserId.trim()) {
      setValidationError('Please enter your Customer / User ID.');
      return;
    }
    if (!netbankingPassword.trim()) {
      setValidationError('Please enter your NetBanking Password.');
      return;
    }

    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('success');
      setActiveMembership(selectedPlanModal);
      setNetbankingUserId('');
      setNetbankingPassword('');
    }, 1600);
  };

  const handleScheduleLabTest = () => {
    setLabValidationError(null);
    if (!activeMembership || !activeMembership.includes("Platinum")) {
      setLabValidationError('⚠️ At-Home Biomarker & DNA testing is exclusively available to Platinum VIP members.');
      return;
    }
    const cleanPin = labPincode.trim();
    if (!cleanPin || !/^\d{6}$/.test(cleanPin)) {
      setLabValidationError('Please enter a valid 6-digit Indian Pincode.');
      return;
    }
    setIsLabBooked(true);
  };

  const handleCloseCheckout = () => {
    setSelectedPlanModal(null);
    setCheckoutStep('confirm');
    setValidationError(null);
    setNetbankingUserId('');
    setNetbankingPassword('');
  };

  return (
    <div className="space-y-10">
      
      {/* Top Glassmorphic Hero Header */}
      <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#00385c] via-[#00243d] to-[#001220] border border-amber-500/30 text-white shadow-2xl overflow-hidden">
        <div className="absolute -right-10 -top-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          
          {/* Active VIP Status Badge */}
          {activeMembership ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shadow-lg animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>ACTIVE: {activeMembership}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-xs">
              <Crown className="w-4 h-4 text-amber-400" />
              NutriVerse Platinum Concierge Membership
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading leading-tight tracking-tight text-white">
            Unlock Precision AI Clinical Health & 24/7 Doctor Concierge
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Elevate your metabolic health with unlimited AI vision scans, at-home blood biomarker diagnostics, 1-on-1 doctor access, and customized gut DNA sequencing.
          </p>

          {/* Interactive Billing Cycle Switcher */}
          <div className="pt-4 space-y-3">
            <div className="p-1.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 inline-flex items-center gap-1.5 text-xs shadow-inner">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-slate-900 shadow-md scale-105'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4 text-[#005082]" />
                <span>Monthly Concierge</span>
              </button>

              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 scale-105'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Annual VIP Platinum</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 font-black uppercase">
                  Save 35%
                </span>
              </button>
            </div>

            {/* Dynamic Interactive Savings Alert Banner */}
            <AnimatePresence mode="wait">
              {billingCycle === 'annual' ? (
                <motion.div
                  key="annual-alert"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-2 max-w-md"
                >
                  <Gift className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>✨ Save ₹1,989/yr (35% OFF) + Free At-Home Blood Test Kit</span>
                </motion.div>
              ) : (
                <motion.div
                  key="monthly-alert"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-2 max-w-md"
                >
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>⚡ Flexible Monthly Billing • Cancel Anytime</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* OUT-OF-THE-BOX FEATURE 1: Interactive 90-Day AI Transformation Simulator */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">
                AI Biomarker & Metabolic Twin Simulator
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Adjust parameters to project your 90-day clinical metabolic improvements under Premium
              </span>
            </div>
          </div>

          <span className="text-xs font-black px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            ⚡ Predicted Bio-Age: -4.2 Years
          </span>
        </div>

        {/* Interactive Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          {/* Slider 1: Target Weight Loss */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex justify-between font-bold">
              <span className="text-slate-700 dark:text-slate-300">Target Weight Optimization</span>
              <strong className="text-amber-500 font-black">{targetWeightLoss} kg Loss</strong>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              value={targetWeightLoss}
              onChange={(e) => setTargetWeightLoss(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <span className="text-[11px] text-slate-500 block">
              Estimated Visceral Fat Reduction: {(targetWeightLoss * 0.45).toFixed(1)}%
            </span>
          </div>

          {/* Slider 2: Target HbA1c Reduction */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex justify-between font-bold">
              <span className="text-slate-700 dark:text-slate-300">Target HbA1c Blood Level</span>
              <strong className="text-emerald-500 font-black">{simulatedHbA1c}% (Optimal)</strong>
            </div>
            <input
              type="range"
              min="4.8"
              max="6.5"
              step="0.1"
              value={simulatedHbA1c}
              onChange={(e) => setSimulatedHbA1c(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <span className="text-[11px] text-slate-500 block">
              Fasting Insulin Balance: {(simulatedHbA1c * 1.8).toFixed(1)} µIU/mL
            </span>
          </div>

          {/* Slider 3: Daily Energy & Focus Score */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex justify-between font-bold">
              <span className="text-slate-700 dark:text-slate-300">Sustained Daily Energy Score</span>
              <strong className="text-cyan-500 font-black">{simulatedEnergy}% Satiety</strong>
            </div>
            <input
              type="range"
              min="70"
              max="100"
              value={simulatedEnergy}
              onChange={(e) => setSimulatedEnergy(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <span className="text-[11px] text-slate-500 block">
              Mitochondrial Efficiency Index: High Peak
            </span>
          </div>

        </div>
      </div>

      {/* Pricing Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tier 1: Free Tier */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              Basic Standard
            </span>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading">Free Starter</h3>
              <span className="text-3xl font-black text-slate-900 dark:text-white font-heading mt-1 block">₹0</span>
              <span className="text-xs text-slate-500">Forever Free</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Basic AI Meal Recommendations</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 3 Food Vision Scans per month</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Standard Community Q&A</li>
              <li className="flex items-center gap-2 text-slate-400 line-through"><X className="w-4 h-4" /> Telehealth Doctor Consultations</li>
              <li className="flex items-center gap-2 text-slate-400 line-through"><X className="w-4 h-4" /> At-Home Biomarker Blood Test Kit</li>
            </ul>
          </div>

          {activeMembership === null ? (
            <button disabled className="w-full py-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs border border-emerald-500/20 flex items-center justify-center gap-1">
              <Check className="w-4 h-4" /> Active Plan
            </button>
          ) : (
            <button disabled className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold text-xs">
              Standard Free
            </button>
          )}
        </div>

        {/* Tier 2: NutriVerse Pro */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-[#005082] shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="space-y-4">
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#005082] text-white">
              Most Popular
            </span>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading">NutriVerse Pro</h3>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-slate-900 dark:text-white font-heading">
                  {billingCycle === 'annual' ? '₹399' : '₹499'}
                </span>
                <span className="text-xs text-slate-500">
                  / month {billingCycle === 'annual' ? '(Billed ₹4,788/yr)' : '(Billed monthly)'}
                </span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#005082]" /> Unlimited AI Food Vision Scans</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#005082]" /> 24 Gourmet Recipe Database</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#005082]" /> 2 Monthly Telehealth Doctor Consults</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#005082]" /> Smart Refrigerator OCR Scanner</li>
              <li className="flex items-center gap-2 text-slate-400 line-through"><X className="w-4 h-4" /> Free At-Home Blood Test Kit</li>
            </ul>
          </div>

          {activeMembership && activeMembership.includes("Pro") ? (
            <button disabled className="w-full py-3 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1 shadow-md">
              <Check className="w-4 h-4 stroke-[3]" /> Active Plan
            </button>
          ) : (
            <button
              onClick={() => openCheckout(`NutriVerse Pro (${billingCycle === 'annual' ? '₹399/mo Annual' : '₹499/mo Monthly'})`)}
              className="w-full py-3 rounded-2xl bg-[#005082] hover:bg-[#003d66] text-white font-extrabold text-xs shadow-md transition-all"
            >
              {activeMembership && activeMembership.includes("Platinum") ? "Downgrade to Pro" : "Upgrade to Pro"}
            </button>
          )}
        </div>

        {/* Tier 3: Platinum Concierge VIP */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-[#001f38] rounded-3xl p-6 border-2 border-amber-500 shadow-2xl flex flex-col justify-between space-y-6 text-white relative">
          <div className="space-y-4">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white uppercase tracking-wider flex items-center gap-1 w-max">
              <Crown className="w-3.5 h-3.5" /> VIP Platinum
            </span>
            <div>
              <h3 className="text-2xl font-black text-white font-heading">Platinum VIP Concierge</h3>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-amber-400 font-heading">
                  {billingCycle === 'annual' ? '₹3,999' : '₹599'}
                </span>
                <span className="text-xs text-slate-300">
                  {billingCycle === 'annual' ? '/ year (Effective ₹333/mo)' : '/ month'}
                </span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-200 font-medium">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> EVERYTHING in NutriVerse Pro</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> 1 FREE At-Home Blood Biomarker Kit</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Unlimited 24/7 Telehealth Doctor Access</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Dedicated Personal Dietitian</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-amber-400" /> Gut DNA Sequencing Insights</li>
            </ul>
          </div>

          {activeMembership && activeMembership.includes("Platinum") ? (
            <button disabled className="w-full py-3 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1 shadow-md">
              <Check className="w-4 h-4 stroke-[3]" /> Active Plan
            </button>
          ) : (
            <button
              onClick={() => openCheckout(`Platinum VIP (${billingCycle === 'annual' ? '₹3,999/yr' : '₹599/mo'})`)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1"
            >
              <span>Activate Platinum VIP</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* OUT-OF-THE-BOX FEATURE 2: At-Home Lab Test Collection Booking Widget */}
      <div className="bg-gradient-to-br from-slate-900 via-[#002845] to-slate-950 rounded-3xl p-6 sm:p-8 border border-cyan-500/30 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center shadow-inner">
              <Dna className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white font-heading">
                Claim Included At-Home Biomarker Blood & DNA Kit
              </h3>
              <span className="text-xs text-slate-300 font-medium">
                Included FREE with Platinum VIP Membership • NABL Certified Partner Labs
              </span>
            </div>
          </div>

          <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-emerald-400 text-slate-950 shadow-md">
            NABL Accredited
          </span>
        </div>

        {/* Booking Form */}
        {isLabBooked ? (
          <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-2">
            <CheckCircle2 className="w-9 h-9 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-black text-emerald-300 font-heading">At-Home Sample Collection Scheduled!</h4>
            <p className="text-xs text-slate-200">
              Phlebotomist partner from <strong className="text-emerald-400">{selectedLab}</strong> will visit your pincode ({labPincode}) tomorrow between 7:00 AM - 9:00 AM (Fasting Sample).
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {(!activeMembership || !activeMembership.includes("Platinum")) && (
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs font-bold flex items-center gap-2.5 shadow-sm">
                <span className="text-amber-400 text-base">⚠️</span>
                <span>At-Home Biomarker & DNA collection is included with the Platinum VIP plan. Upgrade or enter pincode to test.</span>
              </div>
            )}

            {labValidationError && (
              <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 font-extrabold text-xs text-center">
                ⚠️ {labValidationError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
              <div>
                <label className="font-extrabold text-slate-200 block mb-2 font-heading">Select Partner Lab:</label>
                <select
                  disabled={!activeMembership || !activeMembership.includes("Platinum")}
                  value={selectedLab}
                  onChange={(e) => setSelectedLab(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-white font-bold text-xs focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all disabled:opacity-50 cursor-pointer"
                >
                  <option value="Thyrocare Clinical Labs" className="bg-slate-900 text-white">Thyrocare Clinical Labs</option>
                  <option value="Dr. Lal PathLabs" className="bg-slate-900 text-white">Dr. Lal PathLabs</option>
                  <option value="Metropolis Healthcare" className="bg-slate-900 text-white">Metropolis Healthcare</option>
                </select>
              </div>

              <div>
                <label className="font-extrabold text-slate-200 block mb-2 font-heading">Enter Home Pincode:</label>
                <input
                  type="text"
                  disabled={!activeMembership || !activeMembership.includes("Platinum")}
                  value={labPincode}
                  onChange={(e) => {
                    setLabPincode(e.target.value);
                    setLabValidationError(null);
                  }}
                  placeholder="e.g. 110001, 400001, 560001..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-400 font-bold text-xs focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all disabled:opacity-50"
                />
              </div>

              <div className="flex items-end">
                <button
                  disabled={!labPincode.trim() && (!activeMembership || !activeMembership.includes("Platinum"))}
                  onClick={handleScheduleLabTest}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-600 hover:to-cyan-500 disabled:opacity-50 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Schedule Free Home Pickup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Multi-Step Checkout Modal */}
      <AnimatePresence>
        {selectedPlanModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseCheckout}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-[100] bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-5 my-auto"
            >
              <button
                onClick={handleCloseCheckout}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* STEP 1: Confirm Plan Benefits */}
              {checkoutStep === 'confirm' && (
                <div className="space-y-4 text-xs">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                    <Crown className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider">
                      Secure Checkout
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white font-heading mt-1">
                      {selectedPlanModal}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-left space-y-2">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Included Membership Benefits:</span>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Unlimited AI Food Vision Scans</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> 24/7 Telehealth Doctor Priority Access</li>
                      <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> At-Home Blood Biomarker Collection</li>
                    </ul>
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={handleProceedToPayment}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Proceed to Payment Gateway (₹)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCloseCheckout}
                      className="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Select Payment Method & UPI ID */}
              {checkoutStep === 'payment' && (
                <div className="space-y-4 text-xs text-left">
                  <div className="text-center">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">
                      Select Payment Method
                    </h3>
                    <span className="text-[11px] text-slate-500">256-Bit Encrypted Indian Rupee Payment</span>
                  </div>

                  {/* Payment Tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1 text-[11px] font-bold ${
                        paymentMethod === 'upi' ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <Smartphone className="w-5 h-5" />
                      <span>UPI / GPay</span>
                    </button>
                    
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1 text-[11px] font-bold ${
                        paymentMethod === 'card' ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Card</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1 text-[11px] font-bold ${
                        paymentMethod === 'netbanking' ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <Building2 className="w-5 h-5" />
                      <span>NetBanking</span>
                    </button>
                  </div>

                  {/* UPI Input */}
                  {paymentMethod === 'upi' && (
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Enter VPA / UPI ID:</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => {
                          setUpiId(e.target.value);
                          setValidationError(null);
                        }}
                        placeholder="username@okicici / username@paytm"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Card Input Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-2.5">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Cardholder Name:</label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => {
                            setCardName(e.target.value);
                            setValidationError(null);
                          }}
                          placeholder="e.g. Sunita Rao"
                          className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700 dark:text-slate-300">Card Number:</label>
                        <input
                          type="text"
                          value={cardNumber}
                          maxLength={19}
                          onChange={(e) => {
                            setCardNumber(e.target.value);
                            setValidationError(null);
                          }}
                          placeholder="e.g. 4321 5678 9012 3456"
                          className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-bold text-slate-700 dark:text-slate-300">Expiry (MM/YY):</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            maxLength={5}
                            onChange={(e) => {
                              setCardExpiry(e.target.value);
                              setValidationError(null);
                            }}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium text-center focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-700 dark:text-slate-300">CVV:</label>
                          <input
                            type="password"
                            value={cardCvv}
                            maxLength={3}
                            onChange={(e) => {
                              setCardCvv(e.target.value);
                              setValidationError(null);
                            }}
                            placeholder="***"
                            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium text-center focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NetBanking Select dropdown */}
                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Select Retail Bank:</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => {
                          setSelectedBank(e.target.value);
                          setValidationError(null);
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none"
                      >
                        <option value="">-- Choose Bank --</option>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="State Bank of India">State Bank of India</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  {/* Red Validation Alert Box */}
                  {validationError && (
                    <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-extrabold text-[11px] text-center">
                      ⚠️ {validationError}
                    </div>
                  )}

                  <button
                    onClick={handleExecutePayment}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pay Now & Activate Membership (₹)</span>
                  </button>
                </div>
              )}

              {/* NEW STEP: Branded NetBanking Login Simulator */}
              {checkoutStep === 'netbanking_login' && (
                <div className="space-y-4 text-xs text-left">
                  {/* Mock Bank Banner */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 border border-blue-500/20 text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Secure Bank Login</span>
                      <h4 className="text-sm font-black font-heading mt-0.5">{selectedBank} NetBanking</h4>
                    </div>
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">Customer ID / User ID:</label>
                      <input
                        type="text"
                        value={netbankingUserId}
                        onChange={(e) => {
                          setNetbankingUserId(e.target.value);
                          setValidationError(null);
                        }}
                        placeholder="Enter 8-digit Customer ID"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 dark:text-slate-300">IPIN (NetBanking Password):</label>
                      <input
                        type="password"
                        value={netbankingPassword}
                        onChange={(e) => {
                          setNetbankingPassword(e.target.value);
                          setValidationError(null);
                        }}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Red Validation Alert Box */}
                  {validationError && (
                    <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-extrabold text-[11px] text-center">
                      ⚠️ {validationError}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={handleExecuteNetbankingPay}
                      className="w-full py-3 rounded-2xl bg-[#005082] hover:bg-[#003d66] text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Authenticate & Pay Securely (₹)</span>
                    </button>
                    <button
                      onClick={() => setCheckoutStep('payment')}
                      className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs rounded-xl text-center"
                    >
                      Back to Payment Methods
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Processing Animation */}
              {checkoutStep === 'processing' && (
                <div className="py-8 space-y-4 text-center">
                  <RefreshCw className="w-10 h-10 text-amber-500 animate-spin mx-auto" />
                  <h4 className="text-base font-black text-slate-900 dark:text-white font-heading">
                    Processing 256-Bit Encrypted Payment...
                  </h4>
                  <span className="text-xs text-slate-500 block">Connecting to Indian Bank Gateway & Activating VIP Credentials</span>
                </div>
              )}

              {/* STEP 4: Order Success Screen */}
              {checkoutStep === 'success' && (
                <div className="space-y-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-emerald-500 animate-bounce" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white font-heading">
                      🎉 Membership Activated!
                    </h3>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mt-1">
                      {selectedPlanModal} is now Live
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs text-left space-y-1.5">
                    <div className="flex justify-between text-slate-500">
                      <span>Transaction ID:</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-mono">TXN-NV9842103</strong>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Status:</span>
                      <strong className="text-emerald-500">Paid & Verified (₹)</strong>
                    </div>
                  </div>

                  <button
                    onClick={handleCloseCheckout}
                    className="w-full py-3 rounded-2xl bg-[#005082] hover:bg-[#003d66] text-white font-black text-xs shadow-md"
                  >
                    Go to Premium Dashboard
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
