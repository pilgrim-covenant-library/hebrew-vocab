'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, Trophy, ThumbsUp, Zap, ChevronRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { HebrewWord } from '@/components/HebrewWord';
import { cn, shuffle } from '@/lib/utils';
import {
  BINYAN_LABELS,
  BINYAN_MEANINGS,
  CONJUGATION_LABELS,
  GENDER_LABELS,
  NUMBER_LABELS,
  STATE_LABELS,
  getBinyanDescription,
  getConjugationDescription,
  getStateDescription,
  type GrammaticalCase,
} from '@/lib/morphology';
import type { Binyan, HebrewConjugation, HebrewGender, HebrewNumber } from '@/types';

type QuestionType = 'binyan' | 'conjugation' | 'gender' | 'number' | 'state';

interface PracticeQuestion {
  word: string;
  lexicalForm: string;
  gloss: string;
  questionType: QuestionType;
  correctAnswer: string;
  options: string[];
  explanation: string;
}

// Sample questions for practice
const BINYAN_QUESTIONS: Omit<PracticeQuestion, 'options'>[] = [
  { word: 'שָׁמַר', lexicalForm: 'שָׁמַר', gloss: 'to keep, guard', questionType: 'binyan', correctAnswer: 'Qal', explanation: getBinyanDescription('qal') },
  { word: 'נִשְׁמַר', lexicalForm: 'שָׁמַר', gloss: 'to be guarded', questionType: 'binyan', correctAnswer: 'Niphal', explanation: getBinyanDescription('niphal') },
  { word: 'דִּבֶּר', lexicalForm: 'דָּבַר', gloss: 'to speak', questionType: 'binyan', correctAnswer: 'Piel', explanation: getBinyanDescription('piel') },
  { word: 'הִקְדִּישׁ', lexicalForm: 'קָדַשׁ', gloss: 'to sanctify', questionType: 'binyan', correctAnswer: 'Hiphil', explanation: getBinyanDescription('hiphil') },
  { word: 'הִתְקַדֵּשׁ', lexicalForm: 'קָדַשׁ', gloss: 'to sanctify oneself', questionType: 'binyan', correctAnswer: 'Hithpael', explanation: getBinyanDescription('hithpael') },
  { word: 'הֻקְדַּשׁ', lexicalForm: 'קָדַשׁ', gloss: 'to be sanctified (causative)', questionType: 'binyan', correctAnswer: 'Hophal', explanation: getBinyanDescription('hophal') },
  { word: 'לֻמַּד', lexicalForm: 'לָמַד', gloss: 'to be taught', questionType: 'binyan', correctAnswer: 'Pual', explanation: getBinyanDescription('pual') },
  { word: 'כָּתַב', lexicalForm: 'כָּתַב', gloss: 'to write', questionType: 'binyan', correctAnswer: 'Qal', explanation: getBinyanDescription('qal') },
];

const CONJUGATION_QUESTIONS: Omit<PracticeQuestion, 'options'>[] = [
  { word: 'שָׁמַר', lexicalForm: 'שָׁמַר', gloss: 'he kept', questionType: 'conjugation', correctAnswer: 'Perfect', explanation: getConjugationDescription('perfect') },
  { word: 'יִשְׁמֹר', lexicalForm: 'שָׁמַר', gloss: 'he will keep', questionType: 'conjugation', correctAnswer: 'Imperfect', explanation: getConjugationDescription('imperfect') },
  { word: 'שְׁמֹר', lexicalForm: 'שָׁמַר', gloss: 'keep! (command)', questionType: 'conjugation', correctAnswer: 'Imperative', explanation: getConjugationDescription('imperative') },
  { word: 'לִשְׁמֹר', lexicalForm: 'שָׁמַר', gloss: 'to keep', questionType: 'conjugation', correctAnswer: 'Infinitive Construct', explanation: getConjugationDescription('infinitive_construct') },
  { word: 'שׁוֹמֵר', lexicalForm: 'שָׁמַר', gloss: 'keeping, one who keeps', questionType: 'conjugation', correctAnswer: 'Participle', explanation: getConjugationDescription('participle') },
  { word: 'כָּתַב', lexicalForm: 'כָּתַב', gloss: 'he wrote', questionType: 'conjugation', correctAnswer: 'Perfect', explanation: getConjugationDescription('perfect') },
  { word: 'יִכְתֹּב', lexicalForm: 'כָּתַב', gloss: 'he will write', questionType: 'conjugation', correctAnswer: 'Imperfect', explanation: getConjugationDescription('imperfect') },
  { word: 'כְּתֹב', lexicalForm: 'כָּתַב', gloss: 'write! (command)', questionType: 'conjugation', correctAnswer: 'Imperative', explanation: getConjugationDescription('imperative') },
];

