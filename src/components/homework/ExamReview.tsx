'use client';

import { ArrowLeft, ArrowRight, BookOpen, Check, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { HebrewWord } from '@/components/HebrewWord';
import { cn } from '@/lib/utils';
import { buildVerse, type ExamQuestion } from '@/lib/finalExam';
import { scoreTranslation } from '@/lib/translation';
import type { PracticeMCQ, PracticeVerseAnalysis } from '@/data/review/class13FinalExam';

const SECTION_LABELS = { 1: 'Grammar Understanding', 2: 'Vocabulary', 3: 'Verse Analysis' } as const;

/** After submission: step through every question with the student's answer, the key and the explanation. */
export function ExamReview({
  questions,
  currentIndex,
  mcqAnswers,
  verseMatching,
  verseTranslations,
  studentName,
  onNavigate,
  onBack,
}: {
  questions: ExamQuestion[];
  currentIndex: number;
  mcqAnswers: Record<string, number>;
  verseMatching: Record<string, Record<string, string>>;
  verseTranslations: Record<string, string>;
  studentName: string;
  onNavigate: (index: number) => void;
  onBack: () => void;
}) {
  const current = questions[currentIndex];
  if (!current) return null;
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Results</span>
          </button>
          <div className="flex items-center gap-2 text-primary">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Review Mode</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Question {currentIndex + 1} of {questions.length}</p>
              <h1 className="text-xl font-semibold">{SECTION_LABELS[current.sectionId]}</h1>
            </div>
            <p className="text-sm font-medium text-primary">{studentName}</p>
          </div>

          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
          </div>

          <Card>
            <CardContent className="py-5">
              {current.type === 'mcq' ? (
                <McqReview question={current.data} studentAnswer={mcqAnswers[current.data.id]} />
              ) : (
                <VerseReview
                  question={current.data}
                  matching={verseMatching[current.data.id] || {}}
                  translation={verseTranslations[current.data.id] || ''}
                />
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between gap-3">
            <Button variant="outline" onClick={() => onNavigate(currentIndex - 1)} disabled={currentIndex === 0} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button onClick={isLast ? onBack : () => onNavigate(currentIndex + 1)} className="gap-2">
              {isLast ? 'Done — Back to Results' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function McqReview({ question, studentAnswer }: { question: PracticeMCQ; studentAnswer: number | undefined }) {
  const wasIDK = studentAnswer === -1;
  const attempted = typeof studentAnswer === 'number' && !wasIDK;
  const isCorrect = attempted && studentAnswer === question.correctIndex;
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
          const isCorrectOption = index === question.correctIndex;
          const isStudentChoice = studentAnswer === index;
          return (
            <div
              key={option}
              className={cn(
                'w-full p-4 rounded-xl border text-left',
                isCorrectOption && 'border-green-500 bg-green-50 dark:bg-green-900/20',
                isStudentChoice && !isCorrectOption && 'border-red-500 bg-red-50 dark:bg-red-900/20',
              )}
            >
              <span className="flex items-center gap-3">
                <span className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-medium border-2',
                  isCorrectOption && 'border-green-500 bg-green-500 text-white',
                  isStudentChoice && !isCorrectOption && 'border-red-500 bg-red-500 text-white',
                  !isCorrectOption && !isStudentChoice && 'border-muted-foreground/30',
                )}>
                  {index + 1}
                </span>
                <span className="flex-1">{option}</span>
                {isCorrectOption && <Check className="w-5 h-5 text-green-600" aria-label="Correct answer" />}
                {isStudentChoice && !isCorrectOption && <ShieldAlert className="w-5 h-5 text-red-600" aria-label="Your answer" />}
              </span>
            </div>
          );
        })}
      </div>

      <div className={cn(
        'p-4 rounded-lg text-sm',
        isCorrect ? 'bg-green-100 dark:bg-green-900/30' : attempted ? 'bg-red-100 dark:bg-red-900/30' : 'bg-muted',
      )}>
        <p className="font-medium mb-1">
          {isCorrect ? '✓ Correct' : wasIDK ? 'You marked "I don\'t know"' : attempted ? '✗ Incorrect' : 'No answer recorded'}
        </p>
        <p className="text-muted-foreground">{question.explanation}</p>
      </div>
    </div>
  );
}

function VerseReview({
  question,
  matching,
  translation,
}: {
  question: PracticeVerseAnalysis;
  matching: Record<string, string>;
  translation: string;
}) {
  const result = scoreTranslation(buildVerse(question), translation);

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
        <p className="text-sm font-semibold">Part A: Matching results</p>
        <div className="space-y-2">
          {question.matchingPairs.map((pair) => {
            const choice = matching[pair.hebrew] || '';
            const isRight = choice === pair.category;
            return (
              <div key={pair.hebrew} className={cn(
                'flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg border',
                isRight && 'bg-green-50 dark:bg-green-900/20 border-green-300',
                choice && !isRight && 'bg-red-50 dark:bg-red-900/20 border-red-300',
              )}>
                <span className="text-lg shrink-0 min-w-[120px] font-medium" dir="rtl" lang="he">{pair.hebrew}</span>
                <div className="flex-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Correct: </span>
                    <span className="font-medium text-green-700 dark:text-green-400">{pair.category}</span>
                  </p>
                  {choice && !isRight && (
                    <p>
                      <span className="text-muted-foreground">Your answer: </span>
                      <span className="font-medium text-red-700 dark:text-red-400 line-through">{choice}</span>
                    </p>
                  )}
                  {!choice && <p className="text-muted-foreground italic">No answer recorded</p>}
                </div>
                {isRight && <Check className="w-5 h-5 text-green-600 shrink-0" aria-label="Correct" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold">Part B: Translation</p>
        <div className="rounded-lg border p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Your translation</p>
            <p className="text-sm">{translation || <span className="italic text-muted-foreground">No translation recorded</span>}</p>
          </div>
          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-1">Reference translation</p>
            <p className="text-sm">{question.referenceTranslation}</p>
          </div>
          <div className="border-t pt-3 flex items-center justify-between">
            <p className="text-sm font-medium">Score</p>
            <p className="text-lg font-bold text-primary">{result.score.toFixed(1)} / 10</p>
          </div>
          <TermList label="Key terms found" terms={result.keyTermsFound} tone="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" />
          <TermList label="Key terms missed" terms={result.keyTermsMissed} tone="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" />
        </div>
      </div>
    </div>
  );
}

function TermList({ label, terms, tone }: { label: string; terms: string[]; tone: string }) {
  if (terms.length === 0) return null;
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {terms.map((term) => (
          <span key={term} className={cn('px-2 py-0.5 text-xs rounded-full', tone)}>{term}</span>
        ))}
      </div>
    </div>
  );
}
