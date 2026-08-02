export type Language = 'English' | 'Hindi' | 'Tamil' | 'Telugu' | 'Bengali' | 'Marathi' | 'Gujarati';

export interface Translation {
  navHome: string;
  navPersonalized: string;
  navPlanner: string;
  navTracker: string;
  navHydration?: string;
  navLeaderboard?: string;
  navRecipes: string;
  navExpert: string;
  navScanner: string;
  navMedical: string;
  navGrocery: string;
  navCommunity: string;
  navPremium: string;

  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaPlanner: string;
  ctaRecipes: string;
  ctaExpert: string;

  title: string;
  subtitle: string;
  trustBadge: string;
  medicalBadge: string;
  
  healthRadarTitle: string;
  healthRadarSub: string;
  expertTitle: string;
  expertSub: string;

  overallHealth: string;
  nutritionScore: string;
  hydrationScore: string;
  vitaminScore: string;
  proteinScore: string;
  sleepScore: string;
  stressScore: string;
}

export const translations: Record<Language, Translation> = {
  English: {
    navHome: 'Home',
    navPersonalized: 'Personalized Nutrition',
    navPlanner: 'AI Meal Plan',
    navTracker: 'Health Score',
    navHydration: 'AI Hydration & Fasting',
    navLeaderboard: 'Family Leaderboard',
    navRecipes: 'Healthy Recipes',
    navExpert: 'Doctor Telehealth',
    navScanner: 'AI Meal & Calorie Studio',
    navMedical: 'Medical Reports',
    navGrocery: 'Pantry Scanner',
    navCommunity: 'Expert Community',
    navPremium: 'NutriVerse Premium',

    heroTag: 'ICMR & WHO Clinical Standards',
    heroTitle: "Simplify Your Family's Clinical Nutrition & AI Wellness",
    heroSubtitle: 'Analyze blood report biomarkers, scan grocery pantries, synthesize personalized 7-day meal plans, and chat live 1-on-1 with 20 verified clinical doctors.',
    ctaPlanner: 'Generate AI Meal Plan',
    ctaRecipes: 'Explore 22 Gourmet Recipes',
    ctaExpert: 'Consult 20 Doctors',

    title: 'NutriVerse - Simplified Clinical AI Nutrition',
    subtitle: 'India\'s #1 AI Platform for Family Nutrition & Health Diagnostics',
    trustBadge: 'NutriVerse Ecosystem',
    medicalBadge: '100% ICMR & WHO Clinical AI Certified',

    healthRadarTitle: 'NutriVerse AI Health Score Radar',
    healthRadarSub: 'Multi-Biomarker Clinical Diagnostics & Real-time Physiological Health Index',
    expertTitle: 'NutriVerse Telehealth & Expert Marketplace',
    expertSub: 'Book Instant Video Consultations with Top Pediatricians & Dietitians',

    overallHealth: 'Overall Health Index',
    nutritionScore: 'Macronutrient Balance',
    hydrationScore: 'Hydration & Electrolytes',
    vitaminScore: 'Micronutrient & Vitamin D3',
    proteinScore: 'Muscle Protein Synthesis',
    sleepScore: 'Circadian Sleep Quality',
    stressScore: 'Cortisol & Stress Resilience'
  },
  Hindi: {
    navHome: 'होम',
    navPersonalized: 'व्यक्तिगत पोषण',
    navPlanner: 'एआई भोजन योजना',
    navTracker: 'स्वास्थ्य स्कोर',
    navRecipes: 'स्वास्थ्य व्यंजन',
    navExpert: 'डॉक्टर सलाह',
    navScanner: 'फूड विजन स्कैनर',
    navMedical: 'मेडिकल रिपोर्ट',
    navGrocery: 'पैंट्री स्कैनर',
    navCommunity: 'विशेषज्ञ समुदाय',
    navPremium: 'न्यूट्रिवर्स प्रीमियम',

    heroTag: 'आईसीएमआर और डब्ल्यूएचओ क्लिनिकल मानक',
    heroTitle: 'अपने परिवार के पोषण और स्वास्थ्य को सरल बनाएं',
    heroSubtitle: 'ब्लड रिपोर्ट बायोमार्कर का विश्लेषण करें और डॉक्टरों से परामर्श लें।',
    ctaPlanner: 'भोजन योजना बनाएं',
    ctaRecipes: '22 स्वादिष्ट व्यंजन देखें',
    ctaExpert: 'डॉक्टरों से सलाह लें',

    title: 'न्यूट्रिवर्स - सरकृत क्लिनिकल एआई पोषण',
    subtitle: 'पारिवारिक पोषण के लिए भारत का नंबर 1 एआई प्लेटफॉर्म',
    trustBadge: 'न्यूट्रिवर्स इकोसिस्टम',
    medicalBadge: '100% आईसीएमआर प्रमाणित',

    healthRadarTitle: 'न्यूट्रिवर्स एआई स्वास्थ्य स्कोर रडार',
    healthRadarSub: 'मल्टी-बायोमार्कर क्लिनिकल डायग्नोस्टिक्स',
    expertTitle: 'न्यूट्रिवर्स टेलीहेल्थ और विशेषज्ञ बाजार',
    expertSub: 'शीर्ष डॉक्टरों के साथ परामर्श बुक करें',

    overallHealth: 'समग्र स्वास्थ्य सूचकांक',
    nutritionScore: 'मैक्रोन्यूट्रिएंट संतुलन',
    hydrationScore: 'हाइड्रेशन स्कोर',
    vitaminScore: 'विटामिन डी3 स्तर',
    proteinScore: 'प्रोटीन संश्लेषण',
    sleepScore: 'नींद की गुणवत्ता',
    stressScore: 'तनाव लचीलापन'
  },
  Tamil: {
    navHome: 'முகப்பு',
    navPersonalized: 'தனிப்பயனாக்கப்பட்ட ஊட்டச்சத்து',
    navPlanner: 'உணவுத் திட்டம்',
    navTracker: 'சுகாதார மதிப்பெண்',
    navRecipes: 'ஆரோக்கியமான சமையல்',
    navExpert: 'மருத்துவர் ஆலோசனை',
    navScanner: 'உணவு ஸ்கேனர்',
    navMedical: 'மருத்துவ அறிக்கைகள்',
    navGrocery: 'சரக்கறை ஸ்கேனர்',
    navCommunity: 'சமூகம்',
    navPremium: 'நியூட்ரிவெர்ஸ் பிரீமியம்',

    heroTag: 'ICMR மருத்துவ தரநிலைகள்',
    heroTitle: 'உங்கள் குடும்பத்தின் ஊட்டச்சத்தை எளிதாக்குங்கள்',
    heroSubtitle: 'இரத்தப் பரிசோதனை அறிக்கைகளை பகுப்பாய்வு செய்து மருத்துவர்களுடன் பேசுங்கள்.',
    ctaPlanner: 'உணவுத் திட்டத்தை உருவாக்குங்கள்',
    ctaRecipes: '22 சமையல் குறிப்புகளைப் பாருங்கள்',
    ctaExpert: 'மருத்துவர்களை அணுகவும்',

    title: 'நியூட்ரிவெர்ஸ் - ஊட்டச்சத்து இயங்குதளம்',
    subtitle: 'இந்தியாவின் #1 ஏஐ ஊட்டச்சத்து இயங்குதளம்',
    trustBadge: 'நியூட்ரிவெர்ஸ் அமைப்பு',
    medicalBadge: '100% சான்றளிக்கப்பட்டது',

    healthRadarTitle: 'நியூட்ரிவெர்ஸ் AI சுகாதார மதிப்பெண்',
    healthRadarSub: 'நிகழ்நேர சுகாதார குறியீடு',
    expertTitle: 'நியூட்ரிவெர்ஸ் மருத்துவ ஆலோசனை',
    expertSub: 'சிறந்த மருத்துவர்களுடன் பேசுங்கள்',

    overallHealth: 'ஒட்டுமொத்த சுகாதார குறியீடு',
    nutritionScore: 'ஊட்டச்சத்து சமநிலை',
    hydrationScore: 'நீரேற்றம் மதிப்பெண்',
    vitaminScore: 'வைட்டமின் அளவு',
    proteinScore: 'புரத சேர்க்கை',
    sleepScore: 'தூக்கத்தின் தரம்',
    stressScore: 'மன அழுத்த சகிப்புத்தன்மை'
  },
  Telugu: {
    navHome: 'హోమ్',
    navPersonalized: 'వ్యక్తిగతీకరించిన పోషణ',
    navPlanner: 'భోజన ప్రణాళిక',
    navTracker: 'ఆరోగ్య స్కోర్',
    navRecipes: 'ఆరోగ్యకరమైన వంటకాలు',
    navExpert: 'వైద్యుల సలహా',
    navScanner: 'ఫుడ్ స్కేనర్',
    navMedical: 'మెడికల్ రిపోర్టులు',
    navGrocery: 'ప్యాంట్రీ స్కేనర్',
    navCommunity: 'కమ్యూనిటీ',
    navPremium: 'న్యూట్రివర్స్ ప్రీమియం',

    heroTag: 'ICMR క్లినికల్ ప్రమాణాలు',
    heroTitle: 'మీ కుటుంబ పోషణ మరియు ఆరోగ్యాన్ని సులభతరం చేయండి',
    heroSubtitle: 'రక్త నివేదిక బయోమార్కర్లను విశ్లేషించండి మరియు వైద్యులను సంప్రదించండి.',
    ctaPlanner: 'భోజన ప్రణాళికను రూపొందించండి',
    ctaRecipes: '22 వంటకాలను చూడండి',
    ctaExpert: 'వైద్యులను సంప్రదించండి',

    title: 'న్యూట్రివర్స్ - సరళీకృత క్లినికల్ AI పోషణ',
    subtitle: 'కుటుంబ పోషణ కోసం భారతదేశపు #1 AI ప్లాట్‌ఫారమ్',
    trustBadge: 'న్యూట్రివర్స్ వ్యవస్థ',
    medicalBadge: '100% ప్రామాణీకరించబడింది',

    healthRadarTitle: 'న్యూట్రివర్స్ AI ఆరోగ్య స్కోర్ రాడార్',
    healthRadarSub: 'రియల్ టైమ్ ఆరోగ్య సూచిక',
    expertTitle: 'న్యూట్రివర్స్ టెలిహెల్త్ మరియు నిపుణుల వేదిక',
    expertSub: 'అగ్ర వైద్యులతో మాట్లాడండి',

    overallHealth: 'మొత్తం ఆరోగ్య సూచిక',
    nutritionScore: 'పోషకాహార సమతుల్యత',
    hydrationScore: 'హైడ్రేషన్ స్కోర్',
    vitaminScore: 'విటమిన్ స్థాయిలు',
    proteinScore: 'ప్రోటీన్ సంశ్లేషణ',
    sleepScore: 'నిద్ర నాణ్యత',
    stressScore: 'మానసిక ఒత్తిడి స్థిరత్వం'
  },
  Bengali: {
    navHome: 'হোম',
    navPersonalized: 'ব্যক্তিগত পুষ্টি',
    navPlanner: 'খাবার পরিকল্পনা',
    navTracker: 'স্বাস্থ্য স্কোর',
    navRecipes: 'স্বাস্থ্যকর রেসিপি',
    navExpert: 'ডাক্তারের পরামর্শ',
    navScanner: 'ফুড স্ক্যানার',
    navMedical: 'মেডিকেল রিপোর্ট',
    navGrocery: 'প্যান্ট্রি স্ক্যানার',
    navCommunity: 'কম্যুনিটি',
    navPremium: 'নিউট্রিভার্স প্রিমিয়াম',

    heroTag: 'ICMR ক্লিনিকাল মানদণ্ড',
    heroTitle: 'আপনার পরিবারের পুষ্টি সহজ করুন',
    heroSubtitle: 'রক্তের বায়োমার্কার বিশ্লেষণ করুন এবং ডাক্তারদের সাথে কথা বলুন।',
    ctaPlanner: 'খাবার পরিকল্পনা তৈরি করুন',
    ctaRecipes: '২২টি রেসিপি দেখুন',
    ctaExpert: 'ডাক্তারের পরামর্শ নিন',

    title: 'নিউট্রিভার্স - ক্লিনিকাল এআই পুষ্টি',
    subtitle: 'ভারতের #১ এআই পুষ্টি প্ল্যাটফর্ম',
    trustBadge: 'নিউট্রিভার্স ইকোসিস্টেম',
    medicalBadge: '১০০% প্রমাণিত',

    healthRadarTitle: 'নিউট্রিভার্স এআই স্বাস্থ্য স্কোর রাডার',
    healthRadarSub: 'রিয়েল-টাইম স্বাস্থ্য সূচক',
    expertTitle: 'নিউট্রিভার্স টেলিহেলথ ও বিশেষজ্ঞ পরামর্শ',
    expertSub: 'সেরা ডাক্তারদের সাথে কথা বলুন',

    overallHealth: 'সামগ্রিক স্বাস্থ্য সূচক',
    nutritionScore: 'পুষ্টির ভারসাম্য',
    hydrationScore: 'হাইড্রেশন স্কোর',
    vitaminScore: 'ভিটামিন মাত্রা',
    proteinScore: 'প্রোটিন সংশ্লেষণ',
    sleepScore: 'ঘুমের গুণমান',
    stressScore: 'মানসিক চাপ স্থিতিস্থাপকতা'
  },
  Marathi: {
    navHome: 'मुख्यपृष्ठ',
    navPersonalized: 'वैयक्तिक पोषण',
    navPlanner: 'आहार योजना',
    navTracker: 'आरोग्य स्कोर',
    navRecipes: 'आरोग्यदायी पाककृती',
    navExpert: 'डॉक्टर सल्ला',
    navScanner: 'फूड स्कॅनर',
    navMedical: 'मेडिकल रिपोर्ट',
    navGrocery: 'पॅन्ट्री स्कॅनर',
    navCommunity: 'समुदाय',
    navPremium: 'न्यूट्रिव्हर्स प्रीमियम',

    heroTag: 'ICMR क्लिनिकल मानके',
    heroTitle: 'आपल्या कुटुंबाचे पोषण सोपे करा',
    heroSubtitle: 'रक्त अहवाल बायोमार्कर्सचे विश्लेषण करा आणि डॉक्टरांचा सल्ला घ्या.',
    ctaPlanner: 'आहार योजना तयार करा',
    ctaRecipes: '२२ पाककृती पहा',
    ctaExpert: 'डॉक्टरांचा सल्ला घ्या',

    title: 'न्यूट्रिव्हर्स - सोपे क्लिनिकल एआय पोषण',
    subtitle: 'भारतातील #१ एआय पोषण प्लॅटफॉर्म',
    trustBadge: 'न्यूट्रिव्हर्स इकोसिस्टम',
    medicalBadge: '१००% प्रमाणित',

    healthRadarTitle: 'न्यूट्रिव्हर्स एआय आरोग्य स्कोर राडार',
    healthRadarSub: 'रिअल-टाइम आरोग्य निर्देशांक',
    expertTitle: 'न्यूट्रिव्हर्स टेलिहेल्थ',
    expertSub: 'तज्ज्ञ डॉक्टरांशी संपर्क साधा',

    overallHealth: 'एकूण आरोग्य निर्देशांक',
    nutritionScore: 'पोषण संतुलन',
    hydrationScore: 'हायड्रेशन स्कोर',
    vitaminScore: 'व्हिटॅमिन पातळी',
    proteinScore: 'प्रोटिन संश्लेषण',
    sleepScore: 'झोपेची गुणवत्ता',
    stressScore: 'ताणतणाव सहनशीलता'
  },
  Gujarati: {
    navHome: 'હોમ',
    navPersonalized: 'વ્યક્તિગત પોષણ',
    navPlanner: 'આહાર યોજના',
    navTracker: 'હેલ્થ સ્કોર',
    navRecipes: 'આરોગ્યપ્રદ વાનગીઓ',
    navExpert: 'ડૉક્ટર સલાહ',
    navScanner: 'ફૂડ સ્કેનર',
    navMedical: 'મેડિકલ રિપોર્ટ',
    navGrocery: 'પેન્ટ્રી સ્કેનર',
    navCommunity: 'કમ્યુનિટી',
    navPremium: 'ન્યુટ્રિવર્સ પ્રીમિયમ',

    heroTag: 'ICMR ક્લિનિકલ ધોરણો',
    heroTitle: 'તમારા પરિવારના પોષણને સરળ બનાવો',
    heroSubtitle: 'બ્લડ રિપોર્ટ બાયોમાર્કર્સનું વિશ્લેષણ કરો અને ડૉક્ટર્સ સાથે વાત કરો.',
    ctaPlanner: 'આહાર યોજના બનાવો',
    ctaRecipes: '૨૨ વાનગીઓ જુઓ',
    ctaExpert: 'ડૉક્ટર્સની સલાહ લો',

    title: 'ન્યુટ્રિવર્સ - સરળ ક્લિનિકલ AI પોષણ',
    subtitle: 'ભારતનું #૧ AI પોષણ પ્લેટફોર્મ',
    trustBadge: 'ન્યુટ્રિવર્સ સિસ્ટમ',
    medicalBadge: '૧૦૦% પ્રમાણિત',

    healthRadarTitle: 'ન્યુટ્રિવર્સ AI હેલ્થ સ્કોર રડાર',
    healthRadarSub: 'રિયલ-ટાઇમ હેલ્થ ઇન્ડેક્સ',
    expertTitle: 'ન્યુટ્રિવર્સ ટેલિહેલ્થ',
    expertSub: 'નિષ્ણાત ડૉક્ટર્સ સાથે સંપર્ક કરો',

    overallHealth: 'સમગ્ર હેલ્થ ઇન્ડેક્સ',
    nutritionScore: 'પોષણ સંતુલન',
    hydrationScore: 'હાઇડ્રેશન સ્કોર',
    vitaminScore: 'વિટામિન સ્તર',
    proteinScore: 'પ્રોટીન સંશ્લેષણ',
    sleepScore: 'ઊંઘની ગુણવત્તા',
    stressScore: 'તણાવ સ્થિરતા'
  }
};
