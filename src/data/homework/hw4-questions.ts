// HW4 — Hebrew Pronouns, Pronominal Suffixes, and the Construct Chain.
// CourseGuide for BBH (Pratico/Van Pelt) Chapters 8-10 (Sessions 8-10),
// plus the new Chapter 8-10 vocabulary and verse-translation practice whose
// grammar stays within Chapters 1-10.

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

// Section 1 — Chapter 8: Hebrew Pronouns.
const sec1: MCQQuestion[] = [
  { id: 'hw4-s1-q1', type: 'mcq', question: 'A personal pronoun replaces a noun. The noun it refers back to is called the:', options: ['antecedent', 'absolute noun', 'construct noun', 'predicate'], correctIndex: 0, explanation: 'CourseGuide Ch 8. The antecedent is the noun a pronoun stands in for. Independent personal pronouns are inflected for person and number; 2nd and 3rd person also for gender, but 1st person is "common" (either gender).', category: 'pronoun' },
  { id: 'hw4-s1-q2', type: 'mcq', question: 'Which two Hebrew words both mean "I"?', options: ['אַתָּה and אַתְּ', 'אֲנִי and אָנֹכִי', 'הוּא and הִיא', 'הֵם and הֵן'], correctIndex: 1, explanation: 'CourseGuide Ch 8. Hebrew has two 1cs pronouns, אֲנִי and אָנֹכִי, both "I." אַתָּה/אַתְּ = "you" (ms/fs); הוּא/הִיא = "he/she"; הֵם/הֵן = "they" (mp/fp).', category: 'pronoun' },
  { id: 'hw4-s1-q3', type: 'mcq', question: 'Translate this verbless clause.', hebrew: 'אֲנַחְנוּ אַחִים', options: ['We are the brothers', 'We are our brothers', 'We are brothers', 'The brothers are ours'], correctIndex: 2, explanation: 'CourseGuide Ch 8. אֲנַחְנוּ ("we") + אַחִים ("brothers") with no verb → "We are brothers." Hebrew forms "to be" clauses simply by juxtaposition.', category: 'pronoun' },
  { id: 'hw4-s1-q4', type: 'mcq', question: 'How does the word אֲשֶׁר function, and what does it mean?', hebrew: 'אֲשֶׁר', options: ['as a preposition, "with"', 'as a conjunction, "and"', 'as the relative pronoun, "who / which / that"', 'as a demonstrative, "this"'], correctIndex: 2, explanation: 'CourseGuide Ch 8. אֲשֶׁר is the relative pronoun ("who, whom, whose, which, that"). It is invariable — the same form for every gender and number.', category: 'pronoun' },
  { id: 'hw4-s1-q5', type: 'mcq', question: 'A demonstrative used as an ADJECTIVE (e.g. "this man"):', options: ['follows the noun and agrees in gender, number, and definiteness', 'precedes the noun and agrees in gender and number only', 'never takes the article', 'replaces the noun entirely'], correctIndex: 0, explanation: 'CourseGuide Ch 8. As an adjective the demonstrative follows its noun and matches it fully: הָאִישׁ הַזֶּה ("this man"). As a pronoun it precedes the noun and drops the definiteness agreement.', category: 'pronoun' },
  { id: 'hw4-s1-q6', type: 'mcq', question: 'Translate this phrase.', hebrew: 'הָאִישׁ הַטּוֹב הַזֶּה', options: ['this good man', 'that good man', 'this man is good', 'the good man is here'], correctIndex: 0, explanation: 'CourseGuide Ch 8. The demonstrative הַזֶּה follows the noun and adjective and carries the article on all three → attributive: "this good man."', category: 'pronoun' },
  { id: 'hw4-s1-q7', type: 'mcq', question: 'Translate this clause.', hebrew: 'זֶה הָאִישׁ הַטּוֹב', options: ['this good man', 'that man is good', 'this is the good man', 'the good man is this'], correctIndex: 2, explanation: 'CourseGuide Ch 8. Here זֶה PRECEDES the noun, so it is a demonstrative pronoun: "this is the good man." Position distinguishes the pronoun use from the adjective use.', category: 'pronoun' },
  { id: 'hw4-s1-q8', type: 'mcq', question: 'What does the demonstrative אֵלֶּה mean?', hebrew: 'אֵלֶּה', options: ['this (ms)', 'this (fs)', 'that', 'these'], correctIndex: 3, explanation: 'CourseGuide Ch 8. אֵלֶּה = "these" (common plural). The singular demonstratives are זֶה ("this," ms) and זֹאת ("this," fs).', category: 'pronoun' },
  { id: 'hw4-s1-q9', type: 'mcq', question: 'Which pair gives the two common interrogative pronouns?', options: ['מִי ("who?") and מָה ("what?")', 'הֲ and וְ', 'זֶה and זֹאת', 'אֲנִי and אָנֹכִי'], correctIndex: 0, explanation: 'CourseGuide Ch 8. מִי = "who?" and מָה = "what?" do not inflect. Hebrew can also mark a yes/no question by prefixing the interrogative particle הֲ to the first word.', category: 'pronoun' },
  { id: 'hw4-s1-q10', type: 'mcq', question: 'What distinguishes the interrogative particle הֲ from the definite article?', options: ['the interrogative particle has no Daghesh Forte after it', 'the interrogative particle is always accented', 'the article is prefixed to verbs', 'there is no difference'], correctIndex: 0, explanation: 'CourseGuide Ch 8. The article (הַ) puts a Daghesh Forte in the next consonant; the interrogative particle (הֲ) does not. The interrogative particle also attaches freely to verbs and other particles, which the article does not.', category: 'pronoun' },
];

