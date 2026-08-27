'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Search, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import gemsData from '@/data/hebrew-gems.json';

interface Gem {
  id: string;
  hebrew: string;
  transliteration: string;
  englishGloss: string;
  category: string;
  title: string;
  insight: string;
  verseReference: string;
  verse: string;
  verseTranslation: string;
}

const gems = gemsData.gems as Gem[];

export default function GemsPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => Array.from(new Set(gems.map((g) => g.category))), []);

  const filtered = useMemo(() => {
    return gems.filter((gem) => {
      if (activeCategory && gem.category !== activeCategory) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        gem.hebrew.includes(query) ||
        gem.transliteration.toLowerCase().includes(q) ||
        gem.englishGloss.toLowerCase().includes(q) ||
        gem.title.toLowerCase().includes(q) ||
        gem.insight.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-start gap-3 mb-6">
          <Sparkles className="w-7 h-7 text-amber-500 mt-1 flex-shrink-0" />
          <div>
            <h1 className="text-3xl font-bold">Hebrew Gems</h1>
            <p className="text-muted-foreground mt-1">
              Insights and nuances from biblical Hebrew that English translations cannot fully convey.
            </p>
          </div>
        </div>

        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search gems by Hebrew, transliteration, or insight..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border bg-background min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Search gems"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors min-h-[36px] ${
                activeCategory === null ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary'
              }`}
            >All ({gems.length})</button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors min-h-[36px] ${
                  activeCategory === cat ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary'
                }`}
              >{cat} ({gems.filter((g) => g.category === cat).length})</button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Showing <span className="font-medium tabular-nums">{filtered.length}</span> {filtered.length === 1 ? 'gem' : 'gems'}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((gem) => (
            <Card key={gem.id} className="overflow-hidden flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-3xl font-serif leading-none mb-2" lang="he" dir="rtl">{gem.hebrew}</p>
                    <p className="text-sm font-medium italic text-muted-foreground">{gem.transliteration}</p>
                    <p className="text-sm text-foreground/80 mt-1">{gem.englishGloss}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground whitespace-nowrap flex-shrink-0">
                    {gem.category}
                  </span>
                </div>
                <CardTitle className="text-base mt-3 leading-snug">{gem.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-4">
                <p className="text-sm leading-relaxed text-foreground/90">{gem.insight}</p>
                <div className="border-l-4 border-amber-500/40 pl-3 py-1 bg-amber-50/40 dark:bg-amber-950/10">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {gem.verseReference}
                  </p>
                  <p className="text-base font-serif text-right" lang="he" dir="rtl">{gem.verse}</p>
                  <p className="text-xs italic text-foreground/70 mt-1">"{gem.verseTranslation}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No gems match your search.</p>
            <Button variant="outline" onClick={() => { setQuery(''); setActiveCategory(null); }} className="mt-4">
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
