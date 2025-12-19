/**
 * Hebrew Transliteration and Pronunciation System for Biblical Hebrew
 *
 * Supports both academic/scholarly transliteration and simplified pronunciation guides.
 */

// Hebrew consonants with transliterations
const CONSONANTS: Record<string, { translit: string; name: string; sound: string }> = {
  'א': { translit: 'ʾ', name: 'Aleph', sound: 'silent/glottal stop' },
  'ב': { translit: 'b/v', name: 'Bet', sound: 'b (with dagesh) or v' },
  'בּ': { translit: 'b', name: 'Bet (dagesh)', sound: 'b' },
  'ג': { translit: 'g', name: 'Gimel', sound: 'g as in go' },
  'גּ': { translit: 'g', name: 'Gimel (dagesh)', sound: 'g' },
  'ד': { translit: 'd', name: 'Dalet', sound: 'd' },
  'דּ': { translit: 'd', name: 'Dalet (dagesh)', sound: 'd' },
  'ה': { translit: 'h', name: 'He', sound: 'h' },
  'ו': { translit: 'w/v', name: 'Vav', sound: 'v or w' },
  'וּ': { translit: 'û', name: 'Vav (shureq)', sound: 'oo' },
  'וֹ': { translit: 'ô', name: 'Vav (holem)', sound: 'oh' },
  'ז': { translit: 'z', name: 'Zayin', sound: 'z' },
  'ח': { translit: 'ḥ', name: 'Het', sound: 'ch (guttural)' },
  'ט': { translit: 'ṭ', name: 'Tet', sound: 't (emphatic)' },
  'י': { translit: 'y', name: 'Yod', sound: 'y' },
  'כ': { translit: 'k/kh', name: 'Kaf', sound: 'k (with dagesh) or kh' },
  'כּ': { translit: 'k', name: 'Kaf (dagesh)', sound: 'k' },
  'ך': { translit: 'k/kh', name: 'Final Kaf', sound: 'k or kh' },
  'ךּ': { translit: 'k', name: 'Final Kaf (dagesh)', sound: 'k' },
  'ל': { translit: 'l', name: 'Lamed', sound: 'l' },
  'מ': { translit: 'm', name: 'Mem', sound: 'm' },
  'ם': { translit: 'm', name: 'Final Mem', sound: 'm' },
  'נ': { translit: 'n', name: 'Nun', sound: 'n' },
  'ן': { translit: 'n', name: 'Final Nun', sound: 'n' },
  'ס': { translit: 's', name: 'Samekh', sound: 's' },
  'ע': { translit: 'ʿ', name: 'Ayin', sound: 'silent/guttural' },
  'פ': { translit: 'p/f', name: 'Pe', sound: 'p (with dagesh) or f' },
  'פּ': { translit: 'p', name: 'Pe (dagesh)', sound: 'p' },
  'ף': { translit: 'p/f', name: 'Final Pe', sound: 'p or f' },
  'ץ': { translit: 'ṣ', name: 'Final Tsade', sound: 'ts' },
  'צ': { translit: 'ṣ', name: 'Tsade', sound: 'ts' },
  'ק': { translit: 'q', name: 'Qof', sound: 'k (back of throat)' },
  'ר': { translit: 'r', name: 'Resh', sound: 'r' },
  'שׁ': { translit: 'š', name: 'Shin', sound: 'sh' },
  'שׂ': { translit: 'ś', name: 'Sin', sound: 's' },
  'ש': { translit: 'š/ś', name: 'Shin/Sin', sound: 'sh or s' },
  'ת': { translit: 't', name: 'Tav', sound: 't' },
  'תּ': { translit: 't', name: 'Tav (dagesh)', sound: 't' },
};

// Hebrew vowels (nikkud) with transliterations
const VOWELS: Record<string, { translit: string; name: string; sound: string; type: 'short' | 'long' | 'reduced' }> = {
  // A-class vowels
  'ַ': { translit: 'a', name: 'Patach', sound: 'ah', type: 'short' },
  'ָ': { translit: 'ā/o', name: 'Qamats', sound: 'ah or o', type: 'long' },
  'ֲ': { translit: 'ă', name: 'Hataf Patach', sound: 'short a', type: 'reduced' },

  // E-class vowels
  'ֶ': { translit: 'e', name: 'Segol', sound: 'eh', type: 'short' },
  'ֵ': { translit: 'ē', name: 'Tsere', sound: 'ay', type: 'long' },
  'ֱ': { translit: 'ĕ', name: 'Hataf Segol', sound: 'short e', type: 'reduced' },

  // I-class vowels
  'ִ': { translit: 'i', name: 'Hiriq', sound: 'ee', type: 'short' },
  'ִי': { translit: 'î', name: 'Hiriq Yod', sound: 'ee', type: 'long' },

  // O-class vowels
  'ֹ': { translit: 'ō', name: 'Holem', sound: 'oh', type: 'long' },
  'ָ֫': { translit: 'o', name: 'Qamats Hatuf', sound: 'o', type: 'short' },
  'ֳ': { translit: 'ŏ', name: 'Hataf Qamats', sound: 'short o', type: 'reduced' },

  // U-class vowels
  'ֻ': { translit: 'u', name: 'Qibbuts', sound: 'oo', type: 'short' },

  // Sheva
  'ְ': { translit: 'ə', name: 'Sheva', sound: 'short e or silent', type: 'reduced' },
};

