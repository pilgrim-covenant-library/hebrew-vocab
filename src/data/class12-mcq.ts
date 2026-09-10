// Class 12 practice — CourseGuide for BBH Chapters 34-35: the Hithpael stem in
// strong and weak verbs, plus the Chapter 34-35 "You Should Know" vocabulary
// and verse translation whose grammar stays within Chapters 1-35.
//
// NOTE ON SCOPE: the CourseGuide for Basics of Biblical Hebrew ends at Chapter
// 35 (Hithpael weak verbs). There is no Chapter 36, so this class covers
// Chapters 34-35 and completes the course.
//
// NOT YET RELEASED. Nothing imports this bank into a route, so it is not
// reachable from the app. Release = add a Class12MCQPractice route page and a
// hub card (see class-6-mcq for the pattern).

import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function asGroups(questions: PracticeQuestion[]): PracticeQuestionGroup[] {
  return questions.map((question) => ({ id: question.id, questions: [question] }));
}

// Chapter 34 — the Hithpael stem in strong verbs.
const ch34Questions: PracticeQuestion[] = [
  { id: 'class12-ch34-1', prompt: 'What type of action does the Hithpael normally express?', options: ['reflexive action', 'causative action', 'simple passive action', 'past narrative action'], correctIndex: 0, explanation: 'The Hithpael can also be reciprocal ("one another") or iterative. Reading הִתְקַדֵּשׁ as "he consecrated himself" is the right first instinct.', category: 'ch34' },
  { id: 'class12-ch34-2', prompt: 'Which two features appear in EVERY form of every Hithpael conjugation?', options: ['a נ prefix and a Qamets', 'a Pathach under the first root consonant and a Daghesh Forte in the second', 'a Hireq Yod and a ה prefix', 'a Qibbuts and a Shureq'], correctIndex: 1, explanation: 'The doubled middle root consonant puts the Hithpael in the same family as the Piel and Pual; the Pathach and the ת prefix are what set it apart.', category: 'ch34' },
  { id: 'class12-ch34-3', prompt: 'Which prefix marks the Hithpael Perfect, Imperative, and both infinitives?', options: ['נִ', 'מִתְ', 'הָ', 'הִתְ'], correctIndex: 3, explanation: 'הִתְקַטֵּל. The ת of that prefix is the letter that will metathesize or assimilate when the root begins with certain consonants.', category: 'ch34' },
  { id: 'class12-ch34-4', prompt: 'What are the Hithpael IMPERFECT preformatives?', options: ['יִתְ, תִּתְ, אֶתְ, and נִתְ', 'יְ, תְּ, אֲ, and נְ', 'יַ, תַּ, אַ, and נַ', 'יֻ, תֻּ, אֻ, and נֻ'], correctIndex: 0, explanation: 'The ordinary Imperfect preformatives with a ת attached. אֶתְפַּלֵּל ("I will pray") and יִתְהַלֵּךְ ("he walks about") are typical.', category: 'ch34' },
  { id: 'class12-ch34-5', prompt: 'Which prefix marks the Hithpael Participle?', options: ['נִ', 'הִתְ', 'מִתְ', 'מְ'], correctIndex: 2, explanation: 'מִתְקַטֵּל. Every derived-stem participle takes a מ; the added ת and the Hireq make this one unmistakable.', category: 'ch34' },
  { id: 'class12-ch34-6', prompt: 'What is METATHESIS in the Hithpael?', options: ['the loss of a root letter', 'the doubling of the first root consonant', 'the transposition of the prefix ת with the first root consonant', 'the lengthening of a vowel'], correctIndex: 2, explanation: 'When the root begins with a sibilant, the two letters swap places to smooth out pronunciation: הִתְשַׁמֵּר would be awkward, so Hebrew says הִשְׁתַּמֵּר.', category: 'ch34' },
  { id: 'class12-ch34-7', prompt: 'Which consonants trigger metathesis of the Hithpael ת?', options: ['the sibilants שׂ, צ, ס, and שׁ', 'the gutturals א, ה, ח, and ע', 'the begadkephat letters', 'ט, ז, ד, and ת'], correctIndex: 0, explanation: 'Those four are the "s-sound" consonants. With צ there is a further adjustment: the ת also hardens to ט, as in הִצְטַדֵּק.', category: 'ch34' },
  { id: 'class12-ch34-8', prompt: 'What happens if a root begins with ט, ז, ד, or ת?', options: ['the root letter is dropped', 'the prefix ת metathesizes', 'nothing changes', 'the prefix ת assimilates into the first root consonant and remains as a Daghesh Forte'], correctIndex: 3, explanation: 'הִטַּמֵּא ("he defiled himself") from טָמֵא. The Daghesh Forte in the ט is the assimilated prefix ת, not the Piel-family doubling.', category: 'ch34' },
];

