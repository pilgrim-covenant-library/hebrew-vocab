// Data-quality guards for the top-300 OT vocabulary drill. Each assertion here
// corresponds to a defect found auditing the list: part-of-speech tags that were
// wrong ~40% of the time, glosses left as raw archaic Strong's prose, mispointed
// lemmas, Aramaic entries in a Hebrew list, and one verb split across two
// Strong's numbers so it was drilled twice.

import vocabularyData from '@/data/vocabulary.json';
import { getCommonOTVocab, COMMON_VOCAB_SECTIONS } from '@/lib/commonVocab';
import type { VocabularyWord } from '@/types';

// The drill list is the words it currently serves; byId is every entry in the
// vocabulary data. The audited defects below were defects in the DATA, and the
// flashcard and quiz modes still serve those words, so they are asserted
// against the data rather than against whichever words the drill holds today.
const top = getCommonOTVocab();
const byId = new Map((vocabularyData.words as VocabularyWord[]).map((w) => [w.id, w]));

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

  it('never drills ילך, the Strong\'s split of הלך', () => {
    expect(top.some((w) => w.id === 'H3212')).toBe(false);
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
    // Both אֵת entries — object marker and the preposition "with" — are homework
    // words now, so the drill no longer has a homograph pair at all.
    expect(clashes).toEqual([]);
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
      /^(Used|Properly|Probably|Perhaps|Hence|The same as|A form of|Strictly|Something)\b/i.test(w.gloss) ||
      // A bare title-cased Strong's headword, with no sense a learner can use:
      // "Contumely" for חֶרְפָּה, "Physically" for יָדָה. Anchored, so the same word
      // inside a real gloss ("Width, breadth") is fine.
      /^(Contumely|Blithesomeness|Booty|Suspension|Abbreviated|Physically|Assemblage|Dominion|Graciousness|Entire|Advice|Watch|Width|Hunger|Dusk|Pierced|Familiar|Lave)$/i.test(w.gloss) ||
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

describe('glosses of the words the coursework-free list pulled in', () => {
  // Below the old top-300 nothing had been audited: these are the defects that
  // surfaced when skipping the coursework words pushed the list further down the
  // frequency table. Two were not merely archaic but wrong.
  it.each([
    ['H3034', /praise|thank/i],        // יָדָה was "Physically"
    ['H3001', /dry|wither/i],          // יָבֵשׁ was "To be ashamed" — that is בּוֹשׁ
    ['H2181', /prostitute|unfaithful/i], // זָנָה was "To commit adultery"
    ['H6327', /scatter|disperse/i],    // פּוּץ was "To dash in pieces"
    ['H3722', /atone/i],               // כָּפַר was "To cover"
    ['H1350', /redeem/i],              // גָּאַל was "To be the next of kin"
    ['H6999', /incense/i],             // קָטַר was "To smoke"
    ['H7911', /forget/i],              // שָׁכַח was "To mislay"
    ['H8057', /joy|glad/i],            // שִׂמְחָה was "Blithesomeness or glee"
    ['H2781', /reproach|disgrace/i],   // חֶרְפָּה was "Contumely"
    ['H5542', /selah/i],               // סֶלָה was "Suspension"
    ['H441', /chief|leader/i],         // אַלּוּף was "Familiar", and tagged a verb
    ['H5265', /set out|journey/i],     // נָסַע was "Properly"
    ['H2583', /encamp/i],              // חָנָה was "Properly"
    ['H2490', /profane/i],             // חָלַל was "Properly"
  ])('%s reads naturally', (id, pattern) => {
    expect(byId.get(id)?.gloss).toMatch(pattern);
  });

  it.each([
    ['H3414', 'Jeremiah'], ['H8111', 'Samaria'], ['H3379', 'Jeroboam'],
    ['H6215', 'Esau'], ['H1035', 'Bethlehem'], ['H884', 'Beersheba'],
    ['H4519', 'Manasseh'], ['H3667', 'Canaan'], ['H2396', 'Hezekiah'],
    ['H53', 'Absalom'], ['H1008', 'Bethel'], ['H2275', 'Hebron'],
  ])('%s is named %s, not transliterated', (id, name) => {
    expect(byId.get(id)?.gloss).toContain(name);
  });

  it('files no noun or adjective under a closed word class', () => {
    const closed = ['preposition', 'conjunction', 'particle', 'pronoun'];
    const suspect = top.filter(
      (w) => closed.includes(w.partOfSpeech) && /^[A-Z][a-z]+(,| |$)/.test(w.gloss) &&
        /^(Wine|Skin|Cedar|Wall|Vineyard|Cherub|Song|Door|Kingdom|Treasury|Work|Wise|Lebanon|Egyptian|Amorite)\b/.test(w.gloss),
    );
    expect(suspect.map((w) => `${w.id} ${w.gloss} = ${w.partOfSpeech}`)).toEqual([]);
  });
});