// Section 2 — Chapter 9: Pronominal Suffixes.
const sec2: MCQQuestion[] = [
  { id: 'hw4-s2-q1', type: 'mcq', question: 'A pronominal suffix is POSSESSIVE ("my, his") when attached to a ___, and OBJECTIVE ("me, him") when attached to a ___.', options: ['verb / adjective', 'noun / preposition', 'preposition / noun', 'article / conjunction'], correctIndex: 1, explanation: 'CourseGuide Ch 9. On nouns the suffix is possessive (סוּסוֹ "his horse"); on prepositions and the object marker it is objective (לוֹ "to him," אֹתוֹ "him").', category: 'suffix' },
  { id: 'hw4-s2-q2', type: 'mcq', question: 'There are two sets of suffixes. Type 2 (used on plural nouns) is recognized by:', options: ['a Mappiq', 'a running י through the endings', 'a Daghesh Forte', 'the article'], correctIndex: 1, explanation: 'CourseGuide Ch 9. Type 1 goes on singular nouns and select prepositions; Type 2 goes on plural nouns and is marked by a י (סוּסָיו "his horses" vs. סוּסוֹ "his horse"). Both types share the same translation values.', category: 'suffix' },
  { id: 'hw4-s2-q3', type: 'mcq', question: 'Translate this word.', hebrew: 'סוּסִי', options: ['my horse', 'his horse', 'your horse', 'our horse'], correctIndex: 0, explanation: 'CourseGuide Ch 9. סוּס + the 1cs suffix ־ִי = "my horse" (a singular noun with a Type 1 suffix).', category: 'suffix' },
  { id: 'hw4-s2-q4', type: 'mcq', question: 'Translate this word (2ms).', hebrew: 'שָׂדְךָ', options: ['your fields', 'your field', 'my field', 'his field'], correctIndex: 1, explanation: 'CourseGuide Ch 9. שָׂדֶה ("field") + the 2ms suffix ־ְךָ = "your field." A singular noun, so the singular is meant ("field," not "fields").', category: 'suffix' },
  { id: 'hw4-s2-q5', type: 'mcq', question: 'A feminine noun ending in ־ָה (e.g. תּוֹרָה) does what before a suffix?', options: ['keeps the ־ָה unchanged', 'takes the plural ending ־וֹת', 'replaces the final ־ָה with ־ַת', 'adds the dual ending ־ַיִם'], correctIndex: 2, explanation: 'CourseGuide Ch 9. The feminine ־ָה reverts to ־ָת before a suffix: תּוֹרָה → תּוֹרָתוֹ ("his law"). The same ת appears in the construct state.', category: 'suffix' },
  { id: 'hw4-s2-q6', type: 'mcq', question: 'Translate this word.', hebrew: 'כָּמוֹנִי', options: ['for me', 'like me', 'for us', 'like us'], correctIndex: 1, explanation: 'CourseGuide Ch 9. The preposition כְּ ("like, as") uses a longer form כָּמוֹ- before suffixes: כָּמוֹנִי = "like me." The prepositions כְּ and מִן take alternate spellings with singular and 1cp suffixes.', category: 'suffix' },
  { id: 'hw4-s2-q7', type: 'mcq', question: 'What is the name of the dot in the Type 1 3fs suffix ־ָהּ (as in סוּסָהּ "her horse")?', options: ['Daghesh Forte', 'Daghesh Lene', 'Mappiq', 'Maqqef'], correctIndex: 2, explanation: 'CourseGuide Ch 9. The dot in the final ה of the 3fs suffix is a Mappiq. It marks the ה as a true consonant, and is neither Daghesh Forte nor Daghesh Lene.', category: 'suffix' },
  { id: 'hw4-s2-q8', type: 'mcq', question: 'Translate this word (the object marker with a suffix).', hebrew: 'אֹתְךָ', options: ['with you (2ms)', 'you (2ms, direct object)', 'your (2ms)', 'to you (2ms)'], correctIndex: 1, explanation: 'CourseGuide Ch 9. The definite-object marker אֵת/אֶת־ takes Type 1 suffixes and is translated as an objective pronoun: אֹתְךָ = "you" (as a direct object). Do not confuse it with the preposition אֵת ("with").', category: 'suffix' },
  { id: 'hw4-s2-q9', type: 'mcq', question: 'Translate this word (3ms).', hebrew: 'דְּבָרוֹ', options: ['my word', 'your word', 'her word', 'his word'], correctIndex: 3, explanation: 'CourseGuide Ch 9. דָּבָר ("word") + the 3ms suffix ־וֹ = "his word." The holem-waw ending is the 3ms marker.', category: 'suffix' },
  { id: 'hw4-s2-q10', type: 'mcq', question: 'In the paradigm לִי, לְךָ, לָךְ, לוֹ, לָהּ..., what is being suffixed?', options: ['the noun סוּס', 'the preposition לְ', 'the article הַ', 'the conjunction וְ'], correctIndex: 1, explanation: 'CourseGuide Ch 9. This is the preposition לְ with Type 1 suffixes: לִי ("to me"), לְךָ ("to you," ms), לָךְ ("to you," fs), לוֹ ("to him"), לָהּ ("to her"). A suffix on a preposition is objective.', category: 'suffix' },
];

