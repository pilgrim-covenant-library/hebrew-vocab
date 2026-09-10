// HW7 — The Waw Consecutive, the Qal Imperative, and Pronominal Suffixes on Verbs.
// CourseGuide for BBH (Pratico/Van Pelt) Chapters 17-19 (Sessions 17-19),
// plus the new Chapter 17-19 vocabulary and verse-translation practice.
//
// Released: wired into the active extended-registry alongside Class Practice 7.

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

// Section 1 — Chapter 17: the Waw Consecutive.
const sec1: MCQQuestion[] = [
  { id: 'hw7-s1-q1', type: 'mcq', question: 'An IMPERFECT verb prefixed with the Waw Consecutive is translated with the values of:', options: ['a Perfect verb', 'an unchanged Imperfect', 'an Imperative', 'a participle'], correctIndex: 0, explanation: 'CourseGuide Ch 17. The consecutive Imperfect takes Perfect values: "he killed" or "he has killed." This is the standard past-tense narrative form of the Hebrew Bible.', category: 'waw-consecutive' },
  { id: 'hw7-s1-q2', type: 'mcq', question: 'A PERFECT verb prefixed with the Waw Consecutive is translated with the values of:', options: ['a participle', 'an Imperfect', 'an unchanged Perfect', 'an infinitive'], correctIndex: 1, explanation: 'CourseGuide Ch 17. The consecutive Perfect drives FUTURE narrative sequence: וְשָׁמַרְתָּ = "and you shall keep." The two consecutive forms swap time frames in opposite directions.', category: 'waw-consecutive' },
  { id: 'hw7-s1-q3', type: 'mcq', question: 'What is the spelling diagnostic of the Waw Consecutive on an Imperfect verb?', options: ['a waw with Qamets', 'a waw with Shewa and no doubling', 'a waw with Pathach plus a Daghesh Forte in the preformative', 'a waw with Holem'], correctIndex: 2, explanation: 'CourseGuide Ch 17. וַיִּקְטֹל — waw + Pathach + Daghesh Forte doubling the preformative. The plain conjunction is וְ (waw + Shewa), so the pointing alone tells you which one you are reading.', category: 'waw-consecutive' },
  { id: 'hw7-s1-q4', type: 'mcq', question: 'Does prefixing the Waw Consecutive change the spelling of the Imperfect verb itself?', options: ['yes, it removes the preformative', 'yes, it adds a sufformative', 'yes, it doubles the last root letter', 'no, most verb classes keep their spelling'], correctIndex: 3, explanation: 'CourseGuide Ch 17. Only the waw is added. That is exactly why the form is easy to misread: it looks like a familiar Imperfect, but its time value has flipped to past.', category: 'waw-consecutive' },
  { id: 'hw7-s1-q5', type: 'mcq', question: 'Translate: וַיֹּאמֶר', hebrew: 'וַיֹּאמֶר', options: ['and he said', 'and he will say', 'let him say', 'saying'], correctIndex: 0, explanation: 'CourseGuide Ch 17. The consecutive Imperfect of אָמַר — the single most frequent narrative verb form in the Hebrew Bible.', category: 'waw-consecutive' },
  { id: 'hw7-s1-q6', type: 'mcq', question: 'Translate: וְשָׁמַרְתָּ', hebrew: 'וְשָׁמַרְתָּ', options: ['and you kept', 'and you shall keep', 'keep!', 'and he kept you'], correctIndex: 1, explanation: 'CourseGuide Ch 17. A Perfect 2ms with the Waw Consecutive, so it carries Imperfect values: "and you shall keep." In 2ms and 1cs forms the accent usually moves to the final syllable.', category: 'waw-consecutive' },
  { id: 'hw7-s1-q7', type: 'mcq', question: 'What is the difference between וַיְהִי and וְהָיָה?', hebrew: 'וַיְהִי / וְהָיָה', options: ['they are spelling variants of one form', 'the first is singular, the second plural', 'the first introduces PAST narrative, the second FUTURE narrative', 'the first is a question, the second a statement'], correctIndex: 2, explanation: 'CourseGuide Ch 17. וַיְהִי is a consecutive Imperfect ("and it came to pass"); וְהָיָה is a consecutive Perfect ("and it shall come to pass"). Same root, opposite time frames.', category: 'waw-consecutive' },
  { id: 'hw7-s1-q8', type: 'mcq', question: 'Parse: וְזָכַר', hebrew: 'וְזָכַר', options: ['Qal Imperfect 3ms of זכר with Waw Consecutive', 'Qal Imperative 2ms of זכר', 'Qal Perfect 3mp of זכר with Waw Consecutive', 'Qal Perfect 3ms of זכר with conjunction'], correctIndex: 3, explanation: 'CourseGuide Ch 17. In the 3ms the consecutive Perfect and the plain conjunction look identical. Only in the 2ms and 1cs does the accent shift give the Waw Consecutive away — elsewhere, context decides.', category: 'waw-consecutive' },
  { id: 'hw7-s1-q9', type: 'mcq', question: 'Translate: וַתֹּאמֶר', hebrew: 'וַתֹּאמֶר', options: ['and she said', 'and they said', 'and I said', 'and we said'], correctIndex: 0, explanation: 'CourseGuide Ch 17. The ת preformative is ambiguous between 3fs and 2ms, exactly as in the plain Imperfect. Context resolves it.', category: 'waw-consecutive' },
  { id: 'hw7-s1-q10', type: 'mcq', question: 'Translate: וַיֵּלֶךְ הָאִישׁ', hebrew: 'וַיֵּלֶךְ הָאִישׁ', options: ['The man will go', 'And the man went', 'Let the man go', 'The man is going'], correctIndex: 1, explanation: 'CourseGuide Ch 17. וַיֵּלֶךְ is the consecutive Imperfect of הָלַךְ, which inflects like a I-י verb (Tsere preformative). Word order is Verb–Subject.', category: 'waw-consecutive' },
];

