// HW5 — Hebrew Numbers, Introduction to Hebrew Verbs, and the Qal Perfect.
// CourseGuide for BBH (Pratico/Van Pelt) Chapters 11-13 (Sessions 11-13),
// plus the new Chapter 11-13 vocabulary and verse-translation practice.
// Released: wired into the active extended-registry alongside Class Practice 5.

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

// Section 1 — Chapter 11: Hebrew Numbers.
const sec1: MCQQuestion[] = [
  { id: 'hw5-s1-q1', type: 'mcq', question: 'The number "one" (אֶחָד) behaves grammatically like a(n):', hebrew: 'אֶחָד', options: ['adjective', 'verb', 'preposition', 'article'], correctIndex: 0, explanation: 'CourseGuide Ch 11. אֶחָד ("one") functions like an ADJECTIVE — it follows its noun and agrees with it. Numbers two and higher instead behave like NOUNS.', category: 'number' },
  { id: 'hw5-s1-q2', type: 'mcq', question: 'Translate: אַחַד הַבָּנִים', hebrew: 'אַחַד הַבָּנִים', options: ['one son', 'the one son', 'one of the sons', 'the only son'], correctIndex: 2, explanation: 'CourseGuide Ch 11. In a construct chain the number "one" means "one OF": אַחַד הַבָּנִים = "one of the sons."', category: 'number' },
  { id: 'hw5-s1-q3', type: 'mcq', question: 'Numbers two and higher function grammatically like:', options: ['nouns', 'adjectives', 'adverbs', 'verbs'], correctIndex: 0, explanation: 'CourseGuide Ch 11. Only "one" acts like an adjective; from "two" up, numbers act like NOUNS (they can stand in construct, etc.).', category: 'number' },
  { id: 'hw5-s1-q4', type: 'mcq', question: 'What does שְׁנַיִם mean?', hebrew: 'שְׁנַיִם', options: ['two', 'three', 'seven', 'six'], correctIndex: 0, explanation: 'CourseGuide Ch 11. שְׁנַיִם = "two" (note the dual-looking ending). Cardinal numbers have both masculine and feminine forms; usually you memorize the masculine absolute.', category: 'number' },
  { id: 'hw5-s1-q5', type: 'mcq', question: 'What does שֶׁבַע mean?', hebrew: 'שֶׁבַע', options: ['six', 'seven', 'nine', 'ten'], correctIndex: 1, explanation: 'CourseGuide Ch 11. שֶׁבַע = "seven." The count runs שֵׁשׁ (six), שֶׁבַע (seven), שְׁמֹנֶה (eight), תֵּשַׁע (nine), עֶשֶׂר (ten).', category: 'number' },
  { id: 'hw5-s1-q6', type: 'mcq', question: 'Translate: שְׁלֹשׁ מֵאוֹת', hebrew: 'שְׁלֹשׁ מֵאוֹת', options: ['103', '300', '3,000', '1,003'], correctIndex: 1, explanation: 'CourseGuide Ch 11. שְׁלֹשׁ ("three") + מֵאוֹת ("hundreds") = "three hundred" = 300.', category: 'number' },
  { id: 'hw5-s1-q7', type: 'mcq', question: 'How are the numbers eleven through nineteen formed?', options: ['by combining ten with one through nine', 'with a special single word for each', 'by adding the dual ending', 'by prefixing the article'], correctIndex: 0, explanation: 'CourseGuide Ch 11. Eleven through nineteen are formed by combining the number ten with the numbers one through nine (e.g. "ten and two" = twelve).', category: 'number' },
  { id: 'hw5-s1-q8', type: 'mcq', question: 'Numbers three through ten have an unusual agreement rule — they:', options: ['do not agree in gender with their noun', 'always agree in gender with their noun', 'have no plural form', 'are always definite'], correctIndex: 0, explanation: 'CourseGuide Ch 11. Counterintuitively, numbers three through ten do NOT agree in gender with the noun they count (a masculine-looking number can count feminine nouns and vice versa).', category: 'number' },
  { id: 'hw5-s1-q9', type: 'mcq', question: 'What does עֶשֶׂר mean?', hebrew: 'עֶשֶׂר', options: ['four', 'five', 'ten', 'eight'], correctIndex: 2, explanation: 'CourseGuide Ch 11. עֶשֶׂר = "ten." To make twenty, thirty, etc., the plural ending ־ִים is added to the base number.', category: 'number' },
  // Memorize: the masculine absolute cardinals one through ten.
  { id: 'hw5-s1-mc1', type: 'mcq', question: 'What is the masculine number אֶחָד?', hebrew: 'אֶחָד', options: ['two', 'one', 'ten', 'three'], correctIndex: 1, explanation: 'CourseGuide Ch 11. אֶחָד (echad) = "one," masculine (feminine אַחַת). Memorize the masculine absolute cardinals one through ten.', category: 'number' },
  { id: 'hw5-s1-mc2', type: 'mcq', question: 'What is the masculine number שְׁנַיִם?', hebrew: 'שְׁנַיִם', options: ['two', 'seven', 'nine', 'four'], correctIndex: 0, explanation: 'CourseGuide Ch 11. שְׁנַיִם (shnayim) = "two," masculine (feminine שְׁתַּיִם); construct שְׁנֵי.', category: 'number' },
  { id: 'hw5-s1-mc3', type: 'mcq', question: 'What is the masculine number שְׁלֹשָׁה?', hebrew: 'שְׁלֹשָׁה', options: ['six', 'eight', 'three', 'five'], correctIndex: 2, explanation: 'CourseGuide Ch 11. שְׁלֹשָׁה (shloshah) = "three," masculine (feminine שָׁלֹשׁ). For 3–10 the masculine ends in ־ָה.', category: 'number' },
  { id: 'hw5-s1-mc4', type: 'mcq', question: 'What is the masculine number אַרְבָּעָה?', hebrew: 'אַרְבָּעָה', options: ['nine', 'ten', 'two', 'four'], correctIndex: 3, explanation: 'CourseGuide Ch 11. אַרְבָּעָה (arbaah) = "four," masculine (feminine אַרְבַּע).', category: 'number' },
  { id: 'hw5-s1-mc5', type: 'mcq', question: 'What is the masculine number חֲמִשָּׁה?', hebrew: 'חֲמִשָּׁה', options: ['seven', 'five', 'three', 'six'], correctIndex: 1, explanation: 'CourseGuide Ch 11. חֲמִשָּׁה (chamishah) = "five," masculine (feminine חָמֵשׁ).', category: 'number' },
  { id: 'hw5-s1-mc6', type: 'mcq', question: 'What is the masculine number שִׁשָּׁה?', hebrew: 'שִׁשָּׁה', options: ['ten', 'eight', 'four', 'six'], correctIndex: 3, explanation: 'CourseGuide Ch 11. שִׁשָּׁה (shishah) = "six," masculine (feminine שֵׁשׁ).', category: 'number' },
  { id: 'hw5-s1-mc7', type: 'mcq', question: 'What is the masculine number שִׁבְעָה?', hebrew: 'שִׁבְעָה', options: ['nine', 'five', 'seven', 'two'], correctIndex: 2, explanation: 'CourseGuide Ch 11. שִׁבְעָה (shivah) = "seven," masculine (feminine שֶׁבַע).', category: 'number' },
  { id: 'hw5-s1-mc8', type: 'mcq', question: 'What is the masculine number שְׁמֹנָה?', hebrew: 'שְׁמֹנָה', options: ['eight', 'three', 'ten', 'six'], correctIndex: 0, explanation: 'CourseGuide Ch 11. שְׁמֹנָה (shmonah) = "eight," masculine (feminine שְׁמֹנֶה).', category: 'number' },
  { id: 'hw5-s1-mc9', type: 'mcq', question: 'What is the masculine number תִּשְׁעָה?', hebrew: 'תִּשְׁעָה', options: ['four', 'seven', 'ten', 'nine'], correctIndex: 3, explanation: 'CourseGuide Ch 11. תִּשְׁעָה (tishah) = "nine," masculine (feminine תֵּשַׁע).', category: 'number' },
  { id: 'hw5-s1-mc10', type: 'mcq', question: 'What is the masculine number עֲשָׂרָה?', hebrew: 'עֲשָׂרָה', options: ['five', 'eight', 'ten', 'two'], correctIndex: 2, explanation: 'CourseGuide Ch 11. עֲשָׂרָה (asarah) = "ten," masculine (feminine עֶשֶׂר); plural עֶשְׂרִים = "twenty."', category: 'number' },
  // Memorize: the large cardinals one hundred, one thousand, ten thousand.
  { id: 'hw5-s1-num100', type: 'mcq', question: 'What number is מֵאָה?', hebrew: 'מֵאָה', options: ['one thousand', 'one hundred', 'ten thousand', 'ten'], correctIndex: 1, explanation: 'CourseGuide Ch 11. מֵאָה (meah) = "one hundred"; plural מֵאוֹת ("hundreds") builds 200–900.', category: 'number' },
  { id: 'hw5-s1-num1000', type: 'mcq', question: 'What number is אֶלֶף?', hebrew: 'אֶלֶף', options: ['one hundred', 'ten thousand', 'ten', 'one thousand'], correctIndex: 3, explanation: 'CourseGuide Ch 11. אֶלֶף (eleph) = "one thousand"; plural אֲלָפִים ("thousands").', category: 'number' },
  { id: 'hw5-s1-num10000', type: 'mcq', question: 'What number is רְבָבָה?', hebrew: 'רְבָבָה', options: ['one hundred', 'one thousand', 'ten thousand', 'a hundred thousand'], correctIndex: 2, explanation: 'CourseGuide Ch 11. רְבָבָה (revavah) = "ten thousand," a myriad — the largest single number-word in Biblical Hebrew.', category: 'number' },
  // Memorize: the masculine ordinals first through tenth.
  { id: 'hw5-s1-ord1', type: 'mcq', question: 'Which ordinal is רִאשׁוֹן?', hebrew: 'רִאשׁוֹן', options: ['first', 'second', 'third', 'fourth'], correctIndex: 0, explanation: 'CourseGuide Ch 11. רִאשׁוֹן (rishon) = "first," from רֹאשׁ ("head"). Ordinals are adjectives that agree with their noun.', category: 'number' },
  { id: 'hw5-s1-ord2', type: 'mcq', question: 'Which ordinal is שֵׁנִי?', hebrew: 'שֵׁנִי', options: ['third', 'first', 'fourth', 'second'], correctIndex: 3, explanation: 'CourseGuide Ch 11. שֵׁנִי (sheni) = "second," related to שְׁנַיִם ("two").', category: 'number' },
  { id: 'hw5-s1-ord3', type: 'mcq', question: 'Which ordinal is שְׁלִישִׁי?', hebrew: 'שְׁלִישִׁי', options: ['sixth', 'third', 'fifth', 'second'], correctIndex: 1, explanation: 'CourseGuide Ch 11. שְׁלִישִׁי (shelishi) = "third." From "third" up, ordinals add ־ִי to the cardinal base.', category: 'number' },
  { id: 'hw5-s1-ord4', type: 'mcq', question: 'Which ordinal is רְבִיעִי?', hebrew: 'רְבִיעִי', options: ['second', 'fifth', 'fourth', 'third'], correctIndex: 2, explanation: 'CourseGuide Ch 11. רְבִיעִי (revii) = "fourth."', category: 'number' },
  { id: 'hw5-s1-ord5', type: 'mcq', question: 'Which ordinal is חֲמִישִׁי?', hebrew: 'חֲמִישִׁי', options: ['seventh', 'third', 'sixth', 'fifth'], correctIndex: 3, explanation: 'CourseGuide Ch 11. חֲמִישִׁי (chamishi) = "fifth."', category: 'number' },
  { id: 'hw5-s1-ord6', type: 'mcq', question: 'Which ordinal is שִׁשִּׁי?', hebrew: 'שִׁשִּׁי', options: ['sixth', 'fourth', 'ninth', 'tenth'], correctIndex: 0, explanation: 'CourseGuide Ch 11. שִׁשִּׁי (shishi) = "sixth."', category: 'number' },
  { id: 'hw5-s1-ord7', type: 'mcq', question: 'Which ordinal is שְׁבִיעִי?', hebrew: 'שְׁבִיעִי', options: ['ninth', 'seventh', 'fifth', 'second'], correctIndex: 1, explanation: 'CourseGuide Ch 11. שְׁבִיעִי (shevii) = "seventh" — הַיּוֹם הַשְּׁבִיעִי ("the seventh day").', category: 'number' },
  { id: 'hw5-s1-ord8', type: 'mcq', question: 'Which ordinal is שְׁמִינִי?', hebrew: 'שְׁמִינִי', options: ['tenth', 'sixth', 'fourth', 'eighth'], correctIndex: 3, explanation: 'CourseGuide Ch 11. שְׁמִינִי (shemini) = "eighth" — the day of circumcision (Gen 17:12).', category: 'number' },
  { id: 'hw5-s1-ord9', type: 'mcq', question: 'Which ordinal is תְּשִׁיעִי?', hebrew: 'תְּשִׁיעִי', options: ['fourth', 'seventh', 'ninth', 'first'], correctIndex: 2, explanation: 'CourseGuide Ch 11. תְּשִׁיעִי (teshii) = "ninth."', category: 'number' },
  { id: 'hw5-s1-ord10', type: 'mcq', question: 'Which ordinal is עֲשִׂירִי?', hebrew: 'עֲשִׂירִי', options: ['tenth', 'eighth', 'fifth', 'sixth'], correctIndex: 0, explanation: 'CourseGuide Ch 11. עֲשִׂירִי (asiri) = "tenth." Beyond "tenth," ordinals use the cardinal numbers.', category: 'number' },
];

