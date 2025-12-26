/**
 * Complete Hebrew Verb Paradigms (Binyanim)
 *
 * Uses קטל (qatal - "to kill") as the paradigm verb for all binyanim.
 * This is the traditional paradigm verb used in Hebrew grammar instruction
 * because it has no weak letters and displays all patterns clearly.
 */

import type { Binyan, HebrewConjugation } from '@/types';

// Person-Number-Gender combinations
export type VerbPGN =
  | '3ms' | '3fs' | '2ms' | '2fs' | '1cs'  // Singular
  | '3cp' | '2mp' | '2fp' | '1cp';         // Plural

export interface VerbForm {
  hebrew: string;
  transliteration: string;
  translation: string;
}

export interface ConjugationTable {
  name: HebrewConjugation;
  hebrewName: string;
  description: string;
  forms: Record<VerbPGN, VerbForm>;
}

export interface BinyanParadigm {
  name: Binyan;
  hebrewName: string;
  meaning: string;
  description: string;
  characteristic: string;
  color: string;
  perfect: ConjugationTable;
  imperfect: ConjugationTable;
  imperative: Partial<Record<VerbPGN, VerbForm>>;
  infinitiveConstruct: VerbForm;
  infinitiveAbsolute: VerbForm;
  participleActive?: Record<'ms' | 'fs' | 'mp' | 'fp', VerbForm>;
  participlePassive?: Record<'ms' | 'fs' | 'mp' | 'fp', VerbForm>;
}

// ============================================
// QAL (Simple Active)
// ============================================
export const qalParadigm: BinyanParadigm = {
  name: 'qal',
  hebrewName: 'קַל',
  meaning: 'Simple Active',
  description: 'The basic, simple stem. Most common binyan with no special markers.',
  characteristic: 'No prefix, simple vowel pattern',
  color: 'blue',

  perfect: {
    name: 'perfect',
    hebrewName: 'עָבַר / קָטַל',
    description: 'Completed action, often translated as past tense',
    forms: {
      '3ms': { hebrew: 'קָטַל', transliteration: 'qāṭal', translation: 'he killed' },
      '3fs': { hebrew: 'קָטְלָה', transliteration: 'qāṭəlâ', translation: 'she killed' },
      '2ms': { hebrew: 'קָטַלְתָּ', transliteration: 'qāṭaltā', translation: 'you (m) killed' },
      '2fs': { hebrew: 'קָטַלְתְּ', transliteration: 'qāṭalt', translation: 'you (f) killed' },
      '1cs': { hebrew: 'קָטַלְתִּי', transliteration: 'qāṭaltî', translation: 'I killed' },
      '3cp': { hebrew: 'קָטְלוּ', transliteration: 'qāṭəlû', translation: 'they killed' },
      '2mp': { hebrew: 'קְטַלְתֶּם', transliteration: 'qəṭaltem', translation: 'you (m.pl) killed' },
      '2fp': { hebrew: 'קְטַלְתֶּן', transliteration: 'qəṭalten', translation: 'you (f.pl) killed' },
      '1cp': { hebrew: 'קָטַלְנוּ', transliteration: 'qāṭalnû', translation: 'we killed' },
    },
  },

  imperfect: {
    name: 'imperfect',
    hebrewName: 'יִקְטֹל',
    description: 'Incomplete action, often translated as future or habitual',
    forms: {
      '3ms': { hebrew: 'יִקְטֹל', transliteration: 'yiqṭōl', translation: 'he will kill' },
      '3fs': { hebrew: 'תִּקְטֹל', transliteration: 'tiqṭōl', translation: 'she will kill' },
      '2ms': { hebrew: 'תִּקְטֹל', transliteration: 'tiqṭōl', translation: 'you (m) will kill' },
      '2fs': { hebrew: 'תִּקְטְלִי', transliteration: 'tiqṭəlî', translation: 'you (f) will kill' },
      '1cs': { hebrew: 'אֶקְטֹל', transliteration: 'ʾeqṭōl', translation: 'I will kill' },
      '3cp': { hebrew: 'יִקְטְלוּ', transliteration: 'yiqṭəlû', translation: 'they will kill' },
      '2mp': { hebrew: 'תִּקְטְלוּ', transliteration: 'tiqṭəlû', translation: 'you (m.pl) will kill' },
      '2fp': { hebrew: 'תִּקְטֹלְנָה', transliteration: 'tiqṭōlnâ', translation: 'you (f.pl) will kill' },
      '1cp': { hebrew: 'נִקְטֹל', transliteration: 'niqṭōl', translation: 'we will kill' },
    },
  },

  imperative: {
    '2ms': { hebrew: 'קְטֹל', transliteration: 'qəṭōl', translation: 'kill! (m.s)' },
    '2fs': { hebrew: 'קִטְלִי', transliteration: 'qiṭlî', translation: 'kill! (f.s)' },
    '2mp': { hebrew: 'קִטְלוּ', transliteration: 'qiṭlû', translation: 'kill! (m.pl)' },
    '2fp': { hebrew: 'קְטֹלְנָה', transliteration: 'qəṭōlnâ', translation: 'kill! (f.pl)' },
  },

  infinitiveConstruct: { hebrew: 'קְטֹל', transliteration: 'qəṭōl', translation: 'to kill' },
  infinitiveAbsolute: { hebrew: 'קָטוֹל', transliteration: 'qāṭôl', translation: 'killing (emphatic)' },

  participleActive: {
    ms: { hebrew: 'קֹטֵל', transliteration: 'qōṭēl', translation: 'killing / one who kills' },
    fs: { hebrew: 'קֹטֶלֶת', transliteration: 'qōṭelet', translation: 'killing (f)' },
    mp: { hebrew: 'קֹטְלִים', transliteration: 'qōṭəlîm', translation: 'killing (m.pl)' },
    fp: { hebrew: 'קֹטְלוֹת', transliteration: 'qōṭəlôt', translation: 'killing (f.pl)' },
  },

  participlePassive: {
    ms: { hebrew: 'קָטוּל', transliteration: 'qāṭûl', translation: 'killed (m.s)' },
    fs: { hebrew: 'קְטוּלָה', transliteration: 'qəṭûlâ', translation: 'killed (f.s)' },
    mp: { hebrew: 'קְטוּלִים', transliteration: 'qəṭûlîm', translation: 'killed (m.pl)' },
    fp: { hebrew: 'קְטוּלוֹת', transliteration: 'qəṭûlôt', translation: 'killed (f.pl)' },
  },
};

