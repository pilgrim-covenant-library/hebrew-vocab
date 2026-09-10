// HW6 — Qal Perfect Weak Verbs and the Qal Imperfect (Strong and Weak).
// CourseGuide for BBH (Pratico/Van Pelt) Chapters 14-16 (Sessions 14-16),
// plus the new Chapter 14-16 vocabulary and verse-translation practice.

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

// Section 1 — Chapter 14: Qal Perfect Weak Verbs.
const sec1: MCQQuestion[] = [
  { id: 'hw6-s1-q1', type: 'mcq', question: 'Even in WEAK verbs, one thing never changes. What?', options: ['the Perfect sufformatives', 'the meaning of the verb', 'the number of root letters', 'the word order of the clause'], correctIndex: 0, explanation: 'CourseGuide Ch 14. The Perfect sufformatives (־תִּי, ־תָּ, ־נוּ, ...) stay the same no matter how weak the root is. What changes is the spelling of the root, not the endings — so master the strong paradigm first.', category: 'perfect-weak' },
  { id: 'hw6-s1-q2', type: 'mcq', question: 'Why do guttural consonants cause changes in weak verbs?', options: ['they double automatically', 'they always drop out', 'they take the article', 'they cannot take a vocal shewa and prefer an a-type vowel'], correctIndex: 3, explanation: 'CourseGuide Ch 14. Gutturals (א, ה, ח, ע) reject a vocal shewa and prefer an a-type vowel (usually Hateph Pathach). This explains most changes in I-guttural and II-guttural verbs.', category: 'perfect-weak' },
  { id: 'hw6-s1-q3', type: 'mcq', question: 'In a III-ה weak verb, the final ה of the root:', options: ['stays in every form', 'drops out in all Qal Perfect forms', 'becomes a ת', 'doubles'], correctIndex: 1, explanation: 'CourseGuide Ch 14. The final ה is lost throughout the Qal Perfect (בָּנָה → בָּנִיתָ). III-ה verbs were originally III-י verbs, which is why a Yod resurfaces in the endings.', category: 'perfect-weak' },
  { id: 'hw6-s1-q4', type: 'mcq', question: 'The diagnostic stem vowel in the 1st/2nd-person forms of a III-ה perfect (e.g. בָּנִיתָ) is:', options: ['Holem Waw', 'Qamets', 'Hireq Yod (ִי)', 'Shureq'], correctIndex: 2, explanation: 'CourseGuide Ch 14. All first- and second-person III-ה forms take the diagnostic Hireq Yod stem vowel: בָּנִיתָ ("you built"), רָאִיתִי ("I saw").', category: 'perfect-weak' },
  { id: 'hw6-s1-q5', type: 'mcq', question: 'Translate: בָּנְתָה', hebrew: 'בָּנְתָה', options: ['she built', 'you (2ms) built', 'you (2fs) built', 'he built'], correctIndex: 0, explanation: 'CourseGuide Ch 14. בָּנָה ("to build") + the 3fs ending ־ָה → בָּנְתָה = "she built."', category: 'perfect-weak' },
  { id: 'hw6-s1-q6', type: 'mcq', question: 'Translate: רָאִיתָ', hebrew: 'רָאִיתָ', options: ['you (2fs) saw', 'you (2ms) saw', 'I saw', 'we saw'], correctIndex: 1, explanation: 'CourseGuide Ch 14. רָאָה ("to see") + the 2ms ending ־תָ, with the diagnostic Hireq Yod → רָאִיתָ = "you (2ms) saw."', category: 'perfect-weak' },
  { id: 'hw6-s1-q7', type: 'mcq', question: 'Translate: קָם', hebrew: 'קָם', options: ['he rose', 'she rose', 'I rose', 'we rose'], correctIndex: 0, explanation: 'CourseGuide Ch 14. קוּם ("to rise") is a Biconsonantal (hollow) verb. The 3ms Perfect is קָם ("he rose"), with Qamets under the first root consonant.', category: 'perfect-weak' },
  { id: 'hw6-s1-q8', type: 'mcq', question: 'A Biconsonantal (hollow) verb like קוּם ("to rise") shows which vowel under the first root letter in the 3rd person?', options: ['Tsere', 'Pathach', 'Qamets (קָם)', 'Hireq'], correctIndex: 2, explanation: 'CourseGuide Ch 14. Third-person Biconsonantal forms take Qamets under the first root consonant (קָם, קָמָה), while first- and second-person forms take Pathach (קַמְתָּ).', category: 'perfect-weak' },
  { id: 'hw6-s1-q9', type: 'mcq', question: 'In a III-א weak verb (e.g. מָצָא), the א is:', options: ['doubled with Daghesh Forte', 'replaced by ה in all forms', 'always carrying the accent', 'quiescent, causing the ת to lose Daghesh Lene'], correctIndex: 3, explanation: 'CourseGuide Ch 14. The א of a III-א verb quiesces (goes silent). Because the ת of the sufformative is now preceded by a vowel sound, it loses its Daghesh Lene (מָצָאתָ).', category: 'perfect-weak' },
  { id: 'hw6-s1-q10', type: 'mcq', question: 'In Geminate verbs (like סָבַב "to go around"), the diagnostic connecting vowel in the 1st/2nd-person forms is:', options: ['Hireq Yod', 'Qamets Hatuf', 'Holem Waw (וֹ)', 'Shewa'], correctIndex: 2, explanation: 'CourseGuide Ch 14. Geminate verbs assimilate the first repeated letter into the second (Daghesh Forte) and add a Holem Waw connecting vowel: סַבּוֹתָ. That Holem Waw is the diagnostic.', category: 'perfect-weak' },
];

