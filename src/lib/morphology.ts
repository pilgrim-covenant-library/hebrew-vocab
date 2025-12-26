/**
 * Hebrew Morphology Utilities
 * For parsing and analyzing Biblical Hebrew word forms
 */

import type {
  Binyan,
  HebrewConjugation,
  HebrewGender,
  HebrewNumber,
  HebrewState,
  NounPattern,
} from '@/types';

// ============================================
// TYPES
// ============================================

export type GrammaticalCase = 'absolute' | 'construct';
export type GrammaticalNumber = 'singular' | 'plural' | 'dual';
export type GrammaticalGender = 'masculine' | 'feminine' | 'common';
export type Person = '1st' | '2nd' | '3rd';

// Weak verb pattern types
export type WeakVerbPattern =
  | 'strong'      // Regular/strong verb (no weak letters)
  | 'pe-nun'      // First radical is נ (e.g., נפל - fall)
  | 'pe-yod'      // First radical is י (e.g., ישׁב - sit)
  | 'pe-aleph'    // First radical is א (e.g., אמר - say)
  | 'pe-guttural' // First radical is guttural (ע, ח, ה)
  | 'ayin-vav'    // Middle radical is ו (e.g., קום - arise)
  | 'ayin-yod'    // Middle radical is י (e.g., שׂים - put)
  | 'ayin-guttural' // Middle radical is guttural
  | 'lamed-he'    // Third radical is ה (e.g., בנה - build)
  | 'lamed-aleph' // Third radical is א (e.g., מצא - find)
  | 'lamed-guttural' // Third radical is guttural
  | 'geminate'    // Second and third radicals are same (e.g., סבב - surround)
  | 'doubly-weak' // Two weak radicals (e.g., היה - be);

export interface ParsedNoun {
  partOfSpeech: 'noun';
  lexicalForm: string;
  gender: GrammaticalGender;
  number: GrammaticalNumber;
  state: GrammaticalCase;
  pattern?: NounPattern;
}

export interface ParsedVerb {
  partOfSpeech: 'verb';
  lexicalForm: string;
  binyan: Binyan;
  conjugation: HebrewConjugation;
  person?: Person;
  gender?: GrammaticalGender;
  number?: GrammaticalNumber;
  root?: string;
}

export interface ParsedAdjective {
  partOfSpeech: 'adjective';
  lexicalForm: string;
  gender: GrammaticalGender;
  number: GrammaticalNumber;
  state: GrammaticalCase;
}

export interface ParsedPronoun {
  partOfSpeech: 'pronoun';
  lexicalForm: string;
  person: Person;
  gender?: GrammaticalGender;
  number: GrammaticalNumber;
  type: 'personal' | 'demonstrative' | 'relative' | 'interrogative';
}

export interface ParsedParticle {
  partOfSpeech: 'particle';
  lexicalForm: string;
  type: 'definite_article' | 'conjunction' | 'preposition' | 'interrogative' | 'negative' | 'other';
}

export interface ParsedParticiple {
  partOfSpeech: 'participle';
  lexicalForm: string;
  binyan: Binyan;
  gender: GrammaticalGender;
  number: GrammaticalNumber;
  state: GrammaticalCase;
  voice: 'active' | 'passive';
}

export interface ParsedInfinitive {
  partOfSpeech: 'infinitive';
  lexicalForm: string;
  binyan: Binyan;
  type: 'construct' | 'absolute';
}

export type ParsedMorphology =
  | ParsedNoun
  | ParsedVerb
  | ParsedAdjective
  | ParsedPronoun
  | ParsedParticle
  | ParsedParticiple
  | ParsedInfinitive;

// ============================================
// DISPLAY UTILITIES
// ============================================

export const STATE_LABELS: Record<GrammaticalCase, string> = {
  absolute: 'Absolute',
  construct: 'Construct',
};

export const NUMBER_LABELS: Record<GrammaticalNumber, string> = {
  singular: 'Singular',
  plural: 'Plural',
  dual: 'Dual',
};

export const NUMBER_ABBREVIATIONS: Record<GrammaticalNumber, string> = {
  singular: 'S',
  plural: 'P',
  dual: 'D',
};

