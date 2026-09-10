// Class 8 practice — CourseGuide for BBH Chapters 20-22: the Qal Infinitive
// Construct, the Qal Infinitive Absolute, and the Qal Participle, plus the
// Chapter 20-22 "You Should Know" vocabulary and verse translation whose
// grammar stays within Chapters 1-22.
// Released: routes to /class-practice/class-8-mcq with hub card on /class-practice.

import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function asGroups(questions: PracticeQuestion[]): PracticeQuestionGroup[] {
  return questions.map((question) => ({ id: question.id, questions: [question] }));
}

// Chapter 20 — the Qal Infinitive Construct: the verbal noun that lives after
// prepositions.
const ch20Questions: PracticeQuestion[] = [
  { id: 'class8-ch20-1', prompt: 'The Infinitive Construct is inflected for:', options: ['neither person, gender, nor number', 'person and number', 'gender only', 'person only'], correctIndex: 0, explanation: 'The Infinitive Construct has one basic form, which in strong verbs and many weak verbs is identical to the Qal Imperative 2ms: קְטֹל.', category: 'ch20' },
  { id: 'class8-ch20-2', prompt: 'Translate this form.', hebrew: 'לִשְׁמֹר', options: ['he kept', 'keep!', 'to keep / in order to keep', 'the keeper'], correctIndex: 2, explanation: 'לְ + the Infinitive Construct is the most common infinitive construction in the Hebrew Bible, expressing purpose or serving as a complement: "to keep, in order to keep."', category: 'ch20' },
  { id: 'class8-ch20-3', prompt: 'What may attach to an Infinitive Construct?', options: ['nothing may attach to it', 'only the article', 'only a plural ending', 'prepositional prefixes, pronominal suffixes, or both'], correctIndex: 3, explanation: 'בְּשָׁמְעוֹ ("when he heard") shows both at once: the preposition בְּ in front and the 3ms suffix behind. That flexibility is what makes the form so common.', category: 'ch20' },
  { id: 'class8-ch20-4', prompt: 'A pronominal suffix on an Infinitive Construct may function as:', options: ['the definite article', 'either the subject or the object of the verbal idea', 'the subject only', 'the object only'], correctIndex: 1, explanation: 'Context decides. בְּשָׁמְעוֹ normally means "when HE heard" (subject), but the same suffix can supply the object of the verbal idea.', category: 'ch20' },
  { id: 'class8-ch20-5', prompt: 'How is the Infinitive Construct negated?', options: ['with לֹא', 'with אַל', 'with אֵין', 'with בִּלְתִּי or לְבִלְתִּי'], correctIndex: 3, explanation: 'The ordinary verbal negatives לֹא and אַל are not used with the Infinitive Construct. Look for בִּלְתִּי or לְבִלְתִּי instead.', category: 'ch20' },
  { id: 'class8-ch20-6', prompt: 'Translate this form, which constantly introduces direct speech.', hebrew: 'לֵאמֹר', options: ['he said', 'saying', 'he will say', 'say!'], correctIndex: 1, explanation: 'לֵאמֹר is לְ + the Infinitive Construct of אָמַר. It regularly follows a verb of speaking and opens a quotation: "...saying, ..."', category: 'ch20' },
  { id: 'class8-ch20-7', prompt: 'Which three weak classes have Infinitive Construct forms that differ sharply from the strong verb?', options: ['III-ה, I-נ, and I-י', 'II-guttural, geminate, and III-א', 'Biconsonantal, III-ע, and I-א', 'geminate, III-ה, and II-ו'], correctIndex: 0, explanation: 'These three reshape the form: בָּנָה gives בְּנוֹת, נָתַן gives תֵּת, and יָשַׁב gives שֶׁבֶת. Learn them as vocabulary rather than deriving them.', category: 'ch20' },
  { id: 'class8-ch20-8', prompt: 'Translate this phrase.', hebrew: 'בְּשָׁמְעוֹ אֶת־הַדָּבָר', options: ['he heard the word', 'let him hear the word', 'when he heard the word', 'the word was heard by him'], correctIndex: 2, explanation: 'בְּ + Infinitive Construct + suffix gives a temporal clause: "when/while he heard." The suffix supplies the subject, and אֶת־ marks the object.', category: 'ch20' },
];