const STATE_QUESTIONS: Omit<PracticeQuestion, 'options'>[] = [
  { word: 'דָּבָר', lexicalForm: 'דָּבָר', gloss: 'word', questionType: 'state', correctAnswer: 'Absolute', explanation: getStateDescription('absolute') },
  { word: 'דְּבַר', lexicalForm: 'דָּבָר', gloss: 'word of', questionType: 'state', correctAnswer: 'Construct', explanation: getStateDescription('construct') },
  { word: 'מֶלֶךְ', lexicalForm: 'מֶלֶךְ', gloss: 'king', questionType: 'state', correctAnswer: 'Absolute', explanation: getStateDescription('absolute') },
  { word: 'מֶלֶךְ', lexicalForm: 'מֶלֶךְ', gloss: 'king of', questionType: 'state', correctAnswer: 'Construct', explanation: getStateDescription('construct') },
  { word: 'בַּיִת', lexicalForm: 'בַּיִת', gloss: 'house', questionType: 'state', correctAnswer: 'Absolute', explanation: getStateDescription('absolute') },
  { word: 'בֵּית', lexicalForm: 'בַּיִת', gloss: 'house of', questionType: 'state', correctAnswer: 'Construct', explanation: getStateDescription('construct') },
];

const GENDER_QUESTIONS: Omit<PracticeQuestion, 'options'>[] = [
  { word: 'מֶלֶךְ', lexicalForm: 'מֶלֶךְ', gloss: 'king', questionType: 'gender', correctAnswer: 'Masculine', explanation: 'Masculine nouns often end with no special suffix.' },
  { word: 'מַלְכָּה', lexicalForm: 'מַלְכָּה', gloss: 'queen', questionType: 'gender', correctAnswer: 'Feminine', explanation: 'The ה ending is a common feminine marker.' },
  { word: 'תּוֹרָה', lexicalForm: 'תּוֹרָה', gloss: 'law, instruction', questionType: 'gender', correctAnswer: 'Feminine', explanation: 'The ה ending is a common feminine marker.' },
  { word: 'יָד', lexicalForm: 'יָד', gloss: 'hand', questionType: 'gender', correctAnswer: 'Feminine', explanation: 'Body parts that come in pairs are often feminine.' },
  { word: 'אָב', lexicalForm: 'אָב', gloss: 'father', questionType: 'gender', correctAnswer: 'Masculine', explanation: 'Natural gender corresponds to masculine.' },
  { word: 'אֵם', lexicalForm: 'אֵם', gloss: 'mother', questionType: 'gender', correctAnswer: 'Feminine', explanation: 'Natural gender corresponds to feminine.' },
];

const NUMBER_QUESTIONS: Omit<PracticeQuestion, 'options'>[] = [
  { word: 'סוּס', lexicalForm: 'סוּס', gloss: 'horse', questionType: 'number', correctAnswer: 'Singular', explanation: 'Singular nouns have no plural suffix.' },
  { word: 'סוּסִים', lexicalForm: 'סוּס', gloss: 'horses', questionType: 'number', correctAnswer: 'Plural', explanation: 'The ים ending is the masculine plural suffix.' },
  { word: 'תּוֹרוֹת', lexicalForm: 'תּוֹרָה', gloss: 'laws', questionType: 'number', correctAnswer: 'Plural', explanation: 'The וֹת ending is the feminine plural suffix.' },
  { word: 'יָדַיִם', lexicalForm: 'יָד', gloss: 'hands (pair)', questionType: 'number', correctAnswer: 'Dual', explanation: 'The יִם ending indicates dual (pair of).' },
  { word: 'עֵינַיִם', lexicalForm: 'עַיִן', gloss: 'eyes (pair)', questionType: 'number', correctAnswer: 'Dual', explanation: 'The יִם ending indicates dual (pair of).' },
  { word: 'בֵּן', lexicalForm: 'בֵּן', gloss: 'son', questionType: 'number', correctAnswer: 'Singular', explanation: 'Singular nouns have no plural suffix.' },
];

