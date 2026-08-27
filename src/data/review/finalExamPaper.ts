/**
 * Hebrew Final Exam — Genesis 1 (Exam Mode)
 *
 * Built from the practice paper, with 17 final-exam-only items (~20% new).
 * Same structure: 50 grammar MCQ + 30 vocab MCQ + 5 verse-analysis items.
 */

import {
  grammarQuestions,
  vocabQuestions,
  verseAnalysisQuestions,
  type PracticeMCQ,
  type PracticeVerseAnalysis,
} from './practicePaper';

export type { PracticeMCQ, PracticeVerseAnalysis } from './practicePaper';

// 10 final-exam-only grammar items (replace last 10 of grammar set)
const finalExamGrammarReplacements: PracticeMCQ[] = [
  { id: 'fe-g01', question: 'Parse וַיִּפְקְדוּ from a typical OT narrative:', hebrew: 'וַיִּפְקְדוּ אוֹתָם', options: ['Qal perfect 3mp', 'Qal wayyiqtol 3mp', 'Niphal wayyiqtol 3mp', 'Hiphil imperfect 3mp'], correctIndex: 1, explanation: 'וַ + dagesh in prefix (י) + yiqtol (3mp -וּ) = wayyiqtol 3mp ("and they mustered/numbered"). The classic narrative-past pattern.' },
  { id: 'fe-g02', question: 'Identify the function of dagesh forte in הַמֶּלֶךְ:', options: ['Marks pause', 'Marks doubling — fingerprint of the article הַ', 'Marks long vowel', 'Marks the BeGaDKePhaT hardening'], correctIndex: 1, explanation: 'הַ + dagesh forte (doubling) in מ = the article. The article ALWAYS produces a dagesh in the next consonant (unless that consonant is a guttural).' },
  { id: 'fe-g03', question: 'In Hebrew syntax, what is the typical clause order?', options: ['SVO (subject-verb-object)', 'VSO (verb-subject-object)', 'OVS', 'SOV'], correctIndex: 1, explanation: 'Default Hebrew word order is VERB-SUBJECT-OBJECT. Other orders signal emphasis or disjunction (e.g., scene-setting "and the earth was…").' },
  { id: 'fe-g04', question: 'Parse וְשָׁמַרְתָּ — a vav-consecutive perfect form:', options: ['Past — "and you kept"', 'Future / commanded — "and you SHALL keep" (vav-consecutive perfect)', 'Subjunctive', 'Participle'], correctIndex: 1, explanation: 'וְשָׁמַרְתָּ = vav-consecutive PERFECT. In future/commanded contexts (after imperfect/imperative), it carries a future or modal sense: "and you shall keep."' },
  { id: 'fe-g05', question: 'Identify the form הַכֹּהֵן הַגָּדוֹל:', options: ['Predicative ("the priest is great")', 'Attributive — "the great priest"', 'Construct chain', 'Apposition only'], correctIndex: 1, explanation: 'Both noun and adjective have the article = ATTRIBUTIVE adjective: "the GREAT priest" (modifying). In predicative use, the adjective would lack the article.' },
  { id: 'fe-g06', question: 'In hi-...-i pattern (e.g., הִקְטִיל), the binyan is:', options: ['Qal', 'Niphal', 'Piel', 'Hiphil — causative meaning'], correctIndex: 3, explanation: 'הִקְטִיל = HIPHIL perfect 3ms. Prefix ה- + hi-…-i pattern in perfect = causative ("cause to X").' },
  { id: 'fe-g07', question: 'Parse the form נִכְתַּב:', options: ['Qal perfect 3ms', 'Niphal perfect 3ms (passive of qal)', 'Piel perfect 3ms', 'Pual perfect 3ms'], correctIndex: 1, explanation: 'נ- prefix + perfect = NIPHAL perfect 3ms ("it was written"). Niphal often serves as the passive of the qal.' },
  { id: 'fe-g08', question: 'Parse the form הִתְפַּלֵּל:', options: ['Hiphil perfect 3ms', 'Niphal perfect 3ms', 'Hithpael perfect 3ms (reflexive)', 'Pual perfect 3ms'], correctIndex: 2, explanation: 'הִתְ- prefix + dagesh in middle root letter (פּ) = HITHPAEL perfect 3ms ("he prayed / made himself entreat"). Reflexive/reciprocal binyan.' },
  { id: 'fe-g09', question: 'What is the qal infinitive construct of √k-t-b ("write")?', options: ['כָּתוֹב', 'כְּתֹב', 'כָּתַב', 'כֹּתֵב'], correctIndex: 1, explanation: 'כְּתֹב = qal infinitive construct ("to write"). Used after לְ for purpose: לִכְתֹּב. The absolute infinitive is כָּתוֹב.' },
  { id: 'fe-g10', question: 'Parse the negative אַל in OT prohibition:', hebrew: 'אַל־תִּשְׁכַּח', options: ['Negates indicative', 'Negates jussive/imperfect for prohibitions', 'Always negates participles', 'Means "not yet"'], correctIndex: 1, explanation: 'אַל negates JUSSIVES / IMPERFECTS in volitional commands ("Do not!"). For declarative negation, Hebrew uses לֹא. Memory: אַל = "Don\'t!" / לֹא = "not."' },
];

