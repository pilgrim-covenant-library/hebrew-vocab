'use client';

import {
  Sparkles,
  Handshake,
  Shield,
  AlertTriangle,
  Church,
  Lightbulb,
  Scale,
  Eye,
  Crown,
  Building,
  Heart,
  Clock,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TDOT_CATEGORIES, type TDOTCategory } from '@/types';

interface TDOTBadgeProps {
  category: TDOTCategory;
  size?: 'sm' | 'md';
  showIcon?: boolean;
  className?: string;
}

const categoryIcons: Record<TDOTCategory, React.ReactNode> = {
  creation: <Sparkles className="w-3.5 h-3.5" />,
  covenant: <Handshake className="w-3.5 h-3.5" />,
  salvation: <Shield className="w-3.5 h-3.5" />,
  sin: <AlertTriangle className="w-3.5 h-3.5" />,
  worship: <Church className="w-3.5 h-3.5" />,
  wisdom: <Lightbulb className="w-3.5 h-3.5" />,
  law: <Scale className="w-3.5 h-3.5" />,
  prophecy: <Eye className="w-3.5 h-3.5" />,
  kingship: <Crown className="w-3.5 h-3.5" />,
  temple: <Building className="w-3.5 h-3.5" />,
  anthropology: <Heart className="w-3.5 h-3.5" />,
  ethics: <Scale className="w-3.5 h-3.5" />,
  eschatology: <Clock className="w-3.5 h-3.5" />,
};

const categoryColors: Record<TDOTCategory, string> = {
  creation: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  covenant: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  salvation: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  sin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  worship: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  wisdom: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  law: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  prophecy: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  kingship: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  temple: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  anthropology: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  ethics: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  eschatology: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
};

export function TDOTBadge({
  category,
  size = 'sm',
  showIcon = true,
  className,
}: TDOTBadgeProps) {
  const info = TDOT_CATEGORIES[category];

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
