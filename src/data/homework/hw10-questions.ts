// HW10 — The Hiphil and Hophal Stems (Strong and Weak).
// CourseGuide for BBH (Pratico/Van Pelt) Chapters 26-29 (Sessions 26-29),
// plus the new Chapter 26-29 vocabulary and verse-translation practice.
//
// RELEASED: wired into the active extended-registry and reachable at /homework/hw10.

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

// Section 1 — Chapter 26: the Hiphil stem, strong verbs.
const sec1: MCQQuestion[] = [
  { id: 'hw10-s1-q1', type: 'mcq', question: 'What type of action and voice does the Hiphil express?', options: ['causative action with an active voice', 'simple action with a passive voice', 'intensive action with a passive voice', 'reflexive action'], correctIndex: 0, explanation: 'CourseGuide Ch 26. "Cause" and "make" turn a Qal into a Hiphil: מָלַךְ ("he reigned") becomes הִמְלִיךְ ("he made someone king"). Idiomatic English is usually preferable to a wooden "cause to."', category: 'hiphil-strong' },
  { id: 'hw10-s1-q2', type: 'mcq', question: 'Besides causative action, the Hiphil may also express:', options: ['reciprocal action only', 'declarative and factitive action, and sometimes the simple action of the Qal', 'passive action only', 'reflexive action only'], correctIndex: 1, explanation: 'CourseGuide Ch 26. A few Hiphils are denominative or permissive, and some cannot be categorized at all — check the lexicon when the causative sense will not fit.', category: 'hiphil-strong' },
  { id: 'hw10-s1-q3', type: 'mcq', question: 'In which conjugations does the Hiphil ה prefix NOT appear?', options: ['the Perfect and Imperative', 'the two infinitives', 'the Imperfect and the Participle', 'it appears in all conjugations'], correctIndex: 2, explanation: 'CourseGuide Ch 26. יַקְטִיל has the ordinary preformative and מַקְטִיל the participial מ; everywhere else the ה is visible.', category: 'hiphil-strong' },
  { id: 'hw10-s1-q4', type: 'mcq', question: 'Which vowel stands under Hiphil preformatives and prefixes?', options: ['Qamets under all forms', 'Shewa under all forms', 'Qibbuts under all forms', 'Pathach under non-Perfect forms'], correctIndex: 3, explanation: 'CourseGuide Ch 26. הִקְטִיל takes Hireq; יַקְטִיל, הַקְטֵל and מַקְטִיל all take Pathach.', category: 'hiphil-strong' },
  { id: 'hw10-s1-q5', type: 'mcq', question: 'What is the characteristic Hiphil STEM vowel?', options: ['Hireq Yod or Tsere', 'Qamets throughout', 'Shureq throughout', 'Qibbuts throughout'], correctIndex: 0, explanation: 'CourseGuide Ch 26. הִקְטִיל, יַקְטִיל and מַקְטִיל show the Hireq Yod; הַקְטֵל shows the Tsere; הִקְטַלְתָּ shows the Pathach.', category: 'hiphil-strong' },
  { id: 'hw10-s1-q6', type: 'mcq', question: 'Which form is the Hiphil Perfect 3ms of √q-t-l?', options: ['נִקְטַל', 'הִקְטִיל', 'הָקְטַל', 'קִטֵּל'], correctIndex: 1, explanation: 'CourseGuide Ch 26. Hireq under the ה prefix plus a Hireq Yod stem vowel.', category: 'hiphil-strong' },
  { id: 'hw10-s1-q7', type: 'mcq', question: 'Parse: מַקְטִיל', hebrew: 'מַקְטִיל', options: ['Hophal Participle', 'Piel Participle', 'Hiphil Participle ms', 'Niphal Participle'], correctIndex: 2, explanation: 'CourseGuide Ch 26. Every derived-stem participle takes a מ prefix; the Pathach plus Hireq Yod identifies this one as Hiphil.', category: 'hiphil-strong' },
  { id: 'hw10-s1-q8', type: 'mcq', question: 'Translate: הִמְלִיךְ', hebrew: 'הִמְלִיךְ', options: ['he reigned', 'he was made king', 'let him reign', 'he made someone king'], correctIndex: 3, explanation: 'CourseGuide Ch 26. The Qal מָלַךְ means "he reigned"; the Hiphil adds the causative layer. Its passive is the Hophal הָמְלַךְ.', category: 'hiphil-strong' },
];

