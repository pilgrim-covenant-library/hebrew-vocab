// Class 4 practice — CourseGuide for BBH Chapters 8-10: Hebrew pronouns
// (independent, demonstrative, relative, interrogative), pronominal suffixes,
// and the construct chain, plus the Chapter 8-10 "You Should Know" vocabulary
// and verse-translation practice whose grammar stays within Chapters 1-10.

import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function asGroups(questions: PracticeQuestion[]): PracticeQuestionGroup[] {
  return questions.map((question) => ({ id: question.id, questions: [question] }));
}

// Chapter 8 — Hebrew pronouns: independent personal, demonstrative, relative,
// and interrogative.
const pronounQuestions: PracticeQuestion[] = [
  { id: 'class4-pron-1', prompt: 'A pronoun is a word that replaces a noun. The noun it points back to is called the:', options: ['antecedent', 'absolute', 'construct', 'predicate'], correctIndex: 0, explanation: 'The antecedent is the noun a pronoun refers back to. Hebrew independent personal pronouns are first, second, or third person, singular or plural.', category: 'pronoun' },
  { id: 'class4-pron-2', prompt: 'What does ani mean?', hebrew: 'אֲנִי', transliteration: 'ani', options: ['you (masculine singular)', 'he', 'I', 'we'], correctIndex: 2, explanation: 'אֲנִי (ani) = "I" (1cs). Hebrew has a second word for "I," אָנֹכִי. First-person pronouns are "common" — used for both masculine and feminine.', category: 'pronoun' },
  { id: 'class4-pron-3', prompt: 'Both אֲנִי and אָנֹכִי translate as:', options: ['we', 'you', 'I', 'he'], correctIndex: 2, explanation: 'Hebrew has two words for "I": אֲנִי and אָנֹכִי. Both are 1st person common singular.', category: 'pronoun' },
  { id: 'class4-pron-4', prompt: 'Translate this clause (a verbless sentence).', hebrew: 'אֲנַחְנוּ אַחִים', options: ['We are the brothers', 'The brothers are ours', 'We are brothers', 'We are our brothers'], correctIndex: 2, explanation: 'אֲנַחְנוּ ("we") + אַחִים ("brothers"). A verbless clause simply joins subject and predicate: "We are brothers."', category: 'pronoun' },
  { id: 'class4-pron-5', prompt: 'What does the relative pronoun אֲשֶׁר mean?', hebrew: 'אֲשֶׁר', options: ['and, but', 'who, which, that', 'this, these', 'not, no'], correctIndex: 1, explanation: 'אֲשֶׁר = "who, whom, whose, which, that," the Hebrew relative pronoun. Its form never changes for gender or number.', category: 'pronoun' },
  { id: 'class4-pron-6', prompt: 'What does the demonstrative אֵלֶּה mean?', hebrew: 'אֵלֶּה', options: ['these', 'that', 'here', 'who'], correctIndex: 0, explanation: 'אֵלֶּה = "these" (common plural demonstrative). The singulars are זֶה ("this," ms) and זֹאת ("this," fs).', category: 'pronoun' },
  { id: 'class4-pron-7', prompt: 'Translate this phrase (the demonstrative follows the noun).', hebrew: 'הָאִישׁ הַטּוֹב הַזֶּה', options: ['that good man', 'this good man', 'this man is good', 'the man is this good one'], correctIndex: 1, explanation: 'A demonstrative used as an ADJECTIVE follows its noun and matches it in gender, number, and definiteness: הָאִישׁ הַטּוֹב הַזֶּה = "this good man."', category: 'pronoun' },
  { id: 'class4-pron-8', prompt: 'Translate this clause (the demonstrative precedes the noun).', hebrew: 'זֶה הָאִישׁ הַטּוֹב', options: ['this is the good man', 'this good man', 'that man is good', 'the good man is here'], correctIndex: 0, explanation: 'A demonstrative used as a PRONOUN precedes its noun and agrees in gender and number but NOT definiteness: זֶה הָאִישׁ הַטּוֹב = "this is the good man."', category: 'pronoun' },
  { id: 'class4-pron-9', prompt: 'What does the pronoun הוּא mean?', hebrew: 'הוּא', options: ['she, it', 'they', 'he, it', 'we'], correctIndex: 2, explanation: 'הוּא = "he, it" (3ms). Its feminine counterpart is הִיא ("she, it"). These third-person pronouns can also mean "that" as demonstratives.', category: 'pronoun' },
  { id: 'class4-pron-10', prompt: 'What does mi mean?', hebrew: 'מִי', transliteration: 'mi', options: ['what?', 'who?', 'from', 'because'], correctIndex: 1, explanation: 'מִי (mi) = "who?" and מָה (mah) = "what?" — the two common interrogative pronouns. Hebrew can also turn a statement into a yes/no question with the prefixed particle הֲ.', category: 'pronoun' },
];

