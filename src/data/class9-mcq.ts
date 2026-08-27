// Class 9 practice — CourseGuide for BBH Chapters 23-25: Hebrew sentence
// syntax, and the Niphal stem in strong and weak verbs, plus the Chapter 23-25
// "You Should Know" vocabulary and verse translation whose grammar stays
// within Chapters 1-25.
//
// NOT YET RELEASED. Nothing imports this bank into a route, so it is not
// reachable from the app. Release = add a Class9MCQPractice route page and a
// hub card (see class-6-mcq for the pattern).

import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function asGroups(questions: PracticeQuestion[]): PracticeQuestionGroup[] {
  return questions.map((question) => ({ id: question.id, questions: [question] }));
}

// Chapter 23 — sentence syntax: where the verb stands, and what happens when
// there is no verb at all.
const ch23Questions: PracticeQuestion[] = [
  { id: 'class9-ch23-1', prompt: 'What is the normal word order of a Hebrew VERBAL clause?', options: ['verb – subject – object', 'subject – verb – object', 'object – verb – subject', 'subject – object – verb'], correctIndex: 0, explanation: 'בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם — verb, then subject, then object. English reverses the first two, which is why Hebrew narrative feels "back to front" at first.', category: 'ch23' },
  { id: 'class9-ch23-2', prompt: 'Which of these regularly stands BEFORE the verb?', options: ['the direct object marker אֵת', 'the construct noun', 'an adverb of time, הִנֵּה, an independent pronoun, or a negative particle', 'the definite article'], correctIndex: 2, explanation: 'Subjects and objects can also be fronted in important contexts. When something precedes the verb, ask what is being emphasized or set in contrast.', category: 'ch23' },
  { id: 'class9-ch23-3', prompt: 'Where does the REGULAR (non-consecutive) Perfect normally stand in its clause?', options: ['always first', 'not first — something normally precedes it', 'always last', 'it never appears in prose'], correctIndex: 1, explanation: 'Position is a clue to identity. The regular Perfect and Imperfect are normally non-initial; the consecutive forms are the ones that open their clause.', category: 'ch23' },
  { id: 'class9-ch23-4', prompt: 'Where does the CONSECUTIVE Perfect stand in its clause?', options: ['it never begins a clause', 'in the middle, after the subject', 'at the very end', 'first'], correctIndex: 3, explanation: 'Consecutive forms are clause-initial by rule. Combined with the Waw Consecutive spelling (Ch 17), position gives you a second independent check on the parse.', category: 'ch23' },
  { id: 'class9-ch23-5', prompt: 'How does a VOLITIONAL Imperfect behave?', options: ['it stands first in its clause, but WITHOUT the Waw Consecutive', 'it always follows its subject', 'it must carry the Waw Consecutive', 'it cannot begin a clause'], correctIndex: 0, explanation: 'Clause-initial position without the consecutive waw signals volition — a wish, a command, or a purpose, rather than plain narrative.', category: 'ch23' },
  { id: 'class9-ch23-6', prompt: 'What is a verbless clause?', options: ['a clause whose verb has been deleted by a scribe', 'a clause with a subject and a predicate side by side, and no verb at all', 'a clause containing only a participle', 'a clause with two verbs'], correctIndex: 1, explanation: 'יְהוָה מֶלֶךְ means "the LORD is king." Hebrew simply places subject and predicate together; English has to supply "is" or "are."', category: 'ch23' },
  { id: 'class9-ch23-7', prompt: 'Which of these can serve as the PREDICATE of a verbless clause?', options: ['only a noun', 'only an adjective', 'only a prepositional phrase', 'a noun, adjective, pronoun, prepositional phrase, or participle'], correctIndex: 3, explanation: 'לַיהוָה הָאָרֶץ ("the earth is the LORD\'s") has a prepositional predicate; יְהוָה שֹׁמְרֶךָ ("the LORD is your keeper") has a participial one.', category: 'ch23' },
  { id: 'class9-ch23-8', prompt: 'An Imperative followed by an Imperfect with the conjunction ְו creates:', options: ['a purpose or result clause', 'a construct chain', 'a question', 'a prohibition'], correctIndex: 0, explanation: 'Compare the other sequence: an Imperative followed by a CONSECUTIVE Perfect carries the imperatival force forward, so the second verb is still a command.', category: 'ch23' },
];

