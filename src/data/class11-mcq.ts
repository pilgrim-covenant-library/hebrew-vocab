// Class 11 practice — CourseGuide for BBH Chapters 30-33: the Piel stem
// (strong and weak) and the Pual stem (strong and weak), plus the Chapter
// 30-33 "You Should Know" vocabulary and verse translation whose grammar stays
// within Chapters 1-33.
//
// NOT YET RELEASED. Nothing imports this bank into a route, so it is not
// reachable from the app. Release = add a Class11MCQPractice route page and a
// hub card (see class-6-mcq for the pattern).

import type { PracticeQuestion, PracticeQuestionGroup } from '@/types/class-practice';

function asGroups(questions: PracticeQuestion[]): PracticeQuestionGroup[] {
  return questions.map((question) => ({ id: question.id, questions: [question] }));
}

// Chapter 30 — the Piel stem in strong verbs.
const ch30Questions: PracticeQuestion[] = [
  { id: 'class11-ch30-1', prompt: 'Which feature appears in EVERY form of every Piel conjugation?', options: ['a Daghesh Forte in the second root consonant', 'a נ prefix', 'a Qibbuts under the first root consonant', 'a Hireq Yod stem vowel'], correctIndex: 0, explanation: 'The doubled middle root consonant is the heart of the Piel — and, as you will see, of the Pual and Hithpael as well.', category: 'ch30' },
  { id: 'class11-ch30-2', prompt: 'What vowel stands under Piel Imperfect preformatives and Participle prefixes?', options: ['Pathach', 'a vocal Shewa', 'Qamets', 'Hireq'], correctIndex: 1, explanation: 'יְקַטֵּל and מְקַטֵּל both begin with a vocal Shewa. Compare the Hiphil, which takes Pathach in exactly those places.', category: 'ch30' },
  { id: 'class11-ch30-3', prompt: 'What vowel stands under the FIRST root consonant in the Piel?', options: ['Qibbuts in every conjugation', 'Qamets in every conjugation', 'Pathach in every conjugation except the Perfect', 'Shewa in every conjugation'], correctIndex: 2, explanation: 'The Perfect קִטֵּל takes Hireq; every other conjugation takes Pathach — קַטֵּל, יְקַטֵּל, מְקַטֵּל.', category: 'ch30' },
  { id: 'class11-ch30-4', prompt: 'Which form is the Piel Perfect 3ms of √q-t-l?', options: ['הִקְטִיל', 'נִקְטַל', 'קֻטַּל', 'קִטֵּל'], correctIndex: 3, explanation: 'קִטֵּל — Hireq under the first root consonant, Daghesh Forte in the second, Tsere as the stem vowel.', category: 'ch30' },
  { id: 'class11-ch30-5', prompt: 'Which form is the Piel Imperfect 3ms of √q-t-l?', options: ['יְקַטֵּל', 'יַקְטִיל', 'יִקָּטֵל', 'יִקְטֹל'], correctIndex: 0, explanation: 'יְקַטֵּל — Shewa under the preformative, Pathach under the first root consonant, Daghesh Forte in the second.', category: 'ch30' },
  { id: 'class11-ch30-6', prompt: 'What is the FACTITIVE use of the Piel?', options: ['it makes an active verb passive', 'it makes an intransitive Qal verb transitive', 'it makes a singular verb plural', 'it turns a verb into a noun'], correctIndex: 1, explanation: 'A Qal that cannot take a direct object can do so in the Piel — "to be holy" becomes "to make holy, consecrate."', category: 'ch30' },
  { id: 'class11-ch30-7', prompt: 'Translate this Piel form.', hebrew: 'דִּבֶּר', options: ['he was spoken to', 'speak!', 'he spoke', 'he will speak'], correctIndex: 2, explanation: 'דָּבַר is rare in the Qal, so the Piel simply means "he spoke." Note the Daghesh Forte in the ב, the Piel fingerprint.', category: 'ch30' },
  { id: 'class11-ch30-8', prompt: 'Translate this Piel form.', hebrew: 'שִׁבֵּר', options: ['he shattered, smashed to pieces', 'it was shattered', 'he broke off', 'shatter!'], correctIndex: 0, explanation: 'The Qal שָׁבַר means "he broke"; the intensive Piel means "he smashed to pieces." Its passive is the Pual שֻׁבַּר, "it was smashed."', category: 'ch30' },
];

const ch30MemoryQuestions: PracticeQuestion[] = [
  { id: 'class11-memory-ch30-perfect', prompt: 'Parse this form.', hebrew: 'קִטֵּל', transliteration: 'qittel', options: ['Piel Perfect 3ms', 'Pual Perfect 3ms', 'Piel Imperfect 3ms', 'Qal Perfect 3ms'], correctIndex: 0, explanation: 'Hireq under the first root consonant, Daghesh Forte in the second, Tsere stem vowel. The Pual would have a Qibbuts instead of the Hireq.', category: 'ch30-memory' },
  { id: 'class11-memory-ch30-imperfect', prompt: 'Parse this form.', hebrew: 'יְקַטֵּל', transliteration: 'yeqattel', options: ['Qal Imperfect 3ms', 'Piel Imperfect 3ms', 'Hiphil Imperfect 3ms', 'Pual Imperfect 3ms'], correctIndex: 1, explanation: 'Shewa preformative, Pathach under the first root consonant, Daghesh Forte in the second. The Pual יְקֻטַּל differs only in that first vowel.', category: 'ch30-memory' },
  { id: 'class11-memory-ch30-participle', prompt: 'Parse this form.', hebrew: 'מְקַטֵּל', transliteration: 'meqattel', options: ['Hophal Participle', 'Hiphil Participle', 'Piel Participle ms', 'Niphal Participle'], correctIndex: 2, explanation: 'The מ prefix marks every derived-stem participle; the Shewa, Pathach, and Daghesh Forte make it Piel.', category: 'ch30-memory' },
  { id: 'class11-memory-ch30-vs-hiphil', prompt: 'What separates the Piel from the Hiphil at a glance?', options: ['the Piel doubles the first root consonant; the Hiphil doubles the third', 'the Piel has a נ prefix; the Hiphil has a מ prefix', 'the Piel has no preformative; the Hiphil has no sufformative', 'the Piel doubles the second root consonant; the Hiphil shows a ה prefix and Hireq Yod'], correctIndex: 3, explanation: 'Ask two questions of any unfamiliar form: is the middle root consonant doubled, and is there a Hireq Yod? The answers separate the two most common derived stems.', category: 'ch30-memory' },
  { id: 'class11-memory-ch30-mem', prompt: 'Which stems use a מ prefix on their participles?', options: ['all derived stems except the Niphal', 'only the Piel', 'only the Piel and Pual', 'none of them'], correctIndex: 0, explanation: 'The Niphal participle keeps its נ (נִקְטָל). Everywhere else a מ prefix signals "derived stem," and the vowels tell you which one.', category: 'ch30-memory' },
  { id: 'class11-memory-ch30-qiddesh', prompt: 'Parse and translate this form.', hebrew: 'קִדֵּשׁ', transliteration: 'qiddesh', options: ['Qal Perfect — "he was holy"', 'Piel Perfect 3ms — "he consecrated, made holy"', 'Pual Perfect — "it was consecrated"', 'Niphal Perfect — "he was treated as holy"'], correctIndex: 1, explanation: 'A textbook factitive Piel: the Qal קָדַשׁ means "to be holy," and the Piel makes it transitive — "to make holy."', category: 'ch30-memory' },
];

