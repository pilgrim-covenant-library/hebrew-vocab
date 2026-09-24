// HW11 — the last homework: everything after HW10.
// The question banks below cover CourseGuide Chapters 30-33; the assignment at
// the bottom of the file is composed from them and from HW12's Chapter 34-35
// banks.
//
// RELEASED: wired into the active extended-registry and reachable at /homework/hw11.
// HW10 already teaches the STRONG Piel (Ch 30) and STRONG Pual (Ch 32) in its
// sections 7 and 8, so this file keeps no banks for them.

import type { HomeworkQuestion, MCQQuestion, PairedMCQQuestion } from '@/types/homework';
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


// Section 2 — Chapter 31: the Piel stem, weak verbs.
const sec2: MCQQuestion[] = [
  { id: 'hw11-s2-q1', type: 'mcq', question: 'Which weak class is the ONLY one to change the Piel diagnostics significantly?', options: ['II-Guttural verbs', 'III-ה verbs', 'I-נ verbs', 'geminate verbs'], correctIndex: 0, explanation: 'CourseGuide Ch 31. III-ח/ע, III-א, III-ה and geminate roots all preserve the strong-verb diagnostics.', category: 'piel-weak' },
  { id: 'hw11-s2-q2', type: 'mcq', question: 'Why does a guttural in SECOND root position disturb the Piel?', options: ['because gutturals are always silent', 'because the root loses a letter', 'because gutturals cannot take a Daghesh Forte', 'because gutturals require an extra prefix'], correctIndex: 2, explanation: 'CourseGuide Ch 31. The Piel needs a doubled middle consonant, and a guttural will not carry one.', category: 'piel-weak' },
  { id: 'hw11-s2-q3', type: 'mcq', question: 'What are the two responses when a guttural rejects the expected Daghesh Forte?', options: ['assimilation or elision', 'virtual doubling or compensatory lengthening', 'metathesis or apocopation', 'reduplication or dissimilation'], correctIndex: 1, explanation: 'CourseGuide Ch 31. Virtual doubling keeps the short vowel as though the consonant were doubled; compensatory lengthening lengthens the preceding vowel instead.', category: 'piel-weak' },
  { id: 'hw11-s2-q4', type: 'mcq', question: 'Which three features remain the Piel signature across the weak classes?', options: ['a ה prefix, a Hireq Yod, and a Pathach stem vowel', 'a נ prefix, a Qamets stem vowel, and a Tsere', 'a Qibbuts, a Shureq, and a Tsere stem vowel', 'a Daghesh Forte in the second root consonant and a Pathach stem vowel'], correctIndex: 3, explanation: 'CourseGuide Ch 31. Learn those three and the whole Piel becomes readable, with II-Guttural roots as the single recurring exception.', category: 'piel-weak' },
  { id: 'hw11-s2-q5', type: 'mcq', question: 'Translate: בֵּרַךְ', hebrew: 'בֵּרַךְ', options: ['he blessed', 'he was blessed', 'bless!', 'a blessing'], correctIndex: 0, explanation: 'CourseGuide Ch 31. The ר rejects the Daghesh Forte, so the Hireq of קִטֵּל lengthens to Tsere by compensation.', category: 'piel-weak' },
  { id: 'hw11-s2-q6', type: 'mcq', question: 'Translate: נִחַם', hebrew: 'נִחַם', options: ['he was sorry', 'he comforted, consoled', 'comfort!', 'he will be comforted'], correctIndex: 1, explanation: 'CourseGuide Ch 31. A II-Guttural Piel of נָחַם with virtual doubling. Careful: the נ here is a ROOT letter, not the Niphal stem prefix.', category: 'piel-weak' },
  { id: 'hw11-s2-q7', type: 'mcq', question: 'Which root would you look up for צִוָּה?', hebrew: 'צִוָּה', options: ['צוּר ("rock")', 'צַר ("adversary")', 'צָוָה ("to command")', 'יָצָא ("to go out")'], correctIndex: 2, explanation: 'CourseGuide Ch 31. The Daghesh Forte sits in the ו, the second root consonant, and the Qamets-He ending marks the III-ה class.', category: 'piel-weak' },
  { id: 'hw11-s2-q8', type: 'mcq', question: 'Parse: הִלֵּל', hebrew: 'הִלֵּל', options: ['Hiphil Perfect 3ms', 'Qal Perfect 3ms', 'Hophal Perfect 3ms', 'Piel Perfect 3ms'], correctIndex: 3, explanation: 'CourseGuide Ch 31. A geminate root keeping every Piel diagnostic. Do not read the initial ה as a Hiphil prefix — here it is the first ROOT consonant.', category: 'piel-weak' },
];