// Chapter 20 recall: reconstruct the root behind an irregular infinitive.
const ch20MemoryQuestions: PracticeQuestion[] = [
  { id: 'class8-memory-ch20-shevet', prompt: 'Which root would you look up for this Infinitive Construct?', hebrew: 'שֶׁבֶת', transliteration: 'shevet', options: ['יָשַׁב ("to sit, dwell")', 'שָׁבַת ("to cease")', 'שֵׁבֶט ("tribe")', 'שׁוּב ("to return")'], correctIndex: 0, explanation: 'I-י verbs drop their Yod and take a segholate-style infinitive: יָשַׁב gives שֶׁבֶת. Compare יָדַע, which gives דַּעַת.', category: 'ch20-memory' },
  { id: 'class8-memory-ch20-tet', prompt: 'Which root would you look up for this Infinitive Construct?', hebrew: 'תֵּת', transliteration: 'tet', options: ['תָּמַם ("to be complete")', 'נָתַן ("to give")', 'תָּקַע ("to blow")', 'שִׁית ("to set")'], correctIndex: 1, explanation: 'נָתַן loses its first נ by assimilation and its final נ by the infinitive ending, leaving only תֵּת = "to give."', category: 'ch20-memory' },
  { id: 'class8-memory-ch20-asot', prompt: 'Which root would you look up for this Infinitive Construct?', hebrew: 'עֲשׂוֹת', transliteration: 'asot', options: ['עָלָה ("to go up")', 'עָבַד ("to serve")', 'עָשָׂה ("to do, make")', 'עָזַב ("to forsake")'], correctIndex: 2, explanation: 'III-ה verbs take a ־וֹת ending in the Infinitive Construct: עָשָׂה gives עֲשׂוֹת, בָּנָה gives בְּנוֹת, רָאָה gives רְאוֹת.', category: 'ch20-memory' },
  { id: 'class8-memory-ch20-qachat', prompt: 'Which root would you look up for this Infinitive Construct?', hebrew: 'קַחַת', transliteration: 'qachat', options: ['קָרָא ("to call")', 'קוּם ("to arise")', 'קָנָה ("to acquire")', 'לָקַח ("to take")'], correctIndex: 3, explanation: 'לָקַח drops its ל in the Infinitive Construct exactly as it does in the Imperative (קַח) and the Imperfect (יִקַּח).', category: 'ch20-memory' },
  { id: 'class8-memory-ch20-daat', prompt: 'Which root would you look up for this Infinitive Construct?', hebrew: 'דַּעַת', transliteration: 'daat', options: ['יָדַע ("to know")', 'דָּבַר ("to speak")', 'דָּרַשׁ ("to seek")', 'דּוֹר ("generation")'], correctIndex: 0, explanation: 'יָדַע gives the Infinitive Construct דַּעַת, "to know." The identical form also serves as the noun דַּעַת ("knowledge") — a verbal noun in the fullest sense.', category: 'ch20-memory' },
  { id: 'class8-memory-ch20-purpose', prompt: 'What does לְ plus an Infinitive Construct most often express?', options: ['a completed action', 'purpose', 'a prohibition', 'a question'], correctIndex: 1, explanation: 'It is the workhorse purpose construction of Biblical Hebrew: לִשְׁמֹר ("in order to keep"), לֶאֱכֹל ("to eat"), לֵאמֹר ("saying").', category: 'ch20-memory' },
];

// Chapter 21 — the Qal Infinitive Absolute: one form, four uses.
const ch21Questions: PracticeQuestion[] = [
  { id: 'class8-ch21-1', prompt: 'What is the strong-verb form of the Qal Infinitive Absolute?', options: ['קֹטֵל', 'קְטֹל', 'קָטוֹל', 'יִקְטֹל'], correctIndex: 2, explanation: 'The Infinitive Absolute has exactly one form to memorize, with a Qamets under the first root consonant and a Holem Waw (or plain Holem) as the stem vowel.', category: 'ch21' },
  { id: 'class8-ch21-2', prompt: 'What does an Infinitive Absolute do when paired with a finite verb of the SAME root?', options: ['it negates it', 'it turns it into a question', 'it makes it plural', 'it intensifies it'], correctIndex: 3, explanation: 'This is the emphatic use, and it is by far the most common: the Infinitive Absolute stands in front of the finite verb and strengthens it.', category: 'ch21' },
  { id: 'class8-ch21-3', prompt: 'Translate this construction (Genesis 2:17).', hebrew: 'מוֹת תָּמוּת', options: ['you shall surely die', 'you will not die', 'he died', 'let him die'], correctIndex: 0, explanation: 'מוֹת is the Infinitive Absolute of מוּת, and תָּמוּת is the Imperfect 2ms of the same root. Together: "you shall SURELY die."', category: 'ch21' },
  { id: 'class8-ch21-4', prompt: 'Which four uses of the Infinitive Absolute are the most common?', options: ['past, present, future, and perfect', 'attributive, predicative, substantive, and vocative', 'emphatic, imperatival, simultaneous, and complementary', 'construct, absolute, definite, and indefinite'], correctIndex: 2, explanation: 'The emphatic use dominates, but the Infinitive Absolute can also stand in for an Imperative, describe simultaneous action, or complete another verb.', category: 'ch21' },
  { id: 'class8-ch21-5', prompt: 'How frequent is the Infinitive Absolute?', options: ['the most common conjugation in the Hebrew Bible', 'the LEAST common conjugation, with about 817 occurrences', 'roughly as common as the Perfect', 'it occurs only in poetry'], correctIndex: 1, explanation: 'It is the rarest of the conjugations. That is good news: one form, one small set of uses, and a manageable number of examples.', category: 'ch21' },
  { id: 'class8-ch21-6', prompt: 'Translate this command (Deuteronomy 5:12), where the Infinitive Absolute stands in for an Imperative.', hebrew: 'שָׁמוֹר אֶת־יוֹם הַשַּׁבָּת', options: ['He kept the Sabbath day.', 'The Sabbath day was kept.', 'Observe the Sabbath day.', 'Who will keep the Sabbath day?'], correctIndex: 2, explanation: 'This is the imperatival use: the Infinitive Absolute שָׁמוֹר carries the full force of a command. Exodus 20:8 does the same with זָכוֹר ("Remember").', category: 'ch21' },
  { id: 'class8-ch21-7', prompt: 'How is the stem vowel of the Infinitive Absolute written?', options: ['always as a Shureq', 'always as a Hireq Yod', 'always as a Tsere', 'as a Holem Waw or plain Holem'], correctIndex: 3, explanation: 'קָטוֹל and קָטֹל are the same form, written fully or defectively. Both are o-class, which is what your eye should be looking for.', category: 'ch21' },
  { id: 'class8-ch21-8', prompt: 'How do you tell the Infinitive Absolute from the Infinitive Construct?', options: ['the Absolute cannot take prefixes or suffixes; the Construct can', 'the Absolute takes suffixes; the Construct never does', 'the Absolute is plural; the Construct singular', 'they are spelled identically'], correctIndex: 0, explanation: 'The Construct is the flexible one — prefixed, suffixed, and negated with בִּלְתִּי. The Absolute stands alone, unattached, usually next to a finite verb of the same root.', category: 'ch21' },
];

