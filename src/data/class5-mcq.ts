// Class 5 practice — CourseGuide for BBH Chapters 11-13: Hebrew numbers,
// an introduction to the Hebrew verbal system (roots, stems, conjugations,
// parsing), and the Qal Perfect of strong verbs, plus the Chapter 11-13
// "You Should Know" vocabulary and verse-translation practice whose grammar
// stays within Chapters 1-13.

import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function asGroups(questions: PracticeQuestion[]): PracticeQuestionGroup[] {
  return questions.map((question) => ({ id: question.id, questions: [question] }));
}

// Chapter 11 — Hebrew numbers: cardinals, their agreement quirks, and how the
// larger numbers are built.
const numberQuestions: PracticeQuestion[] = [
  { id: 'class5-num-1', prompt: 'The number "one" (אֶחָד) behaves grammatically like a(n):', hebrew: 'אֶחָד', options: ['adjective', 'verb', 'preposition', 'conjunction'], correctIndex: 0, explanation: 'Only אֶחָד ("one") acts like an ADJECTIVE: it follows its noun and agrees with it in gender. Numbers two and higher instead behave like nouns.', category: 'number' },
  { id: 'class5-num-2', prompt: 'Numbers two and higher function grammatically like:', options: ['adverbs', 'nouns', 'adjectives', 'verbs'], correctIndex: 1, explanation: 'From "two" upward, numbers behave like NOUNS — they can stand in construct ("two of..."), take suffixes, and so on.', category: 'number' },
  { id: 'class5-num-3', prompt: 'What does שָׁלֹשׁ mean?', hebrew: 'שָׁלֹשׁ', options: ['two', 'four', 'three', 'five'], correctIndex: 2, explanation: 'שָׁלֹשׁ = "three." The masculine form שְׁלֹשָׁה is used with masculine nouns — one of the counterintuitive agreement patterns of Chapter 11.', category: 'number' },
  { id: 'class5-num-4', prompt: 'What does חָמֵשׁ mean?', hebrew: 'חָמֵשׁ', options: ['five', 'six', 'eight', 'nine'], correctIndex: 0, explanation: 'חָמֵשׁ = "five." The count runs אַרְבַּע (four), חָמֵשׁ (five), שֵׁשׁ (six).', category: 'number' },
  { id: 'class5-num-5', prompt: 'Numbers three through ten have a surprising agreement rule — they:', options: ['have no plural form', 'reverse gender: a masculine-form number counts feminine nouns and vice versa', 'are always definite', 'never take the article'], correctIndex: 1, explanation: 'Counterintuitively, for numbers three through ten the "masculine" form is used with feminine nouns and the "feminine" form with masculine nouns — the well-known reversed (chiastic) agreement.', category: 'number' },
  { id: 'class5-num-6', prompt: 'Translate this construct phrase.', hebrew: 'שְׁנֵי הָאֲנָשִׁים', options: ['the second man', 'the two men', 'a pair of villages', 'both houses'], correctIndex: 1, explanation: 'שְׁנֵי is the construct form of שְׁנַיִם ("two"): "the two men" (literally "two of the men"). Numbers act like nouns and can stand in construct.', category: 'number' },
  { id: 'class5-num-7', prompt: 'How are the numbers eleven through nineteen formed?', options: ['each has its own unique single word', 'by combining the number ten with the numbers one through nine', 'by prefixing the definite article', 'by adding the dual ending ־ַיִם'], correctIndex: 1, explanation: 'Eleven through nineteen are compounds of ten with one through nine (e.g. "one and ten" = eleven, "two and ten" = twelve).', category: 'number' },
  { id: 'class5-num-8', prompt: 'The multiples of ten (twenty, thirty, forty...) are formed by:', options: ['adding the masculine plural ending ־ִים to the base number', 'doubling the first consonant', 'prefixing מ־', 'using a special word for each'], correctIndex: 0, explanation: 'The tens add the plural ־ִים: שְׁלֹשִׁים ("thirty," from שָׁלֹשׁ), אַרְבָּעִים ("forty"), and so on. עֶשְׂרִים ("twenty") is the plural of עֶשֶׂר.', category: 'number' },
  { id: 'class5-num-9', prompt: 'The ordinal numbers ("first," "second," "third") function grammatically like:', options: ['prepositions', 'verbs', 'adjectives', 'conjunctions'], correctIndex: 2, explanation: 'Ordinals such as רִאשׁוֹן ("first") and שֵׁנִי ("second") behave like adjectives, following their noun and agreeing in gender, number, and definiteness.', category: 'number' },
  { id: 'class5-num-10', prompt: 'Translate this phrase (an ordinal used with the article).', hebrew: 'הַיּוֹם הַשְּׁבִיעִי', options: ['the seventh day', 'the seven days', 'day seven began', 'a day of rest'], correctIndex: 0, explanation: 'הַשְּׁבִיעִי is the ordinal "seventh" with the article, agreeing with הַיּוֹם ("the day"): "the seventh day" — the day God rested (Gen 2:2).', category: 'number' },
];

