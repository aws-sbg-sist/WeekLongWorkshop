import { CLF_C02_QUESTIONS } from "../src/data/questions";
import { calculateExamScore } from "../src/lib/scoring";

console.log("=== COMPREHENSIVE SCORE CALCULATION TEST SUITE ===");

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, detail?: any) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✅ PASS: ${testName}`);
  } else {
    console.error(`❌ FAIL: ${testName}`, detail || "");
  }
}

// TEST 1: 100% Perfect Score (all 65 correct)
const allCorrect: Record<number, string[]> = {};
for (const q of CLF_C02_QUESTIONS) {
  allCorrect[q.id] = q.correctAnswer;
}
const res1 = calculateExamScore(allCorrect);
assert(
  res1.score === 65 &&
    res1.totalQuestions === 65 &&
    res1.percentage === 100 &&
    res1.answeredCount === 65 &&
    res1.unansweredCount === 0 &&
    res1.correctCount === 65 &&
    res1.incorrectCount === 0 &&
    res1.performanceTier === "Excellent",
  "Test 1: All 65 Correct gives 65/65, 100%, 0 unanswered, Tier Excellent",
  res1
);

// TEST 2: All 65 Unanswered (Empty Object)
const res2 = calculateExamScore({});
assert(
  res2.score === 0 &&
    res2.totalQuestions === 65 &&
    res2.percentage === 0 &&
    res2.answeredCount === 0 &&
    res2.unansweredCount === 65 &&
    res2.correctCount === 0 &&
    res2.incorrectCount === 0 &&
    res2.performanceTier === "Needs Improvement",
  "Test 2: Empty answers gives 0/65, 0%, 65 unanswered, Tier Needs Improvement",
  res2
);

// TEST 3: Null / Undefined answers parameter
const resNull = calculateExamScore(null as any);
const resUndef = calculateExamScore(undefined as any);
assert(
  resNull.score === 0 && resNull.answeredCount === 0 && resUndef.score === 0,
  "Test 3: Null/undefined answers handled gracefully without throwing error"
);

// TEST 4: All 65 Answered Incorrectly
const allWrong: Record<number, string[]> = {};
for (const q of CLF_C02_QUESTIONS) {
  const wrongOpt = q.options.find((o) => !q.correctAnswer.includes(o.id));
  allWrong[q.id] = wrongOpt ? [wrongOpt.id] : ["Z"];
}
const res4 = calculateExamScore(allWrong);
assert(
  res4.score === 0 &&
    res4.answeredCount === 65 &&
    res4.unansweredCount === 0 &&
    res4.incorrectCount === 65,
  "Test 4: All 65 wrong gives 0 correct, 65 answered, 65 incorrect, 0 unanswered",
  res4
);

// TEST 5: Multiple-Response Questions (AWS No Partial Credit Rule)
const qMulti = CLF_C02_QUESTIONS.find((q) => q.questionType === "multiple");
if (!qMulti) throw new Error("No multiple question found");

// 5a. Reversed order
const reversedAns = [...qMulti.correctAnswer].reverse();
const res5a = calculateExamScore({ [qMulti.id]: reversedAns });
assert(
  res5a.score === 1 && res5a.correctCount === 1,
  `Test 5a: Reversed order for Q${qMulti.id} [${reversedAns.join(",")}] is marked correct`
);

// 5b. Partial answer (e.g. only 1 of 2 selected) -> must be 0 points
const partialAns = [qMulti.correctAnswer[0]];
const res5b = calculateExamScore({ [qMulti.id]: partialAns });
assert(
  res5b.score === 0 && res5b.correctCount === 0,
  `Test 5b: Partial answer for Q${qMulti.id} [${partialAns.join(",")}] receives 0 points (no partial credit)`
);

// 5c. Extra incorrect option selected -> must be 0 points
const extraOpt = qMulti.options.find((o) => !qMulti.correctAnswer.includes(o.id));
const extraAns = [...qMulti.correctAnswer, extraOpt ? extraOpt.id : "Z"];
const res5c = calculateExamScore({ [qMulti.id]: extraAns });
assert(
  res5c.score === 0 && res5c.correctCount === 0,
  `Test 5c: Extra incorrect option for Q${qMulti.id} receives 0 points`
);

// TEST 6: Robustness to casing, whitespace, duplicates, and string values
const robustAnswers: any = {
  1: ["b"], // lowercase (Q1 correct is "B")
  2: [" A "], // whitespace (Q2 correct is "A")
  3: ["b", "c", "b"], // duplicates & lowercase for multi-response (Q3 correct is ["B", "C"])
  4: "B", // raw string instead of array (Q4 correct is ["B"])
};
const res6 = calculateExamScore(robustAnswers);
assert(
  res6.score === 4 && res6.correctCount === 4,
  "Test 6: Handles lowercase, whitespace, duplicate choices, and raw string formats",
  { score: res6.score }
);

// TEST 7: Domain Breakdowns & Aggregations
let sumTotal = 0;
let sumCorrect = 0;
for (const ds of res1.domainScores) {
  sumTotal += ds.total;
  sumCorrect += ds.correct;
}
assert(
  sumTotal === 65 && sumCorrect === 65 && res1.domainScores.length === 4,
  `Test 7: All 4 domains sum to exactly 65 total questions and 65 correct (${res1.domainScores.map((d) => `${d.domain}: ${d.total}`).join(", ")})`
);

// TEST 8: Domain Percentages Accuracy
// Answer only Domain 1 (Cloud Concepts, 15 questions)
const d1Answers: Record<number, string[]> = {};
for (const q of CLF_C02_QUESTIONS) {
  if (q.domain === "Cloud Concepts") {
    d1Answers[q.id] = q.correctAnswer;
  }
}
const res8 = calculateExamScore(d1Answers);
const ccDomain = res8.domainScores.find((d) => d.domain === "Cloud Concepts");
const secDomain = res8.domainScores.find((d) => d.domain === "Security and Compliance");
assert(
  res8.score === 15 &&
    ccDomain?.correct === 15 &&
    ccDomain?.total === 15 &&
    ccDomain?.percentage === 100 &&
    secDomain?.correct === 0 &&
    secDomain?.percentage === 0,
  "Test 8: Domain proficiency breakdown correctly calculates per-domain stats (15/15 = 100% for Cloud Concepts, 0% for others)"
);

// TEST 9: String-keyed JSON Answers (HTTP API payload format)
const jsonAnswers: any = {};
for (const q of CLF_C02_QUESTIONS) {
  jsonAnswers[String(q.id)] = q.correctAnswer;
}
const res9 = calculateExamScore(jsonAnswers);
assert(
  res9.score === 65 && res9.percentage === 100,
  "Test 9: String keys from JSON deserialization grade correctly to 65/65 (100%)"
);

// TEST 10: Performance Tier Thresholds
function getAnswersForN(count: number) {
  const ans: Record<number, string[]> = {};
  for (let i = 0; i < 65; i++) {
    const q = CLF_C02_QUESTIONS[i];
    if (i < count) {
      ans[q.id] = q.correctAnswer;
    } else {
      const wrong = q.options.find((o) => !q.correctAnswer.includes(o.id));
      ans[q.id] = wrong ? [wrong.id] : ["Z"];
    }
  }
  return ans;
}

const t86 = calculateExamScore(getAnswersForN(56)); // 56/65 = 86.15% -> Excellent (>= 85%)
const t84 = calculateExamScore(getAnswersForN(55)); // 55/65 = 84.62% -> Strong (>= 70%)
const t70 = calculateExamScore(getAnswersForN(46)); // 46/65 = 70.77% -> Strong (>= 70%)
const t69 = calculateExamScore(getAnswersForN(45)); // 45/65 = 69.23% -> Good (>= 55%)
const t55 = calculateExamScore(getAnswersForN(36)); // 36/65 = 55.38% -> Good (>= 55%)
const t53 = calculateExamScore(getAnswersForN(35)); // 35/65 = 53.85% -> Needs Improvement (< 55%)

assert(
  t86.performanceTier === "Excellent" &&
    t84.performanceTier === "Strong" &&
    t70.performanceTier === "Strong" &&
    t69.performanceTier === "Good" &&
    t55.performanceTier === "Good" &&
    t53.performanceTier === "Needs Improvement",
  "Test 10: Performance tiers match exact AWS grade cutoffs (Excellent >= 85%, Strong >= 70%, Good >= 55%, Needs Improvement < 55%)"
);

// TEST 11: Score + Incorrect + Unanswered Identity
// For any candidate submission: score + incorrect + unanswered MUST ALWAYS EQUAL totalQuestions (65)
const randomAns: Record<number, string[]> = {};
// Answer first 20 correctly, next 15 incorrectly, leave last 30 unanswered
for (let i = 0; i < 20; i++) {
  randomAns[CLF_C02_QUESTIONS[i].id] = CLF_C02_QUESTIONS[i].correctAnswer;
}
for (let i = 20; i < 35; i++) {
  const q = CLF_C02_QUESTIONS[i];
  const wrong = q.options.find((o) => !q.correctAnswer.includes(o.id));
  randomAns[q.id] = wrong ? [wrong.id] : ["Z"];
}
const res11 = calculateExamScore(randomAns);
const sumCheck = res11.correctCount + res11.incorrectCount + res11.unansweredCount;
assert(
  res11.score === 20 &&
    res11.answeredCount === 35 &&
    res11.correctCount === 20 &&
    res11.incorrectCount === 15 &&
    res11.unansweredCount === 30 &&
    sumCheck === 65,
  "Test 11: Conservation of questions: Correct (20) + Incorrect (15) + Unanswered (30) === Total (65)"
);

console.log("\n=======================================================");
console.log(`RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
if (passedTests === totalTests) {
  console.log("🎉 ALL SCORE CALCULATION TESTS PASSED WITH 100% ACCURACY!");
} else {
  console.error("❌ TEST SUITE FAILED");
  process.exit(1);
}
