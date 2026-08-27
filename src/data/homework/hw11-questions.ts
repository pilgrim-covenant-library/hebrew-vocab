// HW11 — The Piel and Pual Stems (Strong and Weak).
// CourseGuide for BBH (Pratico/Van Pelt) Chapters 30-33 (Sessions 30-33),
// plus the new Chapter 30-33 vocabulary and verse-translation practice.
//
// NOT YET RELEASED: this bank is intentionally absent from the active
// extended-registry, so it is not reachable from the app. Wire it in when
// the class is ready.

import type { MCQQuestion, PairedMCQQuestion } from '@/types/homework';
import type { ExtendedHomeworkMeta } from '@/types/homework-extended';

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

// Section 1 — Chapter 30: the Piel stem, strong verbs.
const sec1: MCQQuestion[] = [
  { id: 'hw11-s1-q1', type: 'mcq', question: 'Which feature appears in EVERY form of every Piel conjugation?', options: ['a Daghesh Forte in the second root consonant', 'a נ prefix', 'a Qibbuts under the first root consonant', 'a Hireq Yod stem vowel'], correctIndex: 0, explanation: 'CourseGuide Ch 30. The doubled middle root consonant is the heart of the Piel — and of the Pual and Hithpael as well.', category: 'piel-strong' },
  { id: 'hw11-s1-q2', type: 'mcq', question: 'What vowel stands under Piel Imperfect preformatives and Participle prefixes?', options: ['Pathach', 'a vocal Shewa', 'Qamets', 'Hireq'], correctIndex: 1, explanation: 'CourseGuide Ch 30. יְקַטֵּל and מְקַטֵּל both begin with a vocal Shewa; the Hiphil takes Pathach in exactly those places.', category: 'piel-strong' },
  { id: 'hw11-s1-q3', type: 'mcq', question: 'What vowel stands under the FIRST root consonant of a Piel?', options: ['Qibbuts everywhere', 'Qamets everywhere', 'Pathach in every conjugation except the Perfect', 'Shewa everywhere'], correctIndex: 2, explanation: 'CourseGuide Ch 30. The Perfect קִטֵּל takes Hireq; every other conjugation takes Pathach.', category: 'piel-strong' },
  { id: 'hw11-s1-q4', type: 'mcq', question: 'Which form is the Piel Perfect 3ms of √q-t-l?', options: ['הִקְטִיל', 'נִקְטַל', 'קֻטַּל', 'קִטֵּל'], correctIndex: 3, explanation: 'CourseGuide Ch 30. Hireq under the first root consonant, Daghesh Forte in the second, Tsere as the stem vowel.', category: 'piel-strong' },
  { id: 'hw11-s1-q5', type: 'mcq', question: 'What is the FACTITIVE use of the Piel?', options: ['it makes an intransitive Qal verb transitive', 'it makes an active verb passive', 'it makes a verb plural', 'it turns a verb into a noun'], correctIndex: 0, explanation: 'CourseGuide Ch 30. "To be holy" becomes "to make holy"; a Qal that cannot take an object can do so in the Piel.', category: 'piel-strong' },
  { id: 'hw11-s1-q6', type: 'mcq', question: 'What does the ITERATIVE use of the Piel express?', options: ['a completed action', 'repeated action — often with verbs of movement, effort, or voice', 'a passive action', 'a reflexive action'], correctIndex: 1, explanation: 'CourseGuide Ch 30. It can be hard to render in English, but recognizing it explains many Piel forms that are not obviously intensive.', category: 'piel-strong' },
  { id: 'hw11-s1-q7', type: 'mcq', question: 'Parse: מְקַטֵּל', hebrew: 'מְקַטֵּל', options: ['Hophal Participle', 'Hiphil Participle', 'Piel Participle ms', 'Niphal Participle'], correctIndex: 2, explanation: 'CourseGuide Ch 30. The מ prefix marks the participle of every derived stem; the Shewa, Pathach, and Daghesh Forte make it Piel.', category: 'piel-strong' },
  { id: 'hw11-s1-q8', type: 'mcq', question: 'Translate: שִׁבֵּר', hebrew: 'שִׁבֵּר', options: ['it was smashed', 'smash!', 'he will smash', 'he shattered, smashed to pieces'], correctIndex: 3, explanation: 'CourseGuide Ch 30. The Qal שָׁבַר means "he broke"; the intensive Piel means "he smashed to pieces." Its passive is the Pual שֻׁבַּר.', category: 'piel-strong' },
];

