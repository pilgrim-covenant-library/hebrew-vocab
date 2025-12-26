'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Sparkles, Quote, ChevronRight, Users, BookMarked, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import {
  stories,
  CATEGORY_INFO,
  getStoriesByCategory,
  getRandomQuote,
  type StoryCategory,
  type InspirationStory,
} from '@/data/inspiration/stories';

const categoryIcons: Record<StoryCategory, React.ReactNode> = {
  reformer: <Landmark className="w-5 h-5" />,
  puritan: <BookMarked className="w-5 h-5" />,
  westminster: <Users className="w-5 h-5" />,
};

export default function InspirationPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'all'>('all');
  const [featuredQuote] = useState(() => getRandomQuote());

  const filteredStories = selectedCategory === 'all'
    ? stories
    : getStoriesByCategory(selectedCategory);

  const categories: Array<{ key: StoryCategory | 'all'; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'reformer', label: 'Reformers' },
    { key: 'puritan', label: 'Puritans' },
    { key: 'westminster', label: 'Westminster' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h1 className="text-lg font-semibold">Inspiration</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3 mb-4">
              <Quote className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
              <div>
                <p className="text-lg font-medium italic text-foreground/90">
                  "{featuredQuote.quote}"
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  — {featuredQuote.name}, <span className="italic">{featuredQuote.source}</span>
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Learn how the great Reformers, Puritans, and Westminster Divines mastered Biblical Hebrew
              and used it to advance the gospel. Their stories inspire us to pursue the same goal.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                  selectedCategory === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                )}
              >
                {label}
              </button>
            ))}
          </div>
          {selectedCategory !== 'all' && (
            <p className="text-sm text-muted-foreground mt-3">
              {CATEGORY_INFO[selectedCategory].description}
            </p>
          )}
        </section>

        {/* Story Cards */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>

        {/* Category Legend */}
        <section className="mt-8 pt-6 border-t">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['reformer', 'puritan', 'westminster'] as StoryCategory[]).map((cat) => (
              <div key={cat} className="flex items-start gap-3">
                <div className={cn('p-2 rounded-lg text-white shrink-0', CATEGORY_INFO[cat].bgColor)}>
                  {categoryIcons[cat]}
                </div>
                <div>
                  <h4 className="font-medium">{CATEGORY_INFO[cat].label}</h4>
                  <p className="text-xs text-muted-foreground">
                    {getStoriesByCategory(cat).length} stories
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function StoryCard({ story }: { story: InspirationStory }) {
  const categoryInfo = CATEGORY_INFO[story.category];

  return (
    <Link href={`/inspiration/${story.slug}`}>
      <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 cursor-pointer group">
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className={cn('p-2.5 rounded-xl text-white shrink-0', categoryInfo.bgColor)}>
              <BookOpen className="w-5 h-5" />
            </div>
            <span className={cn('text-xs font-medium px-2 py-1 rounded-full bg-muted', categoryInfo.color)}>
              {categoryInfo.label}
            </span>
          </div>

          {/* Name & Title */}
          <h3 className="font-semibold text-lg mb-1">{story.name}</h3>
          <p className="text-sm text-muted-foreground mb-1">{story.title}</p>
          <p className="text-xs text-muted-foreground mb-3">
            {story.location} · {story.years}
          </p>

          {/* Quote Preview */}
          <blockquote className="text-sm italic text-foreground/80 border-l-2 border-primary/30 pl-3 mb-4 line-clamp-2">
            "{story.quote}"
          </blockquote>

          {/* Summary */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {story.summary}
          </p>

          {/* Read More */}
          <div className="flex items-center text-sm font-medium text-primary group-hover:underline">
            Read Story
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