// 6 final-exam-only vocab items
const finalExamVocabReplacements: PracticeMCQ[] = [
  { id: 'fe-v01', question: 'What does יָדַע mean?', options: ['speak', 'know', 'go', 'see'], correctIndex: 1, explanation: 'יָדַע = "know." A theologically rich verb: covenantal knowing, intimate acquaintance — not just intellectual knowledge.' },
  { id: 'fe-v02', question: 'What does כֹּהֵן mean?', options: ['prophet', 'priest', 'judge', 'elder'], correctIndex: 1, explanation: 'כֹּהֵן = "priest." From the same root as the verb that means "minister/serve" in priestly context.' },
  { id: 'fe-v03', question: 'What does תוֹרָה mean?', options: ['curse', 'instruction, law, teaching', 'prayer', 'gift'], correctIndex: 1, explanation: 'תּוֹרָה = "instruction, teaching, law." From √y-r-h ("teach, point out, throw"). Refers to the body of instruction given through Moses; later the first 5 books.' },
  { id: 'fe-v04', question: 'What does בְּרִית mean?', options: ['city', 'war', 'covenant', 'house'], correctIndex: 2, explanation: 'בְּרִית = "covenant." Central biblical concept: God\'s solemn agreement with Israel. Often paired with the verb כָּרַת ("cut a covenant").' },
  { id: 'fe-v05', question: 'What does עֶבֶד mean?', options: ['king', 'priest', 'servant, slave', 'son'], correctIndex: 2, explanation: 'עֶבֶד = "servant, slave." Used both literally and as a title of honor (e.g., "servant of YHWH" for Moses, David, etc.).' },
  { id: 'fe-v06', question: 'What does הָלַךְ mean?', options: ['sit', 'stand', 'walk, go', 'run'], correctIndex: 2, explanation: 'הָלַךְ = "walk, go." Highly common verb of motion. Often used metaphorically: "to walk in the ways of YHWH."' },
];

// 1 final-exam-only verse analysis (replaces last)
const finalExamVerseAnalysisReplacement: PracticeVerseAnalysis = {
  id: 'fe-va01',
  reference: 'Deuteronomy 6:4-5',
  hebrew: 'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד וְאָהַבְתָּ אֵת יְהוָה אֱלֹהֶיךָ בְּכָל־לְבָבְךָ',
  transliteration: 'šə·maʿ yiś·rā·ʾêl YHWH ʾĕ·lō·hê·nû YHWH ʾe·ḥāḏ wə·ʾā·haḇ·tā ʾêt YHWH ʾĕ·lō·he·ḵā bə·ḵol lə·ḇā·ḇə·ḵā',
  referenceTranslation: 'Hear, O Israel: the LORD is our God, the LORD is one. And you shall love the LORD your God with all your heart.',
  keyTerms: ['hear', 'Israel', 'LORD', 'God', 'one', 'love', 'heart'],
  matchingPairs: [
    { hebrew: 'שְׁמַע', category: 'Qal imperative 2ms ("Hear!")' },
    { hebrew: 'אֱלֹהֵינוּ', category: 'Noun + 1cp pronominal suffix ("our God")' },
    { hebrew: 'אֶחָד', category: 'Cardinal numeral ("one") — masculine' },
    { hebrew: 'וְאָהַבְתָּ', category: 'Vav-consecutive perfect 2ms (commanded — "and you shall love")' },
    { hebrew: 'אֱלֹהֶיךָ', category: 'Noun + 2ms suffix ("your God")' },
    { hebrew: 'בְּכָל־לְבָבְךָ', category: 'Preposition + "all" + noun + 2ms suffix ("with all your heart")' },
  ],
  distractorCategories: [
    'Qal perfect 3ms',
    'Niphal participle ms',
    'Definite direct object marker',
    'Construct chain (feminine plural)',
  ],
};

// Compose final-exam paper: 40 from practice + 10 new = 50 grammar; 24 + 6 = 30 vocab; 4 + 1 = 5 verse
export const finalExamGrammarQuestions: PracticeMCQ[] = [
  ...grammarQuestions.slice(0, 40),
  ...finalExamGrammarReplacements,
];

export const finalExamVocabQuestions: PracticeMCQ[] = [
  ...vocabQuestions.slice(0, 24),
  ...finalExamVocabReplacements,
];

export const finalExamVerseAnalysisQuestions: PracticeVerseAnalysis[] = [
  ...verseAnalysisQuestions.slice(0, 4),
  finalExamVerseAnalysisReplacement,
];
