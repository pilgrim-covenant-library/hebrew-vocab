'use client';

import { use, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { COMMON_VOCAB_SECTIONS, getSectionWords } from '@/lib/commonVocab';

export default function CommonVocabSectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const sectionId = parseInt(id, 10);
  const section = COMMON_VOCAB_SECTIONS.find((s) => s.id === sectionId);
  const words = useMemo(() => getSectionWords(sectionId), [sectionId]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (!section || words.length === 0) {
    return (
      <main className="min-h-screen p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Section not found</h1>
        <Link href="/learn/common-vocab"><Button>Back</Button></Link>
      </main>
    );
  }

  const word = words[currentIdx];
  const total = words.length;
  const next = () => {
    if (currentIdx + 1 < total) {
      setCurrentIdx(currentIdx + 1);
      setRevealed(false);
    }
  };
  const prev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setRevealed(false);
    }
  };
  const restart = () => {
    setCurrentIdx(0);
    setRevealed(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/learn/common-vocab" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Sections</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">{section.title}</h1>
          <p className="text-sm text-muted-foreground">{section.description}</p>
          <div className="mt-3 flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground tabular-nums">Word {currentIdx + 1} of {total}</span>
            <span className="text-muted-foreground tabular-nums">Frequency: {word.frequency}x</span>
          </div>
          <div className="mt-2 h-1.5 bg-muted rounded overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${((currentIdx + 1) / total) * 100}%` }} />
          </div>
        </div>

        <Card className="mb-6 min-h-[300px] flex items-center justify-center">
          <CardContent className="text-center py-12 w-full">
            <p
              className="text-6xl sm:text-7xl font-serif mb-6 leading-tight"
              lang="he"
              dir="rtl"
            >{word.hebrew}</p>
            {revealed ? (
              <div className="space-y-2 animate-in fade-in duration-300">
                <p className="text-lg italic text-muted-foreground">{word.transliteration}</p>
                <p className="text-2xl font-medium">{word.gloss}</p>
                {word.partOfSpeech && (
                  <p className="text-sm text-muted-foreground">{word.partOfSpeech}</p>
                )}
              </div>
            ) : (
              <Button onClick={() => setRevealed(true)} variant="outline" className="h-12 px-6">
                Reveal meaning
              </Button>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between gap-2 sticky bottom-0 bg-background/95 backdrop-blur py-4 -mx-4 px-4 border-t">
          <Button variant="outline" onClick={prev} disabled={currentIdx === 0} className="h-11">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button variant="ghost" onClick={restart} className="h-11" aria-label="Restart section">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button onClick={next} disabled={currentIdx + 1 >= total} className="h-11">
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="mt-6 p-4 bg-muted/40 rounded-lg">
          <p className="text-xs text-muted-foreground mb-2 font-medium">All words in this section</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-sm">
            {words.map((w, i) => (
              <button
                key={w.id}
                onClick={() => { setCurrentIdx(i); setRevealed(false); }}
                className={`text-left py-1 px-2 rounded transition-colors ${
                  i === currentIdx ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'
                }`}
              >
                <span lang="he" dir="rtl" className="font-serif">{w.hebrew}</span>
                <span className="text-muted-foreground ml-2">{w.gloss.split(',')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
