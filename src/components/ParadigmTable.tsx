'use client';

import { cn } from '@/lib/utils';
import { HebrewWord } from './HebrewWord';

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