// Chapter 31 — the Piel stem in weak verbs.
const ch31Questions: PracticeQuestion[] = [
  { id: 'class11-ch31-1', prompt: 'Which weak class is the ONLY one to change the Piel diagnostics significantly?', options: ['III-ה verbs', 'II-Guttural verbs', 'I-נ verbs', 'geminate verbs'], correctIndex: 1, explanation: 'III-ח/ע, III-א, III-ה and geminate roots all keep the strong diagnostics. Only a guttural in SECOND root position causes real trouble.', category: 'ch31' },
  { id: 'class11-ch31-2', prompt: 'Why does a II-Guttural root disturb the Piel?', options: ['because gutturals cannot take a Daghesh Forte', 'because gutturals are always silent', 'because the root loses a letter', 'because gutturals take an extra prefix'], correctIndex: 0, explanation: 'The Piel needs a doubled middle consonant, but gutturals reject the Daghesh Forte. Hebrew compensates in one of two ways instead.', category: 'ch31' },
  { id: 'class11-ch31-3', prompt: 'What are the two responses when a guttural rejects the expected Daghesh Forte?', options: ['assimilation or elision', 'metathesis or apocopation', 'virtual doubling or compensatory lengthening', 'reduplication or dissimilation'], correctIndex: 2, explanation: 'Virtual doubling keeps the vowel short as if the consonant were doubled; compensatory lengthening lengthens the preceding vowel instead — Hireq becomes Tsere, as in בֵּרַךְ.', category: 'ch31' },
  { id: 'class11-ch31-4', prompt: 'Translate this Piel form.', hebrew: 'בֵּרַךְ', options: ['he was blessed', 'bless!', 'a blessing', 'he blessed'], correctIndex: 3, explanation: 'The ר rejects the Daghesh Forte, so the Hireq of קִטֵּל lengthens to Tsere by compensation. The Qal of this root is not used — the Piel simply means "he blessed."', category: 'ch31' },
  { id: 'class11-ch31-5', prompt: 'Translate this Piel form.', hebrew: 'נִחַם', options: ['he was sorry', 'he comforted, consoled', 'comfort!', 'he will be comforted'], correctIndex: 1, explanation: 'A II-Guttural Piel of נָחַם (Ch 24 vocabulary) with virtual doubling. The Niphal of the same root means "to be sorry, to regret."', category: 'ch31' },
  { id: 'class11-ch31-6', prompt: 'What happens to III-ה roots in the Piel?', options: ['they keep all the Piel diagnostics, and take the familiar III-ה endings', 'they lose the Daghesh Forte', 'they lose the Pathach', 'they cannot appear in the Piel'], correctIndex: 0, explanation: 'צִוָּה ("he commanded") is a III-ה Piel: Hireq, Daghesh Forte, and the Qamets-He ending you have met in every stem.', category: 'ch31' },
  { id: 'class11-ch31-7', prompt: 'Translate this Piel form.', hebrew: 'צִוָּה', options: ['he was commanded', 'command!', 'he commanded, gave an order', 'a commandment'], correctIndex: 2, explanation: 'A III-ה Piel of צָוָה. The root barely appears outside the Piel and Pual, so no intensive nuance should be forced onto it.', category: 'ch31' },
  { id: 'class11-ch31-8', prompt: 'Which three features remain the Piel signature across the weak classes?', options: ['a ה prefix, a Hireq Yod, and a Pathach prefix vowel', 'a doubled second consonant, Pathach under the first, and Shewa preformative', 'a נ prefix, a Qibbuts stem vowel, and a Qamets prefix vowel', 'a Qibbuts prefix vowel, a Shureq stem vowel, and a Tsere'], correctIndex: 1, explanation: 'Learn those three once and the whole Piel — strong and weak — becomes readable, with II-Guttural roots as the single recurring exception.', category: 'ch31' },
];