// Section 2 — Chapter 27: the Hiphil stem, weak verbs.
const sec2: MCQQuestion[] = [
  { id: 'hw10-s2-q1', type: 'mcq', question: 'How much of the strong-verb Hiphil survives in the weak classes?', options: ['nearly all of it', 'almost nothing', 'only the Perfect', 'only the Participle'], correctIndex: 0, explanation: 'CourseGuide Ch 27. Master the strong diagnostics and most weak Hiphils are already readable.', category: 'hiphil-weak' },
  { id: 'hw10-s2-q2', type: 'mcq', question: 'In I-guttural Hiphil verbs, the first root consonant takes:', options: ['a Daghesh Forte', 'a reduced Hateph vowel', 'a Shureq vowel', 'no vowel at all'], correctIndex: 1, explanation: 'CourseGuide Ch 27. It is not itself diagnostic, but noticing it keeps forms like הֶאֱמִין from looking foreign.', category: 'hiphil-weak' },
  { id: 'hw10-s2-q3', type: 'mcq', question: 'What happens to a I-נ root in the Hiphil?', options: ['the נ is retained everywhere', 'the נ becomes a ה', 'the נ assimilates into the second root consonant as a Daghesh Forte', 'the נ moves to the end'], correctIndex: 2, explanation: 'CourseGuide Ch 27. נָגַד gives הִגִּיד ("he told") — the same assimilation you met in the Qal Imperfect.', category: 'hiphil-weak' },
  { id: 'hw10-s2-q4', type: 'mcq', question: 'How do I-י roots (originally I-ו) look in the Hiphil?', options: ['they lose the first root letter entirely', 'they double the second root letter', 'they gain a ה at the end', 'the י is replaced by a Holem Waw'], correctIndex: 3, explanation: 'CourseGuide Ch 27. The Holem Waw plus a Hireq Yod is one of the most common Hiphil shapes in the Hebrew Bible.', category: 'hiphil-weak' },
  { id: 'hw10-s2-q5', type: 'mcq', question: 'Translate: הֶאֱמִין', hebrew: 'הֶאֱמִין', options: ['he was faithful', 'let him believe', 'he believed, he put his trust in', 'he will believe'], correctIndex: 2, explanation: 'CourseGuide Ch 27. A I-guttural Hiphil of אָמַן. Genesis 15:6 uses it of Abram; the Niphal of the same root gives נֶאֱמָן, "faithful."', category: 'hiphil-weak' },
  { id: 'hw10-s2-q6', type: 'mcq', question: 'Translate: הוֹשִׁיעַ', hebrew: 'הוֹשִׁיעַ', options: ['he saved, delivered, rescued', 'he was saved', 'save!', 'salvation'], correctIndex: 0, explanation: 'CourseGuide Ch 27. A I-י Hiphil of יָשַׁע. Its Niphal, נוֹשַׁע, means "he was saved."', category: 'hiphil-weak' },
  { id: 'hw10-s2-q7', type: 'mcq', question: 'Which root would you look up for הֵקִים?', hebrew: 'הֵקִים', options: ['קָנָה ("to acquire")', 'קוּם ("to arise")', 'קָלַל ("to be small")', 'קָרָא ("to call")'], correctIndex: 1, explanation: 'CourseGuide Ch 27. Biconsonantal Hiphils contract to a Tsere prefix vowel plus the middle vowel letter: "he raised up, established."', category: 'hiphil-weak' },
  { id: 'hw10-s2-q8', type: 'mcq', question: 'In III-ה Hiphil verbs, where does the variation appear?', options: ['in the prefixes only', 'nowhere at all', 'mainly in the stem vowels', 'across the whole paradigm'], correctIndex: 2, explanation: 'CourseGuide Ch 27. The III-ה endings are the same ones that appear on III-ה verbs in the Qal and in every derived stem.', category: 'hiphil-weak' },
];

