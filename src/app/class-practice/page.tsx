'use client';

import Link from 'next/link';
import { ArrowLeft, ChevronRight, ClipboardList, GraduationCap, ListChecks, FileText } from 'lucide-react';
import type { ElementType } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface ClassPracticeCardProps {
  title: string;
  description: string;
  icon: ElementType;
  href: string;
  color: string;
}

function ClassPracticeCard({ title, description, icon: Icon, href, color }: ClassPracticeCardProps) {
  const colorClasses: Record<string, string> = {
    cyan: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
    amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
    purple: 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
  };

  return (
    <Link href={href}>
      <Card className="hover:bg-muted/50 transition-colors cursor-pointer group h-full">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className={cn('p-3 rounded-xl shrink-0', colorClasses[color] || colorClasses.cyan)}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-lg">{title}</h3>
                <ChevronRight className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ClassPracticePage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" aria-label="Back to dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Class Practice and Homework</h1>
            <p className="text-xs text-muted-foreground">MasterLectures Sessions 1–29</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 mb-4">
            <GraduationCap className="w-8 h-8 text-cyan-700 dark:text-cyan-300" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Class Practice and Homework</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Practice each completed class, then reinforce it with the matching homework assignment.
          </p>
        </div>

        <div className="space-y-4">
          <ClassPracticeCard
            title="Class 1 MCQ"
            description="Identify Hebrew letters and read common Old Testament words"
            icon={ListChecks}
            href="/class-practice/class-1-mcq"
            color="cyan"
          />

          <ClassPracticeCard
            title="Homework 1"
            description="One complete MCQ assignment covering letters, word transliteration, and meanings"
            icon={ClipboardList}
            href="/homework/hw1"
            color="amber"
          />

          <ClassPracticeCard
            title="Class 2 MCQ"
            description="Practice syllabification and identify Hebrew noun forms from Sessions 3–4"
            icon={ListChecks}
            href="/class-practice/class-2-mcq"
            color="cyan"
          />

          <ClassPracticeCard
            title="Homework 2"
            description="40-point MCQ assignment on syllabification, Hebrew nouns, and noun reading"
            icon={ClipboardList}
            href="/homework/hw2"
            color="amber"
          />

          <ClassPracticeCard
            title="Class 3 MCQ"
            description="Practice the definite article, conjunction waw, prepositions, and adjectives from Chapters 5–7"
            icon={ListChecks}
            href="/class-practice/class-3-mcq"
            color="cyan"
          />

          <ClassPracticeCard
            title="Homework 3"
            description="MCQ assignment on the article, prepositions, adjectives, new vocabulary, and a Chapter 1–4 review"
            icon={ClipboardList}
            href="/homework/hw3"
            color="amber"
          />

          <ClassPracticeCard
            title="Class 4 MCQ"
            description="Recall and translate pronouns, suffixes, and construct chains from Chapters 8–10 inside words, clauses, and passages"
            icon={ListChecks}
            href="/class-practice/class-4-mcq"
            color="cyan"
          />

          <ClassPracticeCard
            title="Homework 4"
            description="MCQ assignment on pronouns, suffixes, the construct chain, new vocabulary, and verse translation"
            icon={ClipboardList}
            href="/homework/hw4"
            color="amber"
          />

          <ClassPracticeCard
            title="Class 5 MCQ"
            description="Drill Hebrew numbers, the verb system (roots, stems, conjugations), and the Qal Perfect of strong verbs from Chapters 11–13 inside words, clauses, and passages"
            icon={ListChecks}
            href="/class-practice/class-5-mcq"
            color="cyan"
          />

          <ClassPracticeCard
            title="Homework 5"
            description="MCQ assignment on numbers, the introduction to Hebrew verbs, the Qal Perfect, new vocabulary, and verse translation"
            icon={ClipboardList}
            href="/homework/hw5"
            color="amber"
          />

          <ClassPracticeCard
            title="Class 6 MCQ"
            description="Read the Qal Perfect of weak verbs and the Qal Imperfect of strong and weak verbs from Chapters 14–16 inside words, clauses, and passages"
            icon={ListChecks}
            href="/class-practice/class-6-mcq"
            color="cyan"
          />

          <ClassPracticeCard
            title="Homework 6"
            description="MCQ assignment on weak Perfect verbs, the Qal Imperfect (strong and weak), new vocabulary, and verse translation"
            icon={ClipboardList}
            href="/homework/hw6"
            color="amber"
          />

          <ClassPracticeCard
            title="Class 7 MCQ"
            description="Read the Waw Consecutive, the Qal Imperative, and pronominal suffixes on verbs from Chapters 17–19 inside words, clauses, and passages"
            icon={ListChecks}
            href="/class-practice/class-7-mcq"
            color="cyan"
          />

          <ClassPracticeCard
            title="Homework 7"
            description="MCQ assignment on the Waw Consecutive, the Qal Imperative, pronominal suffixes on verbs, new vocabulary, and verse translation"
            icon={ClipboardList}
            href="/homework/hw7"
            color="amber"
          />

          <ClassPracticeCard
            title="Class 8 MCQ"
            description="Read the Infinitive Construct, Infinitive Absolute, and Qal Participle from Chapters 20–22 inside words, clauses, and passages"
            icon={ListChecks}
            href="/class-practice/class-8-mcq"
            color="cyan"
          />

          <ClassPracticeCard
            title="Homework 8"
            description="MCQ assignment on the Infinitive Construct, Infinitive Absolute, Qal Participle, new vocabulary, and verse translation"
            icon={ClipboardList}
            href="/homework/hw8"
            color="amber"
          />

          <ClassPracticeCard
            title="Class 9 MCQ"
            description="Read Hebrew sentence syntax and the Niphal stem in strong and weak verbs from Chapters 23–25 inside words, clauses, and passages"
            icon={ListChecks}
            href="/class-practice/class-9-mcq"
            color="cyan"
          />

          <ClassPracticeCard
            title="Homework 9"
            description="MCQ assignment on sentence syntax, Niphal strong and weak verbs, new vocabulary, and verse translation"
            icon={ClipboardList}
            href="/homework/hw9"
            color="amber"
          />

          <ClassPracticeCard
            title="Class 10 MCQ"
            description="Read the causative Hiphil and its passive the Hophal from Chapters 26–29, plus the strong Piel (Ch 30) and strong Pual (Ch 32), inside words, clauses, and passages"
            icon={ListChecks}
            href="/class-practice/class-10-mcq"
            color="cyan"
          />

          <ClassPracticeCard
            title="Homework 10"
            description="MCQ assignment on the Hiphil and Hophal stems, the strong Piel and Pual, new vocabulary, and verse translation"
            icon={ClipboardList}
            href="/homework/hw10"
            color="amber"
          />

          <ClassPracticeCard
            title="Practice Paper"
            description="Comprehensive guided review covering Chapters 1–35 with 40 grammar MCQ, 40 vocab MCQ, and 5 verse analyses"
            icon={FileText}
            href="/grammar/review/practice-paper"
            color="purple"
          />
        </div>
      </main>
    </div>
  );
}