// Chapter 21 recall: tell the two infinitives apart on sight.
const ch21MemoryQuestions: PracticeQuestion[] = [
  { id: 'class8-memory-ch21-qatol', prompt: 'Parse this form.', hebrew: 'קָטוֹל', transliteration: 'qatol', options: ['Infinitive Absolute', 'Infinitive Construct', 'Imperative 2ms', 'active participle ms'], correctIndex: 0, explanation: 'Qamets under the first root consonant plus a Holem Waw is the Infinitive Absolute — the only form the conjugation has.', category: 'ch21-memory' },
  { id: 'class8-memory-ch21-qetol', prompt: 'Parse this form.', hebrew: 'קְטֹל', transliteration: 'qetol', options: ['Infinitive Absolute', 'Infinitive Construct', 'passive participle', 'Perfect 3ms'], correctIndex: 1, explanation: 'In the strong verb the Infinitive Construct and the Imperative 2ms are spelled the same. Syntax tells them apart: an infinitive normally follows a preposition.', category: 'ch21-memory' },
  { id: 'class8-memory-ch21-mot', prompt: 'In מוֹת תָּמוּת, which word is the Infinitive Absolute?', hebrew: 'מוֹת תָּמוּת', options: ['neither — both are finite verbs', 'תָּמוּת, the second word', 'מוֹת, the first word', 'both words'], correctIndex: 2, explanation: 'The Infinitive Absolute comes FIRST and the finite verb second. Biconsonantal verbs form the Absolute with a Holem Waw: מוֹת, קוֹם, שׁוֹב.', category: 'ch21-memory' },
  { id: 'class8-memory-ch21-barekh', prompt: 'What does בָּרֵךְ contribute in בָּרֵךְ אֲבָרֶכְךָ (Genesis 22:17)?', hebrew: 'בָּרֵךְ אֲבָרֶכְךָ', options: ['it negates the blessing', 'it makes the blessing conditional', 'it turns the clause into a question', 'it intensifies the blessing'], correctIndex: 3, explanation: 'The same emphatic pattern as מוֹת תָּמוּת, here in the Piel: the Infinitive Absolute in front of a finite verb of the same root means "certainly, surely."', category: 'ch21-memory' },
  { id: 'class8-memory-ch21-biconsonantal', prompt: 'How do Biconsonantal verbs form the Infinitive Absolute?', options: ['with a Holem Waw or Holem', 'with a Hireq Yod', 'with a Tsere', 'they have no Infinitive Absolute'], correctIndex: 0, explanation: 'Most weak verbs follow the strong קָטוֹל/קָטֹל pattern. III-ח and III-ע verbs add a Furtive Pathach, and Biconsonantal verbs keep their o-class vowel letter.', category: 'ch21-memory' },
  { id: 'class8-memory-ch21-imperatival', prompt: 'Which use is at work in זָכוֹר אֶת־יוֹם הַשַּׁבָּת (Exodus 20:8)?', hebrew: 'זָכוֹר אֶת־יוֹם הַשַּׁבָּת', options: ['the complementary use', 'the imperatival use', 'the emphatic use', 'the simultaneous use'], correctIndex: 1, explanation: 'There is no finite verb of the same root here for it to intensify. Standing alone at the head of the clause, the Infinitive Absolute commands: "Remember!"', category: 'ch21-memory' },
];

