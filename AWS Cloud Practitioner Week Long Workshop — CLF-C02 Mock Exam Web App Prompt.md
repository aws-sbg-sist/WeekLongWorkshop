# Build a Production-Quality AWS Cloud Practitioner CLF-C02 Mock Exam Web App

Create a complete, polished, responsive web application for conducting a **full-length AWS Certified Cloud Practitioner (CLF-C02) mock examination** as part of a college event.

## Event

**Event Name:** AWS Cloud Practitioner Week Long Workshop  
**Institution:** Sathyabama Institute of Science and Technology, Chennai  
**Exam:** AWS Certified Cloud Practitioner — CLF-C02 Mock Examination

The website will be publicly hosted on **Vercel's free plan** and used during a college event where many students take the mock exam simultaneously from their own laptops.

The website must feel like a **serious professional certification testing platform**, while also having a modern, visually impressive UI that makes participants immediately think:

> "Wow, this looks extremely polished."

The design should be premium, clean, modern, intuitive, fast, responsive and distraction-free.

---

# IMPORTANT CONTENT REQUIREMENT

Do NOT reproduce, copy, scrape, or claim to contain the actual proprietary AWS certification exam questions.

Instead, create **65 completely original questions** that closely match the **CLF-C02 exam blueprint, concepts, difficulty, terminology style, and question formats**, while being independently written.

The application should clearly describe itself as:

**"AWS Cloud Practitioner CLF-C02 Practice Mock Examination"**

and should NOT claim that the questions are official AWS exam questions.

---

# TECHNOLOGY

Use a stack that works reliably on Vercel's free tier.

Preferred:

- Next.js
- TypeScript
- Tailwind CSS
- React
- Server-side/API functionality where necessary
- A free-tier compatible database such as Supabase or another appropriate free database
- No paid services
- Environment variables for configuration
- Vercel deployment compatible

The implementation should be simple enough to deploy without complicated infrastructure.

Avoid unnecessarily large dependencies.

---

# CORE EXAM EXPERIENCE

The mock exam must contain exactly:

**65 questions**

The participant gets:

**90 minutes**

to complete the examination.

The exam should behave like a professional certification test.

## Exam rules

- 65 total questions
- 90-minute countdown
- One participant per browser session
- Questions presented clearly
- Four answer choices where appropriate
- Single-answer and multiple-response questions where appropriate
- Clearly indicate when a question is multiple-response
- Participant can move forward and backward
- Participant can mark questions for review
- Participant can change answers before submission
- Question navigation panel
- Progress indicator
- Timer always visible
- Automatically submit when time reaches zero
- Manual "Submit Exam" action
- Confirmation dialog before manual submission
- Prevent accidental submission
- Preserve answers while navigating between questions
- Results calculated immediately after submission

Do NOT reveal the correct answers during the examination.

---

# PARTICIPANT LOGIN

The participant should enter the examination using their name.

The initial screen should contain:

## AWS Cloud Practitioner
### CLF-C02 Practice Examination

**AWS Cloud Practitioner Week Long Workshop**  
**Sathyabama Institute of Science and Technology, Chennai**

Input:

**Participant Name**

Button:

**Enter Examination**

The name acts as the participant identifier.

The system should:

- Trim whitespace
- Reject empty names
- Prevent obviously invalid input
- Normalize duplicate accidental spaces
- Store the participant's session
- Assign an internal unique participant/session ID
- Record exam start time
- Prevent the same participant from accidentally creating multiple simultaneous attempts

Do not require email, phone number, or unnecessary personal information.

---

# EXAM START CONTROL

The administrator must control when participants can begin.

Possible states:

### NOT STARTED

Display:

> The examination has not started yet.

Show:

- Event name
- Scheduled start time
- Scheduled end time
- Countdown to start

### LIVE

Allow participants to enter the examination.

### ENDED

Prevent new attempts and display:

