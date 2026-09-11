import { CLF_C02_QUESTIONS } from "../src/data/questions";

console.log("=== CLF-C02 65-QUESTION DATASET VALIDATION ===");

let errors: string[] = [];
let warnings: string[] = [];

// 1. Total count
if (CLF_C02_QUESTIONS.length !== 65) {
  errors.push(`Expected exactly 65 questions, found ${CLF_C02_QUESTIONS.length}`);
} else {
  console.log("✓ Total question count: 65");
}

// 2. ID uniqueness
const ids = new Set<number>();
const questionsText = new Set<string>();

const domainCounts: Record<string, number> = {
  "Cloud Concepts": 0,
  "Security and Compliance": 0,
  "Cloud Technology and Services": 0,
  "Billing, Pricing, and Support": 0,
};

const difficultyCounts: Record<string, number> = {
  easy: 0,
  medium: 0,
  hard: 0,
};

let singleChoiceCount = 0;
let multipleResponseCount = 0;

CLF_C02_QUESTIONS.forEach((q, index) => {
  const expectedId = index + 1;
  if (q.id !== expectedId) {
    errors.push(`Question at index ${index} has id ${q.id}, expected ${expectedId}`);
  }
  if (ids.has(q.id)) {
    errors.push(`Duplicate question ID found: ${q.id}`);
  }
  ids.add(q.id);

  if (questionsText.has(q.question.trim().toLowerCase())) {
    errors.push(`Duplicate question text in question ${q.id}`);
  }
  questionsText.add(q.question.trim().toLowerCase());

  // Domain check
  if (!domainCounts.hasOwnProperty(q.domain)) {
    errors.push(`Question ${q.id} has invalid domain: "${q.domain}"`);
  } else {
    domainCounts[q.domain]++;
  }

  // Difficulty check
  if (!difficultyCounts.hasOwnProperty(q.difficulty)) {
    errors.push(`Question ${q.id} has invalid difficulty: "${q.difficulty}"`);
  } else {
    difficultyCounts[q.difficulty]++;
  }

  // Options validation
  if (!Array.isArray(q.options) || q.options.length < 4) {
    errors.push(`Question ${q.id} must have at least 4 options, found ${q.options?.length}`);
  }

  const optionIds = new Set(q.options.map((o) => o.id));
  if (optionIds.size !== q.options.length) {
    errors.push(`Question ${q.id} has duplicate option IDs`);
  }

  // Correct answer check
  if (!Array.isArray(q.correctAnswer) || q.correctAnswer.length === 0) {
    errors.push(`Question ${q.id} has empty correctAnswer`);
  } else {
    for (const ans of q.correctAnswer) {
      if (!optionIds.has(ans)) {
        errors.push(`Question ${q.id} answer "${ans}" does not exist in options`);
      }
    }
  }

  // Type check
  if (q.questionType === "single") {
    singleChoiceCount++;
    if (q.correctAnswer.length !== 1) {
      errors.push(`Question ${q.id} is single-choice but has ${q.correctAnswer.length} answers`);
    }
  } else if (q.questionType === "multiple") {
    multipleResponseCount++;
    if (!q.multipleResponseCount || q.multipleResponseCount < 2) {
      errors.push(`Question ${q.id} is multiple-response but multipleResponseCount is ${q.multipleResponseCount}`);
    }
    if (q.correctAnswer.length !== q.multipleResponseCount) {
      errors.push(
        `Question ${q.id} multipleResponseCount (${q.multipleResponseCount}) does not match correctAnswer count (${q.correctAnswer.length})`
      );
    }
  } else {
    errors.push(`Question ${q.id} has unknown questionType "${q.questionType}"`);
  }

  // Explanation check
  if (!q.explanation || q.explanation.trim().length < 15) {
    errors.push(`Question ${q.id} has missing or too short explanation`);
  }
});

console.log("\n--- Domain Distribution ---");
for (const [domain, count] of Object.entries(domainCounts)) {
  console.log(`- ${domain}: ${count} questions`);
}

console.log("\n--- Difficulty Distribution ---");
for (const [diff, count] of Object.entries(difficultyCounts)) {
  console.log(`- ${diff}: ${count} questions (${((count / 65) * 100).toFixed(1)}%)`);
}

console.log("\n--- Question Types ---");
console.log(`- Single Answer: ${singleChoiceCount}`);
console.log(`- Multiple Response: ${multipleResponseCount}`);

if (errors.length > 0) {
  console.error("\n❌ VALIDATION FAILED WITH ERRORS:");
  errors.forEach((err) => console.error(`  - ${err}`));
  process.exit(1);
} else {
  console.log("\n✅ ALL 65 QUESTIONS PASSED STRICT VALIDATION WITH ZERO ERRORS!");
  process.exit(0);
}
