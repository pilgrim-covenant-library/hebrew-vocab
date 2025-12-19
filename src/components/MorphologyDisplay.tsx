'use client';

import { cn } from '@/lib/utils';
import type { VocabularyWord, WordMorphology, Binyan } from '@/types';

interface MorphologyDisplayProps {
  word: VocabularyWord;
  className?: string;
  compact?: boolean;
}

// Part of speech abbreviations and labels
const POS_LABELS: Record<string, { abbr: string; label: string; color: string }> = {
  noun: { abbr: 'n.', label: 'Noun', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
  verb: { abbr: 'v.', label: 'Verb', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
  adjective: { abbr: 'adj.', label: 'Adjective', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  adverb: { abbr: 'adv.', label: 'Adverb', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' },
  preposition: { abbr: 'prep.', label: 'Preposition', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' },
  conjunction: { abbr: 'conj.', label: 'Conjunction', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300' },
  particle: { abbr: 'part.', label: 'Particle', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
  pronoun: { abbr: 'pron.', label: 'Pronoun', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300' },
  article: { abbr: 'art.', label: 'Article', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  interjection: { abbr: 'interj.', label: 'Interjection', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
};

// Gender abbreviations
const GENDER_LABELS: Record<string, { abbr: string; label: string }> = {
  masculine: { abbr: 'm.', label: 'Masculine' },
  feminine: { abbr: 'f.', label: 'Feminine' },
  common: { abbr: 'c.', label: 'Common' },
};

// Binyan labels
const BINYAN_LABELS: Record<Binyan, { abbr: string; label: string; color: string }> = {
  qal: { abbr: 'Q', label: 'Qal (Simple Active)', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
  niphal: { abbr: 'N', label: 'Niphal (Simple Passive)', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
  piel: { abbr: 'Pi', label: 'Piel (Intensive Active)', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
  pual: { abbr: 'Pu', label: 'Pual (Intensive Passive)', color: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300' },
  hiphil: { abbr: 'Hi', label: 'Hiphil (Causative Active)', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' },
  hophal: { abbr: 'Ho', label: 'Hophal (Causative Passive)', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' },
  hithpael: { abbr: 'Ht', label: 'Hithpael (Reflexive)', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300' },
};

// Number labels
const NUMBER_LABELS: Record<string, { abbr: string; label: string }> = {
  singular: { abbr: 's.', label: 'Singular' },
  plural: { abbr: 'pl.', label: 'Plural' },
  dual: { abbr: 'd.', label: 'Dual' },
};

// State labels
const STATE_LABELS: Record<string, { abbr: string; label: string }> = {
  absolute: { abbr: 'abs.', label: 'Absolute' },
  construct: { abbr: 'cstr.', label: 'Construct' },
};

// Weak verb type labels
const WEAK_TYPE_LABELS: Record<string, string> = {
  'pe-nun': 'Pe-Nun (נ״פ)',
  'pe-yod': 'Pe-Yod (י״פ)',
  'pe-aleph': 'Pe-Aleph (א״פ)',
  'ayin-vav': 'Ayin-Vav (ו״ע)',
  'ayin-yod': 'Ayin-Yod (י״ע)',
  'lamed-he': 'Lamed-He (ה״ל)',
  'lamed-aleph': 'Lamed-Aleph (א״ל)',
  'geminate': 'Geminate (ע״ע)',
  'strong': 'Strong',
};

export function MorphologyDisplay({ word, className, compact = false }: MorphologyDisplayProps) {
  const posInfo = POS_LABELS[word.partOfSpeech] || {
    abbr: word.partOfSpeech,
    label: word.partOfSpeech,
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  };

  const morph = word.morphology || {};

  // Build morphology tags
  const tags: { label: string; title: string; color?: string }[] = [];

  // Part of speech is always shown
  tags.push({ label: posInfo.abbr, title: posInfo.label, color: posInfo.color });

  // Binyan (for verbs)
  if (morph.binyan) {
    const binyanInfo = BINYAN_LABELS[morph.binyan];
    tags.push({ label: binyanInfo.abbr, title: binyanInfo.label, color: binyanInfo.color });
  }

  // Gender (for nouns, adjectives)
  if (morph.gender) {
    const genderInfo = GENDER_LABELS[morph.gender];
    if (genderInfo) {
      tags.push({ label: genderInfo.abbr, title: genderInfo.label });
    }
  }

  // Number
  if (morph.number) {
    const numberInfo = NUMBER_LABELS[morph.number];
    if (numberInfo) {
      tags.push({ label: numberInfo.abbr, title: numberInfo.label });
    }
  }

  // State (construct/absolute)
  if (morph.state) {
    const stateInfo = STATE_LABELS[morph.state];
    if (stateInfo) {
      tags.push({ label: stateInfo.abbr, title: stateInfo.label });
    }
  }

  // Weak verb type
  if (morph.weakType && morph.weakType !== 'strong') {
    tags.push({ label: morph.weakType.split('-')[0], title: WEAK_TYPE_LABELS[morph.weakType] || morph.weakType });
  }

  if (compact) {
    // Compact mode: single line of tags
    return (
      <div className={cn('flex flex-wrap gap-1', className)}>
        {tags.map((tag, i) => (
          <span
            key={i}
            title={tag.title}
            className={cn(
              'px-1.5 py-0.5 rounded text-[10px] font-medium cursor-help',
              tag.color || 'bg-muted text-muted-foreground'
            )}
          >
            {tag.label}
          </span>
        ))}
      </div>
    );
  }

  // Full mode: more detailed display
  return (
    <div className={cn('space-y-2', className)}>
      {/* Part of Speech Badge */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', posInfo.color)}>
          {posInfo.label}
        </span>
        {morph.binyan && (
          <span className={cn('px-2 py-1 rounded-full text-xs font-medium', BINYAN_LABELS[morph.binyan].color)}>
            {BINYAN_LABELS[morph.binyan].label}
          </span>
        )}
        {morph.weakType && morph.weakType !== 'strong' && (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300">
            {WEAK_TYPE_LABELS[morph.weakType] || morph.weakType}
          </span>
        )}
      </div>

      {/* Morphology Details */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {morph.gender && GENDER_LABELS[morph.gender] && (
          <span>
            <span className="font-medium">Gender:</span> {GENDER_LABELS[morph.gender].label}
          </span>
        )}
        {morph.number && NUMBER_LABELS[morph.number] && (
          <span>
            <span className="font-medium">Number:</span> {NUMBER_LABELS[morph.number].label}
          </span>
        )}
        {morph.state && STATE_LABELS[morph.state] && (
          <span>
            <span className="font-medium">State:</span> {STATE_LABELS[morph.state].label}
          </span>
        )}
        {morph.pattern && (
          <span>
            <span className="font-medium">Pattern:</span> {morph.pattern}
          </span>
        )}
        {morph.root && (
          <span>
            <span className="font-medium">Root:</span>{' '}
            <span className="font-hebrew" dir="rtl">{morph.root}</span>
          </span>
        )}
      </div>

      {/* Strong's Reference */}
      <div className="text-xs text-muted-foreground">
        <span className="font-medium">Strong&apos;s:</span>{' '}
        <a
          href={`https://biblehub.com/hebrew/${word.strongs.replace('H', '')}.htm`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {word.strongs}
        </a>
      </div>
    </div>
  );
}

// Simplified badge for inline use
export function PartOfSpeechBadge({
  partOfSpeech,
  className,
}: {
  partOfSpeech: string;
  className?: string;
}) {
  const posInfo = POS_LABELS[partOfSpeech] || {
    abbr: partOfSpeech,
    label: partOfSpeech,
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  };

  return (
    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', posInfo.color, className)}>
      {posInfo.abbr}
    </span>
  );
}

// Binyan badge for verb display
export function BinyanBadge({
  binyan,
  className,
}: {
  binyan: Binyan;
  className?: string;
}) {
  const binyanInfo = BINYAN_LABELS[binyan];

  return (
    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', binyanInfo.color, className)}>
      {binyanInfo.label}
    </span>
  );
}
