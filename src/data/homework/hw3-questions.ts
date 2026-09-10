// HW3 — The Definite Article, Conjunction Waw, Prepositions, and Adjectives.
// CourseGuide for BBH (Pratico/Van Pelt) Chapters 5-7, plus a cumulative
// review of Chapter 1-4 vocabulary not assessed by any earlier exercise.

import type { MCQQuestion, PairedMCQQuestion } from '@/types/homework';
import type { ExtendedHomeworkMeta } from '@/types/homework-extended';

// Section 1 — CourseGuide Ch 5: Definite Article and Conjunction Waw.
const sec1: MCQQuestion[] = [
  { id: 'hw3-s1-q1', type: 'mcq', question: 'How is a Hebrew noun made definite?', options: ['By suffixing ־ָה', 'By prefixing הַ plus a Daghesh Forte in the first consonant', 'By prefixing וְ', 'By a separate word placed before the noun'], correctIndex: 1, explanation: 'CourseGuide Ch 5. The definite article is הַ (He + Pathach) plus a Daghesh Forte in the first consonant of the noun: מֶלֶךְ → הַמֶּלֶךְ ("the king"). It is always prefixed, never a separate word. The Daghesh Lene of an initial begadkephat consonant becomes a Daghesh Forte when the article is prefixed.', category: 'article' },
  { id: 'hw3-s1-q2', type: 'mcq', question: 'There is no indefinite article in Hebrew. How is "a child" expressed?', hebrew: 'יֶלֶד', options: ['הַיֶּלֶד', 'וְיֶלֶד', 'יֶלֶד (the bare noun)', 'אֶחָד יֶלֶד'], correctIndex: 2, explanation: 'CourseGuide Ch 5. Hebrew has no word for "a/an." The unmarked noun is indefinite by default, so יֶלֶד (Ch 5 vocab: "child, boy, youth") means "a child" or simply "child." Definiteness must be added with the article: הַיֶּלֶד = "the child."', category: 'article' },
  { id: 'hw3-s1-q3', type: 'mcq', question: 'Which consonants cause compensatory lengthening (הַ → הָ) because they reject the Daghesh Forte of the article?', options: ['א ע ר', 'ה ח', 'ב מ פ', 'י מ with Shewa'], correctIndex: 0, explanation: 'CourseGuide Ch 5. Gutturals cannot be doubled. With initial א, ע, and ר, the rejected Daghesh Forte causes compensatory lengthening — the Pathach of the article lengthens to Qamets: אִישׁ → הָאִישׁ ("the man").', category: 'article' },
  { id: 'hw3-s1-q4', type: 'mcq', question: 'With initial ה or ח the Daghesh Forte is rejected but the Pathach does NOT lengthen. This is called:', options: ['Compensatory lengthening', 'Segholization', 'Virtual doubling', 'Assimilation'], correctIndex: 2, explanation: 'CourseGuide Ch 5. Before ה and ח the article keeps its Pathach even though no Daghesh Forte appears — the doubling is "virtual": הַהֵיכָל ("the temple"), הַחֶרֶב ("the sword"). Contrast א/ע/ר, which force the Pathach to lengthen to Qamets.', category: 'article' },
  { id: 'hw3-s1-q5', type: 'mcq', question: 'The definite article appears with an irregular Seghol (הֶ) when the noun begins with:', options: ['Any guttural', 'Unaccented הָ, חָ, or עָ (עָ may also be accented)', 'A begadkephat letter', 'י or מ with Shewa'], correctIndex: 1, explanation: 'CourseGuide Ch 5. When a noun begins with unaccented הָ or חָ (or עָ, which may also be accented), the article appears as הֶ without Daghesh Forte, e.g. הֶחָכָם ("the wise one"), הֶהָרִים ("the mountains").', category: 'article' },
  { id: 'hw3-s1-q6', type: 'mcq', question: 'Translate: הָהָר', hebrew: 'הָהָר', options: ['a mountain', 'to the mountain', 'and a mountain', 'the mountain'], correctIndex: 3, explanation: 'Ch 4 vocab review + Ch 5 grammar. הַר ("mountain, hill, hill country") takes the article with Qamets: הָהָר = "the mountain." The ה of the noun rejects the Daghesh Forte of the article.', category: 'article' },
  { id: 'hw3-s1-q7', type: 'mcq', question: 'Translate: הַמִּשְׁפָּט', hebrew: 'הַמִּשְׁפָּט', options: ['the judgment', 'a judgment', 'the altar', 'the place'], correctIndex: 0, explanation: 'Ch 5 vocab מִשְׁפָּט = "judgment, decision, ordinance, law, custom." With the article: הַ + Daghesh Forte in מ → הַמִּשְׁפָּט = "the judgment." Distractors: מִזְבֵּחַ = altar, מָקוֹם = place.', category: 'article' },
  { id: 'hw3-s1-q9', type: 'mcq', question: 'Before ב, מ, פ and consonants with Vocal Shewa, the conjunction waw appears as:', options: ['וִ (Hireq Waw)', 'וּ (Shureq)', 'וֹ (Holem Waw)', 'וָ (Qamets Waw)'], correctIndex: 1, explanation: 'CourseGuide Ch 5. Before the "bump" letters ב, מ, פ and before consonants with Vocal Shewa, וְ becomes Shureq: וּמֶלֶךְ ("and a king"), וּדְבָרִים ("and words").', category: 'waw' },
  { id: 'hw3-s1-q11', type: 'mcq', question: 'Translate: וְהַכֶּסֶף', hebrew: 'וְהַכֶּסֶף', options: ['and the gold', 'and the silver', 'the silver', 'and silver'], correctIndex: 1, explanation: 'Ch 5 vocab כֶּסֶף = "silver, money" (distinguish זָהָב = "gold"). Morph: וְ (and) + הַ + Daghesh Forte (the) + כֶּסֶף → "and the silver."', category: 'waw' },
  { id: 'hw3-s1-q12', type: 'mcq', question: 'Words beginning with יְ or מְ can give up the Daghesh Forte of the article (the sqnmlwy rule). Which form shows the article WITHOUT a Daghesh in its first consonant?', options: ['הַיְלָדִים', 'הַיֶּלֶד', 'הַסּוּס', 'הַמֶּלֶךְ'], correctIndex: 0, explanation: 'CourseGuide Ch 5. The loss of the Daghesh Forte in letters like יְ and מְ is governed by the rule of sqnmlwy: הַיְלָדִים ("the boys") keeps the article vowel but drops the expected Daghesh in יְ. In הַיֶּלֶד, הַסּוּס, and הַמֶּלֶךְ the first consonant is followed by a full vowel and keeps its Daghesh Forte.', category: 'article' },
];