export const GENDER_LABELS: Record<GrammaticalGender, string> = {
  masculine: 'Masculine',
  feminine: 'Feminine',
  common: 'Common',
};

export const GENDER_ABBREVIATIONS: Record<GrammaticalGender, string> = {
  masculine: 'M',
  feminine: 'F',
  common: 'C',
};

export const BINYAN_LABELS: Record<Binyan, string> = {
  qal: 'Qal',
  niphal: 'Niphal',
  piel: 'Piel',
  pual: 'Pual',
  hiphil: 'Hiphil',
  hophal: 'Hophal',
  hithpael: 'Hithpael',
};

export const BINYAN_MEANINGS: Record<Binyan, string> = {
  qal: 'Simple active',
  niphal: 'Simple passive or reflexive',
  piel: 'Intensive active',
  pual: 'Intensive passive',
  hiphil: 'Causative active',
  hophal: 'Causative passive',
  hithpael: 'Reflexive or reciprocal',
};

export const CONJUGATION_LABELS: Record<HebrewConjugation, string> = {
  perfect: 'Perfect',
  imperfect: 'Imperfect',
  imperative: 'Imperative',
  infinitive_construct: 'Infinitive Construct',
  infinitive_absolute: 'Infinitive Absolute',
  participle: 'Participle',
};

export const PERSON_LABELS: Record<Person, string> = {
  '1st': '1st Person',
  '2nd': '2nd Person',
  '3rd': '3rd Person',
};

// ============================================
// PARSING FUNCTIONS
// ============================================

/**
 * Format a parsed morphology object as a human-readable string.
 */
export function formatMorphology(parsed: ParsedMorphology): string {
  switch (parsed.partOfSpeech) {
    case 'verb':
      const verbParts = [
        BINYAN_LABELS[parsed.binyan],
        CONJUGATION_LABELS[parsed.conjugation],
      ];
      if (parsed.person && parsed.gender && parsed.number) {
        verbParts.push(PERSON_LABELS[parsed.person]);
        verbParts.push(GENDER_LABELS[parsed.gender]);
        verbParts.push(NUMBER_LABELS[parsed.number]);
      }
      return verbParts.join(' ');

    case 'noun':
    case 'adjective':
      return [
        GENDER_LABELS[parsed.gender],
        NUMBER_LABELS[parsed.number],
        STATE_LABELS[parsed.state],
      ].join(' ');

    case 'pronoun':
      const pronounParts = [
        PERSON_LABELS[parsed.person],
        NUMBER_LABELS[parsed.number],
      ];
      if (parsed.gender) {
        pronounParts.push(GENDER_LABELS[parsed.gender]);
      }
      return pronounParts.join(' ');

    case 'participle':
      return [
        BINYAN_LABELS[parsed.binyan],
        'Participle',
        GENDER_LABELS[parsed.gender],
        NUMBER_LABELS[parsed.number],
      ].join(' ');

    case 'infinitive':
      return [
        BINYAN_LABELS[parsed.binyan],
        parsed.type === 'construct' ? 'Infinitive Construct' : 'Infinitive Absolute',
      ].join(' ');

    case 'particle':
      return parsed.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

    default:
      return 'Unknown';
  }
}

/**
 * Format a parsed morphology object as a compact abbreviation.
 */
