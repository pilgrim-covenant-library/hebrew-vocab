'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Grid3X3,
  Layers,
  Eye,
  EyeOff,
  Shuffle,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  ParadigmTable,
  VerbParadigmTable,
  PronounTable,
  BinyanParadigmTable,
  BinyanComparisonTable,
} from '@/components/ParadigmTable';
import { HebrewWord } from '@/components/HebrewWord';
import { cn } from '@/lib/utils';
import {
  allBinyanim,
  binyanimByName,
  type BinyanParadigm,
  type VerbPGN,
} from '@/data/paradigms/binyanim';
import type { Binyan } from '@/types';

type TabType = 'binyanim' | 'comparison' | 'pronouns' | 'nouns' | 'suffixes';

const TABS: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'binyanim', label: 'Binyanim', icon: Layers },
  { id: 'comparison', label: 'Compare', icon: Grid3X3 },
  { id: 'pronouns', label: 'Pronouns', icon: BookOpen },
  { id: 'nouns', label: 'Nouns', icon: BookOpen },
  { id: 'suffixes', label: 'Suffixes', icon: BookOpen },
];

// Hebrew pronoun data
const HEBREW_PRONOUNS = {
  independent: {
    title: 'Independent Personal Pronouns',
    subtitle: 'Used for emphasis or as subjects',
    forms: {
      singular: {
        '1st common': 'אֲנִי / אָנֹכִי',
        '2nd masc.': 'אַתָּה',
        '2nd fem.': 'אַתְּ',
        '3rd masc.': 'הוּא',
        '3rd fem.': 'הִיא',
      },
      plural: {
        '1st common': 'אֲנַחְנוּ',
        '2nd masc.': 'אַתֶּם',
        '2nd fem.': 'אַתֶּנָה',
        '3rd masc.': 'הֵם / הֵמָּה',
        '3rd fem.': 'הֵן / הֵנָּה',
      },
    },
  },
};

// Pronominal suffix data
const PRONOMINAL_SUFFIXES = {
  singular: [
    { person: '1cs', suffix: 'י-', example: 'סוּסִי', meaning: 'my horse' },
    { person: '2ms', suffix: 'ךָ-', example: 'סוּסְךָ', meaning: 'your (m.s) horse' },
    { person: '2fs', suffix: 'ךְ-', example: 'סוּסֵךְ', meaning: 'your (f.s) horse' },
    { person: '3ms', suffix: 'וֹ-', example: 'סוּסוֹ', meaning: 'his horse' },
    { person: '3fs', suffix: 'הּ-', example: 'סוּסָהּ', meaning: 'her horse' },
  ],
  plural: [
    { person: '1cp', suffix: 'נוּ-', example: 'סוּסֵנוּ', meaning: 'our horse' },
    { person: '2mp', suffix: 'כֶם-', example: 'סוּסְכֶם', meaning: 'your (m.pl) horse' },
    { person: '2fp', suffix: 'כֶן-', example: 'סוּסְכֶן', meaning: 'your (f.pl) horse' },
    { person: '3mp', suffix: 'הֶם / ם-', example: 'סוּסָם', meaning: 'their (m) horse' },
    { person: '3fp', suffix: 'הֶן / ן-', example: 'סוּסָן', meaning: 'their (f) horse' },
  ],
};

// Noun pattern data
const NOUN_PATTERNS = [
  {
    name: 'Segolate (qetl)',
    pattern: 'קֶטֶל',
    examples: [
      { hebrew: 'מֶלֶךְ', meaning: 'king' },
      { hebrew: 'סֵפֶר', meaning: 'book' },
      { hebrew: 'בֹּקֶר', meaning: 'morning' },
    ],
    notes: 'Two-syllable nouns with segol vowels. Stress on first syllable.',
  },
  {
    name: 'Qatal pattern',
    pattern: 'קָטָל',
    examples: [
      { hebrew: 'דָּבָר', meaning: 'word' },
      { hebrew: 'מָקוֹם', meaning: 'place' },
      { hebrew: 'שָׁלוֹם', meaning: 'peace' },
    ],
    notes: 'Common pattern with qamets vowels.',
  },
  {
    name: 'Qatil pattern',
    pattern: 'קָטִיל',
    examples: [
      { hebrew: 'נָבִיא', meaning: 'prophet' },
      { hebrew: 'גָּדוֹל', meaning: 'great' },
      { hebrew: 'קָטֹן', meaning: 'small' },
    ],
    notes: 'Often used for adjectives.',
  },
  {
    name: 'Feminine -ah',
    pattern: 'קְטָלָה',
    examples: [
      { hebrew: 'מַלְכָּה', meaning: 'queen' },
      { hebrew: 'תּוֹרָה', meaning: 'law' },
      { hebrew: 'שָׂפָה', meaning: 'lip/language' },
    ],
    notes: 'Most common feminine ending. Changes to -at in construct.',
  },
  {
    name: 'Feminine -et/-at',
    pattern: 'קֶטֶלֶת',
    examples: [
      { hebrew: 'בַּת', meaning: 'daughter' },
      { hebrew: 'דַּעַת', meaning: 'knowledge' },
      { hebrew: 'בְּרִית', meaning: 'covenant' },
    ],
    notes: 'Alternative feminine pattern with tav ending.',
  },
];

