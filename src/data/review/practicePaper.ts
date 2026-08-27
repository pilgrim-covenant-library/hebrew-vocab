/**
 * Hebrew Practice Paper — Genesis 1:1-5 (Guided Practice)
 * Aligned with Basics of Biblical Hebrew (Pratico/Van Pelt), Chapters 1–36.
 *
 * Section 1: Grammar MCQ (50 questions covering all BBH topics)
 * Section 2: Vocabulary MCQ (30 questions on BBH frequency-list vocabulary)
 * Section 3: Verse Analysis — matching + translation (5 Genesis 1 verses)
 */

export interface PracticeMCQ {
  id: string;
  question: string;
  hebrew?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MatchingPair {
  hebrew: string;
  category: string;
}

export interface PracticeVerseAnalysis {
  id: string;
  reference: string;
  hebrew: string;
  transliteration: string;
  referenceTranslation: string;
  keyTerms: string[];
  matchingPairs: MatchingPair[];
  distractorCategories: string[];
}

// ═══════════════════════════════════════════════════════════════════════════════
// Section 1: Grammar MCQ — 50 questions from Genesis 1:1–5
// ═══════════════════════════════════════════════════════════════════════════════

export const grammarQuestions: PracticeMCQ[] = [
  // --- Noun & Article ---
  { id: 'pp-g01', question: 'Parse בְּרֵאשִׁית in Genesis 1:1:', hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים', options: ['Preposition + masc noun', 'Preposition + fem noun', 'Definite article + noun', 'Construct chain'], correctIndex: 1, explanation: 'בְּ ("in/at") + רֵאשִׁית ("beginning," fem sg). Adverbial: "in [the] beginning." Note: no article — Hebrew often leaves the first word indefinite.' },
  { id: 'pp-g02', question: 'Parse אֱלֹהִים in Genesis 1:1:', hebrew: 'בָּרָא אֱלֹהִים', options: ['Masc sg', 'Fem sg', 'Masc pl form, sg meaning ("God") with sg verb', 'Construct'], correctIndex: 2, explanation: 'אֱלֹהִים has masc plural ending (-îm) but takes singular verb בָּרָא — a "plural of majesty." It is the standard word for the one true God in the OT.' },
  { id: 'pp-g03', question: 'Parse הַשָּׁמַיִם in Genesis 1:1:', hebrew: 'אֵת הַשָּׁמַיִם', options: ['Article + masc sg', 'Article + masc pl', 'Article + dual', 'Article + fem pl'], correctIndex: 2, explanation: 'הַ (article, with dagesh in ש) + שָׁמַיִם ("heavens," dual ending -ayim). The article + dagesh combination is the article\'s "fingerprint."' },
  { id: 'pp-g04', question: 'Parse הָאָרֶץ in Genesis 1:1:', hebrew: 'וְאֵת הָאָרֶץ', options: ['Article הַ + masc sg', 'Article הָ (compensatory) + fem sg', 'Construct + fem', 'Conjunction + noun'], correctIndex: 1, explanation: 'הָ (qamets) + אָרֶץ. Because א is a guttural and cannot take dagesh, the article LENGTHENS its vowel from pataḥ to qamets. אָרֶץ is feminine.' },
  { id: 'pp-g05', question: 'Parse הָאוֹר in Genesis 1:4:', hebrew: 'אֶת־הָאוֹר', options: ['Article + masc sg', 'Article + fem sg', 'Construct', 'Verbal noun'], correctIndex: 0, explanation: 'הָ (compensatory lengthening before guttural א) + אוֹר ("light," masc sg). The article makes it "the light."' },
  { id: 'pp-g06', question: 'Parse הַחֹשֶׁךְ in Genesis 1:4:', hebrew: 'בֵּין הָאוֹר וּבֵין הַחֹשֶׁךְ', options: ['Article + masc sg', 'Article + fem sg', 'Construct', 'Pronoun'], correctIndex: 0, explanation: 'הַ (article) + חֹשֶׁךְ ("darkness," masc sg). Note: no dagesh would be expected in ח (guttural), so the article keeps pataḥ via "virtual doubling."' },
  { id: 'pp-g07', question: 'Parse יוֹם in Genesis 1:5:', hebrew: 'וַיִּקְרָא אֱלֹהִים לָאוֹר יוֹם', options: ['Masc sg, definite', 'Masc sg, indefinite', 'Fem sg', 'Construct'], correctIndex: 1, explanation: 'יוֹם = "day," masc sg, INDEFINITE (no article) — predicate of the naming clause: "called the light Day."' },
  { id: 'pp-g08', question: 'Parse לָיְלָה in Genesis 1:5:', hebrew: 'וְלַחֹשֶׁךְ קָרָא לָיְלָה', options: ['Masc sg with feminine ending', 'Fem sg', 'Construct', 'Verbal noun'], correctIndex: 0, explanation: 'לָיְלָה = "night." Despite the -āh ending (usually fem), it is grammatically MASCULINE. A common irregular noun.' },
  { id: 'pp-g09', question: 'In construct chains, definiteness is shown by:', options: ['Article on the construct (first) noun', 'Article on the absolute (last) noun — propagates back', 'Both nouns must have the article', 'Definiteness cannot appear in construct'], correctIndex: 1, explanation: 'Construct chain rule: the article on the ABSOLUTE noun makes the entire chain definite. דְּבַר הַמֶּלֶךְ = "the word of the king" (both definite). Never put הַ on the construct itself.' },
  { id: 'pp-g10', question: 'Parse פְּנֵי in Genesis 1:2 (פְּנֵי תְהוֹם):', hebrew: 'עַל־פְּנֵי תְהוֹם', options: ['Masc sg absolute', 'Masc pl absolute', 'Masc pl construct', 'Verb form'], correctIndex: 2, explanation: 'פָּנִים ("face") in plural construct: -îm → -ê (final mem drops, -ê ending). פְּנֵי תְהוֹם = "face/surface of [the] deep."' },

  // --- Prepositions ---
  { id: 'pp-g11', question: 'Parse בְּ in בְּרֵאשִׁית:', hebrew: 'בְּרֵאשִׁית', options: ['Conjunction "and"', 'Inseparable preposition "in/at"', 'Article', 'Direct object marker'], correctIndex: 1, explanation: 'בְּ is one of the three INSEPARABLE prepositions (בְּ, כְּ, לְ — "B-K-L"). Always prefixed. Means "in, at, by, with."' },
  { id: 'pp-g12', question: 'Parse לָאוֹר in Genesis 1:5:', hebrew: 'וַיִּקְרָא אֱלֹהִים לָאוֹר יוֹם', options: ['לְ + הָ (article absorbed)', 'Just לְ + indefinite', 'Conjunction + noun', 'Construct chain'], correctIndex: 0, explanation: 'לָ = לְ + הָ (article absorbed; ה elides, vowel transfers). "to the light." The qamets under ל is the giveaway that the article is hiding.' },
  { id: 'pp-g13', question: 'Parse עַל in Genesis 1:2:', hebrew: 'וְחֹשֶׁךְ עַל־פְּנֵי תְהוֹם', options: ['Inseparable preposition', 'Independent preposition "on/upon"', 'Conjunction', 'Particle'], correctIndex: 1, explanation: 'עַל = "on/upon/over," an INDEPENDENT (not inseparable) preposition. Often connected with maqqef (־) to the next word. Used here for "over the surface of the deep."' },
  { id: 'pp-g14', question: 'How does מִן ("from") often prefix?', options: ['As מִ + dagesh in next consonant', 'As מָה-', 'As מ alone', 'It never prefixes'], correctIndex: 0, explanation: 'מִן shortens to מִ + dagesh (the נ assimilates by doubling). Before gutturals (no dagesh): becomes מֵ with compensatory lengthening (מֵאִישׁ).' },
  { id: 'pp-g15', question: 'Parse בֵּין in Genesis 1:4:', hebrew: 'וַיַּבְדֵּל אֱלֹהִים בֵּין הָאוֹר וּבֵין הַחֹשֶׁךְ', options: ['Conjunction', 'Independent preposition "between"', 'Verb form', 'Article variant'], correctIndex: 1, explanation: 'בֵּין = "between." Used twice in this clause — "between X and between Y" — typical Hebrew idiom for "between X and Y."' },

  // --- Conjunctions & Particles ---
  { id: 'pp-g16', question: 'Parse the וְ in וְהָאָרֶץ (Gen 1:2):', options: ['Disjunctive vav (subject before verb)', 'Vav-consecutive (narrative past)', 'Article', 'Preposition'], correctIndex: 0, explanation: 'A clause-initial וְ + NOUN (not a verb) introduces a DISJUNCTIVE clause: "now the earth..." or "and the earth..." It signals background/setting, not narrative advance.' },
  { id: 'pp-g17', question: 'Parse וַ in וַיֹּאמֶר (Gen 1:3):', hebrew: 'וַיֹּאמֶר אֱלֹהִים', options: ['Conjunctive vav with verb', 'Vav-consecutive (wayyiqtol — narrative past)', 'Vav-consecutive perfect', 'Disjunctive vav'], correctIndex: 1, explanation: 'וַ + dagesh in the prefix consonant + imperfect = WAYYIQTOL = narrative past. וַיֹּאמֶר = "and he said." This is the most frequent verb form in OT narrative.' },
  { id: 'pp-g18', question: 'Parse אֵת in Genesis 1:1:', hebrew: 'בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם', options: ['"Sign" (noun)', 'DEFINITE direct object marker', 'Conjunction', 'Verb'], correctIndex: 1, explanation: 'אֵת (or אֶת־ with maqqef) marks the DEFINITE direct object. It does not translate into English — it is a grammatical particle. Indefinite objects take no marker.' },
  { id: 'pp-g19', question: 'Why does אֵת appear before הַשָּׁמַיִם but no equivalent appears before רֵאשִׁית?', options: ['Random', 'אֵת marks definite objects only; הַשָּׁמַיִם has the article so it is marked', 'Because שָׁמַיִם is plural', 'Because the verse is poetry'], correctIndex: 1, explanation: 'הַשָּׁמַיִם is definite (article). רֵאשִׁית is indefinite — so no marker. The rule is consistent: only definite direct objects take אֵת.' },
  { id: 'pp-g20', question: 'Parse כִּי in Genesis 1:4:', hebrew: 'וַיַּרְא אֱלֹהִים אֶת־הָאוֹר כִּי־טוֹב', options: ['"Because/that" — content of perception', 'Negative particle', 'Article', 'Verb'], correctIndex: 0, explanation: 'כִּי = "because, that" — frequent conjunction. Here it introduces what God saw: "saw the light, that it was good."' },

  // --- Pronouns & Suffixes ---
  { id: 'pp-g21', question: 'Pronominal suffix on noun: דְּבָרוֹ means:', options: ['"my word"', '"his word"', '"your word"', '"their word"'], correctIndex: 1, explanation: 'דָּבָר ("word") + -וֹ (3ms suffix "his") → דְּבָרוֹ. Hebrew shows possession by suffixing pronouns directly to nouns.' },
  { id: 'pp-g22', question: 'What does the suffix -ִי mean (e.g., דְּבָרִי)?', options: ['"his"', '"my"', '"your" (m sg)', '"our"'], correctIndex: 1, explanation: '-ִי = 1st person singular suffix ("my"). Patterns: -ִי my, -ְךָ your m, -ֵךְ your f, -וֹ his, -ָהּ her, -נוּ our, -ְכֶם your mp, -ָם their m.' },
  { id: 'pp-g23', question: 'Identify the demonstrative for "this" (m sg):', options: ['זֹאת', 'זֶה', 'אֵלֶּה', 'הוּא'], correctIndex: 1, explanation: 'זֶה = "this" (m sg). Fem: זֹאת. Plural (both genders): אֵלֶּה. The "far demonstrative" ("that/those") uses 3rd person personal pronouns.' },
  { id: 'pp-g24', question: 'Identify the personal pronoun for "I":', options: ['הוּא', 'אֲנִי / אָנֹכִי', 'אַתָּה', 'אֲנַחְנוּ'], correctIndex: 1, explanation: 'אֲנִי and אָנֹכִי both mean "I." אָנֹכִי is the longer/older form; אֲנִי is more common in later Hebrew. Plural: אֲנַחְנוּ ("we").' },
  { id: 'pp-g25', question: 'What is interrogative "what?":', options: ['מִי', 'מָה', 'מָתַי', 'אֵיךְ'], correctIndex: 1, explanation: 'מָה = "what?" (with a few vowel variants based on what follows). מִי = "who?" Other interrogatives: מָתַי "when," אֵיפֹה "where," אֵיךְ "how," לָמָּה "why."' },

  // --- Verbs: Qal Perfect ---
  { id: 'pp-g26', question: 'Parse בָּרָא in Genesis 1:1:', hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים', options: ['Qal perfect 3ms', 'Qal imperfect 3ms', 'Niphal perfect 3ms', 'Piel perfect 3ms'], correctIndex: 0, explanation: 'בָּרָא = qal perfect 3ms ("he created"). Citation form: qātal (qamets-pataḥ on the three root letters). Strong verb pattern.' },
  { id: 'pp-g27', question: 'Parse הָיְתָה in Genesis 1:2:', hebrew: 'וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ', options: ['Qal perfect 3ms', 'Qal perfect 3fs', 'Qal participle fs', 'Hiphil perfect 3fs'], correctIndex: 1, explanation: 'הָיְתָה = qal perfect 3fs of הָיָה ("she/it was"). Subject is הָאָרֶץ (fem). Note the fs ending -ָה.' },
  { id: 'pp-g28', question: 'What is the Qal perfect 3ms (citation form) of √sh-m-r ("guard")?', options: ['יִשְׁמֹר', 'שָׁמַר', 'שׁוֹמֵר', 'שָׁמוּר'], correctIndex: 1, explanation: 'שָׁמַר = qal perfect 3ms = "he kept/guarded." Pattern: qāmas-pataḥ. This is the dictionary citation form of any Hebrew verb.' },
  { id: 'pp-g29', question: 'Qal perfect 1cs of √k-t-b ("write"):', options: ['כָּתַב', 'כָּתַבְתָּ', 'כָּתַבְתִּי', 'יִכְתֹּב'], correctIndex: 2, explanation: 'כָּתַבְתִּי = qal perfect 1cs ("I wrote"). Suffixes for perfect: 3ms ∅, 3fs -ָה, 2ms -ְתָּ, 2fs -ְתְּ, 1cs -ְתִּי, 3p -וּ, 2mp -ְתֶּם, 1cp -ְנוּ.' },

  // --- Verbs: Qal Imperfect & Wayyiqtol ---
  { id: 'pp-g30', question: 'Parse יְהִי in Genesis 1:3:', hebrew: 'יְהִי אוֹר', options: ['Qal imperfect 3ms', 'Qal jussive 3ms ("let there be")', 'Qal participle ms', 'Niphal imperfect 3ms'], correctIndex: 1, explanation: 'יְהִי = jussive (a shortened imperfect expressing wish/command) of הָיָה: "let there be." The volitive force makes it the divine fiat: "Let there be light!"' },
  { id: 'pp-g31', question: 'Parse וַיְהִי in Genesis 1:3:', hebrew: 'וַיְהִי אוֹר', options: ['Qal imperfect 3ms', 'Qal wayyiqtol 3ms (narrative past)', 'Qal jussive 3ms', 'Hiphil perfect 3ms'], correctIndex: 1, explanation: 'וַיְהִי = wayyiqtol of הָיָה: "and there was." This is the narrative form — "and so it was." Compare with יְהִי (jussive: "let there be").' },
  { id: 'pp-g32', question: 'Parse וַיֹּאמֶר in Genesis 1:3:', hebrew: 'וַיֹּאמֶר אֱלֹהִים', options: ['Qal perfect 3ms', 'Qal imperfect 3ms', 'Qal wayyiqtol 3ms (narrative past)', 'Piel perfect'], correctIndex: 2, explanation: 'וַיֹּאמֶר = wayyiqtol of אָמַר ("say"). וַ + dagesh in next consonant + shortened imperfect = "and he said." The standard narrative verb in the OT.' },
  { id: 'pp-g33', question: 'Parse וַיַּרְא in Genesis 1:4:', hebrew: 'וַיַּרְא אֱלֹהִים אֶת־הָאוֹר', options: ['Qal perfect 3ms', 'Qal wayyiqtol 3ms (narrative past)', 'Niphal perfect 3ms', 'Hiphil imperfect 3ms'], correctIndex: 1, explanation: 'וַיַּרְא = wayyiqtol 3ms of רָאָה ("see"). Apocopated form (final ה drops in jussive/wayyiqtol). "And he saw."' },
  { id: 'pp-g34', question: 'Parse וַיִּקְרָא in Genesis 1:5:', hebrew: 'וַיִּקְרָא אֱלֹהִים לָאוֹר יוֹם', options: ['Qal wayyiqtol 3ms ("and he called")', 'Niphal perfect 3ms', 'Qal participle ms', 'Pual perfect'], correctIndex: 0, explanation: 'וַיִּקְרָא = qal wayyiqtol 3ms of קָרָא ("call"). With dagesh in י after וַ. Narrative past: "and he called." Genesis 1:5 names day and night.' },
  { id: 'pp-g35', question: 'What is the Qal imperfect 3ms of √sh-m-r?', options: ['שָׁמַר', 'יִשְׁמֹר', 'שׁוֹמֵר', 'הִשְׁמִיר'], correctIndex: 1, explanation: 'יִשְׁמֹר = qal imperfect 3ms = "he will keep / he keeps." Yod prefix marks 3rd masc; cholem-vav (or holem) in the stem is the qal imperfect signature.' },

  // --- Binyanim Recognition ---
  { id: 'pp-g36', question: 'Parse וַיַּבְדֵּל in Genesis 1:4:', hebrew: 'וַיַּבְדֵּל אֱלֹהִים בֵּין הָאוֹר', options: ['Qal wayyiqtol', 'Hiphil wayyiqtol 3ms ("caused to separate")', 'Niphal wayyiqtol', 'Piel wayyiqtol'], correctIndex: 1, explanation: 'וַיַּבְדֵּל = HIPHIL wayyiqtol of בָּדַל ("separate"). Hiphil signs: ַ + dagesh on prefix consonant after וַ; tsere-yod or tsere in the stem. Causative: "caused to divide / separated."' },
  { id: 'pp-g37', question: 'What is the recognition mark of the PIEL binyan?', options: ['Prefix נ-', 'Prefix ה-', 'Dagesh forte in MIDDLE root consonant', 'Suffix -וּ'], correctIndex: 2, explanation: 'PIEL: dagesh forte in the middle root letter. Example: דִּבֶּר ("he spoke" — piel of √d-b-r). Often INTENSIVE or FACTITIVE.' },
  { id: 'pp-g38', question: 'What is the recognition mark of the HIPHIL binyan?', options: ['Prefix ה- + hi-…-i pattern; CAUSATIVE meaning', 'Doubled middle consonant', 'No prefix', 'Suffix -ָה'], correctIndex: 0, explanation: 'HIPHIL: ה- prefix in perfect (הִקְטִיל), causative meaning ("make/cause to X"). Example: הִמְלִיךְ ("he made [X] king") from מֶלֶךְ.' },
  { id: 'pp-g39', question: 'What is the recognition mark of the NIPHAL binyan?', options: ['Prefix נ- in perfect (or hi- in imperfect)', 'Doubled middle root', 'Prefix ה- with hi-pattern', 'Suffix -וּ'], correctIndex: 0, explanation: 'NIPHAL: נ- prefix in perfect (נִקְטַל); in imperfect, the נ assimilates and the prefix is hi- with dagesh (יִקָּטֵל). PASSIVE or REFLEXIVE meaning.' },
  { id: 'pp-g40', question: 'Identify HITHPAEL recognition marks:', options: ['Prefix הִתְ- + dagesh in middle root', 'Prefix נ-', 'No prefix', 'Suffix -וּ'], correctIndex: 0, explanation: 'HITHPAEL: הִתְ- prefix + dagesh in middle root letter. REFLEXIVE/RECIPROCAL meaning. Example: הִתְפַּלֵּל ("he prayed" / "he made himself entreat").' },

  // --- Verbal Forms: Participle, Infinitive, Imperative ---
  { id: 'pp-g41', question: 'Parse מְרַחֶפֶת in Genesis 1:2:', hebrew: 'וְרוּחַ אֱלֹהִים מְרַחֶפֶת', options: ['Qal participle fs', 'Piel participle fs', 'Niphal participle fs', 'Hithpael participle fs'], correctIndex: 1, explanation: 'מְרַחֶפֶת = piel feminine participle of רָחַף ("hover"). Piel participle prefix: מְ + dagesh in middle root. The fem ending -ֶת agrees with the fem subject רוּחַ.' },
  { id: 'pp-g42', question: 'Qal participle masculine singular of √sh-m-r:', options: ['שָׁמַר', 'יִשְׁמֹר', 'שֹׁמֵר', 'הִשְׁמִיר'], correctIndex: 2, explanation: 'שֹׁמֵר = qal active participle ms ("[one who is] keeping / a keeper"). Pattern: qōtēl (cholem-tsere).' },
  { id: 'pp-g43', question: 'Qal infinitive construct of √sh-m-r is usually:', options: ['שָׁמוֹר', 'שְׁמֹר', 'שָׁמַר', 'שֹׁמֵר'], correctIndex: 1, explanation: 'שְׁמֹר = qal infinitive construct (with sheva-cholem). Used after לְ to express purpose: לִשְׁמֹר ("to keep"). The absolute infinitive is שָׁמוֹר.' },
  { id: 'pp-g44', question: 'Qal imperative ms of √sh-m-r:', options: ['שָׁמַר', 'שְׁמֹר', 'יִשְׁמֹר', 'הִשָּׁמֵר'], correctIndex: 1, explanation: 'שְׁמֹר! = qal imperative 2ms = "Keep! / Guard!" Same form as the infinitive construct. Imperative is essentially the imperfect minus the prefix.' },

  // --- Syntax & Constructions ---
  { id: 'pp-g45', question: 'How does Hebrew express "X has Y" (possession)?', options: ['Verb "to have"', 'יֵשׁ + לְ + possessor + Y (e.g., יֵשׁ לִי בַּיִת)', 'Suffix on the verb', 'Genitive ending'], correctIndex: 1, explanation: 'Hebrew has NO verb "to have." Construction: יֵשׁ ("there is") + לְ + possessor + thing. יֵשׁ לִי בַּיִת = "I have a house" (lit. "there is to me a house"). Negative: אֵין לִי. Past: הָיָה לִי.' },
  { id: 'pp-g46', question: 'In construct chain רוּחַ אֱלֹהִים, what is the relationship?', options: ['"the spirit of God"', '"a spirit-God"', 'Apposition', 'Subject + verb'], correctIndex: 0, explanation: 'רוּחַ ("spirit/wind") in construct with אֱלֹהִים = "the spirit of God." The first noun is "construct" (slightly modified form), the second is "absolute." Definiteness propagates from the absolute back.' },
  { id: 'pp-g47', question: 'Predicative adjective: "the man is good" =', options: ['הָאִישׁ הַטּוֹב', 'הַטּוֹב הָאִישׁ', 'טוֹב הָאִישׁ (article on noun, NOT on adjective)', 'הָאִישׁ טוֹב הוּא'], correctIndex: 2, explanation: 'PREDICATIVE: adjective LACKS the article even when the noun has it. טוֹב הָאִישׁ = "the man is good" (asserting). Both having articles = ATTRIBUTIVE = "the good man" (= הָאִישׁ הַטּוֹב, describing).' },
  { id: 'pp-g48', question: 'Hebrew verbal sequence: וַיֹּאמֶר ... וַיֹּאמֶר represents:', options: ['Two simultaneous events', 'Sequential narrative ("and he said... and he said...")', 'Disjunctive contrast', 'Hypothetical'], correctIndex: 1, explanation: 'Wayyiqtol chains express SEQUENTIAL narrative — each verb advances the story. The vav-consecutive turns each form into "and then..."' },
  { id: 'pp-g49', question: 'When וְ is followed by a NOUN (instead of a wayyiqtol), the clause is:', options: ['Always poetry', 'Disjunctive — pause, scene-set, contrast, background', 'Subjunctive', 'A question'], correctIndex: 1, explanation: 'A clause-initial וְ + non-verb signals a DISJUNCTIVE clause. Often pauses the narrative for background, contrast, or scene-setting. Example: Gen 1:2 וְהָאָרֶץ הָיְתָה — "now the earth was..."' },
  { id: 'pp-g50', question: 'In Genesis 1:1, the standard word order is V-S-O. Identify the verb, subject, and direct object:', hebrew: 'בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם', options: ['V=בָּרָא, S=אֱלֹהִים, O=אֵת הַשָּׁמַיִם', 'V=הַשָּׁמַיִם, S=אֱלֹהִים, O=בָּרָא', 'No verb in this clause', 'V-O-S order'], correctIndex: 0, explanation: 'Default Hebrew word order is VERB–SUBJECT–OBJECT. בָּרָא (verb, "created") + אֱלֹהִים (subject, "God") + אֵת הַשָּׁמַיִם (definite direct object marked with אֵת, "the heavens").' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Section 2: Vocabulary MCQ — 30 questions on common Genesis 1 vocabulary
// ═══════════════════════════════════════════════════════════════════════════════

export const vocabQuestions: PracticeMCQ[] = [
  { id: 'pp-v01', question: 'What does רֵאשִׁית mean?', hebrew: 'בְּרֵאשִׁית', options: ['end', 'beginning', 'middle', 'top'], correctIndex: 1, explanation: 'רֵאשִׁית = "beginning, first." From the root ראשׁ ("head"). Used at the very opening of the Hebrew Bible.' },
  { id: 'pp-v02', question: 'What does בָּרָא mean?', hebrew: 'בָּרָא אֱלֹהִים', options: ['speak', 'create', 'see', 'rule'], correctIndex: 1, explanation: 'בָּרָא = "create." In the OT, the qal of בָּרָא always has GOD as its subject — it expresses uniquely divine creative activity (cf. עָשָׂה "make," which is broader).' },
  { id: 'pp-v03', question: 'What does אֱלֹהִים mean?', options: ['angels', 'God', 'kings', 'rulers'], correctIndex: 1, explanation: 'אֱלֹהִים = "God." Plural form ("plural of majesty") taking a singular verb when referring to the one true God. ~2,600 occurrences.' },
  { id: 'pp-v04', question: 'What does שָׁמַיִם mean?', options: ['light', 'water', 'heavens', 'earth'], correctIndex: 2, explanation: 'שָׁמַיִם = "heavens, sky." Always in dual form (-ayim ending). Refers to the celestial realm.' },
  { id: 'pp-v05', question: 'What does אָרֶץ mean?', options: ['heavens', 'earth/land', 'sea', 'mountain'], correctIndex: 1, explanation: 'אָרֶץ = "earth, land, country." Feminine. One of the most common nouns in the OT (~2,500x).' },
  { id: 'pp-v06', question: 'What does תֹהוּ mean?', hebrew: 'תֹהוּ וָבֹהוּ', options: ['glory', 'formless / chaos', 'creation', 'tribute'], correctIndex: 1, explanation: 'תֹהוּ = "formlessness, chaos, waste." Famous pair תֹהוּ וָבֹהוּ = "formless and void/empty." Describes the unordered state of the earth before creation.' },
  { id: 'pp-v07', question: 'What does חֹשֶׁךְ mean?', options: ['light', 'darkness', 'shadow', 'cloud'], correctIndex: 1, explanation: 'חֹשֶׁךְ = "darkness." Masculine. Cf. the verb חָשַׁךְ ("be dark").' },
  { id: 'pp-v08', question: 'What does תְהוֹם mean?', hebrew: 'עַל־פְּנֵי תְהוֹם', options: ['mountain', 'deep / abyss', 'forest', 'wilderness'], correctIndex: 1, explanation: 'תְהוֹם = "deep, abyss." Refers to the primeval ocean / great deep. Echoes the Babylonian Tiamat (likely polemic).' },
  { id: 'pp-v09', question: 'What does רוּחַ mean?', options: ['rock', 'spirit / wind / breath', 'water', 'fire'], correctIndex: 1, explanation: 'רוּחַ = "spirit, wind, breath." Feminine. Context determines which: Gen 1:2 רוּחַ אֱלֹהִים = "Spirit of God."' },
  { id: 'pp-v10', question: 'What does מַיִם mean?', options: ['fire', 'waters', 'heaven', 'wood'], correctIndex: 1, explanation: 'מַיִם = "waters." Plural form (always plural). One of the most basic nouns.' },
  { id: 'pp-v11', question: 'What does אוֹר mean?', options: ['darkness', 'light', 'cloud', 'fire'], correctIndex: 1, explanation: 'אוֹר = "light." Created by God\'s word in Gen 1:3. Masculine.' },
  { id: 'pp-v12', question: 'What does טוֹב mean?', options: ['great', 'good', 'holy', 'new'], correctIndex: 1, explanation: 'טוֹב = "good, pleasant, beautiful." Common adjective. Used 7x in Gen 1 as God evaluates creation: כִּי־טוֹב.' },
  { id: 'pp-v13', question: 'What does יוֹם mean?', options: ['night', 'day', 'year', 'hour'], correctIndex: 1, explanation: 'יוֹם = "day." Masculine. The structuring word of Gen 1: "day one... day two..."' },
  { id: 'pp-v14', question: 'What does לָיְלָה mean?', options: ['day', 'night', 'evening', 'morning'], correctIndex: 1, explanation: 'לָיְלָה = "night." Despite the -āh ending, it is grammatically MASCULINE (irregular).' },
  { id: 'pp-v15', question: 'What does עֶרֶב mean?', options: ['morning', 'evening', 'noon', 'midnight'], correctIndex: 1, explanation: 'עֶרֶב = "evening." The Hebrew day begins at evening (Gen 1:5: "and there was evening, and there was morning — day one").' },
  { id: 'pp-v16', question: 'What does בֹקֶר mean?', options: ['evening', 'noon', 'morning', 'cattle'], correctIndex: 2, explanation: 'בֹקֶר = "morning." Comes after עֶרֶב in the Hebrew day-cycle (Gen 1:5).' },
  { id: 'pp-v17', question: 'What does אֶחָד mean?', options: ['second', 'one', 'first', 'only'], correctIndex: 1, explanation: 'אֶחָד = "one." Masculine cardinal numeral. Famous in Deut 6:4 (Shema): אֶחָד יְהוָה.' },
  { id: 'pp-v18', question: 'What does אָמַר mean?', options: ['create', 'see', 'say', 'separate'], correctIndex: 2, explanation: 'אָמַר = "say." Most common Hebrew verb of speaking. Wayyiqtol וַיֹּאמֶר ("and he said") is a near-universal narrative formula.' },
  { id: 'pp-v19', question: 'What does רָאָה mean?', options: ['hear', 'speak', 'see', 'send'], correctIndex: 2, explanation: 'רָאָה = "see." Final-ה verb (lamed-he class). Common throughout the OT.' },
  { id: 'pp-v20', question: 'What does קָרָא mean?', options: ['call / read out / proclaim', 'walk', 'find', 'eat'], correctIndex: 0, explanation: 'קָרָא = "call, read aloud, proclaim." In Gen 1:5 used for naming: "and he called the light Day."' },
  { id: 'pp-v21', question: 'What does בָּדַל mean (Hiphil = הִבְדִּיל)?', options: ['to mix', 'to separate / divide', 'to gather', 'to create'], correctIndex: 1, explanation: 'בָּדַל qal = "be separate"; HIPHIL הִבְדִּיל = "cause to be separate, divide." Used in Gen 1:4 for dividing light/darkness.' },
  { id: 'pp-v22', question: 'What does הָיָה mean?', options: ['was, became, happened', 'walked', 'said', 'saw'], correctIndex: 0, explanation: 'הָיָה = "be, become, happen." The Hebrew verb of existence and event. Cf. וַיְהִי ("and there was/became") — the ubiquitous narrative phrase.' },
  { id: 'pp-v23', question: 'What does כִּי mean?', options: ['and', 'because, that', 'or', 'not'], correctIndex: 1, explanation: 'כִּי = "because, that, for, when, surely." Versatile particle. Often introduces a content clause after verbs of perception or speech.' },
  { id: 'pp-v24', question: 'What does אַחַר / אַחֲרֵי mean?', options: ['before', 'after / behind', 'with', 'against'], correctIndex: 1, explanation: 'אַחַר / אַחֲרֵי = "after, behind." אַחֲרֵי is the construct form, common in compound expressions.' },
  { id: 'pp-v25', question: 'What does כֹּל mean?', options: ['none', 'all, every, whole', 'few', 'half'], correctIndex: 1, explanation: 'כֹּל / כָּל־ = "all, every, whole." Most common when joined with maqqef (כָּל־) to the next word.' },
  { id: 'pp-v26', question: 'What does עַם mean?', options: ['father', 'mother', 'people, nation', 'son'], correctIndex: 2, explanation: 'עַם = "people, nation." Refers to Israel as God\'s people, but also the broader concept of "a people."' },
  { id: 'pp-v27', question: 'What does מֶלֶךְ mean?', options: ['priest', 'prophet', 'king', 'judge'], correctIndex: 2, explanation: 'מֶלֶךְ = "king." One of the most common nouns in the OT (~2,500x). Cf. the verb מָלַךְ ("reign") and Hiphil הִמְלִיךְ ("make king").' },
  { id: 'pp-v28', question: 'What does דָּבָר mean?', options: ['word, matter, thing', 'house', 'tree', 'food'], correctIndex: 0, explanation: 'דָּבָר = "word, matter, thing, affair." From √d-b-r ("speak"). Often used for "the word of the LORD."' },
  { id: 'pp-v29', question: 'What does יְהוָה refer to?', options: ['"Lord" (a title)', 'the divine name (YHWH/Yahweh)', 'a king', 'a priest'], correctIndex: 1, explanation: 'יְהוָה is the personal name of the God of Israel (the Tetragrammaton, YHWH). Traditionally read as אֲדֹנָי ("my Lord") in the synagogue. About 6,800 occurrences.' },
  { id: 'pp-v30', question: 'What does שָׁלוֹם mean?', options: ['war', 'peace, wholeness, well-being', 'sword', 'blood'], correctIndex: 1, explanation: 'שָׁלוֹם = "peace, wholeness, well-being." Comprehensive concept — not just absence of war but flourishing/completeness. Common greeting.' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Section 3: Verse Analysis — 5 Genesis 1:1–5 verses with matching + translation
// ═══════════════════════════════════════════════════════════════════════════════

export const verseAnalysisQuestions: PracticeVerseAnalysis[] = [
  {
    id: 'pp-va01',
    reference: 'Genesis 1:1',
    hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ',
    transliteration: 'bə·rê·šît bā·rā ʾĕ·lō·hîm ʾêt haš·šā·ma·yim wə·ʾêt hā·ʾā·reṣ',
    referenceTranslation: 'In the beginning God created the heavens and the earth.',
    keyTerms: ['beginning', 'created', 'God', 'heavens', 'earth'],
    matchingPairs: [
      { hebrew: 'בְּרֵאשִׁית', category: 'Preposition + feminine noun' },
      { hebrew: 'בָּרָא', category: 'Qal perfect 3ms verb' },
      { hebrew: 'אֱלֹהִים', category: 'Masculine plural form, singular meaning (subject)' },
      { hebrew: 'אֵת', category: 'Definite direct object marker' },
      { hebrew: 'הַשָּׁמַיִם', category: 'Article + dual noun' },
      { hebrew: 'הָאָרֶץ', category: 'Article (compensatory) + feminine noun' },
    ],
    distractorCategories: [
      'Qal imperfect 3ms verb',
      'Construct chain (masc plural)',
      'Niphal participle masculine',
      'Conjunction + verb',
    ],
  },
  {
    id: 'pp-va02',
    reference: 'Genesis 1:2',
    hebrew: 'וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל־פְּנֵי תְהוֹם וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל־פְּנֵי הַמָּיִם',
    transliteration: 'wə·hā·ʾā·reṣ hā·yə·tāh tō·hû wā·ḇō·hû wə·ḥō·šeḵ ʿal·pə·nê tə·hôm wə·rû·aḥ ʾĕ·lō·hîm mə·ra·ḥep̄·et ʿal·pə·nê ham·mā·yim',
    referenceTranslation: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.',
    keyTerms: ['earth', 'formless', 'empty', 'darkness', 'deep', 'Spirit', 'God', 'hovering', 'waters'],
    matchingPairs: [
      { hebrew: 'וְהָאָרֶץ', category: 'Disjunctive vav + article + feminine noun' },
      { hebrew: 'הָיְתָה', category: 'Qal perfect 3fs verb' },
      { hebrew: 'תֹהוּ וָבֹהוּ', category: 'Pair of nouns (predicates)' },
      { hebrew: 'עַל־פְּנֵי', category: 'Preposition + masculine plural construct' },
      { hebrew: 'רוּחַ אֱלֹהִים', category: 'Construct chain ("spirit of God")' },
      { hebrew: 'מְרַחֶפֶת', category: 'Piel feminine singular participle' },
    ],
    distractorCategories: [
      'Qal imperfect 3fs verb',
      'Hiphil perfect 3ms',
      'Niphal participle masculine',
      'Article + dual noun',
    ],
  },
  {
    id: 'pp-va03',
    reference: 'Genesis 1:3',
    hebrew: 'וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר',
    transliteration: 'way·yō·mer ʾĕ·lō·hîm yə·hî ʾôr way·hî ʾôr',
    referenceTranslation: 'And God said, "Let there be light," and there was light.',
    keyTerms: ['God', 'said', 'let there be', 'light', 'was'],
    matchingPairs: [
      { hebrew: 'וַיֹּאמֶר', category: 'Qal wayyiqtol 3ms ("and he said")' },
      { hebrew: 'אֱלֹהִים', category: 'Subject (masc plural form, sg meaning)' },
      { hebrew: 'יְהִי', category: 'Qal jussive 3ms ("let there be")' },
      { hebrew: 'אוֹר', category: 'Masculine singular noun (indefinite)' },
      { hebrew: 'וַיְהִי', category: 'Qal wayyiqtol 3ms ("and there was")' },
    ],
    distractorCategories: [
      'Qal perfect 3ms',
      'Article + masc noun',
      'Construct chain',
      'Hiphil imperfect',
    ],
  },
  {
    id: 'pp-va04',
    reference: 'Genesis 1:4',
    hebrew: 'וַיַּרְא אֱלֹהִים אֶת־הָאוֹר כִּי־טוֹב וַיַּבְדֵּל אֱלֹהִים בֵּין הָאוֹר וּבֵין הַחֹשֶׁךְ',
    transliteration: 'way·yarʾ ʾĕ·lō·hîm ʾet·hā·ʾôr kî·ṭôḇ way·yaḇ·dêl ʾĕ·lō·hîm bên hā·ʾôr û·ḇên ha·ḥō·šeḵ',
    referenceTranslation: 'God saw that the light was good, and he separated the light from the darkness.',
    keyTerms: ['God', 'saw', 'light', 'good', 'separated', 'darkness'],
    matchingPairs: [
      { hebrew: 'וַיַּרְא', category: 'Qal wayyiqtol 3ms (apocopated, "and he saw")' },
      { hebrew: 'אֶת־הָאוֹר', category: 'Direct object marker + article + noun' },
      { hebrew: 'כִּי־טוֹב', category: 'Conjunction + adjective ("that [it was] good")' },
      { hebrew: 'וַיַּבְדֵּל', category: 'Hiphil wayyiqtol 3ms ("and he separated")' },
      { hebrew: 'בֵּין … וּבֵין', category: 'Pair of prepositions ("between … and")' },
    ],
    distractorCategories: [
      'Qal participle masculine',
      'Niphal perfect 3ms',
      'Construct chain (fem plural)',
      'Pronominal suffix 3ms',
    ],
  },
  {
    id: 'pp-va05',
    reference: 'Genesis 1:5',
    hebrew: 'וַיִּקְרָא אֱלֹהִים לָאוֹר יוֹם וְלַחֹשֶׁךְ קָרָא לָיְלָה וַיְהִי־עֶרֶב וַיְהִי־בֹקֶר יוֹם אֶחָד',
    transliteration: 'way·yiq·rā ʾĕ·lō·hîm lā·ʾôr yôm wə·la·ḥō·šeḵ qā·rā lay·lāh way·hî·ʿe·reḇ way·hî·ḇō·qer yôm ʾe·ḥāḏ',
    referenceTranslation: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning — the first day.',
    keyTerms: ['God', 'called', 'light', 'day', 'darkness', 'night', 'evening', 'morning', 'first', 'one'],
    matchingPairs: [
      { hebrew: 'וַיִּקְרָא', category: 'Qal wayyiqtol 3ms ("and he called")' },
      { hebrew: 'לָאוֹר', category: 'Preposition לְ + article (absorbed) + noun' },
      { hebrew: 'יוֹם', category: 'Masculine singular noun (predicate)' },
      { hebrew: 'קָרָא', category: 'Qal perfect 3ms verb' },
      { hebrew: 'לָיְלָה', category: 'Masculine sg noun (irregular -āh ending)' },
      { hebrew: 'אֶחָד', category: 'Cardinal numeral ("one") — masc' },
    ],
    distractorCategories: [
      'Qal jussive 3ms',
      'Hiphil wayyiqtol',
      'Construct chain (masc plural)',
      'Demonstrative pronoun',
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// Section metadata for the practice paper
// ═══════════════════════════════════════════════════════════════════════════════

export const PRACTICE_PAPER_SECTIONS = [
  { id: 1, title: 'Grammar', questionCount: grammarQuestions.length, description: 'Parse verbs, identify forms, article, prepositions, binyanim' },
  { id: 2, title: 'Vocabulary', questionCount: vocabQuestions.length, description: 'Identify the meaning of Hebrew words from Genesis 1' },
  { id: 3, title: 'Verse Analysis', questionCount: verseAnalysisQuestions.length, description: 'Match Hebrew words to grammatical categories and translate' },
] as const;