// Chapter 22 — the Qal Participle: a verbal adjective.
const ch22Questions: PracticeQuestion[] = [
  { id: 'class8-ch22-1', prompt: 'A participle is a verbal adjective. Which category does it NOT have?', options: ['stem', 'voice', 'person', 'gender'], correctIndex: 2, explanation: 'Like a verb, a participle has stem and voice and can take an object. Like an adjective, it has gender and number. Unlike a finite verb, it has NO person.', category: 'ch22' },
  { id: 'class8-ch22-2', prompt: 'What vowel is diagnostic of the Qal ACTIVE participle?', options: ['a Shureq after the second root letter', 'a Hireq under the first root letter', 'a Qamets under the first root letter', 'a Holem after the first root letter'], correctIndex: 3, explanation: 'קֹטֵל, שֹׁמֵר, כֹּתֵב — the Holem after the first root consonant is what your eye should catch. The passive participle instead has a Shureq: קָטוּל.', category: 'ch22' },
  { id: 'class8-ch22-3', prompt: 'Translate this participle.', hebrew: 'שֹׁמֵר', options: ['he kept', 'keeping', 'keep!', 'he will keep'], correctIndex: 1, explanation: 'A participle can be rendered as an adjective ("keeping"), a substantive ("a keeper, the one who keeps"), or a durative present ("he is keeping") — the use in the clause decides.', category: 'ch22' },
  { id: 'class8-ch22-4', prompt: 'Translate this passive participle.', hebrew: 'כָּתוּב', options: ['written', 'he wrote', 'writing', 'he will write'], correctIndex: 0, explanation: 'The Qal passive participle קָטוּל has a Shureq stem vowel: כָּתוּב ("written"), בָּרוּךְ ("blessed"), אָרוּר ("cursed").', category: 'ch22' },
  { id: 'class8-ch22-5', prompt: 'What are the three uses of the participle?', options: ['past, present, and future', 'attributive, predicative, and substantive', 'emphatic, imperatival, and complementary', 'construct, absolute, definite, and indefinite'], correctIndex: 1, explanation: 'The same three uses you already learned for adjectives (Ch 7) apply to participles, active and passive alike.', category: 'ch22' },
  { id: 'class8-ch22-6', prompt: 'Which set of endings does the participle take?', options: ['the Perfect sufformatives', 'the Imperfect preformatives', 'the pronominal suffixes', 'the same endings as adjectives and nouns'], correctIndex: 3, explanation: 'קֹטֵל / קֹטֶלֶת / קֹטְלִים / קֹטְלוֹת — a familiar adjective paradigm sitting on a verbal stem.', category: 'ch22' },
  { id: 'class8-ch22-7', prompt: 'Which class of Qal active participle has NO Holem vowel?', options: ['the Biconsonantal class', 'the I-נ class', 'the III-ה class', 'the geminate class'], correctIndex: 0, explanation: 'בָּא ("coming"), קָם ("rising"), שָׁב ("returning") — Biconsonantal participles look like their own Perfect 3ms forms, so context has to decide.', category: 'ch22' },
  { id: 'class8-ch22-8', prompt: 'Translate this phrase.', hebrew: 'הַיֹּשֵׁב בַּשָּׁמַיִם', options: ['he sat in the heavens', 'he will sit in the heavens', 'the one who sits in the heavens', 'sit in the heavens!'], correctIndex: 2, explanation: 'A participle with the article is substantive: "the one who sits / is enthroned in the heavens" (Psalm 2:4).', category: 'ch22' },
];

