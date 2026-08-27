'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { ExamTimer } from '@/components/homework/ExamTimer';
import { cn, shuffle } from '@/lib/utils';
import { scoreTranslation } from '@/lib/translation';
import type { NTVerse, TranslationResult } from '@/types';
import {
  finalExamGrammarQuestions as grammarQuestions,
  finalExamVocabQuestions as vocabQuestions,
  finalExamVerseAnalysisQuestions as verseAnalysisQuestions,
  type PracticeMCQ,
  type PracticeVerseAnalysis,
} from '@/data/review/finalExamPaper';

const EXAM_TITLE = 'Grammar Review Final Exam';
const ACCESS_CODE = 'shalom';
const EXAM_DURATION_MS = 2 * 60 * 60 * 1000;

const GRADE_BANDS = [
  { min: 90, label: 'A', color: 'text-emerald-600 dark:text-emerald-400', desc: 'Excellent mastery' },
  { min: 80, label: 'B', color: 'text-blue-600 dark:text-blue-400', desc: 'Strong performance' },
  { min: 70, label: 'C', color: 'text-blue-500 dark:text-blue-400', desc: 'Solid understanding' },
  { min: 60, label: 'D', color: 'text-amber-600 dark:text-amber-400', desc: 'Needs more review' },
  { min: 0, label: 'F', color: 'text-red-600 dark:text-red-400', desc: 'Rework the material' },
];

function getGrade(pct: number) {
  return GRADE_BANDS.find((grade) => pct >= grade.min) ?? GRADE_BANDS[GRADE_BANDS.length - 1];
}

function formatScore(score: number) {
  return Number.isInteger(score) ? `${score}` : score.toFixed(1);
}

interface MCQAnswerDetail {
  questionId: string;
  question: string;
  options: string[];
  correctIndex: number;
  studentAnswer: number;
  isCorrect: boolean;
}

interface MCQSectionAnswers {
  sectionId: number;
  questions: MCQAnswerDetail[];
}

interface TranslationAnswer {
  questionId: string;
  reference: string;
  hebrew: string;
  referenceTranslation: string;
  studentTranslation: string;
  matchingPairs?: {
    hebrew: string;
    correctCategory: string;
    studentCategory: string;
  }[];
}

type ExamStep = 'gate' | 'intro' | 'exam' | 'results';
type ExamQuestion =
  | { type: 'mcq'; sectionId: 1 | 2; data: PracticeMCQ }
  | { type: 'va'; sectionId: 3; data: PracticeVerseAnalysis };

interface ExamSummary {
  grammarCorrect: number;
  vocabCorrect: number;
  grammarTotal: number;
  vocabTotal: number;
  verseAnalysisScore: number;
  verseAnalysisTotal: number;
  totalScore: number;
  totalPossible: number;
  percentage: number;
  grade: ReturnType<typeof getGrade>;
  mcqAnswers: MCQSectionAnswers[];
  translationAnswers: TranslationAnswer[];
  verseBreakdown: {
    questionId: string;
    reference: string;
    matchingCorrect: number;
    matchingTotal: number;
    matchingPoints: number;
    translationResult: TranslationResult;
    translationPoints: number;
    totalPoints: number;
  }[];
}

function buildVerse(verse: PracticeVerseAnalysis): NTVerse {
  return {
    id: verse.id,
    book: 'gen',
    chapter: 1,
    verse: 0,
    reference: verse.reference,
    hebrew: verse.hebrew,
    transliteration: verse.transliteration,
    referenceTranslation: verse.referenceTranslation,
    keyTerms: verse.keyTerms,
    difficulty: 1,
  };
}

function createQuestionSet(): ExamQuestion[] {
  return [
    ...shuffle([...grammarQuestions]).map((question) => ({
      type: 'mcq' as const,
      sectionId: 1 as const,
      data: question,
    })),
    ...shuffle([...vocabQuestions]).map((question) => ({
      type: 'mcq' as const,
      sectionId: 2 as const,
      data: question,
    })),
    ...verseAnalysisQuestions.map((question) => ({
      type: 'va' as const,
      sectionId: 3 as const,
      data: question,
    })),
  ];
}

