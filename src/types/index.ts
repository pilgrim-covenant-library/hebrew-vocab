// Semantic Categories for vocabulary organization
export type SemanticCategory =
  | 'name'        // Personal names (אַבְרָהָם, מֹשֶׁה)
  | 'place'       // Geographic locations (יְרוּשָׁלַיִם, בָּבֶל)
  | 'theological' // Theological terms (חֵטְא, יְשׁוּעָה, חֶסֶד)
  | 'body'        // Body parts (יָד, רֶגֶל, עַיִן)
  | 'time'        // Time-related (יוֹם, שָׁנָה, עֵת)
  | 'family'      // Family relations (אָב, אֵם, אָח)
  | 'nature'      // Natural world (יָם, שָׁמַיִם, אֶרֶץ)
  | 'abstract'    // Abstract concepts (אֱמֶת, כָּבוֹד, כֹּחַ)
  | 'emotion'     // Emotional terms (אַהֲבָה, יִרְאָה, שִׂמְחָה)
  | 'religious'   // Religious practice (תְּפִלָּה, קָרְבָּן, מִקְדָּשׁ)
  | 'authority'   // Authority/power (מֶלֶךְ, שַׂר, אָדוֹן)
  | 'action'      // Action verbs (אָמַר, עָשָׂה, בּוֹא)
  | 'speech'      // Speech/communication (דָּבָר, קוֹל, דִּבֶּר)
  | 'general';    // Default/uncategorized

// Part of Speech type
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'particle' | 'pronoun' | 'article' | 'interjection';

// Hebrew-specific types
export type HebrewGender = 'masculine' | 'feminine' | 'common';
export type HebrewNumber = 'singular' | 'plural' | 'dual';
export type HebrewState = 'absolute' | 'construct';

// Hebrew verb stems (binyanim)
export type Binyan = 'qal' | 'niphal' | 'piel' | 'pual' | 'hiphil' | 'hophal' | 'hithpael';

// Hebrew verb conjugations
export type HebrewConjugation = 'perfect' | 'imperfect' | 'imperative' | 'infinitive_construct' | 'infinitive_absolute' | 'participle';

// Hebrew noun patterns
export type NounPattern = 'segolate' | 'qatl' | 'qitl' | 'qutl' | 'qatal' | 'qatil' | 'qatul' | 'qatol' | 'other';

// Vocabulary Types
export interface VocabularyWord {
  id: string;
  hebrew: string;
  transliteration: string;
  gloss: string;
  definition: string;
  partOfSpeech: PartOfSpeech;
  frequency: number;
  tier: 1 | 2 | 3 | 4 | 5;
  strongs: string;
  examples?: string[];
  morphology?: WordMorphology;
  semanticCategory?: SemanticCategory;
  categories?: SemanticCategory[]; // Allow multiple categories
}

// Morphology Types for Hebrew Words
export interface WordMorphology {
  // For nouns
  gender?: HebrewGender;
  number?: HebrewNumber;
  state?: HebrewState;
  pattern?: NounPattern;
  // For verbs
  binyan?: Binyan;
  conjugation?: HebrewConjugation;
  person?: 1 | 2 | 3;
  root?: string; // 3-letter root (שׁרשׁ)
  // Guttural characteristics
  hasGuttural?: boolean;
  gutturalPosition?: 'first' | 'second' | 'third';
  // Weak verb types
  weakType?: 'pe-nun' | 'pe-yod' | 'pe-aleph' | 'ayin-vav' | 'ayin-yod' | 'lamed-he' | 'lamed-aleph' | 'geminate' | 'strong';
}

// SRS Types
export interface SRSCard {
  easeFactor: number;
  interval: number;
  repetitions: number;
}

export interface SRSResult extends SRSCard {
  nextReview: Date;
}

// User Progress Types
export interface WordProgress {
  wordId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  maxRepetitions: number; // Tracks highest repetition count ever reached (for stable "learned" status)
  nextReview: Date;
  lastReview: Date | null;
  lastQuality: number;
  timesReviewed: number;
  timesCorrect: number;
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  lastStudyDate: Date | null;
  achievements: string[];
  wordsLearned: number;
  wordsInProgress: number;
  totalReviews: number;
  correctReviews: number;
}

// Review Session Types
export type LearningMode = 'flashcard' | 'quiz' | 'typing' | 'translation';

// Hebrew Bible Verse Types
export interface BibleBook {
  id: string;
  name: string;
  hebrewName: string;
  chapters: number;
}

