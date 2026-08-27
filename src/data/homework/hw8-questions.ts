// HW8 — The Qal Infinitive Construct, Infinitive Absolute, and Participle.
// CourseGuide for BBH (Pratico/Van Pelt) Chapters 20-22 (Sessions 20-22),
// plus the new Chapter 20-22 vocabulary and verse-translation practice.
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

// Section 1 — Chapter 20: the Qal Infinitive Construct.
const sec1: MCQQuestion[] = [
  { id: 'hw8-s1-q1', type: 'mcq', question: 'The Infinitive Construct is inflected for:', options: ['nothing — not person, gender, or number', 'person and number', 'gender only', 'number only'], correctIndex: 0, explanation: 'CourseGuide Ch 20. It has one basic form, which in the strong verb and many weak verbs is identical to the Qal Imperative 2ms: קְטֹל.', category: 'infinitive-construct' },
  { id: 'hw8-s1-q2', type: 'mcq', question: 'What may be attached to an Infinitive Construct?', options: ['nothing may be attached', 'only the article', 'prepositional prefixes, pronominal suffixes, or both', 'only a plural ending'], correctIndex: 2, explanation: 'CourseGuide Ch 20. בְּשָׁמְעוֹ shows both at once — the preposition בְּ in front and the 3ms suffix behind.', category: 'infinitive-construct' },
  { id: 'hw8-s1-q3', type: 'mcq', question: 'A pronominal suffix on an Infinitive Construct can function as:', options: ['the object only', 'the subject only', 'the article', 'either the subject or the object of the verbal idea'], correctIndex: 3, explanation: 'CourseGuide Ch 20. Only context decides. בְּשָׁמְעוֹ usually means "when HE heard," but the same suffix could supply the object instead.', category: 'infinitive-construct' },
  { id: 'hw8-s1-q4', type: 'mcq', question: 'How is the Infinitive Construct negated?', options: ['with בִּלְתִּי or לְבִלְתִּי', 'with לֹא', 'with אַל', 'with אֵין'], correctIndex: 0, explanation: 'CourseGuide Ch 20. The ordinary verbal negatives are not used here — look for בִּלְתִּי ("not") or לְבִלְתִּי ("in order not").', category: 'infinitive-construct' },
  { id: 'hw8-s1-q5', type: 'mcq', question: 'Which three weak classes have Infinitive Construct forms that vary significantly from the strong verb?', options: ['II-guttural, geminate, and III-א', 'III-ה, I-נ, and I-י', 'Biconsonantal, III-ע, and I-א', 'geminate, III-ח, and II-ו'], correctIndex: 1, explanation: 'CourseGuide Ch 20. בָּנָה gives בְּנוֹת, נָתַן gives תֵּת, and יָשַׁב gives שֶׁבֶת. These are worth memorizing rather than deriving.', category: 'infinitive-construct' },
  { id: 'hw8-s1-q6', type: 'mcq', question: 'Translate: לִשְׁמֹר', hebrew: 'לִשְׁמֹר', options: ['he kept', 'keep!', 'to keep / in order to keep', 'the keeper'], correctIndex: 2, explanation: 'CourseGuide Ch 20. לְ + Infinitive Construct is the standard purpose or complement construction of Biblical Hebrew.', category: 'infinitive-construct' },
  { id: 'hw8-s1-q7', type: 'mcq', question: 'Translate: לֵאמֹר', hebrew: 'לֵאמֹר', options: ['he said', 'say!', 'he will say', 'saying'], correctIndex: 3, explanation: 'CourseGuide Ch 20. לְ + the Infinitive Construct of אָמַר. It follows a verb of speaking and introduces the quotation itself.', category: 'infinitive-construct' },
  { id: 'hw8-s1-q8', type: 'mcq', question: 'Which root would you look up for the Infinitive Construct שֶׁבֶת?', hebrew: 'שֶׁבֶת', options: ['יָשַׁב ("to sit, dwell")', 'שָׁבַת ("to cease")', 'שׁוּב ("to return")', 'שָׁבַע ("to swear")'], correctIndex: 0, explanation: 'CourseGuide Ch 20. I-י verbs drop their Yod and take a segholate-style infinitive: יָשַׁב gives שֶׁבֶת, and יָדַע gives דַּעַת.', category: 'infinitive-construct' },
  { id: 'hw8-s1-q9', type: 'mcq', question: 'Which root would you look up for the Infinitive Construct תֵּת?', hebrew: 'תֵּת', options: ['תָּמַם ("to be complete")', 'נָתַן ("to give")', 'תָּקַע ("to blow")', 'שִׁית ("to set")'], correctIndex: 1, explanation: 'CourseGuide Ch 20. נָתַן loses its first נ to assimilation and its final נ to the infinitive ending, leaving only תֵּת.', category: 'infinitive-construct' },
  { id: 'hw8-s1-q10', type: 'mcq', question: 'Translate: בְּשָׁמְעוֹ אֶת־הַדָּבָר', hebrew: 'בְּשָׁמְעוֹ אֶת־הַדָּבָר', options: ['he heard the word', 'let him hear the word', 'when he heard the word', 'the word was heard by him'], correctIndex: 2, explanation: 'CourseGuide Ch 20. בְּ + Infinitive Construct + suffix produces a temporal clause; the suffix supplies its subject, and אֶת־ marks the object.', category: 'infinitive-construct' },
];

