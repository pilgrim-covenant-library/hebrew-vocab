// Class 7 practice — CourseGuide for BBH Chapters 17-19: the Waw Consecutive,
// the Qal Imperative, and pronominal suffixes on verbs, plus the Chapter 17-19
// "You Should Know" vocabulary and verse translation whose grammar stays
// within Chapters 1-19.
//
// Released: wired into the app via /class-practice/class-7-mcq.

import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function asGroups(questions: PracticeQuestion[]): PracticeQuestionGroup[] {
  return questions.map((question) => ({ id: question.id, questions: [question] }));
}

// Chapter 17 — the Waw Consecutive: the prefix that flips a verb's time frame.
const ch17Questions: PracticeQuestion[] = [
  { id: 'class7-ch17-1', prompt: 'When an IMPERFECT verb is prefixed with the Waw Consecutive, it is translated with the values of:', options: ['a Perfect verb — usually the English past tense', 'an Imperative', 'a participle', 'an unchanged Imperfect'], correctIndex: 0, explanation: 'The consecutive Imperfect carries Perfect values: "and he killed," or with the present perfect, "and he has killed." This is the backbone of Hebrew narrative.', category: 'ch17' },
  { id: 'class7-ch17-2', prompt: 'Translate this clause (Genesis 1:3).', hebrew: 'וַיֹּאמֶר אֱלֹהִים', options: ['and God will say', 'and God said', 'God says', 'let God say'], correctIndex: 1, explanation: 'וַיֹּאמֶר is the Qal Imperfect 3ms of אָמַר with the Waw Consecutive, so it is translated as a past: "and God said." Without the waw, יֹאמַר would mean "he will say."', category: 'ch17' },
  { id: 'class7-ch17-3', prompt: 'How is the Waw Consecutive on an IMPERFECT verb spelled?', options: ['Shewa under the waw, no doubling', 'a waw with Qamets', 'Pathach under the waw plus a Daghesh Forte in the preformative', 'a waw with Holem'], correctIndex: 2, explanation: 'The consecutive Imperfect is waw + Pathach + a Daghesh Forte doubling the preformative: וַיִּקְטֹל. The plain conjunction is waw + Shewa (וְ), so the spelling itself tells you which one you are reading.', category: 'ch17' },
  { id: 'class7-ch17-4', prompt: 'When a PERFECT verb is prefixed with the Waw Consecutive, it is translated with the values of:', options: ['an Imperfect — usually the English future', 'a participle', 'an infinitive', 'an unchanged Perfect'], correctIndex: 0, explanation: 'The consecutive Perfect carries Imperfect values and drives the FUTURE narrative sequence: וְשָׁמַרְתָּ = "and you shall keep." The two consecutive forms swap time frames in opposite directions.', category: 'ch17' },
  { id: 'class7-ch17-5', prompt: 'Translate this consecutive Perfect.', hebrew: 'וְשָׁמַרְתָּ', options: ['and you kept', 'and you were keeping', 'and you shall keep', 'keep!'], correctIndex: 2, explanation: 'שָׁמַרְתָּ alone is a Qal Perfect 2ms ("you kept"). With the Waw Consecutive it takes Imperfect values: "and you shall keep." In 2ms and 1cs forms the accent usually shifts to the final syllable.', category: 'ch17' },
  { id: 'class7-ch17-6', prompt: 'Translate this very common narrative opener.', hebrew: 'וַיְהִי', options: ['and it will be', 'and it came to pass', 'let it be', 'it is'], correctIndex: 1, explanation: 'וַיְהִי is the consecutive Imperfect of הָיָה: "and it came to pass / and it happened." Its future-facing counterpart is the consecutive Perfect וְהָיָה ("and it shall come to pass").', category: 'ch17' },
  { id: 'class7-ch17-7', prompt: 'Translate this clause (Genesis 1:5).', hebrew: 'וַיִּקְרָא אֱלֹהִים לָאוֹר יוֹם', options: ['And God called the light Day.', 'And God will call the light Day.', 'God is calling the light Day.', 'Let God call the light Day.'], correctIndex: 0, explanation: 'וַיִּקְרָא = "and he called," a consecutive Imperfect of קָרָא. לָאוֹר = "to the light" (לְ + the article), and יוֹם is the name given.', category: 'ch17' },
  { id: 'class7-ch17-8', prompt: 'Does the Waw Consecutive change the spelling of the verb it is attached to?', options: ['yes, it always adds an ending', 'yes, it removes the preformative', 'no — in most classes only the waw itself is added, so only the translation changes', 'no, and the translation does not change either'], correctIndex: 2, explanation: 'In most verb classes the Imperfect keeps its spelling and only the waw is prefixed. That is exactly why the Waw Consecutive is so easy to miss and so important: the form looks familiar, but its time value has flipped.', category: 'ch17' },
];

