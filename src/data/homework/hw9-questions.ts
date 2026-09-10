// HW9 — Hebrew Sentence Syntax and the Niphal Stem (Strong and Weak).
// CourseGuide for BBH (Pratico/Van Pelt) Chapters 23-25 (Sessions 23-25),
// plus the new Chapter 23-25 vocabulary and verse-translation practice.
//
// Released: wired into extended-registry.ts and linked on /homework and /class-practice.

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

// Section 1 — Chapter 23: sentence syntax.
const sec1: MCQQuestion[] = [
  { id: 'hw9-s1-q1', type: 'mcq', question: 'What is the normal word order of a Hebrew VERBAL clause?', options: ['verb – subject – object', 'subject – verb – object', 'object – verb – subject', 'subject – object – verb'], correctIndex: 0, explanation: 'CourseGuide Ch 23. בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם. Subjects and objects may be fronted, but only in contexts where something is being emphasized.', category: 'syntax' },
  { id: 'hw9-s1-q2', type: 'mcq', question: 'Which of these may stand before the verb?', options: ['the definite article', 'an adverb of time, הִנֵּה, an independent pronoun, or a negative particle', 'the object marker אֵת', 'nothing may precede the verb'], correctIndex: 1, explanation: 'CourseGuide Ch 23. Circumstantial expressions may also precede. When something comes before the verb, ask what is being highlighted.', category: 'syntax' },
  { id: 'hw9-s1-q3', type: 'mcq', question: 'Where does the REGULAR (non-consecutive) Imperfect normally stand?', options: ['always first in its clause', 'always at the end', 'non-initial in its clause', 'only in poetry'], correctIndex: 2, explanation: 'CourseGuide Ch 23. Position is a second, independent check on your parse: the regular forms are non-initial, and the consecutive ones open the clause.', category: 'syntax' },
  { id: 'hw9-s1-q4', type: 'mcq', question: 'Which forms are clause-INITIAL by rule?', options: ['participles and infinitives', 'the regular Perfect and Imperfect', 'nouns in construct', 'the consecutive Perfect and the consecutive Imperfect'], correctIndex: 3, explanation: 'CourseGuide Ch 23. The volitional Imperfect also stands first, but WITHOUT the Waw Consecutive — that combination signals volition rather than narrative.', category: 'syntax' },
  { id: 'hw9-s1-q5', type: 'mcq', question: 'What is a verbless clause?', options: ['a subject and a predicate placed side by side, with no verb at all', 'a clause whose verb has dropped out by scribal error', 'a clause containing only participles', 'a clause with two subjects'], correctIndex: 0, explanation: 'CourseGuide Ch 23. יְהוָה מֶלֶךְ = "the LORD is king." Hebrew supplies no copula; English has to add "is."', category: 'syntax' },
  { id: 'hw9-s1-q6', type: 'mcq', question: 'Which may serve as the PREDICATE of a verbless clause?', options: ['only a noun', 'a noun, adjective, pronoun, prepositional phrase, or participle', 'only an adjective', 'only a participle'], correctIndex: 1, explanation: 'CourseGuide Ch 23. לַיהוָה הָאָרֶץ has a prepositional predicate; יְהוָה שֹׁמְרֶךָ has a participial one.', category: 'syntax' },
  { id: 'hw9-s1-q7', type: 'mcq', question: 'What does an independent personal pronoun often do inside a verbless clause?', options: ['it marks the direct object', 'it makes the clause interrogative', 'it functions as a copula, binding subject to predicate', 'it marks possession'], correctIndex: 2, explanation: 'CourseGuide Ch 23. יְהוָה הוּא הָאֱלֹהִים = "the LORD, he is God." The pronoun stands in for the verb Hebrew does not use.', category: 'syntax' },
  { id: 'hw9-s1-q8', type: 'mcq', question: 'An Imperative followed by a CONSECUTIVE PERFECT expresses:', options: ['a question', 'a prohibition', 'a completed past action', 'continuing imperatival force'], correctIndex: 3, explanation: 'CourseGuide Ch 23. Contrast the other sequence: Imperative + Imperfect with a plain waw produces a purpose or result clause instead.', category: 'syntax' },
  { id: 'hw9-s1-q9', type: 'mcq', question: 'What is the effect of putting the subject BEFORE the verb, as in וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ?', hebrew: 'וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ', options: ['it steps out of the narrative sequence to give circumstantial background', 'it makes the clause a question', 'it turns the verb into an imperative', 'it has no effect at all'], correctIndex: 0, explanation: 'CourseGuide Ch 23. Genesis 1:1 uses ordinary verb-before-subject order; 1:2 fronts the subject before the verb and pauses the narrative to describe a state of affairs.', category: 'syntax' },
  { id: 'hw9-s1-q10', type: 'mcq', question: 'Translate this verbless clause.', hebrew: 'לַיהוָה הָאָרֶץ', options: ['The LORD made the earth.', 'The earth is the LORD\'s.', 'Praise the LORD, all the earth!', 'The earth will belong to the LORD.'], correctIndex: 1, explanation: 'CourseGuide Ch 23. The predicate is the prepositional phrase לַיהוָה, fronted for emphasis: "to the LORD belongs the earth" (Ps 24:1).', category: 'syntax' },
];

