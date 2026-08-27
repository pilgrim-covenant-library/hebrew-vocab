import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function asGroups(questions: PracticeQuestion[]): PracticeQuestionGroup[] {
  return questions.map((question) => ({ id: question.id, questions: [question] }));
}

const syllabificationQuestions: PracticeQuestion[] = [
  { id: 'class2-syl-1', prompt: 'How many syllables are in this word?', hebrew: 'שָׁלוֹם', options: ['1', '2', '3', '4'], correctIndex: 1, explanation: 'שָׁלוֹם is sha-lom: two syllables.', category: 'syllable-count' },
  { id: 'class2-syl-2', prompt: 'Choose the correct syllable division.', hebrew: 'שָׁלוֹם', options: ['sha-lom', 'shal-om', 'sh-a-lom', 'sha-lo-m'], correctIndex: 0, explanation: 'The correct division is sha-lom.', category: 'syllable-division' },
  { id: 'class2-syl-3', prompt: 'What kind of syllable is “sha” in sha-lom?', hebrew: 'שָׁלוֹם', options: ['Closed and accented', 'Closed and unaccented', 'Open and unaccented', 'Open and accented'], correctIndex: 2, explanation: '“Sha” ends in its vowel sound and does not carry the word stress, so it is open and unaccented.', category: 'open-closed' },
  { id: 'class2-syl-4', prompt: 'What kind of syllable is “lom” in sha-lom?', hebrew: 'שָׁלוֹם', options: ['Open and accented', 'Open and unaccented', 'Closed and unaccented', 'Closed and accented'], correctIndex: 3, explanation: '“Lom” ends in mem and carries the stress, so it is closed and accented.', category: 'open-closed' },
  { id: 'class2-syl-5', prompt: 'Choose the correct syllable division.', hebrew: 'נֶפֶשׁ', options: ['nef-esh', 'ne-fesh', 'n-efesh', 'nefe-sh'], correctIndex: 1, explanation: 'נֶפֶשׁ divides ne-fesh.', category: 'syllable-division' },
  { id: 'class2-syl-6', prompt: 'How many syllables are in this word?', hebrew: 'אֱלֹהִים', options: ['3', '2', '4', '1'], correctIndex: 0, explanation: 'אֱלֹהִים is e-lo-him: three syllables.', category: 'syllable-count' },
  { id: 'class2-syl-7', prompt: 'How does the first shewa function?', hebrew: 'דְּבָרִים', options: ['It is silent', 'It marks stress', 'It is vocal', 'It closes a previous syllable'], correctIndex: 2, explanation: 'A shewa under the first consonant is vocal; דְּבָרִים begins de-.', category: 'shewa' },
  { id: 'class2-syl-8', prompt: 'How does the final shewa function?', hebrew: 'מֶלֶךְ', options: ['It creates a third syllable', 'It is vocal', 'It doubles the kaf', 'It is silent'], correctIndex: 3, explanation: 'The final shewa is silent; the word is me-lek.', category: 'shewa' },
  { id: 'class2-syl-9', prompt: 'Choose the correct syllable division.', hebrew: 'מִדְבָּר', options: ['mi-de-bar', 'mid-bar', 'mi-dbar', 'mid-ba-r'], correctIndex: 1, explanation: 'The silent shewa under dalet closes the first syllable: mid-bar.', category: 'syllable-division' },
  { id: 'class2-syl-10', prompt: 'How many syllables are in this word?', hebrew: 'יֶלֶד', options: ['2', '1', '3', '4'], correctIndex: 0, explanation: 'יֶלֶד is ye-led: two syllables.', category: 'syllable-count' },
  { id: 'class2-syl-11', prompt: 'Choose the correct syllable division.', hebrew: 'בַּיִת', options: ['bay-it', 'b-ayit', 'ba-yit', 'ba-yi-t'], correctIndex: 2, explanation: 'בַּיִת divides ba-yit.', category: 'syllable-division' },
  { id: 'class2-syl-12', prompt: 'How should this one-syllable word be classified?', hebrew: 'עַם', options: ['Open and accented', 'Open and unaccented', 'Closed and unaccented', 'Closed and accented'], correctIndex: 3, explanation: 'עַם (am) ends in mem, so its single accented syllable is closed.', category: 'open-closed' },
  { id: 'class2-syl-13', prompt: 'What does the dagesh in shin indicate here?', hebrew: 'אִשָּׁה', options: ['The shin is silent', 'The shin is doubled', 'The word is plural', 'The dot changes shin to sin'], correctIndex: 1, explanation: 'Dagesh forte doubles the shin, giving the division ish-shah.', category: 'dagesh' },
  { id: 'class2-syl-14', prompt: 'What kind of dagesh is in the initial kaf?', hebrew: 'כֹּהֵן', options: ['Dagesh lene', 'Dagesh forte', 'Mappiq', 'No dagesh'], correctIndex: 0, explanation: 'The initial begadkephat letter takes dagesh lene.', category: 'dagesh' },
  { id: 'class2-syl-15', prompt: 'How many syllables are in this word?', hebrew: 'יָדַיִם', options: ['2', '4', '3', '1'], correctIndex: 2, explanation: 'יָדַיִם is ya-da-yim: three syllables.', category: 'syllable-count' },
  { id: 'class2-syl-16', prompt: 'What kind of syllable is “mal” in mal-kah?', hebrew: 'מַלְכָּה', options: ['Open and accented', 'Open and unaccented', 'Closed and accented', 'Closed and unaccented'], correctIndex: 3, explanation: '“Mal” ends with lamed and does not carry the final stress, so it is closed and unaccented.', category: 'open-closed' },
  { id: 'class2-syl-17', prompt: 'Which description fits the two syllables in to-RAH?', hebrew: 'תּוֹרָה', options: ['Both are closed', 'Both are open', 'The first is closed and the second open', 'The first is open and the second closed'], correctIndex: 1, explanation: 'Both “to” and “rah” end in vowel sounds; the final he is quiescent.', category: 'open-closed' },
  { id: 'class2-syl-18', prompt: 'A shewa under the first consonant of a word is normally:', options: ['Vocal', 'Silent', 'A stress mark', 'Dagesh forte'], correctIndex: 0, explanation: 'At the beginning of a word, shewa is normally vocal and begins the first syllable.', category: 'shewa' },
  { id: 'class2-syl-19', prompt: 'A silent shewa normally does what?', options: ['Creates its own syllable', 'Marks the accented syllable', 'Closes the preceding syllable', 'Makes a noun plural'], correctIndex: 2, explanation: 'Silent shewa has no vowel sound and closes the syllable before it.', category: 'shewa' },
  { id: 'class2-syl-20', prompt: 'Where does the accent normally fall in Biblical Hebrew words?', options: ['Always on the first syllable', 'Equally on every syllable', 'There is never an accent', 'Usually on the final syllable'], correctIndex: 3, explanation: 'The default accent is normally on the final syllable, although important exceptions exist.', category: 'accent' },
];