// Chapter 23 recall: read the shape of a clause, not just its words.
const ch23MemoryQuestions: PracticeQuestion[] = [
  { id: 'class9-memory-ch23-vso', prompt: 'What is the word order of this clause?', hebrew: 'בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם', options: ['verb – subject – object', 'subject – verb – object', 'object – subject – verb', 'subject – object – verb'], correctIndex: 0, explanation: 'The default Hebrew verbal clause. Recognizing it lets you spot the exceptions, where a fronted element is carrying the emphasis.', category: 'ch23-memory' },
  { id: 'class9-memory-ch23-verbless', prompt: 'What kind of clause is this?', hebrew: 'יְהוָה מֶלֶךְ', options: ['a participial clause', 'a verbless clause — "the LORD is king"', 'a relative clause', 'a consecutive clause'], correctIndex: 1, explanation: 'Subject and predicate stand side by side with no verb. English must supply the copula that Hebrew leaves out.', category: 'ch23-memory' },
  { id: 'class9-memory-ch23-fronting', prompt: 'Why does the subject come FIRST in וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ (Genesis 1:2)?', hebrew: 'וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ', options: ['because הָיָה always follows its subject', 'because the clause is a question', 'because the verb is plural', 'because the fronted subject breaks the narrative to give circumstantial background'], correctIndex: 3, explanation: 'Verse 1 uses ordinary verb-first order; verse 2 fronts the subject and steps out of the narrative sequence to describe the state of things.', category: 'ch23-memory' },
  { id: 'class9-memory-ch23-initial', prompt: 'Which verb forms are clause-INITIAL by rule?', options: ['the consecutive Perfect and the consecutive Imperfect', 'the regular Perfect and the regular Imperfect', 'participles', 'infinitives'], correctIndex: 0, explanation: 'Position is diagnostic. If a Perfect or Imperfect opens its clause, expect a consecutive form or a volitional one.', category: 'ch23-memory' },
  { id: 'class9-memory-ch23-pronoun', prompt: 'What is the independent pronoun doing in כִּי־יְהוָה הוּא הָאֱלֹהִים?', hebrew: 'יְהוָה הוּא הָאֱלֹהִים', options: ['it is the direct object', 'it stands in for the missing verb "is," binding subject to predicate', 'it makes the clause a question', 'it marks possession'], correctIndex: 1, explanation: 'In a verbless clause an independent pronoun often functions as a copula: "the LORD, he is God."', category: 'ch23-memory' },
  { id: 'class9-memory-ch23-sequence', prompt: 'What does an Imperative followed by a CONSECUTIVE PERFECT express?', options: ['a question', 'a prohibition', 'the imperatival force carried forward — the second verb is still a command', 'a completed past action'], correctIndex: 2, explanation: 'Contrast the other sequence: Imperative + Imperfect with a plain waw gives purpose or result ("so that..."), not a second command.', category: 'ch23-memory' },
];

// Chapter 24 — the Niphal stem in strong verbs.
const ch24Questions: PracticeQuestion[] = [
  { id: 'class9-ch24-1', prompt: 'What type of action and voice does the Niphal stem express?', options: ['causative action with an active voice', 'intensive action with an active voice', 'simple action with a passive or reflexive voice', 'intensive action with a passive voice'], correctIndex: 2, explanation: 'The Niphal is the passive or reflexive counterpart of the Qal, and it can also be reciprocal ("they fought one another") or even plainly active.', category: 'ch24' },
  { id: 'class9-ch24-2', prompt: 'Why are some Niphal verbs translated with an ACTIVE voice?', options: ['because the Niphal is really an active stem', 'because their roots are common in the Niphal but unattested (or nearly so) in the Qal', 'because the translators disagree', 'because they are always reflexive'], correctIndex: 1, explanation: 'לָחַם is a good example: it is rare in the Qal, so the Niphal נִלְחַם simply means "he fought." Check the lexicon before forcing a passive.', category: 'ch24' },
  { id: 'class9-ch24-3', prompt: 'In which conjugations does the Niphal נ appear as a full CONSONANT?', options: ['the Perfect, the Participle, and the Infinitive Absolute form נִקְטוֹל', 'the Imperfect and the Imperative', 'the Infinitive Construct only', 'never'], correctIndex: 0, explanation: 'נִקְטַל, נִקְטָל, נִקְטוֹל — the נ is visible. Elsewhere it hides inside a Daghesh Forte instead.', category: 'ch24' },
  { id: 'class9-ch24-4', prompt: 'What happens to the Niphal נ in the Imperfect, Imperative, and Infinitive Construct?', options: ['it is dropped entirely with no trace', 'it becomes a ה', 'it moves to the end of the word', 'it assimilates into the first root consonant and shows up as a Daghesh Forte'], correctIndex: 3, explanation: 'יִקָּטֵל — the Daghesh Forte in the ק is the assimilated נ. That doubling is your recognition mark for the Niphal Imperfect.', category: 'ch24' },
  { id: 'class9-ch24-5', prompt: 'Which form is the Niphal Perfect 3ms of √q-t-l?', options: ['נִקְטַל', 'יִקָּטֵל', 'הִקְטִיל', 'קִטֵּל'], correctIndex: 0, explanation: 'נִקְטַל = "he was killed." Compare the Qal Perfect קָטַל ("he killed") — one prefixed נ separates active from passive.', category: 'ch24' },
  { id: 'class9-ch24-6', prompt: 'Which form is the Niphal Imperfect 3ms of √q-t-l?', options: ['נִקְטַל', 'יִקְטֹל', 'יִקָּטֵל', 'יַקְטִיל'], correctIndex: 2, explanation: 'יִקָּטֵל = "he will be killed." The Hireq preformative plus the Daghesh Forte plus the Tsere stem vowel is the Niphal Imperfect signature.', category: 'ch24' },
  { id: 'class9-ch24-7', prompt: 'Translate this Niphal Perfect.', hebrew: 'נִשְׁמַר', options: ['he kept', 'he was kept', 'he will be kept', 'keeping'], correctIndex: 1, explanation: 'The prefixed נ plus the Pathach stem vowel gives the Niphal Perfect 3ms of שָׁמַר: "he was kept / he kept himself."', category: 'ch24' },
  { id: 'class9-ch24-8', prompt: 'Translate this Niphal Imperfect.', hebrew: 'יִשָּׁמֵר', options: ['he will keep', 'he kept', 'he will be kept', 'let him keep'], correctIndex: 2, explanation: 'The Daghesh Forte in the שׁ recovers the assimilated נ, so this is a Niphal, not a Qal: "he will be kept."', category: 'ch24' },
];