> The examination has ended.

The admin should be able to configure:

- Exam start date/time
- Exam end date/time
- Number of expected participants
- Participant list

The application's time handling must use a consistent timezone:

**Asia/Kolkata (IST)**

Clearly show dates and times using IST.

---

# PARTICIPANT EXAM SCREEN

Create a professional examination interface.

Suggested layout:

--------------------------------------------------
TOP BAR
--------------------------------------------------

AWS Cloud Practitioner  
CLF-C02 Mock Examination

Question 23 / 65

[ Mark for Review ]

                     71:32

--------------------------------------------------
QUESTION
--------------------------------------------------

A company wants to...

○ Option A

○ Option B

○ Option C

○ Option D

--------------------------------------------------
BOTTOM NAVIGATION
--------------------------------------------------

[ Previous ]      [ Question Navigator ]      [ Next ]

--------------------------------------------------

The interface should remain extremely usable on laptop screens.

The participant should never feel overwhelmed.

---

# TIMER

The 90-minute timer must be highly reliable.

Display:

**90:00**

and continuously count down.

Color/visual treatment should progressively communicate urgency without being distracting.

For example:

Normal:
90 → 15 minutes

Warning:
under 15 minutes

Critical:
under 5 minutes

When timer reaches:

**00:00**

automatically submit the examination.

Do not rely only on the browser's local countdown.

The server/session should also track the actual exam start time so that refreshing the page cannot reset the timer.

---

# QUESTION NAVIGATOR

Create a compact question grid:

1  2  3  4  5  
6  7  8  9  10  
...

Each question should visually communicate state:

- Not visited
- Visited but unanswered
- Answered
- Marked for review
- Answered + marked for review
- Current question

Make this extremely easy to understand.

---

# QUESTION TYPES

Support:

### Single Answer

Exactly one correct answer.

### Multiple Response

More than one answer is correct.

Clearly display:

**Select TWO answers.**

or

**Select THREE answers.**

Scoring for multiple-response questions should be configured explicitly in the question data.

Default scoring:

- Full credit only when all required correct choices are selected and no incorrect choice is selected.
- No partial credit unless deliberately configured.

---

# QUESTIONS

Create exactly **65 original CLF-C02-style questions**.

Do NOT use copied AWS exam questions.

Distribute questions across the major Cloud Practitioner knowledge areas.

Recommended approximate distribution:

## Domain 1 — Cloud Concepts

Approximately 15 questions.

Cover:

- AWS Cloud value proposition
- Scalability
- Elasticity
- Agility
- High availability
- Fault tolerance
- Economies of scale
- Global infrastructure
- Regions
- Availability Zones
- Edge locations
- AWS shared infrastructure concepts
- Consumption-based pricing
- Cloud deployment concepts
- Benefits of cloud computing

## Domain 2 — Security and Compliance

Approximately 15 questions.

Cover:

- Shared Responsibility Model
- IAM
- Users
- Groups
- Roles
- Policies
- Root user
- MFA
- Least privilege
- AWS Organizations
- AWS CloudTrail
- AWS Config
- AWS Shield
- AWS WAF
- Amazon GuardDuty
- Amazon Inspector
- Encryption
- AWS KMS
- Compliance concepts

## Domain 3 — Cloud Technology and Services

Approximately 20 questions.

Cover:

- Amazon EC2
- Amazon ECS
- Amazon EKS
- AWS Lambda
- Amazon Lightsail
- Elastic Load Balancing
- Auto Scaling
- Amazon S3
- S3 storage classes
- Amazon EBS
- Amazon EFS
- Amazon RDS
- Amazon Aurora
- Amazon DynamoDB
- Amazon VPC
- Amazon Route 53
- Amazon CloudFront
- Amazon SQS
- Amazon SNS
- Amazon EventBridge
- AWS CloudFormation
- AWS Elastic Beanstalk
- Containers
- Serverless architecture
- Managed services