// The masculine absolute cardinals one through ten (the paradigm to memorize),
// followed by the large cardinals one hundred, one thousand, and ten thousand.
// English-only options keep every choice distinct in meaning (never four
// look-alike Hebrew forms), and each explanation names the feminine counterpart.
const cardinalMemoryQuestions: PracticeQuestion[] = [
  { id: 'class5-card-1', prompt: 'What number is אֶחָד (masculine)?', hebrew: 'אֶחָד', transliteration: 'echad', options: ['two', 'one', 'ten', 'three'], correctIndex: 1, explanation: 'אֶחָד (echad) = "one," the masculine form; the feminine is אַחַת. From the Shema: יְהוָה אֶחָד ("the LORD is one").', category: 'number-memory' },
  { id: 'class5-card-2', prompt: 'What number is שְׁנַיִם (masculine)?', hebrew: 'שְׁנַיִם', transliteration: 'shnayim', options: ['two', 'seven', 'nine', 'four'], correctIndex: 0, explanation: 'שְׁנַיִם (shnayim) = "two" (masculine); the feminine is שְׁתַּיִם. Its construct form is שְׁנֵי ("two of").', category: 'number-memory' },
  { id: 'class5-card-3', prompt: 'What number is שְׁלֹשָׁה (masculine)?', hebrew: 'שְׁלֹשָׁה', transliteration: 'shloshah', options: ['six', 'eight', 'three', 'five'], correctIndex: 2, explanation: 'שְׁלֹשָׁה (shloshah) = "three," the masculine form (the feminine is שָׁלֹשׁ). For three through ten the masculine number ends in ־ָה.', category: 'number-memory' },
  { id: 'class5-card-4', prompt: 'What number is אַרְבָּעָה (masculine)?', hebrew: 'אַרְבָּעָה', transliteration: 'arbaah', options: ['nine', 'ten', 'two', 'four'], correctIndex: 3, explanation: 'אַרְבָּעָה (arbaah) = "four" (masculine; feminine אַרְבַּע). "Forty" is אַרְבָּעִים.', category: 'number-memory' },
  { id: 'class5-card-5', prompt: 'What number is חֲמִשָּׁה (masculine)?', hebrew: 'חֲמִשָּׁה', transliteration: 'chamishah', options: ['seven', 'five', 'three', 'six'], correctIndex: 1, explanation: 'חֲמִשָּׁה (chamishah) = "five" (masculine; feminine חָמֵשׁ).', category: 'number-memory' },
  { id: 'class5-card-6', prompt: 'What number is שִׁשָּׁה (masculine)?', hebrew: 'שִׁשָּׁה', transliteration: 'shishah', options: ['ten', 'eight', 'four', 'six'], correctIndex: 3, explanation: 'שִׁשָּׁה (shishah) = "six" (masculine; feminine שֵׁשׁ). Creation is completed in שֵׁשֶׁת יָמִים ("six days").', category: 'number-memory' },
  { id: 'class5-card-7', prompt: 'What number is שִׁבְעָה (masculine)?', hebrew: 'שִׁבְעָה', transliteration: 'shivah', options: ['nine', 'five', 'seven', 'two'], correctIndex: 2, explanation: 'שִׁבְעָה (shivah) = "seven" (masculine; feminine שֶׁבַע), the "sabbath" number.', category: 'number-memory' },
  { id: 'class5-card-8', prompt: 'What number is שְׁמֹנָה (masculine)?', hebrew: 'שְׁמֹנָה', transliteration: 'shmonah', options: ['eight', 'three', 'ten', 'six'], correctIndex: 0, explanation: 'שְׁמֹנָה (shmonah) = "eight" (masculine; feminine שְׁמֹנֶה). Circumcision came on the eighth day (Gen 17:12).', category: 'number-memory' },
  { id: 'class5-card-9', prompt: 'What number is תִּשְׁעָה (masculine)?', hebrew: 'תִּשְׁעָה', transliteration: 'tishah', options: ['four', 'seven', 'ten', 'nine'], correctIndex: 3, explanation: 'תִּשְׁעָה (tishah) = "nine" (masculine; feminine תֵּשַׁע). "Ninety" is תִּשְׁעִים.', category: 'number-memory' },
  { id: 'class5-card-10', prompt: 'What number is עֲשָׂרָה (masculine)?', hebrew: 'עֲשָׂרָה', transliteration: 'asarah', options: ['five', 'eight', 'ten', 'two'], correctIndex: 2, explanation: 'עֲשָׂרָה (asarah) = "ten" (masculine; feminine עֶשֶׂר). Its plural עֶשְׂרִים = "twenty."', category: 'number-memory' },
  { id: 'class5-card-100', prompt: 'What number is מֵאָה?', hebrew: 'מֵאָה', transliteration: 'meah', options: ['one thousand', 'one hundred', 'ten thousand', 'ten'], correctIndex: 1, explanation: 'מֵאָה (meah) = "one hundred." Its plural מֵאוֹת ("hundreds") builds 200–900 (e.g. שְׁלֹשׁ מֵאוֹת = "three hundred").', category: 'number-memory' },
  { id: 'class5-card-1000', prompt: 'What number is אֶלֶף?', hebrew: 'אֶלֶף', transliteration: 'eleph', options: ['one hundred', 'ten thousand', 'ten', 'one thousand'], correctIndex: 3, explanation: 'אֶלֶף (eleph) = "one thousand"; the plural אֲלָפִים ("thousands") builds the higher thousands.', category: 'number-memory' },
  { id: 'class5-card-10000', prompt: 'What number is רְבָבָה?', hebrew: 'רְבָבָה', transliteration: 'revavah', options: ['one hundred', 'one thousand', 'ten thousand', 'a hundred thousand'], correctIndex: 2, explanation: 'רְבָבָה (revavah) = "ten thousand," a myriad — the largest single number-word in Biblical Hebrew.', category: 'number-memory' },
];

// The masculine ordinals first through tenth. Ordinals are adjectives; from
// "third" up they add the ־ִי ending to the cardinal base. English-only options.
const ordinalMemoryQuestions: PracticeQuestion[] = [
  { id: 'class5-ord-1', prompt: 'Which ordinal is רִאשׁוֹן?', hebrew: 'רִאשׁוֹן', transliteration: 'rishon', options: ['first', 'second', 'third', 'fourth'], correctIndex: 0, explanation: 'רִאשׁוֹן (rishon) = "first," from רֹאשׁ ("head"). Ordinals are adjectives — they follow the noun and agree with it.', category: 'number-memory' },
  { id: 'class5-ord-2', prompt: 'Which ordinal is שֵׁנִי?', hebrew: 'שֵׁנִי', transliteration: 'sheni', options: ['third', 'first', 'fourth', 'second'], correctIndex: 3, explanation: 'שֵׁנִי (sheni) = "second," related to שְׁנַיִם ("two").', category: 'number-memory' },
  { id: 'class5-ord-3', prompt: 'Which ordinal is שְׁלִישִׁי?', hebrew: 'שְׁלִישִׁי', transliteration: 'shelishi', options: ['sixth', 'third', 'fifth', 'second'], correctIndex: 1, explanation: 'שְׁלִישִׁי (shelishi) = "third." From "third" on, ordinals add the ־ִי ending to the cardinal base.', category: 'number-memory' },
  { id: 'class5-ord-4', prompt: 'Which ordinal is רְבִיעִי?', hebrew: 'רְבִיעִי', transliteration: 'revii', options: ['second', 'fifth', 'fourth', 'third'], correctIndex: 2, explanation: 'רְבִיעִי (revii) = "fourth," built on אַרְבַּע ("four").', category: 'number-memory' },
  { id: 'class5-ord-5', prompt: 'Which ordinal is חֲמִישִׁי?', hebrew: 'חֲמִישִׁי', transliteration: 'chamishi', options: ['seventh', 'third', 'sixth', 'fifth'], correctIndex: 3, explanation: 'חֲמִישִׁי (chamishi) = "fifth," built on חָמֵשׁ ("five").', category: 'number-memory' },
  { id: 'class5-ord-6', prompt: 'Which ordinal is שִׁשִּׁי?', hebrew: 'שִׁשִּׁי', transliteration: 'shishi', options: ['sixth', 'fourth', 'ninth', 'tenth'], correctIndex: 0, explanation: 'שִׁשִּׁי (shishi) = "sixth," built on שֵׁשׁ ("six").', category: 'number-memory' },
  { id: 'class5-ord-7', prompt: 'Which ordinal is שְׁבִיעִי?', hebrew: 'שְׁבִיעִי', transliteration: 'shevii', options: ['ninth', 'seventh', 'fifth', 'second'], correctIndex: 1, explanation: 'שְׁבִיעִי (shevii) = "seventh" — as in הַיּוֹם הַשְּׁבִיעִי ("the seventh day"), the day of rest.', category: 'number-memory' },
  { id: 'class5-ord-8', prompt: 'Which ordinal is שְׁמִינִי?', hebrew: 'שְׁמִינִי', transliteration: 'shemini', options: ['tenth', 'sixth', 'fourth', 'eighth'], correctIndex: 3, explanation: 'שְׁמִינִי (shemini) = "eighth" — the day of circumcision (Gen 17:12).', category: 'number-memory' },
  { id: 'class5-ord-9', prompt: 'Which ordinal is תְּשִׁיעִי?', hebrew: 'תְּשִׁיעִי', transliteration: 'teshii', options: ['fourth', 'seventh', 'ninth', 'first'], correctIndex: 2, explanation: 'תְּשִׁיעִי (teshii) = "ninth," built on תֵּשַׁע ("nine").', category: 'number-memory' },
  { id: 'class5-ord-10', prompt: 'Which ordinal is עֲשִׂירִי?', hebrew: 'עֲשִׂירִי', transliteration: 'asiri', options: ['tenth', 'eighth', 'fifth', 'sixth'], correctIndex: 0, explanation: 'עֲשִׂירִי (asiri) = "tenth." Beyond "tenth," ordinals are expressed with the cardinal numbers.', category: 'number-memory' },
];