const ch34MemoryQuestions: PracticeQuestion[] = [
  { id: 'class12-memory-ch34-perfect', prompt: 'Parse this form.', hebrew: 'הִתְקַטֵּל', transliteration: 'hitqattel', options: ['Hithpael Perfect 3ms', 'Hiphil Perfect 3ms', 'Niphal Perfect 3ms', 'Piel Perfect 3ms'], correctIndex: 0, explanation: 'The הִתְ prefix, Pathach under the first root consonant, and Daghesh Forte in the second. The same spelling also serves as the Imperative and Infinitive Construct.', category: 'ch34-memory' },
  { id: 'class12-memory-ch34-imperfect', prompt: 'Parse this form.', hebrew: 'יִתְקַטֵּל', transliteration: 'yitqattel', options: ['Piel Imperfect 3ms', 'Hithpael Imperfect 3ms', 'Hophal Imperfect 3ms', 'Niphal Imperfect 3ms'], correctIndex: 1, explanation: 'The יִתְ preformative is the Hithpael\'s own. Compare the Piel יְקַטֵּל, which has the same doubled consonant but no ת.', category: 'ch34-memory' },
  { id: 'class12-memory-ch34-participle', prompt: 'Parse this form.', hebrew: 'מִתְקַטֵּל', transliteration: 'mitqattel', options: ['Piel Participle', 'Pual Participle', 'Hithpael Participle ms', 'Hophal Participle'], correctIndex: 2, explanation: 'מ prefix plus ת plus the doubled middle consonant. הַמִּתְהַלֵּל ("the one who boasts," Jer 9:24) is a familiar example.', category: 'ch34-memory' },
  { id: 'class12-memory-ch34-hitpallel', prompt: 'Which root would you look up for this Hithpael form?', hebrew: 'הִתְפַּלֵּל', transliteration: 'hitpallel', options: ['נָפַל ("to fall")', 'פָּלָא ("to be wonderful")', 'פָּנָה ("to turn")', 'פָּלַל ("to pray, intercede")'], correctIndex: 3, explanation: 'Strip the הִתְ prefix and the root פלל remains — a geminate root that lives almost entirely in the Hithpael: "he prayed."', category: 'ch34-memory' },
  { id: 'class12-memory-ch34-hishtammer', prompt: 'Which root would you look up for this Hithpael form?', hebrew: 'הִשְׁתַּמֵּר', transliteration: 'hishtammer', options: ['שָׁמַר ("to keep")', 'שָׁתָה ("to drink")', 'תָּמַם ("to be complete")', 'מָרַר ("to be bitter")'], correctIndex: 0, explanation: 'Whenever you meet a שׁ followed by a ת at the front of a word, suspect a Hithpael whose prefix has swapped places with the first root letter.', category: 'ch34-memory' },
  { id: 'class12-memory-ch34-reflexive', prompt: 'How should הִתְקַדֵּשׁ be translated?', hebrew: 'הִתְקַדֵּשׁ', transliteration: 'hitqaddesh', options: ['"he was made holy"', '"he consecrated himself"', '"he caused others to be holy"', '"he was holy"'], correctIndex: 1, explanation: 'The Qal קָדַשׁ is "to be holy," the Piel קִדֵּשׁ "to make holy," and the Hithpael turns that action back on the subject.', category: 'ch34-memory' },
];