// ============================================
// NIPHAL (Simple Passive / Reflexive)
// ============================================
export const niphalParadigm: BinyanParadigm = {
  name: 'niphal',
  hebrewName: 'נִפְעַל',
  meaning: 'Simple Passive / Reflexive',
  description: 'Passive of Qal, or reflexive/middle voice.',
  characteristic: 'נִ prefix in perfect, נ assimilates in imperfect',
  color: 'green',

  perfect: {
    name: 'perfect',
    hebrewName: 'נִקְטַל',
    description: 'Passive or reflexive completed action',
    forms: {
      '3ms': { hebrew: 'נִקְטַל', transliteration: 'niqṭal', translation: 'he was killed' },
      '3fs': { hebrew: 'נִקְטְלָה', transliteration: 'niqṭəlâ', translation: 'she was killed' },
      '2ms': { hebrew: 'נִקְטַלְתָּ', transliteration: 'niqṭaltā', translation: 'you (m) were killed' },
      '2fs': { hebrew: 'נִקְטַלְתְּ', transliteration: 'niqṭalt', translation: 'you (f) were killed' },
      '1cs': { hebrew: 'נִקְטַלְתִּי', transliteration: 'niqṭaltî', translation: 'I was killed' },
      '3cp': { hebrew: 'נִקְטְלוּ', transliteration: 'niqṭəlû', translation: 'they were killed' },
      '2mp': { hebrew: 'נִקְטַלְתֶּם', transliteration: 'niqṭaltem', translation: 'you (m.pl) were killed' },
      '2fp': { hebrew: 'נִקְטַלְתֶּן', transliteration: 'niqṭalten', translation: 'you (f.pl) were killed' },
      '1cp': { hebrew: 'נִקְטַלְנוּ', transliteration: 'niqṭalnû', translation: 'we were killed' },
    },
  },

  imperfect: {
    name: 'imperfect',
    hebrewName: 'יִקָּטֵל',
    description: 'The נ assimilates into the first radical with dagesh',
    forms: {
      '3ms': { hebrew: 'יִקָּטֵל', transliteration: 'yiqqāṭēl', translation: 'he will be killed' },
      '3fs': { hebrew: 'תִּקָּטֵל', transliteration: 'tiqqāṭēl', translation: 'she will be killed' },
      '2ms': { hebrew: 'תִּקָּטֵל', transliteration: 'tiqqāṭēl', translation: 'you (m) will be killed' },
      '2fs': { hebrew: 'תִּקָּטְלִי', transliteration: 'tiqqāṭəlî', translation: 'you (f) will be killed' },
      '1cs': { hebrew: 'אֶקָּטֵל', transliteration: 'ʾeqqāṭēl', translation: 'I will be killed' },
      '3cp': { hebrew: 'יִקָּטְלוּ', transliteration: 'yiqqāṭəlû', translation: 'they will be killed' },
      '2mp': { hebrew: 'תִּקָּטְלוּ', transliteration: 'tiqqāṭəlû', translation: 'you (m.pl) will be killed' },
      '2fp': { hebrew: 'תִּקָּטַלְנָה', transliteration: 'tiqqāṭalnâ', translation: 'you (f.pl) will be killed' },
      '1cp': { hebrew: 'נִקָּטֵל', transliteration: 'niqqāṭēl', translation: 'we will be killed' },
    },
  },

  imperative: {
    '2ms': { hebrew: 'הִקָּטֵל', transliteration: 'hiqqāṭēl', translation: 'be killed! (m.s)' },
    '2fs': { hebrew: 'הִקָּטְלִי', transliteration: 'hiqqāṭəlî', translation: 'be killed! (f.s)' },
    '2mp': { hebrew: 'הִקָּטְלוּ', transliteration: 'hiqqāṭəlû', translation: 'be killed! (m.pl)' },
    '2fp': { hebrew: 'הִקָּטַלְנָה', transliteration: 'hiqqāṭalnâ', translation: 'be killed! (f.pl)' },
  },

  infinitiveConstruct: { hebrew: 'הִקָּטֵל', transliteration: 'hiqqāṭēl', translation: 'to be killed' },
  infinitiveAbsolute: { hebrew: 'נִקְטוֹל / הִקָּטֹל', transliteration: 'niqṭôl / hiqqāṭōl', translation: 'being killed (emphatic)' },

  participleActive: {
    ms: { hebrew: 'נִקְטָל', transliteration: 'niqṭāl', translation: 'being killed' },
    fs: { hebrew: 'נִקְטֶלֶת', transliteration: 'niqṭelet', translation: 'being killed (f)' },
    mp: { hebrew: 'נִקְטָלִים', transliteration: 'niqṭālîm', translation: 'being killed (m.pl)' },
    fp: { hebrew: 'נִקְטָלוֹת', transliteration: 'niqṭālôt', translation: 'being killed (f.pl)' },
  },
};

