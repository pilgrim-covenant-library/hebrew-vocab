'use client';

import Link from 'next/link';
import { ArrowLeft, Search, Table2, Dumbbell, BookOpen, ChevronRight, ClipboardList, GraduationCap, ListChecks, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface GrammarModeCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

function GrammarModeCard({ title, description, icon: Icon, href, color }: GrammarModeCardProps) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  };

  return (
    <Link href={href}>
      <Card className="hover:bg-muted/50 transition-colors cursor-pointer group h-full">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className={cn('p-3 rounded-xl', colorClasses[color] || colorClasses.blue)}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{title}</h3>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface CurriculumWeek {
  week: number;
  sessions: string;
  title: string;
  topics: string[];
  practiceHref?: string;
  homeworkHref?: string;
}

const CURRICULUM_WEEKS: CurriculumWeek[] = [
  {
    week: 1,
    sessions: 'MasterLectures Sessions 1–2',
    title: 'Alphabet and Hebrew Vowels',
    topics: ['22 letters + final forms', 'Pointed-word reading', 'Introductory vocabulary'],
    practiceHref: '/class-practice/class-1-mcq',
    homeworkHref: '/homework/hw1',
  },
  {
    week: 2,
    sessions: 'MasterLectures Sessions 3–4',
    title: 'Syllabification and Hebrew Nouns',
    topics: ['Open/closed syllables', 'Shewa and dagesh', 'Gender and number', 'Irregular plurals'],
    practiceHref: '/class-practice/class-2-mcq',
    homeworkHref: '/homework/hw2',
  },
  {
    week: 3,
    sessions: 'Sessions 5–6',
    title: 'Article, Conjunction Waw, and Prepositions',
    topics: ['Definite article', 'Conjunction waw', 'Inseparable prepositions'],
  },
  {
    week: 4,
    sessions: 'Sessions 7–8',
    title: 'Adjectives and Pronouns',
    topics: ['Adjective agreement', 'Attributive/predicative use', 'Personal and demonstrative pronouns'],
  },
  {
    week: 5,
    sessions: 'Sessions 9–10',
    title: 'Noun Suffixes and Construct Chains',
    topics: ['Pronominal suffixes on nouns', 'Construct forms', 'Definiteness in chains'],
  },
  {
    week: 6,
    sessions: 'Sessions 11–12',
    title: 'Hebrew Numbers and Introduction to Verbs',
    topics: ['Cardinal/ordinal numbers', 'Roots and stems', 'Verb parsing framework'],
  },
  {
    week: 7,
    sessions: 'Sessions 13–14',
    title: 'Qal Perfect: Strong and Weak',
    topics: ['Perfect suffixes', 'Strong-verb paradigm', 'Weak-verb recognition'],
  },
  {
    week: 8,
    sessions: 'Sessions 15–17',
    title: 'Qal Imperfect and Waw Consecutive',
    topics: ['Imperfect prefixes', 'Strong/weak forms', 'Narrative sequencing'],
  },
  {
    week: 9,
    sessions: 'Sessions 18–20',
    title: 'Imperative, Verbal Suffixes, and Infinitive Construct',
    topics: ['Qal imperative', 'Object suffixes', 'Infinitive construct'],
  },
  {
    week: 10,
    sessions: 'Sessions 21–23',
    title: 'Infinitive Absolute, Participles, and Syntax',
    topics: ['Emphatic infinitive', 'Active/passive participles', 'Sentence structure'],
  },
  {
    week: 11,
    sessions: 'Sessions 24–26',
    title: 'Niphal and Hiphil Strong',
    topics: ['Niphal strong/weak', 'Hiphil strong', 'Stem diagnostics'],
  },
  {
    week: 12,
    sessions: 'Sessions 27–29',
    title: 'Hiphil Weak and Hophal',
    topics: ['Hiphil weak', 'Hophal strong/weak', 'Causative relationships'],
  },
  {
    week: 13,
    sessions: 'Sessions 30–32',
    title: 'Piel and Pual Strong',
    topics: ['Piel strong/weak', 'Pual strong', 'Intensive/factitive patterns'],
  },
  {
    week: 14,
    sessions: 'Sessions 33–35',
    title: 'Pual Weak and Hithpael',
    topics: ['Pual weak', 'Hithpael strong/weak', 'Reflexive patterns'],
  },
  {
    week: 15,
    sessions: 'Session 36',
    title: 'Introduction to the Hebrew Bible',
    topics: ['Hebrew Bible layout', 'Reading tools', 'Guided text reading'],
  },
  {
    week: 16,
    sessions: 'Cumulative Review',
    title: 'Comprehensive Review and Final Assessment',
    topics: ['Cumulative vocabulary', 'Morphology review', 'Guided translation'],
  },
];

function WeekCard({ week }: { week: CurriculumWeek }) {
  const isAvailable = Boolean(week.practiceHref && week.homeworkHref);
  return (
    <Card className={!isAvailable ? 'opacity-75' : undefined}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4 mb-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl border bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-lg shrink-0">
            {week.week}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight">{week.title}</h3>
            <p className="text-xs font-medium text-purple-600 dark:text-purple-400">{week.sessions}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {week.topics.map((topic) => (
            <span key={topic} className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
              {topic}
            </span>
          ))}
        </div>

        {isAvailable ? (
          <div className="grid grid-cols-2 gap-2">
            <Link href={week.practiceHref!}>
              <div className="flex items-center justify-between p-2.5 rounded-lg border hover:bg-muted/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-2 min-w-0">
                  <ListChecks className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span className="text-sm font-medium truncate">Class Practice</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              </div>
            </Link>
            <Link href={week.homeworkHref!}>
              <div className="flex items-center justify-between p-2.5 rounded-lg border hover:bg-muted/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-2 min-w-0">
                  <ClipboardList className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-sm font-medium truncate">Homework</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-dashed px-3 py-2.5 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            Coming soon
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function GrammarPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" aria-label="Back to dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold">Grammar</h1>
            <p className="text-xs text-muted-foreground">Aligned with <em>Basics of Biblical Hebrew</em> (Pratico/Van Pelt)</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Intro */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 mb-4">
            <GraduationCap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Year-1 Hebrew Curriculum</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sixteen accelerated weeks following the 36 <em>Basics of Biblical Hebrew</em> MasterLectures sessions.
            Weeks 1–2 are ready now; later lessons will unlock as their practice and homework are completed.
          </p>
        </div>

        {/* Weekly Curriculum */}
        <section className="mb-10">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Weekly Curriculum
          </h3>
          <div className="space-y-4">
            {CURRICULUM_WEEKS.map((week) => (
              <WeekCard key={week.week} week={week} />
            ))}
          </div>
        </section>

        {/* Grammar tools */}
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Grammar Tools
          </h3>
          <div className="space-y-4">
            <GrammarModeCard
              title="Word Parser"
              description="Look up any Hebrew word and see its full morphological breakdown"
              icon={Search}
              href="/grammar/parser"
              color="blue"
            />

            <GrammarModeCard
              title="Paradigm Tables"
              description="Study noun declensions, verb conjugations, and pronoun forms"
              icon={Table2}
              href="/grammar/tables"
              color="purple"
            />

            <GrammarModeCard
              title="Practice Parsing"
              description="Test your ability to identify cases, tenses, moods, and more"
              icon={Dumbbell}
              href="/grammar/practice"
              color="emerald"
            />
          </div>
        </section>

        {/* Quick reference */}
        <div className="mt-8 p-4 rounded-xl bg-muted/50 border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Quick Reference
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-muted-foreground mb-1">7 Binyanim</p>
              <p>Qal, Niphal, Piel, Pual, Hiphil, Hophal, Hithpael</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground mb-1">Conjugations</p>
              <p>Perfect, Imperfect, Imperative, Infinitive, Participle</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground mb-1">Noun States</p>
              <p>Absolute, Construct</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground mb-1">Gender &amp; Number</p>
              <p>Masculine/Feminine, Singular/Plural/Dual</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