## Domain 4 — Billing, Pricing and Support

Approximately 15 questions.

Cover:

- AWS Pricing Calculator
- AWS Cost Explorer
- AWS Budgets
- AWS Billing
- Consolidated billing
- AWS Organizations
- Reserved Instances
- Savings Plans
- On-Demand pricing
- Spot Instances
- Free Tier concepts
- AWS Support plans
- AWS Trusted Advisor
- AWS Marketplace
- Tags
- Cost allocation
- Cost optimization

The total must equal exactly:

**65 questions**

---

# QUESTION DATA STRUCTURE

Store all questions in a structured data model.

Each question should contain:

- id
- domain
- question
- questionType
- options
- correctAnswer
- explanation
- difficulty
- topic
- points
- multipleResponseCount

Example:

```ts
{
  id: 1,
  domain: "Cloud Concepts",
  topic: "Elasticity",
  questionType: "single",
  question: "....",
  options: [
    "....",
    "....",
    "....",
    "...."
  ],
  correctAnswer: ["B"],
  explanation: "....",
  difficulty: "medium",
  points: 1
}
```

For multiple-response:

```ts
{
  id: 17,
  domain: "Security",
  topic: "IAM",
  questionType: "multiple",
  multipleResponseCount: 2,
  correctAnswer: ["A", "C"],
  ...
}
```

---

# DO NOT EXPOSE ANSWERS

Correct answers and explanations must never be sent to the participant's browser unnecessarily before submission.

Use a secure architecture where possible.

For a basic college event deployment, the main goal is preventing accidental answer exposure rather than implementing military-grade security.

---

# SUBMISSION

When participant selects:

**Submit Exam**

show a confirmation modal:

> Are you sure you want to submit your examination?

Display:

- Answered questions
- Unanswered questions
- Marked questions
- Remaining time

Buttons:

**Continue Exam**

**Submit Examination**

Once submitted:

- Lock the attempt
- Calculate score immediately
- Record submission time
- Store participant result
- Prevent re-submission

If time expires:

Automatically submit.

---

# RESULT CALCULATION

Immediately calculate:

- Number correct
- Number incorrect
- Number unanswered
- Percentage
- Score
- Time used
- Time remaining
- Domain-wise performance

Example:

**Score**
46 / 65

**Percentage**
70.77%

Display:

### Examination Complete

Congratulations, your mock examination has been submitted successfully.

Do not reveal the correct answers immediately unless the administrator has enabled answer review.

The participant should at least see their score.

---

# RESULT SCREEN

Design the results screen to look premium.

Show a large score card:

**46 / 65**

**70.77%**

Then:

Answered:
62

Correct:
46

Incorrect:
16

Unanswered:
3

Time Used:
74:18

Add a visual performance indicator.

Example:

Excellent / Strong / Good / Needs Improvement

This should be based on configurable score thresholds.

Do NOT claim that the result predicts official AWS certification performance with statistical certainty.

---

# DOMAIN ANALYTICS

Show participants:

### Performance by Domain

Cloud Concepts  
████████████ 80%

Security & Compliance  
█████████ 60%

Technology & Services  
███████████ 73%

Billing & Support  
████████████ 80%

Keep this useful but visually simple.

---

# ADMIN SYSTEM

Create a dedicated admin route:

`/admin`

Password:

`DeltaCharlie-27-5-1939`

The admin interface does not need enterprise-grade security because this is a controlled college event and the administrator will be the only person using it.

However, do NOT hardcode the password directly into client-side JavaScript.

Store it as a server environment variable, for example:

`ADMIN_PASSWORD`

The admin should be able to:

### Dashboard

Display:

- Event name
- Exam status
- Scheduled start
- Scheduled end
- Expected participants
- Current participants
- Submitted attempts
- Average score
- Highest score
- Lowest score
- Completion percentage

---

# ADMIN CONTROLS

