/**
 * Class 13 Final Exam — the cumulative capstone (Exam Mode)
 * CourseGuide for BBH (Pratico/Van Pelt), Chapters 1-35.
 *
 * Composed the same way as the Koine final exam: most items are drawn from the
 * Class 13 practice paper, and roughly 20% are exam-only. Same shape as the
 * practice paper — 50 grammar MCQ + 30 vocab MCQ + 5 verse-analysis items.
 *
 * The slice deliberately drops the last ten practice-paper grammar items
 * (syntax and the derived stems) and replaces them with ten UNSEEN questions on
 * exactly those topics, so the exam keeps full Chapter 1-35 coverage while
 * still testing something the student has not already answered. The one new
 * verse-analysis item is a Hithpael, the single stem the practice paper's five
 * verses do not exercise.
 *
 * NOT YET RELEASED. No route imports this bank, so it is not reachable from
 * the app. Release = point /grammar/review/final-exam at these exports.
 */

import {
  class13GrammarQuestions,
  class13VocabQuestions,
  class13VerseAnalysisQuestions,
} from './class13PracticePaper';
import type { PracticeMCQ, PracticeVerseAnalysis } from './practicePaper';

export type { PracticeMCQ, MatchingPair, PracticeVerseAnalysis } from './practicePaper';

