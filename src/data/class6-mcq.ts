// Class 6 practice — CourseGuide for BBH Chapters 14-16: the Qal Perfect of
// weak verbs, the Qal Imperfect of strong verbs, and the Qal Imperfect of weak
// verbs, plus the Chapter 14-16 "You Should Know" vocabulary and verse
// translation whose grammar stays within Chapters 1-16.

import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function asGroups(questions: PracticeQuestion[]): PracticeQuestionGroup[] {
  return questions.map((question) => ({ id: question.id, questions: [question] }));
}

// Chapter 14 — the Qal Perfect of weak verbs: the endings never change, only
// the spelling of the root.
const perfectWeakQuestions: PracticeQuestion[] = [
  { id: 'class6-pw-1', prompt: 'In a WEAK verb, what stays exactly the same as in the strong Qal Perfect?', options: ['the sufformative endings', 'the meaning of the verb', 'the number of root letters that appear', 'the word order of the clause'], correctIndex: 0, explanation: 'The Perfect endings never change, however weak the root is. What changes is the spelling of the ROOT — so master the strong paradigm first, then learn what each weak class does to it.', category: 'perfect-weak' },
  { id: 'class6-pw-2', prompt: 'Translate this Qal Perfect verb.', hebrew: 'בָּנְתָה', options: ['he built', 'she built', 'you built', 'they built'], correctIndex: 1, explanation: 'בָּנָה ("to build," a III-ה verb) + the 3fs ending ־ָה gives בָּנְתָה = "she built." The accent shift reduces the first stem vowel to shewa.', category: 'perfect-weak' },
  { id: 'class6-pw-3', prompt: 'Translate this Qal Perfect verb.', hebrew: 'רָאִיתִי', options: ['you saw', 'we saw', 'I saw', 'she saw'], correctIndex: 2, explanation: 'רָאָה ("to see") + the 1cs ending ־תִּי, with the diagnostic Hireq Yod of a III-ה verb, gives רָאִיתִי = "I saw."', category: 'perfect-weak' },
  { id: 'class6-pw-4', prompt: 'Translate this clause (Genesis 6:8 uses the same verb).', hebrew: 'מָצָאתִי חֵן', options: ['he found favor', 'she found favor', 'they found favor', 'I found favor'], correctIndex: 3, explanation: 'מָצָא ("to find," a III-א verb) + the 1cs ending ־תִּי = "I found"; חֵן = "favor, grace." Because the א is quiescent, the ת loses its Daghesh Lene.', category: 'perfect-weak' },
  { id: 'class6-pw-5', prompt: 'Translate this Qal Perfect verb.', hebrew: 'קָם', options: ['he arose', 'she arose', 'I arose', 'we arose'], correctIndex: 0, explanation: 'קוּם ("to arise") is Biconsonantal (hollow): the middle וּ disappears in the Perfect, leaving קָם = "he arose," with Qamets in the third person.', category: 'perfect-weak' },
  { id: 'class6-pw-6', prompt: 'Translate this Qal Perfect verb.', hebrew: 'מֵת', options: ['he lives', 'he died', 'he will die', 'they died'], correctIndex: 1, explanation: 'מוּת ("to die") is Biconsonantal, and its 3ms Perfect is מֵת = "he died" — a Tsere form, so it is worth memorizing next to קָם ("he arose").', category: 'perfect-weak' },
  { id: 'class6-pw-7', prompt: 'Translate this Qal Perfect verb.', hebrew: 'עָשִׂיתָ', options: ['I did / made', 'he did / made', 'you did / made', 'she did / made'], correctIndex: 2, explanation: 'עָשָׂה ("to do, make," a III-ה verb) + the 2ms ending ־תָ, with the diagnostic Hireq Yod, gives עָשִׂיתָ = "you (m.) did / made."', category: 'perfect-weak' },
  { id: 'class6-pw-8', prompt: 'Why does a Yod appear in III-ה forms like בָּנִיתָ, when the root ends in ה?', options: ['because the ה doubles', 'because the article was added', 'because every ת ending needs a Yod', 'because these verbs were originally III-י roots'], correctIndex: 3, explanation: 'The so-called III-ה verbs were originally III-י. The ה drops out through the Perfect, and the older Yod resurfaces as the Hireq Yod of the first- and second-person forms (בָּנִיתָ, רָאִיתִי).', category: 'perfect-weak' },
  { id: 'class6-pw-9', prompt: 'Translate this Qal Perfect verb.', hebrew: 'שָׁתִיתָ', options: ['you drank', 'I drank', 'he drank', 'she drank'], correctIndex: 0, explanation: 'שָׁתָה ("to drink," a III-ה verb) + the 2ms ending ־תָ, with the Hireq Yod, gives שָׁתִיתָ = "you (m.) drank."', category: 'perfect-weak' },
  { id: 'class6-pw-10', prompt: 'Translate this Qal Perfect clause.', hebrew: 'לָקַחְתָּ אֶת־הַסֵּפֶר', options: ['I took the book', 'you took the book', 'he took the book', 'they took the book'], correctIndex: 1, explanation: 'לָקַח ("to take") is regular in the Perfect: + the 2ms ending ־תָּ = "you took." אֶת־ marks the definite object הַסֵּפֶר ("the book").', category: 'perfect-weak' },
];

