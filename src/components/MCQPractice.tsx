'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ChevronRight, RotateCcw, Trophy, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { PracticeQuestion, PracticeSessionMode } from '@/types/class-practice';
import { cn, shuffle } from '@/lib/utils';

interface MCQPracticeProps {
  title: string;
  subtitle: string;
  reviewTitle: string;
  description: string;
  completionTitle: string;
  backHref: string;
  modes: PracticeSessionMode[];
  initialMode?: string;
  allModeNote?: string;
  buildSession: (mode: string) => PracticeQuestion[];
}

function shuffleQuestionOptions(question: PracticeQuestion): PracticeQuestion {
  const entries = question.options.map((option, index) => ({
    option,
    isCorrect: index === question.correctIndex,
  }));
  const shuffled = shuffle(entries);
  return {
    ...question,
    options: shuffled.map((entry) => entry.option),
    correctIndex: shuffled.findIndex((entry) => entry.isCorrect),
  };
}

function containsHebrew(value: string): boolean {
  return /[\u0590-\u05ff]/.test(value);
}

export function MCQPractice({
  title,
  subtitle,
  reviewTitle,
  description,
  completionTitle,
  backHref,
  modes,
  initialMode = 'all',
  allModeNote,
  buildSession,
}: MCQPracticeProps) {
  const [mode, setMode] = useState(initialMode);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [complete, setComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const answeredCount = correctCount + incorrectCount;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const startSession = () => {
    setQuestions(buildSession(mode).map(shuffleQuestionOptions));
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setComplete(false);
    setStarted(true);
  };

  const resetSession = () => {
    setStarted(false);
    setComplete(false);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const submitAnswer = () => {
    if (!currentQuestion || selectedOption === null || showFeedback) return;
    if (selectedOption === currentQuestion.correctIndex) {
      setCorrectCount((count) => count + 1);
    } else {
      setIncorrectCount((count) => count + 1);
    }
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentIndex >= questions.length - 1) {
      setComplete(true);
      return;
    }
    setCurrentIndex((index) => index + 1);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  if (!started) {
    return (
      <div className="min-h-screen">
        <header className="sticky top-0 z-40 bg-background border-b">
          <div className="container mx-auto px-4 py-3 flex items-center gap-3">
            <Link href={backHref}>
              <Button variant="ghost" size="icon" aria-label="Back to class practice">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold">{title}</h1>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-2xl">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{reviewTitle}</h2>
              <p className="text-muted-foreground mt-1">{description}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Question Set</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {modes.map((practiceMode) => (
                  <button
                    key={practiceMode.id}
                    onClick={() => setMode(practiceMode.id)}
                    className={cn(
                      'touch-manipulation rounded-lg border p-3 text-left transition-colors duration-100 motion-reduce:transition-none',
                      mode === practiceMode.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-muted-foreground/50',
                    )}
                  >
                    <span className="block text-sm font-medium">{practiceMode.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {practiceMode.count} questions
                    </span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {mode === 'all' && allModeNote && (
              <p className="text-sm text-muted-foreground">{allModeNote}</p>
            )}

            <Button size="lg" className="w-full h-14" onClick={startSession}>
              Start MCQ
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (complete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="py-8 text-center">
            <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">{completionTitle}</h1>
            <p className="text-muted-foreground mb-6">
              {correctCount} correct, {incorrectCount} missed, {accuracy}% accuracy
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={resetSession}>
                <RotateCcw className="w-4 h-4" />
                Restart
              </Button>
              <Link href={backHref} className="flex-1">
                <Button className="w-full">Done</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const selectedIsCorrect = selectedOption === currentQuestion.correctIndex;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href={backHref}>
            <Button variant="ghost" size="icon" aria-label="Back to class practice">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="text-xs text-muted-foreground">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold">{accuracy}%</p>
            <p className="text-xs text-muted-foreground">accuracy</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-6">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-[width] duration-150 motion-reduce:transition-none"
              style={{ width: `${((currentIndex + (showFeedback ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{currentQuestion.prompt}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {(currentQuestion.hebrew || currentQuestion.transliteration) && (
                <div className="text-center space-y-2">
                  {currentQuestion.hebrew && (
                    <p className="hebrew-text font-serif text-5xl tracking-wide" dir="rtl" lang="he">
                      {currentQuestion.hebrew}
                    </p>
                  )}
                  {currentQuestion.transliteration && (
                    <p className="text-sm text-muted-foreground italic">{currentQuestion.transliteration}</p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const isCorrectOption = index === currentQuestion.correctIndex;
                  const isHebrew = containsHebrew(option);

                  return (
                    <button
                      key={`${option}-${index}`}
                      onClick={() => !showFeedback && setSelectedOption(index)}
                      disabled={showFeedback}
                      className={cn(
                        'w-full touch-manipulation flex items-center gap-3 p-4 rounded-lg border text-left transition-colors duration-100 motion-reduce:transition-none',
                        !showFeedback && 'hover:border-primary hover:bg-primary/5',
                        isSelected && !showFeedback && 'border-primary bg-primary/10',
                        showFeedback && isCorrectOption && 'border-green-500 bg-green-100 dark:bg-green-900/30',
                        showFeedback && isSelected && !isCorrectOption && 'border-red-500 bg-red-100 dark:bg-red-900/30',
                        showFeedback && !isSelected && !isCorrectOption && 'opacity-55',
                      )}
                    >
                      <span
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 text-sm font-medium',
                          !showFeedback && isSelected && 'border-primary bg-primary text-primary-foreground',
                          !showFeedback && !isSelected && 'border-muted-foreground/30',
                          showFeedback && isCorrectOption && 'border-green-500 bg-green-500 text-white',
                          showFeedback && isSelected && !isCorrectOption && 'border-red-500 bg-red-500 text-white',
                        )}
                      >
                        {showFeedback && isCorrectOption ? (
                          <Check className="w-4 h-4" />
                        ) : showFeedback && isSelected && !isCorrectOption ? (
                          <X className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <span
                        className={cn('flex-1 min-w-0', isHebrew && 'hebrew-text text-xl text-right')}
                        dir={isHebrew ? 'rtl' : undefined}
                        lang={isHebrew ? 'he' : undefined}
                      >
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div
                  className={cn(
                    'rounded-lg p-4 text-sm',
                    selectedIsCorrect
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
                  )}
                >
                  <p className="font-medium mb-1">{selectedIsCorrect ? 'Correct' : 'Review'}</p>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}

              {!showFeedback ? (
                <Button className="w-full" onClick={submitAnswer} disabled={selectedOption === null}>
                  Check Answer
                </Button>
              ) : (
                <Button className="w-full" onClick={nextQuestion}>
                  {currentIndex === questions.length - 1 ? 'Finish' : 'Next'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