// Section 2 — Chapter 24: the Niphal stem, strong verbs.
const sec2: MCQQuestion[] = [
  { id: 'hw9-s2-q1', type: 'mcq', question: 'What type of action and voice does the Niphal express?', options: ['causative action with an active voice', 'simple action with a passive or reflexive voice', 'intensive action with an active voice', 'intensive action with a passive voice'], correctIndex: 1, explanation: 'CourseGuide Ch 24. The Niphal is the passive or reflexive counterpart of the Qal, and may also be reciprocal or even plainly active.', category: 'niphal-strong' },
  { id: 'hw9-s2-q2', type: 'mcq', question: 'Why are some Niphal verbs translated actively, just like the Qal?', options: ['because the Niphal is fundamentally an active stem', 'because translators disagree about their meanings', 'because their roots are unattested in the Qal', 'because they are always reflexive in meaning'], correctIndex: 2, explanation: 'CourseGuide Ch 24. לָחַם is the standard example: rare in the Qal, so the Niphal נִלְחַם simply means "he fought."', category: 'niphal-strong' },
  { id: 'hw9-s2-q3', type: 'mcq', question: 'In which conjugations does the Niphal נ appear as a full consonant?', options: ['the Imperfect and Imperative', 'the Infinitive Construct only', 'nowhere', 'the Perfect, Participle, and Infinitive Absolute'], correctIndex: 3, explanation: 'CourseGuide Ch 24. Everywhere else it assimilates into the first root consonant and survives only as a Daghesh Forte.', category: 'niphal-strong' },
  { id: 'hw9-s2-q4', type: 'mcq', question: 'What happens to the Niphal נ in the Imperfect, Imperative, and Infinitive Construct?', options: ['it assimilates into the first root consonant as a Daghesh Forte', 'it drops out with no trace', 'it becomes a ה', 'it moves to the end of the word'], correctIndex: 0, explanation: 'CourseGuide Ch 24. יִקָּטֵל — the Daghesh Forte in the ק IS the stem נ. That doubling is your Niphal Imperfect recognition mark.', category: 'niphal-strong' },
  { id: 'hw9-s2-q5', type: 'mcq', question: 'Which form is the Niphal Perfect 3ms of √q-t-l?', options: ['יִקָּטֵל', 'נִקְטַל', 'הִקְטִיל', 'קִטֵּל'], correctIndex: 1, explanation: 'CourseGuide Ch 24. נִקְטַל = "he was killed." Compare the Qal קָטַל ("he killed") — a prefixed נ separates active from passive.', category: 'niphal-strong' },
  { id: 'hw9-s2-q6', type: 'mcq', question: 'Which form is the Niphal Imperfect 3ms of √q-t-l?', options: ['נִקְטַל', 'יִקְטֹל', 'יִקָּטֵל', 'יַקְטִיל'], correctIndex: 2, explanation: 'CourseGuide Ch 24. Hireq preformative + Daghesh Forte + Tsere stem vowel: "he will be killed."', category: 'niphal-strong' },
  { id: 'hw9-s2-q7', type: 'mcq', question: 'Parse: נִקְטָל', hebrew: 'נִקְטָל', options: ['Niphal Imperfect 3ms', 'Niphal Infinitive Construct', 'Qal passive participle', 'Niphal Participle ms'], correctIndex: 3, explanation: 'CourseGuide Ch 24. The Participle keeps the visible נ but takes a QAMETS stem vowel; the Perfect נִקְטַל has Pathach. One vowel is the whole difference.', category: 'niphal-strong' },
  { id: 'hw9-s2-q8', type: 'mcq', question: 'Translate: נִשְׁמַר', hebrew: 'נִשְׁמַר', options: ['he was kept', 'he kept', 'he will be kept', 'keeping'], correctIndex: 0, explanation: 'CourseGuide Ch 24. A visible נ prefix plus a Pathach stem vowel gives the Niphal Perfect 3ms of שָׁמַר.', category: 'niphal-strong' },
  { id: 'hw9-s2-q9', type: 'mcq', question: 'Translate: יִשָּׁמֵר', hebrew: 'יִשָּׁמֵר', options: ['he kept', 'he will be kept', 'he will keep', 'let him keep'], correctIndex: 1, explanation: 'CourseGuide Ch 24. The Daghesh Forte in the שׁ recovers the assimilated stem נ, so this is a Niphal Imperfect rather than a Qal.', category: 'niphal-strong' },
  { id: 'hw9-s2-q10', type: 'mcq', question: 'Parse: הִקָּטֵל', hebrew: 'הִקָּטֵל', options: ['Qal Imperative 2ms', 'Hiphil Perfect 3ms', 'Niphal Imperative — identically spelled with the Niphal Infinitive Construct', 'Niphal Perfect 3ms'], correctIndex: 2, explanation: 'CourseGuide Ch 24. Where the stem נ assimilates, a ה prefix appears to support the doubled consonant.', category: 'niphal-strong' },
];