// Section 2 — Chapter 15: Qal Imperfect Strong Verbs.
const sec2: MCQQuestion[] = [
  { id: 'hw6-s2-q1', type: 'mcq', question: 'The Imperfect conjugation expresses:', options: ['completed action', 'incomplete action (present or future)', 'a command', 'a state of being'], correctIndex: 1, explanation: 'CourseGuide Ch 15. The Imperfect expresses incomplete action, translated with the English present or future ("he writes / will write"). Compare the Perfect (completed action, Ch 13).', category: 'imperfect-strong' },
  { id: 'hw6-s2-q2', type: 'mcq', question: 'The Imperfect is also called the ___ conjugation, because every form takes a preformative.', options: ['suffix', 'stative', 'construct', 'prefix'], correctIndex: 3, explanation: 'CourseGuide Ch 15. It is the "prefix conjugation": each form begins with a preformative (י, ת, א, נ) that marks the subject. Contrast the Perfect ("suffix conjugation").', category: 'imperfect-strong' },
  { id: 'hw6-s2-q3', type: 'mcq', question: 'Which form is the Qal Imperfect 3ms of √q-t-l ("kill")?', options: ['יִקְטֹל', 'קָטַל', 'קֹטֵל', 'קָטוּל'], correctIndex: 0, explanation: 'CourseGuide Ch 15. יִקְטֹל = "he will kill" (Qal Imperfect 3ms). קָטַל is the Perfect ("he killed"); קֹטֵל is the participle; קָטוּל is the passive participle.', category: 'imperfect-strong' },
  { id: 'hw6-s2-q4', type: 'mcq', question: 'The Imperfect preformatives are י (he), ת (she/you), א (I), and נ (we). What do they tell you?', options: ['the tense', 'the stem', 'the person, gender, and number of the subject', 'the object'], correctIndex: 2, explanation: 'CourseGuide Ch 15. Unlike the Perfect (which uses endings), the Imperfect marks the subject mainly with these PREFIXES — sometimes with an added ending too (e.g. ־ִי for 2fs, ־וּ for plurals).', category: 'imperfect-strong' },
  { id: 'hw6-s2-q5', type: 'mcq', question: 'The vowel pattern that identifies the Qal Imperfect strong verb (יִקְטֹל) is:', options: ['Qamets–Pathach', 'Tsere throughout', 'Pathach under the prefix', 'Hireq under the prefix, then a Holem stem vowel'], correctIndex: 3, explanation: 'CourseGuide Ch 15. The diagnostic Qal Imperfect strong pattern is Hireq under the preformative and a Holem stem vowel: יִקְטֹל, יִשְׁמֹר.', category: 'imperfect-strong' },
  { id: 'hw6-s2-q6', type: 'mcq', question: 'Imperfect verbs can be negated by two particles. Which pair?', options: ['לֹא and אַל', 'הַ and וְ', 'אֵת and מִן', 'כִּי and אִם'], correctIndex: 0, explanation: 'CourseGuide Ch 15. Both לֹא and אַל negate the Imperfect. לֹא expresses a permanent/absolute prohibition; אַל expresses an immediate, specific one.', category: 'imperfect-strong' },
  { id: 'hw6-s2-q7', type: 'mcq', question: 'The particle אַל before an Imperfect expresses:', options: ['a permanent prohibition', 'a wish', 'an immediate, specific prohibition ("do not!")', 'a question'], correctIndex: 2, explanation: 'CourseGuide Ch 15. אַל gives an immediate, specific "do not!" (אַל־תִּירָא "do not fear"), whereas לֹא gives an absolute, permanent prohibition ("you shall not...").', category: 'imperfect-strong' },
  { id: 'hw6-s2-q8', type: 'mcq', question: 'Translate: יִשְׁמֹר', hebrew: 'יִשְׁמֹר', options: ['he kept', 'they will keep', 'I will keep', 'he will keep / guard'], correctIndex: 3, explanation: 'CourseGuide Ch 15. שָׁמַר ("to keep, guard") in the Qal Imperfect 3ms is יִשְׁמֹר = "he will keep/guard" — the classic Hireq-preformative + Holem pattern.', category: 'imperfect-strong' },
  { id: 'hw6-s2-q9', type: 'mcq', question: 'Translate: אֶכְתֹּב', hebrew: 'אֶכְתֹּב', options: ['I will write', 'he will write', 'you will write', 'we will write'], correctIndex: 0, explanation: 'CourseGuide Ch 15. The א preformative marks 1cs: אֶכְתֹּב = "I will write" (from כָּתַב).', category: 'imperfect-strong' },
  { id: 'hw6-s2-q10', type: 'mcq', question: 'Translate: אַל־תִּכְתֹּב בַּסֵּפֶר', hebrew: 'אַל־תִּכְתֹּב בַּסֵּפֶר', options: ['She will not write in the book!', 'Do not write in the book!', 'You shall never write in the book!', 'She will never write in the book!'], correctIndex: 1, explanation: 'CourseGuide Ch 15. אַל + the 2ms Imperfect תִּכְתֹּב = an immediate prohibition: "Do not write in the book!" בַּסֵּפֶר = "in the book" (בְּ + article + סֵפֶר).', category: 'imperfect-strong' },
];

