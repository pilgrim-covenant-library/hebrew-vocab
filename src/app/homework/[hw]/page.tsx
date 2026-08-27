'use client';

import { useEffect, useMemo, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Circle, Loader2, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useExtendedHomeworkStore } from '@/stores/extendedHomeworkStore';
import { getHomework } from '@/data/homework/extended-registry';
import type { ExtendedHomeworkId } from '@/types/homework-extended';
import { cn } from '@/lib/utils';

const FINAL_EXAM_PASSWORD = 'shalom';

function ExtendedHomeworkContent({ hwId }: { hwId: ExtendedHomeworkId }) {
  const router = useRouter();
  const meta = useMemo(() => getHomework(hwId), [hwId]);
  const { ensureHomework, startHomework, getHomework: getProgress, getOverallProgress, isHomeworkComplete } =
    useExtendedHomeworkStore();

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordOk, setPasswordOk] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (!meta) return;
    ensureHomework(meta.id);
    startHomework(meta.id);
  }, [meta, ensureHomework, startHomework]);

  if (!meta) {
    return (
      <main className="min-h-screen p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Homework not found</h1>
        <Link href="/homework"><Button>Back to Homework</Button></Link>
      </main>
    );
  }

  const hwProgress = getProgress(meta.id);

  if (!hwProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (meta.passwordGated && !passwordOk) {
    return (
      <main className="min-h-screen p-6 max-w-md mx-auto pt-20">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <CardTitle>Password Required</CardTitle>
            </div>
            <CardDescription>{meta.title} is password-gated. Enter the access code to begin.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="password"
              autoFocus
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (passwordInput === FINAL_EXAM_PASSWORD) setPasswordOk(true);
                  else setPasswordError('Incorrect password.');
                }
              }}
              placeholder="Access code"
              className="w-full rounded-lg border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Final exam password"
            />
            {passwordError && <p className="text-sm text-red-600" role="alert">{passwordError}</p>}
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (passwordInput === FINAL_EXAM_PASSWORD) setPasswordOk(true);
                  else setPasswordError('Incorrect password.');
                }}
                className="flex-1"
              >Unlock</Button>
              <Link href="/homework" className="flex-1"><Button variant="outline" className="w-full">Cancel</Button></Link>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  const progress = getOverallProgress(meta.id);
  const complete = isHomeworkComplete(meta.id);

  return (
    <main className="min-h-screen p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/homework">
          <Button variant="ghost" className="mb-4 -ml-2 h-11">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Homework
          </Button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">{meta.title}</h1>
        <p className="text-muted-foreground mt-2">{meta.description}</p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <p className="text-2xl font-bold">{progress.answered} / {progress.total}</p>
              <p className="text-sm text-muted-foreground">{progress.percentage}%</p>
            </div>
            {complete && (
              <Link href={`/homework/${meta.id}/complete`}>
                <Button>View Results <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </Link>
            )}
          </div>
          <div className="mt-4 h-2 bg-muted rounded overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progress.percentage}%` }}
              aria-label={`${progress.percentage}% complete`}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {meta.sections.map((section) => {
          const sectionProgress = hwProgress?.sections[section.id];
          const status = sectionProgress?.status ?? 'not_started';
          const score = sectionProgress?.score ?? 0;
          const total = section.questionCount;

          return (
            <button
              key={section.id}
              onClick={() => router.push(`/homework/${meta.id}/section/${section.id}`)}
              className={cn(
                'w-full text-left rounded-lg border p-4 transition-all hover:border-primary hover:shadow-sm',
                status === 'completed' && 'border-green-500/50 bg-green-50/50 dark:bg-green-950/20',
                status === 'in_progress' && 'border-amber-500/50',
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" aria-label="Completed" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" aria-label={status === 'in_progress' ? 'In progress' : 'Not started'} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="font-semibold text-base">Section {section.id}: {section.title}</h3>
                    <span className="text-sm text-muted-foreground tabular-nums">{score} / {total}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-muted/50 rounded-lg flex items-start gap-3">
        <BookOpen className="w-5 h-5 mt-0.5 text-muted-foreground" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Topics covered</p>
          <p>{meta.topics.join(' · ')}</p>
        </div>
      </div>
    </main>
  );
}

export default function ExtendedHomeworkPage({ params }: { params: Promise<{ hw: string }> }) {
  const { hw } = use(params);
  const meta = getHomework(hw);
  if (!meta) {
    return (
      <main className="min-h-screen p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Homework not found</h1>
        <Link href="/homework"><Button>Back to Homework</Button></Link>
      </main>
    );
  }
  return <ExtendedHomeworkContent hwId={meta.id} />;
}