// Chapter 14 paradigm recall: read a weak Perfect form and give its person,
// gender, and number. English-only options, never four look-alike Hebrew forms.
const perfectWeakMemoryQuestions: PracticeQuestion[] = [
  { id: 'class6-memory-pw-banithi', prompt: 'Parse this Qal Perfect form.', hebrew: 'בָּנִיתִי', transliteration: 'baniti', options: ['1cs — "I built"', '2ms — "you built"', '3fs — "she built"', '1cp — "we built"'], correctIndex: 0, explanation: 'III-ה verbs take a Hireq Yod before every first- and second-person ending. בָּנִיתִי = "I built" (1cs ־תִּי).', category: 'perfect-memory' },
  { id: 'class6-memory-pw-banitha', prompt: 'Parse this Qal Perfect form.', hebrew: 'בָּנִיתָ', transliteration: 'banitha', options: ['1cs — "I built"', '2ms — "you (m.) built"', '3cp — "they built"', '2fs — "you (f.) built"'], correctIndex: 1, explanation: 'The ־תָ ending marks 2ms, and the Hireq Yod marks the III-ה class: בָּנִיתָ = "you (m.) built."', category: 'perfect-memory' },
  { id: 'class6-memory-pw-bantah', prompt: 'Parse this Qal Perfect form.', hebrew: 'בָּנְתָה', transliteration: 'bantah', options: ['2fs — "you (f.) built"', '1cp — "we built"', '3fs — "she built"', '3cp — "they built"'], correctIndex: 2, explanation: 'The ־ָה ending marks 3fs: בָּנְתָה = "she built." The ה of the root has dropped out entirely.', category: 'perfect-memory' },
  { id: 'class6-memory-pw-raithi', prompt: 'Parse this Qal Perfect form.', hebrew: 'רָאִיתִי', transliteration: 'raithi', options: ['3ms — "he saw"', '2mp — "you all saw"', '2ms — "you saw"', '1cs — "I saw"'], correctIndex: 3, explanation: 'רָאָה ("to see") is III-ה; רָאִיתִי = "I saw" (1cs ־תִּי with the Hireq Yod).', category: 'perfect-memory' },
  { id: 'class6-memory-pw-qam', prompt: 'Parse this Qal Perfect form.', hebrew: 'קָם', transliteration: 'qam', options: ['3ms — "he arose"', '1cs — "I arose"', '2ms — "you arose"', '3cp — "they arose"'], correctIndex: 0, explanation: 'Biconsonantal (hollow) verbs lose the middle vowel letter. The third-person forms take Qamets: קָם = "he arose," קָמָה = "she arose."', category: 'perfect-memory' },
  { id: 'class6-memory-pw-qamta', prompt: 'Parse this Qal Perfect form.', hebrew: 'קַמְתָּ', transliteration: 'qamta', options: ['3ms — "he arose"', '2ms — "you arose"', '1cp — "we arose"', '3fs — "she arose"'], correctIndex: 1, explanation: 'In Biconsonantal verbs the first- and second-person forms switch to Pathach: קַמְתָּ = "you (m.) arose." Compare the third-person Qamets of קָם.', category: 'perfect-memory' },
  { id: 'class6-memory-pw-meth', prompt: 'Parse this Qal Perfect form.', hebrew: 'מֵת', transliteration: 'meth', options: ['1cs — "I died"', '3cp — "they died"', '3ms — "he died"', '2ms — "you died"'], correctIndex: 2, explanation: 'מוּת ("to die") is Biconsonantal with a Tsere third person: מֵת = "he died" — a Tsere form, so it is worth memorizing next to קָם ("he arose").', category: 'perfect-memory' },
  { id: 'class6-memory-pw-matsathi', prompt: 'Parse this Qal Perfect form.', hebrew: 'מָצָאתִי', transliteration: 'matsathi', options: ['2ms — "you found"', '3fs — "she found"', '1cp — "we found"', '1cs — "I found"'], correctIndex: 3, explanation: 'מָצָא is III-א: the א goes silent, so the ת of ־תִּי loses its Daghesh Lene. מָצָאתִי = "I found."', category: 'perfect-memory' },
  { id: 'class6-memory-pw-sabbotha', prompt: 'Parse this Qal Perfect form.', hebrew: 'סַבּוֹתָ', transliteration: 'sabbotha', options: ['2ms — "you went around"', '3ms — "he went around"', '3fs — "she went around"', '3cp — "they went around"'], correctIndex: 0, explanation: 'Geminate verbs (סָבַב "to go around") assimilate the repeated letter into a Daghesh Forte and insert a Holem Waw connecting vowel: סַבּוֹתָ = "you (m.) went around."', category: 'perfect-memory' },
  { id: 'class6-memory-pw-hayitha', prompt: 'Parse this Qal Perfect form.', hebrew: 'הָיִיתָ', transliteration: 'hayitha', options: ['1cs — "I was"', '2ms — "you were"', '3ms — "he was"', '1cp — "we were"'], correctIndex: 1, explanation: 'הָיָה ("to be") is III-ה, so it takes the Hireq Yod like בָּנָה: הָיִיתָ = "you (m.) were."', category: 'perfect-memory' },
];

// Chapter 15 — the Qal Imperfect of strong verbs: the prefix conjugation.
const imperfectStrongQuestions: PracticeQuestion[] = [
  { id: 'class6-is-1', prompt: 'The Imperfect conjugation expresses:', options: ['completed action ("he wrote")', 'incomplete action ("he writes / will write")', 'a wish only', 'a state of being only'], correctIndex: 1, explanation: 'The Imperfect describes INCOMPLETE action, normally translated with the English present or future. The Perfect (Ch 13) describes completed action.', category: 'imperfect-strong' },
  { id: 'class6-is-2', prompt: 'Translate this Qal Imperfect verb.', hebrew: 'יִקְטֹל', options: ['he killed', 'he will kill', 'killing', 'kill!'], correctIndex: 1, explanation: 'יִקְטֹל = "he will kill," the paradigm Qal Imperfect 3ms: Hireq under the preformative, Holem as the stem vowel.', category: 'imperfect-strong' },
  { id: 'class6-is-3', prompt: 'The Imperfect is called the PREFIX conjugation because:', options: ['it is always negated', 'it never takes endings', 'every form begins with a preformative marking the subject', 'it always follows the subject'], correctIndex: 2, explanation: 'The Perfect marks its subject with endings; the Imperfect marks it mainly with a PREFIX — י ("he"), ת ("she / you"), א ("I"), נ ("we") — sometimes with an ending as well.', category: 'imperfect-strong' },
  { id: 'class6-is-4', prompt: 'Translate this Qal Imperfect verb.', hebrew: 'אֶשְׁמֹר', options: ['he will keep', 'we will keep', 'you will keep', 'I will keep'], correctIndex: 3, explanation: 'The א preformative marks 1cs: אֶשְׁמֹר = "I will keep / guard" (from שָׁמַר).', category: 'imperfect-strong' },
  { id: 'class6-is-5', prompt: 'Translate this Qal Imperfect verb.', hebrew: 'נִכְתֹּב', options: ['we will write', 'they will write', 'I will write', 'he will write'], correctIndex: 0, explanation: 'The נ preformative marks 1cp: נִכְתֹּב = "we will write" (from כָּתַב).', category: 'imperfect-strong' },
  { id: 'class6-is-6', prompt: 'Translate this Qal Imperfect verb.', hebrew: 'יִשְׁמְרוּ', options: ['he will keep', 'they will keep', 'we will keep', 'she will keep'], correctIndex: 1, explanation: 'The י preformative plus the ־וּ ending marks 3mp: יִשְׁמְרוּ = "they will keep." Plural endings shorten the stem vowel to a shewa.', category: 'imperfect-strong' },
  { id: 'class6-is-7', prompt: 'Which negative particle gives a PERMANENT, absolute prohibition with the Imperfect?', options: ['אַל', 'אֵין', 'לֹא', 'אֲשֶׁר'], correctIndex: 2, explanation: 'לֹא + Imperfect is the absolute prohibition of the Ten Commandments ("you shall never..."). אַל + Imperfect is the immediate, specific "do not!"', category: 'imperfect-strong' },
  { id: 'class6-is-8', prompt: 'Translate this prohibition.', hebrew: 'אַל־תִּשְׁלַח יָדְךָ', options: ['You shall never send your hand.', 'Do not stretch out your hand!', 'He did not stretch out his hand.', 'Will you stretch out your hand?'], correctIndex: 1, explanation: 'אַל + the 2ms Imperfect gives an immediate prohibition: "Do not stretch out your hand!" (Gen 22:12). יָדְךָ = "your hand" (Ch 9 suffix).', category: 'imperfect-strong' },
  { id: 'class6-is-9', prompt: 'The diagnostic vowel pattern of the strong Qal Imperfect (יִקְטֹל) is:', options: ['Qamets under the prefix, Pathach in the stem', 'Hireq under the prefix, Holem in the stem', 'Tsere throughout', 'Shureq in the stem'], correctIndex: 1, explanation: 'Hireq under the preformative and a Holem stem vowel: יִקְטֹל, יִשְׁמֹר, יִכְתֹּב. Any departure from that pattern is a clue that the root is weak.', category: 'imperfect-strong' },
  { id: 'class6-is-10', prompt: 'Translate this Qal Imperfect clause.', hebrew: 'תִּזְכְּרִי אֶת־הַבְּרִית', options: ['You will remember the covenant', 'They will remember the covenant', 'We will remember the covenant', 'He will remember the covenant'], correctIndex: 0, explanation: 'The ת preformative with the ־ִי ending marks 2fs: תִּזְכְּרִי = "you (f.) will remember"; אֶת־ marks the definite object הַבְּרִית ("the covenant").', category: 'imperfect-strong' },
];