// Section 3 — Chapter 28: the Hophal stem, strong verbs.
const sec3: MCQQuestion[] = [
  { id: 'hw10-s3-q1', type: 'mcq', question: 'What type of action and voice does the Hophal express?', options: ['causative action with a passive voice', 'causative action with an active voice', 'intensive action with an active voice', 'intensive action with a reflexive voice'], correctIndex: 0, explanation: 'CourseGuide Ch 28. הִמְלִיךְ ("he made someone king") gives הָמְלַךְ ("he was made king").', category: 'hophal-strong' },
  { id: 'hw10-s3-q2', type: 'mcq', question: 'What distinguishes Hophal conjugations from the other derived stems?', options: ['a doubled second root consonant', 'a u-class or o-class prefix vowel', 'a prefixed Nun consonant', 'a Hireq Yod stem vowel'], correctIndex: 1, explanation: 'CourseGuide Ch 28. It is best to think in vowel CLASSES: u-class or o-class under the prefix.', category: 'hophal-strong' },
  { id: 'hw10-s3-q3', type: 'mcq', question: 'Which vowels actually serve as the Hophal prefix vowel?', options: ['only Qibbuts and Qamets Hatuf', 'only Shureq', 'Tsere and Seghol', 'Qibbuts and Shureq (u-class); Qamets Hatuf, Holem, and Holem Waw (o-class)'], correctIndex: 3, explanation: 'CourseGuide Ch 28. Qibbuts and Qamets Hatuf are the most frequent, but the alternatives appear often in weak verbs — which is exactly why the vowel CLASS is the thing to remember.', category: 'hophal-strong' },
  { id: 'hw10-s3-q4', type: 'mcq', question: 'What is the Hophal stem vowel in the Perfect and Imperfect?', options: ['Pathach, except in forms whose sufformative begins with or consists of a vowel', 'Tsere', 'Hireq Yod', 'Shureq'], correctIndex: 0, explanation: 'CourseGuide Ch 28. In the Participle the stem vowel is Qamets instead, except in the feminine singular.', category: 'hophal-strong' },
  { id: 'hw10-s3-q5', type: 'mcq', question: 'Which form is a Hophal Perfect 3ms of √q-t-l?', options: ['הִקְטִיל', 'נִקְטַל', 'הָקְטַל', 'קֻטַּל'], correctIndex: 2, explanation: 'CourseGuide Ch 28. An o-class or u-class prefix vowel plus a Pathach stem vowel. Compare the Hiphil הִקְטִיל.', category: 'hophal-strong' },
  { id: 'hw10-s3-q6', type: 'mcq', question: 'Parse: מָקְטָל', hebrew: 'מָקְטָל', options: ['Hiphil Participle', 'Hophal Participle ms', 'Piel Participle', 'Niphal Participle'], correctIndex: 1, explanation: 'CourseGuide Ch 28. The מ prefix belongs to every derived-stem participle; the o-class prefix vowel plus the Qamets stem vowel make it Hophal.', category: 'hophal-strong' },
  { id: 'hw10-s3-q7', type: 'mcq', question: 'What is the only difference between הִקְטִיל and הָקְטַל?', hebrew: 'הִקְטִיל / הָקְטַל', options: ['the root consonants', 'the person and number', 'the vowels and voice', 'the gender of the subject'], correctIndex: 2, explanation: 'CourseGuide Ch 28. Same consonants, same root, same person. Only the vowels separate "he caused" from "he was caused."', category: 'hophal-strong' },
  { id: 'hw10-s3-q8', type: 'mcq', question: 'Translate: הֻגַּד', hebrew: 'הֻגַּד', options: ['he told', 'tell!', 'he will tell', 'it was told, it was reported'], correctIndex: 3, explanation: 'CourseGuide Ch 28. The passive of the Hiphil הִגִּיד. Genesis 22:20 opens with וַיֻּגַּד לְאַבְרָהָם, "and it was told to Abraham."', category: 'hophal-strong' },
];

