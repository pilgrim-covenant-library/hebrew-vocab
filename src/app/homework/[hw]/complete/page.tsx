'use client';

import { useMemo, use } from 'react';
import Link from 'next/link';
import { Trophy, ArrowLeft, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useExtendedHomeworkStore } from '@/stores/extendedHomeworkStore';
import { getHomework } from '@/data/homework/extended-registry';
import type { ExtendedHomeworkId } from '@/types/homework-extended';

function CompleteContent({ hwId }: { hwId: ExtendedHomeworkId }) {
  const meta = useMemo(() => getHomework(hwId), [hwId]);
  const { getHomework: getProgress, getOverallProgress, resetHomework } = useExtendedHomeworkStore();

  if (!meta) return <main className="min-h-screen p-6"><p>Homework not found</p></main>;

  const hw = getProgress(meta.id);
  const progress = getOverallProgress(meta.id);
  const percentage = progress.scorePercentage;

  const grade =
    percentage >= 90 ? { label: 'Excellent', tone: 'text-green-600' } :
    percentage >= 75 ? { label: 'Good', tone: 'text-blue-600' } :
    percentage >= 60 ? { label: 'Passing', tone: 'text-amber-600' } :
    { label: 'Keep Practicing', tone: 'text-red-600' };

  return (
    <main className="min-h-screen p-4 sm:p-6 max-w-2xl mx-auto">
      <Card className="border-2 border-green-500/30">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center mb-3">
            <Trophy className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">{meta.title} Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-5xl font-bold tabular-nums">{progress.score} / {progress.total}</p>
            <p className={`text-lg font-semibold mt-2 ${grade.tone}`}>{percentage}% — {grade.label}</p>
          </div>

          <div className="space-y-2 border-t pt-4">
            <p className="text-sm font-semibold text-muted-foreground">Section breakdown</p>
            {meta.sections.map((section) => {
              const sec = hw?.sections[section.id];
              return (
                <div key={section.id} className="flex items-center justify-between text-sm py-1">
                  <span>Section {section.id}: {section.title}</span>
                  <span className="tabular-nums font-medium">{sec?.score ?? 0} / {section.questionCount}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Link href="/homework" className="flex-1">
              <Button variant="outline" className="w-full h-11">
                <ArrowLeft className="w-4 h-4 mr-2" /> All Homework
              </Button>
            </Link>
            <Button
              variant="outline"
              className="flex-1 h-11"
              onClick={() => {
                if (confirm(`Reset ${meta.shortTitle}? Your progress will be erased.`)) {
                  resetHomework(meta.id);
                  window.location.href = `/homework/${meta.id}`;
                }
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Reset Homework
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default function ExtendedHomeworkCompletePage({ params }: { params: Promise<{ hw: string }> }) {
  const { hw } = use(params);
  const meta = getHomework(hw);
  if (!meta) {
    return <main className="min-h-screen p-6"><p>Homework not found</p></main>;
  }
  return <CompleteContent hwId={meta.id} />;
}