// Section 3 — Chapter 25: the Niphal stem, weak verbs.
const sec3: MCQQuestion[] = [
  { id: 'hw9-s3-q1', type: 'mcq', question: 'In III-א Niphal verbs, which conjugations keep the strong-verb diagnostics unchanged?', options: ['the Imperfect, Imperative, Infinitive Construct, and Infinitive Absolute', 'the Perfect and Participle only', 'none of them', 'only the Infinitive Absolute'], correctIndex: 0, explanation: 'CourseGuide Ch 25. Only the Perfect and Participle change, and only slightly — the ordinary III-א adjustments you already know from the Qal.', category: 'niphal-weak' },
  { id: 'hw9-s3-q2', type: 'mcq', question: 'In III-ה Niphal verbs, what is affected?', options: ['every form is completely reshaped', 'the endings across each conjugation, while stem prefixes remain intact', 'only the Imperfect', 'nothing at all'], correctIndex: 1, explanation: 'CourseGuide Ch 25. The III-ה endings recur across the Qal and all the derived stems — learn them once and they keep paying off.', category: 'niphal-weak' },
  { id: 'hw9-s3-q3', type: 'mcq', question: 'Why do I-guttural roots look so different in the Niphal?', options: ['because the stem נ is dropped', 'because they gain a fourth root letter', 'because gutturals reject a simple Shewa and take reduced vowels instead', 'because the stem vowel becomes a Shureq'], correctIndex: 2, explanation: 'CourseGuide Ch 25. The changes look drastic but follow rules you already know: נֶאֱמַן shows the Seghol and Hateph Seghol a guttural forces.', category: 'niphal-weak' },
  { id: 'hw9-s3-q4', type: 'mcq', question: 'Which weak class has Niphal diagnostics IDENTICAL to the strong verb?', options: ['I-נ verbs', 'Biconsonantal verbs', 'geminate verbs', 'III-ח and III-ע verbs'], correctIndex: 3, explanation: 'CourseGuide Ch 25. Biconsonantal, geminate, and doubly weak Niphals do occur but are infrequent; the strong diagnostics are enough to identify them.', category: 'niphal-weak' },
  { id: 'hw9-s3-q5', type: 'mcq', question: 'Translate: נִמְצָא', hebrew: 'נִמְצָא', options: ['he was found', 'he found', 'he will find', 'finding'], correctIndex: 0, explanation: 'CourseGuide Ch 25. A III-א Niphal Perfect 3ms of מָצָא, with the Qamets before the quiescent א that the class always shows.', category: 'niphal-weak' },
  { id: 'hw9-s3-q6', type: 'mcq', question: 'Translate: נִבְנָה', hebrew: 'נִבְנָה', options: ['he built', 'it was built', 'he will build', 'build!'], correctIndex: 1, explanation: 'CourseGuide Ch 25. A III-ה Niphal of בָּנָה: the visible נ marks the stem and the Qamets-He ending marks the weak class.', category: 'niphal-weak' },
  { id: 'hw9-s3-q7', type: 'mcq', question: 'Translate: נֶאֱמָן', hebrew: 'נֶאֱמָן', options: ['he believed', 'believe!', 'faithful, trustworthy, reliable', 'he will believe'], correctIndex: 2, explanation: 'CourseGuide Ch 25. A I-guttural Niphal participle of אָמַן used adjectivally. Its Hiphil, הֶאֱמִין, means "he believed" (Gen 15:6).', category: 'niphal-weak' },
  { id: 'hw9-s3-q8', type: 'mcq', question: 'Which root would you look up for נוֹשַׁע?', hebrew: 'נוֹשַׁע', options: ['נָשָׂא ("to lift")', 'שׁוּב ("to return")', 'נָשַׁק ("to kiss")', 'יָשַׁע ("to save, deliver")'], correctIndex: 3, explanation: 'CourseGuide Ch 25. I-י roots (originally I-ו) show a Holem Waw in the Niphal Perfect: נוֹשַׁע = "he was saved."', category: 'niphal-weak' },
  { id: 'hw9-s3-q9', type: 'mcq', question: 'Which root would you look up for נִגְלָה?', hebrew: 'נִגְלָה', options: ['גָּלָה ("to uncover, reveal")', 'נָגַשׁ ("to draw near")', 'נָגַד ("to tell")', 'גָּדַל ("to be great")'], correctIndex: 0, explanation: 'CourseGuide Ch 25. Strip the stem נ and the III-ה ending, and the root גלה remains: "it was revealed" (Isa 40:5).', category: 'niphal-weak' },
  { id: 'hw9-s3-q10', type: 'mcq', question: 'Translate: נַעֲשָׂה', hebrew: 'נַעֲשָׂה', options: ['he made', 'it was made / it was done', 'make!', 'he will make'], correctIndex: 1, explanation: 'CourseGuide Ch 25. עָשָׂה is doubly weak — I-guttural and III-ה — so the Niphal shows both a Hateph Pathach and the III-ה ending.', category: 'niphal-weak' },
];

