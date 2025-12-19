'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Info, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { MorphologyBreakdown, GrammarExplanation } from '@/components/MorphologyBreakdown';
import { HebrewWord } from '@/components/HebrewWord';
import { cn } from '@/lib/utils';
import type { ParsedMorphology } from '@/lib/morphology';
import vocabularyData from '@/data/vocabulary.json';
import type { VocabularyWord } from '@/types';

// Sample parsed forms for demonstration
const SAMPLE_PARSINGS: { word: string; parsing: ParsedMorphology; gloss: string }[] = [
  {
    word: 'כָּתַב',
    gloss: 'he wrote',
    parsing: {
      partOfSpeech: 'verb',
      lexicalForm: 'כָּתַב',
      binyan: 'qal',
      conjugation: 'perfect',
      person: '3rd',
      number: 'singular',
      gender: 'masculine',
    },
  },
  {
    word: 'דְּבָרִים',
    gloss: 'words',
    parsing: {
      partOfSpeech: 'noun',
      lexicalForm: 'דָּבָר',
      number: 'plural',
      gender: 'masculine',
      state: 'absolute',
    },
  },
  {
    word: 'יִשְׁמֹר',
    gloss: 'he will keep',
    parsing: {
      partOfSpeech: 'verb',
      lexicalForm: 'שָׁמַר',
      binyan: 'qal',
      conjugation: 'imperfect',
      person: '3rd',
      number: 'singular',
      gender: 'masculine',
    },
  },
  {
    word: 'בֵּית־',
    gloss: 'house of',
    parsing: {
      partOfSpeech: 'noun',
      lexicalForm: 'בַּיִת',
      number: 'singular',
      gender: 'masculine',
      state: 'construct',
    },
  },
  {
    word: 'הִתְקַדֵּשׁ',
    gloss: 'sanctify yourself',
    parsing: {
      partOfSpeech: 'verb',
      lexicalForm: 'קָדַשׁ',
      binyan: 'hithpael',
      conjugation: 'imperative',
      person: '2nd',
      number: 'singular',
      gender: 'masculine',
    },
  },
  {
    word: 'הַמֶּלֶךְ',
    gloss: 'the king',
    parsing: {
      partOfSpeech: 'noun',
      lexicalForm: 'מֶלֶךְ',
      number: 'singular',
      gender: 'masculine',
      state: 'absolute',
    },
  },
];

export default function ParserPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParsing, setSelectedParsing] = useState<typeof SAMPLE_PARSINGS[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Search vocabulary for matching words
  const searchResults = searchTerm.trim()
    ? (vocabularyData.words as VocabularyWord[])
        .filter(
          (w) =>
            w.hebrew.includes(searchTerm) ||
            w.gloss.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 8)
    : [];

  // Check if search matches any sample parsing
  const matchingSample = searchTerm.trim()
    ? SAMPLE_PARSINGS.find(
        (s) =>
          s.word.toLowerCase() === searchTerm.toLowerCase() ||
          s.parsing.lexicalForm.toLowerCase() === searchTerm.toLowerCase()
      )
    : null;

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
          <div>
            <h1 className="text-lg font-semibold">Word Parser</h1>
            <p className="text-xs text-muted-foreground">Analyze Hebrew morphology</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Search input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedParsing(null);
            }}
            placeholder="Enter a Hebrew word..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>

        {/* Search results */}
        {searchTerm && !selectedParsing && (
          <div className="mb-6">
            {matchingSample ? (
              <Card
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedParsing(matchingSample)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HebrewWord hebrew={matchingSample.word} size="lg" showAudio={false} />
                      <span className="text-muted-foreground">{matchingSample.gloss}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Sparkles className="w-4 h-4" />
                      View parsing
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : searchResults.length > 0 ? (
              <Card>
                <CardContent className="p-2">
                  <p className="text-xs text-muted-foreground px-2 py-1 mb-1">
                    Vocabulary matches (click for details):
                  </p>
                  <div className="divide-y">
                    {searchResults.map((word) => (
                      <div
                        key={word.id}
                        className="px-3 py-2 hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => setSearchTerm(word.hebrew)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <HebrewWord hebrew={word.hebrew} size="md" showAudio={false} />
                            <span className="text-sm text-muted-foreground">{word.gloss}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{word.partOfSpeech}</span>
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
                  <p>No parsing data available for this word.</p>
                  <p className="text-sm mt-1">Try one of the sample words below.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Selected parsing display */}
        {selectedParsing && (
          <div className="mb-6">
            <MorphologyBreakdown
              word={selectedParsing.word}
              parsing={selectedParsing.parsing}
              showDescription
            />
            <Button
              variant="outline"
              className="w-full mt-3"
              onClick={() => {
                setSelectedParsing(null);
                setSearchTerm('');
              }}
            >
              Parse another word
            </Button>
          </div>
        )}

        {/* Sample words */}
        {!selectedParsing && (
          <>
            <div className="mb-4">
              <h2 className="text-sm font-medium text-muted-foreground mb-3">Sample Words</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SAMPLE_PARSINGS.map((sample) => (
                  <button
                    key={sample.word}
                    onClick={() => {
                      setSearchTerm(sample.word);
                      setSelectedParsing(sample);
                    }}
                    className={cn(
                      'p-3 rounded-lg border text-left hover:bg-muted/50 transition-colors',
                      searchTerm === sample.word && 'bg-muted/50 border-primary'
                    )}
                  >
                    <HebrewWord hebrew={sample.word} size="md" showAudio={false} />
                    <p className="text-xs text-muted-foreground mt-1">{sample.gloss}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Grammar explanations */}
            <div className="space-y-4 mt-8">
              <h2 className="text-sm font-medium text-muted-foreground">Grammar Reference</h2>

              <GrammarExplanation
                title="The Seven Binyanim"
                explanation="Hebrew verbs have seven stems (binyanim) that modify the basic meaning of the root: Qal (simple active), Niphal (simple passive/reflexive), Piel (intensive active), Pual (intensive passive), Hiphil (causative active), Hophal (causative passive), and Hithpael (reflexive)."
                examples={[
                  { hebrew: 'כָּתַב', translation: 'he wrote (Qal)' },
                  { hebrew: 'נִכְתַּב', translation: 'it was written (Niphal)' },
                ]}
              />

              <GrammarExplanation
                title="The Construct State"
                explanation="Hebrew nouns can be in the construct state when they are closely connected to a following noun (the absolute). The construct form often has vowel reduction and cannot take the article."
                examples={[
                  { hebrew: 'דְּבַר־יְהוָה', translation: 'word of YHWH' },
                  { hebrew: 'בֵּית־הַמֶּלֶךְ', translation: 'house of the king' },
                ]}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
