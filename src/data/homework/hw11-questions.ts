// HW11 — the last homework: the Hithpael (Ch 34-35), from HW12's banks, with the
// Chapter 30-33 vocabulary kept here.
//
// RELEASED: wired into the active extended-registry and reachable at /homework/hw11.
// HW10 already teaches the STRONG Piel (Ch 30) and STRONG Pual (Ch 32) in its
// sections 7 and 8; the weak Piel and Pual (Ch 31, 33) are not taught.

import type { HomeworkQuestion, PairedMCQQuestion } from '@/types/homework';
import type { ExtendedHomeworkMeta } from '@/types/homework-extended';
import { hw12Sections } from './hw12-questions';

function vocab(
  id: string,
  hebrew: string,
  transliteration: string,
  translitDistractors: string[],
  translitIndex: number,
  meaning: string,
  meaningDistractors: string[],
  meaningIndex: number,
  note: string,
): PairedMCQQuestion {
  const transliterationOptions = translitDistractors.slice(0, 3);
  transliterationOptions.splice(translitIndex, 0, transliteration);
  const meaningOptions = meaningDistractors.slice(0, 3);
  meaningOptions.splice(meaningIndex, 0, meaning);
  return {
    id,
    type: 'paired_mcq',
    question: 'Read this Hebrew word.',
    hebrew,
    transliterationOptions,
    transliterationCorrectIndex: translitIndex,
    transliterationExplanation: `${hebrew} is transliterated ${transliteration}.`,
    meaningOptions,
    meaningCorrectIndex: meaningIndex,
    meaningExplanation: `${hebrew} (${transliteration}) means "${meaning}." ${note}`,
    category: 'vocab',
  };
}

// Section 5 — Chapter 30-33 vocabulary ("You Should Know" lists).
const sec5: PairedMCQQuestion[] = [
  vocab('hw11-s5-q1', 'חָלַל', 'chalal', ['chanan', 'charah', 'chalah'], 0, 'to profane, pollute, defile', ['to be gracious', 'to burn with anger', 'to be sick'], 1, 'Ch 30 vocab. Its Hophal, הוּחַל, means "it was begun" (Gen 4:26).'),
  vocab('hw11-s5-q2', 'שָׁבַע', 'shava', ['shavat', 'shavar', 'sava'], 1, 'to swear, take an oath', ['to cease', 'to break', 'to be satisfied'], 3, 'Ch 30 vocab. Related to שֶׁבַע ("seven") — an oath was sworn "by sevening" oneself.'),
  vocab('hw11-s5-q3', 'זְרוֹעַ', 'zeroa', ['zera', 'zavach', 'zaaq'], 2, 'arm, forearm; (figuratively) strength', ['seed', 'sacrifice', 'outcry'], 0, 'Ch 30 vocab. "The LORD has bared his holy arm" (Isa 52:10).'),
  vocab('hw11-s5-q4', 'אוֹצָר', 'otsar', ['ot', 'or', 'aven'], 3, 'treasure, treasury, storehouse', ['sign', 'light', 'iniquity'], 2, 'Ch 31 vocab. Used of both a royal treasury and the LORD\'s storehouses of snow and wind.'),
  vocab('hw11-s5-q5', 'מִקְנֶה', 'miqneh', ['mizrach', 'migrash', 'miqdash'], 0, 'cattle, livestock, property', ['east', 'pastureland', 'sanctuary'], 1, 'Ch 31 vocab. From קָנָה ("to acquire") — livestock as acquired wealth.'),
  vocab('hw11-s5-q6', 'נָבַט', 'nabat', ['nagad', 'nagash', 'nasa'], 1, 'to look at, gaze, behold', ['to tell', 'to draw near', 'to lift'], 2, 'Ch 32 vocab. "Look to me and be saved, all the ends of the earth" (Isa 45:22).'),
  vocab('hw11-s5-q7', 'רִיב', 'riv', ['rachats', 'radaf', 'rakhav'], 2, 'to strive, contend, conduct a legal case', ['to wash', 'to pursue', 'to ride'], 0, 'Ch 32 vocab. A Biconsonantal verb; the noun רִיב means "a lawsuit, dispute."'),
  vocab('hw11-s5-q8', 'קֶשֶׁת', 'qeshet', ['qeren', 'qir', 'qatseh'], 3, 'bow, weapon', ['horn', 'wall', 'end, border'], 2, 'Ch 32 vocab. The bow God sets in the clouds as the sign of the covenant (Gen 9:13).'),
  vocab('hw11-s5-q9', 'עָנָה', 'anah', ['azar', 'azav', 'arakh'], 0, 'to be afflicted, humbled; to afflict, oppress', ['to help', 'to forsake', 'to arrange'], 1, 'Ch 33 vocab. Its Piel is used of Egypt afflicting Israel (Ex 1:11).'),
  vocab('hw11-s5-q10', 'גִּבְעָה', 'givah', ['goral', 'ger', 'gadol'], 1, 'hill', ['lot, portion', 'sojourner', 'great'], 3, 'Ch 33 vocab. Frequently paired with הַר ("mountain") in the Prophets.'),
];

