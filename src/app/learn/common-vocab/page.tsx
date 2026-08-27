'use client';

import Link from 'next/link';
import { ArrowLeft, ListOrdered, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  COMMON_VOCAB_SECTIONS,
  COMMON_VOCAB_WORDS,
  getCumulativeFrequencyCoverage,
} from '@/lib/commonVocab';

export default function CommonVocabPage() {
  const totalCoverage = getCumulativeFrequencyCoverage(COMMON_VOCAB_SECTIONS.length);

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-start gap-3 mb-6">
          <ListOrdered className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
          <div>
            <h1 className="text-3xl font-bold">Top {COMMON_VOCAB_WORDS.length} OT Vocabulary</h1>
            <p className="text-muted-foreground mt-1">
              The {COMMON_VOCAB_WORDS.length} most-frequent Hebrew words in the Old Testament.
              Mastering these alone gets you ~{totalCoverage}% of the text by occurrence.
            </p>
          </div>
        </div>

        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div className="space-y-2 text-sm">
                <p className="font-medium">Why frequency-first vocabulary matters</p>
                <p className="text-muted-foreground">
                  About 80% of the Hebrew Bible is written using the top 500 most-frequent words.
                  Mastering this list dramatically accelerates your reading. Each section contains
                  30 words, organized by descending frequency.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2">
          {COMMON_VOCAB_SECTIONS.map((section) => {
            const coverage = getCumulativeFrequencyCoverage(section.id);
            return (
              <Link key={section.id} href={`/learn/common-vocab/section/${section.id}`}>
                <Card className="h-full hover:border-primary transition-colors cursor-pointer">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription className="text-xs">{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Cumulative coverage: <span className="font-medium text-foreground tabular-nums">~{coverage}%</span>
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
