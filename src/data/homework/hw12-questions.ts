// HW12 — The Hithpael Stem (Strong and Weak).
// CourseGuide for BBH (Pratico/Van Pelt) Chapters 34-35 (Sessions 34-35),
// plus the new Chapter 34-35 vocabulary and verse-translation practice.
//
// NOTE ON SCOPE: the CourseGuide ends at Chapter 35 (Hithpael weak verbs).
// There is no Chapter 36, so this assignment covers Chapters 34-35 and
// completes the course.
//
// NOT YET RELEASED: this bank is intentionally absent from the active
// extended-registry, so it is not reachable from the app. Wire it in when
// the class is ready.

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

// Section 1 — Chapter 34: the Hithpael stem, strong verbs.
const sec1: MCQQuestion[] = [
  { id: 'hw12-s1-q1', type: 'mcq', question: 'What type of action does the Hithpael normally express?', options: ['reflexive action', 'causative action', 'simple passive action', 'completed past action'], correctIndex: 0, explanation: 'CourseGuide Ch 34. It may also be reciprocal or iterative, but "he did it to himself" is the right first instinct.', category: 'hithpael-strong' },
  { id: 'hw12-s1-q2', type: 'mcq', question: 'Which two features appear in EVERY Hithpael form?', options: ['a נ prefix and a Qamets', 'a Pathach under the first root consonant and a Daghesh Forte in the second', 'a Hireq Yod and a ה prefix', 'a Qibbuts and a Shureq'], correctIndex: 1, explanation: 'CourseGuide Ch 34. The doubled middle consonant puts the Hithpael in the Piel/Pual family; the ת prefix is what sets it apart.', category: 'hithpael-strong' },
  { id: 'hw12-s1-q3', type: 'mcq', question: 'Which prefix marks the Hithpael Perfect, Imperative, and both infinitives?', options: ['נִ', 'מִתְ', 'הִתְ', 'הָ'], correctIndex: 2, explanation: 'CourseGuide Ch 34. הִתְקַטֵּל. The ת of that prefix is the letter that metathesizes or assimilates in certain roots.', category: 'hithpael-strong' },
  { id: 'hw12-s1-q4', type: 'mcq', question: 'What are the Hithpael Imperfect preformatives?', options: ['יְ, תְּ, אֲ, נְ', 'יַ, תַּ, אַ, נַ', 'יֻ, תֻּ, אֻ, נֻ', 'יִתְ, תִּתְ, אֶתְ, נִתְ'], correctIndex: 3, explanation: 'CourseGuide Ch 34. The ordinary preformatives with a ת attached: אֶתְפַּלֵּל ("I will pray"), יִתְהַלֵּךְ ("he walks about").', category: 'hithpael-strong' },
  { id: 'hw12-s1-q5', type: 'mcq', question: 'Which prefix marks the Hithpael Participle?', options: ['מִתְ', 'הִתְ', 'נִ', 'מְ'], correctIndex: 0, explanation: 'CourseGuide Ch 34. מִתְקַטֵּל. Every derived-stem participle takes a מ; the added ת makes this one unmistakable.', category: 'hithpael-strong' },
  { id: 'hw12-s1-q6', type: 'mcq', question: 'What is metathesis?', options: ['the loss of a root letter', 'the transposition of two adjacent consonants to ease pronunciation', 'the doubling of a consonant', 'the lengthening of a vowel'], correctIndex: 1, explanation: 'CourseGuide Ch 34. הִתְשַׁמֵּר would be awkward, so the two letters swap: הִשְׁתַּמֵּר.', category: 'hithpael-strong' },
  { id: 'hw12-s1-q7', type: 'mcq', question: 'Which consonants trigger metathesis of the Hithpael ת?', options: ['the gutturals א, ה, ח, ע', 'the begadkephat letters', 'the sibilants שׂ, צ, ס, and שׁ', 'ט, ז, ד, and ת'], correctIndex: 2, explanation: 'CourseGuide Ch 34. With צ there is a further change: the ת also hardens to ט, giving forms like הִצְטַדֵּק.', category: 'hithpael-strong' },
  { id: 'hw12-s1-q8', type: 'mcq', question: 'What happens if a root begins with ט, ז, ד, or ת?', options: ['the root letter drops out', 'the prefix ת metathesizes', 'nothing changes', 'the prefix ת assimilates into the first root consonant as a Daghesh Forte'], correctIndex: 3, explanation: 'CourseGuide Ch 34. הִטַּמֵּא ("he defiled himself") from טָמֵא — the Daghesh Forte in the ט is the absorbed prefix.', category: 'hithpael-strong' },
  { id: 'hw12-s1-q9', type: 'mcq', question: 'Parse: הִתְקַטֵּל', hebrew: 'הִתְקַטֵּל', options: ['Hithpael Perfect 3ms', 'Hiphil Perfect 3ms', 'Niphal Perfect 3ms', 'Piel Perfect 3ms'], correctIndex: 0, explanation: 'CourseGuide Ch 34. הִתְ prefix, Pathach under the first root consonant, Daghesh Forte in the second.', category: 'hithpael-strong' },
  { id: 'hw12-s1-q10', type: 'mcq', question: 'Parse: מִתְקַטֵּל', hebrew: 'מִתְקַטֵּל', options: ['Piel Participle', 'Hithpael Participle ms', 'Pual Participle', 'Hophal Participle'], correctIndex: 1, explanation: 'CourseGuide Ch 34. הַמִּתְהַלֵּל ("the one who boasts," Jer 9:24) is the same form with the article.', category: 'hithpael-strong' },
  { id: 'hw12-s1-q11', type: 'mcq', question: 'Translate: הִתְקַדֵּשׁ', hebrew: 'הִתְקַדֵּשׁ', options: ['he was made holy', 'he consecrated himself', 'he caused others to be holy', 'he was holy'], correctIndex: 1, explanation: 'CourseGuide Ch 34. The Qal קָדַשׁ is "to be holy," the Piel קִדֵּשׁ "to make holy," and the Hithpael turns that action back on the subject.', category: 'hithpael-strong' },
  { id: 'hw12-s1-q12', type: 'mcq', question: 'Which root would you look up for הִתְפַּלֵּל?', hebrew: 'הִתְפַּלֵּל', options: ['נָפַל ("to fall")', 'פָּלָא ("to be wonderful")', 'פָּנָה ("to turn")', 'פָּלַל ("to pray, intercede")'], correctIndex: 3, explanation: 'CourseGuide Ch 34. A geminate root that lives almost entirely in the Hithpael: "he prayed."', category: 'hithpael-strong' },
  { id: 'hw12-s1-q13', type: 'mcq', question: 'Which root would you look up for הִשְׁתַּמֵּר?', hebrew: 'הִשְׁתַּמֵּר', options: ['שָׁמַר ("to keep")', 'שָׁתָה ("to drink")', 'תָּמַם ("to be complete")', 'מָרַר ("to be bitter")'], correctIndex: 0, explanation: 'CourseGuide Ch 34. A שׁ followed by a ת at the front of a word should make you suspect a Hithpael with metathesis.', category: 'hithpael-strong' },
  { id: 'hw12-s1-q14', type: 'mcq', question: 'Two things happened to the prefix ת in הִצְטַדֵּק. What?', hebrew: 'הִצְטַדֵּק', options: ['it assimilated and was then dropped', 'it metathesized with the צ and hardened to ט', 'it doubled and then lengthened', 'it was replaced by a נ'], correctIndex: 1, explanation: 'CourseGuide Ch 34. The sibilant צ triggers metathesis, and the ת hardens to ט for ease of pronunciation. The root is צָדַק.', category: 'hithpael-strong' },
  { id: 'hw12-s1-q15', type: 'mcq', question: 'You meet a verb with a Daghesh Forte in its middle root consonant. Which three stems are in play?', options: ['Niphal, Hiphil, Hophal', 'Qal, Niphal, Piel', 'Hiphil, Hophal, Hithpael', 'Piel, Pual, Hithpael'], correctIndex: 3, explanation: 'CourseGuide Ch 30-34. A ת in the prefix means Hithpael; a Qibbuts under the first root consonant means Pual; otherwise it is a Piel.', category: 'hithpael-strong' },
];

