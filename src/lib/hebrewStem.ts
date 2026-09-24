import vocabularyData from '@/data/vocabulary.json';

/**
 * Grouping Hebrew words into root families, so that a word is not drilled in one
 * place and its cognate in another — שָׁמַר in a homework and מִשְׁמֶרֶת in the
 * top-300 list are the same stem to a student.
 *
 * Hebrew has no root field in this data (Strong's derivations are not recorded),
 * so families are computed. The rules deliberately err toward grouping words
 * together: a false grouping costs one candidate word out of thousands, while a
 * missed grouping puts a repeat in front of the student, which is the thing being
 * prevented. אֵל "God" and אֶל "to" therefore land in one family even though they
 * are unrelated, and so do עִיר "city" and עוֹר "skin".
 */

const FINALS: Record<string, string> = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };

/** Endings written in the normalised alphabet — a final letter here never matches. */
const ENDINGS = [
  'ותיהם', 'ותיכם', 'יהם', 'יהן', 'ותם', 'ותיו', 'ות', 'ים', 'יו', 'יה',
  'נו', 'כם', 'כן', 'הם', 'הן', 'תי', 'תם', 'תן', 'ה', 'ו', 'י', 'ת',
].map((ending) => [...ending].map((c) => FINALS[c] ?? c).join(''));

/** Letters that can begin a word without belonging to its root. */
const PREFIXES = new Set(['ו', 'ה', 'ב', 'כ', 'ל', 'מ', 'ש', 'ת', 'י', 'א', 'נ']);

/** Consonants only, final forms normalised, first word if several. */
export function consonants(hebrew: string): string {
  const stripped = (hebrew ?? '')
    // Maqqef first: it sits inside the points range, and stripping it with them
    // fused אֶת־הָאֱלֹהִים into a single "word".
    .replace(/־/g, ' ')
    .replace(/[֑-ׇ]/g, '')
    .split('')
    .map((c) => FINALS[c] ?? c)
    .join('')
    .replace(/[^א-ת ]/g, ' ')
    .trim();
  return stripped.split(/\s+/)[0] ?? '';
}

/** Endings, gemination and interior vowel letters — never a prefix. */
function withoutEndings(word: string): string {
  let s = word;
  for (const ending of ENDINGS) {
    if (s.endsWith(ending) && s.length - ending.length >= 2) {
      s = s.slice(0, -ending.length);
      break;
    }
  }
  if (s.length > 3) s = s[0] + s.slice(1, -1).replace(/[וי]/g, '') + s[s.length - 1];
  if (s.length === 3 && s[1] === s[2]) s = s.slice(0, 2);
  return s;
}

let attested: Set<string> | null = null;
function attestedStems(): Set<string> {
  if (!attested) {
    attested = new Set<string>();
    for (const word of vocabularyData.words as { hebrew: string }[]) {
      attested.add(withoutEndings(consonants(word.hebrew)));
    }
  }
  return attested;
}

/**
 * Where a Hithpael's root may be, once its prefix is off: הִתְ / יִתְ / מִתְ /
 * נִתְ / אֶתְ / תִּתְ, perhaps behind a vav, with the ת swapped past a sibilant
 * (הִשְׁתַּמֵּר from שָׁמַר) or assimilated after צ (הִצְטַדֵּק from צָדַק).
 */
function hithpaelResidues(word: string): string[] {
  const residues: string[] = [];
  const bodies = word.startsWith('ו') ? [word, word.slice(1)] : [word];
  for (const body of bodies) {
    if (body.length < 4 || !'היתאנמ'.includes(body[0])) continue;
    const rest = body.slice(1);
    if (rest[0] === 'ת') residues.push(rest.slice(1));
    if ('שסצ'.includes(rest[0]) && rest[1] === 'ת') residues.push(rest[0] + rest.slice(2));
    if (rest[0] === 'צ' && rest[1] === 'ט') residues.push('צ' + rest.slice(2));
    if (rest[0] === 'ז' && rest[1] === 'ד') residues.push('ז' + rest.slice(2));
  }
  // I-yod roots show a ו in the Hithpael (וָאֶתְוַדֶּה from יָדָה).
  return residues.flatMap((r) => (r.startsWith('ו') ? [r, `י${r.slice(1)}`] : [r]));
}