// Section 2 — Chapter 31: the Piel stem, weak verbs.
const sec2: MCQQuestion[] = [
  { id: 'hw11-s2-q1', type: 'mcq', question: 'Which weak class is the ONLY one to change the Piel diagnostics significantly?', options: ['II-Guttural verbs', 'III-ה verbs', 'I-נ verbs', 'geminate verbs'], correctIndex: 0, explanation: 'CourseGuide Ch 31. III-ח/ע, III-א, III-ה and geminate roots all preserve the strong-verb diagnostics.', category: 'piel-weak' },
  { id: 'hw11-s2-q2', type: 'mcq', question: 'Why does a guttural in SECOND root position disturb the Piel?', options: ['because gutturals are always silent', 'because the root loses a letter', 'because gutturals cannot take a Daghesh Forte', 'because gutturals require an extra prefix'], correctIndex: 2, explanation: 'CourseGuide Ch 31. The Piel needs a doubled middle consonant, and a guttural will not carry one.', category: 'piel-weak' },
  { id: 'hw11-s2-q3', type: 'mcq', question: 'What are the two responses when a guttural rejects the expected Daghesh Forte?', options: ['assimilation or elision', 'virtual doubling or compensatory lengthening', 'metathesis or apocopation', 'reduplication or dissimilation'], correctIndex: 1, explanation: 'CourseGuide Ch 31. Virtual doubling keeps the short vowel as though the consonant were doubled; compensatory lengthening lengthens the preceding vowel instead.', category: 'piel-weak' },
  { id: 'hw11-s2-q4', type: 'mcq', question: 'Which three features remain the Piel signature across the weak classes?', options: ['a ה prefix, a Hireq Yod, and a Pathach', 'a נ prefix, a Qamets, and a Tsere', 'a Qibbuts, a Shureq, and a Tsere', 'a Daghesh Forte in the second root consonant, Pathach under the first (except in the Perfect), and Shewa under Imperfect preformatives'], correctIndex: 3, explanation: 'CourseGuide Ch 31. Learn those three and the whole Piel becomes readable, with II-Guttural roots as the single recurring exception.', category: 'piel-weak' },
  { id: 'hw11-s2-q5', type: 'mcq', question: 'Translate: בֵּרַךְ', hebrew: 'בֵּרַךְ', options: ['he blessed', 'he was blessed', 'bless!', 'a blessing'], correctIndex: 0, explanation: 'CourseGuide Ch 31. The ר rejects the Daghesh Forte, so the Hireq of קִטֵּל lengthens to Tsere by compensation.', category: 'piel-weak' },
  { id: 'hw11-s2-q6', type: 'mcq', question: 'Translate: נִחַם', hebrew: 'נִחַם', options: ['he was sorry', 'he comforted, consoled', 'comfort!', 'he will be comforted'], correctIndex: 1, explanation: 'CourseGuide Ch 31. A II-Guttural Piel of נָחַם with virtual doubling. Careful: the נ here is a ROOT letter, not the Niphal stem prefix.', category: 'piel-weak' },
  { id: 'hw11-s2-q7', type: 'mcq', question: 'Which root would you look up for צִוָּה?', hebrew: 'צִוָּה', options: ['צוּר ("rock")', 'צַר ("adversary")', 'צָוָה ("to command") — a III-ה verb', 'יָצָא ("to go out")'], correctIndex: 2, explanation: 'CourseGuide Ch 31. The Daghesh Forte sits in the ו, the second root consonant, and the Qamets-He ending marks the III-ה class.', category: 'piel-weak' },
  { id: 'hw11-s2-q8', type: 'mcq', question: 'Parse: הִלֵּל', hebrew: 'הִלֵּל', options: ['Hiphil Perfect 3ms — "he caused to praise"', 'Qal Perfect 3ms — "he shone"', 'Hophal Perfect 3ms — "he was praised"', 'Piel Perfect 3ms — "he praised"'], correctIndex: 3, explanation: 'CourseGuide Ch 31. A geminate root keeping every Piel diagnostic. Do not read the initial ה as a Hiphil prefix — here it is the first ROOT consonant.', category: 'piel-weak' },
];