// Section 2 — Chapter 21: the Qal Infinitive Absolute.
const sec2: MCQQuestion[] = [
  { id: 'hw8-s2-q1', type: 'mcq', question: 'What is the strong-verb form of the Qal Infinitive Absolute?', options: ['קָטוֹל (or defectively קָטֹל)', 'קֹטֵל', 'קְטֹל', 'יִקְטֹל'], correctIndex: 0, explanation: 'CourseGuide Ch 21. One form only: Qamets under the first root consonant, Holem Waw (or plain Holem) as the stem vowel.', category: 'infinitive-absolute' },
  { id: 'hw8-s2-q2', type: 'mcq', question: 'How frequent is the Infinitive Absolute?', options: ['the most common Hebrew conjugation', 'the LEAST common conjugation, about 817 occurrences', 'about as frequent as the Perfect', 'it occurs only in the Torah'], correctIndex: 1, explanation: 'CourseGuide Ch 21. It is the rarest conjugation — one form, four main uses, and a manageable set of examples.', category: 'infinitive-absolute' },
  { id: 'hw8-s2-q3', type: 'mcq', question: 'What are the four most common uses of the Infinitive Absolute?', options: ['past, present, future, perfect', 'attributive, predicative, substantive, vocative', 'emphatic, imperatival, simultaneous, complementary', 'construct, absolute, definite, indefinite'], correctIndex: 2, explanation: 'CourseGuide Ch 21. The emphatic use dominates, but the form can also command, describe simultaneous action, or complete another verb.', category: 'infinitive-absolute' },
  { id: 'hw8-s2-q4', type: 'mcq', question: 'What does an Infinitive Absolute do when it stands before a finite verb of the SAME root?', options: ['it negates it', 'it makes it a question', 'it makes it plural', 'it intensifies it — "surely, certainly"'], correctIndex: 3, explanation: 'CourseGuide Ch 21. This is the emphatic use: מוֹת תָּמוּת, "you shall SURELY die" (Gen 2:17).', category: 'infinitive-absolute' },
  { id: 'hw8-s2-q5', type: 'mcq', question: 'How is the stem vowel of the Infinitive Absolute written?', options: ['as a Holem Waw, or defectively as a plain Holem', 'always as a Shureq', 'always as a Tsere', 'always as a Hireq Yod'], correctIndex: 0, explanation: 'CourseGuide Ch 21. קָטוֹל and קָטֹל are the same form written fully or defectively — both o-class, which is what to look for.', category: 'infinitive-absolute' },
  { id: 'hw8-s2-q6', type: 'mcq', question: 'How do you distinguish the Infinitive Absolute from the Infinitive Construct?', options: ['the Absolute takes suffixes; the Construct never does', 'the Absolute is קָטוֹל and stands unattached; the Construct is קְטֹל and takes prefixes and suffixes', 'the Absolute is plural and the Construct singular', 'they are spelled identically in every verb'], correctIndex: 1, explanation: 'CourseGuide Ch 21. The Construct is the flexible one. The Absolute stands alone, usually beside a finite verb of the same root.', category: 'infinitive-absolute' },
  { id: 'hw8-s2-q7', type: 'mcq', question: 'Translate: מוֹת תָּמוּת', hebrew: 'מוֹת תָּמוּת', options: ['you will not die', 'he died', 'you shall surely die', 'let him die'], correctIndex: 2, explanation: 'CourseGuide Ch 21. מוֹת is the Infinitive Absolute of מוּת and תָּמוּת the Imperfect 2ms of the same root — the classic emphatic pairing.', category: 'infinitive-absolute' },
  { id: 'hw8-s2-q8', type: 'mcq', question: 'In מוֹת תָּמוּת, which word is the Infinitive Absolute?', hebrew: 'מוֹת תָּמוּת', options: ['both words', 'neither — both are finite', 'תָּמוּת, the second word', 'מוֹת, the first word'], correctIndex: 3, explanation: 'CourseGuide Ch 21. The Infinitive Absolute comes first and the finite verb second. Biconsonantal roots form it with a Holem Waw: מוֹת, קוֹם, שׁוֹב.', category: 'infinitive-absolute' },
  { id: 'hw8-s2-q9', type: 'mcq', question: 'Which use is at work in שָׁמוֹר אֶת־יוֹם הַשַּׁבָּת (Deuteronomy 5:12)?', hebrew: 'שָׁמוֹר אֶת־יוֹם הַשַּׁבָּת', options: ['the imperatival use — it carries the force of a command', 'the emphatic use', 'the complementary use', 'the simultaneous use'], correctIndex: 0, explanation: 'CourseGuide Ch 21. There is no finite verb of the same root for it to intensify; standing at the head of the clause, it commands: "Observe!"', category: 'infinitive-absolute' },
  { id: 'hw8-s2-q10', type: 'mcq', question: 'Which weak classes depart from the plain קָטוֹל pattern?', options: ['I-נ verbs, which lose the Nun', 'III-ח and III-ע verbs (Furtive Pathach), III-ה verbs (two forms), and Biconsonantal verbs', 'geminate verbs only', 'no weak class departs from it'], correctIndex: 1, explanation: 'CourseGuide Ch 21. Most weak verbs follow the strong pattern. Those three classes are the exceptions worth noting.', category: 'infinitive-absolute' },
];