// Chapter 15 paradigm recall: the full Qal Imperfect strong paradigm of קטל.
// Two prefix forms are ambiguous, and the options say so rather than hiding it.
const imperfectStrongMemoryQuestions: PracticeQuestion[] = [
  { id: 'class6-memory-is-3ms', prompt: 'Parse this Qal Imperfect form.', hebrew: 'יִקְטֹל', transliteration: 'yiqtol', options: ['3ms — "he will kill"', '1cs — "I will kill"', '3mp — "they will kill"', '1cp — "we will kill"'], correctIndex: 0, explanation: 'The י preformative marks the third person masculine: יִקְטֹל = "he will kill," the paradigm form of the Qal Imperfect.', category: 'imperfect-memory' },
  { id: 'class6-memory-is-3fs2ms', prompt: 'Parse this Qal Imperfect form.', hebrew: 'תִּקְטֹל', transliteration: 'tiqtol', options: ['1cs only — "I will kill"', '3fs or 2ms — "she / you (m.) will kill"', '3ms only — "he will kill"', '2fs only — "you (f.) will kill"'], correctIndex: 1, explanation: 'The ת preformative with no ending is ambiguous: תִּקְטֹל is both 3fs ("she will kill") and 2ms ("you will kill"). Only the context decides.', category: 'imperfect-memory' },
  { id: 'class6-memory-is-2fs', prompt: 'Parse this Qal Imperfect form.', hebrew: 'תִּקְטְלִי', transliteration: 'tiqteli', options: ['3fs — "she will kill"', '2mp — "you all will kill"', '2fs — "you (f.) will kill"', '3fp — "they (f.) will kill"'], correctIndex: 2, explanation: 'The ת preformative plus the ־ִי ending marks 2fs: תִּקְטְלִי = "you (f. sg.) will kill."', category: 'imperfect-memory' },
  { id: 'class6-memory-is-1cs', prompt: 'Parse this Qal Imperfect form.', hebrew: 'אֶקְטֹל', transliteration: 'eqtol', options: ['3ms — "he will kill"', '1cp — "we will kill"', '2ms — "you will kill"', '1cs — "I will kill"'], correctIndex: 3, explanation: 'The א preformative marks 1cs: אֶקְטֹל = "I will kill" (common to both genders).', category: 'imperfect-memory' },
  { id: 'class6-memory-is-3mp', prompt: 'Parse this Qal Imperfect form.', hebrew: 'יִקְטְלוּ', transliteration: 'yiqtelu', options: ['3mp — "they will kill"', '2mp — "you all will kill"', '3ms — "he will kill"', '1cp — "we will kill"'], correctIndex: 0, explanation: 'The י preformative plus the ־וּ ending marks 3mp: יִקְטְלוּ = "they (m.) will kill."', category: 'imperfect-memory' },
  { id: 'class6-memory-is-2mp', prompt: 'Parse this Qal Imperfect form.', hebrew: 'תִּקְטְלוּ', transliteration: 'tiqtelu', options: ['3mp — "they will kill"', '2mp — "you all will kill"', '1cp — "we will kill"', '2fs — "you will kill"'], correctIndex: 1, explanation: 'The ת preformative plus the ־וּ ending marks 2mp: תִּקְטְלוּ = "you (masculine plural) will kill." Compare 3mp יִקְטְלוּ, which differs only in the prefix.', category: 'imperfect-memory' },
  { id: 'class6-memory-is-fp', prompt: 'Parse this Qal Imperfect form.', hebrew: 'תִּקְטֹלְנָה', transliteration: 'tiqtolnah', options: ['2mp only — "you all will kill"', '3mp only — "they will kill"', '3fp or 2fp — "they / you all will kill"', '1cp only — "we will kill"'], correctIndex: 2, explanation: 'The ־נָה ending marks the feminine plural, and like the singular ת forms it is ambiguous: תִּקְטֹלְנָה is both 3fp and 2fp.', category: 'imperfect-memory' },
  { id: 'class6-memory-is-1cp', prompt: 'Parse this Qal Imperfect form.', hebrew: 'נִקְטֹל', transliteration: 'niqtol', options: ['3ms — "he will kill"', '2ms — "you will kill"', '1cs — "I will kill"', '1cp — "we will kill"'], correctIndex: 3, explanation: 'The נ preformative marks 1cp: נִקְטֹל = "we will kill."', category: 'imperfect-memory' },
  { id: 'class6-memory-is-preformatives', prompt: 'Which preformative marks "we" in the Qal Imperfect?', options: ['נ', 'א', 'י', 'ת'], correctIndex: 0, explanation: 'The four preformatives are י ("he / they"), ת ("she / you"), א ("I"), and נ ("we"). Memorize them as a set — they carry the subject.', category: 'imperfect-memory' },
  { id: 'class6-memory-is-yishmor', prompt: 'Parse this Qal Imperfect form.', hebrew: 'יִשְׁמֹר', transliteration: 'yishmor', options: ['2ms — "you will keep"', '3ms — "he will keep"', '1cs — "I will keep"', '3mp — "they will keep"'], correctIndex: 1, explanation: 'שָׁמַר ("to keep, guard") is a strong verb, so it follows the paradigm exactly: יִשְׁמֹר = "he will keep."', category: 'imperfect-memory' },
  { id: 'class6-memory-is-nishmor', prompt: 'Parse this Qal Imperfect form.', hebrew: 'נִשְׁמֹר', transliteration: 'nishmor', options: ['1cs — "I will keep"', '3ms — "he will keep"', '1cp — "we will keep"', '2mp — "you all will keep"'], correctIndex: 2, explanation: 'The נ preformative marks 1cp: נִשְׁמֹר = "we will keep." Do not confuse it with the 1cs א form אֶשְׁמֹר.', category: 'imperfect-memory' },
];