// Section 2 — Chapter 35: the Hithpael stem, weak verbs.
const sec2: MCQQuestion[] = [
  { id: 'hw12-s2-q1', type: 'mcq', question: 'Which weak class varies significantly from the Hithpael strong-verb diagnostics?', options: ['II-Guttural verbs', 'III-ה verbs', 'geminate verbs', 'I-נ verbs'], correctIndex: 0, explanation: 'CourseGuide Ch 35. The same story as the Piel and Pual: a guttural in second root position is what disturbs a doubling stem.', category: 'hithpael-weak' },
  { id: 'hw12-s2-q2', type: 'mcq', question: 'What happens when a Hithpael root has a guttural in SECOND position?', options: ['the prefix ת is dropped', 'the guttural rejects the Daghesh Forte, giving virtual doubling or compensatory lengthening', 'the root loses its third letter', 'the stem becomes a Piel'], correctIndex: 1, explanation: 'CourseGuide Ch 35. Everything else stays: the הִתְ or מִתְ prefix and the Pathach still identify the stem.', category: 'hithpael-weak' },
  { id: 'hw12-s2-q3', type: 'mcq', question: 'How do geminate roots behave in the Hithpael?', options: ['they cannot appear in the Hithpael', 'they lose the prefix', 'most retain all the strong-verb diagnostics', 'they lose the Pathach'], correctIndex: 2, explanation: 'CourseGuide Ch 35. הִתְפַּלֵּל and הִתְהַלֵּל are both geminate roots that behave exactly like strong verbs here.', category: 'hithpael-weak' },
  { id: 'hw12-s2-q4', type: 'mcq', question: 'How do III-ה roots behave in the Hithpael?', options: ['the ה doubles', 'the stem prefix changes to נ', 'the class does not occur', 'all the strong-verb diagnostics are retained, with the familiar III-ה endings'], correctIndex: 3, explanation: 'CourseGuide Ch 35. Those endings are the same ones you have met in the Qal and in every derived stem.', category: 'hithpael-weak' },
  { id: 'hw12-s2-q5', type: 'mcq', question: 'What does חָוָה mean, and in which stem does it appear?', hebrew: 'חָוָה', options: ['to bow down, worship; in the Hishtaphel', 'to live; in the Qal', 'to see; in the Niphal', 'to wait; in the Piel'], correctIndex: 0, explanation: 'CourseGuide Ch 35. הִשְׁתַּחֲוָה is the standard biblical word for worship, and it is studied alongside the Hithpael.', category: 'hithpael-weak' },
  { id: 'hw12-s2-q6', type: 'mcq', question: 'Translate: הִשְׁתַּחֲוָה', hebrew: 'הִשְׁתַּחֲוָה', options: ['he lived', 'he bowed down, he worshiped', 'he was seen', 'he made himself known'], correctIndex: 1, explanation: 'CourseGuide Ch 35. Genesis 24:26: "the man bowed his head and worshiped the LORD."', category: 'hithpael-weak' },
  { id: 'hw12-s2-q7', type: 'mcq', question: 'Which root would you look up for הִשְׁתַּחֲוָה?', hebrew: 'הִשְׁתַּחֲוָה', options: ['שָׁחַט ("to slaughter")', 'חָיָה ("to live")', 'חָוָה ("to bow down, worship")', 'שָׁחָה, an unrelated root'], correctIndex: 2, explanation: 'CourseGuide Ch 35. One of the hardest forms in the Bible to look up — the ש and ת in front belong to the stem, not to the root.', category: 'hithpael-weak' },
  { id: 'hw12-s2-q8', type: 'mcq', question: 'Translate: הִתְנַבֵּא', hebrew: 'הִתְנַבֵּא', options: ['he prophesied, he behaved as a prophet', 'he was prophesied about', 'prophesy!', 'a prophet'], correctIndex: 0, explanation: 'CourseGuide Ch 35. From נָבָא (Ch 26 vocabulary). The נ here is a root letter, not a Niphal prefix.', category: 'hithpael-weak' },
  { id: 'hw12-s2-q9', type: 'mcq', question: 'Translate: יִתְהַלֵּל', hebrew: 'יִתְהַלֵּל', options: ['he will be praised', 'he will praise', 'praise him!', 'let him boast, let him glory'], correctIndex: 3, explanation: 'CourseGuide Ch 35. The Piel הִלֵּל means "he praised"; the Hithpael turns it back on the subject (Jer 9:24).', category: 'hithpael-weak' },
  { id: 'hw12-s2-q10', type: 'mcq', question: 'Why does יִתְנֶחָם lack a Daghesh Forte in its second root consonant?', hebrew: 'יִתְנֶחָם', options: ['because the form is a Piel', 'because the ח is a guttural and rejects the doubling', 'because the root is defective', 'because the prefix has assimilated'], correctIndex: 1, explanation: 'CourseGuide Ch 35. A II-Guttural Hithpael of נָחַם, used of God in Numbers 23:19.', category: 'hithpael-weak' },
  { id: 'hw12-s2-q11', type: 'mcq', question: 'What does the Daghesh Forte in the FIRST root consonant of הִטַּמֵּא tell you?', hebrew: 'הִטַּמֵּא', options: ['that a נ has assimilated', 'that the verb is a Niphal', 'that the prefix ת has assimilated into the ט', 'that the root is geminate'], correctIndex: 2, explanation: 'CourseGuide Ch 35. Restore the prefix and the root טמא appears (Ch 20 vocabulary): "he defiled himself."', category: 'hithpael-weak' },
  { id: 'hw12-s2-q12', type: 'mcq', question: 'Parse: מִשְׁתַּחֲוִים', hebrew: 'מִשְׁתַּחֲוִים', options: ['Hishtaphel participle mp', 'Hithpael Perfect 3cp', 'Piel participle mp', 'Niphal participle mp'], correctIndex: 0, explanation: 'CourseGuide Ch 35. The מ prefix marks the participle, the שׁת shows the metathesized stem, and ־ִים is the ordinary masculine plural ending (Gen 37:9).', category: 'hithpael-weak' },
  { id: 'hw12-s2-q13', type: 'mcq', question: 'How is the Hithpael negated in a prohibition?', options: ['with אֵין plus the participle', 'with בִּלְתִּי plus the infinitive', 'it cannot be negated', 'with לֹא or אַל plus the Imperfect'], correctIndex: 3, explanation: 'CourseGuide Ch 18/34. אַל־תִּתְחַר בַּמְּרֵעִים ("Fret not yourself because of evildoers," Ps 37:1) uses אַל with a Hithpael Imperfect.', category: 'hithpael-weak' },
  { id: 'hw12-s2-q14', type: 'mcq', question: 'Which stems use a מ prefix on their participles?', options: ['Piel, Pual, Hiphil, Hophal, and Hithpael', 'only Piel and Pual', 'only the Hithpael', 'all seven stems'], correctIndex: 0, explanation: 'CourseGuide Ch 30-35. The Qal participle has no prefix and the Niphal keeps its נ; every other stem takes a מ, and the vowels tell you which.', category: 'hithpael-weak' },
  { id: 'hw12-s2-q15', type: 'mcq', question: 'Which set correctly names the seven Hebrew stems?', options: ['Qal, Niphal, Piel, Pual, Hiphil, Hophal, Hithpael', 'Qal, Niphal, Piel, Pual, Hiphil, Hophal, Hishtaphel', 'Qal, Niphal, Piel, Hiphil, Hophal, Hithpael, Polel', 'Qal, Piel, Pual, Hiphil, Hophal, Hithpael, Poel'], correctIndex: 0, explanation: 'CourseGuide Ch 24-35. Three pairs — Piel/Pual, Hiphil/Hophal, and the active/passive-reflexive Niphal — plus the Qal and the reflexive Hithpael.', category: 'hithpael-weak' },
];