// Map for simplified transliteration (without diacritics)
const SIMPLE_CONSONANTS: Record<string, string> = {
  'א': "'", 'ב': 'v', 'בּ': 'b', 'ג': 'g', 'גּ': 'g',
  'ד': 'd', 'דּ': 'd', 'ה': 'h', 'ו': 'v', 'וּ': 'u', 'וֹ': 'o',
  'ז': 'z', 'ח': 'ch', 'ט': 't', 'י': 'y',
  'כ': 'kh', 'כּ': 'k', 'ך': 'kh', 'ךּ': 'k',
  'ל': 'l', 'מ': 'm', 'ם': 'm', 'נ': 'n', 'ן': 'n',
  'ס': 's', 'ע': "'", 'פ': 'f', 'פּ': 'p', 'ף': 'f',
  'צ': 'ts', 'ץ': 'ts', 'ק': 'q', 'ר': 'r',
  'שׁ': 'sh', 'שׂ': 's', 'ש': 'sh', 'ת': 't', 'תּ': 't',
};

const SIMPLE_VOWELS: Record<string, string> = {
  'ַ': 'a', 'ָ': 'a', 'ֲ': 'a',
  'ֶ': 'e', 'ֵ': 'e', 'ֱ': 'e',
  'ִ': 'i', 'ִי': 'i',
  'ֹ': 'o', 'ֳ': 'o',
  'ֻ': 'u',
  'ְ': '', // Often silent
};

/**
 * Normalize Hebrew text by removing vowel points and cantillation marks
 */
export function normalizeHebrew(text: string): string {
  // Remove nikkud (vowel points) and cantillation marks (Unicode range)
  return text.normalize('NFD')
    .replace(/[\u0591-\u05C7]/g, '') // Remove Hebrew points and accents
    .normalize('NFC');
}

/**
 * Extract the consonantal root from a Hebrew word
 */
export function extractRoot(hebrew: string): string {
  const consonants = normalizeHebrew(hebrew);
  // Remove common prefixes and suffixes
  let root = consonants
    .replace(/^[והכלמשב]/, '') // Common prefixes
    .replace(/[הותים]$/, '');   // Common suffixes

  return root;
}

/**
 * Convert Hebrew text to academic transliteration
 */
export function toAcademicTransliteration(hebrew: string): string {
  let result = '';
  const chars = [...hebrew];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const nextChar = chars[i + 1];

    // Check for consonant with dagesh or vowel combinations
    const combined = char + (nextChar || '');

    if (CONSONANTS[combined]) {
      result += CONSONANTS[combined].translit;
      i++; // Skip next char
    } else if (CONSONANTS[char]) {
      result += CONSONANTS[char].translit;
    } else if (VOWELS[combined]) {
      result += VOWELS[combined].translit;
      i++;
    } else if (VOWELS[char]) {
      result += VOWELS[char].translit;
    } else if (char === ' ') {
      result += ' ';
    }
    // Skip unknown characters (cantillation marks, etc.)
  }

  return result;
}

/**
 * Convert Hebrew text to simplified pronunciation guide
 */
