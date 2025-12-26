'use client';

import {
  BookOpen,
  ScrollText,
  Lightbulb,
  Link2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import type { VineOTEntry } from '@/types';

interface VineDisplayProps {
  entry: VineOTEntry;
  className?: string;
}

export function VineDisplay({ entry, className }: VineDisplayProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Etymology */}
      <Card>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-muted text-muted-foreground shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Etymology</h3>
              <p className="text-muted-foreground leading-relaxed">
                {entry.etymology}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Old Testament Usage */}
      <Card className="border-l-4 border-l-emerald-500">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
              <ScrollText className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                Old Testament Usage
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {entry.otUsage}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Passages */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-foreground">Key Passages</h3>
        {entry.keyPassages.map((passage, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-2">
                {passage.reference}
              </h4>
              <p className="font-hebrew text-lg text-foreground mb-2" dir="rtl">
                {passage.hebrew}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {passage.significance}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Theological Note */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                Theological Note
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {entry.theologicalNote}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Words (if available) */}
      {entry.relatedWords && entry.relatedWords.length > 0 && (
        <Card>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-muted text-muted-foreground shrink-0">
                <Link2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-3">Related Words</h3>
                <div className="space-y-3">
                  {entry.relatedWords.map((related, index) => (
                    <div key={index} className="flex flex-wrap items-baseline gap-2">
                      <span className="font-hebrew text-lg text-foreground" dir="rtl">
                        {related.hebrew}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({related.transliteration})
                      </span>
                      <span className="text-sm text-muted-foreground">
                        — {related.relationship}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Source Attribution */}
      <p className="text-sm text-muted-foreground text-center">
        Source: <span className="font-medium text-foreground">Vine, Unger & White</span>,{' '}
        <em>Vine's Complete Expository Dictionary</em>
        {entry.vineRef && <span> ({entry.vineRef})</span>}
      </p>
    </div>
  );
}
