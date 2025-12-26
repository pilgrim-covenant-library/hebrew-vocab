'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { HebrewWord } from './HebrewWord';
import { Eye, EyeOff, Volume2 } from 'lucide-react';
import {
  type BinyanParadigm,
  type VerbPGN,
  type VerbForm,
  PGN_LABELS,
  SINGULAR_PGNS,
  PLURAL_PGNS,
  IMPERATIVE_PGNS,
} from '@/data/paradigms/binyanim';
import type { HebrewConjugation } from '@/types';

interface ParadigmTableProps {
  title: string;
  subtitle?: string;
  forms: Record<string, Record<string, string>>;
  rowLabels: string[];
  columnLabels: string[];
  highlightCell?: { row: string; column: string };
  showEndings?: boolean;
  endings?: Record<string, Record<string, string>>;
  className?: string;
}

/**
 * A table component for displaying Hebrew paradigms (noun patterns, verb conjugations).
 */
export function ParadigmTable({
  title,
  subtitle,
  forms,
  rowLabels,
  columnLabels,
  highlightCell,
  showEndings = false,
  endings,
  className,
}: ParadigmTableProps) {
  return (
    <div className={cn('rounded-xl border bg-card overflow-hidden', className)}>
      {/* Header */}
      <div className="px-4 py-3 border-b bg-muted/50">
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-3 py-2 text-left font-medium text-muted-foreground"></th>
              {columnLabels.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 text-center font-medium text-muted-foreground"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowLabels.map((row, rowIndex) => (
              <tr
                key={row}
                className={cn(
                  'border-b last:border-b-0',
                  rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                )}
              >
                <td className="px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">
                  {row}
                </td>
                {columnLabels.map((col) => {
                  const form = forms[col.toLowerCase()]?.[row.toLowerCase()];
                  const ending = endings?.[col.toLowerCase()]?.[row.toLowerCase()];
                  const isHighlighted =
                    highlightCell?.row.toLowerCase() === row.toLowerCase() &&
                    highlightCell?.column.toLowerCase() === col.toLowerCase();

                  return (
                    <td
                      key={col}
                      className={cn(
                        'px-3 py-2 text-center',
                        isHighlighted && 'bg-primary/10 ring-2 ring-primary ring-inset rounded'
                      )}
                    >
                      {form ? (
                        <div className="space-y-0.5">
                          <HebrewWord hebrew={form} size="md" showAudio={false} />
                          {showEndings && ending && (
                            <div className="text-xs text-muted-foreground">{ending}</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface VerbParadigmTableProps {
  title: string;
  subtitle?: string;
  forms: {
    singular: Record<string, string>;
    plural: Record<string, string>;
  };
  endings?: {
    singular: Record<string, string>;
    plural: Record<string, string>;
  };
  translations?: {
    singular: Record<string, string>;
    plural: Record<string, string>;
  };
  highlightCell?: { person: string; number: 'singular' | 'plural' };
  showEndings?: boolean;
  showTranslations?: boolean;
  className?: string;
}

/**
 * A specialized table for verb conjugations with person/number layout.
 */
export function VerbParadigmTable({
  title,
  subtitle,
  forms,
  endings,
  translations,
  highlightCell,
  showEndings = false,
  showTranslations = false,
  className,
}: VerbParadigmTableProps) {
  const persons = ['1st', '2nd', '3rd'];
  const numbers: ('singular' | 'plural')[] = ['singular', 'plural'];

  return (
    <div className={cn('rounded-xl border bg-card overflow-hidden', className)}>
      {/* Header */}
      <div className="px-4 py-3 border-b bg-muted/50">
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-3 py-2 text-left font-medium text-muted-foreground">Person</th>
              <th className="px-3 py-2 text-center font-medium text-muted-foreground">Singular</th>
              <th className="px-3 py-2 text-center font-medium text-muted-foreground">Plural</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person, idx) => (
              <tr
                key={person}
                className={cn(
                  'border-b last:border-b-0',
                  idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                )}
              >
                <td className="px-3 py-2 font-medium text-muted-foreground">{person}</td>
                {numbers.map((num) => {
                  const form = forms[num]?.[person];
                  const ending = endings?.[num]?.[person];
                  const translation = translations?.[num]?.[person];
                  const isHighlighted =
                    highlightCell?.person === person && highlightCell?.number === num;

                  return (
                    <td
                      key={num}
                      className={cn(
                        'px-3 py-3 text-center',
                        isHighlighted && 'bg-primary/10 ring-2 ring-primary ring-inset rounded'
                      )}
                    >
                      {form ? (
                        <div className="space-y-1">
                          <HebrewWord hebrew={form} size="md" showAudio={false} />
                          {showEndings && ending && (
                            <div className="text-xs text-muted-foreground">{ending}</div>
                          )}
                          {showTranslations && translation && (
                            <div className="text-xs text-blue-600 dark:text-blue-400">
                              {translation}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface PronounTableProps {
  title: string;
  subtitle?: string;
  forms: {
    singular: Record<string, string>;
    plural: Record<string, string>;
  };
  highlightCell?: { person: string; number: 'singular' | 'plural' };
  className?: string;
}

/**
 * A specialized table for Hebrew personal pronouns.
 */
export function PronounTable({ title, subtitle, forms, highlightCell, className }: PronounTableProps) {
  // Hebrew pronouns: 1cs, 2ms, 2fs, 3ms, 3fs, 1cp, 2mp, 2fp, 3mp, 3fp
  const singularPersons = ['1st common', '2nd masc.', '2nd fem.', '3rd masc.', '3rd fem.'];
  const pluralPersons = ['1st common', '2nd masc.', '2nd fem.', '3rd masc.', '3rd fem.'];

  return (
    <div className={cn('rounded-xl border bg-card overflow-hidden', className)}>
      {/* Header */}
      <div className="px-4 py-3 border-b bg-muted/50">
        <h3 className="font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-2 py-2 text-left font-medium text-muted-foreground">Person</th>
              <th className="px-2 py-2 text-center font-medium text-muted-foreground">Singular</th>
              <th className="px-2 py-2 text-center font-medium text-muted-foreground">Plural</th>
            </tr>
          </thead>
          <tbody>
            {singularPersons.map((person, idx) => {
              const singForm = forms.singular?.[person];
              const plurForm = forms.plural?.[pluralPersons[idx]];

              return (
                <tr
                  key={person}
                  className={cn(
                    'border-b last:border-b-0',
                    idx % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                  )}
                >
                  <td className="px-2 py-2 font-medium text-muted-foreground text-xs">
                    {person}
                  </td>
                  <td
                    className={cn(
                      'px-2 py-2 text-center',
                      highlightCell?.person === person && highlightCell?.number === 'singular' &&
                        'bg-primary/10 ring-2 ring-primary ring-inset rounded'
                    )}
                  >
                    {singForm ? (
                      <HebrewWord hebrew={singForm} size="sm" showAudio={false} />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td
                    className={cn(
                      'px-2 py-2 text-center',
                      highlightCell?.person === pluralPersons[idx] && highlightCell?.number === 'plural' &&
                        'bg-primary/10 ring-2 ring-primary ring-inset rounded'
                    )}
                  >
                    {plurForm ? (
                      <HebrewWord hebrew={plurForm} size="sm" showAudio={false} />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================
// BINYAN PARADIGM TABLE
// ============================================

type ConjugationView = 'perfect' | 'imperfect' | 'imperative' | 'infinitive' | 'participle';

interface BinyanParadigmTableProps {
  paradigm: BinyanParadigm;
  className?: string;
  interactive?: boolean;
  quizMode?: boolean;
  onFormClick?: (form: VerbForm, pgn: VerbPGN) => void;
}

/**
 * An interactive table for displaying complete binyan paradigms.
 */
export function BinyanParadigmTable({
  paradigm,
  className,
  interactive = true,
  quizMode = false,
  onFormClick,
}: BinyanParadigmTableProps) {
  const [view, setView] = useState<ConjugationView>('perfect');
  const [showTranslations, setShowTranslations] = useState(!quizMode);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [hiddenCells, setHiddenCells] = useState<Set<string>>(new Set());

  const views: { id: ConjugationView; label: string; hebrew: string }[] = [
    { id: 'perfect', label: 'Perfect', hebrew: 'קָטַל' },
    { id: 'imperfect', label: 'Imperfect', hebrew: 'יִקְטֹל' },
    { id: 'imperative', label: 'Imperative', hebrew: 'קְטֹל' },
    { id: 'infinitive', label: 'Infinitive', hebrew: 'קְטֹל' },
    { id: 'participle', label: 'Participle', hebrew: 'קֹטֵל' },
  ];

  // Toggle cell visibility in quiz mode
  const toggleCellVisibility = (pgn: string) => {
    if (!quizMode) return;
    setHiddenCells(prev => {
      const next = new Set(prev);
      if (next.has(pgn)) {
        next.delete(pgn);
      } else {
        next.add(pgn);
      }
      return next;
    });
  };

  // Hide all cells for quiz practice
  const hideAllCells = () => {
    const allPgns = [...SINGULAR_PGNS, ...PLURAL_PGNS];
    setHiddenCells(new Set(allPgns));
  };

  // Show all cells
  const showAllCells = () => {
    setHiddenCells(new Set());
  };

  // Render a verb form cell
  const renderFormCell = (form: VerbForm | undefined, pgn: VerbPGN) => {
    if (!form) {
      return <span className="text-muted-foreground/50">—</span>;
    }

    const isHidden = hiddenCells.has(pgn);
    const isHovered = hoveredCell === pgn;

    return (
      <div
        className={cn(
          'py-2 px-1 cursor-pointer transition-all',
          isHovered && !isHidden && 'bg-primary/5 rounded',
          interactive && 'hover:bg-primary/10'
        )}
        onMouseEnter={() => setHoveredCell(pgn)}
        onMouseLeave={() => setHoveredCell(null)}
        onClick={() => {
          if (quizMode) {
            toggleCellVisibility(pgn);
          } else if (onFormClick) {
            onFormClick(form, pgn);
          }
        }}
      >
        {isHidden ? (
          <div className="flex items-center justify-center h-10">
            <div className="w-16 h-4 bg-muted rounded animate-pulse" />
          </div>
        ) : (
          <div className="space-y-0.5">
            <HebrewWord hebrew={form.hebrew} size="md" showAudio={false} />
            {showTransliteration && (
              <div className="text-[10px] text-muted-foreground font-mono">
                {form.transliteration}
              </div>
            )}
            {showTranslations && (
              <div className="text-[10px] text-blue-600 dark:text-blue-400 leading-tight">
                {form.translation}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Get current forms based on view
  const getCurrentForms = (): Record<VerbPGN, VerbForm> | Partial<Record<VerbPGN, VerbForm>> | null => {
    switch (view) {
      case 'perfect':
        return paradigm.perfect.forms;
      case 'imperfect':
        return paradigm.imperfect.forms;
      case 'imperative':
        return paradigm.imperative;
      default:
        return null;
    }
  };

  return (
    <div className={cn('rounded-xl border bg-card overflow-hidden', className)}>
      {/* Header */}
      <div className="px-4 py-3 border-b bg-gradient-to-r from-muted/50 to-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{paradigm.hebrewName}</h3>
              <span className="text-sm text-muted-foreground">({paradigm.name})</span>
            </div>
            <p className="text-sm text-muted-foreground">{paradigm.meaning}</p>
          </div>
          <div
            className={cn(
              'w-3 h-3 rounded-full',
              paradigm.color === 'blue' && 'bg-blue-500',
              paradigm.color === 'green' && 'bg-green-500',
              paradigm.color === 'purple' && 'bg-purple-500',
              paradigm.color === 'pink' && 'bg-pink-500',
              paradigm.color === 'orange' && 'bg-orange-500',
              paradigm.color === 'red' && 'bg-red-500',
              paradigm.color === 'teal' && 'bg-teal-500'
            )}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">{paradigm.characteristic}</p>
      </div>

      {/* View Tabs */}
      <div className="flex overflow-x-auto border-b bg-muted/20">
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={cn(
              'px-3 py-2 text-sm whitespace-nowrap transition-colors border-b-2',
              view === v.id
                ? 'border-primary text-primary bg-background'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      {interactive && (
        <div className="flex items-center gap-3 px-4 py-2 border-b bg-muted/10">
          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className={cn(
              'flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors',
              showTranslations
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'bg-muted hover:bg-muted/80'
            )}
          >
            {showTranslations ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            Translations
          </button>
          <button
            onClick={() => setShowTransliteration(!showTransliteration)}
            className={cn(
              'flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors',
              showTransliteration
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-muted hover:bg-muted/80'
            )}
          >
            Romanization
          </button>
          {quizMode && (
            <>
              <div className="flex-1" />
              <button
                onClick={hideAllCells}
                className="text-xs px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
              >
                Hide All
              </button>
              <button
                onClick={showAllCells}
                className="text-xs px-2 py-1 rounded bg-muted hover:bg-muted/80"
              >
                Show All
              </button>
            </>
          )}
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        {(view === 'perfect' || view === 'imperfect') && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-3 py-2 text-left font-medium text-muted-foreground w-28">Person</th>
                <th className="px-3 py-2 text-center font-medium text-muted-foreground">Singular</th>
                <th className="px-3 py-2 text-center font-medium text-muted-foreground">Plural</th>
              </tr>
            </thead>
            <tbody>
              {/* 3rd Person */}
              <tr className="border-b">
                <td className="px-3 py-1 text-xs text-muted-foreground">3rd Masculine</td>
                <td className="text-center">
                  {renderFormCell(getCurrentForms()?.['3ms'], '3ms')}
                </td>
                <td className="text-center" rowSpan={2}>
                  {renderFormCell(getCurrentForms()?.['3cp'], '3cp')}
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-3 py-1 text-xs text-muted-foreground">3rd Feminine</td>
                <td className="text-center">
                  {renderFormCell(getCurrentForms()?.['3fs'], '3fs')}
                </td>
              </tr>

              {/* 2nd Person */}
              <tr className="border-b bg-muted/10">
                <td className="px-3 py-1 text-xs text-muted-foreground">2nd Masculine</td>
                <td className="text-center">
                  {renderFormCell(getCurrentForms()?.['2ms'], '2ms')}
                </td>
                <td className="text-center">
                  {renderFormCell(getCurrentForms()?.['2mp'], '2mp')}
                </td>
              </tr>
              <tr className="border-b bg-muted/10">
                <td className="px-3 py-1 text-xs text-muted-foreground">2nd Feminine</td>
                <td className="text-center">
                  {renderFormCell(getCurrentForms()?.['2fs'], '2fs')}
                </td>
                <td className="text-center">
                  {renderFormCell(getCurrentForms()?.['2fp'], '2fp')}
                </td>
              </tr>

              {/* 1st Person */}
              <tr>
                <td className="px-3 py-1 text-xs text-muted-foreground">1st Common</td>
                <td className="text-center">
                  {renderFormCell(getCurrentForms()?.['1cs'], '1cs')}
                </td>
                <td className="text-center">
                  {renderFormCell(getCurrentForms()?.['1cp'], '1cp')}
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {view === 'imperative' && (
          <div className="p-4">
            {Object.keys(paradigm.imperative).length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                The {paradigm.name} binyan has no imperative forms (passive voice).
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="px-3 py-2 text-left font-medium text-muted-foreground">Form</th>
                    <th className="px-3 py-2 text-center font-medium text-muted-foreground">Hebrew</th>
                  </tr>
                </thead>
                <tbody>
                  {IMPERATIVE_PGNS.map((pgn) => {
                    const form = paradigm.imperative[pgn];
                    if (!form) return null;
                    return (
                      <tr key={pgn} className="border-b last:border-0">
                        <td className="px-3 py-2 text-xs text-muted-foreground">
                          {PGN_LABELS[pgn]}
                        </td>
                        <td className="text-center">
                          {renderFormCell(form, pgn)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {view === 'infinitive' && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-2">Infinitive Construct</p>
                <HebrewWord hebrew={paradigm.infinitiveConstruct.hebrew} size="lg" showAudio={false} />
                {showTransliteration && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {paradigm.infinitiveConstruct.transliteration}
                  </p>
                )}
                {showTranslations && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    {paradigm.infinitiveConstruct.translation}
                  </p>
                )}
              </div>
              <div className="p-4 bg-muted/30 rounded-lg text-center">
                <p className="text-xs text-muted-foreground mb-2">Infinitive Absolute</p>
                <HebrewWord hebrew={paradigm.infinitiveAbsolute.hebrew} size="lg" showAudio={false} />
                {showTransliteration && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {paradigm.infinitiveAbsolute.transliteration}
                  </p>
                )}
                {showTranslations && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    {paradigm.infinitiveAbsolute.translation}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {view === 'participle' && (
          <div className="p-4 space-y-4">
            {paradigm.participleActive && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Active Participle</p>
                <div className="grid grid-cols-4 gap-2">
                  {(['ms', 'fs', 'mp', 'fp'] as const).map((form) => (
                    <div key={form} className="p-3 bg-muted/30 rounded-lg text-center">
                      <p className="text-[10px] text-muted-foreground mb-1">
                        {form === 'ms' ? 'Masc. Sing.' :
                         form === 'fs' ? 'Fem. Sing.' :
                         form === 'mp' ? 'Masc. Pl.' : 'Fem. Pl.'}
                      </p>
                      <HebrewWord hebrew={paradigm.participleActive![form].hebrew} size="md" showAudio={false} />
                      {showTranslations && (
                        <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-1 leading-tight">
                          {paradigm.participleActive![form].translation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {paradigm.participlePassive && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Passive Participle</p>
                <div className="grid grid-cols-4 gap-2">
                  {(['ms', 'fs', 'mp', 'fp'] as const).map((form) => (
                    <div key={form} className="p-3 bg-muted/30 rounded-lg text-center">
                      <p className="text-[10px] text-muted-foreground mb-1">
                        {form === 'ms' ? 'Masc. Sing.' :
                         form === 'fs' ? 'Fem. Sing.' :
                         form === 'mp' ? 'Masc. Pl.' : 'Fem. Pl.'}
                      </p>
                      <HebrewWord hebrew={paradigm.participlePassive![form].hebrew} size="md" showAudio={false} />
                      {showTranslations && (
                        <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-1 leading-tight">
                          {paradigm.participlePassive![form].translation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!paradigm.participleActive && !paradigm.participlePassive && (
              <p className="text-center text-muted-foreground py-4">
                No participle forms available for this binyan.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Description Footer */}
      <div className="px-4 py-3 border-t bg-muted/20">
        <p className="text-xs text-muted-foreground">{paradigm.description}</p>
      </div>
    </div>
  );
}

// ============================================
// BINYAN COMPARISON TABLE
// ============================================

interface BinyanComparisonTableProps {
  paradigms: BinyanParadigm[];
  conjugation: 'perfect' | 'imperfect';
  pgn: VerbPGN;
  className?: string;
}

/**
 * Compare the same form across multiple binyanim.
 */
export function BinyanComparisonTable({
  paradigms,
  conjugation,
  pgn,
  className,
}: BinyanComparisonTableProps) {
  return (
    <div className={cn('rounded-xl border bg-card overflow-hidden', className)}>
      <div className="px-4 py-3 border-b bg-muted/50">
        <h3 className="font-semibold">
          {conjugation === 'perfect' ? 'Perfect' : 'Imperfect'} - {PGN_LABELS[pgn]}
        </h3>
        <p className="text-sm text-muted-foreground">
          Compare this form across all binyanim
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-3 py-2 text-left font-medium text-muted-foreground">Binyan</th>
              <th className="px-3 py-2 text-center font-medium text-muted-foreground">Hebrew</th>
              <th className="px-3 py-2 text-left font-medium text-muted-foreground">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {paradigms.map((p, idx) => {
              const table = conjugation === 'perfect' ? p.perfect : p.imperfect;
              const form = table.forms[pgn];

              return (
                <tr
                  key={p.name}
                  className={cn('border-b last:border-0', idx % 2 === 1 && 'bg-muted/10')}
                >
                  <td className="px-3 py-2">
                    <span className="font-medium">{p.hebrewName}</span>
                    <span className="text-xs text-muted-foreground ml-1">({p.name})</span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <HebrewWord hebrew={form.hebrew} size="md" showAudio={false} />
                  </td>
                  <td className="px-3 py-2 text-sm text-muted-foreground">
                    {form.translation}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
