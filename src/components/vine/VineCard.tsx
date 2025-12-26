'use client';

import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { VineBadge } from './VineBadge';
import type { VineOTEntry } from '@/types';

interface VineCardProps {
  entry: VineOTEntry;
  className?: string;
}

export function VineCard({ entry, className }: VineCardProps) {
  return (
    <Link href={`/vine/${entry.id}`} className="block group">
      <Card
        className={cn(
          'transition-all duration-200',
          'hover:shadow-md hover:border-primary/30',
          'group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2',
          className
        )}
      >
        <CardContent className="p-4 sm:p-5">
          {/* Header: Category Badge & Strong's */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <VineBadge category={entry.category} size="sm" />
            <span className="text-xs text-muted-foreground font-mono">
              {entry.strongs}
            </span>
          </div>

          {/* English Word */}
          <h3 className="text-xl font-bold text-foreground mb-1">
            {entry.englishWord}
          </h3>

          {/* Hebrew Word */}
          <div className="mb-2">
            <span className="font-hebrew text-lg text-foreground" dir="rtl">{entry.hebrew}</span>
            <span className="text-sm text-muted-foreground ml-2">({entry.transliteration})</span>
          </div>

          {/* Short Definition */}
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-muted-foreground">{entry.shortDef}</span>
          </div>

          {/* Key Passages Count */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {entry.keyPassages.length} key passage{entry.keyPassages.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center text-primary font-medium group-hover:text-primary/80">
              <span>Study</span>
              <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Skeleton for loading state
export function VineCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-4 sm:p-5">
        {/* Badge skeleton */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="h-5 w-20 bg-muted rounded-full" />
          <div className="h-4 w-12 bg-muted rounded" />
        </div>

        {/* English word skeleton */}
        <div className="h-7 w-32 bg-muted rounded mb-1" />

        {/* Hebrew word skeleton */}
        <div className="mb-2">
          <div className="h-5 w-24 bg-muted rounded inline-block" />
        </div>

        {/* Definition skeleton */}
        <div className="h-4 w-full bg-muted rounded mb-3" />

        {/* Footer skeleton */}
        <div className="flex justify-between">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