// High-frequency Chapter 8 forms for direct, bidirectional memory work. These
// supplement the concept questions above so students repeatedly connect the
// pointed form, a readable transliteration, and its translation.
const pronounMemoryQuestions: PracticeQuestion[] = [
  { id: 'class4-memory-pron-atah', prompt: 'What does atah mean?', hebrew: 'אַתָּה', transliteration: 'atah', options: ['you (masculine singular)', 'I', 'he', 'we'], correctIndex: 0, explanation: 'אַתָּה (atah) = "you" when speaking to one male person (2ms). The feminine singular form is אַתְּ (at).', category: 'pronoun-memory' },
  { id: 'class4-memory-pron-at', prompt: 'What does at mean?', hebrew: 'אַתְּ', transliteration: 'at', options: ['she', 'you (masculine plural)', 'you (feminine singular)', 'they (feminine)'], correctIndex: 2, explanation: 'אַתְּ (at) = "you" when speaking to one female person (2fs). The masculine singular form is אַתָּה (atah).', category: 'pronoun-memory' },
  { id: 'class4-memory-pron-atem', prompt: 'What does atem mean?', hebrew: 'אַתֶּם', transliteration: 'atem', options: ['they (masculine)', 'you (masculine plural)', 'you (feminine plural)', 'we'], correctIndex: 1, explanation: 'אַתֶּם (atem) = "you" when addressing a masculine or mixed group (2mp).', category: 'pronoun-memory' },
  { id: 'class4-memory-pron-aten', prompt: 'What does aten mean?', hebrew: 'אַתֶּן', transliteration: 'aten', options: ['they (feminine)', 'you (feminine singular)', 'they (masculine)', 'you (feminine plural)'], correctIndex: 3, explanation: 'אַתֶּן (aten; longer אַתֵּנָה) = "you" when addressing an all-female group (2fp).', category: 'pronoun-memory' },
  { id: 'class4-memory-pron-hi', prompt: 'What does hi mean?', hebrew: 'הִיא', transliteration: 'hi', options: ['she / it (feminine)', 'he / it (masculine)', 'they', 'this'], correctIndex: 0, explanation: 'הִיא (hi) = "she" or feminine "it" (3fs). Its masculine counterpart is הוּא (hu).', category: 'pronoun-memory' },
  { id: 'class4-memory-pron-hem', prompt: 'What does hem mean?', hebrew: 'הֵם', transliteration: 'hem', options: ['you (masculine plural)', 'we', 'they (masculine)', 'these'], correctIndex: 2, explanation: 'הֵם (hem; also הֵמָּה) = masculine or mixed "they" (3mp).', category: 'pronoun-memory' },
  { id: 'class4-memory-pron-hen', prompt: 'What does hen mean?', hebrew: 'הֵן', transliteration: 'hen', options: ['you (feminine plural)', 'they (feminine)', 'she', 'we'], correctIndex: 1, explanation: 'הֵן (hen; also הֵנָּה) = feminine "they" (3fp).', category: 'pronoun-memory' },
  { id: 'class4-memory-pron-zeh', prompt: 'What does zeh mean?', hebrew: 'זֶה', transliteration: 'zeh', options: ['that (feminine)', 'these', 'who?', 'this (masculine singular)'], correctIndex: 3, explanation: 'זֶה (zeh) = masculine singular "this." As a pronoun it can introduce a clause: זֶה הָאִישׁ, "This is the man."', category: 'pronoun-memory' },
  { id: 'class4-memory-pron-zot', prompt: 'What does zot mean?', hebrew: 'זֹאת', transliteration: 'zot', options: ['this (feminine singular)', 'this (masculine singular)', 'these', 'that (masculine)'], correctIndex: 0, explanation: 'זֹאת (zot) = feminine singular "this." The masculine singular is זֶה and the common plural is אֵלֶּה.', category: 'pronoun-memory' },
  { id: 'class4-memory-pron-mah', prompt: 'What does mah mean?', hebrew: 'מָה', transliteration: 'mah', options: ['where?', 'why?', 'what?', 'who?'], correctIndex: 2, explanation: 'מָה (mah; sometimes מֶה) = "what?" Compare מִי (mi), "who?"', category: 'pronoun-memory' },
  { id: 'class4-memory-pron-interrogative-he', prompt: 'What does the prefixed particle ha- signal here?', hebrew: 'הֲ', transliteration: 'ha-', options: ['a definite noun', 'a yes/no question', 'a plural noun', 'the conjunction "and"'], correctIndex: 1, explanation: 'The interrogative particle הֲ prefixes the first word of a yes/no question. Unlike the definite article, it does not place a Daghesh Forte in the following consonant.', category: 'pronoun-memory' },
];

// Chapter 9 — pronominal suffixes: possessive on nouns, objective on
// prepositions and the object marker.
const suffixQuestions: PracticeQuestion[] = [
  { id: 'class4-suff-1', prompt: 'A pronominal suffix attached to a NOUN is:', options: ['possessive — my, your, his, her', 'objective — me, you, him, her', 'a plural ending', 'the definite article'], correctIndex: 0, explanation: 'On nouns, suffixes are possessive (סוּסוֹ "his horse"). On prepositions and the object marker they are objective (לוֹ "to him").', category: 'suffix' },
  { id: 'class4-suff-2', prompt: 'Translate this word.', hebrew: 'סוּסִי', options: ['his horse', 'my horse', 'your horse', 'our horse'], correctIndex: 1, explanation: 'סוּס ("horse") + the 1cs suffix ־ִי = "my horse." Type 1 suffixes attach to singular nouns.', category: 'suffix' },
  { id: 'class4-suff-3', prompt: 'Translate this word (2ms).', hebrew: 'שָׂדְךָ', options: ['your field', 'my field', 'his field', 'their field'], correctIndex: 0, explanation: 'שָׂדֶה ("field") + the 2ms suffix ־ְךָ = "your field." The ־ְךָ ending is the giveaway for 2nd person masculine singular.', category: 'suffix' },
  { id: 'class4-suff-4', prompt: 'Translate this word.', hebrew: 'דְּבָרוֹ', options: ['my word', 'your word', 'his word', 'her word'], correctIndex: 2, explanation: 'דָּבָר ("word") + the 3ms suffix ־וֹ = "his word." The holem-waw ending marks 3rd person masculine singular.', category: 'suffix' },
  { id: 'class4-suff-5', prompt: 'There are two SETS of pronominal suffixes. Type 2 (used on plural nouns) is recognized by:', options: ['a Mappiq dot', 'the letter י running through the endings', 'a Daghesh Forte', 'the article הַ'], correctIndex: 1, explanation: 'Type 1 suffixes go on singular nouns; Type 2 go on plural nouns and are marked by a י in the ending (e.g. סוּסָיו "his horses" vs. סוּסוֹ "his horse"). Both have identical translation values.', category: 'suffix' },
  { id: 'class4-suff-6', prompt: 'A feminine noun ending in ־ָה (like תּוֹרָה) changes how before a suffix?', options: ['the ־ָה becomes ־ַת', 'it takes the plural ־וֹת', 'it remains unchanged', 'it adds the dual ־ַיִם'], correctIndex: 0, explanation: 'The feminine ־ָה reverts to its older ־ַת form before a suffix: תּוֹרָה → תּוֹרָתוֹ ("his law"). The same ת surfaces in the construct state (Ch 10).', category: 'suffix' },
  { id: 'class4-suff-7', prompt: 'Translate this word.', hebrew: 'כָּמוֹנִי', options: ['like us', 'for us', 'like me', 'for me'], correctIndex: 2, explanation: 'The preposition כְּ ("like, as") takes a longer form כָּמוֹ- before a suffix: כָּמוֹנִי = "like me."', category: 'suffix' },
  { id: 'class4-suff-8', prompt: 'Translate this word (the object marker with a suffix).', hebrew: 'אֹתִי', options: ['me', 'my', 'to me', 'with me'], correctIndex: 0, explanation: 'The definite-object marker אֵת/אֶת־ takes Type 1 suffixes and is translated as an objective pronoun: אֹתִי = "me." Do not confuse it with the preposition אֵת ("with").', category: 'suffix' },
  { id: 'class4-suff-9', prompt: 'Translate this word (2ms).', hebrew: 'לְךָ', options: ['to me', 'to you', 'to him', 'to them'], correctIndex: 1, explanation: 'The preposition לְ ("to, for") + the 2ms suffix = לְךָ ("to you"). The full paradigm runs לִי, לְךָ, לָךְ, לוֹ, לָהּ, לָנוּ, לָכֶם...', category: 'suffix' },
  { id: 'class4-suff-10', prompt: 'The dot inside the 3fs suffix ־ָהּ (as in סוּסָהּ "her horse") is called the:', options: ['Mappiq', 'Daghesh Forte', 'Daghesh Lene', 'Maqqef'], correctIndex: 0, explanation: 'The dot in a final ה of the 3fs suffix is a Mappiq — it shows the ה is a full consonant, not a vowel letter. It is neither Daghesh Forte nor Daghesh Lene.', category: 'suffix' },
];