// Section 3 — Chapter 22: the Qal Participle.
const sec3: MCQQuestion[] = [
  { id: 'hw8-s3-q1', type: 'mcq', question: 'A participle is a verbal adjective. Which category does it NOT have?', options: ['stem', 'voice', 'gender', 'person'], correctIndex: 3, explanation: 'CourseGuide Ch 22. Like a verb it has stem and voice and may take a direct object; like an adjective it has gender and number. It has no person.', category: 'participle' },
  { id: 'hw8-s3-q2', type: 'mcq', question: 'What vowel is diagnostic of the Qal ACTIVE participle?', options: ['a Shureq after the second root letter', 'a Holem following the first root letter', 'a Hireq under the first root letter', 'a Qamets under both root letters'], correctIndex: 1, explanation: 'CourseGuide Ch 22. קֹטֵל, שֹׁמֵר, כֹּתֵב. The passive participle instead has a Shureq: קָטוּל.', category: 'participle' },
  { id: 'hw8-s3-q3', type: 'mcq', question: 'What endings does the participle take?', options: ['the Perfect sufformatives', 'the Imperfect preformatives', 'the same endings as adjectives and nouns', 'no endings at all'], correctIndex: 2, explanation: 'CourseGuide Ch 22. קֹטֵל / קֹטֶלֶת / קֹטְלִים / קֹטְלוֹת — a familiar adjective paradigm on a verbal stem.', category: 'participle' },
  { id: 'hw8-s3-q4', type: 'mcq', question: 'What are the three uses of the participle?', options: ['attributive, predicative, and substantive', 'past, present, and future', 'emphatic, imperatival, and complementary', 'construct, absolute, and definite'], correctIndex: 0, explanation: 'CourseGuide Ch 22. The same three uses you learned for adjectives in Chapter 7, applied now to active and passive participles alike.', category: 'participle' },
  { id: 'hw8-s3-q5', type: 'mcq', question: 'Which class of Qal active participle lacks the Holem vowel?', options: ['the I-נ class', 'the III-ה class', 'the Biconsonantal class, which has Qamets throughout', 'the geminate class'], correctIndex: 2, explanation: 'CourseGuide Ch 22. בָּא, קָם and שָׁב look identical to their own Perfect 3ms forms, so context (often the article) decides.', category: 'participle' },
  { id: 'hw8-s3-q6', type: 'mcq', question: 'Translate: שֹׁמֵר', hebrew: 'שֹׁמֵר', options: ['he kept', 'keeping / one who keeps / a keeper', 'keep!', 'he will keep'], correctIndex: 1, explanation: 'CourseGuide Ch 22. A participle can be rendered adjectivally, substantively, or as a durative present — its use in the clause decides.', category: 'participle' },
  { id: 'hw8-s3-q7', type: 'mcq', question: 'Translate: כָּתוּב', hebrew: 'כָּתוּב', options: ['written', 'writing', 'he wrote', 'he will write'], correctIndex: 0, explanation: 'CourseGuide Ch 22. The Qal passive participle קָטוּל takes a Shureq stem vowel: כָּתוּב ("written"), בָּרוּךְ ("blessed"), אָרוּר ("cursed").', category: 'participle' },
  { id: 'hw8-s3-q8', type: 'mcq', question: 'Parse: קֹטְלִים', hebrew: 'קֹטְלִים', options: ['Perfect 3cp', 'Qal active participle mp', 'Imperfect 3mp', 'Imperative 2mp'], correctIndex: 1, explanation: 'CourseGuide Ch 22. The diagnostic Holem is intact and ־ִים is the ordinary masculine plural ending.', category: 'participle' },
  { id: 'hw8-s3-q9', type: 'mcq', question: 'Parse: בָּרוּךְ', hebrew: 'בָּרוּךְ', options: ['Perfect 3ms — "he blessed"', 'Imperative — "bless!"', 'Infinitive Construct — "to bless"', 'Qal passive participle ms — "blessed"'], correctIndex: 3, explanation: 'CourseGuide Ch 22. The Shureq marks the passive participle. It opens countless blessings: בָּרוּךְ הַבָּא, "blessed is the one who comes."', category: 'participle' },
  { id: 'hw8-s3-q10', type: 'mcq', question: 'Translate: הַיֹּשֵׁב בַּשָּׁמַיִם', hebrew: 'הַיֹּשֵׁב בַּשָּׁמַיִם', options: ['the one who sits in the heavens', 'he sat in the heavens', 'he will sit in the heavens', 'sit in the heavens!'], correctIndex: 0, explanation: 'CourseGuide Ch 22. A participle with the article is substantive: "the one enthroned in the heavens" (Ps 2:4).', category: 'participle' },
];