// ============================================
// PIEL (Intensive Active)
// ============================================
export const pielParadigm: BinyanParadigm = {
  name: 'piel',
  hebrewName: 'פִּעֵל',
  meaning: 'Intensive Active',
  description: 'Intensified action, factitive, or denominative.',
  characteristic: 'Doubled middle consonant (dagesh forte)',
  color: 'purple',

  perfect: {
    name: 'perfect',
    hebrewName: 'קִטֵּל',
    description: 'Intensive or causative completed action',
    forms: {
      '3ms': { hebrew: 'קִטֵּל', transliteration: 'qiṭṭēl', translation: 'he slaughtered' },
      '3fs': { hebrew: 'קִטְּלָה', transliteration: 'qiṭṭəlâ', translation: 'she slaughtered' },
      '2ms': { hebrew: 'קִטַּלְתָּ', transliteration: 'qiṭṭaltā', translation: 'you (m) slaughtered' },
      '2fs': { hebrew: 'קִטַּלְתְּ', transliteration: 'qiṭṭalt', translation: 'you (f) slaughtered' },
      '1cs': { hebrew: 'קִטַּלְתִּי', transliteration: 'qiṭṭaltî', translation: 'I slaughtered' },
      '3cp': { hebrew: 'קִטְּלוּ', transliteration: 'qiṭṭəlû', translation: 'they slaughtered' },
      '2mp': { hebrew: 'קִטַּלְתֶּם', transliteration: 'qiṭṭaltem', translation: 'you (m.pl) slaughtered' },
      '2fp': { hebrew: 'קִטַּלְתֶּן', transliteration: 'qiṭṭalten', translation: 'you (f.pl) slaughtered' },
      '1cp': { hebrew: 'קִטַּלְנוּ', transliteration: 'qiṭṭalnû', translation: 'we slaughtered' },
    },
  },

  imperfect: {
    name: 'imperfect',
    hebrewName: 'יְקַטֵּל',
    description: 'Intensive incomplete action',
    forms: {
      '3ms': { hebrew: 'יְקַטֵּל', transliteration: 'yəqaṭṭēl', translation: 'he will slaughter' },
      '3fs': { hebrew: 'תְּקַטֵּל', transliteration: 'təqaṭṭēl', translation: 'she will slaughter' },
      '2ms': { hebrew: 'תְּקַטֵּל', transliteration: 'təqaṭṭēl', translation: 'you (m) will slaughter' },
      '2fs': { hebrew: 'תְּקַטְּלִי', transliteration: 'təqaṭṭəlî', translation: 'you (f) will slaughter' },
      '1cs': { hebrew: 'אֲקַטֵּל', transliteration: 'ʾăqaṭṭēl', translation: 'I will slaughter' },
      '3cp': { hebrew: 'יְקַטְּלוּ', transliteration: 'yəqaṭṭəlû', translation: 'they will slaughter' },
      '2mp': { hebrew: 'תְּקַטְּלוּ', transliteration: 'təqaṭṭəlû', translation: 'you (m.pl) will slaughter' },
      '2fp': { hebrew: 'תְּקַטֵּלְנָה', transliteration: 'təqaṭṭēlnâ', translation: 'you (f.pl) will slaughter' },
      '1cp': { hebrew: 'נְקַטֵּל', transliteration: 'nəqaṭṭēl', translation: 'we will slaughter' },
    },
  },

  imperative: {
    '2ms': { hebrew: 'קַטֵּל', transliteration: 'qaṭṭēl', translation: 'slaughter! (m.s)' },
    '2fs': { hebrew: 'קַטְּלִי', transliteration: 'qaṭṭəlî', translation: 'slaughter! (f.s)' },
    '2mp': { hebrew: 'קַטְּלוּ', transliteration: 'qaṭṭəlû', translation: 'slaughter! (m.pl)' },
    '2fp': { hebrew: 'קַטֵּלְנָה', transliteration: 'qaṭṭēlnâ', translation: 'slaughter! (f.pl)' },
  },

  infinitiveConstruct: { hebrew: 'קַטֵּל', transliteration: 'qaṭṭēl', translation: 'to slaughter' },
  infinitiveAbsolute: { hebrew: 'קַטֵּל', transliteration: 'qaṭṭēl', translation: 'slaughtering (emphatic)' },

  participleActive: {
    ms: { hebrew: 'מְקַטֵּל', transliteration: 'məqaṭṭēl', translation: 'slaughtering' },
    fs: { hebrew: 'מְקַטֶּלֶת', transliteration: 'məqaṭṭelet', translation: 'slaughtering (f)' },
    mp: { hebrew: 'מְקַטְּלִים', transliteration: 'məqaṭṭəlîm', translation: 'slaughtering (m.pl)' },
    fp: { hebrew: 'מְקַטְּלוֹת', transliteration: 'məqaṭṭəlôt', translation: 'slaughtering (f.pl)' },
  },
};