// Chapter 17 recall: read a form with a waw and say what it now means.
const ch17MemoryQuestions: PracticeQuestion[] = [
  { id: 'class7-memory-ch17-vayikhtov', prompt: 'Parse and translate this form.', hebrew: 'וַיִּכְתֹּב', transliteration: 'vayyikhtov', options: ['Imperfect + Waw Consecutive — "and he wrote"', 'Perfect + conjunction — "and he wrote"', 'Imperfect + conjunction — "and he will write"', 'Imperative — "write!"'], correctIndex: 0, explanation: 'Pathach under the waw plus the Daghesh Forte in the preformative י marks the Waw Consecutive on an Imperfect, so the time value flips to past: "and he wrote."', category: 'ch17-memory' },
  { id: 'class7-memory-ch17-vekhatav', prompt: 'Parse and translate this form.', hebrew: 'וְכָתַב', transliteration: 'vekhatav', options: ['Imperfect + Waw Consecutive — "and he wrote"', 'Perfect + Waw Consecutive — "and he will write"', 'Imperative — "write!"', 'participle — "writing"'], correctIndex: 1, explanation: 'כָתַב is a Qal Perfect 3ms. Prefixed with the consecutive waw it takes Imperfect values: "and he will write." Context (and, in 2ms/1cs, the accent) distinguishes it from a plain conjunction.', category: 'ch17-memory' },
  { id: 'class7-memory-ch17-vattomer', prompt: 'Parse and translate this form.', hebrew: 'וַתֹּאמֶר', transliteration: 'vattomer', options: ['1cs — "and I said"', '3mp — "and they said"', '3fs or 2ms — "and she said / and you said"', '3ms — "and he said"'], correctIndex: 2, explanation: 'The ת preformative is ambiguous between 3fs and 2ms, exactly as in the plain Imperfect. With the consecutive waw: "and she said" (or "and you said").', category: 'ch17-memory' },
  { id: 'class7-memory-ch17-vayyered', prompt: 'Parse and translate this form.', hebrew: 'וַיֵּרֶד', transliteration: 'vayyered', options: ['"and he went down"', '"and he will go down"', '"go down!"', '"and they went down"'], correctIndex: 0, explanation: 'יֵרֵד is the Qal Imperfect 3ms of יָרַד, a I-י verb. With the consecutive waw the accent shifts back and the stem vowel shortens: וַיֵּרֶד = "and he went down."', category: 'ch17-memory' },
  { id: 'class7-memory-ch17-vayehi', prompt: 'What is the difference between וַיְהִי and וְהָיָה?', hebrew: 'וַיְהִי / וְהָיָה', options: ['there is none; they are spelling variants', 'the first is plural, the second singular', 'the first is a question, the second a statement', 'the first looks BACK ("and it came to pass"), the second looks FORWARD ("and it shall come to pass")'], correctIndex: 3, explanation: 'וַיְהִי is a consecutive Imperfect and introduces past narrative; וְהָיָה is a consecutive Perfect and introduces future narrative. The same root, opposite time frames — decided entirely by which conjugation the waw sits on.', category: 'ch17-memory' },
  { id: 'class7-memory-ch17-vayyishmeu', prompt: 'Parse and translate this form.', hebrew: 'וַיִּשְׁמְעוּ', transliteration: 'vayyishmeu', options: ['1cp — "and we heard"', '3mp — "and they heard"', '2mp — "and you all heard"', '3ms — "and he heard"'], correctIndex: 1, explanation: 'The י preformative with the ־וּ ending marks 3mp, and the consecutive waw gives it past value: "and they heard."', category: 'ch17-memory' },
];

// Chapter 18 — the Qal Imperative: direct commands, second person only.
const ch18Questions: PracticeQuestion[] = [
  { id: 'class7-ch18-1', prompt: 'The Hebrew Imperative occurs in which person(s)?', options: ['the second person only, singular and plural', 'first and second person', 'all three persons', 'the third person only'], correctIndex: 0, explanation: 'The Imperative has only four forms: 2ms, 2fs, 2mp, 2fp. For first-person volition Hebrew uses the Cohortative, and for third-person volition the Jussive.', category: 'ch18' },
  { id: 'class7-ch18-2', prompt: 'How is the Qal Imperative built from the Imperfect?', options: ['by adding ־ָה to the Imperfect', 'by doubling the first root consonant', 'by removing the preformative from the four second-person Imperfect forms', 'by prefixing ה'], correctIndex: 2, explanation: 'Take תִּקְטֹל, drop the ת preformative, and you have קְטֹל. That relationship holds across the four second-person forms, with minor spelling changes in some weak classes.', category: 'ch18' },
  { id: 'class7-ch18-3', prompt: 'Translate this Imperative.', hebrew: 'שְׁמֹר', options: ['he kept', 'keep! (to one man)', 'keeping', 'to keep'], correctIndex: 1, explanation: 'שְׁמֹר is the Qal Imperative 2ms of שָׁמַר: "keep! / guard!" It is the Imperfect תִּשְׁמֹר with the preformative removed.', category: 'ch18' },
  { id: 'class7-ch18-4', prompt: 'Translate this Imperative.', hebrew: 'שִׁמְרוּ', options: ['they kept', 'we shall keep', 'he will keep them', 'keep! (to more than one man)'], correctIndex: 3, explanation: 'שִׁמְרוּ is the Qal Imperative 2mp: "keep!" addressed to a group. The ־וּ ending is the same plural marker you know from the Imperfect.', category: 'ch18' },
  { id: 'class7-ch18-5', prompt: 'How does Hebrew express a NEGATIVE command?', options: ['by negating the Imperative with לֹא', 'by adding a negative suffix to the Imperative', 'with לֹא or אַל followed by a second-person IMPERFECT — the Imperative is never negated', 'with אֵין plus the Imperative'], correctIndex: 2, explanation: 'The Imperative is never negated. Prohibitions use לֹא + Imperfect (permanent: "you shall not...") or אַל + Imperfect (immediate: "do not...!").', category: 'ch18' },
  { id: 'class7-ch18-6', prompt: 'What does the particle נָא add to an Imperative?', hebrew: 'נָא', options: ['a softening "please," or nothing translatable at all', 'a negation', 'a question', 'a plural sense'], correctIndex: 0, explanation: 'נָא follows the Imperative, often joined by Maqqef (קַח־נָא, "take, please"). It softens the command to a request, and is frequently left untranslated.', category: 'ch18' },
  { id: 'class7-ch18-7', prompt: 'Translate this famous command (Deuteronomy 6:4).', hebrew: 'שְׁמַע יִשְׂרָאֵל', options: ['Israel has heard', 'Hear, O Israel!', 'Israel will hear', 'Let Israel hear'], correctIndex: 1, explanation: 'שְׁמַע is the Qal Imperative 2ms of שָׁמַע, with a Pathach stem vowel because of the guttural ע. יִשְׂרָאֵל is a vocative: "Hear, O Israel!"', category: 'ch18' },
  { id: 'class7-ch18-8', prompt: 'What ending identifies a III-ה verb in the Imperative 2ms?', options: ['Qamets-He (ָה)', 'Seghol-He (ֶה)', 'a final ת', 'Tsere-He (ֵה)'], correctIndex: 3, explanation: 'III-ה Imperatives end in Tsere-He: בְּנֵה ("build!"), עֲשֵׂה ("do!"), רְאֵה ("see!"). Compare the Imperfect of the same class, which ends in Seghol-He (יִבְנֶה).', category: 'ch18' },
];