// Section 2 — Chapter 18: the Qal Imperative.
const sec2: MCQQuestion[] = [
  { id: 'hw7-s2-q1', type: 'mcq', question: 'The Hebrew Imperative occurs in which person?', options: ['the second person only', 'the first and second person', 'all three persons', 'the third person only'], correctIndex: 0, explanation: 'CourseGuide Ch 18. Only four forms exist: 2ms, 2fs, 2mp, 2fp. First-person volition uses the Cohortative and third-person volition the Jussive.', category: 'imperative' },
  { id: 'hw7-s2-q2', type: 'mcq', question: 'How is the Qal Imperative related to the Imperfect?', options: ['it adds ־ָה to the Imperfect', 'it is the second-person Imperfect with the preformative removed', 'it doubles the middle root letter', 'it prefixes ה to the Imperfect'], correctIndex: 1, explanation: 'CourseGuide Ch 18. תִּקְטֹל minus its ת gives קְטֹל. The relationship holds across all four second-person forms, with minor spelling changes in some weak classes.', category: 'imperative' },
  { id: 'hw7-s2-q3', type: 'mcq', question: 'Which is the correct Qal Imperative paradigm (2ms, 2fs, 2mp, 2fp)?', options: ['קָטַל, קָטְלָה, קָטְלוּ, קְטַלְתֶּן', 'יִקְטֹל, תִּקְטְלִי, תִּקְטְלוּ, תִּקְטֹלְנָה', 'קְטֹל, קִטְלִי, קִטְלוּ, קְטֹלְנָה', 'קֹטֵל, קֹטְלָה, קֹטְלִים, קֹטְלוֹת'], correctIndex: 2, explanation: 'CourseGuide Ch 18. קְטֹל / קִטְלִי / קִטְלוּ / קְטֹלְנָה. Note the Hireq under the first consonant in the two forms that take vowel endings.', category: 'imperative' },
  { id: 'hw7-s2-q4', type: 'mcq', question: 'How does Hebrew form a NEGATIVE command?', options: ['it negates the Imperative with לֹא', 'it adds a negative ending to the Imperative', 'it uses אֵין plus the Imperative', 'it uses לֹא or אַל with a second-person Imperfect'], correctIndex: 3, explanation: 'CourseGuide Ch 18. Prohibitions never negate the Imperative. לֹא + Imperfect is the permanent prohibition ("you shall not"); אַל + Imperfect is the immediate one ("do not!").', category: 'imperative' },
  { id: 'hw7-s2-q5', type: 'mcq', question: 'What does the particle נָא contribute?', hebrew: 'נָא', options: ['it softens the command to "please," and is often left untranslated', 'it negates the command', 'it makes the command plural', 'it turns the command into a question'], correctIndex: 0, explanation: 'CourseGuide Ch 18. נָא follows the Imperative and is frequently joined to it with Maqqef: קַח־נָא, "take, please."', category: 'imperative' },
  { id: 'hw7-s2-q6', type: 'mcq', question: 'Translate: שְׁמֹר', hebrew: 'שְׁמֹר', options: ['he kept', 'keep!', 'keeping', 'to keep'], correctIndex: 1, explanation: 'CourseGuide Ch 18. The Qal Imperative 2ms of שָׁמַר, formed from the Imperfect תִּשְׁמֹר by removing the preformative.', category: 'imperative' },
  { id: 'hw7-s2-q7', type: 'mcq', question: 'What diagnostic ending marks a III-ה verb in the Imperative 2ms?', options: ['Seghol-He (ֶה)', 'a final ת', 'Tsere-He (ֵה)', 'Qamets-He (ָה)'], correctIndex: 2, explanation: 'CourseGuide Ch 18. III-ה Imperatives end in Tsere-He: בְּנֵה ("build!"), עֲשֵׂה ("do!"). Compare the Imperfect of the same class, which ends in Seghol-He (יִבְנֶה).', category: 'imperative' },
  { id: 'hw7-s2-q8', type: 'mcq', question: 'Identify the 2ms Imperative of נָפַל.', hebrew: 'נָפַל', options: ['תִּפֹּל', 'נִפְלִי', 'נֹפֵל', 'נְפֹל'], correctIndex: 3, explanation: 'CourseGuide Ch 18. A I-נ verb assimilates its נ in the Imperfect (יִפֹּל) but keeps it in the Imperative: נְפֹל. Recognizing the retained Nun is the key to the class.', category: 'imperative' },
  { id: 'hw7-s2-q9', type: 'mcq', question: 'Translate: אַל־תִּירָא', hebrew: 'אַל־תִּירָא', options: ['Do not fear!', 'You shall never fear.', 'He did not fear.', 'Will you not fear?'], correctIndex: 0, explanation: 'CourseGuide Ch 18. אַל + the second-person Imperfect gives an immediate prohibition. Contrast the absolute prohibition לֹא תִּירָא, "you shall never fear."', category: 'imperative' },
  { id: 'hw7-s2-q10', type: 'mcq', question: 'An Imperative followed by an Imperfect with the conjunction ְו creates:', options: ['a question', 'a purpose or result clause', 'a verbless clause', 'a construct chain'], correctIndex: 1, explanation: 'CourseGuide Ch 18. Three sequences matter: successive Imperatives (consequence), Imperative + consecutive Perfect (continuing imperatival force), and Imperative + Imperfect with וְ (purpose or result).', category: 'imperative' },
];

