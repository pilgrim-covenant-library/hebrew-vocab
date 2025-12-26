'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight, Share2, BookCopy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SynonymBadge, SynonymDisplay } from '@/components/synonyms';
import { storage } from '@/lib/utils';
import synonymsData from '@/data/hebrew-synonyms.json';
import type { HebrewSynonymGroup } from '@/types';

// Type assertion for imported JSON
const groups = synonymsData.groups as HebrewSynonymGroup[];

export default function SynonymDetailPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);

  const groupId = params.id as string;
  const group = groups.find((g) => g.id === groupId);

  // Find adjacent groups for navigation
  const currentIndex = groups.findIndex((g) => g.id === groupId);
  const prevGroup = currentIndex > 0 ? groups[currentIndex - 1] : null;
  const nextGroup = currentIndex < groups.length - 1 ? groups[currentIndex + 1] : null;

  // Mark group as viewed
  useEffect(() => {
    setMounted(true);

    if (group) {
      const viewed = storage.get<string[]>('synonyms-viewed', []);
      if (!viewed.includes(group.id)) {
        const updated = [...viewed, group.id];
        storage.set('synonyms-viewed', updated);
      }
    }
  }, [group]);

  // Handle share
  const handleShare = async () => {
    if (!group) return;

    const shareData = {
      title: `Hebrew Synonyms: ${group.title}`,
      text: `Compare Hebrew words for "${group.englishWord}"`,
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
    return <SynonymDetailSkeleton />;
  }

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Synonym group not found</p>
          <Link href="/synonyms">
            <Button>Back to Synonyms</Button>
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
              <Link href="/synonyms">
                <Button variant="ghost" size="icon" aria-label="Back to synonyms">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Back to synonyms
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

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Category Badge */}
        <div className="mb-4">
          <SynonymBadge category={group.category} size="md" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {group.title}
        </h1>

        {/* Subtitle */}
        <div className="flex items-center gap-2 mb-4">
          <BookCopy className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="text-muted-foreground capitalize">
            Words for "{group.englishWord}"
          </span>
        </div>

        {/* Hebrew Words Summary */}
        <div className="flex flex-wrap gap-2 mb-6">
          {group.words.map((word, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-muted rounded-lg"
            >
              <span className="font-hebrew text-lg" dir="rtl">{word.hebrew}</span>
              <span className="text-sm text-muted-foreground ml-2">({word.transliteration})</span>
            </span>
          ))}
        </div>

        {/* Full Display */}
        <SynonymDisplay group={group} />

        {/* Tags */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag) => (
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
          {prevGroup ? (
            <Link
              href={`/synonyms/${prevGroup.id}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{prevGroup.title}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : (
            <div />
          )}

          {nextGroup ? (
            <Link
              href={`/synonyms/${nextGroup.id}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="hidden sm:inline">{nextGroup.title}</span>
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
function SynonymDetailSkeleton() {
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

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Badge */}
        <div className="w-24 h-6 bg-muted rounded-full mb-4" />

        {/* Title */}
        <div className="w-64 h-9 bg-muted rounded mb-2" />

        {/* Subtitle */}
        <div className="w-48 h-5 bg-muted rounded mb-4" />

        {/* Words preview */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-28 bg-muted rounded-lg" />
          ))}
        </div>

        {/* Content cards */}
        <div className="space-y-6">
          <div className="h-32 bg-muted rounded-xl" />
          <div className="h-64 bg-muted rounded-xl" />
          <div className="h-36 bg-muted rounded-xl" />
          <div className="h-40 bg-muted rounded-xl" />
        </div>
      </main>
    </div>
  );
}