// Chapter 35 — the Hithpael stem in weak verbs.
const ch35Questions: PracticeQuestion[] = [
  { id: 'class12-ch35-1', prompt: 'Which weak class is the only one to vary significantly from the Hithpael strong-verb diagnostics?', options: ['III-ה verbs', 'geminate verbs', 'II-Guttural verbs', 'I-נ verbs'], correctIndex: 2, explanation: 'The same story as the Piel and Pual: a guttural in second root position is the one thing that disturbs a doubling stem.', category: 'ch35' },
  { id: 'class12-ch35-2', prompt: 'What happens when a Hithpael root has a guttural in SECOND position?', options: ['the guttural rejects the Daghesh Forte, giving virtual doubling or compensatory lengthening', 'the prefix ת is dropped', 'the root loses its third letter', 'the stem becomes a Piel'], correctIndex: 0, explanation: 'Every other diagnostic stays in place — the הִתְ or מִתְ prefix and the Pathach under the first root consonant are still there to identify the stem.', category: 'ch35' },
  { id: 'class12-ch35-3', prompt: 'How do geminate roots behave in the Hithpael?', options: ['they cannot appear in the Hithpael', 'they lose the prefix', 'they lose the Pathach', 'most of them retain all the Hithpael strong-verb diagnostics'], correctIndex: 3, explanation: 'הִתְפַּלֵּל ("he prayed") and הִתְהַלֵּל ("he boasted") are both geminate roots that behave exactly like strong verbs here.', category: 'ch35' },
  { id: 'class12-ch35-4', prompt: 'How do III-ה roots behave in the Hithpael?', options: ['all the strong-verb diagnostics are retained, with the familiar III-ה endings', 'the ה is doubled', 'the stem prefix changes to נ', 'the class does not occur'], correctIndex: 0, explanation: 'Those endings are the same ones you have now met in the Qal and in every derived stem — one paradigm of endings, seven stems.', category: 'ch35' },
  { id: 'class12-ch35-5', prompt: 'What does the verb חָוָה mean, and in which stem does it appear?', hebrew: 'חָוָה', options: ['to live; in the Qal', 'to bow down, worship; in the Hishtaphel', 'to see; in the Niphal', 'to wait; in the Piel'], correctIndex: 1, explanation: 'הִשְׁתַּחֲוָה is the standard Hebrew word for worship. Its shape looks Hithpael-like, and it is traditionally treated alongside it.', category: 'ch35' },
  { id: 'class12-ch35-6', prompt: 'Translate this form.', hebrew: 'הִשְׁתַּחֲוָה', options: ['he was seen', 'he lived', 'he made himself known', 'he bowed down, he worshiped'], correctIndex: 3, explanation: 'From חָוָה. Genesis 24:26: "the man bowed his head and worshiped the LORD."', category: 'ch35' },
  { id: 'class12-ch35-7', prompt: 'Translate this Hithpael form.', hebrew: 'הִתְנַבֵּא', options: ['he prophesied, he behaved as a prophet', 'he was prophesied about', 'prophesy!', 'a prophet'], correctIndex: 0, explanation: 'From נָבָא (Ch 26 vocabulary). The Hithpael describes entering into and acting out the prophetic role.', category: 'ch35' },
  { id: 'class12-ch35-8', prompt: 'Translate this Hithpael form.', hebrew: 'יִתְהַלֵּל', options: ['he will be praised', 'he will praise', 'let him boast, let him glory', 'praise him!'], correctIndex: 2, explanation: 'The Piel הִלֵּל means "he praised"; the Hithpael turns it back on the subject — "he boasts, he glories" (Jer 9:24).', category: 'ch35' },
];