// Chapter 9 paradigm recall. Together with the forms in suffixQuestions, these
// cover every Type 1 person/gender/number value and representative Type 2 forms.
const suffixMemoryQuestions: PracticeQuestion[] = [
  { id: 'class4-memory-suff-2fs', prompt: 'Translate this suffixed noun (2fs).', hebrew: 'סוּסֵךְ', transliteration: 'susekh', options: ['his horse', 'our horse', 'your horse', 'their horse'], correctIndex: 2, explanation: 'סוּסֵךְ = "your horse" when speaking to one woman. The 2fs Type 1 suffix is ־ֵךְ.', category: 'suffix-memory' },
  { id: 'class4-memory-suff-3fs', prompt: 'Translate this suffixed noun (3fs).', hebrew: 'סוּסָהּ', transliteration: 'susah', options: ['her horse', 'his horse', 'my horse', 'your horse'], correctIndex: 0, explanation: 'סוּסָהּ = "her horse." The Mappiq in final ה marks the 3fs suffix ־ָהּ.', category: 'suffix-memory' },
  { id: 'class4-memory-suff-1cp', prompt: 'Translate this suffixed noun (1cp).', hebrew: 'סוּסֵנוּ', transliteration: 'susenu', options: ['their horse', 'your horses', 'my horses', 'our horse'], correctIndex: 3, explanation: 'סוּסֵנוּ = "our horse." The ־ֵנוּ ending carries the 1cp value "our."', category: 'suffix-memory' },
  { id: 'class4-memory-suff-2mp', prompt: 'Translate this suffixed noun (2mp).', hebrew: 'סוּסְכֶם', transliteration: 'suskhem', options: ['their horse', 'your horse', 'our horse', 'his horses'], correctIndex: 1, explanation: 'סוּסְכֶם = "your horse" when addressing a masculine or mixed group. The 2mp Type 1 suffix is ־ְכֶם.', category: 'suffix-memory' },
  { id: 'class4-memory-suff-2fp', prompt: 'Translate this suffixed noun (2fp).', hebrew: 'סוּסְכֶן', transliteration: 'suskhen', options: ['their horse (feminine)', 'your horse (masculine plural)', 'your horse (feminine plural)', 'her horses'], correctIndex: 2, explanation: 'סוּסְכֶן = "your horse" when addressing an all-female group. The 2fp suffix ends in ־ְכֶן.', category: 'suffix-memory' },
  { id: 'class4-memory-suff-3mp', prompt: 'Translate this suffixed noun (3mp).', hebrew: 'סוּסָם', transliteration: 'susam', options: ['our horse', 'your horse', 'their horse', 'their horses'], correctIndex: 2, explanation: 'סוּסָם = "their horse" for a masculine or mixed antecedent. The 3mp Type 1 suffix is ־ָם.', category: 'suffix-memory' },
  { id: 'class4-memory-suff-3fp', prompt: 'Translate this suffixed noun (3fp).', hebrew: 'סוּסָן', transliteration: 'susan', options: ['their horse (feminine)', 'her horse', 'your horse (feminine plural)', 'our horses'], correctIndex: 0, explanation: 'סוּסָן = "their horse" for a feminine antecedent. The 3fp Type 1 suffix is ־ָן.', category: 'suffix-memory' },
  { id: 'class4-memory-suff-type2-1cs', prompt: 'Translate this plural noun with a Type 2 suffix.', hebrew: 'סוּסַי', transliteration: 'susai', options: ['our horses', 'his horse', 'my horses', 'my horse'], correctIndex: 2, explanation: 'סוּסַי = "my horses." Type 2 suffixes attach to plural nouns; compare singular סוּסִי, "my horse."', category: 'suffix-memory' },
  { id: 'class4-memory-suff-type2-3ms', prompt: 'Translate this plural noun with a Type 2 suffix.', hebrew: 'סוּסָיו', transliteration: 'susav', options: ['his horses', 'his horse', 'her horses', 'their horses'], correctIndex: 0, explanation: 'סוּסָיו = "his horses." The י in the Type 2 ending helps signal that the noun is plural.', category: 'suffix-memory' },
  { id: 'class4-memory-suff-elohekha', prompt: 'Translate this high-frequency suffixed form (2ms).', hebrew: 'אֱלֹהֶיךָ', transliteration: 'elohekha', options: ['our God', 'his God', 'my God', 'your God'], correctIndex: 3, explanation: 'אֱלֹהֶיךָ = "your God" when addressing one man. This form appears repeatedly in biblical clauses such as אָנֹכִי יְהוָה אֱלֹהֶיךָ.', category: 'suffix-memory' },
  { id: 'class4-memory-suff-lanu', prompt: 'Translate this preposition with a suffix (1cp).', hebrew: 'לָנוּ', transliteration: 'lanu', options: ['to them', 'to / for us', 'to / for him', 'to / for you'], correctIndex: 1, explanation: 'לָנוּ = "to us" or "for us": לְ ("to, for") plus the 1cp objective suffix.', category: 'suffix-memory' },
];