// Section 3 — Chapter 16: Qal Imperfect Weak Verbs.
const sec3: MCQQuestion[] = [
  { id: 'hw6-s3-q1', type: 'mcq', question: 'Four weak verb classes appear with only TWO root letters in the Qal Imperfect. To parse them you must:', options: ['recognize the diagnostic that reveals the missing letter', 'ignore the vowels', 'assume the root is Biconsonantal', 'add a ה to the end'], correctIndex: 0, explanation: 'CourseGuide Ch 16. When a root letter drops or assimilates, you reconstruct it from a diagnostic clue (a preformative vowel or a Daghesh Forte) so you can parse and look up the verb.', category: 'imperfect-weak' },
  { id: 'hw6-s3-q2', type: 'mcq', question: 'A I-נ verb (like נָפַל "to fall") in the Imperfect:', options: ['keeps its נ visible', 'drops the נ with no trace', 'assimilates its נ into a Daghesh Forte', 'doubles the initial נ'], correctIndex: 2, explanation: 'CourseGuide Ch 16. The נ assimilates into the second root letter, leaving a Daghesh Forte: נָפַל → יִפֹּל ("he will fall"). That Daghesh Forte is how you recover the missing נ.', category: 'imperfect-weak' },
  { id: 'hw6-s3-q3', type: 'mcq', question: 'Which other common verb also behaves like a I-נ verb, assimilating its first letter?', options: ['הָלַךְ ("to walk")', 'לָקַח ("to take")', 'יָלַד ("to bear")', 'לָמַד ("to learn")'], correctIndex: 1, explanation: 'CourseGuide Ch 16. לָקַח ("to take") assimilates its ל exactly like a I-נ verb: יִקַּח ("he will take"), with a Daghesh Forte in the ק.', category: 'imperfect-weak' },
  { id: 'hw6-s3-q4', type: 'mcq', question: 'A I-י verb (like יָשַׁב) often drops its first letter but is identifiable by:', options: ['a doubled second letter', 'a final ה', 'the retained yod', 'a Tsere or Hireq-Yod under the preformative'], correctIndex: 3, explanation: 'CourseGuide Ch 16. I-י verbs typically lose the initial י but leave a Tsere (Type 1) or Hireq-Yod (Type 2) preformative vowel: יָשַׁב → יֵשֵׁב ("he will sit"). הָלַךְ inflects like a Type 1 I-י verb (תֵּלֵךְ).', category: 'imperfect-weak' },
  { id: 'hw6-s3-q5', type: 'mcq', question: 'Parse: אֹמַר', hebrew: 'אֹמַר', options: ['Qal Perfect 3ms of אמר', 'Qal Imperfect 1cs of אמר', 'Qal Perfect 1cs of אמר', 'Qal Imperfect 3ms of אמר'], correctIndex: 1, explanation: 'CourseGuide Ch 16. The א preformative marks 1cs Imperfect: אֹמַר = "I will say" (from אָמַר, a I-guttural verb).', category: 'imperfect-weak' },
  { id: 'hw6-s3-q6', type: 'mcq', question: 'Parse: תֵּלֵךְ', hebrew: 'תֵּלֵךְ', options: ['Qal Imperfect 2ms of ילך', 'Qal Perfect 3fs of הלך', 'Qal Imperfect 3ms of הלך', 'Qal Imperfect 3fs or 2ms of הלך'], correctIndex: 3, explanation: 'CourseGuide Ch 16. תֵּלֵךְ = Qal Imperfect 3fs or 2ms of הָלַךְ ("to walk"), which behaves like a I-י verb (note the Tsere preformative). The ת prefix can be either 3fs or 2ms.', category: 'imperfect-weak' },
  { id: 'hw6-s3-q7', type: 'mcq', question: 'A III-ה verb in the Imperfect (with no ending) is recognized by its distinctive ending:', options: ['a Seghol-He ending', 'a Hireq Yod ending', 'a final ת ending', 'a Holem Waw ending'], correctIndex: 0, explanation: 'CourseGuide Ch 16. III-ה verbs keep a distinctive Seghol-He ending in forms without a sufformative: יִבְנֶה ("he will build"), יַעֲשֶׂה ("he will do").', category: 'imperfect-weak' },
  { id: 'hw6-s3-q8', type: 'mcq', question: 'Translate: יִבְנֶה', hebrew: 'יִבְנֶה', options: ['he built', 'they will build', 'she will build', 'he will build'], correctIndex: 3, explanation: 'CourseGuide Ch 16. בָּנָה ("to build," III-ה) in the Qal Imperfect 3ms is יִבְנֶה = "he will build" (Seghol-He ending).', category: 'imperfect-weak' },
  { id: 'hw6-s3-q9', type: 'mcq', question: 'Translate: תִּירָא', hebrew: 'תִּירָא', options: ['do not fear', 'you (2ms) / she will fear', 'I feared', 'they feared'], correctIndex: 1, explanation: 'CourseGuide Ch 16. יָרֵא ("to fear," a I-י / III-א verb) in the Imperfect gives תִּירָא = "you (2ms) will fear" or "she will fear." With אַל before it: אַל־תִּירָא = "do not fear."', category: 'imperfect-weak' },
  { id: 'hw6-s3-q10', type: 'mcq', question: 'In II-guttural and III-ע/ח Imperfect verbs, the stem vowel shifts to Pathach because:', options: ['gutturals prefer a-type vowels', 'the syllable is open', 'of the missing Nun', 'of the article'], correctIndex: 0, explanation: 'CourseGuide Ch 16. Gutturals prefer a-type vowels, so the expected Holem stem vowel becomes a Pathach next to a guttural (יִשְׁלַח "he will send," יִשְׁמַע "he will hear").', category: 'imperfect-weak' },
];

