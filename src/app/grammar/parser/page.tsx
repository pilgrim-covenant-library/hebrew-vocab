'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  Info,
  Sparkles,
  BookOpen,
  Zap,
  Target,
  Filter,
  ChevronDown,
  CheckCircle2,
  XCircle,
  RotateCcw,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MorphologyBreakdown, GrammarExplanation } from '@/components/MorphologyBreakdown';
import { HebrewWord } from '@/components/HebrewWord';
import { cn } from '@/lib/utils';
import {
  type ParsedMorphology,
  type WeakVerbPattern,
  type MorphologyQuestion,
  BINYAN_LABELS,
  BINYAN_MEANINGS,
  WEAK_PATTERN_LABELS,
  WEAK_PATTERN_DESCRIPTIONS,
  generateFullParsingQuestion,
  generateParsingQuiz,
  filterVocabularyForPractice,
  identifyWeakPattern,
  extractRoot,
  formatMorphology,
  type VocabularyWord as MorphVocabWord,
} from '@/lib/morphology';
import vocabularyData from '@/data/vocabulary.json';
import type { VocabularyWord, Binyan } from '@/types';

// Practice mode types
type PracticeMode = 'search' | 'binyan-quiz' | 'root-extraction' | 'weak-pattern' | 'full-parsing';

// Filter options
interface FilterOptions {
  partOfSpeech: string[];
  binyan: Binyan[];
  weakPattern: WeakVerbPattern[];
  searchTerm: string;
}

// Quiz state
interface QuizState {
  currentQuestion: MorphologyQuestion | null;
  currentWord: VocabularyWord | null;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  showHint: boolean;
  questionsAnswered: number;
  correctAnswers: number;
}

// All binyanim for filtering
const ALL_BINYANIM: Binyan[] = ['qal', 'niphal', 'piel', 'pual', 'hiphil', 'hophal', 'hithpael'];

// Common weak patterns for filtering
const COMMON_WEAK_PATTERNS: WeakVerbPattern[] = [
  'strong', 'pe-nun', 'pe-yod', 'pe-aleph', 'ayin-vav', 'ayin-yod',
  'lamed-he', 'lamed-aleph', 'geminate'
];

