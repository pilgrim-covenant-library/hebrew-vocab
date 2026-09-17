// Class 10 and HW10 also carry the STRONG Piel (Ch 30) and STRONG Pual (Ch 32).
// The weak chapters (31, 33) are deliberately excluded, as is any weak-class
// item that rode in on a strong chapter's contextual translations.

import { CLASS10_CONFIG } from '@/lib/class10Practice';
import { hw10Meta, hw10Sections } from '@/data/homework/hw10-questions';

const WEAK_CLASS_TERMS = /I-נ|III-ה|II-Guttural|I-guttural|Biconsonantal|Geminate|I-י|weak/i;

describe('Class 10 Piel and Pual (strong only)', () => {
  it('adds Ch 30 Piel and Ch 32 Pual as chapter modes', () => {
    const ids = CLASS10_CONFIG.chapters.map((c) => c.id);
    expect(ids).toContain('ch30');
    expect(ids).toContain('ch32');
  });

  it('never adds the weak Piel/Pual chapters', () => {
    const ids = CLASS10_CONFIG.chapters.map((c) => c.id);
    expect(ids).not.toContain('ch31');
    expect(ids).not.toContain('ch33');
  });

  it('keeps every Piel/Pual item free of weak-verb material', () => {
    for (const chapter of CLASS10_CONFIG.chapters.filter((c) => c.id === 'ch30' || c.id === 'ch32')) {
      const items = [...chapter.groups, ...chapter.contextGroups].flatMap((g) => g.questions);
      expect(items.length).toBeGreaterThan(0);
      for (const q of items) {
        const text = `${q.prompt} ${q.options.join(' ')} ${q.explanation}`;
        expect(text).not.toMatch(WEAK_CLASS_TERMS);
      }
    }
  });
});

describe('HW10 Piel and Pual (strong only)', () => {
  it('adds a Piel and a Pual section without renumbering the existing ones', () => {
    const byId = new Map(hw10Meta.sections.map((s) => [s.id, s.title]));
    expect(byId.get(1)).toMatch(/Ch 26/);
    expect(byId.get(5)).toMatch(/Vocabulary/);
    expect(byId.get(6)).toMatch(/Verse Translation/);
    expect(byId.get(7)).toMatch(/Piel/);
    expect(byId.get(8)).toMatch(/Pual/);
  });

  it('orders the Piel and Pual sections before vocabulary and verse work', () => {
    const order = hw10Meta.sections.map((s) => s.id);
    expect(order.indexOf(7)).toBeLessThan(order.indexOf(5));
    expect(order.indexOf(8)).toBeLessThan(order.indexOf(5));
    expect(order.indexOf(7)).toBeLessThan(order.indexOf(8));
  });

  it('keeps the new sections free of weak-verb material', () => {
    for (const qs of [hw10Sections[7], hw10Sections[8]]) {
      expect(qs).toHaveLength(5);
      for (const q of qs) {
        expect(`${q.question} ${q.explanation}`).not.toMatch(WEAK_CLASS_TERMS);
      }
    }
  });

  it('counts every question it advertises', () => {
    const counted = hw10Meta.sections.reduce((n, s) => n + s.questionCount, 0);
    expect(hw10Meta.totalQuestions).toBe(counted);
    for (const s of hw10Meta.sections) {
      expect(hw10Meta.sectionQuestions[s.id]).toHaveLength(s.questionCount);
    }
  });
});