/** Questions from a bank, in the order given; a missing id fails at import. */
function pick<T extends HomeworkQuestion>(bank: readonly T[], ids: readonly string[]): T[] {
  return ids.map((id) => {
    const question = bank.find((q) => q.id === id);
    if (!question) throw new Error(`HW11: no question ${id} in its source bank`);
    return question;
  });
}

/** Class 10 already asks this one word for word. */
const ASKED_IN_CLASS_10 = new Set(['hw12-s2-q14']);

const ch34 = [...hw12Sections[1]];
const ch35 = hw12Sections[2].filter((q) => !ASKED_IN_CLASS_10.has(q.id));
// The six Chapter 30-33 words and the six most frequent Chapter 34-35 words.
const vocabulary: PairedMCQQuestion[] = [
  ...pick(sec5, ['hw11-s5-q2', 'hw11-s5-q9', 'hw11-s5-q1', 'hw11-s5-q3', 'hw11-s5-q4', 'hw11-s5-q5']),
  ...pick(hw12Sections[3] as PairedMCQQuestion[], ['hw12-s3-q3', 'hw12-s3-q5', 'hw12-s3-q12', 'hw12-s3-q8', 'hw12-s3-q11', 'hw12-s3-q1']),
];
const verses = [...hw12Sections[4]];

export const hw11Sections = { 1: ch34, 2: ch35, 3: vocabulary, 4: verses };

export const hw11Meta: ExtendedHomeworkMeta = {
  id: 'hw11',
  title: 'HW11: The Hithpael Stem',
  shortTitle: 'HW11',
  description: 'CourseGuide for BBH (Pratico/Van Pelt) Chapters 34-35, the last lesson week: the reflexive Hithpael stem in strong and weak verbs, including the metathesis and assimilation of its ת prefix — plus the Chapter 30-35 vocabulary and verse-translation practice. The CourseGuide ends at Chapter 35.',
  topics: ['Ch 34: Hithpael strong verbs', 'Ch 35: Hithpael weak verbs', 'Ch 30-35 vocabulary', 'Verse translation'],
  totalQuestions: ch34.length + ch35.length + vocabulary.length + verses.length,
  sections: [
    { id: 1, title: 'Ch 34 — The Hithpael Stem (Strong)', description: 'Reflexive action, the הִתְ and מִתְ prefixes, metathesis, and assimilation', questionCount: ch34.length },
    { id: 2, title: 'Ch 35 — The Hithpael Stem (Weak)', description: 'Gutturals, geminates, III-ה roots, and הִשְׁתַּחֲוָה', questionCount: ch35.length },
    { id: 3, title: 'Ch 30-35 Vocabulary', description: 'Read and translate the new "You Should Know" words', questionCount: vocabulary.length },
    { id: 4, title: 'Verse Translation', description: 'Translate familiar clauses built on Hithpael verbs', questionCount: verses.length },
  ],
  sectionQuestions: hw11Sections,
};
