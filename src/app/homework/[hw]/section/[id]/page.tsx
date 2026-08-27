'use client';

import { useEffect, useMemo, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useExtendedHomeworkStore } from '@/stores/extendedHomeworkStore';
import { useShallow } from 'zustand/react/shallow';
import { getHomework } from '@/data/homework/extended-registry';
import type { ExtendedHomeworkId, ExtendedSectionId } from '@/types/homework-extended';
import type {
  HomeworkQuestion,
  PairedMCQAnswer,
  QuestionAnswer,
} from '@/types/homework';
import { prepareHomeworkQuestions } from '@/lib/homeworkShuffle';
import { cn } from '@/lib/utils';

type PairedStage = 'transliteration' | 'meaning';

interface QuestionResponseState {
  selectedIndex: number | null;
  transliterationIndex: number | null;
  pairedStage: PairedStage;
  showFeedback: boolean;
}

function isPairedAnswer(value: unknown): value is PairedMCQAnswer {
  if (!value || typeof value !== 'object') return false;
  const answer = value as Partial<PairedMCQAnswer>;
  return typeof answer.transliterationIndex === 'number' && typeof answer.meaningIndex === 'number';
}

function getInitialResponse(
  question: HomeworkQuestion,
  previousAnswer?: QuestionAnswer,
): QuestionResponseState {
  if (
    question.type === 'paired_mcq'
    && previousAnswer
    && isPairedAnswer(previousAnswer.userAnswer)
  ) {
    return {
      pairedStage: 'meaning',
      transliterationIndex: previousAnswer.userAnswer.transliterationIndex,
      selectedIndex: previousAnswer.userAnswer.meaningIndex,
      showFeedback: true,
    };
  }

  if (
    question.type === 'mcq'
    && previousAnswer
    && typeof previousAnswer.userAnswer === 'number'
  ) {
    return {
      pairedStage: 'transliteration',
      transliterationIndex: null,
      selectedIndex: previousAnswer.userAnswer,
      showFeedback: true,
    };
  }

  return {
    pairedStage: 'transliteration',
    transliterationIndex: null,
    selectedIndex: null,
    showFeedback: false,
  };
}

function getQuestionDisplay(question: HomeworkQuestion, stage: PairedStage) {
  if (question.type === 'mcq') {
    return {
      prompt: question.question,
      options: question.options,
      correctIndex: question.correctIndex,
      explanation: question.explanation,
    };
  }

  if (question.type === 'paired_mcq') {
    if (stage === 'transliteration') {
      return {
        prompt: 'Step 1 of 2: Which transliteration matches this Hebrew noun?',
        options: question.transliterationOptions,
        correctIndex: question.transliterationCorrectIndex,
        explanation: question.transliterationExplanation,
      };
    }
    const transliteration = question.transliterationOptions[question.transliterationCorrectIndex];
    return {
      prompt: `Step 2 of 2: What does ${transliteration} mean?`,
      options: question.meaningOptions,
      correctIndex: question.meaningCorrectIndex,
      explanation: question.meaningExplanation,
    };
  }

  return {
    prompt: 'Which transliteration matches this Hebrew word?',
    options: question.transliterationOptions ?? [],
    correctIndex: question.transliterationCorrectIndex ?? -1,
    explanation: question.gloss ?? '',
  };
}