// Chapter 18 recall: the four Qal Imperative forms plus the irregulars.
const ch18MemoryQuestions: PracticeQuestion[] = [
  { id: 'class7-memory-ch18-2ms', prompt: 'Parse this Qal Imperative form.', hebrew: 'קְטֹל', transliteration: 'qetol', options: ['2ms — "kill!" (to one man)', '2fs — "kill!" (to one woman)', '2mp — "kill!" (to men)', '2fp — "kill!" (to women)'], correctIndex: 0, explanation: 'קְטֹל is the base Imperative, identical to the Imperfect תִּקְטֹל minus its preformative.', category: 'ch18-memory' },
  { id: 'class7-memory-ch18-2fs', prompt: 'Parse this Qal Imperative form.', hebrew: 'קִטְלִי', transliteration: 'qitli', options: ['2mp — "kill!" (to men)', '2fs — "kill!" (to one woman)', '2ms — "kill!" (to one man)', '2fp — "kill!" (to women)'], correctIndex: 1, explanation: 'The ־ִי ending marks 2fs, exactly as in the Imperfect תִּקְטְלִי.', category: 'ch18-memory' },
  { id: 'class7-memory-ch18-2mp', prompt: 'Parse this Qal Imperative form.', hebrew: 'קִטְלוּ', transliteration: 'qitlu', options: ['2fp — "kill!" (to women)', '2ms — "kill!" (to one man)', '2mp — "kill!" (to more than one man)', '2fs — "kill!" (to one woman)'], correctIndex: 2, explanation: 'The ־וּ ending marks 2mp. Note the Hireq under the first consonant in both plural-style forms קִטְלִי and קִטְלוּ.', category: 'ch18-memory' },
  { id: 'class7-memory-ch18-2fp', prompt: 'Parse this Qal Imperative form.', hebrew: 'קְטֹלְנָה', transliteration: 'qetolnah', options: ['2ms — "kill!" (to one man)', '2mp — "kill!" (to men)', '2fs — "kill!" (to one woman)', '2fp — "kill!" (to more than one woman)'], correctIndex: 3, explanation: 'The ־נָה ending marks the feminine plural, the same ending you met in the Imperfect תִּקְטֹלְנָה.', category: 'ch18-memory' },
  { id: 'class7-memory-ch18-nefol', prompt: 'Which root would you look up for this Imperative?', hebrew: 'נְפֹל', transliteration: 'nefol', options: ['נָפַל ("to fall") — the נ is retained in the Imperative', 'פָּלַל ("to pray")', 'נָפַשׁ ("to rest")', 'פָּלַט ("to escape")'], correctIndex: 0, explanation: 'A I-נ verb assimilates its נ in the Imperfect (יִפֹּל) but keeps it in the Imperative: נְפֹל = "fall!"', category: 'ch18-memory' },
  { id: 'class7-memory-ch18-qach', prompt: 'Which root would you look up for this Imperative?', hebrew: 'קַח', transliteration: 'qach', options: ['קוּם ("to arise")', 'לָקַח ("to take") — the ל drops out entirely', 'קָרָא ("to call")', 'קָנָה ("to acquire")'], correctIndex: 1, explanation: 'לָקַח loses its ל in the Imperative just as it assimilates it in the Imperfect (יִקַּח): קַח = "take!" It appears constantly with נָא — קַח־נָא, "take, please."', category: 'ch18-memory' },
];