// Section 2 — Chapter 12: Introduction to Hebrew Verbs.
const sec2: MCQQuestion[] = [
  { id: 'hw5-s2-q1', type: 'mcq', question: 'How many consonants does a typical Hebrew verb root have?', options: ['two', 'three (triconsonantal)', 'four', 'five'], correctIndex: 1, explanation: 'CourseGuide Ch 12. Most Hebrew roots are triconsonantal — three consonants that carry the core meaning. Different vowels and affixes build the many forms.', category: 'verb-intro' },
  { id: 'hw5-s2-q2', type: 'mcq', question: 'A Hebrew verb ending tells you the verb\'s:', options: ['tense only', 'person and gender only', 'person, gender, and number', 'gender and number only'], correctIndex: 2, explanation: 'CourseGuide Ch 12. Inflectional endings encode person, gender, AND number — so a single verb form can translate as a full "he/she/they + verb."', category: 'verb-intro' },
  { id: 'hw5-s2-q3', type: 'mcq', question: 'How many verbal STEMS (binyanim) does Hebrew have?', options: ['three', 'five', 'ten', 'seven (Qal plus six derived)'], correctIndex: 3, explanation: 'CourseGuide Ch 12. Seven stems: the Qal and six derived stems (Niphal, Piel, Pual, Hiphil, Hophal, Hithpael). The stem signals the type and voice of the action.', category: 'verb-intro' },
  { id: 'hw5-s2-q4', type: 'mcq', question: 'The three basic categories of verbal ACTION are:', options: ['simple, intensive, causative', 'active, passive, reflexive', 'past, present, future', 'strong, weak, mixed'], correctIndex: 0, explanation: 'CourseGuide Ch 12. Verbal ACTION is simple, intensive, or causative. (Verbal VOICE — active/passive/reflexive — is the separate second dimension a stem encodes.)', category: 'verb-intro' },
  { id: 'hw5-s2-q5', type: 'mcq', question: 'The three basic categories of verbal VOICE are:', options: ['simple, intensive, causative', 'past, present, future', 'active, passive, reflexive', 'qal, piel, hiphil'], correctIndex: 2, explanation: 'CourseGuide Ch 12. Verbal VOICE is active, passive, or reflexive — how the subject relates to the action. Together, stem = action-type × voice.', category: 'verb-intro' },
  { id: 'hw5-s2-q6', type: 'mcq', question: 'How many CONJUGATIONS can a Hebrew verb take?', options: ['three', 'four', 'five', 'six (Perfect, Imperfect, Imperative, two Infinitives, Participle)'], correctIndex: 3, explanation: 'CourseGuide Ch 12. Six conjugations: Perfect, Imperfect, Imperative, Infinitive Construct, Infinitive Absolute, and Participle.', category: 'verb-intro' },
  { id: 'hw5-s2-q7', type: 'mcq', question: 'A "weak" verb is one that:', options: ['has at least one weak root consonant', 'has four root letters', 'appears only rarely', 'is always stative'], correctIndex: 0, explanation: 'CourseGuide Ch 12. A weak verb has at least one weak root consonant (a guttural, נ, י, ו, or a repeated letter), which causes predictable spelling changes. Strong verbs have none.', category: 'verb-intro' },
  { id: 'hw5-s2-q8', type: 'mcq', question: 'The normal word order of a Hebrew verbal sentence is:', options: ['subject–verb–object', 'verb–subject–object', 'object–verb–subject', 'verb–object–subject'], correctIndex: 1, explanation: 'CourseGuide Ch 12. The default order is Verb–Subject–Object (with frequent exceptions for emphasis), unlike English Subject–Verb–Object.', category: 'verb-intro' },
  { id: 'hw5-s2-q9', type: 'mcq', question: 'The lexical (dictionary) form of a Hebrew verb is the:', options: ['Qal Imperfect 3ms', 'Qal Participle', 'Imperative 2ms', 'Qal Perfect 3ms'], correctIndex: 3, explanation: 'CourseGuide Ch 12. Verbs are listed under their Qal Perfect 3ms form (e.g. כָּתַב "he wrote"). That is the form you look up in the lexicon.', category: 'verb-intro' },
  { id: 'hw5-s2-q10', type: 'mcq', question: 'To "parse" a verb is to identify its:', options: ['meaning only', 'gender and number only', 'stem, conjugation, person, gender, number, and lexical form', 'tense and mood only'], correctIndex: 2, explanation: 'CourseGuide Ch 12. Parsing lists the stem, conjugation, person, gender, number, and lexical form — everything needed to translate and look the verb up.', category: 'verb-intro' },
];

