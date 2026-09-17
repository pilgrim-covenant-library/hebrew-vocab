// Data-quality guards for the top-300 OT vocabulary drill. Each assertion here
// corresponds to a defect found auditing the list: part-of-speech tags that were
// wrong ~40% of the time, glosses left as raw archaic Strong's prose, mispointed
// lemmas, Aramaic entries in a Hebrew list, and one verb split across two
// Strong's numbers so it was drilled twice.

import { getCommonOTVocab, COMMON_VOCAB_SECTIONS } from '@/lib/commonVocab';

const top = getCommonOTVocab();
const byId = new Map(top.map((w) => [w.id, w]));

describe('top-300 list composition', () => {
  it('holds exactly 300 words with no duplicate ids', () => {
    expect(top).toHaveLength(300);
    expect(new Set(top.map((w) => w.id)).size).toBe(300);
  });

  it('contains no Biblical Aramaic entries', () => {
    const aramaic = top.filter((w) =>
      `${w.gloss} ${w.definition}`.toLowerCase().includes('aramaic'),
    );
    expect(aramaic.map((w) => w.id)).toEqual([]);
  });

  it('drills הלך once, under the lemma students learn', () => {
    expect(byId.has('H3212')).toBe(false); // ילך — the same verb, split by Strong's
    expect(byId.get('H1980')?.hebrew).toBe('הָלַךְ');
  });

  it('has no two entries sharing one pointed spelling', () => {
    const seen = new Map<string, string>();
    const clashes: string[] = [];
    for (const w of top) {
      const prior = seen.get(w.hebrew);
      if (prior) clashes.push(`${w.hebrew} (${prior} / ${w.id})`);
      else seen.set(w.hebrew, w.id);
    }
    // אֵת is the one true homograph: object marker vs. the preposition "with".
    expect(clashes).toEqual(['אֵת (H853 / H854)']);
  });
});

describe('lemma pointing', () => {
  it.each([
    ['H2617', 'חֶסֶד'],   // was חֵסֵד — tsere for segol
    ['H413', 'אֶל'],      // preposition "to", not אֵל "God"
    ['H3915', 'לַיְלָה'], // was לַיִל
    ['H8141', 'שָׁנָה'],  // was שָׁנֶה
    ['H1288', 'בָּרַךְ'], // was בָרַךְ, missing the dagesh
  ])('%s is pointed %s', (id, hebrew) => {
    expect(byId.get(id)?.hebrew).toBe(hebrew);
  });
});

describe('glosses are written for a learner', () => {
  it.each([
    ['H3789', /write/i],        // was "To grave"
    ['H6680', /command/i],      // was "To constitute"
    ['H1288', /bless/i],        // was "To kneel"
    ['H410', /god/i],           // was "Strength"
    ['H176', /\bor\b/i],        // was "Desire"
    ['H7307', /spirit/i],       // was "Wind"
    ['H4057', /wilderness/i],   // was "A pasture"
    ['H7965', /peace/i],        // was "Safe"
    ['H5930', /burnt offering/i], // was "A step or" — truncated
    ['H2617', /steadfast love/i], // was "Kindness"
  ])('%s reads naturally', (id, pattern) => {
    expect(byId.get(id)?.gloss).toMatch(pattern);
  });

  it('carries no archaic pronouns, hedges, or truncated text', () => {
    const bad = top.filter((w) =>
      /\b(thou|thee|thy|ye)\b/i.test(w.gloss) ||
      /^(Used|Properly|Probably|Perhaps|Hence|The same as)\b/i.test(w.gloss) ||
      /\s{2,}/.test(w.gloss) ||
      /\s\bor\s*$/i.test(w.gloss),
    );
    expect(bad.map((w) => `${w.id}: ${w.gloss}`)).toEqual([]);
  });

  it('gives proper nouns their English names', () => {
    for (const [id, name] of [
      ['H3063', 'Judah'], ['H4714', 'Egypt'], ['H6547', 'Pharaoh'],
      ['H894', 'Babylon'], ['H4872', 'Moses'], ['H3290', 'Jacob'],
      ['H7586', 'Saul'], ['H8010', 'Solomon'], ['H3091', 'Joshua'],
      ['H3389', 'Jerusalem'],
    ] as const) {
      expect(byId.get(id)?.gloss).toContain(name);
    }
  });
});

describe('part of speech', () => {
  it.each([
    ['H853', 'particle'], ['H5921', 'preposition'], ['H834', 'particle'],
    ['H3588', 'conjunction'], ['H430', 'noun'], ['H4428', 'noun'],
    ['H3117', 'noun'], ['H376', 'noun'], ['H6440', 'noun'], ['H1004', 'noun'],
    ['H1931', 'pronoun'], ['H1697', 'noun'], ['H5704', 'preposition'],
    ['H4480', 'preposition'], ['H2088', 'pronoun'], ['H859', 'pronoun'],
    ['H518', 'conjunction'], ['H5973', 'preposition'], ['H854', 'preposition'],
    ['H589', 'pronoun'], ['H2009', 'interjection'], ['H8033', 'adverb'],
    ['H369', 'particle'], ['H559', 'verb'], ['H2896', 'adjective'],
  ])('%s is tagged %s', (id, pos) => {
    expect(byId.get(id)?.partOfSpeech).toBe(pos);
  });

  it('tags every "To ..." gloss as a verb', () => {
    const mistagged = top.filter((w) => /^to\s/i.test(w.gloss) && w.partOfSpeech !== 'verb');
    expect(mistagged.map((w) => w.id)).toEqual([]);
  });
});

describe('section descriptions match their words', () => {
  it('claims no category the section does not contain', () => {
    // Section 7 was captioned "cultic terminology and warfare terms" while
    // holding stone, flesh, heart, foot and cubit.
    for (const section of COMMON_VOCAB_SECTIONS) {
      expect(section.description.length).toBeGreaterThan(0);
      expect(section.description).not.toMatch(/cultic|warfare/i);
    }
  });
});
