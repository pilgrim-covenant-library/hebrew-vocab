// Keep the live registry intentionally small. Archived assignments live in
// ./legacy/extended-registry.ts so they remain available for future remapping
// without being downloaded by every student opening a homework page.

import type { ExtendedHomeworkId, ExtendedHomeworkMeta } from '@/types/homework-extended';
import { hw2Meta } from './hw2-questions';
import { hw3Meta } from './hw3-questions';
import { hw4Meta } from './hw4-questions';
import { hw5Meta } from './hw5-questions';
import { hw6Meta } from './hw6-questions';
import { hw7Meta } from './hw7-questions';
import { hw8Meta } from './hw8-questions';
import { hw9Meta } from './hw9-questions';

export const EXTENDED_HOMEWORKS = {
  hw2: hw2Meta,
  hw3: hw3Meta,
  hw4: hw4Meta,
  hw5: hw5Meta,
  hw6: hw6Meta,
  hw7: hw7Meta,
  hw8: hw8Meta,
  hw9: hw9Meta,
} satisfies Partial<Record<ExtendedHomeworkId, ExtendedHomeworkMeta>>;

export const EXTENDED_HOMEWORK_ORDER = ['hw2', 'hw3', 'hw4', 'hw5', 'hw6', 'hw7', 'hw8', 'hw9'] as const satisfies readonly ExtendedHomeworkId[];

export const getHomework = (id: string): ExtendedHomeworkMeta | undefined =>
  (EXTENDED_HOMEWORKS as Partial<Record<string, ExtendedHomeworkMeta>>)[id];
