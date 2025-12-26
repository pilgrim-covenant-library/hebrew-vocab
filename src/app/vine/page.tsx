'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { VineCard, VineCardSkeleton, VineCategoryTabs } from '@/components/vine';
import { storage } from '@/lib/utils';
import vineData from '@/data/vine-dictionary.json';
import type { VineOTEntry, VineCategory } from '@/types';

// Type assertion for imported JSON
const entries = vineData.entries as VineOTEntry[];

export default function VinePage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<VineCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [viewedEntries, setViewedEntries] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    const viewed = storage.get<string[]>('vine-viewed', []);
    setViewedEntries(viewed);
  }, []);

  // Filter and sort entries
  const filteredEntries = useMemo(() => {
    let result = entries;

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter((e) => e.category === activeCategory);
    }

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter((e) => {
        const searchableText = [
          e.englishWord,
          e.hebrew,
          e.transliteration,
          e.shortDef,
          e.category,
          ...e.tags,
        ].join(' ').toLowerCase();
        return searchableText.includes(searchLower);
      });
    }

    // Sort: unviewed first, then alphabetically by English word
    result.sort((a, b) => {
      const aViewed = viewedEntries.includes(a.id);
      const bViewed = viewedEntries.includes(b.id);
      if (aViewed !== bViewed) return aViewed ? 1 : -1;
      return a.englishWord.localeCompare(b.englishWord);
    });

    return result;
  }, [activeCategory, search, viewedEntries]);

  // Count entries by category
  const categoryCounts = useMemo(() => {
    const counts: Record<VineCategory | 'all', number> = {
      all: entries.length,
      god: 0,
      worship: 0,
      covenant: 0,
      law: 0,
      sin: 0,
      salvation: 0,
      wisdom: 0,
      people: 0,
      creation: 0,
      time: 0,
      emotion: 0,
      other: 0,
    };
    entries.forEach((e) => {
      counts[e.category]++;
    });
    return counts;
  }, []);

  if (!mounted) {
    return <VinePageSkeleton />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" aria-label="Back to home">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-violet-500" />
                <h1 className="text-lg font-semibold">Vine's OT Dictionary</h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Intro */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Accessible Hebrew word studies from Vine's Complete Expository Dictionary.
            Explore key Old Testament words by their English meanings.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {viewedEntries.length} of {entries.length} word studies completed
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by English word, Hebrew, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="mb-6">
          <VineCategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categoryCounts={categoryCounts}
          />
        </div>

        {/* Entries Grid */}
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No entries found matching your criteria.</p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredEntries.map((entry) => (
              <VineCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Loading skeleton
function VinePageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg" />
            <div className="w-44 h-6 bg-muted rounded" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="w-3/4 h-5 bg-muted rounded mb-2" />
        <div className="w-1/2 h-5 bg-muted rounded mb-6" />

        <div className="w-full h-10 bg-muted rounded-lg mb-4" />

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-24 h-8 bg-muted rounded-full shrink-0" />
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <VineCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