// Section 4 — Chapter 29: the Hophal stem, weak verbs.
const sec4: MCQQuestion[] = [
  { id: 'hw10-s4-q1', type: 'mcq', question: 'Five weak classes preserve only TWO root consonants in the Hophal. What must you do?', options: ['reconstruct the missing consonant from the diagnostic that remains', 'assume the root is Biconsonantal', 'ignore the prefix vowel', 'treat the form as a noun'], correctIndex: 0, explanation: 'CourseGuide Ch 29. The same skill you learned for the Qal Imperfect in Chapter 16: read the trace, restore the root, look it up.', category: 'hophal-weak' },
  { id: 'hw10-s4-q2', type: 'mcq', question: 'What happens to a III-ה root in the Hophal?', options: ['the ה doubles', 'the final ה is lost', 'the ה becomes a ת', 'the ה is retained everywhere'], correctIndex: 1, explanation: 'CourseGuide Ch 29. The class behaves here as it does elsewhere — the ה drops and the familiar III-ה endings take over.', category: 'hophal-weak' },
  { id: 'hw10-s4-q3', type: 'mcq', question: 'What happens to a I-נ root in the Hophal?', options: ['the נ is retained', 'the נ becomes a ו', 'the נ assimilates into the second root consonant and remains as a Daghesh Forte', 'the נ moves to the end'], correctIndex: 2, explanation: 'CourseGuide Ch 29. הֻגַּד from נָגַד — the Daghesh Forte in the ג is the evidence that a נ once stood there.', category: 'hophal-weak' },
  { id: 'hw10-s4-q4', type: 'mcq', question: 'What happens to a I-י root (originally I-ו) in the Hophal?', options: ['the י doubles', 'the י becomes a נ', 'nothing changes', 'the vowel letter Shureq replaces the י as the prefix or preformative vowel'], correctIndex: 3, explanation: 'CourseGuide Ch 29. הוּשַׁב, הוּרַד — the Shureq under the prefix is unmistakable once you look for it, in Perfect, Imperfect, and Participle alike.', category: 'hophal-weak' },
  { id: 'hw10-s4-q5', type: 'mcq', question: 'What happens to a Geminate root in the Hophal?', options: ['only one of the repeated consonants survives, sometimes as a Daghesh Forte', 'both are always written out', 'the root gains a fourth letter', 'the root becomes Biconsonantal'], correctIndex: 0, explanation: 'CourseGuide Ch 29. הוּחַל ("it was begun") from חָלַל — Genesis 4:26.', category: 'hophal-weak' },
  { id: 'hw10-s4-q6', type: 'mcq', question: 'What happens to a Biconsonantal root in the Hophal?', options: ['one root consonant is lost', 'both root consonants remain, and the prefix vowel is Shureq throughout', 'the root doubles', 'the prefix vowel becomes Tsere'], correctIndex: 1, explanation: 'CourseGuide Ch 29. הוּקַם from קוּם, הוּבָא from בּוֹא — the Shureq appears in every Perfect, Imperfect, and Participle form.', category: 'hophal-weak' },
  { id: 'hw10-s4-q7', type: 'mcq', question: 'Translate: הוּרַד', hebrew: 'הוּרַד', options: ['he brought down', 'he went down', 'he was brought down', 'bring down!'], correctIndex: 2, explanation: 'CourseGuide Ch 29. A I-י Hophal of יָרַד with the diagnostic Shureq prefix vowel — passive, not the Qal "went down."', category: 'hophal-weak' },
  { id: 'hw10-s4-q8', type: 'mcq', question: 'Which root would you look up for הָגְלָת?', hebrew: 'הָגְלָת', options: ['גָּדַל ("to be great")', 'הָלַךְ ("to walk")', 'גּוּר ("to sojourn")', 'גָּלָה ("to uncover, reveal, go into exile")'], correctIndex: 3, explanation: 'CourseGuide Ch 29. A III-ה Hophal with the o-class prefix vowel and the lost final ה: "she was carried into exile" (Jer 13:19).', category: 'hophal-weak' },
];