// Section 3 — Chapter 13: Qal Perfect (Strong) Verbs.
const sec3: MCQQuestion[] = [
  { id: 'hw5-s3-q1', type: 'mcq', question: 'The Qal stem expresses:', options: ['simple action in the active voice', 'causative action', 'passive action', 'reflexive action'], correctIndex: 0, explanation: 'CourseGuide Ch 13. The Qal is the simple, basic stem: simple action, active voice (e.g. כָּתַב "he wrote"). It is by far the most common stem.', category: 'qal-perfect' },
  { id: 'hw5-s3-q2', type: 'mcq', question: 'The Perfect conjugation expresses a ___ action, usually translated with the English ___.', options: ['incomplete action; future tense', 'ongoing action; present tense', 'commanded action; imperative', 'completed action; past tense'], correctIndex: 3, explanation: 'CourseGuide Ch 13. The Perfect describes completed action, normally rendered with the English past ("he wrote"); it can also cover the present-perfect and, for stative verbs, a present state.', category: 'qal-perfect' },
  { id: 'hw5-s3-q3', type: 'mcq', question: 'The Perfect is also called the ___ conjugation, because endings are added to the root.', options: ['prefix', 'suffix', 'infix', 'reflexive'], correctIndex: 1, explanation: 'CourseGuide Ch 13. It is the "suffix conjugation": the sufformatives (־תִּי, ־תָּ, ־נוּ, ...) are attached to the END of the root to mark person, gender, and number.', category: 'qal-perfect' },
  { id: 'hw5-s3-q4', type: 'mcq', question: 'The Qal Perfect 3ms of a strong verb has which vowel pattern?', options: ['shewa–holem (קְטֹל)', 'qamets–tsere (קָטֵל)', 'qamets–pathach (קָטַל)', 'pathach under both consonants'], correctIndex: 2, explanation: 'CourseGuide Ch 13. The Qal Perfect 3ms strong pattern is qamets–pathach: קָטַל ("he killed"), כָּתַב ("he wrote"). This is the paradigm form to memorize.', category: 'qal-perfect' },
  { id: 'hw5-s3-q5', type: 'mcq', question: 'Translate: זָכַרְנוּ אֶת־הַתּוֹרָה', hebrew: 'זָכַרְנוּ אֶת־הַתּוֹרָה', options: ['I remembered the law', 'they remembered the law', 'we remembered the law', 'we remembered with the law'], correctIndex: 2, explanation: 'CourseGuide Ch 13. זָכַר ("remember") + the 1cp sufformative ־נוּ = "we remembered"; אֶת־ marks the definite object הַתּוֹרָה ("the law").', category: 'qal-perfect' },
  { id: 'hw5-s3-q6', type: 'mcq', question: 'The Perfect ending ־תִּי (as in כָּתַבְתִּי) marks which person, gender, and number?', options: ['first person common singular ("I")', 'second person ("you")', 'third person masculine ("he")', 'first person plural ("we")'], correctIndex: 0, explanation: 'CourseGuide Ch 13. ־תִּי is the 1cs sufformative: כָּתַבְתִּי = "I wrote." The ־נוּ ending would give "we wrote."', category: 'qal-perfect' },
  { id: 'hw5-s3-q7', type: 'mcq', question: 'Perfect and Imperfect verbs are negated by placing which particle immediately before the verb?', options: ['לֹא', 'אֵת', 'הַ', 'וְ'], correctIndex: 0, explanation: 'CourseGuide Ch 13. לֹא ("not") negates the verb and stands directly before it: לֹא זָכַר = "he did not remember."', category: 'qal-perfect' },
  { id: 'hw5-s3-q8', type: 'mcq', question: 'Translate: וְהִנֵּה אָנֹכִי עִמָּךְ', hebrew: 'וְהִנֵּה אָנֹכִי עִמָּךְ', options: ['And behold, we are your people', 'And behold, I am with you', 'And behold, he is with us', 'And behold, you are with me'], correctIndex: 1, explanation: 'CourseGuide Ch 13. הִנֵּה ("behold") + אָנֹכִי ("I," Ch 8) + עִמָּךְ ("with you," the preposition עִם + 2fs suffix, Ch 9) → "And behold, I am with you" (Gen 28:15).', category: 'qal-perfect' },
  { id: 'hw5-s3-q9', type: 'mcq', question: 'The verb כָּבֵד ("to be heavy, honored") is a STATIVE verb, which means it:', options: ['always takes a direct object', 'is a causative form', 'means "to make heavy"', 'describes a state of being rather than an action on an object'], correctIndex: 3, explanation: 'CourseGuide Ch 13. Stative verbs describe a state ("to be heavy/honored") rather than an action done to an object. Note the qamets–tsere pattern (כָּבֵד) typical of one class of statives.', category: 'qal-perfect' },
  { id: 'hw5-s3-q10', type: 'mcq', question: 'Translate this Qal Perfect verb (√m-ṣ-ʾ): מָצָא', hebrew: 'מָצָא', options: ['he wrote', 'he remembered', 'he found', 'he was full'], correctIndex: 2, explanation: 'CourseGuide Ch 13. מָצָא = "he found" (Qal Perfect 3ms), as in נֹחַ מָצָא חֵן ("Noah found favor," Gen 6:8). Distractors: כָּתַב "wrote," זָכַר "remembered," מָלֵא "was full."', category: 'qal-perfect' },
  // Memorize: the Qal Perfect strong paradigm of קטל, every person/gender/number.
  { id: 'hw5-s3-qp-3ms', type: 'mcq', question: 'Parse this Qal Perfect form: קָטַל', hebrew: 'קָטַל', options: ['3fs — she killed', '3ms — he killed', '1cs — I killed', '2ms — you (m.) killed'], correctIndex: 1, explanation: 'CourseGuide Ch 13. קָטַל is the base 3ms form ("he killed"), the paradigm and lexical form — no sufformative added.', category: 'qal-perfect' },
  { id: 'hw5-s3-qp-3fs', type: 'mcq', question: 'Parse this Qal Perfect form: קָטְלָה', hebrew: 'קָטְלָה', options: ['3cp — they killed', '3fs — she killed', '2fs — you (f.) killed', '1cs — I killed'], correctIndex: 1, explanation: 'CourseGuide Ch 13. The ־ָה ending marks 3fs: קָטְלָה = "she killed" (the accent shift reduces the first vowel to shewa).', category: 'qal-perfect' },
  { id: 'hw5-s3-qp-2ms', type: 'mcq', question: 'Parse this Qal Perfect form: קָטַלְתָּ', hebrew: 'קָטַלְתָּ', options: ['1cs — I killed', '2ms — you (m.) killed', '3ms — he killed', '2fs — you (f.) killed'], correctIndex: 1, explanation: 'CourseGuide Ch 13. The ־תָּ ending marks 2ms: קָטַלְתָּ = "you (m.) killed."', category: 'qal-perfect' },
  { id: 'hw5-s3-qp-2fs', type: 'mcq', question: 'Parse this Qal Perfect form: קָטַלְתְּ', hebrew: 'קָטַלְתְּ', options: ['2ms — you (m.) killed', '2fs — you (f.) killed', '3fs — she killed', '1cs — I killed'], correctIndex: 1, explanation: 'CourseGuide Ch 13. The ־תְּ ending (silent shewa) marks 2fs: קָטַלְתְּ = "you (f.) killed." Distinguish it from 2ms ־תָּ.', category: 'qal-perfect' },
  { id: 'hw5-s3-qp-1cs', type: 'mcq', question: 'Parse this Qal Perfect form: קָטַלְתִּי', hebrew: 'קָטַלְתִּי', options: ['3cp — they killed', '2ms — you (m.) killed', '1cs — I killed', '1cp — we killed'], correctIndex: 2, explanation: 'CourseGuide Ch 13. The ־תִּי ending marks 1cs: קָטַלְתִּי = "I killed" (common to both genders).', category: 'qal-perfect' },
  { id: 'hw5-s3-qp-3cp', type: 'mcq', question: 'Parse this Qal Perfect form: קָטְלוּ', hebrew: 'קָטְלוּ', options: ['2mp — you (m. pl.) killed', '1cp — we killed', '3cp — they killed', '3fs — she killed'], correctIndex: 2, explanation: 'CourseGuide Ch 13. The ־וּ ending marks 3cp: קָטְלוּ = "they killed" (one plural form for both genders).', category: 'qal-perfect' },
  { id: 'hw5-s3-qp-2mp', type: 'mcq', question: 'Parse this Qal Perfect form: קְטַלְתֶּם', hebrew: 'קְטַלְתֶּם', options: ['1cp — we killed', '3cp — they killed', '2fp — you (f. pl.) killed', '2mp — you (m. pl.) killed'], correctIndex: 3, explanation: 'CourseGuide Ch 13. The ־תֶּם ending marks 2mp: קְטַלְתֶּם = "you (m. pl.) killed." The accent shifts to the ending, reducing the first vowel to shewa.', category: 'qal-perfect' },
  { id: 'hw5-s3-qp-2fp', type: 'mcq', question: 'Parse this Qal Perfect form: קְטַלְתֶּן', hebrew: 'קְטַלְתֶּן', options: ['2mp — you (m. pl.) killed', '3cp — they killed', '1cp — we killed', '2fp — you (f. pl.) killed'], correctIndex: 3, explanation: 'CourseGuide Ch 13. The ־תֶּן ending marks 2fp: קְטַלְתֶּן = "you (f. pl.) killed," the counterpart of 2mp ־תֶּם.', category: 'qal-perfect' },
  { id: 'hw5-s3-qp-1cp', type: 'mcq', question: 'Parse this Qal Perfect form: קָטַלְנוּ', hebrew: 'קָטַלְנוּ', options: ['1cp — we killed', '1cs — I killed', '3cp — they killed', '2mp — you (m. pl.) killed'], correctIndex: 0, explanation: 'CourseGuide Ch 13. The ־נוּ ending marks 1cp: קָטַלְנוּ = "we killed." Do not confuse it with 1cs ־תִּי ("I").', category: 'qal-perfect' },
];

