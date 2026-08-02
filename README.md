# NutriVerse.in — AI Precision Clinical Nutrition & Telehealth Ecosystem

![NutriVerse Banner](https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80)

[![React 19](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite%205-cyan?style=for-the-badge&logo=react)](https://react.dev)
[![Spring Boot 3](https://img.shields.io/badge/Backend-Spring%20Boot%203.2%20%7C%20Java%2021-green?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%2016%20%7C%20Redis-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org)
[![ICMR Compliant](https://img.shields.io/badge/Medical-ICMR%20%26%20WHO%20Compliant-orange?style=for-the-badge)](https://icmr.gov.in)

---

## 🌟 Overview

**NutriVerse.in** is India's premier AI precision clinical nutrition and telehealth platform. Built with a modern **React 19** frontend and a **Spring Boot 3 (Java 21)** backend, NutriVerse integrates blood report biomarker OCR extraction, 7-day personalized ICMR Indian thali meal synthesis, refrigerator vision scanning, circadian intermittent fasting tracking, family habit leaderboards, and 24/7 clinical doctor consultations.

---

## ✨ Key Features & Architecture

### 1. 🩸 AI Blood Report Biomarker OCR Diagnostic Suite
- OCR extraction of 18+ lab biomarkers (HbA1c, Fasting Glucose, Lipid Profile, Vitamin D3, TSH, B12).
- Automatic ICMR risk flags and biomarker-to-recipe recommendation engine.

### 2. 🥗 ICMR 7-Day Precision Meal Planner
- Synthesizes weekly Indian thalis, Moong Dal Chilla, Paneer/Tofu bowls tuned to target calories, protein, carbs, and fats.
- Custom dietary preference toggles (Vegetarian, Vegan, High-Protein, Keto, Diabetic-Friendly).

### 3. 🛒 Refrigerator & Pantry Vision Scanner
- AI vision ingredient scanner detecting pantry staples and recommending zero-waste recipes.

### 4. 💧 AI Hydration & Circadian Intermittent Fasting Clock
- Fluid intake logger (3.0L goal) with circular progress ring.
- Circadian fasting clock (16:8, 14:10, 18:6, 12:12) displaying real-time metabolic stages & ICMR electrolyte guidance.

### 5. 🏆 Family Health Leaderboard & Daily Streaks
- Family member habit roster (**Engineer Ankita Badadhe**, **Sandeep Sahani**, **Trupti Badadhe**, **Alka Badadhe**).
- Daily quest checklists, streak counters (14 Days 🔥), and unlockable milestone reward passes.

### 6. 🩺 20 Verified Telehealth Doctors
- Live 1-on-1 consultations with verified endocrinologists, clinical dietitians, and pediatric nutritionists.
- Instant digital prescription and appointment booking engine.

---

## 📁 Repository Structure

```
NutriVerse.in/
├── nutriverse-frontend/         # React 19 + Vite 5 + Tailwind CSS + Lucide Icons
│   ├── src/
│   │   ├── components/         # Hero, Paywall, Telehealth, Leaderboard, Fasting
│   │   ├── services/           # NutriVerseApiClient REST service
│   │   └── App.tsx             # Root Application & Navigation Router
│   └── package.json
│
└── nutriverse-backend/          # Spring Boot 3 + Java 21 + Spring Data JPA
    ├── src/main/java/com/nutriverse/
    │   ├── web/                # REST Controllers (Subscription, Hydration, Leaderboard)
    │   ├── domain/             # Entities & Repositories (UserProfile, Practitioner)
    │   └── security/           # JWT 256-Bit Authentication Filter
    └── pom.xml
```

---

## 🛠️ Local Development Setup

### 1. Frontend Setup:
```bash
cd nutriverse-frontend
npm install
npm run dev
```
App runs at `http://localhost:3000`

### 2. Backend Setup:
```bash
cd nutriverse-backend
mvnw spring-boot:run
```
REST API runs at `http://localhost:8080/api/v1`

---

## 🔒 Security & Medical Standards
- **256-Bit HMAC-SHA256 JWT Encryption**
- **NABL Accredited Partner Lab Integrations**
- **ICMR & WHO Clinical Guidelines Compliant**

---

© 2026 **NutriVerse.in** — AI Precision Clinical Nutrition Ecosystem. All Rights Reserved.