// Chapter 10 — the construct chain: the Hebrew "of" relationship.
const constructQuestions: PracticeQuestion[] = [
  { id: 'class4-cons-1', prompt: 'How does Hebrew normally express "the X of Y"?', options: ['with a preposition between the nouns', 'by placing two nouns side by side in a construct chain', 'with the conjunction waw', 'by adding the article to both nouns'], correctIndex: 1, explanation: 'Hebrew joins two nouns in a construct chain to show possession/relationship: קוֹל הָאִישׁ = "the voice of the man."', category: 'construct' },
  { id: 'class4-cons-2', prompt: 'In a construct chain, the absolute noun is:', options: ['always the first noun', 'always the last noun', 'always indefinite', 'always plural'], correctIndex: 1, explanation: 'A chain has exactly one absolute noun, and it is always LAST. Every noun before it is in the construct state.', category: 'construct' },
  { id: 'class4-cons-3', prompt: 'Translate this construct chain.', hebrew: 'קוֹל הָאִישׁ', options: ['a voice of the man', 'the voice of the man', 'a voice of a man', 'the voice of a man'], correctIndex: 1, explanation: 'A chain is definite when its ABSOLUTE noun is definite. הָאִישׁ ("the man") is definite, so the whole chain is: "the voice of the man."', category: 'construct' },
  { id: 'class4-cons-4', prompt: 'Can the construct (first) noun take the definite article הַ?', options: ['no, only the absolute noun can', 'yes, always', 'yes, both nouns take it', 'only in the plural'], correctIndex: 0, explanation: 'A construct noun never takes the article. The definiteness of the whole chain rides on the absolute noun instead. (A construct noun may, however, take an inseparable preposition.)', category: 'construct' },
  { id: 'class4-cons-5', prompt: 'Translate this construct chain.', hebrew: 'קְדוֹשׁ יִשְׂרָאֵל', options: ['the Holy One of Israel', 'Israel is holy', 'holy Israel', 'Israel of holiness'], correctIndex: 0, explanation: 'קְדוֹשׁ ("holy one," construct) + the definite name יִשְׂרָאֵל → "the Holy One of Israel," a frequent title in Isaiah.', category: 'construct' },
  { id: 'class4-cons-6', prompt: 'Translate this construct chain.', hebrew: 'דְּבַר יְהוָה', options: ['the word to the LORD', 'the LORD spoke', 'a word about the LORD', 'the word of the LORD'], correctIndex: 3, explanation: 'דָּבָר ("word") reduces to the construct form דְּבַר; joined to יְהוָה it means "the word of the LORD" — a stock phrase for prophetic revelation.', category: 'construct' },
  { id: 'class4-cons-7', prompt: 'If an adjective modifies a construct chain, where must it go?', options: ['before the whole chain', 'between the two nouns', 'after the whole chain', 'attached to the construct noun'], correctIndex: 2, explanation: 'Nothing may separate the nouns of a chain, so a modifying adjective follows the ENTIRE chain while still agreeing with the noun it describes.', category: 'construct' },
  { id: 'class4-cons-8', prompt: 'The masculine-plural ending on a noun changes to which form in the construct state?', options: ['־ִים', '־ֵי', '־וֹת', '־ָה'], correctIndex: 1, explanation: 'Masculine plural absolute ־ִים becomes construct ־ֵי: סוּסִים → סוּסֵי ("horses of"), בָּנִים → בְּנֵי ("sons of").', category: 'construct' },
  { id: 'class4-cons-9', prompt: 'Translate this construct chain.', hebrew: 'בְּנֵי יִשְׂרָאֵל', options: ['the sons of Israel', 'the house of Israel', 'the God of Israel', 'the land of Israel'], correctIndex: 0, explanation: 'בְּנֵי is the construct plural of בֵּן ("son"); with יִשְׂרָאֵל it means "the sons/children of Israel," one of the most frequent phrases in the Old Testament.', category: 'construct' },
  { id: 'class4-cons-10', prompt: 'When a noun goes into the construct state, it typically undergoes:', options: ['vowel reduction and an ending change', 'a change of gender', 'the loss of its root letters', 'the addition of the article'], correctIndex: 0, explanation: 'A construct noun gives up its accent to the absolute noun, so its vowels often reduce (e.g. דָּבָר → דְּבַר) and its ending may change (־ִים → ־ֵי, ־ָה → ־ַת).', category: 'construct' },
];