// Chapter 12 — Introduction to Hebrew verbs: roots, stems, conjugations,
// parsing, and word order.
const verbQuestions: PracticeQuestion[] = [
  { id: 'class5-verb-1', prompt: 'How many consonants does a typical Hebrew verb root have?', options: ['two', 'three (triconsonantal)', 'four', 'it varies with each verb'], correctIndex: 1, explanation: 'Most Hebrew roots are triconsonantal — three root consonants carry the core meaning, while vowels and affixes build the various forms.', category: 'verb-intro' },
  { id: 'class5-verb-2', prompt: 'A single Hebrew verb form tells you the verb\'s:', options: ['tense only', 'meaning only', 'person, gender, and number', 'gender only'], correctIndex: 2, explanation: 'Inflection encodes person, gender, and number, so one word (e.g. כָּתַבְתִּי) can translate as a full "I wrote."', category: 'verb-intro' },
  { id: 'class5-verb-3', prompt: 'How many verbal STEMS (binyanim) does Hebrew have?', options: ['seven', 'three', 'five', 'ten'], correctIndex: 0, explanation: 'Seven stems: the Qal and six derived stems (Niphal, Piel, Pual, Hiphil, Hophal, Hithpael). The stem signals the type and voice of the action.', category: 'verb-intro' },
  { id: 'class5-verb-4', prompt: 'The three categories of verbal ACTION a stem can express are:', options: ['past, present, future', 'simple, intensive, causative', 'active, passive, reflexive', 'strong, weak, mixed'], correctIndex: 1, explanation: 'Verbal ACTION is simple, intensive, or causative. Verbal VOICE (active/passive/reflexive) is the separate second dimension a stem encodes.', category: 'verb-intro' },
  { id: 'class5-verb-5', prompt: 'The three categories of verbal VOICE are:', options: ['simple, intensive, causative', 'qal, piel, hiphil', 'active, passive, reflexive', 'past, present, future'], correctIndex: 2, explanation: 'Verbal VOICE is active, passive, or reflexive — how the subject relates to the action. Stem = action-type × voice.', category: 'verb-intro' },
  { id: 'class5-verb-6', prompt: 'How many CONJUGATIONS can a Hebrew verb take?', options: ['three', 'four', 'five', 'six'], correctIndex: 3, explanation: 'Six conjugations: Perfect, Imperfect, Imperative, Infinitive Construct, Infinitive Absolute, and Participle.', category: 'verb-intro' },
  { id: 'class5-verb-7', prompt: 'A "weak" verb is one that:', options: ['has at least one weak root consonant that causes spelling changes', 'has four root letters', 'occurs only rarely in the Bible', 'is always stative'], correctIndex: 0, explanation: 'A weak verb has a weak root consonant (a guttural, נ, י, ו, or a repeated letter) that triggers predictable changes. A strong verb has none.', category: 'verb-intro' },
  { id: 'class5-verb-8', prompt: 'The lexical (dictionary) form under which a Hebrew verb is listed is the:', options: ['Qal Imperfect 3ms', 'Qal Perfect 3ms', 'Qal Participle', 'Imperative 2ms'], correctIndex: 1, explanation: 'Verbs are listed by their Qal Perfect 3ms form (e.g. כָּתַב "he wrote") — that is the form you look up.', category: 'verb-intro' },
  { id: 'class5-verb-9', prompt: 'To "parse" a Hebrew verb is to identify its:', options: ['meaning only', 'tense and mood only', 'gender and number only', 'stem, conjugation, person, gender, number, and lexical form'], correctIndex: 3, explanation: 'Parsing lists everything needed to translate and look up the verb: stem, conjugation, person, gender, number, and lexical form.', category: 'verb-intro' },
  { id: 'class5-verb-10', prompt: 'The default word order of a Hebrew verbal sentence is:', options: ['subject–verb–object', 'verb–subject–object', 'object–subject–verb', 'subject–object–verb'], correctIndex: 1, explanation: 'The normal order is Verb–Subject–Object (with frequent exceptions for emphasis), unlike English Subject–Verb–Object.', category: 'verb-intro' },
];