// ============================================
// PUAL (Intensive Passive)
// ============================================
export const pualParadigm: BinyanParadigm = {
  name: 'pual',
  hebrewName: 'פֻּעַל',
  meaning: 'Intensive Passive',
  description: 'Passive of Piel. Always has qibbuts (u-vowel) under first radical.',
  characteristic: 'Doubled middle consonant + qibbuts/shureq',
  color: 'pink',

  perfect: {
    name: 'perfect',
    hebrewName: 'קֻטַּל',
    description: 'Intensive passive completed action',
    forms: {
      '3ms': { hebrew: 'קֻטַּל', transliteration: 'quṭṭal', translation: 'he was slaughtered' },
      '3fs': { hebrew: 'קֻטְּלָה', transliteration: 'quṭṭəlâ', translation: 'she was slaughtered' },
      '2ms': { hebrew: 'קֻטַּלְתָּ', transliteration: 'quṭṭaltā', translation: 'you (m) were slaughtered' },
      '2fs': { hebrew: 'קֻטַּלְתְּ', transliteration: 'quṭṭalt', translation: 'you (f) were slaughtered' },
      '1cs': { hebrew: 'קֻטַּלְתִּי', transliteration: 'quṭṭaltî', translation: 'I was slaughtered' },
      '3cp': { hebrew: 'קֻטְּלוּ', transliteration: 'quṭṭəlû', translation: 'they were slaughtered' },
      '2mp': { hebrew: 'קֻטַּלְתֶּם', transliteration: 'quṭṭaltem', translation: 'you (m.pl) were slaughtered' },
      '2fp': { hebrew: 'קֻטַּלְתֶּן', transliteration: 'quṭṭalten', translation: 'you (f.pl) were slaughtered' },
      '1cp': { hebrew: 'קֻטַּלְנוּ', transliteration: 'quṭṭalnû', translation: 'we were slaughtered' },
    },
  },

  imperfect: {
    name: 'imperfect',
    hebrewName: 'יְקֻטַּל',
    description: 'Intensive passive incomplete action',
    forms: {
      '3ms': { hebrew: 'יְקֻטַּל', transliteration: 'yəquṭṭal', translation: 'he will be slaughtered' },
      '3fs': { hebrew: 'תְּקֻטַּל', transliteration: 'təquṭṭal', translation: 'she will be slaughtered' },
      '2ms': { hebrew: 'תְּקֻטַּל', transliteration: 'təquṭṭal', translation: 'you (m) will be slaughtered' },
      '2fs': { hebrew: 'תְּקֻטְּלִי', transliteration: 'təquṭṭəlî', translation: 'you (f) will be slaughtered' },
      '1cs': { hebrew: 'אֲקֻטַּל', transliteration: 'ʾăquṭṭal', translation: 'I will be slaughtered' },
      '3cp': { hebrew: 'יְקֻטְּלוּ', transliteration: 'yəquṭṭəlû', translation: 'they will be slaughtered' },
      '2mp': { hebrew: 'תְּקֻטְּלוּ', transliteration: 'təquṭṭəlû', translation: 'you (m.pl) will be slaughtered' },
      '2fp': { hebrew: 'תְּקֻטַּלְנָה', transliteration: 'təquṭṭalnâ', translation: 'you (f.pl) will be slaughtered' },
      '1cp': { hebrew: 'נְקֻטַּל', transliteration: 'nəquṭṭal', translation: 'we will be slaughtered' },
    },
  },

  imperative: {},  // Pual has no imperative (passive voice)

  infinitiveConstruct: { hebrew: 'קֻטַּל', transliteration: 'quṭṭal', translation: 'to be slaughtered' },
  infinitiveAbsolute: { hebrew: 'קֻטֹּל', transliteration: 'quṭṭōl', translation: 'being slaughtered (emphatic)' },

  participleActive: {
    ms: { hebrew: 'מְקֻטָּל', transliteration: 'məquṭṭāl', translation: 'being slaughtered' },
    fs: { hebrew: 'מְקֻטֶּלֶת', transliteration: 'məquṭṭelet', translation: 'being slaughtered (f)' },
    mp: { hebrew: 'מְקֻטָּלִים', transliteration: 'məquṭṭālîm', translation: 'being slaughtered (m.pl)' },
    fp: { hebrew: 'מְקֻטָּלוֹת', transliteration: 'məquṭṭālôt', translation: 'being slaughtered (f.pl)' },
  },
};