// Section 3 — Chapter 34-35 vocabulary ("You Should Know" lists).
const sec3: PairedMCQQuestion[] = [
  vocab('hw12-s3-q1', 'פָּלַל', 'palal', ['pala', 'panah', 'patach'], 0, 'to pray, make intercession', ['to be wonderful', 'to turn', 'to open'], 1, 'Ch 34 vocab. The root behind תְּפִלָּה ("prayer"), also Chapter 35 vocabulary.'),
  vocab('hw12-s3-q2', 'חָוָה', 'chavah', ['chayah', 'chanah', 'charah'], 1, 'to bow down, worship', ['to live', 'to camp', 'to burn with anger'], 0, 'Ch 35 vocab. Its Hishtaphel הִשְׁתַּחֲוָה is the standard biblical word for worship.'),
  vocab('hw12-s3-q3', 'לָשׁוֹן', 'lashon', ['lechem', 'layil', 'lev'], 2, 'tongue, language', ['bread', 'night', 'heart'], 3, 'Ch 34 vocab. Used both of the organ and of the language a people speaks.'),
  vocab('hw12-s3-q4', 'קִיר', 'qir', ['qeren', 'qeshet', 'qatseh'], 3, 'wall', ['horn', 'bow, weapon', 'end, border'], 2, 'Ch 34 vocab. The wall of a house, as distinct from חוֹמָה, a city wall.'),
  vocab('hw12-s3-q5', 'כֶּבֶשׂ', 'keves', ['kerem', 'kesil', 'koach'], 0, 'lamb, sheep', ['vineyard', 'fool', 'strength'], 1, 'Ch 35 vocab. The animal of the daily sacrifice and of the Passover.'),
  vocab('hw12-s3-q6', 'עֵמֶק', 'emeq', ['etsem', 'ez', 'erets'], 1, 'valley, plain', ['bone', 'goat', 'land'], 0, 'Ch 35 vocab. "Though I walk through the valley of the shadow of death" uses a related word, גֵּיא.'),
  vocab('hw12-s3-q7', 'צָרָה', 'tsarah', ['tsar', 'tsur', 'tsavah'], 2, 'distress, anxiety, trouble', ['adversary', 'rock', 'to command'], 3, 'Ch 35 vocab. "God is our refuge and strength, a very present help in trouble (צָרָה)" (Ps 46:1).'),
  vocab('hw12-s3-q8', 'רָעָב', 'raav', ['rekhev', 'radaf', 'rachats'], 3, 'famine, hunger', ['chariot', 'to pursue', 'to wash'], 2, 'Ch 35 vocab. The famine that drives the patriarchs into Egypt.'),
  vocab('hw12-s3-q9', 'שׁוֹר', 'shor', ['shir', 'shuv', 'shulchan'], 0, 'ox, bull, cow', ['to sing', 'to return', 'table'], 1, 'Ch 35 vocab. "You shall not covet your neighbor\'s ox" (Ex 20:17).'),
  vocab('hw12-s3-q10', 'שֻׁלְחָן', 'shulchan', ['shor', 'shevet', 'shalom'], 1, 'table', ['ox', 'rod, tribe', 'peace'], 3, 'Ch 35 vocab. "You prepare a table before me in the presence of my enemies" (Ps 23:5).'),
  vocab('hw12-s3-q11', 'עֵז', 'ez', ['oz', 'or', 'of'], 2, 'goat, goat\'s hair', ['strength', 'light', 'birds'], 3, 'Ch 34 vocab. Do not confuse it with עֹז ("strength"), Chapter 29 vocabulary.'),
  vocab('hw12-s3-q12', 'בָּמָה', 'bamah', ['bayit', 'beten', 'behemah'], 3, 'high place, sacred hill', ['house', 'belly, womb', 'beast'], 2, 'Ch 35 vocab. The hilltop shrines the kings of Judah are repeatedly judged for tolerating.'),
];