// Chapter 19 — pronominal suffixes on verbs: the object built into the verb.
const ch19Questions: PracticeQuestion[] = [
  { id: 'class7-ch19-1', prompt: 'When a pronoun is the direct object of a verb, it may be attached:', options: ['only to the definite direct object marker אֵת', 'either to אֵת or directly to the verb itself', 'only to a preposition', 'only to the subject'], correctIndex: 1, explanation: 'Both are available: אֹתוֹ ("him") stands as a separate word, or the same suffix rides on the verb — קְטָלוֹ, "he killed him."', category: 'ch19' },
  { id: 'class7-ch19-2', prompt: 'Which suffix type do Perfect, Imperfect, and Imperative verbs generally take?', options: ['Type 1 suffixes, with an OBJECTIVE value ("me, him, her")', 'Type 2 suffixes, with a possessive value ("my, his")', 'the article', 'the directional ending ־ָה'], correctIndex: 0, explanation: 'On a noun a suffix is possessive ("my word"); on a verb the same Type 1 suffix is objective ("he kept me"). The form is familiar — only the translation value changes.', category: 'ch19' },
  { id: 'class7-ch19-3', prompt: 'Translate this Perfect verb with its suffix.', hebrew: 'קְטָלוּהָ', options: ['they killed', 'they killed him', 'she was killed', 'they killed her'], correctIndex: 3, explanation: 'קָטְלוּ is the Qal Perfect 3cp ("they killed"); the ־הָ suffix supplies the object: "they killed her."', category: 'ch19' },
  { id: 'class7-ch19-4', prompt: 'Translate this Imperative with its suffix.', hebrew: 'שָׁפְטֵנִי', options: ['Judge me!', 'He judged me', 'He will judge me', 'my judgment'], correctIndex: 0, explanation: 'The Imperative 2ms שְׁפֹט shifts to שָׁפְט־ before a suffix, and ־נִי supplies "me": "Judge me!" The e-class connecting vowel (Tsere) is typical of Imperative and Imperfect suffixes.', category: 'ch19' },
  { id: 'class7-ch19-5', prompt: 'The so-called Nun-suffixes (־ֶנּוּ, ־ֶנָּה, ־ֶךָּ) are added mainly to which conjugation?', options: ['the Perfect', 'the Imperfect', 'the participle', 'the infinitive absolute'], correctIndex: 1, explanation: 'Three extra Imperfect suffixes must be memorized alongside the regular set. They contain a doubled Nun and are frequent in poetry: יִשְׁמְרֶנּוּ, "he will keep him."', category: 'ch19' },
  { id: 'class7-ch19-6', prompt: 'Which connecting vowels do the different conjugations prefer before a suffix?', options: ['all conjugations prefer Shewa', 'the Perfect prefers e-class, the Imperfect a-class', 'the Perfect prefers a-class (Pathach or Qamets); the Imperfect and Imperative prefer e-class (Seghol or Tsere)', 'there are never connecting vowels'], correctIndex: 2, explanation: 'When a verb ends in a consonant, a connecting vowel is usually inserted before the suffix. Knowing which class to expect keeps you from misreading the stem.', category: 'ch19' },
  { id: 'class7-ch19-7', prompt: 'Translate this form (Genesis 15:6 uses the same construction).', hebrew: 'וַיִּתְּנֵם', options: ['and they gave him', 'and he gave them', 'and he will give them', 'and it was given to them'], correctIndex: 1, explanation: 'Three layers at once: the Waw Consecutive (Ch 17), the Qal Imperfect 3ms of נָתַן with its assimilated נ (Ch 16), and the 3mp suffix ־ם (Ch 19): "and he gave them."', category: 'ch19' },
  { id: 'class7-ch19-8', prompt: 'Translate this Imperative with its suffix (Isaiah 6:8).', hebrew: 'שְׁלָחֵנִי', options: ['he sent me', 'I will send', 'Send me!', 'my messenger'], correctIndex: 2, explanation: 'The Imperative שְׁלַח ("send!") plus the 1cs suffix ־נִי with a Tsere connecting vowel: "Send me!" — Isaiah\'s answer to the LORD.', category: 'ch19' },
];