// Chapter 12 stem-and-conjugation recall. English-only options — the point is
// to memorize which binyan carries which action and voice.
const verbMemoryQuestions: PracticeQuestion[] = [
  { id: 'class5-memory-verb-qal', prompt: 'Which stem expresses SIMPLE action in the ACTIVE voice?', options: ['Qal', 'Piel', 'Hiphil', 'Niphal'], correctIndex: 0, explanation: 'The Qal is the simple active stem — the most common binyan and the basis for the whole verbal system.', category: 'verb-memory' },
  { id: 'class5-memory-verb-niphal', prompt: 'Which stem most commonly expresses SIMPLE action in the PASSIVE (or reflexive) voice?', options: ['Piel', 'Niphal', 'Hophal', 'Qal'], correctIndex: 1, explanation: 'The Niphal is normally the simple passive/reflexive counterpart of the Qal ("he was killed" / "he killed himself").', category: 'verb-memory' },
  { id: 'class5-memory-verb-piel', prompt: 'Which stem expresses INTENSIVE action in the ACTIVE voice?', options: ['Hithpael', 'Hophal', 'Piel', 'Niphal'], correctIndex: 2, explanation: 'The Piel is the intensive active stem (e.g. שִׁבֵּר "he shattered" versus Qal שָׁבַר "he broke").', category: 'verb-memory' },
  { id: 'class5-memory-verb-pual', prompt: 'Which stem expresses INTENSIVE action in the PASSIVE voice?', options: ['Pual', 'Piel', 'Hiphil', 'Qal'], correctIndex: 0, explanation: 'The Pual is the passive counterpart of the Piel — intensive action received rather than done.', category: 'verb-memory' },
  { id: 'class5-memory-verb-hiphil', prompt: 'Which stem expresses CAUSATIVE action in the ACTIVE voice?', options: ['Niphal', 'Hophal', 'Hiphil', 'Pual'], correctIndex: 2, explanation: 'The Hiphil is the causative active stem ("he caused to reign" = "he made king"), one of the most frequent derived stems.', category: 'verb-memory' },
  { id: 'class5-memory-verb-hophal', prompt: 'Which stem expresses CAUSATIVE action in the PASSIVE voice?', options: ['Hophal', 'Hiphil', 'Hithpael', 'Piel'], correctIndex: 0, explanation: 'The Hophal is the passive counterpart of the Hiphil — the subject is caused to undergo the action.', category: 'verb-memory' },
  { id: 'class5-memory-verb-hithpael', prompt: 'Which stem most often expresses REFLEXIVE (intensive) action — acting on oneself?', options: ['Qal', 'Pual', 'Niphal', 'Hithpael'], correctIndex: 3, explanation: 'The Hithpael typically carries reflexive or reciprocal force (e.g. הִתְהַלֵּךְ "he walked himself about, walked back and forth").', category: 'verb-memory' },
  { id: 'class5-memory-verb-perfect', prompt: 'The Perfect is also called the ___ conjugation, because its endings attach to the end of the root.', options: ['prefix', 'suffix', 'infix', 'reduplicating'], correctIndex: 1, explanation: 'The Perfect is the "suffix conjugation": sufformatives are added AFTER the root (קָטַלְתִּי). The Imperfect, by contrast, is the "prefix conjugation."', category: 'verb-memory' },
  { id: 'class5-memory-verb-imperfect', prompt: 'The Imperfect is also called the ___ conjugation.', options: ['suffix', 'stative', 'prefix', 'passive'], correctIndex: 2, explanation: 'The Imperfect is the "prefix conjugation": its preformatives attach BEFORE the root (יִקְטֹל). You meet it fully in Chapter 15.', category: 'verb-memory' },
  { id: 'class5-memory-verb-lexical', prompt: 'When you parse כָּתְבוּ as "Qal Perfect 3cp of כָּתַב," the last item (כָּתַב) is the verb\'s:', options: ['stem', 'conjugation', 'lexical (dictionary) form', 'person'], correctIndex: 2, explanation: 'The lexical form is the Qal Perfect 3ms you look up in the dictionary — here כָּתַב, "he wrote."', category: 'verb-memory' },
];

// Chapter 13 — the Qal Perfect of strong verbs: completed action and the
// suffix (sufformative) conjugation.
const qalQuestions: PracticeQuestion[] = [
  { id: 'class5-qal-1', prompt: 'The Perfect conjugation normally describes ___ action and is usually translated with the English ___.', options: ['completed; past tense', 'ongoing; present tense', 'incomplete; future tense', 'commanded; imperative'], correctIndex: 0, explanation: 'The Perfect describes completed action, most often rendered with the English past ("he wrote"). It also covers the present perfect and, for statives, a present state.', category: 'qal-perfect' },
  { id: 'class5-qal-2', prompt: 'The Qal Perfect 3ms of a strong verb has which vowel pattern?', options: ['shewa–holem (קְטֹל)', 'qamets–pathach (קָטַל)', 'tsere under both consonants', 'hireq–qamets'], correctIndex: 1, explanation: 'The paradigm form is qamets–pathach: קָטַל ("he killed"), כָּתַב ("he wrote"), שָׁמַר ("he kept").', category: 'qal-perfect' },
  { id: 'class5-qal-3', prompt: 'The Perfect sufformatives (־תִּי, ־תָּ, ־נוּ, ...) are added to the root in order to mark:', options: ['the definite article', 'tense alone', 'person, gender, and number', 'the direct object'], correctIndex: 2, explanation: 'The endings encode person, gender, and number. That is why the Perfect is called the "suffix conjugation."', category: 'qal-perfect' },
  { id: 'class5-qal-4', prompt: 'Which particle is placed immediately before a verb to negate it?', options: ['הַ', 'אֵת', 'וְ', 'לֹא'], correctIndex: 3, explanation: 'לֹא ("not") negates the verb and stands directly in front of it: לֹא שָׁמַר = "he did not keep."', category: 'qal-perfect' },
  { id: 'class5-qal-5', prompt: 'Translate this Qal Perfect verb.', hebrew: 'שָׁמַרְתִּי', options: ['I kept / guarded', 'he kept', 'we kept', 'they kept'], correctIndex: 0, explanation: 'שָׁמַר ("keep, guard") + the 1cs sufformative ־תִּי = "I kept." The ־תִּי ending is the sign of "I."', category: 'qal-perfect' },
  { id: 'class5-qal-6', prompt: 'Translate this Qal Perfect clause.', hebrew: 'זָכַרְנוּ אֶת־הַבְּרִית', options: ['I remembered the covenant', 'they remembered the covenant', 'we remembered the covenant', 'we remembered with the covenant'], correctIndex: 2, explanation: 'זָכַר ("remember") + the 1cp sufformative ־נוּ = "we remembered"; אֶת־ marks the definite object הַבְּרִית ("the covenant").', category: 'qal-perfect' },
  { id: 'class5-qal-7', prompt: 'A STATIVE verb such as כָּבֵד ("to be heavy, honored"):', options: ['is always causative', 'means "to make heavy"', 'always takes a direct object', 'describes a state of being rather than an action done to an object'], correctIndex: 3, explanation: 'Stative verbs describe a state ("to be heavy/old/full") rather than an action on an object. Note the qamets–tsere pattern (כָּבֵד) of one class of statives.', category: 'qal-perfect' },
  { id: 'class5-qal-8', prompt: 'Translate this Qal Perfect verb (√m-l-k).', hebrew: 'מָלַךְ', options: ['he wrote', 'he reigned / became king', 'he remembered', 'he found'], correctIndex: 1, explanation: 'מָלַךְ = "he reigned / became king" (Qal Perfect 3ms). "The LORD reigns" (יְהוָה מָלָךְ) uses this verb.', category: 'qal-perfect' },
  { id: 'class5-qal-9', prompt: 'In the Qal Perfect, the ending ־תָּ (as in שָׁמַרְתָּ) marks which person, gender, and number?', options: ['first person common singular ("I")', 'second person masculine singular ("you," to a man)', 'third person masculine singular ("he")', 'first person plural ("we")'], correctIndex: 1, explanation: '־תָּ is the 2ms sufformative: שָׁמַרְתָּ = "you (m.) kept." Compare ־תִּי ("I") and ־נוּ ("we").', category: 'qal-perfect' },
  { id: 'class5-qal-10', prompt: 'Translate this Qal Perfect verb (√m-ṣ-ʾ).', hebrew: 'מָצָא', options: ['he kept', 'he remembered', 'he found', 'he wrote'], correctIndex: 2, explanation: 'מָצָא = "he found" (Qal Perfect 3ms), as in נֹחַ מָצָא חֵן ("Noah found favor," Gen 6:8).', category: 'qal-perfect' },
];

