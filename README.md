# ⚖️ LIFE JUDGE AI

> **"Your Life. Your Decisions. Your Consequences."**

LIFE JUDGE AI is a full-stack, AI-powered personal accountability SaaS web application built on the MERN stack and powered by Google Gemini. It rigorously evaluates a user's daily activities, decisions, productivity, discipline, time management, and habits.

---

## 🌟 Key Features

1. **Cyberpunk Dark-Themed SaaS Aesthetic**:
   - Engineered with Linear/Vercel/Raycast inspired design (`#090909` background, `#171717` card base, soft red glow effects `#EF4444`, and monospace accents).
2. **5 Core Life Pillars Evaluation**:
   - **Productivity**: Output vs. friction.
   - **Discipline**: Tasks committed vs. tasks postponed.
   - **Health & Recovery**: Biological sleep windows and exercise tracking.
   - **Time Management**: Cognitive leaks and screen-time distraction penalties.
   - **Consistency**: Long-term adherence to commitments.
3. **4 Distinct Judge Personas**:
   - **Savage but Fair**: Sharp, sarcastic, zero sugar-coating, witty roasts of excuses.
   - **Strict Professor**: Academic rigor, high standards, systematic critique.
   - **Supportive Mentor**: Constructive, firm, inspiring, focuses on actionable momentum.
   - **Sarcastic Comedian**: Dark observational humor, theatrical comedic roasts.
4. **Google Gemini Structured AI Integration**:
   - Server-side structured JSON schema generation using `@google/generative-ai`.
   - Dynamic animated loading screen with rotating judicial messages.
   - Automatic deterministic fallback engine if no Gemini API key is supplied yet, allowing immediate zero-friction evaluation.
5. **Interactive Dashboard & Real-Time Analytics**:
   - Live metrics: Today's Life Score, 7-Day Average, Court Streak, and Total Evaluations.
   - Area chart tracking daily score trajectories.
   - Bar chart breakdown across the 5 life pillars.
6. **Detailed Verdict Reports**:
   - Animated SVG circular gauge counter out of 100.
   - Official Supreme Court Verdict statement.
   - Primary Systemic Error ("Biggest Mistake").
   - Authentic Accomplishment recognition.
   - 3-Point Correction Protocol.
   - Tomorrow's Non-Negotiable Challenge with acceptance checklist.
   - One-click shareable verdict generator with confetti effect.
7. **Complete Case History**:
   - Chronological archive with real-time keyword search.
   - Filtering by performance category and score thresholds.
   - Permanent record expungement (deletion) with confirmation modal.
8. **7-Day Cumulative Weekly Review**:
   - Identifies the most repeated distraction and most common postponed bottleneck.
   - Highlights best vs. worst performance days.
   - Generates next week's strategic correction plan with interactive line chart.
9. **Authentication & Security**:
   - Bcrypt password hashing (10 salt rounds).
   - JWT authentication tokens with auto-expiry handling.
   - Express rate limiting on judgement requests.
   - Centralized error handling and MongoDB ownership verification.
10. **Zero-Configuration MongoDB**:
    - Connects directly to any MongoDB Atlas or local MongoDB URI.
    - If `MONGODB_URI` is omitted, it automatically boots an in-memory MongoDB server for instant local development without any manual database setup.

---

## 🛠️ Technology Stack

- **Frontend**:
  - React 18 + Vite
  - Tailwind CSS + PostCSS
  - React Router DOM
  - Lucide React (Icons)
  - Recharts (Interactive SVG Charts)
  - Canvas Confetti
  - Axios
- **Backend**:
  - Node.js & Express.js (REST API Architecture)
  - Mongoose ODM
  - MongoDB Atlas (with in-memory development fallback)
  - JSON Web Tokens (JWT) & BcryptJS
  - Express Rate Limit & CORS
- **AI Engine**:
  - Google Gemini API (`@google/generative-ai` with structured JSON output)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- *(Optional)* Google Gemini API Key ([Get one here](https://aistudio.google.com/))
- *(Optional)* MongoDB connection string (or use the built-in automatic in-memory DB)

---

### Step 1: Install Dependencies

From the root project directory:

```bash
npm run install:all
```

Or install separately:
```bash
# Root dependencies
npm install

# Backend dependencies
cd server
npm install

# Frontend dependencies
cd ../client
npm install
```

---

### Step 2: Configure Environment Variables

Create a `.env` file in the `server` directory (or modify `server/.env`):

```bash
PORT=5000
MONGODB_URI=
JWT_SECRET=super_secret_life_judge_jwt_key_9847129841249
GEMINI_API_KEY=your_gemini_api_key_here
CLIENT_URL=http://localhost:5173
```

> **Note**:
> - If `GEMINI_API_KEY` is left blank, the platform automatically utilizes its high-fidelity deterministic judicial reasoning engine so you can test all workflows immediately.
> - If `MONGODB_URI` is left blank, it automatically launches an in-memory MongoDB instance.

---

### Step 3: Run the Application

To run both the React frontend and Node.js backend simultaneously:

```bash
npm run dev
```

Or run them in separate terminal windows:

**Terminal 1 (Backend)**:
```bash
npm run dev:server
# Server will listen on http://localhost:5000
```

**Terminal 2 (Frontend)**:
```bash
npm run dev:client
# Vite will serve the client on http://localhost:5173
```

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🧪 User Journey & Workflow Verification

1. **Landing Page (`/`)**:
   - Review features, the 5 evaluated pillars, and inspect the sample verdict.
   - Click **"Judge My Day"** or **"Get Judged"**.
2. **Registration / Login (`/register`, `/login`)**:
   - Create a new account or click **"Prefill Demo Account Credentials"** on the login screen.
3. **Dashboard (`/dashboard`)**:
   - View your Court Streak, today's life score, 7-day average, and performance trends.
4. **Daily Activity Submission (`/judge`)**:
   - Choose your Presiding Judge persona (*Savage but Fair*, *Strict Professor*, *Supportive Mentor*, or *Sarcastic Comedian*).
   - Enter your focus hours (work + study), sleep, exercise, mood, accomplishments, and distractions (or click **"Load Realistic Day Example"**).
   - Click **"SUBMIT FOR JUDGEMENT"**.
5. **Verdict & Score Report (`/judge/result/:id`)**:
   - Watch the radar loading screen rotate through judicial evidence messages.
   - View your overall life score (0–100), the judge's unvarnished verdict, category score breakdown, biggest mistake, best achievement, 3-point correction protocol, and tomorrow's challenge.
   - Click **"Share My Verdict"** to copy formatted text or share to X with celebratory confetti.
6. **Case History (`/history`)**:
   - Search through previous verdicts, filter by performance labels (*Exceptional*, *Needs Improvement*, etc.), or expunge a record.
7. **Weekly Review (`/weekly-review`)**:
   - Generate a 7-day cumulative audit identifying your most repeated distraction, primary unfinished bottleneck, best vs. worst days, and next week's correction plan.

---

## 🛡️ Security Architecture

- **Protected Routes**: Protected client-side and authenticated via JWT on all `/api/entries`, `/api/judge`, and `/api/weekly-review` endpoints.
- **Resource Ownership Verification**: Queries check `userId === req.user.id` to prevent cross-account access or modifications.
- **Zero API Key Leakage**: Gemini API keys reside exclusively in backend environment variables.
- **Rate Limiting**: Express rate limiters protect the AI judgment engine from burst spam.

---

## 📜 License

MIT License. Built for honest accountability and relentless personal growth.

