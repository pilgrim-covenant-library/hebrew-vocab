'use client';

import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

const constructExamples = [
  {
    construct: 'דְּבַר יְהוָה',
    absolute: 'דָּבָר',
    translation: 'word of the LORD',
    notes: 'Notice the vowel change: davar (absolute) becomes devar (construct)',
  },
  {
    construct: 'בֵּית הַמֶּלֶךְ',
    absolute: 'בַּיִת',
    translation: 'house of the king',
    notes: 'bayit becomes beit; the article on "king" makes the whole chain definite',
  },
  {
    construct: 'בֶּן דָּוִד',
    absolute: 'בֵּן',
    translation: 'son of David',
    notes: 'Indefinite construct chain (no article)',
  },
  {
    construct: 'מֶלֶךְ יִשְׂרָאֵל',
    absolute: 'מֶלֶךְ',
    translation: 'king of Israel',
    notes: 'Proper nouns are inherently definite',
  },
  {
    construct: 'תּוֹרַת מֹשֶׁה',
    absolute: 'תּוֹרָה',
    translation: 'law of Moses',
    notes: 'Feminine nouns often change -ah to -at in construct',
  },
];

const vowelChanges = [
  { absolute: 'דָּבָר (davar)', construct: 'דְּבַר (devar)', pattern: 'Qamets to sheva/patach' },
  { absolute: 'בַּיִת (bayit)', construct: 'בֵּית (beit)', pattern: 'Patach-yod to tsere' },
  { absolute: 'תּוֹרָה (torah)', construct: 'תּוֹרַת (torat)', pattern: '-ah becomes -at (feminine)' },
  { absolute: 'מֶלֶךְ (melekh)', construct: 'מֶלֶךְ (melekh)', pattern: 'Segolates often unchanged' },
];

export default function ConstructStateHelpPage() {
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
            <h1 className="text-3xl font-bold">The Construct State (סְמִיכוּת)</h1>
            <p className="text-muted-foreground mt-2">
              Understanding how Hebrew expresses possession and relationships between nouns.
            </p>
          </div>

          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                What is the Construct State?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The <strong>construct state</strong> (Hebrew: סְמִיכוּת, smichut) is how Biblical
                Hebrew expresses relationships between nouns - typically possession, but also
                other relationships like material, origin, or description.
              </p>
              <p>
                Instead of using a word like "of" (as in English), Hebrew places two nouns
                together in a <strong>construct chain</strong>:
              </p>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-2xl hebrew-text mb-2" dir="rtl">בֵּית הַמֶּלֶךְ</p>
                <p className="text-sm">beit hammelekh = "house of the king" (literally: "house-of the-king")</p>
              </div>
            </CardContent>
          </Card>

          {/* Key Concepts */}
          <Card>
            <CardHeader>
              <CardTitle>Key Concepts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">1. Two Forms of Nouns</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Absolute state</strong>: The normal, standalone form of a noun</li>
                  <li><strong>Construct state</strong>: The bound form, used before another noun</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. Word Order</h3>
                <p className="text-sm">
                  In a construct chain, the <strong>construct noun comes first</strong>, followed
                  by the absolute noun:
                </p>
                <div className="bg-muted p-3 rounded-lg mt-2 text-center">
                  <p><strong>Construct</strong> + <strong>Absolute</strong> = "X of Y"</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Definiteness</h3>
                <p className="text-sm">
                  The <strong>article only attaches to the last (absolute) noun</strong>, but it
                  makes the entire chain definite:
                </p>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                  <li>בֵּית מֶלֶךְ = "a house of a king" (indefinite)</li>
                  <li>בֵּית <strong>הַ</strong>מֶּלֶךְ = "<strong>the</strong> house of <strong>the</strong> king" (definite)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Common Examples</CardTitle>
              <CardDescription>
                Notice how the first noun changes form in the construct state.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {constructExamples.map((example, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl hebrew-text" dir="rtl">{example.construct}</span>
                      <span className="text-sm text-muted-foreground">
                        Absolute: <span className="hebrew-text">{example.absolute}</span>
                      </span>
                    </div>
                    <p className="font-medium">{example.translation}</p>
                    <p className="text-sm text-muted-foreground mt-1">{example.notes}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vowel Changes */}
          <Card>
            <CardHeader>
              <CardTitle>Common Vowel Changes</CardTitle>
              <CardDescription>
                Vowels often shorten or reduce in the construct form.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">Absolute</th>
                      <th className="text-left py-2 px-3">Construct</th>
                      <th className="text-left py-2 px-3">Pattern</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vowelChanges.map((change, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2 px-3 hebrew-text">{change.absolute}</td>
                        <td className="py-2 px-3 hebrew-text">{change.construct}</td>
                        <td className="py-2 px-3 text-sm text-muted-foreground">{change.pattern}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Tips for the Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  The <strong>first noun</strong> in the chain is always in construct state.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  The definite article goes on the <strong>last (absolute) noun</strong> only.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  Construct nouns typically have <strong>shorter vowels</strong> than absolute.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  The construct chain is a single unit - nothing can separate the nouns.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