// Section 3 — Chapter 10: The Construct Chain.
const sec3: MCQQuestion[] = [
  { id: 'hw4-s3-q1', type: 'mcq', question: 'A construct chain expresses which relationship between two nouns?', options: ['"and" (coordination)', '"of" (possession / association)', '"like" (comparison)', '"in" (location)'], correctIndex: 1, explanation: 'CourseGuide Ch 10. Placing nouns side by side forms a construct chain expressing the "of" relationship: דְּבַר יְהוָה ("the word of the LORD").', category: 'construct' },
  { id: 'hw4-s3-q2', type: 'mcq', question: 'Which statement about a construct chain is TRUE?', options: ['it may have several absolute nouns', 'the absolute noun is always last, and there is only one', 'the construct noun is always last', 'every noun takes the article'], correctIndex: 1, explanation: 'CourseGuide Ch 10. A chain has exactly one absolute noun, always in final position; any noun before it is construct. Multiple construct nouns may precede the single absolute noun.', category: 'construct' },
  { id: 'hw4-s3-q3', type: 'mcq', question: 'What determines whether the whole chain is definite ("the ... of ...")?', options: ['the definiteness of the absolute (last) noun', 'the definiteness of the construct (first) noun', 'whether a Maqqef is present', 'the gender of the nouns'], correctIndex: 0, explanation: 'CourseGuide Ch 10. The construct noun cannot take the article, so the chain is definite only if the ABSOLUTE noun is definite (a proper name or an articled noun).', category: 'construct' },
  { id: 'hw4-s3-q4', type: 'mcq', question: 'Translate this chain.', hebrew: 'קוֹל הָאִישׁ', options: ['a voice of a man', 'the voice of the man', 'a voice of the man', 'the man has a voice'], correctIndex: 1, explanation: 'CourseGuide Ch 10. The absolute noun הָאִישׁ is definite, so the whole chain is definite: "the voice of the man."', category: 'construct' },
  { id: 'hw4-s3-q5', type: 'mcq', question: 'Translate this chain.', hebrew: 'סֵפֶר אָבִיהוּ', options: ['the book of our father', 'a book of his father', 'the book of his father', 'a book of our father'], correctIndex: 2, explanation: 'CourseGuide Ch 10. אָבִיהוּ = "his father" (a definite possessor), so the chain is definite: "the book of his father." A proper possessor makes the construct noun definite too.', category: 'construct' },
  { id: 'hw4-s3-q6', type: 'mcq', question: 'Where must an attributive or demonstrative adjective go when it modifies a construct chain?', options: ['before the chain', 'between the two nouns', 'after the whole chain', 'attached to the construct noun'], correctIndex: 2, explanation: 'CourseGuide Ch 10. Nothing may come between the nouns of a chain, so the adjective follows the entire chain while still agreeing (gender, number, definiteness) with the noun it modifies.', category: 'construct' },
  { id: 'hw4-s3-q7', type: 'mcq', question: 'Translate this chain.', hebrew: 'קְדוֹשׁ יִשְׂרָאֵל', options: ['the Holy One of Israel', 'Israel is holy', 'holy Israel', 'Israel of holiness'], correctIndex: 0, explanation: 'CourseGuide Ch 10. קְדוֹשׁ ("holy one," construct) + the definite name יִשְׂרָאֵל → "the Holy One of Israel," Isaiah\'s favorite title for God.', category: 'construct' },
  { id: 'hw4-s3-q8', type: 'mcq', question: 'A common spelling change in construct nouns is vowel reduction (e.g. דָּבָר → דְּבַר). Why does it happen?', options: ['the construct noun surrenders its accent to the absolute noun', 'the article is added', 'the noun becomes plural', 'the gender changes'], correctIndex: 0, explanation: 'CourseGuide Ch 10. A construct noun gives up its primary accent to the absolute noun, so the whole chain is one accent unit. Losing the accent triggers vowel reduction and often an ending change.', category: 'construct' },
  { id: 'hw4-s3-q9', type: 'mcq', question: 'What is the masculine PLURAL ending for a noun in the construct state?', options: ['־ִים', '־וֹת', '־ֵי', '־ָה'], correctIndex: 2, explanation: 'CourseGuide Ch 10. Masculine plural absolute ־ִים becomes construct ־ֵי: בָּנִים → בְּנֵי ("sons of"), סוּסִים → סוּסֵי ("horses of").', category: 'construct' },
  { id: 'hw4-s3-q10', type: 'mcq', question: 'Translate this chain.', hebrew: 'בְּנֵי יִשְׂרָאֵל', options: ['the house of Israel', 'the sons of Israel', 'the God of Israel', 'the land of Israel'], correctIndex: 1, explanation: 'CourseGuide Ch 10. בְּנֵי is the construct plural of בֵּן ("son"); with יִשְׂרָאֵל → "the sons/children of Israel," one of the most frequent phrases in the Old Testament.', category: 'construct' },
];