const ch31MemoryQuestions: PracticeQuestion[] = [
  { id: 'class11-memory-ch31-berakh', prompt: 'Which root would you look up for this Piel form?', hebrew: 'בֵּרַךְ', transliteration: 'berakh', options: ['בָּרַךְ ("to bless")', 'בָּרָא ("to create")', 'בָּחַר ("to choose")', 'בְּרִית ("covenant")'], correctIndex: 0, explanation: 'Compensatory lengthening is why the expected Hireq appears as a Tsere. The Pual of the same root is בֹּרַךְ, with a Holem for the same reason.', category: 'ch31-memory' },
  { id: 'class11-memory-ch31-nicham', prompt: 'Which root would you look up for this Piel form?', hebrew: 'נִחַם', transliteration: 'nicham', options: ['נָחָה ("to rest")', 'נָחַם ("to be sorry; to comfort")', 'לָחַם ("to fight")', 'חָמַם ("to be hot")'], correctIndex: 1, explanation: 'Careful: the נ here is a ROOT letter, not the Niphal stem prefix. The Daghesh-less ח with virtual doubling gives the Piel away.', category: 'ch31-memory' },
  { id: 'class11-memory-ch31-tsivvah', prompt: 'Which root would you look up for this Piel form?', hebrew: 'צִוָּה', transliteration: 'tsivvah', options: ['צוּר ("rock")', 'צַר ("adversary")', 'צָוָה ("to command")', 'יָצָא ("to go out")'], correctIndex: 2, explanation: 'The Daghesh Forte sits in the ו, the second root consonant, and the Qamets-He ending marks the III-ה class.', category: 'ch31-memory' },
  { id: 'class11-memory-ch31-guttural', prompt: 'A Piel form whose second root consonant is a guttural with NO Daghesh Forte and a LENGTHENED preceding vowel shows:', options: ['assimilation', 'metathesis', 'virtual doubling', 'compensatory lengthening'], correctIndex: 3, explanation: 'If the vowel stays short instead, the form shows virtual doubling — the doubling is "understood" even though it cannot be written.', category: 'ch31-memory' },
  { id: 'class11-memory-ch31-hillel', prompt: 'Parse and translate this form.', hebrew: 'הִלֵּל', transliteration: 'hillel', options: ['Piel Perfect 3ms — "he praised"', 'Hiphil Perfect 3ms — "he caused to praise"', 'Qal Perfect 3ms — "he shone"', 'Hophal Perfect 3ms — "he was praised"'], correctIndex: 0, explanation: 'A geminate root that keeps every Piel diagnostic. Do not let the initial ה suggest a Hiphil: here it is the first ROOT consonant.', category: 'ch31-memory' },
  { id: 'class11-memory-ch31-classes', prompt: 'Which weak classes keep ALL the Piel strong-verb diagnostics?', options: ['III-ח/ע, III-א, III-ה, and geminate', 'only III-ה', 'only geminate', 'none of them'], correctIndex: 0, explanation: 'That is why Chapter 31 is short: the whole chapter really turns on what a II-Guttural root does to the Daghesh Forte.', category: 'ch31-memory' },
];

// Chapter 32 — the Pual stem in strong verbs.
const ch32Questions: PracticeQuestion[] = [
  { id: 'class11-ch32-1', prompt: 'What is the Pual?', options: ['the causative of the Qal', 'the reflexive of the Piel', 'the passive of the Piel', 'the passive of the Hiphil'], correctIndex: 2, explanation: 'The Piel שִׁבֵּר means "he smashed"; the Pual שֻׁבַּר means "he (it) was smashed." Like the Piel it may also be factitive, denominative, or iterative.', category: 'ch32' },
  { id: 'class11-ch32-2', prompt: 'Which single feature distinguishes a Pual form from a Piel form?', options: ['the Daghesh Forte in the second root consonant', 'the Shewa under Imperfect preformatives', 'a נ prefix', 'a Qibbuts under the first root consonant'], correctIndex: 3, explanation: 'The first and third Pual diagnostics are shared with the Piel. Only the Qibbuts under the first root consonant tells the two apart.', category: 'ch32' },
  { id: 'class11-ch32-3', prompt: 'Which form is the Pual Perfect 3ms of √q-t-l?', options: ['קֻטַּל', 'קִטֵּל', 'נִקְטַל', 'הָקְטַל'], correctIndex: 0, explanation: 'קֻטַּל — Qibbuts under the first root consonant, Daghesh Forte in the second. Compare the Piel קִטֵּל, which has Hireq and Tsere.', category: 'ch32' },
  { id: 'class11-ch32-4', prompt: 'Which form is the Pual Imperfect 3ms of √q-t-l?', options: ['יַקְטִיל', 'יְקֻטַּל', 'יְקַטֵּל', 'יֻקְטַל'], correctIndex: 1, explanation: 'יְקֻטַּל. Note how close it is to the Hophal יֻקְטַל: the Hophal puts its u-class vowel under the PREFORMATIVE, the Pual under the first ROOT consonant.', category: 'ch32' },
  { id: 'class11-ch32-5', prompt: 'Which Pual conjugations does the CourseGuide have you study?', options: ['all seven', 'only the Participle', 'the Perfect, Imperfect, and Participle', 'only the two infinitives'], correctIndex: 2, explanation: 'The remaining Pual conjugations are rare enough that they are not worth memorizing — recognizing these three carries almost all of the payoff.', category: 'ch32' },
  { id: 'class11-ch32-6', prompt: 'Translate this Pual form.', hebrew: 'שֻׁבַּר', options: ['he smashed', 'it was smashed', 'smash!', 'he will smash'], correctIndex: 1, explanation: 'The Qibbuts turns the Piel שִׁבֵּר ("he smashed") into a passive. English needs a form of "to be" to render it.', category: 'ch32' },
  { id: 'class11-ch32-7', prompt: 'Parse this form.', hebrew: 'מְקֻטָּל', options: ['Piel Participle', 'Hophal Participle', 'Hiphil Participle', 'Pual Participle ms'], correctIndex: 3, explanation: 'The מ prefix plus a Shewa, then the Qibbuts under the first root consonant and the Daghesh Forte in the second. Compare the Piel מְקַטֵּל.', category: 'ch32' },
  { id: 'class11-ch32-8', prompt: 'Translate this Pual form.', hebrew: 'מְהֻלָּל', options: ['praised, worthy of praise', 'praising', 'he praised', 'praise!'], correctIndex: 0, explanation: 'A Pual participle of הָלַל: "great is the LORD and greatly to be praised" (Ps 145:3). The Qibbuts under the first root consonant marks the passive.', category: 'ch32' },
];