export interface BibleVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  reference: string;
  hebrew?: string;  // Hebrew text (for Hebrew Bible verses)
  greek?: string;   // Greek text (for NT verses - backwards compatibility)
  transliteration: string;
  referenceTranslation: string;
  keyTerms: string[];
  difficulty: 1 | 2 | 3;
  notes?: string;
  tier?: number;    // Optional tier for filtering
}

// Legacy type aliases for NT verse data (backwards compatibility)
export type NTVerse = BibleVerse;
export type NTBook = BibleBook;

export interface TranslationResult {
  score: number; // 0-10
  feedback: string;
  keyTermsFound: string[];
  keyTermsMissed: string[];
  suggestions: string[];
}

export interface ReviewSession {
  id: string;
  startedAt: Date;
  completedAt?: Date;
  mode: LearningMode;
  wordsReviewed: number;
  correctCount: number;
  xpEarned: number;
  words: ReviewWord[];
}

export interface ReviewWord {
  wordId: string;
  quality: number; // 0-5
  responseTime: number; // ms
  correct: boolean;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpBonus: number;
  condition: AchievementCondition;
  unlockedAt?: Date;
}

export type AchievementCondition =
  | { type: 'words_learned'; count: number }
  | { type: 'streak_days'; count: number }
  | { type: 'perfect_session' }
  | { type: 'reviews_count'; count: number }
  | { type: 'tier_mastered'; tier: number }
  | { type: 'speed_demon'; reviews: number; minutes: number };

// Quiz Types
export interface QuizQuestion {
  word: VocabularyWord;
  options: string[];
  correctIndex: number;
}

// XP/Level Constants
export const XP_REWARDS = {
  correctFlashcard: 10,
  correctQuiz: 15,
  correctTyping: 20,
  translationBase: 30, // Base XP for translation, multiplied by score/10
  perfectSession: 50,
  dailyGoalMet: 100,
  newWordLearned: 25,
} as const;

// Level thresholds (exponential curve)
export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 1000, 1750, 2750, 4000, 5500, 7500,
  10000, 13000, 16500, 20500, 25000, 30000, 36000, 43000, 51000, 60000,
  70000, 82000, 96000, 112000, 130000, 150000, 173000, 199000, 228000, 260000,
  295000, 335000, 380000, 430000, 485000, 545000, 610000, 682000, 762000, 850000,
  945000, 1050000, 1165000, 1290000, 1425000, 1575000, 1740000, 1920000, 2120000, 2340000,
];

// Frequency tier thresholds
export const TIER_THRESHOLDS = {
  1: { min: 500, label: 'Essential', color: 'emerald' },     // 500+ occurrences
  2: { min: 200, label: 'High Frequency', color: 'blue' },   // 200-499 occurrences
  3: { min: 100, label: 'Medium Frequency', color: 'amber' }, // 100-199 occurrences
  4: { min: 50, label: 'Lower Frequency', color: 'orange' },  // 50-99 occurrences
  5: { min: 10, label: 'Advanced', color: 'red' },           // 10-49 occurrences
} as const;

// Semantic category display info
export const SEMANTIC_CATEGORIES: Record<SemanticCategory, { label: string; color: string; icon: string }> = {
  name: { label: 'Names', color: 'rose', icon: 'User' },
  place: { label: 'Places', color: 'cyan', icon: 'MapPin' },
  theological: { label: 'Theological', color: 'purple', icon: 'Star' },
  body: { label: 'Body', color: 'orange', icon: 'Heart' },
  time: { label: 'Time', color: 'sky', icon: 'Clock' },
  family: { label: 'Family', color: 'pink', icon: 'Users' },
  nature: { label: 'Nature', color: 'green', icon: 'Leaf' },
  abstract: { label: 'Abstract', color: 'indigo', icon: 'Lightbulb' },
  emotion: { label: 'Emotions', color: 'red', icon: 'Heart' },
  religious: { label: 'Religious', color: 'violet', icon: 'BookOpen' },
  authority: { label: 'Authority', color: 'amber', icon: 'Crown' },
  action: { label: 'Actions', color: 'blue', icon: 'Zap' },
  speech: { label: 'Speech', color: 'teal', icon: 'MessageCircle' },
  general: { label: 'General', color: 'gray', icon: 'Circle' },
} as const;