// Section 5 — Chapter 26-29 vocabulary ("You Should Know" lists).
const sec5: PairedMCQQuestion[] = [
  vocab('hw10-s5-q1', 'בָּקַשׁ', 'baqash', ['bachar', 'batach', 'bin'], 0, 'to seek, search for, require', ['to choose', 'to trust', 'to understand'], 1, 'Ch 26 vocab. Occurs almost entirely in the Piel: בַּקְּשׁוּ פָנָי, "seek my face" (Ps 27:8).'),
  vocab('hw10-s5-q2', 'מָהַר', 'mahar', ['maas', 'makhar', 'mashal'], 1, 'to hasten, hurry, go quickly', ['to reject', 'to sell', 'to rule'], 2, 'Ch 26 vocab. Its participle is often used adverbially: "quickly."'),
  vocab('hw10-s5-q3', 'צָוָה', 'tsavah', ['tsar', 'tsur', 'tsarah'], 2, 'to command, give an order, charge', ['adversary', 'rock', 'distress'], 0, 'Ch 26 vocab. The root behind מִצְוָה ("commandment").'),
  vocab('hw10-s5-q4', 'גּוּר', 'gur', ['gadal', 'galah', 'goral'], 3, 'to sojourn, dwell as a foreigner', ['to be great', 'to reveal', 'lot, portion'], 2, 'Ch 27 vocab. The root behind גֵּר ("sojourner"), Chapter 29 vocabulary.'),
  vocab('hw10-s5-q5', 'יָעַץ', 'yaats', ['yatar', 'yatav', 'yasha'], 0, 'to advise, counsel, plan, decide', ['to be left over', 'to go well with', 'to save'], 1, 'Ch 27 vocab. The root behind עֵצָה ("counsel") and the title יוֹעֵץ ("counselor," Isa 9:6).'),
  vocab('hw10-s5-q6', 'אָסַר', 'asar', ['asaf', 'arar', 'avad'], 1, 'to tie, bind, fetter, imprison', ['to gather', 'to curse', 'to perish'], 3, 'Ch 28 vocab. Used of binding prisoners and of harnessing a chariot.'),
  vocab('hw10-s5-q7', 'זָעַק', 'zaaq', ['zavach', 'zakhar', 'zera'], 2, 'to cry out, call for help', ['to sacrifice', 'to remember', 'seed'], 0, 'Ch 28 vocab. The cry of the oppressed that God hears in Exodus 2:23.'),
  vocab('hw10-s5-q8', 'עָרַךְ', 'arakh', ['azar', 'azav', 'avar'], 3, 'to set in order, arrange, draw up in rows', ['to help', 'to forsake', 'to pass over'], 2, 'Ch 28 vocab. Used of laying wood on the altar and of drawing up a battle line.'),
  vocab('hw10-s5-q9', 'חֵלֶב', 'chelev', ['chamor', 'chatser', 'choshekh'], 0, 'fat; (figuratively) the best or choice part', ['donkey', 'courtyard', 'darkness'], 1, 'Ch 29 vocab. The fat of a sacrifice belonged to the LORD.'),
  vocab('hw10-s5-q10', 'עֹז', 'oz', ['or', 'of', 'ets'], 1, 'strength, power, might', ['light', 'birds', 'tree'], 3, 'Ch 29 vocab. "God is our refuge and strength (עֹז)" (Ps 46:1).'),
];

// Section 6 — Verse translation: Hiphil and Hophal verbs in familiar clauses.
const sec6: MCQQuestion[] = [
  { id: 'hw10-s6-q1', type: 'mcq', question: 'Translate this clause (Exodus 20:2).', hebrew: 'אֲשֶׁר הוֹצֵאתִיךָ מֵאֶרֶץ מִצְרַיִם', options: ['who brought you out of the land of Egypt', 'who went out from the land of Egypt', 'whom you brought out of Egypt', 'so that you may go out from Egypt'], correctIndex: 0, explanation: 'הוֹצֵאתִי is a I-י Hiphil Perfect 1cs of יָצָא (Ch 27), with its diagnostic Holem Waw, carrying the 2ms object suffix (Ch 19).', category: 'verse' },
  { id: 'hw10-s6-q2', type: 'mcq', question: 'Translate this clause (Psalm 40:2).', hebrew: 'וַיַּעֲלֵנִי מִבּוֹר שָׁאוֹן', options: ['I went up out of the pit of destruction.', 'He drew me up from the pit of destruction.', 'Bring me up from the pit of destruction!', 'The pit of destruction was raised up.'], correctIndex: 1, explanation: 'A I-guttural Hiphil of עָלָה (Ch 27) with the Waw Consecutive and a 1cs suffix. The Qal means "he went up"; the Hiphil "he brought up."', category: 'verse' },
  { id: 'hw10-s6-q3', type: 'mcq', question: 'Translate this clause (Psalm 23:3).', hebrew: 'יַנְחֵנִי בְמַעְגְּלֵי־צֶדֶק', options: ['I will rest in paths of righteousness.', 'Lead me in paths of righteousness!', 'He leads me in paths of righteousness.', 'He rested me beside the still waters.'], correctIndex: 2, explanation: 'יַנְחֵנִי is a Hiphil Imperfect of נָחָה (Ch 21 vocabulary) with a 1cs suffix — the Pathach preformative marks the Hiphil.', category: 'verse' },
  { id: 'hw10-s6-q4', type: 'mcq', question: 'Translate this clause (Psalm 18:28).', hebrew: 'כִּי־אַתָּה תָּאִיר נֵרִי', options: ['My lamp shines before you.', 'You are the light of my lamp.', 'Light my lamp, O LORD!', 'For it is you who light my lamp.'], correctIndex: 3, explanation: 'תָּאִיר is a Hiphil Imperfect of אוֹר (Ch 34 vocabulary) — "cause to shine." The independent pronoun אַתָּה is fronted for emphasis (Ch 23).', category: 'verse' },
  { id: 'hw10-s6-q5', type: 'mcq', question: 'Translate this clause (Isaiah 40:26).', hebrew: 'הַמּוֹצִיא בְמִסְפָּר צְבָאָם', options: ['who brings out their host by number', 'their host went out and was numbered', 'Bring out their host by number!', 'their number came out as a host'], correctIndex: 0, explanation: 'הַמּוֹצִיא is a I-י Hiphil participle of יָצָא with the article (Ch 27) — a substantive participle, "the one who brings out."', category: 'verse' },
  { id: 'hw10-s6-q6', type: 'mcq', question: 'Translate this clause (Deuteronomy 32:39).', hebrew: 'אֲנִי אָמִית וַאֲחַיֶּה', options: ['I died and I lived again.', 'I kill and I make alive.', 'Let me die and live again.', 'They killed me and revived me.'], correctIndex: 1, explanation: 'אָמִית is a Biconsonantal Hiphil of מוּת (Ch 27) — "cause to die." אֲחַיֶּה is a Piel of חָיָה, previewed here (Ch 30).', category: 'verse' },
  { id: 'hw10-s6-q7', type: 'mcq', question: 'Translate this prayer (2 Kings 19:19).', hebrew: 'וְהוֹשִׁיעֵנוּ נָא מִיָּדוֹ', options: ['He saved us from his hand.', 'We will be saved from his hand.', 'Now save us, please, from his hand.', 'His hand could not save us.'], correctIndex: 2, explanation: 'הוֹשִׁיעֵנוּ is a I-י Hiphil Imperative of יָשַׁע (Ch 27) with the 1cp suffix (Ch 19), softened by נָא (Ch 18).', category: 'verse' },
  { id: 'hw10-s6-q8', type: 'mcq', question: 'Translate this clause (Deuteronomy 4:35).', hebrew: 'אַתָּה הָרְאֵתָ לָדַעַת', options: ['You saw it and knew.', 'You will be shown and will know.', 'Show us, that we may know.', 'To you it was shown, that you might know.'], correctIndex: 3, explanation: 'הָרְאֵתָ is a Hophal Perfect 2ms of רָאָה (Ch 28) — the o-class prefix vowel marks the passive. לָדַעַת is an Infinitive Construct with לְ (Ch 20).', category: 'verse' },
];