// Section 3 — Chapter 32: the Pual stem, strong verbs.
const sec3: MCQQuestion[] = [
  { id: 'hw11-s3-q1', type: 'mcq', question: 'What is the Pual?', options: ['the passive of the Piel', 'the causative of the Qal', 'the reflexive of the Piel', 'the passive of the Hiphil'], correctIndex: 0, explanation: 'CourseGuide Ch 32. שִׁבֵּר ("he smashed") gives שֻׁבַּר ("it was smashed"). Like the Piel it can also be factitive, denominative, or iterative.', category: 'pual-strong' },
  { id: 'hw11-s3-q2', type: 'mcq', question: 'Which single feature distinguishes a Pual from a Piel?', options: ['the Daghesh Forte in the second root consonant', 'a Qibbuts under the first root consonant', 'the Shewa under Imperfect preformatives', 'a נ prefix'], correctIndex: 1, explanation: 'CourseGuide Ch 32. The other two Pual diagnostics are shared with the Piel; only the Qibbuts tells them apart.', category: 'pual-strong' },
  { id: 'hw11-s3-q3', type: 'mcq', question: 'Which form is the Pual Perfect 3ms of √q-t-l?', options: ['קִטֵּל', 'נִקְטַל', 'קֻטַּל', 'הָקְטַל'], correctIndex: 2, explanation: 'CourseGuide Ch 32. Qibbuts under the first root consonant, Daghesh Forte in the second.', category: 'pual-strong' },
  { id: 'hw11-s3-q4', type: 'mcq', question: 'Which Pual conjugations does the CourseGuide have you study?', options: ['all seven', 'only the Participle', 'only the two infinitives', 'the Perfect, Imperfect, and Participle'], correctIndex: 3, explanation: 'CourseGuide Ch 32. The remaining Pual conjugations are rare enough not to be worth memorizing.', category: 'pual-strong' },
  { id: 'hw11-s3-q5', type: 'mcq', question: 'How do you tell the Pual יְקֻטַּל from the Hophal יֻקְטַל?', hebrew: 'יְקֻטַּל / יֻקְטַל', options: ['by WHERE the u-class vowel sits: under the first root consonant (Pual) or under the preformative (Hophal)', 'by the root', 'by the person', 'they cannot be distinguished'], correctIndex: 0, explanation: 'CourseGuide Ch 32. The Pual also doubles the second root consonant, which the Hophal never does — two quick checks.', category: 'pual-strong' },
  { id: 'hw11-s3-q6', type: 'mcq', question: 'Translate: שֻׁבַּר', hebrew: 'שֻׁבַּר', options: ['he smashed', 'it was smashed', 'smash!', 'he will smash'], correctIndex: 1, explanation: 'CourseGuide Ch 32. The Qibbuts turns the Piel שִׁבֵּר into a passive; English needs a form of "to be" to render it.', category: 'pual-strong' },
  { id: 'hw11-s3-q7', type: 'mcq', question: 'Parse: מְקֻטָּל', hebrew: 'מְקֻטָּל', options: ['Piel Participle', 'Hophal Participle', 'Pual Participle ms', 'Hiphil Participle'], correctIndex: 2, explanation: 'CourseGuide Ch 32. All three Pual diagnostics are present: Shewa under the מ prefix, Qibbuts under the first root consonant, Daghesh Forte in the second.', category: 'pual-strong' },
  { id: 'hw11-s3-q8', type: 'mcq', question: 'קִטֵּל and קֻטַּל share their consonants. What differs?', hebrew: 'קִטֵּל / קֻטַּל', options: ['the root', 'the person', 'the number', 'the first vowel — and with it the voice: active Piel versus passive Pual'], correctIndex: 3, explanation: 'CourseGuide Ch 32. One vowel carries the whole difference between "he smashed" and "it was smashed."', category: 'pual-strong' },
];