Include:

### Exam Controls

- Set exam start time
- Set exam end time
- Open exam manually
- Close exam manually
- Reset exam
- Enable/disable participant entry
- Enable/disable leaderboard
- Enable/disable answer explanations
- Enable/disable results visibility
- Set expected participant count

Use confirmation dialogs for destructive actions.

---

# PARTICIPANT MANAGEMENT

Admin should be able to see:

| Participant | Status | Score | Percentage | Start Time | Submit Time |
|-------------|--------|-------|------------|------------|-------------|

Statuses:

- Registered
- In Progress
- Submitted
- Auto Submitted
- Disconnected
- Not Started

Allow the admin to search/filter participants.

Also allow sorting by:

- Name
- Score
- Submission time
- Status

---

# PARTICIPANT LIST

Before the exam begins, admin can enter/import participant names.

Support:

### Add participant

### Bulk paste names

For example:

```text
Arun Kumar
Priya S
Rahul M
Karthik R
...
```

Automatically convert them into participant records.

Avoid requiring unnecessary personal information.

---

# LEADERBOARD

The leaderboard must remain hidden until explicitly enabled by the administrator.

Admin button:

**Publish Leaderboard**

Before publishing:

> The leaderboard will become visible to all participants. Continue?

After confirmation, the leaderboard becomes available publicly.

Suggested route:

`/leaderboard`

Display:

# AWS Cloud Practitioner
## Mock Examination Leaderboard

AWS Cloud Practitioner Week Long Workshop  
Sathyabama Institute of Science and Technology

Rank | Participant | Score | Percentage

1  
2  
3  
...

Top three should receive special visual treatment.

Do not display private data.

Only display:

- Rank
- Participant name
- Score
- Percentage

---

# LEADERBOARD SORTING

Primary:

Highest score first.

Tie breaker:

1. Higher score
2. Faster completion time

Make the tie-break rule configurable if practical.

---

# LIVE ADMIN MONITOR

Create a live exam monitoring screen.

Admin should be able to see:

Participants:
**87 / 100**

Submitted:
**63**

In Progress:
**24**

Not Started:
**13**

Average Score:
**72.4%**

Add a participant activity table.

The dashboard should update automatically without requiring constant manual refresh.

Use polling or another free-tier-friendly method.

Do not implement unnecessarily expensive real-time infrastructure.

---

# EVENT STATUS

Create a prominent event state system.

Possible states:

### UPCOMING

"Examination begins at 10:00 AM IST"

### LIVE

"Examination in progress"

### ENDED

"Examination has ended"

### RESULTS PUBLISHED

"Results are now available"

The entire website should respond to these states.

---

# RESPONSIVENESS

Primary target:

Laptop/Desktop browsers.

Also support:

- Tablets
- Mobile devices

However, do not let mobile optimization harm the desktop examination experience.

The actual exam interface should be optimized heavily for laptop screens.

---

# VISUAL DESIGN

The design should feel like a combination of:

- AWS professional branding
- Modern certification testing platforms
- Premium SaaS dashboards
- Minimal Apple-like simplicity
- Modern developer tooling

Do NOT make it look like a generic Bootstrap admin panel.

Do NOT overuse gradients.

Do NOT overuse glassmorphism.

Do NOT use unnecessary glowing neon effects.

Do NOT make it resemble an AI-generated template.

The experience should feel intentionally designed.

---

# COLOR SYSTEM

Use a professional AWS-inspired palette.

Suggested:

- Deep navy
- Almost-black
- White
- Soft gray
- AWS orange as an accent

Use orange primarily for:

- Primary actions
- Active states
- Progress indicators
- Important highlights

Keep the overall appearance sophisticated.

---

# TYPOGRAPHY

Use a modern highly readable sans-serif typeface.

Prioritize readability over decorative typography.

Questions must be exceptionally easy to read.

Avoid tiny text.

---