const ch32MemoryQuestions: PracticeQuestion[] = [
  { id: 'class11-memory-ch32-perfect', prompt: 'Parse this form.', hebrew: 'קֻטַּל', transliteration: 'quttal', options: ['Pual Perfect 3ms', 'Piel Perfect 3ms', 'Hophal Perfect 3ms', 'Qal passive participle'], correctIndex: 0, explanation: 'Qibbuts under the first ROOT consonant plus a Daghesh Forte in the second. The Hophal הֻקְטַל puts its Qibbuts under the ה prefix instead.', category: 'ch32-memory' },
  { id: 'class11-memory-ch32-imperfect', prompt: 'Parse this form.', hebrew: 'יְקֻטַּל', transliteration: 'yequttal', options: ['Piel Imperfect 3ms', 'Pual Imperfect 3ms', 'Hophal Imperfect 3ms', 'Niphal Imperfect 3ms'], correctIndex: 1, explanation: 'Shewa under the preformative, Qibbuts under the first root consonant, Daghesh Forte in the second. The Hophal יֻקְטַל has no Shewa and no doubling.', category: 'ch32-memory' },
  { id: 'class11-memory-ch32-participle', prompt: 'Parse this form.', hebrew: 'מְקֻטָּל', transliteration: 'mequttal', options: ['Hophal Participle', 'Hiphil Participle', 'Pual Participle ms', 'Piel Participle'], correctIndex: 2, explanation: 'The three Pual diagnostics are all present: Shewa under the מ prefix, Qibbuts under the first root consonant, Daghesh Forte in the second.', category: 'ch32-memory' },
  { id: 'class11-memory-ch32-vs-piel', prompt: 'קִטֵּל and קֻטַּל share their consonants. What differs?', hebrew: 'קִטֵּל / קֻטַּל', options: ['the root consonants', 'the person and number', 'the gender of the subject', 'the first vowel and voice'], correctIndex: 3, explanation: 'One vowel carries the whole difference between "he smashed" and "it was smashed." In the Piel-Pual pair, the vowels do all the work.', category: 'ch32-memory' },
  { id: 'class11-memory-ch32-vs-hophal', prompt: 'How do you tell the Pual יְקֻטַּל from the Hophal יֻקְטַל?', hebrew: 'יְקֻטַּל / יֻקְטַל', options: ['by the root consonants', 'by the position of the u-class vowel', 'by the person and number', 'they cannot be distinguished'], correctIndex: 1, explanation: 'The Pual also doubles the second root consonant, which the Hophal never does. Two checks, both quick.', category: 'ch32-memory' },
  { id: 'class11-memory-ch32-shubbar', prompt: 'Which Piel form corresponds to the Pual שֻׁבַּר?', hebrew: 'שֻׁבַּר', options: ['שָׁבַר — "he broke"', 'נִשְׁבַּר — "it was broken"', 'שִׁבֵּר — "he smashed"', 'הִשְׁבִּיר — "he caused to break"'], correctIndex: 2, explanation: 'The Pual is the passive of the Piel specifically, not of the Qal. שָׁבַר (Qal) is "he broke"; נִשְׁבַּר (Niphal) is its passive.', category: 'ch32-memory' },
];

// Chapter 33 — the Pual stem in weak verbs.
const ch33Questions: PracticeQuestion[] = [
  { id: 'class11-ch33-1', prompt: 'Which weak class is the only one to change the Pual diagnostics significantly?', options: ['II-Guttural verbs', 'III-ה verbs', 'I-נ verbs', 'III-א verbs'], correctIndex: 0, explanation: 'Exactly as in the Piel. Both III-א and III-ה verbs keep all the Pual diagnostics intact.', category: 'ch33' },
  { id: 'class11-ch33-2', prompt: 'What are the three Pual diagnostics, restated?', options: ['a ה prefix, a Hireq Yod, and a Pathach', 'a נ prefix, a Qamets, and a Tsere', 'Qibbuts under the first root consonant, Daghesh Forte in the second, and Shewa under Imperfect preformatives', 'a Shureq prefix vowel and a Pathach stem vowel'], correctIndex: 2, explanation: 'The first is what separates the Pual from the Piel; the other two are shared with it.', category: 'ch33' },
  { id: 'class11-ch33-3', prompt: 'What happens in a Pual verb whose second root consonant is a guttural?', options: ['it takes an extra prefix', 'the Qibbuts becomes a Shureq', 'the root loses a letter', 'virtual doubling or compensatory lengthening occurs'], correctIndex: 3, explanation: 'Every other Pual diagnostic stays in place; only the doubling gives way, because a guttural cannot carry it.', category: 'ch33' },
  { id: 'class11-ch33-4', prompt: 'Translate this Pual form.', hebrew: 'מְבֹרָךְ', options: ['blessed, being blessed', 'blessing', 'he blessed', 'bless!'], correctIndex: 0, explanation: 'A Pual participle of בָּרַךְ. The ר rejects the Daghesh Forte, so the expected Qibbuts lengthens to Holem — "may the name of the LORD be blessed" (Job 1:21).', category: 'ch33' },
  { id: 'class11-ch33-5', prompt: 'Translate this Pual form.', hebrew: 'יְסֻפַּר', options: ['he recounted', 'it will be told, it will be recounted', 'tell!', 'a scroll'], correctIndex: 1, explanation: 'A Pual Imperfect of סָפַר, whose Piel means "to recount, tell." All three Pual diagnostics are visible.', category: 'ch33' },
  { id: 'class11-ch33-6', prompt: 'How do III-ה verbs behave in the Pual?', options: ['they lose the Daghesh Forte', 'they lose the Qibbuts', 'they cannot appear in the Pual', 'they keep all the Pual diagnostics, plus the familiar III-ה endings'], correctIndex: 3, explanation: 'וַיְכֻלּוּ ("they were finished," Gen 2:1) shows the Qibbuts and the Daghesh Forte exactly as the strong verb does.', category: 'ch33' },
  { id: 'class11-ch33-7', prompt: 'Translate this Pual form.', hebrew: 'יֻלַּד', options: ['he gave birth', 'he will beget', 'he was born', 'let him be born'], correctIndex: 2, explanation: 'A Pual of יָלַד with the Qibbuts and Daghesh Forte intact: "For to us a child is born" (Isa 9:6) uses this passive form.', category: 'ch33' },
  { id: 'class11-ch33-8', prompt: 'Why is the Pual comparatively easy once you know the Piel?', options: ['because it shares two of its three diagnostics and behaves the same way in the weak classes', 'because it has only one form', 'because it never appears in weak verbs', 'because it is always spelled with a ה'], correctIndex: 0, explanation: 'Learn the Piel thoroughly, then remember one thing: swap the first vowel for a Qibbuts and the voice becomes passive.', category: 'ch33' },
];