// Part of Speech display info
export const PART_OF_SPEECH_INFO: Record<PartOfSpeech, { label: string; abbrev: string; color: string }> = {
  noun: { label: 'Noun', abbrev: 'n.', color: 'blue' },
  verb: { label: 'Verb', abbrev: 'v.', color: 'emerald' },
  adjective: { label: 'Adjective', abbrev: 'adj.', color: 'purple' },
  adverb: { label: 'Adverb', abbrev: 'adv.', color: 'amber' },
  preposition: { label: 'Preposition', abbrev: 'prep.', color: 'rose' },
  conjunction: { label: 'Conjunction', abbrev: 'conj.', color: 'cyan' },
  particle: { label: 'Particle', abbrev: 'part.', color: 'orange' },
  pronoun: { label: 'Pronoun', abbrev: 'pron.', color: 'pink' },
  article: { label: 'Article', abbrev: 'art.', color: 'gray' },
  interjection: { label: 'Interjection', abbrev: 'interj.', color: 'red' },
} as const;

// Binyan display info
export const BINYAN_INFO: Record<Binyan, { label: string; meaning: string; color: string }> = {
  qal: { label: 'Qal', meaning: 'Simple active', color: 'emerald' },
  niphal: { label: 'Niphal', meaning: 'Simple passive/reflexive', color: 'blue' },
  piel: { label: 'Piel', meaning: 'Intensive active', color: 'purple' },
  pual: { label: 'Pual', meaning: 'Intensive passive', color: 'violet' },
  hiphil: { label: 'Hiphil', meaning: 'Causative active', color: 'amber' },
  hophal: { label: 'Hophal', meaning: 'Causative passive', color: 'orange' },
  hithpael: { label: 'Hithpael', meaning: 'Reflexive/reciprocal', color: 'rose' },
} as const;

// ============================================
// TDOT Dictionary Types (Hebrew Kittel)
// ============================================

export type TDOTCategory =
  | 'creation'      // בָּרָא, עָשָׂה, יָצַר (creation verbs)
  | 'covenant'      // בְּרִית, חֶסֶד, אֱמוּנָה
  | 'salvation'     // יָשַׁע, גָּאַל, פָּדָה (redemption words)
  | 'sin'           // חָטָא, עָוֺן, פֶּשַׁע
  | 'worship'       // עָבַד, שָׁחָה, קָדוֹשׁ
  | 'wisdom'        // חָכְמָה, בִּינָה, דַּעַת
  | 'law'           // תּוֹרָה, מִשְׁפָּט, חֹק
  | 'prophecy'      // נָבִיא, דָּבָר, חָזָה
  | 'kingship'      // מֶלֶךְ, מָשִׁיחַ, כִּסֵּא
  | 'temple'        // בַּיִת, מִקְדָּשׁ, כָּבוֹד
  | 'anthropology'  // נֶפֶשׁ, רוּחַ, לֵב, בָּשָׂר
  | 'ethics'        // צֶדֶק, מִשְׁפָּט, טוֹב
  | 'eschatology'   // יוֹם, אַחֲרִית, עוֹלָם
  ;

export interface TDOTKeyPassage {
  reference: string;
  hebrew: string;
  significance: string;
}

export interface TDOTRelatedWord {
  hebrew: string;
  transliteration: string;
  relationship: string;
}

export interface TDOTEntry {
  id: string;
  category: TDOTCategory;
  hebrew: string;
  transliteration: string;
  strongs: string;
  root: string;
  shortDef: string;
  title: string;
  summary: string;
  ancientContext: string;
  rootAnalysis: string;
  otUsage: string;
  keyPassages: TDOTKeyPassage[];
  theologicalSignificance: string;
  ntConnection?: string;
  relatedWords?: TDOTRelatedWord[];
  tags: string[];
  tdotVolume?: number;
  pages?: string;
}

