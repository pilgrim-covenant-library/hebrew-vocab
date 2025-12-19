'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ParadigmTable, VerbParadigmTable, PronounTable } from '@/components/ParadigmTable';
import { cn } from '@/lib/utils';

type TabType = 'pronouns' | 'verbs' | 'nouns';

const TABS: { id: TabType; label: string }[] = [
  { id: 'pronouns', label: 'Pronouns' },
  { id: 'verbs', label: 'Verbs' },
  { id: 'nouns', label: 'Nouns' },
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

// Hebrew verb conjugation data (Qal Perfect)
const HEBREW_VERBS = {
  qal_perfect: {
    title: 'Qal Perfect',
    subtitle: 'קָטַל (he killed) - Simple active past',
    forms: {
      singular: {
        '1st': 'קָטַלְתִּי',
        '2nd': 'קָטַלְתָּ / קָטַלְתְּ',
        '3rd': 'קָטַל / קָטְלָה',
      },
      plural: {
        '1st': 'קָטַלְנוּ',
        '2nd': 'קְטַלְתֶּם / קְטַלְתֶּן',
        '3rd': 'קָטְלוּ',
      },
    },
    translations: {
      singular: {
        '1st': 'I killed',
        '2nd': 'you killed (m/f)',
        '3rd': 'he killed / she killed',
      },
      plural: {
        '1st': 'we killed',
        '2nd': 'you killed (m/f)',
        '3rd': 'they killed',
      },
    },
  },
  qal_imperfect: {
    title: 'Qal Imperfect',
    subtitle: 'יִקְטֹל (he will kill) - Simple active future/incomplete',
    forms: {
      singular: {
        '1st': 'אֶקְטֹל',
        '2nd': 'תִּקְטֹל / תִּקְטְלִי',
        '3rd': 'יִקְטֹל / תִּקְטֹל',
      },
      plural: {
        '1st': 'נִקְטֹל',
        '2nd': 'תִּקְטְלוּ / תִּקְטֹלְנָה',
        '3rd': 'יִקְטְלוּ / תִּקְטֹלְנָה',
      },
    },
    translations: {
      singular: {
        '1st': 'I will kill',
        '2nd': 'you will kill (m/f)',
        '3rd': 'he will kill / she will kill',
      },
      plural: {
        '1st': 'we will kill',
        '2nd': 'you will kill (m/f)',
        '3rd': 'they will kill (m/f)',
      },
    },
  },
};

// Binyan descriptions
const BINYAN_DESCRIPTIONS = {
  qal: 'Simple active: the basic meaning of the root',
  niphal: 'Simple passive/reflexive: "be killed" or "kill oneself"',
  piel: 'Intensive active: intensified or repeated action',
  pual: 'Intensive passive: "be intensively killed"',
  hiphil: 'Causative active: "cause to kill"',
  hophal: 'Causative passive: "be caused to kill"',
  hithpael: 'Reflexive: "kill oneself" or reciprocal action',
};

export default function TablesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('pronouns');
  const [selectedVerb, setSelectedVerb] = useState<string>('qal_perfect');
  const [showTranslations, setShowTranslations] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const verbKeys = Object.keys(HEBREW_VERBS);
  const currentVerb = HEBREW_VERBS[selectedVerb as keyof typeof HEBREW_VERBS];

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
          <div>
            <h1 className="text-lg font-semibold">Paradigm Tables</h1>
            <p className="text-xs text-muted-foreground">Study Hebrew forms</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg bg-muted mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-background shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pronouns tab */}
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
                  <p>• Hebrew distinguishes gender in 2nd and 3rd person</p>
                  <p>• First person is "common" (same for masculine and feminine)</p>
                  <p>• Some forms have alternate spellings (אֲנִי and אָנֹכִי both mean "I")</p>
                  <p>• Pronominal suffixes attach directly to verbs, nouns, and prepositions</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Verbs tab */}
        {activeTab === 'verbs' && (
          <div className="space-y-4">
            {/* Verb selector */}
            <div className="flex flex-wrap gap-2">
              {verbKeys.map((key) => {
                const verb = HEBREW_VERBS[key as keyof typeof HEBREW_VERBS];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedVerb(key)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm transition-colors',
                      selectedVerb === key
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    )}
                  >
                    {verb.title}
                  </button>
                );
              })}
            </div>

            {/* Options */}
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTranslations}
                  onChange={(e) => setShowTranslations(e.target.checked)}
                  className="rounded"
                />
                Show translations
              </label>
            </div>

            {/* Verb table */}
            {currentVerb && (
              <VerbParadigmTable
                title={currentVerb.title}
                subtitle={currentVerb.subtitle}
                forms={currentVerb.forms}
                translations={showTranslations ? currentVerb.translations : undefined}
                showTranslations={showTranslations}
              />
            )}

            {/* Binyan descriptions */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  The Seven Binyanim (Verb Stems)
                </h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(BINYAN_DESCRIPTIONS).map(([binyan, desc]) => (
                    <div key={binyan} className="flex gap-2">
                      <span className="font-medium capitalize w-20 shrink-0">{binyan}:</span>
                      <span className="text-muted-foreground">{desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Nouns tab */}
        {activeTab === 'nouns' && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Hebrew Noun Patterns</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Hebrew nouns are formed from three-letter roots and follow various patterns.
                  They have gender (masculine/feminine) and number (singular/plural/dual).
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Common Masculine Patterns</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-muted rounded">
                        <span className="font-hebrew text-lg" dir="rtl">מֶלֶךְ</span>
                        <span className="block text-muted-foreground">king (segolate)</span>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <span className="font-hebrew text-lg" dir="rtl">דָּבָר</span>
                        <span className="block text-muted-foreground">word/thing</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Common Feminine Patterns</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-muted rounded">
                        <span className="font-hebrew text-lg" dir="rtl">מַלְכָּה</span>
                        <span className="block text-muted-foreground">queen (ה- ending)</span>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <span className="font-hebrew text-lg" dir="rtl">בְּרִית</span>
                        <span className="block text-muted-foreground">covenant (ת- ending)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Plural Endings</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>• Masculine plural: <span className="font-hebrew" dir="rtl">ים-</span> (מְלָכִים - kings)</p>
                      <p>• Feminine plural: <span className="font-hebrew" dir="rtl">וֹת-</span> (מַלְכוֹת - queens)</p>
                      <p>• Dual (pairs): <span className="font-hebrew" dir="rtl">ַיִם-</span> (יָדַיִם - hands)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Construct State (סְמִיכוּת)
                </h3>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">
                    When two nouns are linked in a possessive relationship, the first noun
                    enters the "construct state" and may change form:
                  </p>
                  <div className="p-3 bg-muted rounded">
                    <p className="font-hebrew text-lg" dir="rtl">דְּבַר הַמֶּלֶךְ</p>
                    <p>devar hammelekh - "word of the king"</p>
                    <p className="text-xs mt-1">Note: דָּבָר becomes דְּבַר in construct</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