// Chapter 19 recall: identify the suffix and the form carrying it.
const ch19MemoryQuestions: PracticeQuestion[] = [
  { id: 'class7-memory-ch19-qetaluni', prompt: 'Parse this form.', hebrew: 'קְטָלוּנִי', transliteration: 'qetaluni', options: ['Perfect 3cp + 1cs suffix — "they killed me"', 'Perfect 1cs + 3mp suffix — "I killed them"', 'Imperfect 3mp + 1cs suffix — "they will kill me"', 'Imperative 2mp + 1cs suffix — "kill me!"'], correctIndex: 0, explanation: 'The ־וּ marks the Perfect 3cp and ־נִי supplies the object "me." Note that the stem vowels shift when the accent moves to the suffix.', category: 'ch19-memory' },
  { id: 'class7-memory-ch19-qetaluha', prompt: 'Which object does the suffix on this verb supply?', hebrew: 'קְטָלוּהָ', transliteration: 'qetaluha', options: ['"me"', '"her"', '"him"', '"them"'], correctIndex: 1, explanation: '־הָ is the 3fs suffix: קְטָלוּהָ = "they killed her." Compare קְטָלוּהוּ ("they killed him") and קְטָלוּנִי ("they killed me").', category: 'ch19-memory' },
  { id: 'class7-memory-ch19-ni', prompt: 'Which suffix on a verb means "me"?', options: ['־ךָ', '־וֹ', '־נִי', '־הָ'], correctIndex: 2, explanation: '־נִי is the 1cs object suffix on a verb (on a noun the possessive form is just ־ִי). Hence שְׁמָעֵנִי = "hear me!"', category: 'ch19-memory' },
  { id: 'class7-memory-ch19-shemaeni', prompt: 'Parse this form.', hebrew: 'שְׁמָעֵנִי', transliteration: 'shemaeni', options: ['Perfect 3ms + 1cs suffix — "he heard me"', 'Imperfect 3ms + 1cs suffix — "he will hear me"', 'participle + 1cs suffix — "the one who hears me"', 'Imperative 2ms + 1cs suffix — "hear me!"'], correctIndex: 3, explanation: 'The Imperative שְׁמַע with the Tsere connecting vowel and the 1cs suffix: "hear me!" Imperatives with suffixes are everywhere in the Psalms.', category: 'ch19-memory' },
  { id: 'class7-memory-ch19-nun', prompt: 'What is distinctive about the Nun-suffixes?', options: ['they double the Nun and attach mainly to the Imperfect', 'they attach only to nouns', 'they mark the subject rather than the object', 'they are used only in the Perfect'], correctIndex: 0, explanation: 'The Nun-suffixes ־ֶנּוּ, ־ֶנָּה and ־ֶךָּ carry a Daghesh Forte in the Nun and belong mostly to the Imperfect. Learn them as a set alongside the regular Type 1 suffixes.', category: 'ch19-memory' },
  { id: 'class7-memory-ch19-reduction', prompt: 'What happens to the Holem stem vowel of an Imperfect like יִקְטֹל when a suffix is added?', options: ['it lengthens to Qamets', 'it stays unchanged', 'it becomes a Shureq', 'it reduces to a vocal Shewa (יִקְטְל־)'], correctIndex: 3, explanation: 'The accent moves toward the suffix, so the stem vowel reduces: יִקְטֹל becomes יִקְטְלֵנִי ("he will kill me"). Expect vowel reduction whenever a suffix pulls the accent forward.', category: 'ch19-memory' },
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

// Chapter 17-19 "You Should Know" vocabulary.
export const CLASS7_WORD_GROUPS: PracticeQuestionGroup[] = [
  wordGroup({ id: 'class7-word-ahav', hebrew: 'אָהַב', transliteration: 'ahav', transliterationOptions: ['ahav', 'asaf', 'avad', 'amar'], transliterationCorrectIndex: 0, meaning: 'to love', meaningOptions: ['to love', 'to gather', 'to serve', 'to say'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class7-word-asaf', hebrew: 'אָסַף', transliteration: 'asaf', transliterationOptions: ['ahav', 'asaf', 'azav', 'akhal'], transliterationCorrectIndex: 1, meaning: 'to gather in, take away', meaningOptions: ['to love', 'to gather in, take away', 'to forsake', 'to eat'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class7-word-galah', hebrew: 'גָּלָה', transliteration: 'galah', transliterationOptions: ['gadal', 'gaal', 'galah', 'gaar'], transliterationCorrectIndex: 2, meaning: 'to uncover, reveal; to go into exile', meaningOptions: ['to grow great', 'to redeem', 'to uncover, reveal; to go into exile', 'to rebuke'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class7-word-kalah', hebrew: 'כָּלָה', transliteration: 'kalah', transliterationOptions: ['kasah', 'karat', 'katav', 'kalah'], transliterationCorrectIndex: 3, meaning: 'to be complete, finished, at an end', meaningOptions: ['to cover', 'to cut', 'to write', 'to be complete, finished, at an end'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class7-word-shafat', hebrew: 'שָׁפַט', transliteration: 'shafat', transliterationOptions: ['shafat', 'shalach', 'shamar', 'shama'], transliterationCorrectIndex: 0, meaning: 'to judge, decide, settle a dispute', meaningOptions: ['to judge, decide, settle a dispute', 'to send', 'to keep', 'to hear'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class7-word-emet', hebrew: 'אֱמֶת', transliteration: 'emet', transliterationOptions: ['ohel', 'emet', 'adam', 'erets'], transliterationCorrectIndex: 1, meaning: 'truth, faithfulness', meaningOptions: ['tent', 'truth, faithfulness', 'man', 'land'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class7-word-bachar', hebrew: 'בָּחַר', transliteration: 'bachar', transliterationOptions: ['batach', 'bakhah', 'bachar', 'banah'], transliterationCorrectIndex: 2, meaning: 'to choose, test, examine', meaningOptions: ['to trust', 'to weep', 'to choose, test, examine', 'to build'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class7-word-darash', hebrew: 'דָּרַשׁ', transliteration: 'darash', transliterationOptions: ['davar', 'dor', 'daat', 'darash'], transliterationCorrectIndex: 3, meaning: 'to seek, inquire of, require', meaningOptions: ['word', 'generation', 'knowledge', 'to seek, inquire of, require'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class7-word-harag', hebrew: 'הָרַג', transliteration: 'harag', transliterationOptions: ['harag', 'halakh', 'hayah', 'hafakh'], transliterationCorrectIndex: 0, meaning: 'to kill, slay', meaningOptions: ['to kill, slay', 'to walk', 'to be', 'to overturn'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class7-word-qadash', hebrew: 'קָדַשׁ', transliteration: 'qadash', transliterationOptions: ['qara', 'qadash', 'qum', 'qavats'], transliterationCorrectIndex: 1, meaning: 'to be holy, set apart, consecrated', meaningOptions: ['to call', 'to be holy, set apart, consecrated', 'to arise', 'to gather'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class7-word-shaal', hebrew: 'שָׁאַל', transliteration: 'shaal', transliterationOptions: ['shatah', 'shakhach', 'shaal', 'shaar'], transliterationCorrectIndex: 2, meaning: 'to ask, inquire, request', meaningOptions: ['to drink', 'to forget', 'to ask, inquire, request', 'to remain'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class7-word-shevet', hebrew: 'שֵׁבֶט', transliteration: 'shevet', transliterationOptions: ['shalom', 'shemesh', 'shanah', 'shevet'], transliterationCorrectIndex: 3, meaning: 'rod, staff, scepter, tribe', meaningOptions: ['peace', 'sun', 'year', 'rod, staff, scepter, tribe'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class7-word-batach', hebrew: 'בָּטַח', transliteration: 'batach', transliterationOptions: ['batach', 'bachar', 'bakhah', 'baal'], transliterationCorrectIndex: 0, meaning: 'to trust, rely upon', meaningOptions: ['to trust, rely upon', 'to choose', 'to weep', 'owner'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class7-word-bakhah', hebrew: 'בָּכָה', transliteration: 'bakhah', transliterationOptions: ['banah', 'bakhah', 'batach', 'bachar'], transliterationCorrectIndex: 1, meaning: 'to weep, weep for', meaningOptions: ['to build', 'to weep, weep for', 'to trust', 'to choose'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class7-word-lavash', hebrew: 'לָבַשׁ', transliteration: 'lavash', transliterationOptions: ['laqach', 'lamad', 'lavash', 'lakhad'], transliterationCorrectIndex: 2, meaning: 'to put on a garment, be clothed', meaningOptions: ['to take', 'to learn', 'to put on a garment, be clothed', 'to capture'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class7-word-dor', hebrew: 'דּוֹר', transliteration: 'dor', transliterationOptions: ['davar', 'derekh', 'daat', 'dor'], transliterationCorrectIndex: 3, meaning: 'generation', meaningOptions: ['word', 'way, road', 'knowledge', 'generation'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class7-word-zera', hebrew: 'זֶרַע', transliteration: 'zera', transliterationOptions: ['zera', 'zakhar', 'zavach', 'zaaq'], transliterationCorrectIndex: 0, meaning: 'seed, offspring, descendants', meaningOptions: ['seed, offspring, descendants', 'to remember', 'to sacrifice', 'to cry out'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class7-word-avon', hebrew: 'עָוֹן', transliteration: 'avon', transliterationOptions: ['ayin', 'avon', 'olam', 'am'], transliterationCorrectIndex: 1, meaning: 'iniquity, guilt, punishment for sin', meaningOptions: ['eye', 'iniquity, guilt, punishment for sin', 'forever', 'people'], meaningCorrectIndex: 1 }),
];

// Verse translation — famous clauses driven by a consecutive verb, an
// Imperative, or a verb carrying its object as a suffix.
const verseQuestions: PracticeQuestion[] = [
  { id: 'class7-verse-1', prompt: 'Translate this verse (Genesis 1:3).', hebrew: 'וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר', options: ['And God said, "Let there be light," and there was light.', 'And God will say, "Let there be light."', 'God is the light, and light is God.', 'God saw the light, that it was good.'], correctIndex: 0, explanation: 'Two consecutive Imperfects (Ch 17) frame a Jussive: וַיֹּאמֶר ("and he said"), יְהִי ("let there be"), וַיְהִי ("and there was").', category: 'verse' },
  { id: 'class7-verse-2', prompt: 'Translate this command (Psalm 34:14).', hebrew: 'סוּר מֵרָע וַעֲשֵׂה־טוֹב', options: ['He turned from evil and did good.', 'Turn from evil and do good.', 'Evil will turn, and good will come.', 'Who turns from evil and does good?'], correctIndex: 1, explanation: 'Two Qal Imperatives (Ch 18): סוּר, from the Biconsonantal סוּר ("turn aside"), and עֲשֵׂה, the III-ה Imperative of עָשָׂה with its diagnostic Tsere-He ending.', category: 'verse' },
  { id: 'class7-verse-3', prompt: 'Translate this call (Joshua 24:15).', hebrew: 'בַּחֲרוּ לָכֶם הַיּוֹם אֶת־מִי תַעֲבֹדוּן', options: ['They chose this day whom they would serve.', 'Whom did you choose to serve today?', 'The LORD has chosen you this day to serve him.', 'Choose this day whom you will serve.'], correctIndex: 3, explanation: 'בַּחֲרוּ is the Qal Imperative 2mp of בָּחַר, a I-guttural verb (Ch 18 vocabulary). תַעֲבֹדוּן is the Imperfect of עָבַד with an old paragogic Nun ending.', category: 'verse' },
  { id: 'class7-verse-4', prompt: 'Translate this petition (Psalm 51:10).', hebrew: 'לֵב טָהוֹר בְּרָא־לִי אֱלֹהִים', options: ['Create in me a clean heart, O God.', 'God has made my heart clean.', 'My heart is pure before God.', 'God will create a new heart.'], correctIndex: 0, explanation: 'בְּרָא is a Qal Imperative 2ms ("create!"), and the object לֵב טָהוֹר ("a clean heart") is fronted for emphasis. טָהוֹר belongs to the root טָהֵר, Chapter 17 vocabulary.', category: 'verse' },
  { id: 'class7-verse-5', prompt: 'Translate this command (Genesis 22:2).', hebrew: 'קַח־נָא אֶת־בִּנְךָ', options: ['He took his son.', 'Take your son, please.', 'Your son will be taken.', 'Who took your son?'], correctIndex: 1, explanation: 'קַח is the irregular Imperative of לָקַח, joined by Maqqef to נָא ("please"). אֶת־ marks the definite object בִּנְךָ ("your son").', category: 'verse' },
  { id: 'class7-verse-6', prompt: 'Translate this prayer (Psalm 16:1).', hebrew: 'שָׁמְרֵנִי אֵל כִּי־חָסִיתִי בָךְ', options: ['God has kept me, for I trusted in him.', 'The LORD is my keeper and my refuge.', 'Preserve me, O God, for in you I take refuge.', 'I will keep watch for God, for he is my refuge.'], correctIndex: 2, explanation: 'שָׁמְרֵנִי is the Qal Imperative of שָׁמַר with the 1cs suffix ־נִי (Ch 19): "keep me!" חָסִיתִי is a Qal Perfect 1cs, "I have taken refuge."', category: 'verse' },
];

const chapter17ContextQuestions: PracticeQuestion[] = [
  { id: 'class7-context-ch17-gen1-4', prompt: 'Translate this clause (Genesis 1:4).', hebrew: 'וַיַּרְא אֱלֹהִים אֶת־הָאוֹר כִּי־טוֹב', options: ['And God saw the light, that it was good.', 'And God will see the light.', 'God is the light, and he is good.', 'God made the light and called it good.'], correctIndex: 0, explanation: 'Chapter 17 focus: וַיַּרְא is the consecutive Imperfect of רָאָה — a III-ה verb that loses its final ה when the accent shifts back. Past narrative value.', category: 'context-ch17' },
  { id: 'class7-context-ch17-gen8-1', prompt: 'Translate this clause (Genesis 8:1).', hebrew: 'וַיִּזְכֹּר אֱלֹהִים אֶת־נֹחַ', options: ['God will remember Noah.', 'And God remembered Noah.', 'Noah remembered God.', 'God is mindful of Noah.'], correctIndex: 1, explanation: 'Chapter 17 focus: וַיִּזְכֹּר is a textbook consecutive Imperfect — waw + Pathach + Daghesh Forte in the preformative, a strong verb keeping its Holem stem vowel.', category: 'context-ch17' },
  { id: 'class7-context-ch17-deut5-15', prompt: 'Translate this clause (Deuteronomy 5:15).', hebrew: 'וְזָכַרְתָּ כִּי־עֶבֶד הָיִיתָ', options: ['You remembered that you were a servant.', 'Remember that you are a servant!', 'And you shall remember that you were a slave.', 'They will remember that they were slaves.'], correctIndex: 2, explanation: 'Chapter 17 focus: וְזָכַרְתָּ is a consecutive PERFECT, so it carries Imperfect values — "and you shall remember." הָיִיתָ is a plain Perfect 2ms, "you were."', category: 'context-ch17' },
  { id: 'class7-context-ch17-gen1-5', prompt: 'Translate this clause (Genesis 1:5).', hebrew: 'וַיְהִי־עֶרֶב וַיְהִי־בֹקֶר', options: ['Evening will come and morning will come.', 'It was evening; it is morning.', 'Let there be evening and morning.', 'And there was evening and there was morning.'], correctIndex: 3, explanation: 'Chapter 17 focus: וַיְהִי is the consecutive Imperfect of הָיָה, the single most common narrative verb form in the Hebrew Bible.', category: 'context-ch17' },
];

const chapter18ContextQuestions: PracticeQuestion[] = [
  { id: 'class7-context-ch18-josh1-9', prompt: 'Translate this charge (Joshua 1:9).', hebrew: 'חֲזַק וֶאֱמָץ', options: ['Be strong and courageous!', 'He was strong and courageous.', 'Strength and courage are from the LORD.', 'You will be strong and courageous.'], correctIndex: 0, explanation: 'Chapter 18 focus: two Qal Imperatives 2ms. Both roots are I-guttural, so the first vowel is a Hateph Pathach rather than a plain Shewa.', category: 'context-ch18' },
  { id: 'class7-context-ch18-ps34-8', prompt: 'Translate this invitation (Psalm 34:8).', hebrew: 'טַעֲמוּ וּרְאוּ כִּי־טוֹב יְהוָה', options: ['They tasted and saw that the LORD is good.', 'Taste and see that the LORD is good.', 'Who has tasted and seen the goodness of the LORD?', 'You will taste and see the goodness of the LORD.'], correctIndex: 1, explanation: 'Chapter 18 focus: two 2mp Imperatives with the ־וּ ending. רְאוּ is the plural Imperative of the III-ה verb רָאָה, joined by the conjunction וּ.', category: 'context-ch18' },
  { id: 'class7-context-ch18-ps100-2', prompt: 'Translate this command (Psalm 100:2).', hebrew: 'עִבְדוּ אֶת־יְהוָה בְּשִׂמְחָה', options: ['They served the LORD with gladness.', 'We will serve the LORD with gladness.', 'Serve the LORD with gladness.', 'The LORD is served with gladness.'], correctIndex: 2, explanation: 'Chapter 18 focus: עִבְדוּ is the Qal Imperative 2mp of עָבַד — the Imperfect תַּעַבְדוּ with its preformative removed. בְּשִׂמְחָה = "with gladness."', category: 'context-ch18' },
  { id: 'class7-context-ch18-gen12-1', prompt: 'Translate this command (Genesis 12:1).', hebrew: 'לֶךְ־לְךָ מֵאַרְצְךָ', options: ['He went out from his land.', 'You will go from your land.', 'Who will go from your land?', 'Go from your land.'], correctIndex: 3, explanation: 'Chapter 18 focus: לֵךְ is the irregular Imperative of הָלַךְ, which behaves like a I-י verb and drops the ה. לְךָ adds an emphatic "for yourself."', category: 'context-ch18' },
];

const chapter19ContextQuestions: PracticeQuestion[] = [
  { id: 'class7-context-ch19-isa6-8', prompt: 'Translate this answer (Isaiah 6:8).', hebrew: 'הִנְנִי שְׁלָחֵנִי', options: ['Here I am; send me!', 'He is here; he sent me.', 'Behold, I was sent.', 'Am I the one you sent?'], correctIndex: 0, explanation: 'Chapter 19 focus: שְׁלָחֵנִי is an Imperative carrying its object as a suffix — "send me!" הִנְנִי is הִנֵּה ("behold") with the same 1cs suffix.', category: 'context-ch19' },
  { id: 'class7-context-ch19-ps51-1', prompt: 'Translate this plea (Psalm 51:1).', hebrew: 'חָנֵּנִי אֱלֹהִים כְּחַסְדֶּךָ', options: ['God was gracious to me in his steadfast love.', 'Be gracious to me, O God, according to your steadfast love.', 'God will show me his steadfast love.', 'My grace comes from the steadfast love of God.'], correctIndex: 1, explanation: 'Chapter 19 focus: an Imperative plus the 1cs suffix ־נִי ("me"), from the root חָנַן. כְּחַסְדֶּךָ carries the possessive suffix "your" on a noun — the same suffix set, a different translation value.', category: 'context-ch19' },
  { id: 'class7-context-ch19-num6-24', prompt: 'Translate this blessing (Numbers 6:24).', hebrew: 'יְבָרֶכְךָ יְהוָה וְיִשְׁמְרֶךָ', options: ['The LORD has blessed you and kept you.', 'Bless the LORD and keep his word.', 'The LORD bless you and keep you.', 'We will bless the LORD and keep his covenant.'], correctIndex: 2, explanation: 'Chapter 19 focus: both verbs carry the 2ms object suffix "you." יִשְׁמְרֶךָ shows the Imperfect stem vowel reducing to Shewa before the suffix; יְבָרֶכְךָ is a Piel, previewed here (Ch 30).', category: 'context-ch19' },
  { id: 'class7-context-ch19-gen15-6', prompt: 'Translate this clause (Genesis 15:6).', hebrew: 'וַיַּחְשְׁבֶהָ לּוֹ צְדָקָה', options: ['His righteousness was counted to him.', 'He thought about his righteousness.', 'Righteousness will be reckoned to him.', 'And he counted it to him as righteousness.'], correctIndex: 3, explanation: 'Chapter 19 focus: three layers at once — the Waw Consecutive, the Imperfect of חָשַׁב, and the 3fs object suffix ־ֶהָ ("it," referring to Abram\'s faith).', category: 'context-ch19' },
];

export const CLASS7_CH17_MEMORY_GROUPS = asGroups(ch17MemoryQuestions);
export const CLASS7_CH18_MEMORY_GROUPS = asGroups(ch18MemoryQuestions);
export const CLASS7_CH19_MEMORY_GROUPS = asGroups(ch19MemoryQuestions);
export const CLASS7_MEMORY_GROUPS = [
  ...CLASS7_CH17_MEMORY_GROUPS,
  ...CLASS7_CH18_MEMORY_GROUPS,
  ...CLASS7_CH19_MEMORY_GROUPS,
];

export const CLASS7_CH17_CONTEXT_GROUPS = asGroups(chapter17ContextQuestions);
export const CLASS7_CH18_CONTEXT_GROUPS = asGroups(chapter18ContextQuestions);
export const CLASS7_CH19_CONTEXT_GROUPS = asGroups(chapter19ContextQuestions);
export const CLASS7_CONTEXT_GROUPS = [
  ...CLASS7_CH17_CONTEXT_GROUPS,
  ...CLASS7_CH18_CONTEXT_GROUPS,
  ...CLASS7_CH19_CONTEXT_GROUPS,
];

export const CLASS7_CH17_GROUPS = [...asGroups(ch17Questions), ...CLASS7_CH17_MEMORY_GROUPS];
export const CLASS7_CH18_GROUPS = [...asGroups(ch18Questions), ...CLASS7_CH18_MEMORY_GROUPS];
export const CLASS7_CH19_GROUPS = [...asGroups(ch19Questions), ...CLASS7_CH19_MEMORY_GROUPS];

export const CLASS7_VERSE_GROUPS = [...asGroups(verseQuestions), ...CLASS7_CONTEXT_GROUPS];
