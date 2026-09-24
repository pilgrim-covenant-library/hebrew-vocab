// Root families decide what the three vocabulary banks may share. The Hithpael
// hides its root behind a two-letter prefix — and swaps the ת into the root when
// the root starts with a sibilant — so without handling it, HW11's Hithpael verbs
// did not rule out their own roots elsewhere: הָלַל and נָחַם stayed in the drill.

import { familyKey, stemKey, consonants } from '@/lib/hebrewStem';
import { courseworkWordKey, hebrewWordKeys } from '@/lib/coursework';

describe('stemKey', () => {
  it.each([
    ['הִתְקַדֵּשׁ', 'קָדַשׁ'],   // plain הִתְ
    ['יִתְהַלֵּל', 'הָלַל'],     // imperfect יִתְ, geminate root
    ['הִתְהַלְלוּ', 'הָלַל'],    // imperative with ending
    ['וַיִּתְפַּלְלוּ', 'פָּלַל'], // vav-consecutive
    ['יִתְנֶחָם', 'נָחַם'],      // guttural root
    ['הִשְׁתַּמֵּר', 'שָׁמַר'],    // metathesis ש-ת
    ['הִצְטַדֵּק', 'צָדַק'],     // metathesis + assimilation צ-ט
    ['מִתְנַבֵּא', 'נָבָא'],     // participle מִתְ
    ['וָאֶתְוַדֶּה', 'יָדָה'],    // I-yod root, ו in the Hithpael
  ])('should give %s the stem of %s', (form, root) => {
    expect(stemKey(form)).toBe(stemKey(root));
  });

  it('should leave ordinary words alone', () => {
    expect(stemKey('מֶלֶךְ')).toBe(stemKey('מַלְכוּת'));
    expect(stemKey('מֶלֶךְ')).not.toBe(stemKey('הָלַךְ'));
    expect(stemKey('שָׁנָה')).toBe(stemKey('שָׁנִים'));
  });
});

describe('familyKey', () => {
  it('should put a Hithpael form in its root family', () => {
    expect(familyKey('הִתְהַלְלוּ')).toBe(familyKey('הָלַל'));
    expect(familyKey('יִתְנֶחָם')).toBe(familyKey('נָחַם'));
  });
});

describe('maqqef', () => {
  it('should split words joined by a maqqef instead of fusing them', () => {
    expect(hebrewWordKeys('אֶת־הָאֱלֹהִים')).toEqual(['את', 'האלהים']);
    expect(courseworkWordKey('הִתְהַלֶּךְ־נֹחַ')).toBe('התהלך נח');
    expect(consonants('הִתְהַלֶּךְ־נֹחַ')).toBe('התהלכ');
  });
});