export function toSimpleTransliteration(hebrew: string): string {
  let result = '';
  const chars = [...hebrew];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const nextChar = chars[i + 1];

    // Check for combined characters first
    const combined = char + (nextChar || '');

    if (SIMPLE_CONSONANTS[combined]) {
      result += SIMPLE_CONSONANTS[combined];
      i++;
    } else if (SIMPLE_CONSONANTS[char]) {
      result += SIMPLE_CONSONANTS[char];
    } else if (SIMPLE_VOWELS[combined]) {
      result += SIMPLE_VOWELS[combined];
      i++;
    } else if (SIMPLE_VOWELS[char]) {
      result += SIMPLE_VOWELS[char];
    } else if (char === ' ') {
      result += ' ';
    }
  }

  // Clean up double consonants and trailing apostrophes
  result = result
    .replace(/''/, "'")
    .replace(/'$/, '')
    .replace(/^'/, '');

  return result;
}

/**
 * Check if a letter is a guttural (affects vowel patterns)
 */
export function isGuttural(char: string): boolean {
  const base = normalizeHebrew(char);
  return ['א', 'ה', 'ח', 'ע', 'ר'].includes(base);
}

/**
 * Check if a letter is a BeGaD KeFaT letter (can have dagesh lene)
 */
export function isBeGaDKeFaT(char: string): boolean {
  const base = normalizeHebrew(char);
  return ['ב', 'ג', 'ד', 'כ', 'פ', 'ת'].includes(base);
}

/**
 * Get information about a Hebrew letter
 */
export function getLetterInfo(char: string): {
  name: string;
  translit: string;
  sound: string;
  isGuttural: boolean;
  isBeGaDKeFaT: boolean;
} | null {
  const base = normalizeHebrew(char);
  const info = CONSONANTS[char] || CONSONANTS[base];

  if (!info) return null;

  return {
    ...info,
    isGuttural: isGuttural(base),
    isBeGaDKeFaT: isBeGaDKeFaT(base),
  };
}

/**
 * Get vowel information
 */
export function getVowelInfo(vowelMark: string): {
  name: string;
  translit: string;
  sound: string;
  type: 'short' | 'long' | 'reduced';
} | null {
  return VOWELS[vowelMark] || null;
}

/**
 * Break a Hebrew word into syllables (simplified algorithm)
 */
export function syllabify(hebrew: string): string[] {
  const syllables: string[] = [];
  let current = '';
  const chars = [...hebrew];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    current += char;

    // Check if this is a vowel that ends a syllable
    if (VOWELS[char]) {
      const nextChar = chars[i + 1];
      const afterNext = chars[i + 2];

      // If next is a consonant followed by a vowel, close this syllable
      if (nextChar && CONSONANTS[normalizeHebrew(nextChar)] &&
          afterNext && (VOWELS[afterNext] || VOWELS[normalizeHebrew(afterNext)])) {
        syllables.push(current);
        current = '';
      }
    }
  }

  if (current) {
    syllables.push(current);
  }

  return syllables.length ? syllables : [hebrew];
}

/**
 * Common Hebrew vocabulary with verified pronunciations
 */
export const VERIFIED_PRONUNCIATIONS: Record<string, string> = {
  'אֱלֹהִים': 'e-lo-HEEM',
  'יְהוָה': 'Adonai / YHWH',
  'אָדָם': 'a-DAM',
  'אֶרֶץ': 'E-rets',
  'שָׁמַיִם': 'sha-MA-yim',
  'יוֹם': 'yom',
  'לַיְלָה': 'LAI-la',
  'אוֹר': 'or',
  'חֹשֶׁךְ': 'CHO-shekh',
  'מַיִם': 'MA-yim',
  'אָב': 'av',
  'אֵם': 'em',
  'בֵּן': 'ben',
  'בַּת': 'bat',
  'אָח': 'ach',
  'אָחוֹת': 'a-CHOT',
  'אִישׁ': 'ish',
  'אִשָּׁה': 'i-SHA',
  'מֶלֶךְ': 'ME-lekh',
  'דָּבָר': 'da-VAR',
  'לֵב': 'lev',
  'יָד': 'yad',
  'עַיִן': 'A-yin',
  'פֶּה': 'peh',
  'רֹאשׁ': 'rosh',
  'נֶפֶשׁ': 'NE-fesh',
  'רוּחַ': 'RU-ach',
  'בָּשָׂר': 'ba-SAR',
  'דֶּרֶךְ': 'DE-rekh',
  'עִיר': 'ir',
  'בַּיִת': 'BA-yit',
  'שָׁנָה': 'sha-NA',
  'עוֹלָם': 'o-LAM',
  'שָׁלוֹם': 'sha-LOM',
  'אֱמֶת': 'e-MET',
  'חֶסֶד': 'CHE-sed',
  'צֶדֶק': 'TSE-deq',
  'מִשְׁפָּט': 'mish-PAT',
  'תּוֹרָה': 'to-RA',
  'בְּרִית': 'be-RIT',
  'קָדוֹשׁ': 'qa-DOSH',
  'כֹּהֵן': 'ko-HEN',
  'נָבִיא': 'na-VI',
};

/**
 * Get the best pronunciation for a Hebrew word
 */
export function getBestPronunciation(hebrew: string): string {
  // Check for verified pronunciation
  const normalized = hebrew.trim();
  if (normalized in VERIFIED_PRONUNCIATIONS) {
    return VERIFIED_PRONUNCIATIONS[normalized];
  }

  // Generate pronunciation from transliteration
  return toSimpleTransliteration(hebrew);
}