// Section 4 — Chapter 33: the Pual stem, weak verbs.
const sec4: MCQQuestion[] = [
  { id: 'hw11-s4-q1', type: 'mcq', question: 'Which weak class is the only one to change the Pual diagnostics significantly?', options: ['II-Guttural verbs', 'III-ה verbs', 'III-א verbs', 'I-נ verbs'], correctIndex: 0, explanation: 'CourseGuide Ch 33. Exactly as in the Piel. Both III-א and III-ה verbs keep all the Pual diagnostics intact.', category: 'pual-weak' },
  { id: 'hw11-s4-q2', type: 'mcq', question: 'In a II-Guttural Pual, which diagnostic goes missing?', options: ['the Qibbuts under the first root consonant', 'the Daghesh Forte in the second root consonant', 'the Shewa under the preformative', 'the מ prefix on the participle'], correctIndex: 1, explanation: 'CourseGuide Ch 33. Everything else stays, so a missing Daghesh Forte alone should never make you abandon a Piel or Pual parse.', category: 'pual-weak' },
  { id: 'hw11-s4-q3', type: 'mcq', question: 'What are the three Pual diagnostics?', options: ['a ה prefix, a Hireq Yod, and a Pathach', 'a נ prefix, a Qamets, and a Tsere', 'Qibbuts under the first root consonant, Daghesh Forte in the second, and Shewa under Imperfect preformatives', 'a Shureq prefix vowel and a Pathach stem vowel'], correctIndex: 2, explanation: 'CourseGuide Ch 33. The first separates the Pual from the Piel; the other two are shared with it.', category: 'pual-weak' },
  { id: 'hw11-s4-q4', type: 'mcq', question: 'How do III-ה verbs behave in the Pual?', options: ['they lose the Qibbuts', 'they lose the Daghesh Forte', 'they cannot appear in the Pual', 'they keep all the Pual diagnostics, plus the familiar III-ה endings'], correctIndex: 3, explanation: 'CourseGuide Ch 33. וַיְכֻלּוּ ("they were finished," Gen 2:1) shows the Qibbuts and Daghesh Forte exactly as the strong verb does.', category: 'pual-weak' },
  { id: 'hw11-s4-q5', type: 'mcq', question: 'Translate: מְבֹרָךְ', hebrew: 'מְבֹרָךְ', options: ['blessed, being blessed', 'blessing', 'he blessed', 'bless!'], correctIndex: 0, explanation: 'CourseGuide Ch 33. A Pual participle of בָּרַךְ: the ר rejects the Daghesh Forte, so the Qibbuts lengthens to Holem.', category: 'pual-weak' },
  { id: 'hw11-s4-q6', type: 'mcq', question: 'Translate: יֻלַּד', hebrew: 'יֻלַּד', options: ['he gave birth', 'he was born', 'he will beget', 'let him be born'], correctIndex: 1, explanation: 'CourseGuide Ch 33. A Pual of יָלַד with Qibbuts and Daghesh Forte intact — "For to us a child is born" (Isa 9:6).', category: 'pual-weak' },
  { id: 'hw11-s4-q7', type: 'mcq', question: 'Which root would you look up for נֻחָמָה?', hebrew: 'נֻחָמָה', options: ['נוּחַ ("to rest")', 'לָחַם ("to fight")', 'נָחַם ("to comfort")', 'חָמַם ("to be hot")'], correctIndex: 2, explanation: 'CourseGuide Ch 33. The ח cannot take the Daghesh Forte, but the Qibbuts still marks the passive: "not comforted" (Isa 54:11).', category: 'pual-weak' },
  { id: 'hw11-s4-q8', type: 'mcq', question: 'Which three stems share the doubled second root consonant?', options: ['Niphal, Hiphil, and Hophal', 'Qal, Niphal, and Hiphil', 'Hiphil, Hophal, and Hithpael', 'Piel, Pual, and Hithpael'], correctIndex: 3, explanation: 'CourseGuide Ch 30-33. They form one family: once you see the Daghesh Forte in the middle root consonant, the vowels and prefixes decide which of the three you are reading.', category: 'pual-weak' },
];

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