function generateOptions(correctAnswer: string, allOptions: string[]): string[] {
  const options = new Set<string>([correctAnswer]);
  const shuffled = [...allOptions].sort(() => Math.random() - 0.5);

  for (const option of shuffled) {
    if (options.size >= 4) break;
    options.add(option);
  }

  return [...options].sort(() => Math.random() - 0.5);
}

function generateQuestions(type: QuestionType | 'all', count: number = 10): PracticeQuestion[] {
  let pool: Omit<PracticeQuestion, 'options'>[] = [];

  if (type === 'binyan' || type === 'all') {
    pool = [...pool, ...BINYAN_QUESTIONS];
  }
  if (type === 'conjugation' || type === 'all') {
    pool = [...pool, ...CONJUGATION_QUESTIONS];
  }
  if (type === 'state' || type === 'all') {
    pool = [...pool, ...STATE_QUESTIONS];
  }
  if (type === 'gender' || type === 'all') {
    pool = [...pool, ...GENDER_QUESTIONS];
  }
  if (type === 'number' || type === 'all') {
    pool = [...pool, ...NUMBER_QUESTIONS];
  }

  const shuffled = shuffle([...pool]).slice(0, count);

  return shuffled.map((q) => {
    let opts: string[] = [];
    switch (q.questionType) {
      case 'binyan':
        opts = Object.values(BINYAN_LABELS);
        break;
      case 'conjugation':
        opts = Object.values(CONJUGATION_LABELS);
        break;
      case 'state':
        opts = Object.values(STATE_LABELS);
        break;
      case 'gender':
        opts = Object.values(GENDER_LABELS);
        break;
      case 'number':
        opts = Object.values(NUMBER_LABELS);
        break;
    }
    return {
      ...q,
      options: generateOptions(q.correctAnswer, opts),
    };
  });
}

