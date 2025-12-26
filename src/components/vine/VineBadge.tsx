'use client';

import {
  Crown,
  Handshake,
  Scale,
  AlertTriangle,
  Shield,
  Lightbulb,
  Users,
  Sparkles,
  Clock,
  Heart,
  Church,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { VINE_CATEGORIES, type VineCategory } from '@/types';

interface VineBadgeProps {
  category: VineCategory;
  size?: 'sm' | 'md';
  showIcon?: boolean;
  className?: string;
}

const categoryIcons: Record<VineCategory, React.ReactNode> = {
  god: <Crown className="w-3.5 h-3.5" />,
  worship: <Church className="w-3.5 h-3.5" />,
  covenant: <Handshake className="w-3.5 h-3.5" />,
  law: <Scale className="w-3.5 h-3.5" />,
  sin: <AlertTriangle className="w-3.5 h-3.5" />,
  salvation: <Shield className="w-3.5 h-3.5" />,
  wisdom: <Lightbulb className="w-3.5 h-3.5" />,
  people: <Users className="w-3.5 h-3.5" />,
  creation: <Sparkles className="w-3.5 h-3.5" />,
  time: <Clock className="w-3.5 h-3.5" />,
  emotion: <Heart className="w-3.5 h-3.5" />,
  other: <MoreHorizontal className="w-3.5 h-3.5" />,
};

const categoryColors: Record<VineCategory, string> = {
  god: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  worship: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  covenant: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  law: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  sin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  salvation: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  wisdom: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  people: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  creation: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  time: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300',
  emotion: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  other: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
};

export function VineBadge({
  category,
  size = 'sm',
  showIcon = true,
  className,
}: VineBadgeProps) {
  const info = VINE_CATEGORIES[category];

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