// Section 4 — Chapter 14-16 vocabulary ("You Should Know" lists).
const sec4: PairedMCQQuestion[] = [
  vocab('hw6-s4-q1', 'בָּנָה', 'banah', ['bo', 'yalad', 'avar'], 0, 'to build', ['to come in', 'to give birth', 'to pass over'], 1, 'Ch 14 vocab. A III-ה weak verb; "Unless the LORD builds (יִבְנֶה) the house..." (Ps 127:1).'),
  vocab('hw6-s4-q2', 'יָלַד', 'yalad', ['yarad', 'yashav', 'yare'], 2, 'to bear, give birth, beget', ['to go down', 'to fear', 'to take'], 0, 'Ch 14 vocab. A I-י weak verb; the root behind תּוֹלְדוֹת ("generations").'),
  vocab('hw6-s4-q3', 'לָקַח', 'laqach', ['karat', 'avar', 'nasa'], 1, 'to take, grasp, seize', ['to cut', 'to pass over', 'to lift'], 3, 'Ch 14 vocab. Behaves like a I-נ verb in the Imperfect (יִקַּח "he will take").'),
  vocab('hw6-s4-q4', 'מוּת', 'mut', ['bo', 'sur', 'avad'], 0, 'to die', ['to come in', 'to turn aside', 'to serve'], 2, 'Ch 14 vocab. A Biconsonantal (hollow) verb; "you shall surely die" (מוֹת תָּמוּת, Gen 2:17).'),
  vocab('hw6-s4-q5', 'נָשָׂא', 'nasa', ['natan', 'nafal', 'natah'], 3, 'to lift, carry, bear', ['to give', 'to fall', 'to stretch out'], 0, 'Ch 14 vocab. "I lift up (אֶשָּׂא) my eyes to the hills" (Ps 121:1).'),
  vocab('hw6-s4-q6', 'עָבַר', 'avar', ['avad', 'azav', 'anah'], 1, 'to pass over, cross', ['to serve', 'to forsake', 'to answer'], 1, 'Ch 14 vocab. The root behind עִבְרִי ("Hebrew" — "one who crosses over").'),
  vocab('hw6-s4-q7', 'חָיָה', 'chayah', ['chata', 'karat', 'kafar'], 2, 'to live, be alive', ['to sin', 'to cut', 'to atone'], 3, 'Ch 15 vocab. A III-ה weak verb; "the righteous shall live (יִחְיֶה) by his faith" (Hab 2:4).'),
  vocab('hw6-s4-q8', 'עָבַד', 'avad', ['avar', 'azav', 'anah'], 0, 'to work, serve, toil', ['to pass over', 'to forsake', 'to answer'], 2, 'Ch 15 vocab. The root behind עֶבֶד ("servant") and עֲבֹדָה ("service, worship").'),
  vocab('hw6-s4-q9', 'כָּרַת', 'karat', ['chayah', 'kafar', 'qarav'], 3, 'to cut; to make a covenant', ['to live', 'to atone', 'to draw near'], 0, 'Ch 15 vocab. The idiom כָּרַת בְּרִית ("to cut a covenant") = to make one.'),
  vocab('hw6-s4-q10', 'חָטָא', 'chata', ['chayah', 'kafar', 'karat'], 1, 'to sin, miss the mark', ['to live', 'to atone', 'to cut'], 3, 'Ch 16 vocab. Literally "to miss (a target)"; the root behind חַטָּאת ("sin," Ch 9).'),
  vocab('hw6-s4-q11', 'עָזַב', 'azav', ['avad', 'avar', 'anah'], 2, 'to leave, forsake, abandon', ['to serve', 'to pass over', 'to answer'], 1, 'Ch 16 vocab. "My God, why have you forsaken (עֲזַבְתָּנִי) me?" (Ps 22:1).'),
  vocab('hw6-s4-q12', 'שָׁתָה', 'shatah', ['shalach', 'shamar', 'natah'], 0, 'to drink', ['to send', 'to keep', 'to stretch out'], 2, 'Ch 16 vocab. A III-ה weak verb; pairs with אָכַל ("to eat," Ch 12).'),
];

