/**
 * Class 13 Final Exam — the cumulative capstone (Exam Mode)
 * CourseGuide for BBH (Pratico/Van Pelt), Chapters 1-35.
 *
 * Composed the same way as the Koine final exam: most items are drawn from the
 * Class 13 practice paper, and roughly 20% are exam-only. Same shape as the
 * practice paper — 40 grammar MCQ + 40 vocab MCQ + 5 verse-analysis items.
 *
 * The slice drops the last ten practice-paper grammar items and replaces them
 * with ten unseen items (testing root/binyan shifts, syntax, and reading on new verses).
 * Vocab takes the first 34 of the practice paper's 35 items and adds six unseen
 * ones (including advanced Chapter 29-35 vocabulary and synonym discriminations).
 */

import {
  class13GrammarQuestions,
  class13VocabQuestions,
  class13VerseAnalysisQuestions,
} from './class13PracticePaper';
import type { PracticeMCQ, PracticeVerseAnalysis } from './practicePaper';

export type { PracticeMCQ, MatchingPair, PracticeVerseAnalysis } from './practicePaper';

// ═══════════════════════════════════════════════════════════════════════════════
// Exam-only grammar replacements (10 items: Root/Binyan patterns, syntax, reading)
// ═══════════════════════════════════════════════════════════════════════════════