const nounQuestions: PracticeQuestion[] = [
  { id: 'class2-noun-1', prompt: 'How many grammatical genders do Hebrew nouns have?', options: ['One', 'Two', 'Three', 'Four'], correctIndex: 1, explanation: 'Hebrew nouns are masculine or feminine.', category: 'noun-gender' },
  { id: 'class2-noun-2', prompt: 'Which list gives the three noun numbers?', options: ['Singular, plural, dual', 'Past, present, future', 'Masculine, feminine, common', 'Absolute, construct, definite'], correctIndex: 0, explanation: 'Hebrew nouns use singular, plural, and dual number.', category: 'noun-number' },
  { id: 'class2-noun-3', prompt: 'Which ending commonly marks masculine plural?', options: ['־ָה', '־וֹת', '־ִים', '־ַיִם'], correctIndex: 2, explanation: '־ִים (-im) is the common masculine plural ending.', category: 'noun-ending' },
  { id: 'class2-noun-4', prompt: 'Which ending commonly marks feminine plural?', options: ['־ִי', '־ִים', '־ָה', '־וֹת'], correctIndex: 3, explanation: '־וֹת (-ot) is the common feminine plural ending.', category: 'noun-ending' },
  { id: 'class2-noun-5', prompt: 'Which ending commonly marks feminine singular?', options: ['־ִים', '־ָה', '־וּ', '־ַיִם'], correctIndex: 1, explanation: 'Many feminine singular nouns end in ־ָה (-ah).', category: 'noun-ending' },
  { id: 'class2-noun-6', prompt: 'Which ending marks the dual?', options: ['־ַיִם', '־וֹת', '־ִים', '־ָה'], correctIndex: 0, explanation: 'The dual ending is ־ַיִם (-ayim).', category: 'noun-ending' },
  { id: 'class2-noun-7', prompt: 'Identify this noun.', hebrew: 'סוּס', options: ['Feminine plural', 'Feminine singular', 'Masculine singular', 'Dual'], correctIndex: 2, explanation: 'סוּס (sus, “horse”) is masculine singular.', category: 'noun-parsing' },
  { id: 'class2-noun-8', prompt: 'Identify this noun.', hebrew: 'אֶרֶץ', options: ['Masculine singular', 'Masculine plural', 'Feminine plural', 'Feminine singular'], correctIndex: 3, explanation: 'אֶרֶץ (erets, “land”) is feminine singular despite lacking a typical feminine ending.', category: 'noun-parsing' },
  { id: 'class2-noun-9', prompt: 'Identify this noun.', hebrew: 'סוּסִים', options: ['Feminine plural', 'Masculine plural', 'Masculine singular', 'Dual'], correctIndex: 1, explanation: 'סוּסִים (susim, “horses”) is masculine plural.', category: 'noun-parsing' },
  { id: 'class2-noun-10', prompt: 'Identify this noun.', hebrew: 'בָּנוֹת', options: ['Feminine plural', 'Masculine plural', 'Feminine singular', 'Dual'], correctIndex: 0, explanation: 'בָּנוֹת (banot, “daughters”) is feminine plural.', category: 'noun-parsing' },
  { id: 'class2-noun-11', prompt: 'What number is this noun?', hebrew: 'עֵינַיִם', options: ['Singular', 'Regular plural', 'Dual', 'Collective'], correctIndex: 2, explanation: 'עֵינַיִם (enayim, “eyes”) uses the dual ending.', category: 'noun-number' },
  { id: 'class2-noun-12', prompt: 'Which is the plural of אָב (av, “father”)?', options: ['אָבִים', 'אֲבַיִם', 'אָבָה', 'אָבוֹת'], correctIndex: 3, explanation: 'The plural of אָב is אָבוֹת (avot). It remains masculine despite the ־וֹת ending.', category: 'irregular-plural' },
  { id: 'class2-noun-13', prompt: 'Which is the plural of אִישׁ (ish, “man”)?', options: ['אִישִׁים', 'אֲנָשִׁים', 'אִישׁוֹת', 'אִישַׁיִם'], correctIndex: 1, explanation: 'The irregular plural of אִישׁ is אֲנָשִׁים (anashim).', category: 'irregular-plural' },
  { id: 'class2-noun-14', prompt: 'Which is the plural of אִשָּׁה (ishah, “woman”)?', options: ['נָשִׁים', 'אִשָּׁהִים', 'אִשּׁוֹת', 'אֲנָשִׁים'], correctIndex: 0, explanation: 'The irregular plural of אִשָּׁה is נָשִׁים (nashim).', category: 'irregular-plural' },
  { id: 'class2-noun-15', prompt: 'Identify the gender and number of עִיר (ir, “city”).', hebrew: 'עִיר', options: ['Masculine plural', 'Masculine singular', 'Feminine singular', 'Feminine plural'], correctIndex: 2, explanation: 'עִיר is feminine singular even though it has no typical feminine ending.', category: 'noun-exception' },
  { id: 'class2-noun-16', prompt: 'Although שָׁנִים ends in ־ִים, how is it parsed?', hebrew: 'שָׁנִים', options: ['Masculine singular', 'Masculine plural', 'Feminine singular', 'Feminine plural'], correctIndex: 3, explanation: 'שָׁנִים (shanim, “years”) is the plural of the feminine noun שָׁנָה.', category: 'noun-exception' },
  { id: 'class2-noun-17', prompt: 'Which singular noun corresponds to יָדַיִם?', hebrew: 'יָדַיִם', options: ['עַיִן', 'יָד', 'רֶגֶל', 'אֹזֶן'], correctIndex: 1, explanation: 'יָדַיִם is the dual of יָד (yad, “hand”).', category: 'noun-number' },
  { id: 'class2-noun-18', prompt: 'Which singular noun corresponds to תּוֹרוֹת?', hebrew: 'תּוֹרוֹת', options: ['תּוֹרָה', 'תּוֹר', 'תּוֹרַיִם', 'תּוּרָה'], correctIndex: 0, explanation: 'תּוֹרוֹת is the feminine plural of תּוֹרָה.', category: 'noun-number' },
  { id: 'class2-noun-19', prompt: 'Which statement about noun endings is correct?', options: ['They determine gender without exception', 'Only plural nouns have gender', 'They are useful clues, but exceptions occur', 'Every noun ending in ־וֹת is feminine'], correctIndex: 2, explanation: 'Learn lexical gender with each noun because common endings have important exceptions.', category: 'noun-principle' },
  { id: 'class2-noun-20', prompt: 'Identify this noun.', hebrew: 'בָּנִים', options: ['Feminine plural', 'Feminine dual', 'Masculine singular', 'Masculine plural'], correctIndex: 3, explanation: 'בָּנִים (banim, “sons”) is masculine plural.', category: 'noun-parsing' },
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
}