// Chapter 24 recall: the Niphal diagnostics, conjugation by conjugation.
const ch24MemoryQuestions: PracticeQuestion[] = [
  { id: 'class9-memory-ch24-perfect', prompt: 'Parse this form.', hebrew: 'נִקְטַל', transliteration: 'niqtal', options: ['Niphal Perfect 3ms — "he was killed"', 'Niphal Imperfect 3ms', 'Qal Perfect 3ms', 'Niphal Imperative'], correctIndex: 0, explanation: 'A visible נ prefix plus a Pathach stem vowel marks the Niphal Perfect. The Participle נִקְטָל looks almost identical — it has Qamets instead.', category: 'ch24-memory' },
  { id: 'class9-memory-ch24-imperfect', prompt: 'Parse this form.', hebrew: 'יִקָּטֵל', transliteration: 'yiqqatel', options: ['Qal Imperfect 3ms', 'Niphal Imperfect 3ms — "he will be killed"', 'Niphal Perfect 3ms', 'Hiphil Imperfect 3ms'], correctIndex: 1, explanation: 'The Daghesh Forte in the first root consonant is an assimilated נ, and the Tsere stem vowel completes the Niphal Imperfect pattern.', category: 'ch24-memory' },
  { id: 'class9-memory-ch24-participle', prompt: 'Parse this form.', hebrew: 'נִקְטָל', transliteration: 'niqtal', options: ['Niphal Imperfect', 'Niphal Infinitive Construct', 'Niphal Participle ms — "being killed"', 'Qal passive participle'], correctIndex: 2, explanation: 'The Niphal Participle keeps the visible נ but takes a QAMETS stem vowel, where the Perfect has Pathach. That one vowel is the whole difference.', category: 'ch24-memory' },
  { id: 'class9-memory-ch24-imperative', prompt: 'Parse this form.', hebrew: 'הִקָּטֵל', transliteration: 'hiqqatel', options: ['Qal Imperative', 'Hiphil Perfect', 'Niphal Perfect', 'Niphal Imperative (and, identically spelled, the Infinitive Construct)'], correctIndex: 3, explanation: 'Where the נ assimilates, a ה prefix appears to support the doubled consonant: הִקָּטֵל serves as both Imperative and Infinitive Construct.', category: 'ch24-memory' },
  { id: 'class9-memory-ch24-daghesh', prompt: 'A Daghesh Forte in the FIRST root consonant of an Imperfect, with a Hireq preformative, recovers which missing letter?', options: ['the נ of the Niphal stem prefix', 'a lost ה', 'a lost י', 'a lost א'], correctIndex: 0, explanation: 'Do not confuse it with the I-נ verb class, where the assimilated נ belongs to the ROOT. Here the נ belongs to the STEM.', category: 'ch24-memory' },
  { id: 'class9-memory-ch24-nilcham', prompt: 'How should נִלְחַם be translated?', hebrew: 'נִלְחַם', transliteration: 'nilcham', options: ['"he was fought against" — always passive', '"he fought" — actively, because the root is rare in the Qal', '"he caused fighting"', '"let him fight"'], correctIndex: 1, explanation: 'A Niphal form does not guarantee a passive translation. When a root lives mainly in the Niphal, the stem simply carries the plain meaning.', category: 'ch24-memory' },
];