// Section 2 — CourseGuide Ch 6: Hebrew Prepositions.
const sec2: MCQQuestion[] = [
  { id: 'hw3-s2-q1', type: 'mcq', question: 'The three types of Hebrew prepositions are:', options: ['Independent, dependent, inseparable', 'Independent, Maqqef, inseparable', 'Prefix, suffix, infix', 'Strong, weak, guttural'], correctIndex: 1, explanation: 'CourseGuide Ch 6. Independent prepositions stand alone; Maqqef prepositions are joined to their objects by the raised stroke ־ (Maqqef); inseparable prepositions are prefixed directly to their objects.', category: 'preposition' },
  { id: 'hw3-s2-q2', type: 'mcq', question: 'Which prepositions are inseparable (always prefixed, never independent)?', options: ['אֶל, עַל, עִם', 'מִן, אֵת, בֵּין', 'בְּ, כְּ, לְ', 'הַ, וְ, מִי'], correctIndex: 2, explanation: 'CourseGuide Ch 6. The inseparable prepositions are בְּ ("in, at, with, by"), כְּ ("as, like, according to"), and לְ ("to, toward, for"). They are prefixed directly to their objects and never occur independently.', category: 'preposition' },
  { id: 'hw3-s2-q5', type: 'mcq', question: 'Which example shows the correct way to prefix a preposition to a definite noun (בְּ + הַשָּׂדֶה)?', options: ['בְּהַשָּׂדֶה', 'בְּשָׂדֶה', 'בַּשָּׂדֶה', 'בַּה־שָּׂדֶה'], correctIndex: 2, explanation: 'CourseGuide Ch 6. With a definite noun, the vowel and Daghesh Forte of the article are retained but the consonant of the preposition replaces the ה of the article: בְּ + הַשָּׂדֶה → בַּשָּׂדֶה ("in the field"). Pathach + Daghesh after ב/כ/ל signals a hidden article.', category: 'preposition' },
  { id: 'hw3-s2-q6', type: 'mcq', question: 'Translate: כַּמֶּלֶךְ', hebrew: 'כַּמֶּלֶךְ', options: ['like a king', 'for the king', 'for a king', 'like the king'], correctIndex: 3, explanation: 'CourseGuide Ch 6. כַּ = כְּ + absorbed article (Pathach + Daghesh Forte in מ) → "like THE king." Indefinite would be כְּמֶלֶךְ ("like a king") with Shewa and no Daghesh.', category: 'preposition' },
  { id: 'hw3-s2-q7', type: 'mcq', question: 'When מִן occurs as an inseparable preposition, what happens to its spelling?', options: ['The נ assimilates into the following consonant as a Daghesh Forte', 'The נ simply drops, leaving no trace', 'The מ itself doubles instead', 'Nothing changes — מִן never prefixes'], correctIndex: 0, explanation: 'CourseGuide Ch 6. מִן occurs both as a Maqqef preposition (מִן־) and as an inseparable prefix. When prefixed, the נ assimilates into the following consonant and appears as a Daghesh Forte: מִן + בַּיִת → מִבַּיִת ("from a house").', category: 'preposition' },
  { id: 'hw3-s2-q8', type: 'mcq', question: 'Before a guttural, prefixed מִן appears as:', options: ['מִ with a Daghesh in the guttural', 'מֵ with compensatory lengthening, e.g. מֵאִישׁ', 'מַ', 'מְ'], correctIndex: 1, explanation: 'CourseGuide Ch 6. Gutturals reject the Daghesh Forte left by the assimilated נ, resulting in compensatory lengthening (מִ → מֵ) or virtual doubling: מֵאִישׁ ("from a man").', category: 'preposition' },
  { id: 'hw3-s2-q9', type: 'mcq', question: 'The three special uses of מִן are:', options: ['Comparative, superlative, partitive', 'Comparative, superlative, indicative', 'Locative, temporal, causal', 'Definite, indefinite, construct'], correctIndex: 0, explanation: 'CourseGuide Ch 6. מִן is used comparatively ("better than"), superlatively with כֹּל (מִכֹּל = "the most"), and partitively ("some of").', category: 'preposition' },
  { id: 'hw3-s2-q10', type: 'mcq', question: 'What is the function of אֵת / אֶת־ before a noun in Hebrew prose?', options: ['It marks any direct object', 'It is only the preposition "with"', 'It marks a definite direct object and is never translated', 'It marks the subject'], correctIndex: 2, explanation: 'CourseGuide Ch 6. אֵת/אֶת־ is the accusative marker: it flags a DEFINITE direct object and has grammatical function but no translation value. Note the separate Ch 6 vocab word אֵת (preposition) = "with, beside" — context distinguishes them.', category: 'preposition' },
  { id: 'hw3-s2-q11', type: 'mcq', question: 'Translate: שָׁמַע אֶת־הַדְּבָרִים מִן־הַמֶּלֶךְ (שָׁמַע = "he heard")', hebrew: 'שָׁמַע אֶת־הַדְּבָרִים מִן־הַמֶּלֶךְ', options: ['He heard words from the king', 'He heard the words from the king', 'He heard the word from a king', 'He heard a word from the king'], correctIndex: 1, explanation: 'CourseGuide Ch 6. אֶת־ marks the definite direct object הַדְּבָרִים ("the words," untranslated marker) and מִן־הַמֶּלֶךְ = "from the king." Both nouns carry the article, so both are definite.', category: 'preposition' },
  { id: 'hw3-s2-q12', type: 'mcq', question: 'What does the Maqqef preposition אֶל־ mean?', hebrew: 'אֶל־', options: ['from', 'to, toward, into', 'with, beside', 'under'], correctIndex: 1, explanation: 'Ch 6 vocab. אֶל־ = "to, toward, into." Do not confuse it with אֵל (Tsere) = "God, god" — the vowel distinguishes the preposition from the noun.', category: 'preposition-vocab' },
  { id: 'hw3-s2-q13', type: 'mcq', question: 'What does בֵּין mean?', hebrew: 'בֵּין', options: ['in the midst of', 'after, behind', 'all, each, every', 'between'], correctIndex: 3, explanation: 'Ch 6 vocab. בֵּין = "between," as in Gen 1:4 בֵּין הָאוֹר וּבֵין הַחֹשֶׁךְ ("between the light and between the darkness").', category: 'preposition-vocab' },
  { id: 'hw3-s2-q14', type: 'mcq', question: 'What does בְּתוֹךְ mean?', hebrew: 'בְּתוֹךְ', options: ['in the midst of, inside', 'between', 'on account of', 'to, toward'], correctIndex: 0, explanation: 'Ch 6 vocab. בְּתוֹךְ = "in the midst of, inside," as in Gen 2:9 בְּתוֹךְ הַגָּן ("in the midst of the garden").', category: 'preposition-vocab' },
  { id: 'hw3-s2-q15', type: 'mcq', question: 'What does אַחֲרֵי mean?', hebrew: 'אַחֲרֵי', options: ['before, in front of', 'above', 'instead of', 'after, behind'], correctIndex: 3, explanation: 'Ch 6 vocab. אַחֲרֵי = "after, behind" — frequent in narrative formulas like אַחֲרֵי הַדְּבָרִים הָאֵלֶּה ("after these things").', category: 'preposition-vocab' },
  { id: 'hw3-s2-q16', type: 'mcq', question: 'Which preposition means "on account of, for the sake of"?', options: ['כֹּל', 'לְמַעַן', 'בֵּין', 'אֵת'], correctIndex: 1, explanation: 'Ch 6 vocab. לְמַעַן = "on account of, for the sake of" (e.g. Ps 23:3 לְמַעַן שְׁמוֹ "for his name\'s sake"). Distractors: כֹּל = "all, each, every"; אֵת (preposition) = "with, beside."', category: 'preposition-vocab' },
];