// --- Exam-only grammar: syntax and the derived stems (Ch 23-35) ---
const class13ExamGrammarReplacements: PracticeMCQ[] = [
  { id: 'c13-fe-g01', question: 'In וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ, why does the SUBJECT come before the verb?', hebrew: 'וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ', options: ['because הָיָה always follows its subject', 'because the fronted subject steps out of the narrative to give circumstantial background', 'because the clause is a question', 'because the verb is feminine'], correctIndex: 1, explanation: 'Ch 23. Genesis 1:1 uses ordinary verb-first order; 1:2 fronts the subject and pauses to describe a state of affairs.' },
  { id: 'c13-fe-g02', question: 'Which of these may serve as the PREDICATE of a verbless clause?', options: ['only a noun', 'only an adjective', 'a noun, adjective, pronoun, prepositional phrase, or participle', 'only a participle'], correctIndex: 2, explanation: 'Ch 23. לַיהוָה הָאָרֶץ has a prepositional predicate; יְהוָה שֹׁמְרֶךָ has a participial one.' },
  { id: 'c13-fe-g03', question: 'In which Niphal conjugations does the stem נ appear as a full CONSONANT?', options: ['the Perfect, Participle, and Infinitive Absolute', 'the Imperfect, Imperative, and Participle', 'the Infinitive Construct only', 'nowhere'], correctIndex: 0, explanation: 'Ch 24. Everywhere else it assimilates into the first root consonant and survives only as a Daghesh Forte.' },
  { id: 'c13-fe-g04', question: 'Which root would you look up for the Niphal form נוֹשַׁע?', hebrew: 'נוֹשַׁע', options: ['נָשָׂא ("to lift")', 'שׁוּב ("to return")', 'יָשַׁע ("to save, deliver")', 'נָשַׁק ("to kiss")'], correctIndex: 2, explanation: 'Ch 25. I-י roots (originally I-ו) show a Holem Waw in the Niphal Perfect: "Israel is saved by the LORD" (Isa 45:17).' },
  { id: 'c13-fe-g05', question: 'What is the characteristic Hiphil STEM vowel?', hebrew: 'הִקְטִיל', options: ['Qamets throughout', 'Hireq Yod or Tsere', 'Shureq throughout', 'Qibbuts throughout'], correctIndex: 1, explanation: 'Ch 26. הִקְטִיל, יַקְטִיל and מַקְטִיל all show the Hireq Yod; הַקְטֵל shows the Tsere; הִקְטַלְתָּ shows the Pathach.' },
  { id: 'c13-fe-g06', question: 'Which root would you look up for the Hiphil form הוֹשִׁיעַ?', hebrew: 'הוֹשִׁיעַ', options: ['שׁוּב ("to return")', 'שָׁמַע ("to hear")', 'נָשָׂא ("to lift")', 'יָשַׁע ("to save")'], correctIndex: 3, explanation: 'Ch 27. The Holem Waw after the ה prefix is the I-י Hiphil diagnostic, shared with הוֹצִיא and הוֹדִיעַ.' },
  { id: 'c13-fe-g07', question: 'Parse הָשְׁלַכְתִּי in Psalm 22:9:', hebrew: 'עָלֶיךָ הָשְׁלַכְתִּי מֵרָחֶם', options: ['Hophal Perfect 1cs — "I was cast"', 'Hiphil Perfect 1cs — "I threw"', 'Qal Perfect 1cs — "I fell"', 'Niphal Perfect 1cs — "I was thrown down"'], correctIndex: 0, explanation: 'Ch 28. The o-class prefix vowel marks the Hophal, the passive of the Hiphil הִשְׁלִיךְ ("he threw").' },
  { id: 'c13-fe-g08', question: 'Which three features are the Piel diagnostics?', options: ['a ה prefix, a Hireq Yod, and a Pathach stem vowel', 'a Daghesh Forte in the second root consonant and a Pathach stem vowel', 'a נ prefix, a Qamets stem vowel, and a Tsere', 'a Shureq prefix vowel and a Pathach stem vowel'], correctIndex: 1, explanation: 'Ch 30. Learn those three and the whole Piel becomes readable, with II-Guttural roots as the single recurring exception.' },
  { id: 'c13-fe-g09', question: 'Parse מְהֻלָּל in Psalm 145:3:', hebrew: 'גָּדוֹל יְהוָה וּמְהֻלָּל מְאֹד', options: ['Piel participle — "praising"', 'Hithpael participle — "boasting"', 'Pual participle — "praised, to be praised"', 'Hiphil participle — "causing praise"'], correctIndex: 2, explanation: 'Ch 32. The Qibbuts under the first root consonant is what separates a Pual from a Piel; the Daghesh Forte and the מ prefix are shared.' },
  { id: 'c13-fe-g10', question: 'Why is the Hithpael of שָׁמַר spelled הִשְׁתַּמֵּר rather than הִתְשַׁמֵּר?', hebrew: 'הִשְׁתַּמֵּר', options: ['because the prefix ת metathesizes with a sibilant first root consonant', 'because the ש assimilates', 'because the root is geminate', 'because the ת is dropped'], correctIndex: 0, explanation: 'Ch 34. Roots beginning with שׂ, צ, ס or שׁ swap places with the prefix ת. With צ the ת also hardens to ט, as in הִצְטַדֵּק.' },
];

// --- Exam-only vocabulary: Chapters 29-35 ---
const class13ExamVocabReplacements: PracticeMCQ[] = [
  { id: 'c13-fe-v01', question: 'What does תְּפִלָּה mean?', hebrew: 'תְּפִלָּה', options: ['law, instruction', 'prayer', 'generations', 'rebuke'], correctIndex: 1, explanation: 'Ch 35 vocabulary. Built on פָּלַל, the verb that lives in the Hithpael: "he prayed."' },
  { id: 'c13-fe-v02', question: 'What does צָרָה mean?', hebrew: 'צָרָה', options: ['adversary', 'distress, anxiety, trouble', 'rock', 'righteousness'], correctIndex: 1, explanation: 'Ch 35 vocabulary. Related to צַר ("adversary," Ch 31) — the trouble and the one who causes it share a root.' },
  { id: 'c13-fe-v03', question: 'What does מִקְדָּשׁ mean?', hebrew: 'מִקְדָּשׁ', options: ['sanctuary', 'livestock', 'east', 'pastureland'], correctIndex: 0, explanation: 'Ch 34 vocabulary. From קָדַשׁ ("to be holy," Ch 18) — the holy place.' },
  { id: 'c13-fe-v04', question: 'What does נַחַל mean?', hebrew: 'נַחַל', options: ['chief, prince', 'bronze', 'stream, brook, wadi', 'plague'], correctIndex: 2, explanation: 'Ch 29 vocabulary. A wadi runs in the rainy season and stands dry the rest of the year.' },
  { id: 'c13-fe-v05', question: 'What does קֶשֶׁת mean?', hebrew: 'קֶשֶׁת', options: ['horn', 'wall', 'end, border', 'bow, weapon'], correctIndex: 3, explanation: 'Ch 32 vocabulary. The bow God sets in the clouds as the sign of the covenant (Gen 9:13).' },
  { id: 'c13-fe-v06', question: 'What does מָשַׁח mean?', hebrew: 'מָשַׁח', options: ['to rule', 'to smear, anoint with oil', 'to sell', 'to reject'], correctIndex: 1, explanation: 'Ch 33 vocabulary. The root behind מָשִׁיחַ, "anointed one."' },
];