export const hw10Sections = { 1: sec1, 2: sec2, 3: sec3, 4: sec4, 5: sec5, 6: sec6 };

export const hw10Meta: ExtendedHomeworkMeta = {
  id: 'hw10',
  title: 'HW10: The Hiphil and Hophal Stems',
  shortTitle: 'HW10',
  description: 'CourseGuide for BBH (Pratico/Van Pelt) Chapters 26-29 (Sessions 26-29): the causative Hiphil stem in strong and weak verbs, and its passive counterpart the Hophal — plus new Chapter 26-29 vocabulary and verse-translation practice.',
  topics: ['Ch 26: Hiphil strong verbs', 'Ch 27: Hiphil weak verbs', 'Ch 28: Hophal strong verbs', 'Ch 29: Hophal weak verbs', 'Ch 26-29 vocabulary', 'Verse translation'],
  totalQuestions: sec1.length + sec2.length + sec3.length + sec4.length + sec5.length + sec6.length,
  sections: [
    { id: 1, title: 'Ch 26 — The Hiphil Stem (Strong)', description: 'Causative action, and the ה prefix, Pathach, and Hireq Yod that mark it', questionCount: sec1.length },
    { id: 2, title: 'Ch 27 — The Hiphil Stem (Weak)', description: 'How each weak class reshapes the Hiphil — and what stays put', questionCount: sec2.length },
    { id: 3, title: 'Ch 28 — The Hophal Stem (Strong)', description: 'The passive of the Hiphil, marked by a u-class or o-class prefix vowel', questionCount: sec3.length },
    { id: 4, title: 'Ch 29 — The Hophal Stem (Weak)', description: 'Five weak classes that leave only two root consonants standing', questionCount: sec4.length },
    { id: 5, title: 'Ch 26-29 Vocabulary', description: 'Read and translate the new "You Should Know" words', questionCount: sec5.length },
    { id: 6, title: 'Verse Translation', description: 'Translate familiar clauses built on Hiphil and Hophal verbs', questionCount: sec6.length },
  ],
  sectionQuestions: hw10Sections,
};
