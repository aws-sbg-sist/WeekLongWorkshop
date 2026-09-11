# AWS Certified Cloud Practitioner (CLF-C02) Mock Exam Web App

> **Event:** AWS Cloud Practitioner Week Long Workshop  
> **Institution:** Sathyabama Institute of Science and Technology, Chennai  
> **Exam:** AWS Certified Cloud Practitioner — CLF-C02 Mock Examination

A complete, production-ready web application built for conducting a live, full-length AWS Certified Cloud Practitioner (CLF-C02) mock examination. Featuring 65 verified original questions, a persistent 90-minute live timer, immediate score calculation, domain proficiency analytics, a live administrative command center, public leaderboard, and turnkey Vercel / Supabase deployment.

---

## 🌟 Key Features

- **65 Original CLF-C02 Questions**: 100% aligned with the official exam blueprint across all 4 knowledge domains:
  - Domain 1: Cloud Concepts (15 questions)
  - Domain 2: Security and Compliance (20 questions)
  - Domain 3: Cloud Technology and Services (22 questions)
  - Domain 4: Billing, Pricing, and Support (8 questions)
- **Single & Multiple-Response Formats**: Supports standard single-choice and multi-response items ("Select TWO" / "Select THREE") with exact grading rules.
- **Accidental Refresh & Disconnect Resilience**: Real-time timer tracked server-side and answers auto-saved both locally and synced to the database so browser refreshes never wipe progress or reset the 90-minute countdown.
- **Answer Protection Architecture**: Correct answers and technical explanations are held strictly server-side during testing and only revealed post-submission if authorized by the coordinator.
- **Real-Time 65-Item Question Navigator**: Compact visual drawer tracking Answered, Unanswered, Marked for Review, and Current status with instant question jumping.
- **Interactive Results Scorecard**: Immediate score generation (`X / 65`, `Y%`), performance tiers (Excellent, Strong, Good, Needs Improvement), confetti celebration, and domain proficiency progress bars.
- **Organizer Admin Suite (`/admin`)**:
  - Protected with environment-driven access password (`ADMIN_PASSWORD=DeltaCharlie-27-5-1939`).
  - Live candidate activity table with polling (In Progress, Submitted, Auto-Submitted).
  - One-click state controls (Upcoming / Live / Ended).
  - Leaderboard publishing toggle and question explanation review toggle.
  - Bulk candidate roster importer (paste names).
  - One-click CSV export of official ranked results.
  - Safe pre-event reset tool for clearing trial runs.
- **Public Leaderboard (`/leaderboard`)**:
  - Hidden by default until published by the organizer.
  - Top 3 podium highlight cards (Gold, Silver, Bronze) with tie-breaker sorting (Score first, then lowest time used).

---

## 🚀 Quickstart (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Verify Question Dataset
Run the programmatic verification suite to test all 65 questions, options, answers, and explanations:
```bash
npm run validate-questions
```

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔐 Administrator Access

- **Route:** `/admin`
- **Default Password:** `DeltaCharlie-27-5-1939`
- Set in `.env.local`:
  ```env
  ADMIN_PASSWORD=DeltaCharlie-27-5-1939
  ```

---

## 🗄️ Database Architecture

The application implements a dual storage strategy:

1. **Zero-Setup Local Mode (Default)**: Automatically uses a resilient, atomic file store in `.data/exam_store.json`. No external database configuration is required to test or run locally.
2. **Production Supabase / PostgreSQL Mode**:
   - Create a free project at [supabase.com](https://supabase.com).
   - Go to the **SQL Editor** in Supabase and run the provided script in [`supabase/schema.sql`](./supabase/schema.sql).
   - Add your Supabase credentials to `.env.local` or your Vercel Environment Variables:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
     ```

---

## ☁️ Deployment to Vercel (Free Tier)

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AWS CLF-C02 Mock Exam Web App"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. Add the following Environment Variable under Project Settings:
   - `ADMIN_PASSWORD` = `DeltaCharlie-27-5-1939`
4. Click **Deploy**. Your application will be live with full responsive capability on laptop, desktop, and mobile devices.

---

## 📋 Workshop Coordinator Playbook

1. **Before the Workshop Exam**:
   - Access `/admin` and confirm the exam state is set to **`upcoming`**.
   - Use the **Bulk Import** tool to paste the roster of expected students.
   - If performing dry-run testing, use **Reset Examination** with `RESET_EXAM_CONFIRMED` to clear mock attempts before students enter.
2. **Starting the Exam**:
   - Change the state toggle to **`live`**.
   - Students enter their name on the landing page, read instructions, and begin their 90-minute timer.
3. **During the Exam**:
   - Keep the Admin Monitor open to observe active participants, answered counts, and incoming submissions in real-time.
4. **Concluding the Exam**:
   - When the window closes, set state to **`ended`** (any remaining candidates are auto-submitted when their timer reaches 00:00).
   - Click **Publish Leaderboard** to make public standings available at `/leaderboard`.
   - Click **Export CSV** to download the official student performance rankings for workshop certificates and records.
   - Optionally toggle **Answer Explanations** to allow students to review the technical rationale for all 65 questions.

---

## ⚖️ Disclaimer

*This application is an independently created practice examination designed for educational purposes during the AWS Cloud Practitioner Week Long Workshop at Sathyabama Institute of Science and Technology, Chennai. It is inspired by the AWS Certified Cloud Practitioner (CLF-C02) exam objectives and is not an official examination operated, endorsed, or certified by Amazon Web Services (AWS).*