// Chapter 10 sight-reading: translate frequent construct chains rather than
// only naming the governing rules.
const constructMemoryQuestions: PracticeQuestion[] = [
  { id: 'class4-memory-cons-servant-king', prompt: 'Translate this construct chain.', hebrew: 'עֶבֶד הַמֶּלֶךְ', options: ['the servant of the king', 'a servant and the king', 'the king is a servant', 'a servant of a king'], correctIndex: 0, explanation: 'עֶבֶד is the construct noun and הַמֶּלֶךְ is the definite absolute noun, so the whole chain is definite: "the servant of the king."', category: 'construct-memory' },
  { id: 'class4-memory-cons-book-father', prompt: 'Translate this construct chain.', hebrew: 'סֵפֶר אָבִיהוּ', options: ['a book for our father', 'the book of our father', 'the book of his father', 'his father is a book'], correctIndex: 2, explanation: 'אָבִיהוּ means "his father" and is definite because of its possessive suffix; it makes the chain סֵפֶר אָבִיהוּ definite: "the book of his father."', category: 'construct-memory' },
  { id: 'class4-memory-cons-house-king', prompt: 'Translate this construct chain.', hebrew: 'בֵּית הַמֶּלֶךְ', options: ['a royal city', 'the house of the king', 'the king is in the house', 'a house for a king'], correctIndex: 1, explanation: 'בַּיִת ("house") takes the construct form בֵּית. The article on the final noun makes the whole phrase "the house of the king."', category: 'construct-memory' },
  { id: 'class4-memory-cons-torah-moses', prompt: 'Translate this construct chain.', hebrew: 'תּוֹרַת מֹשֶׁה', options: ['Moses taught the law', 'a law from Moses', 'Moses and the law', 'the law of Moses'], correctIndex: 3, explanation: 'The feminine ending ־ָה changes to ־ַת in construct: תּוֹרָה → תּוֹרַת. The proper name מֹשֶׁה makes the phrase definite: "the law of Moses."', category: 'construct-memory' },
  { id: 'class4-memory-cons-eshet-chayil', prompt: 'Translate this construct phrase.', hebrew: 'אֵשֶׁת חַיִל', transliteration: 'eshet chayil', options: ['a woman of valor', 'the army of a woman', 'a strong man', 'a family of wealth'], correctIndex: 0, explanation: 'אִשָּׁה ("woman, wife") has the construct form אֵשֶׁת; חַיִל can mean "strength, valor, wealth." Together: "a woman/wife of valor."', category: 'construct-memory' },
  { id: 'class4-memory-cons-glory-lord', prompt: 'Translate this construct chain.', hebrew: 'כְּבוֹד יְהוָה', options: ['the LORD is glorious', 'honor from the LORD', 'the glory of the LORD', 'the glorious LORD'], correctIndex: 2, explanation: 'כְּבוֹד is bound to the proper name יְהוָה: "the glory of the LORD." The proper name makes the chain definite.', category: 'construct-memory' },
];

// Verse translation — familiar verses/clauses whose focus grammar is from
// Chapters 8-10. Verbal forms from later chapters are treated as explicitly
// glossed previews rather than assumed knowledge.
const verseQuestions: PracticeQuestion[] = [
  { id: 'class4-verse-1', prompt: 'Translate this verse (Deuteronomy 6:4, the Shema).', hebrew: 'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד', options: ['Love the LORD your God with all your heart.', 'Hear, O Israel: the LORD our God, the LORD is one.', 'The LORD is God; there is no other besides him.', 'Keep the commandments of the LORD your God.'], correctIndex: 1, explanation: 'אֱלֹהֵינוּ = "our God" (the 1cp suffix ־ֵנוּ, Ch 9); the verbless clause יְהוָה אֶחָד = "the LORD is one." שְׁמַע ("hear") is an imperative preview.', category: 'verse' },
  { id: 'class4-verse-2', prompt: 'Translate this clause (Psalm 23:1).', hebrew: 'יְהוָה רֹעִי', options: ['The LORD is my shepherd', 'The LORD is my rock', 'The LORD is my light', 'The LORD is my helper'], correctIndex: 0, explanation: 'A verbless clause with a possessive suffix: רֹעֶה ("shepherd") + the 1cs suffix ־ִי = רֹעִי ("my shepherd"), so "The LORD is my shepherd."', category: 'verse' },
  { id: 'class4-verse-3', prompt: 'Translate this clause (Psalm 24:1).', hebrew: 'לַיהוָה הָאָרֶץ וּמְלוֹאָהּ', options: ['The LORD made the earth and the sea.', 'The heavens declare the glory of God.', "The earth is the LORD's, and all that fills it.", 'The earth is full of the mercy of the LORD.'], correctIndex: 2, explanation: 'לַיהוָה = "belongs to the LORD" (possessive לְ, Ch 6); מְלוֹאָהּ = "its fullness" (the 3fs suffix ־ָהּ with Mappiq, Ch 9). "The earth is the LORD\'s, and all that fills it."', category: 'verse' },
  { id: 'class4-verse-4', prompt: 'Translate this clause (Psalm 118:24).', hebrew: 'זֶה הַיּוֹם עָשָׂה יְהוָה', options: ['This is the word that the LORD has spoken.', 'This is the day that the LORD has made.', 'This is the house of the LORD.', 'This is the way; walk in it.'], correctIndex: 1, explanation: 'The demonstrative pronoun זֶה ("this," Ch 8) fronts the clause: "This is the day (הַיּוֹם) the LORD has made." עָשָׂה ("made") is a verb preview.', category: 'verse' },
  { id: 'class4-verse-5', prompt: 'Translate this clause (Exodus 15:3).', hebrew: 'יְהוָה אִישׁ מִלְחָמָה', options: ['The LORD is my strength and song.', 'The LORD is a man of war.', 'The LORD is a great king.', 'The LORD is my shepherd.'], correctIndex: 1, explanation: 'A verbless clause containing a construct chain: אִישׁ מִלְחָמָה = "man of war" (מִלְחָמָה "war," Ch 9 vocab). "The LORD is a man of war / a warrior."', category: 'verse' },
  { id: 'class4-verse-6', prompt: 'Translate this clause (Psalm 136:1).', hebrew: 'כִּי־טוֹב כִּי לְעוֹלָם חַסְדּוֹ', options: ['For he is good; his steadfast love endures forever.', 'Great is the LORD and greatly to be praised.', 'The LORD is good to all who wait for him.', 'Give thanks to the LORD, for he is God.'], correctIndex: 0, explanation: 'כִּי־טוֹב = "for [he is] good" (predicative טוֹב, Ch 7); חַסְדּוֹ = "his steadfast love" (חֶסֶד, Ch 10 vocab, + the 3ms suffix ־וֹ). לְעוֹלָם = "forever."', category: 'verse' },
];