const class13ExamGrammarReplacements: PracticeMCQ[] = [
  {
    id: 'c13-fe-g01',
    question: 'Parse נִשְׁבַּר from שָׁבַר ("to break"):',
    hebrew: 'נִשְׁבַּר',
    options: ['Niphal Perfect 3ms', 'Niphal Participle ms', 'Qal Perfect 3ms', 'Piel Perfect 3ms'],
    correctIndex: 0,
    explanation: 'A נ prefix with Pathach under the second root letter: Niphal Perfect 3ms, "it was broken" (the passive of Qal שָׁבַר). The Niphal Participle נִשְׁבָּר has Qamets there instead.',
  },
  {
    id: 'c13-fe-g02',
    question: 'Parse מְדַבֵּר from the Piel verb דִּבֶּר ("to speak"):',
    hebrew: 'מְדַבֵּר',
    options: ['Pual Participle ms', 'Piel Participle ms', 'Hiphil Participle ms', 'Piel Imperfect 3ms'],
    correctIndex: 1,
    explanation: 'A מ prefix with Shewa, Pathach under the first root letter, Dagesh Forte in the second and Tsere under it: Piel Participle ms, "speaking". The Pual Participle would be מְדֻבָּר.',
  },
  {
    id: 'c13-fe-g03',
    question: 'The root √y-ts-ʾ in Qal means יָצָא ("he went out"). What does the Hiphil form הוֹצִיא express?',
    hebrew: 'הוֹצִיא',
    options: [
      'simple passive ("he was taken")',
      'reflexive ("he hid himself away")',
      'causative active ("he brought out")',
      'factitive passive ("he was expelled")',
    ],
    correctIndex: 2,
    explanation: 'The Hiphil stem turns intransitive motion into causative action: הוֹצִיא = "he caused to go out / brought out / led forth".',
  },
  {
    id: 'c13-fe-g04',
    question: 'The root √m-l-k means "to reign". What is the semantic force of the Hophal form הוּמְלַךְ (or הָמְלַךְ)?',
    hebrew: 'הוּמְלַךְ',
    options: [
      'causative passive ("he was made king")',
      'simple active ("he reigned as king")',
      'intensive active ("he ruled harshly")',
      'reflexive ("he crowned himself king")',
    ],
    correctIndex: 0,
    explanation: 'The Hophal is the passive counterpart to Hiphil: הוּמְלַךְ = "he was made king / caused to reign".',
  },
  {
    id: 'c13-fe-g05',
    question: 'Analyze the syntactic construction in the phrase הַכֹּהֵן הַגָּדוֹל:',
    hebrew: 'הַכֹּהֵן הַגָּדוֹל',
    options: [
      'predicative adjective ("the priest is great")',
      'vocative phrase ("O great priest!")',
      'construct chain ("priest of greatness")',
      'attributive adjective ("the high priest")',
    ],
    correctIndex: 3,
    explanation: 'Both noun and adjective carry the definite article in agreement, signifying an attributive modification: "the high / great priest".',
  },
  {
    id: 'c13-fe-g06',
    question: 'In biblical legal and covenantal commands, what tense/aspect is conveyed by וְשָׁמַרְתָּ (Waw-consecutive Perfect)?',
    hebrew: 'וְשָׁמַרְתָּ',
    options: [
      'past narration ("and you kept")',
      'subordinate condition ("if you keep")',
      'commanded future ("and you shall keep")',
      'past continuous ("you were keeping")',
    ],
    correctIndex: 2,
    explanation: 'A Waw-consecutive Perfect (וְ + Perfect 2ms) following an initial command or imperfect carries instructional future force: "and you shall keep".',
  },
  {
    id: 'c13-fe-g07',
    question: 'The pronominal suffix ־ָם attached to a noun (e.g. סוּסָם) represents:',
    hebrew: 'סוּסָם',
    options: ['"my (1cs)"', '"your (2mp)"', '"our (1cp)"', '"their (3mp)"'],
    correctIndex: 3,
    explanation: '־ָם is the 3mp possessive suffix attached to singular nouns: סוּסָם = "their horse".',
  },
  {
    id: 'c13-fe-g08',
    question: 'What is the syntactic function of the relative particle אֲשֶׁר in narrative clauses?',
    hebrew: 'הָאִישׁ אֲשֶׁר־בָּא',
    options: [
      'it negates the following verb ("not")',
      'it introduces a relative clause ("who/which")',
      'it marks the definite direct object ("et")',
      'it marks existential possession ("there is")',
    ],
    correctIndex: 1,
    explanation: 'אֲשֶׁר is the uninflected relative particle introducing relative subordinate clauses ("the man who came").',
  },
  {
    id: 'c13-fe-g09',
    question: 'Read and translate the construct phrase בְּנֵי יִשְׂרָאֵל:',
    hebrew: 'בְּנֵי יִשְׂרָאֵל',
    options: ['"the sons of Israel"', '"the land of Israel"', '"the God of Israel"', '"the leaders of Israel"'],
    correctIndex: 0,
    explanation: 'בְּנֵי is the masculine plural construct of בֵּן ("son"): בְּנֵי יִשְׂרָאֵל = "the sons / children of Israel".',
  },
  {
    id: 'c13-fe-g10',
    question: 'Read and translate the traditional Hebrew peace greeting שָׁלוֹם עֲלֵיכֶם:',
    hebrew: 'שָׁלוֹם עֲלֵיכֶם',
    options: ['"praise to the LORD"', '"grace and truth to you"', '"peace be upon you"', '"glory to God on high"'],
    correctIndex: 2,
    explanation: 'שָׁלוֹם ("peace / wholeness") + עֲלֵיכֶם ("upon you [mp]") = "peace be upon you".',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Exam-only vocabulary replacements (6 items: Chapters 29-35 & Synonym Pairs)
// ═══════════════════════════════════════════════════════════════════════════════

const class13ExamVocabReplacements: PracticeMCQ[] = [
  {
    id: 'c13-fe-v01',
    question: 'What does the noun דּוֹר mean?',
    hebrew: 'דּוֹר',
    options: ['generation, age', 'council, assembly', 'boundary, border', 'custom, tradition'],
    correctIndex: 0,
    explanation: 'דּוֹר is a generation, and so an age or period. דּוֹר וָדוֹר, "generation after generation", is the idiom for perpetuity.',
  },
  {
    id: 'c13-fe-v02',
    question: 'What does the verb כָּסָה mean?',
    hebrew: 'כָּסָה',
    options: ['to reveal, uncover', 'to cover, conceal', 'to lift, raise up', 'to break, crush'],
    correctIndex: 1,
    explanation: 'כָּסָה is to cover, mostly in the Piel: the waters covered the mountains (Genesis 7:19), and love covers every offence (Proverbs 10:12).',
  },
  {
    id: 'c13-fe-v03',
    question: 'What does the noun נַעַר mean?',
    hebrew: 'נַעַר',
    options: ['elder, greybeard', 'boy, youth, servant', 'craftsman, artisan', 'stranger, foreigner'],
    correctIndex: 1,
    explanation: 'נַעַר covers a wide span, from a young child to a marriageable young man, and it is also the word for a servant or armour-bearer.',
  },
  {
    id: 'c13-fe-v04',
    question: 'How do the offering words מִנְחָה and תְּרוּמָה differ?',
    hebrew: 'מִנְחָה vs. תְּרוּמָה',
    options: [
      'מִנְחָה is a gift or tribute; תְּרוּמָה is what is set apart',
      'תְּרוּמָה is a gift of grain; מִנְחָה is a blood sacrifice',
      'both words denote the daily burnt offering alone',
      'מִנְחָה is paid to a king; תְּרוּמָה is paid to an enemy',
    ],
    correctIndex: 0,
    explanation: 'מִנְחָה is a present, tribute to a superior, or the grain offering. תְּרוּמָה is a contribution lifted out of a larger whole and given over — hence the older rendering "heave offering".',
  },
  {
    id: 'c13-fe-v05',
    question: 'What does the verb נָגַע mean?',
    hebrew: 'נָגַע',
    options: ['to hear, listen, obey', 'to taste, eat, consume', 'to touch, reach, strike', 'to smell, sense, perceive'],
    correctIndex: 2,
    explanation: 'נָגַע is to touch — and so to reach a place, or to strike, as a plague strikes. Its noun נֶגַע is a plague or a mark of disease.',
  },
  {
    id: 'c13-fe-v06',
    question: 'What does the verb מָשַׁח mean (the root of מָשִׁיחַ)?',
    hebrew: 'מָשַׁח',
    options: ['to reign / rule', 'to reject / despise', 'to anoint / smear', 'to deliver / rescue'],
    correctIndex: 2,
    explanation: 'מָשַׁח means to smear or anoint with holy oil; from which comes מָשִׁיחַ ("Anointed One / Messiah").',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Exam-only verse analysis replacement (Genesis 22:1 — a Piel that looks like a Niphal)
// ═══════════════════════════════════════════════════════════════════════════════

const class13ExamVerseAnalysisReplacement: PracticeVerseAnalysis = {
  id: 'c13-fe-va01',
  reference: 'Genesis 22:1',
  hebrew: 'וַיְהִי אַחַר הַדְּבָרִים הָאֵלֶּה וְהָאֱלֹהִים נִסָּה אֶת־אַבְרָהָם',
  transliteration: 'way·hî ʾa·ḥar had·də·ḇā·rîm hā·ʾēl·leh wə·hā·ʾĕ·lō·hîm nis·sāh ʾeṯ-ʾaḇ·rā·hām',
  referenceTranslation: 'After these things God tested Abraham.',
  keyTerms: ['after', 'these', 'things', 'God', 'tested', 'Abraham'],
  matchingPairs: [
    { hebrew: 'וַיְהִי', category: 'Waw Consecutive + Qal Imperfect 3ms, III-ה, shortened (Ch 17)' },
    { hebrew: 'אַחַר', category: 'Independent preposition, "after" (Ch 6)' },
    { hebrew: 'הַדְּבָרִים הָאֵלֶּה', category: 'Article + noun + demonstrative, "these things" (Ch 8)' },
    { hebrew: 'נִסָּה', category: 'Piel Perfect 3ms, III-ה — the נ is a root letter (Ch 30, 31)' },
    { hebrew: 'אֶת־אַבְרָהָם', category: 'Object marker + proper noun (Ch 6)' },
  ],
  distractorCategories: [
    'Niphal Perfect 3ms, III-ה (Ch 25)',
    'Hithpael Perfect 3ms (Ch 34)',
    'Construct chain, masculine plural (Ch 10)',
    'Qal Infinitive Construct (Ch 20)',
  ],
};

// Compose the exam: 30 practice + 10 new = 40 grammar; 34 + 6 = 40 vocab; 4 + 1 = 5 verse.
export const class13ExamGrammarQuestions: PracticeMCQ[] = [
  ...class13GrammarQuestions.slice(0, 30),
  ...class13ExamGrammarReplacements,
];

export const class13ExamVocabQuestions: PracticeMCQ[] = [
  ...class13VocabQuestions.slice(0, 34),
  ...class13ExamVocabReplacements,
];

export const class13ExamVerseAnalysisQuestions: PracticeVerseAnalysis[] = [
  ...class13VerseAnalysisQuestions.slice(0, 4),
  class13ExamVerseAnalysisReplacement,
];

export const CLASS13_EXAM_SECTIONS = [
  { id: 1, title: 'Grammar', questionCount: class13ExamGrammarQuestions.length, description: 'Parse forms and identify binyan/syntactic structures from Chapters 1-35' },
  { id: 2, title: 'Vocabulary', questionCount: class13ExamVocabQuestions.length, description: 'High-frequency vocabulary and synonym discriminations from Chapters 1-35' },
  { id: 3, title: 'Verse Analysis', questionCount: class13ExamVerseAnalysisQuestions.length, description: 'Match Hebrew words to grammatical categories and translate' },
] as const;