export function formatMorphologyAbbrev(parsed: ParsedMorphology): string {
  switch (parsed.partOfSpeech) {
    case 'verb':
      const binyanAbbr = parsed.binyan[0].toUpperCase();
      const conjAbbr = parsed.conjugation === 'perfect' ? 'Pf' :
                       parsed.conjugation === 'imperfect' ? 'Ipf' :
                       parsed.conjugation === 'imperative' ? 'Impv' :
                       parsed.conjugation === 'participle' ? 'Ptc' :
                       parsed.conjugation === 'infinitive_construct' ? 'InfC' : 'InfA';
      const personAbbr = parsed.person ? parsed.person[0] : '';
      const genderAbbr = parsed.gender ? GENDER_ABBREVIATIONS[parsed.gender] : '';
      const numAbbr = parsed.number ? NUMBER_ABBREVIATIONS[parsed.number] : '';
      return `${binyanAbbr}${conjAbbr}${personAbbr}${genderAbbr}${numAbbr}`;

    case 'noun':
    case 'adjective':
      const stateAbbr = parsed.state === 'construct' ? 'C' : 'A';
      return `${GENDER_ABBREVIATIONS[parsed.gender]}${NUMBER_ABBREVIATIONS[parsed.number]}${stateAbbr}`;

    case 'pronoun':
      return `${parsed.person[0]}${GENDER_ABBREVIATIONS[parsed.gender || 'common']}${NUMBER_ABBREVIATIONS[parsed.number]}`;

    case 'participle':
      return `${parsed.binyan[0].toUpperCase()}Ptc${GENDER_ABBREVIATIONS[parsed.gender]}${NUMBER_ABBREVIATIONS[parsed.number]}`;

    case 'infinitive':
      return `${parsed.binyan[0].toUpperCase()}${parsed.type === 'construct' ? 'InfC' : 'InfA'}`;

    case 'particle':
      return 'Part';

    default:
      return '?';
  }
}

/**
 * Get a description of what a binyan indicates.
 */
export function getBinyanDescription(binyan: Binyan): string {
  const descriptions: Record<Binyan, string> = {
    qal: 'The basic, simple stem. Active voice with no intensification or causation.',
    niphal: 'Simple passive or reflexive. Often indicates receiving action or acting on oneself.',
    piel: 'Intensive or factitive active. Often intensifies the meaning or makes intransitive verbs transitive.',
    pual: 'Intensive passive. The passive counterpart of Piel.',
    hiphil: 'Causative active. Causes someone else to do the action.',
    hophal: 'Causative passive. The passive counterpart of Hiphil.',
    hithpael: 'Reflexive or reciprocal. Acting upon oneself or mutual action between parties.',
  };
  return descriptions[binyan];
}

/**
 * Get a description of what a conjugation indicates.
 */
export function getConjugationDescription(conjugation: HebrewConjugation): string {
  const descriptions: Record<HebrewConjugation, string> = {
    perfect: 'Completed action. Often past tense but can indicate certainty or completion.',
    imperfect: 'Incomplete action. Often future or ongoing action, commands, or wishes.',
    imperative: 'Direct command. Used for positive commands in 2nd person.',
    infinitive_construct: 'Verbal noun that functions like "to verb" in English. Often with prepositions.',
    infinitive_absolute: 'Emphatic verbal form. Often strengthens or modifies another verb.',
    participle: 'Verbal adjective. Describes ongoing or characteristic action.',
  };
  return descriptions[conjugation];
}

/**
 * Get a description of construct state usage.
 */
export function getStateDescription(state: GrammaticalCase): string {
  const descriptions: Record<GrammaticalCase, string> = {
    absolute: 'Independent form. The noun stands alone without being bound to another noun.',
    construct: 'Bound form. The noun is closely connected to the following noun (like "word of God").',
  };
  return descriptions[state];
}

/**
 * Get information about a noun pattern.
 */
export function getNounPatternDescription(pattern: NounPattern): string {
  const descriptions: Record<NounPattern, string> = {
    segolate: 'Two-syllable nouns with stress on first syllable. Common pattern: מֶלֶךְ (melek).',
    qatl: 'Single syllable pattern. Example: יָד (yad).',
    qitl: 'I-class vowel pattern. Example: סֵפֶר (sefer).',
    qutl: 'U-class vowel pattern.',
    qatal: 'A-A pattern. Example: דָּבָר (davar).',
    qatil: 'A-I pattern. Example: נָבִיא (navi).',
    qatul: 'A-U pattern. Example: גָּדוֹל (gadol).',
    qatol: 'A-O pattern.',
    other: 'Other or irregular pattern.',
  };
  return descriptions[pattern];
}

// ============================================
// PRACTICE QUESTION GENERATORS
// ============================================

export interface MorphologyQuestion {
  word: string;
  lexicalForm: string;
  gloss: string;
  correctAnswer: string;
  options: string[];
  questionType: 'binyan' | 'conjugation' | 'gender' | 'number' | 'state' | 'person' | 'full';
  hint?: string;
}