export default function PracticePage() {
  const [mounted, setMounted] = useState(false);
  const [started, setStarted] = useState(false);
  const [practiceType, setPracticeType] = useState<QuestionType | 'all'>('all');
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  const [sessionComplete, setSessionComplete] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const startPractice = () => {
    const newQuestions = generateQuestions(practiceType, 10);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setStats({ correct: 0, incorrect: 0 });
    setSessionComplete(false);
    setStarted(true);
  };

  const handleSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setShowResult(true);

    const isCorrect = selectedAnswer === questions[currentIndex].correctAnswer;
    setStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setSessionComplete(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setSessionComplete(false);
  };

  const currentQuestion = questions[currentIndex];
  const accuracy = stats.correct + stats.incorrect > 0
    ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100)
    : 0;

  if (!mounted) {
    return null;
  }

  // Setup screen
  if (!started) {
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
              <h1 className="text-lg font-semibold">Practice Parsing</h1>
              <p className="text-xs text-muted-foreground">Test your Hebrew morphology skills</p>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 max-w-lg">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-xl font-bold mb-2">Hebrew Morphology Practice</h2>
            <p className="text-muted-foreground text-sm">
              Identify binyanim, conjugations, gender, number, and state in Hebrew words.
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="py-4">
              <h3 className="font-medium mb-3">Practice Type</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: 'All Types' },
                  { id: 'binyan', label: 'Binyanim' },
                  { id: 'conjugation', label: 'Conjugations' },
                  { id: 'state', label: 'Construct/Absolute' },
                  { id: 'gender', label: 'Gender' },
                  { id: 'number', label: 'Number' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setPracticeType(type.id as QuestionType | 'all')}
                    className={cn(
                      'p-3 rounded-lg border text-left transition-all',
                      practiceType === type.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/50'
                    )}
                  >
                    <div className="font-medium text-sm">{type.label}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button size="lg" className="w-full h-14" onClick={startPractice}>
            Start Practice
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </main>
      </div>
    );
  }

  // Session complete
  if (sessionComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="py-8 text-center">
            <div className="flex justify-center mb-4">
              {accuracy >= 80 ? (
                <Trophy className="w-16 h-16 text-amber-500" />
              ) : accuracy >= 60 ? (
                <ThumbsUp className="w-16 h-16 text-blue-500" />
              ) : (
                <Zap className="w-16 h-16 text-purple-500" />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">Practice Complete!</h2>
            <div className="space-y-2 mb-6">
              <p className="text-lg">
                <span className="font-bold text-emerald-500">{stats.correct}</span>
                <span className="text-muted-foreground"> correct / </span>
                <span className="font-bold text-red-500">{stats.incorrect}</span>
                <span className="text-muted-foreground"> incorrect</span>
              </p>
              <p className="text-3xl font-bold text-primary">{accuracy}%</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleRestart} className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Link href="/grammar" className="flex-1">
                <Button className="w-full">Done</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Active practice
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-4 text-sm">
              <span className="text-emerald-500 font-medium">✓ {stats.correct}</span>
              <span className="text-red-500 font-medium">✗ {stats.incorrect}</span>
            </div>
            <span className="text-sm font-medium">
              {currentIndex + 1} / {questions.length}
            </span>
            <Link href="/grammar">
              <Button variant="ghost" size="sm">Exit</Button>
            </Link>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start p-4">
        {currentQuestion && (
          <>
            {/* Question card */}
            <Card className="w-full max-w-md mb-6">
              <CardContent className="py-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  What is the{' '}
                  <span className="font-medium text-foreground">
                    {currentQuestion.questionType}
                  </span>{' '}
                  of this form?
                </p>
                <HebrewWord hebrew={currentQuestion.word} size="xl" className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  from <HebrewWord hebrew={currentQuestion.lexicalForm} size="sm" className="inline" /> ({currentQuestion.gloss})
                </p>
              </CardContent>
            </Card>

            {/* Options */}
            <div className="w-full max-w-md space-y-2 mb-6">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;

                let bgColor = '';
                if (showResult) {
                  if (isCorrect) {
                    bgColor = 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    bgColor = 'bg-red-100 dark:bg-red-900/30 border-red-500';
                  }
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    disabled={showResult}
                    className={cn(
                      'w-full p-4 rounded-xl border text-left transition-all',
                      isSelected && !showResult && 'border-primary bg-primary/5',
                      showResult && bgColor,
                      !showResult && !isSelected && 'hover:border-muted-foreground/50',
                      showResult && 'cursor-default'
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showResult && (
              <div
                className={cn(
                  'w-full max-w-md p-4 rounded-xl mb-4',
                  selectedAnswer === currentQuestion.correctAnswer
                    ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300'
                )}
              >
                <p className="font-bold">
                  {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                </p>
                {selectedAnswer !== currentQuestion.correctAnswer && (
                  <p className="text-sm mt-1">
                    The correct answer is: <strong>{currentQuestion.correctAnswer}</strong>
                  </p>
                )}
                <p className="text-xs mt-2 flex items-start gap-1 opacity-80">
                  <Info className="w-3 h-3 mt-0.5 shrink-0" />
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Action button */}
            <div className="w-full max-w-md">
              {!showResult ? (
                <Button
                  size="lg"
                  className="w-full"
                  disabled={!selectedAnswer}
                  onClick={handleSubmit}
                >
                  Check Answer
                </Button>
              ) : (
                <Button size="lg" className="w-full" onClick={handleNext}>
                  {currentIndex < questions.length - 1 ? (
                    <>
                      Next Question
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    'See Results'
                  )}
                </Button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
