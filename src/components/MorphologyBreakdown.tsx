'use client';

import { cn } from '@/lib/utils';
import { HebrewWord } from './HebrewWord';
import {
  ParsedMorphology,
  formatMorphology,
  formatMorphologyAbbrev,
  getBinyanDescription,
  getConjugationDescription,
  getStateDescription,
  BINYAN_LABELS,
  NUMBER_LABELS,
  GENDER_LABELS,
  CONJUGATION_LABELS,
  PERSON_LABELS,
  STATE_LABELS,
} from '@/lib/morphology';
import { Info, BookOpen, ArrowRight } from 'lucide-react';

interface MorphologyBreakdownProps {
  word: string;
  parsing: ParsedMorphology;
  showDescription?: boolean;
  compact?: boolean;
  className?: string;
}

/**
 * Display a detailed morphological breakdown of a Hebrew word.
 */
export function MorphologyBreakdown({
  word,
  parsing,
  showDescription = true,
  compact = false,
  className,
}: MorphologyBreakdownProps) {
  const fullParsing = formatMorphology(parsing);
  const abbrev = formatMorphologyAbbrev(parsing);

  if (compact) {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <HebrewWord hebrew={word} size="md" />
        <ArrowRight className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">{fullParsing}</span>
        <span className="text-xs text-muted-foreground">({abbrev})</span>
      </div>
    );
  }

  return (
    <div className={cn('rounded-xl border bg-card overflow-hidden', className)}>
      {/* Header with word */}
      <div className="px-4 py-4 border-b bg-muted/50 text-center">
        <HebrewWord hebrew={word} size="xl" />
        <p className="text-sm text-muted-foreground mt-1">
          from <HebrewWord hebrew={parsing.lexicalForm} size="sm" className="inline" />
        </p>
      </div>

      {/* Parsing summary */}
      <div className="px-4 py-3 border-b bg-primary/5">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{fullParsing}</span>
          <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
            {abbrev}
          </span>
        </div>
      </div>

      {/* Detailed breakdown */}
      <div className="divide-y">
        {parsing.partOfSpeech === 'verb' && (
          <>
            <MorphologyRow
              label="Binyan"
              value={BINYAN_LABELS[parsing.binyan]}
              description={showDescription ? getBinyanDescription(parsing.binyan) : undefined}
            />
            <MorphologyRow
              label="Conjugation"
              value={CONJUGATION_LABELS[parsing.conjugation]}
              description={showDescription ? getConjugationDescription(parsing.conjugation) : undefined}
            />
            {parsing.person && (
              <MorphologyRow label="Person" value={PERSON_LABELS[parsing.person]} />
            )}
            {parsing.number && (
              <MorphologyRow label="Number" value={NUMBER_LABELS[parsing.number]} />
            )}
            {parsing.gender && (
              <MorphologyRow label="Gender" value={GENDER_LABELS[parsing.gender]} />
            )}
          </>
        )}

        {(parsing.partOfSpeech === 'noun' || parsing.partOfSpeech === 'adjective') && (
          <>
            <MorphologyRow label="Gender" value={GENDER_LABELS[parsing.gender]} />
            <MorphologyRow label="Number" value={NUMBER_LABELS[parsing.number]} />
            <MorphologyRow
              label="State"
              value={STATE_LABELS[parsing.state]}
              description={showDescription ? getStateDescription(parsing.state) : undefined}
            />
          </>
        )}

        {parsing.partOfSpeech === 'pronoun' && (
          <>
            <MorphologyRow label="Person" value={PERSON_LABELS[parsing.person]} />
            <MorphologyRow label="Number" value={NUMBER_LABELS[parsing.number]} />
            {parsing.gender && (
              <MorphologyRow label="Gender" value={GENDER_LABELS[parsing.gender]} />
            )}
            <MorphologyRow
              label="Type"
              value={parsing.type.charAt(0).toUpperCase() + parsing.type.slice(1)}
            />
          </>
        )}

        {parsing.partOfSpeech === 'participle' && (
          <>
            <MorphologyRow
              label="Binyan"
              value={BINYAN_LABELS[parsing.binyan]}
              description={showDescription ? getBinyanDescription(parsing.binyan) : undefined}
            />
            <MorphologyRow label="Gender" value={GENDER_LABELS[parsing.gender]} />
            <MorphologyRow label="Number" value={NUMBER_LABELS[parsing.number]} />
            <MorphologyRow
              label="State"
              value={STATE_LABELS[parsing.state]}
              description={showDescription ? getStateDescription(parsing.state) : undefined}
            />
          </>
        )}

        {parsing.partOfSpeech === 'infinitive' && (
          <>
            <MorphologyRow
              label="Binyan"
              value={BINYAN_LABELS[parsing.binyan]}
              description={showDescription ? getBinyanDescription(parsing.binyan) : undefined}
            />
            <MorphologyRow
              label="Type"
              value={parsing.type === 'construct' ? 'Construct' : 'Absolute'}
            />
          </>
        )}
      </div>
    </div>
  );
}

interface MorphologyRowProps {
  label: string;
  value: string;
  description?: string;
}

function MorphologyRow({ label, value, description }: MorphologyRowProps) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1 flex items-start gap-1">
          <Info className="w-3 h-3 mt-0.5 shrink-0" />
          {description}
        </p>
      )}
    </div>
  );
}

interface MorphologyBadgeProps {
  parsing: ParsedMorphology;
  className?: string;
}

/**
 * A compact badge showing the abbreviated parsing.
 */
export function MorphologyBadge({ parsing, className }: MorphologyBadgeProps) {
  const abbrev = formatMorphologyAbbrev(parsing);
  const full = formatMorphology(parsing);

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-muted',
        className
      )}
      title={full}
    >
      {abbrev}
    </span>
  );
}

interface ParsedWordDisplayProps {
  word: string;
  lexicalForm: string;
  gloss: string;
  parsing: string;
  className?: string;
}

/**
 * Display a parsed word with its lexical form and gloss.
 */
export function ParsedWordDisplay({
  word,
  lexicalForm,
  gloss,
  parsing,
  className,
}: ParsedWordDisplayProps) {
  return (
    <div className={cn('flex flex-col items-center text-center p-4', className)}>
      <HebrewWord hebrew={word} size="xl" />
      <div className="mt-2 space-y-1">
        <p className="text-sm">
          <span className="text-muted-foreground">from </span>
          <HebrewWord hebrew={lexicalForm} size="sm" className="inline font-semibold" />
          <span className="text-muted-foreground"> ({gloss})</span>
        </p>
        <p className="text-sm font-medium text-primary">{parsing}</p>
      </div>
    </div>
  );
}

interface GrammarExplanationProps {
  title: string;
  explanation: string;
  examples?: { hebrew: string; translation: string }[];
  className?: string;
}

/**
 * Display a grammar concept explanation with examples.
 */
export function GrammarExplanation({
  title,
  explanation,
  examples,
  className,
}: GrammarExplanationProps) {
  return (
    <div className={cn('rounded-xl border bg-card overflow-hidden', className)}>
      <div className="px-4 py-3 border-b bg-muted/50 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground mb-3">{explanation}</p>
        {examples && examples.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Examples
            </p>
            {examples.map((ex, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <HebrewWord hebrew={ex.hebrew} size="sm" />
                <span className="text-muted-foreground">—</span>
                <span>{ex.translation}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
