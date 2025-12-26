'use client';

import {
  Heart,
  Brain,
  Eye,
  AlertTriangle,
  MessageCircle,
  Scale,
  Shield,
  Music,
  Sparkles,
  Users,
  BookText,
  MoreHorizontal,
  HeartHandshake,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HEBREW_SYNONYM_CATEGORIES, type HebrewSynonymCategory } from '@/types';

interface SynonymBadgeProps {
  category: HebrewSynonymCategory;
  size?: 'sm' | 'md';
  showIcon?: boolean;
  className?: string;
}

const categoryIcons: Record<HebrewSynonymCategory, React.ReactNode> = {
  love: <Heart className="w-3.5 h-3.5" />,
  know: <Brain className="w-3.5 h-3.5" />,
  see: <Eye className="w-3.5 h-3.5" />,
  fear: <AlertTriangle className="w-3.5 h-3.5" />,
  speak: <MessageCircle className="w-3.5 h-3.5" />,
  judge: <Scale className="w-3.5 h-3.5" />,
  sin: <Zap className="w-3.5 h-3.5" />,
  save: <Shield className="w-3.5 h-3.5" />,
  praise: <Music className="w-3.5 h-3.5" />,
  holy: <Sparkles className="w-3.5 h-3.5" />,
  servant: <Users className="w-3.5 h-3.5" />,
  word: <BookText className="w-3.5 h-3.5" />,
  life: <HeartHandshake className="w-3.5 h-3.5" />,
  other: <MoreHorizontal className="w-3.5 h-3.5" />,
};

const categoryColors: Record<HebrewSynonymCategory, string> = {
  love: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  know: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  see: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  fear: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  speak: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  judge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  sin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  save: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  praise: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  holy: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  servant: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  word: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  life: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  other: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
};

export function SynonymBadge({
  category,
  size = 'sm',
  showIcon = true,
  className,
}: SynonymBadgeProps) {
  const info = HEBREW_SYNONYM_CATEGORIES[category];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        categoryColors[category],
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className
      )}
    >
      {showIcon && categoryIcons[category]}
      <span>{info.label}</span>
    </span>
  );
}