const ALL_BINYANIM: Binyan[] = ['qal', 'niphal', 'piel', 'pual', 'hiphil', 'hophal', 'hithpael'];
const ALL_CONJUGATIONS: HebrewConjugation[] = ['perfect', 'imperfect', 'imperative', 'infinitive_construct', 'infinitive_absolute', 'participle'];
const ALL_NUMBERS: GrammaticalNumber[] = ['singular', 'plural', 'dual'];
const ALL_GENDERS: GrammaticalGender[] = ['masculine', 'feminine', 'common'];
const ALL_STATES: GrammaticalCase[] = ['absolute', 'construct'];
const ALL_PERSONS: Person[] = ['1st', '2nd', '3rd'];

/**
 * Generate options for a morphology question, ensuring the correct answer is included.
 */
export function generateOptions<T extends string>(
  correctAnswer: T,
  allOptions: T[],
  count: number = 4
): T[] {
  const options = new Set<T>([correctAnswer]);
  const shuffled = [...allOptions].sort(() => Math.random() - 0.5);

  for (const option of shuffled) {
    if (options.size >= count) break;
    options.add(option);
  }

  return [...options].sort(() => Math.random() - 0.5);
}

/**
 * Generate a binyan identification question.
 */
export function generateBinyanQuestion(
  word: string,
  lexicalForm: string,
  gloss: string,
  correctBinyan: Binyan
): MorphologyQuestion {
  return {
    word,
    lexicalForm,
    gloss,
    correctAnswer: BINYAN_LABELS[correctBinyan],
    options: generateOptions(correctBinyan, ALL_BINYANIM).map(b => BINYAN_LABELS[b]),
    questionType: 'binyan',
    hint: getBinyanDescription(correctBinyan),
  };
}

/**
 * Generate a conjugation identification question.
 */
export function generateConjugationQuestion(
  word: string,
  lexicalForm: string,
  gloss: string,
  correctConjugation: HebrewConjugation
): MorphologyQuestion {
  return {
    word,
    lexicalForm,
    gloss,
    correctAnswer: CONJUGATION_LABELS[correctConjugation],
    options: generateOptions(correctConjugation, ALL_CONJUGATIONS).map(c => CONJUGATION_LABELS[c]),
    questionType: 'conjugation',
    hint: getConjugationDescription(correctConjugation),
  };
}

/**
 * Generate a gender identification question.
 */
export function generateGenderQuestion(
  word: string,
  lexicalForm: string,
  gloss: string,
  correctGender: GrammaticalGender
): MorphologyQuestion {
  const genderOptions: GrammaticalGender[] = ['masculine', 'feminine'];
  return {
    word,
    lexicalForm,
    gloss,
    correctAnswer: GENDER_LABELS[correctGender],
    options: generateOptions(correctGender, genderOptions).map(g => GENDER_LABELS[g]),
    questionType: 'gender',
  };
}

/**
 * Generate a number identification question.
 */
export function generateNumberQuestion(
  word: string,
  lexicalForm: string,
  gloss: string,
  correctNumber: GrammaticalNumber
): MorphologyQuestion {
  return {
    word,
    lexicalForm,
    gloss,
    correctAnswer: NUMBER_LABELS[correctNumber],
    options: generateOptions(correctNumber, ALL_NUMBERS).map(n => NUMBER_LABELS[n]),
    questionType: 'number',
  };
}

/**
 * Generate a construct/absolute state identification question.
 */
export function generateStateQuestion(
  word: string,
  lexicalForm: string,
  gloss: string,
  correctState: GrammaticalCase
): MorphologyQuestion {
  return {
    word,
    lexicalForm,
    gloss,
    correctAnswer: STATE_LABELS[correctState],
    options: generateOptions(correctState, ALL_STATES).map(s => STATE_LABELS[s]),
    questionType: 'state',
    hint: getStateDescription(correctState),
  };
}

// ============================================
// WEAK VERB HELPERS
// ============================================

/**
 * Identify weak verb type based on root.
 */
