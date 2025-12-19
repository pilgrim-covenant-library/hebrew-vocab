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