// Section 4 — Verse translation: the Hithpael in familiar clauses.
const sec4: MCQQuestion[] = [
  { id: 'hw12-s4-q1', type: 'mcq', question: 'Translate this clause (Genesis 6:9).', hebrew: 'אֶת־הָאֱלֹהִים הִתְהַלֶּךְ־נֹחַ', options: ['Noah walked with God.', 'God walked before Noah.', 'Noah called on God.', 'Let Noah walk with God.'], correctIndex: 0, explanation: 'הִתְהַלֶּךְ is a Hithpael of הָלַךְ (Ch 34) with iterative force — "he walked habitually." אֶת־ here is the preposition "with," and the phrase is fronted (Ch 23).', category: 'verse' },
  { id: 'hw12-s4-q2', type: 'mcq', question: 'Translate this command (Psalm 105:3).', hebrew: 'הִתְהַלְלוּ בְּשֵׁם קָדְשׁוֹ', options: ['His holy name was praised.', 'Glory in his holy name!', 'They boasted in his holy name.', 'He will praise his own holy name.'], correctIndex: 1, explanation: 'הִתְהַלְלוּ is a Hithpael Imperative 2mp of הָלַל (Ch 34) — "boast yourselves, glory." בְּשֵׁם קָדְשׁוֹ is a construct chain with a suffix (Ch 9, 10).', category: 'verse' },
  { id: 'hw12-s4-q3', type: 'mcq', question: 'Translate this clause (2 Chronicles 7:14).', hebrew: 'וְיִתְפַּלְלוּ וִיבַקְשׁוּ פָנַי', options: ['I sought them and they prayed.', 'Their prayers and their seeking were heard.', 'Pray and seek my face!', 'and pray and seek my face'], correctIndex: 3, explanation: 'יִתְפַּלְלוּ is a Hithpael Imperfect 3mp of פָּלַל (Ch 34), paired with the Piel יְבַקְשׁוּ from בָּקַשׁ (Ch 26 vocabulary).', category: 'verse' },
  { id: 'hw12-s4-q4', type: 'mcq', question: 'Translate this clause (Daniel 9:4).', hebrew: 'וָאֶתְפַּלְלָה לַיהוָה אֱלֹהַי וָאֶתְוַדֶּה', options: ['And I prayed to the LORD my God and made confession.', 'The LORD my God heard my prayer and confession.', 'Pray to the LORD your God and confess!', 'He prayed to the LORD his God and confessed.'], correctIndex: 0, explanation: 'Two Hithpaels with the 1cs preformative אֶתְ (Ch 34), both carrying the Waw Consecutive (Ch 17). The reflexive is clear in "confess" — literally "to declare oneself."', category: 'verse' },
  { id: 'hw12-s4-q5', type: 'mcq', question: 'Translate this clause (Exodus 34:8).', hebrew: 'וַיְמַהֵר מֹשֶׁה וַיִּקֹּד אַרְצָה וַיִּשְׁתָּחוּ', options: ['Moses hurried to the ground and was worshiped.', 'Let Moses bow to the ground and worship.', 'And Moses quickly bowed his head to the ground and worshiped.', 'Moses will hurry to bow down and worship.'], correctIndex: 2, explanation: 'וַיִּשְׁתָּחוּ is the Hishtaphel of חָוָה (Ch 35). וַיְמַהֵר is a Piel of מָהַר (Ch 26 vocabulary), used adverbially: "he hurried and…" = "he quickly…"', category: 'verse' },
  { id: 'hw12-s4-q6', type: 'mcq', question: 'Translate this command (Psalm 29:2).', hebrew: 'הִשְׁתַּחֲווּ לַיהוָה בְּהַדְרַת־קֹדֶשׁ', options: ['The LORD is worshiped in holy splendor.', 'They worshiped the LORD in holy splendor.', 'I will worship the LORD in holy splendor.', 'Worship the LORD in the splendor of holiness.'], correctIndex: 3, explanation: 'A Hishtaphel Imperative 2mp of חָוָה (Ch 35). בְּהַדְרַת־קֹדֶשׁ is a construct chain governed by בְּ (Ch 10).', category: 'verse' },
  { id: 'hw12-s4-q7', type: 'mcq', question: 'Translate this clause (Genesis 37:9).', hebrew: 'הַשֶּׁמֶשׁ וְהַיָּרֵחַ מִשְׁתַּחֲוִים לִי', options: ['the sun and the moon were bowing down to me', 'I bowed down to the sun and the moon.', 'Let the sun and the moon bow down to me.', 'The sun and the moon will not bow to me.'], correctIndex: 0, explanation: 'מִשְׁתַּחֲוִים is a Hishtaphel participle mp (Ch 35), used predicatively for ongoing action. Joseph is recounting his second dream.', category: 'verse' },
  { id: 'hw12-s4-q8', type: 'mcq', question: 'Translate this clause (Psalm 34:2).', hebrew: 'בַּיהוָה תִּתְהַלֵּל נַפְשִׁי', options: ['The LORD praises my soul.', 'My soul makes its boast in the LORD.', 'Praise the LORD, O my soul!', 'My soul was praised by the LORD.'], correctIndex: 1, explanation: 'תִּתְהַלֵּל is a Hithpael Imperfect 3fs of הָלַל (Ch 34) — feminine because נֶפֶשׁ is feminine. The prepositional phrase is fronted for emphasis (Ch 23).', category: 'verse' },
];

