'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  Loader2,
  Lock,
  RotateCcw,
  ShieldAlert,
  ThumbsUp,
  Trophy,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { HebrewWord } from '@/components/HebrewWord';
import { cn } from '@/lib/utils';
import { EXAM_TITLE, formatScore, isFinalExamAccessCode, type ExamSummary } from '@/lib/finalExam';
import type { PracticeMCQ, PracticeVerseAnalysis } from '@/data/review/class13FinalExam';

// The final exam's screens: access gate, instructions, results and the question views.

export type EmailStatus = 'sending' | 'sent' | 'failed';

export function Gate({
  onUnlock,
}: {
  onUnlock: (studentName: string) => void;
}) {
  const [step, setStep] = useState<'code' | 'name'>('code');
  const [accessCode, setAccessCode] = useState('');
  const [studentName, setStudentName] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleCodeSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isFinalExamAccessCode(accessCode)) {
      setStep('name');
      setCodeError(false);
      return;
    }
    setCodeError(true);
    setAccessCode('');
  };

  const handleNameSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = studentName.trim();
    if (trimmed.length < 2) {
      setNameError(true);
      return;
    }
    onUnlock(trimmed);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
            {step === 'code' ? (
              <Lock className="w-8 h-8 text-primary" />
            ) : (
              <GraduationCap className="w-8 h-8 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl">{EXAM_TITLE}</CardTitle>
          <CardDescription>
            {step === 'code'
              ? 'Enter the access code to begin the exam.'
              : 'Enter your full name as it should appear on the submission.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'code' ? (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(event) => {
                    setAccessCode(event.target.value);
                    setCodeError(false);
                  }}
                  placeholder="Enter access code..."
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border bg-background text-center text-lg tracking-widest',
                    'focus:outline-none focus:ring-2 focus:ring-primary',
                    codeError && 'border-red-500 focus:ring-red-500',
                  )}
                  autoFocus
                />
                {codeError && (
                  <p className="text-sm text-red-500 text-center mt-2">
                    Incorrect access code. Please try again.
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full gap-2" size="lg">
                <Lock className="w-4 h-4" />
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={studentName}
                  onChange={(event) => {
                    setStudentName(event.target.value);
                    setNameError(false);
                  }}
                  placeholder="Your full name..."
                  className={cn(
                    'w-full px-4 py-3 rounded-lg border bg-background text-center text-lg',
                    'focus:outline-none focus:ring-2 focus:ring-primary',
                    nameError && 'border-red-500 focus:ring-red-500',
                  )}
                  autoFocus
                />
                {nameError && (
                  <p className="text-sm text-red-500 text-center mt-2">
                    Please enter your full name (at least 2 characters).
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full gap-2" size="lg">
                <ArrowRight className="w-4 h-4" />
                Begin Exam
              </Button>
            </form>
          )}
          <div className="mt-6 text-center">
            <Link href="/grammar/review" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back to Review Hub
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Intro({
  onStart,
  onReset,
}: {
  onStart: () => void;
  onReset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/grammar/review" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Review Hub</span>
          </Link>
          <div className="flex items-center gap-2 text-primary">
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm font-medium">Final Exam</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/10 mb-2">
              <FileText className="w-8 h-8 text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">{EXAM_TITLE}</h2>
            <p className="text-muted-foreground">Comprehensive practice paper in exam mode (Chapters 1–35)</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exam Instructions</CardTitle>
              <CardDescription>
                No answer feedback is shown while you work. When you submit, your results are emailed to your instructor.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <Clock3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">85 questions, 2-hour limit</p>
                    <p className="text-sm text-muted-foreground">40 grammar MCQ + 40 vocabulary MCQ + 5 verse analysis items. The exam auto-submits when time expires.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Saved as you go</p>
                    <p className="text-sm text-muted-foreground">Every answer is saved on this device. If the page reloads or the tab closes, reopen the exam on the same device to continue where you left off.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Final exam variant</p>
                    <p className="text-sm text-muted-foreground">This uses the practice-paper format, with 14 final-exam-only questions, including three new verses (23 of the 100 marks).</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button size="lg" className="w-full gap-2" onClick={onStart}>
              <ChevronRight className="w-4 h-4" />
              Start Exam
            </Button>
            <Button size="lg" variant="outline" className="w-full gap-2" onClick={onReset}>
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export function Results({
  summary,
  emailStatus,
  timedOut,
  onRetryEmail,
  onReview,
  onRetake,
}: {
  summary: ExamSummary;
  emailStatus: EmailStatus;
  timedOut: boolean;
  onRetryEmail: () => void;
  onReview: () => void;
  onRetake: () => void;
}) {
  const gradeIcon = summary.percentage >= 80
    ? <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-3" />
    : summary.percentage >= 60
      ? <ThumbsUp className="w-16 h-16 text-blue-500 mx-auto mb-3" />
      : <Zap className="w-16 h-16 text-purple-500 mx-auto mb-3" />;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/grammar/review" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Review Hub</span>
          </Link>
          <div className="flex items-center gap-2 text-primary">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Exam Results</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            {gradeIcon}
            <h1 className="text-3xl font-bold">{EXAM_TITLE} Complete</h1>
            <p className="text-muted-foreground">
              {timedOut
                ? 'Time expired and your exam was submitted automatically. No per-question correctness is shown on this screen.'
                : 'Your score report has been compiled. No per-question correctness is shown on this screen.'}
            </p>
            <div className="space-y-2" role="status" aria-live="polite">
              {emailStatus === 'sending' && (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-muted-foreground">Sending results to your instructor...</span>
                </div>
              )}
              {emailStatus === 'sent' && (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground">Results emailed to your instructor</span>
                </div>
              )}
              {emailStatus === 'failed' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Your results have not reached your instructor yet. They are saved on this device.</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={onRetryEmail} className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Retry sending
                  </Button>
                  <p className="text-xs text-muted-foreground">If it keeps failing, screenshot this page and send it to your instructor.</p>
                </div>
              )}
            </div>
          </div>

          <Card className="overflow-hidden">
            <div className="h-2 bg-primary" />
            <CardContent className="pt-8 pb-6 text-center">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Your Grade</p>
                  <p className={cn('text-7xl font-bold', summary.grade.color)}>{summary.grade.label}</p>
                </div>

                <div className="flex items-center justify-center gap-8 py-4 border-y">
                  <div>
                    <p className="text-3xl font-bold">{formatScore(summary.totalScore)}</p>
                    <p className="text-sm text-muted-foreground">Score</p>
                  </div>
                  <div className="text-3xl text-muted-foreground">/</div>
                  <div>
                    <p className="text-3xl font-bold">{summary.totalPossible}</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                  <div className="text-3xl text-muted-foreground">=</div>
                  <div>
                    <p className="text-3xl font-bold text-primary">{summary.percentage}%</p>
                    <p className="text-sm text-muted-foreground">Percent</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Scores are based on grammar and vocabulary accuracy plus verse analysis matching and translation coverage.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Section Breakdown</CardTitle>
              <CardDescription>No per-question corrections are revealed here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Grammar Understanding</span>
                <span className="font-medium">{summary.grammarCorrect}/{summary.grammarTotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Vocabulary</span>
                <span className="font-medium">{summary.vocabCorrect}/{summary.vocabTotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Verse Analysis</span>
                <span className="font-medium">{formatScore(summary.verseAnalysisScore)}/{summary.verseAnalysisTotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold border-t pt-3">
                <span>Total</span>
                <span>{formatScore(summary.totalScore)}/{summary.totalPossible}</span>
              </div>
            </CardContent>
          </Card>

          <Button onClick={onReview} className="w-full gap-2" size="lg">
            <BookOpen className="w-4 h-4" />
            Review My Answers
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onRetake}
              disabled={emailStatus !== 'sent'}
              title={emailStatus === 'sent' ? undefined : 'Available once your results have been emailed'}
              className="flex-1 gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retake
            </Button>
            <Link href="/grammar/review" className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                Back to Review Hub
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export function MCQQuestion({
  question,
  selected,
  onSelect,
}: {
  question: PracticeMCQ;
  selected: number | undefined;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="py-5 text-center">
          <p className="text-base font-medium mb-3">{question.question}</p>
          {question.hebrew && <HebrewWord hebrew={question.hebrew} size="xl" />}
        </CardContent>
      </Card>

      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isSelected = selected === index;
          return (
            <button
              key={option}
              onClick={() => onSelect(index)}
              className={cn(
                'w-full p-4 rounded-xl border text-left transition-all',
                isSelected ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/50',
              )}
            >
              <span className="flex items-center gap-3">
                <span className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-medium border-2',
                  isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground/30',
                )}>
                  {index + 1}
                </span>
                <span className="flex-1">{option}</span>
              </span>
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        variant={selected === -1 ? 'default' : 'outline'}
        className="w-full gap-2"
        onClick={() => onSelect(-1)}
      >
        <ShieldAlert className="w-4 h-4" />
        I don&apos;t know
      </Button>
    </div>
  );
}

export function VerseAnalysisQuestion({
  question,
  matching,
  translation,
  onMatchingChange,
  onTranslationChange,
}: {
  question: PracticeVerseAnalysis;
  matching: Record<string, string>;
  translation: string;
  onMatchingChange: (hebrew: string, category: string) => void;
  onTranslationChange: (text: string) => void;
}) {
  const categoryOptions = useMemo(
    () => [...new Set([...question.matchingPairs.map((pair) => pair.category), ...question.distractorCategories])].sort(),
    [question],
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">{question.reference}</span>
        </div>
        <p className="text-2xl text-center leading-relaxed" dir="rtl" lang="he">{question.hebrew}</p>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold">Part A: Match each Hebrew word to its grammatical category</p>
        <div className="space-y-2">
          {question.matchingPairs.map((pair) => (
            <div key={pair.hebrew} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg border">
              <span className="text-lg shrink-0 min-w-[120px] font-medium" dir="rtl" lang="he">{pair.hebrew}</span>
              <span className="text-muted-foreground shrink-0">&rarr;</span>
              <select
                value={matching[pair.hebrew] || ''}
                onChange={(event) => onMatchingChange(pair.hebrew, event.target.value)}
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select category...</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t">
        <p className="text-sm font-semibold">Part B: Translate the verse into English</p>
        <textarea
          value={translation}
          onChange={(event) => onTranslationChange(event.target.value)}
          placeholder="Write your English translation..."
          rows={4}
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
        />
      </div>
    </div>
  );
}
