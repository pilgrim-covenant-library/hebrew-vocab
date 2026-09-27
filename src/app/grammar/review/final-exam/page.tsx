'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ExamTimer } from '@/components/homework/ExamTimer';
import { ExamQuestionGrid } from '@/components/homework/ExamQuestionGrid';
import { ExamReview } from '@/components/homework/ExamReview';
import {
  Gate,
  Intro,
  MCQQuestion,
  Results,
  VerseAnalysisQuestion,
  type EmailStatus,
} from '@/components/homework/FinalExamScreens';
import {
  EXAM_DURATION_MS,
  EXAM_TITLE,
  buildQuestions,
  computeSummary,
  createQuestionOrder,
  type ExamSummary,
} from '@/lib/finalExam';
import { useFinalExamStore, type FinalExamSectionId } from '@/stores/finalExamStore';

const SECTION_TITLES: Record<FinalExamSectionId, string> = {
  1: 'Grammar Understanding',
  2: 'Vocabulary',
  3: 'Verse Analysis',
};
const GRID_TITLES: Record<FinalExamSectionId, string> = { 1: 'Grammar', 2: 'Vocabulary', 3: 'Verse Analysis' };

// On the server there is no localStorage, so zustand leaves `persist` off the store.
const onSavedExamLoaded = (listener: () => void) => useFinalExamStore.persist?.onFinishHydration(listener) ?? (() => {});
const savedExamLoaded = () => useFinalExamStore.persist?.hasHydrated() ?? false;

/** False on the server and during hydration; true once the saved exam has been read from localStorage. */
function useSavedExamLoaded(): boolean {
  return useSyncExternalStore(onSavedExamLoaded, savedExamLoaded, () => false);
}