// Section 4 — Chapter 23-25 vocabulary ("You Should Know" lists).
const sec4: PairedMCQQuestion[] = [
  vocab('hw9-s4-q1', 'חֵמָה', 'chemah', ['chokhmah', 'chatser', 'choshekh'], 0, 'wrath, heat, poison', ['wisdom', 'courtyard', 'darkness'], 1, 'Ch 23 vocab. Frequently paired with אַף for the burning anger of God or of a king.'),
  vocab('hw9-s4-q2', 'חָצֵר', 'chatser', ['chemah', 'chomah', 'chokhmah'], 1, 'courtyard, village, settlement', ['wrath', 'wall', 'wisdom'], 1, 'Ch 23 vocab. The courts of the tabernacle and temple are חֲצֵרוֹת.'),
  vocab('hw9-s4-q3', 'נְחֹשֶׁת', 'nechoshet', ['nachal', 'nasi', 'nega'], 2, 'copper, bronze', ['stream, wadi', 'chief, prince', 'plague'], 0, 'Ch 23 vocab. The metal of the tabernacle altar and of the bronze serpent.'),
  vocab('hw9-s4-q4', 'נָשִׂיא', 'nasi', ['nachal', 'nechoshet', 'nega'], 3, 'chief, leader, prince', ['stream, wadi', 'bronze', 'plague'], 2, 'Ch 23 vocab. Built on נָשָׂא ("to lift") — the "lifted up" one.'),
  vocab('hw9-s4-q5', 'יָתַר', 'yatar', ['yasha', 'yatav', 'yaats'], 0, '(Ni) to be left over, remain', ['(Ni) to be delivered', 'to go well with', 'to advise'], 1, 'Ch 24 vocab. The root behind יֶתֶר ("remainder"), Chapter 29 vocabulary.'),
  vocab('hw9-s4-q6', 'כּוּן', 'kun', ['kalah', 'kasah', 'karat'], 1, '(Ni) to be established, firm, ready', ['to be finished', 'to cover', 'to cut'], 1, 'Ch 24 vocab. A Biconsonantal verb; its Hiphil means "to establish, prepare."'),
  vocab('hw9-s4-q7', 'נָכָה', 'nakhah', ['natsal', 'natsav', 'nacham'], 2, '(Hi) to strike, smite, strike dead', ['to deliver', 'to stand firm', 'to comfort'], 0, 'Ch 24 vocab. It occurs almost entirely in the Hiphil and Hophal.'),
  vocab('hw9-s4-q8', 'נָצַב', 'natsav', ['nakhah', 'nacham', 'natsal'], 3, '(Ni) to stand firm, take one\'s stand, be stationed', ['to strike', 'to comfort', 'to deliver'], 2, 'Ch 24 vocab. "Forever, O LORD, your word is firmly fixed (נִצָּב) in the heavens" (Ps 119:89).'),
  vocab('hw9-s4-q9', 'חָרָה', 'charah', ['chanah', 'chashav', 'chalah'], 0, 'to become hot, burn with anger', ['to camp', 'to think', 'to be sick'], 1, 'Ch 25 vocab. The idiom חָרָה אַף ("his nose burned") means "he became angry."'),
  vocab('hw9-s4-q10', 'רָעַע', 'raa', ['radaf', 'rachats', 'rakhav'], 1, 'to be bad, evil or displeasing', ['to pursue', 'to wash', 'to ride'], 1, 'Ch 25 vocab. A geminate root, related to the adjective רַע ("evil").'),
  vocab('hw9-s4-q11', 'שָׁמֵם', 'shamem', ['shakhan', 'shakhach', 'shamar'], 2, 'to be deserted, desolate, uninhabited', ['to dwell', 'to forget', 'to keep'], 3, 'Ch 25 vocab. A geminate root; its noun שְׁמָמָה means "desolation."'),
  vocab('hw9-s4-q12', 'מִגְרָשׁ', 'migrash', ['mishpat', 'miqneh', 'mizrach'], 3, 'open land, pasture', ['judgment', 'livestock', 'east'], 2, 'Ch 25 vocab. The pastureland assigned around the Levitical cities.'),
];

