'use client';

import {
  BookOpen,
  ScrollText,
  Library,
  BookText,
  Lightbulb,
  Link2,
  Globe,
  GitBranch,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import type { TDOTEntry } from '@/types';

interface TDOTDisplayProps {
  entry: TDOTEntry;
  className?: string;
}

export function TDOTDisplay({ entry, className }: TDOTDisplayProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Summary */}
      <Card>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-muted text-muted-foreground shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">
                {entry.summary}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ancient Near East Context */}
      <Card className="border-l-4 border-l-slate-500">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Ancient Near Eastern Context</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {entry.ancientContext}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Root Analysis */}
      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
              <GitBranch className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                Root Analysis
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {entry.rootAnalysis}
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

      {/* Theological Significance */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                Theological Significance
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {entry.theologicalSignificance}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* New Testament Connection (if available) */}
      {entry.ntConnection && (
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                <BookText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">
                  New Testament Connection
                </h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {entry.ntConnection}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
        Source: <span className="font-medium text-foreground">Botterweck, Ringgren & Fabry</span>,{' '}
        <em>Theological Dictionary of the Old Testament</em>
        {entry.tdotVolume && <span> (Vol. {entry.tdotVolume})</span>}
        {entry.pages && <span>, pp. {entry.pages}</span>}
      </p>
    </div>
  );
}