const ch33MemoryQuestions: PracticeQuestion[] = [
  { id: 'class11-memory-ch33-mevorakh', prompt: 'Which root would you look up for this Pual form?', hebrew: 'מְבֹרָךְ', transliteration: 'mevorakh', options: ['בָּרַךְ ("to bless")', 'בָּרָא ("to create")', 'בָּחַר ("to choose")', 'מָרַךְ, an unrelated root'], correctIndex: 0, explanation: 'The same compensatory lengthening you met in the Piel בֵּרַךְ, one vowel class over: Hireq to Tsere in the Piel, Qibbuts to Holem in the Pual.', category: 'ch33-memory' },
  { id: 'class11-memory-ch33-yekhullu', prompt: 'Which root would you look up for this Pual form?', hebrew: 'וַיְכֻלּוּ', transliteration: 'vaykhullu', options: ['כּוּן ("to be established")', 'כָּלָה ("to be complete, finished")', 'כָּסָה ("to cover")', 'יָכֹל ("to be able")'], correctIndex: 1, explanation: 'Genesis 2:1: "and the heavens and the earth were finished." The Qibbuts and the Daghesh Forte in the ל are both intact.', category: 'ch33-memory' },
  { id: 'class11-memory-ch33-nuchamah', prompt: 'Which root would you look up for this Pual form?', hebrew: 'נֻחָמָה', transliteration: 'nuchamah', options: ['נוּחַ ("to rest")', 'לָחַם ("to fight")', 'נָחַם ("to comfort")', 'חָמַם ("to be hot")'], correctIndex: 2, explanation: 'The ח cannot take the Daghesh Forte, so the form shows the guttural adjustment; the Qibbuts still marks the passive. Isaiah 54:11: "not comforted."', category: 'ch33-memory' },
  { id: 'class11-memory-ch33-yullad', prompt: 'Which root would you look up for this Pual form?', hebrew: 'יֻלַּד', transliteration: 'yullad', options: ['יָלַךְ, an unrelated root', 'לוּד, an unrelated root', 'יָדָה ("to praise")', 'יָלַד ("to bear, give birth")'], correctIndex: 3, explanation: 'The Qibbuts plus the Daghesh Forte in the ל give the Pual: "he was born." Its Qal means "she gave birth" and its Hiphil "he begot."', category: 'ch33-memory' },
  { id: 'class11-memory-ch33-guttural', prompt: 'In a II-Guttural Pual, which diagnostic is the one that goes missing?', options: ['the Daghesh Forte in the second root consonant', 'the Qibbuts under the first root consonant', 'the Shewa under the preformative', 'the מ prefix on the participle'], correctIndex: 0, explanation: 'Everything else stays. That is why a missing Daghesh Forte alone should never make you abandon a Piel or Pual parse.', category: 'ch33-memory' },
  { id: 'class11-memory-ch33-family', prompt: 'Which three stems share the doubled second root consonant?', options: ['Niphal, Hiphil, and Hophal', 'Qal, Niphal, and Hiphil', 'Piel, Pual, and Hithpael', 'Hiphil, Hophal, and Hithpael'], correctIndex: 2, explanation: 'They form one family. Once you see the Daghesh Forte in the middle root consonant, the vowels and prefixes decide which of the three you are reading.', category: 'ch33-memory' },
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

// Chapter 30-33 "You Should Know" vocabulary.
export const CLASS11_WORD_GROUPS: PracticeQuestionGroup[] = [
  wordGroup({ id: 'class11-word-nagad', hebrew: 'נָגַד', transliteration: 'nagad', transliterationOptions: ['nagad', 'nagash', 'naga', 'nabat'], transliterationCorrectIndex: 0, meaning: 'to tell, announce, declare', meaningOptions: ['to tell, announce, declare', 'to draw near', 'to touch', 'to look'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class11-word-shalakh', hebrew: 'שָׁלַךְ', transliteration: 'shalakh', transliterationOptions: ['shalach', 'shalakh', 'shavat', 'shakhach'], transliterationCorrectIndex: 1, meaning: 'to throw, cast, send', meaningOptions: ['to send', 'to throw, cast, send', 'to cease', 'to forget'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class11-word-delet', hebrew: 'דֶּלֶת', transliteration: 'delet', transliterationOptions: ['daat', 'davar', 'delet', 'derekh'], transliterationCorrectIndex: 2, meaning: 'door', meaningOptions: ['knowledge', 'word', 'door', 'way'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class11-word-daat', hebrew: 'דַּעַת', transliteration: 'daat', transliterationOptions: ['delet', 'derekh', 'dor', 'daat'], transliterationCorrectIndex: 3, meaning: 'knowledge, understanding', meaningOptions: ['door', 'way', 'generation', 'knowledge, understanding'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class11-word-kerem', hebrew: 'כֶּרֶם', transliteration: 'kerem', transliterationOptions: ['kerem', 'keruv', 'kesil', 'koach'], transliterationCorrectIndex: 0, meaning: 'vineyard', meaningOptions: ['vineyard', 'cherub', 'fool', 'strength'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class11-word-ot', hebrew: 'אוֹת', transliteration: 'ot', transliterationOptions: ['or', 'ot', 'of', 'ohel'], transliterationCorrectIndex: 1, meaning: 'sign, mark, pledge', meaningOptions: ['light', 'sign, mark, pledge', 'birds', 'tent'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class11-word-chomah', hebrew: 'חוֹמָה', transliteration: 'chomah', transliterationOptions: ['chokhmah', 'chemah', 'chomah', 'chatser'], transliterationCorrectIndex: 2, meaning: 'wall', meaningOptions: ['wisdom', 'wrath', 'wall', 'courtyard'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class11-word-yeshuah', hebrew: 'יְשׁוּעָה', transliteration: 'yeshuah', transliterationOptions: ['yamin', 'yeter', 'yom', 'yeshuah'], transliterationCorrectIndex: 3, meaning: 'salvation, help, deliverance', meaningOptions: ['right hand', 'remainder', 'day', 'salvation, help, deliverance'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class11-word-goral', hebrew: 'גּוֹרָל', transliteration: 'goral', transliterationOptions: ['goral', 'givah', 'ger', 'gadol'], transliterationCorrectIndex: 0, meaning: 'lot, portion, allotment', meaningOptions: ['lot, portion, allotment', 'hill', 'sojourner', 'great'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class11-word-tsar', hebrew: 'צַר', transliteration: 'tsar', transliterationOptions: ['tsur', 'tsar', 'tsarah', 'tsedeq'], transliterationCorrectIndex: 1, meaning: 'adversary, enemy', meaningOptions: ['rock', 'adversary, enemy', 'distress', 'righteousness'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class11-word-yadah', hebrew: 'יָדָה', transliteration: 'yadah', transliterationOptions: ['yalad', 'yarad', 'yadah', 'yada'], transliterationCorrectIndex: 2, meaning: 'to thank, praise, confess', meaningOptions: ['to give birth', 'to go down', 'to thank, praise, confess', 'to know'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class11-word-pala', hebrew: 'פָּלָא', transliteration: 'pala', transliterationOptions: ['panah', 'patach', 'palal', 'pala'], transliterationCorrectIndex: 3, meaning: 'to be extraordinary, wonderful', meaningOptions: ['to turn', 'to open', 'to pray', 'to be extraordinary, wonderful'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class11-word-tsur', hebrew: 'צוּר', transliteration: 'tsur', transliterationOptions: ['tsur', 'tsar', 'tsarah', 'tsavah'], transliterationCorrectIndex: 0, meaning: 'rock, boulder', meaningOptions: ['rock, boulder', 'adversary', 'distress', 'to command'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class11-word-qeren', hebrew: 'קֶרֶן', transliteration: 'qeren', transliterationOptions: ['qeshet', 'qeren', 'qir', 'qatseh'], transliterationCorrectIndex: 1, meaning: 'horn', meaningOptions: ['bow, weapon', 'horn', 'wall', 'end, border'], meaningCorrectIndex: 1 }),
  wordGroup({ id: 'class11-word-mashach', hebrew: 'מָשַׁח', transliteration: 'mashach', transliterationOptions: ['mashal', 'makhar', 'mashach', 'maas'], transliterationCorrectIndex: 2, meaning: 'to smear, anoint with oil', meaningOptions: ['to rule', 'to sell', 'to smear, anoint with oil', 'to reject'], meaningCorrectIndex: 2 }),
  wordGroup({ id: 'class11-word-shavat', hebrew: 'שָׁבַת', transliteration: 'shavat', transliterationOptions: ['shavar', 'shava', 'shakhan', 'shavat'], transliterationCorrectIndex: 3, meaning: 'to stop, cease, rest', meaningOptions: ['to break', 'to swear', 'to dwell', 'to stop, cease, rest'], meaningCorrectIndex: 3 }),
  wordGroup({ id: 'class11-word-hevel', hebrew: 'הֶבֶל', transliteration: 'hevel', transliterationOptions: ['hevel', 'hamon', 'har', 'hod'], transliterationCorrectIndex: 0, meaning: 'vanity, futility, breath', meaningOptions: ['vanity, futility, breath', 'multitude', 'mountain', 'splendor'], meaningCorrectIndex: 0 }),
  wordGroup({ id: 'class11-word-mizrach', hebrew: 'מִזְרָח', transliteration: 'mizrach', transliterationOptions: ['miqneh', 'mizrach', 'migrash', 'miqdash'], transliterationCorrectIndex: 1, meaning: 'east, sunrise', meaningOptions: ['livestock', 'east, sunrise', 'pastureland', 'sanctuary'], meaningCorrectIndex: 1 }),
];

// Verse translation — Piel and Pual verbs in familiar clauses.
const verseQuestions: PracticeQuestion[] = [
  { id: 'class11-verse-1', prompt: 'Translate this clause (Psalm 19:1).', hebrew: 'הַשָּׁמַיִם מְסַפְּרִים כְּבוֹד־אֵל', options: ['The heavens declare the glory of God.', 'God counted the stars of heaven.', 'Declare the glory of God in the heavens!', 'The glory of God was told in the heavens.'], correctIndex: 0, explanation: 'מְסַפְּרִים is a Piel participle mp of סָפַר (Ch 30) — the Qal means "to count," and the Piel "to recount, declare." The מ prefix, Shewa, and Daghesh Forte are all visible.', category: 'verse' },
  { id: 'class11-verse-2', prompt: 'Translate this command (Psalm 150:1).', hebrew: 'הַלְלוּ־אֵל בְּקָדְשׁוֹ', options: ['God is praised in his sanctuary.', 'Praise God in his sanctuary!', 'They praised God in his sanctuary.', 'His holiness is the praise of God.'], correctIndex: 1, explanation: 'הַלְלוּ is a Piel Imperative 2mp of הָלַל (Ch 30/31). The initial ה is a ROOT letter here, not a Hiphil prefix.', category: 'verse' },
  { id: 'class11-verse-3', prompt: 'Translate this command (Psalm 27:8).', hebrew: 'בַּקְּשׁוּ פָנָי', options: ['They sought my face.', 'My face was sought.', 'I will seek his face.', 'Seek my face!'], correctIndex: 3, explanation: 'בַּקְּשׁוּ is a Piel Imperative 2mp of בָּקַשׁ (Ch 26 vocabulary), with the Pathach and Daghesh Forte the Piel requires outside the Perfect.', category: 'verse' },
  { id: 'class11-verse-4', prompt: 'Translate this clause (Job 1:21).', hebrew: 'יְהִי שֵׁם יְהוָה מְבֹרָךְ', options: ['May the name of the LORD be blessed.', 'The LORD has blessed his name.', 'Bless the name of the LORD!', 'His name blessed the LORD.'], correctIndex: 0, explanation: 'מְבֹרָךְ is a Pual participle of בָּרַךְ (Ch 33): the ר rejects the Daghesh Forte, so the Qibbuts lengthens to Holem. יְהִי is a Jussive.', category: 'verse' },
  { id: 'class11-verse-5', prompt: 'Translate this command (Deuteronomy 6:7).', hebrew: 'וְשִׁנַּנְתָּם לְבָנֶיךָ', options: ['Your sons taught them to you.', 'They were taught by your sons.', 'And you shall teach them diligently to your sons.', 'Let your sons repeat them.'], correctIndex: 2, explanation: 'שִׁנַּנְתָּ is a Piel (Ch 30) with the Waw Consecutive (Ch 17) and a 3mp object suffix (Ch 19). The Piel intensifies: "repeat, impress, teach diligently."', category: 'verse' },
  { id: 'class11-verse-6', prompt: 'Translate this clause (Psalm 145:3).', hebrew: 'גָּדוֹל יְהוָה וּמְהֻלָּל מְאֹד', options: ['The LORD praised the great and the mighty.', 'Great is the LORD, and greatly to be praised.', 'The LORD is great, and he praises greatly.', 'Praise the great and mighty LORD!'], correctIndex: 1, explanation: 'מְהֻלָּל is a Pual participle of הָלַל (Ch 32/33), with the Qibbuts that marks the passive. גָּדוֹל is a predicate adjective in a verbless clause (Ch 7, 23).', category: 'verse' },
];

const chapter30ContextQuestions: PracticeQuestion[] = [
  { id: 'class11-context-ch30-ex20-1', prompt: 'Translate this clause (Exodus 20:1).', hebrew: 'וַיְדַבֵּר אֱלֹהִים אֵת כָּל־הַדְּבָרִים הָאֵלֶּה', options: ['And God spoke all these words.', 'God will speak all these words.', 'All these words were spoken to God.', 'Speak all these words to God!'], correctIndex: 0, explanation: 'Chapter 30 focus: וַיְדַבֵּר is a strong Piel with the Waw Consecutive — Shewa under the preformative, Pathach under the ד, Daghesh Forte in the ב.', category: 'context-ch30' },
  { id: 'class11-context-ch30-gen2-3', prompt: 'Translate this clause (Genesis 2:3).', hebrew: 'וַיְקַדֵּשׁ אֹתוֹ', options: ['It was made holy.', 'He will consecrate it.', 'and he made it holy', 'Consecrate it!'], correctIndex: 2, explanation: 'Chapter 30 focus: a factitive Piel. The Qal קָדַשׁ means "to be holy"; the Piel makes it transitive — "to make holy."', category: 'context-ch30' },
  { id: 'class11-context-ch30-ps107-16', prompt: 'Translate this clause (Psalm 107:16).', hebrew: 'כִּי־שִׁבַּר דַּלְתוֹת נְחֹשֶׁת', options: ['The bronze doors were shattered.', 'for he shatters the doors of bronze', 'Shatter the doors of bronze!', 'The doors of bronze will not break.'], correctIndex: 1, explanation: 'Chapter 30 focus: the intensive Piel of שָׁבַר — the Qal means "he broke," the Piel "he smashed to pieces." דֶּלֶת and נְחֹשֶׁת are Chapter 30 and 23 vocabulary.', category: 'context-ch30' },
  { id: 'class11-context-ch30-ps34-3', prompt: 'Translate this call (Psalm 34:3).', hebrew: 'גַּדְּלוּ לַיהוָה אִתִּי', options: ['The LORD is greater than I.', 'They magnified the LORD with me.', 'I will magnify the LORD.', 'Magnify the LORD with me!'], correctIndex: 3, explanation: 'Chapter 30 focus: a Piel Imperative 2mp of גָּדַל. The Qal means "to be great"; the factitive Piel means "to declare or make great."', category: 'context-ch30' },
];

const chapter31ContextQuestions: PracticeQuestion[] = [
  { id: 'class11-context-ch31-gen1-22', prompt: 'Translate this clause (Genesis 1:22).', hebrew: 'וַיְבָרֶךְ אֹתָם אֱלֹהִים', options: ['And God blessed them.', 'They were blessed by God.', 'God will bless them.', 'Bless them, O God!'], correctIndex: 0, explanation: 'Chapter 31 focus: a II-Guttural-type Piel. The ר cannot take a Daghesh Forte, so the vowel lengthens by compensation — the form is a Piel all the same.', category: 'context-ch31' },
  { id: 'class11-context-ch31-isa40-1', prompt: 'Translate this command (Isaiah 40:1).', hebrew: 'נַחֲמוּ נַחֲמוּ עַמִּי', options: ['My people were comforted.', 'Comfort, comfort my people.', 'They comforted my people.', 'My people will comfort themselves.'], correctIndex: 1, explanation: 'Chapter 31 focus: a II-Guttural Piel Imperative of נָחַם. The ח rejects the Daghesh Forte, so the form shows virtual doubling.', category: 'context-ch31' },
  { id: 'class11-context-ch31-gen2-16', prompt: 'Translate this clause (Genesis 2:16).', hebrew: 'וַיְצַו יְהוָה אֱלֹהִים עַל־הָאָדָם', options: ['The man was commanded by the LORD God.', 'Let the LORD God command the man.', 'And the LORD God commanded the man.', 'The LORD God will command the man.'], correctIndex: 2, explanation: 'Chapter 31 focus: a III-ה Piel of צָוָה, shortened by the Waw Consecutive. The class keeps every Piel diagnostic.', category: 'context-ch31' },
  { id: 'class11-context-ch31-ps147-3', prompt: 'Translate this clause (Psalm 147:3).', hebrew: 'הָרֹפֵא לִשְׁבוּרֵי לֵב וּמְחַבֵּשׁ לְעַצְּבוֹתָם', options: ['The broken-hearted will heal and be bound up.', 'Heal the brokenhearted and bind up their wounds!', 'Their wounds were healed and bound up.', 'He heals the brokenhearted and binds up their wounds.'], correctIndex: 3, explanation: 'Chapter 31 focus: מְחַבֵּשׁ is a Piel participle ("binding up") beside the Qal participle הָרֹפֵא ("the one healing") — a clean side-by-side comparison of the two stems.', category: 'context-ch31' },
];

const chapter32ContextQuestions: PracticeQuestion[] = [
  { id: 'class11-context-ch32-ps22-30', prompt: 'Translate this clause (Psalm 22:30).', hebrew: 'יְסֻפַּר לַאדֹנָי לַדּוֹר', options: ['It will be told of the Lord to the coming generation.', 'They recounted the Lord to that generation.', 'Tell the Lord about the generation!', 'The generation will count on the Lord.'], correctIndex: 0, explanation: 'Chapter 32 focus: יְסֻפַּר is a Pual Imperfect of סָפַר — Shewa under the preformative, Qibbuts under the first root consonant, Daghesh Forte in the second. דּוֹר is Chapter 19 vocabulary.', category: 'context-ch32' },
  { id: 'class11-context-ch32-isa1-6', prompt: 'Translate this clause (Isaiah 1:6).', hebrew: 'לֹא־זֹרוּ וְלֹא חֻבָּשׁוּ', options: ['They did not press or bind the wound.', 'they are not pressed out or bound up', 'Do not press or bind them!', 'Who will press them out and bind them up?'], correctIndex: 1, explanation: 'Chapter 32 focus: חֻבָּשׁוּ is a Pual Perfect 3cp — the Qibbuts under the ח and the Daghesh Forte in the ב mark the passive of the Piel חִבֵּשׁ ("to bind up").', category: 'context-ch32' },
  { id: 'class11-context-ch32-gen2-1', prompt: 'Translate this clause (Genesis 2:1).', hebrew: 'וַיְכֻלּוּ הַשָּׁמַיִם וְהָאָרֶץ', options: ['God completed the heavens and the earth.', 'Let the heavens and the earth be completed.', 'The heavens and the earth will pass away.', 'Thus the heavens and the earth were finished.'], correctIndex: 3, explanation: 'Chapter 32 focus: a Pual with the Waw Consecutive. The Qibbuts under the כ and the Daghesh Forte in the ל are both plainly visible. כָּלָה is Chapter 17 vocabulary.', category: 'context-ch32' },
  { id: 'class11-context-ch32-jer20-14', prompt: 'Translate this clause (Jeremiah 20:14).', hebrew: 'אָרוּר הַיּוֹם אֲשֶׁר יֻלַּדְתִּי בּוֹ', options: ['Cursed be the day on which I was born.', 'I cursed the day of my birth.', 'The day I gave birth was cursed.', 'Let me curse the day that bore me.'], correctIndex: 0, explanation: 'Chapter 32 focus: יֻלַּדְתִּי is a Pual Perfect 1cs of יָלַד — the Qibbuts and Daghesh Forte make it passive, "I was born." אָרוּר is a Qal passive participle (Ch 22).', category: 'context-ch32' },
];

const chapter33ContextQuestions: PracticeQuestion[] = [
  { id: 'class11-context-ch33-isa54-11', prompt: 'Translate this phrase (Isaiah 54:11).', hebrew: 'עֲנִיָּה סֹעֲרָה לֹא נֻחָמָה', options: ['She comforted the afflicted and storm-tossed.', 'The afflicted will be comforted after the storm.', 'O afflicted one, storm-tossed and not comforted', 'Comfort the afflicted and the storm-tossed!'], correctIndex: 2, explanation: 'Chapter 33 focus: נֻחָמָה is a II-Guttural Pual of נָחַם. The ח cannot take the Daghesh Forte, but the Qibbuts still marks the passive.', category: 'context-ch33' },
  { id: 'class11-context-ch33-isa53-5', prompt: 'Translate this clause (Isaiah 53:5).', hebrew: 'וְהוּא מְחֹלָל מִפְּשָׁעֵנוּ', options: ['He profaned himself for our transgressions.', 'Our transgressions were profaned by him.', 'He will pierce us for our transgressions.', 'But he was pierced for our transgressions.'], correctIndex: 3, explanation: 'Chapter 33 focus: מְחֹלָל is a Pual participle of חָלַל, a geminate root that shows virtual doubling rather than a written Daghesh Forte. פֶּשַׁע is Chapter 29 vocabulary.', category: 'context-ch33' },
  { id: 'class11-context-ch33-ps37-22', prompt: 'Translate this clause (Psalm 37:22).', hebrew: 'כִּי מְבֹרָכָיו יִירְשׁוּ אָרֶץ', options: ['for those blessed by him shall inherit the land', 'They will bless him who inherits the land.', 'Bless those who inherit the land!', 'The land will be blessed by its inheritors.'], correctIndex: 0, explanation: 'Chapter 33 focus: מְבֹרָכָיו is a Pual participle of בָּרַךְ in the plural with a 3ms suffix — the Holem where a Qibbuts would stand shows the ר rejecting the Daghesh Forte.', category: 'context-ch33' },
  { id: 'class11-context-ch33-ps113-3', prompt: 'Translate this clause (Psalm 113:3).', hebrew: 'מְהֻלָּל שֵׁם יְהוָה', options: ['The name of the LORD praises him.', 'The name of the LORD is to be praised.', 'Praise the name of the LORD!', 'They praised the name of the LORD.'], correctIndex: 1, explanation: 'Chapter 33 focus: מְהֻלָּל is a Pual participle of the geminate root הָלַל, with all three Pual diagnostics intact — Shewa, Qibbuts, Daghesh Forte.', category: 'context-ch33' },
];

export const CLASS11_CH30_MEMORY_GROUPS = asGroups(ch30MemoryQuestions);
export const CLASS11_CH31_MEMORY_GROUPS = asGroups(ch31MemoryQuestions);
export const CLASS11_CH32_MEMORY_GROUPS = asGroups(ch32MemoryQuestions);
export const CLASS11_CH33_MEMORY_GROUPS = asGroups(ch33MemoryQuestions);

export const CLASS11_CH30_CONTEXT_GROUPS = asGroups(chapter30ContextQuestions);
export const CLASS11_CH31_CONTEXT_GROUPS = asGroups(chapter31ContextQuestions);
export const CLASS11_CH32_CONTEXT_GROUPS = asGroups(chapter32ContextQuestions);
export const CLASS11_CH33_CONTEXT_GROUPS = asGroups(chapter33ContextQuestions);
export const CLASS11_CONTEXT_GROUPS = [
  ...CLASS11_CH30_CONTEXT_GROUPS,
  ...CLASS11_CH31_CONTEXT_GROUPS,
  ...CLASS11_CH32_CONTEXT_GROUPS,
  ...CLASS11_CH33_CONTEXT_GROUPS,
];

export const CLASS11_CH30_GROUPS = [...asGroups(ch30Questions), ...CLASS11_CH30_MEMORY_GROUPS];
export const CLASS11_CH31_GROUPS = [...asGroups(ch31Questions), ...CLASS11_CH31_MEMORY_GROUPS];
export const CLASS11_CH32_GROUPS = [...asGroups(ch32Questions), ...CLASS11_CH32_MEMORY_GROUPS];
export const CLASS11_CH33_GROUPS = [...asGroups(ch33Questions), ...CLASS11_CH33_MEMORY_GROUPS];

export const CLASS11_VERSE_GROUPS = [...asGroups(verseQuestions), ...CLASS11_CONTEXT_GROUPS];