function wordGroup(input: WordGroupInput): PracticeQuestionGroup {
  return {
    id: input.id,
    questions: [
      {
        id: `${input.id}-transliteration`,
        prompt: 'Which transliteration matches this Hebrew noun?',
        hebrew: input.hebrew,
        options: input.transliterationOptions,
        correctIndex: input.transliterationCorrectIndex,
        explanation: `${input.hebrew} is transliterated ${input.transliteration}.`,
        category: 'noun-transliteration',
      },
      {
        id: `${input.id}-meaning`,
        prompt: `What does ${input.transliteration} mean?`,
        hebrew: input.hebrew,
        transliteration: input.transliteration,
        options: input.meaningOptions,
        correctIndex: input.meaningCorrectIndex,
        explanation: `${input.hebrew} (${input.transliteration}) means “${input.meaning}.”`,
        category: 'noun-meaning',
      },
    ],
  };
}

export const CLASS2_SYLLABIFICATION_GROUPS = asGroups(syllabificationQuestions);
export const CLASS2_NOUN_GROUPS = asGroups(nounQuestions);
export const CLASS2_WORD_GROUPS: PracticeQuestionGroup[] = [
  wordGroup({ id: 'class2-word-melek', hebrew: 'מֶלֶךְ', transliteration: 'melek', transliterationOptions: ['melek', 'malak', 'malkah', 'melakim'], transliterationCorrectIndex: 0, meaning: 'king', meaningOptions: ['priest', 'king', 'prophet', 'servant'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class2-word-sus', hebrew: 'סוּס', transliteration: 'sus', transliterationOptions: ['susim', 'sus', 'shem', 'suf'], transliterationCorrectIndex: 1, meaning: 'horse', meaningOptions: ['hand', 'land', 'horse', 'house'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class2-word-torah', hebrew: 'תּוֹרָה', transliteration: 'torah', transliterationOptions: ['terumah', 'torot', 'torah', 'todah'], transliterationCorrectIndex: 2, meaning: 'law/instruction', meaningOptions: ['king', 'peace', 'hand', 'law/instruction'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class2-word-yad', hebrew: 'יָד', transliteration: 'yad', transliterationOptions: ['yom', 'yadim', 'yeled', 'yad'], transliterationCorrectIndex: 3, meaning: 'hand', meaningOptions: ['hand', 'eye', 'son', 'day'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class2-word-ayin', hebrew: 'עַיִן', transliteration: 'ayin', transliterationOptions: ['ayin', 'am', 'erets', 'onah'], transliterationCorrectIndex: 0, meaning: 'eye', meaningOptions: ['ear', 'hand', 'eye', 'head'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class2-word-erets', hebrew: 'אֶרֶץ', transliteration: 'erets', transliterationOptions: ['adam', 'erets', 'or', 'ish'], transliterationCorrectIndex: 1, meaning: 'land/earth', meaningOptions: ['heavens', 'city', 'people', 'land/earth'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class2-word-ish', hebrew: 'אִישׁ', transliteration: 'ish', transliterationOptions: ['ishah', 'esh', 'ish', 'anashim'], transliterationCorrectIndex: 2, meaning: 'man', meaningOptions: ['man', 'woman', 'king', 'son'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class2-word-ishah', hebrew: 'אִשָּׁה', transliteration: 'ishah', transliterationOptions: ['nashim', 'ish', 'ashah', 'ishah'], transliterationCorrectIndex: 3, meaning: 'woman/wife', meaningOptions: ['daughter', 'woman/wife', 'mother', 'sister'], meaningCorrectIndex: 1 }),
];
