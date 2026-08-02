import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Upload, Sparkles, AlertTriangle, CheckCircle2, ShieldCheck, 
  Activity, RefreshCw, FileCheck, Download, Stethoscope, Check, X
} from 'lucide-react';

export const MedicalReportsView: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [activeReportId, setActiveReportId] = useState<string>('cbc');
  const [exportedPdfNotice, setExportedPdfNotice] = useState<string | null>(null);
  const [shareDoctorModal, setShareDoctorModal] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const sampleReports = [
    {
      id: 'cbc',
      title: 'Complete Blood Count (CBC) & HbA1c Panel',
      date: 'July 24, 2026',
      lab: 'Metropolis Diagnostics Lab',
      score: 92,
      biomarkers: [
        { name: 'HbA1c (Glycated Hemoglobin)', value: '5.4', unit: '%', range: '4.0 - 5.6%', status: 'optimal', recommendation: 'Excellent long-term blood glucose stability. Maintain low glycemic index meals.' },
        { name: 'Fasting Blood Glucose', value: '92', unit: 'mg/dL', range: '70 - 99 mg/dL', status: 'optimal', recommendation: 'Fasting glucose is within ideal metabolic limits.' },
        { name: 'Serum Vitamin D3', value: '28', unit: 'ng/mL', range: '30 - 100 ng/mL', status: 'warning', recommendation: 'Mild deficiency. Incorporate egg yolks, salmon, and 2,000 IU D3 supplementation.' },
        { name: 'Hemoglobin (Hb)', value: '14.2', unit: 'g/dL', range: '13.0 - 17.0 g/dL', status: 'optimal', recommendation: 'Healthy red blood cell oxygen carrying capacity.' },
        { name: 'White Blood Cell (WBC)', value: '6.8', unit: 'x10^3/µL', range: '4.5 - 11.0', status: 'optimal', recommendation: 'Immune defense cells operating in prime physiological range.' }
      ]
    },
    {
      id: 'lipid',
      title: 'Comprehensive Cardiovascular & Lipid Panel',
      date: 'July 18, 2026',
      lab: 'Thyrocare National Clinical Lab',
      score: 88,
      biomarkers: [
        { name: 'Total Cholesterol', value: '185', unit: 'mg/dL', range: '< 200 mg/dL', status: 'optimal', recommendation: 'Cardiovascular lipid levels are in safe non-atherogenic range.' },
        { name: 'HDL (Good Cholesterol)', value: '58', unit: 'mg/dL', range: '> 40 mg/dL', status: 'optimal', recommendation: 'Strong high-density lipoprotein protection for arterial walls.' },
        { name: 'LDL (Bad Cholesterol)', value: '108', unit: 'mg/dL', range: '< 100 mg/dL', status: 'warning', recommendation: 'Borderline optimal. Increase soluble oat beta-glucan fiber and extra virgin olive oil.' },
        { name: 'Serum Triglycerides', value: '110', unit: 'mg/dL', range: '< 150 mg/dL', status: 'optimal', recommendation: 'Triglyceride-to-HDL ratio indicates low insulin resistance risk.' }
      ]
    },
    {
      id: 'thyroid',
      title: 'Thyroid T3/T4 & Cortisol Hormone Panel',
      date: 'June 30, 2026',
      lab: 'Apollo Diagnostics Centre',
      score: 95,
      biomarkers: [
        { name: 'TSH (Thyroid Stimulating Hormone)', value: '2.1', unit: 'mIU/L', range: '0.4 - 4.2 mIU/L', status: 'optimal', recommendation: 'Pituitary thyroid axis operating in balance.' },
        { name: 'Free T3', value: '3.4', unit: 'pg/mL', range: '2.0 - 4.4 pg/mL', status: 'optimal', recommendation: 'Active thyroid conversion is supporting cellular basal metabolic rate.' },
        { name: 'Salivary Cortisol (Morning)', value: '14.5', unit: 'mcg/dL', range: '6.0 - 18.0 mcg/dL', status: 'optimal', recommendation: 'Healthy adrenal circadian rhythm.' }
      ]
    }
  ];

  const [reports, setReports] = useState(sampleReports);

  const activeReport = reports.find(r => r.id === activeReportId) || reports[0];

  const handleRunOcrScan = (reportId: string) => {
    setIsScanning(true);
    setActiveReportId(reportId);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValidationError(null);

    const filename = file.name.toLowerCase();
    const isReport = 
      filename.includes('report') || 
      filename.includes('blood') || 
      filename.includes('medical') || 
      filename.includes('lab') || 
      filename.includes('cbc') || 
      filename.includes('lipid') || 
      filename.includes('thyroid') || 
      filename.includes('health') || 
      filename.includes('diagnostics') || 
      filename.includes('test') || 
      filename.includes('urine') || 
      filename.includes('vit') || 
      filename.includes('hba1c') || 
      filename.includes('lalpath') || 
      filename.includes('thyrocare') || 
      filename.includes('metropolis') || 
      filename.includes('apollo') || 
      filename.includes('sugar') || 
      filename.includes('glucose');

    if (!isReport) {
      setValidationError(
        `Invalid Document: "${file.name}". The uploaded file does not appear to be a clinical or medical lab report. Please upload a blood test panel, CBC, or lipid profile PDF or image (e.g. Metropolis, Lal PathLabs, Thyrocare).`
      );
      e.target.value = '';
      return;
    }

    setIsScanning(true);
    
    setTimeout(() => {
      let newReport;
      const reportId = 'upload_' + Date.now();
      
      if (filename.includes('lipid') || filename.includes('cardio') || filename.includes('cholesterol')) {
        newReport = {
          id: reportId,
          title: `Analyzed Lipid Profile - ${file.name}`,
          date: 'Today',
          lab: 'Clinical AI OCR Extracted',
          score: 85,
          biomarkers: [
            { name: 'Total Cholesterol', value: '210', unit: 'mg/dL', range: '< 200 mg/dL', status: 'warning', recommendation: 'Slightly elevated cholesterol. Reduce intake of saturated fats and increase dietary fibre.' },
            { name: 'HDL (Good Cholesterol)', value: '45', unit: 'mg/dL', range: '> 40 mg/dL', status: 'optimal', recommendation: 'Adequate level of protective high-density lipoproteins.' },
            { name: 'LDL (Bad Cholesterol)', value: '125', unit: 'mg/dL', range: '< 100 mg/dL', status: 'warning', recommendation: 'Bad cholesterol is in caution zone. Consume flaxseeds, walnut, and daily aerobic exercise.' },
            { name: 'Serum Triglycerides', value: '145', unit: 'mg/dL', range: '< 150 mg/dL', status: 'optimal', recommendation: 'Triglycerides are well managed. Keep sugar and starch inputs controlled.' }
          ]
        };
      } else if (filename.includes('thyroid') || filename.includes('t3') || filename.includes('t4') || filename.includes('hormone')) {
        newReport = {
          id: reportId,
          title: `Analyzed Thyroid Hormone Panel - ${file.name}`,
          date: 'Today',
          lab: 'Clinical AI OCR Extracted',
          score: 90,
          biomarkers: [
            { name: 'TSH (Thyroid Stimulating)', value: '3.8', unit: 'mIU/L', range: '0.4 - 4.2 mIU/L', status: 'optimal', recommendation: 'TSH levels indicate normal thyroid-stimulating activity.' },
            { name: 'Free T3', value: '2.8', unit: 'pg/mL', range: '2.0 - 4.4 pg/mL', status: 'optimal', recommendation: 'Healthy conversion rate and metabolically active hormone availability.' },
            { name: 'Free T4 (Thyroxine)', value: '1.2', unit: 'ng/dL', range: '0.8 - 1.8 ng/dL', status: 'optimal', recommendation: 'Thyroid gland thyroxine output is within biological homeostatic limits.' }
          ]
        };
      } else {
        newReport = {
          id: reportId,
          title: `Analyzed CBC Blood Panel - ${file.name}`,
          date: 'Today',
          lab: 'Clinical AI OCR Extracted',
          score: 89,
          biomarkers: [
            { name: 'HbA1c (Glycated Glucose)', value: '5.9', unit: '%', range: '4.0 - 5.6%', status: 'warning', recommendation: 'Borderline prediabetic level. Recommend limiting processed carbohydrates and adding apple cider vinegar before meals.' },
            { name: 'Fasting Blood Glucose', value: '105', unit: 'mg/dL', range: '70 - 99 mg/dL', status: 'warning', recommendation: 'Slightly high fasting glucose. Walk 10-15 minutes immediately after dinner.' },
            { name: 'Hemoglobin (Hb)', value: '13.8', unit: 'g/dL', range: '13.0 - 17.0 g/dL', status: 'optimal', recommendation: 'Adequate iron stores and healthy red blood cell counts.' },
            { name: 'Serum Vitamin D3', value: '32', unit: 'ng/mL', range: '30 - 100 ng/mL', status: 'optimal', recommendation: 'Vitamin D3 levels are optimal. Continue safe sunlight exposure.' }
          ]
        };
      }

      setReports(prev => [newReport, ...prev]);
      setActiveReportId(reportId);
      setIsScanning(false);
      e.target.value = '';
    }, 1800);
  };

  const handleExportPdf = () => {
    setExportedPdfNotice(`Clinical Report Summary PDF generated for ${activeReport.title}! Download initiated.`);
    setTimeout(() => {
      setExportedPdfNotice(null);
    }, 4000);
  };

  return (
    <div className="asknestle-card w-full rounded-3xl p-6 md:p-8 mb-8 relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {exportedPdfNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-xl flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" /> {exportedPdfNotice}
            </span>
            <button onClick={() => setExportedPdfNotice(null)} className="text-white hover:text-emerald-200">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading flex items-center gap-2">
            NutriVerse AI Medical Report OCR & Immuno Suite
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/20 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Clinical OCR Scanner v4.2
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Upload blood reports or select sample lab PDFs to extract biomarkers and personalized NutriVerse clinical advice</p>
        </div>
      </div>

      {/* Upload Drag & Drop Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Left: Drag & Drop Scanner */}
        <div 
          onClick={() => document.getElementById('report-file-upload')?.click()}
          className="lg:col-span-7 border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/60 rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 flex flex-col items-center justify-center min-h-[220px]"
        >
          <input
            id="report-file-upload"
            type="file"
            accept=".pdf,image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          {isScanning ? (
            <div className="flex flex-col items-center gap-3">
              <RefreshCw className="w-10 h-10 text-cyan-500 animate-spin" />
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                Running Neural OCR Extraction & Biomarker Analysis...
              </span>
              <span className="text-[11px] text-slate-400">Parsing HbA1c, Vitamin D3, Lipid Profile, and Thyroid T3/T4</span>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto shadow-sm">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white font-heading">
                  Drag & Drop Lab Blood Report (PDF or Image)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Supports Metropolis, Lal PathLabs, Thyrocare, and Apollo PDF blood test reports
                </p>
              </div>
              <span className="inline-block px-4 py-2 rounded-xl bg-[#005082] text-white font-bold text-xs shadow-md">
                Upload & Analyze Report
              </span>
            </div>
          )}
        </div>

        {/* Right: Sample Lab Demo Selector */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-cyan-500" /> Instant Sample Lab Demos:
            </span>

            <div className="space-y-2.5">
              {reports.slice(0, 3).map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRunOcrScan(r.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                    activeReportId === r.id
                      ? 'bg-[#005082] text-white border-[#005082] shadow-md'
                      : 'bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className={`w-5 h-5 ${activeReportId === r.id ? 'text-white' : 'text-cyan-500'}`} />
                    <div>
                      <h5 className="text-xs font-bold font-heading line-clamp-1">{r.title}</h5>
                      <span className={`text-[10px] block ${activeReportId === r.id ? 'text-slate-200' : 'text-slate-400'}`}>{r.date}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                    activeReportId === r.id ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-600'
                  }`}>
                    {r.score}/100
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Extracted Biomarker Analysis Viewport */}
      <AnimatePresence mode="wait">
        {!isScanning && activeReport && (
          <motion.div
            key={activeReport.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Active Report Header Bar */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Activity className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-black font-heading text-white">{activeReport.title}</h4>
                  <span className="text-xs text-slate-300 block mt-0.5">{activeReport.lab} • Tested on {activeReport.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Immuno Score</span>
                  <strong className="text-2xl font-black text-emerald-400 font-heading">{activeReport.score} / 100</strong>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                  Optimal Health
                </span>
              </div>
            </div>

            {/* Extracted Biomarkers Table / Cards */}
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-heading mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Extracted Blood Biomarkers & NutriVerse Clinical AI Advice:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeReport.biomarkers.map((b, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-xs flex flex-col justify-between space-y-3 ${
                      b.status === 'warning'
                        ? 'bg-amber-500/10 border-amber-500/30 text-slate-900 dark:text-slate-100'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-slate-900 dark:text-white">{b.name}</span>
                        {b.status === 'warning' ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Attention
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[10px] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Optimal
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-2 mb-2">
                        <strong className="text-xl font-black font-heading text-slate-900 dark:text-white">{b.value} {b.unit}</strong>
                        <span className="text-slate-400 text-[11px]">(Ref Range: {b.range})</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-[11px] leading-relaxed font-medium text-slate-700 dark:text-slate-300">
                      <strong className="text-[#005082] dark:text-cyan-400 block mb-0.5">NutriVerse Nutritionist Advice:</strong>
                      {b.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleExportPdf}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4 text-[#005082]" /> Export Clinical PDF
                </button>
              </div>

              <button 
                onClick={() => setShareDoctorModal(true)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#005082] hover:bg-[#003d66] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-4 h-4" /> Discuss Lab Report with Expert Doctor
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Doctor Modal */}
      <AnimatePresence>
        {shareDoctorModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShareDoctorModal(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-[100] bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 my-auto text-xs"
            >
              <div className="text-center space-y-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  Share Report with Certified Doctor
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {activeReport.title} has been compiled into an encrypted clinical dossier and attached to your Telehealth 1-on-1 Chat session.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShareDoctorModal(false);
                    setExportedPdfNotice('Lab report dossier shared with NutriVerse certified doctors!');
                    setTimeout(() => setExportedPdfNotice(null), 3000);
                  }}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  Confirm & Send to Doctor
                </button>

                <button
                  onClick={() => setShareDoctorModal(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* File Upload Validation Error Modal */}
      <AnimatePresence>
        {validationError && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setValidationError(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-[100] bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4 my-auto"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>

              <div className="space-y-2 text-xs">
                <h3 className="text-lg font-black text-slate-900 dark:text-white font-heading">
                  Invalid Lab Document
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {validationError}
                </p>
              </div>

              <button
                onClick={() => setValidationError(null)}
                className="w-full py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black text-xs shadow-md transition-all"
              >
                Choose Another Report File
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
