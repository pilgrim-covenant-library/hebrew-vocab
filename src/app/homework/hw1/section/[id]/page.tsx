'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, X, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useHomeworkStore } from '@/stores/homeworkStore';
import { useAuthStore } from '@/stores/authStore';
import { useShallow } from 'zustand/react/shallow';
import { FloatingHelpButton } from '@/components/homework/HelpButton';
import { HomeworkProgressCompact } from '@/components/homework/HomeworkProgress';
import { SectionNavigation, QuestionProgressBar } from '@/components/homework/SectionNavigation';
import { getQuestionsForSection } from '@/data/homework/hw1-questions';
import {
  HOMEWORK1_SECTION_IDS,
  SECTION_META,
  type HomeworkQuestion,
  type MCQQuestion,
  type QuestionAnswer,
  type SectionId,
  type TransliterationQuestion,
} from '@/types/homework';
import { cn } from '@/lib/utils';

type VocabularyStage = 'transliteration' | 'meaning';

interface QuestionResponseState {
  userInput: string;
  selectedOption: number | null;
  showFeedback: boolean;
  isCorrect: boolean;
  vocabularyStage: VocabularyStage;
  transliterationCorrect: boolean | null;
  selectedTransliterationOption: number | null;
  showStageFeedback: boolean;
}

const EMPTY_RESPONSE: QuestionResponseState = {
  userInput: '',
  selectedOption: null,
  showFeedback: false,
  isCorrect: false,
  vocabularyStage: 'transliteration',
  transliterationCorrect: null,
  selectedTransliterationOption: null,
  showStageFeedback: false,
};

function getInitialResponse(
  question: HomeworkQuestion,
  existingAnswer?: QuestionAnswer,
): QuestionResponseState {
  if (!existingAnswer) return EMPTY_RESPONSE;

  if (question.type === 'mcq') {
    return {
      ...EMPTY_RESPONSE,
      selectedOption:
        typeof existingAnswer.userAnswer === 'number' ? existingAnswer.userAnswer : null,
      showFeedback: true,
      isCorrect: existingAnswer.isCorrect,
    };
  }

  if (question.transliterationOptions) {
    if (question.meaningOptions) {
      const [transliterationValue, meaningValue] = String(existingAnswer.userAnswer)
        .split('|')
        .map((value) => Number.parseInt(value.trim(), 10));
      const transliterationIndex = Number.isFinite(transliterationValue)
        ? transliterationValue
        : null;
      const meaningIndex = Number.isFinite(meaningValue) ? meaningValue : null;
      return {
        ...EMPTY_RESPONSE,
        selectedOption: meaningIndex,
        showFeedback: true,
        isCorrect: existingAnswer.isCorrect,
        vocabularyStage: 'meaning',
        transliterationCorrect:
          transliterationIndex === question.transliterationCorrectIndex,
        selectedTransliterationOption: transliterationIndex,
      };
    }

    return {
      ...EMPTY_RESPONSE,
      selectedOption:
        typeof existingAnswer.userAnswer === 'number' ? existingAnswer.userAnswer : null,
      showFeedback: true,
      isCorrect: existingAnswer.isCorrect,
    };
  }

  return {
    ...EMPTY_RESPONSE,
    userInput: String(existingAnswer.userAnswer),
    showFeedback: true,
    isCorrect: existingAnswer.isCorrect,
  };
}

function normalizeTransliteration(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/ē/g, 'e')
    .replace(/ō/g, 'o')
    .replace(/ā/g, 'a')
    .replace(/ī/g, 'i')
    .replace(/ū/g, 'u')
    .replace(/[''ʼ]/g, '')
    .replace(/\s+/g, ' ');
}

function isTransliterationCorrect(
  question: TransliterationQuestion,
  input: string,
): boolean {
  const normalized = normalizeTransliteration(input);
  if (normalized === normalizeTransliteration(question.answer)) return true;
  return question.variants.some(
    (variant) => normalized === normalizeTransliteration(variant),
  );
}

