'use client';

import { useParams, useRouter, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Quote, Lightbulb, BookOpen, ChevronLeft, ChevronRight, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { stories, getStoryBySlug, CATEGORY_INFO, type InspirationStory } from '@/data/inspiration/stories';

export default function StoryPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const categoryInfo = CATEGORY_INFO[story.category];

  // Find prev/next stories
  const currentIndex = stories.findIndex(s => s.slug === slug);
  const prevStory = currentIndex > 0 ? stories[currentIndex - 1] : null;
  const nextStory = currentIndex < stories.length - 1 ? stories[currentIndex + 1] : null;

  // Share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${story.name} - Hebrew Learning Inspiration`,
          text: story.summary,
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className={cn('text-sm font-medium px-2 py-1 rounded-full', categoryInfo.color, 'bg-muted')}>
              {categoryInfo.label}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Hero */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className={cn('p-3 rounded-xl text-white', categoryInfo.bgColor)}>
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{story.name}</h1>
              <p className="text-muted-foreground">{story.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{story.location}</span>
            <span>·</span>
            <span>{story.years}</span>
          </div>
        </section>

        {/* Featured Quote */}
        <section className="mb-8">
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                <div>
                  <p className="text-lg font-medium italic">
                    "{story.quote}"
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    — {story.quoteSource}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Summary */}
        <section className="mb-8">
          <p className="text-lg text-foreground/90 leading-relaxed">
            {story.summary}
          </p>
        </section>

        {/* Main Content */}
        <section className="mb-8 space-y-5">
          {story.content.map((paragraph, index) => (
            <p key={index} className="text-foreground/85 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Lessons for Today */}
        <section className="mb-8">
          <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h2 className="font-semibold text-emerald-900 dark:text-emerald-100">
                  Lessons for Today
                </h2>
              </div>
              <ul className="space-y-3">
                {story.lessons.map((lesson, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 text-sm font-medium shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground/85">{lesson}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Sources */}
        <section className="mb-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Sources & Further Reading</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {story.sources.map((source, index) => (
              <li key={index} className="flex items-start gap-2">
                <Bookmark className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{source}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Navigation */}
        <section className="pt-6 border-t">
          <div className="flex items-center justify-between gap-4">
            {prevStory ? (
              <Link href={`/inspiration/${prevStory.slug}`} className="flex-1">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="truncate">{prevStory.name}</span>
                </Button>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextStory ? (
              <Link href={`/inspiration/${nextStory.slug}`} className="flex-1">
                <Button variant="outline" className="w-full justify-end gap-2">
                  <span className="truncate">{nextStory.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
          <div className="mt-4 text-center">
            <Link href="/inspiration">
              <Button variant="ghost" size="sm">
                View All Stories
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
