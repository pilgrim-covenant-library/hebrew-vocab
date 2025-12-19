/**
 * Hebrew Audio Pronunciation using Web Speech API
 */

let speechSynthesis: SpeechSynthesis | null = null;
let hebrewVoice: SpeechSynthesisVoice | null = null;

/**
 * Initialize speech synthesis and find Hebrew voice
 */
export function initializeSpeech(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    speechSynthesis = window.speechSynthesis;

    const findHebrewVoice = () => {
      const voices = speechSynthesis?.getVoices() || [];

      // Try to find a Hebrew voice
      hebrewVoice = voices.find(
        (voice) =>
          voice.lang.startsWith('he') || // Hebrew
          voice.lang === 'he-IL' ||
          voice.name.toLowerCase().includes('hebrew')
      ) || null;

      // If no Hebrew voice, use a fallback that handles Unicode well
      if (!hebrewVoice) {
        hebrewVoice = voices.find(
          (voice) => voice.lang === 'en-US' || voice.lang === 'en-GB'
        ) || voices[0] || null;
      }

      resolve(!!hebrewVoice);
    };

    // Voices may not be loaded immediately
    if (speechSynthesis?.getVoices().length) {
      findHebrewVoice();
    } else {
      speechSynthesis?.addEventListener('voiceschanged', findHebrewVoice, {
        once: true,
      });
      // Timeout fallback
      setTimeout(() => {
        if (!hebrewVoice) findHebrewVoice();
      }, 1000);
    }
  });
}

/**
 * Speak Hebrew text using Web Speech API
 */
export function speakHebrew(text: string, rate = 0.8): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!speechSynthesis) {
      reject(new Error('Speech synthesis not available'));
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    if (hebrewVoice) {
      utterance.voice = hebrewVoice;
    }

    // Configure for Hebrew pronunciation
    utterance.lang = 'he-IL';
    utterance.rate = rate; // Slower for learning
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => resolve();
    utterance.onerror = (event) => reject(new Error(event.error));

    speechSynthesis.speak(utterance);
  });
}

/**
 * Check if speech synthesis is available
 */
export function isSpeechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/**
 * Stop any ongoing speech
 */
export function stopSpeech(): void {
  speechSynthesis?.cancel();
}

/**
 * Hebrew letter to approximate English pronunciation guide
 */
const HEBREW_PRONUNCIATION_MAP: Record<string, string> = {
  'א': "'",
  'ב': 'v',
  'בּ': 'b',
  'ג': 'g',
  'ד': 'd',
  'ה': 'h',
  'ו': 'v',
  'ז': 'z',
  'ח': 'ch',
  'ט': 't',
  'י': 'y',
  'כ': 'kh',
  'כּ': 'k',
  'ך': 'kh',
  'ל': 'l',
  'מ': 'm',
  'ם': 'm',
  'נ': 'n',
  'ן': 'n',
  'ס': 's',
  'ע': "'",
  'פ': 'f',
  'פּ': 'p',
  'ף': 'f',
  'צ': 'ts',
  'ץ': 'ts',
  'ק': 'k',
  'ר': 'r',
  'שׁ': 'sh',
  'שׂ': 's',
  'ש': 'sh',
  'ת': 't',
  // Vowels (nikkud)
  'ַ': 'a',
  'ָ': 'a',
  'ֶ': 'e',
  'ֵ': 'e',
  'ִ': 'i',
  'ֹ': 'o',
  'ֻ': 'u',
  'ְ': '',
};

/**
 * Get simple pronunciation guide for a Hebrew word
 */
export function getPronunciationGuide(hebrew: string): string {
  return hebrew
    .split('')
    .map((char) => HEBREW_PRONUNCIATION_MAP[char] || char)
    .join('')
    .replace(/''/, "'")
    .replace(/^'/, '')
    .replace(/'$/, '');
}

/**
 * Audio state management for components
 */
export interface AudioState {
  isPlaying: boolean;
  isAvailable: boolean;
  error: string | null;
}

export function createAudioState(): AudioState {
  return {
    isPlaying: false,
    isAvailable: isSpeechAvailable(),
    error: null,
  };
}