export function identifyWeakVerbType(root: string): string | null {
  if (root.length !== 3) return null;

  const [first, second, third] = [...root];

  // Pe-Nun verbs (first letter is נ)
  if (first === 'נ') return 'pe-nun';

  // Pe-Yod verbs (first letter is י)
  if (first === 'י') return 'pe-yod';

  // Pe-Aleph verbs (first letter is א)
  if (first === 'א') return 'pe-aleph';

  // Ayin-Vav verbs (middle letter is ו)
  if (second === 'ו') return 'ayin-vav';

  // Ayin-Yod verbs (middle letter is י)
  if (second === 'י') return 'ayin-yod';

  // Lamed-He verbs (third letter is ה)
  if (third === 'ה') return 'lamed-he';

  // Lamed-Aleph verbs (third letter is א)
  if (third === 'א') return 'lamed-aleph';

  // Geminate verbs (second and third letters are the same)
  if (second === third) return 'geminate';

  return 'strong';
}

/**
 * Check if a root contains a guttural letter.
 */
export function hasGuttural(root: string): { has: boolean; position?: 'first' | 'second' | 'third' } {
  const gutturals = ['א', 'ה', 'ח', 'ע', 'ר'];
  const chars = [...root];

  for (let i = 0; i < chars.length; i++) {
    if (gutturals.includes(chars[i])) {
      const position = i === 0 ? 'first' : i === 1 ? 'second' : 'third';
      return { has: true, position };
    }
  }

  return { has: false };
}

// ============================================
// ENHANCED WEAK VERB PATTERN DETECTION
// ============================================

export const WEAK_PATTERN_LABELS: Record<WeakVerbPattern, string> = {
  'strong': 'Strong',
  'pe-nun': 'Pe-Nun (פ״נ)',
  'pe-yod': 'Pe-Yod (פ״י)',
  'pe-aleph': 'Pe-Aleph (פ״א)',
  'pe-guttural': 'Pe-Guttural',
  'ayin-vav': 'Ayin-Vav (ע״ו)',
  'ayin-yod': 'Ayin-Yod (ע״י)',
  'ayin-guttural': 'Ayin-Guttural',
  'lamed-he': 'Lamed-He (ל״ה)',
  'lamed-aleph': 'Lamed-Aleph (ל״א)',
  'lamed-guttural': 'Lamed-Guttural',
  'geminate': 'Geminate (ע״ע)',
  'doubly-weak': 'Doubly Weak',
};

export const WEAK_PATTERN_DESCRIPTIONS: Record<WeakVerbPattern, string> = {
  'strong': 'A regular verb with no weak consonants. Follows standard conjugation patterns.',
  'pe-nun': 'First radical is נ. The נ often assimilates (disappears) into the following consonant.',
  'pe-yod': 'First radical is י. The י often drops out or changes to other vowels.',
  'pe-aleph': 'First radical is א. The א is quiescent (silent) and affects vowel patterns.',
  'pe-guttural': 'First radical is a guttural (ה, ח, ע). Gutturals prefer compound shewa and a-class vowels.',
  'ayin-vav': 'Middle radical is ו (originally). These "hollow" verbs have unique conjugations.',
  'ayin-yod': 'Middle radical is י (originally). Similar to Ayin-Vav but with i-class vowels.',
  'ayin-guttural': 'Middle radical is a guttural. Affects vowel patterns in the word.',
  'lamed-he': 'Third radical is ה. The final ה is a vowel letter, not a true consonant.',
  'lamed-aleph': 'Third radical is א. The א is often quiescent, affecting final syllables.',
  'lamed-guttural': 'Third radical is a guttural. Affects final vowel patterns.',
  'geminate': 'Second and third radicals are the same letter. Often contracts in conjugation.',
  'doubly-weak': 'Has weakness in two positions. Combines multiple weak verb behaviors.',
};

/**
 * Enhanced weak verb pattern identification with full classification.
 */