// Four contextual translations are woven into each chapter mode. They force
// the memorized forms to be read inside real clauses rather than only in
// isolation. Later verbal forms are identified in each explanation.
const chapter8ContextQuestions: PracticeQuestion[] = [
  { id: 'class4-context-ch8-ps86-5', prompt: 'Translate this clause (Psalm 86:5).', hebrew: 'כִּי־אַתָּה אֲדֹנָי טוֹב וְסַלָּח', options: ['For you, O Lord, are good and forgiving.', 'For I am the good and forgiving Lord.', 'The good Lord will forgive you.', 'For he is your good Lord.'], correctIndex: 0, explanation: 'Chapter 8 focus: אַתָּה = "you" (2ms). The verbless core אַתָּה ... טוֹב וְסַלָּח says, "you ... are good and forgiving."', category: 'context-ch8' },
  { id: 'class4-context-ch8-ps90-2', prompt: 'Translate this clause (Psalm 90:2).', hebrew: 'מֵעוֹלָם עַד־עוֹלָם אַתָּה אֵל', options: ['God was present in the ancient world.', 'From everlasting to everlasting, you are God.', 'You will rule the world forever.', 'The eternal God is with you.'], correctIndex: 1, explanation: 'Chapter 8 focus: אַתָּה = "you." The verbless clause אַתָּה אֵל means "you are God"; מֵעוֹלָם עַד־עוֹלָם means "from everlasting to everlasting."', category: 'context-ch8' },
  { id: 'class4-context-ch8-prov7-4', prompt: 'Translate this line (Proverbs 7:4).', hebrew: 'אֱמֹר לַחָכְמָה אֲחֹתִי אָתְּ', options: ['Wisdom says, "I am your sister."', 'Tell your sister to seek wisdom.', 'Say to wisdom, "You are my sister."', 'A wise sister speaks to you.'], correctIndex: 2, explanation: 'Chapter 8 focus: אָתְּ is the pausal form of אַתְּ, "you" (2fs), agreeing with feminine חָכְמָה ("wisdom"). אֲחֹתִי = "my sister." אֱמֹר ("say") is a glossed verb preview.', category: 'context-ch8' },
  { id: 'class4-context-ch8-gen7-1', prompt: 'Translate this line (Genesis 7:1).', hebrew: 'בֹּא־אַתָּה וְכָל־בֵּיתְךָ אֶל־הַתֵּבָה', options: ['Build an ark for yourself and your house.', 'You and your household came out of the ark.', 'The whole household is inside your ark.', 'Come into the ark, you and all your household.'], correctIndex: 3, explanation: 'Chapter 8 focus: אַתָּה = "you" (2ms). Chapter 9 reinforcement: בֵּיתְךָ = "your house/household." בֹּא ("come") is an imperative preview and אֶל־הַתֵּבָה means "into the ark."', category: 'context-ch8' },
];

const chapter9ContextQuestions: PracticeQuestion[] = [
  { id: 'class4-context-ch9-ex20-2', prompt: 'Translate this opening declaration (Exodus 20:2).', hebrew: 'אָנֹכִי יְהוָה אֱלֹהֶיךָ', options: ['I am the LORD your God.', 'The LORD is our God.', 'You are the LORD my God.', 'He is the LORD his God.'], correctIndex: 0, explanation: 'Chapters 8-9 together: אָנֹכִי = "I"; אֱלֹהֶיךָ = "your God" with the 2ms suffix. Hebrew needs no written present-tense "am."', category: 'context-ch9' },
  { id: 'class4-context-ch9-ps2-7', prompt: 'Translate these linked clauses (Psalm 2:7).', hebrew: 'בְּנִי אַתָּה אֲנִי הַיּוֹם יְלִדְתִּיךָ', options: ['I am your son; you made me today.', 'He is my son, and I know him today.', 'You are my son; today I have begotten you.', 'Today your son has become king.'], correctIndex: 2, explanation: 'Interwoven recall: בְּנִי = "my son," אַתָּה = "you," and אֲנִי = "I." The later verbal form יְלִדְתִּיךָ is glossed here as "I have begotten you," ending with an objective 2ms suffix.', category: 'context-ch9' },
  { id: 'class4-context-ch9-isa64-8', prompt: 'Translate these linked clauses (Isaiah 64:8).', hebrew: 'יְהוָה אָבִינוּ אָתָּה אֲנַחְנוּ הַחֹמֶר וְאַתָּה יֹצְרֵנוּ', options: ['The LORD is our king; we are his people and his servants.', 'O LORD, you are our Father; we are the clay, and you are our potter.', 'Our father is the LORD; you formed the clay for us.', 'We are your children, and the LORD is our maker.'], correctIndex: 1, explanation: 'Interwoven recall: אָבִינוּ = "our Father," אָתָּה/אַתָּה = "you," אֲנַחְנוּ = "we," and יֹצְרֵנוּ = "our potter/former." The repeated pronouns mark the linked verbless clauses.', category: 'context-ch9' },
  { id: 'class4-context-ch9-ex3-15', prompt: 'Translate this declaration (Exodus 3:15).', hebrew: 'זֶה־שְּׁמִי לְעֹלָם', options: ['That was his name in ancient times.', 'These are our names forever.', 'Your name belongs to the world.', 'This is my name forever.'], correctIndex: 3, explanation: 'Chapters 8-9 together: זֶה = "this" and שְּׁמִי = "my name" with the 1cs suffix ־ִי. לְעֹלָם = "forever."', category: 'context-ch9' },
];