// ============================================
// HIPHIL (Causative Active)
// ============================================
export const hiphilParadigm: BinyanParadigm = {
  name: 'hiphil',
  hebrewName: 'הִפְעִיל',
  meaning: 'Causative Active',
  description: 'Causes someone to do the Qal action.',
  characteristic: 'הִ prefix (perfect), hireq-yod under 2nd radical',
  color: 'orange',

  perfect: {
    name: 'perfect',
    hebrewName: 'הִקְטִיל',
    description: 'Causative completed action',
    forms: {
      '3ms': { hebrew: 'הִקְטִיל', transliteration: 'hiqṭîl', translation: 'he caused to kill' },
      '3fs': { hebrew: 'הִקְטִילָה', transliteration: 'hiqṭîlâ', translation: 'she caused to kill' },
      '2ms': { hebrew: 'הִקְטַלְתָּ', transliteration: 'hiqṭaltā', translation: 'you (m) caused to kill' },
      '2fs': { hebrew: 'הִקְטַלְתְּ', transliteration: 'hiqṭalt', translation: 'you (f) caused to kill' },
      '1cs': { hebrew: 'הִקְטַלְתִּי', transliteration: 'hiqṭaltî', translation: 'I caused to kill' },
      '3cp': { hebrew: 'הִקְטִילוּ', transliteration: 'hiqṭîlû', translation: 'they caused to kill' },
      '2mp': { hebrew: 'הִקְטַלְתֶּם', transliteration: 'hiqṭaltem', translation: 'you (m.pl) caused to kill' },
      '2fp': { hebrew: 'הִקְטַלְתֶּן', transliteration: 'hiqṭalten', translation: 'you (f.pl) caused to kill' },
      '1cp': { hebrew: 'הִקְטַלְנוּ', transliteration: 'hiqṭalnû', translation: 'we caused to kill' },
    },
  },

  imperfect: {
    name: 'imperfect',
    hebrewName: 'יַקְטִיל',
    description: 'Causative incomplete action with יַ prefix',
    forms: {
      '3ms': { hebrew: 'יַקְטִיל', transliteration: 'yaqṭîl', translation: 'he will cause to kill' },
      '3fs': { hebrew: 'תַּקְטִיל', transliteration: 'taqṭîl', translation: 'she will cause to kill' },
      '2ms': { hebrew: 'תַּקְטִיל', transliteration: 'taqṭîl', translation: 'you (m) will cause to kill' },
      '2fs': { hebrew: 'תַּקְטִילִי', transliteration: 'taqṭîlî', translation: 'you (f) will cause to kill' },
      '1cs': { hebrew: 'אַקְטִיל', transliteration: 'ʾaqṭîl', translation: 'I will cause to kill' },
      '3cp': { hebrew: 'יַקְטִילוּ', transliteration: 'yaqṭîlû', translation: 'they will cause to kill' },
      '2mp': { hebrew: 'תַּקְטִילוּ', transliteration: 'taqṭîlû', translation: 'you (m.pl) will cause to kill' },
      '2fp': { hebrew: 'תַּקְטֵלְנָה', transliteration: 'taqṭēlnâ', translation: 'you (f.pl) will cause to kill' },
      '1cp': { hebrew: 'נַקְטִיל', transliteration: 'naqṭîl', translation: 'we will cause to kill' },
    },
  },

  imperative: {
    '2ms': { hebrew: 'הַקְטֵל', transliteration: 'haqṭēl', translation: 'cause to kill! (m.s)' },
    '2fs': { hebrew: 'הַקְטִילִי', transliteration: 'haqṭîlî', translation: 'cause to kill! (f.s)' },
    '2mp': { hebrew: 'הַקְטִילוּ', transliteration: 'haqṭîlû', translation: 'cause to kill! (m.pl)' },
    '2fp': { hebrew: 'הַקְטֵלְנָה', transliteration: 'haqṭēlnâ', translation: 'cause to kill! (f.pl)' },
  },

  infinitiveConstruct: { hebrew: 'הַקְטִיל', transliteration: 'haqṭîl', translation: 'to cause to kill' },
  infinitiveAbsolute: { hebrew: 'הַקְטֵל', transliteration: 'haqṭēl', translation: 'causing to kill (emphatic)' },

  participleActive: {
    ms: { hebrew: 'מַקְטִיל', transliteration: 'maqṭîl', translation: 'causing to kill' },
    fs: { hebrew: 'מַקְטִילָה', transliteration: 'maqṭîlâ', translation: 'causing to kill (f)' },
    mp: { hebrew: 'מַקְטִילִים', transliteration: 'maqṭîlîm', translation: 'causing to kill (m.pl)' },
    fp: { hebrew: 'מַקְטִילוֹת', transliteration: 'maqṭîlôt', translation: 'causing to kill (f.pl)' },
  },
};