export function identifyWeakPattern(root: string): WeakVerbPattern {
  // Remove vowel points for analysis
  const cleanRoot = root.replace(/[\u0591-\u05C7]/g, '');
  const chars = [...cleanRoot].filter(c => /[\u05D0-\u05EA]/.test(c));

  if (chars.length !== 3) return 'strong';

  const [first, second, third] = chars;
  const gutturals = ['א', 'ה', 'ח', 'ע'];
  const weaknesses: string[] = [];

  // Check first radical
  if (first === 'נ') weaknesses.push('pe-nun');
  else if (first === 'י') weaknesses.push('pe-yod');
  else if (first === 'א') weaknesses.push('pe-aleph');
  else if (gutturals.includes(first)) weaknesses.push('pe-guttural');

  // Check middle radical
  if (second === 'ו') weaknesses.push('ayin-vav');
  else if (second === 'י') weaknesses.push('ayin-yod');
  else if (gutturals.includes(second)) weaknesses.push('ayin-guttural');

  // Check third radical
  if (third === 'ה') weaknesses.push('lamed-he');
  else if (third === 'א') weaknesses.push('lamed-aleph');
  else if (gutturals.includes(third)) weaknesses.push('lamed-guttural');

  // Check geminate
  if (second === third) weaknesses.push('geminate');

  // Determine pattern
  if (weaknesses.length === 0) return 'strong';
  if (weaknesses.length >= 2) return 'doubly-weak';
  return weaknesses[0] as WeakVerbPattern;
}

/**
 * Extract the three-letter root from a Hebrew word.
 * This is a simplified extraction that works for many common patterns.
 */
export function extractRoot(word: string): string | null {
  // Remove vowel points and cantillation
  const cleanWord = word.replace(/[\u0591-\u05C7]/g, '');
  // Extract only Hebrew letters
  const letters = [...cleanWord].filter(c => /[\u05D0-\u05EA]/.test(c));

  // Common prefixes to remove
  const prefixes = ['ה', 'ו', 'ב', 'כ', 'ל', 'מ', 'נ', 'ת', 'י', 'א'];
  // Common suffixes to remove
  const suffixes = ['ה', 'ו', 'י', 'ם', 'ן', 'ת'];

  // Try to identify 3-letter root
  if (letters.length === 3) return letters.join('');

  if (letters.length > 3) {
    // Try removing common prefix
    let root = [...letters];
    if (prefixes.includes(root[0])) {
      root = root.slice(1);
    }
    // Try removing common suffix
    if (root.length > 3 && suffixes.includes(root[root.length - 1])) {
      root = root.slice(0, -1);
    }
    if (root.length === 3) return root.join('');
  }

  return letters.length >= 3 ? letters.slice(0, 3).join('') : null;
}

// ============================================
// FULL PARSING QUESTION GENERATORS
// ============================================

export interface FullParsingQuestion {
  word: string;
  hebrew: string;
  transliteration: string;
  gloss: string;
  definition: string;
  correctParsing: ParsedMorphology;
  formattedParsing: string;
  abbreviatedParsing: string;
  root?: string;
  weakPattern?: WeakVerbPattern;
}

export interface VocabularyWord {
  id: string;
  hebrew: string;
  transliteration: string;
  gloss: string;
  definition: string;
  partOfSpeech: string;
  morphology?: {
    gender?: string;
    number?: string;
    binyan?: string;
    root?: string;
  };
}

/**
 * Generate a full parsing question from a vocabulary word.
 */
export function generateFullParsingQuestion(word: VocabularyWord): FullParsingQuestion | null {
  const pos = word.partOfSpeech.toLowerCase();

  let parsed: ParsedMorphology;
  let weakPattern: WeakVerbPattern | undefined;

  if (pos === 'verb') {
    const binyan = (word.morphology?.binyan as Binyan) || 'qal';
    const root = word.morphology?.root || extractRoot(word.hebrew);

    if (root) {
      weakPattern = identifyWeakPattern(root);
    }

    parsed = {
      partOfSpeech: 'verb',
      lexicalForm: word.hebrew,
      binyan,
      conjugation: 'perfect' as HebrewConjugation,
      person: '3rd',
      gender: 'masculine' as GrammaticalGender,
      number: 'singular' as GrammaticalNumber,
      root: root || undefined,
    };
  } else if (pos === 'noun') {
    parsed = {
      partOfSpeech: 'noun',
      lexicalForm: word.hebrew,
      gender: (word.morphology?.gender as GrammaticalGender) || 'masculine',
      number: (word.morphology?.number as GrammaticalNumber) || 'singular',
      state: 'absolute' as GrammaticalCase,
    };
  } else if (pos === 'adjective') {
    parsed = {
      partOfSpeech: 'adjective',
      lexicalForm: word.hebrew,
      gender: (word.morphology?.gender as GrammaticalGender) || 'masculine',
      number: 'singular' as GrammaticalNumber,
      state: 'absolute' as GrammaticalCase,
    };
  } else if (pos === 'pronoun') {
    parsed = {
      partOfSpeech: 'pronoun',
      lexicalForm: word.hebrew,
      person: '3rd',
      gender: 'masculine' as GrammaticalGender,
      number: 'singular' as GrammaticalNumber,
      type: 'personal',
    };
  } else if (pos === 'preposition' || pos === 'conjunction' || pos === 'adverb') {
    parsed = {
      partOfSpeech: 'particle',
      lexicalForm: word.hebrew,
      type: pos === 'preposition' ? 'preposition' : pos === 'conjunction' ? 'conjunction' : 'other',
    };
  } else {
    return null;
  }

  return {
    word: word.id,
    hebrew: word.hebrew,
    transliteration: word.transliteration,
    gloss: word.gloss,
    definition: word.definition,
    correctParsing: parsed,
    formattedParsing: formatMorphology(parsed),
    abbreviatedParsing: formatMorphologyAbbrev(parsed),
    root: parsed.partOfSpeech === 'verb' ? (parsed as ParsedVerb).root : undefined,
    weakPattern,
  };
}

