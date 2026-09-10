import type {
  TransliterationQuestion,
  MCQQuestion,
} from '@/types/homework';

// =============================================================================
// SECTION 1: Hebrew Alphabet - Individual Letters (27 questions)
// Test each letter of the Hebrew alphabet including final forms
// =============================================================================

const section1BaseQuestions: TransliterationQuestion[] = [
  // Regular letters (22)
  {
    id: 's1-q1',
    type: 'transliteration',
    hebrew: 'א',
    answer: '',
    variants: ['aleph', "'"],
    gloss: 'Aleph (silent/glottal stop)',
  },
  {
    id: 's1-q2',
    type: 'transliteration',
    hebrew: 'בּ',
    answer: 'b',
    variants: ['v'],
    gloss: 'Bet (with dagesh)',
  },
  {
    id: 's1-q3',
    type: 'transliteration',
    hebrew: 'ב',
    answer: 'v',
    variants: ['b', 'bh'],
    gloss: 'Vet (without dagesh)',
  },
  {
    id: 's1-q4',
    type: 'transliteration',
    hebrew: 'ג',
    answer: 'g',
    variants: [],
    gloss: 'Gimel',
  },
  {
    id: 's1-q5',
    type: 'transliteration',
    hebrew: 'ד',
    answer: 'd',
    variants: [],
    gloss: 'Dalet',
  },
  {
    id: 's1-q6',
    type: 'transliteration',
    hebrew: 'ה',
    answer: 'h',
    variants: [],
    gloss: 'He',
  },
  {
    id: 's1-q7',
    type: 'transliteration',
    hebrew: 'ו',
    answer: 'w',
    variants: ['v', 'u', 'o'],
    gloss: 'Waw (consonant or vowel letter)',
  },
  {
    id: 's1-q8',
    type: 'transliteration',
    hebrew: 'ז',
    answer: 'z',
    variants: [],
    gloss: 'Zayin',
  },
  {
    id: 's1-q9',
    type: 'transliteration',
    hebrew: 'ח',
    answer: 'ch',
    variants: ['h', 'kh'],
    gloss: 'Chet (guttural)',
  },
  {
    id: 's1-q10',
    type: 'transliteration',
    hebrew: 'ט',
    answer: 't',
    variants: [],
    gloss: 'Tet (emphatic)',
  },
  {
    id: 's1-q11',
    type: 'transliteration',
    hebrew: 'י',
    answer: 'y',
    variants: ['i', 'j'],
    gloss: 'Yod (consonant or vowel letter)',
  },
  {
    id: 's1-q12',
    type: 'transliteration',
    hebrew: 'כּ',
    answer: 'k',
    variants: ['c'],
    gloss: 'Kaf (with dagesh)',
  },
  {
    id: 's1-q13',
    type: 'transliteration',
    hebrew: 'כ',
    answer: 'kh',
    variants: ['ch', 'k'],
    gloss: 'Khaf (without dagesh)',
  },
  {
    id: 's1-q14',
    type: 'transliteration',
    hebrew: 'ל',
    answer: 'l',
    variants: [],
    gloss: 'Lamed',
  },
  {
    id: 's1-q15',
    type: 'transliteration',
    hebrew: 'מ',
    answer: 'm',
    variants: [],
    gloss: 'Mem',
  },
  {
    id: 's1-q16',
    type: 'transliteration',
    hebrew: 'נ',
    answer: 'n',
    variants: [],
    gloss: 'Nun',
  },
  {
    id: 's1-q17',
    type: 'transliteration',
    hebrew: 'ס',
    answer: 's',
    variants: [],
    gloss: 'Samekh',
  },
  {
    id: 's1-q18',
    type: 'transliteration',
    hebrew: 'ע',
    answer: '',
    variants: ['ayin', "'"],
    gloss: 'Ayin (guttural)',
  },
  {
    id: 's1-q19',
    type: 'transliteration',
    hebrew: 'פּ',
    answer: 'p',
    variants: [],
    gloss: 'Pe (with dagesh)',
  },
  {
    id: 's1-q20',
    type: 'transliteration',
    hebrew: 'פ',
    answer: 'f',
    variants: ['ph', 'p'],
    gloss: 'Fe (without dagesh)',
  },
  {
    id: 's1-q21',
    type: 'transliteration',
    hebrew: 'צ',
    answer: 'ts',
    variants: ['tz', 's'],
    gloss: 'Tsade (emphatic)',
  },
  {
    id: 's1-q22',
    type: 'transliteration',
    hebrew: 'ק',
    answer: 'q',
    variants: ['k'],
    gloss: 'Qof (emphatic)',
  },
  {
    id: 's1-q23',
    type: 'transliteration',
    hebrew: 'ר',
    answer: 'r',
    variants: [],
    gloss: 'Resh',
  },
  {
    id: 's1-q24',
    type: 'transliteration',
    hebrew: 'שׁ',
    answer: 'sh',
    variants: [],
    gloss: 'Shin (right dot)',
  },
  {
    id: 's1-q25',
    type: 'transliteration',
    hebrew: 'שׂ',
    answer: 's',
    variants: [],
    gloss: 'Sin (left dot)',
  },
  {
    id: 's1-q26',
    type: 'transliteration',
    hebrew: 'ת',
    answer: 't',
    variants: ['th'],
    gloss: 'Tav',
  },
  // Final forms (5)
  {
    id: 's1-q27',
    type: 'transliteration',
    hebrew: 'ך',
    answer: 'kh',
    variants: ['ch', 'k'],
    gloss: 'Final Khaf',
  },
  {
    id: 's1-q28',
    type: 'transliteration',
    hebrew: 'ם',
    answer: 'm',
    variants: [],
    gloss: 'Final Mem',
  },
  {
    id: 's1-q29',
    type: 'transliteration',
    hebrew: 'ן',
    answer: 'n',
    variants: [],
    gloss: 'Final Nun',
  },
  {
    id: 's1-q30',
    type: 'transliteration',
    hebrew: 'ף',
    answer: 'f',
    variants: ['ph', 'p'],
    gloss: 'Final Fe',
  },
  {
    id: 's1-q31',
    type: 'transliteration',
    hebrew: 'ץ',
    answer: 'ts',
    variants: ['tz', 's'],
    gloss: 'Final Tsade',
  },
];

