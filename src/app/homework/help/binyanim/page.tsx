'use client';

import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const binyanim = [
  {
    name: 'Qal',
    hebrew: 'קַל',
    meaning: 'Simple Active',
    description: 'The basic, simple form of the verb. Most common binyan.',
    example: 'שָׁמַר',
    exampleTranslit: 'shamar',
    translation: 'he kept/guarded',
    markers: ['No prefix', 'Simple vowel pattern: qatal (perfect)'],
    color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300',
  },
  {
    name: 'Niphal',
    hebrew: 'נִפְעַל',
    meaning: 'Simple Passive/Reflexive',
    description: 'Passive of Qal, or reflexive/middle voice.',
    example: 'נִשְׁמַר',
    exampleTranslit: 'nishmar',
    translation: 'he was kept / guarded himself',
    markers: ['נִ prefix (perfect)', 'יִ with נ infix (imperfect)'],
    color: 'bg-green-100 dark:bg-green-900/30 border-green-300',
  },
  {
    name: 'Piel',
    hebrew: 'פִּעֵל',
    meaning: 'Intensive Active',
    description: 'Intensified, causative, or denominative action.',
    example: 'דִּבֵּר',
    exampleTranslit: 'dibber',
    translation: 'he spoke (intensive of "word")',
    markers: ['Doubled middle consonant (dagesh forte)', 'Patach under 1st radical, tsere under 2nd'],
    color: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300',
  },
  {
    name: 'Pual',
    hebrew: 'פֻּעַל',
    meaning: 'Intensive Passive',
    description: 'Passive of Piel.',
    example: 'דֻּבַּר',
    exampleTranslit: 'dubbar',
    translation: 'it was spoken',
    markers: ['Doubled middle consonant', 'Qibbuts (u-vowel) under 1st radical'],
    color: 'bg-pink-100 dark:bg-pink-900/30 border-pink-300',
  },
  {
    name: 'Hiphil',
    hebrew: 'הִפְעִיל',
    meaning: 'Causative Active',
    description: 'Causes someone to do the Qal action.',
    example: 'הִשְׁמִיד',
    exampleTranslit: 'hishmid',
    translation: 'he destroyed (caused destruction)',
    markers: ['הִ prefix (perfect)', 'יַ prefix with ה (imperfect)', 'Hireq-yod under 2nd radical'],
    color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300',
  },
  {
    name: 'Hophal',
    hebrew: 'הָפְעַל',
    meaning: 'Causative Passive',
    description: 'Passive of Hiphil.',
    example: 'הָשְׁמַד',
    exampleTranslit: 'hashmad',
    translation: 'he was destroyed',
    markers: ['הָ or הֻ prefix (qamets or qibbuts)', 'Passive of Hiphil patterns'],
    color: 'bg-red-100 dark:bg-red-900/30 border-red-300',
  },
  {
    name: 'Hithpael',
    hebrew: 'הִתְפַּעֵל',
    meaning: 'Reflexive/Reciprocal',
    description: 'Reflexive action, or reciprocal between parties.',
    example: 'הִתְקַדֵּשׁ',
    exampleTranslit: 'hitqaddesh',
    translation: 'he sanctified himself',
    markers: ['הִתְ prefix', 'Doubled middle consonant', 'Often reflexive meaning'],
    color: 'bg-teal-100 dark:bg-teal-900/30 border-teal-300',
  },
];

export default function BinyanimHelpPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-14 flex items-center gap-4">
          <Link
            href="/homework/hw1"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Homework</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Page title */}
          <div>
            <h1 className="text-3xl font-bold">The Seven Binyanim (Verb Stems)</h1>
            <p className="text-muted-foreground mt-2">
              Understanding Hebrew's seven verbal patterns and their functions.
            </p>
          </div>

          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                What are Binyanim?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Hebrew verbs are built on <strong>three-consonant roots</strong> (e.g., שׁ-מ-ר
                "keep/guard"). These roots are placed into seven patterns called <strong>binyanim</strong>
                (singular: binyan, meaning "building"), each conveying a different nuance of meaning.
              </p>
              <p>
                The binyanim modify the basic meaning of the root to express:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Voice</strong>: Active vs. Passive</li>
                <li><strong>Intensity</strong>: Simple vs. Intensive</li>
                <li><strong>Causation</strong>: Direct action vs. Causing action</li>
                <li><strong>Reflexivity</strong>: Action on self</li>
              </ul>
            </CardContent>
          </Card>

          {/* Binyan Overview Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Binyan Overview</CardTitle>
              <CardDescription>
                How the seven stems relate to each other
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-3 text-left"></th>
                      <th className="py-2 px-3 text-center">Active</th>
                      <th className="py-2 px-3 text-center">Passive</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Simple</td>
                      <td className="py-2 px-3 text-center">Qal</td>
                      <td className="py-2 px-3 text-center">Niphal</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Intensive</td>
                      <td className="py-2 px-3 text-center">Piel</td>
                      <td className="py-2 px-3 text-center">Pual</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-3 font-medium">Causative</td>
                      <td className="py-2 px-3 text-center">Hiphil</td>
                      <td className="py-2 px-3 text-center">Hophal</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Reflexive</td>
                      <td className="py-2 px-3 text-center" colSpan={2}>Hithpael</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Individual Binyanim */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">The Seven Binyanim in Detail</h2>
            {binyanim.map((binyan, index) => (
              <Card key={index} className={`border-l-4 ${binyan.color}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {binyan.name} <span className="hebrew-text text-lg">({binyan.hebrew})</span>
                    </CardTitle>
                    <span className="text-sm font-medium text-muted-foreground">
                      {binyan.meaning}
                    </span>
                  </div>
                  <CardDescription>{binyan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                    <div>
                      <span className="text-2xl hebrew-text" dir="rtl">{binyan.example}</span>
                      <p className="text-sm text-muted-foreground">{binyan.exampleTranslit}</p>
                    </div>
                    <div className="text-muted-foreground">=</div>
                    <div className="text-sm font-medium">{binyan.translation}</div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase mb-2">
                      Recognition Markers:
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {binyan.markers.map((marker, i) => (
                        <li key={i}>{marker}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tips */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Tips for the Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  Look for <strong>prefixes</strong>: הִ (Hiphil), נִ (Niphal), הִתְ (Hithpael)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <strong>Doubled middle consonant</strong> indicates Piel, Pual, or Hithpael
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <strong>U-vowels</strong> (qibbuts/shureq) often indicate passive (Pual, Hophal)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <strong>Qal is the default</strong>: if no special markers, it's probably Qal
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">5.</span>
                  Active/Passive pairs: Qal-Niphal, Piel-Pual, Hiphil-Hophal
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