// Section 3 — CourseGuide Ch 7: Hebrew Adjectives.
const sec3: MCQQuestion[] = [
  { id: 'hw3-s3-q1', type: 'mcq', question: 'Hebrew adjectives inflect to indicate:', options: ['Tense and mood', 'Gender and number', 'Person only', 'Definiteness only'], correctIndex: 1, explanation: 'CourseGuide Ch 7. Adjectives inflect in four forms — masculine singular/plural and feminine singular/plural — using the same endings already learned for nouns.', category: 'adjective' },
  { id: 'hw3-s3-q2', type: 'mcq', question: 'What is the feminine singular ending for adjectives?', options: ['וֹת', 'ָ ה', 'ִ ים', 'ַ יִם'], correctIndex: 1, explanation: 'CourseGuide Ch 7. Feminine singular adjectives end in ָ ה (e.g. טוֹבָה); feminine plural takes וֹת, masculine plural takes ִ ים.', category: 'adjective' },
  { id: 'hw3-s3-q3', type: 'mcq', question: 'The three categories of adjectival usage are:', options: ['Attributive, predicative, substantive', 'Perfect, imperfect, participle', 'Construct, absolute, dual', 'Comparative, superlative, partitive'], correctIndex: 0, explanation: 'CourseGuide Ch 7. Attributive adjectives modify a noun; predicative adjectives assert something about a noun; substantive adjectives stand alone as nouns.', category: 'adjective' },
  { id: 'hw3-s3-q4', type: 'mcq', question: 'Attributive adjectives ___ the noun they modify and agree in ___.', options: ['precede; gender and number only', 'follow; gender, number, and definiteness', 'precede; definiteness only', 'replace; nothing'], correctIndex: 1, explanation: 'CourseGuide Ch 7. Attributive adjectives FOLLOW their noun and agree in gender, number, AND definiteness (or indefiniteness): הָאִישׁ הַטּוֹב = "the good man."', category: 'adjective' },
  { id: 'hw3-s3-q5', type: 'mcq', question: 'Predicative adjectives:', options: ['always take the definite article', 'only follow the noun', 'never take the definite article and agree in gender and number only', 'agree in definiteness'], correctIndex: 2, explanation: 'CourseGuide Ch 7. Predicative adjectives either precede or follow their noun, agree in gender and number only, and NEVER take the definite article: טוֹב הָאִישׁ / הָאִישׁ טוֹב = "the man is good."', category: 'adjective' },
  { id: 'hw3-s3-q6', type: 'mcq', question: 'Substantive adjectives function like:', options: ['verbs', 'adverbs', 'prepositions', 'nouns'], correctIndex: 3, explanation: 'CourseGuide Ch 7. In substantive usage there is no noun for the adjective to modify — the adjective itself stands as a noun: חָכָם = "a wise man," הֶחָכָם = "the wise one."', category: 'adjective' },
  { id: 'hw3-s3-q7', type: 'mcq', question: 'Translate: הָאִישׁ טוֹב', hebrew: 'הָאִישׁ טוֹב', options: ['A good man', 'The good man', 'A man is good', 'The man is good'], correctIndex: 3, explanation: 'CourseGuide Ch 7. Definite noun + indefinite adjective = PREDICATIVE: "The man is good." For attributive "the good man" both words would carry the article: הָאִישׁ הַטּוֹב.', category: 'adjective' },
  { id: 'hw3-s3-q8', type: 'mcq', question: 'Translate: הָאִישׁ הַטּוֹב', hebrew: 'הָאִישׁ הַטּוֹב', options: ['The good man', 'The man is good', 'A good man', 'Good is a man'], correctIndex: 0, explanation: 'CourseGuide Ch 7. Article on BOTH noun and adjective = ATTRIBUTIVE: "the good man." The adjective follows its noun and matches its definiteness.', category: 'adjective' },
  { id: 'hw3-s3-q9', type: 'mcq', question: 'Translate: אִשָּׁה טוֹבָה', hebrew: 'אִשָּׁה טוֹבָה', options: ['Only "a good woman"', 'Only "a woman is good"', 'Either "a good woman" or "a woman is good," depending on context', 'The good woman'], correctIndex: 2, explanation: 'CourseGuide Ch 7. Indefinite noun + indefinite adjective is ambiguous: attributive ("a good woman") or predicative ("a woman is good"). Context decides.', category: 'adjective' },
  { id: 'hw3-s3-q10', type: 'mcq', question: 'Translate: מִצְרַ֫יְמָה', hebrew: 'מִצְרַ֫יְמָה', options: ['Egypt', 'to Egypt', 'from Egypt', 'in Egypt'], correctIndex: 1, explanation: 'CourseGuide Ch 7. The directional ending ָ ה expresses motion toward: מִצְרַיִם ("Egypt") + ָ ה → מִצְרַ֫יְמָה = "to Egypt."', category: 'adjective' },
  { id: 'hw3-s3-q11', type: 'mcq', question: 'The directional ending ָ ה is always:', options: ['accented and translated "from"', 'a feminine marker', 'unaccented and translated "to" or "toward"', 'accented and untranslated'], correctIndex: 2, explanation: 'CourseGuide Ch 7. The directional ending is always UNACCENTED (unlike the accented feminine ending ָ ה) and is translated "to" or "toward."', category: 'adjective' },
  { id: 'hw3-s3-q12', type: 'mcq', question: 'Does the gender of an adjective change its meaning?', options: ['Yes, always', 'Only in the plural', 'Only when attributive', 'No, gender marks agreement only'], correctIndex: 3, explanation: 'CourseGuide Ch 7. The gender of an adjective does not change its meaning, and adjectives that are plural in form keep the same translation value — the endings simply agree with the modified noun.', category: 'adjective' },
];

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