// Chapter 25 — the Niphal stem in weak verbs.
const ch25Questions: PracticeQuestion[] = [
  { id: 'class9-ch25-1', prompt: 'In III-א Niphal verbs, where do the strong-verb diagnostics stay identical?', options: ['nowhere — every conjugation changes', 'in the Perfect and Participle only', 'in the Imperfect, Imperative, Infinitive Construct, and Infinitive Absolute', 'only in the Infinitive Absolute'], correctIndex: 2, explanation: 'Only the Perfect and the Participle show small changes, and those are the ordinary III-א adjustments you already know from the Qal.', category: 'ch25' },
  { id: 'class9-ch25-2', prompt: 'Translate this Niphal form.', hebrew: 'נִמְצָא', options: ['he found', 'he was found', 'he will find', 'finding'], correctIndex: 1, explanation: 'A III-א Niphal Perfect 3ms of מָצָא: "he was found." The Qamets before the quiescent א is the expected III-א vowel.', category: 'ch25' },
  { id: 'class9-ch25-3', prompt: 'In III-ה Niphal verbs, which forms are affected?', options: ['only the stem vowels of the Perfect and Participle — the Imperfect and the rest keep the strong diagnostics', 'every form is completely reshaped', 'only the Imperfect', 'none — the class is identical to the strong verb'], correctIndex: 0, explanation: 'The III-ה endings you have met in the Qal reappear here, and the same set of endings will recur in every derived stem.', category: 'ch25' },
  { id: 'class9-ch25-4', prompt: 'Translate this Niphal form.', hebrew: 'נִבְנָה', options: ['he built', 'he will build', 'it was built', 'build!'], correctIndex: 2, explanation: 'A III-ה Niphal Perfect of בָּנָה. The visible נ prefix marks the stem, and the Qamets-He ending marks the III-ה class.', category: 'ch25' },
  { id: 'class9-ch25-5', prompt: 'Why do I-guttural roots look so different in the Niphal?', options: ['because the stem נ is dropped', 'because of rules you already know — gutturals reject a simple Shewa and take reduced vowels instead', 'because the root gains a fourth letter', 'because the stem vowel becomes a Shureq'], correctIndex: 1, explanation: 'The changes look drastic at first but are entirely predictable: נֶאֱמַן shows the Seghol and Hateph Seghol that a guttural forces.', category: 'ch25' },
  { id: 'class9-ch25-6', prompt: 'Translate this Niphal participle.', hebrew: 'נֶאֱמָן', options: ['faithful, trustworthy, reliable', 'he believed', 'believe!', 'he will believe'], correctIndex: 0, explanation: 'A I-guttural Niphal participle of אָמַן, used adjectivally: "faithful." Its Hiphil, הֶאֱמִין, means "he believed" (Gen 15:6).', category: 'ch25' },
  { id: 'class9-ch25-7', prompt: 'Which weak class has Niphal diagnostics IDENTICAL to the strong verb?', options: ['I-נ verbs', 'Biconsonantal verbs', 'geminate verbs', 'III-ח and III-ע verbs'], correctIndex: 3, explanation: 'Biconsonantal, geminate, and doubly weak Niphal forms do occur, but they are infrequent. Mastering the strong diagnostics is enough to identify them.', category: 'ch25' },
  { id: 'class9-ch25-8', prompt: 'Translate this Niphal form.', hebrew: 'נַעֲשָׂה', options: ['he made', 'make!', 'it was made / it was done', 'he will make'], correctIndex: 2, explanation: 'עָשָׂה is doubly weak — I-guttural and III-ה — so the Niphal shows both a Hateph Pathach and the III-ה ending: "it was made."', category: 'ch25' },
];