/**
 * Generate plausible wrong parsings for quiz options.
 */
export function generatePlausibleWrongParsings(
  correctParsing: ParsedMorphology,
  count: number = 3
): ParsedMorphology[] {
  const wrongParsings: ParsedMorphology[] = [];

  if (correctParsing.partOfSpeech === 'verb') {
    const verbParsing = correctParsing as ParsedVerb;

    // Wrong binyan
    const wrongBinyanim = ALL_BINYANIM.filter(b => b !== verbParsing.binyan);
    if (wrongBinyanim.length > 0) {
      wrongParsings.push({
        ...verbParsing,
        binyan: wrongBinyanim[Math.floor(Math.random() * wrongBinyanim.length)],
      });
    }

    // Wrong conjugation
    const wrongConjs = ALL_CONJUGATIONS.filter(c => c !== verbParsing.conjugation);
    if (wrongConjs.length > 0) {
      wrongParsings.push({
        ...verbParsing,
        conjugation: wrongConjs[Math.floor(Math.random() * wrongConjs.length)],
      });
    }

    // Wrong person/gender/number combination
    if (verbParsing.person && verbParsing.gender && verbParsing.number) {
      const wrongPersons = ALL_PERSONS.filter(p => p !== verbParsing.person);
      wrongParsings.push({
        ...verbParsing,
        person: wrongPersons[Math.floor(Math.random() * wrongPersons.length)],
        gender: verbParsing.gender === 'masculine' ? 'feminine' : 'masculine',
      });
    }
  } else if (correctParsing.partOfSpeech === 'noun' || correctParsing.partOfSpeech === 'adjective') {
    const nounParsing = correctParsing as ParsedNoun;

    // Wrong gender
    wrongParsings.push({
      ...nounParsing,
      gender: nounParsing.gender === 'masculine' ? 'feminine' : 'masculine',
    });

    // Wrong number
    const wrongNums = ALL_NUMBERS.filter(n => n !== nounParsing.number);
    wrongParsings.push({
      ...nounParsing,
      number: wrongNums[Math.floor(Math.random() * wrongNums.length)],
    });

    // Wrong state
    wrongParsings.push({
      ...nounParsing,
      state: nounParsing.state === 'absolute' ? 'construct' : 'absolute',
    });
  }

  // Shuffle and return requested count
  return wrongParsings.sort(() => Math.random() - 0.5).slice(0, count);
}

/**
 * Generate a complete quiz question with correct answer and distractors.
 */