// ============================================
// HOPHAL (Causative Passive)
// ============================================
export const hophalParadigm: BinyanParadigm = {
  name: 'hophal',
  hebrewName: 'הָפְעַל',
  meaning: 'Causative Passive',
  description: 'Passive of Hiphil.',
  characteristic: 'הָ or הֻ prefix with qamets or qibbuts',
  color: 'red',

  perfect: {
    name: 'perfect',
    hebrewName: 'הָקְטַל',
    description: 'Causative passive completed action',
    forms: {
      '3ms': { hebrew: 'הָקְטַל', transliteration: 'hoqṭal', translation: 'he was caused to kill' },
      '3fs': { hebrew: 'הָקְטְלָה', transliteration: 'hoqṭəlâ', translation: 'she was caused to kill' },
      '2ms': { hebrew: 'הָקְטַלְתָּ', transliteration: 'hoqṭaltā', translation: 'you (m) were caused to kill' },
      '2fs': { hebrew: 'הָקְטַלְתְּ', transliteration: 'hoqṭalt', translation: 'you (f) were caused to kill' },
      '1cs': { hebrew: 'הָקְטַלְתִּי', transliteration: 'hoqṭaltî', translation: 'I was caused to kill' },
      '3cp': { hebrew: 'הָקְטְלוּ', transliteration: 'hoqṭəlû', translation: 'they were caused to kill' },
      '2mp': { hebrew: 'הָקְטַלְתֶּם', transliteration: 'hoqṭaltem', translation: 'you (m.pl) were caused to kill' },
      '2fp': { hebrew: 'הָקְטַלְתֶּן', transliteration: 'hoqṭalten', translation: 'you (f.pl) were caused to kill' },
      '1cp': { hebrew: 'הָקְטַלְנוּ', transliteration: 'hoqṭalnû', translation: 'we were caused to kill' },
    },
  },

  imperfect: {
    name: 'imperfect',
    hebrewName: 'יָקְטַל',
    description: 'Causative passive incomplete action',
    forms: {
      '3ms': { hebrew: 'יָקְטַל', transliteration: 'yoqṭal', translation: 'he will be caused to kill' },
      '3fs': { hebrew: 'תָּקְטַל', transliteration: 'toqṭal', translation: 'she will be caused to kill' },
      '2ms': { hebrew: 'תָּקְטַל', transliteration: 'toqṭal', translation: 'you (m) will be caused to kill' },
      '2fs': { hebrew: 'תָּקְטְלִי', transliteration: 'toqṭəlî', translation: 'you (f) will be caused to kill' },
      '1cs': { hebrew: 'אָקְטַל', transliteration: 'ʾoqṭal', translation: 'I will be caused to kill' },
      '3cp': { hebrew: 'יָקְטְלוּ', transliteration: 'yoqṭəlû', translation: 'they will be caused to kill' },
      '2mp': { hebrew: 'תָּקְטְלוּ', transliteration: 'toqṭəlû', translation: 'you (m.pl) will be caused to kill' },
      '2fp': { hebrew: 'תָּקְטַלְנָה', transliteration: 'toqṭalnâ', translation: 'you (f.pl) will be caused to kill' },
      '1cp': { hebrew: 'נָקְטַל', transliteration: 'noqṭal', translation: 'we will be caused to kill' },
    },
  },

  imperative: {},  // Hophal has no imperative (passive voice)

  infinitiveConstruct: { hebrew: 'הָקְטַל', transliteration: 'hoqṭal', translation: 'to be caused to kill' },
  infinitiveAbsolute: { hebrew: 'הָקְטֵל', transliteration: 'hoqṭēl', translation: 'being caused to kill (emphatic)' },

  participleActive: {
    ms: { hebrew: 'מָקְטָל', transliteration: 'moqṭāl', translation: 'being caused to kill' },
    fs: { hebrew: 'מָקְטֶלֶת', transliteration: 'moqṭelet', translation: 'being caused to kill (f)' },
    mp: { hebrew: 'מָקְטָלִים', transliteration: 'moqṭālîm', translation: 'being caused to kill (m.pl)' },
    fp: { hebrew: 'מָקְטָלוֹת', transliteration: 'moqṭālôt', translation: 'being caused to kill (f.pl)' },
  },
};

