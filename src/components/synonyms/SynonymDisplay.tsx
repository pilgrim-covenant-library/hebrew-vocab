'use client';

import {
  BookOpen,
  Quote,
  BookText,
  Lightbulb,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import type { HebrewSynonymGroup } from '@/types';

interface SynonymDisplayProps {
  group: HebrewSynonymGroup;
  className?: string;
}

export function SynonymDisplay({ group, className }: SynonymDisplayProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Introduction */}
      <Card>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-muted text-muted-foreground shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Introduction</h3>
              <p className="text-muted-foreground leading-relaxed">
                {group.introduction}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Word Comparison Table */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Word Comparison
        </h3>
        <div className="overflow-x-auto">
          <div className="grid gap-4 min-w-max" style={{ gridTemplateColumns: `repeat(${Math.min(group.words.length, 4)}, minmax(180px, 1fr))` }}>
            {group.words.map((word, index) => (
              <Card key={index} className="border-t-4 border-t-primary/50">
                <CardContent className="p-4">
                  {/* Hebrew */}
                  <div className="text-center mb-3">
                    <p className="font-hebrew text-2xl text-foreground" dir="rtl">
                      {word.hebrew}
                    </p>
                    <p className="text-sm text-muted-foreground">{word.transliteration}</p>
                    <p className="text-xs text-muted-foreground font-mono">{word.strongs}</p>
                  </div>

                  {/* Root */}
                  <div className="text-center mb-3 py-2 bg-muted/50 rounded">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Root</p>
                    <p className="font-hebrew text-lg" dir="rtl">{word.root}</p>
                  </div>

                  {/* Short Definition */}
                  <p className="text-sm text-muted-foreground text-center mb-3">
                    {word.shortDef}
                  </p>

                  {/* Key Nuance */}
                  <div className="bg-primary/5 rounded-lg p-3">
                    <p className="text-xs text-primary font-medium uppercase tracking-wide mb-1">
                      Key Nuance
                    </p>
                    <p className="text-sm text-foreground">{word.nuance}</p>
                  </div>

                  {/* Usage Count */}
                  <div className="mt-3 text-center">
                    <span className="text-xs text-muted-foreground">
                      {word.otUsage} occurrences in OT
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Scholar Quote */}
      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
              <Quote className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Scholar's Insight</h3>
              <blockquote className="text-muted-foreground leading-relaxed italic border-l-2 border-muted pl-4">
                {group.scholarQuote}
              </blockquote>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Verse */}
      <Card className="border-l-4 border-l-emerald-500">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <BookText className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                Example: {group.exampleVerse.reference}
              </h3>
              <p className="font-hebrew text-lg text-foreground mb-2" dir="rtl">
                {group.exampleVerse.hebrew}
              </p>
              <p className="text-muted-foreground mb-2">
                {group.exampleVerse.english}
              </p>
              <p className="text-sm bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-3 py-2 rounded">
                <span className="font-medium">Word highlighted:</span>{' '}
                <span className="font-hebrew" dir="rtl">{group.exampleVerse.wordHighlighted}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Practical Tip */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Memory Tip</h3>
              <p className="text-muted-foreground leading-relaxed">
                {group.practicalTip}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Source Attribution */}
      <p className="text-sm text-muted-foreground text-center">
        Based on standard Hebrew lexicons including{' '}
        <span className="font-medium text-foreground">BDB</span>,{' '}
        <span className="font-medium text-foreground">HALOT</span>, and{' '}
        <span className="font-medium text-foreground">TDOT</span>
      </p>
    </div>
  );
}