// Chapter 16 — the Qal Imperfect of weak verbs: recovering a root letter that
// has assimilated or dropped out.
const imperfectWeakQuestions: PracticeQuestion[] = [
  { id: 'class6-iw-1', prompt: 'Several weak classes show only TWO root letters in the Imperfect. To parse them you must:', options: ['assume the root is Biconsonantal', 'read the diagnostic that reveals the missing letter', 'ignore the vowels entirely', 'add a ה to the end'], correctIndex: 1, explanation: 'A dropped or assimilated root letter always leaves a trace — a Daghesh Forte, a distinctive preformative vowel, or a Seghol-He ending. Read the trace and you can reconstruct the root to look it up.', category: 'imperfect-weak' },
  { id: 'class6-iw-2', prompt: 'Translate this Qal Imperfect verb.', hebrew: 'יִפֹּל', options: ['he fell', 'he will fall', 'they will fall', 'she will fall'], correctIndex: 1, explanation: 'נָפַל ("to fall") is I-נ: the נ assimilates into the second root letter as a Daghesh Forte, giving יִפֹּל = "he will fall."', category: 'imperfect-weak' },
  { id: 'class6-iw-3', prompt: 'A Daghesh Forte in the second root letter of an Imperfect (יִפֹּל, יִתֵּן) usually recovers which missing letter?', options: ['נ', 'ה', 'א', 'י'], correctIndex: 0, explanation: 'The first נ of a I-נ verb assimilates into the following letter and is preserved only as a Daghesh Forte. Seeing that Daghesh, restore the נ: יִפֹּל → נָפַל, יִתֵּן → נָתַן.', category: 'imperfect-weak' },
  { id: 'class6-iw-4', prompt: 'Which common verb behaves like a I-נ verb, assimilating its first letter in the Imperfect?', options: ['הָלַךְ ("to walk")', 'לָמַד ("to learn")', 'יָלַד ("to bear")', 'לָקַח ("to take")'], correctIndex: 3, explanation: 'לָקַח assimilates its ל exactly as a I-נ verb assimilates its נ: יִקַּח ("he will take"), with a Daghesh Forte in the ק.', category: 'imperfect-weak' },
  { id: 'class6-iw-5', prompt: 'Translate this Qal Imperfect verb.', hebrew: 'יֵשֵׁב', options: ['he will sit / dwell', 'he sat', 'they will dwell', 'I will dwell'], correctIndex: 0, explanation: 'יָשַׁב ("to sit, dwell") is I-י: the Yod drops out and leaves a Tsere preformative vowel, giving יֵשֵׁב = "he will sit / dwell."', category: 'imperfect-weak' },
  { id: 'class6-iw-6', prompt: 'Translate this Qal Imperfect verb.', hebrew: 'יִבְנֶה', options: ['he built', 'they will build', 'he will build', 'she will build'], correctIndex: 2, explanation: 'בָּנָה ("to build") is III-ה. In Imperfect forms with no ending it keeps a distinctive Seghol-He: יִבְנֶה = "he will build."', category: 'imperfect-weak' },
  { id: 'class6-iw-7', prompt: 'Translate this Qal Imperfect verb.', hebrew: 'יָקוּם', options: ['he arose', 'she will arise', 'they will arise', 'he will arise'], correctIndex: 3, explanation: 'קוּם ("to arise") is Biconsonantal: the Imperfect restores the middle Shureq and takes a Qamets preformative, giving יָקוּם = "he will arise / stand."', category: 'imperfect-weak' },
  { id: 'class6-iw-8', prompt: 'Why does the stem vowel become Pathach in forms like יִשְׁמַע and יִשְׁלַח?', options: ['because a guttural third letter prefers an a-type vowel', 'because the syllable is closed', 'because a נ has assimilated', 'because the verb is plural'], correctIndex: 0, explanation: 'Gutturals (א, ה, ח, ע) prefer a-type vowels, so the expected Holem stem vowel becomes Pathach beside one: יִשְׁמַע ("he will hear"), יִשְׁלַח ("he will send").', category: 'imperfect-weak' },
  { id: 'class6-iw-9', prompt: 'Translate this Qal Imperfect verb.', hebrew: 'תֵּלֵךְ', options: ['he will walk', 'she / you (m.) will walk', 'they will walk', 'we will walk'], correctIndex: 1, explanation: 'הָלַךְ ("to walk") inflects like a I-י verb, so its Imperfect has a Tsere preformative: תֵּלֵךְ = 3fs "she will walk" or 2ms "you will walk."', category: 'imperfect-weak' },
  { id: 'class6-iw-10', prompt: 'Translate this Qal Imperfect verb.', hebrew: 'אֶהְיֶה', options: ['I was', 'he will be', 'we will be', 'I will be'], correctIndex: 3, explanation: 'הָיָה ("to be") is doubly weak — I-guttural and III-ה. The א preformative marks 1cs and the Seghol-He marks the III-ה class: אֶהְיֶה = "I will be" (Exodus 3:14).', category: 'imperfect-weak' },
];