/** The first residue the lexicon attests as a stem, trying a weak final ו/י off too. */
function attestedHithpaelStem(word: string): string | null {
  for (const residue of hithpaelResidues(word)) {
    const stem = withoutEndings(residue);
    const candidates = stem.length === 3 && 'וי'.includes(stem[2]) ? [stem, stem.slice(0, 2)] : [stem];
    const found = candidates.find((c) => attestedStems().has(c));
    if (found) return found;
  }
  return null;
}

/**
 * The word's stem: endings removed, then one prefix letter removed only when what
 * remains is a stem the lexicon attests on its own, which keeps שָׁנִים from
 * losing its ש while letting נִשְׁמַר lose its נ. A Hithpael loses its whole
 * prefix the same way.
 */
export function stemKey(hebrew: string): string {
  const raw = consonants(hebrew);
  const hithpael = raw.length >= 4 ? attestedHithpaelStem(raw) : null;
  if (hithpael) return hithpael;
  const base = withoutEndings(raw);
  if (base.length >= 4 && PREFIXES.has(base[0])) {
    const trimmed = withoutEndings(base.slice(1));
    if (attestedStems().has(trimmed)) return trimmed;
  }
  if (base.length >= 4) {
    for (const ending of ENDINGS) {
      if (base.endsWith(ending) && base.length - ending.length >= 3) {
        const trimmed = withoutEndings(base.slice(0, -ending.length));
        if (attestedStems().has(trimmed)) return trimmed;
      }
    }
  }
  return base;
}

/** A stem with its vowel letters dropped, so קֶדֶם and קָדִים meet. */
function stemCore(stem: string): string {
  const core = stem.replace(/[וי]/g, '');
  return core.length >= 2 ? core : stem;
}

// Union-find over stems and their cores: two words are one family when their
// stems match, or their cores do, or a chain of such matches connects them.
let parents: Map<string, string> | null = null;

function find(key: string, map: Map<string, string>): string {
  let node = key;
  if (!map.has(node)) map.set(node, node);
  while (map.get(node) !== node) {
    const parent = map.get(node) as string;
    map.set(node, map.get(parent) as string);
    node = parent;
  }
  return node;
}

function families(): Map<string, string> {
  if (!parents) {
    const map = new Map<string, string>();
    for (const word of vocabularyData.words as { hebrew: string; frequency: number }[]) {
      // Only words that actually occur in the OT link families together; hapax
      // spellings would otherwise chain unrelated roots into one blob.
      if (!(word.frequency > 0)) continue;
      const stem = stemKey(word.hebrew);
      const keys = [`S:${stem}`, `C:${stemCore(stem)}`];
      // Only when an ending has shortened the stem below three letters does the
      // full spelling get a say, so that קָדִים (stem קד) still reaches קֶדֶם
      // through קדמ. Letting every word link through its full spelling chained
      // unrelated roots into families of fifty: שָׁמַר with מַר, אֶל with אַיִל.
      if (stem.length < 3) {
        const fullCore = stemCore(consonants(word.hebrew));
        if (fullCore.length >= 3) keys.push(`C:${fullCore}`);
      }
      for (const key of keys.slice(1)) {
        const a = find(keys[0], map);
        const b = find(key, map);
        if (a !== b) map.set(a, b);
      }
    }
    parents = map;
  }
  return parents;
}

/** The root family this word belongs to. Equal keys mean "same stem to a student". */
export function familyKey(hebrew: string): string {
  return find(`S:${stemKey(hebrew)}`, families());
}