/**
 * Pronunciation breakdown for a Hebrew word
 */
export interface PronunciationBreakdown {
  hebrew: string;
  academic: string;
  simple: string;
  syllables: string[];
  syllablePronunciations: string[];
}

export function getPronunciationBreakdown(hebrew: string): PronunciationBreakdown {
  const syllables = syllabify(hebrew);

  return {
    hebrew,
    academic: toAcademicTransliteration(hebrew),
    simple: toSimpleTransliteration(hebrew),
    syllables,
    syllablePronunciations: syllables.map(s => toSimpleTransliteration(s)),
  };
}

/**
 * Audio playback using Web Speech API
 * Note: True Hebrew pronunciation requires recorded audio, but we can
 * approximate it using Hebrew voice if available
 */
let speechSynthesis: SpeechSynthesis | null = null;
let hebrewVoice: SpeechSynthesisVoice | null = null;
let initialized = false;

export async function initializeHebrewSpeech(): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  return new Promise((resolve) => {
    speechSynthesis = window.speechSynthesis;

    const findVoice = () => {
      const voices = speechSynthesis?.getVoices() || [];

      // Prefer Hebrew voice for authentic sound
      hebrewVoice = voices.find(v => v.lang.startsWith('he')) || null;

      // Fallback to English for pronunciation guide reading
      if (!hebrewVoice) {
        hebrewVoice = voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB') || voices[0] || null;
      }

      initialized = true;
      resolve(!!hebrewVoice);
    };

    if (speechSynthesis?.getVoices().length) {
      findVoice();
    } else {
      speechSynthesis?.addEventListener('voiceschanged', findVoice, { once: true });
      setTimeout(() => { if (!initialized) findVoice(); }, 1000);
    }
  });
}

export function speakHebrew(hebrew: string, rate = 0.7): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!speechSynthesis) {
      reject(new Error('Speech synthesis not available'));
      return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(hebrew);

    if (hebrewVoice) {
      utterance.voice = hebrewVoice;
    }

    // Slower rate for learning pronunciation
    utterance.lang = hebrewVoice?.lang.startsWith('he') ? 'he-IL' : 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(new Error(e.error));

    speechSynthesis.speak(utterance);
  });
}

export function stopHebrewSpeech(): void {
  speechSynthesis?.cancel();
}

// Hebrew alphabet for reference
export const HEBREW_ALPHABET = [
  { letter: 'א', name: 'Aleph', translit: "'", value: 1 },
  { letter: 'ב', name: 'Bet', translit: 'b/v', value: 2 },
  { letter: 'ג', name: 'Gimel', translit: 'g', value: 3 },
  { letter: 'ד', name: 'Dalet', translit: 'd', value: 4 },
  { letter: 'ה', name: 'He', translit: 'h', value: 5 },
  { letter: 'ו', name: 'Vav', translit: 'v/w', value: 6 },
  { letter: 'ז', name: 'Zayin', translit: 'z', value: 7 },
  { letter: 'ח', name: 'Het', translit: 'ch', value: 8 },
  { letter: 'ט', name: 'Tet', translit: 't', value: 9 },
  { letter: 'י', name: 'Yod', translit: 'y', value: 10 },
  { letter: 'כ', name: 'Kaf', translit: 'k/kh', value: 20 },
  { letter: 'ל', name: 'Lamed', translit: 'l', value: 30 },
  { letter: 'מ', name: 'Mem', translit: 'm', value: 40 },
  { letter: 'נ', name: 'Nun', translit: 'n', value: 50 },
  { letter: 'ס', name: 'Samekh', translit: 's', value: 60 },
  { letter: 'ע', name: 'Ayin', translit: "'", value: 70 },
  { letter: 'פ', name: 'Pe', translit: 'p/f', value: 80 },
  { letter: 'צ', name: 'Tsade', translit: 'ts', value: 90 },
  { letter: 'ק', name: 'Qof', translit: 'q', value: 100 },
  { letter: 'ר', name: 'Resh', translit: 'r', value: 200 },
  { letter: 'שׁ', name: 'Shin', translit: 'sh', value: 300 },
  { letter: 'שׂ', name: 'Sin', translit: 's', value: 300 },
  { letter: 'ת', name: 'Tav', translit: 't', value: 400 },
] as const;

// Final letter forms
export const FINAL_LETTERS: Record<string, string> = {
  'כ': 'ך',
  'מ': 'ם',
  'נ': 'ן',
  'פ': 'ף',
  'צ': 'ץ',
};