// Section 4 — Chapter 5-7 vocabulary ("You Should Know" lists).
const sec4: PairedMCQQuestion[] = [
  vocab('hw3-s4-q1', 'אֵשׁ', 'esh', ['ish', 'em', 'et'], 0, 'fire', ['man', 'mother', 'sword'], 1, 'Ch 5 vocab. Feminine noun; distinguish אִישׁ (ish, "man").'),
  vocab('hw3-s4-q2', 'הֵיכָל', 'hekhal', ['herev', 'hakham', 'har'], 1, 'temple, palace', ['sword', 'mountain', 'place'], 0, 'Ch 5 vocab. Used of Solomon\'s temple and royal palaces.'),
  vocab('hw3-s4-q3', 'זָהָב', 'zahav', ['zaqen', 'zar', 'zeh'], 0, 'gold', ['silver, money', 'old', 'foreign'], 2, 'Ch 5 vocab. Pairs with כֶּסֶף ("silver") in lists of treasure.'),
  vocab('hw3-s4-q4', 'חֶרֶב', 'cherev', ['chakham', 'chai', 'hekhal'], 2, 'sword', ['temple', 'wise', 'gold'], 0, 'Ch 5 vocab. Segholate noun; famous in "beat swords into plowshares" (Isa 2:4).'),
  vocab('hw3-s4-q5', 'יָם', 'yam', ['yad', 'yom', 'yeled'], 1, 'sea', ['hand', 'day', 'child'], 3, 'Ch 5 vocab. As in יַם־סוּף (the Sea of Reeds). Distinguish יוֹם ("day") and יָד ("hand").'),
  vocab('hw3-s4-q6', 'כֶּסֶף', 'kesef', ['kohen', 'kol', 'kerem'], 0, 'silver, money', ['gold', 'priest', 'altar'], 1, 'Ch 5 vocab. Segholate noun; also the ordinary word for "money."'),
  vocab('hw3-s4-q7', 'מִזְבֵּחַ', 'mizbeach', ['mishpat', 'maqom', 'melekh'], 1, 'altar', ['place', 'judgment', 'king'], 2, 'Ch 5 vocab. From the root זבח ("to sacrifice") — the place of sacrifice. Note the Furtive Pathach under ח.'),
  vocab('hw3-s4-q8', 'מָקוֹם', 'maqom', ['mizbeach', 'mayim', 'melekh'], 3, 'place, location', ['altar', 'water', 'sea'], 0, 'Ch 5 vocab. As in Gen 28:16-17, "How awesome is this place (הַמָּקוֹם)!"'),
  vocab('hw3-s4-q9', 'מִשְׁפָּט', 'mishpat', ['mizbeach', 'maqom', 'melekh'], 0, 'judgment, decision, ordinance', ['place', 'kingdom', 'altar'], 1, 'Ch 5 vocab. A key covenant word — "justice/judgment," often paired with צֶדֶק ("righteousness").'),
  vocab('hw3-s4-q10', 'יֶלֶד', 'yeled', ['yam', 'yad', 'yashar'], 2, 'child, boy, youth', ['sea', 'upright', 'old man'], 3, 'Ch 5 vocab. Segholate noun; plural יְלָדִים.'),
  vocab('hw3-s4-q11', 'גָּדוֹל', 'gadol', ['goy', 'zaqen', 'gan'], 1, 'great, big, large', ['small, few', 'nation', 'good'], 0, 'Ch 7 vocab. Adjective, as in הָעִיר הַגְּדוֹלָה ("the great city," Jonah 1:2).'),
  vocab('hw3-s4-q12', 'זָקֵן', 'zaqen', ['zar', 'zahav', 'yashar'], 0, 'old; (as a noun) elder', ['foreign, strange', 'gold', 'living'], 2, 'Ch 7 vocab. Adjective "old"; used substantively for the "elders" (זִקְנֵי יִשְׂרָאֵל) of Israel.'),
];