const alphabetTransliterationChoices = [
  'ʾ (aleph / silent)', 'ʿ (ayin)', 'b', 'v', 'g', 'd', 'h', 'w', 'z', 'ch',
  't', 'y', 'k', 'kh', 'l', 'm', 'n', 's', 'p', 'f', 'ts', 'q', 'r', 'sh',
];

const section1QuestionsWithOptions: TransliterationQuestion[] = section1BaseQuestions.map((question, index) => {
  const correct = question.gloss?.startsWith('Aleph')
    ? 'ʾ (aleph / silent)'
    : question.gloss?.startsWith('Ayin')
      ? 'ʿ (ayin)'
      : question.answer;
  const excluded = new Set([correct, question.answer, ...question.variants]);
  const availableDistractors = alphabetTransliterationChoices.filter((choice) => !excluded.has(choice));
  const distractors = [0, 1, 2].map(
    (offset) => availableDistractors[(index * 3 + offset) % availableDistractors.length]
  );
  const correctIndex = index % 4;
  const options = [...distractors];
  options.splice(correctIndex, 0, correct);

  return {
    ...question,
    transliterationOptions: options,
    transliterationCorrectIndex: correctIndex,
  };
});

function seededShuffle<T>(items: T[], seed: number): T[] {
  const shuffled = [...items];
  let state = seed >>> 0;

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

// Keep a stable shuffled order so students cannot rely on Aleph-to-Tav sequence,
// while the current question never jumps around during an active attempt.
export const section1Questions = seededShuffle(section1QuestionsWithOptions, 0x484231);

// =============================================================================
// SECTION 2: Hebrew Words - Full Alphabet Coverage (16 two-stage questions)
// Each item tests transliteration recognition before its English meaning.
// =============================================================================

export const section2Questions: TransliterationQuestion[] = [
  {
    id: 's2-q1',
    type: 'transliteration',
    hebrew: 'אֱלֹהִים',
    answer: 'elohim',
    variants: ['elohiym'],
    gloss: 'God, gods (covers: א, ל, ה, י, ם)',
    meaning: 'God, gods',
    transliterationOptions: ['shalom', 'elohim', 'melek', 'torah'], transliterationCorrectIndex: 1,
    meaningOptions: ['God, gods', 'peace', 'king', 'law, instruction'], meaningCorrectIndex: 0,
  },
  {
    id: 's2-q2',
    type: 'transliteration',
    hebrew: 'יְהוָה',
    answer: 'yhwh',
    variants: ['yahweh', 'yehovah', 'adonai'],
    gloss: 'LORD (Tetragrammaton)',
    meaning: 'LORD',
    transliterationOptions: ['ruach', 'yhwh', 'qodesh', 'dabar'], transliterationCorrectIndex: 1,
    meaningOptions: ['prophet', 'LORD', 'spirit, wind', 'holiness'], meaningCorrectIndex: 1,
  },
  {
    id: 's2-q3',
    type: 'transliteration',
    hebrew: 'שָׁלוֹם',
    answer: 'shalom',
    variants: ['shalowm'],
    gloss: 'peace (covers: שׁ, ל, ו, ם)',
    meaning: 'peace',
    transliterationOptions: ['shalom', 'chesed', 'nefesh', 'kohen'], transliterationCorrectIndex: 0,
    meaningOptions: ['priest', 'peace', 'soul, life', 'steadfast love'], meaningCorrectIndex: 1,
  },
  {
    id: 's2-q4',
    type: 'transliteration',
    hebrew: 'דָּבָר',
    answer: 'dabar',
    variants: ['davar'],
    gloss: 'word, thing (covers: ד, ב, ר)',
    meaning: 'word, thing',
    transliterationOptions: ['meshiach', 'dabar', 'bayit', 'dagesh'], transliterationCorrectIndex: 1,
    meaningOptions: ['king', 'word, thing', 'daughter', 'righteousness'], meaningCorrectIndex: 1,
  },
  {
    id: 's2-q5',
    type: 'transliteration',
    hebrew: 'מֶלֶךְ',
    answer: 'melek',
    variants: ['melekh'],
    gloss: 'king (covers: מ, ל, ך)',
    meaning: 'king',
    transliterationOptions: ['melek', 'navi', 'ben', 'am'], transliterationCorrectIndex: 0,
    meaningOptions: ['people', 'king', 'son', 'prophet'], meaningCorrectIndex: 1,
  },
  {
    id: 's2-q6',
    type: 'transliteration',
    hebrew: 'עַם',
    answer: 'am',
    variants: [],
    gloss: 'people (covers: ע, ם)',
    meaning: 'people',
    transliterationOptions: ['bat', 'am', 'ruach', 'qodesh'], transliterationCorrectIndex: 1,
    meaningOptions: ['daughter', 'people', 'spirit, wind', 'holiness'], meaningCorrectIndex: 1,
  },
  {
    id: 's2-q7',
    type: 'transliteration',
    hebrew: 'קֹדֶשׁ',
    answer: 'qodesh',
    variants: ['kodesh'],
    gloss: 'holiness (covers: ק, ד, שׁ)',
    meaning: 'holiness',
    transliterationOptions: ['qodesh', 'tsedeq', 'chesed', 'torah'], transliterationCorrectIndex: 0,
    meaningOptions: ['righteousness', 'steadfast love', 'holiness', 'law, instruction'], meaningCorrectIndex: 2,
  },
  {
    id: 's2-q8',
    type: 'transliteration',
    hebrew: 'צֶדֶק',
    answer: 'tsedeq',
    variants: ['tsedek', 'zedek'],
    gloss: 'righteousness (covers: צ, ד, ק)',
    meaning: 'righteousness',
    transliterationOptions: ['kohen', 'tsedeq', 'nefesh', 'elohim'], transliterationCorrectIndex: 1,
    meaningOptions: ['priest', 'soul, life', 'righteousness', 'God, gods'], meaningCorrectIndex: 2,
  },
  {
    id: 's2-q9',
    type: 'transliteration',
    hebrew: 'חֶסֶד',
    answer: 'chesed',
    variants: ['hesed', 'khesed'],
    gloss: 'steadfast love (covers: ח, ס, ד)',
    meaning: 'steadfast love',
    transliterationOptions: ['chesed', 'shalom', 'dabar', 'navi'], transliterationCorrectIndex: 0,
    meaningOptions: ['peace', 'steadfast love', 'word, thing', 'prophet'], meaningCorrectIndex: 1,
  },
  {
    id: 's2-q10',
    type: 'transliteration',
    hebrew: 'תּוֹרָה',
    answer: 'torah',
    variants: ['towrah'],
    gloss: 'law, instruction (covers: תּ, ו, ר, ה)',
    meaning: 'law, instruction',
    transliterationOptions: ['torah', 'ruach', 'bat', 'am'], transliterationCorrectIndex: 0,
    meaningOptions: ['law, instruction', 'spirit, wind', 'daughter', 'people'], meaningCorrectIndex: 0,
  },
  {
    id: 's2-q11',
    type: 'transliteration',
    hebrew: 'נֶפֶשׁ',
    answer: 'nefesh',
    variants: ['nephesh'],
    gloss: 'soul, life (covers: נ, פ, שׁ)',
    meaning: 'soul, life',
    transliterationOptions: ['nefesh', 'melek', 'qodesh', 'ben'], transliterationCorrectIndex: 0,
    meaningOptions: ['king', 'holiness', 'soul, life', 'son'], meaningCorrectIndex: 2,
  },
  {
    id: 's2-q12',
    type: 'transliteration',
    hebrew: 'רוּחַ',
    answer: 'ruach',
    variants: ['ruakh'],
    gloss: 'spirit, wind (covers: ר, ו, ח)',
    meaning: 'spirit, wind',
    transliterationOptions: ['ruach', 'chesed', 'kohen', 'tsedeq'], transliterationCorrectIndex: 0,
    meaningOptions: ['steadfast love', 'priest', 'righteousness', 'spirit, wind'], meaningCorrectIndex: 3,
  },
  {
    id: 's2-q13',
    type: 'transliteration',
    hebrew: 'בֵּן',
    answer: 'ben',
    variants: [],
    gloss: 'son (covers: בּ, ן)',
    meaning: 'son',
    transliterationOptions: ['ben', 'bat', 'navi', 'dabar'], transliterationCorrectIndex: 0,
    meaningOptions: ['daughter', 'prophet', 'word, thing', 'son'], meaningCorrectIndex: 3,
  },
  {
    id: 's2-q14',
    type: 'transliteration',
    hebrew: 'בַּת',
    answer: 'bat',
    variants: [],
    gloss: 'daughter (covers: בּ, ת)',
    meaning: 'daughter',
    transliterationOptions: ['am', 'bat', 'torah', 'qodesh'], transliterationCorrectIndex: 1,
    meaningOptions: ['law, instruction', 'daughter', 'people', 'holiness'], meaningCorrectIndex: 1,
  },
  {
    id: 's2-q15',
    type: 'transliteration',
    hebrew: 'כֹּהֵן',
    answer: 'kohen',
    variants: ['cohen'],
    gloss: 'priest (covers: כּ, ה, ן)',
    meaning: 'priest',
    transliterationOptions: ['kohen', 'navi', 'elohim', 'shalom'], transliterationCorrectIndex: 0,
    meaningOptions: ['God, gods', 'priest', 'peace', 'prophet'], meaningCorrectIndex: 1,
  },
  {
    id: 's2-q16',
    type: 'transliteration',
    hebrew: 'נָבִיא',
    answer: 'navi',
    variants: ['nabiy'],
    gloss: 'prophet (covers: נ, ב, י, א)',
    meaning: 'prophet',
    transliterationOptions: ['navi', 'nefesh', 'melek', 'ruach'], transliterationCorrectIndex: 0,
    meaningOptions: ['soul, life', 'king', 'spirit, wind', 'prophet'], meaningCorrectIndex: 3,
  },
];

// =============================================================================
// SECTION 3: Grammar Terms MCQ (10 questions)
// Universal grammar with Hebrew examples
// =============================================================================

export const section3Questions: MCQQuestion[] = [
  {
    id: 's3-q1',
    type: 'mcq',
    question: 'What is a noun?',
    options: [
      'A word that names a person, place, thing, or idea',
      'A word that describes an action',
      'A word that modifies a verb',
      'A word that connects clauses',
    ],
    correctIndex: 0,
    explanation: 'A noun is a naming word. Examples: "God" (אֱלֹהִים), "word" (דָּבָר), "peace" (שָׁלוֹם).',
    category: 'noun',
  },
  {
    id: 's3-q2',
    type: 'mcq',
    question: 'What is a verb?',
    options: [
      'A word that replaces a noun',
      'A word that expresses action, occurrence, or state of being',
      'A word that shows location',
      'A word that names something',
    ],
    correctIndex: 1,
    explanation: 'Verbs express actions or states. Examples: "he said" (אָמַר), "he was" (הָיָה), "he kept" (שָׁמַר).',
    category: 'verb',
  },
  {
    id: 's3-q3',
    type: 'mcq',
    question: 'What is an adjective?',
    options: [
      'A word that connects sentences',
      'A word that replaces a noun',
      'A word that describes or modifies a noun',
      'A word that expresses action',
    ],
    correctIndex: 2,
    explanation: 'Adjectives describe nouns. Examples: "good" (טוֹב), "holy" (קָדוֹשׁ), "great" (גָּדוֹל).',
    category: 'adjective',
  },
  {
    id: 's3-q4',
    type: 'mcq',
    question: 'What is an adverb?',
    options: [
      'A word that modifies a verb, adjective, or other adverb',
      'A word that names a person',
      'A word that shows possession',
      'A word that connects nouns',
    ],
    correctIndex: 0,
    explanation: 'Adverbs modify verbs, adjectives, or other adverbs. Examples: "very" (מְאֹד), "now" (עַתָּה).',
    category: 'adverb',
  },
  {
    id: 's3-q5',
    type: 'mcq',
    question: 'What is a pronoun?',
    options: [
      'A word that describes an action',
      'A word that shows time',
      'A word that replaces a noun',
      'A word that expresses emotion',
    ],
    correctIndex: 2,
    explanation: 'Pronouns replace nouns to avoid repetition. Examples: "I" (אֲנִי), "you" (אַתָּה), "he" (הוּא).',
    category: 'pronoun',
  },
  {
    id: 's3-q6',
    type: 'mcq',
    question: 'What is the definite article in Hebrew?',
    options: [
      'A suffix added to verbs',
      'The prefix הַ (ha-)',
      'A standalone particle',
      'A vowel marker on nouns',
    ],
    correctIndex: 1,
    explanation: 'Hebrew has the definite article הַ (ha-) prefixed to nouns. Hebrew has no indefinite article ("a/an").',
    category: 'article',
  },
  {
    id: 's3-q7',
    type: 'mcq',
    question: 'What is a preposition?',
    options: [
      'A word that describes a noun',
      'A word that shows relationship between words',
      'A word that replaces a verb',
      'A word that expresses a question',
    ],
    correctIndex: 1,
    explanation: 'Prepositions show relationships. Examples: "in" (בְּ), "to" (לְ), "from" (מִן), "with" (עִם).',
    category: 'preposition',
  },
  {
    id: 's3-q8',
    type: 'mcq',
    question: 'What is a conjunction?',
    options: [
      'A word that ends a sentence',
      'A word that describes a verb',
      'A word that connects words, phrases, or clauses',
      'A word that shows ownership',
    ],
    correctIndex: 2,
    explanation: 'Conjunctions connect elements. Examples: "and" (וְ), "but" (אֲבָל), "for, because" (כִּי).',
    category: 'conjunction',
  },
  {
    id: 's3-q9',
    type: 'mcq',
    question: 'What is a participle?',
    options: [
      'A verb form that functions as an adjective or noun',
      'A word that expresses ownership',
      'A word that asks questions',
      'A word that shows time',
    ],
    correctIndex: 0,
    explanation: 'Participles are verbal adjectives/nouns, often translated with "-ing" or "one who". Example: "saying/one who says" (אֹמֵר).',
    category: 'participle',
  },
  {
    id: 's3-q10',
    type: 'mcq',
    question: 'What is an infinitive?',
    options: [
      'A finite verb with person and number',
      'A verbal noun without person and number',
      'A word that only appears at the end of sentences',
      'A word that replaces an adjective',
    ],
    correctIndex: 1,
    explanation: 'Infinitives are verbal nouns. Hebrew has infinitive construct (לִשְׁמֹר "to keep") and infinitive absolute (שָׁמוֹר for emphasis).',
    category: 'infinitive',
  },
];

// =============================================================================
// SECTION 4: Construct State MCQ (5 questions)
// Hebrew-specific grammatical concept
// =============================================================================

export const section4Questions: MCQQuestion[] = [
  {
    id: 's4-q1',
    type: 'mcq',
    question: 'What is the "construct state" (סְמִיכוּת) in Hebrew?',
    options: [
      'A verb form showing past action',
      'A way to link two nouns to show possession or relationship',
      'A type of Hebrew vowel pointing',
      'The plural form of Hebrew nouns',
    ],
    correctIndex: 1,
    explanation: 'The construct state links nouns: דְּבַר־יְהוָה (devar-YHWH) = "word of the LORD". The first noun is in construct form, the second in absolute.',
    category: 'construct',
  },
  {
    id: 's4-q2',
    type: 'mcq',
    question: 'In the phrase בֵּן־הַמֶּלֶךְ (ben-hammelekh, "son of the king"), which word is in the construct state?',
    options: [
      'הַמֶּלֶךְ (the second word)',
      'בֵּן (the first word)',
      'Both words',
      'Neither word',
    ],
    correctIndex: 1,
    explanation: 'The first noun (בֵּן) is in construct state. The second noun (הַמֶּלֶךְ) is in absolute state and receives the article.',
    category: 'construct',
  },
  {
    id: 's4-q3',
    type: 'mcq',
    question: 'How does the definite article work in a construct chain?',
    options: [
      'It attaches to the first noun (construct)',
      'It attaches to the last noun (absolute), making the whole chain definite',
      'It attaches to both nouns',
      'Hebrew construct chains cannot be definite',
    ],
    correctIndex: 1,
    explanation: 'The article attaches to the absolute noun (last word). בֵּית הַמֶּלֶךְ = "THE house of THE king" - one article makes both definite.',
    category: 'construct',
  },
  {
    id: 's4-q4',
    type: 'mcq',
    question: 'What typically happens to the vowels of a noun when it enters the construct state?',
    options: [
      'The vowels become longer',
      'The vowels often shorten or reduce',
      'The vowels stay exactly the same',
      'All vowels are removed',
    ],
    correctIndex: 1,
    explanation: 'Construct nouns often have shortened vowels. Example: דָּבָר (davar, absolute) → דְּבַר (devar, construct). The accent shifts forward.',
    category: 'construct',
  },
  {
    id: 's4-q5',
    type: 'mcq',
    question: 'Which phrase correctly uses the construct state to say "the word of God"?',
    hebrew: 'Choose the correct form',
    options: [
      'הַדָּבָר שֶׁל אֱלֹהִים (using a preposition)',
      'דְּבַר אֱלֹהִים (construct chain)',
      'דָּבָר אֱלֹהִים (both in absolute)',
      'הַדְּבַר הָאֱלֹהִים (both with articles)',
    ],
    correctIndex: 1,
    explanation: 'Biblical Hebrew uses construct chains: דְּבַר אֱלֹהִים (devar elohim). The first noun is construct form (shortened vowel), the second is absolute.',
    category: 'construct',
  },
];

// =============================================================================
// SECTION 5: Binyan Identification MCQ (24 questions)
// Identify the verb stem (binyan) of Hebrew verb forms
// =============================================================================

// Helper to create binyan identification questions
const createBinyanQuestion = (
  id: string,
  hebrew: string,
  root: string,
  binyan: string,
  translation: string,
  wrongBinyanim: string[]
): MCQQuestion => {
  const correctAnswer = binyan;

  // Ensure we have exactly 3 wrong options
  const wrongOptions = wrongBinyanim.slice(0, 3);
  while (wrongOptions.length < 3) {
    const allBinyanim = ['Qal', 'Niphal', 'Piel', 'Pual', 'Hiphil', 'Hophal', 'Hithpael'];
    for (const b of allBinyanim) {
      if (b !== binyan && !wrongOptions.includes(b)) {
        wrongOptions.push(b);
        break;
      }
    }
  }

  // Deterministic option placement based on ID
  const idNum = parseInt(id.replace('s5-q', ''));
  const correctIndex = idNum % 4;

  const options = [...wrongOptions];
  options.splice(correctIndex, 0, correctAnswer);

  return {
    id,
    type: 'mcq',
    question: `What binyan (verb stem) is this verb form?`,
    hebrew,
    options,
    correctIndex,
    explanation: `${hebrew} (root: ${root}, "${translation}") is in the ${binyan} stem.`,
    category: binyan.toLowerCase(),
  };
};

export const section5Questions: MCQQuestion[] = [
  // Qal (simple active) - 4 questions
  createBinyanQuestion(
    's5-q1',
    'שָׁמַר',
    'שׁמר',
    'Qal',
    'he kept/guarded',
    ['Niphal', 'Piel', 'Hiphil']
  ),
  createBinyanQuestion(
    's5-q2',
    'כָּתַב',
    'כתב',
    'Qal',
    'he wrote',
    ['Niphal', 'Pual', 'Hithpael']
  ),
  createBinyanQuestion(
    's5-q3',
    'יָשַׁב',
    'ישׁב',
    'Qal',
    'he sat/dwelt',
    ['Hiphil', 'Hophal', 'Piel']
  ),
  createBinyanQuestion(
    's5-q4',
    'אָמַר',
    'אמר',
    'Qal',
    'he said',
    ['Niphal', 'Hiphil', 'Pual']
  ),

  // Niphal (simple passive/reflexive) - 3 questions
  createBinyanQuestion(
    's5-q5',
    'נִשְׁמַר',
    'שׁמר',
    'Niphal',
    'he was kept/guarded',
    ['Qal', 'Pual', 'Hophal']
  ),
  createBinyanQuestion(
    's5-q6',
    'נִכְתַּב',
    'כתב',
    'Niphal',
    'it was written',
    ['Qal', 'Piel', 'Hiphil']
  ),
  createBinyanQuestion(
    's5-q7',
    'נִלְחַם',
    'לחם',
    'Niphal',
    'he fought',
    ['Qal', 'Hithpael', 'Piel']
  ),

  // Piel (intensive active) - 4 questions
  createBinyanQuestion(
    's5-q8',
    'דִּבֵּר',
    'דבר',
    'Piel',
    'he spoke',
    ['Qal', 'Niphal', 'Hiphil']
  ),
  createBinyanQuestion(
    's5-q9',
    'קִדֵּשׁ',
    'קדשׁ',
    'Piel',
    'he sanctified',
    ['Qal', 'Niphal', 'Hithpael']
  ),
  createBinyanQuestion(
    's5-q10',
    'בִּקֵּשׁ',
    'בקשׁ',
    'Piel',
    'he sought',
    ['Qal', 'Pual', 'Hophal']
  ),
  createBinyanQuestion(
    's5-q11',
    'שִׁלַּח',
    'שׁלח',
    'Piel',
    'he sent away',
    ['Qal', 'Hiphil', 'Niphal']
  ),

  // Pual (intensive passive) - 3 questions
  createBinyanQuestion(
    's5-q12',
    'דֻּבַּר',
    'דבר',
    'Pual',
    'it was spoken',
    ['Piel', 'Niphal', 'Hophal']
  ),
  createBinyanQuestion(
    's5-q13',
    'קֻדַּשׁ',
    'קדשׁ',
    'Pual',
    'it was sanctified',
    ['Piel', 'Qal', 'Hiphil']
  ),
  createBinyanQuestion(
    's5-q14',
    'בֻּקַּשׁ',
    'בקשׁ',
    'Pual',
    'it was sought',
    ['Piel', 'Niphal', 'Qal']
  ),

  // Hiphil (causative active) - 4 questions
  createBinyanQuestion(
    's5-q15',
    'הִשְׁמִיד',
    'שׁמד',
    'Hiphil',
    'he destroyed',
    ['Qal', 'Piel', 'Niphal']
  ),
  createBinyanQuestion(
    's5-q16',
    'הוֹשִׁיב',
    'ישׁב',
    'Hiphil',
    'he caused to sit/settled',
    ['Qal', 'Niphal', 'Piel']
  ),
  createBinyanQuestion(
    's5-q17',
    'הִגִּיד',
    'נגד',
    'Hiphil',
    'he told/declared',
    ['Qal', 'Piel', 'Hithpael']
  ),
  createBinyanQuestion(
    's5-q18',
    'הִמְלִיךְ',
    'מלך',
    'Hiphil',
    'he made king',
    ['Qal', 'Niphal', 'Pual']
  ),

  // Hophal (causative passive) - 3 questions
  createBinyanQuestion(
    's5-q19',
    'הָשְׁמַד',
    'שׁמד',
    'Hophal',
    'he was destroyed',
    ['Hiphil', 'Niphal', 'Pual']
  ),
  createBinyanQuestion(
    's5-q20',
    'הוּגַּד',
    'נגד',
    'Hophal',
    'it was told',
    ['Hiphil', 'Niphal', 'Qal']
  ),
  createBinyanQuestion(
    's5-q21',
    'הָמְלַךְ',
    'מלך',
    'Hophal',
    'he was made king',
    ['Hiphil', 'Niphal', 'Piel']
  ),

  // Hithpael (reflexive/reciprocal) - 3 questions
  createBinyanQuestion(
    's5-q22',
    'הִתְקַדֵּשׁ',
    'קדשׁ',
    'Hithpael',
    'he sanctified himself',
    ['Piel', 'Niphal', 'Qal']
  ),
  createBinyanQuestion(
    's5-q23',
    'הִתְפַּלֵּל',
    'פלל',
    'Hithpael',
    'he prayed',
    ['Piel', 'Niphal', 'Hiphil']
  ),
  createBinyanQuestion(
    's5-q24',
    'הִתְהַלֵּךְ',
    'הלך',
    'Hithpael',
    'he walked about',
    ['Qal', 'Piel', 'Hiphil']
  ),
];

// =============================================================================
// HELPER: Get questions for a section
// =============================================================================

import type { SectionId, HomeworkQuestion } from '@/types/homework';

export function getQuestionsForSection(sectionId: SectionId): HomeworkQuestion[] {
  switch (sectionId) {
    case 1:
      return [...section1Questions, ...section2Questions];
    default:
      return [];
  }
}

export function getQuestionById(sectionId: SectionId, questionId: string): HomeworkQuestion | undefined {
  const questions = getQuestionsForSection(sectionId);
  return questions.find(q => q.id === questionId);
}

export function getTotalQuestions(): number {
  return section1Questions.length + section2Questions.length;
}