// ============================================
// HITHPAEL (Reflexive / Reciprocal)
// ============================================
export const hithpaelParadigm: BinyanParadigm = {
  name: 'hithpael',
  hebrewName: 'הִתְפַּעֵל',
  meaning: 'Reflexive / Reciprocal',
  description: 'Reflexive action or reciprocal action between parties.',
  characteristic: 'הִתְ prefix + doubled middle consonant',
  color: 'teal',

  perfect: {
    name: 'perfect',
    hebrewName: 'הִתְקַטֵּל',
    description: 'Reflexive completed action',
    forms: {
      '3ms': { hebrew: 'הִתְקַטֵּל', transliteration: 'hitqaṭṭēl', translation: 'he killed himself' },
      '3fs': { hebrew: 'הִתְקַטְּלָה', transliteration: 'hitqaṭṭəlâ', translation: 'she killed herself' },
      '2ms': { hebrew: 'הִתְקַטַּלְתָּ', transliteration: 'hitqaṭṭaltā', translation: 'you (m) killed yourself' },
      '2fs': { hebrew: 'הִתְקַטַּלְתְּ', transliteration: 'hitqaṭṭalt', translation: 'you (f) killed yourself' },
      '1cs': { hebrew: 'הִתְקַטַּלְתִּי', transliteration: 'hitqaṭṭaltî', translation: 'I killed myself' },
      '3cp': { hebrew: 'הִתְקַטְּלוּ', transliteration: 'hitqaṭṭəlû', translation: 'they killed themselves' },
      '2mp': { hebrew: 'הִתְקַטַּלְתֶּם', transliteration: 'hitqaṭṭaltem', translation: 'you (m.pl) killed yourselves' },
      '2fp': { hebrew: 'הִתְקַטַּלְתֶּן', transliteration: 'hitqaṭṭalten', translation: 'you (f.pl) killed yourselves' },
      '1cp': { hebrew: 'הִתְקַטַּלְנוּ', transliteration: 'hitqaṭṭalnû', translation: 'we killed ourselves' },
    },
  },

  imperfect: {
    name: 'imperfect',
    hebrewName: 'יִתְקַטֵּל',
    description: 'Reflexive incomplete action',
    forms: {
      '3ms': { hebrew: 'יִתְקַטֵּל', transliteration: 'yitqaṭṭēl', translation: 'he will kill himself' },
      '3fs': { hebrew: 'תִּתְקַטֵּל', transliteration: 'titqaṭṭēl', translation: 'she will kill herself' },
      '2ms': { hebrew: 'תִּתְקַטֵּל', transliteration: 'titqaṭṭēl', translation: 'you (m) will kill yourself' },
      '2fs': { hebrew: 'תִּתְקַטְּלִי', transliteration: 'titqaṭṭəlî', translation: 'you (f) will kill yourself' },
      '1cs': { hebrew: 'אֶתְקַטֵּל', transliteration: 'ʾetqaṭṭēl', translation: 'I will kill myself' },
      '3cp': { hebrew: 'יִתְקַטְּלוּ', transliteration: 'yitqaṭṭəlû', translation: 'they will kill themselves' },
      '2mp': { hebrew: 'תִּתְקַטְּלוּ', transliteration: 'titqaṭṭəlû', translation: 'you (m.pl) will kill yourselves' },
      '2fp': { hebrew: 'תִּתְקַטֵּלְנָה', transliteration: 'titqaṭṭēlnâ', translation: 'you (f.pl) will kill yourselves' },
      '1cp': { hebrew: 'נִתְקַטֵּל', transliteration: 'nitqaṭṭēl', translation: 'we will kill ourselves' },
    },
  },

  imperative: {
    '2ms': { hebrew: 'הִתְקַטֵּל', transliteration: 'hitqaṭṭēl', translation: 'kill yourself! (m.s)' },
    '2fs': { hebrew: 'הִתְקַטְּלִי', transliteration: 'hitqaṭṭəlî', translation: 'kill yourself! (f.s)' },
    '2mp': { hebrew: 'הִתְקַטְּלוּ', transliteration: 'hitqaṭṭəlû', translation: 'kill yourselves! (m.pl)' },
    '2fp': { hebrew: 'הִתְקַטֵּלְנָה', transliteration: 'hitqaṭṭēlnâ', translation: 'kill yourselves! (f.pl)' },
  },

  infinitiveConstruct: { hebrew: 'הִתְקַטֵּל', transliteration: 'hitqaṭṭēl', translation: 'to kill oneself' },
  infinitiveAbsolute: { hebrew: 'הִתְקַטֵּל', transliteration: 'hitqaṭṭēl', translation: 'killing oneself (emphatic)' },

  participleActive: {
    ms: { hebrew: 'מִתְקַטֵּל', transliteration: 'mitqaṭṭēl', translation: 'killing oneself' },
    fs: { hebrew: 'מִתְקַטֶּלֶת', transliteration: 'mitqaṭṭelet', translation: 'killing oneself (f)' },
    mp: { hebrew: 'מִתְקַטְּלִים', transliteration: 'mitqaṭṭəlîm', translation: 'killing oneselves (m.pl)' },
    fp: { hebrew: 'מִתְקַטְּלוֹת', transliteration: 'mitqaṭṭəlôt', translation: 'killing oneselves (f.pl)' },
  },
};

