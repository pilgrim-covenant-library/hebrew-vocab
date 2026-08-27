// Class 3 practice — CourseGuide for BBH Chapters 5-7: the definite article
// and conjunction waw, prepositions, and adjectives, plus Ch 5-7 vocabulary
// and a cumulative review of Ch 1-4 vocabulary missed by earlier exercises.

import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function asGroups(questions: PracticeQuestion[]): PracticeQuestionGroup[] {
  return questions.map((question) => ({ id: question.id, questions: [question] }));
}

const articleWawQuestions: PracticeQuestion[] = [
  { id: 'class3-art-1', prompt: 'What is the basic form of the Hebrew definite article?', options: ['הַ plus a Daghesh Forte', 'הֲ plus a Daghesh Lene', 'הָ with no Daghesh', 'הֶ plus a Daghesh Forte'], correctIndex: 0, explanation: 'The article is הַ (He + Pathach) prefixed to the noun with a Daghesh Forte doubling its first consonant: הַסּוּס ("the horse").', category: 'article' },
  { id: 'class3-art-7', prompt: 'Translate this word.', hebrew: 'הַזָּהָב', options: ['the silver', 'the gold', 'a gold ring', 'the sword'], correctIndex: 1, explanation: 'זָהָב (Ch 5) = "gold"; with the article, הַזָּהָב = "the gold." Silver is כֶּסֶף.', category: 'article' },
  { id: 'class3-art-8', prompt: 'Translate this word.', hebrew: 'הַיָּם', options: ['the sea', 'the day', 'the hand', 'a sea'], correctIndex: 0, explanation: 'יָם (Ch 5) = "sea"; הַיָּם = "the sea." Distinguish יוֹם ("day") and יָד ("hand").', category: 'article' },
  { id: 'class3-waw-9', prompt: 'What does the conjunction וְ mean?', options: ['the', 'and, but, also, even', 'in, at', 'like, as'], correctIndex: 1, explanation: 'וְ is the most frequent word in the Hebrew Bible and is always prefixed to the word that follows.', category: 'waw' },
];

const prepositionQuestions: PracticeQuestion[] = [
  { id: 'class3-prep-1', prompt: 'What are the three types of Hebrew prepositions?', options: ['Independent, Maqqef, inseparable', 'Strong, weak, mixed', 'Prefix, infix, suffix', 'Definite, indefinite, construct'], correctIndex: 0, explanation: 'Independent prepositions stand alone; Maqqef prepositions join with ־; inseparable prepositions are prefixed.', category: 'preposition' },
  { id: 'class3-prep-3', prompt: 'What does בְּ mean?', hebrew: 'בְּ', options: ['as, like', 'to, for', 'in, at, with, by', 'from'], correctIndex: 2, explanation: 'בְּ = "in, at, with, by, against" (Ch 6 vocab).', category: 'preposition' },
  { id: 'class3-prep-4', prompt: 'What does לְ mean?', hebrew: 'לְ', options: ['to, toward, for', 'in, at', 'between', 'after'], correctIndex: 0, explanation: 'לְ = "to, toward, for" (Ch 6 vocab). One of the most frequent words in the Hebrew Bible.', category: 'preposition' },
  { id: 'class3-prep-5', prompt: 'Translate this word.', hebrew: 'בַּמָּקוֹם', options: ['in a place', 'in the place', 'from the place', 'to the place'], correctIndex: 1, explanation: 'Pathach + Daghesh Forte after בּ reveals the absorbed article: בְּ + הַמָּקוֹם → בַּמָּקוֹם ("in the place").', category: 'preposition' },
  { id: 'class3-prep-6', prompt: 'Translate this word.', hebrew: 'כְּיֶלֶד', options: ['like the child', 'to a child', 'like a child', 'and a child'], correctIndex: 2, explanation: 'כְּ with plain Shewa and no Daghesh = indefinite: "like a child." "Like the child" would be כַּיֶּלֶד.', category: 'preposition' },
  { id: 'class3-prep-7', prompt: 'What is מִן + סוּס as one word?', hebrew: 'מִן + סוּס', options: ['מִנְסוּס', 'מִסּוּס', 'מֵסוּס', 'מַסּוּס'], correctIndex: 1, explanation: 'The נ of מִן assimilates into the next consonant as a Daghesh Forte: מִסּוּס ("from a horse").', category: 'preposition' },
  { id: 'class3-prep-9', prompt: 'Before a definite noun, אֶת־ functions as:', options: ['the preposition "with"', 'the untranslated marker of a definite direct object', 'the subject marker', 'a plural marker'], correctIndex: 1, explanation: 'אֵת/אֶת־ marks the definite direct object in prose and is never translated. The separate word אֵת can also be a preposition meaning "with, beside."', category: 'preposition' },
  { id: 'class3-prep-10', prompt: 'What does בֵּין mean?', hebrew: 'בֵּין', options: ['between', 'inside', 'after', 'all'], correctIndex: 0, explanation: 'בֵּין = "between" (Ch 6 vocab), as in Gen 1:4.', category: 'preposition' },
  { id: 'class3-prep-11', prompt: 'What does כֹּל mean?', hebrew: 'כֹּל', options: ['few', 'holy', 'between', 'all, each, every'], correctIndex: 3, explanation: 'כֹּל = "all, each, every" (Ch 6 vocab). With מִן it forms the superlative: מִכֹּל = "the most."', category: 'preposition' },
  { id: 'class3-prep-12', prompt: 'What does אַחֲרֵי mean?', hebrew: 'אַחֲרֵי', options: ['after, behind', 'before', 'beside', 'under'], correctIndex: 0, explanation: 'אַחֲרֵי = "after, behind" (Ch 6 vocab). Also common: בְּתוֹךְ "in the midst of" and לְמַעַן "for the sake of."', category: 'preposition' },
];