// Section 4 — Chapter 11-13 vocabulary ("You Should Know" lists).
const sec4: PairedMCQQuestion[] = [
  vocab('hw5-s4-q1', 'אֶחָד', 'echad', ['sheva', 'eser', 'shalosh'], 0, 'one', ['seven', 'ten', 'three'], 1, 'Ch 11 vocab. Functions like an adjective; famous in the Shema (יְהוָה אֶחָד).'),
  vocab('hw5-s4-q2', 'שֶׁבַע', 'sheva', ['shesh', 'shalosh', 'shemoneh'], 2, 'seven', ['six', 'three', 'eight'], 0, 'Ch 11 vocab. The "sabbath" number; distinguish שֵׁשׁ ("six").'),
  vocab('hw5-s4-q3', 'אָכַל', 'akhal', ['amar', 'halakh', 'asah'], 1, 'to eat, consume', ['to say', 'to walk', 'to do'], 3, 'Ch 12 vocab. The Qal perfect 3ms is the lexical form (אָכַל "he ate").'),
  vocab('hw5-s4-q4', 'אָמַר', 'amar', ['akhal', 'asah', 'natan'], 0, 'to say', ['to eat', 'to do', 'to give'], 2, 'Ch 12 vocab. Extremely frequent; introduces direct speech ("he said...").'),
  vocab('hw5-s4-q5', 'הָיָה', 'hayah', ['halakh', 'chazaq', 'yada'], 3, 'to be, become, happen', ['to walk', 'to be strong', 'to know'], 0, 'Ch 12 vocab. A III-ה weak verb; the verb behind the name יהוה.'),
  vocab('hw5-s4-q6', 'הָלַךְ', 'halakh', ['hayah', 'yashav', 'amar'], 1, 'to go, walk', ['to be', 'to sit, dwell', 'to say'], 1, 'Ch 12 vocab. Also used metaphorically for one\'s conduct ("to walk").'),
  vocab('hw5-s4-q7', 'יָשַׁב', 'yashav', ['yatsa', 'yada', 'natan'], 2, 'to sit, dwell, inhabit', ['to go out', 'to know', 'to sit, dwell'], 3, 'Ch 12 vocab. A I-י weak verb; "to sit," "to dwell," or "to inhabit."'),
  vocab('hw5-s4-q8', 'נָתַן', 'natan', ['natah', 'asah', 'amar'], 0, 'to give, put, place', ['to stretch out', 'to do', 'to say'], 2, 'Ch 12 vocab. A I-נ weak verb whose נ often assimilates in later forms.'),
  vocab('hw5-s4-q9', 'עָשָׂה', 'asah', ['amar', 'akhal', 'raah'], 3, 'to do, make', ['to say', 'to eat', 'to see'], 0, 'Ch 12 vocab. A III-ה weak verb; "For in six days the LORD MADE (עָשָׂה) the heavens."'),
  vocab('hw5-s4-q10', 'זָכַר', 'zakhar', ['katav', 'matsa', 'shakhav'], 1, 'to remember', ['to write', 'to find', 'to lie down'], 3, 'Ch 13 vocab. "God remembered (זָכַר) his covenant."'),
  vocab('hw5-s4-q11', 'כָּתַב', 'katav', ['kaved', 'chazaq', 'pakad'], 2, 'to write, record', ['to be heavy', 'to be strong', 'to attend to'], 1, 'Ch 13 vocab. A model strong verb; "Moses wrote (וַיִּכְתֹּב) all the words."'),
  vocab('hw5-s4-q12', 'יָדַע', 'yada', ['yashav', 'yatsa', 'natan'], 0, 'to know, perceive', ['to sit', 'to go out', 'to give'], 2, 'Ch 13 vocab. A I-י weak verb; "I know (יָדַעְתִּי) that the LORD is great."'),
];