// ============================================
// EXPORTS
// ============================================

export const allBinyanim: BinyanParadigm[] = [
  qalParadigm,
  niphalParadigm,
  pielParadigm,
  pualParadigm,
  hiphilParadigm,
  hophalParadigm,
  hithpaelParadigm,
];

export const binyanimByName: Record<Binyan, BinyanParadigm> = {
  qal: qalParadigm,
  niphal: niphalParadigm,
  piel: pielParadigm,
  pual: pualParadigm,
  hiphil: hiphilParadigm,
  hophal: hophalParadigm,
  hithpael: hithpaelParadigm,
};

// Person-Gender-Number labels
export const PGN_LABELS: Record<VerbPGN, string> = {
  '3ms': '3rd Masc. Sing.',
  '3fs': '3rd Fem. Sing.',
  '2ms': '2nd Masc. Sing.',
  '2fs': '2nd Fem. Sing.',
  '1cs': '1st Common Sing.',
  '3cp': '3rd Common Pl.',
  '2mp': '2nd Masc. Pl.',
  '2fp': '2nd Fem. Pl.',
  '1cp': '1st Common Pl.',
};

export const PGN_ABBREVIATIONS: Record<VerbPGN, string> = {
  '3ms': '3ms',
  '3fs': '3fs',
  '2ms': '2ms',
  '2fs': '2fs',
  '1cs': '1cs',
  '3cp': '3cp',
  '2mp': '2mp',
  '2fp': '2fp',
  '1cp': '1cp',
};

// Order for displaying forms in tables
export const SINGULAR_PGNS: VerbPGN[] = ['3ms', '3fs', '2ms', '2fs', '1cs'];
export const PLURAL_PGNS: VerbPGN[] = ['3cp', '2mp', '2fp', '1cp'];
export const ALL_PGNS: VerbPGN[] = [...SINGULAR_PGNS, ...PLURAL_PGNS];
export const IMPERATIVE_PGNS: VerbPGN[] = ['2ms', '2fs', '2mp', '2fp'];