// Section 4 — Chapter 20-22 vocabulary ("You Should Know" lists).
const sec4: PairedMCQQuestion[] = [
  vocab('hw8-s4-q1', 'טָמֵא', 'tamé', ['taher', 'taam', 'tavach'], 0, 'to be or become unclean', ['to be clean', 'to taste', 'to slaughter'], 1, 'Ch 20 vocab. The opposite of טָהֵר ("to be clean"), Chapter 17 vocabulary.'),
  vocab('hw8-s4-q2', 'נָחָה', 'nachah', ['nasa', 'nus', 'naga'], 2, 'to rest, settle down; (Hi) to give rest', ['to set out', 'to flee', 'to touch'], 0, 'Ch 21 vocab. Its Hiphil is used of God giving his people rest in the land.'),
  vocab('hw8-s4-q3', 'שָׂנֵא', 'sané', ['samach', 'shavar', 'shaar'], 1, 'to hate', ['to rejoice', 'to break', 'to remain'], 3, 'Ch 21 vocab. Its participle serves as the ordinary word for "enemy."'),
  vocab('hw8-s4-q4', 'שָׁאַר', 'shaar', ['shaal', 'shavar', 'shakhan'], 3, 'to remain, be left over, survive', ['to ask', 'to break', 'to dwell'], 2, 'Ch 21 vocab. The root behind שְׁאָר and שְׁאֵרִית, the "remnant" of Israel.'),
  vocab('hw8-s4-q5', 'מוֹעֵד', 'moed', ['maaseh', 'malakh', 'mishpat'], 0, 'appointed time, meeting place, assembly', ['deed', 'messenger', 'judgment'], 1, 'Ch 21 vocab. אֹהֶל מוֹעֵד is "the tent of meeting."'),
  vocab('hw8-s4-q6', 'אָרַר', 'arar', ['asaf', 'avad', 'amar'], 2, 'to curse', ['to gather', 'to perish', 'to say'], 0, 'Ch 22 vocab. Its passive participle אָרוּר ("cursed") opens the curse formulas of Deuteronomy 27.'),
  vocab('hw8-s4-q7', 'בּוֹשׁ', 'bosh', ['batach', 'bakhah', 'bin'], 1, 'to be ashamed', ['to trust', 'to weep', 'to understand'], 3, 'Ch 22 vocab. A Biconsonantal verb, frequent in the Psalms: "let me not be put to shame."'),
  vocab('hw8-s4-q8', 'יָטַב', 'yatav', ['yatsa', 'yarad', 'yashav'], 3, 'to be well with, go well with, be pleasing', ['to go out', 'to go down', 'to sit'], 2, 'Ch 22 vocab. Its Hiphil means "to do good to, deal well with."'),
  vocab('hw8-s4-q9', 'קָבַץ', 'qavats', ['qavar', 'qadash', 'qara'], 0, 'to collect, gather, assemble', ['to bury', 'to be holy', 'to call'], 1, 'Ch 22 vocab. Used of God gathering the scattered exiles of Israel.'),
  vocab('hw8-s4-q10', 'קָרָא', 'qara', ['qavar', 'qavats', 'qum'], 2, 'to meet, encounter, happen', ['to bury', 'to gather', 'to arise'], 0, 'Ch 20 vocab. A separate root from the familiar קָרָא ("to call") — it lies behind the preposition לִקְרַאת.'),
  vocab('hw8-s4-q11', 'לִקְרַאת', 'liqrat', ['lemaan', 'lifné', 'levad'], 1, 'toward, against, opposite', ['for the sake of', 'before', 'alone'], 3, 'Ch 20 vocab. Literally "to the meeting of" — an infinitive-construct form frozen into a preposition.'),
  vocab('hw8-s4-q12', 'בְּקֶרֶב', 'beqerev', ['betokh', 'baavur', 'bilti'], 3, 'in the middle of, among', ['in the midst of', 'on account of', 'not'], 2, 'Ch 20 vocab. Common of the LORD dwelling "in the midst of" his people.'),
];