const ch35MemoryQuestions: PracticeQuestion[] = [
  { id: 'class12-memory-ch35-hishtachavah', prompt: 'Which root would you look up for this form?', hebrew: 'הִשְׁתַּחֲוָה', transliteration: 'hishtachavah', options: ['חָוָה ("to bow down, worship")', 'שָׁחַט ("to slaughter")', 'שָׁחָה, an unrelated root', 'חָיָה ("to live")'], correctIndex: 0, explanation: 'The most common verb of worship in the Hebrew Bible, and one of the hardest to look up — the ש and ת in front belong to the stem, not the root.', category: 'ch35-memory' },
  { id: 'class12-memory-ch35-hitnabbe', prompt: 'Which root would you look up for this Hithpael form?', hebrew: 'הִתְנַבֵּא', transliteration: 'hitnabbe', options: ['נָבַט ("to look")', 'נָבָא ("to prophesy")', 'בּוֹא ("to come in")', 'נָבַל ("to be foolish")'], correctIndex: 1, explanation: 'The נ here is a ROOT letter, not a Niphal prefix. The הִתְ in front and the doubled ב settle the stem.', category: 'ch35-memory' },
  { id: 'class12-memory-ch35-hitnechem', prompt: 'Why does יִתְנֶחָם lack a Daghesh Forte in its second root consonant?', hebrew: 'יִתְנֶחָם', transliteration: 'yitnechem', options: ['because the form is a Piel', 'because the root is defective', 'because the ח is a guttural and rejects the doubling', 'because the prefix has assimilated'], correctIndex: 2, explanation: 'A II-Guttural Hithpael of נָחַם. Numbers 23:19 uses it: God is not "a son of man, that he should change his mind."', category: 'ch35-memory' },
  { id: 'class12-memory-ch35-hittamme', prompt: 'What does the Daghesh Forte in the FIRST root consonant of הִטַּמֵּא tell you?', hebrew: 'הִטַּמֵּא', transliteration: 'hittamme', options: ['that a נ has assimilated', 'that the verb is a Niphal', 'that the root is geminate', 'that the prefix ת has assimilated into the ט'], correctIndex: 3, explanation: 'Roots beginning with ט, ז, ד, or ת absorb the prefix ת. Restore it and the root טמא appears: "he defiled himself" (Ch 20 vocabulary).', category: 'ch35-memory' },
  { id: 'class12-memory-ch35-histaddeq', prompt: 'Two things have happened to the prefix ת in הִצְטַדֵּק. What are they?', hebrew: 'הִצְטַדֵּק', transliteration: 'histaddeq', options: ['it has metathesized with the צ and hardened to ט', 'it has assimilated and then been dropped', 'it has doubled and then lengthened', 'it has been replaced by a נ'], correctIndex: 0, explanation: 'The sibilant צ triggers metathesis, and the resulting ת hardens to ט for ease of pronunciation. The root is צָדַק: "how can we clear ourselves?" (Gen 44:16).', category: 'ch35-memory' },
  { id: 'class12-memory-ch35-family', prompt: 'You meet an unfamiliar verb with a Daghesh Forte in its middle root consonant. Which three stems are in play, and what settles it?', options: ['Piel, Pual, and Hithpael — settled by the prefix and the first vowel', 'Niphal, Hiphil, and Hophal — settled by the stem vowel', 'Qal, Niphal, and Piel — settled by the ending', 'Hiphil, Hophal, and Hithpael — settled by the participle'], correctIndex: 0, explanation: 'A ת in the prefix means Hithpael; a Qibbuts under the first root consonant means Pual; otherwise it is a Piel. Three quick checks close out the whole verb system.', category: 'ch35-memory' },
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

// Chapter 34-35 "You Should Know" vocabulary — the last new words of the course.
export const CLASS12_WORD_GROUPS: PracticeQuestionGroup[] = [
  wordGroup({ id: 'class12-word-palal', hebrew: 'פָּלַל', transliteration: 'palal', transliterationOptions: ['palal', 'pala', 'panah', 'patach'], transliterationCorrectIndex: 0, meaning: 'to pray, make intercession', meaningOptions: ['to pray, make intercession', 'to be wonderful', 'to turn', 'to open'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class12-word-taqa', hebrew: 'תָּקַע', transliteration: 'taqa', transliterationOptions: ['tamé', 'taqa', 'taher', 'tefillah'], transliterationCorrectIndex: 1, meaning: 'to thrust, pitch a tent, blow a trumpet', meaningOptions: ['to be unclean', 'to thrust, pitch a tent, blow a trumpet', 'to be clean', 'prayer'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class12-word-or', hebrew: 'אוֹר', transliteration: 'or', transliterationOptions: ['ot', 'of', 'or', 'ohel'], transliterationCorrectIndex: 2, meaning: 'light, daylight', meaningOptions: ['sign', 'birds', 'light, daylight', 'tent'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class12-word-lashon', hebrew: 'לָשׁוֹן', transliteration: 'lashon', transliterationOptions: ['lechem', 'layil', 'lev', 'lashon'], transliterationCorrectIndex: 3, meaning: 'tongue, language', meaningOptions: ['bread', 'night', 'heart', 'tongue, language'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class12-word-miqdash', hebrew: 'מִקְדָּשׁ', transliteration: 'miqdash', transliterationOptions: ['miqdash', 'miqneh', 'mizrach', 'migrash'], transliterationCorrectIndex: 0, meaning: 'sanctuary', meaningOptions: ['sanctuary', 'livestock', 'east', 'pastureland'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class12-word-of', hebrew: 'עוֹף', transliteration: 'of', transliterationOptions: ['or', 'of', 'oz', 'ets'], transliterationCorrectIndex: 1, meaning: 'flying creatures, birds', meaningOptions: ['skin', 'flying creatures, birds', 'strength', 'tree'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class12-word-peri', hebrew: 'פְּרִי', transliteration: 'peri', transliterationOptions: ['pesha', 'peah', 'peri', 'panim'], transliterationCorrectIndex: 2, meaning: 'fruit, offspring', meaningOptions: ['transgression', 'corner, edge', 'fruit, offspring', 'face'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class12-word-qir', hebrew: 'קִיר', transliteration: 'qir', transliterationOptions: ['qeren', 'qeshet', 'qatseh', 'qir'], transliterationCorrectIndex: 3, meaning: 'wall', meaningOptions: ['horn', 'bow', 'end, border', 'wall'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class12-word-rekhev', hebrew: 'רֶכֶב', transliteration: 'rekhev', transliterationOptions: ['rekhev', 'raav', 'ruach', 'rosh'], transliterationCorrectIndex: 0, meaning: 'chariot, chariots', meaningOptions: ['chariot, chariots', 'famine', 'spirit, wind', 'head'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class12-word-chavah', hebrew: 'חָוָה', transliteration: 'chavah', transliterationOptions: ['chayah', 'chavah', 'chanah', 'charah'], transliterationCorrectIndex: 1, meaning: 'to bow down, worship', meaningOptions: ['to live', 'to bow down, worship', 'to camp', 'to burn with anger'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class12-word-barzel', hebrew: 'בַּרְזֶל', transliteration: 'barzel', transliterationOptions: ['bamah', 'beten', 'barzel', 'beged'], transliterationCorrectIndex: 2, meaning: 'iron', meaningOptions: ['high place', 'belly, womb', 'iron', 'garment'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class12-word-keves', hebrew: 'כֶּבֶשׂ', transliteration: 'keves', transliterationOptions: ['kerem', 'kesil', 'koach', 'keves'], transliterationCorrectIndex: 3, meaning: 'lamb, sheep', meaningOptions: ['vineyard', 'fool', 'strength', 'lamb, sheep'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class12-word-emeq', hebrew: 'עֵמֶק', transliteration: 'emeq', transliterationOptions: ['emeq', 'etsem', 'erets', 'ez'], transliterationCorrectIndex: 0, meaning: 'valley, plain', meaningOptions: ['valley, plain', 'bone', 'land', 'goat'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class12-word-tsarah', hebrew: 'צָרָה', transliteration: 'tsarah', transliterationOptions: ['tsar', 'tsarah', 'tsur', 'tsavah'], transliterationCorrectIndex: 1, meaning: 'distress, anxiety, trouble', meaningOptions: ['adversary', 'distress, anxiety, trouble', 'rock', 'to command'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class12-word-raav', hebrew: 'רָעָב', transliteration: 'raav', transliterationOptions: ['rekhev', 'radaf', 'raav', 'rachats'], transliterationCorrectIndex: 2, meaning: 'famine, hunger', meaningOptions: ['chariot', 'to pursue', 'famine, hunger', 'to wash'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class12-word-shor', hebrew: 'שׁוֹר', transliteration: 'shor', transliterationOptions: ['shir', 'shuv', 'shulchan', 'shor'], transliterationCorrectIndex: 3, meaning: 'ox, bull, cow', meaningOptions: ['to sing', 'to return', 'table', 'ox, bull, cow'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class12-word-shulchan', hebrew: 'שֻׁלְחָן', transliteration: 'shulchan', transliterationOptions: ['shulchan', 'shor', 'shevet', 'shalom'], transliterationCorrectIndex: 0, meaning: 'table', meaningOptions: ['table', 'ox', 'rod, tribe', 'peace'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class12-word-tefillah', hebrew: 'תְּפִלָּה', transliteration: 'tefillah', transliterationOptions: ['torah', 'tefillah', 'toledot', 'tokhachat'], transliterationCorrectIndex: 1, meaning: 'prayer', meaningOptions: ['law, instruction', 'prayer', 'generations', 'rebuke'], meaningCorrectIndex: 1 }),
];

// Verse translation — the Hithpael in familiar clauses.
const verseQuestions: PracticeQuestion[] = [
  { id: 'class12-verse-1', prompt: 'Translate this clause (Genesis 5:24).', hebrew: 'וַיִּתְהַלֵּךְ חֲנוֹךְ אֶת־הָאֱלֹהִים', options: ['And Enoch walked with God.', 'God walked before Enoch.', 'Enoch called on God.', 'Let Enoch walk with God.'], correctIndex: 0, explanation: 'וַיִּתְהַלֵּךְ is a Hithpael with the Waw Consecutive (Ch 17). The reflexive force here is iterative: "he walked back and forth, he walked habitually."', category: 'verse' },
  { id: 'class12-verse-2', prompt: 'Translate this clause (Jeremiah 9:24).', hebrew: 'כִּי אִם־בְּזֹאת יִתְהַלֵּל הַמִּתְהַלֵּל', options: ['The boastful will be praised for this.', 'Do not boast in this!', 'but let him who boasts boast in this', 'In this the praise of God is found.'], correctIndex: 2, explanation: 'Two Hithpaels of הָלַל side by side: the Imperfect יִתְהַלֵּל and the participle הַמִּתְהַלֵּל with the article — "the one boasting."', category: 'verse' },
  { id: 'class12-verse-3', prompt: 'Translate this call to worship (Psalm 95:6).', hebrew: 'בֹּאוּ נִשְׁתַּחֲוֶה וְנִכְרָעָה', options: ['They came and bowed down and knelt.', 'He will come and worship and kneel.', 'We came in to worship and kneel.', 'Come, let us worship and bow down.'], correctIndex: 3, explanation: 'נִשְׁתַּחֲוֶה is the 1cp of the Hishtaphel of חָוָה (Ch 35), and וְנִכְרָעָה is a Cohortative — together, an invitation.', category: 'verse' },
  { id: 'class12-verse-4', prompt: 'Translate this command (Leviticus 11:44).', hebrew: 'וְהִתְקַדִּשְׁתֶּם וִהְיִיתֶם קְדֹשִׁים', options: ['Consecrate yourselves therefore, and be holy.', 'You were consecrated and made holy.', 'He consecrated you and made you holy.', 'Who will consecrate you and make you holy?'], correctIndex: 0, explanation: 'הִתְקַדִּשְׁתֶּם is a Hithpael Perfect 2mp with the Waw Consecutive (Ch 17), so it carries imperatival force. The reflexive is plain: "make yourselves holy."', category: 'verse' },
  { id: 'class12-verse-5', prompt: 'Translate this command (Psalm 37:1).', hebrew: 'אַל־תִּתְחַר בַּמְּרֵעִים', options: ['The evildoers were not angry.', 'Fret not yourself because of evildoers.', 'You will not be angry with evildoers.', 'The evildoers will not prosper.'], correctIndex: 1, explanation: 'תִּתְחַר is a Hithpael Imperfect 2ms negated with אַל (Ch 18) — a reflexive "do not heat yourself up, do not fret."', category: 'verse' },
  { id: 'class12-verse-6', prompt: 'Translate this clause (1 Samuel 1:10).', hebrew: 'וַתִּתְפַּלֵּל עַל־יְהוָה', options: ['She was prayed for by the LORD.', 'The LORD prayed over her.', 'Let her pray to the LORD.', 'And she prayed to the LORD.'], correctIndex: 3, explanation: 'A Hithpael of פָּלַל (Ch 34 vocabulary) with the Waw Consecutive. The תִּתְ preformative marks 3fs — Hannah is the subject.', category: 'verse' },
];

const chapter34ContextQuestions: PracticeQuestion[] = [
  { id: 'class12-context-ch34-gen3-8', prompt: 'Translate this clause (Genesis 3:8).', hebrew: 'וַיִּתְחַבֵּא הָאָדָם וְאִשְׁתּוֹ', options: ['And the man and his wife hid themselves.', 'The man and his wife were hidden.', 'He hid the man and his wife.', 'Let the man and his wife hide.'], correctIndex: 0, explanation: 'Chapter 34 focus: a plainly reflexive Hithpael. The יִתְ preformative and the doubled ב are both visible under the Waw Consecutive.', category: 'context-ch34' },
  { id: 'class12-context-ch34-ps37-4', prompt: 'Translate this command (Psalm 37:4).', hebrew: 'וְהִתְעַנַּג עַל־יְהוָה', options: ['The LORD delighted in him.', 'He was given delight by the LORD.', 'Delight yourself in the LORD.', 'Who delights in the LORD?'], correctIndex: 2, explanation: 'Chapter 34 focus: the הִתְ prefix with a reflexive sense — the delight is something the subject does to himself, not something done to him.', category: 'context-ch34' },
  { id: 'class12-context-ch34-ps2-2', prompt: 'Translate this clause (Psalm 2:2).', hebrew: 'יִתְיַצְּבוּ מַלְכֵי־אֶרֶץ', options: ['The kings of the earth were set in place.', 'The kings of the earth set themselves in array.', 'He will station the kings of the earth.', 'Let the kings of the earth be established.'], correctIndex: 1, explanation: 'Chapter 34 focus: a Hithpael of יָצַב — the kings station THEMSELVES. Compare the Niphal נִצָּב (Ch 24 vocabulary), which is passive or simply stative.', category: 'context-ch34' },
  { id: 'class12-context-ch34-prov31-30', prompt: 'Translate this clause (Proverbs 31:30).', hebrew: 'אִשָּׁה יִרְאַת־יְהוָה הִיא תִתְהַלָּל', options: ['A woman praises the LORD she fears.', 'Let her praise the woman who fears the LORD.', 'The LORD praises the woman who fears him.', 'a woman who fears the LORD is to be praised'], correctIndex: 3, explanation: 'Chapter 34 focus: תִתְהַלָּל is a Hithpael of הָלַל. Here the reflexive shades into a passive-like sense — "she is the one to be praised."', category: 'context-ch34' },
];

const chapter35ContextQuestions: PracticeQuestion[] = [
  { id: 'class12-context-ch35-gen22-5', prompt: 'Translate this clause (Genesis 22:5).', hebrew: 'וְנִשְׁתַּחֲוֶה וְנָשׁוּבָה אֲלֵיכֶם', options: ['and we will worship and come back to you', 'They worshiped and returned to you.', 'Worship, and return to us!', 'He worshiped and did not return.'], correctIndex: 0, explanation: 'Chapter 35 focus: נִשְׁתַּחֲוֶה is the 1cp Hishtaphel of חָוָה. The ש and ת in front belong to the stem, which is why the root is so hard to look up.', category: 'context-ch35' },
  { id: 'class12-context-ch35-gen24-26', prompt: 'Translate this clause (Genesis 24:26).', hebrew: 'וַיִּקֹּד הָאִישׁ וַיִּשְׁתַּחוּ לַיהוָה', options: ['The man will bow down and worship the LORD.', 'The LORD bowed the man down before him.', 'And the man bowed his head and worshiped the LORD.', 'Let the man bow down and worship the LORD.'], correctIndex: 2, explanation: 'Chapter 35 focus: וַיִּשְׁתַּחוּ is the Hishtaphel of חָוָה with the Waw Consecutive (Ch 17) — the standard biblical expression for worship.', category: 'context-ch35' },
  { id: 'class12-context-ch35-num23-19', prompt: 'Translate this clause (Numbers 23:19).', hebrew: 'וּבֶן־אָדָם וְיִתְנֶחָם', options: ['nor a son of man, that he should change his mind', 'The son of man was comforted.', 'A son of man will comfort him.', 'Comfort the son of man!'], correctIndex: 0, explanation: 'Chapter 35 focus: a II-Guttural Hithpael of נָחַם. The ח rejects the Daghesh Forte, but the יִתְ preformative still identifies the stem.', category: 'context-ch35' },
  { id: 'class12-context-ch35-isa66-23', prompt: 'Translate this clause (Isaiah 66:23).', hebrew: 'יָבוֹא כָל־בָּשָׂר לְהִשְׁתַּחֲוֺת לְפָנַי', options: ['All flesh worshiped before me and came in.', 'All flesh will be brought in to worship me.', 'Let all flesh come and bow down before me.', 'All flesh shall come to worship before me.'], correctIndex: 3, explanation: 'Chapter 35 focus: לְהִשְׁתַּחֲוֺת is לְ plus an Infinitive Construct (Ch 20) of the Hishtaphel — the ־וֹת ending is the familiar III-ה infinitive ending.', category: 'context-ch35' },
];

export const CLASS12_CH34_MEMORY_GROUPS = asGroups(ch34MemoryQuestions);
export const CLASS12_CH35_MEMORY_GROUPS = asGroups(ch35MemoryQuestions);

export const CLASS12_CH34_CONTEXT_GROUPS = asGroups(chapter34ContextQuestions);
export const CLASS12_CH35_CONTEXT_GROUPS = asGroups(chapter35ContextQuestions);
export const CLASS12_CONTEXT_GROUPS = [
  ...CLASS12_CH34_CONTEXT_GROUPS,
  ...CLASS12_CH35_CONTEXT_GROUPS,
];

export const CLASS12_CH34_GROUPS = [...asGroups(ch34Questions), ...CLASS12_CH34_MEMORY_GROUPS];
export const CLASS12_CH35_GROUPS = [...asGroups(ch35Questions), ...CLASS12_CH35_MEMORY_GROUPS];

export const CLASS12_VERSE_GROUPS = [...asGroups(verseQuestions), ...CLASS12_CONTEXT_GROUPS];