// Section 6 — Verse translation: Piel and Pual verbs in familiar clauses.
const sec6: MCQQuestion[] = [
  { id: 'hw11-s6-q1', type: 'mcq', question: 'Translate this petition (Psalm 51:2).', hebrew: 'הַרְבֵּה כַּבְּסֵנִי מֵעֲוֺנִי', options: ['Wash me thoroughly from my iniquity.', 'He washed me from my iniquity.', 'My iniquity was washed away.', 'I will wash away my own iniquity.'], correctIndex: 0, explanation: 'כַּבְּסֵנִי is a Piel Imperative (Ch 30) with a 1cs object suffix (Ch 19); הַרְבֵּה is a Hiphil Infinitive Absolute used adverbially, "thoroughly." עָוֹן is Chapter 19 vocabulary.', category: 'verse' },
  { id: 'hw11-s6-q2', type: 'mcq', question: 'Translate this clause (Psalm 145:2).', hebrew: 'בְּכָל־יוֹם אֲבָרְכֶךָּ', options: ['You blessed me every day.', 'Every day I will bless you.', 'Bless me every day!', 'Every day is blessed by you.'], correctIndex: 1, explanation: 'אֲבָרְכֶךָּ is a Piel Imperfect 1cs of בָּרַךְ (Ch 31) carrying a 2ms object suffix (Ch 19). The ר rejects the Daghesh Forte, as it always does.', category: 'verse' },
  { id: 'hw11-s6-q3', type: 'mcq', question: 'Translate this clause (Isaiah 61:1).', hebrew: 'לְבַשֵּׂר עֲנָוִים שְׁלָחַנִי', options: ['I was sent to the poor with good news.', 'The poor sent me with good news.', 'Send me to bring good news to the poor!', 'He has sent me to bring good news to the poor.'], correctIndex: 3, explanation: 'לְבַשֵּׂר is a Piel Infinitive Construct with לְ (Ch 20/30) expressing purpose; שְׁלָחַנִי is a Qal Perfect with a 1cs suffix (Ch 19).', category: 'verse' },
  { id: 'hw11-s6-q4', type: 'mcq', question: 'Translate this clause (Psalm 34:1).', hebrew: 'אֲבָרֲכָה אֶת־יְהוָה בְּכָל־עֵת', options: ['I will bless the LORD at all times.', 'The LORD blessed me at all times.', 'Bless the LORD at all times!', 'The LORD is blessed at all times.'], correctIndex: 0, explanation: 'A Piel Cohortative of בָּרַךְ (Ch 31) — the ־ָה ending on a 1cs form expresses resolve. אֶת־ marks the definite object.', category: 'verse' },
  { id: 'hw11-s6-q5', type: 'mcq', question: 'Translate this command (Psalm 66:2).', hebrew: 'זַמְּרוּ כְבוֹד־שְׁמוֹ', options: ['His name was sung in glory.', 'Sing the glory of his name!', 'They sang the glory of his name.', 'I will sing of the glory of his name.'], correctIndex: 1, explanation: 'זַמְּרוּ is a Piel Imperative 2mp (Ch 30): Pathach under the first root consonant and a Daghesh Forte in the second. כְבוֹד־שְׁמוֹ is a construct chain (Ch 10).', category: 'verse' },
  { id: 'hw11-s6-q6', type: 'mcq', question: 'Translate this clause (Psalm 63:3).', hebrew: 'שְׂפָתַי יְשַׁבְּחוּנְךָ', options: ['You praised my lips.', 'Let my lips be praised.', 'My lips will praise you.', 'I praised you with my lips.'], correctIndex: 2, explanation: 'יְשַׁבְּחוּ is a Piel Imperfect 3mp (Ch 30) with a 2ms object suffix (Ch 19). The subject שְׂפָתַי ("my lips") is fronted (Ch 23).', category: 'verse' },
  { id: 'hw11-s6-q7', type: 'mcq', question: 'Translate this command (Psalm 96:2).', hebrew: 'שִׁירוּ לַיהוָה בָּרֲכוּ שְׁמוֹ', options: ['They sang to the LORD and blessed his name.', 'The name of the LORD is sung and blessed.', 'I will sing to the LORD and bless his name.', 'Sing to the LORD, bless his name!'], correctIndex: 3, explanation: 'Two Imperatives side by side: שִׁירוּ is a Qal (Ch 18), and בָּרֲכוּ a Piel of בָּרַךְ (Ch 31) — a clean comparison of the two stems.', category: 'verse' },
  { id: 'hw11-s6-q8', type: 'mcq', question: 'Translate this clause (Isaiah 9:6).', hebrew: 'כִּי־יֶלֶד יֻלַּד־לָנוּ', options: ['For to us a child is born.', 'For a child will bear us a son.', 'For we have borne a child.', 'For the child was given a name.'], correctIndex: 0, explanation: 'יֻלַּד is a Pual of יָלַד (Ch 33) — the Qibbuts under the י and the Daghesh Forte in the ל mark the passive: "was born."', category: 'verse' },
];