// Section 5 — Verse translation: infinitives and participles in familiar clauses.
const sec5: MCQQuestion[] = [
  { id: 'hw8-s5-q1', type: 'mcq', question: 'Translate this warning (Genesis 2:17).', hebrew: 'מוֹת תָּמוּת', options: ['you shall surely die', 'you will not die', 'he has died', 'do not die'], correctIndex: 0, explanation: 'The emphatic Infinitive Absolute construction (Ch 21): מוֹת in front of the Imperfect תָּמוּת intensifies it to "surely."', category: 'verse' },
  { id: 'hw8-s5-q2', type: 'mcq', question: 'Translate this commandment (Exodus 20:8).', hebrew: 'זָכוֹר אֶת־יוֹם הַשַּׁבָּת לְקַדְּשׁוֹ', options: ['He remembered the Sabbath day and kept it holy.', 'Remember the Sabbath day, to keep it holy.', 'The Sabbath day is holy to the LORD.', 'Who will remember the Sabbath day?'], correctIndex: 1, explanation: 'Two infinitives in one line: the imperatival Infinitive Absolute זָכוֹר (Ch 21), then לְ + Infinitive Construct with a suffix (Ch 20) expressing purpose — "to make it holy."', category: 'verse' },
  { id: 'hw8-s5-q3', type: 'mcq', question: 'Translate this clause (Deuteronomy 10:12).', hebrew: 'כִּי אִם־לְיִרְאָה אֶת־יְהוָה אֱלֹהֶיךָ', options: ['The LORD your God is to be feared.', 'You feared the LORD your God.', 'but to fear the LORD your God', 'Fear the LORD your God!'], correctIndex: 2, explanation: 'לְ + Infinitive Construct (Ch 20), answering the question "what does the LORD require of you?" אֶת־ marks the definite object.', category: 'verse' },
  { id: 'hw8-s5-q4', type: 'mcq', question: 'Translate this clause (Ecclesiastes 3:4).', hebrew: 'עֵת לִבְכּוֹת וְעֵת לִשְׂחוֹק', options: ['They wept, and then they laughed.', 'Weep now, and laugh later.', 'The time of weeping and laughing has passed.', 'a time to weep and a time to laugh'], correctIndex: 3, explanation: 'Two Infinitive Constructs with לְ (Ch 20). לִבְכּוֹת comes from the III-ה verb בָּכָה, hence the ־וֹת ending typical of that class.', category: 'verse' },
  { id: 'hw8-s5-q5', type: 'mcq', question: 'Translate this clause (Psalm 121:4).', hebrew: 'לֹא־יָנוּם וְלֹא יִישָׁן שׁוֹמֵר יִשְׂרָאֵל', options: ['He who keeps Israel will neither slumber nor sleep.', 'Israel did not slumber or sleep.', 'Keep watch over Israel, and do not sleep!', 'Israel keeps watch and does not sleep.'], correctIndex: 0, explanation: 'שׁוֹמֵר is a substantive active participle (Ch 22) — "the keeper of Israel" — and it is the subject of both Imperfect verbs.', category: 'verse' },
  { id: 'hw8-s5-q6', type: 'mcq', question: 'Translate this question (Genesis 4:9).', hebrew: 'הֲשֹׁמֵר אָחִי אָנֹכִי', options: ['I kept my brother.', 'Am I my brother\'s keeper?', 'My brother keeps me.', 'I will keep my brother.'], correctIndex: 1, explanation: 'שֹׁמֵר is a substantive participle in construct with אָחִי ("my brother"), and the prefixed הֲ turns the verbless clause into a question (Ch 8).', category: 'verse' },
  { id: 'hw8-s5-q7', type: 'mcq', question: 'Translate this clause (Jeremiah 17:7).', hebrew: 'בָּרוּךְ הַגֶּבֶר אֲשֶׁר יִבְטַח בַּיהוָה', options: ['The man blessed the LORD in whom he trusted.', 'The LORD blesses the man who trusts him.', 'Blessed is the man who trusts in the LORD.', 'Trust in the LORD, O blessed man!'], correctIndex: 2, explanation: 'בָּרוּךְ is a Qal passive participle (Ch 22) heading a verbless clause; אֲשֶׁר introduces the relative clause with the Imperfect יִבְטַח (Ch 19 vocabulary).', category: 'verse' },
  { id: 'hw8-s5-q8', type: 'mcq', question: 'Translate this clause (Psalm 1:6).', hebrew: 'כִּי־יוֹדֵעַ יְהוָה דֶּרֶךְ צַדִּיקִים', options: ['The righteous know the way of the LORD.', 'The LORD will make known the way of the righteous.', 'Know the way of the LORD, O righteous ones!', 'For the LORD knows the way of the righteous.'], correctIndex: 3, explanation: 'יוֹדֵעַ is an active participle used predicatively (Ch 22), with the Furtive Pathach under the final guttural ע. דֶּרֶךְ צַדִּיקִים is a construct chain (Ch 10).', category: 'verse' },
];

