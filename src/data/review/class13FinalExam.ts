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
 * Vocab drops the last six practice items and swaps in six unseen items (including
 * advanced Chapter 29-35 vocabulary and synonym discriminations).
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
    question: 'Read and parse the narrative clause וַיֹּאמֶר אֱלֹהִים:',
    hebrew: 'וַיֹּאמֶר אֱלֹהִים',
    options: [
      'Qal wayyiqtol 3ms ("and God said")',
      'Qal perfect 3ms ("God rested")',
      'Piel wayyiqtol 3ms ("and God spoke")',
      'Qal imperfect 3ms ("God will say")',
    ],
    correctIndex: 0,
    explanation: 'וַיֹּאמֶר אֱלֹהִים = "and God said" — the recurrent Wayyiqtol formula opening creative fiats.',
  },
  {
    id: 'c13-fe-g02',
    question: 'Read and identify the mood of יְהִי אוֹר (Genesis 1:3):',
    hebrew: 'יְהִי אוֹר',
    options: [
      'Qal perfect 3ms ("there was light")',
      'Qal jussive 3ms ("let there be light")',
      'Qal imperative 2ms ("make light")',
      'Hiphil imperfect 3ms ("he made light")',
    ],
    correctIndex: 1,
    explanation: 'יְהִי is the apocopated Qal Jussive 3ms expressing divine fiat: "let there be light".',
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
    question: 'What is the meaning of the noun תְּפִלָּה (derived from the root פָּלַל)?',
    hebrew: 'תְּפִלָּה',
    options: ['prophetic instruction', 'prayer / intercession', 'covenant offering', 'chastisement / rebuke'],
    correctIndex: 1,
    explanation: 'תְּפִלָּה means prayer or petition; derived from the Hithpael verb הִתְפַּלֵּל ("to pray").',
  },
  {
    id: 'c13-fe-v02',
    question: 'What is the meaning of the noun צָרָה in biblical laments and narratives?',
    hebrew: 'צָרָה',
    options: ['adversary / enemy', 'distress / anguish', 'righteousness / purity', 'refuge / stronghold'],
    correctIndex: 1,
    explanation: 'צָרָה denotes distress, dire straits, or tribulation; related to the root צָרַר ("to be in tight straits").',
  },
  {
    id: 'c13-fe-v03',
    question: 'What does the noun מִקְדָּשׁ mean?',
    hebrew: 'מִקְדָּשׁ',
    options: ['sanctuary / holy place', 'royal grazing pasture', 'eastern boundary line', 'sacrificial flock'],
    correctIndex: 0,
    explanation: 'מִקְדָּשׁ (prefixed with מ- of place from root קָדַשׁ) means sanctuary or holy place.',
  },
  {
    id: 'c13-fe-v04',
    question: 'How do the synonyms צַדִּיק and יָשָׁר differ in biblical nuance?',
    hebrew: 'צַדִּיק vs. יָשָׁר',
    options: [
      'צַדִּיק is wicked; יָשָׁר is righteous',
      'צַדִּיק is covenant justice; יָשָׁר is moral straightness',
      'יָשָׁר is for God only; צַדִּיק is for angels only',
      'there is no distinction in Hebrew wisdom literature',
    ],
    correctIndex: 1,
    explanation: 'צַדִּיק highlights covenant loyalty and legal righteousness, whereas יָשָׁר emphasizes integrity, straightness, and upright conduct.',
  },
  {
    id: 'c13-fe-v05',
    question: 'How do the communication nouns קוֹל and דָּבָר differ in nuance?',
    hebrew: 'קוֹל vs. דָּבָר',
    options: [
      'דָּבָר is musical melody; קוֹל is written script',
      'קוֹל is a verb; דָּבָר is an adjective in Hebrew grammar',
      'both terms strictly denote inanimate physical objects',
      'קוֹל is audible sound/voice; דָּבָר is spoken word/matter',
    ],
    correctIndex: 3,
    explanation: 'קוֹל denotes audible sound, voice, or thunder; דָּבָר denotes intelligible word, message, matter, or event.',
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
// Exam-only verse analysis replacement (Genesis 5:24 with Hithpael)
// ═══════════════════════════════════════════════════════════════════════════════

const class13ExamVerseAnalysisReplacement: PracticeVerseAnalysis = {
  id: 'c13-fe-va01',
  reference: 'Genesis 5:24',
  hebrew: 'וַיִּתְהַלֵּךְ חֲנוֹךְ אֶת־הָאֱלֹהִים',
  transliteration: 'way·yiṯ·hal·lêḵ ḥă·nôḵ ʾet-hā·ʾĕ·lō·hîm',
  referenceTranslation: 'And Enoch walked with God.',
  keyTerms: ['walked', 'Enoch', 'God', 'with'],
  matchingPairs: [
    { hebrew: 'וַיִּתְהַלֵּךְ', category: 'Waw Consecutive + Hithpael Imperfect 3ms (Ch 17, 34)' },
    { hebrew: 'יִתְ־', category: 'Hithpael Imperfect preformative, 3ms (Ch 34)' },
    { hebrew: 'חֲנוֹךְ', category: 'Proper noun, subject following the verb (Ch 23)' },
    { hebrew: 'אֶת־', category: 'Preposition "with" — not the object marker here (Ch 6)' },
    { hebrew: 'הָאֱלֹהִים', category: 'Article with compensatory lengthening + noun (Ch 5)' },
  ],
  distractorCategories: [
    'Niphal Perfect 3ms (Ch 24)',
    'Definite direct object marker (Ch 6)',
    'Qal Infinitive Construct (Ch 20)',
    'Hophal Participle ms (Ch 28)',
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