/** Questions from a bank, in the order given; a missing id fails at import. */
function pick<T extends HomeworkQuestion>(bank: readonly T[], ids: readonly string[]): T[] {
  return ids.map((id) => {
    const question = bank.find((q) => q.id === id);
    if (!question) throw new Error(`HW11: no question ${id} in its source bank`);
    return question;
  });
}

// Trimmed to HW10's density: five to eight items a chapter, a dozen words, eight
// verses. The items left out restate a point a kept item makes — a second plain
// "translate" of the same stem, a parse of the form another item names, or
// hw12-s2-q14, which Class 10 already asks word for word.
const ch31 = pick(sec2, ['hw11-s2-q2', 'hw11-s2-q3', 'hw11-s2-q4', 'hw11-s2-q5', 'hw11-s2-q7', 'hw11-s2-q8']);
const ch33 = pick(sec4, ['hw11-s4-q1', 'hw11-s4-q2', 'hw11-s4-q3', 'hw11-s4-q4', 'hw11-s4-q5', 'hw11-s4-q8']);
const ch34 = pick(hw12Sections[1], [
  'hw12-s1-q1', 'hw12-s1-q2', 'hw12-s1-q3', 'hw12-s1-q5',
  'hw12-s1-q6', 'hw12-s1-q7', 'hw12-s1-q8', 'hw12-s1-q14',
]);
const ch35 = pick(hw12Sections[2], [
  'hw12-s2-q1', 'hw12-s2-q2', 'hw12-s2-q3', 'hw12-s2-q4',
  'hw12-s2-q5', 'hw12-s2-q10', 'hw12-s2-q11', 'hw12-s2-q15',
]);
// The six most frequent new words of each chapter group.
const vocabulary: PairedMCQQuestion[] = [
  ...pick(sec5, ['hw11-s5-q2', 'hw11-s5-q9', 'hw11-s5-q1', 'hw11-s5-q3', 'hw11-s5-q4', 'hw11-s5-q5']),
  ...pick(hw12Sections[3] as PairedMCQQuestion[], ['hw12-s3-q3', 'hw12-s3-q5', 'hw12-s3-q12', 'hw12-s3-q8', 'hw12-s3-q11', 'hw12-s3-q1']),
];
const verses = [
  ...pick(sec6, ['hw11-s6-q2', 'hw11-s6-q3', 'hw11-s6-q5', 'hw11-s6-q8']),
  ...pick(hw12Sections[4], ['hw12-s4-q1', 'hw12-s4-q3', 'hw12-s4-q6', 'hw12-s4-q7']),
];

export const hw11Sections = { 1: ch31, 2: ch33, 3: ch34, 4: ch35, 5: vocabulary, 6: verses };

export const hw11Meta: ExtendedHomeworkMeta = {
  id: 'hw11',
  title: 'HW11: The Weak Piel and Pual, and the Hithpael',
  shortTitle: 'HW11',
  description: 'CourseGuide for BBH (Pratico/Van Pelt) Chapters 31 and 33-35, the rest of the course after HW10: the Piel and Pual in weak verbs, and the reflexive Hithpael in strong and weak verbs — plus the new Chapter 30-35 vocabulary and verse-translation practice. HW10 already covered the strong Piel and Pual.',
  topics: ['Ch 31: Piel weak verbs', 'Ch 33: Pual weak verbs', 'Ch 34: Hithpael strong verbs', 'Ch 35: Hithpael weak verbs', 'Ch 30-35 vocabulary', 'Verse translation'],
  totalQuestions: ch31.length + ch33.length + ch34.length + ch35.length + vocabulary.length + verses.length,
  sections: [
    { id: 1, title: 'Ch 31 — The Piel Stem (Weak)', description: 'Why only a guttural in second position disturbs the Piel', questionCount: ch31.length },
    { id: 2, title: 'Ch 33 — The Pual Stem (Weak)', description: 'The same weak-class behaviour as the Piel, one vowel class over', questionCount: ch33.length },
    { id: 3, title: 'Ch 34 — The Hithpael Stem (Strong)', description: 'Reflexive action, the הִתְ and מִתְ prefixes, metathesis, and assimilation', questionCount: ch34.length },
    { id: 4, title: 'Ch 35 — The Hithpael Stem (Weak)', description: 'Gutturals, geminates, III-ה roots, and הִשְׁתַּחֲוָה', questionCount: ch35.length },
    { id: 5, title: 'Ch 30-35 Vocabulary', description: 'Read and translate the new "You Should Know" words', questionCount: vocabulary.length },
    { id: 6, title: 'Verse Translation', description: 'Translate familiar clauses built on Piel, Pual and Hithpael verbs', questionCount: verses.length },
  ],
  sectionQuestions: hw11Sections,
};
