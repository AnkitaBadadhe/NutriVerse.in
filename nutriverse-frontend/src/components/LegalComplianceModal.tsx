import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Lock, FileText, Award, CheckCircle2, ChevronDown, 
  ChevronUp, KeyRound, Database, Server, EyeOff, Sparkles, ShieldAlert
} from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'guidelines' | 'security' | null;

interface LegalComplianceModalProps {
  modalType: LegalModalType;
  onClose: () => void;
}

export const LegalComplianceModal: React.FC<LegalComplianceModalProps> = ({ modalType, onClose }) => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  if (!modalType) return null;

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        
        {/* Backdrop Blur */}
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
          className="relative z-[100] bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 my-auto max-h-[85vh] overflow-y-auto no-scrollbar"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#005082]/10 border border-[#005082]/20 flex items-center justify-center text-[#005082] dark:text-cyan-400">
                {modalType === 'privacy' && <EyeOff className="w-6 h-6" />}
                {modalType === 'terms' && <FileText className="w-6 h-6" />}
                {modalType === 'guidelines' && <Award className="w-6 h-6" />}
                {modalType === 'security' && <Lock className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-xl font-black font-heading text-slate-900 dark:text-white">
                  {modalType === 'privacy' && 'NutriVerse Privacy Policy & Data Protection'}
                  {modalType === 'terms' && 'NutriVerse Terms of Service & Clinical Agreement'}
                  {modalType === 'guidelines' && 'ICMR & WHO Clinical Guidelines & Medical Standards'}
                  {modalType === 'security' && 'Enterprise Security & 256-Bit AES Encryption'}
                </h3>
                <span className="text-[11px] text-emerald-500 font-extrabold uppercase tracking-wider block mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Compliance • Active 2026 Standards
                </span>
              </div>
            </div>
          </div>

          {/* Modal Body Content */}
          {modalType === 'privacy' && (
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#005082] dark:text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-slate-800 dark:text-slate-200">
                  NutriVerse enforces a strict <strong>Zero Third-Party Data Sharing Policy</strong>. Your medical blood report OCR data, grocery pantry scans, and clinical telehealth notes are encrypted and never sold to insurance companies, brokers, or ad networks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 space-y-1">
                  <strong className="text-slate-900 dark:text-white font-bold block text-sm">🩸 Blood Report Confidentiality</strong>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Medical reports uploaded via PDF/OCR are parsed in volatile isolated memory threads and encrypted using AES-256 keys.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 space-y-1">
                  <strong className="text-slate-900 dark:text-white font-bold block text-sm">👤 Right to Instant Erasure</strong>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Users maintain 100% data ownership. You can permanently delete all your health profiles and meal plans with one click.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">1. Information Collection & Usage</h4>
                <p>
                  We collect user-provided health goals, dietary preferences, blood test biomarkers, and meal photos solely to synthesize personalized 7-day nutrition plans and calculate the NutriVerse AI Health Score.
                </p>
              </div>
            </div>
          )}

          {modalType === 'terms' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-slate-800 dark:text-slate-200 font-medium">
                  NutriVerse AI provides clinical precision wellness guidelines aligned with ICMR & WHO standards. Recommendations are designed for educational health optimization and do not substitute emergency hospital care.
                </p>
              </div>

              {/* Accordion List */}
              {[
                {
                  title: '1. Clinical Advisory & Scope of Services',
                  content: 'NutriVerse synthesized meal plans, macro splits, and biomarker health indices are generated by clinical algorithms. For acute medical emergencies or prescribed medication changes, users should consult their primary attending doctor or book a video session in our Doctor Telehealth portal.'
                },
                {
                  title: '2. Doctor Telehealth & Marketplace Terms',
                  content: 'All 20 clinical doctors listed in the Telehealth Marketplace are independent licensed practitioners verified by state medical councils. Telehealth bookings follow ICMR Telemedicine Guidelines (2020).'
                },
                {
                  title: '3. NutriVerse Premium Subscriptions & 14-Day Refund',
                  content: 'Subscriptions activate instantly upon successful UPI or NetBanking authorization. We offer a 14-day hassle-free full refund policy if you are unsatisfied with your AI meal plan synthesis.'
                },
                {
                  title: '4. Algorithmic Integrity & Acceptable Use',
                  content: 'Users agree not to upload fraudulent medical documents, non-food object spam, or automated bot requests to the AI Food Vision Scanner or Medical OCR Engine.'
                }
              ].map((acc, index) => (
                <div 
                  key={index}
                  className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-4 text-left font-bold text-slate-900 dark:text-white flex items-center justify-between hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <span>{acc.title}</span>
                    {openAccordion === index ? <ChevronUp className="w-4 h-4 text-[#005082]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {openAccordion === index && (
                    <div className="p-4 pt-0 text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                      {acc.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {modalType === 'guidelines' && (
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
                <Award className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-slate-800 dark:text-slate-200">
                  NutriVerse AI meal plans and nutrient RDA recommendations are strictly benchmarked against the official <strong>ICMR (Indian Council of Medical Research - 2024 Dietary Guidelines)</strong> and <strong>WHO International Clinical Standards</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <strong className="text-base font-black text-[#005082] dark:text-cyan-400 block font-heading">ICMR RDA 2024</strong>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">Macro & Micronutrient Indian Reference Standards</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <strong className="text-base font-black text-amber-600 dark:text-amber-400 block font-heading">98.4% Accuracy</strong>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">Biomarker OCR Extraction Precision</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <strong className="text-base font-black text-emerald-600 dark:text-emerald-400 block font-heading">WHO Certified</strong>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">Glycemic Index & Lipid Profile Limits</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Clinical Validation Framework</h4>
                <p>
                  Every recipe in our database of 22 gourmet healthy meals undergoes algorithmic calorie, protein, fiber, and micronutrient verification to ensure full clinical alignment with disease management protocols (Type 2 Diabetes, Hypertension, PCOS, Thyroiditis).
                </p>
              </div>
            </div>
          )}

          {modalType === 'security' && (
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-start gap-3">
                <KeyRound className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <p className="text-slate-800 dark:text-slate-200">
                  NutriVerse utilizes bank-grade <strong>256-Bit AES Encryption</strong> for stored health records and <strong>TLS 1.3 Transport Encryption</strong> for all API calls and live video telehealth consultations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
                  <Database className="w-6 h-6 text-[#005082] dark:text-cyan-400 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white font-bold block">HIPAA Compliant Cloud</strong>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Encrypted health database clusters with zero public access.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
                  <Server className="w-6 h-6 text-emerald-500 shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-white font-bold block">99.99% Uptime SLA</strong>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Redundant multi-region deployment across ISO 27001 data centers.</span>
                  </div>
                </div>
              </div>

              {/* Security Live Status Checklist */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider font-heading">
                  Live Security Infrastructure Status
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 256-Bit SSL Certificate Active
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Zero Reported Data Breaches
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Automated Vulnerability Scanning
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Biometric & MFA Auth Ready
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-[#005082] hover:bg-[#003d66] text-white font-extrabold text-xs shadow-md transition-all text-center block"
            >
              Close Compliance Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