// Chapter 13 paradigm recall: parse the Qal Perfect strong forms of קטל
// (the standard paradigm verb) by person, gender, and number. English-only
// options, so no two answers are look-alike Hebrew forms.
const qalMemoryQuestions: PracticeQuestion[] = [
  { id: 'class5-memory-qal-3ms', prompt: 'Parse this Qal Perfect form.', hebrew: 'קָטַל', transliteration: 'qatal', options: ['3ms — "he killed"', '3fs — "she killed"', '1cs — "I killed"', '2ms — "you killed"'], correctIndex: 0, explanation: 'קָטַל is the base 3ms form ("he killed"), the paradigm and lexical form, with no sufformative added.', category: 'qal-memory' },
  { id: 'class5-memory-qal-3fs', prompt: 'Parse this Qal Perfect form.', hebrew: 'קָטְלָה', transliteration: 'qatlah', options: ['2fs — "you killed"', '3fs — "she killed"', '1cp — "we killed"', '3cp — "they killed"'], correctIndex: 1, explanation: 'The ־ָה ending marks 3fs: קָטְלָה = "she killed." The accent shift reduces the first vowel to shewa.', category: 'qal-memory' },
  { id: 'class5-memory-qal-2ms', prompt: 'Parse this Qal Perfect form.', hebrew: 'קָטַלְתָּ', transliteration: 'qatalta', options: ['1cs — "I killed"', '3ms — "he killed"', '2ms — "you (m.) killed"', '2fs — "you (f.) killed"'], correctIndex: 2, explanation: 'The ־תָּ ending marks 2ms: קָטַלְתָּ = "you (m.) killed."', category: 'qal-memory' },
  { id: 'class5-memory-qal-2fs', prompt: 'Parse this Qal Perfect form.', hebrew: 'קָטַלְתְּ', transliteration: 'qatalt', options: ['2fs — "you (f.) killed"', '2ms — "you (m.) killed"', '3fs — "she killed"', '1cs — "I killed"'], correctIndex: 0, explanation: 'The ־תְּ ending (silent shewa) marks 2fs: קָטַלְתְּ = "you (f.) killed." Distinguish it from 2ms ־תָּ.', category: 'qal-memory' },
  { id: 'class5-memory-qal-1cs', prompt: 'Parse this Qal Perfect form.', hebrew: 'קָטַלְתִּי', transliteration: 'qatalti', options: ['1cp — "we killed"', '2ms — "you killed"', '3cp — "they killed"', '1cs — "I killed"'], correctIndex: 3, explanation: 'The ־תִּי ending marks 1cs: קָטַלְתִּי = "I killed" (common to both genders).', category: 'qal-memory' },
  { id: 'class5-memory-qal-3cp', prompt: 'Parse this Qal Perfect form.', hebrew: 'קָטְלוּ', transliteration: 'qatlu', options: ['3cp — "they killed"', '2mp — "you all killed"', '1cp — "we killed"', '3fs — "she killed"'], correctIndex: 0, explanation: 'The ־וּ ending marks 3cp: קָטְלוּ = "they killed" (one plural form for both genders).', category: 'qal-memory' },
  { id: 'class5-memory-qal-2mp', prompt: 'Parse this Qal Perfect form.', hebrew: 'קְטַלְתֶּם', transliteration: 'qetaltem', options: ['1cp — "we killed"', '3cp — "they killed"', '2mp — "you (m. pl.) killed"', '2fp — "you (f. pl.) killed"'], correctIndex: 2, explanation: 'The ־תֶּם ending marks 2mp: קְטַלְתֶּם = "you (masculine plural) killed." Note the vowel reduction under the first consonant.', category: 'qal-memory' },
  { id: 'class5-memory-qal-2fp', prompt: 'Parse this Qal Perfect form.', hebrew: 'קְטַלְתֶּן', transliteration: 'qetalten', options: ['2fp — "you (f. pl.) killed"', '2mp — "you (m. pl.) killed"', '3cp — "they killed"', '1cp — "we killed"'], correctIndex: 0, explanation: 'The ־תֶּן ending marks 2fp: קְטַלְתֶּן = "you (feminine plural) killed." Like 2mp ־תֶּם, the accent shifts to the ending, so the first vowel reduces to shewa (קְ).', category: 'qal-memory' },
  { id: 'class5-memory-qal-1cp', prompt: 'Parse this Qal Perfect form.', hebrew: 'קָטַלְנוּ', transliteration: 'qatalnu', options: ['1cp — "we killed"', '1cs — "I killed"', '3cp — "they killed"', '2mp — "you all killed"'], correctIndex: 0, explanation: 'The ־נוּ ending marks 1cp: קָטַלְנוּ = "we killed." Do not confuse it with 1cs ־תִּי ("I").', category: 'qal-memory' },
  { id: 'class5-memory-qal-suffix-set', prompt: 'Which of these is the correct 3ms → 1cs → 1cp set of Qal Perfect sufformatives?', options: ['(none), ־תָּ, ־תֶּם', '(none), ־תִּי, ־נוּ', '־ָה, ־וּ, ־תֶּן', '־תְּ, ־תָּ, ־נוּ'], correctIndex: 1, explanation: '3ms has no ending, 1cs is ־תִּי ("I"), and 1cp is ־נוּ ("we"): קָטַל, קָטַלְתִּי, קָטַלְנוּ.', category: 'qal-memory' },
  { id: 'class5-memory-qal-katav', prompt: 'The Qal Perfect 3ms כָּתַב is the lexical form of which verb, and what does it mean?', hebrew: 'כָּתַב', transliteration: 'katav', options: ['"to keep" — "he kept"', '"to remember" — "he remembered"', '"to write" — "he wrote"', '"to reign" — "he reigned"'], correctIndex: 2, explanation: 'כָּתַב ("to write") is a model strong verb; its 3ms Qal Perfect means "he wrote" and is the dictionary form.', category: 'qal-memory' },
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

// Chapter 11-13 "You Should Know" vocabulary — the high-frequency Qal verbs of
// Chapters 12-13 plus the numbers of Chapter 11.
export const CLASS5_WORD_GROUPS: PracticeQuestionGroup[] = [
  wordGroup({ id: 'class5-word-akhal', hebrew: 'אָכַל', transliteration: 'akhal', transliterationOptions: ['akhal', 'amar', 'asah', 'halakh'], transliterationCorrectIndex: 0, meaning: 'to eat, consume', meaningOptions: ['to eat, consume', 'to say', 'to do', 'to walk'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class5-word-amar', hebrew: 'אָמַר', transliteration: 'amar', transliterationOptions: ['akhal', 'amar', 'natan', 'asah'], transliterationCorrectIndex: 1, meaning: 'to say, speak', meaningOptions: ['to eat', 'to say, speak', 'to give', 'to do'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class5-word-hayah', hebrew: 'הָיָה', transliteration: 'hayah', transliterationOptions: ['halakh', 'yada', 'hayah', 'yashav'], transliterationCorrectIndex: 2, meaning: 'to be, become, happen', meaningOptions: ['to walk', 'to know', 'to be, become, happen', 'to sit'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class5-word-halakh', hebrew: 'הָלַךְ', transliteration: 'halakh', transliterationOptions: ['hayah', 'amar', 'yashav', 'halakh'], transliterationCorrectIndex: 3, meaning: 'to go, walk', meaningOptions: ['to be', 'to say', 'to sit', 'to go, walk'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class5-word-zakhar', hebrew: 'זָכַר', transliteration: 'zakhar', transliterationOptions: ['zakhar', 'shamar', 'qara', 'matsa'], transliterationCorrectIndex: 0, meaning: 'to remember', meaningOptions: ['to remember', 'to keep', 'to call', 'to find'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class5-word-yada', hebrew: 'יָדַע', transliteration: 'yada', transliterationOptions: ['yashav', 'yada', 'yatsa', 'natan'], transliterationCorrectIndex: 1, meaning: 'to know, perceive', meaningOptions: ['to sit', 'to know, perceive', 'to go out', 'to give'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class5-word-yashav', hebrew: 'יָשַׁב', transliteration: 'yashav', transliterationOptions: ['yada', 'yatsa', 'yashav', 'natan'], transliterationCorrectIndex: 2, meaning: 'to sit, dwell, inhabit', meaningOptions: ['to know', 'to go out', 'to sit, dwell, inhabit', 'to give'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class5-word-katav', hebrew: 'כָּתַב', transliteration: 'katav', transliterationOptions: ['kavod', 'qara', 'shamar', 'katav'], transliterationCorrectIndex: 3, meaning: 'to write, record', meaningOptions: ['glory', 'to call', 'to keep', 'to write, record'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class5-word-laqach', hebrew: 'לָקַח', transliteration: 'laqach', transliterationOptions: ['laqach', 'malakh', 'natan', 'amar'], transliterationCorrectIndex: 0, meaning: 'to take, receive', meaningOptions: ['to take, receive', 'to reign', 'to give', 'to say'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class5-word-malakh', hebrew: 'מָלַךְ', transliteration: 'malakh', transliterationOptions: ['matsa', 'malakh', 'halakh', 'shamar'], transliterationCorrectIndex: 1, meaning: 'to reign, be king', meaningOptions: ['to find', 'to reign, be king', 'to walk', 'to keep'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class5-word-matsa', hebrew: 'מָצָא', transliteration: 'matsa', transliterationOptions: ['malakh', 'natan', 'matsa', 'qara'], transliterationCorrectIndex: 2, meaning: 'to find, attain', meaningOptions: ['to reign', 'to give', 'to find, attain', 'to call'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class5-word-natan', hebrew: 'נָתַן', transliteration: 'natan', transliterationOptions: ['nasa', 'matsa', 'laqach', 'natan'], transliterationCorrectIndex: 3, meaning: 'to give, put, place', meaningOptions: ['to lift', 'to find', 'to take', 'to give, put, place'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class5-word-asah', hebrew: 'עָשָׂה', transliteration: 'asah', transliterationOptions: ['asah', 'amar', 'akhal', 'raah'], transliterationCorrectIndex: 0, meaning: 'to do, make', meaningOptions: ['to do, make', 'to say', 'to eat', 'to see'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class5-word-qara', hebrew: 'קָרָא', transliteration: 'qara', transliterationOptions: ['qatal', 'qara', 'qum', 'qadosh'], transliterationCorrectIndex: 1, meaning: 'to call, proclaim, read', meaningOptions: ['to kill', 'to call, proclaim, read', 'to arise', 'holy'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class5-word-shamar', hebrew: 'שָׁמַר', transliteration: 'shamar', transliterationOptions: ['shalach', 'shama', 'shamar', 'shafat'], transliterationCorrectIndex: 2, meaning: 'to keep, watch, guard', meaningOptions: ['to send', 'to hear', 'to keep, watch, guard', 'to judge'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class5-word-shalach', hebrew: 'שָׁלַח', transliteration: 'shalach', transliterationOptions: ['shamar', 'shama', 'shafat', 'shalach'], transliterationCorrectIndex: 3, meaning: 'to send, stretch out', meaningOptions: ['to keep', 'to hear', 'to judge', 'to send, stretch out'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class5-word-shama', hebrew: 'שָׁמַע', transliteration: 'shama', transliterationOptions: ['shama', 'shamar', 'shalach', 'shafat'], transliterationCorrectIndex: 0, meaning: 'to hear, listen, obey', meaningOptions: ['to hear, listen, obey', 'to keep', 'to send', 'to judge'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class5-word-echad', hebrew: 'אֶחָד', transliteration: 'echad', transliterationOptions: ['eser', 'echad', 'arba', 'sheva'], transliterationCorrectIndex: 1, meaning: 'one', meaningOptions: ['ten', 'one', 'four', 'seven'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class5-word-sheva', hebrew: 'שֶׁבַע', transliteration: 'sheva', transliterationOptions: ['shesh', 'shalosh', 'sheva', 'shmoneh'], transliterationCorrectIndex: 2, meaning: 'seven', meaningOptions: ['six', 'three', 'seven', 'eight'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class5-word-eser', hebrew: 'עֶשֶׂר', transliteration: 'eser', transliterationOptions: ['echad', 'chamesh', 'sheva', 'eser'], transliterationCorrectIndex: 3, meaning: 'ten', meaningOptions: ['one', 'five', 'seven', 'ten'], meaningCorrectIndex: 3 }),
];

// Verse translation — familiar clauses whose focus grammar is numbers (Ch 11)
// and Qal Perfect verbs (Ch 13). Options are English only; the Hebrew is shown.
const verseQuestions: PracticeQuestion[] = [
  { id: 'class5-verse-1', prompt: 'Translate this verse (Genesis 1:1).', hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ', options: ['In the beginning God created the heavens and the earth.', 'The heavens and the earth belong to God.', 'In the beginning was the Word.', 'God made the great lights.'], correctIndex: 0, explanation: 'בָּרָא ("created") is a Qal Perfect 3ms verb (Ch 13); אֵת is the untranslated object marker (Ch 6); הַשָּׁמַיִם / הָאָרֶץ take the article (Ch 5).', category: 'verse' },
  { id: 'class5-verse-2', prompt: 'Translate this clause (Psalm 93:1).', hebrew: 'יְהוָה מָלָךְ', options: ['The LORD is my king.', 'The LORD is one.', 'The LORD reigns.', 'The LORD is God.'], correctIndex: 2, explanation: 'מָלָךְ = "he reigns / has become king," a Qal Perfect 3ms verb (Ch 13). The Perfect of this verb reads as a present state: "The LORD reigns."', category: 'verse' },
  { id: 'class5-verse-3', prompt: 'Translate this clause (Genesis 1:5).', hebrew: 'וַיְהִי־עֶרֶב וַיְהִי־בֹקֶר יוֹם אֶחָד', options: ['And God called the light Day.', 'And there was evening and there was morning, one day.', 'And God saw that it was good.', 'And God rested on the seventh day.'], correctIndex: 1, explanation: 'יוֹם אֶחָד = "one day / day one," using the number אֶחָד (Ch 11). עֶרֶב ("evening") and בֹקֶר ("morning") are Chapter 9 vocabulary.', category: 'verse' },
  { id: 'class5-verse-4', prompt: 'Translate this clause (Exodus 20:11).', hebrew: 'שֵׁשֶׁת יָמִים עָשָׂה יְהוָה', options: ['The LORD rested on the seventh day.', 'The heavens belong to the LORD.', 'In six days the LORD made [the heavens].', 'The LORD blessed the seventh day.'], correctIndex: 2, explanation: 'שֵׁשֶׁת ("six," Ch 11) + יָמִים ("days"); עָשָׂה ("made") is a Qal Perfect 3ms verb (Ch 12). Word order is Verb–Subject.', category: 'verse' },
  { id: 'class5-verse-5', prompt: 'Translate this clause (Psalm 118:24).', hebrew: 'זֶה־הַיּוֹם עָשָׂה יְהוָה', options: ['This is the word the LORD has spoken.', 'This is the house of the LORD.', 'This is the way; walk in it.', 'This is the day that the LORD has made.'], correctIndex: 3, explanation: 'The demonstrative זֶה ("this," Ch 8) fronts the clause; עָשָׂה ("has made") is a Qal Perfect 3ms verb (Ch 13): "This is the day the LORD has made."', category: 'verse' },
  { id: 'class5-verse-6', prompt: 'Translate this clause (Psalm 135:5).', hebrew: 'אֲנִי יָדַעְתִּי כִּי־גָדוֹל יְהוָה', options: ['I know that the LORD is great.', 'The LORD makes himself known.', 'Know that the LORD is God.', 'I trust in the LORD my God.'], correctIndex: 0, explanation: 'יָדַעְתִּי = "I know / I knew," Qal Perfect 1cs of יָדַע with the ־תִּי ending (Ch 13); כִּי ("that") + the predicate adjective גָּדוֹל ("great," Ch 7).', category: 'verse' },
];

// Four contextual translations are woven into each chapter mode, forcing the
// memorized forms to be read inside real clauses. Later verbal forms that fall
// outside Chapters 11-13 are glossed in each explanation.
const chapter11ContextQuestions: PracticeQuestion[] = [
  { id: 'class5-context-ch11-deut6-4', prompt: 'Translate this clause (Deuteronomy 6:4, the Shema).', hebrew: 'יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד', options: ['The LORD our God, the LORD is one.', 'The LORD is our God and our king.', 'The LORD alone is God in heaven.', 'Love the LORD your God.'], correctIndex: 0, explanation: 'Chapter 11 focus: אֶחָד = "one." The verbless clause יְהוָה אֶחָד says "the LORD is one"; אֱלֹהֵינוּ = "our God" (1cp suffix, Ch 9).', category: 'context-ch11' },
  { id: 'class5-context-ch11-gen2-2', prompt: 'Translate this clause (Genesis 2:2).', hebrew: 'וַיִּשְׁבֹּת בַּיּוֹם הַשְּׁבִיעִי', options: ['He worked through the seventh day.', 'And he rested on the seventh day.', 'He blessed the first day.', 'He counted seven days.'], correctIndex: 1, explanation: 'Chapter 11 focus: הַשְּׁבִיעִי = "the seventh," the ordinal for "seven" agreeing with בַּיּוֹם ("on the day"). וַיִּשְׁבֹּת ("and he rested") is a glossed verb preview.', category: 'context-ch11' },
  { id: 'class5-context-ch11-gen7-11', prompt: 'Translate this dating formula (Genesis 7:11).', hebrew: 'בִּשְׁנַת שֵׁשׁ־מֵאוֹת שָׁנָה', options: ['After six hundred years had passed.', 'In the six hundredth year.', 'For six hundred years he lived.', 'In the year of the six kings.'], correctIndex: 1, explanation: 'Chapter 11 focus: שֵׁשׁ ("six") + מֵאוֹת ("hundreds") = "six hundred"; בִּשְׁנַת = "in the year of" (construct of שָׁנָה, Ch 10).', category: 'context-ch11' },
  { id: 'class5-context-ch11-gen1-16', prompt: 'Translate this phrase (Genesis 1:16).', hebrew: 'אֶת־שְׁנֵי הַמְּאֹרֹת הַגְּדֹלִים', options: ['the two great lights', 'the second great light', 'the seven bright stars', 'a pair of small lamps'], correctIndex: 0, explanation: 'Chapter 11 focus: שְׁנֵי is the construct of שְׁנַיִם ("two"): "the two great lights." הַגְּדֹלִים ("great") is an attributive adjective (Ch 7). אֶת־ marks the object.', category: 'context-ch11' },
];

const chapter12ContextQuestions: PracticeQuestion[] = [
  { id: 'class5-context-ch12-gen1-3', prompt: 'Translate this clause (Genesis 1:3).', hebrew: 'וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר', options: ['And God saw the light.', 'And God said, "Let there be light."', 'And God divided the light.', 'And God called the light day.'], correctIndex: 1, explanation: 'Chapter 12 focus: the verb אָמַר ("to say"). Here וַיֹּאמֶר = "and [he] said" — the same root in a form (waw-consecutive) previewed later. יְהִי אוֹר = "let there be light."', category: 'context-ch12' },
  { id: 'class5-context-ch12-gen5-24', prompt: 'Translate this clause (Genesis 5:24).', hebrew: 'וַיִּתְהַלֵּךְ חֲנוֹךְ אֶת־הָאֱלֹהִים', options: ['And Enoch walked with God.', 'Enoch built an altar to God.', 'God sent Enoch away.', 'Enoch called on the name of God.'], correctIndex: 0, explanation: 'Chapter 12 focus: the root הלך ("to walk"). וַיִּתְהַלֵּךְ is its Hithpael ("walked about, walked continually") — a glossed preview of the reflexive stem. "Enoch walked with God."', category: 'context-ch12' },
  { id: 'class5-context-ch12-gen1-31', prompt: 'Translate this clause (Genesis 1:31).', hebrew: 'וַיַּרְא אֱלֹהִים אֶת־כָּל־אֲשֶׁר עָשָׂה', options: ['God rested from all he had made.', 'God blessed everything he had made.', 'And God saw everything that he had made.', 'God named all that he had created.'], correctIndex: 2, explanation: 'Chapter 12 focus: the verb עָשָׂה ("to do, make"). אֲשֶׁר ("that, which," Ch 8) + עָשָׂה = "that he had made." וַיַּרְא ("and he saw") is a glossed preview.', category: 'context-ch12' },
  { id: 'class5-context-ch12-gen12-4', prompt: 'Translate this clause (Genesis 12:4).', hebrew: 'וַיֵּלֶךְ אַבְרָם כַּאֲשֶׁר דִּבֶּר אֵלָיו יְהוָה', options: ['So Abram went, as the LORD had told him.', 'Abram waited for the word of the LORD.', 'The LORD went before Abram.', 'Abram spoke to the LORD.'], correctIndex: 0, explanation: 'Chapter 12 focus: the root הלך ("to go"). וַיֵּלֶךְ = "and he went" (a glossed form of הָלַךְ). כַּאֲשֶׁר = "just as," from אֲשֶׁר (Ch 8).', category: 'context-ch12' },
];

const chapter13ContextQuestions: PracticeQuestion[] = [
  { id: 'class5-context-ch13-gen6-8', prompt: 'Translate this clause (Genesis 6:8).', hebrew: 'וְנֹחַ מָצָא חֵן בְּעֵינֵי יְהוָה', options: ['But Noah found favor in the eyes of the LORD.', 'Noah walked with the LORD.', 'The LORD remembered Noah.', 'Noah built an ark before the LORD.'], correctIndex: 0, explanation: 'Chapter 13 focus: מָצָא = "found," a Qal Perfect 3ms verb. חֵן = "favor, grace"; בְּעֵינֵי = "in the eyes of" (construct plural of עַיִן, Ch 10).', category: 'context-ch13' },
  { id: 'class5-context-ch13-ps98-3', prompt: 'Translate this clause (Psalm 98:3).', hebrew: 'זָכַר חַסְדּוֹ', options: ['His love is everlasting.', 'He has remembered his steadfast love.', 'Remember your mercy, O LORD.', 'He will not forget his people.'], correctIndex: 1, explanation: 'Chapter 13 focus: זָכַר = "he remembered," a Qal Perfect 3ms verb; חַסְדּוֹ = "his steadfast love" (חֶסֶד, Ch 10 vocab, + the 3ms suffix ־וֹ, Ch 9).', category: 'context-ch13' },
  { id: 'class5-context-ch13-ps14-1', prompt: 'Translate this clause (Psalm 14:1).', hebrew: 'אָמַר נָבָל בְּלִבּוֹ אֵין אֱלֹהִים', options: ['The wise man trusts in the LORD.', 'The LORD looks down from heaven.', 'The fool says in his heart, "There is no God."', 'They have all turned aside.'], correctIndex: 2, explanation: 'Chapter 13 focus: אָמַר = "says / said," a Qal Perfect 3ms verb; בְּלִבּוֹ = "in his heart" (בְּ + לֵב + 3ms suffix, Ch 9); אֵין אֱלֹהִים = "there is no God."', category: 'context-ch13' },
  { id: 'class5-context-ch13-ps119-11', prompt: 'Translate this clause (Psalm 119:11).', hebrew: 'בְּלִבִּי צָפַנְתִּי אִמְרָתֶךָ', options: ['My heart meditates on your word.', 'I have hidden your word in my heart.', 'Your word is a lamp to my feet.', 'You have written your law on my heart.'], correctIndex: 1, explanation: 'Chapter 13 focus: צָפַנְתִּי = "I have hidden/stored up," a Qal Perfect 1cs verb with the ־תִּי ending. בְּלִבִּי = "in my heart" and אִמְרָתֶךָ = "your word" (both with suffixes, Ch 9).', category: 'context-ch13' },
];

export const CLASS5_CARDINAL_MEMORY_GROUPS = asGroups(cardinalMemoryQuestions);
export const CLASS5_ORDINAL_MEMORY_GROUPS = asGroups(ordinalMemoryQuestions);
export const CLASS5_NUMBER_MEMORY_GROUPS = [
  ...CLASS5_CARDINAL_MEMORY_GROUPS,
  ...CLASS5_ORDINAL_MEMORY_GROUPS,
];
export const CLASS5_VERB_MEMORY_GROUPS = asGroups(verbMemoryQuestions);
export const CLASS5_QAL_MEMORY_GROUPS = asGroups(qalMemoryQuestions);

export const CLASS5_CH11_CONTEXT_GROUPS = asGroups(chapter11ContextQuestions);
export const CLASS5_CH12_CONTEXT_GROUPS = asGroups(chapter12ContextQuestions);
export const CLASS5_CH13_CONTEXT_GROUPS = asGroups(chapter13ContextQuestions);
export const CLASS5_CONTEXT_GROUPS = [
  ...CLASS5_CH11_CONTEXT_GROUPS,
  ...CLASS5_CH12_CONTEXT_GROUPS,
  ...CLASS5_CH13_CONTEXT_GROUPS,
];

export const CLASS5_NUMBER_GROUPS = [
  ...asGroups(numberQuestions),
  ...CLASS5_NUMBER_MEMORY_GROUPS,
];
export const CLASS5_VERB_GROUPS = [
  ...asGroups(verbQuestions),
  ...CLASS5_VERB_MEMORY_GROUPS,
];
export const CLASS5_QAL_GROUPS = [
  ...asGroups(qalQuestions),
  ...CLASS5_QAL_MEMORY_GROUPS,
];
export const CLASS5_VERSE_GROUPS = [
  ...asGroups(verseQuestions),
  ...CLASS5_CONTEXT_GROUPS,
];