function SectionContent({ hwId, sectionId }: { hwId: ExtendedHomeworkId; sectionId: ExtendedSectionId }) {
  const router = useRouter();
  const meta = useMemo(() => getHomework(hwId), [hwId]);
  const {
    ensureHomework,
    startSection,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    completeSection,
    completeHomework,
    isHomeworkComplete,
  } = useExtendedHomeworkStore(
    useShallow((state) => ({
      ensureHomework: state.ensureHomework,
      startSection: state.startSection,
      submitAnswer: state.submitAnswer,
      nextQuestion: state.nextQuestion,
      previousQuestion: state.previousQuestion,
      completeSection: state.completeSection,
      completeHomework: state.completeHomework,
      isHomeworkComplete: state.isHomeworkComplete,
    })),
  );

  const [questionResponses, setQuestionResponses] = useState<
    Record<string, QuestionResponseState>
  >({});

  const sectionMeta = meta?.sections.find((section) => section.id === sectionId);
  const rawQuestions = meta?.sectionQuestions[sectionId];
  const attemptSeed = useExtendedHomeworkStore(
    (state) => state.homeworks[hwId]?.attemptSeed,
  );
  const sectionProgress = useExtendedHomeworkStore(
    (state) => state.homeworks[hwId]?.sections[sectionId],
  );
  const questions = useMemo(
    () => rawQuestions && attemptSeed
      ? prepareHomeworkQuestions(rawQuestions, attemptSeed, sectionId)
      : [],
    [rawQuestions, attemptSeed, sectionId],
  );
  const idx = sectionProgress?.currentIndex ?? 0;
  const question = questions[idx];
  const previousAnswer = question
    ? sectionProgress?.answers.find((answer) => answer.questionId === question.id)
    : undefined;

  useEffect(() => {
    if (!meta) return;
    ensureHomework(meta.id);
    startSection(meta.id, sectionId);
  }, [meta, sectionId, ensureHomework, startSection]);

  if (!meta) {
    return <main className="min-h-screen p-6"><p>Homework not found</p></main>;
  }
  if (!sectionMeta || !rawQuestions) {
    return <main className="min-h-screen p-6"><p>Section not found</p></main>;
  }
  if (!sectionProgress || !attemptSeed || !question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const response = questionResponses[question.id] ?? getInitialResponse(question, previousAnswer);
  const { selectedIndex, transliterationIndex, pairedStage, showFeedback } = response;
  const updateResponse = (updates: Partial<QuestionResponseState>) => {
    setQuestionResponses((current) => ({
      ...current,
      [question.id]: {
        ...(current[question.id] ?? getInitialResponse(question, previousAnswer)),
        ...updates,
      },
    }));
  };

  const total = questions.length;
  const display = getQuestionDisplay(question, pairedStage);
  const selectedIsCorrect = selectedIndex === display.correctIndex;
  const isPaired = question.type === 'paired_mcq';
  const transliterationWasCorrect = isPaired
    && transliterationIndex === question.transliterationCorrectIndex;

  const handleSubmit = () => {
    if (selectedIndex === null) return;

    if (question.type === 'paired_mcq') {
      if (pairedStage === 'transliteration') {
        updateResponse({ transliterationIndex: selectedIndex, showFeedback: true });
        return;
      }

      if (transliterationIndex === null) return;
      const answer: PairedMCQAnswer = {
        transliterationIndex,
        meaningIndex: selectedIndex,
      };
      const isCorrect =
        transliterationIndex === question.transliterationCorrectIndex
        && selectedIndex === question.meaningCorrectIndex;
      submitAnswer(meta.id, sectionId, question.id, answer, isCorrect);
      updateResponse({ showFeedback: true });
      return;
    }

    const isCorrect = selectedIndex === display.correctIndex;
    submitAnswer(meta.id, sectionId, question.id, selectedIndex, isCorrect);
    updateResponse({ showFeedback: true });
  };

  const handleNext = () => {
    if (question.type === 'paired_mcq' && pairedStage === 'transliteration') {
      updateResponse({ pairedStage: 'meaning', selectedIndex: null, showFeedback: false });
      return;
    }

    if (idx + 1 >= total) {
      completeSection(meta.id, sectionId);
      if (isHomeworkComplete(meta.id)) {
        completeHomework(meta.id);
        router.push(`/homework/${meta.id}/complete`);
      } else {
        router.push(`/homework/${meta.id}`);
      }
      return;
    }
    nextQuestion(meta.id, sectionId);
  };

  const handlePrev = () => {
    if (question.type === 'paired_mcq' && pairedStage === 'meaning' && !previousAnswer) {
      updateResponse({
        pairedStage: 'transliteration',
        selectedIndex: transliterationIndex,
        showFeedback: transliterationIndex !== null,
      });
      return;
    }
    if (idx === 0) return;
    previousQuestion(meta.id, sectionId);
  };

  const previousDisabled =
    idx === 0 && (pairedStage === 'transliteration' || Boolean(previousAnswer));
  const nextLabel = question.type === 'paired_mcq' && pairedStage === 'transliteration'
    ? 'Continue to Meaning'
    : idx + 1 >= total
      ? 'Finish Section'
      : 'Next Question';

  return (
    <main className="min-h-screen p-4 sm:p-6 max-w-3xl mx-auto">
      <div className="mb-4">
        <Link href={`/homework/${meta.id}`}>
          <Button variant="ghost" className="-ml-2 h-11">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sections
          </Button>
        </Link>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">{meta.shortTitle} · Section {sectionId}: {sectionMeta.title}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-sm font-medium">
            Question {idx + 1} of {total}
            {isPaired && ` · Step ${pairedStage === 'transliteration' ? 1 : 2} of 2`}
          </p>
          <p className="text-sm text-muted-foreground tabular-nums">Score: {sectionProgress.score} / {total}</p>
        </div>
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-[width] duration-150 motion-reduce:transition-none"
            style={{ width: `${((idx + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg leading-snug">{display.prompt}</CardTitle>
          {'hebrew' in question && question.hebrew && (
            <p
              className="text-4xl sm:text-5xl text-right font-serif mt-3 leading-relaxed"
              lang="he"
              dir="rtl"
            >
              {question.hebrew}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          {display.options.map((option, optIdx) => {
            const isSelected = selectedIndex === optIdx;
            const isCorrectAnswer = optIdx === display.correctIndex;
            const showAsCorrect = showFeedback && isCorrectAnswer;
            const showAsWrong = showFeedback && isSelected && !isCorrectAnswer;
            const optionIsHebrew = /[\u0590-\u05ff]/.test(option);
            return (
              <button
                key={`${option}-${optIdx}`}
                onClick={() => !showFeedback && updateResponse({ selectedIndex: optIdx })}
                disabled={showFeedback}
                className={cn(
                  'w-full touch-manipulation text-left rounded-lg border-2 px-4 py-3 transition-colors duration-100 motion-reduce:transition-none min-h-[48px]',
                  'hover:border-primary disabled:cursor-not-allowed',
                  isSelected && !showFeedback && 'border-primary bg-primary/5',
                  !isSelected && !showFeedback && 'border-border',
                  showAsCorrect && 'border-green-500 bg-green-50 dark:bg-green-950/30',
                  showAsWrong && 'border-red-500 bg-red-50 dark:bg-red-950/30',
                  showFeedback && !isSelected && !isCorrectAnswer && 'opacity-60',
                )}
                aria-pressed={isSelected}
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span
                    className={cn('flex-1 text-base', optionIsHebrew && 'hebrew-text text-xl text-right')}
                    dir={optionIsHebrew ? 'rtl' : undefined}
                    lang={optionIsHebrew ? 'he' : undefined}
                  >
                    {option}
                  </span>
                  {showAsCorrect && <CheckCircle className="w-5 h-5 text-green-600" aria-label="Correct" />}
                  {showAsWrong && <XCircle className="w-5 h-5 text-red-600" aria-label="Incorrect" />}
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {showFeedback && (
        <Card className="mb-6 border-l-4 border-l-primary">
          <CardContent className="pt-6 space-y-3">
            <div>
              <p className="text-sm font-semibold mb-2">{selectedIsCorrect ? 'Correct' : 'Review'}</p>
              <p className="text-sm text-foreground/90 leading-relaxed">{display.explanation}</p>
            </div>
            {isPaired && pairedStage === 'meaning' && (
              <div className="grid grid-cols-2 gap-2 text-xs border-t pt-3">
                <div className={cn('rounded p-2', transliterationWasCorrect ? 'bg-green-500/10 text-green-700 dark:text-green-300' : 'bg-amber-500/10 text-amber-700 dark:text-amber-300')}>
                  Transliteration: {transliterationWasCorrect ? 'correct' : 'review'}
                </div>
                <div className={cn('rounded p-2', selectedIsCorrect ? 'bg-green-500/10 text-green-700 dark:text-green-300' : 'bg-amber-500/10 text-amber-700 dark:text-amber-300')}>
                  Meaning: {selectedIsCorrect ? 'correct' : 'review'}
                </div>
                <p className="col-span-2 text-muted-foreground">Both stages must be correct to earn this item’s point.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between gap-3 sticky bottom-0 bg-background py-4 -mx-4 sm:-mx-6 px-4 sm:px-6 border-t">
        <Button variant="outline" onClick={handlePrev} disabled={previousDisabled} className="h-11">
          <ArrowLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        {!showFeedback ? (
          <Button onClick={handleSubmit} disabled={selectedIndex === null} className="h-11">
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="h-11">
            {nextLabel} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </main>
  );
}

export default function ExtendedSectionPage({ params }: { params: Promise<{ hw: string; id: string }> }) {
  const { hw, id } = use(params);
  const meta = getHomework(hw);
  const sectionId = parseInt(id, 10);
  if (!meta || Number.isNaN(sectionId)) {
    return <main className="min-h-screen p-6"><p>Invalid homework or section.</p></main>;
  }
  return <SectionContent hwId={meta.id} sectionId={sectionId} />;
}