const adjectiveQuestions: PracticeQuestion[] = [
  { id: 'class3-adj-1', prompt: 'Hebrew adjectives inflect to indicate:', options: ['gender and number', 'tense', 'person', 'case'], correctIndex: 0, explanation: 'Adjectives have four forms — masculine/feminine, singular/plural — with the same endings as nouns.', category: 'adjective' },
  { id: 'class3-adj-2', prompt: 'What is the masculine plural adjective ending?', options: ['ָ ה', 'וֹת', 'ִ ים', 'ַ יִם'], correctIndex: 2, explanation: 'Masculine plural adjectives end in ִ ים (e.g. טוֹבִים), matching the noun ending.', category: 'adjective' },
  { id: 'class3-adj-3', prompt: 'What is the feminine plural adjective ending?', options: ['וֹת', 'ִ ים', 'ָ ה', 'ֵ י'], correctIndex: 0, explanation: 'Feminine plural adjectives end in וֹת (e.g. טוֹבוֹת).', category: 'adjective' },
  { id: 'class3-adj-4', prompt: 'An attributive adjective:', options: ['precedes its noun and agrees in gender and number only', 'follows its noun and agrees in gender, number, and definiteness', 'follows its noun but never takes the definite article', 'stands alone in place of a noun'], correctIndex: 1, explanation: 'Attributive adjectives follow the noun they modify and match it fully, including definiteness (הָאִישׁ הַטּוֹב). Option 1 describes the predicative use; option 4 describes the substantive use.', category: 'adjective' },
  { id: 'class3-adj-6', prompt: 'Translate this phrase.', hebrew: 'הַמֶּלֶךְ הַגָּדוֹל', options: ['the great king', 'the king is great', 'a great king', 'great is a king'], correctIndex: 0, explanation: 'Article on both noun and adjective = attributive: "the great king."', category: 'adjective' },
  { id: 'class3-adj-7', prompt: 'Translate this phrase.', hebrew: 'גָּדוֹל הַמֶּלֶךְ', options: ['the great king', 'a great king', 'the king is great', 'the great one'], correctIndex: 2, explanation: 'Indefinite adjective + definite noun = predicative: "the king is great."', category: 'adjective' },
  { id: 'class3-adj-8', prompt: 'Translate this phrase.', hebrew: 'הָעִיר הַגְּדוֹלָה', options: ['the great city', 'the city is great', 'a great city', 'to the great city'], correctIndex: 0, explanation: 'עִיר is feminine, so the attributive adjective takes the feminine form: הָעִיר הַגְּדוֹלָה ("the great city," Jonah 1:2).', category: 'adjective' },
  { id: 'class3-adj-9', prompt: 'Used substantively, הֶחָכָם means:', hebrew: 'הֶחָכָם', options: ['wisely', 'the wise one', 'he was wise', 'wisdom'], correctIndex: 1, explanation: 'A substantive adjective stands alone as a noun: הֶחָכָם = "the wise one." Note the Seghol article before חָ.', category: 'adjective' },
  { id: 'class3-adj-10', prompt: 'What does טוֹב mean?', hebrew: 'טוֹב', options: ['good, pleasant', 'bad', 'wise', 'old'], correctIndex: 0, explanation: 'טוֹב = "good, pleasant" (Ch 7 vocab), as in Gen 1: וַיַּרְא אֱלֹהִים כִּי־טוֹב.', category: 'adjective' },
  { id: 'class3-adj-11', prompt: 'Which adjective means "little, few"?', options: ['רַב', 'מְעַט', 'גָּדוֹל', 'זָקֵן'], correctIndex: 1, explanation: 'מְעַט = "little, few" (Ch 7 vocab). גָּדוֹל = "great," זָקֵן = "old."', category: 'adjective' },
  { id: 'class3-adj-12', prompt: 'The ending on מִצְרַ֫יְמָה ("to Egypt") is:', hebrew: 'מִצְרַ֫יְמָה', options: ['the plural ending', 'the construct ending', 'the directional ending', 'the feminine singular ending'], correctIndex: 2, explanation: 'The unaccented directional ending ָ ה expresses motion toward: "to Egypt." It is never accented, which distinguishes it from the accented feminine ending ָ ה.', category: 'adjective' },
];