// Section 4 — Chapter 8-10 vocabulary ("You Should Know" lists). Pronouns and
// particles from Ch 8 are assessed in Section 1.
const sec4: PairedMCQQuestion[] = [
  vocab('hw4-s4-q1', 'אַחֵר', 'acher', ['achot', 'echad', 'af'], 0, 'other, another', ['brother', 'one', 'behind'], 0, 'Ch 8 vocab. Distinguish אָח ("brother") and אַחֲרֵי ("after").'),
  vocab('hw4-s4-q2', 'אַף', 'af', ['am', 'ach', 'ad'], 3, 'nose, nostril; (metaphorically) anger', ['hand', 'people', 'stone'], 1, 'Ch 9 vocab. "Anger" comes from the flaring of the nose; חָרָה אַף = "his anger burned."'),
  vocab('hw4-s4-q3', 'בֹּקֶר', 'boqer', ['baqar', 'basar', 'berit'], 1, 'morning', ['cattle', 'flesh', 'covenant'], 0, 'Ch 9 vocab. Segholate-type noun; distinguish בָּקָר ("cattle"), which shares the same consonants.'),
  vocab('hw4-s4-q4', 'בְּרָכָה', 'berakhah', ['berit', 'baqar', 'basar'], 0, 'blessing, gift', ['covenant', 'cattle', 'flesh'], 3, 'Ch 9 vocab. From the root ברך ("to bless"); the opposite of קְלָלָה ("curse").'),
  vocab('hw4-s4-q5', 'כָּבוֹד', 'kavod', ['keli', 'kesef', 'kol'], 0, 'glory, splendor, honor', ['vessel', 'silver', 'all'], 2, 'Ch 9 vocab. The "glory of the LORD" (כְּבוֹד יְהוָה) fills the tabernacle in Exod 40:34.'),
  vocab('hw4-s4-q6', 'לֶחֶם', 'lechem', ['melekh', 'milchamah', 'layla'], 1, 'bread, food', ['king', 'war', 'night'], 0, 'Ch 9 vocab. Segholate noun; בֵּית לֶחֶם ("Bethlehem") = "house of bread."'),
  vocab('hw4-s4-q7', 'מִלְחָמָה', 'milchamah', ['mishpachah', 'midbar', 'mishpat'], 1, 'war, battle, struggle', ['family', 'wilderness', 'judgment'], 2, 'Ch 9 vocab. Shares the root of לֶחֶם\'s neighbor לחם II ("to fight"); אִישׁ מִלְחָמָה = "man of war."'),
  vocab('hw4-s4-q8', 'מִשְׁפָּחָה', 'mishpachah', ['milchamah', 'mishpat', 'midbar'], 0, 'family, clan', ['war', 'judgment', 'wilderness'], 3, 'Ch 9 vocab. The clan/extended family unit; distinguish מִשְׁפָּט ("judgment").'),
  vocab('hw4-s4-q9', 'בְּרִית', 'berit', ['berakhah', 'basar', 'baqar'], 2, 'covenant', ['blessing', 'flesh', 'cattle'], 0, 'Ch 10 vocab. כָּרַת בְּרִית ("to cut a covenant") is the idiom for making one.'),
  vocab('hw4-s4-q10', 'חֶסֶד', 'chesed', ['chayil', 'chodesh', 'chatat'], 1, 'loyalty, steadfast love, lovingkindness', ['strength', 'month', 'sin'], 2, 'Ch 10 vocab. Covenant faithfulness; the refrain of Psalm 136 is לְעוֹלָם חַסְדּוֹ.'),
  vocab('hw4-s4-q11', 'יָד', 'yad', ['yam', 'yom', 'yeled'], 0, 'hand', ['sea', 'day', 'child'], 3, 'Ch 10 vocab. Feminine noun; the dual is יָדַיִם ("two hands").'),
  vocab('hw4-s4-q12', 'מִדְבָּר', 'midbar', ['milchamah', 'mishpachah', 'mizbeach'], 3, 'wilderness, desert, pasture', ['war', 'family', 'altar'], 0, 'Ch 10 vocab. Where Israel wandered forty years; also open pastureland.'),
];