// Section 4 — Chapter 33: the Pual stem, weak verbs.
const sec4: MCQQuestion[] = [
  { id: 'hw11-s4-q1', type: 'mcq', question: 'Which weak class is the only one to change the Pual diagnostics significantly?', options: ['II-Guttural verbs', 'III-ה verbs', 'III-א verbs', 'I-נ verbs'], correctIndex: 0, explanation: 'CourseGuide Ch 33. Exactly as in the Piel. Both III-א and III-ה verbs keep all the Pual diagnostics intact.', category: 'pual-weak' },
  { id: 'hw11-s4-q2', type: 'mcq', question: 'In a II-Guttural Pual, which diagnostic goes missing?', options: ['the Qibbuts under the first root consonant', 'the Daghesh Forte in the second root consonant', 'the Shewa under the preformative', 'the מ prefix on the participle'], correctIndex: 1, explanation: 'CourseGuide Ch 33. Everything else stays, so a missing Daghesh Forte alone should never make you abandon a Piel or Pual parse.', category: 'pual-weak' },
  { id: 'hw11-s4-q3', type: 'mcq', question: 'What are the three Pual diagnostics?', options: ['a ה prefix, a Hireq Yod, and a Pathach', 'a נ prefix, a Qamets, and a Tsere', 'Qibbuts under the first root consonant, Daghesh Forte in the second, and Shewa under Imperfect preformatives', 'a Shureq prefix vowel and a Pathach stem vowel'], correctIndex: 2, explanation: 'CourseGuide Ch 33. The first separates the Pual from the Piel; the other two are shared with it.', category: 'pual-weak' },
  { id: 'hw11-s4-q4', type: 'mcq', question: 'How do III-ה verbs behave in the Pual?', options: ['they lose the Qibbuts', 'they lose the Daghesh Forte', 'they cannot appear in the Pual', 'they keep all the Pual diagnostics, plus the familiar III-ה endings'], correctIndex: 3, explanation: 'CourseGuide Ch 33. וַיְכֻלּוּ ("they were finished," Gen 2:1) shows the Qibbuts and Daghesh Forte exactly as the strong verb does.', category: 'pual-weak' },
  { id: 'hw11-s4-q5', type: 'mcq', question: 'Translate: מְבֹרָךְ', hebrew: 'מְבֹרָךְ', options: ['blessed, being blessed', 'blessing', 'he blessed', 'bless!'], correctIndex: 0, explanation: 'CourseGuide Ch 33. A Pual participle of בָּרַךְ: the ר rejects the Daghesh Forte, so the Qibbuts lengthens to Holem.', category: 'pual-weak' },
  { id: 'hw11-s4-q6', type: 'mcq', question: 'Translate: יֻלַּד', hebrew: 'יֻלַּד', options: ['he gave birth', 'he was born', 'he will beget', 'let him be born'], correctIndex: 1, explanation: 'CourseGuide Ch 33. A Pual of יָלַד with Qibbuts and Daghesh Forte intact — "For to us a child is born" (Isa 9:6).', category: 'pual-weak' },
  { id: 'hw11-s4-q7', type: 'mcq', question: 'Which root would you look up for נֻחָמָה?', hebrew: 'נֻחָמָה', options: ['נוּחַ ("to rest")', 'לָחַם ("to fight")', 'נָחַם ("to comfort") — a II-Guttural verb', 'חָמַם ("to be hot")'], correctIndex: 2, explanation: 'CourseGuide Ch 33. The ח cannot take the Daghesh Forte, but the Qibbuts still marks the passive: "not comforted" (Isa 54:11).', category: 'pual-weak' },
  { id: 'hw11-s4-q8', type: 'mcq', question: 'Which three stems share the doubled second root consonant?', options: ['Niphal, Hiphil, and Hophal', 'Qal, Niphal, and Hiphil', 'Hiphil, Hophal, and Hithpael', 'Piel, Pual, and Hithpael'], correctIndex: 3, explanation: 'CourseGuide Ch 30-33. They form one family: once you see the Daghesh Forte in the middle root consonant, the vowels and prefixes decide which of the three you are reading.', category: 'pual-weak' },
];