// Section 5 — Cumulative review: Chapter 1-4 vocabulary not covered by
// Class Practice 1-2 or Homework 1-2 (names from Ch 1-2, nouns from Ch 3-4).
const sec5Names: MCQQuestion[] = [
  { id: 'hw3-s5-q1', type: 'mcq', question: 'Which biblical name is this?', hebrew: 'אַבְרָהָם', options: ['Aaron', 'Abraham', 'Isaac', 'Jacob'], correctIndex: 1, explanation: 'Ch 1-2 vocab. אַבְרָהָם = Abraham, "father of a multitude" (Gen 17:5).', category: 'review-name' },
  { id: 'hw3-s5-q2', type: 'mcq', question: 'Which biblical name is this?', hebrew: 'אַהֲרֹן', options: ['Aaron', 'Abraham', 'David', 'Judah'], correctIndex: 0, explanation: 'Ch 1-2 vocab. אַהֲרֹן = Aaron, brother of Moses and first high priest. Note the Hateph Pathach under ה.', category: 'review-name' },
  { id: 'hw3-s5-q3', type: 'mcq', question: 'Which biblical name is this?', hebrew: 'דָּוִד', options: ['Judah', 'Jacob', 'David', 'Isaac'], correctIndex: 2, explanation: 'Ch 1-2 vocab. דָּוִד = David — just three consonants, dalet-waw-dalet.', category: 'review-name' },
  { id: 'hw3-s5-q4', type: 'mcq', question: 'Which biblical name is this?', hebrew: 'יְהוּדָה', options: ['Jerusalem', 'Judah', 'Jacob', 'Isaac'], correctIndex: 1, explanation: 'Ch 1-2 vocab. יְהוּדָה = Judah, fourth son of Jacob and the southern kingdom. Note the shared letters with יהוה.', category: 'review-name' },
  { id: 'hw3-s5-q5', type: 'mcq', question: 'Which biblical name is this?', hebrew: 'יַעֲקֹב', options: ['Isaac', 'Judah', 'Jerusalem', 'Jacob'], correctIndex: 3, explanation: 'Ch 1-2 vocab. יַעֲקֹב = Jacob, from the root עקב ("heel"), Gen 25:26. Note the Hateph Pathach under ע.', category: 'review-name' },
  { id: 'hw3-s5-q6', type: 'mcq', question: 'Which biblical name is this?', hebrew: 'יִצְחָק', options: ['Isaac', 'Jacob', 'Aaron', 'Abraham'], correctIndex: 0, explanation: 'Ch 1-2 vocab. יִצְחָק = Isaac, from צחק ("to laugh"), Gen 21:6.', category: 'review-name' },
  { id: 'hw3-s5-q7', type: 'mcq', question: 'Which biblical name is this?', hebrew: 'יְרוּשָׁלַםִ', options: ['Judah', 'Jericho', 'Jerusalem', 'Jordan'], correctIndex: 2, explanation: 'Ch 1-2 vocab. יְרוּשָׁלַםִ = Jerusalem, written defectively (without the second י) in most of the Hebrew Bible.', category: 'review-name' },
];