// Section 5 — Verse translation: familiar clauses whose vocabulary and grammar
// stay within Chapters 1-10. The Hebrew is shown; pick the English translation.
const sec5: MCQQuestion[] = [
  { id: 'hw4-s5-q1', type: 'mcq', question: 'Translate this verse (Deuteronomy 6:4, the Shema).', hebrew: 'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד', options: ['Love the LORD your God with all your heart.', 'The LORD is God; there is no other besides him.', 'Hear, O Israel: the LORD our God, the LORD is one.', 'Keep the commandments of the LORD your God.'], correctIndex: 2, explanation: 'אֱלֹהֵינוּ = "our God" (the 1cp suffix ־ֵנוּ, Ch 9); the verbless clause יְהוָה אֶחָד = "the LORD is one." שְׁמַע ("hear") is an imperative preview.', category: 'verse' },
  { id: 'hw4-s5-q2', type: 'mcq', question: 'Translate this clause (Psalm 23:1).', hebrew: 'יְהוָה רֹעִי', options: ['The LORD is my rock', 'The LORD is my shepherd', 'The LORD is my light', 'The LORD is my portion'], correctIndex: 1, explanation: 'A verbless clause with a possessive suffix: רֹעֶה ("shepherd") + the 1cs suffix ־ִי = רֹעִי ("my shepherd"). "The LORD is my shepherd."', category: 'verse' },
  { id: 'hw4-s5-q3', type: 'mcq', question: 'Translate this clause (Psalm 24:1).', hebrew: 'לַיהוָה הָאָרֶץ וּמְלוֹאָהּ', options: ["The earth is the LORD's, and all that fills it.", 'The LORD made the earth and the sea.', 'The heavens declare the glory of God.', 'The earth is full of the mercy of the LORD.'], correctIndex: 0, explanation: 'לַיהוָה = "belongs to the LORD" (possessive לְ, Ch 6); מְלוֹאָהּ = "its fullness" (the 3fs suffix ־ָהּ with Mappiq, Ch 9). "The earth is the LORD\'s, and all that fills it."', category: 'verse' },
  { id: 'hw4-s5-q4', type: 'mcq', question: 'Translate this clause (Psalm 118:24).', hebrew: 'זֶה הַיּוֹם עָשָׂה יְהוָה', options: ['This is the house of the LORD.', 'This is the word that the LORD has spoken.', 'This is the way; walk in it.', 'This is the day that the LORD has made.'], correctIndex: 3, explanation: 'The demonstrative pronoun זֶה ("this," Ch 8) fronts the clause: "This is the day (הַיּוֹם) the LORD has made." עָשָׂה ("made") is a verb preview.', category: 'verse' },
  { id: 'hw4-s5-q5', type: 'mcq', question: 'Translate this clause (Exodus 15:3).', hebrew: 'יְהוָה אִישׁ מִלְחָמָה', options: ['The LORD is my strength and song.', 'The LORD is a great king.', 'The LORD is a man of war.', 'The LORD is my shepherd.'], correctIndex: 2, explanation: 'A verbless clause with a construct chain: אִישׁ מִלְחָמָה = "man of war" (מִלְחָמָה "war," Ch 9 vocab). "The LORD is a man of war / a warrior."', category: 'verse' },
  { id: 'hw4-s5-q6', type: 'mcq', question: 'Translate this clause (Psalm 136:1).', hebrew: 'כִּי־טוֹב כִּי לְעוֹלָם חַסְדּוֹ', options: ['Give thanks to the LORD, for he is God.', 'For he is good; his steadfast love endures forever.', 'Great is the LORD and greatly to be praised.', 'The LORD is good to all who wait for him.'], correctIndex: 1, explanation: 'כִּי־טוֹב = "for [he is] good" (predicative טוֹב, Ch 7); חַסְדּוֹ = "his steadfast love" (חֶסֶד, Ch 10 vocab, + the 3ms suffix ־וֹ). לְעוֹלָם = "forever."', category: 'verse' },
  { id: 'hw4-s5-q7', type: 'mcq', question: 'Translate this clause (Psalm 100:3).', hebrew: 'הוּא עָשָׂנוּ וְלוֹ אֲנַחְנוּ', options: ['It is he who made us, and we are his.', 'He is our God, and we are his people.', 'We made ourselves, and we are the LORD\'s.', 'The LORD made us for his own glory.'], correctIndex: 0, explanation: 'הוּא ("he," Ch 8) + עָשָׂנוּ ("made us," a verb with the 1cp suffix); וְלוֹ ("and to/for him," the preposition לְ + 3ms suffix, Ch 9) + אֲנַחְנוּ ("we"). "It is he who made us, and we are his."', category: 'verse' },
  { id: 'hw4-s5-q8', type: 'mcq', question: 'Translate this verse (Genesis 1:1).', hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ', options: ['And God made the great sea and the dry land.', 'The heavens belong to God, and the earth to mankind.', 'In the beginning was the Word, and the Word was with God.', 'In the beginning God created the heavens and the earth.'], correctIndex: 3, explanation: 'בְּ ("in") + רֵאשִׁית ("beginning"); אֵת = the untranslated definite-object marker (Ch 6); הַשָּׁמַיִם ("the heavens," article); וְאֵת = waw + the marker; הָאָרֶץ ("the earth," article with Qamets before the guttural א).', category: 'verse' },
];

export const hw4Sections = { 1: sec1, 2: sec2, 3: sec3, 4: sec4, 5: sec5 };

export const hw4Meta: ExtendedHomeworkMeta = {
  id: 'hw4',
  title: 'HW4: Pronouns, Suffixes, and the Construct Chain',
  shortTitle: 'HW4',
  description: 'CourseGuide for BBH (Pratico/Van Pelt) Chapters 8-10 (Sessions 8-10): Hebrew pronouns (independent, demonstrative, relative, interrogative), pronominal suffixes, and the construct chain — plus new Chapter 8-10 vocabulary and verse-translation practice from familiar clauses of the Hebrew Bible.',
  topics: ['Ch 8: Pronouns and demonstratives', 'Ch 9: Pronominal suffixes', 'Ch 10: The construct chain', 'Ch 8-10 vocabulary', 'Verse translation'],
  totalQuestions: sec1.length + sec2.length + sec3.length + sec4.length + sec5.length,
  sections: [
    { id: 1, title: 'Ch 8 — Hebrew Pronouns', description: 'Independent personal, demonstrative, relative, and interrogative pronouns', questionCount: sec1.length },
    { id: 2, title: 'Ch 9 — Pronominal Suffixes', description: 'Possessive suffixes on nouns and objective suffixes on prepositions', questionCount: sec2.length },
    { id: 3, title: 'Ch 10 — The Construct Chain', description: 'The Hebrew "of" relationship, definiteness, and construct forms', questionCount: sec3.length },
    { id: 4, title: 'Ch 8-10 Vocabulary', description: 'Read and translate the new "You Should Know" words', questionCount: sec4.length },
    { id: 5, title: 'Verse Translation', description: 'Translate familiar clauses that use pronouns, suffixes, and construct chains', questionCount: sec5.length },
  ],
  sectionQuestions: hw4Sections,
};