// Section 3 — Chapter 19: pronominal suffixes on verbs.
const sec3: MCQQuestion[] = [
  { id: 'hw7-s3-q1', type: 'mcq', question: 'When a pronoun is the direct object of a verb, it may attach:', options: ['only to a preposition', 'either to the object marker אֵת or directly to the verb', 'only to the object marker אֵת', 'only to the subject of the clause'], correctIndex: 1, explanation: 'CourseGuide Ch 19. Both routes are available: אֹתוֹ stands as a separate word, or the same suffix rides on the verb itself.', category: 'verb-suffixes' },
  { id: 'hw7-s3-q2', type: 'mcq', question: 'Which suffixes do Perfect, Imperfect, and Imperative verbs generally take?', options: ['Type 2 suffixes with a possessive value', 'the article', 'Type 1 suffixes with an OBJECTIVE value', 'the directional ending ־ָה'], correctIndex: 2, explanation: 'CourseGuide Ch 19. On a noun a Type 1 suffix is possessive ("my word"); on a verb the very same suffix is objective ("he kept me").', category: 'verb-suffixes' },
  { id: 'hw7-s3-q3', type: 'mcq', question: 'The Nun-suffixes (־ֶנּוּ, ־ֶנָּה, ־ֶךָּ) belong mainly to which conjugation?', options: ['the Perfect', 'the participle', 'the infinitive absolute', 'the Imperfect'], correctIndex: 3, explanation: 'CourseGuide Ch 19. Three additional Imperfect suffixes must be memorized. They carry a Daghesh Forte in the Nun and are common in poetry: יִשְׁמְרֶנּוּ, "he will keep him."', category: 'verb-suffixes' },
  { id: 'hw7-s3-q4', type: 'mcq', question: 'Which connecting vowels does each conjugation prefer before a suffix?', options: ['the Perfect prefers a-class; the Imperfect and Imperative prefer e-class', 'all conjugations prefer Shewa', 'the Perfect prefers e-class; the Imperfect prefers a-class', 'connecting vowels never appear'], correctIndex: 0, explanation: 'CourseGuide Ch 19. Verbs ending in a consonant usually insert a connecting vowel: Pathach or Qamets after the Perfect, Seghol or Tsere after the Imperfect and Imperative.', category: 'verb-suffixes' },
  { id: 'hw7-s3-q5', type: 'mcq', question: 'Translate: קְטָלוּהָ', hebrew: 'קְטָלוּהָ', options: ['they killed him', 'they killed her', 'she was killed', 'they killed'], correctIndex: 1, explanation: 'CourseGuide Ch 19. קָטְלוּ is the Perfect 3cp ("they killed"); the ־הָ suffix supplies the object: "they killed her."', category: 'verb-suffixes' },
  { id: 'hw7-s3-q6', type: 'mcq', question: 'How would you write "they killed me"?', options: ['קְטָלוּהוּ', 'קְטַלְתִּיו', 'קְטָלוּנִי', 'קְטָלוּהָ'], correctIndex: 2, explanation: 'CourseGuide Ch 19. The Perfect 3cp plus the 1cs object suffix ־נִי. Note how the stem vowels shift once the accent moves toward the suffix.', category: 'verb-suffixes' },
  { id: 'hw7-s3-q7', type: 'mcq', question: 'Translate: שָׁפְטֵנִי', hebrew: 'שָׁפְטֵנִי', options: ['he judged me', 'he will judge me', 'my judgment', 'Judge me!'], correctIndex: 3, explanation: 'CourseGuide Ch 19. The Imperative 2ms שְׁפֹט becomes שָׁפְט־ before a suffix, and the Tsere connecting vowel carries ־נִי: "Judge me!"', category: 'verb-suffixes' },
  { id: 'hw7-s3-q8', type: 'mcq', question: 'What happens to the Holem stem vowel of יִקְטֹל when a pronominal suffix is added?', hebrew: 'יִקְטֹל', options: ['it reduces to a vocal Shewa', 'it lengthens to Qamets', 'it becomes Shureq', 'it stays unchanged'], correctIndex: 0, explanation: 'CourseGuide Ch 19. The accent moves toward the suffix, so the stem vowel reduces: יִקְטְלֵנִי, "he will kill me." Expect reduction whenever a suffix pulls the accent forward.', category: 'verb-suffixes' },
  { id: 'hw7-s3-q9', type: 'mcq', question: 'Parse: וַיִּתְּנֵם', hebrew: 'וַיִּתְּנֵם', options: ['Qal Perfect 3ms of נתן + Waw Consecutive + 3mp suffix', 'Qal Imperfect 3ms of נתן + Waw Consecutive + 3mp suffix', 'Qal Imperfect 3ms of נתן + Waw Consecutive + 3fp suffix', 'Qal Perfect 3ms of נתן + conjunction + 3fp suffix'], correctIndex: 1, explanation: 'CourseGuide Ch 19. Three layers: the Waw Consecutive (Ch 17), the Imperfect of נָתַן with its assimilated נ (Ch 16), and the 3mp object suffix ־ם. "And he gave them."', category: 'verb-suffixes' },
  { id: 'hw7-s3-q10', type: 'mcq', question: 'Translate: שְׁלָחֵנִי', hebrew: 'שְׁלָחֵנִי', options: ['he sent me', 'I will send him', 'Send me!', 'my messenger'], correctIndex: 2, explanation: 'CourseGuide Ch 19. The Imperative שְׁלַח with the 1cs suffix ־נִי — Isaiah\'s answer to the LORD in Isaiah 6:8.', category: 'verb-suffixes' },
];