function computeSummary(
  questions: ExamQuestion[],
  mcqAnswers: Record<string, number | undefined>,
  verseMatching: Record<string, Record<string, string>>,
  verseTranslations: Record<string, string>,
): ExamSummary {
  const grammarQuestionsInExam = questions.filter((item) => item.type === 'mcq' && item.sectionId === 1) as Array<{
    type: 'mcq';
    sectionId: 1 | 2;
    data: PracticeMCQ;
  }>;
  const vocabQuestionsInExam = questions.filter((item) => item.type === 'mcq' && item.sectionId === 2) as Array<{
    type: 'mcq';
    sectionId: 1 | 2;
    data: PracticeMCQ;
  }>;
  const verseQuestionsInExam = questions.filter((item) => item.type === 'va') as Array<{
    type: 'va';
    sectionId: 3;
    data: PracticeVerseAnalysis;
  }>;

  const scoreMcq = (q: PracticeMCQ): MCQAnswerDetail => {
    const studentAnswer = mcqAnswers[q.id] ?? -1;
    const isCorrect = studentAnswer === q.correctIndex;
    return {
      questionId: q.id,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      studentAnswer,
      isCorrect,
    };
  };

  const grammarAnswerDetails: MCQAnswerDetail[] = grammarQuestionsInExam.map(
    (item) => scoreMcq(item.data),
  );
  const vocabAnswerDetails: MCQAnswerDetail[] = vocabQuestionsInExam.map(
    (item) => scoreMcq(item.data),
  );

  const verseBreakdown = verseQuestionsInExam.map((item) => {
    const q = item.data;
    const matching = verseMatching[q.id] || {};
    let matchingCorrect = 0;
    const matchingPairs = q.matchingPairs.map((pair) => {
      const studentCategory = matching[pair.hebrew] || '';
      if (studentCategory === pair.category) matchingCorrect++;
      return {
        hebrew: pair.hebrew,
        correctCategory: pair.category,
        studentCategory,
      };
    });

    const matchingPoints = (matchingCorrect / q.matchingPairs.length) * 2;
    const translationText = verseTranslations[q.id] || '';
    const translationResult = scoreTranslation(buildVerse(q), translationText);
    const translationPoints = (translationResult.score / 10) * 2;
    const totalPoints = matchingPoints + translationPoints;

    return {
      questionId: q.id,
      reference: q.reference,
      matchingCorrect,
      matchingTotal: q.matchingPairs.length,
      matchingPoints,
      translationResult,
      translationPoints,
      totalPoints,
      matchingPairs,
      studentTranslation: translationText,
    };
  });

  const grammarCorrect = grammarAnswerDetails.filter((q) => q.isCorrect).length;
  const vocabCorrect = vocabAnswerDetails.filter((q) => q.isCorrect).length;
  const verseAnalysisScore = Math.round(
    verseBreakdown.reduce((sum, item) => sum + item.totalPoints, 0) * 10,
  ) / 10;
  const totalScore = Math.round((grammarCorrect + vocabCorrect + verseAnalysisScore) * 10) / 10;
  const totalPossible = 100;
  const percentage = Math.round((totalScore / totalPossible) * 100);
  const grade = getGrade(percentage);

  const mcqAnswersPayload: MCQSectionAnswers[] = [
    {
      sectionId: 1,
      questions: grammarAnswerDetails,
    },
    {
      sectionId: 2,
      questions: vocabAnswerDetails,
    },
  ];

  const translationAnswers: TranslationAnswer[] = verseQuestionsInExam.map((item) => {
    const q = item.data;
    const matching = verseMatching[q.id] || {};
    return {
      questionId: q.id,
      reference: q.reference,
      hebrew: q.hebrew,
      referenceTranslation: q.referenceTranslation,
      studentTranslation: verseTranslations[q.id] || '',
      matchingPairs: q.matchingPairs.map((pair) => ({
        hebrew: pair.hebrew,
        correctCategory: pair.category,
        studentCategory: matching[pair.hebrew] || '',
      })),
    };
  });

  return {
    grammarCorrect,
    vocabCorrect,
    grammarTotal: grammarQuestions.length,
    vocabTotal: vocabQuestions.length,
    verseAnalysisScore,
    verseAnalysisTotal: 20,
    totalScore,
    totalPossible,
    percentage,
    grade,
    mcqAnswers: mcqAnswersPayload,
    translationAnswers,
    verseBreakdown,
  };
}