// Section 5 — Verse translation: familiar clauses featuring numbers and Qal
// Perfect verbs, within the vocabulary and grammar of Chapters 1-13.
const sec5: MCQQuestion[] = [
  { id: 'hw5-s5-q1', type: 'mcq', question: 'Translate this verse (Genesis 1:1).', hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ', options: ['The heavens belong to God, and the earth to mankind.', 'In the beginning God created the heavens and the earth.', 'In the beginning was the Word, and the Word was with God.', 'And God made the great sea and the dry land.'], correctIndex: 1, explanation: 'בָּרָא ("created") is a Qal Perfect 3ms verb (Ch 13). אֵת = the untranslated definite-object marker (Ch 6); הַשָּׁמַיִם / הָאָרֶץ take the article (Ch 5).', category: 'verse' },
  { id: 'hw5-s5-q2', type: 'mcq', question: 'Translate this clause (Psalm 135:5).', hebrew: 'יָדַעְתִּי כִּי־גָדוֹל יְהוָה', options: ['I know that the LORD is great.', 'The LORD makes himself known.', 'Know that the LORD is God.', 'I trust in the greatness of the LORD.'], correctIndex: 0, explanation: 'יָדַעְתִּי = "I know / I knew" — Qal Perfect 1cs of יָדַע with the ־תִּי ending (Ch 13); כִּי ("that") + the predicative adjective גָּדוֹל ("great," Ch 7).', category: 'verse' },
  { id: 'hw5-s5-q3', type: 'mcq', question: 'Translate this clause (Psalm 93:1).', hebrew: 'יְהוָה מָלָךְ', options: ['The LORD is my king.', 'The LORD is one.', 'The LORD reigns.', 'The LORD is God.'], correctIndex: 2, explanation: 'מָלָךְ = "he reigns / has become king" — a Qal Perfect 3ms verb (Ch 13). "The LORD reigns" (the Perfect of a stative-type verb often reads as a present state).', category: 'verse' },
  { id: 'hw5-s5-q4', type: 'mcq', question: 'Translate this clause (Exodus 20:11).', hebrew: 'כִּי שֵׁשֶׁת־יָמִים עָשָׂה יְהוָה אֶת־הַשָּׁמַיִם וְאֶת־הָאָרֶץ', options: ['For the LORD rested on the seventh day.', 'For the heavens and the earth belong to the LORD.', 'For the LORD blessed the seventh day and made it holy.', 'For in six days the LORD made the heavens and the earth.'], correctIndex: 3, explanation: 'שֵׁשֶׁת ("six," Ch 11) + יָמִים ("days"); עָשָׂה ("made") is a Qal Perfect 3ms verb (Ch 12); אֶת־ marks the two definite objects (Ch 6).', category: 'verse' },
  { id: 'hw5-s5-q5', type: 'mcq', question: 'Translate this clause (Psalm 14:1).', hebrew: 'אָמַר נָבָל בְּלִבּוֹ אֵין אֱלֹהִים', options: ['The wise man trusts in the LORD his God.', 'The fool says in his heart, "There is no God."', 'The LORD looks down on the sons of men.', 'They have all turned aside from God.'], correctIndex: 1, explanation: 'אָמַר = "says / said" (Qal Perfect 3ms, Ch 12); בְּלִבּוֹ = "in his heart" (בְּ + לֵב + 3ms suffix, Ch 9); אֵין אֱלֹהִים = "there is no God."', category: 'verse' },
  { id: 'hw5-s5-q6', type: 'mcq', question: 'Translate this clause (Genesis 1:5).', hebrew: 'וַיְהִי־עֶרֶב וַיְהִי־בֹקֶר יוֹם אֶחָד', options: ['And God called the light Day.', 'And God saw that it was good.', 'And there was evening and there was morning, one day.', 'And God rested on the seventh day.'], correctIndex: 2, explanation: 'עֶרֶב ("evening") + בֹקֶר ("morning," Ch 9 vocab); יוֹם אֶחָד = "one day" / "day one" (the number אֶחָד, Ch 11). The וַיְהִי forms preview the waw-consecutive.', category: 'verse' },
  { id: 'hw5-s5-q7', type: 'mcq', question: 'Translate this clause (Genesis 28:16).', hebrew: 'אָכֵן יֵשׁ יְהוָה בַּמָּקוֹם הַזֶּה', options: ['Surely the LORD is in this place.', 'This is none other than the house of God.', 'How awesome is this place!', 'The LORD watches over this place.'], correctIndex: 0, explanation: 'יֵשׁ ("there is") + בַּמָּקוֹם ("in the place," בְּ + article + מָקוֹם, Chs 5-6) + הַזֶּה ("this," a demonstrative, Ch 8) → "Surely the LORD is in this place."', category: 'verse' },
  { id: 'hw5-s5-q8', type: 'mcq', question: 'Translate this clause (Psalm 98:3).', hebrew: 'זָכַר חַסְדּוֹ', options: ['He will remember his people.', 'His love is everlasting.', 'Remember your mercy, O LORD.', 'He has remembered his steadfast love.'], correctIndex: 3, explanation: 'זָכַר = "he remembered" (Qal Perfect 3ms, Ch 13); חַסְדּוֹ = "his steadfast love" (חֶסֶד, Ch 10 vocab, + the 3ms suffix ־וֹ, Ch 9).', category: 'verse' },
];

export const hw5Sections = { 1: sec1, 2: sec2, 3: sec3, 4: sec4, 5: sec5 };

export const hw5Meta: ExtendedHomeworkMeta = {
  id: 'hw5',
  title: 'HW5: Numbers, Verbs, and the Qal Perfect',
  shortTitle: 'HW5',
  description: 'CourseGuide for BBH (Pratico/Van Pelt) Chapters 11-13 (Sessions 11-13): Hebrew numbers, an introduction to the Hebrew verb system (roots, stems, conjugations), and the Qal Perfect of strong verbs — plus new Chapter 11-13 vocabulary and verse-translation practice.',
  topics: ['Ch 11: Hebrew numbers', 'Ch 12: Introduction to Hebrew verbs', 'Ch 13: Qal Perfect (strong) verbs', 'Ch 11-13 vocabulary', 'Verse translation'],
  totalQuestions: sec1.length + sec2.length + sec3.length + sec4.length + sec5.length,
  sections: [
    { id: 1, title: 'Ch 11 — Hebrew Numbers', description: 'Masculine cardinals 1–10, the large numbers (100/1,000/10,000), masculine ordinals, and their agreement quirks', questionCount: sec1.length },
    { id: 2, title: 'Ch 12 — Introduction to Hebrew Verbs', description: 'Roots, stems (binyanim), conjugations, parsing, and word order', questionCount: sec2.length },
    { id: 3, title: 'Ch 13 — Qal Perfect Verbs', description: 'The suffix conjugation: completed action, its sufformatives, and the full strong paradigm', questionCount: sec3.length },
    { id: 4, title: 'Ch 11-13 Vocabulary', description: 'Read and translate the new "You Should Know" words', questionCount: sec4.length },
    { id: 5, title: 'Verse Translation', description: 'Translate familiar clauses that use numbers and Qal Perfect verbs', questionCount: sec5.length },
  ],
  sectionQuestions: hw5Sections,
};