const chapter10ContextQuestions: PracticeQuestion[] = [
  { id: 'class4-context-ch10-ex40-34', prompt: 'Translate this verse (Exodus 40:34).', hebrew: 'וַיְכַס הֶעָנָן אֶת־אֹהֶל מוֹעֵד וּכְבוֹד יְהוָה מָלֵא אֶת־הַמִּשְׁכָּן', options: ['The cloud covered the tent of meeting, and the glory of the LORD filled the tabernacle.', 'The LORD placed his covenant and his glory inside the ark.', 'The people saw the cloud above the house of the king.', 'Moses entered the tent, and the cloud departed.'], correctIndex: 0, explanation: 'Chapter 10 focus: אֹהֶל מוֹעֵד = "tent of meeting" and כְבוֹד יְהוָה = "the glory of the LORD" are construct chains. The finite verbs are previews: וַיְכַס = "and [it] covered"; מָלֵא = "filled."', category: 'context-ch10' },
  { id: 'class4-context-ch10-ps119-160', prompt: 'Translate this clause (Psalm 119:160).', hebrew: 'רֹאשׁ־דְּבָרְךָ אֱמֶת', options: ['Your first word was faithful.', 'Truth is written above your word.', 'The sum of your word is truth.', 'Your word begins with a command.'], correctIndex: 2, explanation: 'Chapters 9-10 together: רֹאשׁ־דְּבָרְךָ is "the sum/head of your word." דְּבָרְךָ carries the 2ms suffix "your," and the whole expression is the subject of the verbless clause.', category: 'context-ch10' },
  { id: 'class4-context-ch10-prov31-10', prompt: 'Translate this line (Proverbs 31:10).', hebrew: 'אֵשֶׁת־חַיִל מִי יִמְצָא', options: ['A strong man has found his wife.', 'A woman of valor, who can find?', 'Who is this woman in the army?', 'She will find a wealthy family.'], correctIndex: 1, explanation: 'Chapters 8 and 10 together: אֵשֶׁת־חַיִל is the construct phrase "a woman/wife of valor," and מִי = "who?" יִמְצָא ("can/will find") is a glossed verb preview.', category: 'context-ch10' },
  { id: 'class4-context-ch10-gen15-1', prompt: 'Translate this shortened passage (Genesis 15:1).', hebrew: 'אַחַר הַדְּבָרִים הָאֵלֶּה הָיָה דְבַר־יְהוָה אֶל־אַבְרָם ... אָנֹכִי מָגֵן לָךְ', options: ['Before these words, Abram called the LORD his shield.', 'These are the words Abram spoke: "You are my shield."', 'After this, Abram gave his shield to the LORD.', 'After these things the word of the LORD came to Abram ... "I am a shield for you."'], correctIndex: 3, explanation: 'All three chapters meet here: הָאֵלֶּה = "these" (Ch 8), דְבַר־יְהוָה = "the word of the LORD" (Ch 10), and אָנֹכִי = "I" (Ch 8). לָךְ means "for you" here as the pausal 2ms form of ordinary לְךָ (Ch 9); outside a pausal setting, the same visible form normally marks 2fs. הָיָה ("came/was") is a glossed verb preview.', category: 'context-ch10' },
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

// Chapter 8-10 nouns and adjective ("You Should Know" lists). Pronouns and
// particles from Ch 8 are drilled in the pronoun bank above.
export const CLASS4_WORD_GROUPS: PracticeQuestionGroup[] = [
  wordGroup({ id: 'class4-word-acher', hebrew: 'אַחֵר', transliteration: 'acher', transliterationOptions: ['acher', 'achot', 'echad', 'af'], transliterationCorrectIndex: 0, meaning: 'other, another', meaningOptions: ['other, another', 'brother', 'behind', 'one'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class4-word-af', hebrew: 'אַף', transliteration: 'af', transliterationOptions: ['af', 'am', 'ach', 'aph'], transliterationCorrectIndex: 0, meaning: 'nose, nostril; anger', meaningOptions: ['hand', 'nose, nostril; anger', 'people', 'stone'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-baqar', hebrew: 'בָּקָר', transliteration: 'baqar', transliterationOptions: ['boqer', 'baqar', 'basar', 'berakhah'], transliterationCorrectIndex: 1, meaning: 'cattle, herd', meaningOptions: ['morning', 'cattle, herd', 'flesh', 'blessing'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-boqer', hebrew: 'בֹּקֶר', transliteration: 'boqer', transliterationOptions: ['baqar', 'boqer', 'basar', 'gevul'], transliterationCorrectIndex: 1, meaning: 'morning', meaningOptions: ['cattle', 'morning', 'covenant', 'border'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-berakhah', hebrew: 'בְּרָכָה', transliteration: 'berakhah', transliterationOptions: ['berit', 'berakhah', 'basar', 'baqar'], transliterationCorrectIndex: 1, meaning: 'blessing, gift', meaningOptions: ['covenant', 'blessing, gift', 'flesh', 'cattle'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-chatat', hebrew: 'חַטָּאת', transliteration: 'chatat', transliterationOptions: ['chatat', 'chesed', 'chodesh', 'chayil'], transliterationCorrectIndex: 0, meaning: 'sin, sin offering', meaningOptions: ['sin, sin offering', 'loyalty, love', 'month', 'strength'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class4-word-kavod', hebrew: 'כָּבוֹד', transliteration: 'kavod', transliterationOptions: ['keli', 'kavod', 'kohen', 'kesef'], transliterationCorrectIndex: 1, meaning: 'glory, splendor, honor', meaningOptions: ['vessel', 'glory, splendor, honor', 'priest', 'silver'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-keli', hebrew: 'כְּלִי', transliteration: 'keli', transliterationOptions: ['kavod', 'keli', 'kol', 'kesef'], transliterationCorrectIndex: 1, meaning: 'vessel, implement, weapon', meaningOptions: ['glory', 'vessel, implement, weapon', 'all', 'silver'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-lechem', hebrew: 'לֶחֶם', transliteration: 'lechem', transliterationOptions: ['lechem', 'melekh', 'milchamah', 'layla'], transliterationCorrectIndex: 0, meaning: 'bread, food', meaningOptions: ['bread, food', 'king', 'war', 'night'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class4-word-milchamah', hebrew: 'מִלְחָמָה', transliteration: 'milchamah', transliterationOptions: ['mishpachah', 'milchamah', 'midbar', 'mishpat'], transliterationCorrectIndex: 1, meaning: 'war, battle, struggle', meaningOptions: ['family', 'war, battle, struggle', 'wilderness', 'judgment'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-mishpachah', hebrew: 'מִשְׁפָּחָה', transliteration: 'mishpachah', transliterationOptions: ['milchamah', 'mishpachah', 'mishpat', 'midbar'], transliterationCorrectIndex: 1, meaning: 'family, clan', meaningOptions: ['war', 'family, clan', 'judgment', 'wilderness'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-even', hebrew: 'אֶבֶן', transliteration: 'even', transliterationOptions: ['oyev', 'even', 'af', 'adon'], transliterationCorrectIndex: 1, meaning: 'stone', meaningOptions: ['enemy', 'stone', 'anger', 'lord'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-oyev', hebrew: 'אֹיֵב', transliteration: 'oyev', transliterationOptions: ['oyev', 'even', 'adon', 'ish'], transliterationCorrectIndex: 0, meaning: 'enemy', meaningOptions: ['enemy', 'stone', 'lord', 'man'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class4-word-berit', hebrew: 'בְּרִית', transliteration: 'berit', transliterationOptions: ['berakhah', 'berit', 'basar', 'baqar'], transliterationCorrectIndex: 1, meaning: 'covenant', meaningOptions: ['blessing', 'covenant', 'flesh', 'cattle'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-basar', hebrew: 'בָּשָׂר', transliteration: 'basar', transliterationOptions: ['baqar', 'basar', 'boqer', 'berit'], transliterationCorrectIndex: 1, meaning: 'flesh, meat, skin', meaningOptions: ['cattle', 'flesh, meat, skin', 'morning', 'covenant'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-gevul', hebrew: 'גְּבוּל', transliteration: 'gevul', transliterationOptions: ['gadol', 'gevul', 'goy', 'gan'], transliterationCorrectIndex: 1, meaning: 'border, boundary, territory', meaningOptions: ['great', 'border, boundary, territory', 'nation', 'garden'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-chodesh', hebrew: 'חֹדֶשׁ', transliteration: 'chodesh', transliterationOptions: ['chesed', 'chodesh', 'chayil', 'chatat'], transliterationCorrectIndex: 1, meaning: 'month, new moon', meaningOptions: ['loyalty', 'month, new moon', 'strength', 'sin'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-chayil', hebrew: 'חַיִל', transliteration: 'chayil', transliterationOptions: ['chayil', 'chodesh', 'chesed', 'chai'], transliterationCorrectIndex: 0, meaning: 'strength, wealth, army', meaningOptions: ['strength, wealth, army', 'month', 'loyalty', 'living'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class4-word-chesed', hebrew: 'חֶסֶד', transliteration: 'chesed', transliterationOptions: ['chayil', 'chesed', 'chodesh', 'chatat'], transliterationCorrectIndex: 1, meaning: 'loyalty, steadfast love, lovingkindness', meaningOptions: ['strength', 'loyalty, steadfast love, lovingkindness', 'month', 'sin'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-yad', hebrew: 'יָד', transliteration: 'yad', transliterationOptions: ['yam', 'yad', 'yom', 'yeled'], transliterationCorrectIndex: 1, meaning: 'hand', meaningOptions: ['sea', 'hand', 'day', 'child'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class4-word-midbar', hebrew: 'מִדְבָּר', transliteration: 'midbar', transliterationOptions: ['midbar', 'milchamah', 'mishpachah', 'mizbeach'], transliterationCorrectIndex: 0, meaning: 'wilderness, desert, pasture', meaningOptions: ['wilderness, desert, pasture', 'war', 'family', 'altar'], meaningCorrectIndex: 0 }),
];

export const CLASS4_PRONOUN_MEMORY_GROUPS = asGroups(pronounMemoryQuestions);
export const CLASS4_SUFFIX_MEMORY_GROUPS = asGroups(suffixMemoryQuestions);
export const CLASS4_CONSTRUCT_MEMORY_GROUPS = asGroups(constructMemoryQuestions);

export const CLASS4_CH8_CONTEXT_GROUPS = asGroups(chapter8ContextQuestions);
export const CLASS4_CH9_CONTEXT_GROUPS = asGroups(chapter9ContextQuestions);
export const CLASS4_CH10_CONTEXT_GROUPS = asGroups(chapter10ContextQuestions);
export const CLASS4_CONTEXT_GROUPS = [
  ...CLASS4_CH8_CONTEXT_GROUPS,
  ...CLASS4_CH9_CONTEXT_GROUPS,
  ...CLASS4_CH10_CONTEXT_GROUPS,
];

export const CLASS4_PRONOUN_GROUPS = [
  ...asGroups(pronounQuestions),
  ...CLASS4_PRONOUN_MEMORY_GROUPS,
];
export const CLASS4_SUFFIX_GROUPS = [
  ...asGroups(suffixQuestions),
  ...CLASS4_SUFFIX_MEMORY_GROUPS,
];
export const CLASS4_CONSTRUCT_GROUPS = [
  ...asGroups(constructQuestions),
  ...CLASS4_CONSTRUCT_MEMORY_GROUPS,
];
export const CLASS4_VERSE_GROUPS = [
  ...asGroups(verseQuestions),
  ...CLASS4_CONTEXT_GROUPS,
];
