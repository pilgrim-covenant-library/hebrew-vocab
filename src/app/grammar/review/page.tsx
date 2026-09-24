'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronRight, GraduationCap, FileText, Lock, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { EXTENDED_HOMEWORK_ORDER, EXTENDED_HOMEWORKS } from '@/data/homework/extended-registry';

export default function ReviewHubPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/grammar">
            <Button variant="ghost" size="icon" aria-label="Back to grammar">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Grammar Review</h1>
            <p className="text-xs text-muted-foreground">Year-end mastery practice</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 mb-4">
            <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Year-1 Hebrew Mastery</h2>
          <p className="text-xs font-medium text-primary mb-2">
            Aligned with <em>Basics of Biblical Hebrew</em> (Pratico/Van Pelt), Chapters 1–35
          </p>
          <p className="text-muted-foreground max-w-md mx-auto">
            Comprehensive review of all BBH chapters: alphabet &amp; syllabification (1–3), nouns, article &amp; prepositions (4–6), adjectives (7), pronouns (8), pronominal suffixes (9, 19), construct chain (10), numbers (11), the Qal verb (12–18), infinitives &amp; participles (20–22), syntax (23), Niphal, Hiphil &amp; Hophal (24–29), and Piel, Pual &amp; Hithpael (30–35). Anchored in Genesis 1:1–5.
          </p>
        </div>

        <section className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Homework Sets</h3>
          <Card>
            <CardContent className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Link href="/homework/hw1">
                  <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors group cursor-pointer">
                    <div className="flex items-center gap-2 min-w-0">
                      <ClipboardList className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-sm font-medium truncate">HW1</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  </div>
                </Link>
                {EXTENDED_HOMEWORK_ORDER.map((id) => {
                  const meta = EXTENDED_HOMEWORKS[id];
                  return (
                    <Link key={id} href={`/homework/${id}`}>
                      <div className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-2 min-w-0">
                          <ClipboardList className="w-4 h-4 text-amber-500 shrink-0" />
                          <span className="text-sm font-medium truncate">{meta.shortTitle}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Wrap-up Assessments</h3>

          <Link href="/grammar/review/practice-paper">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer group border-violet-500/30 border-dashed">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-violet-500/20 bg-violet-500/10 shrink-0">
                    <FileText className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">Practice Paper</h3>
                        <p className="text-xs font-medium text-violet-600 dark:text-violet-400">Chapters 1–35 — Guided Practice</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      60 grammar MCQ + 35 vocab MCQ + 5 verse analysis (100 questions) with immediate feedback and explanations across Chapters 1–35.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/grammar/review/final-exam">
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer group border-violet-500/30 border-dashed">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl border border-violet-500/20 bg-violet-500/10 shrink-0">
                    <Lock className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">Final Exam</h3>
                        <p className="text-xs font-medium text-violet-600 dark:text-violet-400">Chapters 1–35 — Name &amp; Code Required</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Full exam mode with 2-hour timer, no immediate answer reveal, and an end-of-test summary.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </section>

        <div className="mt-8 p-4 rounded-xl bg-muted/50 border">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            How to Use
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            <li><strong>HW1–HW9</strong> — Independent drilling, one topic at a time. Mastery first.</li>
            <li><strong>Practice Paper</strong> — Guided review with explanations. 85 questions across Chapters 1–35.</li>
            <li><strong>Final Exam</strong> — Same format with 17 final-exam-only items, 2-hour timer, no reveal until submission.</li>
            <li>Aim for 80%+ on the Practice Paper before attempting the Final Exam.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