export default function SectionPage() {
  const router = useRouter();
  const params = useParams();
  const parsedId = parseInt(params.id as string, 10);

  // Homework 1 is one unified assignment.
  const isValidSectionId = parsedId === 1;
  const sectionId = (isValidSectionId ? parsedId : 1) as SectionId;

  const user = useAuthStore((state) => state.user);
  const {
    startSection,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    completeSection,
    completeHomework,
    syncToCloud,
  } = useHomeworkStore(
    useShallow((state) => ({
      startSection: state.startSection,
      submitAnswer: state.submitAnswer,
      nextQuestion: state.nextQuestion,
      previousQuestion: state.previousQuestion,
      completeSection: state.completeSection,
      completeHomework: state.completeHomework,
      syncToCloud: state.syncToCloud,
    })),
  );

  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Local persistence remains immediate; cloud writes are deferred so feedback
  // and question navigation get the next paint first.
  const scheduleCloudSync = useCallback(() => {
    if (!user) return;

    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => {
      syncTimeoutRef.current = null;
      void syncToCloud(user.uid);
    }, 900);
  }, [user, syncToCloud]);

  const [questionResponses, setQuestionResponses] = useState<
    Record<string, QuestionResponseState>
  >({});

  const section = useHomeworkStore((state) => state.homework1.sections[sectionId]);
  const questions = getQuestionsForSection(sectionId);
  const currentQuestion = questions[section.currentIndex];
  const meta = SECTION_META[sectionId];

  const existingAnswer = currentQuestion
    ? section.answers.find((answer) => answer.questionId === currentQuestion.id)
    : undefined;

  const response = currentQuestion
    ? questionResponses[currentQuestion.id] ?? getInitialResponse(currentQuestion, existingAnswer)
    : EMPTY_RESPONSE;
  const {
    userInput,
    selectedOption,
    showFeedback,
    isCorrect,
    vocabularyStage,
    transliterationCorrect,
    selectedTransliterationOption,
    showStageFeedback,
  } = response;

  const updateResponse = useCallback((updates: Partial<QuestionResponseState>) => {
    if (!currentQuestion) return;
    setQuestionResponses((current) => ({
      ...current,
      [currentQuestion.id]: {
        ...(current[currentQuestion.id] ?? getInitialResponse(currentQuestion, existingAnswer)),
        ...updates,
      },
    }));
  }, [currentQuestion, existingAnswer]);

  // Check access and validate section ID
  useEffect(() => {
    if (!isValidSectionId) {
      console.warn(`Invalid section ID: ${params.id}`);
      router.replace('/homework/hw1');
      return;
    }
    startSection(sectionId);
  }, [sectionId, isValidSectionId, params.id, startSection, router]);

  // Sync immediately on tab close/navigation to prevent data loss
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (user) {
        // Clear any pending debounced sync
        if (syncTimeoutRef.current) {
          clearTimeout(syncTimeoutRef.current);
        }
        // Attempt immediate sync (best effort - may not complete)
        void syncToCloud(user.uid);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [user, syncToCloud]);

  // Handle answer submission
  const handleSubmit = useCallback(() => {
    if (!currentQuestion) return;

    let correct = false;

    if (currentQuestion.type === 'mcq') {
      if (selectedOption === null) return;
      correct = selectedOption === (currentQuestion as MCQQuestion).correctIndex;
      submitAnswer(sectionId, currentQuestion.id, selectedOption, correct);
    } else {
      const question = currentQuestion as TransliterationQuestion;

      if (question.transliterationOptions) {
        if (selectedOption === null) return;

        if (question.meaningOptions && vocabularyStage === 'transliteration') {
          const transliterationIsCorrect = selectedOption === question.transliterationCorrectIndex;
          updateResponse({
            selectedTransliterationOption: selectedOption,
            transliterationCorrect: transliterationIsCorrect,
            showStageFeedback: true,
          });
          return;
        }

        if (question.meaningOptions) {
          const meaningIsCorrect = selectedOption === question.meaningCorrectIndex;
          correct = transliterationCorrect === true && meaningIsCorrect;
          submitAnswer(
            sectionId,
            currentQuestion.id,
            `${selectedTransliterationOption ?? ''} | ${selectedOption}`,
            correct
          );
        } else {
          correct = selectedOption === question.transliterationCorrectIndex;
          submitAnswer(sectionId, currentQuestion.id, selectedOption, correct);
        }
      } else {
        if (!userInput.trim()) return;
        correct = isTransliterationCorrect(question, userInput);
        submitAnswer(sectionId, currentQuestion.id, userInput, correct);
      }
    }

    updateResponse({ isCorrect: correct, showFeedback: true });

    scheduleCloudSync();
  }, [currentQuestion, selectedOption, userInput, sectionId, submitAnswer, scheduleCloudSync, vocabularyStage, transliterationCorrect, selectedTransliterationOption, updateResponse]);

  const continueToMeaning = () => {
    updateResponse({
      vocabularyStage: 'meaning',
      userInput: '',
      selectedOption: null,
      showStageFeedback: false,
    });
  };

  // Handle next question
  const handleNext = () => {
    if (!nextQuestion(sectionId)) {
      // Last question - this shouldn't happen as we use onComplete for last
    }
  };

  // Handle previous question
  const handlePrevious = () => {
    previousQuestion(sectionId);
  };

  // Handle section completion
  const handleComplete = () => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = null;
    }
    completeSection(sectionId);
    completeHomework();
    router.push('/homework/hw1/complete');

    // Do not hold the results screen behind a network round trip.
    if (user) setTimeout(() => void syncToCloud(user.uid), 0);
  };

  // Keyboard shortcuts for MCQ
  useEffect(() => {
    if (currentQuestion?.type !== 'mcq' || showFeedback) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (['1', '2', '3', '4'].includes(key)) {
        updateResponse({ selectedOption: parseInt(key, 10) - 1 });
      } else if (key === 'Enter' && selectedOption !== null) {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion?.type, showFeedback, selectedOption, handleSubmit, updateResponse]);

  if (!currentQuestion) {
    return null;
  }

  const isLastQuestion = section.currentIndex === questions.length - 1;
  const isLastSection = true;
  const hasAnswered = showFeedback || existingAnswer !== undefined;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/homework/hw1"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Overview</span>
          </Link>
          <div className="flex items-center gap-4">
            <HomeworkProgressCompact
              currentSection={sectionId}
              sectionStatuses={Object.fromEntries(
                HOMEWORK1_SECTION_IDS.map((id) => [
                  id,
                  id === sectionId ? section.status : 'not_started',
                ])
              ) as Record<SectionId, 'not_started' | 'in_progress' | 'completed'>}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-6">
          {/* Section title */}
          <div>
            <p className="text-sm text-muted-foreground">Unified Homework 1</p>
            <h1 className="text-2xl font-bold">{meta.title}</h1>
          </div>

          {/* Progress bar */}
          <QuestionProgressBar
            current={section.currentIndex}
            total={questions.length}
            answered={section.answers.length}
          />

          {/* Question card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Question {section.currentIndex + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Alphabet typing and two-stage vocabulary questions */}
              {currentQuestion.type === 'transliteration' && (() => {
                const question = currentQuestion as TransliterationQuestion;

                if (question.transliterationOptions) {
                  const isTwoStage = Boolean(question.meaningOptions);
                  const options = isTwoStage && vocabularyStage === 'meaning'
                    ? question.meaningOptions ?? []
                    : question.transliterationOptions;

                  return (
                    <>
                      <div className="text-center space-y-2">
                        <p className="text-4xl hebrew-text font-serif tracking-wide" dir="rtl">{question.hebrew}</p>
                        <p className="text-lg font-medium">
                          {!isTwoStage
                            ? 'Which English transliteration matches this Hebrew letter?'
                            : vocabularyStage === 'transliteration'
                            ? 'Which English transliteration matches this Hebrew word?'
                            : `What does ${question.answer} mean in English?`}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {options.map((option, index) => {
                          const selected = selectedOption === index;
                          return (
                            <button
                              key={option}
                              onClick={() => !showFeedback && !showStageFeedback && updateResponse({ selectedOption: index })}
                              disabled={showFeedback || showStageFeedback}
                              className={cn(
                                'w-full touch-manipulation flex items-center gap-3 p-4 rounded-lg border text-left transition-colors duration-100 motion-reduce:transition-none',
                                'hover:border-primary hover:bg-primary/5 disabled:hover:border-border disabled:hover:bg-transparent',
                                selected && !showFeedback && !showStageFeedback && 'border-primary bg-primary/10'
                              )}
                            >
                              <span className="w-8 h-8 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center shrink-0 text-sm font-medium">{index + 1}</span>
                              <span>{option}</span>
                            </button>
                          );
                        })}
                      </div>

                      {isTwoStage && showStageFeedback && (
                        <div className={cn('flex items-start gap-3 p-4 rounded-lg', transliterationCorrect ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200')}>
                          {transliterationCorrect ? <Check className="w-5 h-5 shrink-0 mt-0.5" /> : <X className="w-5 h-5 shrink-0 mt-0.5" />}
                          <div>
                            <p className="font-medium">{transliterationCorrect ? 'Correct transliteration!' : 'Not quite right'}</p>
                            {!transliterationCorrect && <p className="text-sm mt-1">The correct transliteration is <strong>{question.answer}</strong>.</p>}
                          </div>
                        </div>
                      )}

                      {showFeedback && (
                        <div className={cn('flex items-start gap-3 p-4 rounded-lg', isCorrect ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200')}>
                          {isCorrect ? <Check className="w-5 h-5 shrink-0 mt-0.5" /> : <X className="w-5 h-5 shrink-0 mt-0.5" />}
                          <div>
                            <p className="font-medium">{isCorrect ? 'Correct!' : 'Not quite right'}</p>
                            {!isCorrect && (
                              <p className="text-sm mt-1">
                                The correct answer is <strong>
                                  {isTwoStage
                                    ? question.meaning
                                    : question.transliterationOptions[question.transliterationCorrectIndex ?? 0]}
                                </strong>.
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {!showFeedback && !showStageFeedback && <Button onClick={handleSubmit} disabled={selectedOption === null} className="w-full">Check Answer</Button>}
                      {isTwoStage && showStageFeedback && !showFeedback && <Button onClick={continueToMeaning} className="w-full">Continue to Meaning</Button>}
                    </>
                  );
                }

                return (
                  <>
                    <div className="text-center space-y-2">
                      <p className="text-4xl hebrew-text font-serif tracking-wide" dir="rtl">{question.hebrew}</p>
                      <p className="text-sm text-muted-foreground">Type the transliteration in English letters</p>
                    </div>
                    <input type="text" value={userInput} onChange={(e) => updateResponse({ userInput: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && !showFeedback && userInput.trim() && handleSubmit()} disabled={showFeedback} placeholder="Type your answer..." className={cn('w-full px-4 py-3 rounded-lg border bg-background text-lg text-center', 'focus:outline-none focus:ring-2 focus:ring-primary', showFeedback && isCorrect && 'border-green-500', showFeedback && !isCorrect && 'border-red-500')} autoFocus />
                    {showFeedback && <p className={cn('p-4 rounded-lg', isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>{isCorrect ? 'Correct!' : `The correct answer is: ${question.answer || '(silent letter)'}`}</p>}
                    {!showFeedback && <Button onClick={handleSubmit} disabled={!userInput.trim()} className="w-full">Check Answer</Button>}
                  </>
                );
              })()}

              {/* MCQ questions (Sections 3, 4, 5) */}
              {currentQuestion.type === 'mcq' && (
                <>
                  <div className="space-y-2">
                    {(currentQuestion as MCQQuestion).hebrew && (
                      <p className="text-3xl hebrew-text font-serif tracking-wide text-center mb-4" dir="rtl">
                        {(currentQuestion as MCQQuestion).hebrew}
                      </p>
                    )}
                    <p className="text-lg font-medium">
                      {(currentQuestion as MCQQuestion).question}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {(currentQuestion as MCQQuestion).options.map((option, index) => {
                      const isSelected = selectedOption === index;
                      const isCorrectOption = index === (currentQuestion as MCQQuestion).correctIndex;

                      return (
                        <button
                          key={index}
                          onClick={() => {
                            if (!showFeedback) {
                              updateResponse({ selectedOption: index });
                            }
                          }}
                          disabled={showFeedback}
                          className={cn(
                            'w-full touch-manipulation flex items-center gap-3 p-4 rounded-lg border text-left transition-colors duration-100 motion-reduce:transition-none',
                            'hover:border-primary hover:bg-primary/5',
                            'disabled:hover:border-border disabled:hover:bg-transparent',
                            isSelected && !showFeedback && 'border-primary bg-primary/10',
                            showFeedback && isCorrectOption && 'border-green-500 bg-green-100 dark:bg-green-900/30',
                            showFeedback && isSelected && !isCorrectOption && 'border-red-500 bg-red-100 dark:bg-red-900/30',
                            showFeedback && !isSelected && !isCorrectOption && 'opacity-50'
                          )}
                        >
                          <span
                            className={cn(
                              'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-medium',
                              'border-2',
                              isSelected && !showFeedback && 'border-primary bg-primary text-primary-foreground',
                              !isSelected && !showFeedback && 'border-muted-foreground/30',
                              showFeedback && isCorrectOption && 'border-green-500 bg-green-500 text-white',
                              showFeedback && isSelected && !isCorrectOption && 'border-red-500 bg-red-500 text-white'
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
                          <span className="flex-1">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Keyboard hint */}
                  {!showFeedback && (
                    <p className="text-xs text-muted-foreground text-center">
                      Press 1-4 to select, Enter to submit
                    </p>
                  )}

                  {/* Feedback */}
                  {showFeedback && (
                    <div
                      className={cn(
                        'flex items-start gap-3 p-4 rounded-lg',
                        isCorrect
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                          : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200'
                      )}
                    >
                      {isCorrect ? (
                        <Check className="w-5 h-5 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium">
                          {isCorrect ? 'Correct!' : 'Review this concept'}
                        </p>
                        <p className="text-sm mt-1">
                          {(currentQuestion as MCQQuestion).explanation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit button (only show if not yet answered) */}
                  {!showFeedback && (
                    <Button
                      onClick={handleSubmit}
                      disabled={selectedOption === null}
                      className="w-full"
                    >
                      Check Answer
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <SectionNavigation
            currentIndex={section.currentIndex}
            totalQuestions={questions.length}
            hasAnswered={hasAnswered}
            isLastQuestion={isLastQuestion}
            isLastSection={isLastSection}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onComplete={handleComplete}
          />
        </div>
      </main>

      {/* Floating help button */}
      <FloatingHelpButton currentSection={sectionId} />
    </div>
  );
}