// Section 5 — Verse translation: familiar clauses featuring Qal Imperfect and
// weak verbs, within the vocabulary and grammar of Chapters 1-16.
const sec5: MCQQuestion[] = [
  { id: 'hw6-s5-q1', type: 'mcq', question: 'Translate this clause (Exodus 15:18).', hebrew: 'יְהוָה יִמְלֹךְ לְעֹלָם וָעֶד', options: ['The LORD is king over all the earth.', 'The LORD has reigned from of old.', 'The LORD will reign forever and ever.', 'The LORD is my strength and my song.'], correctIndex: 2, explanation: 'יִמְלֹךְ = "he will reign" — a Qal Imperfect 3ms strong verb (Ch 15), with the Hireq-preformative + Holem pattern; לְעֹלָם וָעֶד = "forever and ever."', category: 'verse' },
  { id: 'hw6-s5-q2', type: 'mcq', question: 'Translate this clause (Psalm 121:1).', hebrew: 'אֶשָּׂא עֵינַי אֶל־הֶהָרִים', options: ['I will lift up my eyes to the hills.', 'My help comes from the LORD.', 'I will bless the LORD at all times.', 'I lift up my soul to you, O LORD.'], correctIndex: 0, explanation: 'אֶשָּׂא = "I will lift up" — the Qal Imperfect 1cs of נָשָׂא, a weak verb (Ch 14/16); עֵינַי = "my eyes" (Type 2 suffix, Ch 9); אֶל־הֶהָרִים = "to the hills."', category: 'verse' },
  { id: 'hw6-s5-q3', type: 'mcq', question: 'Translate this clause (Genesis 15:1).', hebrew: 'אַל־תִּירָא אַבְרָם', options: ['Fear the LORD, O Abram.', 'Do not fear, Abram.', 'Abram believed the LORD.', 'Arise and walk, Abram.'], correctIndex: 1, explanation: 'אַל + the Imperfect תִּירָא (from יָרֵא "to fear," a weak verb, Ch 16) = an immediate prohibition: "Do not fear, Abram."', category: 'verse' },
  { id: 'hw6-s5-q4', type: 'mcq', question: 'Translate this clause (Psalm 23:1).', hebrew: 'יְהוָה רֹעִי לֹא אֶחְסָר', options: ['The LORD is my rock and my fortress.', 'The LORD leads me beside still waters.', 'The LORD is my light and my salvation.', 'The LORD is my shepherd; I shall not want.'], correctIndex: 3, explanation: 'A verbless clause (יְהוָה רֹעִי "the LORD is my shepherd," Ch 9 suffix) + לֹא אֶחְסָר = "I shall not lack" — לֹא (Ch 13) negating the Qal Imperfect 1cs אֶחְסָר (Ch 15).', category: 'verse' },
  { id: 'hw6-s5-q5', type: 'mcq', question: 'Translate this clause (Psalm 127:1).', hebrew: 'אִם־יְהוָה לֹא־יִבְנֶה בַיִת', options: ['If the LORD wills, we shall build a house.', 'Unless the LORD builds the house...', 'The LORD has built his house on the rock.', 'Blessed is the house that the LORD builds.'], correctIndex: 1, explanation: 'אִם ("if/unless") + לֹא + יִבְנֶה ("he builds," Qal Imperfect 3ms of בָּנָה, a III-ה weak verb, Ch 16) + בַיִת ("a house") → "Unless the LORD builds the house..."', category: 'verse' },
  { id: 'hw6-s5-q6', type: 'mcq', question: 'Translate this clause (Genesis 2:17).', hebrew: 'מוֹת תָּמוּת', options: ['you shall surely die', 'you will not die', 'he died', 'let him live'], correctIndex: 0, explanation: 'תָּמוּת = "you will die" — the Qal Imperfect 2ms of מוּת, a Biconsonantal weak verb (Ch 14). The infinitive absolute מוֹת before it intensifies: "you shall SURELY die."', category: 'verse' },
  { id: 'hw6-s5-q7', type: 'mcq', question: 'Translate this command (Exodus 20:13).', hebrew: 'לֹא תִּרְצָח', options: ['Do not steal.', 'Honor your father.', 'Do not covet.', 'You shall not murder.'], correctIndex: 3, explanation: 'לֹא (absolute prohibition, Ch 13) + the Qal Imperfect 2ms תִּרְצָח ("you will murder") → "You shall not murder" — one of the Ten Commandments.', category: 'verse' },
  { id: 'hw6-s5-q8', type: 'mcq', question: 'Translate this clause (Habakkuk 2:4).', hebrew: 'וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה', options: ['The wicked will not stand in the judgment.', 'The LORD tests the righteous and the wicked.', 'But the righteous shall live by his faith.', 'The righteous will flourish like a palm tree.'], correctIndex: 2, explanation: 'צַדִּיק ("righteous one") + בֶּאֱמוּנָתוֹ ("by his faith," with a 3ms suffix, Ch 9) + יִחְיֶה ("he will live," Qal Imperfect 3ms of חָיָה, a III-ה weak verb, Ch 15/16).', category: 'verse' },
];