// Verse translation — the easiest, most familiar verses (or clauses) whose
// vocabulary and grammar stay within Chapters 1-7: the definite article,
// conjunction waw, inseparable prepositions, and adjectives. The Hebrew is
// shown; the student picks the English translation.
const verseQuestions: PracticeQuestion[] = [
  { id: 'class3-verse-1', prompt: 'Translate this verse (Genesis 1:1).', hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ', options: ['In the beginning was the Word, and the Word was with God.', 'In the beginning God created the heavens and the earth.', 'And God made the great sea and the dry land.', 'The heavens belong to God, and the earth to mankind.'], correctIndex: 1, explanation: 'בְּ ("in") + רֵאשִׁית ("beginning"); אֱלֹהִים ("God"); אֵת = the untranslated definite-direct-object marker; הַשָּׁמַיִם ("the heavens") with the article; וְאֵת = waw ("and") + the marker; הָאָרֶץ ("the earth," article with Qamets before the guttural א).', category: 'verse' },
  { id: 'class3-verse-2', prompt: 'Translate this clause (Psalm 145:9).', hebrew: 'טוֹב־יְהוָה לַכֹּל', options: ['The LORD is king over all.', 'The law of the LORD is good.', 'The LORD is good to all.', 'The LORD is good to me.'], correctIndex: 2, explanation: 'A verbless clause: טוֹב ("good," a predicative adjective, Ch 7) + יְהוָה ("the LORD") → "the LORD is good." לַכֹּל = לְ ("to") + כֹּל ("all," Ch 6) with the article absorbed (Pathach).', category: 'verse' },
  { id: 'class3-verse-3', prompt: 'Translate this phrase (Jonah 1:2).', hebrew: 'נִינְוֵה הָעִיר הַגְּדוֹלָה', options: ['Jerusalem, the holy city.', 'Nineveh, the great city.', 'Nineveh, the wicked city.', 'the city and its great king'], correctIndex: 1, explanation: 'הָעִיר הַגְּדוֹלָה = an attributive adjective with the article on BOTH the noun and the adjective (Ch 7) → "the great city." גְּדוֹלָה is the feminine form of גָּדוֹל ("great," Ch 7), agreeing with the feminine עִיר ("city").', category: 'verse' },
  { id: 'class3-verse-4', prompt: 'Translate this clause (Psalm 24:1).', hebrew: 'לַיהוָה הָאָרֶץ', options: ["The earth is the LORD's.", 'The LORD is on the earth.', 'The LORD made the earth.', 'The earth is full of the LORD.'], correctIndex: 0, explanation: 'A verbless clause showing the possessive use of לְ (Ch 6): לַיהוָה = לְ ("belonging to") + YHWH, with the definite הָאָרֶץ ("the earth") → "The earth belongs to / is the LORD\'s."', category: 'verse' },
  { id: 'class3-verse-5', prompt: 'Translate this clause (Genesis 1:2).', hebrew: 'וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ', options: ['And the land was good and pleasant.', 'And the earth brought forth grass.', 'And the earth was formless and void.', 'But the earth was dry and without water.'], correctIndex: 2, explanation: 'וְ ("and") prefixed to הָאָרֶץ ("the earth"); note that the conjunction appears as וָ (Qamets) in וָבֹהוּ before the letter ב. תֹהוּ וָבֹהוּ = "formless and void" (tohu wa-bohu). הָיְתָה ("was") is a preview of the verb chapters.', category: 'verse' },
  { id: 'class3-verse-6', prompt: 'Translate this verse (Genesis 1:3).', hebrew: 'וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר', options: ['And God saw that the light was good.', 'And God separated the light from the darkness.', "And God said, 'Let there be light,' and there was light.", 'And God called the light day.'], correctIndex: 2, explanation: 'The creation of light: אֱלֹהִים ("God") + אוֹר ("light"). The waw-prefixed verb forms וַיֹּאמֶר ("and he said") and יְהִי ("let there be") are previews of later chapters; the vocabulary here is all familiar.', category: 'verse' },
];

interface WordGroupInput {
  id: string;
  hebrew: string;
  transliteration: string;
  transliterationOptions: string[];
  transliterationCorrectIndex: number;
  meaning: string;
  meaningOptions: string[];
  meaningCorrectIndex: number;
  transliterationCategory?: string;
  meaningCategory?: string;
}

function wordGroup(input: WordGroupInput): PracticeQuestionGroup {
  return {
    id: input.id,
    questions: [
      {
        id: `${input.id}-transliteration`,
        prompt: 'Which transliteration matches this Hebrew word?',
        hebrew: input.hebrew,
        options: input.transliterationOptions,
        correctIndex: input.transliterationCorrectIndex,
        explanation: `${input.hebrew} is transliterated ${input.transliteration}.`,
        category: input.transliterationCategory ?? 'word-transliteration',
      },
      {
        id: `${input.id}-meaning`,
        prompt: `What does ${input.transliteration} mean?`,
        hebrew: input.hebrew,
        transliteration: input.transliteration,
        options: input.meaningOptions,
        correctIndex: input.meaningCorrectIndex,
        explanation: `${input.hebrew} (${input.transliteration}) means “${input.meaning}.”`,
        category: input.meaningCategory ?? 'word-meaning',
      },
    ],
  };
}

// Chapter 5 nouns and Chapter 7 adjectives ("You Should Know" lists).
export const CLASS3_WORD_GROUPS: PracticeQuestionGroup[] = [
  wordGroup({ id: 'class3-word-esh', hebrew: 'אֵשׁ', transliteration: 'esh', transliterationOptions: ['ish', 'esh', 'em', 'et'], transliterationCorrectIndex: 1, meaning: 'fire', meaningOptions: ['fire', 'man', 'mother', 'sword'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class3-word-hekhal', hebrew: 'הֵיכָל', transliteration: 'hekhal', transliterationOptions: ['hekhal', 'herev', 'hakham', 'har'], transliterationCorrectIndex: 0, meaning: 'temple, palace', meaningOptions: ['sword', 'temple, palace', 'mountain', 'place'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class3-word-zahav', hebrew: 'זָהָב', transliteration: 'zahav', transliterationOptions: ['zaqen', 'zar', 'zahav', 'zevach'], transliterationCorrectIndex: 2, meaning: 'gold', meaningOptions: ['silver, money', 'gold', 'old', 'foreign'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class3-word-cherev', hebrew: 'חֶרֶב', transliteration: 'cherev', transliterationOptions: ['chakham', 'cherev', 'chai', 'hekhal'], transliterationCorrectIndex: 1, meaning: 'sword', meaningOptions: ['temple', 'wise', 'sword', 'gold'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class3-word-yeled', hebrew: 'יֶלֶד', transliteration: 'yeled', transliterationOptions: ['yam', 'yad', 'yeled', 'yashar'], transliterationCorrectIndex: 2, meaning: 'child, boy, youth', meaningOptions: ['sea', 'child, boy, youth', 'upright', 'hand'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class3-word-yam', hebrew: 'יָם', transliteration: 'yam', transliterationOptions: ['yad', 'yom', 'yam', 'yeled'], transliterationCorrectIndex: 2, meaning: 'sea', meaningOptions: ['hand', 'day', 'child', 'sea'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class3-word-kesef', hebrew: 'כֶּסֶף', transliteration: 'kesef', transliterationOptions: ['kesef', 'kohen', 'kol', 'kerem'], transliterationCorrectIndex: 0, meaning: 'silver, money', meaningOptions: ['gold', 'silver, money', 'priest', 'altar'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class3-word-mizbeach', hebrew: 'מִזְבֵּחַ', transliteration: 'mizbeach', transliterationOptions: ['mishpat', 'mizbeach', 'maqom', 'melekh'], transliterationCorrectIndex: 1, meaning: 'altar', meaningOptions: ['place', 'judgment', 'altar', 'king'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class3-word-maqom', hebrew: 'מָקוֹם', transliteration: 'maqom', transliterationOptions: ['mizbeach', 'mayim', 'melekh', 'maqom'], transliterationCorrectIndex: 3, meaning: 'place, location', meaningOptions: ['place, location', 'altar', 'water', 'sea'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class3-word-mishpat', hebrew: 'מִשְׁפָּט', transliteration: 'mishpat', transliterationOptions: ['mishpat', 'mizbeach', 'maqom', 'melekh'], transliterationCorrectIndex: 0, meaning: 'judgment, decision, ordinance', meaningOptions: ['place', 'judgment, decision, ordinance', 'kingdom', 'altar'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class3-word-qodesh', hebrew: 'קֹדֶשׁ', transliteration: 'qodesh', transliterationOptions: ['qol', 'qodesh', 'qeren', 'qatan'], transliterationCorrectIndex: 1, meaning: 'holiness, something holy', meaningOptions: ['voice', 'holiness, something holy', 'evil', 'judgment'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class3-word-raah', hebrew: 'רָעָה', transliteration: 'raah', transliterationOptions: ['ruach', 'rosh', 'raah', 'raav'], transliterationCorrectIndex: 2, meaning: 'evil, wickedness, calamity', meaningOptions: ['spirit', 'evil, wickedness, calamity', 'head', 'famine'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class3-word-gadol', hebrew: 'גָּדוֹל', transliteration: 'gadol', transliterationOptions: ['gadol', 'goy', 'gan', 'gever'], transliterationCorrectIndex: 0, meaning: 'great, big, large', meaningOptions: ['little, few', 'great, big, large', 'nation', 'good'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class3-word-zaqen', hebrew: 'זָקֵן', transliteration: 'zaqen', transliterationOptions: ['zar', 'zahav', 'zaqen', 'zeh'], transliterationCorrectIndex: 2, meaning: 'old; (n) elder, old man', meaningOptions: ['foreign, strange', 'old; (n) elder, old man', 'gold', 'living'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class3-word-zar', hebrew: 'זָר', transliteration: 'zar', transliterationOptions: ['zar', 'zaqen', 'zahav', 'sar'], transliterationCorrectIndex: 0, meaning: 'foreign, strange', meaningOptions: ['old', 'foreign, strange', 'living', 'wise'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class3-word-chai', hebrew: 'חַי', transliteration: 'chai', transliterationOptions: ['chen', 'chai', 'chakham', 'cherev'], transliterationCorrectIndex: 1, meaning: 'living, alive', meaningOptions: ['wise', 'living, alive', 'sword', 'grace'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class3-word-chakham', hebrew: 'חָכָם', transliteration: 'chakham', transliterationOptions: ['chakham', 'chai', 'cherev', 'chesed'], transliterationCorrectIndex: 0, meaning: 'wise, skillful, experienced', meaningOptions: ['living', 'wise, skillful, experienced', 'kind', 'strong'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class3-word-tov', hebrew: 'טוֹב', transliteration: 'tov', transliterationOptions: ['tov', 'tor', 'yom', 'sov'], transliterationCorrectIndex: 0, meaning: 'good, pleasant', meaningOptions: ['good, pleasant', 'bad', 'day', 'pure'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class3-word-yashar', hebrew: 'יָשָׁר', transliteration: 'yashar', transliterationOptions: ['yashar', 'yeled', 'yisrael', 'shir'], transliterationCorrectIndex: 0, meaning: 'upright, just', meaningOptions: ['upright, just', 'child', 'song', 'crooked'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class3-word-meat', hebrew: 'מְעַט', transliteration: 'meat', transliterationOptions: ['maqom', 'meat', 'mayim', 'maat'], transliterationCorrectIndex: 1, meaning: 'little, few', meaningOptions: ['great, big', 'little, few', 'much, many', 'all'], meaningCorrectIndex: 1 }),
];

// Cumulative review — Chapter 1-4 vocabulary that Class Practice 1-2 and
// Homework 1-2 never assessed: proper names (Ch 1-2) and nouns (Ch 3-4).
const reviewNameQuestions: PracticeQuestion[] = [
  { id: 'class3-review-abraham', prompt: 'Which biblical name is this?', hebrew: 'אַבְרָהָם', options: ['Aaron', 'Abraham', 'Isaac', 'Jacob'], correctIndex: 1, explanation: 'אַבְרָהָם = Abraham, "father of a multitude" (Gen 17:5). Chapter 1-2 vocabulary.', category: 'review-name' },
  { id: 'class3-review-aaron', prompt: 'Which biblical name is this?', hebrew: 'אַהֲרֹן', options: ['Aaron', 'Abraham', 'David', 'Judah'], correctIndex: 0, explanation: 'אַהֲרֹן = Aaron, first high priest. Chapter 1-2 vocabulary.', category: 'review-name' },
  { id: 'class3-review-david', prompt: 'Which biblical name is this?', hebrew: 'דָּוִד', options: ['Judah', 'Jacob', 'David', 'Isaac'], correctIndex: 2, explanation: 'דָּוִד = David. Chapter 1-2 vocabulary.', category: 'review-name' },
  { id: 'class3-review-judah', prompt: 'Which biblical name is this?', hebrew: 'יְהוּדָה', options: ['Jerusalem', 'Judah', 'Jacob', 'Isaac'], correctIndex: 1, explanation: 'יְהוּדָה = Judah, son of Jacob and the southern kingdom. Chapter 1-2 vocabulary.', category: 'review-name' },
  { id: 'class3-review-jacob', prompt: 'Which biblical name is this?', hebrew: 'יַעֲקֹב', options: ['Isaac', 'Judah', 'Jerusalem', 'Jacob'], correctIndex: 3, explanation: 'יַעֲקֹב = Jacob (Gen 25:26). Chapter 1-2 vocabulary.', category: 'review-name' },
  { id: 'class3-review-isaac', prompt: 'Which biblical name is this?', hebrew: 'יִצְחָק', options: ['Isaac', 'Jacob', 'Aaron', 'Abraham'], correctIndex: 0, explanation: 'יִצְחָק = Isaac, from צחק "to laugh" (Gen 21:6). Chapter 1-2 vocabulary.', category: 'review-name' },
  { id: 'class3-review-jerusalem', prompt: 'Which biblical name is this?', hebrew: 'יְרוּשָׁלַםִ', options: ['Judah', 'Jericho', 'Jerusalem', 'Jordan'], correctIndex: 2, explanation: 'יְרוּשָׁלַםִ = Jerusalem, usually written defectively. Chapter 1-2 vocabulary.', category: 'review-name' },
];

export const CLASS3_REVIEW_GROUPS: PracticeQuestionGroup[] = [
  ...asGroups(reviewNameQuestions),
  wordGroup({ id: 'class3-review-adon', hebrew: 'אָדוֹן', transliteration: 'adon', transliterationOptions: ['adon', 'adam', 'adamah', 'elohim'], transliterationCorrectIndex: 0, meaning: 'lord, master', meaningOptions: ['man, humankind', 'lord, master', 'ground', 'God'], meaningCorrectIndex: 1, transliterationCategory: 'review-transliteration', meaningCategory: 'review-meaning' }),
  wordGroup({ id: 'class3-review-adam', hebrew: 'אָדָם', transliteration: 'adam', transliterationOptions: ['adon', 'adam', 'adamah', 'em'], transliterationCorrectIndex: 1, meaning: 'man, humankind', meaningOptions: ['man, humankind', 'lord, master', 'ground, land', 'mother'], meaningCorrectIndex: 0, transliterationCategory: 'review-transliteration', meaningCategory: 'review-meaning' }),
  wordGroup({ id: 'class3-review-adamah', hebrew: 'אֲדָמָה', transliteration: 'adamah', transliterationOptions: ['adam', 'adon', 'adamah', 'achot'], transliterationCorrectIndex: 2, meaning: 'land, earth, ground', meaningOptions: ['land, earth, ground', 'brother', 'sister', 'sea'], meaningCorrectIndex: 0, transliterationCategory: 'review-transliteration', meaningCategory: 'review-meaning' }),
  wordGroup({ id: 'class3-review-ach', hebrew: 'אָח', transliteration: 'ach', transliterationOptions: ['ach', 'achot', 'esh', 'el'], transliterationCorrectIndex: 0, meaning: 'brother', meaningOptions: ['brother', 'sister', 'fire', 'mother'], meaningCorrectIndex: 0, transliterationCategory: 'review-transliteration', meaningCategory: 'review-meaning' }),
  wordGroup({ id: 'class3-review-achot', hebrew: 'אָחוֹת', transliteration: 'achot', transliterationOptions: ['ach', 'achot', 'adamah', 'em'], transliterationCorrectIndex: 1, meaning: 'sister, relative', meaningOptions: ['brother', 'sister, relative', 'mother', 'daughter'], meaningCorrectIndex: 1, transliterationCategory: 'review-transliteration', meaningCategory: 'review-meaning' }),
  wordGroup({ id: 'class3-review-em', hebrew: 'אֵם', transliteration: 'em', transliterationOptions: ['el', 'am', 'em', 'esh'], transliterationCorrectIndex: 2, meaning: 'mother', meaningOptions: ['people', 'God', 'mother', 'fire'], meaningCorrectIndex: 2, transliterationCategory: 'review-transliteration', meaningCategory: 'review-meaning' }),
  wordGroup({ id: 'class3-review-el', hebrew: 'אֵל', transliteration: 'el', transliterationOptions: ['em', 'el', 'al', 'esh'], transliterationCorrectIndex: 1, meaning: 'God, god', meaningOptions: ['to, toward', 'mother', 'fire', 'God, god'], meaningCorrectIndex: 3, transliterationCategory: 'review-transliteration', meaningCategory: 'review-meaning' }),
  wordGroup({ id: 'class3-review-goy', hebrew: 'גּוֹי', transliteration: 'goy', transliterationOptions: ['goy', 'gadol', 'gan', 'goral'], transliterationCorrectIndex: 0, meaning: 'nation, people', meaningOptions: ['great', 'garden', 'nation, people', 'mountain'], meaningCorrectIndex: 2, transliterationCategory: 'review-transliteration', meaningCategory: 'review-meaning' }),
  wordGroup({ id: 'class3-review-har', hebrew: 'הַר', transliteration: 'har', transliterationOptions: ['hekhal', 'herev', 'hu', 'har'], transliterationCorrectIndex: 3, meaning: 'mountain, hill, hill country', meaningOptions: ['temple', 'mountain, hill, hill country', 'sword', 'sea'], meaningCorrectIndex: 1, transliterationCategory: 'review-transliteration', meaningCategory: 'review-meaning' }),
];

export const CLASS3_ARTICLE_WAW_GROUPS = asGroups(articleWawQuestions);
export const CLASS3_PREPOSITION_GROUPS = asGroups(prepositionQuestions);
export const CLASS3_ADJECTIVE_GROUPS = asGroups(adjectiveQuestions);
export const CLASS3_VERSE_GROUPS = asGroups(verseQuestions);