export const TDOT_CATEGORIES: Record<TDOTCategory, { label: string; description: string; color: string; bgColor: string; icon: string }> = {
  creation: { label: 'Creation', description: 'Words related to God\'s creative work', color: 'text-emerald-600', bgColor: 'bg-emerald-500', icon: 'Sparkles' },
  covenant: { label: 'Covenant', description: 'Covenant terminology and faithfulness', color: 'text-amber-600', bgColor: 'bg-amber-500', icon: 'Handshake' },
  salvation: { label: 'Salvation', description: 'Redemption and deliverance words', color: 'text-blue-600', bgColor: 'bg-blue-500', icon: 'Shield' },
  sin: { label: 'Sin', description: 'Sin, transgression, and iniquity', color: 'text-red-600', bgColor: 'bg-red-500', icon: 'AlertTriangle' },
  worship: { label: 'Worship', description: 'Worship and holiness terms', color: 'text-violet-600', bgColor: 'bg-violet-500', icon: 'Church' },
  wisdom: { label: 'Wisdom', description: 'Wisdom and understanding', color: 'text-sky-600', bgColor: 'bg-sky-500', icon: 'Lightbulb' },
  law: { label: 'Law', description: 'Torah, commandments, and judgments', color: 'text-indigo-600', bgColor: 'bg-indigo-500', icon: 'Scale' },
  prophecy: { label: 'Prophecy', description: 'Prophetic and revelation terms', color: 'text-purple-600', bgColor: 'bg-purple-500', icon: 'Eye' },
  kingship: { label: 'Kingship', description: 'Royal and messianic terminology', color: 'text-amber-600', bgColor: 'bg-amber-600', icon: 'Crown' },
  temple: { label: 'Temple', description: 'Sanctuary and glory terms', color: 'text-orange-600', bgColor: 'bg-orange-500', icon: 'Building' },
  anthropology: { label: 'Anthropology', description: 'Human nature and soul', color: 'text-rose-600', bgColor: 'bg-rose-500', icon: 'Heart' },
  ethics: { label: 'Ethics', description: 'Righteousness and justice', color: 'text-teal-600', bgColor: 'bg-teal-500', icon: 'Scale' },
  eschatology: { label: 'Eschatology', description: 'Time, eternity, and end times', color: 'text-cyan-600', bgColor: 'bg-cyan-500', icon: 'Clock' },
} as const;

// ============================================
// Vine's OT Dictionary Types
// ============================================

export type VineCategory =
  | 'god'           // Names and attributes of God
  | 'worship'       // Worship and sacrifice
  | 'covenant'      // Covenant terminology
  | 'law'           // Law and commandments
  | 'sin'           // Sin and judgment
  | 'salvation'     // Redemption and deliverance
  | 'wisdom'        // Wisdom and understanding
  | 'people'        // People and nations
  | 'creation'      // Creation and nature
  | 'time'          // Time and seasons
  | 'emotion'       // Heart, soul, feelings
  | 'other'
  ;

export interface VineKeyPassage {
  reference: string;
  hebrew: string;
  significance: string;
}

export interface VineRelatedWord {
  hebrew: string;
  transliteration: string;
  relationship: string;
}

export interface VineOTEntry {
  id: string;
  category: VineCategory;
  englishWord: string;
  hebrew: string;
  transliteration: string;
  strongs: string;
  shortDef: string;
  etymology: string;
  otUsage: string;
  keyPassages: VineKeyPassage[];
  theologicalNote: string;
  relatedWords?: VineRelatedWord[];
  tags: string[];
  vineRef?: string;
}

export const VINE_CATEGORIES: Record<VineCategory, { label: string; description: string; color: string; bgColor: string; icon: string }> = {
  god: { label: 'God', description: 'Names and attributes of God', color: 'text-amber-600', bgColor: 'bg-amber-500', icon: 'Crown' },
  worship: { label: 'Worship', description: 'Worship and sacrifice', color: 'text-violet-600', bgColor: 'bg-violet-500', icon: 'Church' },
  covenant: { label: 'Covenant', description: 'Covenant terminology', color: 'text-emerald-600', bgColor: 'bg-emerald-500', icon: 'Handshake' },
  law: { label: 'Law', description: 'Law and commandments', color: 'text-indigo-600', bgColor: 'bg-indigo-500', icon: 'Scale' },
  sin: { label: 'Sin', description: 'Sin and judgment', color: 'text-red-600', bgColor: 'bg-red-500', icon: 'AlertTriangle' },
  salvation: { label: 'Salvation', description: 'Redemption and deliverance', color: 'text-blue-600', bgColor: 'bg-blue-500', icon: 'Shield' },
  wisdom: { label: 'Wisdom', description: 'Wisdom and understanding', color: 'text-sky-600', bgColor: 'bg-sky-500', icon: 'Lightbulb' },
  people: { label: 'People', description: 'People and nations', color: 'text-orange-600', bgColor: 'bg-orange-500', icon: 'Users' },
  creation: { label: 'Creation', description: 'Creation and nature', color: 'text-green-600', bgColor: 'bg-green-500', icon: 'Leaf' },
  time: { label: 'Time', description: 'Time and seasons', color: 'text-cyan-600', bgColor: 'bg-cyan-500', icon: 'Clock' },
  emotion: { label: 'Emotion', description: 'Heart, soul, feelings', color: 'text-rose-600', bgColor: 'bg-rose-500', icon: 'Heart' },
  other: { label: 'Other', description: 'Other Hebrew words', color: 'text-gray-600', bgColor: 'bg-gray-500', icon: 'Circle' },
} as const;