export const hw8Sections = { 1: sec1, 2: sec2, 3: sec3, 4: sec4, 5: sec5 };

export const hw8Meta: ExtendedHomeworkMeta = {
  id: 'hw8',
  title: 'HW8: The Infinitives and the Qal Participle',
  shortTitle: 'HW8',
  description: 'CourseGuide for BBH (Pratico/Van Pelt) Chapters 20-22 (Sessions 20-22): the Qal Infinitive Construct, the Qal Infinitive Absolute, and the Qal Participle — plus new Chapter 20-22 vocabulary and verse-translation practice.',
  topics: ['Ch 20: Qal Infinitive Construct', 'Ch 21: Qal Infinitive Absolute', 'Ch 22: Qal Participle', 'Ch 20-22 vocabulary', 'Verse translation'],
  totalQuestions: sec1.length + sec2.length + sec3.length + sec4.length + sec5.length,
  sections: [
    { id: 1, title: 'Ch 20 — Qal Infinitive Construct', description: 'The verbal noun that follows prepositions and takes suffixes', questionCount: sec1.length },
    { id: 2, title: 'Ch 21 — Qal Infinitive Absolute', description: 'One form, four uses — above all the emphatic "surely"', questionCount: sec2.length },
    { id: 3, title: 'Ch 22 — Qal Participle', description: 'The verbal adjective: active and passive, attributive, predicative, and substantive', questionCount: sec3.length },
    { id: 4, title: 'Ch 20-22 Vocabulary', description: 'Read and translate the new "You Should Know" words', questionCount: sec4.length },
    { id: 5, title: 'Verse Translation', description: 'Translate familiar clauses built on infinitives and participles', questionCount: sec5.length },
  ],
  sectionQuestions: hw8Sections,
};