export function generateParsingQuiz(
  word: VocabularyWord,
  questionType: 'binyan' | 'full' | 'gender' | 'number' | 'weak-pattern' = 'full'
): MorphologyQuestion | null {
  const fullQuestion = generateFullParsingQuestion(word);
  if (!fullQuestion) return null;

  switch (questionType) {
    case 'binyan':
      if (fullQuestion.correctParsing.partOfSpeech !== 'verb') return null;
      const verbParsing = fullQuestion.correctParsing as ParsedVerb;
      return {
        word: fullQuestion.hebrew,
        lexicalForm: fullQuestion.hebrew,
        gloss: fullQuestion.gloss,
        correctAnswer: BINYAN_LABELS[verbParsing.binyan],
        options: generateOptions(verbParsing.binyan, ALL_BINYANIM).map(b => BINYAN_LABELS[b]),
        questionType: 'binyan',
        hint: getBinyanDescription(verbParsing.binyan),
      };

    case 'weak-pattern':
      if (!fullQuestion.weakPattern || fullQuestion.weakPattern === 'strong') return null;
      const allPatterns: WeakVerbPattern[] = [
        'strong', 'pe-nun', 'pe-yod', 'pe-aleph', 'ayin-vav', 'ayin-yod',
        'lamed-he', 'lamed-aleph', 'geminate'
      ];
      return {
        word: fullQuestion.hebrew,
        lexicalForm: fullQuestion.hebrew,
        gloss: fullQuestion.gloss,
        correctAnswer: WEAK_PATTERN_LABELS[fullQuestion.weakPattern],
        options: generateOptions(fullQuestion.weakPattern, allPatterns).map(p => WEAK_PATTERN_LABELS[p]),
        questionType: 'full',
        hint: WEAK_PATTERN_DESCRIPTIONS[fullQuestion.weakPattern],
      };

    case 'gender':
      if (fullQuestion.correctParsing.partOfSpeech !== 'noun' &&
          fullQuestion.correctParsing.partOfSpeech !== 'adjective') return null;
      const nounParsing = fullQuestion.correctParsing as ParsedNoun;
      return generateGenderQuestion(
        fullQuestion.hebrew,
        fullQuestion.hebrew,
        fullQuestion.gloss,
        nounParsing.gender
      );

    case 'number':
      if (fullQuestion.correctParsing.partOfSpeech !== 'noun' &&
          fullQuestion.correctParsing.partOfSpeech !== 'adjective') return null;
      const nounParsing2 = fullQuestion.correctParsing as ParsedNoun;
      return generateNumberQuestion(
        fullQuestion.hebrew,
        fullQuestion.hebrew,
        fullQuestion.gloss,
        nounParsing2.number
      );

    case 'full':
    default:
      const wrongParsings = generatePlausibleWrongParsings(fullQuestion.correctParsing);
      const options = [
        fullQuestion.formattedParsing,
        ...wrongParsings.map(p => formatMorphology(p))
      ].sort(() => Math.random() - 0.5);

      return {
        word: fullQuestion.hebrew,
        lexicalForm: fullQuestion.hebrew,
        gloss: fullQuestion.gloss,
        correctAnswer: fullQuestion.formattedParsing,
        options,
        questionType: 'full',
      };
  }
}

/**
 * Filter vocabulary words by criteria for practice sessions.
 */
export function filterVocabularyForPractice(
  words: VocabularyWord[],
  options: {
    partOfSpeech?: string[];
    binyan?: Binyan[];
    weakPattern?: WeakVerbPattern[];
    maxTier?: number;
    limit?: number;
  }
): VocabularyWord[] {
  let filtered = [...words];

  if (options.partOfSpeech && options.partOfSpeech.length > 0) {
    filtered = filtered.filter(w =>
      options.partOfSpeech!.includes(w.partOfSpeech.toLowerCase())
    );
  }

  if (options.binyan && options.binyan.length > 0) {
    filtered = filtered.filter(w =>
      w.partOfSpeech.toLowerCase() === 'verb' &&
      w.morphology?.binyan &&
      options.binyan!.includes(w.morphology.binyan as Binyan)
    );
  }

  if (options.weakPattern && options.weakPattern.length > 0) {
    filtered = filtered.filter(w => {
      if (w.partOfSpeech.toLowerCase() !== 'verb') return false;
      const root = w.morphology?.root || extractRoot(w.hebrew);
      if (!root) return false;
      const pattern = identifyWeakPattern(root);
      return options.weakPattern!.includes(pattern);
    });
  }

  // Shuffle and limit
  filtered = filtered.sort(() => Math.random() - 0.5);
  if (options.limit) {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}
