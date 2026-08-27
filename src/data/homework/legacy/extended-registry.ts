// Archived pre-roadmap assignments. Nothing in the live student experience
// imports this module, which keeps these large question banks out of the HW2
// browser bundle while preserving them for later course remapping.

import type { ExtendedHomeworkMeta } from '@/types/homework-extended';
import { hw2Meta as articlePrepositionsMeta } from './hw2-article-prepositions';
import { hw3Meta } from './hw3-pronouns';
import { hw4Meta } from './hw4-nouns';
import { hw5Meta } from './hw5-construct';
import { hw6Meta } from './hw6-qal';
import { hw7Meta } from './hw7-volitional-infinitives';
import { hw8Meta } from './hw8-binyanim';
import { finalExamMeta } from '../final-exam-questions';

export const LEGACY_EXTENDED_HOMEWORKS: Record<string, ExtendedHomeworkMeta> = {
  'article-prepositions': articlePrepositionsMeta,
  hw3: hw3Meta,
  hw4: hw4Meta,
  hw5: hw5Meta,
  hw6: hw6Meta,
  hw7: hw7Meta,
  hw8: hw8Meta,
  'final-exam': finalExamMeta,
};