const sec5Words: PairedMCQQuestion[] = [
  vocab('hw3-s5-q8', 'אָדוֹן', 'adon', ['adam', 'adamah', 'elohim'], 0, 'lord, master', ['man, humankind', 'ground', 'God'], 1, 'Ch 3 review. The form אֲדֹנָי ("my Lord") is read in place of the divine name.'),
  vocab('hw3-s5-q9', 'אָדָם', 'adam', ['adon', 'adamah', 'em'], 1, 'man, humankind', ['lord, master', 'ground, land', 'mother'], 0, 'Ch 3 review. Collective "humankind"; wordplay with אֲדָמָה ("ground") in Gen 2:7.'),
  vocab('hw3-s5-q10', 'אֲדָמָה', 'adamah', ['adam', 'adon', 'achot'], 2, 'land, earth, ground', ['brother', 'sister', 'sea'], 0, 'Ch 3 review. The ground from which אָדָם was formed (Gen 2:7).'),
  vocab('hw3-s5-q11', 'אָח', 'ach', ['achot', 'esh', 'el'], 0, 'brother', ['sister', 'fire', 'mother'], 0, 'Ch 3 review. Irregular plural אַחִים.'),
  vocab('hw3-s5-q12', 'אָחוֹת', 'achot', ['ach', 'adamah', 'em'], 1, 'sister, relative', ['brother', 'mother', 'daughter'], 1, 'Ch 3 review. Related to אָח ("brother") with the feminine וֹת pattern.'),
  vocab('hw3-s5-q13', 'אֵם', 'em', ['el', 'am', 'esh'], 2, 'mother', ['people', 'God', 'fire'], 2, 'Ch 3 review. Distinguish עַם ("people") — Ayin, not Aleph.'),
  vocab('hw3-s5-q14', 'אֵל', 'el', ['em', 'al', 'esh'], 1, 'God, god', ['to, toward', 'mother', 'fire'], 3, 'Ch 3 review. אֵל (Tsere) = "God/god," as in אֵל שַׁדַּי. Do NOT confuse with the preposition אֶל (Seghol) = "to, toward."'),
  vocab('hw3-s5-q15', 'גּוֹי', 'goy', ['gadol', 'gan', 'goral'], 0, 'nation, people', ['great', 'garden', 'mountain'], 2, 'Ch 4 review. Plural גּוֹיִם, often "the nations" in contrast to Israel.'),
  vocab('hw3-s5-q16', 'הַר', 'har', ['hekhal', 'herev', 'hu'], 3, 'mountain, hill, hill country', ['temple', 'sword', 'sea'], 1, 'Ch 4 review. With the article: הָהָר ("the mountain," e.g. Sinai).'),
];