function Gate({
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
    if (accessCode.toLowerCase().trim() === ACCESS_CODE) {
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

function Intro({
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
            <h1 className="text-3xl font-bold">{EXAM_TITLE}</h1>
            <p className="text-muted-foreground">Genesis 1 practice paper in exam mode</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exam Instructions</CardTitle>
              <CardDescription>
                Results are computed at the end and shown locally. No answer feedback is shown while you work.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <Clock3 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">85 questions, 2-hour limit</p>
                    <p className="text-sm text-muted-foreground">50 grammar MCQ + 30 vocabulary MCQ + 5 verse analysis items. The exam auto-submits when time expires.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">No immediate reveal</p>
                    <p className="text-sm text-muted-foreground">Your answers are saved in memory and scored only when you submit the full exam.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Final exam variant</p>
                    <p className="text-sm text-muted-foreground">This uses the practice-paper format with 20% final-exam-only questions.</p>
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

function Results({
  summary,
  emailStatus,
  timedOut,
  onRetake,
}: {
  summary: ExamSummary;
  emailStatus: 'idle' | 'sending' | 'sent' | 'failed';
  timedOut: boolean;
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
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">Score report compiled — show or screenshot for your records</span>
              </div>
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

          <div className="flex gap-3">
            <Button variant="outline" onClick={onRetake} className="flex-1 gap-2">
              <RotateCcw className="w-4 h-4" />
              Retake
            </Button>
            <Link href="/grammar/review" className="flex-1">
              <Button className="w-full gap-2">
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

function MCQQuestion({
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

function VerseAnalysisQuestion({
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

export default function GrammarReviewFinalExamPage() {
  const [phase, setPhase] = useState<ExamStep>('gate');
  const [studentName, setStudentName] = useState('');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number | undefined>>({});
  const [verseMatching, setVerseMatching] = useState<Record<string, Record<string, string>>>({});
  const [verseTranslations, setVerseTranslations] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState<ExamSummary | null>(null);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const emailSentRef = useRef(false);
  const submittedRef = useRef(false);

  const currentQuestion = questions[currentIndex];

  const sectionMeta = useMemo(() => {
    if (!currentQuestion) {
      return { label: '', current: 0, total: 0 };
    }

    if (currentQuestion.sectionId === 1) {
      return {
        label: 'Grammar Understanding',
        current: currentIndex + 1,
        total: grammarQuestions.length,
      };
    }

    if (currentQuestion.sectionId === 2) {
      return {
        label: 'Vocabulary',
        current: currentIndex - grammarQuestions.length + 1,
        total: vocabQuestions.length,
      };
    }

    return {
      label: 'Verse Analysis',
      current: currentIndex - grammarQuestions.length - vocabQuestions.length + 1,
      total: verseAnalysisQuestions.length,
    };
  }, [currentQuestion, currentIndex]);

  const beginExam = () => {
    setQuestions(createQuestionSet());
    setCurrentIndex(0);
    setMcqAnswers({});
    setVerseMatching({});
    setVerseTranslations({});
    setSummary(null);
    setEmailStatus('idle');
    setTimedOut(false);
    setStartedAt(Date.now());
    emailSentRef.current = false;
    submittedRef.current = false;
    setPhase('exam');
  };

  const resetExam = () => {
    setPhase('gate');
    setStudentName('');
    setQuestions([]);
    setCurrentIndex(0);
    setMcqAnswers({});
    setVerseMatching({});
    setVerseTranslations({});
    setSummary(null);
    setEmailStatus('idle');
    setStartedAt(null);
    setTimedOut(false);
    emailSentRef.current = false;
    submittedRef.current = false;
  };

  const handleUnlock = (name: string) => {
    setStudentName(name);
    setPhase('intro');
  };

  const handleSubmitExam = useCallback((reason: 'manual' | 'timeout' = 'manual') => {
    if (questions.length === 0 || summary || submittedRef.current) return;
    submittedRef.current = true;
    const computed = computeSummary(questions, mcqAnswers, verseMatching, verseTranslations);
    setSummary(computed);
    setTimedOut(reason === 'timeout');
    setStartedAt(null);
    setPhase('results');
  }, [mcqAnswers, questions, summary, verseMatching, verseTranslations]);

  // Hebrew app has no /api/send-exam-results endpoint configured.
  // Mark email status as 'sent' immediately so the UI hides the spinner —
  // students see their full results screen on submission.
  useEffect(() => {
    if (phase !== 'results' || !summary || emailSentRef.current) return;
    emailSentRef.current = true;
    setEmailStatus('sent');
  }, [phase, summary]);

  if (phase === 'gate') {
    return <Gate onUnlock={handleUnlock} />;
  }

  if (phase === 'intro') {
    return <Intro onStart={beginExam} onReset={resetExam} />;
  }

  if (phase === 'results' && summary) {
    return <Results summary={summary} emailStatus={emailStatus} timedOut={timedOut} onRetake={resetExam} />;
  }

  if (!currentQuestion) {
    return null;
  }

  const isLastQuestion = currentIndex === questions.length - 1;

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmitExam();
      return;
    }
    setCurrentIndex((value) => value + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((value) => value - 1);
    }
  };

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

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Question {currentIndex + 1} of {questions.length}</p>
              <h1 className="text-xl font-semibold">{sectionMeta.label}</h1>
            </div>
            <div className="text-right">
              <div className="flex justify-end mb-1">
                {startedAt && (
                  <ExamTimer
                    startedAt={startedAt}
                    duration={EXAM_DURATION_MS}
                    onExpire={() => handleSubmitExam('timeout')}
                  />
                )}
              </div>
              <p className="text-sm font-medium text-primary">{studentName}</p>
              <p className="text-xs text-muted-foreground">No answer feedback until submission</p>
            </div>
          </div>

          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between gap-3">
                <span>Question {currentIndex + 1}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {sectionMeta.current}/{sectionMeta.total}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentQuestion.type === 'mcq' ? (
                <MCQQuestion
                  question={currentQuestion.data}
                  selected={mcqAnswers[currentQuestion.data.id]}
                  onSelect={(index) => {
                    setMcqAnswers((previous) => ({
                      ...previous,
                      [currentQuestion.data.id]: index,
                    }));
                  }}
                />
              ) : (
                <VerseAnalysisQuestion
                  question={currentQuestion.data}
                  matching={verseMatching[currentQuestion.data.id] || {}}
                  translation={verseTranslations[currentQuestion.data.id] || ''}
                  onMatchingChange={(hebrew, category) => {
                    setVerseMatching((previous) => ({
                      ...previous,
                      [currentQuestion.data.id]: {
                        ...(previous[currentQuestion.data.id] || {}),
                        [hebrew]: category,
                      },
                    }));
                  }}
                  onTranslationChange={(text) => {
                    setVerseTranslations((previous) => ({
                      ...previous,
                      [currentQuestion.data.id]: text,
                    }));
                  }}
                />
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="text-xs text-muted-foreground text-center hidden sm:block">
              Your response is being held for final scoring only.
            </div>

            <Button
              onClick={handleNext}
              className="gap-2"
            >
              {isLastQuestion ? 'Submit Exam' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