// --- Exam-only verse: the Hithpael, the one stem the practice verses omit ---
const class13ExamVerseAnalysisReplacement: PracticeVerseAnalysis = {
  id: 'c13-fe-va01',
  reference: 'Genesis 5:24',
  hebrew: 'וַיִּתְהַלֵּךְ חֲנוֹךְ אֶת־הָאֱלֹהִים',
  transliteration: 'way·yiṯ·hal·lêḵ ḥă·nôḵ ʾet-hā·ʾĕ·lō·hîm',
  referenceTranslation: 'And Enoch walked with God.',
  keyTerms: ['walked', 'Enoch', 'God', 'with'],
  matchingPairs: [
    { hebrew: 'וַיִּתְהַלֵּךְ', category: 'Waw Consecutive + HITHPAEL Imperfect 3ms (Ch 17, 34)' },
    { hebrew: 'יִתְ־', category: 'Hithpael Imperfect preformative, 3ms (Ch 34)' },
    { hebrew: 'חֲנוֹךְ', category: 'Proper noun, subject following the verb (Ch 23)' },
    { hebrew: 'אֶת־', category: 'Preposition "with" — NOT the object marker here (Ch 6)' },
    { hebrew: 'הָאֱלֹהִים', category: 'Article with compensatory lengthening + noun (Ch 5)' },
  ],
  distractorCategories: [
    'Niphal Perfect 3ms (Ch 24)',
    'Definite direct object marker (Ch 6)',
    'Qal Infinitive Construct (Ch 20)',
    'Hophal Participle ms (Ch 28)',
  ],
};

// Compose the exam: 40 practice + 10 new = 50 grammar; 24 + 6 = 30 vocab; 4 + 1 = 5 verse.
export const class13ExamGrammarQuestions: PracticeMCQ[] = [
  ...class13GrammarQuestions.slice(0, 40),
  ...class13ExamGrammarReplacements,
];

export const class13ExamVocabQuestions: PracticeMCQ[] = [
  ...class13VocabQuestions.slice(0, 24),
  ...class13ExamVocabReplacements,
];

export const class13ExamVerseAnalysisQuestions: PracticeVerseAnalysis[] = [
  ...class13VerseAnalysisQuestions.slice(0, 4),
  class13ExamVerseAnalysisReplacement,
];

export const CLASS13_EXAM_SECTIONS = [
  { id: 1, title: 'Grammar', questionCount: class13ExamGrammarQuestions.length, description: 'Parse forms and identify structures from Chapters 1-35' },
  { id: 2, title: 'Vocabulary', questionCount: class13ExamVocabQuestions.length, description: 'Identify the meaning of words from the "You Should Know" lists' },
  { id: 3, title: 'Verse Analysis', questionCount: class13ExamVerseAnalysisQuestions.length, description: 'Match Hebrew words to grammatical categories and translate' },
] as const;