export default function TablesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('binyanim');
  const [selectedBinyan, setSelectedBinyan] = useState<Binyan>('qal');
  const [quizMode, setQuizMode] = useState(false);
  const [compareConjugation, setCompareConjugation] = useState<'perfect' | 'imperfect'>('perfect');
  const [comparePGN, setComparePGN] = useState<VerbPGN>('3ms');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentParadigm = binyanimByName[selectedBinyan];

  // Random binyan selection
  const selectRandomBinyan = () => {
    const binyanKeys = Object.keys(binyanimByName) as Binyan[];
    const randomKey = binyanKeys[Math.floor(Math.random() * binyanKeys.length)];
    setSelectedBinyan(randomKey);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/grammar">
            <Button variant="ghost" size="icon" aria-label="Back to grammar">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Hebrew Paradigm Tables</h1>
            <p className="text-xs text-muted-foreground">
              Interactive verb, noun, and pronoun charts
            </p>
          </div>
          {activeTab === 'binyanim' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuizMode(!quizMode)}
                className={cn(
                  'flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-colors',
                  quizMode
                    ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                    : 'bg-muted hover:bg-muted/80'
                )}
              >
                {quizMode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                Quiz Mode
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg bg-muted mb-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Binyanim Tab */}
        {activeTab === 'binyanim' && (
          <div className="space-y-4">
            {/* Binyan Selector */}
            <div className="flex flex-wrap items-center gap-2">
              {allBinyanim.map((b) => (
                <button
                  key={b.name}
                  onClick={() => setSelectedBinyan(b.name)}
                  className={cn(
                    'relative px-3 py-1.5 rounded-full text-sm transition-all',
                    selectedBinyan === b.name
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted hover:bg-muted/80'
                  )}
                >
                  <span className="hebrew-text mr-1">{b.hebrewName}</span>
                  <span className="text-xs opacity-80">({b.name})</span>
                  {selectedBinyan === b.name && (
                    <span
                      className={cn(
                        'absolute -top-1 -right-1 w-2 h-2 rounded-full',
                        b.color === 'blue' && 'bg-blue-500',
                        b.color === 'green' && 'bg-green-500',
                        b.color === 'purple' && 'bg-purple-500',
                        b.color === 'pink' && 'bg-pink-500',
                        b.color === 'orange' && 'bg-orange-500',
                        b.color === 'red' && 'bg-red-500',
                        b.color === 'teal' && 'bg-teal-500'
                      )}
                    />
                  )}
                </button>
              ))}
              <button
                onClick={selectRandomBinyan}
                className="p-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                title="Random binyan"
              >
                <Shuffle className="w-4 h-4" />
              </button>
            </div>

            {/* Paradigm Table */}
            <BinyanParadigmTable
              paradigm={currentParadigm}
              quizMode={quizMode}
              interactive={true}
            />

            {/* Binyan Quick Reference */}
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Binyan Quick Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {allBinyanim.map((b) => (
                    <div
                      key={b.name}
                      className={cn(
                        'flex items-start gap-2 p-2 rounded transition-colors cursor-pointer',
                        selectedBinyan === b.name && 'bg-primary/10'
                      )}
                      onClick={() => setSelectedBinyan(b.name)}
                    >
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full mt-1 shrink-0',
                          b.color === 'blue' && 'bg-blue-500',
                          b.color === 'green' && 'bg-green-500',
                          b.color === 'purple' && 'bg-purple-500',
                          b.color === 'pink' && 'bg-pink-500',
                          b.color === 'orange' && 'bg-orange-500',
                          b.color === 'red' && 'bg-red-500',
                          b.color === 'teal' && 'bg-teal-500'
                        )}
                      />
                      <div>
                        <span className="font-medium">{b.hebrewName}</span>
                        <span className="text-muted-foreground ml-1">({b.meaning})</span>
                        <p className="text-muted-foreground">{b.characteristic}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">
                      Conjugation
                    </label>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setCompareConjugation('perfect')}
                        className={cn(
                          'px-3 py-1 text-sm rounded transition-colors',
                          compareConjugation === 'perfect'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        )}
                      >
                        Perfect
                      </button>
                      <button
                        onClick={() => setCompareConjugation('imperfect')}
                        className={cn(
                          'px-3 py-1 text-sm rounded transition-colors',
                          compareConjugation === 'imperfect'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        )}
                      >
                        Imperfect
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">
                      Person/Gender/Number
                    </label>
                    <select
                      value={comparePGN}
                      onChange={(e) => setComparePGN(e.target.value as VerbPGN)}
                      className="px-3 py-1 text-sm rounded border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="3ms">3rd Masc. Sing.</option>
                      <option value="3fs">3rd Fem. Sing.</option>
                      <option value="2ms">2nd Masc. Sing.</option>
                      <option value="2fs">2nd Fem. Sing.</option>
                      <option value="1cs">1st Common Sing.</option>
                      <option value="3cp">3rd Common Pl.</option>
                      <option value="2mp">2nd Masc. Pl.</option>
                      <option value="2fp">2nd Fem. Pl.</option>
                      <option value="1cp">1st Common Pl.</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <BinyanComparisonTable
              paradigms={allBinyanim}
              conjugation={compareConjugation}
              pgn={comparePGN}
            />

            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2 text-sm">Pattern Recognition Tips</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground">Perfect Markers:</p>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      <li>Qal: No prefix, a-a vowels (קָטַל)</li>
                      <li>Niphal: נִ prefix (נִקְטַל)</li>
                      <li>Piel: Doubled middle, i-e vowels (קִטֵּל)</li>
                      <li>Hiphil: הִ prefix (הִקְטִיל)</li>
                      <li>Hithpael: הִתְ prefix (הִתְקַטֵּל)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Imperfect Markers:</p>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      <li>Qal: יִ prefix, simple pattern (יִקְטֹל)</li>
                      <li>Niphal: יִ + dagesh (יִקָּטֵל)</li>
                      <li>Piel: יְ prefix, doubled middle (יְקַטֵּל)</li>
                      <li>Hiphil: יַ prefix (יַקְטִיל)</li>
                      <li>Hithpael: יִתְ prefix (יִתְקַטֵּל)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pronouns Tab */}
        {activeTab === 'pronouns' && (
          <div className="space-y-4">
            <PronounTable
              title={HEBREW_PRONOUNS.independent.title}
              subtitle={HEBREW_PRONOUNS.independent.subtitle}
              forms={HEBREW_PRONOUNS.independent.forms}
            />

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Hebrew Pronoun Notes
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>- Hebrew distinguishes gender in 2nd and 3rd person</p>
                  <p>- First person is "common" (same for masculine and feminine)</p>
                  <p>- Some forms have alternate spellings (אֲנִי and אָנֹכִי both mean "I")</p>
                  <p>- Pronouns often combine with prepositions (לִי "to me", אֹתָךְ "you")</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Object Pronouns (with את)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                  <div className="p-2 bg-background rounded">
                    <HebrewWord hebrew="אֹתִי" size="md" showAudio={false} />
                    <p className="text-xs text-muted-foreground">me</p>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <HebrewWord hebrew="אֹתְךָ" size="md" showAudio={false} />
                    <p className="text-xs text-muted-foreground">you (m.s)</p>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <HebrewWord hebrew="אֹתָךְ" size="md" showAudio={false} />
                    <p className="text-xs text-muted-foreground">you (f.s)</p>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <HebrewWord hebrew="אֹתוֹ" size="md" showAudio={false} />
                    <p className="text-xs text-muted-foreground">him</p>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <HebrewWord hebrew="אֹתָהּ" size="md" showAudio={false} />
                    <p className="text-xs text-muted-foreground">her</p>
                  </div>
                  <div className="p-2 bg-background rounded">
                    <HebrewWord hebrew="אֹתָנוּ" size="md" showAudio={false} />
                    <p className="text-xs text-muted-foreground">us</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Nouns Tab */}
        {activeTab === 'nouns' && (
          <div className="space-y-4">
            {NOUN_PATTERNS.map((pattern, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span className="hebrew-text text-lg">{pattern.pattern}</span>
                    <span className="text-muted-foreground font-normal">- {pattern.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {pattern.examples.map((ex, i) => (
                      <div key={i} className="p-2 bg-muted rounded-lg text-center min-w-[80px]">
                        <HebrewWord hebrew={ex.hebrew} size="md" showAudio={false} />
                        <p className="text-xs text-muted-foreground mt-1">{ex.meaning}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{pattern.notes}</p>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Number & Gender Endings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium mb-2">Masculine</p>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Singular: (no marking)</p>
                      <p>Plural: <span className="hebrew-text">ים-</span> (-im)</p>
                      <p>Dual: <span className="hebrew-text">ַיִם-</span> (-ayim)</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Feminine</p>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Singular: <span className="hebrew-text">ה-</span> (-ah) or <span className="hebrew-text">ת-</span> (-t)</p>
                      <p>Plural: <span className="hebrew-text">וֹת-</span> (-ot)</p>
                      <p>Dual: <span className="hebrew-text">ַתַיִם-</span> (-atayim)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Construct State (סְמִיכוּת)
                </h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    When nouns are linked in possession, the first noun enters "construct state":
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-3 bg-background rounded">
                      <HebrewWord hebrew="דְּבַר הַמֶּלֶךְ" size="md" showAudio={false} />
                      <p className="text-xs mt-1">word of the king</p>
                      <p className="text-[10px] text-muted-foreground">דָּבָר → דְּבַר</p>
                    </div>
                    <div className="p-3 bg-background rounded">
                      <HebrewWord hebrew="בֵּית הָאָב" size="md" showAudio={false} />
                      <p className="text-xs mt-1">house of the father</p>
                      <p className="text-[10px] text-muted-foreground">בַּיִת → בֵּית</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Suffixes Tab */}
        {activeTab === 'suffixes' && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pronominal Suffixes on Nouns</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Using <span className="hebrew-text">סוּס</span> (horse) as example
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Singular Subjects</p>
                    <div className="space-y-2">
                      {PRONOMINAL_SUFFIXES.singular.map((s) => (
                        <div key={s.person} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                          <HebrewWord hebrew={s.example} size="sm" showAudio={false} />
                          <div className="flex-1">
                            <p className="text-xs">{s.meaning}</p>
                            <p className="text-[10px] text-muted-foreground">
                              suffix: <span className="hebrew-text">{s.suffix}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Plural Subjects</p>
                    <div className="space-y-2">
                      {PRONOMINAL_SUFFIXES.plural.map((s) => (
                        <div key={s.person} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                          <HebrewWord hebrew={s.example} size="sm" showAudio={false} />
                          <div className="flex-1">
                            <p className="text-xs">{s.meaning}</p>
                            <p className="text-[10px] text-muted-foreground">
                              suffix: <span className="hebrew-text">{s.suffix}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suffixes on Prepositions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Common preposition <span className="hebrew-text">לְ</span> (to/for)
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[
                    { hebrew: 'לִי', meaning: 'to me' },
                    { hebrew: 'לְךָ', meaning: 'to you (m)' },
                    { hebrew: 'לָךְ', meaning: 'to you (f)' },
                    { hebrew: 'לוֹ', meaning: 'to him' },
                    { hebrew: 'לָהּ', meaning: 'to her' },
                    { hebrew: 'לָנוּ', meaning: 'to us' },
                    { hebrew: 'לָכֶם', meaning: 'to you (m.pl)' },
                    { hebrew: 'לָכֶן', meaning: 'to you (f.pl)' },
                    { hebrew: 'לָהֶם', meaning: 'to them (m)' },
                    { hebrew: 'לָהֶן', meaning: 'to them (f)' },
                  ].map((p, i) => (
                    <div key={i} className="p-2 bg-muted rounded text-center">
                      <HebrewWord hebrew={p.hebrew} size="sm" showAudio={false} />
                      <p className="text-[10px] text-muted-foreground mt-1">{p.meaning}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Suffix Pattern Tips</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>- 1st person singular: usually ends with <span className="hebrew-text">י</span> (yod)</p>
                  <p>- 2nd person: contains <span className="hebrew-text">ךְ/ךָ</span> (kaph)</p>
                  <p>- 3rd person singular: <span className="hebrew-text">וֹ</span> (masc) / <span className="hebrew-text">הּ</span> (fem)</p>
                  <p>- Plural subjects: often have <span className="hebrew-text">ם</span> (mem) or <span className="hebrew-text">ן</span> (nun)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