// Chapter 22 recall: identify participles by their vowel pattern.
const ch22MemoryQuestions: PracticeQuestion[] = [
  { id: 'class8-memory-ch22-qotel', prompt: 'Parse this form.', hebrew: 'קֹטֵל', transliteration: 'qotel', options: ['Qal active participle ms', 'Qal passive participle ms', 'Perfect 3ms', 'Infinitive Absolute'], correctIndex: 0, explanation: 'Holem after the first root consonant plus Tsere after the second is the Qal active participle: "killing, one who kills."', category: 'ch22-memory' },
  { id: 'class8-memory-ch22-qotlim', prompt: 'Parse this form.', hebrew: 'קֹטְלִים', transliteration: 'qotlim', options: ['Perfect 3cp', 'Qal active participle mp', 'Imperfect 3mp', 'Imperative 2mp'], correctIndex: 1, explanation: 'The diagnostic Holem is still there, and ־ִים is the ordinary masculine plural ending — participles inflect exactly like adjectives.', category: 'ch22-memory' },
  { id: 'class8-memory-ch22-qatul', prompt: 'Parse this form.', hebrew: 'קָטוּל', transliteration: 'qatul', options: ['Infinitive Absolute', 'Qal active participle ms', 'Qal PASSIVE participle ms', 'Imperfect 3ms'], correctIndex: 2, explanation: 'Qamets then Shureq marks the passive participle: "killed, one who has been killed." Compare the Infinitive Absolute קָטוֹל, which has an o-class stem vowel.', category: 'ch22-memory' },
  { id: 'class8-memory-ch22-barukh', prompt: 'Parse this form.', hebrew: 'בָּרוּךְ', transliteration: 'barukh', options: ['Perfect 3ms — "he blessed"', 'Imperative — "bless!"', 'Infinitive Construct — "to bless"', 'Qal passive participle ms — "blessed"'], correctIndex: 3, explanation: 'The Shureq gives it away: בָּרוּךְ is a passive participle, the opening word of countless blessings — בָּרוּךְ הַבָּא, "blessed is the one who comes."', category: 'ch22-memory' },
  { id: 'class8-memory-ch22-holem', prompt: 'Which pair of vowels marks the Qal ACTIVE participle in the strong verb?', options: ['Holem then Tsere', 'Qamets then Shureq', 'Hireq then Holem', 'Pathach then Qamets'], correctIndex: 0, explanation: 'קֹטֵל. Learn the two participles as a contrasting pair: o-then-e is active, a-then-u is passive.', category: 'ch22-memory' },
  { id: 'class8-memory-ch22-ba', prompt: 'Parse this form as it is used in בָּרוּךְ הַבָּא בְּשֵׁם יְהוָה.', hebrew: 'הַבָּא', transliteration: 'habba', options: ['Perfect 3ms with the article', 'Infinitive Construct with the article', 'active participle with the article', 'Imperative with the article'], correctIndex: 2, explanation: 'Biconsonantal participles take Qamets rather than Holem, so בָּא can be either a participle or a Perfect. With the article it must be the participle: "the one who comes."', category: 'ch22-memory' },
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

// Chapter 20-22 "You Should Know" vocabulary.
export const CLASS8_WORD_GROUPS: PracticeQuestionGroup[] = [
  wordGroup({ id: 'class8-word-naga', hebrew: 'נָגַע', transliteration: 'naga', transliterationOptions: ['naga', 'nagash', 'nasa', 'nafal'], transliterationCorrectIndex: 0, meaning: 'to touch, strike, reach', meaningOptions: ['to touch, strike, reach', 'to draw near', 'to set out', 'to fall'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class8-word-nus', hebrew: 'נוּס', transliteration: 'nus', transliterationOptions: ['naga', 'nus', 'nasa', 'natan'], transliterationCorrectIndex: 1, meaning: 'to flee, escape', meaningOptions: ['to touch', 'to flee, escape', 'to set out', 'to give'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class8-word-savav', hebrew: 'סָבַב', transliteration: 'savav', transliterationOptions: ['safar', 'sagar', 'savav', 'sur'], transliterationCorrectIndex: 2, meaning: 'to turn about, go around, surround', meaningOptions: ['to count', 'to shut', 'to turn about, go around, surround', 'to turn aside'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class8-word-safar', hebrew: 'סָפַר', transliteration: 'safar', transliterationOptions: ['savav', 'sagar', 'sur', 'safar'], transliterationCorrectIndex: 3, meaning: 'to count, recount, tell', meaningOptions: ['to surround', 'to shut', 'to turn aside', 'to count, recount, tell'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class8-word-samach', hebrew: 'שָׂמַח', transliteration: 'samach', transliterationOptions: ['samach', 'sané', 'shavar', 'shakhan'], transliterationCorrectIndex: 0, meaning: 'to rejoice, be glad', meaningOptions: ['to rejoice, be glad', 'to hate', 'to break', 'to dwell'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class8-word-shavar', hebrew: 'שָׁבַר', transliteration: 'shavar', transliterationOptions: ['shakhan', 'shavar', 'shafat', 'shaal'], transliterationCorrectIndex: 1, meaning: 'to break in pieces, smash, shatter', meaningOptions: ['to dwell', 'to break in pieces, smash, shatter', 'to judge', 'to ask'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class8-word-zavach', hebrew: 'זָבַח', transliteration: 'zavach', transliterationOptions: ['zakhar', 'zaaq', 'zavach', 'zera'], transliterationCorrectIndex: 2, meaning: 'to slaughter for sacrifice, sacrifice', meaningOptions: ['to remember', 'to cry out', 'to slaughter for sacrifice, sacrifice', 'seed'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class8-word-chanah', hebrew: 'חָנָה', transliteration: 'chanah', transliterationOptions: ['chashav', 'charah', 'chalah', 'chanah'], transliterationCorrectIndex: 3, meaning: 'to camp, encamp, pitch camp', meaningOptions: ['to think', 'to burn with anger', 'to be sick', 'to camp, encamp, pitch camp'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class8-word-nasa', hebrew: 'נָסַע', transliteration: 'nasa', transliterationOptions: ['nasa', 'nagash', 'nagad', 'nabat'], transliterationCorrectIndex: 0, meaning: 'to set out, depart, journey', meaningOptions: ['to set out, depart, journey', 'to draw near', 'to tell', 'to look'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class8-word-panah', hebrew: 'פָּנָה', transliteration: 'panah', transliterationOptions: ['patach', 'panah', 'pala', 'palal'], transliterationCorrectIndex: 1, meaning: 'to turn toward, turn away', meaningOptions: ['to open', 'to turn toward, turn away', 'to be wonderful', 'to pray'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class8-word-patach', hebrew: 'פָּתַח', transliteration: 'patach', transliterationOptions: ['panah', 'pala', 'patach', 'palal'], transliterationCorrectIndex: 2, meaning: 'to open up, loosen', meaningOptions: ['to turn', 'to be wonderful', 'to open up, loosen', 'to pray'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class8-word-radaf', hebrew: 'רָדַף', transliteration: 'radaf', transliterationOptions: ['rachats', 'rakhav', 'raah', 'radaf'], transliterationCorrectIndex: 3, meaning: 'to pursue, chase, persecute', meaningOptions: ['to wash', 'to ride', 'to see', 'to pursue, chase, persecute'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class8-word-gadal', hebrew: 'גָּדַל', transliteration: 'gadal', transliterationOptions: ['gadal', 'galah', 'gur', 'goral'], transliterationCorrectIndex: 0, meaning: 'to grow up, become great', meaningOptions: ['to grow up, become great', 'to uncover, reveal', 'to sojourn', 'lot, portion'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class8-word-chashav', hebrew: 'חָשַׁב', transliteration: 'chashav', transliterationOptions: ['chanah', 'chashav', 'chalah', 'chanan'], transliterationCorrectIndex: 1, meaning: 'to think, consider, reckon, esteem', meaningOptions: ['to camp', 'to think, consider, reckon, esteem', 'to be sick', 'to be gracious'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class8-word-lakhad', hebrew: 'לָכַד', transliteration: 'lakhad', transliterationOptions: ['lamad', 'lavash', 'lakhad', 'laqach'], transliterationCorrectIndex: 2, meaning: 'to take, capture, catch, seize', meaningOptions: ['to learn', 'to be clothed', 'to take, capture, catch, seize', 'to receive'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class8-word-nagash', hebrew: 'נָגַשׁ', transliteration: 'nagash', transliterationOptions: ['naga', 'nasa', 'nafal', 'nagash'], transliterationCorrectIndex: 3, meaning: 'to draw near, come near, approach', meaningOptions: ['to touch', 'to set out', 'to fall', 'to draw near, come near, approach'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class8-word-qavar', hebrew: 'קָבַר', transliteration: 'qavar', transliterationOptions: ['qavar', 'qavats', 'qadash', 'qara'], transliterationCorrectIndex: 0, meaning: 'to bury', meaningOptions: ['to bury', 'to gather, assemble', 'to be holy', 'to call'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class8-word-shakhan', hebrew: 'שָׁכַן', transliteration: 'shakhan', transliterationOptions: ['shakhach', 'shakhan', 'shamem', 'shava'], transliterationCorrectIndex: 1, meaning: 'to settle down, abide, dwell', meaningOptions: ['to forget', 'to settle down, abide, dwell', 'to be desolate', 'to be satisfied'], meaningCorrectIndex: 1 }),
];

// Verse translation — infinitives and participles inside famous clauses.
const verseQuestions: PracticeQuestion[] = [
  { id: 'class8-verse-1', prompt: 'Translate this clause (Psalm 92:1).', hebrew: 'טוֹב לְהֹדוֹת לַיהוָה', options: ['It is good to give thanks to the LORD.', 'The LORD is good and gives thanks.', 'Give thanks to the LORD, for he is good.', 'The goodness of the LORD is thankworthy.'], correctIndex: 0, explanation: 'לְהֹדוֹת is לְ + an Infinitive Construct (Ch 20) serving as the subject of the verbless clause: "to give thanks is good." The verb is a Hiphil, previewed here (Ch 26).', category: 'verse' },
  { id: 'class8-verse-2', prompt: 'Translate this clause (Micah 6:8).', hebrew: 'כִּי אִם־עֲשׂוֹת מִשְׁפָּט וְאַהֲבַת חֶסֶד', options: ['He does justice and loves kindness.', 'but to do justice and to love kindness', 'Justice and kindness are from the LORD.', 'Who does justice and loves kindness?'], correctIndex: 1, explanation: 'עֲשׂוֹת is the Infinitive Construct of the III-ה verb עָשָׂה (Ch 20), and אַהֲבַת is a construct form of the verbal noun. Both answer "what does the LORD require?"', category: 'verse' },
  { id: 'class8-verse-3', prompt: 'Translate this clause (Deuteronomy 6:7).', hebrew: 'בְּשִׁבְתְּךָ בְּבֵיתֶךָ וּבְלֶכְתְּךָ בַדֶּרֶךְ', options: ['You sat in your house and walked on the way.', 'Sit in your house and walk in the way.', 'Your house and your road belong to the LORD.', 'when you sit in your house and when you walk by the way'], correctIndex: 3, explanation: 'Two Infinitive Constructs, each with a preposition in front and a 2ms suffix behind (Ch 20). שִׁבְתְּ־ comes from יָשַׁב and לֶכְתְּ־ from הָלַךְ, both I-י type forms.', category: 'verse' },
  { id: 'class8-verse-4', prompt: 'Translate this phrase (Genesis 3:5).', hebrew: 'יֹדְעֵי טוֹב וָרָע', options: ['knowing good and evil', 'they knew good and evil', 'Know good and evil!', 'the knowledge of good and evil'], correctIndex: 0, explanation: 'יֹדְעֵי is the construct plural of the active participle of יָדַע (Ch 22) — the Holem after the first root letter is the diagnostic. Literally "knowers of good and evil."', category: 'verse' },
  { id: 'class8-verse-5', prompt: 'Translate this clause (Psalm 146:8).', hebrew: 'יְהוָה פֹּקֵחַ עִוְרִים', options: ['The LORD has opened the eyes of the blind.', 'The LORD opens the eyes of the blind.', 'Open the eyes of the blind, O LORD!', 'The blind will see the LORD.'], correctIndex: 1, explanation: 'פֹּקֵחַ is an active participle used predicatively (Ch 22), describing what the LORD characteristically does. The Furtive Pathach under the final ח is the usual guttural adjustment.', category: 'verse' },
  { id: 'class8-verse-6', prompt: 'Translate this clause (Psalm 121:2).', hebrew: 'עֶזְרִי מֵעִם יְהוָה עֹשֵׂה שָׁמַיִם וָאָרֶץ', options: ['I will help the LORD who made heaven and earth.', 'The LORD helped me and made heaven and earth.', 'Who made heaven and earth, if not the LORD?', 'My help comes from the LORD, who made heaven and earth.'], correctIndex: 3, explanation: 'עֹשֵׂה is a substantive active participle (Ch 22): "the maker of heaven and earth." עֶזְרִי is "my help" with a Type 1 suffix (Ch 9).', category: 'verse' },
];

const chapter20ContextQuestions: PracticeQuestion[] = [
  { id: 'class8-context-ch20-eccl3-2', prompt: 'Translate this clause (Ecclesiastes 3:2).', hebrew: 'עֵת לָלֶדֶת וְעֵת לָמוּת', options: ['a time to be born and a time to die', 'he was born and he died', 'Be born and die!', 'the time of birth and the time of death have come'], correctIndex: 0, explanation: 'Chapter 20 focus: two Infinitive Constructs with לְ. לָלֶדֶת comes from the I-י verb יָלַד, and לָמוּת from the Biconsonantal מוּת.', category: 'context-ch20' },
  { id: 'class8-context-ch20-ps133-1', prompt: 'Translate this clause (Psalm 133:1).', hebrew: 'הִנֵּה מַה־טּוֹב שֶׁבֶת אַחִים גַּם־יָחַד', options: ['The brothers sat together and it was good.', 'Behold, how good it is when brothers dwell together in unity!', 'Let the brothers dwell together in unity.', 'How good are the brothers who dwell in unity?'], correctIndex: 1, explanation: 'Chapter 20 focus: שֶׁבֶת is the Infinitive Construct of the I-י verb יָשַׁב, standing as the subject of the verbless clause — "the dwelling of brothers together is good."', category: 'context-ch20' },
  { id: 'class8-context-ch20-gen2-18', prompt: 'Translate this clause (Genesis 2:18).', hebrew: 'לֹא־טוֹב הֱיוֹת הָאָדָם לְבַדּוֹ', options: ['The man alone was not good.', 'The man will not be good by himself.', 'It is not good that the man should be alone.', 'Is it good for the man to be alone?'], correctIndex: 2, explanation: 'Chapter 20 focus: הֱיוֹת is the Infinitive Construct of the III-ה verb הָיָה, with the ־וֹת ending typical of that class. לְבַדּוֹ = "by himself."', category: 'context-ch20' },
  { id: 'class8-context-ch20-1sam15-22', prompt: 'Translate this clause (1 Samuel 15:22).', hebrew: 'הִנֵּה שְׁמֹעַ מִזֶּבַח טוֹב', options: ['He listened, and the sacrifice was good.', 'Listen, and offer a good sacrifice!', 'A good sacrifice is heard by the LORD.', 'Behold, to obey is better than sacrifice.'], correctIndex: 3, explanation: 'Chapter 20 focus: שְׁמֹעַ is an Infinitive Construct used as a noun, compared with the noun זֶבַח by מִן ("than"). The Furtive Pathach under ע is the usual guttural adjustment.', category: 'context-ch20' },
];

const chapter21ContextQuestions: PracticeQuestion[] = [
  { id: 'class8-context-ch21-deut5-12', prompt: 'Translate this command (Deuteronomy 5:12).', hebrew: 'שָׁמוֹר אֶת־יוֹם הַשַּׁבָּת', options: ['Observe the Sabbath day.', 'He observed the Sabbath day.', 'The Sabbath day was observed.', 'Who observes the Sabbath day?'], correctIndex: 0, explanation: 'Chapter 21 focus: the imperatival use of the Infinitive Absolute. שָׁמוֹר stands alone at the head of the clause and carries the full force of a command.', category: 'context-ch21' },
  { id: 'class8-context-ch21-ex13-3', prompt: 'Translate this command (Exodus 13:3).', hebrew: 'זָכוֹר אֶת־הַיּוֹם הַזֶּה', options: ['He remembered this day.', 'Remember this day.', 'This day will be remembered.', 'Which day shall we remember?'], correctIndex: 1, explanation: 'Chapter 21 focus: another imperatival Infinitive Absolute, זָכוֹר. Note the Qamets–Holem Waw pattern that identifies the form no matter which root it is built on.', category: 'context-ch21' },
  { id: 'class8-context-ch21-gen3-4', prompt: 'Translate this clause (Genesis 3:4).', hebrew: 'לֹא־מוֹת תְּמֻתוּן', options: ['They did not die.', 'Do not die!', 'You will not surely die.', 'Will you not die?'], correctIndex: 2, explanation: 'Chapter 21 focus: the serpent negates the emphatic construction of Genesis 2:17. מוֹת is the Infinitive Absolute; תְּמֻתוּן is the Imperfect 2mp with an old paragogic Nun.', category: 'context-ch21' },
  { id: 'class8-context-ch21-gen22-17', prompt: 'Translate this promise (Genesis 22:17).', hebrew: 'בָּרֵךְ אֲבָרֶכְךָ', options: ['You blessed me greatly.', 'Bless me, please!', 'May I be blessed by you.', 'I will surely bless you.'], correctIndex: 3, explanation: 'Chapter 21 focus: the emphatic use. The Infinitive Absolute בָּרֵךְ precedes a finite verb of the same root and intensifies it — here in the Piel (Ch 30), with the 2ms object suffix (Ch 19).', category: 'context-ch21' },
];

const chapter22ContextQuestions: PracticeQuestion[] = [
  { id: 'class8-context-ch22-ps118-26', prompt: 'Translate this clause (Psalm 118:26).', hebrew: 'בָּרוּךְ הַבָּא בְּשֵׁם יְהוָה', options: ['Blessed is the one who comes in the name of the LORD.', 'He blessed the one who came in the name of the LORD.', 'Bless the name of the LORD as you come!', 'The name of the LORD is blessed forever.'], correctIndex: 0, explanation: 'Chapter 22 focus: two participles side by side — בָּרוּךְ is a passive participle ("blessed") and הַבָּא is an active participle with the article ("the one who comes").', category: 'context-ch22' },
  { id: 'class8-context-ch22-isa40-3', prompt: 'Translate this clause (Isaiah 40:3).', hebrew: 'קוֹל קוֹרֵא בַּמִּדְבָּר', options: ['He called with a voice in the wilderness.', 'A voice is crying in the wilderness.', 'Call out in the wilderness!', 'The wilderness heard his voice.'], correctIndex: 1, explanation: 'Chapter 22 focus: קוֹרֵא is an active participle used predicatively, giving ongoing action — "a voice crying / is crying." The Holem after the first root letter is the diagnostic.', category: 'context-ch22' },
  { id: 'class8-context-ch22-ps121-5', prompt: 'Translate this clause (Psalm 121:5).', hebrew: 'יְהוָה שֹׁמְרֶךָ', options: ['The LORD kept you.', 'Keep the LORD in view!', 'The LORD is your keeper.', 'You will keep the word of the LORD.'], correctIndex: 2, explanation: 'Chapter 22 focus: a substantive participle carrying a pronominal suffix — "your keeper." The Holem marks the active participle even with the suffix attached.', category: 'context-ch22' },
  { id: 'class8-context-ch22-ps145-18', prompt: 'Translate this clause (Psalm 145:18).', hebrew: 'קָרוֹב יְהוָה לְכָל־קֹרְאָיו', options: ['The LORD called all who are near him.', 'Call on the LORD, all who are near!', 'All who are near will call on the LORD.', 'The LORD is near to all who call on him.'], correctIndex: 3, explanation: 'Chapter 22 focus: קֹרְאָיו is a substantive participle in the plural with a 3ms suffix — "those calling on him." קָרוֹב ("near") is an ordinary adjective.', category: 'context-ch22' },
];

export const CLASS8_CH20_MEMORY_GROUPS = asGroups(ch20MemoryQuestions);
export const CLASS8_CH21_MEMORY_GROUPS = asGroups(ch21MemoryQuestions);
export const CLASS8_CH22_MEMORY_GROUPS = asGroups(ch22MemoryQuestions);

export const CLASS8_CH20_CONTEXT_GROUPS = asGroups(chapter20ContextQuestions);
export const CLASS8_CH21_CONTEXT_GROUPS = asGroups(chapter21ContextQuestions);
export const CLASS8_CH22_CONTEXT_GROUPS = asGroups(chapter22ContextQuestions);
export const CLASS8_CONTEXT_GROUPS = [
  ...CLASS8_CH20_CONTEXT_GROUPS,
  ...CLASS8_CH21_CONTEXT_GROUPS,
  ...CLASS8_CH22_CONTEXT_GROUPS,
];

export const CLASS8_CH20_GROUPS = [...asGroups(ch20Questions), ...CLASS8_CH20_MEMORY_GROUPS];
export const CLASS8_CH21_GROUPS = [...asGroups(ch21Questions), ...CLASS8_CH21_MEMORY_GROUPS];
export const CLASS8_CH22_GROUPS = [...asGroups(ch22Questions), ...CLASS8_CH22_MEMORY_GROUPS];

export const CLASS8_VERSE_GROUPS = [...asGroups(verseQuestions), ...CLASS8_CONTEXT_GROUPS];