// Section 4 — Chapter 17-19 vocabulary ("You Should Know" lists).
const sec4: PairedMCQQuestion[] = [
  vocab('hw7-s4-q1', 'אָבַד', 'avad', ['asaf', 'ahav', 'amar'], 0, 'to perish, vanish, be lost', ['to gather', 'to love', 'to say'], 1, 'Ch 17 vocab. Spelled with Aleph — do not confuse it with עָבַד ("to serve"), which begins with Ayin.'),
  vocab('hw7-s4-q2', 'טָהֵר', 'taher', ['tamé', 'tavach', 'taam'], 2, 'to be clean, pure', ['to be unclean', 'to slaughter', 'to taste'], 0, 'Ch 17 vocab. Its opposite, טָמֵא ("to be unclean"), is Chapter 20 vocabulary.'),
  vocab('hw7-s4-q3', 'רוּם', 'rum', ['radaf', 'rachats', 'rakhav'], 1, 'to be high, exalted, rise up', ['to pursue', 'to wash', 'to ride'], 3, 'Ch 17 vocab. A Biconsonantal verb; in the Hiphil it means "to lift up, exalt."'),
  vocab('hw7-s4-q4', 'אֹהֶל', 'ohel', ['emet', 'even', 'adamah'], 3, 'tent', ['truth', 'stone', 'ground'], 2, 'Ch 17 vocab. אֹהֶל מוֹעֵד is "the tent of meeting."'),
  vocab('hw7-s4-q5', 'בִּין', 'bin', ['bachar', 'batach', 'bakhah'], 0, 'to understand, perceive, give heed to', ['to choose', 'to trust', 'to weep'], 1, 'Ch 18 vocab. A Biconsonantal verb; the root behind בִּינָה ("understanding").'),
  vocab('hw7-s4-q6', 'חָפֵץ', 'chafets', ['chanan', 'chashav', 'charah'], 2, 'to delight in, take pleasure in', ['to be gracious', 'to think', 'to burn with anger'], 0, 'Ch 18 vocab. Used of what God delights in — obedience rather than sacrifice (1 Sam 15:22).'),
  vocab('hw7-s4-q7', 'רָעָה', 'raah', ['radaf', 'rachats', 'rum'], 1, 'to pasture, tend, shepherd', ['to pursue', 'to wash', 'to be exalted'], 3, 'Ch 18 vocab. Its participle רֹעֶה means "shepherd" — יְהוָה רֹעִי, "the LORD is my shepherd."'),
  vocab('hw7-s4-q8', 'בַּעַל', 'baal', ['bayit', 'ben', 'berit'], 3, 'owner, master, husband; (as a title) Baal', ['house', 'son', 'covenant'], 0, 'Ch 18 vocab. The ordinary word for "owner" is also the name of the Canaanite storm god.'),
  vocab('hw7-s4-q9', 'שָׂרַף', 'saraf', ['shafat', 'shaal', 'shamar'], 0, 'to burn completely, destroy', ['to judge', 'to ask', 'to keep'], 1, 'Ch 19 vocab. The root behind שְׂרָפִים, the burning ones of Isaiah 6.'),
  vocab('hw7-s4-q10', 'שָׁלֵם', 'shalem', ['shalach', 'shakhach', 'shakhan'], 2, 'to be complete, finished, whole', ['to send', 'to forget', 'to dwell'], 0, 'Ch 19 vocab. Shares its root with שָׁלוֹם ("peace, wholeness").'),
  vocab('hw7-s4-q11', 'חוּץ', 'chuts', ['chomah', 'chatser', 'choshekh'], 1, 'outside, street', ['wall', 'courtyard', 'darkness'], 3, 'Ch 19 vocab. With the directional ending, הַחוּצָה means "outward, outside."'),
  vocab('hw7-s4-q12', 'מְלָאכָה', 'melakhah', ['mishpat', 'milchamah', 'mitsvah'], 3, 'work, occupation, service', ['judgment', 'war', 'commandment'], 2, 'Ch 19 vocab. "On the seventh day God finished his work (מְלַאכְתּוֹ)" (Gen 2:2).'),
];