export const hw12Sections = { 1: sec1, 2: sec2, 3: sec3, 4: sec4 };

export const hw12Meta: ExtendedHomeworkMeta = {
  id: 'hw12',
  title: 'HW12: The Hithpael Stem',
  shortTitle: 'HW12',
  description: 'CourseGuide for BBH (Pratico/Van Pelt) Chapters 34-35 (Sessions 34-35): the reflexive Hithpael stem in strong and weak verbs, including the metathesis and assimilation of its ת prefix — plus new Chapter 34-35 vocabulary and verse-translation practice. The CourseGuide ends at Chapter 35, so this assignment completes the course.',
  topics: ['Ch 34: Hithpael strong verbs', 'Ch 35: Hithpael weak verbs', 'Metathesis and assimilation', 'Ch 34-35 vocabulary', 'Verse translation'],
  totalQuestions: sec1.length + sec2.length + sec3.length + sec4.length,
  sections: [
    { id: 1, title: 'Ch 34 — The Hithpael Stem (Strong)', description: 'Reflexive action, the הִתְ and מִתְ prefixes, metathesis, and assimilation', questionCount: sec1.length },
    { id: 2, title: 'Ch 35 — The Hithpael Stem (Weak)', description: 'What the weak classes do to the Hithpael, and the Hishtaphel of חָוָה', questionCount: sec2.length },
    { id: 3, title: 'Ch 34-35 Vocabulary', description: 'Read and translate the last new "You Should Know" words of the course', questionCount: sec3.length },
    { id: 4, title: 'Verse Translation', description: 'Translate familiar clauses built on Hithpael and Hishtaphel verbs', questionCount: sec4.length },
  ],
  sectionQuestions: hw12Sections,
};