# MICRO-INTERACTIONS

Add subtle, high-quality interactions:

- Smooth question transitions
- Hover feedback
- Button press states
- Progress animation
- Timer state transitions
- Success animation after submission
- Smooth leaderboard appearance
- Subtle loading states

Do not add animations that interfere with an examination.

---

# LANDING PAGE

Create an elegant landing page.

Hero:

# AWS Cloud Practitioner
## CLF-C02 Practice Examination

AWS Cloud Practitioner Week Long Workshop

Sathyabama Institute of Science and Technology, Chennai

Display:

**65 Questions**  
**90 Minutes**  
**Instant Results**

Primary CTA:

**Enter Examination**

Secondary information:

- Original CLF-C02-style practice questions
- Full-length mock experience
- Instant score calculation

---

# PRE-EXAM INSTRUCTIONS

Before starting, show an instruction page/modal.

Include:

### Examination Details

Questions:
65

Duration:
90 minutes

Question Types:
Single Answer + Multiple Response

Results:
Available immediately after submission

### Important

- Ensure stable internet connection.
- Do not close the browser during the examination.
- Your examination is automatically submitted when time expires.
- You may review questions before submission.
- Once submitted, the examination cannot be restarted.
- Each participant should use their assigned participant name.

Button:

**Start Examination**

---

# CONNECTION / REFRESH HANDLING

The application should handle accidental page refreshes gracefully.

If the participant refreshes:

- Restore current exam session
- Restore selected answers
- Restore question position
- Restore timer based on actual elapsed time

If the connection temporarily drops:

- Preserve locally cached answers
- Synchronize when connection returns

Do not allow refreshing to restart the 90-minute timer.

---

# ANTI-ACCIDENT FEATURES

Implement practical safeguards:

- Submit confirmation dialog
- Browser refresh warning during exam where supported
- Automatic session restoration
- Timer based on actual start timestamp
- Disable accidental double-submit
- Clearly distinguish selected vs unselected answers
- Warn before leaving exam

Do NOT attempt invasive surveillance such as webcam monitoring, screen recording, or microphone recording.

---

# ACCESSIBILITY

Support:

- Keyboard navigation
- Good contrast
- Visible focus states
- Screen-reader-friendly labels
- Proper semantic HTML
- Large clickable answer areas

The answer choice itself should be easy to click rather than requiring precision.

---

# PERFORMANCE

The site will be used by potentially hundreds of students.

Optimize for:

- Fast initial load
- Minimal JavaScript
- Efficient database operations
- Cached/static content where possible
- No unnecessary API requests
- Vercel free-tier compatibility

The 65 questions should not require an API request for every question.

Load the necessary exam content efficiently while keeping answer keys protected as much as reasonably possible.

---

# DATABASE

Create a minimal schema.

Suggested tables:

## exams

- id
- name
- start_time
- end_time
- status
- expected_participants
- leaderboard_enabled
- results_enabled
- answer_review_enabled
- created_at

## participants

- id
- name
- created_at

## attempts

- id
- participant_id
- exam_id
- started_at
- submitted_at
- status
- score
- total_questions
- percentage
- time_used_seconds

## responses

- id
- attempt_id
- question_id
- selected_answers
- is_correct

Avoid unnecessary tables.

---

# SECURITY

This is a controlled college-event application, not a banking system.

Still follow sensible practices:

- Never expose admin password in client-side code
- Use server-side validation
- Validate participant input
- Validate attempt ownership
- Prevent modifying another participant's attempt
- Prevent duplicate submissions
- Use environment variables
- Do not expose answer keys through public APIs

Do not build elaborate enterprise authentication unless it is genuinely required.

---

# ADMIN PASSWORD

The requested password is:

`DeltaCharlie-27-5-1939`

Implement it through:

```env
ADMIN_PASSWORD=DeltaCharlie-27-5-1939
```

Make `.env.example` contain:

```env
ADMIN_PASSWORD=
DATABASE_URL=
NEXT_PUBLIC_APP_URL=
```

Do not commit actual secrets to GitHub.

---

# EXPORTS

Add useful admin-only functionality:

### Export Results

Allow exporting the final results to CSV.

CSV columns:

```text
Rank
Participant Name
Score
Percentage
Correct
Incorrect
Unanswered
Time Used
Submitted At
```

This is extremely useful for the event organizers.

Do not add complicated PDF reporting unless necessary.

---

# EVENT BRANDING

Use:

**AWS Cloud Practitioner Week Long Workshop**

and

**Sathyabama Institute of Science and Technology**

throughout the relevant UI areas.

Do not imply that AWS officially operates the event unless explicitly authorized.

Use wording such as:

**AWS Cloud Practitioner Week Long Workshop**  
**CLF-C02 Practice Examination**

rather than claiming:

"Official AWS Examination"

---

# FOOTER

Minimal footer:

AWS Cloud Practitioner Week Long Workshop  
Sathyabama Institute of Science and Technology, Chennai

Small disclaimer:

"This is an independently created practice examination inspired by the AWS Certified Cloud Practitioner CLF-C02 exam objectives. It is not an official AWS certification examination."

---

# ADMIN UX

The admin dashboard should be just as polished as the participant interface.

Use a clean sidebar:

Dashboard  
Exam Control  
Participants  
Live Monitor  
Results  
Leaderboard  
Settings

Use cards and charts where they genuinely improve understanding.

Do not overcrowd the dashboard.

---

# RESULT VISIBILITY LOGIC

Participants should see their own result immediately after submission.

However:

The public leaderboard remains hidden until:

`leaderboard_enabled = true`

When disabled:

`/leaderboard`

should display:

> The leaderboard has not been published yet.

When enabled:

Show the leaderboard.

---

# RESET FUNCTION

Admin should have:

**Reset Examination**

Because this is a college event environment, the admin may need to conduct testing before the real session.

Require confirmation before reset.

Clearly state that reset deletes current event attempt data.

Do not accidentally reset the exam because of a page refresh.

---

# DEMO / TEST MODE

Create an optional development-only test mode.

When enabled through an environment variable:

`DEMO_MODE=true`

allow the organizer to test:

- Participant registration
- Exam navigation
- Timer
- Submission
- Results
- Leaderboard
- Admin dashboard

without affecting the production event data.

Do not expose DEMO_MODE to normal participants.

---

# ERROR HANDLING

Create professional error states.

Examples:

### Network Error

"Your connection appears to have been interrupted. Your answers are safely preserved and we'll continue synchronization when the connection returns."

### Exam Unavailable

"The examination is currently unavailable."

### Session Expired

"Your examination session has expired."

### Invalid Participant

"Please enter a valid participant name."

### Already Submitted

"This examination attempt has already been submitted."

Avoid technical stack traces in the UI.

---

# LOADING STATES

Use elegant skeletons/spinners where necessary.

Never leave the user staring at a blank page.

---

# EMPTY STATES

Admin screens should have polished empty states.

Example:

"No participants have joined yet."

"No submissions yet."

"The leaderboard has not been published."

---

# QUESTION REVIEW

Before submitting, provide a review screen.

Example:

## Review Examination

Answered:
57 / 65

Unanswered:
8

Marked for Review:
4

Then show all 65 question numbers with their states.

Button:

**Return to Exam**

Button:

**Submit Examination**

---

# FINAL QUESTION SET

Generate exactly **65 original questions** inside the application.

Every question must include:

- Question
- Four options
- Correct answer
- Explanation
- Domain
- Topic
- Difficulty
- Question type

The questions should:

- Be technically accurate
- Reflect CLF-C02 concepts
- Use realistic business scenarios
- Avoid trick questions based on wording alone
- Include a balanced difficulty distribution
- Avoid duplicate questions
- Avoid ambiguous answers
- Avoid outdated AWS services/features
- Use current AWS terminology
- Include multiple-response questions in appropriate places

Suggested difficulty:

Easy: 25%

Medium: 55%

Hard: 20%

---

# IMPORTANT QUESTION QUALITY RULE

Before finalizing the 65-question dataset, run a validation pass.

Check:

1. Exactly 65 questions exist.
2. Every question has an answer.
3. Every answer exists among its options.
4. Every multiple-response question has the correct number of answers.
5. No duplicate questions.
6. No contradictory explanations.
7. No ambiguous questions.
8. No question accidentally contains multiple correct single-choice answers.
9. All questions belong to an appropriate CLF-C02 domain.
10. All question IDs are unique.
11. The scoring engine matches the question type.
12. No answer key is accidentally exposed to participants.

---

# TESTING

Create tests for:

- Login
- Participant registration
- Start control
- Exam timer
- Question navigation
- Mark for review
- Single-answer selection
- Multiple-response selection
- Automatic submission
- Manual submission
- Score calculation
- Unanswered questions
- Result calculation
- Leaderboard publication
- Admin authentication
- Participant filtering
- CSV export
- Refresh recovery
- Expired sessions

Test edge cases such as:

- Timer reaches 00:00
- User submits with unanswered questions
- User refreshes during question 42
- Network briefly disconnects
- Duplicate participant name
- Two participants submit simultaneously
- Admin publishes leaderboard while users are viewing results
- Admin closes the exam while participants are in progress

---

# DEPLOYMENT

Make the project Vercel-ready.

Provide:

1. Project structure
2. Complete source code
3. Database schema
4. Environment variable documentation
5. Local development instructions
6. Supabase/database setup instructions
7. Vercel deployment instructions
8. Production checklist

The app must work with Vercel's free plan.

---

# FINAL UI QUALITY BAR

The final application must feel like a real professional examination platform rather than a student project.

Prioritize:

**Clarity > Complexity**

**User experience > Developer convenience**

**Professionalism > Excessive decoration**

**Reliability > Fancy features**

The participant should immediately understand:

- What examination they are taking
- How much time remains
- What question they are answering
- What they have completed
- How to navigate
- How to submit
- What their result is

Every screen should have a clear purpose.

Do not add random features just to make the website look larger.

---

# NICE BUT USEFUL ADDITIONS

Only add features that genuinely improve the event:

### 1. Pre-exam countdown

Example:

"Examination begins in 00:18:42"

### 2. Exam progress

"42 of 65 completed"

### 3. Exam status indicator

A small:

LIVE

indicator during the exam.

### 4. Completion celebration

A tasteful success animation after submission.

### 5. Top performer display

After leaderboard publication:

🥇 1st  
🥈 2nd  
🥉 3rd

### 6. Event statistics

After the exam ends, the admin can see:

- Participants
- Completion rate
- Average score
- Highest score
- Median score
- Average completion time

These are useful for evaluating the workshop.

Do not add chat, social feeds, profiles, badges, unnecessary gamification, ads, or unrelated features.

---

# VERY IMPORTANT FINAL REQUIREMENT

Generate the project as a **complete working application**, not merely a UI prototype.

There must be:

- Working participant flow
- Working admin flow
- Working database
- Working timer
- Working scoring
- Working leaderboard
- Working result generation
- Working persistence
- Working deployment configuration

Do not leave placeholder functions such as:

```ts
// TODO: implement
```

for core functionality.

Do not use fake data in the final production implementation except where explicitly required for development/demo mode.

Create the 65-question dataset as original CLF-C02-style practice content rather than reproducing official AWS exam questions.

The final result should be something that can realistically be deployed for the **AWS Cloud Practitioner Week Long Workshop at Sathyabama Institute of Science and Technology, Chennai** and used by a large group of students simultaneously.