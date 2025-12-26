'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Share2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { VineBadge, VineDisplay } from '@/components/vine';
import { storage } from '@/lib/utils';
import vineData from '@/data/vine-dictionary.json';
import type { VineOTEntry } from '@/types';

// Type assertion for imported JSON
const entries = vineData.entries as VineOTEntry[];

export default function VineDetailPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);

  const entryId = params.id as string;
  const entry = entries.find((e) => e.id === entryId);

  // Find adjacent entries for navigation
  const currentIndex = entries.findIndex((e) => e.id === entryId);
  const prevEntry = currentIndex > 0 ? entries[currentIndex - 1] : null;
  const nextEntry = currentIndex < entries.length - 1 ? entries[currentIndex + 1] : null;

  // Mark entry as viewed
  useEffect(() => {
    setMounted(true);

    if (entry) {
      const viewed = storage.get<string[]>('vine-viewed', []);
      if (!viewed.includes(entry.id)) {
        const updated = [...viewed, entry.id];
        storage.set('vine-viewed', updated);
      }
    }
  }, [entry]);

  // Handle share
  const handleShare = async () => {
    if (!entry) return;

    const shareData = {
      title: `Vine's: ${entry.englishWord} (${entry.hebrew})`,
      text: `Hebrew word study: ${entry.hebrew} - ${entry.shortDef}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  if (!mounted) {
    return <VineDetailSkeleton />;
  }

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Entry not found</p>
          <Link href="/vine">
            <Button>Back to Dictionary</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/vine">
                <Button variant="ghost" size="icon" aria-label="Back to dictionary">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Back to dictionary
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Category Badge */}
        <div className="mb-4">
          <VineBadge category={entry.category} size="md" />
        </div>

        {/* English Word */}
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {entry.englishWord}
        </h1>

        {/* Hebrew Word */}
        <div className="mb-4">
          <span className="font-hebrew text-2xl text-foreground" dir="rtl">{entry.hebrew}</span>
          <p className="text-lg text-muted-foreground">{entry.transliteration}</p>
          <p className="text-sm text-muted-foreground font-mono mt-1">{entry.strongs}</p>
        </div>

        {/* Short Definition */}
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="text-muted-foreground">{entry.shortDef}</span>
        </div>

        {/* Full Display */}
        <VineDisplay entry={entry} />

        {/* Tags */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-muted text-sm text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="mt-12 pt-6 border-t flex items-center justify-between">
          {prevEntry ? (
            <Link
              href={`/vine/${prevEntry.id}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{prevEntry.englishWord}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : (
            <div />
          )}

          {nextEntry ? (
            <Link
              href={`/vine/${nextEntry.id}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="hidden sm:inline">{nextEntry.englishWord}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </main>
    </div>
  );
}

// Loading skeleton
function VineDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg" />
            <div className="w-32 h-4 bg-muted rounded" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Badge */}
        <div className="w-24 h-6 bg-muted rounded-full mb-4" />

        {/* English word */}
        <div className="w-40 h-9 bg-muted rounded mb-2" />

        {/* Hebrew word */}
        <div className="mb-4">
          <div className="w-28 h-7 bg-muted rounded mb-2" />
          <div className="w-20 h-5 bg-muted rounded mb-1" />
          <div className="w-16 h-4 bg-muted rounded" />
        </div>

        {/* Definition */}
        <div className="w-full h-5 bg-muted rounded mb-6" />

        {/* Content cards */}
        <div className="space-y-6">
          <div className="h-32 bg-muted rounded-xl" />
          <div className="h-40 bg-muted rounded-xl" />
          <div className="h-36 bg-muted rounded-xl" />
          <div className="h-32 bg-muted rounded-xl" />
        </div>
      </main>
    </div>
  );
}