const sec5 = [...sec5Names, ...sec5Words];

// Section 6 — Verse translation: the easiest, most familiar verses (or clauses)
// whose vocabulary and grammar stay within Chapters 1-7. The Hebrew is shown;
// the student picks the English translation.
const sec6: MCQQuestion[] = [
  { id: 'hw3-s6-q1', type: 'mcq', question: 'Translate this verse (Genesis 1:1).', hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ', options: ['In the beginning was the Word, and the Word was with God.', 'In the beginning God created the heavens and the earth.', 'And God made the great sea and the dry land.', 'The heavens belong to God, and the earth to mankind.'], correctIndex: 1, explanation: 'בְּ ("in") + רֵאשִׁית ("beginning"); אֱלֹהִים ("God"); אֵת = the untranslated definite-direct-object marker; הַשָּׁמַיִם ("the heavens," article); וְאֵת = waw ("and") + the marker; הָאָרֶץ ("the earth," article with Qamets before the guttural א).', category: 'verse' },
  { id: 'hw3-s6-q2', type: 'mcq', question: 'Translate this clause (Psalm 145:9).', hebrew: 'טוֹב־יְהוָה לַכֹּל', options: ['The LORD is king over all.', 'The law of the LORD is good.', 'The LORD is good to all.', 'The LORD is good to me.'], correctIndex: 2, explanation: 'A verbless clause: טוֹב ("good," a predicative adjective, Ch 7) + יְהוָה → "the LORD is good." לַכֹּל = לְ ("to") + כֹּל ("all," Ch 6) with the article absorbed (Pathach).', category: 'verse' },
  { id: 'hw3-s6-q3', type: 'mcq', question: 'Translate this phrase (Jonah 1:2).', hebrew: 'נִינְוֵה הָעִיר הַגְּדוֹלָה', options: ['Jerusalem, the holy city.', 'Nineveh, the great city.', 'Nineveh, the wicked city.', 'the city and its great king'], correctIndex: 1, explanation: 'הָעִיר הַגְּדוֹלָה = an attributive adjective with the article on BOTH the noun and the adjective (Ch 7) → "the great city." גְּדוֹלָה is the feminine of גָּדוֹל ("great," Ch 7), agreeing with the feminine עִיר.', category: 'verse' },
  { id: 'hw3-s6-q4', type: 'mcq', question: 'Translate this clause (Psalm 24:1).', hebrew: 'לַיהוָה הָאָרֶץ', options: ["The earth is the LORD's.", 'The LORD is on the earth.', 'The LORD made the earth.', 'The earth is full of the LORD.'], correctIndex: 0, explanation: 'A verbless clause showing the possessive use of לְ (Ch 6): לַיהוָה = לְ ("belonging to") + YHWH, with the definite הָאָרֶץ → "The earth belongs to / is the LORD\'s."', category: 'verse' },
  { id: 'hw3-s6-q5', type: 'mcq', question: 'Translate this clause (Genesis 1:2).', hebrew: 'וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ', options: ['And the land was good and pleasant.', 'And the earth brought forth grass.', 'And the earth was formless and void.', 'But the earth was dry and without water.'], correctIndex: 2, explanation: 'וְ ("and") prefixed to הָאָרֶץ; note that the conjunction appears as וָ (Qamets) in וָבֹהוּ before the letter ב. תֹהוּ וָבֹהוּ = "formless and void." הָיְתָה ("was") is a preview of the verb chapters.', category: 'verse' },
  { id: 'hw3-s6-q6', type: 'mcq', question: 'Translate this verse (Genesis 1:3).', hebrew: 'וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר', options: ['And God saw that the light was good.', 'And God separated the light from the darkness.', "And God said, 'Let there be light,' and there was light.", 'And God called the light day.'], correctIndex: 2, explanation: 'The creation of light: אֱלֹהִים ("God") + אוֹר ("light"). The waw-prefixed verbs וַיֹּאמֶר ("and he said") and יְהִי ("let there be") are previews of later chapters; the vocabulary is all familiar.', category: 'verse' },
  { id: 'hw3-s6-q7', type: 'mcq', question: 'Translate this clause (Genesis 1:5).', hebrew: 'וַיִּקְרָא אֱלֹהִים לָאוֹר יוֹם', options: ['And God made the light and the day.', 'And God saw that the day was good.', 'God called the day light.', 'And God called the light Day.'], correctIndex: 3, explanation: 'לָאוֹר = לְ ("to") + the article (הָאוֹר → לָאוֹר, "to the light"); יוֹם ("day," Ch 4 vocab). The naming construction "called X [name]." Verb וַיִּקְרָא ("and he called") is a preview.', category: 'verse' },
  { id: 'hw3-s6-q8', type: 'mcq', question: 'Translate this verse (Deuteronomy 6:4, the Shema).', hebrew: 'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד', options: ['Hear, O Israel: the LORD our God, the LORD is one.', 'Love the LORD your God with all your heart.', 'The LORD is God; there is no other besides him.', 'Hear, O Israel, and keep the commandments of the LORD.'], correctIndex: 0, explanation: 'The Shema. שְׁמַע ("hear," imperative — preview); the verbless clause יְהוָה אֶחָד = "the LORD is one." אֱלֹהֵינוּ ("our God," 1cp suffix) and אֶחָד ("one," a number) are previews of Chapters 9 and 11.', category: 'verse' },
  { id: 'hw3-s6-q9', type: 'mcq', question: 'Translate this clause (Genesis 1:4).', hebrew: 'וַיַּרְא אֱלֹהִים אֶת־הָאוֹר כִּי־טוֹב', options: ['And God made the light on the fourth day.', 'And God saw the light, that it was good.', 'And God divided the light from the darkness.', "And God said, 'Let the light be good.'"], correctIndex: 1, explanation: 'אֶת־הָאוֹר = the marker אֶת + the definite הָאוֹר ("the light"); כִּי־טוֹב = "that [it was] good," with the predicative adjective טוֹב (Ch 7). Verb וַיַּרְא ("and he saw") is a preview.', category: 'verse' },
  { id: 'hw3-s6-q10', type: 'mcq', question: 'Translate this clause (Genesis 2:1).', hebrew: 'וַיְכֻלּוּ הַשָּׁמַיִם וְהָאָרֶץ', options: ['In the beginning were the heavens and the earth.', 'And God blessed the heavens and the earth.', 'The heavens and the earth will pass away.', 'Thus the heavens and the earth were finished.'], correctIndex: 3, explanation: 'הַשָּׁמַיִם ("the heavens," article) + וְהָאָרֶץ (waw "and" + "the earth," article). Verb וַיְכֻלּוּ ("were finished/completed") is a preview of the verb chapters.', category: 'verse' },
];

export const hw3Sections = { 1: sec1, 2: sec2, 3: sec3, 4: sec4, 5: sec5, 6: sec6 };

export const hw3Meta: ExtendedHomeworkMeta = {
  id: 'hw3',
  title: 'HW3: The Article, Prepositions, and Adjectives',
  shortTitle: 'HW3',
  description: 'CourseGuide for BBH (Pratico/Van Pelt) Chapters 5-7: the definite article and conjunction waw, Hebrew prepositions, and Hebrew adjectives — plus new Chapter 5-7 vocabulary, a cumulative review of Chapter 1-4 vocabulary, and verse-translation practice from the easiest verses of the Hebrew Bible.',
  topics: ['Ch 5: Definite article and conjunction waw', 'Ch 6: Prepositions', 'Ch 7: Adjectives and the directional ending', 'Ch 5-7 vocabulary', 'Ch 1-4 vocabulary review', 'Verse translation'],
  totalQuestions: sec1.length + sec2.length + sec3.length + sec4.length + sec5.length + sec6.length,
  sections: [
    { id: 1, title: 'Ch 5 — Definite Article and Conjunction Waw', description: 'הַ + Daghesh Forte, guttural spellings, and the forms of וְ', questionCount: sec1.length },
    { id: 2, title: 'Ch 6 — Hebrew Prepositions', description: 'Inseparable בְּ/כְּ/לְ, prefixed מִן, the marker אֵת, and preposition vocabulary', questionCount: sec2.length },
    { id: 3, title: 'Ch 7 — Hebrew Adjectives', description: 'Attributive, predicative, and substantive usage; the directional ending', questionCount: sec3.length },
    { id: 4, title: 'Ch 5-7 Vocabulary', description: 'Read and translate the new "You Should Know" words', questionCount: sec4.length },
    { id: 5, title: 'Ch 1-4 Cumulative Review', description: 'Names and nouns from Chapters 1-4 not tested in earlier exercises', questionCount: sec5.length },
    { id: 6, title: 'Verse Translation', description: 'Translate the easiest verses of the Hebrew Bible into English', questionCount: sec6.length },
  ],
  sectionQuestions: hw3Sections,
};
