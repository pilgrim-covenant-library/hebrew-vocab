import type { MCQQuestion } from '@/types/homework';

export type Class1QuestionKind = 'letter' | 'word';

export interface Class1MCQQuestion {
  id: string;
  kind: Class1QuestionKind;
  prompt: string;
  hebrew: string;
  transliteration?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

function withCorrectAt(correct: string, distractors: string[], seed: number): { options: string[]; correctIndex: number } {
  const options = distractors.slice(0, 3);
  const correctIndex = seed % 4;
  options.splice(correctIndex, 0, correct);
  return { options, correctIndex };
}

function letterQuestion(
  id: string,
  hebrew: string,
  correct: string,
  distractors: string[],
  explanation: string,
  seed: number
): Class1MCQQuestion {
  const { options, correctIndex } = withCorrectAt(correct, distractors, seed);
  return {
    id,
    kind: 'letter',
    prompt: 'Which Biblical Hebrew letter is this?',
    hebrew,
    options,
    correctIndex,
    explanation,
    category: 'letter-identification',
  };
}

function wordQuestion(
  id: string,
  hebrew: string,
  transliteration: string,
  correct: string,
  distractors: string[],
  seed: number
): Class1MCQQuestion {
  const { options, correctIndex } = withCorrectAt(correct, distractors, seed);
  return {
    id,
    kind: 'word',
    prompt: 'Read this OT word. What is its basic meaning?',
    hebrew,
    transliteration,
    options,
    correctIndex,
    explanation: `${hebrew} (${transliteration}) means "${correct}."`,
    category: 'common-ot-word',
  };
}

export const CLASS1_LETTER_QUESTIONS: Class1MCQQuestion[] = [
  letterQuestion('class1-letter-aleph', 'א', 'Aleph', ['Ayin', 'He', 'Yod'], 'א is aleph, a guttural consonant often transliterated ʾ.', 0),
  letterQuestion('class1-letter-bet', 'בּ', 'Beth/Bet', ['Soft Beth', 'Kaf', 'Pe'], 'בּ is beth/bet with dagesh and is pronounced b.', 1),
  letterQuestion('class1-letter-vet', 'ב', 'Soft Beth', ['Beth/Bet', 'Waw', 'Kaf'], 'ב without dagesh is soft beth. In Biblical/Tiberian reading it is a fricative sound, often written bh or v.', 2),
  letterQuestion('class1-letter-gimel', 'ג', 'Gimel', ['Dalet', 'Zayin', 'Nun'], 'ג is gimel. Many classrooms pronounce it g; full begadkephat tradition also notes a soft form without dagesh.', 3),
  letterQuestion('class1-letter-dalet', 'ד', 'Dalet', ['Resh', 'Gimel', 'He'], 'ד is dalet. Many classrooms pronounce it d; full begadkephat tradition also notes a soft form without dagesh.', 0),
  letterQuestion('class1-letter-he', 'ה', 'He', ['Chet', 'Aleph', 'Taw/Tav'], 'ה is he and is pronounced h.', 1),
  letterQuestion('class1-letter-vav', 'ו', 'Waw', ['Zayin', 'Yod', 'Nun'], 'ו is waw. In this Biblical Hebrew guide, consonantal ו is read w; it can also mark o/u vowels.', 2),
  letterQuestion('class1-letter-zayin', 'ז', 'Zayin', ['Waw', 'Nun', 'Gimel'], 'ז is zayin and is pronounced z.', 3),
  letterQuestion('class1-letter-chet', 'ח', 'Chet/Het', ['He', 'Kaf', 'Taw/Tav'], 'ח is chet/het, a guttural consonant often transliterated ḥ or ch.', 0),
  letterQuestion('class1-letter-tet', 'ט', 'Tet', ['Taw/Tav', 'Chet/Het', 'Qof'], 'ט is tet, an emphatic t sound often transliterated ṭ.', 1),
  letterQuestion('class1-letter-yod', 'י', 'Yod', ['Waw', 'Nun', 'Aleph'], 'י is yod and is pronounced y when consonantal.', 2),
  letterQuestion('class1-letter-kaf', 'כּ', 'Kaf', ['Soft Kaf', 'Qof', 'Beth/Bet'], 'כּ is kaf with dagesh and is pronounced k.', 3),
  letterQuestion('class1-letter-khaf', 'כ', 'Soft Kaf', ['Kaf', 'Chet/Het', 'Final Kaf'], 'כ without dagesh is soft kaf and is often transliterated kh.', 0),
  letterQuestion('class1-letter-lamed', 'ל', 'Lamed', ['Mem', 'Nun', 'Dalet'], 'ל is lamed and is pronounced l.', 1),
  letterQuestion('class1-letter-mem', 'מ', 'Mem', ['Nun', 'Samekh', 'Final Mem'], 'מ is mem and is pronounced m.', 2),
  letterQuestion('class1-letter-nun', 'נ', 'Nun', ['Mem', 'Gimel', 'Final Nun'], 'נ is nun and is pronounced n.', 3),
  letterQuestion('class1-letter-samekh', 'ס', 'Samekh', ['Sin', 'Tsade', 'Shin'], 'ס is samekh and is pronounced s.', 0),
  letterQuestion('class1-letter-ayin', 'ע', 'Ayin', ['Aleph', 'He', 'Chet/Het'], 'ע is ayin, a guttural consonant often transliterated ʿ.', 1),
  letterQuestion('class1-letter-pe', 'פּ', 'Pe', ['Soft Pe', 'Beth/Bet', 'Kaf'], 'פּ is pe with dagesh and is pronounced p.', 2),
  letterQuestion('class1-letter-fe', 'פ', 'Soft Pe', ['Pe', 'Final Pe', 'Soft Beth'], 'פ without dagesh is soft pe and is often written ph or f.', 3),
  letterQuestion('class1-letter-tsade', 'צ', 'Tsade', ['Qof', 'Samekh', 'Sin'], 'צ is tsade and is commonly transliterated ṣ or ts.', 0),
  letterQuestion('class1-letter-qof', 'ק', 'Qof', ['Kaf', 'Tsade', 'Tet'], 'ק is qof. This Biblical Hebrew guide writes it q, distinct from kaf.', 1),
  letterQuestion('class1-letter-resh', 'ר', 'Resh', ['Dalet', 'Kaf', 'Lamed'], 'ר is resh and is pronounced r.', 2),
  letterQuestion('class1-letter-shin', 'שׁ', 'Shin', ['Sin', 'Samekh', 'Tsade'], 'שׁ is shin with the dot on the right and is pronounced sh.', 3),
  letterQuestion('class1-letter-sin', 'שׂ', 'Sin', ['Shin', 'Samekh', 'Tsade'], 'שׂ is sin with the dot on the left and is pronounced s.', 0),
  letterQuestion('class1-letter-tav', 'ת', 'Taw/Tav', ['Tet', 'He', 'Dalet'], 'ת is taw/tav. Many classrooms read it t; in full begadkephat tradition, ת without dagesh may be read th.', 1),
  letterQuestion('class1-letter-final-kaf', 'ך', 'Final Kaf', ['Soft Kaf', 'Final Nun', 'Final Tsade'], 'ך is final kaf, the word-final form of כ.', 2),
  letterQuestion('class1-letter-final-mem', 'ם', 'Final Mem', ['Mem', 'Final Nun', 'Samekh'], 'ם is final mem, the word-final form of מ.', 3),
  letterQuestion('class1-letter-final-nun', 'ן', 'Final Nun', ['Nun', 'Final Mem', 'Waw'], 'ן is final nun, the word-final form of נ.', 0),
  letterQuestion('class1-letter-final-fe', 'ף', 'Final Pe', ['Soft Pe', 'Final Kaf', 'Final Tsade'], 'ף is final pe, the word-final form of פ.', 1),
  letterQuestion('class1-letter-final-tsade', 'ץ', 'Final Tsade', ['Tsade', 'Final Nun', 'Qof'], 'ץ is final tsade, the word-final form of צ.', 2),
];

export const CLASS1_COMMON_OT_WORD_QUESTIONS: Class1MCQQuestion[] = [
  wordQuestion('class1-word-elohim', 'אֱלֹהִים', 'ʾelohim', 'God/gods', ['king', 'land', 'word'], 0),
  wordQuestion('class1-word-yhwh', 'יְהוָה', 'YHWH', 'LORD/YHWH', ['people', 'house', 'day'], 1),
  wordQuestion('class1-word-amar', 'אָמַר', 'ʾamar', 'he said', ['he wrote', 'he saw', 'he kept'], 2),
  wordQuestion('class1-word-melekh', 'מֶלֶךְ', 'melek', 'king', ['priest', 'prophet', 'servant'], 3),
  wordQuestion('class1-word-erets', 'אֶרֶץ', 'ʾerets', 'land/earth', ['heavens', 'house', 'road'], 0),
  wordQuestion('class1-word-ben', 'בֵּן', 'ben', 'son', ['father', 'daughter', 'servant'], 1),
  wordQuestion('class1-word-bayit', 'בַּיִת', 'bayit', 'house', ['hand', 'name', 'voice'], 2),
  wordQuestion('class1-word-am', 'עַם', 'ʿam', 'people', ['king', 'covenant', 'truth'], 3),
  wordQuestion('class1-word-yom', 'יוֹם', 'yom', 'day', ['night', 'water', 'heart'], 0),
  wordQuestion('class1-word-davar', 'דָּבָר', 'dabar', 'word/thing', ['law', 'peace', 'spirit'], 1),
  wordQuestion('class1-word-av', 'אָב', 'ʾab', 'father', ['son', 'mother', 'woman'], 2),
  wordQuestion('class1-word-ishah', 'אִשָּׁה', 'ʾishshah', 'woman/wife', ['man', 'daughter', 'wisdom'], 3),
  wordQuestion('class1-word-ish', 'אִישׁ', 'ʾish', 'man', ['woman', 'king', 'prophet'], 0),
  wordQuestion('class1-word-yad', 'יָד', 'yad', 'hand', ['head', 'face', 'heart'], 1),
  wordQuestion('class1-word-panim', 'פָּנִים', 'panim', 'face/presence', ['voice', 'name', 'road'], 2),
  wordQuestion('class1-word-qol', 'קוֹל', 'qol', 'voice/sound', ['law', 'covenant', 'truth'], 3),
  wordQuestion('class1-word-shamayim', 'שָׁמַיִם', 'shamayim', 'heavens/sky', ['land', 'water', 'house'], 0),
  wordQuestion('class1-word-ruach', 'רוּחַ', 'ruach', 'spirit/wind', ['soul/life', 'peace', 'holiness'], 1),
  wordQuestion('class1-word-lev', 'לֵב', 'leb', 'heart', ['head', 'hand', 'servant'], 2),
  wordQuestion('class1-word-nefesh', 'נֶפֶשׁ', 'nephesh', 'soul/life', ['word/thing', 'day', 'king'], 3),
  wordQuestion('class1-word-torah', 'תּוֹרָה', 'torah', 'law/instruction', ['truth', 'righteousness', 'covenant'], 0),
  wordQuestion('class1-word-chesed', 'חֶסֶד', 'chesed', 'steadfast love', ['peace', 'wisdom', 'holiness'], 1),
  wordQuestion('class1-word-shalom', 'שָׁלוֹם', 'shalom', 'peace', ['voice', 'water', 'blood'], 2),
  wordQuestion('class1-word-berit', 'בְּרִית', 'berith', 'covenant', ['truth', 'law', 'road'], 3),
  wordQuestion('class1-word-qodesh', 'קֹדֶשׁ', 'qodesh', 'holiness', ['righteousness', 'wisdom', 'servant'], 0),
  wordQuestion('class1-word-tsedeq', 'צֶדֶק', 'tsedeq', 'righteousness', ['steadfast love', 'truth', 'priest'], 1),
  wordQuestion('class1-word-derekh', 'דֶּרֶךְ', 'derekh', 'way/road', ['house', 'land', 'name'], 2),
  wordQuestion('class1-word-shem', 'שֵׁם', 'shem', 'name', ['face', 'voice', 'day'], 3),
  wordQuestion('class1-word-eved', 'עֶבֶד', 'ʿebed', 'servant', ['king', 'prophet', 'priest'], 0),
  wordQuestion('class1-word-navi', 'נָבִיא', 'nabiʾ', 'prophet', ['priest', 'servant', 'king'], 1),
  wordQuestion('class1-word-kohen', 'כֹּהֵן', 'kohen', 'priest', ['prophet', 'king', 'father'], 2),
  wordQuestion('class1-word-rosh', 'רֹאשׁ', 'rosh', 'head', ['hand', 'heart', 'face'], 3),
  wordQuestion('class1-word-emet', 'אֱמֶת', 'ʾemeth', 'truth', ['peace', 'covenant', 'wisdom'], 0),
  wordQuestion('class1-word-chokhmah', 'חָכְמָה', 'chokmah', 'wisdom', ['truth', 'holiness', 'law'], 1),
  wordQuestion('class1-word-adonai', 'אֲדֹנָי', 'ʾadonay', 'Lord/master', ['God/gods', 'king', 'servant'], 2),
  wordQuestion('class1-word-mayim', 'מַיִם', 'mayim', 'water', ['heavens', 'blood', 'land'], 3),
];

export const CLASS1_MCQ_QUESTIONS: Class1MCQQuestion[] = [
  ...CLASS1_LETTER_QUESTIONS,
  ...CLASS1_COMMON_OT_WORD_QUESTIONS,
];

export const HW1_CLASS1_LETTER_QUESTIONS = CLASS1_LETTER_QUESTIONS;
export const HW1_CLASS1_WORD_QUESTIONS = CLASS1_COMMON_OT_WORD_QUESTIONS.slice(0, 16);

export function toHomeworkMCQQuestion(question: Class1MCQQuestion, id: string): MCQQuestion {
  return {
    id,
    type: 'mcq',
    question: question.prompt,
    hebrew: question.hebrew,
    options: question.options,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    category: question.category,
  };
}

