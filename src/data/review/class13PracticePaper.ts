/**
 * Class 13 Practice Paper — the cumulative capstone (Guided Practice)
 * CourseGuide for BBH (Pratico/Van Pelt), Chapters 1-35 — the whole course.
 *
 * Section 1: Grammar MCQ (50 questions spanning Chapters 1-35)
 * Section 2: Vocabulary MCQ (30 questions from the "You Should Know" lists)
 * Section 3: Verse Analysis — matching + translation (5 anchor verses)
 *
 * Structure mirrors the Koine practice paper: guided mode shows the
 * explanation after each answer, and the Class 13 exam is composed from this
 * bank plus ~20% unseen items (see class13FinalExam.ts).
 *
 * NOT YET RELEASED. No route imports this bank, so it is not reachable from
 * the app. Release = point /grammar/review/practice-paper at these exports.
 */

import type { PracticeMCQ, PracticeVerseAnalysis } from './practicePaper';

export type { PracticeMCQ, MatchingPair, PracticeVerseAnalysis } from './practicePaper';

// ═══════════════════════════════════════════════════════════════════════════════
// Section 1: Grammar MCQ — 50 questions across Chapters 1-35
// ═══════════════════════════════════════════════════════════════════════════════

export const class13GrammarQuestions: PracticeMCQ[] = [
  // --- Ch 1-3: alphabet, vowels, syllabification ---
  { id: 'c13-g01', question: 'Which four consonants are the gutturals?', options: ['ב ג ד כ', 'ס צ שׁ שׂ', 'ט ז ד ת', 'א ה ח ע'], correctIndex: 3, explanation: 'Ch 1. א, ה, ח and ע are the gutturals, and ר often behaves like one. They reject the Daghesh Forte and prefer a-class vowels — the single most useful fact in the whole course.' },
  { id: 'c13-g02', question: 'What does a Daghesh Forte do?', options: ['it silences the consonant', 'it marks the accented syllable', 'it doubles the consonant it sits in', 'it lengthens the preceding vowel'], correctIndex: 2, explanation: 'Ch 2. Distinguish it from the Daghesh Lene, which only hardens a begadkephat letter. A Daghesh Forte can never appear in a guttural or in ר.' },
  { id: 'c13-g03', question: 'Which pair of vowel letters is called "unchangeable long"?', options: ['those written with ה', 'those written with ו and י', 'Pathach and Seghol', 'the Hateph vowels'], correctIndex: 1, explanation: 'Ch 2. Vowels written with ו and י do not reduce when the accent moves, which is why they survive intact through the verb paradigms.' },

  // --- Ch 4-7: nouns, article and waw, prepositions, adjectives ---
  { id: 'c13-g04', question: 'Parse הַשָּׁמַיִם in Genesis 1:1:', hebrew: 'אֵת הַשָּׁמַיִם', options: ['article + masculine singular', 'article + masculine plural', 'article + DUAL', 'article + feminine plural'], correctIndex: 2, explanation: 'Ch 4-5. The ־ַיִם ending is the dual. The article הַ with a Daghesh Forte in the following consonant is the article\'s ordinary form.' },
  { id: 'c13-g05', question: 'Why is it הָאָרֶץ and not הַאָרֶץ?', hebrew: 'הָאָרֶץ', options: ['because the noun is feminine', 'because the noun is plural', 'because the noun is in construct', 'because the guttural א cannot take a Daghesh Forte'], correctIndex: 3, explanation: 'Ch 5. Compensatory lengthening: Pathach becomes Qamets before א, ע and ר. Before ה and ח the article usually keeps Pathach with virtual doubling instead.' },
  { id: 'c13-g06', question: 'Which are the three inseparable prepositions?', options: ['אֶל, עַל, עִם', 'מִן, אֵת, בֵּין', 'בְּ, כְּ, לְ', 'הַ, וְ, שֶׁ'], correctIndex: 2, explanation: 'Ch 6. "B-K-L." They are written as part of the following word, and when that word has the article, the ה elides and the article\'s vowel transfers: לְ + הָאוֹר becomes לָאוֹר.' },
  { id: 'c13-g07', question: 'How does מִן normally attach to a following word?', options: ['it stays separate always', 'its נ assimilates, leaving a Daghesh Forte', 'it becomes מָה', 'it takes the article'], correctIndex: 1, explanation: 'Ch 6. Before a guttural, which cannot double, the vowel lengthens to Tsere instead: מֵאִישׁ.' },
  { id: 'c13-g08', question: 'An ATTRIBUTIVE adjective:', options: ['follows its noun and agrees in gender, number, and definiteness', 'precedes its noun and never takes the article', 'agrees only in gender', 'must stand in construct'], correctIndex: 0, explanation: 'Ch 7. Contrast the predicative adjective, which does NOT take the article: הַמֶּלֶךְ טוֹב means "the king is good," while הַמֶּלֶךְ הַטּוֹב means "the good king."' },
  { id: 'c13-g09', question: 'Parse the וְ in וְהָאָרֶץ (Genesis 1:2):', hebrew: 'וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ', options: ['Waw Consecutive on an Imperfect', 'Waw Consecutive on a Perfect', 'a disjunctive waw', 'the definite article'], correctIndex: 2, explanation: 'Ch 5, 17, 23. A waw followed by a noun rather than a verb steps out of the narrative sequence. Verse 1 uses ordinary verb-first order; verse 2 pauses to describe a state.' },

  // --- Ch 8-10: pronouns, suffixes, construct chain ---
  { id: 'c13-g10', question: 'Which word is the relative pronoun "who, which, that"?', options: ['זֶה', 'מִי', 'הוּא', 'אֲשֶׁר'], correctIndex: 3, explanation: 'Ch 8. אֲשֶׁר is indeclinable — one form for every gender, number, and case. מִי ("who?") and מָה ("what?") are the interrogatives.' },
  { id: 'c13-g11', question: 'What does the suffix on דְּבָרוֹ mean?', hebrew: 'דְּבָרוֹ', options: ['"my word"', '"his word"', '"your word"', '"their word"'], correctIndex: 1, explanation: 'Ch 9. ־וֹ is the 3ms suffix. On a NOUN a Type 1 suffix is possessive; on a VERB the identical suffix is objective ("he kept him").' },
  { id: 'c13-g12', question: 'In a construct chain, how is definiteness marked?', options: ['with the article on the construct (first) noun', 'with the article on both nouns', 'a construct chain can never be definite', 'with the article on the ABSOLUTE (last) noun, which makes the whole chain definite'], correctIndex: 3, explanation: 'Ch 10. דְּבַר הַמֶּלֶךְ = "the word of the king." Never put the article on the construct noun itself.' },
  { id: 'c13-g13', question: 'Parse פְּנֵי in עַל־פְּנֵי תְהוֹם (Genesis 1:2):', hebrew: 'עַל־פְּנֵי תְהוֹם', options: ['masculine singular absolute', 'masculine plural absolute', 'masculine plural CONSTRUCT', 'a verb form'], correctIndex: 2, explanation: 'Ch 10. The masculine plural absolute ־ִים shortens to ־ֵי in construct, and the final Mem drops: "the face of the deep."' },

  // --- Ch 11: numbers ---
  { id: 'c13-g14', question: 'The number אֶחָד ("one") behaves grammatically like:', hebrew: 'אֶחָד', options: ['an adjective', 'a verb', 'a preposition', 'a construct noun'], correctIndex: 0, explanation: 'Ch 11. Only "one" behaves this way. From "two" upward the numbers behave like NOUNS and can stand in construct.' },
  { id: 'c13-g15', question: 'What is surprising about the agreement of the numbers three through ten?', options: ['they have no plural', 'the gender is reversed from the noun counted', 'they never take the article', 'they always precede the verb'], correctIndex: 1, explanation: 'Ch 11. The famous chiastic agreement. שְׁלֹשָׁה (masculine in form) counts feminine nouns, and שָׁלֹשׁ counts masculine ones.' },

  // --- Ch 12-13: the verb system, Qal Perfect strong ---
  { id: 'c13-g16', question: 'The Hebrew Perfect conjugation expresses:', options: ['incomplete action, present or future', 'a command', 'a wish', 'completed action'], correctIndex: 3, explanation: 'Ch 13. It is the "suffix conjugation": the subject is marked by endings added after the root, not by a prefix.' },
  { id: 'c13-g17', question: 'Parse קְטַלְתֶּם:', hebrew: 'קְטַלְתֶּם', options: ['1cp — "we killed"', '2mp — "you (m. pl.) killed"', '3cp — "they killed"', '2fp — "you (f. pl.) killed"'], correctIndex: 1, explanation: 'Ch 13. The ־תֶּם ending marks 2mp. Because the accent shifts to the ending, the first stem vowel reduces to a Shewa.' },
  { id: 'c13-g18', question: 'Which Perfect sufformative marks the first person singular?', options: ['־תָּ', '־נוּ', '־תִּי', '־וּ'], correctIndex: 2, explanation: 'Ch 13. ־תִּי is "I," ־נוּ is "we," ־תָּ is "you (m. sg.)." Confusing ־תִּי with ־נוּ is the most common beginner slip.' },
  { id: 'c13-g19', question: 'A STATIVE verb such as כָּבֵד:', hebrew: 'כָּבֵד', options: ['describes a state or condition', 'is always causative', 'always takes a direct object', 'is always passive'], correctIndex: 0, explanation: 'Ch 13. "To be heavy, honoured." Note the Qamets-Tsere pattern that marks one class of statives.' },

  // --- Ch 14: Qal Perfect weak ---
  { id: 'c13-g20', question: 'What is the diagnostic stem vowel in the 1st and 2nd person forms of a III-ה Perfect?', hebrew: 'בָּנִיתָ', options: ['Holem Waw', 'Qamets', 'Hireq Yod', 'Shureq'], correctIndex: 2, explanation: 'Ch 14. בָּנִיתָ, רָאִיתִי. The Yod resurfaces because III-ה verbs were originally III-י.' },
  { id: 'c13-g21', question: 'Biconsonantal (hollow) verbs take which vowel in the THIRD person Perfect?', hebrew: 'קָם', options: ['Qamets (קָם)', 'Pathach (קַם)', 'Hireq', 'Shureq'], correctIndex: 0, explanation: 'Ch 14. Third person takes Qamets (קָם, "he arose"); first and second person switch to Pathach (קַמְתָּ, "you arose").' },
  { id: 'c13-g22', question: 'In a III-א verb such as מָצָא, why does the ת of the ending lose its Daghesh Lene?', hebrew: 'מָצָאתָ', options: ['because א is a guttural that doubles', 'because the verb is plural', 'because the accent shifts', 'because the א quiesces, so the ת follows a vowel sound'], correctIndex: 3, explanation: 'Ch 14. A quiescent א leaves the preceding vowel open, and a begadkephat letter after a vowel takes no Daghesh Lene.' },

  // --- Ch 15-16: Qal Imperfect strong and weak ---
  { id: 'c13-g23', question: 'The Imperfect is called the ___ conjugation.', options: ['suffix', 'prefix', 'stative', 'construct'], correctIndex: 1, explanation: 'Ch 15. Every form begins with a preformative — י ("he"), ת ("she/you"), א ("I"), נ ("we") — that carries the subject.' },
  { id: 'c13-g24', question: 'What is the diagnostic vowel pattern of the strong Qal Imperfect?', hebrew: 'יִקְטֹל', options: ['Qamets under the prefix, Pathach in the stem', 'Tsere throughout', 'Shureq in the stem', 'Hireq under the prefix, Holem in the stem'], correctIndex: 3, explanation: 'Ch 15. יִקְטֹל, יִשְׁמֹר, יִכְתֹּב. Any departure from that pattern is a signal that the root is weak.' },
  { id: 'c13-g25', question: 'The form תִּקְטֹל is ambiguous. Between which two parsings?', hebrew: 'תִּקְטֹל', options: ['3ms and 1cs', '3fs and 2ms', '2fs and 2mp', '1cp and 3mp'], correctIndex: 1, explanation: 'Ch 15. The ת preformative serves both. The plural תִּקְטֹלְנָה is ambiguous in exactly the same way, between 3fp and 2fp.' },
  { id: 'c13-g26', question: 'A Daghesh Forte in the second root consonant of יִפֹּל recovers which missing letter?', hebrew: 'יִפֹּל', options: ['נ', 'י', 'ה', 'א'], correctIndex: 0, explanation: 'Ch 16. A I-נ verb assimilates its נ into the following consonant. Restore it and you get נָפַל, "to fall." לָקַח behaves the same way.' },
  { id: 'c13-g27', question: 'What does a Seghol-He ending on an Imperfect indicate?', hebrew: 'יִבְנֶה', options: ['a I-נ verb', 'a Biconsonantal verb', 'a geminate verb', 'a III-ה verb'], correctIndex: 3, explanation: 'Ch 16. יִבְנֶה, יַעֲשֶׂה, יִרְאֶה. Compare the III-ה IMPERATIVE, which ends in Tsere-He instead.' },
  { id: 'c13-g28', question: 'Why does the stem vowel become Pathach in יִשְׁמַע?', hebrew: 'יִשְׁמַע', options: ['because the guttural third root letter prefers Pathach', 'because a נ has assimilated', 'because the verb is plural', 'because the syllable is open'], correctIndex: 0, explanation: 'Ch 16. The same guttural preference explains יִשְׁלַח and dozens of other forms — one rule, many payoffs.' },

  // --- Ch 17: Waw Consecutive ---
  { id: 'c13-g29', question: 'An IMPERFECT with the Waw Consecutive is translated with the values of:', hebrew: 'וַיִּקְטֹל', options: ['a Perfect', 'an unchanged Imperfect', 'an Imperative', 'a participle'], correctIndex: 0, explanation: 'Ch 17. The consecutive Imperfect is the backbone of Hebrew past narrative: וַיֹּאמֶר, "and he said."' },
  { id: 'c13-g30', question: 'A PERFECT with the Waw Consecutive is translated with the values of:', hebrew: 'וְקָטַל', options: ['an unchanged Perfect', 'an Imperfect', 'an Imperative', 'an infinitive'], correctIndex: 1, explanation: 'Ch 17. The two consecutive forms swap time frames in opposite directions. וְשָׁמַרְתָּ = "and you shall keep."' },
  { id: 'c13-g31', question: 'What is the spelling diagnostic of the Waw Consecutive on an Imperfect?', options: ['waw with Shewa, no doubling', 'waw with Qamets', 'waw with Pathach plus a Daghesh Forte in the preformative', 'waw with Holem'], correctIndex: 2, explanation: 'Ch 17. וַיִּקְטֹל. The plain conjunction is וְ, so the pointing alone tells you which one you are reading.' },

  // --- Ch 18-19: Imperative, pronominal suffixes on verbs ---
  { id: 'c13-g32', question: 'The Hebrew Imperative occurs in which person?', options: ['the first and second person', 'all three persons', 'the second person only', 'the third person only'], correctIndex: 2, explanation: 'Ch 18. Four forms only. First-person volition uses the Cohortative and third-person volition the Jussive.' },
  { id: 'c13-g33', question: 'How does Hebrew form a negative command?', options: ['by negating the Imperative with לֹא', 'with אֵין plus the Imperative', 'with בִּלְתִּי', 'with לֹא or אַל plus a second-person Imperfect'], correctIndex: 3, explanation: 'Ch 18. לֹא + Imperfect is the permanent prohibition of the Ten Commandments; אַל + Imperfect is the immediate "do not!"' },
  { id: 'c13-g34', question: 'Translate שְׁלָחֵנִי (Isaiah 6:8):', hebrew: 'שְׁלָחֵנִי', options: ['he sent me', 'Send me!', 'I will send', 'my messenger'], correctIndex: 1, explanation: 'Ch 18-19. An Imperative carrying the 1cs object suffix ־נִי, with the Tsere connecting vowel that Imperatives and Imperfects prefer.' },
  { id: 'c13-g35', question: 'The Nun-suffixes (־ֶנּוּ, ־ֶנָּה, ־ֶךָּ) attach mainly to which conjugation?', options: ['the Perfect', 'the participle', 'the infinitive absolute', 'the Imperfect'], correctIndex: 3, explanation: 'Ch 19. They carry a Daghesh Forte in the Nun and are common in poetry: יִשְׁמְרֶנּוּ, "he will keep him."' },

  // --- Ch 20-22: infinitives and participle ---
  { id: 'c13-g36', question: 'Translate לִשְׁמֹר:', hebrew: 'לִשְׁמֹר', options: ['he kept', 'keep!', 'to keep / in order to keep', 'the keeper'], correctIndex: 2, explanation: 'Ch 20. לְ plus the Infinitive Construct is the standard purpose construction. The Infinitive Construct is negated with בִּלְתִּי, never with לֹא.' },
  { id: 'c13-g37', question: 'What does the Infinitive Absolute do in מוֹת תָּמוּת?', hebrew: 'מוֹת תָּמוּת', options: ['it negates the verb', 'it intensifies the finite verb', 'it makes the verb plural', 'it turns the clause into a question'], correctIndex: 1, explanation: 'Ch 21. The emphatic use: the Infinitive Absolute stands in front of a finite verb of the same root.' },
  { id: 'c13-g38', question: 'Which vowel is diagnostic of the Qal ACTIVE participle?', hebrew: 'שֹׁמֵר', options: ['a Holem after the first root letter', 'a Shureq after the second root letter', 'a Hireq under the first root letter', 'a Qamets throughout'], correctIndex: 0, explanation: 'Ch 22. קֹטֵל, שֹׁמֵר, כֹּתֵב. The passive participle instead takes a Shureq: קָטוּל, בָּרוּךְ.' },
  { id: 'c13-g39', question: 'Parse בָּרוּךְ:', hebrew: 'בָּרוּךְ', options: ['Qal Perfect 3ms', 'Qal Imperative 2ms', 'Qal passive participle', 'Qal Infinitive Construct'], correctIndex: 2, explanation: 'Ch 22. The Shureq gives it away. בָּרוּךְ הַבָּא: a passive participle followed by an active one with the article.' },
  { id: 'c13-g40', question: 'Which category does a participle NOT have?', options: ['stem', 'voice', 'person', 'gender'], correctIndex: 2, explanation: 'Ch 22. It is a verbal adjective: verbal in stem and voice, adjectival in gender and number, and without person entirely.' },

  // --- Ch 23: sentence syntax ---
  { id: 'c13-g41', question: 'What is the normal word order of a Hebrew verbal clause?', options: ['verb – subject – object', 'subject – verb – object', 'object – verb – subject', 'subject – object – verb'], correctIndex: 0, explanation: 'Ch 23. בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם. When something is fronted before the verb, ask what is being emphasized.' },
  { id: 'c13-g42', question: 'What is a verbless clause?', hebrew: 'יְהוָה מֶלֶךְ', options: ['a clause whose verb has dropped out by scribal error', 'a clause with only a participle', 'a clause with two subjects', 'a subject and a predicate placed side by side, with no verb at all'], correctIndex: 3, explanation: 'Ch 23. יְהוָה מֶלֶךְ = "the LORD is king." English must supply the copula Hebrew leaves out.' },

  // --- Ch 24-25: Niphal ---
  { id: 'c13-g43', question: 'Parse יִקָּטֵל:', hebrew: 'יִקָּטֵל', options: ['Qal Imperfect 3ms', 'Niphal Imperfect 3ms', 'Piel Imperfect 3ms', 'Hiphil Imperfect 3ms'], correctIndex: 1, explanation: 'Ch 24. The Daghesh Forte in the first root consonant IS the assimilated stem נ. Compare the Perfect נִקְטַל, where the נ is written out.' },
  { id: 'c13-g44', question: 'Translate נִבְנָה:', hebrew: 'נִבְנָה', options: ['he built', 'he will build', 'build!', 'it was built'], correctIndex: 3, explanation: 'Ch 25. A III-ה Niphal of בָּנָה. The Niphal is the passive or reflexive counterpart of the Qal — and occasionally simply active, when the root is rare in the Qal.' },
  { id: 'c13-g45', question: 'How do you tell the Niphal Perfect נִקְטַל from the Niphal Participle נִקְטָל?', hebrew: 'נִקְטַל / נִקְטָל', options: ['by the stem vowel', 'by the prefix vowel', 'by the root consonants', 'they cannot be distinguished'], correctIndex: 0, explanation: 'Ch 24. One vowel is the whole difference, which is why Niphal participles are so often misparsed as Perfects.' },

  // --- Ch 26-29: Hiphil and Hophal ---
  { id: 'c13-g46', question: 'Parse יַקְטִיל:', hebrew: 'יַקְטִיל', options: ['Qal Imperfect 3ms', 'Niphal Imperfect 3ms', 'Hiphil Imperfect 3ms', 'Hophal Imperfect 3ms'], correctIndex: 2, explanation: 'Ch 26. Pathach preformative plus a Hireq Yod stem vowel. The Hireq Yod is the Hiphil\'s own signature.' },
  { id: 'c13-g47', question: 'Which stem does a u-class or o-class PREFIX vowel identify?', hebrew: 'הָקְטַל / הֻקְטַל', options: ['the Niphal', 'the Piel', 'the Hophal', 'the Hithpael'], correctIndex: 2, explanation: 'Ch 28. Think in vowel classes rather than particular vowels — Qibbuts, Shureq, Qamets Hatuf and Holem all occur, especially in weak verbs.' },
  { id: 'c13-g48', question: 'Which root would you look up for הִגִּיד?', hebrew: 'הִגִּיד', options: ['נָגַד ("to tell")', 'גָּדַל ("to be great")', 'גּוּר ("to sojourn")', 'נָגַשׁ ("to draw near")'], correctIndex: 0, explanation: 'Ch 27. The Daghesh Forte recovers the assimilated נ. Its Hophal passive is הֻגַּד, "it was told."' },

  // --- Ch 30-33: Piel and Pual ---
  { id: 'c13-g49', question: 'A Daghesh Forte in the second root consonant WITH a Qibbuts under the first identifies which stem?', hebrew: 'קֻטַּל', options: ['the Piel', 'the Pual', 'the Hophal', 'the Niphal'], correctIndex: 1, explanation: 'Ch 32. The Piel קִטֵּל has a Hireq there instead. That one vowel separates "he smashed" from "it was smashed."' },
  { id: 'c13-g50', question: 'Translate דִּבֶּר:', hebrew: 'דִּבֶּר', options: ['it was spoken', 'speak!', 'he will speak', 'he spoke'], correctIndex: 3, explanation: 'Ch 30. דָּבַר is rare in the Qal, so the Piel simply means "he spoke." The Daghesh Forte in the ב is the Piel fingerprint.' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Section 2: Vocabulary MCQ — 30 questions across the "You Should Know" lists
// ═══════════════════════════════════════════════════════════════════════════════

export const class13VocabQuestions: PracticeMCQ[] = [
  { id: 'c13-v01', question: 'What does בָּרָא mean?', hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים', options: ['to speak', 'to create', 'to see', 'to rule'], correctIndex: 1, explanation: 'In the Qal, בָּרָא always has GOD as its subject — it names a uniquely divine act, unlike the broader עָשָׂה ("to make").' },
  { id: 'c13-v02', question: 'What does חֶסֶד mean?', hebrew: 'חֶסֶד', options: ['steadfast love, covenant loyalty', 'anger', 'wisdom', 'strength'], correctIndex: 0, explanation: 'One of the great theological words of the Hebrew Bible — loyal love within a covenant relationship.' },
  { id: 'c13-v03', question: 'What does בְּרִית mean?', hebrew: 'בְּרִית', options: ['blessing', 'sacrifice', 'commandment', 'covenant'], correctIndex: 3, explanation: 'The idiom is כָּרַת בְּרִית, literally "to cut a covenant" (Ch 15 vocabulary).' },
  { id: 'c13-v04', question: 'What does מִשְׁפָּט mean?', hebrew: 'מִשְׁפָּט', options: ['peace', 'judgment, justice, ordinance', 'truth', 'glory'], correctIndex: 1, explanation: 'From שָׁפַט ("to judge," Ch 17 vocabulary). Often paired with צְדָקָה ("righteousness").' },
  { id: 'c13-v05', question: 'What does אֱמֶת mean?', hebrew: 'אֱמֶת', options: ['tent', 'stone', 'ground', 'truth, faithfulness'], correctIndex: 3, explanation: 'Ch 17 vocabulary. Built on the root אָמַן, which gives the Niphal נֶאֱמָן ("faithful") and the Hiphil הֶאֱמִין ("he believed").' },
  { id: 'c13-v06', question: 'What does אֹהֶל mean?', hebrew: 'אֹהֶל', options: ['tent', 'truth', 'lamp', 'gate'], correctIndex: 0, explanation: 'Ch 17 vocabulary. אֹהֶל מוֹעֵד is "the tent of meeting."' },
  { id: 'c13-v07', question: 'What does גָּלָה mean?', hebrew: 'גָּלָה', options: ['to be great', 'to sojourn', 'to uncover, reveal; to go into exile', 'to redeem'], correctIndex: 2, explanation: 'Ch 17 vocabulary. Its Niphal gives Isaiah 40:5, "and the glory of the LORD shall be revealed"; its Hiphil means "to carry into exile."' },
  { id: 'c13-v08', question: 'What does שָׁפַט mean?', hebrew: 'שָׁפַט', options: ['to judge, decide, settle a dispute', 'to send', 'to keep', 'to hear'], correctIndex: 0, explanation: 'Ch 17 vocabulary. Its participle שֹׁפֵט gives the title of the book of Judges.' },
  { id: 'c13-v09', question: 'What does בָּחַר mean?', hebrew: 'בָּחַר', options: ['to trust', 'to weep', 'to choose, test, examine', 'to build'], correctIndex: 2, explanation: 'Ch 18 vocabulary. "Choose this day whom you will serve" (Josh 24:15) uses its Imperative בַּחֲרוּ.' },
  { id: 'c13-v10', question: 'What does דָּרַשׁ mean?', hebrew: 'דָּרַשׁ', options: ['to speak', 'to seek, inquire of, require', 'to tread', 'to know'], correctIndex: 1, explanation: 'Ch 18 vocabulary. "Seek good, and not evil" (Amos 5:14) uses its Imperative דִּרְשׁוּ.' },
  { id: 'c13-v11', question: 'What does שֵׁבֶט mean?', hebrew: 'שֵׁבֶט', options: ['peace', 'sun', 'rod, staff, scepter, tribe', 'year'], correctIndex: 2, explanation: 'Ch 18 vocabulary. One word covers both the shepherd\'s rod and the tribe it came to symbolize.' },
  { id: 'c13-v12', question: 'What does בָּטַח mean?', hebrew: 'בָּטַח', options: ['to choose', 'to weep', 'to trust, rely upon', 'to slaughter'], correctIndex: 2, explanation: 'Ch 19 vocabulary. "Blessed is the man who trusts (יִבְטַח) in the LORD" (Jer 17:7).' },
  { id: 'c13-v13', question: 'What does זֶרַע mean?', hebrew: 'זֶרַע', options: ['to remember', 'sacrifice', 'outcry', 'seed, offspring, descendants'], correctIndex: 3, explanation: 'Ch 19 vocabulary. "Through Isaac shall your offspring be named" (Gen 21:12).' },
  { id: 'c13-v14', question: 'What does עָוֹן mean?', hebrew: 'עָוֹן', options: ['eye', 'iniquity, guilt, punishment for sin', 'forever', 'people'], correctIndex: 1, explanation: 'Ch 19 vocabulary. "The LORD has laid on him the iniquity of us all" (Isa 53:6).' },
  { id: 'c13-v15', question: 'What does שָׁבַר mean?', hebrew: 'שָׁבַר', options: ['to dwell', 'to break in pieces, smash, shatter', 'to judge', 'to ask'], correctIndex: 1, explanation: 'Ch 20 vocabulary. Its Piel intensifies it further, and its Niphal participle gives "the brokenhearted" (Ps 34:18).' },
  { id: 'c13-v16', question: 'What does שָׂנֵא mean?', hebrew: 'שָׂנֵא', options: ['to rejoice', 'to hate', 'to break', 'to remain'], correctIndex: 1, explanation: 'Ch 21 vocabulary. Its participle serves as the ordinary word for "enemy."' },
  { id: 'c13-v17', question: 'What does מוֹעֵד mean?', hebrew: 'מוֹעֵד', options: ['appointed time, meeting place, assembly', 'deed', 'messenger', 'judgment'], correctIndex: 0, explanation: 'Ch 21 vocabulary. It names both the festival calendar and the tent where God met his people.' },
  { id: 'c13-v18', question: 'What does קָבַר mean?', hebrew: 'קָבַר', options: ['to bury', 'to gather', 'to be holy', 'to call'], correctIndex: 0, explanation: 'Ch 22 vocabulary. The noun קֶבֶר ("grave") comes from the same root.' },
  { id: 'c13-v19', question: 'What does חָכְמָה mean?', hebrew: 'חָכְמָה', options: ['wrath', 'courtyard', 'darkness', 'wisdom, skill'], correctIndex: 3, explanation: 'Ch 23 vocabulary. "The fear of the LORD is instruction in wisdom" (Prov 15:33).' },
  { id: 'c13-v20', question: 'What does כֹּחַ mean?', hebrew: 'כֹּחַ', options: ['strength, power', 'fool', 'vineyard', 'lamb'], correctIndex: 0, explanation: 'Ch 23 vocabulary. Note the Furtive Pathach under the final guttural ח.' },
  { id: 'c13-v21', question: 'What does אָמַן mean?', hebrew: 'אָמַן', options: ['to say', 'to gather', 'to be faithful, reliable; to believe, trust', 'to bind'], correctIndex: 2, explanation: 'Ch 24 vocabulary. Genesis 15:6 uses its Hiphil: "and he believed the LORD."' },
  { id: 'c13-v22', question: 'What does יָשַׁע mean?', hebrew: 'יָשַׁע', options: ['to sit', 'to be left over', 'to be delivered; to save, deliver', 'to give birth'], correctIndex: 2, explanation: 'Ch 24 vocabulary. The nouns יְשׁוּעָה ("salvation") and the name יְהוֹשֻׁעַ come from this root.' },
  { id: 'c13-v23', question: 'What does חֹשֶׁךְ mean?', hebrew: 'חֹשֶׁךְ', options: ['wisdom', 'wrath', 'courtyard', 'darkness'], correctIndex: 3, explanation: 'Ch 25 vocabulary. "And God separated the light from the darkness" (Gen 1:4).' },
  { id: 'c13-v24', question: 'What does בָּקַשׁ mean?', hebrew: 'בָּקַשׁ', options: ['to seek, search for, require', 'to choose', 'to trust', 'to understand'], correctIndex: 0, explanation: 'Ch 26 vocabulary. It occurs almost entirely in the Piel: בַּקְּשׁוּ פָנָי, "seek my face" (Ps 27:8).' },
  { id: 'c13-v25', question: 'What does עָזַר mean?', hebrew: 'עָזַר', options: ['to help, assist, come to the aid of', 'to forsake', 'to pass over', 'to arrange'], correctIndex: 0, explanation: 'Ch 27 vocabulary. Do not confuse it with עָזַב ("to forsake") — one letter apart, opposite in sense.' },
  { id: 'c13-v26', question: 'What does פֶּשַׁע mean?', hebrew: 'פֶּשַׁע', options: ['fruit', 'transgression, rebellion', 'corner, edge', 'face'], correctIndex: 1, explanation: 'Ch 29 vocabulary. "He was pierced for our transgressions" (Isa 53:5).' },
  { id: 'c13-v27', question: 'What does יְשׁוּעָה mean?', hebrew: 'יְשׁוּעָה', options: ['right hand', 'remainder', 'day', 'salvation, help, deliverance'], correctIndex: 3, explanation: 'Ch 31 vocabulary. Built on יָשַׁע (Ch 24 vocabulary).' },
  { id: 'c13-v28', question: 'What does שָׁבַת mean?', hebrew: 'שָׁבַת', options: ['to break', 'to swear', 'to dwell', 'to stop, cease, rest'], correctIndex: 3, explanation: 'Ch 33 vocabulary. The root behind שַׁבָּת ("sabbath").' },
  { id: 'c13-v29', question: 'What does פָּלַל mean?', hebrew: 'פָּלַל', options: ['to pray, make intercession', 'to be wonderful', 'to turn', 'to open'], correctIndex: 0, explanation: 'Ch 34 vocabulary. It lives almost entirely in the Hithpael, and gives the noun תְּפִלָּה ("prayer").' },
  { id: 'c13-v30', question: 'What does חָוָה mean?', hebrew: 'חָוָה', options: ['to live', 'to bow down, worship', 'to camp', 'to burn with anger'], correctIndex: 1, explanation: 'Ch 35 vocabulary. Its form הִשְׁתַּחֲוָה is the standard biblical word for worship — and one of the hardest in the Bible to look up.' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Section 3: Verse Analysis — 5 anchor verses spanning the whole verbal system
// ═══════════════════════════════════════════════════════════════════════════════

export const class13VerseAnalysisQuestions: PracticeVerseAnalysis[] = [
  {
    id: 'c13-va01',
    reference: 'Genesis 1:1',
    hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ',
    transliteration: 'bə·rê·šît bā·rā ʾĕ·lō·hîm ʾêt haš·šā·ma·yim wə·ʾêt hā·ʾā·reṣ',
    referenceTranslation: 'In the beginning God created the heavens and the earth.',
    keyTerms: ['beginning', 'created', 'God', 'heavens', 'earth'],
    matchingPairs: [
      { hebrew: 'בְּרֵאשִׁית', category: 'Inseparable preposition + feminine noun (Ch 6)' },
      { hebrew: 'בָּרָא', category: 'Qal Perfect 3ms (Ch 13)' },
      { hebrew: 'אֵת', category: 'Definite direct object marker (Ch 6)' },
      { hebrew: 'הַשָּׁמַיִם', category: 'Article + dual noun (Ch 4-5)' },
      { hebrew: 'הָאָרֶץ', category: 'Article with compensatory lengthening + feminine noun (Ch 5)' },
    ],
    distractorCategories: [
      'Qal Imperfect 3ms (Ch 15)',
      'Niphal Participle ms (Ch 24)',
      'Construct chain, masculine plural (Ch 10)',
      'Piel Perfect 3ms (Ch 30)',
    ],
  },
  {
    id: 'c13-va02',
    reference: 'Genesis 1:4',
    hebrew: 'וַיַּרְא אֱלֹהִים אֶת־הָאוֹר כִּי־טוֹב וַיַּבְדֵּל אֱלֹהִים בֵּין הָאוֹר וּבֵין הַחֹשֶׁךְ',
    transliteration: 'way·yarʾ ʾĕ·lō·hîm ʾet-hā·ʾôr kî-ṭôḇ way·yaḇ·dêl ʾĕ·lō·hîm bên hā·ʾôr û·ḇên ha·ḥō·šeḵ',
    referenceTranslation: 'And God saw the light, that it was good. And God separated the light from the darkness.',
    keyTerms: ['saw', 'light', 'good', 'separated', 'darkness'],
    matchingPairs: [
      { hebrew: 'וַיַּרְא', category: 'Waw Consecutive + Qal Imperfect 3ms, III-ה (Ch 17)' },
      { hebrew: 'אֶת־הָאוֹר', category: 'Object marker + article + masculine noun (Ch 5-6)' },
      { hebrew: 'כִּי', category: 'Conjunction introducing the content of perception (Ch 23)' },
      { hebrew: 'וַיַּבְדֵּל', category: 'Waw Consecutive + HIPHIL Imperfect 3ms (Ch 17, 26)' },
      { hebrew: 'בֵּין', category: 'Independent preposition, "between" (Ch 6)' },
    ],
    distractorCategories: [
      'Hophal Perfect 3ms (Ch 28)',
      'Qal Infinitive Construct (Ch 20)',
      'Niphal Imperfect 3ms (Ch 24)',
      'Pual Participle ms (Ch 32)',
    ],
  },
  {
    id: 'c13-va03',
    reference: 'Psalm 23:1',
    hebrew: 'יְהוָה רֹעִי לֹא אֶחְסָר',
    transliteration: 'YHWH rō·ʿî lō ʾeḥ·sār',
    referenceTranslation: 'The LORD is my shepherd; I shall not want.',
    keyTerms: ['LORD', 'shepherd', 'not', 'want', 'lack'],
    matchingPairs: [
      { hebrew: 'יְהוָה רֹעִי', category: 'Verbless clause — subject and predicate side by side (Ch 23)' },
      { hebrew: 'רֹעִי', category: 'Qal active participle + 1cs suffix, "my shepherd" (Ch 9, 22)' },
      { hebrew: 'לֹא', category: 'Negative particle for a permanent negation (Ch 15)' },
      { hebrew: 'אֶחְסָר', category: 'Qal Imperfect 1cs — the א preformative marks "I" (Ch 15)' },
    ],
    distractorCategories: [
      'Qal Perfect 1cs (Ch 13)',
      'Qal Imperative 2ms (Ch 18)',
      'Construct chain, feminine singular (Ch 10)',
      'Hithpael Imperfect 3ms (Ch 34)',
    ],
  },
  {
    id: 'c13-va04',
    reference: 'Isaiah 40:5',
    hebrew: 'וְנִגְלָה כְּבוֹד יְהוָה וְרָאוּ כָל־בָּשָׂר יַחְדָּו',
    transliteration: 'wə·niḡ·lāh kə·ḇôd YHWH wə·rā·ʾû ḵol-bā·śār yaḥ·dāw',
    referenceTranslation: 'And the glory of the LORD shall be revealed, and all flesh shall see it together.',
    keyTerms: ['revealed', 'glory', 'LORD', 'see', 'all', 'flesh'],
    matchingPairs: [
      { hebrew: 'וְנִגְלָה', category: 'Waw Consecutive + NIPHAL Perfect 3ms, III-ה (Ch 17, 25)' },
      { hebrew: 'כְּבוֹד יְהוָה', category: 'Construct chain — "the glory of the LORD" (Ch 10)' },
      { hebrew: 'וְרָאוּ', category: 'Waw Consecutive + Qal Perfect 3cp (Ch 13, 17)' },
      { hebrew: 'כָל־בָּשָׂר', category: 'Construct of "all" + masculine noun (Ch 10)' },
      { hebrew: 'יַחְדָּו', category: 'Adverb, "together"' },
    ],
    distractorCategories: [
      'Piel Perfect 3ms (Ch 30)',
      'Qal passive participle ms (Ch 22)',
      'Hiphil Imperfect 3mp (Ch 26)',
      'Definite direct object marker (Ch 6)',
    ],
  },
  {
    id: 'c13-va05',
    reference: 'Deuteronomy 6:4',
    hebrew: 'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד',
    transliteration: 'šə·maʿ yiś·rā·ʾêl YHWH ʾĕ·lō·hê·nû YHWH ʾe·ḥāḏ',
    referenceTranslation: 'Hear, O Israel: the LORD our God, the LORD is one.',
    keyTerms: ['hear', 'Israel', 'LORD', 'our God', 'one'],
    matchingPairs: [
      { hebrew: 'שְׁמַע', category: 'Qal Imperative 2ms, with a Pathach stem vowel before the guttural (Ch 18)' },
      { hebrew: 'יִשְׂרָאֵל', category: 'Proper noun in the vocative (Ch 23)' },
      { hebrew: 'אֱלֹהֵינוּ', category: 'Noun + 1cp pronominal suffix, "our God" (Ch 9)' },
      { hebrew: 'אֶחָד', category: 'The number "one," behaving as an adjective (Ch 11)' },
      { hebrew: 'יְהוָה אֶחָד', category: 'Verbless clause — "the LORD is one" (Ch 23)' },
    ],
    distractorCategories: [
      'Qal Perfect 3ms (Ch 13)',
      'Qal Infinitive Absolute (Ch 21)',
      'Niphal Participle ms (Ch 24)',
      'Ordinal number (Ch 11)',
    ],
  },
];

export const CLASS13_PRACTICE_PAPER_SECTIONS = [
  { id: 1, title: 'Grammar', questionCount: class13GrammarQuestions.length, description: 'Parse forms and identify structures from Chapters 1-35' },
  { id: 2, title: 'Vocabulary', questionCount: class13VocabQuestions.length, description: 'Identify the meaning of words from the "You Should Know" lists' },
  { id: 3, title: 'Verse Analysis', questionCount: class13VerseAnalysisQuestions.length, description: 'Match Hebrew words to grammatical categories and translate' },
] as const;