// Section 5 — Verse translation: syntax and Niphal verbs in familiar clauses.
const sec5: MCQQuestion[] = [
  { id: 'hw9-s5-q1', type: 'mcq', question: 'Translate this verse (Genesis 1:1).', hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ', options: ['In the beginning God created the heavens and the earth.', 'God, in the beginning, was creating a heaven and an earth.', 'The heavens and the earth were created by God.', 'When God began, the heavens and the earth already were.'], correctIndex: 0, explanation: 'A textbook verbal clause (Ch 23): a fronted prepositional phrase, then verb, subject, and two objects marked with אֵת.', category: 'verse' },
  { id: 'hw9-s5-q2', type: 'mcq', question: 'Translate this clause (Psalm 118:6).', hebrew: 'יְהוָה לִי לֹא אִירָא', options: ['I feared the LORD who is mine.', 'The LORD is on my side; I will not fear.', 'The LORD will not fear for me.', 'Do not fear, for the LORD is mine.'], correctIndex: 1, explanation: 'A verbless clause with a prepositional predicate (Ch 23) — "the LORD is for me" — followed by a negated Imperfect.', category: 'verse' },
  { id: 'hw9-s5-q3', type: 'mcq', question: 'Translate this clause (1 Samuel 17:47).', hebrew: 'כִּי לַיהוָה הַמִּלְחָמָה', options: ['The LORD will fight the battle.', 'Fight for the LORD in the battle!', 'for the battle is the LORD\'s', 'The LORD went out to battle.'], correctIndex: 2, explanation: 'A verbless clause whose predicate is the fronted prepositional phrase לַיהוָה (Ch 23): "to the LORD belongs the battle."', category: 'verse' },
  { id: 'hw9-s5-q4', type: 'mcq', question: 'Translate this promise (Joel 2:32).', hebrew: 'כֹּל אֲשֶׁר־יִקְרָא בְּשֵׁם יְהוָה יִמָּלֵט', options: ['The LORD calls everyone by name to himself.', 'All who are delivered will call on the name of the LORD.', 'Call on the name of the LORD and be delivered!', 'Everyone who calls on the name of the LORD shall be delivered.'], correctIndex: 3, explanation: 'יִמָּלֵט is a Niphal Imperfect of מָלַט (Ch 24) with passive force. The Daghesh Forte in the מ recovers the assimilated stem נ.', category: 'verse' },
  { id: 'hw9-s5-q5', type: 'mcq', question: 'Translate this clause (Genesis 32:28).', hebrew: 'לֹא יַעֲקֹב יֵאָמֵר עוֹד שִׁמְךָ', options: ['Your name shall no longer be called Jacob.', 'Jacob will no longer say your name.', 'Jacob did not tell you his name.', 'Do not call your name Jacob again.'], correctIndex: 0, explanation: 'יֵאָמֵר is a I-guttural Niphal Imperfect of אָמַר (Ch 25) with passive force — the guttural forces the Tsere preformative instead of a doubled consonant.', category: 'verse' },
  { id: 'hw9-s5-q6', type: 'mcq', question: 'Translate this clause (Psalm 34:18).', hebrew: 'קָרוֹב יְהוָה לְנִשְׁבְּרֵי־לֵב', options: ['The LORD breaks the hearts of the near.', 'The LORD is near to the brokenhearted.', 'Draw near to the LORD with a broken heart!', 'A broken heart draws near to the LORD.'], correctIndex: 1, explanation: 'נִשְׁבְּרֵי is a Niphal participle in the construct plural (Ch 24): "those broken of heart." The visible נ marks the stem.', category: 'verse' },
  { id: 'hw9-s5-q7', type: 'mcq', question: 'Translate this clause (Psalm 119:89).', hebrew: 'לְעוֹלָם יְהוָה דְּבָרְךָ נִצָּב בַּשָּׁמָיִם', options: ['Your eternal word, O LORD, established the heavens.', 'The LORD will set your word in the heavens forever.', 'Forever, O LORD, your word is firmly fixed in the heavens.', 'The heavens will stand forever by the word of the LORD.'], correctIndex: 2, explanation: 'נִצָּב is a Niphal participle of נָצַב (Ch 24 vocabulary) used predicatively. Note the fronted adverb לְעוֹלָם, exactly the pattern Chapter 23 describes.', category: 'verse' },
  { id: 'hw9-s5-q8', type: 'mcq', question: 'Translate this exclamation (Psalm 8:1).', hebrew: 'יְהוָה אֲדֹנֵינוּ מָה־אַדִּיר שִׁמְךָ בְּכָל־הָאָרֶץ', options: ['The LORD our Lord made his name majestic in the earth.', 'Who is like the LORD our Lord in all the earth?', 'Let the name of the LORD be majestic in all the earth.', 'O LORD our Lord, how majestic is your name in all the earth!'], correctIndex: 3, explanation: 'A verbless clause (Ch 23) introduced by מָה used exclamatorily: "how majestic!" אֲדֹנֵינוּ and שִׁמְךָ both carry pronominal suffixes (Ch 9).', category: 'verse' },
];

export const hw9Sections = { 1: sec1, 2: sec2, 3: sec3, 4: sec4, 5: sec5 };

export const hw9Meta: ExtendedHomeworkMeta = {
  id: 'hw9',
  title: 'HW9: Sentence Syntax and the Niphal Stem',
  shortTitle: 'HW9',
  description: 'CourseGuide for BBH (Pratico/Van Pelt) Chapters 23-25 (Sessions 23-25): Hebrew word order and verbless clauses, and the Niphal stem in strong and weak verbs — plus new Chapter 23-25 vocabulary and verse-translation practice.',
  topics: ['Ch 23: Sentence syntax', 'Ch 24: Niphal strong verbs', 'Ch 25: Niphal weak verbs', 'Ch 23-25 vocabulary', 'Verse translation'],
  totalQuestions: sec1.length + sec2.length + sec3.length + sec4.length + sec5.length,
  sections: [
    { id: 1, title: 'Ch 23 — Sentence Syntax', description: 'Word order, fronting, clause-initial verbs, and the verbless clause', questionCount: sec1.length },
    { id: 2, title: 'Ch 24 — The Niphal Stem (Strong)', description: 'Passive and reflexive action, and where the stem Nun hides', questionCount: sec2.length },
    { id: 3, title: 'Ch 25 — The Niphal Stem (Weak)', description: 'What each weak class does — and does not — do to the Niphal diagnostics', questionCount: sec3.length },
    { id: 4, title: 'Ch 23-25 Vocabulary', description: 'Read and translate the new "You Should Know" words', questionCount: sec4.length },
    { id: 5, title: 'Verse Translation', description: 'Translate familiar clauses built on Hebrew syntax and Niphal verbs', questionCount: sec5.length },
  ],
  sectionQuestions: hw9Sections,
};
