'use client';

import Link from 'next/link';
import { ChevronRight, BookCopy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { SynonymBadge } from './SynonymBadge';
import type { HebrewSynonymGroup } from '@/types';

interface SynonymCardProps {
  group: HebrewSynonymGroup;
  className?: string;
}

export function SynonymCard({ group, className }: SynonymCardProps) {
  return (
    <Link href={`/synonyms/${group.id}`} className="block group">
      <Card
        className={cn(
          'transition-all duration-200',
          'hover:shadow-md hover:border-primary/30',
          'group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2',
          className
        )}
      >
        <CardContent className="p-4 sm:p-5">
          {/* Header: Category Badge */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <SynonymBadge category={group.category} size="sm" />
            <span className="text-xs text-muted-foreground">
              {group.words.length} words
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-1">
            {group.title}
          </h3>

          {/* English Word */}
          <div className="flex items-center gap-2 mb-3">
            <BookCopy className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground capitalize">
              Words for "{group.englishWord}"
            </span>
          </div>

          {/* Hebrew Words Preview */}
          <div className="flex flex-wrap gap-2 mb-3">
            {group.words.slice(0, 4).map((word, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted rounded font-hebrew text-sm"
                dir="rtl"
              >
                {word.hebrew}
              </span>
            ))}
            {group.words.length > 4 && (
              <span className="px-2 py-1 text-muted-foreground text-sm">
                +{group.words.length - 4} more
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground line-clamp-1 flex-1">
              {group.introduction.slice(0, 60)}...
            </span>
            <div className="flex items-center text-primary font-medium group-hover:text-primary/80 ml-2">
              <span>Compare</span>
              <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Skeleton for loading state
export function SynonymCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-4 sm:p-5">
        {/* Badge skeleton */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="h-5 w-20 bg-muted rounded-full" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>

        {/* Title skeleton */}
        <div className="h-6 w-40 bg-muted rounded mb-1" />

        {/* Subtitle skeleton */}
        <div className="h-4 w-32 bg-muted rounded mb-3" />

        {/* Words preview skeleton */}
        <div className="flex flex-wrap gap-2 mb-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-7 w-16 bg-muted rounded" />
          ))}
        </div>

        {/* Footer skeleton */}
        <div className="flex justify-between">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-4 w-20 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