// Section 5 — Verse translation: consecutive narrative, commands, and verbs
// carrying their object as a suffix, within Chapters 1-19.
const sec5: MCQQuestion[] = [
  { id: 'hw7-s5-q1', type: 'mcq', question: 'Translate this clause (Genesis 39:2).', hebrew: 'וַיְהִי יְהוָה אֶת־יוֹסֵף', options: ['The LORD was with Joseph.', 'The LORD will be with Joseph.', 'Joseph called on the LORD.', 'Let the LORD be with Joseph.'], correctIndex: 0, explanation: 'וַיְהִי is the consecutive Imperfect of הָיָה (Ch 17), so it reads as a past. Here אֶת־ is the preposition "with," not the object marker.', category: 'verse' },
  { id: 'hw7-s5-q2', type: 'mcq', question: 'Translate this clause (Exodus 3:4).', hebrew: 'וַיִּקְרָא אֵלָיו אֱלֹהִים מִתּוֹךְ הַסְּנֶה', options: ['God will call to him from the bush.', 'And God called to him out of the midst of the bush.', 'He called to God from the burning bush.', 'God has spoken from the midst of the fire.'], correctIndex: 1, explanation: 'וַיִּקְרָא is a consecutive Imperfect (Ch 17): "and he called." מִתּוֹךְ = "from the midst of" and הַסְּנֶה = "the bush."', category: 'verse' },
  { id: 'hw7-s5-q3', type: 'mcq', question: 'Translate this verse (Deuteronomy 6:4).', hebrew: 'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד', options: ['Israel has heard: the LORD our God is one.', 'The LORD our God is one, and Israel is his people.', 'Hear, O Israel: the LORD our God, the LORD is one.', 'Israel shall hear the voice of the LORD its God.'], correctIndex: 2, explanation: 'שְׁמַע is a Qal Imperative 2ms (Ch 18), with a Pathach stem vowel because of the guttural ע. The rest is a verbless clause (Ch 23).', category: 'verse' },
  { id: 'hw7-s5-q4', type: 'mcq', question: 'Translate this command (Amos 5:14).', hebrew: 'דִּרְשׁוּ־טוֹב וְאַל־רָע', options: ['They sought good and not evil.', 'Good will be sought, and not evil.', 'Who seeks good and not evil?', 'Seek good, and not evil.'], correctIndex: 3, explanation: 'דִּרְשׁוּ is the Qal Imperative 2mp of דָּרַשׁ (Ch 18 vocabulary), and אַל carries the prohibition over to the second half.', category: 'verse' },
  { id: 'hw7-s5-q5', type: 'mcq', question: 'Translate this charge (Deuteronomy 31:6).', hebrew: 'חִזְקוּ וְאִמְצוּ אַל־תִּירְאוּ', options: ['Be strong and courageous; do not fear.', 'They were strong and courageous and did not fear.', 'You will be strong, and you will not be afraid.', 'Strength and courage drive out all fear.'], correctIndex: 0, explanation: 'Two 2mp Imperatives (Ch 18) followed by אַל plus the Imperfect תִּירְאוּ — the immediate prohibition, since an Imperative can never itself be negated.', category: 'verse' },
  { id: 'hw7-s5-q6', type: 'mcq', question: 'Translate this commandment (Exodus 20:12).', hebrew: 'כַּבֵּד אֶת־אָבִיךָ וְאֶת־אִמֶּךָ', options: ['Your father and mother have honored you.', 'Honor your father and your mother.', 'He honored his father and his mother.', 'You shall not dishonor your father or mother.'], correctIndex: 1, explanation: 'כַּבֵּד is an Imperative 2ms — a Piel form, previewed here (Ch 30): "honor!" The two objects are each marked with אֶת and carry 2ms suffixes (Ch 9).', category: 'verse' },
  { id: 'hw7-s5-q7', type: 'mcq', question: 'Translate this petition (Psalm 4:1).', hebrew: 'בְּקָרְאִי עֲנֵנִי אֱלֹהֵי צִדְקִי', options: ['I called, and the God of my righteousness answered.', 'The God of my righteousness will answer when I call.', 'Answer me when I call, O God of my righteousness.', 'When shall I call on the God of my righteousness?'], correctIndex: 2, explanation: 'עֲנֵנִי is an Imperative carrying the 1cs object suffix (Ch 19): "answer me!" בְּקָרְאִי is an infinitive construct with a suffix, previewed here (Ch 20): "when I call."', category: 'verse' },
  { id: 'hw7-s5-q8', type: 'mcq', question: 'Translate this call to praise (Psalm 103:1).', hebrew: 'בָּרֲכִי נַפְשִׁי אֶת־יְהוָה', options: ['My soul has blessed the LORD.', 'The LORD blesses my soul.', 'My soul will bless the LORD forever.', 'Bless the LORD, O my soul.'], correctIndex: 3, explanation: 'בָּרֲכִי is a 2fs Imperative (Ch 18) — feminine because נֶפֶשׁ is a feminine noun, addressed here as "O my soul." The verb is a Piel, previewed (Ch 30).', category: 'verse' },
];