// Section 5 — Chapter 30-33 vocabulary ("You Should Know" lists).
const sec5: PairedMCQQuestion[] = [
  vocab('hw11-s5-q1', 'חָלַל', 'chalal', ['chanan', 'charah', 'chalah'], 0, '(Piel) to profane, pollute, defile', ['to be gracious', 'to burn with anger', 'to be sick'], 1, 'Ch 30 vocab. Its Hophal, הוּחַל, means "it was begun" (Gen 4:26).'),
  vocab('hw11-s5-q2', 'שָׁבַע', 'shava', ['shavat', 'shavar', 'sava'], 1, '(Niphal) to swear, take an oath', ['to cease', 'to break', 'to be satisfied'], 3, 'Ch 30 vocab. Related to שֶׁבַע ("seven") — an oath was sworn "by sevening" oneself.'),
  vocab('hw11-s5-q3', 'זְרוֹעַ', 'zeroa', ['zera', 'zavach', 'zaaq'], 2, 'arm, forearm; (figuratively) strength', ['seed', 'sacrifice', 'outcry'], 0, 'Ch 30 vocab. "The LORD has bared his holy arm" (Isa 52:10).'),
  vocab('hw11-s5-q4', 'אוֹצָר', 'otsar', ['ot', 'or', 'aven'], 3, 'treasure, treasury, storehouse', ['sign', 'light', 'iniquity'], 2, 'Ch 31 vocab. Used of both a royal treasury and the LORD\'s storehouses of snow and wind.'),
  vocab('hw11-s5-q5', 'מִקְנֶה', 'miqneh', ['mizrach', 'migrash', 'miqdash'], 0, 'cattle, livestock, property', ['east', 'pastureland', 'sanctuary'], 1, 'Ch 31 vocab. From קָנָה ("to acquire") — livestock as acquired wealth.'),
  vocab('hw11-s5-q6', 'נָבַט', 'nabat', ['nagad', 'nagash', 'nasa'], 1, '(Hiphil) to look at, gaze, behold', ['to tell', 'to draw near', 'to lift'], 2, 'Ch 32 vocab. "Look to me and be saved, all the ends of the earth" (Isa 45:22).'),
  vocab('hw11-s5-q7', 'רִיב', 'riv', ['rachats', 'radaf', 'rakhav'], 2, 'to strive, contend, conduct a legal case', ['to wash', 'to pursue', 'to ride'], 0, 'Ch 32 vocab. A Biconsonantal verb; the noun רִיב means "a lawsuit, dispute."'),
  vocab('hw11-s5-q8', 'קֶשֶׁת', 'qeshet', ['qeren', 'qir', 'qatseh'], 3, 'bow, weapon', ['horn', 'wall', 'end, border'], 2, 'Ch 32 vocab. The bow God sets in the clouds as the sign of the covenant (Gen 9:13).'),
  vocab('hw11-s5-q9', 'עָנָה', 'anah', ['azar', 'azav', 'arakh'], 0, 'to be afflicted, humbled; (Piel) to afflict, oppress', ['to help', 'to forsake', 'to arrange'], 1, 'Ch 33 vocab. Its Piel is used of Egypt afflicting Israel (Ex 1:11).'),
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

export const hw11Sections = { 1: sec1, 2: sec2, 3: sec3, 4: sec4, 5: sec5, 6: sec6 };

export const hw11Meta: ExtendedHomeworkMeta = {
  id: 'hw11',
  title: 'HW11: The Piel and Pual Stems',
  shortTitle: 'HW11',
  description: 'CourseGuide for BBH (Pratico/Van Pelt) Chapters 30-33 (Sessions 30-33): the intensive Piel stem in strong and weak verbs, and its passive counterpart the Pual — plus new Chapter 30-33 vocabulary and verse-translation practice.',
  topics: ['Ch 30: Piel strong verbs', 'Ch 31: Piel weak verbs', 'Ch 32: Pual strong verbs', 'Ch 33: Pual weak verbs', 'Ch 30-33 vocabulary', 'Verse translation'],
  totalQuestions: sec1.length + sec2.length + sec3.length + sec4.length + sec5.length + sec6.length,
  sections: [
    { id: 1, title: 'Ch 30 — The Piel Stem (Strong)', description: 'The doubled middle consonant, and the intensive and factitive uses', questionCount: sec1.length },
    { id: 2, title: 'Ch 31 — The Piel Stem (Weak)', description: 'Why only a guttural in second position disturbs the Piel', questionCount: sec2.length },
    { id: 3, title: 'Ch 32 — The Pual Stem (Strong)', description: 'The passive of the Piel, marked by a Qibbuts under the first root consonant', questionCount: sec3.length },
    { id: 4, title: 'Ch 33 — The Pual Stem (Weak)', description: 'The same weak-class behaviour as the Piel, one vowel class over', questionCount: sec4.length },
    { id: 5, title: 'Ch 30-33 Vocabulary', description: 'Read and translate the new "You Should Know" words', questionCount: sec5.length },
    { id: 6, title: 'Verse Translation', description: 'Translate familiar clauses built on Piel and Pual verbs', questionCount: sec6.length },
  ],
  sectionQuestions: hw11Sections,
};
