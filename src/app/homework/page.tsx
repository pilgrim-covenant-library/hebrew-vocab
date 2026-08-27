'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, CheckCircle, Clock, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useHomeworkStore } from '@/stores/homeworkStore';
import { useExtendedHomeworkStore } from '@/stores/extendedHomeworkStore';
import { EXTENDED_HOMEWORK_ORDER, EXTENDED_HOMEWORKS } from '@/data/homework/extended-registry';
import { cn } from '@/lib/utils';

const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function HomeworkPage() {
  const { homework1, getOverallProgress } = useHomeworkStore();
  const progress = getOverallProgress();
  const { getHomework: getExtendedHw, getOverallProgress: getExtendedProgress } = useExtendedHomeworkStore();
  // Persisted store values differ from the server-rendered defaults, so wait
  // for client hydration before reading them.
  const mounted = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);

  const getStatusIcon = () => {
    switch (homework1.status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-6 h-6 text-primary" />;
      default:
        return <BookOpen className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    switch (homework1.status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  const getActionButton = () => {
    switch (homework1.status) {
      case 'completed':
        return (
          <Link href="/homework/hw1/complete">
            <Button className="gap-2">
              <CheckCircle className="w-4 h-4" />
              View Results
            </Button>
          </Link>
        );
      case 'in_progress':
        return (
          <Link href="/homework/hw1">
            <Button className="gap-2">
              <PlayCircle className="w-4 h-4" />
              Continue
            </Button>
          </Link>
        );
      default:
        return (
          <Link href="/homework/hw1">
            <Button className="gap-2">
              <PlayCircle className="w-4 h-4" />
              Start
            </Button>
          </Link>
        );
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Page title */}
          <div>
            <h1 className="text-3xl font-bold">Homework</h1>
            <p className="text-muted-foreground mt-1">
              Complete assignments to test your Hebrew knowledge
            </p>
          </div>

          {/* Homework 1 Card */}
          <Card className="overflow-hidden">
            <div
              className={cn(
                'h-2',
                homework1.status === 'completed'
                  ? 'bg-green-500'
                  : homework1.status === 'in_progress'
                  ? 'bg-primary'
                  : 'bg-muted'
              )}
              style={{
                width:
                  homework1.status === 'completed'
                    ? '100%'
                    : `${progress.percentage}%`,
              }}
            />
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon()}
                  <div>
                    <CardTitle className="text-xl">Homework 1</CardTitle>
                    <CardDescription>
                      Hebrew Alphabet &amp; Word Reading
                    </CardDescription>
                  </div>
                </div>
                <span
                  className={cn(
                    'px-2.5 py-0.5 rounded-full text-xs font-medium',
                    homework1.status === 'completed' &&
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                    homework1.status === 'in_progress' &&
                      'bg-primary/10 text-primary',
                    homework1.status === 'not_started' &&
                      'bg-muted text-muted-foreground'
                  )}
                >
                  {getStatusText()}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Week 1 foundation assignment. This homework assesses:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    1
                  </span>
                  All Hebrew letter and final-form transliterations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    2
                  </span>
                  Word transliteration followed by English meaning
                </li>
              </ul>

              {/* Progress indicator */}
              {homework1.status !== 'not_started' && (
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Sections completed
                    </span>
                    <span className="font-medium">
                      {progress.completed}/{progress.total}
                    </span>
                  </div>
                  {homework1.status === 'completed' && (
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Score</span>
                      <span className="font-medium">
                        {homework1.totalScore}/{homework1.totalPossible} (
                        {Math.round(
                          (homework1.totalScore / homework1.totalPossible) * 100
                        )}
                        %)
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Action button */}
              <div className="pt-2">{getActionButton()}</div>
            </CardContent>
          </Card>

          {/* Active assignments beyond Homework 1 */}
          {EXTENDED_HOMEWORK_ORDER.map((hwId) => {
            const meta = EXTENDED_HOMEWORKS[hwId];
            const hwProgress = getExtendedHw(hwId);
            const status = hwProgress?.status ?? 'not_started';
            const overall = getExtendedProgress(hwId);
            const Icon = status === 'completed' ? CheckCircle :
              status === 'in_progress' ? Clock : BookOpen;
            const iconClass = status === 'completed' ? 'text-green-500' : status === 'in_progress' ? 'text-primary' : 'text-muted-foreground';

            return (
              <Card key={hwId} className="overflow-hidden">
                <div
                  className={cn(
                    'h-2 transition-[width] duration-150 motion-reduce:transition-none',
                    status === 'completed' ? 'bg-green-500' : status === 'in_progress' ? 'bg-primary' : 'bg-muted',
                  )}
                  style={{ width: status === 'not_started' ? '100%' : `${overall.percentage}%` }}
                />
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-6 h-6 flex-shrink-0 ${iconClass}`} />
                      <div className="min-w-0">
                        <CardTitle className="text-xl truncate">{meta.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{meta.description}</CardDescription>
                      </div>
                    </div>
                    <span
                      className={cn(
                        'px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0',
                        status === 'completed' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                        status === 'in_progress' && 'bg-primary/10 text-primary',
                        status === 'not_started' && 'bg-muted text-muted-foreground',
                      )}
                    >
                      {status === 'completed' ? 'Completed' : status === 'in_progress' ? 'In Progress' : 'Not Started'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {meta.topics.map((topic) => (
                      <span key={topic} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{topic}</span>
                    ))}
                  </div>

                  {status !== 'not_started' && (
                    <div className="pt-2 border-t flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Score</span>
                      <span className="font-medium tabular-nums">
                        {overall.score} / {overall.total} ({overall.scorePercentage}%)
                      </span>
                    </div>
                  )}

                  <div className="pt-1">
                    <Link href={`/homework/${hwId}`}>
                      <Button className="gap-2">
                        {status === 'completed' && <><CheckCircle className="w-4 h-4" /> Review</>}
                        {status === 'in_progress' && <><PlayCircle className="w-4 h-4" /> Continue</>}
                        {status === 'not_started' && <><PlayCircle className="w-4 h-4" /> Start</>}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