// Chapter 16 recall: read a weak Imperfect form, name its class, and restore
// the root you would look up in a lexicon.
const imperfectWeakMemoryQuestions: PracticeQuestion[] = [
  { id: 'class6-memory-iw-yippol', prompt: 'Which root would you look up for this form?', hebrew: 'יִפֹּל', transliteration: 'yippol', options: ['נָפַל ("to fall")', 'פָּלַל ("to pray")', 'יָפָה ("to be beautiful")', 'פָּלַט ("to escape")'], correctIndex: 0, explanation: 'The Daghesh Forte in the פ restores an assimilated נ: יִפֹּל → נָפַל ("to fall").', category: 'weak-memory' },
  { id: 'class6-memory-iw-yitten', prompt: 'Which root would you look up for this form?', hebrew: 'יִתֵּן', transliteration: 'yitten', options: ['תָּמַם ("to be complete")', 'נָתַן ("to give")', 'יָתַר ("to remain")', 'תָּפַשׂ ("to seize")'], correctIndex: 1, explanation: 'The Daghesh Forte in the ת restores the assimilated נ: יִתֵּן → נָתַן ("to give").', category: 'weak-memory' },
  { id: 'class6-memory-iw-yiqqach', prompt: 'Which root would you look up for this form?', hebrew: 'יִקַּח', transliteration: 'yiqqach', options: ['נָקַם ("to avenge")', 'קָרָא ("to call")', 'לָקַח ("to take")', 'קָוָה ("to wait")'], correctIndex: 2, explanation: 'לָקַח is the one non-נ verb that assimilates its first letter: the Daghesh Forte in the ק restores the ל, giving יִקַּח = "he will take."', category: 'weak-memory' },
  { id: 'class6-memory-iw-yeshev', prompt: 'Which class does this Imperfect belong to?', hebrew: 'יֵשֵׁב', transliteration: 'yeshev', options: ['a geminate verb', 'a III-ה verb', 'a Biconsonantal verb', 'a I-י verb'], correctIndex: 3, explanation: 'A Tsere under the preformative is the Type 1 I-י diagnostic: יֵשֵׁב → יָשַׁב ("to sit, dwell").', category: 'weak-memory' },
  { id: 'class6-memory-iw-telekh', prompt: 'Which root would you look up for this form?', hebrew: 'תֵּלֵךְ', transliteration: 'telekh', options: ['הָלַךְ ("to walk")', 'תָּלָה ("to hang")', 'יָלַךְ, an unrelated root', 'מָלַךְ ("to reign")'], correctIndex: 0, explanation: 'הָלַךְ behaves like a Type 1 I-י verb in the Imperfect, so its forms have a Tsere preformative and no ה: תֵּלֵךְ = "she / you will walk."', category: 'weak-memory' },
  { id: 'class6-memory-iw-yivneh', prompt: 'Which ending identifies this Imperfect as a III-ה verb?', hebrew: 'יִבְנֶה', transliteration: 'yivneh', options: ['the Daghesh Forte', 'the Seghol-He ending', 'the Hireq Yod', 'the Holem Waw'], correctIndex: 1, explanation: 'III-ה Imperfect forms without a sufformative always end in Seghol-He: יִבְנֶה ("he will build"), יַעֲשֶׂה ("he will do").', category: 'weak-memory' },
  { id: 'class6-memory-iw-yaaseh', prompt: 'Parse this Qal Imperfect form.', hebrew: 'יַעֲשֶׂה', transliteration: 'yaaseh', options: ['1cs — "I will do"', '3mp — "they will do"', '3ms — "he will do / make"', '2ms — "you will do"'], correctIndex: 2, explanation: 'עָשָׂה is doubly weak — I-guttural (hence the Pathach + Hateph Pathach) and III-ה (hence the Seghol-He): יַעֲשֶׂה = "he will do / make."', category: 'weak-memory' },
  { id: 'class6-memory-iw-yaqum', prompt: 'Which class does this Imperfect belong to?', hebrew: 'יָקוּם', transliteration: 'yaqum', options: ['a I-נ verb', 'a III-א verb', 'a geminate verb', 'a Biconsonantal verb'], correctIndex: 3, explanation: 'Biconsonantal (hollow) verbs restore their middle vowel letter in the Imperfect and take a Qamets preformative: יָקוּם → קוּם ("to arise").', category: 'weak-memory' },
  { id: 'class6-memory-iw-yered', prompt: 'Parse this Qal Imperfect form.', hebrew: 'יֵרֵד', transliteration: 'yered', options: ['3ms — "he will go down"', '1cs — "I will go down"', '3fs — "she will go down"', '3mp — "they will go down"'], correctIndex: 0, explanation: 'יָרַד ("to go down") is a Type 1 I-י verb: the Yod drops and a Tsere preformative takes its place, giving יֵרֵד = "he will go down."', category: 'weak-memory' },
  { id: 'class6-memory-iw-ehyeh', prompt: 'Parse this Qal Imperfect form.', hebrew: 'אֶהְיֶה', transliteration: 'ehyeh', options: ['3ms — "he will be"', '1cs — "I will be"', '1cp — "we will be"', '2ms — "you will be"'], correctIndex: 1, explanation: 'The א preformative marks 1cs and the Seghol-He marks the III-ה root הָיָה: אֶהְיֶה = "I will be" — the form behind אֶהְיֶה אֲשֶׁר אֶהְיֶה (Exodus 3:14).', category: 'weak-memory' },
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

// Chapter 14-16 "You Should Know" vocabulary — the weak verbs whose Perfect and
// Imperfect forms these three chapters teach you to read.
export const CLASS6_WORD_GROUPS: PracticeQuestionGroup[] = [
  wordGroup({ id: 'class6-word-banah', hebrew: 'בָּנָה', transliteration: 'banah', transliterationOptions: ['banah', 'bo', 'yalad', 'avar'], transliterationCorrectIndex: 0, meaning: 'to build', meaningOptions: ['to build', 'to come in', 'to give birth', 'to pass over'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class6-word-yalad', hebrew: 'יָלַד', transliteration: 'yalad', transliterationOptions: ['yarad', 'yalad', 'yashav', 'yare'], transliterationCorrectIndex: 1, meaning: 'to bear, give birth, beget', meaningOptions: ['to go down', 'to bear, give birth, beget', 'to sit', 'to fear'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class6-word-laqach', hebrew: 'לָקַח', transliteration: 'laqach', transliterationOptions: ['karat', 'avar', 'laqach', 'nasa'], transliterationCorrectIndex: 2, meaning: 'to take, grasp, seize', meaningOptions: ['to cut', 'to pass over', 'to take, grasp, seize', 'to lift'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class6-word-mut', hebrew: 'מוּת', transliteration: 'mut', transliterationOptions: ['bo', 'sur', 'avad', 'mut'], transliterationCorrectIndex: 3, meaning: 'to die', meaningOptions: ['to come in', 'to turn aside', 'to serve', 'to die'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class6-word-nasa', hebrew: 'נָשָׂא', transliteration: 'nasa', transliterationOptions: ['nasa', 'natan', 'nafal', 'natah'], transliterationCorrectIndex: 0, meaning: 'to lift, carry, bear', meaningOptions: ['to lift, carry, bear', 'to give', 'to fall', 'to stretch out'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class6-word-avar', hebrew: 'עָבַר', transliteration: 'avar', transliterationOptions: ['avad', 'avar', 'azav', 'anah'], transliterationCorrectIndex: 1, meaning: 'to pass over, cross', meaningOptions: ['to serve', 'to pass over, cross', 'to forsake', 'to answer'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class6-word-chayah', hebrew: 'חָיָה', transliteration: 'chayah', transliterationOptions: ['chata', 'karat', 'chayah', 'kafar'], transliterationCorrectIndex: 2, meaning: 'to live, be alive', meaningOptions: ['to sin', 'to cut', 'to live, be alive', 'to atone'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class6-word-avad', hebrew: 'עָבַד', transliteration: 'avad', transliterationOptions: ['avar', 'azav', 'anah', 'avad'], transliterationCorrectIndex: 3, meaning: 'to work, serve, toil', meaningOptions: ['to pass over', 'to forsake', 'to answer', 'to work, serve, toil'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class6-word-karat', hebrew: 'כָּרַת', transliteration: 'karat', transliterationOptions: ['karat', 'chayah', 'kafar', 'qarav'], transliterationCorrectIndex: 0, meaning: 'to cut; to make a covenant', meaningOptions: ['to cut; to make a covenant', 'to live', 'to atone', 'to draw near'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class6-word-chata', hebrew: 'חָטָא', transliteration: 'chata', transliterationOptions: ['chayah', 'chata', 'kafar', 'karat'], transliterationCorrectIndex: 1, meaning: 'to sin, miss the mark', meaningOptions: ['to live', 'to sin, miss the mark', 'to atone', 'to cut'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class6-word-azav', hebrew: 'עָזַב', transliteration: 'azav', transliterationOptions: ['avad', 'avar', 'azav', 'anah'], transliterationCorrectIndex: 2, meaning: 'to leave, forsake, abandon', meaningOptions: ['to serve', 'to pass over', 'to leave, forsake, abandon', 'to answer'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class6-word-shatah', hebrew: 'שָׁתָה', transliteration: 'shatah', transliterationOptions: ['shalach', 'shamar', 'natah', 'shatah'], transliterationCorrectIndex: 3, meaning: 'to drink', meaningOptions: ['to send', 'to keep', 'to stretch out', 'to drink'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class6-word-bo', hebrew: 'בּוֹא', transliteration: 'bo', transliterationOptions: ['bo', 'mut', 'qum', 'shuv'], transliterationCorrectIndex: 0, meaning: 'to come in, enter, go in', meaningOptions: ['to come in, enter, go in', 'to die', 'to arise', 'to return'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class6-word-yatsa', hebrew: 'יָצָא', transliteration: 'yatsa', transliterationOptions: ['yarad', 'yatsa', 'yashav', 'yalad'], transliterationCorrectIndex: 1, meaning: 'to go out, come out', meaningOptions: ['to go down', 'to go out, come out', 'to sit', 'to give birth'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class6-word-yarad', hebrew: 'יָרַד', transliteration: 'yarad', transliterationOptions: ['yatsa', 'yashav', 'yarad', 'yalad'], transliterationCorrectIndex: 2, meaning: 'to go down, descend', meaningOptions: ['to go out', 'to sit', 'to go down, descend', 'to give birth'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class6-word-alah', hebrew: 'עָלָה', transliteration: 'alah', transliterationOptions: ['avar', 'avad', 'azav', 'alah'], transliterationCorrectIndex: 3, meaning: 'to go up, ascend', meaningOptions: ['to pass over', 'to serve', 'to forsake', 'to go up, ascend'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class6-word-qum', hebrew: 'קוּם', transliteration: 'qum', transliterationOptions: ['qum', 'qara', 'shuv', 'mut'], transliterationCorrectIndex: 0, meaning: 'to arise, stand', meaningOptions: ['to arise, stand', 'to call', 'to return', 'to die'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class6-word-shuv', hebrew: 'שׁוּב', transliteration: 'shuv', transliterationOptions: ['sur', 'shuv', 'shalach', 'shatah'], transliterationCorrectIndex: 1, meaning: 'to return, turn back', meaningOptions: ['to turn aside', 'to return, turn back', 'to send', 'to drink'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class6-word-raah', hebrew: 'רָאָה', transliteration: 'raah', transliterationOptions: ['ratsah', 'rachats', 'raah', 'ranan'], transliterationCorrectIndex: 2, meaning: 'to see, perceive', meaningOptions: ['to be pleased with', 'to wash', 'to see, perceive', 'to sing for joy'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class6-word-yare', hebrew: 'יָרֵא', transliteration: 'yare', transliterationOptions: ['yatsa', 'yarad', 'yalad', 'yare'], transliterationCorrectIndex: 3, meaning: 'to fear, be afraid', meaningOptions: ['to go out', 'to go down', 'to give birth', 'to fear, be afraid'], meaningCorrectIndex: 3 }),
];

// Verse translation — famous clauses whose focus grammar is a weak Perfect or a
// Qal Imperfect. The Hebrew is shown; every option is English.
const verseQuestions: PracticeQuestion[] = [
  { id: 'class6-verse-1', prompt: 'Translate this clause (Joshua 24:15).', hebrew: 'וְאָנֹכִי וּבֵיתִי נַעֲבֹד אֶת־יְהוָה', options: ['But as for me and my house, we will serve the LORD.', 'My house has been built for the LORD.', 'I and my house have gone up to the LORD.', 'Let my house call upon the LORD.'], correctIndex: 0, explanation: 'נַעֲבֹד = "we will serve" — the נ preformative marks 1cp (Ch 15), and עָבַד is I-guttural, so the preformative vowel is Pathach with a Hateph Pathach (Ch 16).', category: 'verse' },
  { id: 'class6-verse-2', prompt: 'Translate this verse (Psalm 130:3).', hebrew: 'אִם־עֲוֺנוֹת תִּשְׁמָר־יָהּ אֲדֹנָי מִי יַעֲמֹד', options: ['If the LORD forgives, who will not rejoice?', 'If you, O LORD, should mark iniquities, O Lord, who could stand?', 'The LORD has remembered our iniquity, and no one stands.', 'Who among us has kept the law of the LORD?'], correctIndex: 1, explanation: 'Two Imperfects: תִּשְׁמָר ("you would keep/mark," 2ms, Ch 15) and יַעֲמֹד ("he would stand," 3ms of עָמַד, a I-guttural verb, Ch 16). אִם = "if."', category: 'verse' },
  { id: 'class6-verse-3', prompt: 'Translate this clause (Genesis 2:24).', hebrew: 'עַל־כֵּן יַעֲזָב־אִישׁ אֶת־אָבִיו וְאֶת־אִמּוֹ', options: ['Therefore a man honored his father and his mother.', 'Therefore his father and mother blessed the man.', 'Therefore a man shall leave his father and his mother.', 'Therefore a man returned to his father and his mother.'], correctIndex: 2, explanation: 'יַעֲזָב = "he shall leave," the Qal Imperfect 3ms of עָזַב — I-guttural (Pathach + Hateph Pathach) with a Pathach stem vowel beside the ז (Ch 16). אָבִיו / אִמּוֹ carry 3ms suffixes (Ch 9).', category: 'verse' },
  { id: 'class6-verse-4', prompt: 'Translate this clause (Genesis 22:8).', hebrew: 'אֱלֹהִים יִרְאֶה־לּוֹ הַשֶּׂה', options: ['God has seen the lamb of the offering.', 'God called to him about the lamb.', 'God gave him a lamb for the offering.', 'God will provide for himself the lamb.'], correctIndex: 3, explanation: 'יִרְאֶה = "he will see / provide," the Qal Imperfect 3ms of רָאָה — a III-ה verb, so it ends in the diagnostic Seghol-He (Ch 16).', category: 'verse' },
  { id: 'class6-verse-5', prompt: 'Translate this clause (Job 1:21).', hebrew: 'יְהוָה נָתַן וַיהוָה לָקָח', options: ['The LORD gave and the LORD has taken away.', 'The LORD gives and the LORD receives.', 'The LORD will give and the LORD will take.', 'What the LORD takes, the LORD restores.'], correctIndex: 0, explanation: 'Two Qal Perfect 3ms verbs, both weak: נָתַן (I-נ) and לָקָח (pausal form of לָקַח). Completed action, so English past: "gave... has taken away."', category: 'verse' },
  { id: 'class6-verse-6', prompt: 'Translate this clause (Deuteronomy 6:5).', hebrew: 'וְאָהַבְתָּ אֵת יְהוָה אֱלֹהֶיךָ', options: ['The LORD your God has loved you.', 'You shall love the LORD your God.', 'Love is from the LORD your God.', 'You have walked with the LORD your God.'], correctIndex: 1, explanation: 'אָהַבְתָּ is a Qal Perfect 2ms of אָהַב, a I-guttural verb (Ch 14). With the prefixed waw here it carries future force: "you shall love." אֵת marks the definite object.', category: 'verse' },
];

// Four contextual translations are woven into each chapter mode, so the drilled
// forms have to be read inside real clauses. Forms from later chapters are
// glossed in the explanation.
const chapter14ContextQuestions: PracticeQuestion[] = [
  { id: 'class6-context-ch14-gen4-1', prompt: 'Translate this clause (Genesis 4:1).', hebrew: 'קָנִיתִי אִישׁ אֶת־יְהוָה', options: ['I have gotten a man with the help of the LORD.', 'The LORD gave a man to me.', 'A man called on the name of the LORD.', 'I have built a house for the LORD.'], correctIndex: 0, explanation: 'Chapter 14 focus: קָנִיתִי = "I have gotten / acquired," the Qal Perfect 1cs of קָנָה — a III-ה verb, hence the diagnostic Hireq Yod before the ־תִּי ending.', category: 'context-ch14' },
  { id: 'class6-context-ch14-2sam12-13', prompt: 'Translate this confession (2 Samuel 12:13).', hebrew: 'חָטָאתִי לַיהוָה', options: ['The LORD has forgiven me.', 'I have sinned against the LORD.', 'He sinned against the LORD.', 'We have turned back to the LORD.'], correctIndex: 1, explanation: 'Chapter 14 focus: חָטָאתִי = "I have sinned," the Qal Perfect 1cs of חָטָא — a III-א verb, so the א is quiescent and the ת has no Daghesh Lene. לַיהוָה = "against/to the LORD."', category: 'context-ch14' },
  { id: 'class6-context-ch14-ps22-2', prompt: 'Translate this cry (Psalm 22:1).', hebrew: 'אֵלִי אֵלִי לָמָה עֲזַבְתָּנִי', options: ['My God, my God, you are my refuge.', 'My God, my God, why do you hide from me?', 'My God, my God, why have you forsaken me?', 'My God, my God, hear my prayer.'], correctIndex: 2, explanation: 'Chapter 14 focus: עֲזַבְתָּ = "you have forsaken," the Qal Perfect 2ms of עָזַב — a I-guttural verb, so the first vowel is a Hateph Pathach. The ־נִי ending is the object suffix "me."', category: 'context-ch14' },
  { id: 'class6-context-ch14-ps116-1', prompt: 'Translate this clause (Psalm 116:1).', hebrew: 'אָהַבְתִּי כִּי־יִשְׁמַע יְהוָה אֶת־קוֹלִי', options: ['The LORD loves the sound of my prayer.', 'I will call, and the LORD will love me.', 'Love the LORD, for he hears my voice.', 'I love the LORD, because he hears my voice.'], correctIndex: 3, explanation: 'Chapter 14 focus: אָהַבְתִּי = "I love," a Qal Perfect 1cs of the I-guttural verb אָהַב. It is answered by the Imperfect יִשְׁמַע ("he hears") — Pathach stem vowel because of the guttural ע (Ch 16).', category: 'context-ch14' },
];

const chapter15ContextQuestions: PracticeQuestion[] = [
  { id: 'class6-context-ch15-ex20-15', prompt: 'Translate this commandment (Exodus 20:15).', hebrew: 'לֹא תִּגְנֹב', options: ['You shall not steal.', 'Do not be afraid.', 'You shall not murder.', 'Do not turn aside.'], correctIndex: 0, explanation: 'Chapter 15 focus: לֹא + the Qal Imperfect 2ms תִּגְנֹב is the absolute, permanent prohibition — "you shall never steal." Note the textbook Hireq-preformative + Holem pattern.', category: 'context-ch15' },
  { id: 'class6-context-ch15-ex20-17', prompt: 'Translate this commandment (Exodus 20:17).', hebrew: 'לֹא תַחְמֹד בֵּית רֵעֶךָ', options: ['You shall not enter your neighbor’s house.', 'You shall not covet your neighbor’s house.', 'You shall not sell the house of your neighbor.', 'You shall not bear false witness against your neighbor.'], correctIndex: 1, explanation: 'Chapter 15 focus: תַחְמֹד = "you shall covet," a Qal Imperfect 2ms. The Holem stem vowel is the Chapter 15 pattern; the Pathach preformative is because ח is a guttural (Ch 16).', category: 'context-ch15' },
  { id: 'class6-context-ch15-isa2-4', prompt: 'Translate this clause (Isaiah 2:4).', hebrew: 'וְלֹא־יִלְמְדוּ עוֹד מִלְחָמָה', options: ['And they will not remember the war.', 'And war will not come upon them again.', 'And they shall not learn war any more.', 'And they will not go out to battle.'], correctIndex: 2, explanation: 'Chapter 15 focus: יִלְמְדוּ = "they will learn" — the י preformative with the ־וּ plural ending marks 3mp. The plural ending shortens the stem vowel to a shewa.', category: 'context-ch15' },
  { id: 'class6-context-ch15-ps119-16', prompt: 'Translate this clause (Psalm 119:16).', hebrew: 'לֹא אֶשְׁכַּח דְּבָרֶךָ', options: ['I have remembered your word.', 'Your word will not depart from me.', 'Do not forget the word of the LORD.', 'I will not forget your word.'], correctIndex: 3, explanation: 'Chapter 15 focus: the א preformative marks 1cs, so אֶשְׁכַּח = "I will forget," negated by לֹא. The Pathach stem vowel is due to the guttural ח (Ch 16). דְּבָרֶךָ = "your word" (Ch 9 suffix).', category: 'context-ch15' },
];

const chapter16ContextQuestions: PracticeQuestion[] = [
  { id: 'class6-context-ch16-ps24-3', prompt: 'Translate this question (Psalm 24:3).', hebrew: 'מִי־יַעֲלֶה בְהַר־יְהוָה', options: ['Who shall ascend the hill of the LORD?', 'Who has seen the mountain of the LORD?', 'Who will dwell on the holy hill?', 'Who calls on the name of the LORD?'], correctIndex: 0, explanation: 'Chapter 16 focus: יַעֲלֶה = "he will go up," from עָלָה — doubly weak, I-guttural (Pathach + Hateph Pathach) and III-ה (the Seghol-He ending). מִי = "who."', category: 'context-ch16' },
  { id: 'class6-context-ch16-ps23-4', prompt: 'Translate this clause (Psalm 23:4).', hebrew: 'לֹא־אִירָא רָע כִּי־אַתָּה עִמָּדִי', options: ['The LORD is my shepherd; I shall not want.', 'I will fear no evil, for you are with me.', 'He leads me in paths of righteousness.', 'Evil will not come near my tent.'], correctIndex: 1, explanation: 'Chapter 16 focus: אִירָא = "I will fear," the Qal Imperfect 1cs of יָרֵא — a I-י verb whose Yod survives as the Hireq-Yod preformative vowel. כִּי אַתָּה עִמָּדִי = "for you are with me."', category: 'context-ch16' },
  { id: 'class6-context-ch16-isa40-8', prompt: 'Translate this clause (Isaiah 40:8).', hebrew: 'וּדְבַר־אֱלֹהֵינוּ יָקוּם לְעוֹלָם', options: ['The word of our God has gone out to the nations.', 'Our God has spoken, and it was so.', 'But the word of our God will stand forever.', 'The word of our God is a lamp to our feet.'], correctIndex: 2, explanation: 'Chapter 16 focus: יָקוּם = "it will stand / arise," from the Biconsonantal verb קוּם — the middle Shureq returns and the preformative takes Qamets. דְּבַר is the construct of דָּבָר (Ch 10).', category: 'context-ch16' },
  { id: 'class6-context-ch16-ex3-14', prompt: 'Translate this name (Exodus 3:14).', hebrew: 'אֶהְיֶה אֲשֶׁר אֶהְיֶה', options: ['The LORD is God, and there is no other.', 'He was, and he is, and he is to come.', 'I am the God of your fathers.', 'I AM WHO I AM.'], correctIndex: 3, explanation: 'Chapter 16 focus: אֶהְיֶה = "I will be / I am," the Qal Imperfect 1cs of הָיָה — doubly weak (I-guttural and III-ה, hence the Seghol-He). אֲשֶׁר = "who, which" (Ch 8).', category: 'context-ch16' },
];

export const CLASS6_PERFECT_WEAK_MEMORY_GROUPS = asGroups(perfectWeakMemoryQuestions);
export const CLASS6_IMPERFECT_STRONG_MEMORY_GROUPS = asGroups(imperfectStrongMemoryQuestions);
export const CLASS6_IMPERFECT_WEAK_MEMORY_GROUPS = asGroups(imperfectWeakMemoryQuestions);

export const CLASS6_CH14_CONTEXT_GROUPS = asGroups(chapter14ContextQuestions);
export const CLASS6_CH15_CONTEXT_GROUPS = asGroups(chapter15ContextQuestions);
export const CLASS6_CH16_CONTEXT_GROUPS = asGroups(chapter16ContextQuestions);
export const CLASS6_CONTEXT_GROUPS = [
  ...CLASS6_CH14_CONTEXT_GROUPS,
  ...CLASS6_CH15_CONTEXT_GROUPS,
  ...CLASS6_CH16_CONTEXT_GROUPS,
];

export const CLASS6_PERFECT_WEAK_GROUPS = [
  ...asGroups(perfectWeakQuestions),
  ...CLASS6_PERFECT_WEAK_MEMORY_GROUPS,
];
export const CLASS6_IMPERFECT_STRONG_GROUPS = [
  ...asGroups(imperfectStrongQuestions),
  ...CLASS6_IMPERFECT_STRONG_MEMORY_GROUPS,
];
export const CLASS6_IMPERFECT_WEAK_GROUPS = [
  ...asGroups(imperfectWeakQuestions),
  ...CLASS6_IMPERFECT_WEAK_MEMORY_GROUPS,
];
export const CLASS6_VERSE_GROUPS = [
  ...asGroups(verseQuestions),
  ...CLASS6_CONTEXT_GROUPS,
];