export const hw6Sections = { 1: sec1, 2: sec2, 3: sec3, 4: sec4, 5: sec5 };

export const hw6Meta: ExtendedHomeworkMeta = {
  id: 'hw6',
  title: 'HW6: Qal Perfect (Weak) and the Qal Imperfect',
  shortTitle: 'HW6',
  description: 'CourseGuide for BBH (Pratico/Van Pelt) Chapters 14-16 (Sessions 14-16): the Qal Perfect of weak verbs, and the Qal Imperfect of both strong and weak verbs — plus new Chapter 14-16 vocabulary and verse-translation practice.',
  topics: ['Ch 14: Qal Perfect weak verbs', 'Ch 15: Qal Imperfect strong verbs', 'Ch 16: Qal Imperfect weak verbs', 'Ch 14-16 vocabulary', 'Verse translation'],
  totalQuestions: sec1.length + sec2.length + sec3.length + sec4.length + sec5.length,
  sections: [
    { id: 1, title: 'Ch 14 — Qal Perfect Weak Verbs', description: 'How weak roots (guttural, III-ה, III-א, hollow, geminate) reshape the Perfect', questionCount: sec1.length },
    { id: 2, title: 'Ch 15 — Qal Imperfect Strong Verbs', description: 'The prefix conjugation: incomplete action, preformatives, and prohibitions', questionCount: sec2.length },
    { id: 3, title: 'Ch 16 — Qal Imperfect Weak Verbs', description: 'Reconstructing dropped or assimilated root letters (I-נ, I-י, III-ה, geminate)', questionCount: sec3.length },
    { id: 4, title: 'Ch 14-16 Vocabulary', description: 'Read and translate the new "You Should Know" words', questionCount: sec4.length },
    { id: 5, title: 'Verse Translation', description: 'Translate familiar clauses that use Qal Imperfect and weak verbs', questionCount: sec5.length },
  ],
  sectionQuestions: hw6Sections,
};