export const hw7Sections = { 1: sec1, 2: sec2, 3: sec3, 4: sec4, 5: sec5 };

export const hw7Meta: ExtendedHomeworkMeta = {
  id: 'hw7',
  title: 'HW7: The Waw Consecutive, Imperative, and Verb Suffixes',
  shortTitle: 'HW7',
  description: 'CourseGuide for BBH (Pratico/Van Pelt) Chapters 17-19 (Sessions 17-19): the Waw Consecutive that drives Hebrew narrative, the Qal Imperative, and pronominal suffixes on verbs — plus new Chapter 17-19 vocabulary and verse-translation practice.',
  topics: ['Ch 17: Waw Consecutive', 'Ch 18: Qal Imperative', 'Ch 19: Pronominal suffixes on verbs', 'Ch 17-19 vocabulary', 'Verse translation'],
  totalQuestions: sec1.length + sec2.length + sec3.length + sec4.length + sec5.length,
  sections: [
    { id: 1, title: 'Ch 17 — The Waw Consecutive', description: 'How one prefixed letter flips a verb between past and future narrative', questionCount: sec1.length },
    { id: 2, title: 'Ch 18 — The Qal Imperative', description: 'Direct commands, the four second-person forms, and how prohibitions are formed', questionCount: sec2.length },
    { id: 3, title: 'Ch 19 — Pronominal Suffixes on Verbs', description: 'Reading a verb that carries its own direct object', questionCount: sec3.length },
    { id: 4, title: 'Ch 17-19 Vocabulary', description: 'Read and translate the new "You Should Know" words', questionCount: sec4.length },
    { id: 5, title: 'Verse Translation', description: 'Translate familiar clauses driven by consecutive verbs, commands, and verb suffixes', questionCount: sec5.length },
  ],
  sectionQuestions: hw7Sections,
};