/** POST the submission to the instructor; true only when the email service accepted it. */
async function emailResults(studentName: string, summary: ExamSummary, submittedAt: number): Promise<boolean> {
  try {
    const res = await fetch('/api/send-exam-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examTitle: EXAM_TITLE,
        studentName: studentName || 'Unknown Student',
        studentEmail: '',
        grammarScore: summary.grammarCorrect,
        grammarTotal: summary.grammarTotal,
        vocabScore: summary.vocabCorrect,
        vocabTotal: summary.vocabTotal,
        translationScore: summary.verseAnalysisScore,
        translationTotal: summary.verseAnalysisTotal,
        translationAnswers: summary.translationAnswers,
        mcqAnswers: summary.mcqAnswers,
        completedAt: new Date(submittedAt).toLocaleString(),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export default function GrammarReviewFinalExamPage() {
  const loaded = useSavedExamLoaded();
  const exam = useFinalExamStore();
  const [reviewing, setReviewing] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);
  const [emailAttempt, setEmailAttempt] = useState(0);
  const lastEmailAttemptRef = useRef(-1);

  const questions = useMemo(() => buildQuestions(exam.questionOrder), [exam.questionOrder]);
  const summary = useMemo(
    () => (exam.submittedAt ? computeSummary(questions, exam.mcqAnswers, exam.verseMatching, exam.verseTranslations) : null),
    [exam.submittedAt, questions, exam.mcqAnswers, exam.verseMatching, exam.verseTranslations],
  );

  // Email every submission once it is made — and again on any later visit until
  // the instructor's copy is confirmed, so a closed tab or dropped connection
  // cannot lose it.
  const { studentName, submittedAt, emailedAt } = exam;
  useEffect(() => {
    if (!loaded || !summary || !submittedAt || emailedAt !== null) return;
    if (lastEmailAttemptRef.current === emailAttempt) return;
    lastEmailAttemptRef.current = emailAttempt;
    void emailResults(studentName, summary, submittedAt).then((sent) => {
      if (sent) useFinalExamStore.getState().markEmailed();
      else setEmailFailed(true);
    });
  }, [loaded, summary, studentName, submittedAt, emailedAt, emailAttempt]);

  // Idempotent: reads the saved state, so a double click or a timer firing
  // after a manual submit cannot submit twice.
  const submitExam = useCallback((timedOut: boolean) => {
    const saved = useFinalExamStore.getState();
    if (saved.submittedAt || saved.questionOrder.length === 0) return;
    saved.submitExam(timedOut);
  }, []);
  const handleTimeout = useCallback(() => submitExam(true), [submitExam]);

  if (!loaded) return null;

  const emailStatus: EmailStatus = emailedAt !== null ? 'sent' : emailFailed ? 'failed' : 'sending';

  const beginExam = () => {
    exam.startExam(createQuestionOrder());
    setReviewing(false);
    setEmailFailed(false);
  };

  const resetExam = () => {
    exam.reset();
    setReviewing(false);
    setEmailFailed(false);
  };

  if (summary && reviewing) {
    return (
      <ExamReview
        questions={questions}
        currentIndex={Math.min(exam.currentIndex, questions.length - 1)}
        mcqAnswers={exam.mcqAnswers}
        verseMatching={exam.verseMatching}
        verseTranslations={exam.verseTranslations}
        studentName={studentName}
        onNavigate={exam.setCurrentIndex}
        onBack={() => setReviewing(false)}
      />
    );
  }

  if (summary) {
    return (
      <Results
        summary={summary}
        emailStatus={emailStatus}
        timedOut={exam.timedOut}
        onRetryEmail={() => {
          setEmailFailed(false);
          setEmailAttempt((attempt) => attempt + 1);
        }}
        onReview={() => {
          exam.setCurrentIndex(0);
          setReviewing(true);
        }}
        onRetake={resetExam}
      />
    );
  }

  if (!exam.startedAt || questions.length === 0) {
    return studentName ? <Intro onStart={beginExam} onReset={resetExam} /> : <Gate onUnlock={exam.setStudentName} />;
  }

  const currentIndex = Math.min(exam.currentIndex, questions.length - 1);
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const sectionStart = (sectionId: FinalExamSectionId) => questions.findIndex((q) => q.sectionId === sectionId);
  const isAnswered = (id: string) =>
    typeof exam.mcqAnswers[id] === 'number' ||
    Object.keys(exam.verseMatching[id] ?? {}).length > 0 ||
    (exam.verseTranslations[id] ?? '').trim() !== '';
  const gridSections = ([1, 2, 3] as const).map((sectionId) => {
    const questionIds = questions.filter((q) => q.sectionId === sectionId).map((q) => q.data.id);
    return {
      sectionId,
      title: GRID_TITLES[sectionId],
      questionIds,
      answeredIds: new Set(questionIds.filter(isAnswered)),
      flaggedIds: new Set<string>(),
    };
  });
  const sectionIndex = currentIndex - sectionStart(currentQuestion.sectionId);
  const sectionTotal = gridSections[currentQuestion.sectionId - 1].questionIds.length;

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
              <h1 className="text-xl font-semibold">{SECTION_TITLES[currentQuestion.sectionId]}</h1>
            </div>
            <div className="text-right">
              <div className="flex justify-end mb-1">
                <ExamTimer startedAt={exam.startedAt} duration={EXAM_DURATION_MS} onExpire={handleTimeout} />
              </div>
              <p className="text-sm font-medium text-primary">{studentName}</p>
              <p className="text-xs text-muted-foreground">No answer feedback until submission</p>
            </div>
          </div>

          <div className="flex justify-center">
            <ExamQuestionGrid
              sections={gridSections}
              currentSectionId={currentQuestion.sectionId}
              currentQuestionIndex={sectionIndex}
              onNavigate={(sectionId, index) => exam.setCurrentIndex(sectionStart(sectionId) + index)}
            />
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
                  {sectionIndex + 1}/{sectionTotal}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentQuestion.type === 'mcq' ? (
                <MCQQuestion
                  question={currentQuestion.data}
                  selected={exam.mcqAnswers[currentQuestion.data.id]}
                  onSelect={(index) => exam.saveMcq(currentQuestion.data.id, index)}
                />
              ) : (
                <VerseAnalysisQuestion
                  question={currentQuestion.data}
                  matching={exam.verseMatching[currentQuestion.data.id] || {}}
                  translation={exam.verseTranslations[currentQuestion.data.id] || ''}
                  onMatchingChange={(hebrew, category) => exam.saveMatching(currentQuestion.data.id, hebrew, category)}
                  onTranslationChange={(text) => exam.saveTranslation(currentQuestion.data.id, text)}
                />
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => exam.setCurrentIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="text-xs text-muted-foreground text-center hidden sm:block">
              Your answers are saved on this device as you go.
            </div>

            <Button
              onClick={() => (isLastQuestion ? submitExam(false) : exam.setCurrentIndex(currentIndex + 1))}
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