// Chapter 25 recall: restore the root behind a weak Niphal form.
const ch25MemoryQuestions: PracticeQuestion[] = [
  { id: 'class9-memory-ch25-nimtsa', prompt: 'Which root would you look up for this Niphal form?', hebrew: 'נִמְצָא', transliteration: 'nimtsa', options: ['מָצָא ("to find") — a III-א verb', 'נָצַל ("to deliver")', 'מָלַט ("to escape")', 'נָצַב ("to stand")'], correctIndex: 0, explanation: 'Strip the נ stem prefix and you are left with the root מצא. Take care not to mistake the stem נ for a root letter.', category: 'ch25-memory' },
  { id: 'class9-memory-ch25-nivnah', prompt: 'Which root would you look up for this Niphal form?', hebrew: 'נִבְנָה', transliteration: 'nivnah', options: ['נָבָא ("to prophesy")', 'בָּנָה ("to build") — a III-ה verb', 'בִּין ("to understand")', 'בָּחַר ("to choose")'], correctIndex: 1, explanation: 'The prefixed נ is the stem marker; the Qamets-He ending is the III-ה diagnostic that recurs in every derived stem.', category: 'ch25-memory' },
  { id: 'class9-memory-ch25-nosha', prompt: 'Which root would you look up for this Niphal form?', hebrew: 'נוֹשַׁע', transliteration: 'nosha', options: ['נָשָׂא ("to lift")', 'שׁוּב ("to return")', 'יָשַׁע ("to save, deliver") — a I-י verb', 'נָשַׁק ("to kiss")'], correctIndex: 2, explanation: 'I-י roots (originally I-ו) show a Holem Waw in the Niphal Perfect: נוֹשַׁע = "he was saved" — יִשְׂרָאֵל נוֹשַׁע בַּיהוָה (Isa 45:17).', category: 'ch25-memory' },
  { id: 'class9-memory-ch25-niglah', prompt: 'Which root would you look up for this Niphal form?', hebrew: 'נִגְלָה', transliteration: 'niglah', options: ['נָגַשׁ ("to draw near")', 'נָגַד ("to tell")', 'גָּדַל ("to be great")', 'גָּלָה ("to uncover, reveal") — a III-ה verb'], correctIndex: 3, explanation: 'נִגְלָה = "it was revealed," as in "and the glory of the LORD shall be revealed" (Isa 40:5). גָּלָה is Chapter 17 vocabulary.', category: 'ch25-memory' },
  { id: 'class9-memory-ch25-neeman', prompt: 'Parse this form.', hebrew: 'נֶאֱמָן', transliteration: 'neeman', options: ['a I-guttural Niphal participle — "faithful, trustworthy"', 'a Qal Perfect 3ms', 'a Hiphil Perfect 3ms', 'a Piel participle'], correctIndex: 0, explanation: 'The guttural א forces the Seghol and Hateph Seghol, but the visible נ prefix and the Qamets stem vowel still mark it as a Niphal participle.', category: 'ch25-memory' },
  { id: 'class9-memory-ch25-classes', prompt: 'Which Niphal weak class needs the LEAST special attention, because its diagnostics match the strong verb exactly?', options: ['I-guttural verbs', 'III-ה verbs', 'III-ח and III-ע verbs', 'III-א verbs'], correctIndex: 2, explanation: 'The guide is explicit: III-ח/ע Niphal diagnostics are identical to the strong verb, and the remaining rare classes can be identified from the strong patterns you already know.', category: 'ch25-memory' },
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

// Chapter 23-25 "You Should Know" vocabulary.
export const CLASS9_WORD_GROUPS: PracticeQuestionGroup[] = [
  wordGroup({ id: 'class9-word-beged', hebrew: 'בֶּגֶד', transliteration: 'beged', transliterationOptions: ['beged', 'bekhor', 'behemah', 'beten'], transliterationCorrectIndex: 0, meaning: 'clothes, garment, covering', meaningOptions: ['clothes, garment, covering', 'firstborn', 'beast, cattle', 'belly, womb'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class9-word-behemah', hebrew: 'בְּהֵמָה', transliteration: 'behemah', transliterationOptions: ['beged', 'behemah', 'bekhor', 'bamah'], transliterationCorrectIndex: 1, meaning: 'animal, beast, cattle', meaningOptions: ['garment', 'animal, beast, cattle', 'firstborn', 'high place'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class9-word-bekhor', hebrew: 'בְּכוֹר', transliteration: 'bekhor', transliterationOptions: ['beged', 'behemah', 'bekhor', 'barzel'], transliterationCorrectIndex: 2, meaning: 'firstborn, oldest offspring', meaningOptions: ['garment', 'cattle', 'firstborn, oldest offspring', 'iron'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class9-word-chokhmah', hebrew: 'חָכְמָה', transliteration: 'chokhmah', transliterationOptions: ['chemah', 'chatser', 'choshekh', 'chokhmah'], transliterationCorrectIndex: 3, meaning: 'wisdom, skill', meaningOptions: ['wrath', 'courtyard', 'darkness', 'wisdom, skill'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class9-word-koach', hebrew: 'כֹּחַ', transliteration: 'koach', transliterationOptions: ['koach', 'kesil', 'kerem', 'keves'], transliterationCorrectIndex: 0, meaning: 'strength, power', meaningOptions: ['strength, power', 'fool', 'vineyard', 'lamb'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class9-word-etsem', hebrew: 'עֶצֶם', transliteration: 'etsem', transliterationOptions: ['emeq', 'etsem', 'erets', 'eden'], transliterationCorrectIndex: 1, meaning: 'bone, skeleton', meaningOptions: ['valley', 'bone, skeleton', 'land', 'delight'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class9-word-aman', hebrew: 'אָמַן', transliteration: 'aman', transliterationOptions: ['amar', 'asaf', 'aman', 'asar'], transliterationCorrectIndex: 2, meaning: '(Ni) to be faithful, reliable; (Hi) to believe, trust', meaningOptions: ['to say', 'to gather', '(Ni) to be faithful, reliable; (Hi) to believe, trust', 'to bind'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class9-word-yasha', hebrew: 'יָשַׁע', transliteration: 'yasha', transliterationOptions: ['yashav', 'yatar', 'yalad', 'yasha'], transliterationCorrectIndex: 3, meaning: '(Ni) to be delivered; (Hi) to save, deliver, help', meaningOptions: ['to sit', 'to be left over', 'to give birth', '(Ni) to be delivered; (Hi) to save, deliver, help'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class9-word-lacham', hebrew: 'לָחַם', transliteration: 'lacham', transliterationOptions: ['lacham', 'lakhad', 'lamad', 'lavash'], transliterationCorrectIndex: 0, meaning: 'to fight, do battle with', meaningOptions: ['to fight, do battle with', 'to capture', 'to learn', 'to be clothed'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class9-word-malat', hebrew: 'מָלַט', transliteration: 'malat', transliterationOptions: ['mahar', 'malat', 'maas', 'makhar'], transliterationCorrectIndex: 1, meaning: '(Ni) to escape, slip away, be delivered', meaningOptions: ['to hasten', '(Ni) to escape, slip away, be delivered', 'to reject', 'to sell'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class9-word-natsal', hebrew: 'נָצַל', transliteration: 'natsal', transliterationOptions: ['natsav', 'nakhah', 'natsal', 'nacham'], transliterationCorrectIndex: 2, meaning: '(Ni) to be rescued; (Hi) to deliver, snatch away', meaningOptions: ['to stand firm', 'to strike', '(Ni) to be rescued; (Hi) to deliver, snatch away', 'to be sorry, comfort'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class9-word-nacham', hebrew: 'נָחַם', transliteration: 'nacham', transliterationOptions: ['natsal', 'natsav', 'nakhah', 'nacham'], transliterationCorrectIndex: 3, meaning: '(Ni) to be sorry, have compassion; (Pi) to comfort', meaningOptions: ['to be rescued', 'to stand firm', 'to strike', '(Ni) to be sorry, have compassion; (Pi) to comfort'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class9-word-hafakh', hebrew: 'הָפַךְ', transliteration: 'hafakh', transliterationOptions: ['hafakh', 'halakh', 'halal', 'harag'], transliterationCorrectIndex: 0, meaning: 'to turn, overturn, overthrow', meaningOptions: ['to turn, overturn, overthrow', 'to walk', 'to praise', 'to kill'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class9-word-shakhach', hebrew: 'שָׁכַח', transliteration: 'shakhach', transliterationOptions: ['shakhan', 'shakhach', 'shamem', 'shachat'], transliterationCorrectIndex: 1, meaning: 'to forget', meaningOptions: ['to dwell', 'to forget', 'to be desolate', 'to slaughter'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class9-word-sava', hebrew: 'שָׂבַע', transliteration: 'sava', transliterationOptions: ['shava', 'shavat', 'sava', 'samach'], transliterationCorrectIndex: 2, meaning: 'to be satisfied, have one\'s fill', meaningOptions: ['to swear an oath', 'to cease, rest', 'to be satisfied, have one\'s fill', 'to rejoice'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class9-word-choshekh', hebrew: 'חֹשֶׁךְ', transliteration: 'choshekh', transliterationOptions: ['chokhmah', 'chemah', 'chatser', 'choshekh'], transliterationCorrectIndex: 3, meaning: 'darkness', meaningOptions: ['wisdom', 'wrath', 'courtyard', 'darkness'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class9-word-kesil', hebrew: 'כְּסִיל', transliteration: 'kesil', transliterationOptions: ['kesil', 'koach', 'kerem', 'keruv'], transliterationCorrectIndex: 0, meaning: 'fool, shameless person', meaningOptions: ['fool, shameless person', 'strength', 'vineyard', 'cherub'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class9-word-zakhar-male', hebrew: 'זָכָר', transliteration: 'zakhar', transliterationOptions: ['zera', 'zakhar', 'zavach', 'zaaq'], transliterationCorrectIndex: 1, meaning: 'male, man', meaningOptions: ['seed', 'male, man', 'sacrifice', 'outcry'], meaningCorrectIndex: 1 }),
];

// Verse translation — Niphal verbs and verbless clauses in familiar lines.
const verseQuestions: PracticeQuestion[] = [
  { id: 'class9-verse-1', prompt: 'Translate this promise (Exodus 14:14).', hebrew: 'יְהוָה יִלָּחֵם לָכֶם', options: ['The LORD will fight for you.', 'The LORD fought against you.', 'Fight for the LORD!', 'You will fight for the LORD.'], correctIndex: 0, explanation: 'יִלָּחֵם is a Niphal Imperfect (Ch 24) — note the Daghesh Forte recovering the stem נ. The root לָחַם is rare in the Qal, so the Niphal reads actively.', category: 'verse' },
  { id: 'class9-verse-2', prompt: 'Translate this clause (Isaiah 40:5).', hebrew: 'וְנִגְלָה כְּבוֹד יְהוָה', options: ['The LORD revealed his glory.', 'And the glory of the LORD shall be revealed.', 'Reveal your glory, O LORD!', 'The glory of the LORD is great.'], correctIndex: 1, explanation: 'נִגְלָה is a III-ה Niphal Perfect of גָּלָה (Ch 25) with a consecutive waw, so it carries future force: "shall be revealed."', category: 'verse' },
  { id: 'class9-verse-3', prompt: 'Translate this clause (Psalm 33:6).', hebrew: 'בִּדְבַר יְהוָה שָׁמַיִם נַעֲשׂוּ', options: ['The heavens declare the word of the LORD.', 'The LORD spoke and made the heavens.', 'By the word of the LORD the heavens were made.', 'Let the heavens praise the word of the LORD.'], correctIndex: 2, explanation: 'נַעֲשׂוּ is a Niphal Perfect 3cp of the doubly weak עָשָׂה (Ch 25): "they were made." בִּדְבַר is a construct with בְּ (Ch 10).', category: 'verse' },
  { id: 'class9-verse-4', prompt: 'Translate this question (Genesis 18:14).', hebrew: 'הֲיִפָּלֵא מֵיְהוָה דָּבָר', options: ['The LORD has done a wonderful thing.', 'Who can do wonders like the LORD?', 'A word went out from the LORD.', 'Is anything too wonderful for the LORD?'], correctIndex: 3, explanation: 'יִפָּלֵא is a Niphal Imperfect (Ch 24) with the interrogative הֲ in front (Ch 8). מִן here means "for / too ... for."', category: 'verse' },
  { id: 'class9-verse-5', prompt: 'Translate this proverb (Proverbs 15:33).', hebrew: 'יִרְאַת יְהוָה מוּסַר חָכְמָה', options: ['The fear of the LORD is instruction in wisdom.', 'The LORD instructs those who fear wisdom.', 'Fear the LORD and learn wisdom!', 'Wisdom will teach you to fear the LORD.'], correctIndex: 0, explanation: 'A verbless clause (Ch 23) built out of two construct chains: "the fear of the LORD" is the subject, "instruction of wisdom" the predicate.', category: 'verse' },
  { id: 'class9-verse-6', prompt: 'Translate this warning (Deuteronomy 4:9).', hebrew: 'הִשָּׁמֶר לְךָ וּשְׁמֹר נַפְשְׁךָ מְאֹד', options: ['He guarded himself and kept his soul.', 'Only take care, and keep your soul diligently.', 'Your soul will be kept and guarded.', 'Who will guard your soul?'], correctIndex: 1, explanation: 'Two Imperatives from one root: הִשָּׁמֶר is the Niphal ("watch yourself," Ch 24) and שְׁמֹר the Qal ("keep," Ch 18). The Niphal here is reflexive.', category: 'verse' },
];

const chapter23ContextQuestions: PracticeQuestion[] = [
  { id: 'class9-context-ch23-gen1-2', prompt: 'Translate this clause (Genesis 1:2).', hebrew: 'וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ', options: ['The earth was formless and empty.', 'And the earth will become formless and empty.', 'Let the earth be formless and empty.', 'The formless earth was made.'], correctIndex: 0, explanation: 'Chapter 23 focus: the subject stands BEFORE the verb, which steps out of the narrative sequence to give circumstantial background — exactly what verse 1\'s verb-first order does not do.', category: 'context-ch23' },
  { id: 'class9-context-ch23-ps27-1', prompt: 'Translate this clause (Psalm 27:1).', hebrew: 'יְהוָה אוֹרִי וְיִשְׁעִי', options: ['The LORD will light my salvation.', 'The LORD is my light and my salvation.', 'Light and salvation come from the LORD.', 'I will light a lamp for the LORD.'], correctIndex: 1, explanation: 'Chapter 23 focus: a verbless clause. Subject and predicate stand side by side and English must supply "is."', category: 'context-ch23' },
  { id: 'class9-context-ch23-ps24-1', prompt: 'Translate this clause (Psalm 24:1).', hebrew: 'לַיהוָה הָאָרֶץ וּמְלוֹאָהּ', options: ['The LORD made the earth and everything in it.', 'Praise the LORD, all the earth!', 'The earth is the LORD\'s, and everything in it.', 'The earth will belong to the LORD.'], correctIndex: 2, explanation: 'Chapter 23 focus: a verbless clause whose predicate is a prepositional phrase, fronted for emphasis — "to the LORD belongs the earth."', category: 'context-ch23' },
  { id: 'class9-context-ch23-ps100-3', prompt: 'Translate this clause (Psalm 100:3).', hebrew: 'דְּעוּ כִּי־יְהוָה הוּא אֱלֹהִים', options: ['God knows that the LORD is his own.', 'They knew that the LORD is God.', 'We will know the LORD our God.', 'Know that the LORD, he is God.'], correctIndex: 3, explanation: 'Chapter 23 focus: inside the כִּי clause the independent pronoun הוּא works as a copula, binding subject to predicate in a verbless clause. דְּעוּ is a 2mp Imperative (Ch 18).', category: 'context-ch23' },
];

const chapter24ContextQuestions: PracticeQuestion[] = [
  { id: 'class9-context-ch24-prov22-1', prompt: 'Translate this proverb (Proverbs 22:1).', hebrew: 'נִבְחָר שֵׁם מֵעֹשֶׁר רָב', options: ['A good name is to be chosen rather than great riches.', 'He chose a name greater than riches.', 'Choose a name, not great wealth!', 'Great riches will choose a good name.'], correctIndex: 0, explanation: 'Chapter 24 focus: נִבְחָר is a Niphal of בָּחַר with passive force — "is chosen / is to be preferred." מִן makes the comparison ("rather than").', category: 'context-ch24' },
  { id: 'class9-context-ch24-ps22-5', prompt: 'Translate this clause (Psalm 22:5).', hebrew: 'אֵלֶיךָ זָעֲקוּ וְנִמְלָטוּ', options: ['They cried out and he rescued them.', 'To you they cried out and were delivered.', 'Cry out to him and be delivered!', 'They will cry to you and escape.'], correctIndex: 1, explanation: 'Chapter 24 focus: נִמְלָטוּ is a Niphal Perfect 3cp of מָלַט (Ch 24 vocabulary) with passive force, paired with the Qal זָעֲקוּ.', category: 'context-ch24' },
  { id: 'class9-context-ch24-1sam3-20', prompt: 'Translate this clause (1 Samuel 3:20).', hebrew: 'כִּי נֶאֱמָן שְׁמוּאֵל לְנָבִיא', options: ['Samuel believed in the LORD as a prophet.', 'Samuel will be made a prophet.', 'Samuel was established as a prophet.', 'Samuel trusted the word of the prophet.'], correctIndex: 2, explanation: 'Chapter 24 focus: נֶאֱמָן is a I-guttural Niphal participle of אָמַן used predicatively — "confirmed, established, shown to be reliable."', category: 'context-ch24' },
  { id: 'class9-context-ch24-gen2-23', prompt: 'Translate this clause (Genesis 2:23).', hebrew: 'לְזֹאת יִקָּרֵא אִשָּׁה', options: ['She called this one Woman.', 'This one will call to the woman.', 'Let her call this one Woman.', 'This one shall be called Woman.'], correctIndex: 3, explanation: 'Chapter 24 focus: יִקָּרֵא is a Niphal Imperfect with passive force ("shall be called"). The Daghesh Forte in the ק recovers the assimilated stem נ.', category: 'context-ch24' },
];

const chapter25ContextQuestions: PracticeQuestion[] = [
  { id: 'class9-context-ch25-gen21-12', prompt: 'Translate this clause (Genesis 21:12).', hebrew: 'כִּי בְיִצְחָק יִקָּרֵא לְךָ זָרַע', options: ['for through Isaac shall your offspring be named', 'Isaac will call your offspring by name.', 'Call your offspring after Isaac.', 'Your offspring named him Isaac.'], correctIndex: 0, explanation: 'Chapter 25 focus: יִקָּרֵא is a III-א Niphal Imperfect, where the strong-verb diagnostics are fully preserved. זֶרַע is Chapter 19 vocabulary.', category: 'context-ch25' },
  { id: 'class9-context-ch25-gen1-9', prompt: 'Translate this clause (Genesis 1:9).', hebrew: 'וְתֵרָאֶה הַיַּבָּשָׁה', options: ['The dry land saw it.', 'and let the dry land appear', 'The dry land was seen by him.', 'He will see the dry land.'], correctIndex: 1, explanation: 'Chapter 25 focus: תֵּרָאֶה is a III-ה Niphal of רָאָה — literally "let itself be seen," hence "appear." The Seghol-He ending is the III-ה diagnostic.', category: 'context-ch25' },
  { id: 'class9-context-ch25-1sam3-7', prompt: 'Translate this clause (1 Samuel 3:7).', hebrew: 'וְטֶרֶם יִגָּלֶה אֵלָיו דְּבַר־יְהוָה', options: ['He revealed the word of the LORD to him.', 'The word of the LORD came to him first.', 'and the word of the LORD had not yet been revealed to him', 'Let the word of the LORD be revealed to him.'], correctIndex: 2, explanation: 'Chapter 25 focus: יִגָּלֶה is a III-ה Niphal Imperfect of גָּלָה, with both the assimilated stem נ (Daghesh Forte) and the Seghol-He ending. טֶרֶם = "not yet."', category: 'context-ch25' },
  { id: 'class9-context-ch25-isa45-17', prompt: 'Translate this clause (Isaiah 45:17).', hebrew: 'יִשְׂרָאֵל נוֹשַׁע בַּיהוָה', options: ['Israel will save itself by the LORD.', 'Israel called on the LORD for help.', 'The LORD is the salvation of Israel.', 'Israel is saved by the LORD.'], correctIndex: 3, explanation: 'Chapter 25 focus: נוֹשַׁע is the Niphal Perfect of the I-י verb יָשַׁע, where the original Waw resurfaces as a Holem Waw instead of the expected Yod.', category: 'context-ch25' },
];

export const CLASS9_CH23_MEMORY_GROUPS = asGroups(ch23MemoryQuestions);
export const CLASS9_CH24_MEMORY_GROUPS = asGroups(ch24MemoryQuestions);
export const CLASS9_CH25_MEMORY_GROUPS = asGroups(ch25MemoryQuestions);

export const CLASS9_CH23_CONTEXT_GROUPS = asGroups(chapter23ContextQuestions);
export const CLASS9_CH24_CONTEXT_GROUPS = asGroups(chapter24ContextQuestions);
export const CLASS9_CH25_CONTEXT_GROUPS = asGroups(chapter25ContextQuestions);
export const CLASS9_CONTEXT_GROUPS = [
  ...CLASS9_CH23_CONTEXT_GROUPS,
  ...CLASS9_CH24_CONTEXT_GROUPS,
  ...CLASS9_CH25_CONTEXT_GROUPS,
];

export const CLASS9_CH23_GROUPS = [...asGroups(ch23Questions), ...CLASS9_CH23_MEMORY_GROUPS];
export const CLASS9_CH24_GROUPS = [...asGroups(ch24Questions), ...CLASS9_CH24_MEMORY_GROUPS];
export const CLASS9_CH25_GROUPS = [...asGroups(ch25Questions), ...CLASS9_CH25_MEMORY_GROUPS];

export const CLASS9_VERSE_GROUPS = [...asGroups(verseQuestions), ...CLASS9_CONTEXT_GROUPS];