export default function ParserPage() {
  const [mounted, setMounted] = useState(false);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('search');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    partOfSpeech: [],
    binyan: [],
    weakPattern: [],
    searchTerm: '',
  });

  // Search mode state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState<VocabularyWord | null>(null);
  const [parsedInfo, setParsedInfo] = useState<ReturnType<typeof generateFullParsingQuestion> | null>(null);

  // Quiz mode state
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: null,
    currentWord: null,
    selectedAnswer: null,
    isCorrect: null,
    showHint: false,
    questionsAnswered: 0,
    correctAnswers: 0,
  });

  // Root extraction mode state
  const [rootGuess, setRootGuess] = useState('');
  const [rootResult, setRootResult] = useState<{ correct: boolean; actualRoot: string } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cast vocabulary data
  const allWords = useMemo(() => vocabularyData.words as VocabularyWord[], []);

  // Filter vocabulary for practice
  const filteredWords = useMemo(() => {
    let words = allWords;

    if (filters.partOfSpeech.length > 0) {
      words = words.filter(w => filters.partOfSpeech.includes(w.partOfSpeech.toLowerCase()));
    }

    if (filters.binyan.length > 0) {
      words = words.filter(w =>
        w.partOfSpeech.toLowerCase() === 'verb' &&
        w.morphology?.binyan &&
        filters.binyan.includes(w.morphology.binyan as Binyan)
      );
    }

    if (filters.weakPattern.length > 0) {
      words = words.filter(w => {
        if (w.partOfSpeech.toLowerCase() !== 'verb') return false;
        const root = w.morphology?.root || extractRoot(w.hebrew);
        if (!root) return false;
        const pattern = identifyWeakPattern(root);
        return filters.weakPattern.includes(pattern);
      });
    }

    return words;
  }, [allWords, filters]);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return allWords
      .filter(w =>
        w.hebrew.includes(searchTerm) ||
        w.gloss.toLowerCase().includes(term) ||
        w.transliteration?.toLowerCase().includes(term)
      )
      .slice(0, 20);
  }, [allWords, searchTerm]);

  // Get verbs for practice modes
  const verbsForPractice = useMemo(() => {
    return filteredWords.filter(w => w.partOfSpeech.toLowerCase() === 'verb');
  }, [filteredWords]);

  // Generate a new quiz question
  const generateNewQuestion = useCallback((mode: PracticeMode) => {
    const wordsPool = mode === 'binyan-quiz' || mode === 'weak-pattern' || mode === 'root-extraction'
      ? verbsForPractice
      : filteredWords;

    if (wordsPool.length === 0) return;

    const randomWord = wordsPool[Math.floor(Math.random() * wordsPool.length)];

    let questionType: 'binyan' | 'full' | 'gender' | 'number' | 'weak-pattern' = 'full';
    if (mode === 'binyan-quiz') questionType = 'binyan';
    else if (mode === 'weak-pattern') questionType = 'weak-pattern';

    const question = generateParsingQuiz(randomWord as unknown as MorphVocabWord, questionType);

    setQuizState(prev => ({
      ...prev,
      currentQuestion: question,
      currentWord: randomWord,
      selectedAnswer: null,
      isCorrect: null,
      showHint: false,
    }));
    setRootGuess('');
    setRootResult(null);
  }, [verbsForPractice, filteredWords]);

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (quizState.isCorrect !== null) return; // Already answered

    const isCorrect = answer === quizState.currentQuestion?.correctAnswer;
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answer,
      isCorrect,
      questionsAnswered: prev.questionsAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
    }));
  };

  // Handle root extraction guess
  const handleRootGuess = () => {
    if (!quizState.currentWord) return;

    const actualRoot = quizState.currentWord.morphology?.root ||
      extractRoot(quizState.currentWord.hebrew) || '';

    // Normalize both for comparison (remove vowels)
    const normalizeRoot = (r: string) => r.replace(/[\u0591-\u05C7]/g, '');
    const isCorrect = normalizeRoot(rootGuess) === normalizeRoot(actualRoot);

    setRootResult({ correct: isCorrect, actualRoot });
    setQuizState(prev => ({
      ...prev,
      questionsAnswered: prev.questionsAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
    }));
  };

  // Handle word selection in search mode
  const handleWordSelect = (word: VocabularyWord) => {
    setSelectedWord(word);
    const parsed = generateFullParsingQuestion(word as unknown as MorphVocabWord);
    setParsedInfo(parsed);
    setSearchTerm(word.hebrew);
  };

  // Reset quiz stats
  const resetStats = () => {
    setQuizState(prev => ({
      ...prev,
      questionsAnswered: 0,
      correctAnswers: 0,
    }));
  };

  // Start practice mode
  const startPractice = (mode: PracticeMode) => {
    setPracticeMode(mode);
    setSelectedWord(null);
    setParsedInfo(null);
    setSearchTerm('');
    if (mode !== 'search') {
      generateNewQuestion(mode);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/grammar">
            <Button variant="ghost" size="icon" aria-label="Back to grammar">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Hebrew Grammar Parser</h1>
            <p className="text-xs text-muted-foreground">
              Analyze morphology • Practice parsing • {allWords.length.toLocaleString()} words
            </p>
          </div>
          {practiceMode !== 'search' && (
            <div className="text-right text-sm">
              <div className="font-medium text-primary">
                {quizState.correctAnswers}/{quizState.questionsAnswered}
              </div>
              <div className="text-xs text-muted-foreground">
                {quizState.questionsAnswered > 0
                  ? `${Math.round((quizState.correctAnswers / quizState.questionsAnswered) * 100)}%`
                  : 'Ready'}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Practice Mode Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          <button
            onClick={() => startPractice('search')}
            className={cn(
              'p-3 rounded-lg border text-center transition-colors',
              practiceMode === 'search'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'hover:bg-muted/50'
            )}
          >
            <Search className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Search</span>
          </button>
          <button
            onClick={() => startPractice('binyan-quiz')}
            className={cn(
              'p-3 rounded-lg border text-center transition-colors',
              practiceMode === 'binyan-quiz'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'hover:bg-muted/50'
            )}
          >
            <Target className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Binyan Quiz</span>
          </button>
          <button
            onClick={() => startPractice('root-extraction')}
            className={cn(
              'p-3 rounded-lg border text-center transition-colors',
              practiceMode === 'root-extraction'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'hover:bg-muted/50'
            )}
          >
            <BookOpen className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Root Extraction</span>
          </button>
          <button
            onClick={() => startPractice('weak-pattern')}
            className={cn(
              'p-3 rounded-lg border text-center transition-colors',
              practiceMode === 'weak-pattern'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'hover:bg-muted/50'
            )}
          >
            <Zap className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Weak Verbs</span>
          </button>
          <button
            onClick={() => startPractice('full-parsing')}
            className={cn(
              'p-3 rounded-lg border text-center transition-colors',
              practiceMode === 'full-parsing'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'hover:bg-muted/50'
            )}
          >
            <Sparkles className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Full Parse</span>
          </button>
        </div>

        {/* Filters Toggle */}
        {practiceMode !== 'search' && (
          <div className="mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Filter className="w-4 h-4" />
              Filter options
              <ChevronDown className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-180')} />
            </button>

            {showFilters && (
              <div className="mt-3 p-4 bg-muted/50 rounded-lg space-y-4">
                {/* Binyan filter */}
                <div>
                  <p className="text-xs font-medium mb-2">Binyan</p>
                  <div className="flex flex-wrap gap-1">
                    {ALL_BINYANIM.map(binyan => (
                      <button
                        key={binyan}
                        onClick={() => {
                          setFilters(prev => ({
                            ...prev,
                            binyan: prev.binyan.includes(binyan)
                              ? prev.binyan.filter(b => b !== binyan)
                              : [...prev.binyan, binyan],
                          }));
                        }}
                        className={cn(
                          'px-2 py-1 text-xs rounded border transition-colors',
                          filters.binyan.includes(binyan)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'hover:bg-muted'
                        )}
                      >
                        {BINYAN_LABELS[binyan]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weak pattern filter */}
                {(practiceMode === 'weak-pattern' || practiceMode === 'root-extraction') && (
                  <div>
                    <p className="text-xs font-medium mb-2">Weak Pattern</p>
                    <div className="flex flex-wrap gap-1">
                      {COMMON_WEAK_PATTERNS.map(pattern => (
                        <button
                          key={pattern}
                          onClick={() => {
                            setFilters(prev => ({
                              ...prev,
                              weakPattern: prev.weakPattern.includes(pattern)
                                ? prev.weakPattern.filter(p => p !== pattern)
                                : [...prev.weakPattern, pattern],
                            }));
                          }}
                          className={cn(
                            'px-2 py-1 text-xs rounded border transition-colors',
                            filters.weakPattern.includes(pattern)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'hover:bg-muted'
                          )}
                        >
                          {WEAK_PATTERN_LABELS[pattern]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{verbsForPractice.length.toLocaleString()} verbs match filters</span>
                  <button
                    onClick={() => setFilters({ partOfSpeech: [], binyan: [], weakPattern: [], searchTerm: '' })}
                    className="text-primary hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Mode */}
        {practiceMode === 'search' && (
          <>
            {/* Search input */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedWord(null);
                  setParsedInfo(null);
                }}
                placeholder="Search Hebrew words, transliteration, or English..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>

            {/* Search results */}
            {searchTerm && !selectedWord && (
              <div className="mb-6">
                {searchResults.length > 0 ? (
                  <Card>
                    <CardContent className="p-2">
                      <p className="text-xs text-muted-foreground px-2 py-1 mb-1">
                        {searchResults.length} matches found (click to analyze):
                      </p>
                      <div className="divide-y max-h-80 overflow-y-auto">
                        {searchResults.map((word) => (
                          <div
                            key={word.id}
                            className="px-3 py-2 hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => handleWordSelect(word)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <HebrewWord hebrew={word.hebrew} size="md" showAudio={false} />
                                <span className="text-sm text-muted-foreground">{word.gloss}</span>
                              </div>
                              <span className="text-xs text-muted-foreground capitalize">
                                {word.partOfSpeech}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No words found matching "{searchTerm}"</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Selected word parsing */}
            {selectedWord && parsedInfo && (
              <div className="mb-6 space-y-4">
                <MorphologyBreakdown
                  word={parsedInfo.hebrew}
                  parsing={parsedInfo.correctParsing}
                  showDescription
                />

                {/* Additional info for verbs */}
                {parsedInfo.correctParsing.partOfSpeech === 'verb' && (
                  <Card className="bg-muted/30">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">Root:</span>
                        <span className="hebrew-text text-lg" dir="rtl">
                          {parsedInfo.root || 'Unknown'}
                        </span>
                      </div>
                      {parsedInfo.weakPattern && parsedInfo.weakPattern !== 'strong' && (
                        <div>
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" />
                            <span className="text-sm font-medium">
                              {WEAK_PATTERN_LABELS[parsedInfo.weakPattern]}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {WEAK_PATTERN_DESCRIPTIONS[parsedInfo.weakPattern]}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedWord(null);
                    setParsedInfo(null);
                    setSearchTerm('');
                  }}
                >
                  Parse another word
                </Button>
              </div>
            )}

            {/* Quick reference */}
            {!searchTerm && (
              <div className="space-y-4">
                <h2 className="text-sm font-medium text-muted-foreground">Quick Reference</h2>

                <GrammarExplanation
                  title="The Seven Binyanim"
                  explanation="Hebrew verbs have seven stems (binyanim) that modify the basic meaning of the root: Qal (simple active), Niphal (simple passive/reflexive), Piel (intensive active), Pual (intensive passive), Hiphil (causative active), Hophal (causative passive), and Hithpael (reflexive)."
                  examples={[
                    { hebrew: 'כָּתַב', translation: 'he wrote (Qal)' },
                    { hebrew: 'נִכְתַּב', translation: 'it was written (Niphal)' },
                  ]}
                />

                <GrammarExplanation
                  title="Weak Verb Patterns"
                  explanation="Weak verbs have one or more 'weak' consonants (נ, י, ו, א, ה) in their root that cause spelling changes. Common types include Pe-Nun (נפל), Pe-Yod (ישׁב), Ayin-Vav (קום), and Lamed-He (בנה)."
                  examples={[
                    { hebrew: 'נָפַל', translation: 'he fell (Pe-Nun)' },
                    { hebrew: 'יָשַׁב', translation: 'he sat (Pe-Yod)' },
                  ]}
                />
              </div>
            )}
          </>
        )}

        {/* Binyan Quiz Mode */}
        {practiceMode === 'binyan-quiz' && quizState.currentQuestion && quizState.currentWord && (
          <QuizCard
            question={quizState.currentQuestion}
            word={quizState.currentWord}
            selectedAnswer={quizState.selectedAnswer}
            isCorrect={quizState.isCorrect}
            showHint={quizState.showHint}
            onSelectAnswer={handleAnswerSelect}
            onShowHint={() => setQuizState(prev => ({ ...prev, showHint: true }))}
            onNext={() => generateNewQuestion('binyan-quiz')}
            onReset={resetStats}
            title="Identify the Binyan"
            subtitle="Which binyan is this verb in?"
          />
        )}

        {/* Root Extraction Mode */}
        {practiceMode === 'root-extraction' && quizState.currentWord && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Extract the Root</span>
                <button
                  onClick={resetStats}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Word display */}
              <div className="text-center p-6 bg-muted/30 rounded-lg">
                <HebrewWord hebrew={quizState.currentWord.hebrew} size="xl" showAudio={false} />
                <p className="text-muted-foreground mt-2">{quizState.currentWord.gloss}</p>
                {quizState.currentWord.transliteration && (
                  <p className="text-sm text-muted-foreground">{quizState.currentWord.transliteration}</p>
                )}
              </div>

              {/* Root input */}
              <div className="space-y-2">
                <p className="text-sm font-medium">What is the 3-letter root?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={rootGuess}
                    onChange={(e) => setRootGuess(e.target.value)}
                    placeholder="Enter root (Hebrew letters)"
                    className="flex-1 px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary hebrew-text text-lg text-right"
                    dir="rtl"
                    disabled={rootResult !== null}
                  />
                  {!rootResult && (
                    <Button onClick={handleRootGuess} disabled={!rootGuess.trim()}>
                      Check
                    </Button>
                  )}
                </div>
              </div>

              {/* Result */}
              {rootResult && (
                <div className={cn(
                  'p-4 rounded-lg border',
                  rootResult.correct
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    {rootResult.correct ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium">
                      {rootResult.correct ? 'Correct!' : 'Not quite'}
                    </span>
                  </div>
                  <p className="text-sm">
                    The root is: <span className="hebrew-text text-lg font-medium" dir="rtl">{rootResult.actualRoot}</span>
                  </p>
                  {(() => {
                    const pattern = identifyWeakPattern(rootResult.actualRoot);
                    if (pattern !== 'strong') {
                      return (
                        <p className="text-sm text-muted-foreground mt-1">
                          This is a <strong>{WEAK_PATTERN_LABELS[pattern]}</strong> verb
                        </p>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}

              {rootResult && (
                <Button className="w-full" onClick={() => generateNewQuestion('root-extraction')}>
                  Next Word
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Weak Pattern Mode */}
        {practiceMode === 'weak-pattern' && quizState.currentQuestion && quizState.currentWord && (
          <QuizCard
            question={quizState.currentQuestion}
            word={quizState.currentWord}
            selectedAnswer={quizState.selectedAnswer}
            isCorrect={quizState.isCorrect}
            showHint={quizState.showHint}
            onSelectAnswer={handleAnswerSelect}
            onShowHint={() => setQuizState(prev => ({ ...prev, showHint: true }))}
            onNext={() => generateNewQuestion('weak-pattern')}
            onReset={resetStats}
            title="Identify the Weak Pattern"
            subtitle="What type of weak verb is this?"
          />
        )}

        {/* Full Parsing Mode */}
        {practiceMode === 'full-parsing' && quizState.currentQuestion && quizState.currentWord && (
          <QuizCard
            question={quizState.currentQuestion}
            word={quizState.currentWord}
            selectedAnswer={quizState.selectedAnswer}
            isCorrect={quizState.isCorrect}
            showHint={quizState.showHint}
            onSelectAnswer={handleAnswerSelect}
            onShowHint={() => setQuizState(prev => ({ ...prev, showHint: true }))}
            onNext={() => generateNewQuestion('full-parsing')}
            onReset={resetStats}
            title="Full Morphological Parse"
            subtitle="Select the correct parsing"
          />
        )}

        {/* No questions available */}
        {practiceMode !== 'search' && !quizState.currentQuestion && (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No verbs match the current filters.</p>
              <p className="text-sm mt-1">Try adjusting the filter options above.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setFilters({ partOfSpeech: [], binyan: [], weakPattern: [], searchTerm: '' });
                  generateNewQuestion(practiceMode);
                }}
              >
                Clear filters and try again
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

// Quiz Card Component
function QuizCard({
  question,
  word,
  selectedAnswer,
  isCorrect,
  showHint,
  onSelectAnswer,
  onShowHint,
  onNext,
  onReset,
  title,
  subtitle,
}: {
  question: MorphologyQuestion;
  word: VocabularyWord;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  showHint: boolean;
  onSelectAnswer: (answer: string) => void;
  onShowHint: () => void;
  onNext: () => void;
  onReset: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <button
            onClick={onReset}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Word display */}
        <div className="text-center p-6 bg-muted/30 rounded-lg">
          <HebrewWord hebrew={question.word} size="xl" showAudio={false} />
          <p className="text-muted-foreground mt-2">{question.gloss}</p>
          {word.transliteration && (
            <p className="text-sm text-muted-foreground">{word.transliteration}</p>
          )}
        </div>

        {/* Options */}
        <div className="grid gap-2">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === question.correctAnswer;
            const showResult = isCorrect !== null;

            return (
              <button
                key={option}
                onClick={() => onSelectAnswer(option)}
                disabled={showResult}
                className={cn(
                  'p-3 rounded-lg border text-left transition-colors',
                  !showResult && 'hover:bg-muted/50',
                  showResult && isCorrectOption && 'bg-green-50 dark:bg-green-900/20 border-green-500',
                  showResult && isSelected && !isCorrectOption && 'bg-red-50 dark:bg-red-900/20 border-red-500',
                  !showResult && isSelected && 'bg-muted/50 border-primary'
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  {showResult && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Hint */}
        {!showHint && isCorrect === null && question.hint && (
          <button
            onClick={onShowHint}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <HelpCircle className="w-4 h-4" />
            Show hint
          </button>
        )}

        {showHint && question.hint && isCorrect === null && (
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm">{question.hint}</p>
          </div>
        )}

        {/* Result explanation */}
        {isCorrect !== null && question.hint && (
          <div className={cn(
            'p-3 rounded-lg border',
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
          )}>
            <p className="text-sm">{question.hint}</p>
          </div>
        )}

        {/* Next button */}
        {isCorrect !== null && (
          <Button className="w-full" onClick={onNext}>
            Next Question
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
